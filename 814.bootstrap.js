(self.webpackChunkgv_subway_web=self.webpackChunkgv_subway_web||[]).push([[814],{447:(e,t,r)=>{"use strict";r.a(e,(async(n,a)=>{try{r.d(t,{Kj:()=>A,Or:()=>P,Qr:()=>S,Tw:()=>C,aj:()=>T,bL:()=>g,eA:()=>L,eM:()=>V,fd:()=>v,h4:()=>z,if:()=>U,mZ:()=>E,oH:()=>x,ug:()=>Z,vc:()=>b});var s=r(857);e=r.hmd(e);var l=n([s]);s=(l.then?(await l)():l)[0];const i=new Array(32).fill(void 0);i.push(void 0,null,!0,!1);let c=i.length;function o(e){c===i.length&&i.push(i.length+1);const t=c;return c=i[t],i[t]=e,t}function u(e){return i[e]}function d(e){e<36||(i[e]=c,c=e)}function _(e){const t=u(e);return d(e),t}let p=new("undefined"==typeof TextDecoder?(0,e.require)("util").TextDecoder:TextDecoder)("utf-8",{ignoreBOM:!0,fatal:!0});p.decode();let h=new Uint8Array;function f(e,t){return p.decode((0===h.byteLength&&(h=new Uint8Array(s.memory.buffer)),h).subarray(e,e+t))}function w(e,t){if(!(e instanceof t))throw new Error(`expected instance of ${t.name}`);return e.ptr}const b=Object.freeze({None:0,0:"None",Entrance:1,1:"Entrance",Treasury:2,2:"Treasury",Subtreasury:3,3:"Subtreasury",FinalBoss:4,4:"FinalBoss",OtherBoss:5,5:"OtherBoss",Ladder:6,6:"Ladder",Trap:7,7:"Trap",Luck:8,8:"Luck",RaiseWall:9,9:"RaiseWall",DirectionSign:10,10:"DirectionSign",Scarecrow:11,11:"Scarecrow"}),g=Object.freeze({Wall:0,0:"Wall",Pass:1,1:"Pass",Entrance:2,2:"Entrance",Exit:3,3:"Exit"});class y{static __wrap(e){const t=Object.create(y.prototype);return t.ptr=e,t}__destroy_into_raw(){const e=this.ptr;return this.ptr=0,e}free(){const e=this.__destroy_into_raw();s.__wbg_coordinate_free(e)}get row(){return s.__wbg_get_coordinate_row(this.ptr)>>>0}set row(e){s.__wbg_set_coordinate_row(this.ptr,e)}get col(){return s.__wbg_get_coordinate_col(this.ptr)>>>0}set col(e){s.__wbg_set_coordinate_col(this.ptr,e)}}class m{static __wrap(e){const t=Object.create(m.prototype);return t.ptr=e,t}__destroy_into_raw(){const e=this.ptr;return this.ptr=0,e}free(){const e=this.__destroy_into_raw();s.__wbg_grid_free(e)}}class v{static __wrap(e){const t=Object.create(v.prototype);return t.ptr=e,t}__destroy_into_raw(){const e=this.ptr;return this.ptr=0,e}free(){const e=this.__destroy_into_raw();s.__wbg_imageprocessor_free(e)}constructor(e,t,r){const n=s.imageprocessor_new(e,t,o(r));return v.__wrap(n)}height(){return s.imageprocessor_height(this.ptr)>>>0}width(){return s.imageprocessor_width(this.ptr)>>>0}get_image_data(){return _(s.imageprocessor_get_image_data(this.ptr))}detect_grid(){const e=s.imageprocessor_detect_grid(this.ptr);return m.__wrap(e)}detect_maze(e){w(e,m);const t=s.imageprocessor_detect_maze(this.ptr,e.ptr);return k.__wrap(t)}debug_draw(e){w(e,k),s.imageprocessor_debug_draw(this.ptr,e.ptr)}}class k{static __wrap(e){const t=Object.create(k.prototype);return t.ptr=e,t}__destroy_into_raw(){const e=this.ptr;return this.ptr=0,e}free(){const e=this.__destroy_into_raw();s.__wbg_maze_free(e)}apply_to_subway(e){w(e,S),s.maze_apply_to_subway(this.ptr,e.ptr)}get_mark(e){return s.maze_get_mark(this.ptr,e)>>>0}is_valid(){return 0!==s.maze_is_valid(this.ptr)}}class S{static __wrap(e){const t=Object.create(S.prototype);return t.ptr=e,t}__destroy_into_raw(){const e=this.ptr;return this.ptr=0,e}free(){const e=this.__destroy_into_raw();s.__wbg_subway_free(e)}constructor(){const e=s.subway_new();return S.__wrap(e)}static to_idx(e,t){return s.subway_to_idx(e,t)>>>0}static from_idx(e){const t=s.subway_from_idx(e);return y.__wrap(t)}set_field(e,t){s.subway_set_field(this.ptr,e,t)}get_field(e){return s.subway_get_field(this.ptr,e)>>>0}get_visited_probability(e){return s.subway_get_visited_probability(this.ptr,e)}init(e){s.subway_init(this.ptr,e)}step(e){s.subway_step(this.ptr,e)}reset(){s.subway_reset(this.ptr)}}function T(e){return u(e).length}function x(){return o(s.memory)}function L(e){return o(u(e).buffer)}function V(e){return o(new Uint8ClampedArray(u(e)))}function Z(e){_(e)}function E(e,t,r){u(e).set(u(t),r>>>0)}function U(e){return o(new Uint8ClampedArray(e>>>0))}function C(e,t,r){return o(new Uint8ClampedArray(u(e),t>>>0,r>>>0))}function z(e,t){return o(f(e,t))}function A(e){console.log(u(e))}function P(e,t){throw new Error(f(e,t))}a()}catch(B){a(B)}}))},351:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var n=r(81),a=r.n(n),s=r(645),l=r.n(s)()(a());l.push([e.id,"\nh3 {\n    text-align: center;\n}\n#maze {\n    width: 560px;\n    margin-left: auto;\n    margin-right: auto;\n}\n#calc,\n#specials {\n    margin-top: 0.5em;\n}\n#numsteps {\n    width: 100%;\n}\n#prob_section {\n    float: right;\n}\n#prob_section span {\n    margin-left: 2em;\n}\n#link {\n    margin-top: 24px;\n}\n#link input {\n    width: 80%;\n    margin-left: 1em;\n}\n",""]);const i=l},763:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var n=r(81),a=r.n(n),s=r(645),l=r.n(s)()(a());l.push([e.id,"\n.drawtool {\r\n    text-align: center;\r\n    margin: 1em 0em;\r\n    float: right;\n}\n.drawtool .toolblock {\r\n    display: grid;\r\n    border: 4px solid #f4f4f4;\r\n    gap: 4px;\r\n    margin-bottom: 4px;\n}\n.drawtool .toolblock>div {\r\n    width: 24px;\r\n    height: 24px;\r\n    cursor: pointer;\r\n    margin: auto;\r\n    border: 3px solid white;\r\n    background-color: white;\r\n    user-select: none;\n}\n.drawtool .toolblock>div.selected {\r\n    border-color: #989898;\n}\r\n\r\n",""]);const i=l},73:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var n=r(81),a=r.n(n),s=r(645),l=r.n(s)()(a());l.push([e.id,"\n#paste,\n    #pixels {\n        display: none;\n}\n#paste.debug,\n    #pixels.debug {\n        display: block;\n        border: 1px dotted midnightblue;\n}\n",""]);const i=l},674:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var n=r(81),a=r.n(n),s=r(645),l=r.n(s)()(a());l.push([e.id,"\n#field {\n    width: 500px;\n}\n.row {\n    cursor: pointer;\n    line-height: 10px;\n}\n",""]);const i=l},344:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var n=r(81),a=r.n(n),s=r(645),l=r.n(s)()(a());l.push([e.id,"\n.cell {\n    display: inline-block;\n    width: 24px;\n    height: 24px;\n    font-size: 10pt;\n    font-family: 'Courier New', Courier, monospace;\n    margin-right: -1px;\n    margin-bottom: -1px;\n    border: 1px solid #989898;\n    line-height: 24px;\n    text-align: center;\n\n    background-color: white;\n    color: #545454;\n    contain: strict;\n\n    user-select: none;\n}\n.wall {\n    background-color: #e0dac7;\n}\n.cell.pass {\n    font-size: 6pt;\n    line-height: 26px;\n}\n.cell.pass.inverted {\n    color: white;\n}\n.cell.outer {\n    background-color: transparent;\n    border-color: transparent;\n    color: #989898\n}\n",""]);const i=l},814:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.r(t);var a=r(963),s=r(563),l=e([s]);s=(l.then?(await l)():l)[0],(0,a.ri)(s.Z).mount("#main"),n()}catch(e){n(e)}}))},289:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{Z:()=>x});var a=r(252),s=r(262),l=r(963),i=r(577),c=r(447),o=r(439),u=r(940),d=r(893),_=r(346),p=e([o,u,d,_,c]);[o,u,d,_,c]=p.then?(await p)():p;const h=(0,a._)("h3",null,"Куда уходят бревновозы",-1),f={id:"maze"},w={id:"calc"},b=(0,a._)("br",null,null,-1),g={id:"prob_section"},y={id:"link"},m=["href"],v=(0,a.Uk)(": "),k=["value"],S={id:"specials"},T=(0,a.Uk)(" Прыгучесть "),x=(0,a.aZ)({__name:"app",setup(e){const t=(0,s.Fl)((()=>window.location.origin+window.location.pathname+"?"+(0,_.KI)())),r=(0,s.Fl)((()=>{const e=Array.from(_.wS.probes).filter((e=>-1!=_.fV.marks.indexOf(e))).sort();return 0==_.wS.numSteps?e.map((e=>({mark:e,prob:0}))):e.map((e=>({mark:e,prob:_.fV.marks.reduce(((t,r,n)=>t+(r==e?_.fV.cells[n].prob:0)),0)-(e==c.vc.Entrance?_.fV.earlyEntranceVisitors:0)})))}));function n(e){e.apply_to_subway(_.fV.field);for(let t=0;t<400;t++)_.fV.cells[t].cellType=_.fV.field.get_field(t),_.fV.marks[t]=e.get_mark(t);_.fV.outerSweep(),x()}function p(e){const t=e.currentTarget.value;(0,_.HB)(t)}function x(){0==_.wS.numSteps?_.fV.reset():_.fV.recalculate(_.wS.numSteps)}function L(e){switch(_.Sd.drawTool){case"none":return;case"wall":_.fV.setCell(e,c.bL.Wall);break;case"space":_.fV.setCell(e,c.bL.Pass);break;case"entrance":_.fV.clearByType(c.bL.Entrance),_.fV.setCell(e,c.bL.Entrance);break;case"exit_1":_.fV.clearByTypeAndMark(c.bL.Exit,c.vc.Treasury),_.fV.setCell(e,c.bL.Exit,c.vc.Treasury);break;case"exit_2":_.fV.clearByTypeAndMark(c.bL.Exit,c.vc.Subtreasury),_.fV.setCell(e,c.bL.Exit,c.vc.Subtreasury);break;case"raise":_.fV.cells[e].cellType==c.bL.Wall&&(_.fV.clearByTypeAndMark(c.bL.Pass,c.vc.RaiseWall,c.bL.Wall),_.fV.setCell(e,c.bL.Pass,c.vc.RaiseWall));break;case"final_boss":_.fV.cells[e].cellType==c.bL.Pass&&(_.fV.clearByTypeAndMark(c.bL.Pass,c.vc.FinalBoss,c.bL.Pass),_.fV.setCell(e,c.bL.Pass,c.vc.FinalBoss));break;case"other_boss":_.fV.cells[e].cellType==c.bL.Pass&&_.fV.setCell(e,c.bL.Pass,c.vc.OtherBoss);break;case"clear_mark":_.fV.marks[e]=c.vc.None,_.fV.cells[e].cellType==c.bL.Entrance&&_.fV.setCell(e,c.bL.Pass);break;default:console.log("Pressed %s at %d",_.Sd.drawTool,e)}x()}return(0,a.wF)((()=>{let e=window.location.search.substring(1);e.length>0&&(0,_.HB)(e)})),(0,a.YP)((()=>_.wS.numSteps),((e,t)=>{0==e?_.fV.reset():-1!=r.value.findIndex((e=>e.mark==c.vc.Entrance))&&e>0&&_.fV.recalculate(e)}),{deep:!0}),(e,c)=>((0,a.wg)(),(0,a.iD)(a.HY,null,[h,(0,a._)("div",f,[(0,a.Wm)(d.Z),(0,a.Wm)(o.Z,{width:20,cells:(0,s.SU)(_.fV).cells,marks:(0,s.SU)(_.fV).marks,outer:(0,s.SU)(_.fV).outer,onTouchcell:L},null,8,["cells","marks","outer"]),(0,a._)("div",w,[(0,a.wy)((0,a._)("input",{id:"numsteps",type:"range",min:"0",max:"100","onUpdate:modelValue":c[0]||(c[0]=e=>(0,s.SU)(_.wS).numSteps=e)},null,512),[[l.nr,(0,s.SU)(_.wS).numSteps]]),b,(0,a._)("span",null,"Шаг: "+(0,i.zw)((0,s.SU)(_.wS).numSteps),1),(0,a._)("span",g,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)((0,s.SU)(r),(e=>((0,a.wg)(),(0,a.iD)("span",null,(0,i.zw)(e.prob.toFixed(2))+" "+(0,i.zw)((0,s.SU)(_.z_).get(e.mark)||"?"),1)))),256))])]),(0,a._)("div",y,[(0,a._)("label",null,[(0,a._)("a",{href:(0,s.SU)(t)},"Карта",8,m),v,(0,a._)("input",{value:(0,s.SU)(_.KI)(),onChange:p},null,40,k)])]),(0,a._)("div",S,[(0,a._)("label",null,[(0,a.wy)((0,a._)("input",{type:"checkbox","onUpdate:modelValue":c[1]||(c[1]=e=>(0,s.SU)(_.fV).isJumpy=e),onChange:c[2]||(c[2]=e=>x())},null,544),[[l.e8,(0,s.SU)(_.fV).isJumpy]]),T])]),(0,a.Wm)(u.Z,{onHaveMaze:n})])],64))}});n()}catch(e){n(e)}}))},392:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{Z:()=>f});var a=r(252),s=r(577),l=r(262),i=r(447),c=r(346),o=e([c,i]);[c,i]=o.then?(await o)():o;const u={class:"drawtool"},d={class:"toolblock"},_=["onPointerdown","onOntouchstart","title"],p={class:"toolblock"},h=["onClick","onOntouchstart","title"],f=(0,a.aZ)({__name:"drawtool",setup(e){const t={wall:"#",space:" ",entrance:c.z_.get(i.vc.Entrance),exit_1:c.z_.get(i.vc.Treasury),exit_2:c.z_.get(i.vc.Subtreasury),raise:c.z_.get(i.vc.RaiseWall)},r={final_boss:c.z_.get(i.vc.FinalBoss),other_boss:c.z_.get(i.vc.OtherBoss),clear_mark:"❌"},n=new Map([["wall","Стена"],["space","Проход"],["exit_1","Сокровищница"],["exit_2","Кладовая"],["raise","Поднять стену"],["entrance","Вход"],["final_boss","Финальный босс"],["other_boss","Путевой босс"],["clear_mark","Убрать метку"]]);function o(e){c.Sd.drawTool!=e?c.Sd.drawTool=e:c.Sd.drawTool="none"}return(e,i)=>((0,a.wg)(),(0,a.iD)("div",u,[(0,a._)("div",d,[((0,a.wg)(),(0,a.iD)(a.HY,null,(0,a.Ko)(t,((e,t)=>(0,a._)("div",{onPointerdown:e=>o(t),onOntouchstart:e=>o(t),class:(0,s.C_)([t,{selected:(0,l.SU)(c.Sd).drawTool==t}]),title:(0,l.SU)(n).get(t)},(0,s.zw)(e),43,_))),64))]),(0,a._)("div",p,[((0,a.wg)(),(0,a.iD)(a.HY,null,(0,a.Ko)(r,((e,t)=>(0,a._)("div",{onClick:e=>o(t),onOntouchstart:e=>o(t),class:(0,s.C_)([t,{selected:(0,l.SU)(c.Sd).drawTool==t}]),title:(0,l.SU)(n).get(t)},(0,s.zw)(e),43,h))),64))])]))}});n()}catch(e){n(e)}}))},542:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{Z:()=>i});var a=r(252),s=r(447),l=e([s]);s=(l.then?(await l)():l)[0];const i=(0,a.aZ)({setup(){},data:()=>({processingState:"",debugOutput:"1"==new URLSearchParams(window.location.search.substring(1)).get("debug")}),emits:["haveMaze"],mounted(){let e=this;document.addEventListener("paste",(function(t){e.onPaste(t)})),this.$refs.imgFile.addEventListener("change",(function(t){const r=this.files;r&&0!=r.length&&e.readFile(r[0])}));let t=this.$refs.pasta,r=this.$refs.pixels;t.addEventListener("load",(function(n){let a=1;t.width>800&&(a=.5),r.width=t.width*a,r.height=t.height*a,r.getContext("2d")?.drawImage(t,0,0,r.width,r.height);let l=r.getContext("2d")?.getImageData(0,0,r.width,r.height);if(l){e.processingState="Загружаем...";try{let t=new s.fd(l.width,l.height,l.data);e.processingState="Проверяем...";let n=t.detect_maze(t.detect_grid());n.is_valid()?(e.processingState="Схема получена",e.$emit("haveMaze",n),t.debug_draw(n)):e.processingState="Загрузить схему подземки не удалось";let a=t.get_image_data(),i=new ImageData(a,r.width,r.height);r.getContext("2d")?.putImageData(i,0,0)}catch(t){alert(t),e.processingState=""}}}))},methods:{onPaste(e){if(e.clipboardData)for(var t=0;t<e.clipboardData.items.length;t++){let r=e.clipboardData.items[t];if("file"==r.kind&&r.type.match(/^image/)){let e=r.getAsFile();if(e){this.readFile(e);break}}}},readFile(e){let t=new FileReader,r=this.$refs.pasta;t.onload=function(e){console.log("Loading image"),r.src=this.result},t.readAsDataURL(e)}}});n()}catch(e){n(e)}}))},946:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{Z:()=>o});var a=r(252),s=r(262),l=r(601),i=e([l]);l=(i.then?(await i)():i)[0];const c={id:"field"},o=(0,a.aZ)({__name:"maze",props:{width:null,cells:null,marks:null,outer:null},emits:["touchcell"],setup(e,{emit:t}){const r=e,n=r.width??1,i=r.cells??[],o=(0,a.Fl)((()=>{let e=[];for(let t=0;t<i.length/n;t++)e.push(i.slice(t*n,(t+1)*n));return e}));function u(e){t("touchcell",e)}function d(e,t){return 0==e||0==t||e==n-1||t==i.length/n-1}return(t,r)=>((0,a.wg)(),(0,a.iD)("div",c,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)((0,s.SU)(o),((t,r)=>((0,a.wg)(),(0,a.iD)("div",{class:"row",key:r},[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(t,((t,i)=>((0,a.wg)(),(0,a.j4)(l.Z,{key:i+r*(0,s.SU)(n),cellValue:t.prob,cellType:t.cellType,mark:e.marks[i+r*(0,s.SU)(n)],outer:e.outer[i+r*(0,s.SU)(n)],id:i+r*(0,s.SU)(n),borderCell:d(r,i),onTouchcell:u},null,8,["cellValue","cellType","mark","outer","id","borderCell"])))),128))])))),128))]))}});n()}catch(e){n(e)}}))},521:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{Z:()=>w});var a=r(252),s=r(577),l=r(262),i=r(963),c=r(447),o=r(245),u=r.n(o),d=r(346),_=e([d,c]);[d,c]=_.then?(await _)():_;const p=["onPointerdown","onTouchstart"],h=new(u());h.setSpectrum("fff0fa","c0c0ff","3030a0");const f=h,w=(0,a.aZ)({__name:"mazecell",props:{id:null,cellType:null,mark:null,borderCell:{type:Boolean},cellValue:null,outer:{type:Boolean}},emits:["touchcell"],setup(e,{emit:t}){const r=e;let n=0;const o=(0,a.Fl)((()=>({wall:r.cellType==c.bL.Wall,pass:r.cellType==c.bL.Pass,inverted:(r.cellValue??0)>.6,entrance:r.cellType==c.bL.Entrance,exit:r.cellType==c.bL.Exit,outer:r.outer??!1}))),u=(0,a.Fl)((()=>{const e=r.cellType??c.bL.Pass,t=r.mark??c.vc.None;return e==c.bL.Pass&&r.cellValue&&t==c.vc.None?r.cellValue.toFixed(3).replace(/^0/,"").substring(0,4):t?d.z_.get(t):["#"," ","🚪","🔼"][e]})),_=(0,a.Fl)((()=>void 0===f||r.cellType==c.bL.Wall||0==r.cellValue?{}:{backgroundColor:"#"+f.colourAt(100*(r.cellValue??0))}));function h(){let e=(new Date).getTime();e-n>50&&(t("touchcell",r.id),n=e)}function w(e){1==e.buttons&&h()}function b(e){1==e.touches.length&&h()}return(t,n)=>((0,a.wg)(),(0,a.iD)(a.HY,null,[r.borderCell?(0,a.kq)("v-if",!0):((0,a.wg)(),(0,a.iD)("div",{key:0,class:(0,s.C_)(["cell",(0,l.SU)(o)]),style:(0,s.j5)((0,l.SU)(_)),onPointerdown:(0,i.iM)(w,["prevent"]),onPointermove:w,onTouchstart:(0,i.iM)(b,["prevent"]),onTouchmove:b},(0,s.zw)(e.outer?"·":(0,l.SU)(u)),47,p)),r.borderCell?((0,a.wg)(),(0,a.iD)("div",{key:1,class:(0,s.C_)(["cell",(0,l.SU)(o)]),style:(0,s.j5)((0,l.SU)(_))},(0,s.zw)(e.outer?"·":(0,l.SU)(u)),7)):(0,a.kq)("v-if",!0)],64))}});n()}catch(e){n(e)}}))},346:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{HB:()=>_,KI:()=>d,Sd:()=>o,fV:()=>c,wS:()=>u,z_:()=>i});var a=r(447),s=r(262),l=e([a]);a=(l.then?(await l)():l)[0];const i=new Map([[a.vc.None," "],[a.vc.Entrance,"🚪"],[a.vc.FinalBoss,"💀"],[a.vc.Subtreasury,"📦"],[a.vc.Treasury,"💰"],[a.vc.OtherBoss,"☠"],[a.vc.Ladder,"⬇"],[a.vc.Trap,"💩"],[a.vc.Luck,"🍀"],[a.vc.RaiseWall,"□"],[a.vc.DirectionSign,"╬"],[a.vc.Scarecrow,"👻"]]),c=(0,s.qj)({field:new a.Qr,cells:new Array(400).fill(null).map((e=>({cellType:a.bL.Wall,prob:0}))),marks:new Array(400).fill(null).map((e=>a.vc.None)),outer:new Array(400).fill(null).map((e=>!1)),isJumpy:!1,earlyEntranceVisitors:0,recalculate(e,t=0){t||this.field.init(this.isJumpy);for(let r=1;r<=e;r++)this.field.step(r+t),r+t<=19&&(this.earlyEntranceVisitors=this.marks.reduce(((e,t,r)=>e+(t==a.vc.Entrance?this.field.get_visited_probability(r):0)),0));for(let e=0;e<400;e++)this.cells[e].cellType!=a.bL.Wall&&(this.cells[e].prob=this.field.get_visited_probability(e))},reset(){this.field.init(this.isJumpy);for(let e=0;e<400;e++)this.cells[e].prob=0},setCell(e,t,r){this.field.set_field(e,t),this.cells[e].cellType=this.field.get_field(e),this.cells[e].cellType==t&&(t==a.bL.Entrance?this.marks[e]=a.vc.Entrance:t==a.bL.Exit?this.marks[e]=r??a.vc.Treasury:t==a.bL.Pass?void 0!==r?this.marks[e]=r:[a.vc.RaiseWall,a.vc.Entrance,a.vc.Treasury,a.vc.Subtreasury].indexOf(this.marks[e])>=0&&(this.marks[e]=a.vc.None):this.marks[e]=r??a.vc.None,this.outerSweep())},clearByType(e,t=a.bL.Pass){this.cells.forEach(((r,n)=>{r.cellType==e&&(this.setCell(n,t),this.marks[n]=a.vc.None)}))},clearByTypeAndMark(e,t,r=a.bL.Pass){this.cells.forEach(((n,s)=>{n.cellType==e&&this.marks[s]==t&&(this.setCell(s,r),this.marks[s]=a.vc.None)}))},outerSweep(){const e=[379,380,381,399,0,1,19,20,21];this.outer.forEach(((t,r,n)=>n[r]=e.every((e=>this.cells[(e+r)%400].cellType==a.bL.Wall))))}}),o=(0,s.qj)({drawTool:"space"}),u=(0,s.qj)({numSteps:0,probes:new Set([a.vc.Entrance,a.vc.Treasury,a.vc.Subtreasury,a.vc.FinalBoss,a.vc.OtherBoss])});function d(){let e="",t="AAA";for(let r=20;r<=360;r+=20){let n="";for(let e=1;e<=18;e+=6){let t=32*+(c.cells[r+e].cellType!=a.bL.Wall)+16*+(c.cells[r+e+1].cellType!=a.bL.Wall)+8*+(c.cells[r+e+2].cellType!=a.bL.Wall)+4*+(c.cells[r+e+3].cellType!=a.bL.Wall)+2*+(c.cells[r+e+4].cellType!=a.bL.Wall)+ +(c.cells[r+e+5].cellType!=a.bL.Wall);n+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(t)}n==t?n="~":t=n,e+=n}return`f=${e}${"etb".split("").reduce(((e,t,r)=>{const n=c.marks.indexOf([a.vc.Entrance,a.vc.Treasury,a.vc.FinalBoss][r]);return-1==n?e:e+`&${t}=${n}`}),"")}`}function _(e){try{const t=new URLSearchParams(e),r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";let n="AAA",s=t.get("f")||"";for(let e=20;e<=360;e+=20){let t="";"~"==s.charAt(0)?(t=n,s=s.substring(1)):(t=s.substring(0,3),n=t,s=s.substring(3));for(let n=1;n<=18;n+=6){let s=r.indexOf(t.charAt(0));t=t.substring(1);for(let t=0;t<6;t++)c.field.set_field(e+n+t,s&1<<5-t?a.bL.Pass:a.bL.Wall)}}[a.vc.Entrance,a.vc.Treasury,a.vc.FinalBoss].forEach(((e,r)=>{const n=parseInt(t.get("etb".charAt(r))||"-1");n>=0&&(c.marks[n]=e,e==a.vc.Entrance?c.field.set_field(n,a.bL.Entrance):e==a.vc.Treasury&&c.field.set_field(n,a.bL.Exit))}));for(let e=0;e<400;e++)c.cells[e].cellType=c.field.get_field(e),c.cells[e].prob=0;u.numSteps>0&&c.recalculate(u.numSteps)}catch(e){console.log(e)}}n()}catch(p){n(p)}}))},563:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{Z:()=>l});var a=r(343),s=(r(323),e([a]));const l=(a=(s.then?(await s)():s)[0]).Z;n()}catch(e){n(e)}}))},893:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{Z:()=>l});var a=r(713),s=(r(165),e([a]));const l=(a=(s.then?(await s)():s)[0]).Z;n()}catch(e){n(e)}}))},940:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{Z:()=>c});var a=r(499),s=r(468),l=(r(208),r(744)),i=e([s]);s=(i.then?(await i)():i)[0];const c=(0,l.Z)(s.Z,[["render",a.s]]);n()}catch(e){n(e)}}))},439:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{Z:()=>l});var a=r(314),s=(r(393),e([a]));const l=(a=(s.then?(await s)():s)[0]).Z;n()}catch(e){n(e)}}))},601:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{Z:()=>l});var a=r(970),s=(r(416),e([a]));const l=(a=(s.then?(await s)():s)[0]).Z;n()}catch(e){n(e)}}))},343:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{Z:()=>a.Z});var a=r(289),s=e([a]);a=(s.then?(await s)():s)[0],n()}catch(e){n(e)}}))},713:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{Z:()=>a.Z});var a=r(392),s=e([a]);a=(s.then?(await s)():s)[0],n()}catch(e){n(e)}}))},468:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{Z:()=>a.Z});var a=r(542),s=e([a]);a=(s.then?(await s)():s)[0],n()}catch(e){n(e)}}))},314:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{Z:()=>a.Z});var a=r(946),s=e([a]);a=(s.then?(await s)():s)[0],n()}catch(e){n(e)}}))},970:(e,t,r)=>{"use strict";r.a(e,(async(e,n)=>{try{r.d(t,{Z:()=>a.Z});var a=r(521),s=e([a]);a=(s.then?(await s)():s)[0],n()}catch(e){n(e)}}))},499:(e,t,r)=>{"use strict";r.d(t,{s:()=>i});var n=r(252),a=r(577);const s=(0,n.Uk)(" Вставьте изображение или выберите файл для загрузки: "),l={type:"file",ref:"imgFile"};function i(e,t,r,i,c,o){return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n._)("p",null,[s,(0,n._)("input",l,null,512)]),(0,n._)("p",null,(0,a.zw)(e.processingState),1),(0,n._)("img",{id:"paste",class:(0,a.C_)({debug:e.debugOutput}),ref:"pasta"},null,2),(0,n._)("canvas",{id:"pixels",class:(0,a.C_)({debug:e.debugOutput}),ref:"pixels"},null,2)],64)}},323:(e,t,r)=>{"use strict";r(928)},165:(e,t,r)=>{"use strict";r(211)},208:(e,t,r)=>{"use strict";r(557)},393:(e,t,r)=>{"use strict";r(537)},416:(e,t,r)=>{"use strict";r(569)},928:(e,t,r)=>{var n=r(351);n.__esModule&&(n=n.default),"string"==typeof n&&(n=[[e.id,n,""]]),n.locals&&(e.exports=n.locals),(0,r(611).Z)("6c811c1e",n,!1,{})},211:(e,t,r)=>{var n=r(763);n.__esModule&&(n=n.default),"string"==typeof n&&(n=[[e.id,n,""]]),n.locals&&(e.exports=n.locals),(0,r(611).Z)("1b7e1b21",n,!1,{})},557:(e,t,r)=>{var n=r(73);n.__esModule&&(n=n.default),"string"==typeof n&&(n=[[e.id,n,""]]),n.locals&&(e.exports=n.locals),(0,r(611).Z)("1438e6d2",n,!1,{})},537:(e,t,r)=>{var n=r(674);n.__esModule&&(n=n.default),"string"==typeof n&&(n=[[e.id,n,""]]),n.locals&&(e.exports=n.locals),(0,r(611).Z)("0a7e8452",n,!1,{})},569:(e,t,r)=>{var n=r(344);n.__esModule&&(n=n.default),"string"==typeof n&&(n=[[e.id,n,""]]),n.locals&&(e.exports=n.locals),(0,r(611).Z)("02ecbd18",n,!1,{})},857:(e,t,r)=>{"use strict";r.a(e,(async(n,a)=>{try{var s,l=n([s=r(447)]),[s]=l.then?(await l)():l;await r.v(t,e.id,"b5d00a98b5aa65aefaf0",{"./gv_subway_bg.js":{__wbg_length_ff1f152ac950d18e:s.aj,__wbindgen_memory:s.oH,__wbg_buffer_34f5ec9f8a838ba0:s.eA,__wbg_new_7091a04c151f45d8:s.eM,__wbindgen_object_drop_ref:s.ug,__wbg_set_f531ac57e06dfb59:s.mZ,__wbg_newwithlength_028942597ca48985:s.if,__wbg_newwithbyteoffsetandlength_953b6a50eb40310a:s.Tw,__wbindgen_string_new:s.h4,__wbg_log_17733ab6fa45831d:s.Kj,__wbindgen_throw:s.Or}}),a()}catch(e){a(e)}}),1)}}]);