"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[20161],{85122:function(t,e,n){n.d(e,{Z:function(){return i}});var e={name:"MeetingList",props:{list:{type:Array,default:function(){return[]}},activeId:{type:String,default:""},cardBottom:{type:String,default:"1rem"},cardPaddingTop:{type:String,default:"1rem"}},data:function(){return{}},methods:{listClick:function(t){this.$emit("updateAcitve",t)}}},i=(0,n(51900).Z)(e,function(){var n=this,i=n._self._c;return i("div",{staticClass:"meeting-list"},n._l(n.list,function(e,t){return i("div",{key:t,staticClass:"meeting-list-item",class:{active:e.id==n.activeId},style:{marginTop:"0.5rem",paddingTop:n.cardPaddingTop},on:{click:function(t){return n.listClick(e)}}},[i("div",{staticClass:"item-desc"},[i("span",{staticClass:"item-desc-tit"},[n._v(n._s(e.bt))]),n._v(" "),i("span",{staticClass:"item-desc-status",class:{finish:"-1"==e.status}},[n._v(n._s(e.statusText))])]),n._v(" "),i("p",{style:{paddingBottom:n.cardBottom}},[n._v(n._s(e.meetingType))])])}),0)},[],!1,null,"78336136",null).exports},20161:function(t,e,n){n.r(e),n.d(e,{default:function(){return s}});var e=n(27921),o=n.n(e),e=n(85579),c=n.n(e),e=n(22013),l=n.n(e),e=n(85122),i=n(25108);function r(t,e){var n,i,s,r,a=void 0!==c()&&t[l()]||t["@@iterator"];if(a)return i=!(n=!0),{s:function(){a=a.call(t)},n:function(){var t=a.next();return n=t.done,t},e:function(t){i=!0,s=t},f:function(){try{n||null==a.return||a.return()}finally{if(i)throw s}}};if(Array.isArray(t)||(a=function(t,e){var n;if(t)return"string"==typeof t?u(t,e):"Map"===(n="Object"===(n=Object.prototype.toString.call(t).slice(8,-1))&&t.constructor?t.constructor.name:n)||"Set"===n?o()(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?u(t,e):void 0}(t))||e&&t&&"number"==typeof t.length)return a&&(t=a),r=0,{s:e=function(){},n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:e};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function u(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}var e={name:"searchMeeting",components:{meetingList:e.Z},data:function(){return{searchContent:"",history:[],filterHistory:[],isSearching:!0,meetingLists:[],meetingInfo:{}}},watch:{searchContent:function(t,e){this.isSearching=!0;for(var n=[],i=0;i<this.history.length;i++)null!==this.history[i]&&1<this.history[i].split(t).length&&n.push(this.history[i]);this.filterHistory=n}},mounted:function(){this.init()},methods:{init:function(){this.history=dsf.util.loadLocalStore("searchHistory").split(","),this.filterHistory=this.history},onSearch:function(){var t,s=this,e=(dsf.http.post("fn/conferenceMobile/meetingList",{_content:this.searchContent}).then(function(t){if("OK"===t.statusText){s.meetingLists=[];var e,n=r(t.data.datas);try{for(n.s();!(e=n.n()).done;){var i=e.value;s.meetingLists.push(i.dataValue)}}catch(t){n.e(t)}finally{n.f()}s.meetingInfo=s.meetingLists,s.isSearching=!1}else dsf.layer.toast(t.message)}).catch(function(t){i.log(t)}),!1),n=r(this.history);try{for(n.s();!(t=n.n()).done;)t.value===this.searchContent&&(e=!0)}catch(t){n.e(t)}finally{n.f()}i.log(e),""===this.searchContent||e||(this.history.unshift(this.searchContent),dsf.util.saveToLocalStore("searchHistory",this.history))},selectHistory:function(t){this.searchContent=t,this.onSearch()},updateAcitve:function(t){this.meetingInfo=t,dsf.config.login.defaultUrl?this.$router.push({name:"".concat(dsf.config.login.defaultUrl),query:{meetingId:this.meetingInfo.id}}):this.$router.push({name:"meetingPadAppcenter",query:{meetingId:this.meetingInfo.id}})}}},s=(0,n(51900).Z)(e,function(){var n=this,i=n._self._c;return i("div",{staticClass:"container"},[i("div",{staticClass:"container-searchBar"},[i("div",{staticClass:"icon"},[i("van-cell",{attrs:{icon:"arrow-left",center:""},on:{click:function(t){return n.$router.back()}}})],1),n._v(" "),i("div",{staticClass:"container-searchBar-searchLine"},[i("van-search",{attrs:{"show-action":"",placeholder:"历史会议",background:"#F5F6F9",clearable:"","clear-trigger":"always"},on:{search:n.onSearch},scopedSlots:n._u([{key:"action",fn:function(){return[i("div",{on:{click:n.onSearch}},[n._v("搜索")])]},proxy:!0}]),model:{value:n.searchContent,callback:function(t){n.searchContent=t},expression:"searchContent"}})],1)]),n._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:n.isSearching,expression:"isSearching"}],staticClass:"searchHistory"},[i("van-list",n._l(n.filterHistory,function(e,t){return i("van-cell",{key:t,attrs:{title:e},on:{click:function(t){return n.selectHistory(e)}}})}),1)],1),n._v(" "),n.isSearching?n._e():i("div",{staticClass:"result"},[i("meetingList",{attrs:{list:n.meetingLists,"active-id":n.meetingInfo.id,"card-bottom":"0.5rem","card-padding-top":"0.5rem"},on:{updateAcitve:n.updateAcitve}})],1)])},[],!1,null,"027d445e",null).exports}}]);