(self.webpackChunkgv_subway_web=self.webpackChunkgv_subway_web||[]).push([[715],{447:(e,t,s)=>{"use strict";s.d(t,{bL:()=>h,fd:()=>f,Qr:()=>w,dD:()=>b,oH:()=>m,jp:()=>y,NR:()=>v,ug:()=>T,hA:()=>x,Wf:()=>L,dZ:()=>M,h4:()=>C,JV:()=>S,Or:()=>z});var l=s(168);e=s.hmd(e);const r=new Array(32).fill(void 0);r.push(void 0,null,!0,!1);let i=r.length;function n(e){i===r.length&&r.push(r.length+1);const t=i;return i=r[t],r[t]=e,t}function a(e){return r[e]}function o(e){const t=a(e);return function(e){e<36||(r[e]=i,i=e)}(e),t}let c=new("undefined"==typeof TextDecoder?(0,e.require)("util").TextDecoder:TextDecoder)("utf-8",{ignoreBOM:!0,fatal:!0});c.decode();let u=null;function p(e,t){return c.decode((null!==u&&u.buffer===l.memory.buffer||(u=new Uint8Array(l.memory.buffer)),u).subarray(e,e+t))}function d(e,t){if(!(e instanceof t))throw new Error(`expected instance of ${t.name}`);return e.ptr}const h=Object.freeze({Wall:0,0:"Wall",Pass:1,1:"Pass",Entrance:2,2:"Entrance",Treasury:3,3:"Treasury",Subtreasury:4,4:"Subtreasury"});class _{static __wrap(e){const t=Object.create(_.prototype);return t.ptr=e,t}__destroy_into_raw(){const e=this.ptr;return this.ptr=0,e}free(){const e=this.__destroy_into_raw();l.__wbg_grid_free(e)}}class f{static __wrap(e){const t=Object.create(f.prototype);return t.ptr=e,t}__destroy_into_raw(){const e=this.ptr;return this.ptr=0,e}free(){const e=this.__destroy_into_raw();l.__wbg_imageprocessor_free(e)}constructor(e,t,s){var r=l.imageprocessor_new(e,t,n(s));return f.__wrap(r)}height(){return l.imageprocessor_height(this.ptr)>>>0}width(){return l.imageprocessor_width(this.ptr)>>>0}get_image_data(){return o(l.imageprocessor_get_image_data(this.ptr))}detect_grid(){var e=l.imageprocessor_detect_grid(this.ptr);return _.__wrap(e)}detect_maze(e){d(e,_);var t=l.imageprocessor_detect_maze(this.ptr,e.ptr);return g.__wrap(t)}debug_draw(e){d(e,g),l.imageprocessor_debug_draw(this.ptr,e.ptr)}}class g{static __wrap(e){const t=Object.create(g.prototype);return t.ptr=e,t}__destroy_into_raw(){const e=this.ptr;return this.ptr=0,e}free(){const e=this.__destroy_into_raw();l.__wbg_maze_free(e)}apply_to_subway(e){d(e,w),l.maze_apply_to_subway(this.ptr,e.ptr)}is_valid(){return 0!==l.maze_is_valid(this.ptr)}}class w{static __wrap(e){const t=Object.create(w.prototype);return t.ptr=e,t}__destroy_into_raw(){const e=this.ptr;return this.ptr=0,e}free(){const e=this.__destroy_into_raw();l.__wbg_subway_free(e)}constructor(){var e=l.subway_new();return w.__wrap(e)}to_idx(e,t){return l.subway_to_idx(this.ptr,e,t)>>>0}set_field(e,t){l.subway_set_field(this.ptr,e,t)}get_field(e){return l.subway_get_field(this.ptr,e)>>>0}get_visited_probability(e){return l.subway_get_visited_probability(this.ptr,e)}init(){l.subway_init(this.ptr)}step(e){l.subway_step(this.ptr,e)}reset(){l.subway_reset(this.ptr)}}function b(e){return a(e).length}function m(){return n(l.memory)}function y(e){return n(a(e).buffer)}function v(e){return n(new Uint8ClampedArray(a(e)))}function T(e){o(e)}function x(e,t,s){a(e).set(a(t),s>>>0)}function L(e){return n(new Uint8ClampedArray(e>>>0))}function M(e,t,s){return n(new Uint8ClampedArray(a(e),t>>>0,s>>>0))}function C(e,t){return n(p(e,t))}function S(e){console.log(a(e))}function z(e,t){throw new Error(p(e,t))}},865:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>a});var l=s(81),r=s.n(l),i=s(645),n=s.n(i)()(r());n.push([e.id,"\nh3 {\n        text-align: center;\n}\n#maze {\n        width: 520px;\n        display: inline-block;\n}\n#drawtool {\n        text-align: center;\n}\n#drawtool .cell {\n        cursor: pointer;\n        margin: 24px 12px;\n        border: 2px solid transparent;\n}\n#drawtool .cell.selected {\n        border: 2px solid black;\n}\n#numsteps {\n        width: 100%;\n}\n#treasury_prob {\n        float: right;\n}\n#link {\n        margin-top: 24px;\n}\n#link input {\n        width: 80%;\n        margin-left: 1em;\n}\n",""]);const a=n},523:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>a});var l=s(81),r=s.n(l),i=s(645),n=s.n(i)()(r());n.push([e.id,"\n#paste,\n    #pixels {\n        display: none;\n}\n#paste.debug,\n    #pixels.debug {\n        display: block;\n        border: 1px dotted midnightblue;\n}\n",""]);const a=n},370:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>a});var l=s(81),r=s.n(l),i=s(645),n=s.n(i)()(r());n.push([e.id,"\n.row {\n        cursor: pointer;\n}\n",""]);const a=n},314:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>a});var l=s(81),r=s.n(l),i=s(645),n=s.n(i)()(r());n.push([e.id,"\n.cell {\n        display: inline-block;\n        width: 24px;\n        height: 24px;\n        font-size: 10pt;\n        font-family: 'Courier New', Courier, monospace;\n        margin: 0;\n        border: 1px solid silver;\n        line-height: 24px;\n        text-align: center;\n\n        background-color: white;\n}\n.wall {\n        background-color: gray;\n}\n",""]);const a=n},715:(e,t,s)=>{"use strict";s.r(t);var l=s(963),r=s(252),i=s(577);const n=(0,r._)("h3",null,"Куда уходят бревновозы",-1),a={id:"maze"},o={id:"drawtool"},c={id:"calc"},u=(0,r._)("br",null,null,-1),p={id:"treasury_prob"},d={id:"link"},h=["href"],_=(0,r.Uk)(": "),f=["value"];var g=s(447),w=s(245),b=s.n(w);const m=(0,r.aZ)({setup(){},props:{id:Number,cellType:Number,colourScheme:{type:Number,default:-1},colourValue:Number},computed:{cellClass(){return{wall:this.cellType==g.bL.Wall,pass:this.cellType==g.bL.Pass,entrance:this.cellType==g.bL.Entrance,treasury:this.cellType==g.bL.Treasury,subtreasury:this.cellType==g.bL.Subtreasury}},symbol(){return["#"," ","🚪","💰","📦"][this.$props.cellType??1]},cellColour(){return this.$props.colourScheme<0||this.cellType==g.bL.Wall||0==this.colourValue?{}:{backgroundColor:"#"+this.colourSchemes[this.$props.colourScheme].colourAt(100*(this.colourValue??0))}}},data(){const e=new(b());return e.setSpectrum("ffc0e0","c0c0ff","3030a0"),{lastEmitted:(new Date).getTime(),colourSchemes:[e]}},emits:["touchcell"],methods:{onMove(e){let t=(new Date).getTime();e.buttons&&t-this.lastEmitted>50&&(this.$emit("touchcell",this.id),this.lastEmitted=t)}}});s(153);var y=s(744);const v=(0,y.Z)(m,[["render",function(e,t,s,n,a,o){return(0,r.wg)(),(0,r.iD)("div",{class:(0,i.C_)(["cell",e.cellClass]),style:(0,i.j5)(e.cellColour),onMousedown:t[0]||(t[0]=(0,l.iM)((e=>this.$emit("touchcell",this.id)),["prevent"])),onMousemove:t[1]||(t[1]=(...t)=>e.onMove&&e.onMove(...t)),onTouchstart:t[2]||(t[2]=(0,l.iM)((e=>this.$emit("touchcell",this.id)),["prevent"])),onTouchmove:t[3]||(t[3]=(...t)=>e.onMove&&e.onMove(...t))},(0,i.zw)(e.symbol),39)}]]),T=(0,r.aZ)({components:{mazecell:v},props:{width:Number,cells:Array},data(){return{rowWidth:this.$props.width??1,mazeCells:this.$props.cells??[]}},emits:["touchcell"],setup(){},computed:{cellRows(){let e=[];for(let t=0;t<this.mazeCells.length/this.rowWidth;t++)e.push(this.mazeCells.slice(t*this.rowWidth,(t+1)*this.rowWidth));return e}},methods:{forwardTouchCell(e){this.$emit("touchcell",e)}}});s(386);const x=(0,y.Z)(T,[["render",function(e,t,s,l,i,n){const a=(0,r.up)("mazecell");return(0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.cellRows,((t,s)=>((0,r.wg)(),(0,r.iD)("div",{class:"row",key:s},[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(t,((t,l)=>((0,r.wg)(),(0,r.j4)(a,{colourScheme:0,colourValue:t.prob,cellType:t.cellType,id:l+s*this.rowWidth,key:l+s*this.rowWidth,onTouchcell:e.forwardTouchCell},null,8,["colourValue","cellType","id","onTouchcell"])))),128))])))),128)}]]),L=(0,r.Uk)(" Вставьте изображение или выберите файл для загрузки: "),M={type:"file",ref:"imgFile"},C=(0,r.aZ)({setup(){},data:()=>({processingState:"",debugOutput:"1"==new URLSearchParams(window.location.search.substring(1)).get("debug")}),emits:["haveMaze"],mounted(){let e=this;document.addEventListener("paste",(function(t){e.onPaste(t)})),this.$refs.imgFile.addEventListener("change",(function(t){const s=this.files;s&&0!=s.length&&e.readFile(s[0])}));let t=this.$refs.pasta,s=this.$refs.pixels;t.addEventListener("load",(function(l){let r=1;s.width>600&&(r=.5),s.width=t.width*r,s.height=t.height*r,s.getContext("2d")?.drawImage(t,0,0,s.width,s.height);let i=s.getContext("2d")?.getImageData(0,0,s.width,s.height);if(i){e.processingState="Загружаем...";try{let l=new g.fd(i.width,i.height,i.data);e.processingState="Проверяем...";let r=l.detect_maze(l.detect_grid());r.is_valid()?(e.processingState="Схема получена",e.$emit("haveMaze",r),l.debug_draw(r)):e.processingState="Загрузить схему подземки не удалось";let n=l.get_image_data(),a=new ImageData(n,t.width,t.height);s.getContext("2d")?.putImageData(a,0,0)}catch(t){alert(t),e.processingState=""}}}))},methods:{onPaste(e){if(e.clipboardData)for(var t=0;t<e.clipboardData.items.length;t++){let s=e.clipboardData.items[t];if("file"==s.kind&&s.type.match(/^image/)){let e=s.getAsFile();if(e){this.readFile(e);break}}}},readFile(e){let t=new FileReader,s=this.$refs.pasta;t.onload=function(e){console.log("Loading image"),s.src=this.result},t.readAsDataURL(e)}}});s(710);const S=(0,y.Z)(C,[["render",function(e,t,s,l,n,a){return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r._)("p",null,[L,(0,r._)("input",M,null,512)]),(0,r._)("p",null,(0,i.zw)(e.processingState),1),(0,r._)("img",{id:"paste",class:(0,i.C_)({debug:e.debugOutput}),ref:"pasta"},null,2),(0,r._)("canvas",{id:"pixels",class:(0,i.C_)({debug:e.debugOutput}),ref:"pixels"},null,2)],64)}]]),z=(0,r.aZ)({components:{maze:x,mazecell:v,imagePaste:S},data(){let e={cellType:g.bL.Wall,prob:0},t=new Array(400);for(let s=0;s<400;s++)t[s]={...e};return{field:new g.Qr,cells:t,drawMode:g.bL.Pass,specials:[-1,-1,-1],numSteps:0}},computed:{mapUrl(){return window.location.origin+window.location.pathname+"?"+this.encodedMap},encodedMap(){let e="",t="AAA";for(let s=20;s<=360;s+=20){let l="";for(let e=1;e<=18;e+=6){let t=32*+(this.cells[s+e].cellType!=g.bL.Wall)+16*+(this.cells[s+e+1].cellType!=g.bL.Wall)+8*+(this.cells[s+e+2].cellType!=g.bL.Wall)+4*+(this.cells[s+e+3].cellType!=g.bL.Wall)+2*+(this.cells[s+e+4].cellType!=g.bL.Wall)+ +(this.cells[s+e+5].cellType!=g.bL.Wall);l+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".substr(t,1)}l==t?l="~":t=l,e+=l}return`f=${e}&e=${this.specials[0]}&t=${this.specials[1]}&s=${this.specials[2]}`},treasuryProb(){const e=this.specials[1];return-1==e?"0.00":this.cells[e].prob.toFixed(2)}},created(){let e=window.location.search.substring(1);e.length>0&&this.parseMap(e)},methods:{onMapLinkChange(e){const t=e.currentTarget.value;this.parseMap(t)},parseMap(e){try{const t=new URLSearchParams(e),s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";let l="AAA",r=t.get("f")||"";for(let e=20;e<=360;e+=20){let t="";"~"==r.substr(0,1)?(t=l,r=r.substring(1)):(t=r.substr(0,3),l=t,r=r.substring(3));for(let l=1;l<=18;l+=6){let r=s.indexOf(t.substr(0,1));t=t.substring(1);for(let t=0;t<6;t++)this.field.set_field(e+l+t,r&1<<5-t?g.bL.Pass:g.bL.Wall)}}this.specials[0]=parseInt(t.get("e")||"-1"),this.specials[1]=parseInt(t.get("t")||"-1"),this.specials[2]=parseInt(t.get("s")||"-1"),this.specials[0]>=0&&this.field.set_field(this.specials[0],g.bL.Entrance),this.specials[1]>=0&&this.field.set_field(this.specials[1],g.bL.Treasury),this.specials[2]>=0&&this.field.set_field(this.specials[2],g.bL.Subtreasury);for(let e=0;e<400;e++)this.cells[e].cellType=this.field.get_field(e),this.cells[e].prob=0;this.numSteps>0&&this.recalculate(this.numSteps)}catch(e){console.log(e)}},touchCell(e){if(this.cells[e].cellType!=this.drawMode){this.specials.indexOf(e)>=0&&(this.specials[this.specials.indexOf(e)]=-1),this.field.set_field(e,this.drawMode),this.cells[e].cellType=this.field.get_field(e);const t=[g.bL.Entrance,g.bL.Treasury,g.bL.Subtreasury].indexOf(this.drawMode);if(t>=0){const s=this.specials[t];s>=0&&(this.field.set_field(s,g.bL.Pass),this.cells[s].cellType=this.field.get_field(s)),this.specials[t]=e}this.specials[0]>=0&&this.specials[1]>=0&&this.numSteps>0&&this.recalculate(this.numSteps)}},selectTool(e){this.drawMode=e},recalculate(e,t=0){t||this.field.init();for(let s=1;s<=e;s++)this.field.step(s+t);for(let e=0;e<400;e++)this.cells[e].cellType!=g.bL.Wall&&(this.cells[e].prob=this.field.get_visited_probability(e))},reset(){this.field.init();for(let e=0;e<400;e++)this.cells[e].prob=0},onHaveMaze(e){e.apply_to_subway(this.field);for(let e=0;e<400;e++)this.cells[e].cellType=this.field.get_field(e)}},watch:{numSteps(e,t){0==e?this.reset():this.specials[0]>=0&&this.specials[1]>=0&&e>0&&this.recalculate(e)}}});s(187);const k=(0,y.Z)(z,[["render",function(e,t,s,g,w,b){const m=(0,r.up)("maze"),y=(0,r.up)("mazecell"),v=(0,r.up)("imagePaste");return(0,r.wg)(),(0,r.iD)(r.HY,null,[n,(0,r._)("div",a,[(0,r.Wm)(m,{width:20,cells:e.cells,onTouchcell:e.touchCell},null,8,["cells","onTouchcell"]),(0,r._)("div",o,[(0,r._)("div",null,[((0,r.wg)(),(0,r.iD)(r.HY,null,(0,r.Ko)(5,(t=>(0,r.Wm)(y,{key:t,id:1e3+t,cellType:t-1,class:(0,i.C_)({selected:t-1==e.drawMode}),onClick:s=>e.selectTool(t-1),onTouchstart:s=>e.selectTool(t-1)},null,8,["id","cellType","class","onClick","onTouchstart"]))),64))])]),(0,r._)("div",c,[(0,r.wy)((0,r._)("input",{id:"numsteps",type:"range",min:"0",max:"100","onUpdate:modelValue":t[0]||(t[0]=t=>e.numSteps=t)},null,512),[[l.nr,e.numSteps]]),u,(0,r._)("span",null,"Шагов: "+(0,i.zw)(e.numSteps),1),(0,r._)("span",p,(0,i.zw)(e.treasuryProb)+" 💰",1)]),(0,r._)("div",d,[(0,r._)("label",null,[(0,r._)("a",{href:e.mapUrl},"Карта",8,h),_,(0,r._)("input",{value:e.encodedMap,onChange:t[1]||(t[1]=(...t)=>e.onMapLinkChange&&e.onMapLinkChange(...t))},null,40,f)])])]),(0,r.Wm)(v,{onHaveMaze:e.onHaveMaze},null,8,["onHaveMaze"])],64)}]]);(0,l.ri)(k).mount("#main")},187:(e,t,s)=>{var l=s(865);l.__esModule&&(l=l.default),"string"==typeof l&&(l=[[e.id,l,""]]),l.locals&&(e.exports=l.locals),(0,s(346).Z)("f0d8cfcc",l,!1,{})},710:(e,t,s)=>{var l=s(523);l.__esModule&&(l=l.default),"string"==typeof l&&(l=[[e.id,l,""]]),l.locals&&(e.exports=l.locals),(0,s(346).Z)("d6068b4a",l,!1,{})},386:(e,t,s)=>{var l=s(370);l.__esModule&&(l=l.default),"string"==typeof l&&(l=[[e.id,l,""]]),l.locals&&(e.exports=l.locals),(0,s(346).Z)("f15b1044",l,!1,{})},153:(e,t,s)=>{var l=s(314);l.__esModule&&(l=l.default),"string"==typeof l&&(l=[[e.id,l,""]]),l.locals&&(e.exports=l.locals),(0,s(346).Z)("2c21fe42",l,!1,{})},168:(e,t,s)=>{"use strict";var l=s.w[e.id];e.exports=l,s(447),l[""]()}}]);