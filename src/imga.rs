use std::fmt::{Debug, Display};

use bitvec::prelude::BitArray;
use image::{imageops, GrayImage, Luma};
use js_sys::Uint8ClampedArray;
use nalgebra::DMatrixSlice;
use nalgebra::{Const, DMatrix, DVector, Dynamic};
use wasm_bindgen::prelude::*;

use crate::brief::{center_mass, Brief, get_brief_vectors};
use crate::features::FEATURE_DATA;
use crate::field::{Cell, Coordinate, Subway};

/// Threshold for closeness to existing feature data
const DETECT_THRESHOLD: i32 = 30;

#[wasm_bindgen]
pub struct ImageProcessor {
    pixels: DMatrix<u32>,
    known_features: Vec<(FeatureVector, Mark)>,
}

#[wasm_bindgen]
#[derive(Copy, Clone)]
pub struct Grid {
    pub size: usize,
    pub row_offset: usize,
    pub col_offset: usize,
    pub row_count: usize,
    pub col_count: usize,
}

#[wasm_bindgen]
#[derive(Copy, Clone, Debug)]
pub enum Mark {
    None = 0,
    Wall = 1,
    Entrance = 2,
    Treasury = 3,
    Subtreasury = 4,
    FinalBoss = 5,
    OtherBoss = 6,
    Ladder = 7,
    Trap = 8,
    Luck = 9,
    RaiseWall = 10,
    Direction = 11,
    Scarecrow = 12,
    Fountain = 13,
}

/// Encapsulates detected maze for passing around
#[wasm_bindgen]
pub struct Maze {
    grid: Grid,
    cells: Vec<Cell>,
    marks: Vec<Mark>,
}

#[wasm_bindgen]
impl Maze {
    /// Apply detected maze to the subway field
    pub fn apply_to_subway(&self, subway: &mut Subway) {
        let subway_row_offset = (crate::field::SIZE_Y - self.grid.row_count) / 2;
        let subway_col_offset = (crate::field::SIZE_X - self.grid.col_count) / 2;

        subway.reset();
        for row in 0..self.grid.row_count {
            for col in 0..self.grid.col_count {
                let grid_idx = row * self.grid.col_count + col;
                subway.set_field(
                    Subway::to_idx(row + subway_row_offset, col + subway_col_offset),
                    match self.marks[grid_idx] {
                        Mark::Entrance => Cell::Entrance,
                        Mark::Treasury => Cell::Exit,
                        _ => self.cells[grid_idx],
                    },
                )
            }
        }
    }

    /// Get a mark at a specified location
    ///
    /// Location relative to larger Subway, which is offseted by maze size
    pub fn get_mark(&self, idx: usize) -> Mark {
        let subway_row_offset = (crate::field::SIZE_Y - self.grid.row_count) / 2;
        let subway_col_offset = (crate::field::SIZE_X - self.grid.col_count) / 2;

        // requested coordinate can lie outside of the detected maze, so
        // return nothing
        let Coordinate { row, col } = Subway::from_idx(idx);
        if row < subway_row_offset
            || col < subway_col_offset
            || row >= (self.grid.row_count + subway_row_offset)
            || col >= (self.grid.col_count + subway_col_offset)
        {
            return Mark::None;
        }
        let grid_idx = (row - subway_row_offset) * self.grid.col_count + (col - subway_col_offset);

        if grid_idx < self.marks.len() {
            self.marks[grid_idx]
        } else {
            Mark::None
        }
    }

    /// Tell if the structure has valid data
    pub fn is_valid(&self) -> bool {
        self.grid.size > 0
    }
}

impl std::fmt::Display for Grid {
    fn fmt(&self, formatter: &mut std::fmt::Formatter) -> Result<(), std::fmt::Error> {
        formatter.write_str(&format!(
            "Grid<{}x{}x{} at {},{}>",
            self.col_count, self.row_count, self.size, self.col_offset, self.row_offset
        ))
    }
}

impl Default for Grid {
    fn default() -> Self {
        Self {
            size: 0,
            row_count: 0,
            row_offset: 0,
            col_count: 0,
            col_offset: 0,
        }
    }
}

struct GridPeriod {
    period: usize,
    offset: usize,
    count: usize,
}

