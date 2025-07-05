use std::cmp::Ordering;
use std::fmt::Display;

use image::{imageops, DynamicImage, GenericImageView, Luma};
use imageproc::contrast::ThresholdType;
use js_sys::Uint8ClampedArray;
use wasm_bindgen::prelude::*;

use crate::brief::center_mass;
use crate::field::{Cell, Coordinate, Subway};

const NN_INPUT_SIZE: u32 = 12;
const NN_IN_LAYER_SIZE: usize = (NN_INPUT_SIZE * NN_INPUT_SIZE) as usize;
const NN_MID_LAYER_SIZE: usize = NN_IN_LAYER_SIZE / 4;
const NN_OUT_LAYER_SIZE: usize = 16;

#[wasm_bindgen]
#[derive(Copy, Clone, PartialEq)]
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

impl TryFrom<usize> for Mark {
    type Error = ();
    fn try_from(value: usize) -> Result<Self, Self::Error> {
        match value {
            0 => Ok(Mark::None),
            1 => Ok(Mark::Wall),
            2 => Ok(Mark::Entrance),
            3 => Ok(Mark::Treasury),
            4 => Ok(Mark::Subtreasury),
            5 => Ok(Mark::FinalBoss),
            6 => Ok(Mark::OtherBoss),
            7 => Ok(Mark::Ladder),
            8 => Ok(Mark::Trap),
            9 => Ok(Mark::Luck),
            10 => Ok(Mark::RaiseWall),
            11 => Ok(Mark::Direction),
            12 => Ok(Mark::Scarecrow),
            13 => Ok(Mark::Fountain),
            _ => Err(()),
        }
    }
}

/// Encapsulates detected maze for passing around
#[wasm_bindgen]
pub struct Maze {
    // grid: Grid,
    width: usize,
    height: usize,
    cells: Vec<Cell>,
    marks: Vec<Mark>,
}

#[wasm_bindgen]
impl Maze {
    pub fn new() -> Self {
        Self {
            // grid: Grid::default(),
            width: 0,
            height: 0,
            cells: vec![],
            marks: vec![]
        }
    }

    /// Apply detected maze to the subway field
    pub fn apply_to_subway(&self, subway: &mut Subway) {
        let subway_row_offset = (crate::field::SIZE_Y - self.height) / 2;
        let subway_col_offset = (crate::field::SIZE_X - self.width) / 2;

        subway.reset();
        for row in 0..self.height {
            for col in 0..self.width {
                let grid_idx = row * self.width + col;
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
        let subway_row_offset = (crate::field::SIZE_Y - self.height) / 2;
        let subway_col_offset = (crate::field::SIZE_X - self.width) / 2;

        // requested coordinate can lie outside of the detected maze, so
        // return nothing
        let Coordinate { row, col } = Subway::from_idx(idx);
        if row < subway_row_offset
            || col < subway_col_offset
            || row >= (self.height + subway_row_offset)
            || col >= (self.width + subway_col_offset)
        {
            return Mark::None;
        }
        let grid_idx = (row - subway_row_offset) * self.width + (col - subway_col_offset);

        if grid_idx < self.marks.len() {
            self.marks[grid_idx]
        } else {
            Mark::None
        }
    }

    /// Tell if the structure has valid data
    pub fn is_valid(&self) -> bool {
        self.width > 0 && self.height > 0
    }
}

/// Dimensions of white space inside a cell
#[derive(Clone, Copy)]
struct CellDim {
    x: u32,
    y: u32,
    width: u32,
    height: u32,
}

#[derive(Clone, Copy)]
struct UnalignedCellDim {
    x: u32,
    y: u32,
    width: u32,
    height: u32,
}

#[derive(Clone, Copy)]
enum ExploreDirection {
    Left, Right, Up, Down
}

impl Display for CellDim {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_fmt(format_args!("({}, {}) size {}x{}", self.x, self.y, self.width, self.height))
    }
}

impl CellDim {
    pub fn offset(&self, dir: ExploreDirection, gutter: (u32, u32), clip_rect: (u32, u32, u32, u32)) -> Option<UnalignedCellDim> {
        // Start with the current cell's coordinates and size
        let (mut x, mut y, mut width, mut height) = (self.x, self.y, self.width, self.height);
        const BORDER_DIV: u32 = 8;

        // Move in the specified direction by the cell's width/height
        match dir {
            ExploreDirection::Left => {
            x = x.saturating_sub(width + width / BORDER_DIV);
            }
            ExploreDirection::Right => {
            x = x.saturating_add(width + width / BORDER_DIV);
            }
            ExploreDirection::Up => {
            y = y.saturating_sub(height + height / BORDER_DIV);
            }
            ExploreDirection::Down => {
            y = y.saturating_add(height + height / BORDER_DIV);
            }
        }

        // Enlarge by gutter in all directions
        x = x.saturating_sub(gutter.0);
        y = y.saturating_sub(gutter.1);
        width += gutter.0 * 2;
        height += gutter.1 * 2;

        // Clip against clip_rect (left, top, right, bottom)
        let left = clip_rect.0;
        let top = clip_rect.1;
        let right = clip_rect.2;
        let bottom = clip_rect.3;

        if x < left {
            let diff = left - x;
            x = left;
            width = width.saturating_sub(diff);
        }
        if y < top {
            let diff = top - y;
            y = top;
            height = height.saturating_sub(diff);
        }
        if x + width > right {
            width = right.saturating_sub(x);
        }
        if y + height > bottom {
            height = bottom.saturating_sub(y);
        }

        if match dir {
            ExploreDirection::Left => self.x - x <= self.width,
            ExploreDirection::Right => (x + width) - (self.x + self.width) <= self.width,
            ExploreDirection::Up => self.y - y <= self.height,
            ExploreDirection::Down => (y + height) - (self.y + self.height) <= self.height
        } { None }
        else {
            Some(UnalignedCellDim { x, y, width, height })
        }
    }
}

struct NimageProcessor {
    pub name: String,
    pub source: image::DynamicImage,
    pub dark_mode: bool,
    pub seed_square: Option<CellDim>,
}

impl NimageProcessor {
    const TOP_LEFT_CORNER: u8 = 0b11100011;
    const TOP_RIGHT_CORNER: u8 = 0b10001111;
    const BOTTOM_LEFT_CORNER: u8 = 0b11111000;
    const BOTTOM_RIGHT_CORNER: u8 = 0b00111110;
    const TOP_SIDE: u8 = 0b10000011;
    const RIGHT_SIDE: u8 = 0b00001110;
    // const BOTTOM_SIDE: u8 = 0b00111000;
    const LEFT_SIDE: u8 = 0b11100000;
    const MIN_SIZE: u32 = 8;

