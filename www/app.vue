<template>
    <p>Placeholder keeps this place warmer</p>
</template>
<script lang="ts"> 
import { defineComponent } from 'vue';
import { Subway } from '../pkg/gv_subway';

export default defineComponent({
    data() {
        return {
            field: new Subway(),
        }
    }
})
</script>