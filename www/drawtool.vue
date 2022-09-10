<script setup lang="ts">
import { Mark } from 'gv_subway';
import { MarkSymbols, stDraw } from './subway'


const BRICKS = {
    'wall': '#',
    'space': ' ',
    'exit_1': MarkSymbols.get(Mark.Treasury),
    'raise': MarkSymbols.get(Mark.RaiseWall),
    'entrance': MarkSymbols.get(Mark.Entrance),
    'exit_2': MarkSymbols.get(Mark.Subtreasury),
}
const MARKS = {
    'final_boss': MarkSymbols.get(Mark.FinalBoss),
    'other_boss': MarkSymbols.get(Mark.OtherBoss),
    'clear_mark': '❌',
}

function setActive(tool: string) {
    stDraw.drawTool = tool
}

</script>
<template>
    <div class="drawtool">
        <p class="toolhead">Кирпичики</p>
        <div class="toolblock">
            <div v-for="(brick, tool) of BRICKS" @pointerdown="setActive(tool)" @ontouchstart="setActive(tool)"
                :class="[tool, {selected: stDraw.drawTool == tool}]">{{brick}}</div>
        </div>
        <p class="toolhead">Метки</p>
        <div class="toolblock">
            <div v-for="(mark, tool) of MARKS" @click="setActive(tool)" @ontouchstart="setActive(tool)"
                :class="[tool, {selected: stDraw.drawTool == tool}]">{{mark}}</div>
        </div>
    </div>
</template>
<style>
.drawtool {
    text-align: center;
    display: grid;
    grid-template-columns: repeat(2,1fr);
    grid-auto-rows: minmax(32px, auto);
    column-gap: 2em;
    margin: 1em 0em;
}

.drawtool .toolhead {
    grid-row: 1;
    margin: 0px;
}

.drawtool .toolblock {
    grid-row: 2;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    margin: auto;
    background-color: #f4f4f4;
    border: 4px solid #f4f4f4;
    gap: 4px;
}

.drawtool .toolblock>div {
    width: 24px;
    height: 24px;
    cursor: pointer;
    margin: auto;
    border: 3px solid white;
    background-color: white;
    user-select: none;
}

.drawtool .toolblock>div.selected {
    border-color: #989898;
}

</style>