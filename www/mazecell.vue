<script setup lang="ts">
import { computed } from 'vue';
import { Cell, Mark } from '../pkg/gv_subway'
import Rainbow from 'rainbowvis.js';
import { MarkSymbols, stDraw } from './subway';

interface Props {
    id: number,
    cellType: Cell,
    mark: Mark,
    borderCell: boolean,
    cellValue?: number,
    outer?: boolean
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
    raisedWall: props.cellType == Cell.Pass && props.mark == Mark.RaiseWall,
    inverted: (props.cellValue ?? 0) > 0.6,
    entrance: props.cellType == Cell.Entrance,
    exit: props.cellType == Cell.Exit,
    outer: props.outer ?? false
}))

const symbol = computed(() => {
    const cell = props.cellType ?? Cell.Pass
    let mark = props.mark ?? Mark.None
    if (!stDraw.showAllMarks && [
        Mark.Entrance, Mark.Treasury, Mark.FinalBoss, Mark.OtherBoss].indexOf(mark) == -1) {
        mark = Mark.None
    }
    if (cell == Cell.Pass && props.cellValue && (mark == Mark.None || mark == Mark.RaiseWall)) {
        return props.cellValue.toFixed(3).replace(/^0/, '').substring(0, 4)
    } else {
        if (mark) {
            return MarkSymbols.get(mark)
        }
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
    if (nowEmitted - lastEmitted > 20) {
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
    <div class="cell" v-if="!props.borderCell" :class="cellClass" :style="cellColour"
        @pointerdown.prevent="handleMouseMove" @pointermove="handleMouseMove" @touchstart.prevent="handleTouchMove"
        @touchmove="handleTouchMove">{{ outer ? '·' : symbol }}
    </div>
    <div class="cell" v-if="props.borderCell" :class="cellClass" :style="cellColour">{{ outer ? '·' : symbol }}</div>
</template>
<script lang="ts">
// one-time setup
const BluePink = new Rainbow()
BluePink.setSpectrum('fff0fa', 'c0c0ff', '3030a0')
const colourScheme = BluePink
</script>
<style>
.cell {
    display: inline-block;
    width: 24px;
    height: 24px;
    font-size: 10pt;
    font-family: 'Courier New', Courier, monospace;
    margin-right: -1px;
    margin-bottom: -1px;
    border: 1px solid #989898;
    line-height: 24px;
    text-align: center;

    background-color: white;
    color: #545454;
    contain: strict;

    user-select: none;
    touch-action: manipulation;

}

.wall {
    background-color: #e0dac7;
}

.cell.pass {
    font-size: 6pt;
    line-height: 26px;
}

.cell.pass.inverted {
    color: white;
}

.cell.raisedWall {
    background-image: url(data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 64'><path d='M0 0L16 16M0 48L16 64' stroke='%23545454' stroke-width='2'/></svg>);
}

.cell.raisedWall.inverted {
    background-image: url(data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 64'><path d='M0 0L16 16M0 48L16 64' stroke='white' stroke-width='2'/></svg>);
}

.cell.outer {
    background-color: transparent;
    border-color: transparent;
    color: #989898
}
</style>