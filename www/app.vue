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
        };
    },
    methods: {
        touchCell(cell_id: number) {
            if (this.cells[cell_id].cellType != this.drawMode) {
                this.field.set_field(cell_id, this.drawMode);
                this.cells[cell_id].cellType = this.field.get_field(cell_id);

                // there can be at most one of each special cell types
                const specialCell = [
                    Cell.Entrance,
                    Cell.Treasury,
                    Cell.Subtreasury,
                ].indexOf(this.drawMode);
                if (specialCell >= 0) {
                    const specialId = this.specials[specialCell];
                    if (specialId >= 0) {
                        // set previous to "pass" 
                        this.field.set_field(specialId, Cell.Pass);
                        this.cells[specialId].cellType =
                            this.field.get_field(specialId);
                    }
                    // update position of the new special cell
                    this.specials[specialCell] = cell_id;
                }
            }
        },
        selectTool(toolId: number) {
            this.drawMode = toolId;
        },
    },
});
</script>
<style>
    #maze {
        width: 520px;
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
</style>