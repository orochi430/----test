"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[67304],{16489:function(t,s,n){n.d(s,{Z:function(){return e}});var s=n(8450),i=n.n(s),a=n(25108),s={props:{keyword:{type:String,default:""},initOrgId:{type:String,default:""},isShowCount:{type:Boolean,default:!0},url:{type:String,default:""}},data:function(){return{userList:[],allData:{}}},created:function(){this.userInfo=dsf.util.loadSessionStore("user"),this.init()},methods:{toDetail:function(t){this.$router.push({name:"mailDetail",params:t})},init:function(){this.crumbsList=[];var t=this.initOrgId&&this.userInfo?{orgId:this.userInfo[this.initOrgId]}:{};dsf.http.post(this.url,t).then(function(t){})},toNext:function(s){var n=this;s.hasChildren&&(this.$toast.loading({}),this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout(function(){n.timeout=null,dsf.http.post(n.url,{orgId:s.id,keyword:n.keyword}).then(function(t){t=t.data.data;n.organization=t.depts,n.userList=t.users,n.breadList.push(s)}),n.changeCrumbs(s),n.$toast.clear()},500))},deepCopy:function(t){return JSON.parse(i()(t))},changeCrumbs:function(t){t=this.deepCopy(t);this.crumbsList.push(t),a.log(this.crumbsList)}},filters:{filterName:function(t){return t.slice(0,1)},userAvatar:function(t){return t.slice(0,1)}}},e=(0,n(51900).Z)(s,function(){var n=this,i=n._self._c;return i("div",{staticClass:"organization fc pt10"},[i("div",{directives:[{name:"show",rawName:"v-show",value:0<n.userList.length,expression:"userList.length>0"}],staticClass:"organizationPerson flex1"},n._l(n.userList,function(s,t){return i("div",{key:t,staticClass:"personInfo disfr ac",on:{click:function(t){return n.toDetail(s)}}},[s.photoSrc?i("img",{staticClass:"userImg",attrs:{src:s.photoSrc}}):i("div",{staticClass:"userImg"},[n._v(n._s(n._f("filterName")(s.userName)))]),n._v(" "),i("div",{staticClass:"itemContent fc jsb"},[i("span",{staticClass:"personName"},[n._v(n._s(s.userName))]),n._v(" "),i("span",{staticClass:"personNum"},[n._v(n._s(s.mobile))])])])}),0)])},[],!1,null,"0c06aa64",null).exports},67304:function(t,s,n){n.r(s),n.d(s,{default:function(){return e}});var s=n(84528),i=n(16489),a=n(25108),s={name:"MeetingSignUpStatus",components:{dingBtn:s.default,commonUse:i.Z},data:function(){return{id:this.$route.query.id||"",dingObjbaoming:{},tabIndex:0,unitoutdata:[],unitoutcount:"",unitindata:[],unitincount:""}},created:function(){a.log(this.id),this.getMeetingAddressList(this.id)},methods:{getMeetingAddressList:function(t){var s=this;dsf.http.post("fn/newMeeting/meetingAddressList",{id:t}).then(function(t){200==t.data.code&&(s.unitoutdata=t.data.unitoutdata,s.unitoutcount=t.data.unitoutcount,s.unitindata=t.data.unitindata,s.unitincount=t.data.unitincount)})}}},e=(0,n(51900).Z)(s,function(){var n=this,i=n._self._c;return i("div",{staticClass:"ds-meeting-sign-up-status"},[i("van-tabs",{attrs:{type:"card",animated:"",sticky:""},model:{value:n.tabIndex,callback:function(t){n.tabIndex=t},expression:"tabIndex"}},[i("van-tab",[i("div",{staticClass:"tab_title",attrs:{slot:"title"},slot:"title"},[n._v("\n        单位内\n        "),n.unitindata.length?i("span",[n._v("("+n._s(n.unitindata.length)+")")]):n._e()]),n._v(" "),i("div",{staticClass:"not-sign common"},[n._l(n.unitindata,function(s,t){return i("div",{key:t,staticClass:"personInfo disfr ac",on:{click:function(t){return n.toDetail(s)}}},[s.photoSrc?i("img",{staticClass:"userImg",attrs:{src:s.photoSrc}}):i("div",{staticClass:"userImg"},[n._v(n._s(s.userName))]),n._v(" "),i("div",{staticClass:"itemContent fc jsb"},[i("span",{staticClass:"personName"},[n._v(n._s(s.userName))]),n._v(" "),i("span",{staticClass:"personNum"},[n._v(n._s(s.mobile))])])])}),n._v(" "),0===n.unitindata.length?i("commonempty"):n._e()],2)]),n._v(" "),i("van-tab",[i("div",{staticClass:"tab_title",attrs:{slot:"title"},slot:"title"},[n._v("\n        单位外\n        "),n.unitoutdata.length?i("span",[n._v("("+n._s(n.unitoutdata.length)+")")]):n._e()]),n._v(" "),i("div",{staticClass:"not-sign common"},[n._l(n.unitoutdata,function(s,t){return i("div",{key:t,staticClass:"personInfo disfr ac",on:{click:function(t){return n.toDetail(s)}}},[s.photoSrc?i("img",{staticClass:"userImg",attrs:{src:s.photoSrc}}):i("div",{staticClass:"userImg"},[n._v(n._s(s.userName))]),n._v(" "),i("div",{staticClass:"itemContent fc jsb"},[i("span",{staticClass:"personName"},[n._v(n._s(s.userName))]),n._v(" "),i("span",{staticClass:"personNum"},[n._v(n._s(s.mobile))])])])}),n._v(" "),0===n.unitoutdata.length?i("commonempty"):n._e()],2)])],1)],1)},[],!1,null,"35f26a1a",null).exports}}]);