    fn get_seed_subimage(source: &image::DynamicImage) -> (image::GrayImage, u32, u32) {
        let window_size: u32 = source.width().min(source.height()) / 3;
        let offset_x = (source.width() - window_size) / 2;
        let offset_y = (source.height() - window_size) / 2;
        let subview = source.view(offset_x, offset_y, window_size, window_size).to_image();
        (image::imageops::grayscale(&subview), offset_x, offset_y)
    }

    fn detect_dark_mode(seed: &image::GrayImage) -> bool {
        let avg_brightness = imageproc::stats::percentile(&seed, 50);
        avg_brightness < 128
    }

    fn cell_full_search(bin_img: &image::GrayImage) -> Option<CellDim> {
        enum State {
            SearchLT,
            SpanTopSide(u32, u32, u32),
            TopSide(u32, u32, u32),
            Rect(u32, u32, u32, u32)
        }

        let mut state = State::SearchLT;
        'search: for y in 1..bin_img.height().saturating_sub(Self::MIN_SIZE) {
            state = State::SearchLT;
            for x in 1..bin_img.width() - 1 {
                let pt = imageproc::local_binary_patterns::local_binary_pattern(bin_img, x, y).unwrap();
                state = match state {
                    State::SearchLT => if pt == Self::TOP_LEFT_CORNER { State::SpanTopSide(x, y, 1) } else { State::SearchLT },
                    State::SpanTopSide(a, b, w) if w < 8 => if pt != Self::TOP_SIDE { State::SearchLT } else { State::SpanTopSide(a, b, w+1) },
                    State::SpanTopSide(a, b, w) => if pt == Self::TOP_RIGHT_CORNER { State::TopSide(a, b, w) } else if pt == Self::TOP_SIDE { State::SpanTopSide(a, b, w+1) } else { State::SearchLT },
                    State::TopSide(a, b, w) => {
                        // println!("{img_name}: Have top side at ({a}, {b}) length {w}");
                        // trace sides
                        for h in 1..(w + 2).min((bin_img.height() - 1).saturating_sub(b)) {
                            let pt_left = imageproc::local_binary_patterns::local_binary_pattern(bin_img, a, b + h).unwrap();
                            let pt_right = imageproc::local_binary_patterns::local_binary_pattern(bin_img, a + w, b + h).unwrap();
                            if pt_left == Self::LEFT_SIDE && pt_right == Self::RIGHT_SIDE {
                                continue;
                            } else if pt_left == Self::BOTTOM_LEFT_CORNER && pt_right == Self::BOTTOM_RIGHT_CORNER {
                                // Found bottom corners, likely a rectangle
                                state = State::Rect(a, b, w + 1, h + 1);
                                break 'search;
                            } else {
                                // Not a valid rectangle, reset state
                                state = State::SearchLT;
                                break;
                            }
                        }
                        state
                    },
                    _ => State::SearchLT
                };
                                    
            }
        }

        if let State::Rect(x, y, w, h) = state {
            Some(CellDim { x, y, width: w, height: h })
        } else {
            None
        }
    }

