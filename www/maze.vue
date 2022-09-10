<script setup lang="ts">
import { Cell, Mark } from 'gv_subway';
import { computed } from 'vue';
import mazecell from "./mazecell.vue";

interface CellProps {
    cellType: Cell,
    prob?: number
}

interface Maze {
    width: number;
    cells: CellProps[];
    marks: Mark[];
}

const props = defineProps<Maze>()

const rowWidth = props.width ?? 1;
const mazeCells = props.cells ?? [];
const cellRows = computed(() => {
    let result = [];
    for (let row = 0; row < mazeCells.length / rowWidth; row++) {
        result.push(mazeCells.slice(row * rowWidth, (row + 1) * rowWidth))
    }
    return result
})

const emit = defineEmits<{
    (e: 'touchcell', id: number): void
}>()

function reemitTouchCell(id: number) {
    emit("touchcell", id)
}
</script>

<template>
    <div class="row" v-for="rowIndex in (mazeCells.length / rowWidth)" :key="rowIndex">
        <mazecell v-for="colIndex in rowWidth"
            :cellValue="cells[colIndex-1 + (rowIndex-1) * rowWidth].prob"
            :cellType="cells[colIndex-1 + (rowIndex-1) * rowWidth].cellType"
            :mark="marks[colIndex-1 + (rowIndex-1) * rowWidth]"
            :id="colIndex-1 + (rowIndex-1) * rowWidth" 
            :key="colIndex + rowIndex * rowWidth"
            @touchcell="reemitTouchCell"></mazecell>
    </div>
    <!-- <div class="row" v-for="(row, rowIndex) in cellRows" :key="rowIndex">
        <mazecell :cellValue="cell.prob" :cellType="cell.cellType" :mark="stField.marks[index + rowIndex * rowWidth]"
            :id="index + rowIndex * rowWidth" v-for="(cell, index) in row" :key="index + rowIndex * rowWidth"
            @touchcell="reemitTouchCell"></mazecell>
    </div> -->
</template>
<style>
.row {
    cursor: pointer;
    line-height: 10px;
}
</style>