impl GridPeriod {
    /// Expand period count to the maximum possible
    pub fn expand(&mut self, col: &DVector<u32>) {
        const GRID_SENSITIVITY: u32 = 15;
        let max_count = (col.nrows() - self.offset - 1) / (self.period + 1) + 1;

        let grid_avg = col
            .rows_with_step(self.offset, self.count, self.period)
            .sum()
            / (self.count as u32);

        if self.count < max_count {
            // expand up to max_count
            self.count = col
                .rows_with_step(self.offset, max_count, self.period)
                .iter()
                .take_while(|&&value| value.max(grid_avg) - value.min(grid_avg) < GRID_SENSITIVITY)
                .count();
        }

        if self.count == 0 {
            return;
        }
        // verify that between grid cells difference is higher
        let mid_count = col
            .rows_with_step(self.offset + self.period / 2, self.count - 1, self.period)
            .iter()
            .take_while(|&&value| value.max(grid_avg) - value.min(grid_avg) > GRID_SENSITIVITY)
            .count();
        if mid_count < self.count - 1 {
            self.count = mid_count + 1
        }
    }
}

/// Stored data that describes icon features (FeatureVector)
#[derive(Debug)]
pub struct FeatureData {
	pub x: i32,
	pub y: i32,
	pub bits_1: [u32; 6],
	pub bits_2: [u32; 6],
}

impl Display for FeatureData {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_fmt(format_args!("{:?}", self))
    }
}

/// Icon description with BRIEF vector
#[derive(Default)]
pub struct FeatureVector(pub [Brief; 2]);

impl FeatureVector {
    pub fn from_image(img: &GrayImage) -> Self {
        let sym_min = *img.iter().min().unwrap() as u16;
        let sym_max = *img.iter().max().unwrap() as u16;
        let thresh = if sym_max - sym_min < 30 {
            0u8
        } else {
            ((sym_min * 2 + sym_max * 5) / 7) as u8
        };
        let binarized = imageproc::contrast::threshold(img, thresh);

        // Find image center and encode BRIEF vector
        // Blurring allows for limited imprecise matching
        let resized = imageops::resize(&binarized, 24, 24, imageops::CatmullRom);
        let blurred = imageops::blur(&resized, 0.6);
        let center = center_mass(&resized);
        FeatureVector(get_brief_vectors(&blurred, &[center, (center.0 + 1, center.1)]))
    }

    pub fn from_data(feature_data: &FeatureData) -> Self {
        Self([
            Brief {
                x: feature_data.x,
                y: feature_data.y,
                b: BitArray::from(feature_data.bits_1),
            },
            Brief {
                x: feature_data.x + 1,
                y: feature_data.y,
                b: BitArray::from(feature_data.bits_2),
            },
        ])
    }

    pub fn distance(&self, other: &FeatureVector) -> i32 {
        // match BRIEF vectors
        *([
            self.0[0].distance(&other.0[0]),
            self.0[0].distance(&other.0[1]),
            self.0[1].distance(&other.0[1]),
        ]
        .iter()
        .min()
        .unwrap_or(&0)) as i32
    }

    #[allow(dead_code)]
    /// create object representation in Rust notation
    pub fn get_data(&self) -> FeatureData {
        FeatureData {
            x: self.0[0].x,
            y: self.0[0].y,
            bits_1: self.0[0].b.data,
            bits_2: self.0[1].b.data,
        }
    }
}

impl Display for FeatureVector {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_fmt(format_args!("[{}, {}]", self.0[0], self.0[1]))
    }
}

#[wasm_bindgen]
impl ImageProcessor {
    /// Load image and known features
    fn from_matrix(width: usize, height: usize, matrix: DMatrix<u8>) -> Self {
        Self {
            // convert to grayscale without divide step
            pixels: matrix
                .cast::<u32>()
                .compress_rows(|col| col.max() * 3)
                // .row_sum()
                // data is given by scan lines, but nalgebra matrices are column-major,
                // so we reshape into a transposed matrix to match the source
                // (may remove for production)
                .reshape_generic(Dynamic::new(width), Dynamic::new(height))
                .transpose(),
            known_features: FEATURE_DATA
                .iter()
                .map(|data| (FeatureVector::from_data(&data.0), data.1))
                .collect(),
        }
    }

    #[wasm_bindgen(constructor)]
    pub fn new(width: usize, height: usize, data: Uint8ClampedArray) -> Self {
        // read RGBA data from uint8 array into 4x(loooong) matrix
        let mut img_vector = DMatrix::zeros(4, width * height);
        data.copy_to(img_vector.as_mut_slice());
        // ignore alpha
        img_vector.row_mut(3).fill(0);
        Self::from_matrix(width, height, img_vector)
    }