    pub fn find_seed_square(seed: &image::GrayImage, dark_mode: bool) -> Option<CellDim> {        
        let mid = imageproc::contrast::otsu_level(seed);
        let mut bin_img = imageproc::contrast::threshold(seed, mid,
            if !dark_mode { imageproc::contrast::ThresholdType::Binary } else { ThresholdType::BinaryInverted });
        
        // Make corners less smooth, more cornery.
        bin_img = imageops::resize(&bin_img, bin_img.width() * 2, bin_img.height() * 2, imageops::FilterType::Nearest);
        
        // Occasional single pixels from subpixel smoothing may linger in cell corners and throw off square cell detection.
        // If we erode and dilate whitespace with different norms, whitespace will fill in cell edges without disrupting the borders.
        imageproc::morphology::erode_mut(&mut bin_img, imageproc::distance_transform::Norm::L1, 1);
        imageproc::morphology::dilate_mut(&mut bin_img, imageproc::distance_transform::Norm::LInf, 1);
        bin_img = imageops::resize(&bin_img, bin_img.width() / 2, bin_img.height() / 2, imageops::FilterType::Nearest);

        Self::cell_full_search(&bin_img)
    }

    pub fn new(name: &str, source: image::DynamicImage) -> Self {
        let (grey, x, y) = Self::get_seed_subimage(&source);
        let dark_mode = Self::detect_dark_mode(&grey);
        let mut seed_square = Self::find_seed_square(&grey, dark_mode);
        if let Some(CellDim { x: a, y: b, .. }) = &mut seed_square {
            *a += x;
            *b += y;
        }
        Self { name: name.to_owned(), source, dark_mode, seed_square }
    }

    fn find_inner_border_offset(int_img: &image::ImageBuffer<Luma<u32>, Vec<u32>>, direction: ExploreDirection, range: u32) -> Option<u32> {
        let mut dip_offset = None;
        for offset in 0..=range {
            let (left, top, right, bottom) = match direction {
                    ExploreDirection::Left => (offset, 0, offset, int_img.height() - 2),
                    ExploreDirection::Right => (int_img.width() - 2 - offset, 0, int_img.width() - 2 - offset, int_img.height() - 2),
                    ExploreDirection::Up => (0, offset, int_img.width() - 2, offset),
                    ExploreDirection::Down => (0, int_img.height() - 2 - offset, int_img.width() - 2, int_img.height() - 2 - offset)
            };
            let value = imageproc::integral_image::sum_image_pixels(&int_img, left, top, right, bottom).as_ref()[0] / 255;
            if value <= 2 {
                dip_offset = Some(match direction {
                    ExploreDirection::Left => offset + 1,
                    ExploreDirection::Right => int_img.width() - 2 - (offset+1),
                    ExploreDirection::Up => offset + 1,
                    ExploreDirection::Down => int_img.height() - 2 - (offset+1),
                });
            } else if dip_offset.is_some() {
                break;
            }
        }
        dip_offset
    }

    fn scan_blank(img: &image::GrayImage, from_pt: (i32, i32), direction: ExploreDirection) -> (i32, i32) {
        const WIDTH: i32 = 10;
        let mut pt = (from_pt.0 as i32, from_pt.1 as i32);        
        let dir = match direction {
            ExploreDirection::Left => (-1, 0),
            ExploreDirection::Right  => (1, 0),
            ExploreDirection::Up => (0, -1),
            ExploreDirection::Down => (0, 1),
        };
        for _steps in 0..10 { // safe limit
            (pt.0, pt.1) = (pt.0 + dir.0, pt.1 + dir.1);
            if pt.0 == 0 || pt.0 == img.width() as i32 - 1 || pt.1 == 0 || pt.1 == img.height() as i32 - 1 {
                break;
            }

            // scan line
            let mut blank: bool = true;
            for i in -WIDTH/2..WIDTH/2 {     
                match direction  {
                    ExploreDirection::Left | ExploreDirection::Right => {
                        if let Some(p) = img.get_pixel_checked(pt.0 as u32 , (pt.1 + i) as u32) {
                            if p.0[0] < 192 { blank = false; break; }
                        }
                    }
                    ExploreDirection::Up | ExploreDirection::Down => {
                        if let Some(p) = img.get_pixel_checked((pt.0 + i) as u32 , pt.1 as u32) {
                            if p.0[0] < 192 { blank = false; break; }
                        }
                    }
                }
            }

            if blank {break}
        }
        pt
    }

