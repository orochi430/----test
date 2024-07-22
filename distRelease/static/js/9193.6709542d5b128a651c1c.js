"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[9193],{58086:function(t,i,e){function a(t,i){return JSON.stringify(t)===JSON.stringify(i)}var n=e(35976),c=e(40216),r=e(78054),s=e(95566),u=e(18169),h=e(94611),e=e(12098),n=(0,n.d)("slider"),l=n[0],d=n[1];i.Z=l({mixins:[h.D,e.f],props:{disabled:Boolean,vertical:Boolean,range:Boolean,barHeight:[Number,String],buttonSize:[Number,String],activeColor:String,inactiveColor:String,min:{type:[Number,String],default:0},max:{type:[Number,String],default:100},step:{type:[Number,String],default:1},value:{type:[Number,Array],default:0}},data:function(){return{dragStatus:""}},computed:{scope:function(){return this.max-this.min},buttonStyle:function(){var t;if(this.buttonSize)return{width:t=(0,c.N)(this.buttonSize),height:t}}},created:function(){this.updateValue(this.value)},mounted:function(){this.range?(this.bindTouchEvent(this.$refs.wrapper0),this.bindTouchEvent(this.$refs.wrapper1)):this.bindTouchEvent(this.$refs.wrapper)},methods:{onTouchStart:function(t){this.disabled||(this.touchStart(t),this.currentValue=this.value,this.range?this.startValue=this.value.map(this.format):this.startValue=this.format(this.value),this.dragStatus="start")},onTouchMove:function(t){this.disabled||("start"===this.dragStatus&&this.$emit("drag-start"),(0,s.PF)(t,!0),this.touchMove(t),this.dragStatus="draging",t=this.$el.getBoundingClientRect(),t=(this.vertical?this.deltaY:this.deltaX)/(this.vertical?t.height:t.width)*this.scope,this.range?this.currentValue[this.index]=this.startValue[this.index]+t:this.currentValue=this.startValue+t,this.updateValue(this.currentValue))},onTouchEnd:function(){this.disabled||("draging"===this.dragStatus&&(this.updateValue(this.currentValue,!0),this.$emit("drag-end")),this.dragStatus="")},onClick:function(t){var i,e;t.stopPropagation(),this.disabled||(e=this.$el.getBoundingClientRect(),t=this.vertical?t.clientY-e.top:t.clientX-e.left,e=this.vertical?e.height:e.width,t=+this.min+t/e*this.scope,this.range&&(t<=((i=(e=this.value)[0])+(e=e[1]))/2?i=t:e=t,t=[i,e]),this.startValue=this.value,this.updateValue(t,!0))},handleOverlap:function(t){return t[0]>t[1]?(t=(0,r.I)(t)).reverse():t},updateValue:function(t,i){t=this.range?this.handleOverlap(t).map(this.format):this.format(t),a(t,this.value)||this.$emit("input",t),i&&!a(t,this.startValue)&&this.$emit("change",t)},format:function(t){var i=+this.min,e=+this.max,a=+this.step,e=(t=(0,u.w6)(t,i,e),Math.round((t-i)/a)*a);return(0,u.Ft)(i,e)}},render:function(){function t(){var t=s.value,i=s.min,e=s.range,a=s.scope;return e?100*(t[0]-i)/a+"%":null}function i(i){var e="number"==typeof i,a=e?s.value[i]:s.value;return u("div",{ref:e?"wrapper"+i:"wrapper",attrs:{role:"slider",tabindex:s.disabled?-1:0,"aria-valuemin":s.min,"aria-valuenow":s.value,"aria-valuemax":s.max,"aria-orientation":s.vertical?"vertical":"horizontal"},class:d(e?"button-wrapper-"+["left","right"][i]:"button-wrapper"),on:{touchstart:function(){e&&(s.index=i)},click:function(t){return t.stopPropagation()}}},[function(){if(e){var t=s.slots(0===i?"left-button":"right-button",{value:a});if(t)return t}return s.slots("button")?s.slots("button"):u("div",{class:d("button"),style:s.buttonStyle})}()])}var e,a,n,r,s=this,u=arguments[0],h=this.vertical,l=h?"height":"width",o=((r={background:this.inactiveColor})[h?"width":"height"]=(0,c.N)(this.barHeight),(e={})[l]=(l=s.value,a=s.min,o=s.range,n=s.scope,o?100*(l[1]-l[0])/n+"%":100*(l-a)/n+"%"),e.left=this.vertical?null:t(),e.top=this.vertical?t():null,e.background=this.activeColor,e);this.dragStatus&&(o.transition="none");return u("div",{style:r,class:d({disabled:this.disabled,vertical:h}),on:{click:this.onClick}},[u("div",{class:d("bar"),style:o},[this.range?[i(0),i(1)]:i()])])}})},88152:function(t,i,e){e(99780)}}]);