    pub fn from_rgba_slice(width: usize, height: usize, data: &[u8]) -> Self {
        // read RGBA data from uint8 array into 4x(loooong) matrix
        let mut img_vector = DMatrix::zeros(4, width * height);
        img_vector.copy_from_slice(data);
        // ignore alpha
        img_vector.row_mut(3).fill(0);

        Self::from_matrix(width, height, img_vector)
    }

    pub fn height(&self) -> u32 {
        self.pixels.nrows() as u32
    }
    pub fn width(&self) -> u32 {
        self.pixels.ncols() as u32
    }

    fn get_rgba_matrix(&self) -> DMatrix<u8> {
        let width = self.width();
        let height = self.height();
        let single_row_image = self
            .pixels
            .transpose()
            .map::<u8, fn(u32) -> u8>(|value| (value / 3) as u8)
            .reshape_generic(Const::<1>, Dynamic::new((width * height) as usize));
        let mut rgba_image = DMatrix::<u8>::repeat(4, single_row_image.ncols(), 255);
        rgba_image.set_row(0, &single_row_image.row(0));
        rgba_image.set_row(1, &single_row_image.row(0));
        rgba_image.set_row(2, &single_row_image.row(0));
        // 4th row left at 255 for alpha
        rgba_image
    }

    pub fn get_image_data(&self) -> Uint8ClampedArray {
        let rgba_image = self.get_rgba_matrix();
        let result = Uint8ClampedArray::new_with_length(4 * self.width() * self.height());
        result.copy_from(rgba_image.as_slice());
        result
    }

    pub fn get_image_data_vector(&self) -> Vec<u8> {
        let rgba_image = self.get_rgba_matrix();
        rgba_image.data.into()
    }

    /// Find periodic lines
    ///
    /// This function searches for periodic lines in vertical direction
    /// in the given `image_slice`. An optional grid_period can be used
    /// to refine search (e.g. for another direction)
    fn find_grid_period(
        image_slice: &DMatrix<u32>,
        grid_period: Option<&GridPeriod>,
    ) -> Option<GridPeriod> {
        // initial number of lines to search for
        const INITIAL_SEEK_SIZE: usize = 12;

        // Sum up all columns - resulting column vector will have dips/spikes
        // in place of grid lines.
        // General consideration: values in original image are pure sums of RGB components,
        // scaling by 3 is performed here for clarity, but is not necessary
        let cols = image_slice
            .column_sum()
            .map(|value| value / (3 * image_slice.ncols() as u32));
        let avg = cols.sum() / image_slice.nrows() as u32;
        let dark_mode = avg < 128;

        // set search period range, depending on whether we have someting already
        let period_range = match grid_period {
            None => 12..60,                                // whole range of possible periods
            Some(found) => found.period..found.period + 1, // just one
        };

        // end result: detected grid with largest number of lines
        let mut largest_grid: Option<GridPeriod> = None;

        // Each period may start at a different offset - so we go over offsets too
        // We first pick offsets that are on the other side of average
        for (offset, _) in cols
            .iter()
            .enumerate()
            .take(cols.len() - INITIAL_SEEK_SIZE * (period_range.start + 1))
            .filter(|(_index, &value)| (value < avg) ^ dark_mode)
        {
            // Iterate over acceptable periods - actual period depend on
            // screen resolution and scaling. Also note that "period" used for
            // traversing the matrix is the size of the "gap",
            // therefore occasional +1's are needed
            for period in period_range.start..period_range.end {
                // There should be at least 12 rows. We can search for less, but searching
                // for more cuts off earlier.
                if (cols.len() - offset + period - 1) / (period + 1) < INITIAL_SEEK_SIZE {
                    // period is too large - the maze won't fit, can work with what we have
                    break;
                }
                // make sure all rows within period are darker/brighter
                if cols
                    .fixed_rows_with_step::<INITIAL_SEEK_SIZE>(offset, period)
                    .iter()
                    .all(|&value| (value < avg) ^ dark_mode)
                {
                    // all hit - add the result
                    let mut grid = GridPeriod {
                        period,
                        offset,
                        count: INITIAL_SEEK_SIZE,
                    };
                    // minimum found - now adjust the grid to capture all of the lines
                    grid.expand(&cols);

                    // After expansion grid may be unusable if rows are not alike,
                    // so we need another check
                    if grid.count > 0
                        && (largest_grid.is_none()
                            || largest_grid.as_ref().unwrap().count < grid.count)
                    {
                        largest_grid.replace(grid);
                    }
                }
            }
        }

        largest_grid
    }

