(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[44836],{44174:function(t){t.exports=function(t,e,s,i){for(var n=-1,a=null==t?0:t.length;++n<a;){var r=t[n];e(i,r,s(r),t)}return i}},81119:function(t){t.exports=function(t,e,s,i){for(var n=-1,a=null==t?0:t.length;++n<a;){var r=t[n];e(i,r,s(r),t)}return i}},89465:function(t,e,s){var i=s(38777);t.exports=function(t,e,s){"__proto__"==e&&i?i(t,e,{configurable:!0,enumerable:!0,value:s,writable:!0}):t[e]=s}},67206:function(t){t.exports=function(t){return t}},55189:function(t,e,s){var r=s(44174),o=s(81119),c=s(67206),l=s(1469);t.exports=function(n,a){return function(t,e){var s=l(t)?r:o,i=a?a():{};return s(t,n,c(e,2),i)}}},38777:function(t,e,s){var i=s(10852),s=function(){try{var t=i(Object,"defineProperty");return t({},"",{}),t}catch(t){}}();t.exports=s},10852:function(t){t.exports=function(t,e){return null==t?void 0:t[e]}},7739:function(t,e,s){var i=s(89465),s=s(55189),n=Object.prototype.hasOwnProperty,s=s(function(t,e,s){n.call(t,s)?t[s].push(e):i(t,s,[e])});t.exports=s},1469:function(t){var e=Array.isArray;t.exports=e},21864:function(t,e,s){"use strict";s.d(e,{Z:function(){return i}});var e={props:{fabItems:{type:Array,default:function(){return[]}},titleKey:{type:String,default:"title"}},data:function(){return{showFab:!1}},directives:{clickOutside:{bind:function(e,s,t){function i(t,e){return!t.el.contains(e.target)&&!e.target.dataset.outside&&(t.binding&&t.binding.value&&"function"==typeof t.binding.value?t.binding.value():void 0)}e.__clickOutside__=i,document.addEventListener("click",function(t){return i({el:e,binding:s},t)}),document.addEventListener("touchend",function(t){return i({el:e,binding:s},t)})},unbind:function(t){document.removeEventListener("click",t.__clickOutside__)}}},methods:{clickOutside:function(){this.showFab=!1},clickMain:function(){1==this.fabItems.length?this.clickItem(this.fabItems[0]):this.showFab=!this.showFab},clickItem:function(t){"go"==t.type?t.url?this.$router.push({path:t.url}):dsf.layer.toast("未传入跳转地址"):this.$emit("clickItem",t)}}},i=(0,s(51900).Z)(e,function(){var s=this,i=s._self._c;return i("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:s.clickOutside,expression:"clickOutside"}],staticClass:"fab-container"},[0<s.fabItems.length?i("div",{staticClass:"main-btn",on:{click:s.clickMain}},[1<s.fabItems.length?i("transition",{attrs:{name:"change",mode:"out-in"}},[s.showFab?i("div",{key:"open"},[i("van-icon",{attrs:{name:"cross"}})],1):i("div",{key:"close"},[i("van-icon",{attrs:{name:"ellipsis"}})],1)]):i("i",{staticClass:"iconfont",class:s.fabItems[0].icon||"iconjiahao",staticStyle:{"font-size":"var(--font_size_0)","font-weight":"bold"}})],1):s._e(),s._v(" "),1<s.fabItems.length?i("transition",{attrs:{name:"fade"}},[s.showFab?i("div",{staticClass:"fab-btns",on:{click:function(t){s.showFab=!s.showFab}}},s._l(s.fabItems,function(e,t){return i("div",{key:t,staticClass:"dsf-fab-item",on:{click:function(t){return s.clickItem(e)}}},[e.icon?i("i",{staticClass:"iconfont",class:e.icon}):s._e(),s._v(" "),i("span",[s._v(s._s(e[s.titleKey]))])])}),0):s._e()]):s._e()],1)},[],!1,null,"75ba6501",null).exports},44836:function(t,e,s){"use strict";s.r(e),s.d(e,{default:function(){return C}});var e=s(26243),n=s.n(e),e=s(62680),a=s.n(e),e=s(95366),r=s.n(e),e=s(6919),i=s.n(e),o=s(77193),e=s(73473),c=s.n(e),e=s(20629),l=s(90541),u={data:function(){return{timer:""}},mounted:function(){},methods:{debounce:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:500;clearTimeout(this.timer),this.timer=setTimeout(function(){t()},e)}}},d=s(25108);function h(e,t){var s,i=n()(e);return a()&&(s=a()(e),t&&(s=s.filter(function(t){return r()(e,t).enumerable})),i.push.apply(i,s)),i}s(7739);var f={mixins:[u],props:{keyword:{type:String,default:""},url:{type:String,default:""},searchUrl:{type:String,default:""}},data:function(){return{isShowCount:!0,peopleList:{},indexList:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","W","X","Y","Z"],secIndex:"",secIndexShow:!1,timeout:null,stickyHeight:0,barHeight:{height:"",overflow:"auto"},preNode:null,organization:[],breadList:[],isSeach:!1,userList:[],hasUser:!1,hasgoDetial:!1}},created:function(){this.init()},mounted:function(){var t=document.documentElement.style.fontSize.split("px")[0],e=this.isShowAppHeader?.92*t:0,s=this.isShowAppFooter?1.2*t:0;this.stickyHeight=e+1.04*t+.88*t,this.barHeight.height=window.innerHeight-s-this.stickyHeight+"px"},watch:{keyword:function(){var t=this;this.debounce(function(){""!=t.keyword?t.search():(t.isSeach=!1,t.init())},1500)}},computed:function(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?h(Object(s),!0).forEach(function(t){(0,o.Z)(e,t,s[t])}):i()?Object.defineProperties(e,i()(s)):h(Object(s)).forEach(function(t){Object.defineProperty(e,t,r()(s,t))})}return e}({},(0,e.rn)({isShowAppFooter:function(t){return t.isShowAppFooter},isShowAppHeader:function(t){return t.isShowAppHeader}})),methods:{addPopstate:function(){d.log("add"),window.addEventListener("popstate",this.bindPageChange),2<=this.breadList.length&&(window.addressIndex++,this.hasgoDetial=!0,history.pushState(null,null,document.URL)),""!=this.secIndex&&this.$refs.indexList.scrollTo(this.secIndex)},removePopstate:function(){d.log("remove"),this.hasgoDetial=!1,window.removeEventListener("popstate",this.bindPageChange)},bindPageChange:function(){var t=this;2<t.breadList.length?(history.pushState(null,null,document.URL),t.chooseBread(t.breadList[t.breadList.length-2])):2==t.breadList.length&&t.chooseBread(t.breadList[t.breadList.length-2])},getPhotoSrc:function(t){return l.Z.url.getWebPath(t)+"&time=".concat((new Date).getTime())},chooseBread:function(t){0==t.id?(window.addressIndex=0,this.init()):(window.addressIndex++,this.toNext(t))},toNext:function(t){var s=this;0==this.hasgoDetial&&(this.hasgoDetial=!0,history.pushState(null,null,document.URL)),t.hasChildren&&(s.$toast.loading("加载中"),l.Z.http.post(s.url,{groupId:t.id}).then(function(t){s.$toast.clear();var e=t.data.data,e=(s.organization=e.depts,s.breadList=e.navs,t.data.data.users);e.length&&(s.hasUser=!0),s.showUser(e)}))},selectBar:function(t){var e=this;this.secIndex=t,this.secIndexShow=!0,this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout(function(){e.timeout=null,e.requireFn()},800)},requireFn:function(){this.secIndexShow=!1},toDetail:function(t){d.log(t),this.$router.push({path:"/commonForm/230525104842KAyV11ldvCTy0yoy788/"+t.userId,query:{title:"个人信息",method:"openByUnit",listId:"230525105514bonIeXKeHhxlZtralQz",validateByList:1}})},search:function(){var e=this;e.$toast.loading("加载中"),l.Z.http.post(this.searchUrl,{keyword:this.keyword}).then(function(t){e.$toast.clear(),e.isSeach=!0,e.userList=t.data.data})},init:function(){var e=this,s=this;s.breadList=[],l.Z.http.post(this.url,{}).then(function(t){s.hasUser=!1;t=t.data.data;t.length&&(s.hasUser=!0),e.peopleList=t})}},filters:{userAvatar:function(t){return t.slice(0,1)},filterName:function(t){return 4<t.length?t.slice(0,4)+"...":t}}},p=s(51900),f=(0,p.Z)(f,function(){var i=this,n=i._self._c;return n("div",{staticClass:"indexList pt10",style:i.barHeight},[i.isSeach?n("div",i._l(i.userList,function(e,t){return n("div",{key:t,staticClass:"personInfo disfr ac",on:{click:function(t){return i.toDetail(e)}}},[e.photoSrc?n("img",{staticClass:"userImg",attrs:{src:i.getPhotoSrc(e.photoSrc)}}):n("div",{staticClass:"userImg"},[i._v(i._s(i._f("userAvatar")(e.userName)))]),i._v(" "),n("div",{staticClass:"itemContent fc jsb flex ellipsis"},[n("span",{staticClass:"personName ellipsis minWid"},[i._v(i._s(e.userName))]),i._v(" "),e.mobile&&!i.dsf.config.addressList.isFideMobile?n("span",{staticClass:"personNum ellipsis"},[i._v(i._s(e.mobile))]):i._e()]),i._v(" "),n("div",{staticClass:"org-name"},[i._v(i._s(e.orgName))])])}),0):n("div",[n("div",{directives:[{name:"show",rawName:"v-show",value:i.secIndexShow,expression:"secIndexShow"}],staticClass:"secFab"},[i._v(i._s(i.secIndex))]),i._v(" "),i._l(i.peopleList,function(e,t,s){return n("div",{key:s},[n("div",{staticClass:"disfr"},[n("div",{staticClass:"personInfo disfr ac",on:{click:function(t){return i.toDetail(e)}}},[e.photoSrc?n("img",{staticClass:"userImg",attrs:{src:i.getPhotoSrc(e.photoSrc)}}):n("div",{staticClass:"userImg"},[i._v(i._s(i._f("userAvatar")(e.userName)))]),i._v(" "),n("div",{staticClass:"itemContent fc jsb flex ellipsis"},[n("span",{staticClass:"personName ellipsis minWid"},[i._v(i._s(i._f("filterName")(e.userName)))]),i._v(" "),e.mobile&&!i.dsf.config.addressList.isFideMobile?n("span",{staticClass:"personNum ellipsis"},[i._v(i._s(e.mobile))]):i._e()]),i._v(" "),n("div",{staticClass:"org-name"},[i._v(i._s(e.orgName))])]),i._v(" "),n("div",{staticClass:"personInfoRight"})])])}),i._v(" "),0==i.peopleList.length?n("commonempty"):i._e()],2)])},[],!1,null,"55d7c480",null).exports,v=s(5044),m=s(8450),g=s.n(m),m=s(21864),_=s(25108),u={mixins:[u],props:{keyword:{type:String,default:""},initOrgId:{type:String,default:""},isShowCount:{type:Boolean,default:!0},url:{type:String,default:""},searchUrl:{type:String,default:""}},components:{dsfFab:m.Z},data:function(){return{hasChild:!0,organization:{},commonUserList:[],userList:[],allData:[],timeout:null,userInfo:null,groupList:[],breadList:[],search:!1,searchUserList:[],isShowOrg:!0,isShowCommonUser:!0,currentIndex:0,hasgoDetial:!1}},created:function(){this.userInfo=dsf.util.loadSessionStore("user"),this.init(),this.mainButtons=[{action:"save",icon:"iconreply",name:"返回"}]},watch:{keyword:function(t){var e=this;this.debounce(function(){t?e.getSearchUserList():(e.search=!1,e.init())},1500)}},methods:{addPopstate:function(){_.log("add"),window.addEventListener("popstate",this.bindPageChange),_.log("breadList.length",this.breadList.length),2<=this.breadList.length&&(window.addressIndex++,this.hasgoDetial=!0,history.pushState(null,null,document.URL))},removePopstate:function(){_.log("remove"),this.hasgoDetial=!1,_.log(history),window.removeEventListener("popstate",this.bindPageChange)},bindPageChange:function(){2<this.breadList.length?(history.pushState(null,null,document.URL),this.btnAction()):2==this.breadList.length&&(dsf.config.mailList.showAllOrg?history.back():this.btnAction())},btnAction:function(t){this.toNext(this.breadList[this.breadList.length-2])},getPhotoSrc:function(t){return dsf.url.getWebPath(t)+"&time=".concat((new Date).getTime())},chooseBread:function(t,e){this.toNext(e)},chooseGroup:function(t){this.toNext(t,!1)},init:function(){var e=this,s=this;dsf.http.post("/fn/reportContacts/mobileIndex",{}).then(function(t){_.log(t.data),s.organization=t.data.data,s.commonUserList=0<t.data.data.users.length?t.data.data.users:[],dsf.config.mailList.showAllOrg&&e.toNext(s.organization,!0)})},toNext:function(e,t){var s=this,i=this;if(0==this.hasgoDetial&&(this.hasgoDetial=!0,history.pushState(null,null,document.URL)),"全部"==e.name)return dsf.config.mailList.showAllOrg?void this.toNext(i.organization,!0):(i.breadList=[],i.isShowOrg=!0,i.isShowCommonUser=!0,i.currentIndex=0,void(window.addressIndex=0));i.isShowOrg=!1,i.isShowCommonUser=!1,i.currentIndex++,window.addressIndex++,i.breadList=[],i.groupList=[],i.userList=[];var n=i.allData.find(function(t){return t.orgId==e.id});n?(i.breadList=[].concat((0,v.Z)(n.breadList)),i.groupList=[].concat((0,v.Z)(n.groupList)),i.userList=[].concat((0,v.Z)(n.userList)),i.$nextTick(function(){window.scrollTo(0,0)})):(i.$toast.loading("加载中"),dsf.http.post(i.url,{orgId:e.id}).then(function(t){i.$toast.clear();t=t.data.data;i.breadList=[{name:"全部",id:"0"}].concat((0,v.Z)(t.navs)),_.log("breadListLength",s.breadList,s.breadList.length),i.groupList=t.depts,i.userList=t.users,i.allData.push({orgId:e.id,breadList:dsf.util.deepCopy(i.breadList),groupList:dsf.util.deepCopy(i.groupList),userList:dsf.util.deepCopy(i.userList)})}))},deepCopy:function(t){return JSON.parse(g()(t))},changeCrumbs:function(t){this.deepCopy(t)},getData:function(){var e=this,t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"";this.$toast.loading({}),dsf.http.post(this.url,{orgId:t}).then(function(t){t=t.data.data;e.organization=t.depts,e.userList=t.users,e.$toast.clear()})},returnOrg:function(t,e){this.getData(t.id)},toDetail:function(t){this.$router.push({name:"mailDetail",query:{title:"通讯录",userdata:g()(t)}})},getSearchUserList:function(){var e=this,s=this,t=(s.$toast.loading("加载中"),this.searchUserList=[],""==this.keyword?{}:{keyword:this.keyword});dsf.http.post(this.searchUrl,t).then(function(t){s.$toast.clear(),e.search=!0,e.searchUserList=t.data.data})}},filters:{filterName:function(t){return t.slice(t.length-2)},filterMobile:function(t,e){return e.mobileDesensitizationSafeContent||t},userAvatar:function(t){return t.slice(0,1)}}},m=(0,p.Z)(u,function(){var i=this,n=i._self._c;return n("div",{staticClass:"organization fc pt10"},[n("div",{directives:[{name:"show",rawName:"v-show",value:!i.search,expression:"!search"}]},[0<i.breadList.length?n("div",{staticClass:"organizationBox flex1 mb10"},[n("div",{staticClass:"organizationitem disfr ac ofa"},i._l(i.breadList,function(e,s){return n("div",{key:s,staticClass:"disfr ac wsp",on:{click:function(t){s<i.breadList.length-1&&i.toNext(e,s)}}},[n("span",{class:s<i.breadList.length-1?"normalColor":""},[i._v(i._s(e.name))]),i._v(" "),n("van-icon",{directives:[{name:"show",rawName:"v-show",value:s<i.breadList.length-1,expression:"index < breadList.length - 1"}],attrs:{name:"arrow"}})],1)}),0)]):i._e(),i._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:i.isShowOrg,expression:"isShowOrg"}],staticClass:"organizationBox flex1"},[n("div",{staticClass:"organizationitem disfr jsb ac",on:{click:function(t){return i.toNext(i.organization,!0)}}},[n("van-icon",{staticClass:"org-icon",attrs:{name:"cluster-o"}}),i._v(" "),n("span",{staticClass:"org-name"},[i._v(i._s(i.organization.name))]),i._v(" "),n("van-icon",{attrs:{name:"arrow"}})],1),i._v(" "),i._l(i.organization.depts,function(e,t){return n("div",{key:t,staticClass:"organizationitem disfr jsb ac organizationSecitem",on:{click:function(t){return i.toNext(e,!0)}}},[i._m(0,!0),i._v(" "),n("span",{staticClass:"org-name"},[i._v(i._s(e.name))]),i._v(" "),n("van-icon",{attrs:{name:"arrow"}})],1)})],2),i._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:i.groupList.length&&!i.isShowOrg&&!i.dsf.config.addressList.showPersonFirst,expression:"groupList.length && !isShowOrg && !dsf.config.addressList.showPersonFirst"}],staticClass:"organizationBox flex1"},i._l(i.groupList,function(e,t){return n("div",{key:t,staticClass:"organizationitem borderBottom disfr jsb ac",on:{click:function(t){return i.toNext(e)}}},[n("span",{staticClass:"orgtitle flex ae"},[n("span",{staticClass:"elps"},[i._v(i._s(e.name)+" ")]),i._v(" "),0<e.userCount&&!i.dsf.config.mailList.isHideCount?n("span",[i._v("("+i._s(e.userCount)+")")]):i._e()]),i._v(" "),0<e.userCount?n("van-icon",{attrs:{name:"arrow"}}):i._e()],1)}),0),i._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:0<i.userList.length&&!i.isShowOrg,expression:"userList.length > 0 && !isShowOrg"}],staticClass:"organizationPerson flex1"},i._l(i.userList,function(e,t){return n("div",{key:t,staticClass:"personInfo disfr ac",on:{click:function(t){return i.toDetail(e)}}},[e.photoSrc?n("img",{staticClass:"userImg",attrs:{src:i.getPhotoSrc(e.photoSrc)}}):n("div",{staticClass:"userImg"},[i._v(i._s(i._f("filterName")(e.userName)))]),i._v(" "),n("div",{staticClass:"itemContent fc jsb flex ellipsis"},[n("div",{staticClass:"flex jb"},[n("span",{staticClass:"personName ellipsis minWid"},[i._v(i._s(e.userName))]),i._v(" "),(e.zhiw,n("span",{staticClass:"personName ellipsis minWid right"},[i._v(i._s(e.zhiw))]))]),i._v(" "),e.mobile&&!i.dsf.config.addressList.isFideMobile?n("span",{staticClass:"personNum"},[i._v(i._s(i._f("filterMobile")(e.mobile,e)))]):i._e()])])}),0),i._v(" "),0<i.commonUserList.length&&i.isShowCommonUser?n("div",{staticClass:"commonusertitle"},[i._v("\n            常用联系人\n        ")]):i._e(),i._v(" "),0<i.commonUserList.length&&i.isShowCommonUser?n("div",{staticClass:"organizationPerson flex1"},i._l(i.commonUserList,function(e,t){return n("div",{key:t,staticClass:"personInfo disfr ac",on:{click:function(t){return i.toDetail(e)}}},[e.photoSrc?n("img",{staticClass:"userImg",attrs:{src:i.getPhotoSrc(e.photoSrc)}}):n("div",{staticClass:"userImg"},[i._v(i._s(i._f("filterName")(e.userName)))]),i._v(" "),n("div",{staticClass:"itemContent fc jsb"},[n("span",{staticClass:"personName"},[i._v(i._s(e.userName))]),i._v(" "),e.mobile&&!i.dsf.config.addressList.isFideMobile?n("span",{staticClass:"personNum"},[i._v(i._s(i._f("filterMobile")(e.mobile,e)))]):i._e()])])}),0):i._e(),i._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:i.groupList.length&&!i.isShowOrg&&i.dsf.config.addressList.showPersonFirst,expression:"groupList.length && !isShowOrg && dsf.config.addressList.showPersonFirst"}],staticClass:"organizationBox flex1"},i._l(i.groupList,function(e,t){return n("div",{key:t,staticClass:"organizationitem borderBottom disfr jsb ac",on:{click:function(t){return i.toNext(e)}}},[n("span",{staticClass:"orgtitle flex ae"},[n("span",{staticClass:"elps"},[i._v(i._s(e.name)+" ")]),i._v(" "),0<e.userCount&&!i.dsf.config.mailList.isHideCount?n("span",[i._v("("+i._s(e.userCount)+")")]):i._e()]),i._v(" "),0<e.userCount?n("van-icon",{attrs:{name:"arrow"}}):i._e()],1)}),0)]),i._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:i.search,expression:"search"}]},[n("div",{directives:[{name:"show",rawName:"v-show",value:0<i.searchUserList.length,expression:"searchUserList.length > 0"}],staticClass:"organizationPerson flex1"},i._l(i.searchUserList,function(e,t){return n("div",{key:t,staticClass:"personInfo disfr ac",on:{click:function(t){return i.toDetail(e)}}},[e.photoSrc?n("img",{staticClass:"userImg",attrs:{src:i.getPhotoSrc(e.photoSrc)}}):n("div",{staticClass:"userImg"},[i._v(i._s(i._f("filterName")(e.userName)))]),i._v(" "),n("div",{staticClass:"itemContent fc jsb flex ellipsis"},[n("span",{staticClass:"personName ellipsis minWid"},[i._v(i._s(e.userName))]),i._v(" "),e.mobile&&!i.dsf.config.addressList.isFideMobile?n("span",{staticClass:"personNum ellipsis"},[i._v(i._s(i._f("filterMobile")(e.mobile,e)))]):i._e()]),i._v(" "),n("div",{staticClass:"org-name"},[i._v(i._s(e.orgName))])])}),0),i._v(" "),0==i.searchUserList.length?n("commonempty"):i._e()],1)])},[function(){var t=this._self._c;return t("span",{staticClass:"org-icon"},[t("span",{staticClass:"sec-item"})])}],!1,null,"58a1024a",null).exports,b=s(25108),u={props:{keyword:{type:String,default:""},initOrgId:{type:String,default:""},isShowCount:{type:Boolean,default:!0},url:{type:String,default:""}},data:function(){return{userList:[],allData:{}}},created:function(){this.userInfo=dsf.util.loadSessionStore("user"),this.init()},methods:{toDetail:function(t){this.$router.push({name:"mailDetail",params:t})},init:function(){this.crumbsList=[];var t=this.initOrgId&&this.userInfo?{orgId:this.userInfo[this.initOrgId]}:{};dsf.http.post(this.url,t).then(function(t){})},toNext:function(e){var s=this;e.hasChildren&&(this.$toast.loading({}),this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout(function(){s.timeout=null,dsf.http.post(s.url,{orgId:e.id,keyword:s.keyword}).then(function(t){t=t.data.data;s.organization=t.depts,s.userList=t.users,s.breadList.push(e)}),s.changeCrumbs(e),s.$toast.clear()},500))},deepCopy:function(t){return JSON.parse(g()(t))},changeCrumbs:function(t){t=this.deepCopy(t);this.crumbsList.push(t),b.log(this.crumbsList)}},filters:{filterName:function(t){return t.slice(0,1)},userAvatar:function(t){return t.slice(0,1)}}},u=(0,p.Z)(u,function(){var s=this,i=s._self._c;return i("div",{staticClass:"organization fc pt10"},[i("div",{directives:[{name:"show",rawName:"v-show",value:0<s.userList.length,expression:"userList.length>0"}],staticClass:"organizationPerson flex1"},s._l(s.userList,function(e,t){return i("div",{key:t,staticClass:"personInfo disfr ac",on:{click:function(t){return s.toDetail(e)}}},[e.photoSrc?i("img",{staticClass:"userImg",attrs:{src:e.photoSrc}}):i("div",{staticClass:"userImg"},[s._v(s._s(s._f("filterName")(e.userName)))]),s._v(" "),i("div",{staticClass:"itemContent fc jsb"},[i("span",{staticClass:"personName"},[s._v(s._s(e.userName))]),s._v(" "),i("span",{staticClass:"personNum"},[s._v(s._s(e.mobile))])])])}),0)])},[],!1,null,"609921c9",null).exports,w=s(25108);function L(e,t){var s,i=n()(e);return a()&&(s=a()(e),t&&(s=s.filter(function(t){return r()(e,t).enumerable})),i.push.apply(i,s)),i}var s={data:function(){return{activeName:"",value:"",timer:"",currentRef:null,tabList:[{tabName:"单位",type:"indexList",url:"fn/reportContacts/personalcontactusers",searchUrl:"/fn/reportContacts/personalcontactusers",params:{}},{tabName:"组织",type:"dept",url:"fn/reportContacts/deptandusers",searchUrl:"fn/reportContacts/users",params:{orgId:"deptId"},isShowCount:!0}]}},components:{indexList:f,organization:m,commonUse:u},computed:function(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?L(Object(s),!0).forEach(function(t){(0,o.Z)(e,t,s[t])}):i()?Object.defineProperties(e,i()(s)):L(Object(s)).forEach(function(t){Object.defineProperty(e,t,r()(s,t))})}return e}({},(0,e.rn)({isShowAppFooter:function(t){return t.isShowAppFooter},isShowAppHeader:function(t){return t.isShowAppHeader}})),activated:function(){var t=this;this.$nextTick(function(){t.currentRef.addPopstate()})},created:function(){var t=this;this.activeName=this.tabList[0].type,this.$nextTick(function(){1<t.tabList.length?t.currentRef=t.$refs[t.activeName][0]:t.currentRef=t.$refs[t.activeName],t.currentRef.addPopstate()})},methods:{searchUser:function(){w.log(this.value,this.active),"indexList"==this.activeName&&(1<this.tabList.length?this.$refs.indexList[0]:this.$refs.indexList).search(this.value)},clearPopstate:function(t){return w.log(this.activeName),this.currentRef.removePopstate(),new(c())(function(t){t(!0)})},resetPopstate:function(t,e){var s=this;w.log(this.$refs[t]),this.$nextTick(function(){(1<s.tabList.length?s.$refs[t][0]:s.$refs[t]).addPopstate()}),w.log(t,e)}},deactivated:function(){this.currentRef.removePopstate(),window.addressIndex=0}},C=(0,p.Z)(s,function(){var s=this,i=s._self._c;return i("div",{staticClass:"mailList"},[i("van-sticky",{attrs:{"offset-top":s.dsf.util.getOffsetTop()}},[i("van-search",{attrs:{placeholder:"搜索词",sticky:"",clearable:!1},on:{search:s.searchUser},scopedSlots:s._u([{key:"left-icon",fn:function(){return[i("van-icon",{attrs:{name:"search",color:"#999999"},on:{click:s.searchUser}})]},proxy:!0},s.value?{key:"right-icon",fn:function(){return[i("span",{on:{click:function(t){s.value="",s.searchUser()}}},[s._v("取消")])]},proxy:!0}:null],null,!0),model:{value:s.value,callback:function(t){s.value=t},expression:"value"}})],1),s._v(" "),i("van-tabs",{attrs:{sticky:"","offset-top":s.dsf.util.getOffsetTop(51),"before-change":s.clearPopstate},on:{change:s.resetPopstate},model:{value:s.activeName,callback:function(t){s.activeName=t},expression:"activeName"}},s._l(s.tabList,function(t,e){return i("van-tab",{key:e,attrs:{title:t.tabName,name:t.type}},["indexList"==t.type?i("indexList",{ref:t.type,refInFor:!0,attrs:{keyword:s.value,url:t.url,searchUrl:t.searchUrl}}):s._e(),s._v(" "),"dept"==t.type?i("organization",{ref:t.type,refInFor:!0,attrs:{keyword:s.value,initOrgId:t.params.orgId,isShowCount:t.isShowCount,searchUrl:t.searchUrl,url:t.url}}):s._e()],1)}),1)],1)},[],!1,null,"78f2eb55",null).exports}}]);