<script setup lang="ts">
import { ref, computed, inject } from 'vue';
import { Cell } from '../pkg/gv_subway'
import Rainbow from 'rainbowvis.js';

interface Props {
    id: number,
    cellType: number,
    cellValue?: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
    (e: 'touchcell', id: number): void
}>()

// injected props
// const colourScheme = inject('colourScheme') || new Rainbow();

// local state
const lastEmitted = ref(0);
// const BluePink = new Rainbow()
// BluePink.setSpectrum('ffc0e0', 'c0c0ff', '3030a0')

// computed state
const cellClass = computed(() => ({
    wall: props.cellType == Cell.Wall,
    pass: props.cellType == Cell.Pass,
    inverted: (props.cellValue ?? 0) > 0.6,
    entrance: props.cellType == Cell.Entrance,
    exit: props.cellType == Cell.Exit,
}))

const symbol = computed(() => {
    const cell = props.cellType ?? 1
    if (cell == 1 && props.cellValue) {
        return props.cellValue.toFixed(3).replace(/^0/, '').substr(0, 4)
    } else {
        return ['#', ' ', '🚪', '💰', '📦', '💀'][cell]
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
    if (nowEmitted - lastEmitted.value > 50) {
        emit('touchcell', props.id)
        lastEmitted.value = nowEmitted
    }
}

function handleMouseMove(evt: MouseEvent) {
    if (evt.buttons) {
        handleCellMove()
    }
}
function handleTouchMove(evt: TouchEvent) {
    if (evt.touches.length) {
        handleCellMove()
    }
}

</script>
<template>
    <div class="cell" :class="cellClass" :style="cellColour" @mousedown.prevent="emit('touchcell', props.id)"
        @mousemove="handleMouseMove" @touchstart.prevent="emit('touchcell', props.id)" @touchmove="handleTouchMove">{{
        symbol }}
    </div>
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
    color: #707070;
    contain: strict;
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