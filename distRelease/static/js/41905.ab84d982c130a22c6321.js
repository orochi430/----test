"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[41905],{41905:function(t,i,n){n.r(i),n.d(i,{default:function(){return r}});var a=n(66250),i=n(33453),o=n.n(i),i=n(8450),s=n.n(i),e=n(25108),c=n(70492);n(46295),n(83062),n(21865);var i={data:function(){return{total:"",sectionCount:"",isActive:"7",list:[],showUnit:!1,unitId:"",unitName:dsf.util.loadSessionStore("user").unitName,option:{},columns:[],isShowUnit:dsf.util.checkUserRole("疫情查询管理")}},mounted:function(){this.getData(this.isActive),this.isShowUnit&&this.getUnit()},methods:{getUnit:function(){var i=this;dsf.http.post("/ctrl/statistical/qryUnitStatistical",{rootUnitId:""}).then(function(t){200==t.data.code?(i.columns=t.data.data,i.columns.unshift({orgName:"本单位"}),e.log(t.data.data)):dsf.layer.toast(t.data.messge)}).error(function(t){})},toList:function(t){var i={unitId:this.unitId||dsf.util.loadSessionStore("user").unitId};t||(i["query_S-API-LOG-0001"]="".concat(this.list[0].x," - ").concat(this.list[this.list.length-1].x)),this.$router.push({path:"/commonList/220322155159B6DOXReCG8DuIE9gwM5/220318112117wJNhpmh1Q3QEyNdHat5",query:i?{secQuery:s()(i)}:{}})},getData:function(n,s){var e=this;return(0,a.Z)(o().mark(function t(){var i;return o().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return i=dsf.layer.loading(),t.next=3,dsf.http.post("/ctrl/statistical/qrySectionStatistical",{section:n,qryUnitId:s||""}).then(function(t){dsf.layer.closeLoading(i),200==t.data.code?(e.total=t.data.data.count,e.sectionCount=t.data.data.sectionCount,e.list=t.data.data.detailDate):dsf.layer.toast(t.data.messge)}).error(function(t){dsf.layer.closeLoading(i)});case 3:e.drawLine(e.list);case 4:case"end":return t.stop()}},t)}))()},handClickBtn:function(t){this.isActive=t,this.getData(this.isActive,this.unitId)},drawLine:function(t){e.log(t),c.init(document.getElementById("myChart")).setOption({xAxis:{type:"category",boundaryGap:!1,data:t.map(function(t){return t.x.slice(5)})},yAxis:{type:"value"},series:[{data:t.map(function(t){return t.y}),type:"line",label:{show:!0,formatter:function(t){return t.value||""}},itemStyle:{color:"#0A9BFF"},areaStyle:{color:new c.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"rgba(10,155,255,0.8)"},{offset:1,color:"rgba(10,155,255,0.3)"}])}}]})},confirmUnit:function(t){e.log(t),this.showUnit=!1,this.unitId=t.orgId,this.unitName=t.orgName,this.getData(this.isActive,this.unitId)}},beforeRouteEnter:function(t,i,n){n(function(t){"commonList"!==i.name&&(t.unitId="",t.unitName=dsf.util.loadSessionStore("user").unitName,t.isActive="7",t.isShowUnit=dsf.util.checkUserRole("疫情查询管理"),t.getData(t.isActive),t.getUnit())})}},r=(0,n(51900).Z)(i,function(){var i=this,t=i._self._c;return t("div",{staticClass:"container",style:{minHeight:"calc(100vh - ".concat(i.$store.state.isShowAppHeader?"0.92rem":"0px",")")}},[i.isShowUnit?t("van-cell",{attrs:{title:"单位选择","is-link":"",value:i.unitName},on:{click:function(t){i.showUnit=!0}}}):i._e(),i._v(" "),t("div",{staticClass:"flex"},[t("div",{staticClass:"box"},[t("div",[i._v("累计查询总人次")]),i._v(" "),t("div",{staticClass:"num",staticStyle:{color:"#0073CA"},on:{click:function(t){return i.toList(!0)}}},[i._v(i._s(i.total))])]),i._v(" "),t("div",{staticClass:"box"},[t("div",[i._v(i._s(i.isActive)+"天内查询总人次")]),i._v(" "),t("div",{staticClass:"num",on:{click:function(t){return i.toList()}}},[i._v(i._s(i.sectionCount))])])]),i._v(" "),t("div",{staticStyle:{"text-align":"center","font-size":"var(--font_size_2)"}},[i._v("疫情查询人次")]),i._v(" "),t("div",{staticClass:"chart-container"},[t("div",{staticClass:"_btn _controlBtn"},[t("span",{class:"7"==i.isActive?"_active":"",on:{click:function(t){return i.handClickBtn("7")}}},[i._v("近7天")]),i._v(" "),t("span",{class:"30"==i.isActive?"_active":"",on:{click:function(t){return i.handClickBtn("30")}}},[i._v("近30天")])]),i._v(" "),t("div",{style:{width:"100%",height:"100%"},attrs:{id:"myChart"}})]),i._v(" "),t("van-popup",{attrs:{round:"",position:"bottom"},model:{value:i.showUnit,callback:function(t){i.showUnit=t},expression:"showUnit"}},[t("van-picker",{attrs:{"show-toolbar":"",columns:i.columns,"value-key":"orgName"},on:{cancel:function(t){i.showUnit=!1},confirm:i.confirmUnit}})],1)],1)},[],!1,null,"2a1718ef",null).exports}}]);