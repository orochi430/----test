var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.findInternal=function(c,l,h){c instanceof String&&(c=String(c));for(var m=c.length,d=0;d<m;d++){var f=c[d];if(l.call(h,f,d,c))return{i:d,v:f}}return{i:-1,v:void 0}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(c,l,h){c!=Array.prototype&&c!=Object.prototype&&(c[l]=h.value)};$jscomp.getGlobal=function(c){return"undefined"!=typeof window&&window===c?c:"undefined"!=typeof global&&null!=global?global:c};$jscomp.global=$jscomp.getGlobal(this);$jscomp.polyfill=function(c,l,h,m){if(l){h=$jscomp.global;c=c.split(".");for(m=0;m<c.length-1;m++){var d=c[m];d in h||(h[d]={});h=h[d]}c=c[c.length-1];m=h[c];l=l(m);l!=m&&null!=l&&$jscomp.defineProperty(h,c,{configurable:!0,writable:!0,value:l})}};$jscomp.polyfill("Array.prototype.find",function(c){return c?c:function(c,h){return $jscomp.findInternal(this,c,h).v}},"es6","es3");!function(){function c(d){d=h[d];if("object"===typeof d)return d;d.exports||(d.exports={},d.exports=d.call(d.exports,c,d.exports,d)||d.exports);return d.exports}function l(d,f){h[d]=f}var h={},m=!1;window.JSON&&(m='{"x":"\u4e2d"}'!==window.JSON.stringify({x:"\u4e2d"}));l("jquery",function(){return jQuery});l("popup",function(d){function f(){this.destroyed=!1;this.__popup=c("<div />").css({display:"none",position:"absolute",outline:0}).attr("tabindex","-1").html(this.innerHTML).appendTo("body");this.__backdrop=this.__mask=c("<div />").css({opacity:.7,background:"#000"});this.node=this.__popup[0];this.backdrop=this.__backdrop[0];h++}var c=d("jquery"),h=0,k=!("minWidth"in c("html")[0].style),l=!k;c.extend(f.prototype,{node:null,backdrop:null,fixed:!1,destroyed:!0,open:!1,returnValue:"",autofocus:!0,align:"bottom left",innerHTML:"",className:"ui-popup",show:function(b){if(this.destroyed)return this;var g=this.__popup,n=this.__backdrop;this.__activeElement=this.__getActive();this.open=!0;this.follow=b||this.follow;if(!this.__ready){g.addClass(this.className).attr("role",this.modal?"alertdialog":"dialog").css("position",this.fixed?"fixed":"absolute");if(!k)c(window).on("resize",c.proxy(this.reset,this));this.modal&&(b={position:"fixed",left:0,top:0,width:"100%",height:"100%",overflow:"hidden",userSelect:"none",zIndex:this.zIndex||f.zIndex},g.addClass(this.className+"-modal"),l||c.extend(b,{position:"absolute",width:c(window).width()+"px",height:c(document).height()+"px"}),n.css(b).attr({tabindex:"0"}).on("focus",c.proxy(this.focus,this)),this.__mask=n.clone(!0).attr("style","").insertAfter(g),n.addClass(this.className+"-backdrop").insertBefore(g),this.__ready=!0);g.html()||g.html(this.innerHTML)}g.addClass(this.className+"-show").show();n.show();this.reset().focus();this.__dispatchEvent("show");return this},showModal:function(){this.modal=!0;return this.show.apply(this,arguments)},close:function(b){!this.destroyed&&this.open&&(void 0!==b&&(this.returnValue=b),this.__popup.hide().removeClass(this.className+"-show"),this.__backdrop.hide(),this.open=!1,this.blur(),this.__dispatchEvent("close"));return this},remove:function(){if(this.destroyed)return this;this.__dispatchEvent("beforeremove");f.current===this&&(f.current=null);this.__popup.remove();this.__backdrop.remove();this.__mask.remove();k||c(window).off("resize",this.reset);this.__dispatchEvent("remove");for(var b in this)delete this[b];return this},reset:function(){var b=this.follow;b?this.__follow(b):this.__center();this.__dispatchEvent("reset");return this},focus:function(){var b=this.node,g=this.__popup,n=f.current,e=this.zIndex=f.zIndex++;n&&n!==this&&n.blur(!1);c.contains(b,this.__getActive())||(n=g.find("[autofocus]")[0],!this._autofocus&&n?this._autofocus=!0:n=b,this.__focus(n));g.css("zIndex",e);f.current=this;g.addClass(this.className+"-focus");this.__dispatchEvent("focus");return this},blur:function(b){var g=this.__activeElement;!1!==b&&this.__focus(g);this._autofocus=!1;this.__popup.removeClass(this.className+"-focus");this.__dispatchEvent("blur");return this},addEventListener:function(b,g){this.__getEventListener(b).push(g);return this},removeEventListener:function(b,g){b=this.__getEventListener(b);for(var c=0;c<b.length;c++)g===b[c]&&b.splice(c--,1);return this},__getEventListener:function(b){var c=this.__listener;c||(c=this.__listener={});c[b]||(c[b]=[]);return c[b]},__dispatchEvent:function(b){var c=this.__getEventListener(b);if(this["on"+b])this["on"+b]();for(b=0;b<c.length;b++)c[b].call(this)},__focus:function(b){try{this.autofocus&&!/^iframe$/i.test(b.nodeName)&&b.focus()}catch(g){}},__getActive:function(){try{var b=document.activeElement,c=b.contentDocument;return c&&c.activeElement||b}catch(n){}},__center:function(){var b=this.__popup,g=c(window),d=c(document),e=this.fixed,a=e?0:d.scrollLeft();d=e?0:d.scrollTop();e=g.width();var f=g.height();g=b.width();var k=b.height();f=382*(f-k)/1E3+d;b=b[0].style;b.left=Math.max(parseInt((e-g)/2+a),a)+"px";b.top=Math.max(parseInt(f),d)+"px"},__follow:function(b){var g=b.parentNode&&c(b),d=this.__popup;this.__followSkin&&d.removeClass(this.__followSkin);if(g){var e=g.offset();if(0>e.left*e.top)return this.__center()}var a=this.fixed,f=c(window);e=c(document);var k=f.width(),h=f.height(),u=e.scrollLeft(),t=e.scrollTop();e=d.width();f=d.height();var l=g?g.outerWidth():0,m=g?g.outerHeight():0,q=this.__offset(b);b=q.left;q=q.top;b=a?b-u:b;q=a?q-t:q;u=a?0:u;a=a?0:t;k=u+k-e;h=a+h-f;t={};var p=this.align.split(" "),w=this.className+"-",x={top:"bottom",bottom:"top",left:"right",right:"left"},r={top:"top",bottom:"top",left:"left",right:"left"},v=[{top:q-f,bottom:q+m,left:b-e,right:b+l},{top:q,bottom:q-f+m,left:b,right:b-e+l}];e={left:b+l/2-e/2,top:q+m/2-f/2};var y={left:[u,k],top:[a,h]};c.each(p,function(b,a){v[b][a]>y[r[a]][1]&&(a=p[b]=x[a]);v[b][a]<y[r[a]][0]&&(p[b]=x[a])});p[1]||(r[p[1]]="left"===r[p[0]]?"top":"left",v[1][p[1]]=e[r[p[1]]]);this.__followSkin=w+=p.join("-")+" "+this.className+"-follow";g&&d.addClass(w);t[r[p[0]]]=parseInt(v[0][p[0]]);t[r[p[1]]]=parseInt(v[1][p[1]]);d.css(t)},__offset:function(b){var d=b.parentNode,f=d?c(b).offset():{left:b.pageX,top:b.pageY};b=d?b:b.target;d=b.ownerDocument;b=d.defaultView||d.parentWindow;if(b==window)return f;b=b.frameElement;var e=c(d);d=e.scrollLeft();e=e.scrollTop();b=c(b).offset();return{left:f.left+b.left-d,top:f.top+b.top-e}}});f.zIndex=1024;f.current=null;return f});l("dialog-config",{backdropBackground:"#000",backdropOpacity:.7,content:'<span class="ui-dialog-loading">Loading..</span>',title:"",statusbar:"",button:null,ok:null,cancel:null,okValue:"ok",cancelValue:"cancel",cancelDisplay:!0,width:"",height:"",padding:"",skin:"",quickClose:!1,cssUri:"../css/ui-dialog.css",innerHTML:'<div i="dialog" class="ui-dialog"><div class="ui-dialog-arrow-a"></div><div class="ui-dialog-arrow-b"></div><table class="ui-dialog-grid"><tr><td i="header" class="ui-dialog-header"><button i="close" class="ui-dialog-close">&#215;</button><div i="title" class="ui-dialog-title"></div></td></tr><tr><td i="body" class="ui-dialog-body"><div i="content" class="ui-dialog-content"></div></td></tr><tr><td i="footer" class="ui-dialog-footer"><div i="statusbar" class="ui-dialog-statusbar"></div><div i="checkInput" class="ui-dialog-checkInput"></div><div i="button" class="ui-dialog-button"></div></td></tr></table></div>'});l("dialog",function(c){var f=c("jquery"),d=c("popup"),h=c("dialog-config"),k=h.cssUri;k&&(c=c[c.toUrl?"toUrl":"resolve"])&&(k=c(k),k='<link rel="stylesheet" href="'+k+'" />',f("base")[0]?f("base").before(k):f("head").append(k));var l=0,b=new Date-0;k=!("minWidth"in f("html")[0].style);var g="createTouch"in document&&!("onmousemove"in document)||/(iPhone|iPad|iPod)/i.test(navigator.userAgent),n=!k&&!g,e=function(a,c,d){var h=a=a||{};if("string"===typeof a||1===a.nodeType)a={content:a,fixed:!g};a=f.extend(!0,{},e.defaults,a);a.original=h;h=a.id=a.id||b+l;var k=e.get(h);if(k)return k.focus();n||(a.fixed=!1);a.quickClose&&(a.modal=!0,a.backdropOpacity=0);f.isArray(a.button)||(a.button=[]);void 0!==d&&(a.cancel=d);a.cancel&&a.button.push({id:"cancel",value:a.cancelValue,callback:a.cancel,display:a.cancelDisplay});void 0!==c&&(a.ok=c);a.ok&&a.button.push({id:"ok",value:a.okValue,callback:a.ok,autofocus:!0});return e.list[h]=new e.create(a)};k=function(){};k.prototype=d.prototype;k=e.prototype=new k;e.create=function(a){var b=this;f.extend(this,new d);var c=f(this.node).html(a.innerHTML),g=f(this.backdrop);this.options=a;this._popup=c;f.each(a,function(a,c){if("function"===typeof b[a])b[a](c);else b[a]=c});a.zIndex&&(d.zIndex=a.zIndex);c.attr({"aria-labelledby":this._$("title").attr("id","title:"+this.id).attr("id"),"aria-describedby":this._$("content").attr("id","content:"+this.id).attr("id")});this._$("close").css("display",!1===this.cancel?"none":"").attr("title",this.cancelValue).on("click",function(a){b._trigger("cancel");a.preventDefault()});this._$("dialog").addClass(this.skin);this._$("body").css("padding",this.padding);if(a.quickClose)g.on("onmousedown"in document?"mousedown":"click",function(){b._trigger("cancel");return!1});this.addEventListener("show",function(){g.css({opacity:0,background:a.backdropBackground}).animate({opacity:a.backdropOpacity},150)});this._esc=function(a){var c=a.target,f=c.nodeName,e=/^input|textarea$/i;a=a.keyCode;d.current!==b||e.test(f)&&"button"!==c.type||27===a&&b._trigger("cancel")};f(document).on("keydown",this._esc);this.addEventListener("remove",function(){f(document).off("keydown",this._esc);delete e.list[this.id]});l++;e.oncreate(this);return this};e.create.prototype=k;f.extend(k,{content:function(a){var b=this._$("content");"object"===typeof a?(a=f(a),b.empty("").append(a.show()),this.addEventListener("beforeremove",function(){f("body").append(a.hide())})):b.html(a);return this.reset()},title:function(a){this._$("title").text(a);this._$("header")[a?"show":"hide"]();return this},width:function(a){this._$("content").css("width",a);return this.reset()},height:function(a){this._$("content").css("height",a);return this.reset()},button:function(a){a=a||[];var b=this,c="",d=0;this.callbacks={};"string"===typeof a?(c=a,d++):f.each(a,function(a,e){var g=e.id=e.id||e.value;a="";b.callbacks[g]=e.callback;!1===e.display?a=' style="display:none"':d++;c+='<button type="button" i-id="'+g+'"'+("cancel"==g?' class="kg-default-btn-red" ':"")+a+(e.disabled?" disabled":"")+(e.autofocus?m?' class="ui-dialog-autofocus kg-primary-btn-red"':' autofocus class="ui-dialog-autofocus kg-primary-btn-red"':"")+">"+e.value+"</button>";b._$("button").on("click","[i-id="+g+"]",function(a){f(this).attr("disabled")||b._trigger(g);a.preventDefault()})});this._$("button").html(c);this._$("footer")[d?"show":"hide"]();return this},statusbar:function(a){this._$("statusbar").html(a)[a?"show":"hide"]();return this},_$:function(a){return this._popup.find("[i="+a+"]")},_trigger:function(a){a=this.callbacks[a];return"function"!==typeof a||!1!==a.call(this)?this.close().remove():this}});e.oncreate=f.noop;e.getCurrent=function(){return d.current};e.get=function(a){return void 0===a?e.list:e.list[a]};e.list={};e.defaults=h;return e});window.dialog=c("dialog")}();
// V2.1.0.476    