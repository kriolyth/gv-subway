<template>
    <div
        class="cell"
        :class="cellClass"
        :style="cellColour"
        @mousedown.prevent="this.$emit('touchcell', this.id)"
        @mousemove="onMove"
    >{{ symbol }}</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Cell } from '../pkg/gv_subway'
import Rainbow from 'rainbowvis.js';

export default defineComponent({
    setup() {
        
    },
    props: {
        id: Number,
        cellType: Number,
        colourScheme: { type: Number, default: -1 },
        colourValue: Number
    },
    computed: {
        cellClass() {
            return {
                wall: this.cellType == Cell.Wall,
                pass: this.cellType == Cell.Pass,
                entrance: this.cellType == Cell.Entrance,
                treasury: this.cellType == Cell.Treasury,
                subtreasury: this.cellType == Cell.Subtreasury,
            };
        },
        symbol() {
            const cell = this.$props.cellType ?? 1
            return ['#', ' ', '🚪', '💰', '📦'][cell]
        },
        cellColour() {
            if (this.$props.colourScheme < 0 || this.cellType == Cell.Wall || this.colourValue == 0.) return {}
            return {
                backgroundColor: '#' + this.colourSchemes[this.$props.colourScheme].colourAt(100. * (this.colourValue ?? 0.))
            }
        }
    },
    data() {
        const BluePink = new Rainbow()
        BluePink.setSpectrum ('ffc0e0', 'c0c0ff', '3030a0')

        return {
            lastEmitted: (new Date()).getTime(),
            colourSchemes: [ BluePink ]
        }
    },
    emits: ['touchcell'],
    methods: {
        onMove(evt: MouseEvent) {
            let nowEmitted = (new Date()).getTime()
            if (evt.buttons && (nowEmitted - this.lastEmitted > 50)) {
                this.$emit('touchcell', this.id)
                this.lastEmitted = nowEmitted
            }
        }
    }

})
</script>
<style>
    .cell {
        display: inline-block;
        width: 24px;
        height: 24px;
        font-size: 10pt;
        font-family: 'Courier New', Courier, monospace;
        margin: 0;
        border: 1px solid silver;
        line-height: 24px;
        text-align: center;

        background-color: white;
    }
    .wall {
        background-color: gray;
    }
</style>