    fn align_borders(&self, cell: &UnalignedCellDim, bin_img: &image::GrayImage) -> Option<CellDim> {
        let range = cell.width / 4;

        let integral = imageproc::integral_image::integral_image::<_, u32>(&bin_img);
        let left = Self::find_inner_border_offset(&integral, ExploreDirection::Left, range);
        let right = Self::find_inner_border_offset(&integral, ExploreDirection::Right, range);
        let top = Self::find_inner_border_offset(&integral, ExploreDirection::Up, range);
        let bottom = Self::find_inner_border_offset(&integral, ExploreDirection::Down, range);

        // println!("Cell ({}, {}) size ({}x{}): {left:?}, {top:?}, {right:?}, {bottom:?}", cell.x, cell.y, cell.width, cell.height);
        if [left, right, top, bottom].iter().any(Option::is_none) {
            return None;
        }
        let (left, right, top, bottom) = (left.unwrap(), right.unwrap(), top.unwrap(), bottom.unwrap());

        let width = right - left + 1;
        let height = bottom - top + 1;
        if width.abs_diff(height) > 2 {
            return None;
        }
        Some(CellDim { x: left, y: top, width, height })
    }    

    // Find the square within the given coordinates (they are relatively close to expected new cell).
    pub fn align_cell(&self, cell: &UnalignedCellDim) -> Option<CellDim> {
        let max_rest_width = (self.source.width() - cell.x).min(cell.width);
        let max_rest_height = (self.source.height() - cell.y).min(cell.height);
        if (max_rest_width < Self::MIN_SIZE) || (max_rest_width < Self::MIN_SIZE) { return None; }

        let subview = self.source.view(cell.x, cell.y, max_rest_width, max_rest_height).to_image();
        let grey = image::imageops::grayscale(&subview);

        let mid = imageproc::contrast::otsu_level(&grey);
        let bin_img = imageproc::contrast::threshold(&grey, mid,
            if !self.dark_mode { imageproc::contrast::ThresholdType::Binary } else { ThresholdType::BinaryInverted });
        
        let mut result = self.align_borders(&cell, &bin_img)
            .map(|c| CellDim{ x: c.x + cell.x, y: c.y + cell.y, width: c.width, height: c.height });

        if result.is_none() {
            let mut ada_img = imageproc::contrast::adaptive_threshold(&grey, 2);
            if self.dark_mode {
                imageops::invert(&mut ada_img);
            }
            result = self.align_borders(&cell, &ada_img)
                .map(|c| CellDim{ x: c.x + cell.x, y: c.y + cell.y, width: c.width, height: c.height });
        }

        result
    }

    pub fn extract_cell_image(&self, cell: &CellDim) -> image::GrayImage {
        let mut img = imageops::grayscale(&self.source.view(cell.x+1, cell.y+1, cell.width-2, cell.height-2).to_image());
        if self.dark_mode {
            imageops::invert(&mut img);
        }
        img
    }

    pub fn conform_image(img: &image::GrayImage) -> image::GrayImage {
        let mut result = image::GrayImage::new(NN_INPUT_SIZE, NN_INPUT_SIZE);

        fn contrast(p: u8, min: u8, max: u8) -> u8 {
            if min == max { return u8::MAX };
            let step: f32 = 1.0 / (max - min) as f32;
            let mut k: f32 = (p - min) as f32 * step;

            // overcontrast a little
            k = (k - 0.5) * 1.2 + 0.5;

            (k * 255.0).round().clamp(u8::MIN as f32, u8::MAX as f32) as u8
        }

        let mm = imageproc::stats::min_max(&img)[0];
        let img = imageproc::map::map_pixels(img, |_x, _y, p| {
            Luma::<u8>::from( [contrast(p.0[0], mm.min, mm.max)] )
        });

        // fill background with brighter colour
        let bgcolour = imageproc::stats::percentile(&img, 95);
        result.fill(bgcolour);

        let centroid = center_mass(&img);

        // Variant with just overlay:
        // let x = (result.width() as i64) / 2 - centroid.0 as i64;
        // let y = (result.height() as i64) / 2 - centroid.1 as i64;
        // imageops::overlay(&mut result, &img, x, y);

        // Variant with resize:
        let left = Self::scan_blank(&img, centroid, ExploreDirection::Left).0 + 1;
        let right = Self::scan_blank(&img, centroid, ExploreDirection::Right).0;
        let top = Self::scan_blank(&img, centroid, ExploreDirection::Up).1 + 1;
        let bottom = Self::scan_blank(&img, centroid, ExploreDirection::Down).1;
        println!("Scan blank: ({left}, {top}) - ({right}, {bottom})");

        let focus_img = DynamicImage::resize(&DynamicImage::ImageLuma8(img.view(left as u32, top as u32, (right - left) as u32, (bottom - top) as u32).to_image()),
            NN_INPUT_SIZE, NN_INPUT_SIZE, imageops::FilterType::CatmullRom);
        let focus_img = imageops::grayscale(&focus_img);
        imageops::overlay(&mut result, &focus_img, 0, 0);

        result
    }

    /// Returns true if the image is mostly white (blank)
    pub fn is_blank_image(img: &image::GrayImage) -> bool {
        imageproc::stats::percentile(&img, 2) > 192
    }
}

