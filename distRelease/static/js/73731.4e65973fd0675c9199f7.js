"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[73731],{73731:function(t,n,e){e.r(n),e.d(n,{default:function(){return a}});var n=e(27921),c=e.n(n),n=e(8450),o=e.n(n),i=(e(38653),e(25108)),n={name:"contentDetail",data:function(){return{keyword:"",content:"",content_copy:"",wjid:"",from:""}},created:function(){this.wjid=this.$route.query.wjid,this.from=this.$route.query.from,this.getData()},methods:{transformHignlight:function(t){var e=this;if(c()(t.children).length)for(var n=c()(t.children),o=0;o<n.length;o++)this.transformHignlight(n[o]);else{var i=t.innerText.split(this.keyword),a="";i.forEach(function(t,n){n===i.length-1?a+=t:a+=t+'<span style="color: red;">'.concat(e.keyword,"</span>")}),t.innerHTML=a}},searchKeyword:function(){var t=this,n=(this.content="",JSON.parse(o()(this.content_copy)));setTimeout(function(){t.content=JSON.parse(o()(t.content_copy)),t.keyword&&n.includes(t.keyword)?t.$nextTick(function(){t.transformHignlight(t.$refs.pContent)}):t.$nextTick(function(){t.content=JSON.parse(o()(t.content_copy))})},1)},getData:function(){var e=this;"one"===this.from?dsf.http.post("fn/menhu/queryfjyl?fid=".concat(this.wjid)).then(function(t){i.log(t);var n=dsf.util.loadSessionStore("loginToken"),t=dsf.url.getServerUrl("fn/office/openMobileOffice?fileId=".concat(t.data.data[0].pk,"&x-auth-token=").concat(n,"&moduleId=190427152140nmiGu76moaSpanLaHnY"));i.log("url"+t),e.$router.replace({name:"dsfIframe",params:{url:t}})}):dsf.http.post("fn/flfgyd/querynrxqByid?wtid=".concat(this.wjid)).then(function(t){i.log(t),e.content=t.data.nrtext,e.content_copy=t.data.nrtext})},allShare:function(){alert("点击了全文分享"),alert(o()(dd)),dd.biz.util.share({type:0,url:"https://www.baidu.com/",title:"测试分享",content:"分享内容内容",image:String,onSuccess:function(){},onFail:function(t){}})},collect:function(){dsf.http.post("fn/mobileFocus/setFocus?infoId=".concat(this.wjid)).then(function(t){dsf.layer.toast(t.data.message)})}}},a=(0,e(51900).Z)(n,function(){var n=this,t=n._self._c;return t("div",{staticClass:"content_detail"},[t("div",{staticClass:"contents"},[t("div",{staticClass:"search_body"},[t("van-search",{attrs:{"show-action":"","action-text":"查询","right-icon":"search","left-icon":"",placeholder:"请输入搜索关键词"},on:{search:function(t){return n.searchKeyword()},cancel:function(t){return n.searchKeyword()}},model:{value:n.keyword,callback:function(t){n.keyword=t},expression:"keyword"}})],1),n._v(" "),t("div",{staticClass:"content_part"},[t("div",{ref:"pContent",staticClass:"p_content",domProps:{innerHTML:n._s(n.content)}})]),n._v(" "),t("div",{staticClass:"bottom_operate"},[t("div",{on:{click:n.allShare}},[t("van-icon",{attrs:{name:"orders-o",size:"30px"}}),n._v(" "),t("span",[n._v("全文分享")])],1),n._v(" "),t("div",[t("van-icon",{attrs:{name:"share-o",size:"30px"}}),n._v(" "),t("span",[n._v("摘录分享")])],1),n._v(" "),t("div",{on:{click:n.collect}},[t("van-icon",{attrs:{name:"star-o",size:"30px"}}),n._v(" "),t("span",[n._v("添加收藏")])],1)])])])},[],!1,null,"59c526cf",null).exports}}]);