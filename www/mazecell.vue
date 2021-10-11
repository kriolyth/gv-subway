<template>
    <div
        class="cell"
        :class="cellClass"
        @mousedown.prevent="this.$emit('touchcell', this.id)"
        @mousemove="onMove"
    ><template v-if="cellClass.wall">#</template><template v-if="cellClass.pass">&nbsp;</template>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Cell } from '../pkg/gv_subway'

export default defineComponent({
    setup() {
        
    },
    props: {
        id: Number,
        cellType: Number as PropType<Cell>,
    },
    computed: {
        cellClass() {
            return {
                wall: this.cellType == Cell.Wall,
                pass: this.cellType == Cell.Pass,
            };
        },
    },
    data() {
        return {
            lastEmitted: (new Date()).getTime()
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
    }
    .wall {
        background-color: gray;
    }
    .pass {
        background-color: white;
    }
</style>