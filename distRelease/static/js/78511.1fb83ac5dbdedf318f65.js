(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[78511],{99337:function(e,t,n){var i=n(76172),l=i.getLayoutRect,a=i.box,s=i.positionElement,o=n(78988),r=n(51177);t.layout=function(e,t,n){var i=t.getBoxLayoutParams(),o=t.get("padding"),n={width:n.getWidth(),height:n.getHeight()},r=l(i,n,o);a(t.get("orient"),e,t.get("itemGap"),r.width,r.height),s(e,i,n,o)},t.makeBackground=function(e,t){var n=o.normalizeCssArray(t.get("padding")),i=t.getItemStyle(["color","opacity"]);return i.fill=t.get("backgroundColor"),e=new r.Rect({shape:{x:e.x-n[3],y:e.y-n[0],width:e.width+n[1]+n[3],height:e.height+n[0]+n[2],r:t.get("borderRadius")},style:i,silent:!0,z2:-1})}},78511:function(e,t,n){var i=n(70492),o=(n(73650),n(13174),n(13134),n(3391)),n=n(98071);i.registerProcessor(i.PRIORITY.PROCESSOR.SERIES_FILTER,o),n.registerSubTypeDefaulter("legend",function(){return"plain"})},73650:function(e,t,n){var i=n(70492),l=n(33051),a=n(4272),s=n(32234).isNameSpecified,n=n(40292).legend.selector,o={all:{type:"all",title:l.clone(n.all)},inverse:{type:"inverse",title:l.clone(n.inverse)}},r=i.extendComponentModel({type:"legend.plain",dependencies:["series"],layoutMode:{type:"box",ignoreSize:!0},init:function(e,t,n){this.mergeDefaultAndTheme(e,n),e.selected=e.selected||{},this._updateSelector(e)},mergeOption:function(e){r.superCall(this,"mergeOption",e),this._updateSelector(e)},_updateSelector:function(e){var n=e.selector;!0===n&&(n=e.selector=["all","inverse"]),l.isArray(n)&&l.each(n,function(e,t){l.isString(e)&&(e={type:e}),n[t]=l.merge(e,o[e.type])})},optionUpdated:function(){this._updateData(this.ecModel);var e=this._data;if(e[0]&&"single"===this.get("selectedMode")){for(var t=!1,n=0;n<e.length;n++){var i=e[n].get("name");if(this.isSelected(i)){this.select(i),t=!0;break}}t||this.select(e[0].get("name"))}},_updateData:function(i){var o=[],r=[],e=(i.eachRawSeries(function(e){var t,n=e.name;r.push(n),e.legendVisualProvider&&(n=e.legendVisualProvider.getAllNames(),i.isSeriesFiltered(e)||(r=r.concat(n)),n.length)?o=o.concat(n):t=!0,t&&s(e)&&o.push(e.name)}),this._availableNames=r,this.get("data")||o),e=l.map(e,function(e){return new a(e="string"!=typeof e&&"number"!=typeof e?e:{name:e},this,this.ecModel)},this);this._data=e},getData:function(){return this._data},select:function(e){var t,n=this.option.selected;"single"===this.get("selectedMode")&&(t=this._data,l.each(t,function(e){n[e.get("name")]=!1})),n[e]=!0},unSelect:function(e){"single"!==this.get("selectedMode")&&(this.option.selected[e]=!1)},toggleSelected:function(e){var t=this.option.selected;t.hasOwnProperty(e)||(t[e]=!0),this[t[e]?"unSelect":"select"](e)},allSelect:function(){var e=this._data,t=this.option.selected;l.each(e,function(e){t[e.get("name",!0)]=!0})},inverseSelect:function(){var e=this._data,t=this.option.selected;l.each(e,function(e){e=e.get("name",!0);t.hasOwnProperty(e)||(t[e]=!0),t[e]=!t[e]})},isSelected:function(e){var t=this.option.selected;return!(t.hasOwnProperty(e)&&!t[e])&&0<=l.indexOf(this._availableNames,e)},getOrient:function(){return"vertical"===this.get("orient")?{index:1,name:"vertical"}:{index:0,name:"horizontal"}},defaultOption:{zlevel:0,z:4,show:!0,orient:"horizontal",left:"center",top:0,align:"auto",backgroundColor:"rgba(0,0,0,0)",borderColor:"#ccc",borderRadius:0,borderWidth:0,padding:5,itemGap:10,itemWidth:25,itemHeight:14,inactiveColor:"#ccc",inactiveBorderColor:"#ccc",itemStyle:{borderWidth:0},textStyle:{color:"#333"},selectedMode:!0,selector:!1,selectorLabel:{show:!0,borderRadius:10,padding:[3,5,3,5],fontSize:12,fontFamily:" sans-serif",color:"#666",borderWidth:1,borderColor:"#666"},emphasis:{selectorLabel:{show:!0,color:"#eee",backgroundColor:"#666"}},selectorPosition:"auto",selectorItemGap:7,selectorButtonGap:10,tooltip:{show:!1}}});e.exports=r},13134:function(e,t,n){n(38175).__DEV__;var i=n(70492),w=n(33051),_=n(41525).createSymbol,C=n(51177),c=n(99337).makeBackground,p=n(76172),f=w.curry,o=w.each,R=C.Group,n=i.extendComponentView({type:"legend.plain",newlineDisabled:!1,init:function(){this.group.add(this._contentGroup=new R),this._backgroundEl,this.group.add(this._selectorGroup=new R),this._isFirstRender=!0},getContentGroup:function(){return this._contentGroup},getSelectorGroup:function(){return this._selectorGroup},render:function(e,t,n){var i,o,r,l,a,s=this._isFirstRender;this._isFirstRender=!1,this.resetInner(),e.get("show",!0)&&(l=e.get("align"),r=e.get("orient"),l&&"auto"!==l||(l="right"===e.get("left")&&"vertical"===r?"right":"left"),i=e.get("selector",!0),o=e.get("selectorPosition",!0),this.renderInner(l,e,t,n,i,r,o=!i||o&&"auto"!==o?o:"horizontal"===r?"end":"start"),t=e.getBoxLayoutParams(),r={width:n.getWidth(),height:n.getHeight()},n=e.get("padding"),a=p.getLayoutRect(t,r,n),l=this.layoutInner(e,l,a,s,i,o),a=p.getLayoutRect(w.defaults({width:l.width,height:l.height},t),r,n),this.group.attr("position",[a.x-l.x,a.y-l.y]),this.group.add(this._backgroundEl=c(l,e)))},resetInner:function(){this.getContentGroup().removeAll(),this._backgroundEl&&this.group.remove(this._backgroundEl),this.getSelectorGroup().removeAll()},renderInner:function(s,c,d,g,e,t,n){var u=this.getContentGroup(),h=w.createHashMap(),p=c.get("selectedMode"),m=[];d.eachRawSeries(function(e){e.get("legendHoverLink")||m.push(e.id)}),o(c.getData(),function(i,o){var e,t,n,r,l,a=i.get("name");this.newlineDisabled||""!==a&&"\n"!==a?(e=d.getSeriesByName(a)[0],h.get(a)||(e?(t=(l=e.getData()).getVisual("color"),n=l.getVisual("borderColor"),"function"==typeof t&&(t=t(e.getDataParams(0))),"function"==typeof n&&(n=n(e.getDataParams(0))),r=l.getVisual("legendSymbol")||"roundRect",l=l.getVisual("symbol"),this._createItem(a,o,i,c,r,l,s,t,n,p).on("click",f(y,a,null,g,m)).on("mouseover",f(v,e.name,null,g,m)).on("mouseout",f(S,e.name,null,g,m)),h.set(a,!0)):d.eachRawSeries(function(e){var t,n;h.get(a)||e.legendVisualProvider&&(e=e.legendVisualProvider).containName(a)&&(t=e.indexOfName(a),n=e.getItemVisual(t,"color"),e=e.getItemVisual(t,"borderColor"),this._createItem(a,o,i,c,"roundRect",null,s,n,e,p).on("click",f(y,null,a,g,m)).on("mouseover",f(v,null,a,g,m)).on("mouseout",f(S,null,a,g,m)),h.set(a,!0))},this))):u.add(new R({newline:!0}))},this),e&&this._createSelector(e,c,g,t,n)},_createSelector:function(e,r,l,t,n){var a=this.getSelectorGroup();o(e,function(e){var t,n,i,o;t=(e=e).type,n=new C.Text({style:{x:0,y:0,align:"center",verticalAlign:"middle"},onclick:function(){l.dispatchAction({type:"all"===t?"legendAllSelect":"legendInverseSelect"})}}),a.add(n),i=r.getModel("selectorLabel"),o=r.getModel("emphasis.selectorLabel"),C.setLabelStyle(n.style,n.hoverStyle={},i,o,{defaultText:e.title,isRectText:!1}),C.setHoverStyle(n)})},_createItem:function(e,t,n,i,o,r,l,a,s,c){var d=i.get("itemWidth"),g=i.get("itemHeight"),u=i.get("inactiveColor"),h=i.get("inactiveBorderColor"),p=i.get("symbolKeepAspect"),m=i.getModel("itemStyle"),f=i.isSelected(e),y=new R,v=n.getModel("textStyle"),S=n.get("icon"),n=n.getModel("tooltip"),x=n.parentModel,b=_(o=S||o,0,0,d,g,f?a:u,null==p||p),o=(y.add(I(b,o,m,s,h,f)),S||!r||r===o&&"none"!==r||(S=_(r="none"===r?"circle":r,(d-(b=.8*g))/2,(g-b)/2,b,b,f?a:u,null==p||p),y.add(I(S,r,m,s,h,f))),"left"===l?d+5:-5),b=l,a=i.get("formatter"),p=e,S=("string"==typeof a&&a?p=a.replace("{name}",null!=e?e:""):"function"==typeof a&&(p=a(e)),y.add(new C.Text({style:C.setTextStyle({},v,{text:p,x:o,y:g/2,textFill:f?v.getTextColor():u,textAlign:b,textVerticalAlign:"middle"})})),new C.Rect({shape:y.getBoundingRect(),invisible:!0,tooltip:n.get("show")?w.extend({content:e,formatter:x.get("formatter",!0)||function(){return e},formatterParams:{componentType:"legend",legendIndex:i.componentIndex,name:e,$vars:["name"]}},n.option):null}));return y.add(S),y.eachChild(function(e){e.silent=!0}),S.silent=!c,this.getContentGroup().add(y),C.setHoverStyle(y),y.__legendDataIndex=t,y},layoutInner:function(e,t,n,i,o,r){var l,a,s,c,d,g=this.getContentGroup(),u=this.getSelectorGroup(),n=(p.box(e.get("orient"),g,e.get("itemGap"),n.width,n.height),g.getBoundingRect()),h=[-n.x,-n.y];return o?(p.box("horizontal",u,e.get("selectorItemGap",!0)),l=[-(o=u.getBoundingRect()).x,-o.y],a=e.get("selectorButtonGap",!0),s=0===(e=e.getOrient().index)?"width":"height",c=0===e?"height":"width",d=0===e?"y":"x","end"===r?l[e]+=n[s]+a:h[e]+=o[s]+a,l[1-e]+=n[c]/2-o[c]/2,u.attr("position",l),g.attr("position",h),(r={x:0,y:0})[s]=n[s]+a+o[s],r[c]=Math.max(n[c],o[c]),r[d]=Math.min(0,o[d]+l[1-e]),r):(g.attr("position",h),this.group.getBoundingRect())},remove:function(){this.getContentGroup().removeAll(),this._isFirstRender=!0}});function I(e,t,n,i,o,r){var l;return"line"!==t&&t.indexOf("empty")<0?(l=n.getItemStyle(),e.style.stroke=i,r||(l.stroke=o)):l=n.getItemStyle(["borderWidth","borderColor"]),e.setStyle(l)}function y(e,t,n,i){S(e,t,n,i),n.dispatchAction({type:"legendToggleSelect",name:null!=e?e:t}),v(e,t,n,i)}function v(e,t,n,i){var o=n.getZr().storage.getDisplayList()[0];o&&o.useHoverLayer||n.dispatchAction({type:"highlight",seriesName:e,name:t,excludeSeriesId:i})}function S(e,t,n,i){var o=n.getZr().storage.getDisplayList()[0];o&&o.useHoverLayer||n.dispatchAction({type:"downplay",seriesName:e,name:t,excludeSeriesId:i})}e.exports=n},13174:function(e,t,n){var i=n(70492),a=n(33051);function o(t,i,e){var o,r={},l="toggleSelected"===t;return e.eachComponent("legend",function(n){l&&null!=o?n[o?"select":"unSelect"](i.name):"allSelect"===t||"inverseSelect"===t?n[t]():(n[t](i.name),o=n.isSelected(i.name));var e=n.getData();a.each(e,function(e){var t,e=e.get("name");"\n"!==e&&""!==e&&(t=n.isSelected(e),r.hasOwnProperty(e)?r[e]=r[e]&&t:r[e]=t)})}),"allSelect"===t||"inverseSelect"===t?{selected:r}:{name:i.name,selected:r}}i.registerAction("legendToggleSelect","legendselectchanged",a.curry(o,"toggleSelected")),i.registerAction("legendAllSelect","legendselectall",a.curry(o,"allSelect")),i.registerAction("legendInverseSelect","legendinverseselect",a.curry(o,"inverseSelect")),i.registerAction("legendSelect","legendselected",a.curry(o,"select")),i.registerAction("legendUnSelect","legendunselected",a.curry(o,"unSelect"))},3391:function(e){e.exports=function(e){var n=e.findComponents({mainType:"legend"});n&&n.length&&e.filterSeries(function(e){for(var t=0;t<n.length;t++)if(!n[t].isSelected(e.name))return!1;return!0})}}}]);