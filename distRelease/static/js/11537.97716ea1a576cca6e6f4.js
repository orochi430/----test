"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[11537],{11537:function(t,n,e){e.r(n),e.d(n,{default:function(){return a}});var s=e(25108),n={name:"mailListNew",components:{},data:function(){return{depts:[],locs:[]}},computed:{},watch:{},methods:{loadDeptments:function(t,n){var e=this;dsf.http.post("/fn/mailList/queryMailList",{level:t,fValue:1==t?"":n}).then(function(t){s.log(t),t&&200==t.status&&(e.depts=t.data.rows)})},goDept:function(t){"2"==t.level?(this.locs=[t],this.loadDeptments(t.level,t.value)):this.$router.push({name:"mailListUser",params:{level:t.level,value:t.value}})},goFirst:function(){this.locs=[],this.loadDeptments(1)}},created:function(){},mounted:function(){this.loadDeptments(1)},destroyed:function(){}},a=(0,e(51900).Z)(n,function(){var e=this,s=e._self._c;return s("div",{staticClass:"mailListNew"},[s("div",{staticClass:"loc"},[s("span",[e._v("当前位置：")]),e._v(" "),s("p",{on:{click:function(t){return e.goFirst()}}},[s("span",[e._v("中共吉林省委党校")]),e._v(" "),s("van-icon",{attrs:{name:"arrow"}})],1),e._v(" "),e._l(e.locs,function(t,n){return s("p",{key:n},[s("span",[e._v(e._s(t.name))]),e._v(" "),s("van-icon",{attrs:{name:"arrow"}})],1)})],2),e._v(" "),s("div",{staticClass:"mails",class:{noHeader:!e.$store.state.isShowAppHeader}},e._l(e.depts,function(n,t){return s("div",{key:t,on:{click:function(t){return e.goDept(n)}}},[s("van-icon",{attrs:{name:"play"}}),e._v(" "),s("span",[e._v(e._s(n.name))])],1)}),0)])},[],!1,null,"1797f6dd",null).exports}}]);