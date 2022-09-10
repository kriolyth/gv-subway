/// Global state and methods

import { Subway, Cell, Mark } from "gv_subway"
import { reactive } from "vue"

export const MarkSymbols = new Map<Mark, string>([
    [Mark.None, ' '],
    [Mark.Entrance, '🚪'],
    [Mark.FinalBoss, '💀'],
    [Mark.Treasury, '💰'],
])

export const stField = reactive({
    field: new Subway(),
    cells: (new Array(400)).fill(null).map(v => ({ cellType: Cell.Wall, prob: 0 })),
    marks: (new Array(400)).fill(null).map(v => Mark.None),
    isJumpy: false,
    earlyEntranceVisitors: 0., // fraction visited entrance before 20th step

    recalculate(numSteps: number, updateFrom: number = 0) {
        if (!updateFrom) this.field.init(this.isJumpy);
        for (let i = 1; i <= numSteps; i++) {
            this.field.step(i + updateFrom);
            if (i + updateFrom <= 19) {
                this.earlyEntranceVisitors = this.marks.reduce((acc, m, idx) => {
                    return acc + (m == Mark.Entrance ? this.field.get_visited_probability(idx) : 0.)
                }, 0.)
                // After 20th step everyone visiting the entrance cell exits,
                // but we still get the total count of visitors.
                // So we track how many have visited the cell before it became
                // an exit cell and calculate the fraction of exits
            }
        }
        // update field probabilities
        for (let cell_id = 0; cell_id < 400; cell_id++) {
            if (this.cells[cell_id].cellType != Cell.Wall)
                this.cells[cell_id].prob =
                    this.field.get_visited_probability(cell_id);
        }
    },
    reset() {
        this.field.init(this.isJumpy);
        for (let cell_id = 0; cell_id < 400; cell_id++) {
            this.cells[cell_id].prob = 0;
        }
    },

    /// Set new cell type with automatic mark
    setCell(cellIdx: number, cellType: Cell, mark?: Mark) {
        this.field.set_field(cellIdx, cellType)
        this.cells[cellIdx].cellType = this.field.get_field(cellIdx)
        if (cellType == Cell.Entrance)
            this.marks[cellIdx] = Mark.Entrance
        else if (cellType == Cell.Exit)
            this.marks[cellIdx] = mark ?? Mark.Treasury
        else if (cellType == Cell.Pass) {
            // for space: keep marks, unless it is a raised wall
            if (mark !== undefined) 
                this.marks[cellIdx] = mark
            else if (this.marks[cellIdx] == Mark.RaiseWall)
                this.marks[cellIdx] = Mark.None
        }
        else
            this.marks[cellIdx] = mark ?? Mark.None
    },

    clearByType(cellType: Cell, clearType: Cell = Cell.Pass) {
        // clear all cells with same type
        this.cells.forEach((c, idx) => {
            if (c.cellType == cellType) {
                this.setCell(idx, clearType)
                this.marks[idx] = Mark.None
            }
        })
    },

    clearByTypeAndMark(cellType: Cell, mark: Mark, clearType: Cell = Cell.Pass) {
        // clear all cells with same type and mark
        this.cells.forEach((c, idx) => {
            if (c.cellType == cellType && this.marks[idx] == mark) {
                this.setCell(idx, clearType)
                this.marks[idx] = Mark.None
            }
        })
    }

})
export const stDraw = reactive({
    drawTool: 'none',
})
export const stCalc = reactive({
    numSteps: 0,
    probes: new Set<Mark>([Mark.Entrance, Mark.Treasury, Mark.FinalBoss])
})



export function encodeMap(): string {
    const alphabet =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    let result = "";
    let rep_row = "AAA"; // repeated row (for compression)
    for (let row = 1 * 20; row <= 18 * 20; row += 20) {
        let s_row = "";
        for (let col = 1; col <= 18; col += 6) {
            let ch =
                32 * +(stField.cells[row + col].cellType != Cell.Wall) +
                16 *
                +(stField.cells[row + col + 1].cellType != Cell.Wall) +
                8 * +(stField.cells[row + col + 2].cellType != Cell.Wall) +
                4 * +(stField.cells[row + col + 3].cellType != Cell.Wall) +
                2 * +(stField.cells[row + col + 4].cellType != Cell.Wall) +
                +(stField.cells[row + col + 5].cellType != Cell.Wall);
            s_row += alphabet.charAt(ch);
        }
        if (s_row == rep_row) {
            s_row = "~";
        } else {
            rep_row = s_row;
        }

        result += s_row;
    }
    let specials_string = "etb".split("").reduce((acc, c, idx) => {
        const p = stField.marks.indexOf([Mark.Entrance, Mark.Treasury, Mark.FinalBoss][idx]);
        if (p == -1) return acc;
        return acc + `&${c}=${p}`;
    }, "");
    return `f=${result}${specials_string}`;
}

/// Parse a map from request portion of the URI
export function parseMap(request: string) {
    try {
        const fields = new URLSearchParams(request);

        const alphabet =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
        let rep_row = "AAA"; // first repeated row
        let input = fields.get("f") || "";
        // parse field
        for (let row = 1 * 20; row <= 18 * 20; row += 20) {
            let s_row = "";
            if (input.charAt(0) == "~") {
                s_row = rep_row;
                input = input.substring(1);
            } else {
                s_row = input.substring(0, 3);
                rep_row = s_row;
                input = input.substring(3);
            }
            for (let col = 1; col <= 18; col += 6) {
                let ch = alphabet.indexOf(s_row.charAt(0));
                s_row = s_row.substring(1);
                for (let bit = 0; bit < 6; bit++) {
                    stField.field.set_field(
                        row + col + bit,
                        ch & (1 << (5 - bit)) ? Cell.Pass : Cell.Wall
                    );
                }
            }
        }
        [
            Mark.Entrance,
            Mark.Treasury,
            Mark.FinalBoss,
        ].forEach((mark, idx) => {
            const fieldIdx = parseInt(
                fields.get("etb".charAt(idx)) || "-1"
            );
            if (fieldIdx >= 0) {
                stField.marks[fieldIdx] = mark
                if (mark == Mark.Entrance)
                    stField.field.set_field(fieldIdx, Cell.Entrance);
                else if (mark == Mark.Treasury)
                    stField.field.set_field(fieldIdx, Cell.Exit);
            }
        });
        // apply field
        for (let cell_id = 0; cell_id < 400; cell_id++) {
            stField.cells[cell_id].cellType =
                stField.field.get_field(cell_id);

            stField.cells[cell_id].prob = 0;
        }
        if (stCalc.numSteps > 0) stField.recalculate(stCalc.numSteps);        
    } catch (e) {
        console.log(e);
    }
}