pub struct NTiler {
    mid_layer: nalgebra::SMatrix::<f32, NN_MID_LAYER_SIZE, NN_IN_LAYER_SIZE>,
    mid_layer_bias: nalgebra::SVector::<f32, NN_MID_LAYER_SIZE>,
    out_layer: nalgebra::SMatrix::<f32, NN_OUT_LAYER_SIZE, NN_MID_LAYER_SIZE>,
    out_layer_bias: nalgebra::SVector::<f32, NN_OUT_LAYER_SIZE>,
}

impl NTiler {
    pub fn new() -> Self {
        Self {
            mid_layer: nalgebra::SMatrix::zeros(),
            out_layer: nalgebra::SMatrix::zeros(),
            mid_layer_bias: nalgebra::SVector::zeros(),
            out_layer_bias: nalgebra::SVector::zeros(),
        }
    }

    fn forward(&self, data: Vec<f32>) -> Vec<f32> {
        // activation functions adapted from jiro_nn
        fn tanh(v: &mut f32) {
            let exp = v.exp();
            let exp_neg = (-*v).exp();
            *v = (exp - exp_neg) / (exp + exp_neg);
        }

        fn softmax(v: &nalgebra::SVector<f32, 16>) -> nalgebra::SVector<f32, 16> {
            let m = v.max();
            let exps = v.add_scalar(-m).apply_into(|v| {*v = v.exp();});
            let sum = exps.sum();
            exps / sum
        }
        
        let input = nalgebra::SVector::<f32, NN_IN_LAYER_SIZE>::from_vec(data);
        let middle = (self.mid_layer * input + self.mid_layer_bias).apply_into(tanh);
        let output = self.out_layer * middle + self.out_layer_bias;
        softmax(&output).into_iter().map(|&v| v).collect()
    }

    pub fn predict(&self, data: &Vec<u8>) -> Option<usize> {
        let nn_data: Vec<f32> = data.iter().map(|&p| p as f32 / 255. - 0.5).collect();

        let result = self.forward(nn_data);
        let max = result.iter().enumerate().max_by(|&a, &b| { if a.1 < b.1 { Ordering::Less } else if a.1 == b.1 { Ordering::Equal } else { Ordering::Greater } }).unwrap();

        if *max.1 > 0.5 {
            Some(max.0 as usize)
        } else {
            None
        }
    }

    pub fn load(&mut self) {
        let weights = include_bytes!("../nn.bin");        
        let params: Vec<Vec<Vec<f32>>> = bincode::borrow_decode_from_slice(weights, bincode::config::standard()).unwrap().0;

        let first_layer = params.first().unwrap();
        self.mid_layer = nalgebra::SMatrix::from_iterator(first_layer.iter().flatten().map(|&v| v));
        self.mid_layer_bias = nalgebra::SVector::from_vec(first_layer.last().unwrap().clone());

        let second_layer = params.last().unwrap();
        self.out_layer = nalgebra::SMatrix::from_iterator(second_layer.iter().flatten().map(|&v| v));
        self.out_layer_bias = nalgebra::SVector::from_vec(second_layer.last().unwrap().clone());
    }
}

#[derive(Clone, Copy, PartialEq, Eq)]
struct CellMazePos {
    pub x: i8,
    pub y: i8
}

impl CellMazePos {
    pub fn left(&self) -> Self {
        Self { x: self.x - 1, y: self.y }
    }
    pub fn up(&self) -> Self {
        Self { x: self.x, y: self.y - 1 }
    }
    pub fn right(&self) -> Self {
        Self { x: self.x + 1, y: self.y }
    }
    pub fn down(&self) -> Self {
        Self { x: self.x, y: self.y + 1 }
    }
    pub fn zero() -> Self {
        Self { x: 0, y: 0 }
    }

    pub fn offset(&self, dir: ExploreDirection) -> Self {
        match dir {
            ExploreDirection::Left => self.left(),
            ExploreDirection::Right => self.right(),
            ExploreDirection::Up => self.up(),
            ExploreDirection::Down => self.down()
        }
    }
}

#[derive(Clone, Copy)]
struct ExploreCell {
    pub position: CellMazePos,
    pub cell: CellDim
}

struct Explorer {
    pub queue: Vec<ExploreCell>,
    pub cursor: usize,
}

impl Explorer {
    pub fn new(cell: CellDim) -> Explorer {
        let expl_cell = ExploreCell{ cell, position: CellMazePos::zero() };
        Explorer {
            queue: vec![expl_cell],
            cursor: 0
        }
    }

    pub fn current(&self) -> Option<ExploreCell> {
        if self.cursor < self.queue.len() {
            Some(self.queue[self.cursor])
        } else {
            None
        }
    }

    pub fn advance(&mut self) {
        self.cursor += 1;
    }

    pub fn reset(&mut self) {
        self.cursor = 0;
    }

    pub fn visited(&self, position: &CellMazePos) -> bool {
        self.queue.iter().find(|&&c| c.position == *position).is_some()
    }

    pub fn enqueue(&mut self, cell: ExploreCell) {
        if !self.visited(&cell.position) {
            self.queue.push(cell);
        }
    }

