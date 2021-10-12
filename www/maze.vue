<template>
    <div class="row" v-for="(row, rowIndex) in cellRows" :key="rowIndex">
        <mazecell
            :colourScheme="0"
            :colourValue="cell.prob"
            :cellType="cell.cellType"
            :id="index + rowIndex * this.rowWidth"
            v-for="(cell, index) in row"
            :key="index + rowIndex * this.rowWidth"
            @touchcell="forwardTouchCell"
        ></mazecell>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Cell } from "../pkg/gv_subway";
import mazecell from "./mazecell.vue";

interface MazeCell {
    id: Number;
    cellType: Cell;
    prob: Number;
}

export default defineComponent({
    components: { mazecell },
    props: {
        width: Number,
        cells: Array as PropType<Array<MazeCell>>
    },
    data() {
        return {
            rowWidth: this.$props.width ?? 1,
            mazeCells: this.$props.cells ?? []
        }
    },
    emits: ['touchcell'],
    setup() {},
    computed: {
        cellRows() {
            let result = [];
            for (let row = 0; row < this.mazeCells.length / this.rowWidth; row++) {
                result.push(this.mazeCells.slice(row * this.rowWidth, (row+1)*this.rowWidth))
            }
            return result
        }
    },
    methods: {
        forwardTouchCell(cell_id: number) {
            this.$emit("touchcell", cell_id)
        }
    }
});
</script>
<style>
    .row {
        cursor: pointer;
    }
</style>