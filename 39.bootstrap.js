(self.webpackChunkgv_subway_web=self.webpackChunkgv_subway_web||[]).push([[39],{447:(e,t,s)=>{"use strict";s.d(t,{bL:()=>h,fd:()=>f,Qr:()=>b,dD:()=>m,oH:()=>w,jp:()=>y,NR:()=>v,ug:()=>T,hA:()=>x,Wf:()=>L,dZ:()=>M,h4:()=>S,JV:()=>C,Or:()=>z});var l=s(168);e=s.hmd(e);const i=new Array(32).fill(void 0);i.push(void 0,null,!0,!1);let r=i.length;function n(e){r===i.length&&i.push(i.length+1);const t=r;return r=i[t],i[t]=e,t}function a(e){return i[e]}function o(e){const t=a(e);return function(e){e<36||(i[e]=r,r=e)}(e),t}let c=new("undefined"==typeof TextDecoder?(0,e.require)("util").TextDecoder:TextDecoder)("utf-8",{ignoreBOM:!0,fatal:!0});c.decode();let u=null;function p(e,t){return c.decode((null!==u&&u.buffer===l.memory.buffer||(u=new Uint8Array(l.memory.buffer)),u).subarray(e,e+t))}function d(e,t){if(!(e instanceof t))throw new Error(`expected instance of ${t.name}`);return e.ptr}const h=Object.freeze({Wall:0,0:"Wall",Pass:1,1:"Pass",Entrance:2,2:"Entrance",Treasury:3,3:"Treasury",Subtreasury:4,4:"Subtreasury"});class _{static __wrap(e){const t=Object.create(_.prototype);return t.ptr=e,t}__destroy_into_raw(){const e=this.ptr;return this.ptr=0,e}free(){const e=this.__destroy_into_raw();l.__wbg_grid_free(e)}}class f{static __wrap(e){const t=Object.create(f.prototype);return t.ptr=e,t}__destroy_into_raw(){const e=this.ptr;return this.ptr=0,e}free(){const e=this.__destroy_into_raw();l.__wbg_imageprocessor_free(e)}constructor(e,t,s){var i=l.imageprocessor_new(e,t,n(s));return f.__wrap(i)}height(){return l.imageprocessor_height(this.ptr)>>>0}width(){return l.imageprocessor_width(this.ptr)>>>0}get_image_data(){return o(l.imageprocessor_get_image_data(this.ptr))}detect_grid(){var e=l.imageprocessor_detect_grid(this.ptr);return _.__wrap(e)}detect_maze(e){d(e,_);var t=l.imageprocessor_detect_maze(this.ptr,e.ptr);return g.__wrap(t)}debug_draw(e){d(e,g),l.imageprocessor_debug_draw(this.ptr,e.ptr)}}class g{static __wrap(e){const t=Object.create(g.prototype);return t.ptr=e,t}__destroy_into_raw(){const e=this.ptr;return this.ptr=0,e}free(){const e=this.__destroy_into_raw();l.__wbg_maze_free(e)}apply_to_subway(e){d(e,b),l.maze_apply_to_subway(this.ptr,e.ptr)}is_valid(){return 0!==l.maze_is_valid(this.ptr)}}class b{static __wrap(e){const t=Object.create(b.prototype);return t.ptr=e,t}__destroy_into_raw(){const e=this.ptr;return this.ptr=0,e}free(){const e=this.__destroy_into_raw();l.__wbg_subway_free(e)}constructor(){var e=l.subway_new();return b.__wrap(e)}to_idx(e,t){return l.subway_to_idx(this.ptr,e,t)>>>0}set_field(e,t){l.subway_set_field(this.ptr,e,t)}get_field(e){return l.subway_get_field(this.ptr,e)>>>0}get_visited_probability(e){return l.subway_get_visited_probability(this.ptr,e)}init(e){l.subway_init(this.ptr,e)}step(e){l.subway_step(this.ptr,e)}reset(){l.subway_reset(this.ptr)}}function m(e){return a(e).length}function w(){return n(l.memory)}function y(e){return n(a(e).buffer)}function v(e){return n(new Uint8ClampedArray(a(e)))}function T(e){o(e)}function x(e,t,s){a(e).set(a(t),s>>>0)}function L(e){return n(new Uint8ClampedArray(e>>>0))}function M(e,t,s){return n(new Uint8ClampedArray(a(e),t>>>0,s>>>0))}function S(e,t){return n(p(e,t))}function C(e){console.log(a(e))}function z(e,t){throw new Error(p(e,t))}},363:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>a});var l=s(81),i=s.n(l),r=s(645),n=s.n(r)()(i());n.push([e.id,"\nh3 {\n        text-align: center;\n}\n#maze {\n        width: 520px;\n        display: inline-block;\n}\n#drawtool {\n        text-align: center;\n}\n#drawtool .cell {\n        cursor: pointer;\n        margin: 24px 12px;\n        border: 2px solid transparent;\n}\n#drawtool .cell.selected {\n        border: 2px solid black;\n}\n#numsteps {\n        width: 100%;\n}\n#treasury_prob {\n        float: right;\n}\n#link {\n        margin-top: 24px;\n}\n#link input {\n        width: 80%;\n        margin-left: 1em;\n}\n",""]);const a=n},73:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>a});var l=s(81),i=s.n(l),r=s(645),n=s.n(r)()(i());n.push([e.id,"\n#paste,\n    #pixels {\n        display: none;\n}\n#paste.debug,\n    #pixels.debug {\n        display: block;\n        border: 1px dotted midnightblue;\n}\n",""]);const a=n},609:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>a});var l=s(81),i=s.n(l),r=s(645),n=s.n(r)()(i());n.push([e.id,"\n.row {\n        cursor: pointer;\n        line-height: 10px;\n}\n",""]);const a=n},265:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>a});var l=s(81),i=s.n(l),r=s(645),n=s.n(r)()(i());n.push([e.id,"\n.cell {\n        display: inline-block;\n        width: 24px;\n        height: 24px;\n        font-size: 10pt;\n        font-family: 'Courier New', Courier, monospace;\n        margin: 0;\n        border: 1px solid silver;\n        line-height: 24px;\n        text-align: center;\n\n        background-color: white;\n        contain: strict;\n}\n.wall {\n        background-color: gray;\n}\n.cell.pass {\n        font-size: 6pt;\n        line-height: 26px;\n}\n.cell.pass.inverted {\n        color: white;\n}\n",""]);const a=n},39:(e,t,s)=>{"use strict";s.r(t);var l=s(963),i=s(252),r=s(577);const n=(0,i._)("h3",null,"Куда уходят бревновозы",-1),a={id:"maze"},o={id:"drawtool"},c={id:"calc"},u=(0,i._)("br",null,null,-1),p={id:"treasury_prob"},d={id:"link"},h=["href"],_=(0,i.Uk)(": "),f=["value"],g={id:"specials"},b=(0,i.Uk)(" Прыгучесть ");var m=s(447),w=s(245),y=s.n(w);const v=(0,i.aZ)({setup(){},props:{id:Number,cellType:Number,colourScheme:{type:Number,default:-1},cellValue:Number},computed:{cellClass(){return{wall:this.cellType==m.bL.Wall,pass:this.cellType==m.bL.Pass,inverted:(this.$props.cellValue??0)>.6,entrance:this.cellType==m.bL.Entrance,treasury:this.cellType==m.bL.Treasury,subtreasury:this.cellType==m.bL.Subtreasury}},symbol(){const e=this.$props.cellType??1;return 1==e&&this.$props.cellValue?this.$props.cellValue.toFixed(3).replace(/^0/,"").substr(0,4):["#"," ","🚪","💰","📦"][e]},cellColour(){return this.$props.colourScheme<0||this.cellType==m.bL.Wall||0==this.cellValue?{}:{backgroundColor:"#"+this.colourSchemes[this.$props.colourScheme].colourAt(100*(this.cellValue??0))}}},data(){const e=new(y());return e.setSpectrum("ffc0e0","c0c0ff","3030a0"),{lastEmitted:(new Date).getTime(),colourSchemes:[e]}},emits:["touchcell"],methods:{onMove(e){let t=(new Date).getTime();e.buttons&&t-this.lastEmitted>50&&(this.$emit("touchcell",this.id),this.lastEmitted=t)}}});s(470);var T=s(744);const x=(0,T.Z)(v,[["render",function(e,t,s,n,a,o){return(0,i.wg)(),(0,i.iD)("div",{class:(0,r.C_)(["cell",e.cellClass]),style:(0,r.j5)(e.cellColour),onMousedown:t[0]||(t[0]=(0,l.iM)((e=>this.$emit("touchcell",this.id)),["prevent"])),onMousemove:t[1]||(t[1]=(...t)=>e.onMove&&e.onMove(...t)),onTouchstart:t[2]||(t[2]=(0,l.iM)((e=>this.$emit("touchcell",this.id)),["prevent"])),onTouchmove:t[3]||(t[3]=(...t)=>e.onMove&&e.onMove(...t))},(0,r.zw)(e.symbol),39)}]]),L=(0,i.aZ)({components:{mazecell:x},props:{width:Number,cells:Array},data(){return{rowWidth:this.$props.width??1,mazeCells:this.$props.cells??[]}},emits:["touchcell"],setup(){},computed:{cellRows(){let e=[];for(let t=0;t<this.mazeCells.length/this.rowWidth;t++)e.push(this.mazeCells.slice(t*this.rowWidth,(t+1)*this.rowWidth));return e}},methods:{forwardTouchCell(e){this.$emit("touchcell",e)}}});s(632);const M=(0,T.Z)(L,[["render",function(e,t,s,l,r,n){const a=(0,i.up)("mazecell");return(0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e.cellRows,((t,s)=>((0,i.wg)(),(0,i.iD)("div",{class:"row",key:s},[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(t,((t,l)=>((0,i.wg)(),(0,i.j4)(a,{colourScheme:0,cellValue:t.prob,cellType:t.cellType,id:l+s*this.rowWidth,key:l+s*this.rowWidth,onTouchcell:e.forwardTouchCell},null,8,["cellValue","cellType","id","onTouchcell"])))),128))])))),128)}]]),S=(0,i.Uk)(" Вставьте изображение или выберите файл для загрузки: "),C={type:"file",ref:"imgFile"},z=(0,i.aZ)({setup(){},data:()=>({processingState:"",debugOutput:"1"==new URLSearchParams(window.location.search.substring(1)).get("debug")}),emits:["haveMaze"],mounted(){let e=this;document.addEventListener("paste",(function(t){e.onPaste(t)})),this.$refs.imgFile.addEventListener("change",(function(t){const s=this.files;s&&0!=s.length&&e.readFile(s[0])}));let t=this.$refs.pasta,s=this.$refs.pixels;t.addEventListener("load",(function(l){let i=1;t.width>800&&(i=.5),s.width=t.width*i,s.height=t.height*i,s.getContext("2d")?.drawImage(t,0,0,s.width,s.height);let r=s.getContext("2d")?.getImageData(0,0,s.width,s.height);if(r){e.processingState="Загружаем...";try{let t=new m.fd(r.width,r.height,r.data);e.processingState="Проверяем...";let l=t.detect_maze(t.detect_grid());l.is_valid()?(e.processingState="Схема получена",e.$emit("haveMaze",l),t.debug_draw(l)):e.processingState="Загрузить схему подземки не удалось";let i=t.get_image_data(),n=new ImageData(i,s.width,s.height);s.getContext("2d")?.putImageData(n,0,0)}catch(t){alert(t),e.processingState=""}}}))},methods:{onPaste(e){if(e.clipboardData)for(var t=0;t<e.clipboardData.items.length;t++){let s=e.clipboardData.items[t];if("file"==s.kind&&s.type.match(/^image/)){let e=s.getAsFile();if(e){this.readFile(e);break}}}},readFile(e){let t=new FileReader,s=this.$refs.pasta;t.onload=function(e){console.log("Loading image"),s.src=this.result},t.readAsDataURL(e)}}});s(557);const k=(0,T.Z)(z,[["render",function(e,t,s,l,n,a){return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i._)("p",null,[S,(0,i._)("input",C,null,512)]),(0,i._)("p",null,(0,r.zw)(e.processingState),1),(0,i._)("img",{id:"paste",class:(0,r.C_)({debug:e.debugOutput}),ref:"pasta"},null,2),(0,i._)("canvas",{id:"pixels",class:(0,r.C_)({debug:e.debugOutput}),ref:"pixels"},null,2)],64)}]]),W=(0,i.aZ)({components:{maze:M,mazecell:x,imagePaste:k},data(){let e={cellType:m.bL.Wall,prob:0},t=new Array(400);for(let s=0;s<400;s++)t[s]={...e};return{field:new m.Qr,cells:t,drawMode:m.bL.Pass,specials:[-1,-1,-1],numSteps:0,isJumpy:!1}},computed:{mapUrl(){return window.location.origin+window.location.pathname+"?"+this.encodedMap},encodedMap(){let e="",t="AAA";for(let s=20;s<=360;s+=20){let l="";for(let e=1;e<=18;e+=6){let t=32*+(this.cells[s+e].cellType!=m.bL.Wall)+16*+(this.cells[s+e+1].cellType!=m.bL.Wall)+8*+(this.cells[s+e+2].cellType!=m.bL.Wall)+4*+(this.cells[s+e+3].cellType!=m.bL.Wall)+2*+(this.cells[s+e+4].cellType!=m.bL.Wall)+ +(this.cells[s+e+5].cellType!=m.bL.Wall);l+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".substr(t,1)}l==t?l="~":t=l,e+=l}return`f=${e}&e=${this.specials[0]}&t=${this.specials[1]}&s=${this.specials[2]}`},treasuryProb(){const e=this.specials[1];return-1==e?"0.00":this.cells[e].prob.toFixed(2)}},created(){let e=window.location.search.substring(1);e.length>0&&this.parseMap(e)},methods:{onMapLinkChange(e){const t=e.currentTarget.value;this.parseMap(t)},parseMap(e){try{const t=new URLSearchParams(e),s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";let l="AAA",i=t.get("f")||"";for(let e=20;e<=360;e+=20){let t="";"~"==i.substr(0,1)?(t=l,i=i.substring(1)):(t=i.substr(0,3),l=t,i=i.substring(3));for(let l=1;l<=18;l+=6){let i=s.indexOf(t.substr(0,1));t=t.substring(1);for(let t=0;t<6;t++)this.field.set_field(e+l+t,i&1<<5-t?m.bL.Pass:m.bL.Wall)}}this.specials[0]=parseInt(t.get("e")||"-1"),this.specials[1]=parseInt(t.get("t")||"-1"),this.specials[2]=parseInt(t.get("s")||"-1"),this.specials[0]>=0&&this.field.set_field(this.specials[0],m.bL.Entrance),this.specials[1]>=0&&this.field.set_field(this.specials[1],m.bL.Treasury),this.specials[2]>=0&&this.field.set_field(this.specials[2],m.bL.Subtreasury);for(let e=0;e<400;e++)this.cells[e].cellType=this.field.get_field(e),this.cells[e].prob=0;this.numSteps>0&&this.recalculate(this.numSteps)}catch(e){console.log(e)}},touchCell(e){if(this.cells[e].cellType!=this.drawMode){this.specials.indexOf(e)>=0&&(this.specials[this.specials.indexOf(e)]=-1),this.field.set_field(e,this.drawMode),this.cells[e].cellType=this.field.get_field(e);const t=[m.bL.Entrance,m.bL.Treasury,m.bL.Subtreasury].indexOf(this.drawMode);if(t>=0){const s=this.specials[t];s>=0&&(this.field.set_field(s,m.bL.Pass),this.cells[s].cellType=this.field.get_field(s)),this.specials[t]=e}this.specials[0]>=0&&this.specials[1]>=0&&this.numSteps>0&&this.recalculate(this.numSteps)}},selectTool(e){this.drawMode=e},recalculate(e,t=0){t||this.field.init(this.isJumpy);for(let s=1;s<=e;s++)this.field.step(s+t);for(let e=0;e<400;e++)this.cells[e].cellType!=m.bL.Wall&&(this.cells[e].prob=this.field.get_visited_probability(e))},reset(){this.field.init(this.isJumpy);for(let e=0;e<400;e++)this.cells[e].prob=0},onHaveMaze(e){e.apply_to_subway(this.field),this.specials=[-1,-1,-1];for(let e=0;e<400;e++){this.cells[e].cellType=this.field.get_field(e);const t=[m.bL.Entrance,m.bL.Treasury,m.bL.Subtreasury].indexOf(this.cells[e].cellType);t>=0&&(this.specials[t]=e)}this.numSteps>0&&this.recalculate(this.numSteps)}},watch:{numSteps(e,t){0==e?this.reset():this.specials[0]>=0&&this.specials[1]>=0&&e>0&&this.recalculate(e)}}});s(162);const D=(0,T.Z)(W,[["render",function(e,t,s,m,w,y){const v=(0,i.up)("maze"),T=(0,i.up)("mazecell"),x=(0,i.up)("imagePaste");return(0,i.wg)(),(0,i.iD)(i.HY,null,[n,(0,i._)("div",a,[(0,i.Wm)(v,{width:20,cells:e.cells,onTouchcell:e.touchCell},null,8,["cells","onTouchcell"]),(0,i._)("div",o,[(0,i._)("div",null,[((0,i.wg)(),(0,i.iD)(i.HY,null,(0,i.Ko)(5,(t=>(0,i.Wm)(T,{key:t,id:1e3+t,cellType:t-1,class:(0,r.C_)({selected:t-1==e.drawMode}),onClick:s=>e.selectTool(t-1),onTouchstart:s=>e.selectTool(t-1)},null,8,["id","cellType","class","onClick","onTouchstart"]))),64))])]),(0,i._)("div",c,[(0,i.wy)((0,i._)("input",{id:"numsteps",type:"range",min:"0",max:"100","onUpdate:modelValue":t[0]||(t[0]=t=>e.numSteps=t)},null,512),[[l.nr,e.numSteps]]),u,(0,i._)("span",null,"Шагов: "+(0,r.zw)(e.numSteps),1),(0,i._)("span",p,(0,r.zw)(e.treasuryProb)+" 💰",1)]),(0,i._)("div",d,[(0,i._)("label",null,[(0,i._)("a",{href:e.mapUrl},"Карта",8,h),_,(0,i._)("input",{value:e.encodedMap,onChange:t[1]||(t[1]=(...t)=>e.onMapLinkChange&&e.onMapLinkChange(...t))},null,40,f)])]),(0,i._)("div",g,[(0,i._)("label",null,[(0,i.wy)((0,i._)("input",{type:"checkbox","onUpdate:modelValue":t[2]||(t[2]=t=>e.isJumpy=t),onChange:t[3]||(t[3]=t=>e.recalculate(e.numSteps))},null,544),[[l.e8,e.isJumpy]]),b])])]),(0,i.Wm)(x,{onHaveMaze:e.onHaveMaze},null,8,["onHaveMaze"])],64)}]]);(0,l.ri)(D).mount("#main")},162:(e,t,s)=>{var l=s(363);l.__esModule&&(l=l.default),"string"==typeof l&&(l=[[e.id,l,""]]),l.locals&&(e.exports=l.locals),(0,s(346).Z)("41f6b3e8",l,!1,{})},557:(e,t,s)=>{var l=s(73);l.__esModule&&(l=l.default),"string"==typeof l&&(l=[[e.id,l,""]]),l.locals&&(e.exports=l.locals),(0,s(346).Z)("1438e6d2",l,!1,{})},632:(e,t,s)=>{var l=s(609);l.__esModule&&(l=l.default),"string"==typeof l&&(l=[[e.id,l,""]]),l.locals&&(e.exports=l.locals),(0,s(346).Z)("bf11b0f8",l,!1,{})},470:(e,t,s)=>{var l=s(265);l.__esModule&&(l=l.default),"string"==typeof l&&(l=[[e.id,l,""]]),l.locals&&(e.exports=l.locals),(0,s(346).Z)("3b610b53",l,!1,{})},168:(e,t,s)=>{"use strict";var l=s.w[e.id];e.exports=l,s(447),l[""]()}}]);