    /// Get explored maze dimensions: width, height, offset of left top corner
    pub fn get_dimensions(&self) -> (u8, u8, i8, i8) {
        let (min, max) = self.queue.iter().fold(((0,0),(0,0)), |acc, cell| {
            let min_corner = (acc.0.0.min(cell.position.x), acc.0.1.min(cell.position.y));
            let max_corner = (acc.1.0.max(cell.position.x), acc.1.1.max(cell.position.y));
            (min_corner, max_corner)
        });
        let size = (max.0 - min.0 + 1, max.1 - min.1 + 1);
        (size.0 as u8, size.1 as u8, min.0.into(), min.1.into())
    }

    pub fn print_layout(&self) {
        // println!("  Detected size {}x{} ({} cells), min ({}, {}), max ({}, {})", size.0, size.1, size.0 as usize * size.1 as usize,
        //     min.0, min.1, max.0, max.1);
        let (width, height, min_x, min_y) = self.get_dimensions();
        let mut m = nalgebra::DMatrix::<u8>::default().resize(width as usize, height as usize, 0);
        for cell in &self.queue {
            let pos = ((cell.position.x - min_x) as usize, (cell.position.y - min_y) as usize);
            if let Some(p_item) = m.get_mut(pos) {
                *p_item = 1;
            }
        }
        m = m.transpose();

        for row in m.row_iter() {
            let mut s = String::with_capacity(width as usize);
            for &i in row {
                s.push( if i == 0 { '⬛' } else { '⬜' } );
            }
            println!("  {s}");
        }
    }
}

#[wasm_bindgen]
pub fn get_maze(width: usize, height: usize, data: Uint8ClampedArray) -> Maze {
    // read RGBA data from uint8 array into 4x(loooong) matrix
    let mut imgbuf = image::ImageBuffer::<image::Rgba<u8>, _>::new(width as u32, height as u32);
    
    // quick and dirty copy from JS into Rust
    unsafe { data.raw_copy_to_ptr(imgbuf.as_mut_ptr()); }

    let proc = NimageProcessor::new("Хитро!", image::DynamicImage::from(imgbuf));

    if proc.seed_square.is_none() {
        web_sys::console::log_1(&"Не срослось".into());
        return Maze::new();
    }

    let proc = if proc.seed_square.unwrap().width > 48 {
        let resized_img = proc.source.resize_exact(proc.source.width() / 2, proc.source.height() / 2, imageops::Triangle);
        NimageProcessor::new("Вдвойне хитро!", resized_img)
    } else { proc };

    web_sys::console::log_1(&"Exploring the grid".into());

    let clip_rect = (0u32, 0u32, proc.source.width(), proc.source.height());
    let mut expl = Explorer::new(proc.seed_square.unwrap());
    while let Some(cur) = expl.current() {
        for dir in [ExploreDirection::Left, ExploreDirection::Up, ExploreDirection::Right, ExploreDirection::Down] {
            let next_pos = cur.position.offset(dir);
            if expl.visited(&next_pos) { continue; }

            let maybe_next_cell = cur.cell.offset(dir, (cur.cell.width / 4, cur.cell.height / 4), clip_rect);
            if let Some(next_cell) = maybe_next_cell {
                if let Some(aligned_cell) = proc.align_cell(&next_cell) {
                    if aligned_cell.width.abs_diff(cur.cell.width) > 2 || aligned_cell.height.abs_diff(cur.cell.height) > 2 {
                        // skip this cell, it is probably off
                    } else {
                        expl.enqueue(ExploreCell { position: next_pos, cell: aligned_cell });
                    }
                }
            }
        }
        expl.advance();
        // web_sys::console::log_1(&format!("  Q: {} / pos {}, at ({}, {})", expl.queue.len(), expl.cursor, cur.position.x, cur.position.y).into());
    }

    let (width, height, offset_left, offset_top) = expl.get_dimensions();
    let mut maze = Maze::new();
    maze.width = width.into();
    maze.height = height.into();

    web_sys::console::log_1(&format!("  Maze size: {}x{}", maze.width, maze.height).into());

    maze.cells.resize(maze.width * maze.height, Cell::Wall);
    maze.marks.resize(maze.width * maze.height, Mark::Wall);

    // recognize the tiles
    expl.reset();

    let mut cache = Vec::<(image::GrayImage, Cell, Mark)>::new();

    let mut tiler = NTiler::new();
    tiler.load();

    while let Some(cur) = expl.current() {
        let cell_x = (cur.position.x - offset_left) as u8;
        let cell_y = (cur.position.y - offset_top) as u8;
        let cell_idx = (cell_y * width + cell_x) as usize;
        // web_sys::console::log_1(&format!("  At cell: ({}, {}), index {}", cell_x, cell_y, cell_idx).into());

        let mut cell_type = Cell::Wall;
        let mut cell_mark = Mark::None;

        let sub = proc.extract_cell_image(&cur.cell);
        if NimageProcessor::is_blank_image(&sub) {
            cell_type = Cell::Pass;
            cell_mark = Mark::None;
        } else {
            let sub = NimageProcessor::conform_image(&sub);
            if NimageProcessor::is_blank_image(&sub) {
                // could become blank after conforming
                cell_type = Cell::Pass;
                cell_mark = Mark::None;                
            } else {
                let cached = cache.iter().find(|(entry, _, _)| entry.width() == sub.width() && entry.height() == sub.height() && entry.pixels().zip(sub.pixels()).all(|(p1, p2)| p1 == p2));
                match &cached {
                    Some((_image, t, m)) => {
                        // web_sys::console::log_1(&format!("Cell cached: type {}  mark {}", *t, *m).into());
                        cell_type = *t;
                        cell_mark = *m;
                    },
                    None => {
                        if let Some(prediction) = tiler.predict(&sub.clone().into_vec()) {
                            if let Ok(predicted_mark) = Mark::try_from(prediction) {
                                if predicted_mark == Mark::Entrance { cell_type = Cell::Entrance }
                                else if predicted_mark == Mark::Treasury { cell_type = Cell::Exit }
                                else if predicted_mark != Mark::Wall { cell_type = Cell::Pass };
                                cell_mark = predicted_mark;
                            }
                        } else {
                            web_sys::console::log_1(&"  Что-то не распозналось".into());
                        }
                        cache.push((sub, cell_type, cell_mark));
                    }
                }
            }
        }
        if cell_mark == Mark::Wall {
            cell_mark = Mark::None;
        }

        maze.cells[cell_idx] = cell_type;
        maze.marks[cell_idx] = cell_mark;
        
        expl.advance();
    };

    maze

}

