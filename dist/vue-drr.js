!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.VueDrr=e():t.VueDrr=e()}("undefined"!=typeof self?self:this,function(){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var s=e[i]={i:i,l:!1,exports:{}};return t[i].call(s.exports,s,s.exports,n),s.l=!0,s.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e,n){"use strict";e.a={name:"vue-drr",props:{active:{type:Boolean,default:!1},draggable:{type:Boolean,default:!0},resizable:{type:Boolean,default:!0},rotatable:{type:Boolean,default:!0},w:{type:Number,default:200,validator:function(t){return t>0}},h:{type:Number,default:200,validator:function(t){return t>0}},minw:{type:Number,default:50,validator:function(t){return t>0}},minh:{type:Number,default:50,validator:function(t){return t>0}},angle:{type:Number,default:0,validator:function(t){return"number"==typeof t}},x:{type:Number,default:0,validator:function(t){return"number"==typeof t}},y:{type:Number,default:0,validator:function(t){return"number"==typeof t}},handles:{type:Array,default:function(){return["n","e","s","w","nw","ne","se","sw"]}},axis:{type:String,default:"both",validator:function(t){return-1!==["x","y","both"].indexOf(t)}},grid:{type:Array,default:function(){return[1,1]}},parent:{type:Boolean,default:!1}},created:function(){this.parentW=9999,this.parentH=9999,this.lastMouseX=0,this.lastMouseY=0,this.mouseOffX=0,this.mouseOffY=0,this.elmX=0,this.elmY=0,this.elmW=0,this.elmH=0},mounted:function(){document.documentElement.addEventListener("mousedown",this.deselect,!0),document.documentElement.addEventListener("mousemove",this.handleMove,!0),document.documentElement.addEventListener("mouseup",this.handleUp,!0),this.elmX=parseInt(this.$el.style.left),this.elmY=parseInt(this.$el.style.top),this.elmW=this.$el.offsetWidth||this.$el.clientWidth,this.elmH=this.$el.offsetHeight||this.$el.clientHeight,this.reviewDimensions()},beforeDestroy:function(){document.documentElement.removeEventListener("mousedown",this.deselect,!0),document.documentElement.removeEventListener("mousemove",this.handleMove,!0),document.documentElement.removeEventListener("mouseup",this.handleUp,!0)},data:function(){return{top:this.y,left:this.x,width:this.w,height:this.h,rotateAngle:this.angle,resizing:!1,dragging:!1,rotating:!1,enabled:this.active,handle:null}},methods:{reviewDimensions:function(){if(this.minw>this.w&&(this.width=this.minw),this.minh>this.h&&(this.height=this.minh),this.parent){var t=parseInt(this.$el.parentNode.clientWidth,10),e=parseInt(this.$el.parentNode.clientHeight,10);this.parentW=t,this.parentH=e,this.w>t&&(this.width=t),this.h>e&&(this.height=e),this.x+this.w>t&&(this.width=t-this.x),this.y+this.h>e&&(this.height=e-this.y),this.elmW=this.width,this.elmH=this.height}},elmDown:function(t){var e=t.target||t.srcElement;this.$el.contains(e)&&(this.reviewDimensions(),this.enabled||(this.enabled=!0,this.$emit("activated"),this.$emit("update:active",!0)),this.draggable&&(this.dragging=!0))},deselect:function(t){this.$el.contains(t.target)&&t.preventDefault(),this.lastMouseX=t.pageX||t.clientX+document.documentElement.scrollLeft,this.lastMouseY=t.pageY||t.clientY+document.documentElement.scrollTop;var e=t.target||t.srcElement,n=new RegExp("z-handle-([nesw]{1, 2})","");this.$el.contains(e)||n.test(e.className)||this.enabled&&(this.enabled=!1,this.$emit("deactivated"),this.$emit("update:active",!1))},handleResizeStart:function(t,e){this.handle=t,e.stopPropagation&&e.stopPropagation(),e.preventDefault&&e.preventDefault(),this.resizing=!0},getOrigin:function(){var t=this.$el.getBoundingClientRect();return{x:(t.left+t.right)/2,y:(t.bottom+t.top)/2}},handleMove:function(t){var e=this.lastMouseX,n=this.lastMouseY,i=t.pageX||t.clientX+document.documentElement.scrollLeft,s=t.pageY||t.clientY+document.documentElement.scrollTop,r=i-this.lastMouseX+this.mouseOffX,o=s-this.lastMouseY+this.mouseOffY;this.mouseOffX=this.mouseOffY=0,this.lastMouseX=i,this.lastMouseY=s;var a=r,h=o;if(this.resizing)this.handle.indexOf("n")>=0&&(this.elmH-h<this.minh?o=this.elmH-this.minh:this.elmY+h<0&&(o=-this.elmY),this.mouseOffY=h-o,this.elmY+=o,this.elmH-=o),this.handle.indexOf("s")>=0&&(this.elmH+h<this.minh?o=this.minh-this.elmH:this.elmY+this.elmH+h>this.parentH&&(o=this.parentH-this.elmY-this.elmH),this.mouseOffY=h-o,this.elmH+=o),this.handle.indexOf("w")>=0&&(this.elmW-a<this.minw?r=this.elmW-this.minw:this.elmX+a<0&&(r=-this.elmX),this.mouseOffX=a-r,this.elmX+=r,this.elmW-=r),this.handle.indexOf("e")>=0&&(this.elmW+a<this.minw?r=this.minw-this.elmW:this.elmX+this.elmW+a>this.parentW&&(r=this.parentW-this.elmX-this.elmW),this.mouseOffX=a-r,this.elmW+=r),this.left=Math.round(this.elmX/this.grid[0])*this.grid[0],this.top=Math.round(this.elmY/this.grid[1])*this.grid[1],this.width=Math.round(this.elmW/this.grid[0])*this.grid[0],this.height=Math.round(this.elmH/this.grid[1])*this.grid[1],this.$emit("resizing",this.left,this.top,this.width,this.height);else if(this.dragging)this.parent&&(this.elmX+a<0?r=-this.elmX:this.elmX+this.elmW+a>this.parentW&&(r=this.parentW-this.elmX-this.elmW),this.elmY+h<0?o=-this.elmY:this.elmY+this.elmH+h>this.parentH&&(o=this.parentH-this.elmY-this.elmH),this.mouseOffX=a-r,this.mouseOffY=h-o),this.elmX+=r,this.elmY+=o,"x"!==this.axis&&"both"!==this.axis||(this.left=Math.round(this.elmX/this.grid[0])*this.grid[0]),"y"!==this.axis&&"both"!==this.axis||(this.top=Math.round(this.elmY/this.grid[1])*this.grid[1]),this.$emit("dragging",this.left,this.top);else if(this.rotating){var l=this.getOrigin(),d=Math.atan2(n-l.y,e-l.x),u=Math.atan2(s-l.y,i-l.x);this.rotateAngle+=Math.round(180*(u-d)/Math.PI),this.$emit("rotating",this.rotateAngle)}},handleUp:function(t){this.handle=null,this.resizing&&(this.resizing=!1,this.$emit("resizestop",this.left,this.top,this.width,this.height)),this.dragging&&(this.dragging=!1,this.$emit("dragstop",this.left,this.top)),this.rotating&&(this.rotating=!1,this.$emit("rotatestop",this.rotateAngle)),this.elmX=this.left,this.elmY=this.top}},computed:{style:function(){return{top:this.top+"px",left:this.left+"px",width:this.width+"px",height:this.height+"px",transform:"rotate("+this.rotateAngle+"deg)"}}},watch:{active:function(t){this.enabled=t}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(2);n.d(e,"default",function(){return i.a})},function(t,e,n){"use strict";var i=n(0),s=n(11);var r=function(t){n(3)},o=n(10)(i.a,s.a,!1,r,null,null);e.a=o.exports},function(t,e,n){var i=n(4);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n(8)("b31fa00c",i,!0,{})},function(t,e,n){var i=n(5);(t.exports=n(6)(!1)).push([t.i,"\n.z-drr-container {\n  position: absolute;\n}\n.z-drr-container *, .z-drr-container *:before, .z-drr-container *:after {\n    padding: 0;\n    margin: 0;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box;\n}\n.z-draggable:hover {\n  cursor: move;\n}\n.z-rotateable-handle {\n  position: absolute;\n  left: 50%;\n  top: -36px;\n  width: 1px;\n  height: 36px;\n  margin-left: -.5px;\n  background-color: #32a6d0;\n  cursor: url("+i(n(7))+") 8 8, default;\n}\n.z-rotateable-handle:after {\n    content: ' ';\n    top: 0;\n    left: 0;\n    margin-left: -5.5px;\n    position: absolute;\n    width: 12px;\n    height: 12px;\n    border: 1px solid #32a6d0;\n    border-radius: 50%;\n    background: #32a6d0;\n}\n.z-resizeable-handle {\n  display: none;\n  position: absolute;\n}\n.z-handle-nw,\n.z-handle-ne,\n.z-handle-sw,\n.z-handle-se {\n  position: absolute;\n  width: 12px;\n  height: 12px;\n  border: 1px solid #32a6d0;\n  border-radius: 50%;\n  background: #fff;\n}\n.z-handle-nw {\n  top: -6px;\n  left: -6px;\n  cursor: nw-resize;\n}\n.z-handle-ne {\n  top: -6px;\n  right: -6px;\n  cursor: ne-resize;\n}\n.z-handle-sw {\n  bottom: -6px;\n  left: -6px;\n  cursor: sw-resize;\n}\n.z-handle-se {\n  bottom: -6px;\n  right: -6px;\n  cursor: se-resize;\n}\n.z-handle-n:after,\n.z-handle-w:after,\n.z-handle-e:after,\n.z-handle-s:after {\n  content: ' ';\n  position: absolute;\n  width: 12px;\n  height: 12px;\n  border: 1px solid #32a6d0;\n  border-radius: 50%;\n  background: #fff;\n}\n.z-handle-n {\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 6px;\n  border-top: 1px solid #32a6d0;\n  cursor: n-resize;\n}\n.z-handle-n:after {\n    bottom: 0;\n    left: 50%;\n    margin-left: -6px;\n}\n.z-handle-w {\n  top: 0;\n  left: 0;\n  width: 6px;\n  height: 100%;\n  border-left: 1px solid #32a6d0;\n  cursor: w-resize;\n}\n.z-handle-w:after {\n    top: 50%;\n    right: 0;\n    margin-top: -6px;\n}\n.z-handle-e {\n  top: 0;\n  right: 0;\n  width: 6px;\n  height: 100%;\n  border-right: 1px solid #32a6d0;\n  cursor: e-resize;\n}\n.z-handle-e:after {\n    top: 50%;\n    left: 0;\n    margin-top: -6px;\n}\n.z-handle-s {\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 6px;\n  border-bottom: 1px solid #32a6d0;\n  cursor: s-resize;\n}\n.z-handle-s:after {\n    top: 0;\n    left: 50%;\n    margin-left: -6px;\n}\n.z-active {\n  z-index: 999;\n}\n",""])},function(t,e){t.exports=function(t){return"string"!=typeof t?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),/["'() \t\n]/.test(t)?'"'+t.replace(/"/g,'\\"').replace(/\n/g,"\\n")+'"':t)}},function(t,e){t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=function(t,e){var n=t[1]||"",i=t[3];if(!i)return n;if(e&&"function"==typeof btoa){var s=(o=i,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),r=i.sources.map(function(t){return"/*# sourceURL="+i.sourceRoot+t+" */"});return[n].concat(r).concat([s]).join("\n")}var o;return[n].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var i={},s=0;s<this.length;s++){var r=this[s][0];"number"==typeof r&&(i[r]=!0)}for(s=0;s<t.length;s++){var o=t[s];"number"==typeof o[0]&&i[o[0]]||(n&&!o[2]?o[2]=n:n&&(o[2]="("+o[2]+") and ("+n+")"),e.push(o))}},e}},function(t,e,n){t.exports=n.p+"mouserotate.png?827e4000f1e3f0a08fe5d82675d53e32"},function(t,e,n){var i="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!i)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var s=n(9),r={},o=i&&(document.head||document.getElementsByTagName("head")[0]),a=null,h=0,l=!1,d=function(){},u=null,f="data-vue-ssr-id",p="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function c(t){for(var e=0;e<t.length;e++){var n=t[e],i=r[n.id];if(i){i.refs++;for(var s=0;s<i.parts.length;s++)i.parts[s](n.parts[s]);for(;s<n.parts.length;s++)i.parts.push(g(n.parts[s]));i.parts.length>n.parts.length&&(i.parts.length=n.parts.length)}else{var o=[];for(s=0;s<n.parts.length;s++)o.push(g(n.parts[s]));r[n.id]={id:n.id,refs:1,parts:o}}}}function m(){var t=document.createElement("style");return t.type="text/css",o.appendChild(t),t}function g(t){var e,n,i=document.querySelector("style["+f+'~="'+t.id+'"]');if(i){if(l)return d;i.parentNode.removeChild(i)}if(p){var s=h++;i=a||(a=m()),e=x.bind(null,i,s,!1),n=x.bind(null,i,s,!0)}else i=m(),e=function(t,e){var n=e.css,i=e.media,s=e.sourceMap;i&&t.setAttribute("media",i);u.ssrId&&t.setAttribute(f,e.id);s&&(n+="\n/*# sourceURL="+s.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */");if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,i),n=function(){i.parentNode.removeChild(i)};return e(t),function(i){if(i){if(i.css===t.css&&i.media===t.media&&i.sourceMap===t.sourceMap)return;e(t=i)}else n()}}t.exports=function(t,e,n,i){l=n,u=i||{};var o=s(t,e);return c(o),function(e){for(var n=[],i=0;i<o.length;i++){var a=o[i];(h=r[a.id]).refs--,n.push(h)}e?c(o=s(t,e)):o=[];for(i=0;i<n.length;i++){var h;if(0===(h=n[i]).refs){for(var l=0;l<h.parts.length;l++)h.parts[l]();delete r[h.id]}}}};var v,b=(v=[],function(t,e){return v[t]=e,v.filter(Boolean).join("\n")});function x(t,e,n,i){var s=n?"":i.css;if(t.styleSheet)t.styleSheet.cssText=b(e,s);else{var r=document.createTextNode(s),o=t.childNodes;o[e]&&t.removeChild(o[e]),o.length?t.insertBefore(r,o[e]):t.appendChild(r)}}},function(t,e){t.exports=function(t,e){for(var n=[],i={},s=0;s<e.length;s++){var r=e[s],o=r[0],a={id:t+":"+s,css:r[1],media:r[2],sourceMap:r[3]};i[o]?i[o].parts.push(a):n.push(i[o]={id:o,parts:[a]})}return n}},function(t,e){t.exports=function(t,e,n,i,s,r){var o,a=t=t||{},h=typeof t.default;"object"!==h&&"function"!==h||(o=t,a=t.default);var l,d="function"==typeof a?a.options:a;if(e&&(d.render=e.render,d.staticRenderFns=e.staticRenderFns,d._compiled=!0),n&&(d.functional=!0),s&&(d._scopeId=s),r?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},d._ssrRegister=l):i&&(l=i),l){var u=d.functional,f=u?d.render:d.beforeCreate;u?(d._injectStyles=l,d.render=function(t,e){return l.call(e),f(t,e)}):d.beforeCreate=f?[].concat(f,l):[l]}return{esModule:o,exports:a,options:d}}},function(t,e,n){"use strict";var i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"z-drr-container",class:{"z-draggable":t.draggable,"z-resizable":t.resizable,"z-rotatable":t.rotatable,"z-active":t.enabled,"z-dragging":t.dragging,"z-resizing":t.resizing,"z-rotating":t.rotating},style:t.style,on:{mousedown:function(e){return e.stopPropagation(),t.elmDown(e)}}},[t._t("default"),t._v(" "),t.rotatable?n("div",{staticClass:"z-rotateable-handle",style:{display:t.enabled?"block":"none"},on:{mousedown:function(e){e.stopPropagation(),e.preventDefault(),t.rotating=!0}}}):t._e(),t._v(" "),t._l(t.handles,function(e){return t.resizable?n("div",{staticClass:"z-resizeable-handle",class:"z-handle-"+e,style:{display:t.enabled?"block":"none"},on:{mousedown:function(n){n.stopPropagation(),n.preventDefault(),t.handleResizeStart(e,n)}}}):t._e()})],2)},staticRenderFns:[]};e.a=i}])});