<template>
    <p>Placeholder keeps this place warmer</p>
    <maze :width="20" :cells="cells" @touchcell="touchCell"></maze>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Subway, Cell } from "../pkg/gv_subway";
import maze from "./maze.vue";

export default defineComponent({
    components: { maze },
    data() {
        let wall_cell = { cellType: Cell.Wall, prob: 0 };
        let cells = new Array(400);
        for (let i = 0; i < 400; i++) {
            cells[i] = { ...wall_cell };
        }
        return {
            field: new Subway(),
            cells,
        };
    },
    methods: {
        touchCell(cell_id: number) {
            if (this.cells[cell_id].cellType != Cell.Pass) {
                this.field.set_field(cell_id, Cell.Pass);
                this.cells[cell_id].cellType = this.field.get_field(cell_id);
            }
        },
    },
});
</script>