#[cfg(test)]
mod tests {
    use std::str::FromStr;

    use super::*;
    use image;
    use wasm_bindgen_test::*;

    use jiro_nn::{model::network_model::NetworkModelBuilder};
    use jiro_nn::network::Network;

    fn make_network_model() -> Network {
        let network_model = NetworkModelBuilder::new()
            .full_dense(NN_MID_LAYER_SIZE)
                .init_uniform_signed()
                .adam()
                .tanh()
            .end()
            .full_dense(NN_OUT_LAYER_SIZE)
                .init_uniform()
                .adam()
                .softmax()
            .end()
        .build();
        network_model.to_network(NN_IN_LAYER_SIZE)
    }    

    #[test]
    #[ignore]
    fn split_img() {
        use image::ImageReader;

        for (num, entry) in std::fs::read_dir("./data/mazes").unwrap().enumerate() {
            let img_name = entry.as_ref().unwrap().file_name().to_string_lossy().into_owned();
            // if img_name != "with-drift.jpg" { continue };
            let img = ImageReader::open(entry.as_ref().unwrap().path()).unwrap().decode().unwrap();
            let proc = NimageProcessor::new(&img_name, img);

            if let Some(cell) = proc.seed_square {
                println!("{img_name}: Found square {cell}");
            } else {
                println!("{img_name}: No seed found");
                continue;
            }

            let proc = if proc.seed_square.unwrap().width > 48 {
                let resized_img = proc.source.resize_exact(proc.source.width() / 2, proc.source.height() / 2, imageops::Triangle);
                NimageProcessor::new(&img_name, resized_img)
            } else { proc };

            let clip_rect = (0u32, 0u32, proc.source.width(), proc.source.height());
            let mut expl = Explorer::new(proc.seed_square.unwrap());
            while let Some(cur) = expl.current() {
                for dir in [ExploreDirection::Left, ExploreDirection::Up, ExploreDirection::Right, ExploreDirection::Down] {
                    let next_pos = cur.position.offset(dir);
                    if expl.visited(&next_pos) { continue; }

                    let maybe_next_cell = cur.cell.offset(dir, (cur.cell.width / 4, cur.cell.height / 4), clip_rect);
                    if let Some(next_cell) = maybe_next_cell {
                        if let Some(aligned_cell) = proc.align_cell(&next_cell) {
                            if aligned_cell.width.abs_diff(cur.cell.width) > 2 || aligned_cell.height.abs_diff(cur.cell.height) > 2 {
                                println!("  Not good: {}", aligned_cell);
                            } else {
                                // println!("  Enq: {}", aligned_cell);
                                expl.enqueue(ExploreCell { position: next_pos, cell: aligned_cell });
                            }
                        }
                    }
                }
                expl.advance();
                // println!("  Q: {} / pos {}, at ({}, {})", expl.queue.len(), expl.cursor, cur.position.x, cur.position.y);
            }

            println!("{img_name}: Found {} cells", expl.cursor);
            expl.print_layout();

            // save the tiles
            expl.reset();
            let mut cache = Vec::<image::GrayImage>::new();
            while let Some(cur) = expl.current() {
                let sub = proc.extract_cell_image(&cur.cell);
                if !NimageProcessor::is_blank_image(&sub) {
                    let sub = NimageProcessor::conform_image(&sub);
                    if NimageProcessor::is_blank_image(&sub) {
                        println!("WARNING: blank image after conform, cell {}", cur.cell);
                        let new_file = std::path::Path::new("./data/proc").join(format!("fail-{}-{}.png", num, expl.cursor));
                        sub.save_with_format(new_file, image::ImageFormat::Png).ok();
                    }
                    if cache.iter().any(|entry| entry.width() == sub.width() && entry.height() == sub.height() && entry.pixels().zip(sub.pixels()).all(|(p1, p2)| p1 == p2)) {
                        println!(" In cache: {}", cur.cell);
                    } else {
                        let new_file = std::path::Path::new("./data/proc").join(format!("{}-{}.png", num, expl.cursor));
                        sub.save_with_format(new_file, image::ImageFormat::Png).ok();
                        cache.push(sub);
                    }
                }
                expl.advance();
            }

        }
    }

