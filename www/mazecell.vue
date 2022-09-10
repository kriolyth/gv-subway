<script setup lang="ts">
import { computed } from 'vue';
import { Cell, Mark } from '../pkg/gv_subway'
import Rainbow from 'rainbowvis.js';
import { MarkSymbols } from './subway';

interface Props {
    id: number,
    cellType: Cell,
    mark: Mark,
    borderCell: boolean,
    cellValue?: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
    (e: 'touchcell', id: number): void
}>()

// local state
let lastEmitted = 0.;

// computed state
const cellClass = computed(() => ({
    wall: props.cellType == Cell.Wall,
    pass: props.cellType == Cell.Pass,
    inverted: (props.cellValue ?? 0) > 0.6,
    entrance: props.cellType == Cell.Entrance,
    exit: props.cellType == Cell.Exit,
}))

const symbol = computed(() => {
    const cell = props.cellType ?? Cell.Pass
    const mark = props.mark ?? Mark.None
    if (cell == Cell.Pass && props.cellValue && mark == Mark.None) {
        return props.cellValue.toFixed(3).replace(/^0/, '').substring(0, 4)
    } else {
        if (mark)
            return MarkSymbols.get(mark)
        else
            return ['#', ' ', '🚪', '🔼'][cell]
    }
})

const cellColour = computed(() => {
    if (colourScheme === undefined || props.cellType == Cell.Wall || props.cellValue == 0.) return {}
    return {
        backgroundColor: '#' + colourScheme.colourAt(100. * (props.cellValue ?? 0.))
    }
})

// local methods
function handleCellMove() {
    let nowEmitted = (new Date()).getTime()
    if (nowEmitted - lastEmitted > 50) {
        emit('touchcell', props.id)
        lastEmitted = nowEmitted
    }
}

function handleMouseMove(evt: PointerEvent) {
    if (evt.buttons == 1) {
        handleCellMove()
    }
}
function handleTouchMove(evt: TouchEvent) {
    if (evt.touches.length == 1) {
        handleCellMove()
    }
}

</script>
<template>
    <div class="cell" v-if="!props.borderCell" :class="cellClass" :style="cellColour" @pointerdown.prevent="emit('touchcell', props.id)"
        @pointermove="handleMouseMove" @touchstart.prevent="emit('touchcell', props.id)" @touchmove="handleTouchMove">{{
        symbol }}
    </div>
    <div class="cell" v-if="props.borderCell" :class="cellClass" :style="cellColour">{{ symbol }}</div>
</template>
<script lang="ts">
// one-time setup
const BluePink = new Rainbow()
BluePink.setSpectrum('ffc0e0', 'c0c0ff', '3030a0')
const colourScheme = BluePink
</script>
<style>
.cell {
    display: inline-block;
    width: 24px;
    height: 24px;
    font-size: 10pt;
    font-family: 'Courier New', Courier, monospace;
    margin: 0;
    border: 1px solid #989898;
    line-height: 24px;
    text-align: center;

    background-color: white;
    color: #545454;
    contain: strict;

    user-select: none;
}

.wall {
    background-color: #e5e5e5;
}

.cell.pass {
    font-size: 6pt;
    line-height: 26px;
}

.cell.pass.inverted {
    color: white;
}
</style>