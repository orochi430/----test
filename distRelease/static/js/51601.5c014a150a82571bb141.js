"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[51601],{51601:function(t,e,i){i.r(e),i.d(e,{default:function(){return a}});var s,e=i(77193);(0,e.Z)(s={name:"shsm",components:{},data:function(){return{active:0,userInfo:{},gwTotal:0,dyTotal:0,pages:[],tabList:[{title:"待办",num:0,route:"fgwPadSMtodo"},{title:"已办",num:0,route:"fgwPadSMdone"}],tabPath:""}},computed:{},watch:{},activated:function(){},methods:{goPage:function(t){this.tabPath="1",this.active=t,this.$router.push({name:this.tabList[t].route})},exit:function(){dsf.layer.confirm({message:"是否确认退出登录",confirmButtonText:"确认"},function(){dsf.util.logOut()})},searchClick:function(){this.$router.push({name:"SMsearch"})},getList:function(){},showBuildTime:function(){var t=this;this.clickTime=(new Date).getTime(),setTimeout(function(){(new Date).getTime()-t.clickTime<500&&(document.getElementById("appVersion").innerHTML="当前前端APP程序版本为：2024-03-22 18:20")},500)}},deactivated:function(){"1"==this.tabPath&&this.$deleteCache(this)},created:function(){this.userInfo=dsf.util.loadSessionStore("user")},mounted:function(){var e=this;this.active=this.tabList.findIndex(function(t){return t.route==e.$route.name}),this.getList()}},"activated",function(){}),(0,e.Z)(s,"destroyed",function(){});var e=s,a=(0,i(51900).Z)(e,function(){var i=this,s=i._self._c;return s("div",{staticClass:"shsm"},[s("div",{staticClass:"commTitle"},[s("div",{staticClass:"logoDiv"},[s("img",{staticClass:"logo",attrs:{src:"static/images/project/fgwPad/logo.png",alt:"",srcset:""},on:{click:function(t){return i.showBuildTime()}}})]),i._v(" "),s("div",{staticClass:"rights"},[s("div",{staticClass:"user"},[s("van-image",{attrs:{src:i.userInfo.photo},scopedSlots:i._u([{key:"error",fn:function(){return[s("img",{attrs:{src:"static/images/project/fgwPad/user-img.png",alt:"",srcset:""}})]},proxy:!0}])}),i._v(" "),s("span",[i._v(i._s(i.userInfo.name.slice(i.userInfo.name.length-2))+i._s(i.userInfo.position)+" 您好！")])],1),i._v(" "),s("img",{staticClass:"close",attrs:{src:"static/images/project/fgwPad/tc.png",alt:"",srcset:""},on:{click:i.exit}})])]),i._v(" "),i.$route.meta.containView?i._e():s("div",{staticClass:"contain"},[s("div",{staticClass:"contain_wrap"},[s("div",{staticClass:"tabs"},i._l(i.tabList,function(t,e){return s("div",{key:e,class:{active:i.active==e},on:{click:function(t){return i.goPage(e)}}},[s("span",{staticClass:"title"},[i._v(i._s(t.title))]),i._v(" "),0<t.num?s("span",{staticClass:"nums"},[i._v(i._s(t.num))]):i._e()])}),0),i._v(" "),s("div",{staticClass:"contain_body"},[s("keep-alive",[i.$route.meta.keepAlive?s("router-view"):i._e()],1),i._v(" "),i.$route.meta.keepAlive?i._e():s("router-view")],1)])]),i._v(" "),i.$route.meta.containView?s("div",{staticClass:"contain whitebg"},[s("div",{staticClass:"contain_wrap"},[s("keep-alive",[i.$route.meta.keepAlive?s("router-view"):i._e()],1),i._v(" "),i.$route.meta.keepAlive?i._e():s("router-view")],1)]):i._e()])},[],!1,null,"cdd31138",null).exports}}]);