<template>
    <h3>Куда уходят бревновозы</h3>
    <div id="maze">
        <maze :width="20" :cells="cells" @touchcell="touchCell"></maze>
        <div id="drawtool">
            <div>
                <mazecell
                    v-for="toolId in 5"
                    :key="toolId"
                    :id="1000 + toolId"
                    :cellType="toolId - 1"
                    :class="{ selected: toolId - 1 == drawMode }"
                    @click="selectTool(toolId - 1)"
                    @touchstart="selectTool(toolId - 1)"
                ></mazecell>
            </div>
        </div>
        <div id="calc">
            <input
                id="numsteps"
                type="range"
                min="0"
                max="100"
                v-model="numSteps"
            />
            <br />
            <span>Шагов: {{ numSteps }}</span>
            <span id="treasury_prob">{{ treasuryProb }} 💰</span>
        </div>
        <div id="link">
            <label>
                <a :href="mapUrl">Карта</a>:
                <input :value="encodedMap" @change="onMapLinkChange" />
            </label>
        </div>
    </div>
    <imagePaste @haveMaze="onHaveMaze"></imagePaste>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Subway, Cell, Maze } from "../pkg/gv_subway";
import maze from "./maze.vue";
import mazecell from "./mazecell.vue";
import imagePaste from "./image-paste.vue"

