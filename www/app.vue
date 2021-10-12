<template>
    <p>Placeholder keeps this place warmer</p>
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
                ></mazecell>
            </div>
        </div>
        <div id="calc">
            <input
                id="numsteps"
                type="range"
                min="0"
                max="100"
                v-model.number="numSteps"
            />
            <br />Steps: {{ numSteps }}
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Subway, Cell } from "../pkg/gv_subway";
import maze from "./maze.vue";
import mazecell from "./mazecell.vue";

export default defineComponent({
    components: { maze, mazecell },
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
    emits: ["recalculate"],
    methods: {
        touchCell(cell_id: number) {
            if (this.cells[cell_id].cellType != this.drawMode) {
                // if there was a special cell here, remove it anyway
                if (this.specials.indexOf(cell_id) >= 0) {
                    this.specials[this.specials.indexOf(cell_id)] = -1
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
            if (!updateFrom)
                this.field.init();
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
            for (let cell_id = 0; cell_id < 400; cell_id++) {
                if (this.cells[cell_id].cellType != Cell.Wall)
                    this.cells[cell_id].prob = 0;
            }
        },
    },
    watch: {
        numSteps(newValue, oldValue) {
            if (newValue == 0) {
                // reset
                this.reset();
            } else if (
                this.specials[0] >= 0 &&
                this.specials[1] >= 0 &&
                this.numSteps > 0
            ) {
                // precondition ok
                if (newValue > oldValue) {
                    // update
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
    #maze {
        width: 520px;
        display: inline-block;
    }
    #calc {
        margin-top: 24px;
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
</style>