    /// Detect grid on a given image slice
    fn find_grid(image_slice: &DMatrix<u32>) -> Option<Grid> {
        // Grid will show up as regular changes of intensity on columns and rows.
        // First we search for repeated rows
        let row_grid = ImageProcessor::find_grid_period(image_slice, None);

        if row_grid.is_none() {
            web_sys::console::log_1(&"Horizontal lines not found".into());
            return None;
        }

        let row_grid = row_grid.unwrap();

        // Now we can adjust for columns - only scan interesting part
        // (also note that area is slightly clipped to make grid lines stand out)
        let scan_part = image_slice
            .rows(row_grid.offset + 1, row_grid.count * row_grid.period - 1)
            .transpose();
        let col_grid = ImageProcessor::find_grid_period(&scan_part, Some(&row_grid));
        if col_grid.is_none() {
            web_sys::console::log_1(&"Vertical lines not found".into());
            return None;
        }
        let col_grid = col_grid.unwrap();

        Some(Grid {
            col_count: col_grid.count - 1,
            col_offset: col_grid.offset,
            row_count: row_grid.count - 1,
            row_offset: row_grid.offset,
            size: row_grid.period + 1,
        })
    }

    /// Compare similarity between two cells of same size
    fn compare(cell_a: &DMatrixSlice<u32>, cell_b: &DMatrixSlice<u32>) -> u32 {
        cell_a.zip_fold(cell_b, 0u32, |acc, a_value, b_value| {
            acc + a_value.max(b_value) - a_value.min(b_value)
        })
    }

    /// Find a grid structure in given screenshot
    pub fn detect_grid(&self) -> Grid {
        // First we try to detect the grid on the screenshot
        let grid = ImageProcessor::find_grid(&self.pixels);
        if grid.is_none() {
            return Grid::default();
        }
        let grid = grid.unwrap();

        // sanity check
        if grid.col_count >= 20 || grid.row_count >= 20 || grid.col_count < 5 || grid.row_count < 5
        {
            return Grid::default();
        }
        grid
    }

    /// Detect the actual cells of the maze
    pub fn detect_maze(&self, grid: &Grid) -> Maze {
        let mut cells = Vec::with_capacity(grid.col_count * grid.row_count);
        let mut marks = Vec::with_capacity(grid.col_count * grid.row_count);
        if grid.size == 0 {
            return Maze {
                grid: *grid,
                cells,
                marks,
            };
        }

        // On larger cell sizes grids have thicker borders,
        // but we can approximately pick how much to inset into the cell square
        let inset = 1 + grid.size / 15;
        let cell_size = grid.size - inset * 2;

        // Grab top left cell - this will be a wall
        let wall_cell = self.pixels.slice(
            (grid.row_offset + inset, grid.col_offset + inset),
            (cell_size, cell_size),
        );

        // candidates: cell id, similarity distance 
        let mut entry_candidate: (usize, i32) = (0, 1000);
        let mut treasury_candidate: (usize, i32) = (0, 1000);

        // go over similar slices and check how well they compare with the wall
        for row in 0..grid.row_count {
            for col in 0..grid.col_count {
                let cell = self.pixels.slice(
                    (
                        grid.row_offset + row * grid.size + inset,
                        grid.col_offset + col * grid.size + inset,
                    ),
                    (cell_size, cell_size),
                );
                let diff = ImageProcessor::compare(&wall_cell, &cell);
                if diff < (15 * grid.size as u32 * grid.size as u32) {
                    // wall
                    cells.push(Cell::Wall);
                    // TODO: detect "raised wall" mark
                    marks.push(Mark::None);
                } else {
                    cells.push(Cell::Pass);
                    marks.push(Mark::None);

                    // we'll try to detect special cells by their very special
                    // characteristics
                    let cell_avg = cell.sum() / (cell.ncols() as u32 * cell.nrows() as u32);
                    let cell_max = cell.max();
                    let cell_min = cell.min();
                    if cell_max > cell_min + 100 {
                        // Special cells have icons, so their min/max has quite some difference.
                        // Of these special cells two are most interesting: entry and treasury.

                        let dark_mode = cell_avg < 128 * 3;
                        let mut cell_img = image::ImageBuffer::<Luma<u8>, Vec<u8>>::from_vec(
                            cell_size as u32,
                            cell_size as u32,
                            cell.transpose()
                                .map::<u8, fn(u32) -> u8>(|value| (value / 3) as u8)
                                .reshape_generic(
                                    Const::<1>,
                                    Dynamic::new((cell_size * cell_size) as usize),
                                )
                                .data
                                .into(),
                        )
                        .unwrap();
                        if dark_mode {
                            imageops::invert(&mut cell_img);
                        }
                        cell_img = imageops::resize(&cell_img, 8, 8, imageops::CatmullRom);
                        let feature_vector = FeatureVector::from_image(&cell_img);
                        let (detected_mark, similarity) = self.get_closest_feature(&feature_vector);
                        if similarity <= DETECT_THRESHOLD {
                            match detected_mark {
                                Mark::Entrance => {
                                    if entry_candidate.1 > similarity {
                                        entry_candidate.0 = cells.len() - 1;
                                    }
                                },
                                Mark::Treasury => {
                                    if treasury_candidate.1 > similarity {
                                        treasury_candidate.0 = cells.len() - 1;
                                    }
                                },
                                _ => {
                                    if let Some(last) = marks.last_mut() {
                                        *last = detected_mark;
                                    }
                                }
                            }
                        } else {
                            web_sys::console::log_1(
                                &format!("At {}:{} distance {} to {:?}", col, row, similarity, detected_mark).into(),
                            );
                        }
                    }
                }
            }
        }

        // Apply found candidates to map
        if entry_candidate.0 > 0 {
            marks[entry_candidate.0] = Mark::Entrance;
        }
        if treasury_candidate.0 > 0 {
            marks[treasury_candidate.0] = Mark::Treasury;
        }

        Maze {
            grid: *grid,
            cells,
            marks,
        }
    }

