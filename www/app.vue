<script setup lang="ts">
import { onBeforeMount, watch } from "vue";
import { Cell, Mark, Maze, get_version, get_cookie_line } from "../pkg/gv_subway";
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
        return sortedProbes.map(mark => ({ mark, prob: 0. }));
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
    let ver: string = get_version();
    let verSpan = document.getElementById("ver");
    if (verSpan) { verSpan.innerText = "Версия " + ver; }

    let cookie: string = get_cookie_line();
    let cookieSpan = document.getElementById("witzy");
    if (cookieSpan) { cookieSpan.innerText = cookie; }
})

function onHaveMaze(maze: Maze) {
    maze.apply_to_subway(stField.field);
    for (let cell_id = 0; cell_id < 400; cell_id++) {
        stField.cells[cell_id].cellType = stField.field.get_field(cell_id);
        stField.marks[cell_id] = maze.get_mark(cell_id);
    }
    stField.isSecondFloor = stField.field.is_second_floor();
    stField.outerSweep();
    updateProbabilities();
}

function onMapLinkChange(evt: Event) {
    const request = (evt.currentTarget as HTMLInputElement).value;
    parseMap(request);
}

function updateFloor() {
    let entranceCell = stField.cells.findIndex(c => c.cellType == Cell.Entrance);
    if (entranceCell >= 0) {
        if (stField.isSecondFloor) {
            stField.clearByTypeAndMark(Cell.Pass, Mark.Ladder);
            stField.setCell(entranceCell, Cell.Entrance, Mark.Ladder);
        } else {
            stField.setCell(entranceCell, Cell.Entrance, Mark.Entrance);
        }
    }
    updateProbabilities();
}

function updateProbabilities() {
    if (stCalc.numSteps == 0) {
        stField.reset()
    } else {
        stField.recalculate(stCalc.numSteps)
    }
}

function applyTool(cellId: number, withMove: boolean) {
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
            if (!withMove && stField.cells[cellId].cellType == Cell.Wall) {
                stField.clearByTypeAndMark(Cell.Pass, Mark.RaiseWall, Cell.Wall)
                stField.setCell(cellId, Cell.Pass, Mark.RaiseWall)
            } else if (!withMove && stField.cells[cellId].cellType == Cell.Pass && stField.marks[cellId] == Mark.RaiseWall) {
                stField.clearByTypeAndMark(Cell.Pass, Mark.RaiseWall, Cell.Wall)
                stField.setCell(cellId, Cell.Wall, Mark.None)
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
            if (!withMove && stField.cells[cellId].cellType == Cell.Pass) {
                stField.setCell(cellId, Cell.Pass, Mark.OtherBoss)
            }
            break;
        case 'clear_mark':
            // clear existing mark
            stField.marks[cellId] = Mark.None
            if (stField.cells[cellId].cellType == Cell.Entrance) {
                stField.setCell(cellId, Cell.Pass)
            }
            // a subtle trick: you can set an exit and clear its mark,
            // so you can have more than two exits. De-marked exits are shown
            // with a special "up" triangle.
            break;
        default:
            console.log('Pressed %s at %d', stDraw.drawTool, cellId)
    }
    updateProbabilities()
}

function touchCell(cellId: number) {
    applyTool(cellId, false);
}
function moveCell(cellId: number) {
    applyTool(cellId, true);
}

watch(() => stCalc.numSteps, (newValue, oldValue) => {
    if (newValue == 0) {
        // reset
        stField.reset();
    } else if (stField.hasEntrance() && newValue > 0) {
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
        <drawtool></drawtool>
        <maze :width="20" :cells="stField.cells" :marks="stField.marks" :outer="stField.outer" @touch="touchCell" @move="moveCell">
        </maze>
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
            <input type="checkbox" id="jumpy" class="tgl" v-model="stField.isJumpy" @change="updateProbabilities()" />
            <label for="jumpy" class="tgl-act">Прыгучесть: <span class="value" data-on="вкл" data-off="выкл"></span></label>
            <input type="checkbox" id="secunda" class="tgl" v-model="stField.isSecondFloor" @change="updateFloor()" />
            <label for="secunda" class="tgl-act">Этаж: <span class="value" data-on="второй" data-off="первый"></span></label>
        </div>
        <imagePaste @haveMaze="onHaveMaze"></imagePaste>
    </div>
</template>
<style>
h3 {
    text-align: center;
}

#maze {
    width: 560px;
    margin-left: auto;
    margin-right: auto;
}

#calc {
    margin-top: 0.5em;
}
#specials {
    margin-top: 1em;
    display: grid;
    grid-template-columns: repeat(3, 12em);
    justify-items: start;
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

.tgl {
    display: none;
}

.tgl-act {
    border: 1px solid silver;
    padding: .25em .5em;
}
.tgl-act ~ .tgl-act {
    margin: 0em 1em;
}
.tgl:checked + .tgl-act {
    background-color: mediumspringgreen;
}
.tgl:checked + .tgl-act > .value::after {
    content: attr(data-on);
}
.tgl:not(:checked) + .tgl-act > .value::after {
    content: attr(data-off);
}

.tgl + .tgl-act::after, .tgl + .tgl-act::before {
    content: "";
    border: 1px solid black;
    padding: 0.5em 0.24em;
    position: relative;
    visibility: hidden;
    background: silver;
}
.tgl:checked + .tgl-act::after {
    right: -0.75em;
    visibility: visible;
}
.tgl:not(:checked) + .tgl-act::before {
    left: -0.75em;
    visibility: visible;
}

</style>