<script setup lang="ts">
import { onBeforeMount, watch } from "vue";
import { Cell, Mark, Maze } from "../pkg/gv_subway";
import maze from "./maze.vue";
import imagePaste from "./image-paste.vue";
import drawtool from "./drawtool.vue"

import { stCalc, stField, stDraw, encodeMap, MarkSymbols, parseMap } from "./subway";
import { computed } from "@vue/reactivity";

const mapUrl = computed(() => {
    return (
        window.location.origin +
        window.location.pathname +
        "?" +
        encodeMap()
    )
});

const probes = computed(() => {
    const sortedProbes = Array.from(stCalc.probes).filter(m => stField.marks.indexOf(m) != -1).sort()
    if (stCalc.numSteps == 0) {
        return sortedProbes.map(mark => ({mark, prob: 0.}));
    }
    const probs = sortedProbes.map(mark => {
        return {
            mark,
            prob: stField.marks.reduce(
                (acc, m, fieldIdx) => acc + (m == mark ? stField.cells[fieldIdx].prob : 0.),
                0.) - (mark == Mark.Entrance ? stField.earlyEntranceVisitors : 0.)
        }
    })
    return probs
})

onBeforeMount(() => {
    let querystring = window.location.search.substring(1);
    if (querystring.length > 0) {
        parseMap(querystring);
    }
})

function onHaveMaze(maze: Maze) {
    maze.apply_to_subway(stField.field);
    for (let cell_id = 0; cell_id < 400; cell_id++) {
        stField.cells[cell_id].cellType = stField.field.get_field(cell_id);
        stField.marks[cell_id] = maze.get_mark(cell_id);
    }
    updateProbabilities();
}

function onMapLinkChange(evt: Event) {
    const request = (evt.currentTarget as HTMLInputElement).value;
    parseMap(request);
}

function updateProbabilities() {
    if (stCalc.numSteps == 0) {
        stField.reset()
    } else {
        stField.recalculate(stCalc.numSteps)
    }
}

function touchCell(cellId: number) {
    // a giant switch for different tools
    switch (stDraw.drawTool) {
        case 'none': return;
        case 'wall':
            // set wall celltype, remove marks
            stField.setCell(cellId, Cell.Wall)
            break;
        case 'space':
            // set space cell type, remove marks
            stField.setCell(cellId, Cell.Pass)
            break;
        case 'entrance':
            // set unique cell, update marks
            stField.clearByType(Cell.Entrance)
            stField.setCell(cellId, Cell.Entrance)
            break;
        case 'exit_1':
            // set treasury cell type, set mark "treasury"
            stField.clearByTypeAndMark(Cell.Exit, Mark.Treasury)
            stField.setCell(cellId, Cell.Exit, Mark.Treasury)
            break;
        case 'exit_2':
            // set treasury cell type, set mark "subtreasury" (or any suitable)
            stField.clearByTypeAndMark(Cell.Exit, Mark.Subtreasury)
            stField.setCell(cellId, Cell.Exit, Mark.Subtreasury)
            break;
        case 'raise':
            // set unique mark on a wall
            if (stField.cells[cellId].cellType == Cell.Wall) {
                stField.clearByTypeAndMark(Cell.Pass, Mark.RaiseWall, Cell.Wall)
                stField.setCell(cellId, Cell.Pass, Mark.RaiseWall)
            }
            break;
        case 'final_boss':
            // set unique boss mark
            if (stField.cells[cellId].cellType == Cell.Pass) {
                stField.clearByTypeAndMark(Cell.Pass, Mark.FinalBoss, Cell.Pass)
                stField.setCell(cellId, Cell.Pass, Mark.FinalBoss)
            }
            break;
        case 'other_boss':
            // set non-unique boss mark
            if (stField.cells[cellId].cellType == Cell.Pass) {
                stField.setCell(cellId, Cell.Pass, Mark.OtherBoss)
            }
            break;
        case 'clear_mark':
            // clear existing mark
            stField.marks[cellId] = Mark.None
            break;
        default:
            console.log('Pressed %s at %d', stDraw.drawTool, cellId)
    }
    updateProbabilities()
}

watch(() => stCalc.numSteps, (newValue, oldValue) => {
    if (newValue == 0) {
        // reset
        stField.reset();
    } else if (probes.value.findIndex(v => v.mark == Mark.Entrance) != -1 && newValue > 0) {
        // precondition ok
        if (false && newValue > oldValue) {
            // update -- numerically unstable?
            stField.recalculate(newValue - oldValue, oldValue);
        } else {
            // recalculate
            stField.recalculate(newValue);
        }
    }
}, { deep: true })

</script>
<template>
    <h3>Куда уходят бревновозы</h3>
    <div id="maze">
        <maze :width="20" :cells="stField.cells" :marks="stField.marks" @touchcell="touchCell"></maze>
        <drawtool></drawtool>
        <div id="calc">
            <input id="numsteps" type="range" min="0" max="100" v-model="stCalc.numSteps" />
            <br />
            <span>Шаг: {{ stCalc.numSteps }}</span>
            <span id="prob_section">
                <span v-for="probe of probes">{{ probe.prob.toFixed(2) }} {{MarkSymbols.get(probe.mark) || '?'}}</span>
            </span>
        </div>
        <div id="link">
            <label>
                <a :href="mapUrl">Карта</a>:
                <input :value="encodeMap()" @change="onMapLinkChange" />
            </label>
        </div>
        <div id="specials">
            <label>
                <input type="checkbox" v-model="stField.isJumpy" @change="updateProbabilities()" />
                Прыгучесть
            </label>
        </div>
    </div>
    <imagePaste @haveMaze="onHaveMaze"></imagePaste>
</template>
<style>
h3 {
    text-align: center;
}

#maze {
    width: 520px;
    margin-left: auto;
    margin-right: auto;
}

#numsteps {
    width: 100%;
}

#prob_section {
    float: right;
}

#prob_section span {
    margin-left: 2em;
}

#link {
    margin-top: 24px;
}

#link input {
    width: 80%;
    margin-left: 1em;
}
</style>