    /// Debug draw: paint walls black
    pub fn debug_draw(&mut self, maze: &Maze) {
        for row in 0..maze.grid.row_count {
            for col in 0..maze.grid.col_count {
                let mut cell = self.pixels.slice_mut(
                    (
                        maze.grid.row_offset + row * maze.grid.size + 1,
                        maze.grid.col_offset + col * maze.grid.size + 1,
                    ),
                    (maze.grid.size - 1, maze.grid.size - 1),
                );
                if maze.cells[row * maze.grid.col_count + col] == Cell::Wall {
                    cell.fill(0);
                }
            }
        }
    }

    /// Find closest feature and report its distance
    fn get_closest_feature(&self, in_vector: &FeatureVector) -> (Mark, i32) {
        self.known_features
            .iter()
            .fold((Mark::None, i32::MAX), |acc, f| {
                let dist = in_vector.distance(&f.0);
                if dist < acc.1 {
                    (f.1, dist)
                } else {
                    acc
                }
            })
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use wasm_bindgen_test::*;

    #[wasm_bindgen_test]
    fn img_1_pixel() {
        let arr = Uint8ClampedArray::new_with_length(4);
        arr.fill(0, 0, 4);
        let img = ImageProcessor::new(1, 1, arr);
        assert_eq!(img.pixels[(0, 0)], 0);

        let arr = Uint8ClampedArray::new_with_length(4);
        arr.fill(255, 0, 4);
        let img = ImageProcessor::new(1, 1, arr);
        assert_eq!(img.pixels[(0, 0)], 255 * 3);
    }

    #[wasm_bindgen_test]
    fn img_2_pixel() {
        let arr = Uint8ClampedArray::new_with_length(8);
        for idx in 0..8 {
            arr.set_index(idx, idx as u8);
        }
        let img = ImageProcessor::new(2, 1, arr);
        assert_eq!(img.pixels[(0, 0)], 6);
        assert_eq!(img.pixels[(0, 1)], 18);
    }

    #[wasm_bindgen_test]
    fn img_2x2_pixel() {
        let arr = Uint8ClampedArray::new_with_length(16);
        for idx in 0..16 {
            arr.set_index(idx, idx as u8);
        }
        let img = ImageProcessor::new(2, 2, arr);
        assert_eq!(img.pixels[(0, 0)], 6);
        assert_eq!(img.pixels[(0, 1)], 18);
        assert_eq!(img.pixels[(1, 0)], 30);
        assert_eq!(img.pixels[(1, 1)], 42);

        let arr = img.get_image_data();
        assert_eq!(
            arr.to_vec(),
            vec![2, 2, 2, 255, 6, 6, 6, 255, 10, 10, 10, 255, 14, 14, 14, 255]
        );
    }
}