    #[test]
    #[ignore]
    fn train_nn() {
        use jiro_nn::loss::Losses;

        const BASE: &str = "./data/proc/six";
        let mut train_in: Vec<Vec<f32>> = vec![];
        let mut train_out: Vec<Vec<f32>> = vec![];
        for class_dir in std::fs::read_dir(BASE).unwrap() {
            if class_dir.is_err() { continue };
            if !class_dir.as_ref().unwrap().metadata().unwrap().is_dir() { continue };
            let class: usize = match usize::from_str(&class_dir.as_ref().unwrap().file_name().to_string_lossy()) {
                Ok(some) => some,
                Err(_) => continue
            };
            let mut classifier_vec: Vec<f32> = [0f32; 16].into();
            classifier_vec[class] = 1.0;

            for train_img in std::fs::read_dir(class_dir.as_ref().unwrap().path()).unwrap() {
                let mut data_vec = Vec::<f32>::new();
                data_vec.reserve((NN_INPUT_SIZE * NN_INPUT_SIZE) as usize);
                let img = image::ImageReader::open(train_img.unwrap().path()).unwrap().decode().unwrap();
                let img = imageops::grayscale(&img);

                for p in img.pixels().map(|p| p.0[0]) {
                    data_vec.push(p as f32 / 255.0 - 0.5);
                }

                for jitter_x in -1..=1i32 {
                    for jitter_y in -0..=0i32 {
                        let mut dv = data_vec.clone();
                        let shift: i32 = jitter_y * (NN_INPUT_SIZE as i32) + jitter_x;
                        if shift < 0 {
                            dv.rotate_left(-shift as usize);
                        } else {
                            dv.rotate_right(shift as usize);
                        }

                        train_in.push(dv);
                        train_out.push(classifier_vec.clone());
                    }
                }                
            }
        }

        println!("Prepared {} training samples", train_in.len());

        let mut network = make_network_model();

        let loss = Losses::BCE.to_loss();
        let batch_size = 2048;

        for epoch in 0..4000 {
            let error = network.train(
                epoch,
                &train_in,
                &train_out,
                &loss,
                batch_size,
            );

            if epoch % 25 == 0 {
                println!("Epoch: {} Average training loss: {}", epoch, error);
            }
        }

        let mut file = std::fs::File::create("./nn.bin").unwrap();
        bincode::encode_into_std_write(network.get_params().0, &mut file, bincode::config::standard()).unwrap();
    }

    #[test]
    #[ignore]
    fn evaluate_nn() {
        const TEST: &str = "./data/proc/test-six";

        let mut tiler = NTiler::new();
        tiler.load();

        // evaluate
        for class_dir in std::fs::read_dir(TEST).unwrap() {
            if class_dir.is_err() { continue };
            if !class_dir.as_ref().unwrap().metadata().unwrap().is_dir() { continue };
            let class: usize = match usize::from_str(&class_dir.as_ref().unwrap().file_name().to_string_lossy()) {
                Ok(some) => some,
                Err(_) => continue
            };

            for test_img in std::fs::read_dir(class_dir.as_ref().unwrap().path()).unwrap() {
                let img = image::ImageReader::open(test_img.as_ref().unwrap().path()).unwrap().decode().unwrap();
                let img = imageops::grayscale(&img);

                let img_v = img.into_vec();
                for jitter_x in -1..=1i32 {
                    for jitter_y in -0..=0i32 {
                        let mut v = img_v.clone();
                        let shift: i32 = jitter_y * (NN_INPUT_SIZE as i32) + jitter_x;
                        if shift < 0 {
                            v.rotate_left(-shift as usize);
                        } else {
                            v.rotate_right(shift as usize);
                        }
                        let pred = tiler.predict(&v);
                        if Some(class) != pred {
                            println!("Mismatch: {} as {:?} (jitter {jitter_x}, {jitter_y})", test_img.as_ref().unwrap().path().to_string_lossy(), pred);
                        }
                    }
                }
            }
        }
    }
}
