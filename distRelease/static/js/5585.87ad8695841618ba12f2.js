"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[5585],{5585:function(t,e,n){n.r(e),n.d(e,{default:function(){return a}});var e={data:function(){return{title:"",docNum:"",createTime:"",content:[]}},created:function(){this.getInfo()},methods:{getInfo:function(){var e=this,t=this.$route.params.moduleId,n=this.$route.params.pk;dsf.http.get("fn/mobileTodo/loadBusinessInfo",{pk:n,moduleId:t}).then(function(t){e.title=t.data.data.title,e.docNum=t.data.data.docNum,e.createTime=t.data.data.createTime,e.content=t.data.data.content||[]})}}},a=(0,n(51900).Z)(e,function(){var n=this,a=n._self._c;return n.title?a("div",[a("div",{staticClass:"top"},[a("div",{staticClass:"title"},[n._v(n._s(n.title))]),n._v(" "),a("div",{staticClass:"docNum"},[n._v(n._s(n.docNum))]),n._v(" "),a("div",{staticClass:"createTime"},[n._v(n._s(n.createTime.split(" ")[0]))])]),n._v(" "),a("div",{staticClass:"content"},[n._l(n.content,function(t,e){return a("p",{key:e},[a("span",{domProps:{innerHTML:n._s(t)}})])}),n._v(" "),0==n.content.length?a("commonempty",{attrs:{description:"暂无内容"}}):n._e()],2)]):n._e()},[],!1,null,"4e243db5",null).exports}}]);