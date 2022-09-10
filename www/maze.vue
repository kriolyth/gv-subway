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
    outer: boolean[];
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

function isBorderCell(rowIndex: number, colIndex: number) {
    return (rowIndex == 0 || colIndex == 0 || rowIndex == (rowWidth - 1) || colIndex == (mazeCells.length / rowWidth - 1));
}
</script>

<template>
    <div id="field">
        <div class="row" v-for="(row, rowIndex) in cellRows" :key="rowIndex">
            <mazecell v-for="(cell, index) in row" :key="index + rowIndex * rowWidth"
                :cellValue="cell.prob" :cellType="cell.cellType"
                :mark="marks[index + rowIndex * rowWidth]" 
                :outer="outer[index + rowIndex * rowWidth]"
                :id="index + rowIndex * rowWidth"
                :borderCell="isBorderCell(rowIndex, index)" @touchcell="reemitTouchCell"></mazecell>
        </div>
    </div>
</template>
<style>
#field {
    width: 500px;
}

.row {
    cursor: pointer;
    line-height: 10px;
}
</style>