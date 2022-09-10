<script setup lang="ts">
import { computed, provide } from 'vue';
// import Rainbow from 'rainbowvis.js';
import mazecell from "./mazecell.vue";

interface CellProps {
    cellType: number,
    prob?: number
}

interface Maze {
    width: number;
    cells: CellProps[];
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

// provide colour scheme for maze cells to use
// const BluePink = new Rainbow()
// BluePink.setSpectrum('ffc0e0', 'c0c0ff', '3030a0')
// provide('colourScheme', BluePink)

</script>

<template>
    <div class="row" v-for="(row, rowIndex) in cellRows" :key="rowIndex">
        <mazecell :cellValue="cell.prob" :cellType="cell.cellType"
            :id="index + rowIndex * rowWidth" v-for="(cell, index) in row" :key="index + rowIndex * rowWidth"
            @touchcell="reemitTouchCell"></mazecell>
    </div>
</template>
<style>
.row {
    cursor: pointer;
    line-height: 10px;
}
</style>