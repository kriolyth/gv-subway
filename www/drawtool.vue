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
        <div class="toolblock">
            <div v-for="(brick, tool) of BRICKS" @pointerdown="setActive(tool)" @ontouchstart="setActive(tool)"
                :class="[tool, {selected: stDraw.drawTool == tool}]">{{brick}}</div>
        </div>
        <div class="toolblock">
            <div v-for="(mark, tool) of MARKS" @click="setActive(tool)" @ontouchstart="setActive(tool)"
                :class="[tool, {selected: stDraw.drawTool == tool}]">{{mark}}</div>
        </div>
    </div>
</template>
<style>
.drawtool {
    text-align: center;
    margin: 1em 0em;
    float: right;
}

.drawtool .toolblock {
    display: grid;
    border: 4px solid #f4f4f4;
    gap: 4px;
    margin-bottom: 4px;
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