export default defineComponent({
    components: { maze, mazecell, imagePaste },
    data() {
        let wall_cell = { cellType: Cell.Wall, prob: 0 };
        let cells = new Array(400);
        for (let i = 0; i < 400; i++) {
            cells[i] = { ...wall_cell };
        }
        return {
            field: new Subway(),
            cells,
            drawMode: Cell.Pass,
            specials: [-1, -1, -1],
            numSteps: 0,
        };
    },
    computed: {
        mapUrl(): string {
            return (
                window.location.origin +
                window.location.pathname +
                "?" +
                this.encodedMap
            );
        },
        encodedMap(): string {
            const alphabet =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
            let result = "";
            let rep_row = "AAA"; // repeated row (for compression)
            for (let row = 1 * 20; row <= 18 * 20; row += 20) {
                let s_row = "";
                for (let col = 1; col <= 18; col += 6) {
                    let ch =
                        32 * +(this.cells[row + col].cellType != Cell.Wall) +
                        16 *
                            +(this.cells[row + col + 1].cellType != Cell.Wall) +
                        8 * +(this.cells[row + col + 2].cellType != Cell.Wall) +
                        4 * +(this.cells[row + col + 3].cellType != Cell.Wall) +
                        2 * +(this.cells[row + col + 4].cellType != Cell.Wall) +
                        +(this.cells[row + col + 5].cellType != Cell.Wall);
                    s_row += alphabet.substr(ch, 1);
                }
                if (s_row == rep_row) {
                    s_row = "~";
                } else {
                    rep_row = s_row;
                }

                result += s_row;
            }
            const entrance = this.specials[0];
            const treasury = this.specials[1];
            const subtreasury = this.specials[2];
            return `f=${result}&e=${entrance}&t=${treasury}&s=${subtreasury}`;
        },
        treasuryProb(): string {
            const treasury = this.specials[1];
            if (treasury == -1) return "0.00";
            return this.cells[treasury].prob.toFixed(2);
        },
    },
    created() {
        let querystring = window.location.search.substring(1);
        if (querystring.length > 0) {
            this.parseMap(querystring);
        }
    },
    methods: {
        onMapLinkChange(evt: Event) {
            const request = (evt.currentTarget as HTMLInputElement).value;
            this.parseMap(request);
        },
        parseMap(request: string) {
            try {
                const fields = new URLSearchParams(request);

                const alphabet =
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
                let rep_row = "AAA"; // first repeated row
                let input = fields.get("f") || "";
                // parse field
                for (let row = 1 * 20; row <= 18 * 20; row += 20) {
                    let s_row = "";
                    if (input.substr(0, 1) == "~") {
                        s_row = rep_row;
                        input = input.substring(1);
                    } else {
                        s_row = input.substr(0, 3);
                        rep_row = s_row;
                        input = input.substring(3);
                    }
                    for (let col = 1; col <= 18; col += 6) {
                        let ch = alphabet.indexOf(s_row.substr(0, 1));
                        s_row = s_row.substring(1);
                        for (let bit = 0; bit < 6; bit++) {
                            this.field.set_field(
                                row + col + bit,
                                ch & (1 << (5 - bit)) ? Cell.Pass : Cell.Wall
                            );
                        }
                    }
                }
                this.specials[0] = parseInt(fields.get("e") || "-1");
                this.specials[1] = parseInt(fields.get("t") || "-1");
                this.specials[2] = parseInt(fields.get("s") || "-1");
                if (this.specials[0] >= 0) {
                    this.field.set_field(this.specials[0], Cell.Entrance);
                }
                if (this.specials[1] >= 0) {
                    this.field.set_field(this.specials[1], Cell.Treasury);
                }
                if (this.specials[2] >= 0) {
                    this.field.set_field(this.specials[2], Cell.Subtreasury);
                }
                // apply field
                for (let cell_id = 0; cell_id < 400; cell_id++) {
                    this.cells[cell_id].cellType =
                        this.field.get_field(cell_id);
                    this.cells[cell_id].prob = 0;
                }
                if (this.numSteps > 0) this.recalculate(this.numSteps);
            } catch (e) {
                console.log(e);
            }
        },
        touchCell(cell_id: number) {
            if (this.cells[cell_id].cellType != this.drawMode) {
                // if there was a special cell here, remove it anyway
                if (this.specials.indexOf(cell_id) >= 0) {
                    this.specials[this.specials.indexOf(cell_id)] = -1;
                }

                // update cell
                this.field.set_field(cell_id, this.drawMode);
                this.cells[cell_id].cellType = this.field.get_field(cell_id);

                // there can be at most one of each special cell types
                const specialDrawMode = [
                    Cell.Entrance,
                    Cell.Treasury,
                    Cell.Subtreasury,
                ].indexOf(this.drawMode);
                if (specialDrawMode >= 0) {
                    const specialCell = this.specials[specialDrawMode];
                    if (specialCell >= 0) {
                        // set previous to "pass"
                        this.field.set_field(specialCell, Cell.Pass);
                        this.cells[specialCell].cellType =
                            this.field.get_field(specialCell);
                    }
                    // update position of the new special cell
                    this.specials[specialDrawMode] = cell_id;
                }

                if (
                    this.specials[0] >= 0 &&
                    this.specials[1] >= 0 &&
                    this.numSteps > 0
                ) {
                    this.recalculate(this.numSteps);
                }
            }
        },
        selectTool(toolId: number) {
            this.drawMode = toolId;
        },
        recalculate(numSteps: number, updateFrom: number = 0) {
            if (!updateFrom) this.field.init();
            for (let i = 1; i <= numSteps; i++) {
                this.field.step(i + updateFrom);
            }
            // update field probabilities
            for (let cell_id = 0; cell_id < 400; cell_id++) {
                if (this.cells[cell_id].cellType != Cell.Wall)
                    this.cells[cell_id].prob =
                        this.field.get_visited_probability(cell_id);
            }
        },
        reset() {
            this.field.init();
            for (let cell_id = 0; cell_id < 400; cell_id++) {
                this.cells[cell_id].prob = 0;
            }
        },
        onHaveMaze(maze: Maze) {
            maze.apply_to_subway(this.field);
            for (let cell_id = 0; cell_id < 400; cell_id++) {
                this.cells[cell_id].cellType = this.field.get_field(cell_id)
            }
        }
    },
    watch: {
        numSteps(newValue, oldValue) {
            if (newValue == 0) {
                // reset
                this.reset();
            } else if (
                this.specials[0] >= 0 &&
                this.specials[1] >= 0 &&
                newValue > 0
            ) {
                // precondition ok
                if (false && newValue > oldValue) {
                    // update -- numerically unstable?
                    this.recalculate(newValue - oldValue, oldValue);
                } else {
                    // recalculate
                    this.recalculate(newValue);
                }
            }
        },
    },
});
</script>
<style>
    h3 {
        text-align: center;
    }
    #maze {
        width: 520px;
        display: inline-block;
    }
    #drawtool {
        text-align: center;
    }
    #drawtool .cell {
        cursor: pointer;
        margin: 24px 12px;
        border: 2px solid transparent;
    }
    #drawtool .cell.selected {
        border: 2px solid black;
    }
    #numsteps {
        width: 100%;
    }
    #treasury_prob {
        float: right;
    }
    #link {
        margin-top: 24px;
    }

    #link input {
        width: 80%;
        margin-left: 1em;
    }
</style>