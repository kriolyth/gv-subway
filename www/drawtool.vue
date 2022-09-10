<script setup lang="ts">
import { stDraw } from './subway'


const BRICKS = {
    'wall': '#',
    'space': ' ',
    'entrance': '🚪',
    'raise': '□'
}
const EXIT = '💰'

const MARKS = {
    'final': '💀',
    'mid': '☠'
}

function setActive(tool: string) {
    stDraw.drawTool = tool
}

</script>
<template>
    <div class="drawtool">
        <p class="toolhead">Кирпичики</p>
        <div class="toolblock">
            <div v-for="(brick, tool) of BRICKS" @click="setActive(tool)"
                :class="[tool, {selected: stDraw.drawTool == tool}]">{{brick}}</div>
            <div v-for="tool in ['exit_1', 'exit_2']" @click="setActive(tool)"
                :class="[tool, {selected: stDraw.drawTool == tool}]">{{EXIT}}</div>
        </div>
        <p class="toolhead">Метки</p>
        <div class="toolblock">
            <div v-for="(mark, tool) of MARKS" @click="setActive(tool)" :class="[tool, {selected: stDraw.drawTool == tool}]">
                {{mark}}</div>
        </div>
    </div>
</template>
<style>
.drawtool {
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: minmax(32px, auto);
}

.drawtool .toolhead {
    grid-row: 1;
}

.drawtool .toolblock {
    grid-row: 2;
}

.drawtool .toolblock>div {
    display: inline-block;
    width: 24px;
    cursor: pointer;
    margin: 24px 12px;
    border: 2px solid transparent;
}

.drawtool .selected {
    border: 2px solid black;
}

</style>