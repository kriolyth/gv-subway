(self.webpackChunkgv_subway_web=self.webpackChunkgv_subway_web||[]).push([[814],{447:(e,t,r)=>{"use strict";r.a(e,(async(n,a)=>{try{r.d(t,{Or:()=>O,Pc:()=>F,Qr:()=>Z,Uw:()=>E,Wn:()=>A,ZB:()=>z,_t:()=>B,bL:()=>S,fd:()=>L,gI:()=>P,h4:()=>D,jp:()=>C,oH:()=>U,ug:()=>W,vc:()=>k});var s=r(857);e=r.hmd(e);var l=n([s]);s=(l.then?(await l)():l)[0];const c=new Array(32).fill(void 0);c.push(void 0,null,!0,!1);let i=c.length;function o(e){i===c.length&&c.push(c.length+1);const t=i;return i=c[t],c[t]=e,t}function u(e){return c[e]}function _(e){e<36||(c[e]=i,i=e)}function d(e){const t=u(e);return _(e),t}let p=new("undefined"==typeof TextDecoder?(0,e.require)("util").TextDecoder:TextDecoder)("utf-8",{ignoreBOM:!0,fatal:!0});p.decode();let h=new Uint8Array;function f(){return 0===h.byteLength&&(h=new Uint8Array(s.memory.buffer)),h}function w(e,t){return p.decode(f().subarray(e,e+t))}function g(e,t){if(!(e instanceof t))throw new Error(`expected instance of ${t.name}`);return e.ptr}let b=0;function y(e,t){const r=t(1*e.length);return f().set(e,r/1),b=e.length,r}let m=new Int32Array;function v(){return 0===m.byteLength&&(m=new Int32Array(s.memory.buffer)),m}const k=Object.freeze({None:0,0:"None",Wall:1,1:"Wall",Entrance:2,2:"Entrance",Treasury:3,3:"Treasury",Subtreasury:4,4:"Subtreasury",FinalBoss:5,5:"FinalBoss",OtherBoss:6,6:"OtherBoss",Ladder:7,7:"Ladder",Trap:8,8:"Trap",Luck:9,9:"Luck",RaiseWall:10,10:"RaiseWall",Direction:11,11:"Direction",Scarecrow:12,12:"Scarecrow",Fountain:13,13:"Fountain"}),S=Object.freeze({Wall:0,0:"Wall",Pass:1,1:"Pass",Entrance:2,2:"Entrance",Exit:3,3:"Exit"});class T{static __wrap(e){const t=Object.create(T.prototype);return t.ptr=e,t}__destroy_into_raw(){const e=this.ptr;return this.ptr=0,e}free(){const e=this.__destroy_into_raw();s.__wbg_coordinate_free(e)}get row(){return s.__wbg_get_coordinate_row(this.ptr)>>>0}set row(e){s.__wbg_set_coordinate_row(this.ptr,e)}get col(){return s.__wbg_get_coordinate_col(this.ptr)>>>0}set col(e){s.__wbg_set_coordinate_col(this.ptr,e)}}class x{static __wrap(e){const t=Object.create(x.prototype);return t.ptr=e,t}__destroy_into_raw(){const e=this.ptr;return this.ptr=0,e}free(){const e=this.__destroy_into_raw();s.__wbg_grid_free(e)}get size(){return s.__wbg_get_coordinate_row(this.ptr)>>>0}set size(e){s.__wbg_set_coordinate_row(this.ptr,e)}get row_offset(){return s.__wbg_get_coordinate_col(this.ptr)>>>0}set row_offset(e){s.__wbg_set_coordinate_col(this.ptr,e)}get col_offset(){return s.__wbg_get_grid_col_offset(this.ptr)>>>0}set col_offset(e){s.__wbg_set_grid_col_offset(this.ptr,e)}get row_count(){return s.__wbg_get_grid_row_count(this.ptr)>>>0}set row_count(e){s.__wbg_set_grid_row_count(this.ptr,e)}get col_count(){return s.__wbg_get_grid_col_count(this.ptr)>>>0}set col_count(e){s.__wbg_set_grid_col_count(this.ptr,e)}}class L{static __wrap(e){const t=Object.create(L.prototype);return t.ptr=e,t}__destroy_into_raw(){const e=this.ptr;return this.ptr=0,e}free(){const e=this.__destroy_into_raw();s.__wbg_imageprocessor_free(e)}constructor(e,t,r){const n=s.imageprocessor_new(e,t,o(r));return L.__wrap(n)}static from_rgba_slice(e,t,r){const n=y(r,s.__wbindgen_malloc),a=b,l=s.imageprocessor_from_rgba_slice(e,t,n,a);return L.__wrap(l)}height(){return s.imageprocessor_height(this.ptr)>>>0}width(){return s.imageprocessor_width(this.ptr)>>>0}get_image_data(){return d(s.imageprocessor_get_image_data(this.ptr))}get_image_data_vector(){try{const l=s.__wbindgen_add_to_stack_pointer(-16);s.imageprocessor_get_image_data_vector(l,this.ptr);var e=v()[l/4+0],t=v()[l/4+1],r=(n=e,a=t,f().subarray(n/1,n/1+a)).slice();return s.__wbindgen_free(e,1*t),r}finally{s.__wbindgen_add_to_stack_pointer(16)}var n,a}detect_grid(){const e=s.imageprocessor_detect_grid(this.ptr);return x.__wrap(e)}detect_maze(e){g(e,x);const t=s.imageprocessor_detect_maze(this.ptr,e.ptr);return V.__wrap(t)}debug_draw(e){g(e,V),s.imageprocessor_debug_draw(this.ptr,e.ptr)}}class V{static __wrap(e){const t=Object.create(V.prototype);return t.ptr=e,t}__destroy_into_raw(){const e=this.ptr;return this.ptr=0,e}free(){const e=this.__destroy_into_raw();s.__wbg_maze_free(e)}apply_to_subway(e){g(e,Z),s.maze_apply_to_subway(this.ptr,e.ptr)}get_mark(e){return s.maze_get_mark(this.ptr,e)>>>0}is_valid(){return 0!==s.maze_is_valid(this.ptr)}}class Z{static __wrap(e){const t=Object.create(Z.prototype);return t.ptr=e,t}__destroy_into_raw(){const e=this.ptr;return this.ptr=0,e}free(){const e=this.__destroy_into_raw();s.__wbg_subway_free(e)}constructor(){const e=s.subway_new();return Z.__wrap(e)}static to_idx(e,t){return s.subway_to_idx(e,t)>>>0}static from_idx(e){const t=s.subway_from_idx(e);return T.__wrap(t)}set_field(e,t){s.subway_set_field(this.ptr,e,t)}get_field(e){return s.subway_get_field(this.ptr,e)>>>0}get_visited_probability(e){return s.subway_get_visited_probability(this.ptr,e)}init(e){s.subway_init(this.ptr,e)}step(e){s.subway_step(this.ptr,e)}reset(){s.subway_reset(this.ptr)}}function E(e){return u(e).length}function U(){return o(s.memory)}function C(e){return o(u(e).buffer)}function z(e){return o(new Uint8ClampedArray(u(e)))}function W(e){d(e)}function A(e,t,r){u(e).set(u(t),r>>>0)}function B(e){return o(new Uint8ClampedArray(e>>>0))}function P(e,t,r){return o(new Uint8ClampedArray(u(e),t>>>0,r>>>0))}function D(e,t){return o(w(e,t))}function F(e){console.log(u(e))}function O(e,t){throw new Error(w(e,t))}a()}catch(M){a(M)}}))},351:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>c});var n=r(81),a=r.n(n),s=r(645),l=r.n(s)()(a());l.push([e.id,"\nh3 {\n    text-align: center;\n}\n#maze {\n    width: 560px;\n    margin-left: auto;\n    margin-right: auto;\n}\n#calc,\n#specials {\n    margin-top: 0.5em;\n}\n#numsteps {\n    width: 100%;\n}\n#prob_section {\n    float: right;\n}\n#prob_section span {\n    margin-left: 2em;\n}\n#link {\n    margin-top: 24px;\n}\n#link input {\n    width: 80%;\n    margin-left: 1em;\n}\n",""]);const c=l},931:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>c});var n=r(81),a=r.n(n),s=r(645),l=r.n(s)()(a());l.push([e.id,"\n.drawtool {\r\n    text-align: center;\r\n    margin: 1em 0em;\r\n    float: right;\n}\n.drawtool .toolblock {\r\n    display: grid;\r\n    border: 4px solid #f4f4f4;\r\n    gap: 4px;\r\n    margin-bottom: 4px;\n}\n.drawtool .toolblock>div {\r\n    width: 24px;\r\n    height: 24px;\r\n    cursor: pointer;\r\n    margin: auto;\r\n    border: 3px solid white;\r\n    background-color: white;\r\n    user-select: none;\n}\n.drawtool .toolblock>div.selected {\r\n    border-color: #989898;\n}\r\n\r\n",""]);const c=l},73:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>c});var n=r(81),a=r.n(n),s=r(645),l=r.n(s)()(a());l.push([e.id,"\n#paste,\n    #pixels {\n        display: none;\n}\n#paste.debug,\n    #pixels.debug {\n        display: block;\n        border: 1px dotted midnightblue;\n}\n",""]);const c=l},113:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>c});var n=r(81),a=r.n(n),s=r(645),l=r.n(s)()(a());l.push([e.id,"\n#field {\n    width: 500px;\n    touch-action: manipulation;\n}\n.row {\n    cursor: pointer;\n    line-height: 10px;\n}\n",""]);const c=l},870:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>c});var n=r(81),a=r.n(n),s=r(645),l=r.n(s)()(a());l.push([e.id,"\n.cell {\n    display: inline-block;\n    width: 24px;\n    height: 24px;\n    font-size: 10pt;\n    font-family: 'Courier New', Courier, monospace;\n    margin-right: -1px;\n    margin-bottom: -1px;\n    border: 1px solid #989898;\n    line-height: 24px;\n    text-align: center;\n\n    background-color: white;\n    color: #545454;\n    contain: strict;\n\n    user-select: none;\n    touch-action: manipulation;\n}\n.wall {\n    background-color: #e0dac7;\n}\n.cell.pass {\n    font-size: 6pt;\n    line-height: 26px;\n}\n.cell.pass.inverted {\n    color: white;\n}\n.cell.outer {\n    background-color: transparent;\n    border-color: transparent;\n    color: #989898\n}\n",""]);const c=l},814:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.r(t);var a=r(963),s=r(563),l=e([s]);s=(l.then?(await l)():l)[0],(0,a.ri)(s.Z).mount("#main"),n()}catch(e){n(e)}}))},289:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{Z:()=>x});var a=r(252),s=r(262),l=r(963),c=r(577),i=r(447),o=r(439),u=r(940),_=r(893),d=r(346),p=e([o,u,_,d,i]);[o,u,_,d,i]=p.then?(await p)():p;const h=(0,a._)("h3",null,"Куда уходят бревновозы",-1),f={id:"maze"},w={id:"calc"},g=(0,a._)("br",null,null,-1),b={id:"prob_section"},y={id:"link"},m=["href"],v=(0,a.Uk)(": "),k=["value"],S={id:"specials"},T=(0,a.Uk)(" Прыгучесть "),x=(0,a.aZ)({__name:"app",setup(e){const t=(0,s.Fl)((()=>window.location.origin+window.location.pathname+"?"+(0,d.KI)())),r=(0,s.Fl)((()=>{const e=Array.from(d.wS.probes).filter((e=>-1!=d.fV.marks.indexOf(e))).sort();return 0==d.wS.numSteps?e.map((e=>({mark:e,prob:0}))):e.map((e=>({mark:e,prob:d.fV.marks.reduce(((t,r,n)=>t+(r==e?d.fV.cells[n].prob:0)),0)-(e==i.vc.Entrance?d.fV.earlyEntranceVisitors:0)})))}));function n(e){e.apply_to_subway(d.fV.field);for(let t=0;t<400;t++)d.fV.cells[t].cellType=d.fV.field.get_field(t),d.fV.marks[t]=e.get_mark(t);d.fV.outerSweep(),x()}function p(e){const t=e.currentTarget.value;(0,d.HB)(t)}function x(){0==d.wS.numSteps?d.fV.reset():d.fV.recalculate(d.wS.numSteps)}function L(e){switch(d.Sd.drawTool){case"none":return;case"wall":d.fV.setCell(e,i.bL.Wall);break;case"space":d.fV.setCell(e,i.bL.Pass);break;case"entrance":d.fV.clearByType(i.bL.Entrance),d.fV.setCell(e,i.bL.Entrance);break;case"exit_1":d.fV.clearByTypeAndMark(i.bL.Exit,i.vc.Treasury),d.fV.setCell(e,i.bL.Exit,i.vc.Treasury);break;case"exit_2":d.fV.clearByTypeAndMark(i.bL.Exit,i.vc.Subtreasury),d.fV.setCell(e,i.bL.Exit,i.vc.Subtreasury);break;case"raise":d.fV.cells[e].cellType==i.bL.Wall&&(d.fV.clearByTypeAndMark(i.bL.Pass,i.vc.RaiseWall,i.bL.Wall),d.fV.setCell(e,i.bL.Pass,i.vc.RaiseWall));break;case"final_boss":d.fV.cells[e].cellType==i.bL.Pass&&(d.fV.clearByTypeAndMark(i.bL.Pass,i.vc.FinalBoss,i.bL.Pass),d.fV.setCell(e,i.bL.Pass,i.vc.FinalBoss));break;case"other_boss":d.fV.cells[e].cellType==i.bL.Pass&&d.fV.setCell(e,i.bL.Pass,i.vc.OtherBoss);break;case"clear_mark":d.fV.marks[e]=i.vc.None,d.fV.cells[e].cellType==i.bL.Entrance&&d.fV.setCell(e,i.bL.Pass);break;default:console.log("Pressed %s at %d",d.Sd.drawTool,e)}x()}return(0,a.wF)((()=>{let e=window.location.search.substring(1);e.length>0&&(0,d.HB)(e)})),(0,a.YP)((()=>d.wS.numSteps),((e,t)=>{0==e?d.fV.reset():-1!=r.value.findIndex((e=>e.mark==i.vc.Entrance))&&e>0&&d.fV.recalculate(e)}),{deep:!0}),(e,i)=>((0,a.wg)(),(0,a.iD)(a.HY,null,[h,(0,a._)("div",f,[(0,a.Wm)(_.Z),(0,a.Wm)(o.Z,{width:20,cells:(0,s.SU)(d.fV).cells,marks:(0,s.SU)(d.fV).marks,outer:(0,s.SU)(d.fV).outer,onTouchcell:L},null,8,["cells","marks","outer"]),(0,a._)("div",w,[(0,a.wy)((0,a._)("input",{id:"numsteps",type:"range",min:"0",max:"100","onUpdate:modelValue":i[0]||(i[0]=e=>(0,s.SU)(d.wS).numSteps=e)},null,512),[[l.nr,(0,s.SU)(d.wS).numSteps]]),g,(0,a._)("span",null,"Шаг: "+(0,c.zw)((0,s.SU)(d.wS).numSteps),1),(0,a._)("span",b,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)((0,s.SU)(r),(e=>((0,a.wg)(),(0,a.iD)("span",null,(0,c.zw)(e.prob.toFixed(2))+" "+(0,c.zw)((0,s.SU)(d.z_).get(e.mark)||"?"),1)))),256))])]),(0,a._)("div",y,[(0,a._)("label",null,[(0,a._)("a",{href:(0,s.SU)(t)},"Карта",8,m),v,(0,a._)("input",{value:(0,s.SU)(d.KI)(),onChange:p},null,40,k)])]),(0,a._)("div",S,[(0,a._)("label",null,[(0,a.wy)((0,a._)("input",{type:"checkbox","onUpdate:modelValue":i[1]||(i[1]=e=>(0,s.SU)(d.fV).isJumpy=e),onChange:i[2]||(i[2]=e=>x())},null,544),[[l.e8,(0,s.SU)(d.fV).isJumpy]]),T])]),(0,a.Wm)(u.Z,{onHaveMaze:n})])],64))}});n()}catch(e){n(e)}}))},392:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{Z:()=>f});var a=r(252),s=r(577),l=r(262),c=r(447),i=r(346),o=e([i,c]);[i,c]=o.then?(await o)():o;const u={class:"drawtool"},_={class:"toolblock"},d=["onClick","onOntouchstart","title"],p={class:"toolblock"},h=["onClick","onOntouchstart","title"],f=(0,a.aZ)({__name:"drawtool",setup(e){const t={wall:"#",space:" ",entrance:i.z_.get(c.vc.Entrance),exit_1:i.z_.get(c.vc.Treasury),exit_2:i.z_.get(c.vc.Subtreasury),raise:i.z_.get(c.vc.RaiseWall)},r={final_boss:i.z_.get(c.vc.FinalBoss),other_boss:i.z_.get(c.vc.OtherBoss),clear_mark:"❌"},n=new Map([["wall","Стена"],["space","Проход"],["exit_1","Сокровищница"],["exit_2","Кладовая"],["raise","Поднять стену"],["entrance","Вход"],["final_boss","Финальный босс"],["other_boss","Путевой босс"],["clear_mark","Убрать метку"]]);function o(e){i.Sd.drawTool!=e?i.Sd.drawTool=e:i.Sd.drawTool="none"}return(e,c)=>((0,a.wg)(),(0,a.iD)("div",u,[(0,a._)("div",_,[((0,a.wg)(),(0,a.iD)(a.HY,null,(0,a.Ko)(t,((e,t)=>(0,a._)("div",{onClick:e=>o(t),onOntouchstart:e=>o(t),class:(0,s.C_)([t,{selected:(0,l.SU)(i.Sd).drawTool==t}]),title:(0,l.SU)(n).get(t)},(0,s.zw)(e),43,d))),64))]),(0,a._)("div",p,[((0,a.wg)(),(0,a.iD)(a.HY,null,(0,a.Ko)(r,((e,t)=>(0,a._)("div",{onClick:e=>o(t),onOntouchstart:e=>o(t),class:(0,s.C_)([t,{selected:(0,l.SU)(i.Sd).drawTool==t}]),title:(0,l.SU)(n).get(t)},(0,s.zw)(e),43,h))),64))])]))}});n()}catch(e){n(e)}}))},542:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{Z:()=>c});var a=r(252),s=r(447),l=e([s]);s=(l.then?(await l)():l)[0];const c=(0,a.aZ)({setup(){},data:()=>({processingState:"",debugOutput:"1"==new URLSearchParams(window.location.search.substring(1)).get("debug")}),emits:["haveMaze"],mounted(){let e=this;document.addEventListener("paste",(function(t){e.onPaste(t)})),this.$refs.imgFile.addEventListener("change",(function(t){const r=this.files;r&&0!=r.length&&e.readFile(r[0])}));let t=this.$refs.pasta,r=this.$refs.pixels;t.addEventListener("load",(function(n){let a=1;t.width>800&&(a=.5),r.width=t.width*a,r.height=t.height*a,r.getContext("2d")?.drawImage(t,0,0,r.width,r.height);let l=r.getContext("2d")?.getImageData(0,0,r.width,r.height);if(l){e.processingState="Загружаем...";try{let t=new s.fd(l.width,l.height,l.data);e.processingState="Проверяем...";let n=t.detect_maze(t.detect_grid());n.is_valid()?(e.processingState="Схема получена",e.$emit("haveMaze",n),t.debug_draw(n)):e.processingState="Загрузить схему подземки не удалось";let a=t.get_image_data(),c=new ImageData(a,r.width,r.height);r.getContext("2d")?.putImageData(c,0,0)}catch(t){alert(t),e.processingState=""}}}))},methods:{onPaste(e){if(e.clipboardData)for(var t=0;t<e.clipboardData.items.length;t++){let r=e.clipboardData.items[t];if("file"==r.kind&&r.type.match(/^image/)){let e=r.getAsFile();if(e){this.readFile(e);break}}}},readFile(e){let t=new FileReader,r=this.$refs.pasta;t.onload=function(e){console.log("Loading image"),r.src=this.result},t.readAsDataURL(e)}}});n()}catch(e){n(e)}}))},946:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{Z:()=>o});var a=r(252),s=r(262),l=r(601),c=e([l]);l=(c.then?(await c)():c)[0];const i={id:"field"},o=(0,a.aZ)({__name:"maze",props:{width:null,cells:null,marks:null,outer:null},emits:["touchcell"],setup(e,{emit:t}){const r=e,n=r.width??1,c=r.cells??[],o=(0,a.Fl)((()=>{let e=[];for(let t=0;t<c.length/n;t++)e.push(c.slice(t*n,(t+1)*n));return e}));function u(e){t("touchcell",e)}function _(e,t){return 0==e||0==t||e==n-1||t==c.length/n-1}return(t,r)=>((0,a.wg)(),(0,a.iD)("div",i,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)((0,s.SU)(o),((t,r)=>((0,a.wg)(),(0,a.iD)("div",{class:"row",key:r},[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(t,((t,c)=>((0,a.wg)(),(0,a.j4)(l.Z,{key:c+r*(0,s.SU)(n),cellValue:t.prob,cellType:t.cellType,mark:e.marks[c+r*(0,s.SU)(n)],outer:e.outer[c+r*(0,s.SU)(n)],id:c+r*(0,s.SU)(n),borderCell:_(r,c),onTouchcell:u},null,8,["cellValue","cellType","mark","outer","id","borderCell"])))),128))])))),128))]))}});n()}catch(e){n(e)}}))},521:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{Z:()=>w});var a=r(252),s=r(577),l=r(262),c=r(963),i=r(447),o=r(245),u=r.n(o),_=r(346),d=e([_,i]);[_,i]=d.then?(await d)():d;const p=["onPointerdown","onTouchstart"],h=new(u());h.setSpectrum("fff0fa","c0c0ff","3030a0");const f=h,w=(0,a.aZ)({__name:"mazecell",props:{id:null,cellType:null,mark:null,borderCell:{type:Boolean},cellValue:null,outer:{type:Boolean}},emits:["touchcell"],setup(e,{emit:t}){const r=e;let n=0;const o=(0,a.Fl)((()=>({wall:r.cellType==i.bL.Wall,pass:r.cellType==i.bL.Pass,inverted:(r.cellValue??0)>.6,entrance:r.cellType==i.bL.Entrance,exit:r.cellType==i.bL.Exit,outer:r.outer??!1}))),u=(0,a.Fl)((()=>{const e=r.cellType??i.bL.Pass,t=r.mark??i.vc.None;return e==i.bL.Pass&&r.cellValue&&t==i.vc.None?r.cellValue.toFixed(3).replace(/^0/,"").substring(0,4):t?_.z_.get(t):["#"," ","🚪","🔼"][e]})),d=(0,a.Fl)((()=>void 0===f||r.cellType==i.bL.Wall||0==r.cellValue?{}:{backgroundColor:"#"+f.colourAt(100*(r.cellValue??0))}));function h(){let e=(new Date).getTime();e-n>20&&(t("touchcell",r.id),n=e)}function w(e){1==e.buttons&&h()}function g(e){1==e.touches.length&&h()}return(t,n)=>((0,a.wg)(),(0,a.iD)(a.HY,null,[r.borderCell?(0,a.kq)("v-if",!0):((0,a.wg)(),(0,a.iD)("div",{key:0,class:(0,s.C_)(["cell",(0,l.SU)(o)]),style:(0,s.j5)((0,l.SU)(d)),onPointerdown:(0,c.iM)(w,["prevent"]),onPointermove:w,onTouchstart:(0,c.iM)(g,["prevent"]),onTouchmove:g},(0,s.zw)(e.outer?"·":(0,l.SU)(u)),47,p)),r.borderCell?((0,a.wg)(),(0,a.iD)("div",{key:1,class:(0,s.C_)(["cell",(0,l.SU)(o)]),style:(0,s.j5)((0,l.SU)(d))},(0,s.zw)(e.outer?"·":(0,l.SU)(u)),7)):(0,a.kq)("v-if",!0)],64))}});n()}catch(e){n(e)}}))},346:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{HB:()=>d,KI:()=>_,Sd:()=>o,fV:()=>i,wS:()=>u,z_:()=>c});var a=r(447),s=r(262),l=e([a]);a=(l.then?(await l)():l)[0];const c=new Map([[a.vc.None," "],[a.vc.Entrance,"🚪"],[a.vc.FinalBoss,"💀"],[a.vc.Subtreasury,"📦"],[a.vc.Treasury,"💰"],[a.vc.OtherBoss,"☠"],[a.vc.Ladder,"⬇"],[a.vc.Trap,"💩"],[a.vc.Luck,"🍀"],[a.vc.RaiseWall,"□"],[a.vc.Direction,"╬"],[a.vc.Scarecrow,"👻"]]),i=(0,s.qj)({field:new a.Qr,cells:new Array(400).fill(null).map((e=>({cellType:a.bL.Wall,prob:0}))),marks:new Array(400).fill(null).map((e=>a.vc.None)),outer:new Array(400).fill(null).map((e=>!1)),isJumpy:!1,earlyEntranceVisitors:0,recalculate(e,t=0){t||this.field.init(this.isJumpy);for(let r=1;r<=e;r++)this.field.step(r+t),r+t<=19&&(this.earlyEntranceVisitors=this.marks.reduce(((e,t,r)=>e+(t==a.vc.Entrance?this.field.get_visited_probability(r):0)),0));for(let e=0;e<400;e++)this.cells[e].cellType!=a.bL.Wall&&(this.cells[e].prob=this.field.get_visited_probability(e))},reset(){this.field.init(this.isJumpy);for(let e=0;e<400;e++)this.cells[e].prob=0},setCell(e,t,r){this.field.set_field(e,t),this.cells[e].cellType=this.field.get_field(e),this.cells[e].cellType==t&&(t==a.bL.Entrance?this.marks[e]=a.vc.Entrance:t==a.bL.Exit?this.marks[e]=r??a.vc.Treasury:t==a.bL.Pass?void 0!==r?this.marks[e]=r:[a.vc.RaiseWall,a.vc.Entrance,a.vc.Treasury,a.vc.Subtreasury].indexOf(this.marks[e])>=0&&(this.marks[e]=a.vc.None):this.marks[e]=r??a.vc.None,this.outerSweep())},clearByType(e,t=a.bL.Pass){this.cells.forEach(((r,n)=>{r.cellType==e&&(this.setCell(n,t),this.marks[n]=a.vc.None)}))},clearByTypeAndMark(e,t,r=a.bL.Pass){this.cells.forEach(((n,s)=>{n.cellType==e&&this.marks[s]==t&&(this.setCell(s,r),this.marks[s]=a.vc.None)}))},outerSweep(){const e=[379,380,381,399,0,1,19,20,21];this.outer.forEach(((t,r,n)=>n[r]=e.every((e=>this.cells[(e+r)%400].cellType==a.bL.Wall))))}}),o=(0,s.qj)({drawTool:"space"}),u=(0,s.qj)({numSteps:0,probes:new Set([a.vc.Entrance,a.vc.Treasury,a.vc.Subtreasury,a.vc.FinalBoss,a.vc.OtherBoss])});function _(){let e="",t="AAA";for(let r=20;r<=360;r+=20){let n="";for(let e=1;e<=18;e+=6){let t=32*+(i.cells[r+e].cellType!=a.bL.Wall)+16*+(i.cells[r+e+1].cellType!=a.bL.Wall)+8*+(i.cells[r+e+2].cellType!=a.bL.Wall)+4*+(i.cells[r+e+3].cellType!=a.bL.Wall)+2*+(i.cells[r+e+4].cellType!=a.bL.Wall)+ +(i.cells[r+e+5].cellType!=a.bL.Wall);n+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(t)}n==t?n="~":t=n,e+=n}return`f=${e}${"etb".split("").reduce(((e,t,r)=>{const n=i.marks.indexOf([a.vc.Entrance,a.vc.Treasury,a.vc.FinalBoss][r]);return-1==n?e:e+`&${t}=${n}`}),"")}`}function d(e){try{const t=new URLSearchParams(e),r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";let n="AAA",s=t.get("f")||"";for(let e=20;e<=360;e+=20){let t="";"~"==s.charAt(0)?(t=n,s=s.substring(1)):(t=s.substring(0,3),n=t,s=s.substring(3));for(let n=1;n<=18;n+=6){let s=r.indexOf(t.charAt(0));t=t.substring(1);for(let t=0;t<6;t++)i.field.set_field(e+n+t,s&1<<5-t?a.bL.Pass:a.bL.Wall)}}[a.vc.Entrance,a.vc.Treasury,a.vc.FinalBoss].forEach(((e,r)=>{const n=parseInt(t.get("etb".charAt(r))||"-1");n>=0&&(i.marks[n]=e,e==a.vc.Entrance?i.field.set_field(n,a.bL.Entrance):e==a.vc.Treasury&&i.field.set_field(n,a.bL.Exit))}));for(let e=0;e<400;e++)i.cells[e].cellType=i.field.get_field(e),i.cells[e].prob=0;u.numSteps>0&&i.recalculate(u.numSteps)}catch(e){console.log(e)}}n()}catch(p){n(p)}}))},563:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{Z:()=>l});var a=r(343),s=(r(323),e([a]));const l=(a=(s.then?(await s)():s)[0]).Z;n()}catch(e){n(e)}}))},893:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{Z:()=>l});var a=r(713),s=(r(273),e([a]));const l=(a=(s.then?(await s)():s)[0]).Z;n()}catch(e){n(e)}}))},940:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{Z:()=>i});var a=r(499),s=r(468),l=(r(208),r(744)),c=e([s]);s=(c.then?(await c)():c)[0];const i=(0,l.Z)(s.Z,[["render",a.s]]);n()}catch(e){n(e)}}))},439:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{Z:()=>l});var a=r(314),s=(r(788),e([a]));const l=(a=(s.then?(await s)():s)[0]).Z;n()}catch(e){n(e)}}))},601:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{Z:()=>l});var a=r(970),s=(r(616),e([a]));const l=(a=(s.then?(await s)():s)[0]).Z;n()}catch(e){n(e)}}))},343:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{Z:()=>a.Z});var a=r(289),s=e([a]);a=(s.then?(await s)():s)[0],n()}catch(e){n(e)}}))},713:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{Z:()=>a.Z});var a=r(392),s=e([a]);a=(s.then?(await s)():s)[0],n()}catch(e){n(e)}}))},468:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{Z:()=>a.Z});var a=r(542),s=e([a]);a=(s.then?(await s)():s)[0],n()}catch(e){n(e)}}))},314:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{Z:()=>a.Z});var a=r(946),s=e([a]);a=(s.then?(await s)():s)[0],n()}catch(e){n(e)}}))},970:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{Z:()=>a.Z});var a=r(521),s=e([a]);a=(s.then?(await s)():s)[0],n()}catch(e){n(e)}}))},499:(e,t,r)=>{"use strict";r.d(t,{s:()=>c});var n=r(252),a=r(577);const s=(0,n.Uk)(" Вставьте изображение или выберите файл для загрузки: "),l={type:"file",ref:"imgFile"};function c(e,t,r,c,i,o){return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n._)("p",null,[s,(0,n._)("input",l,null,512)]),(0,n._)("p",null,(0,a.zw)(e.processingState),1),(0,n._)("img",{id:"paste",class:(0,a.C_)({debug:e.debugOutput}),ref:"pasta"},null,2),(0,n._)("canvas",{id:"pixels",class:(0,a.C_)({debug:e.debugOutput}),ref:"pixels"},null,2)],64)}},323:(e,t,r)=>{"use strict";r(928)},273:(e,t,r)=>{"use strict";r(762)},208:(e,t,r)=>{"use strict";r(557)},788:(e,t,r)=>{"use strict";r(638)},616:(e,t,r)=>{"use strict";r(991)},928:(e,t,r)=>{var n=r(351);n.__esModule&&(n=n.default),"string"==typeof n&&(n=[[e.id,n,""]]),n.locals&&(e.exports=n.locals),(0,r(611).Z)("6c811c1e",n,!1,{})},762:(e,t,r)=>{var n=r(931);n.__esModule&&(n=n.default),"string"==typeof n&&(n=[[e.id,n,""]]),n.locals&&(e.exports=n.locals),(0,r(611).Z)("3bc90d4f",n,!1,{})},557:(e,t,r)=>{var n=r(73);n.__esModule&&(n=n.default),"string"==typeof n&&(n=[[e.id,n,""]]),n.locals&&(e.exports=n.locals),(0,r(611).Z)("1438e6d2",n,!1,{})},638:(e,t,r)=>{var n=r(113);n.__esModule&&(n=n.default),"string"==typeof n&&(n=[[e.id,n,""]]),n.locals&&(e.exports=n.locals),(0,r(611).Z)("149b9fce",n,!1,{})},991:(e,t,r)=>{var n=r(870);n.__esModule&&(n=n.default),"string"==typeof n&&(n=[[e.id,n,""]]),n.locals&&(e.exports=n.locals),(0,r(611).Z)("7eca57fa",n,!1,{})},857:(e,t,r)=>{"use strict";r.a(e,(async(n,a)=>{try{var s,l=n([s=r(447)]),[s]=l.then?(await l)():l;await r.v(t,e.id,"aab502c287a156619360",{"./gv_subway_bg.js":{__wbg_length_33d46cc3e26dc3b6:s.Uw,__wbindgen_memory:s.oH,__wbg_buffer_3f3d764d4747d564:s.jp,__wbg_new_35b27ca169d8aa0c:s.ZB,__wbindgen_object_drop_ref:s.ug,__wbg_set_c53f906c51f7a99d:s.Wn,__wbg_newwithlength_004eb2dc1abcb5fd:s._t,__wbg_newwithbyteoffsetandlength_b79525f5b383cdb2:s.gI,__wbindgen_string_new:s.h4,__wbg_log_4b5638ad60bdc54a:s.Pc,__wbindgen_throw:s.Or}}),a()}catch(e){a(e)}}),1)}}]);