"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[5633],{5633:function(e,a,i){i.r(a),i.d(a,{default:function(){return r}});var t=i(25108),a={name:"ZhzgMobileDataViewPanelComponents",components:{},props:["itemdata"],data:function(){var e;return{iframeParams:{Url:"",height:"",showPrivilege:""},privileges:(null==(e=dsf.util.loadSessionStore("user"))?void 0:e.privileges)||[],checkShowBool:!0}},created:function(){},mounted:function(){t.log(this.itemdata),this.iframeParams.Url=this.itemdata.params.dataViewUrl,this.iframeParams.height=this.itemdata.params.dataViewHeight,this.iframeParams.showPrivilege=this.itemdata.params.showPrivilege,t.log("this.iframeParams.showPrivilege: ",this.iframeParams.showPrivilege),this.checkShow()},methods:{checkShow:function(){var a=this,e=this;return e.checkShowBool=!e.iframeParams.showPrivilege||e.privileges.some(function(e){return e.name==a.iframeParams.showPrivilege})}}},r=(0,i(51900).Z)(a,function(){var e=this,a=e._self._c;return e.checkShowBool?a("div",{staticClass:"dataviewpanel"},[a("div",{staticClass:"dataviewpanel_title"},[e._v("数据看板")]),e._v(" "),a("main",[a("iframe",{style:{height:e.iframeParams.height},attrs:{src:e.iframeParams.Url,frameborder:"0",width:"100%"}})])]):e._e()},[],!1,null,"04bb02a2",null).exports}}]);