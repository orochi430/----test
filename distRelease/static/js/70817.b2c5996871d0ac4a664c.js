"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[70817],{70817:function(t,s,a){a.r(s),a.d(s,{default:function(){return n}});var i=a(25108),s={name:"Subsection",props:[],components:{},data:function(){return{processingStatisticsData:{ljbjl:0,hbsq:"0%",asbjl:"0%",openDialog:!1}}},created:function(){},mounted:function(){var o=dsf.layer.loading(),l=this;dsf.http.post("fn/efficiencySelect/processingVolumeStatistics",{year:(new Date).getFullYear(),month:(new Date).getMonth()+1,range:1}).then(function(t){var s,a,i,n,e,c;dsf.layer.closeLoading(o),"success"===t.data.type?(s=(c=t.data.data).ljbjl,a=c.hbsq,i=c.asbjl,n=c.pjhs,e=c.ybzz,c=c.openDialog,l.processingStatisticsData.ljbjl=s,l.processingStatisticsData.hbsq=a,l.processingStatisticsData.asbjl=i,l.processingStatisticsData.pjhs=n,l.processingStatisticsData.ybzz=e,(l.processingStatisticsData.openDialog=c)||(l.processingStatisticsData.openDialog=!1,setTimeout(function(){l.$router.replace({path:"/officialDocumentEfficiency"})},10))):dsf.layer.toast(t.data.message)}).catch(function(t){dsf.layer.closeLoading(o),i.log(t)})},activated:function(){},computed:{},watch:{},methods:{chaKanDetail:function(){var t=this;this.processingStatisticsData.openDialog=!1,setTimeout(function(){t.$router.replace({path:"/officialDocumentEfficiency"})},10)},closePop:function(){this.processingStatisticsData.openDialog=!1,this.$router.go(-1)}}},n=(0,a(51900).Z)(s,function(){var s=this,t=s._self._c;return t("div",{staticClass:"Subsection"},[t("van-popup",{attrs:{round:""},on:{"click-overlay":s.closePop},model:{value:s.processingStatisticsData.openDialog,callback:function(t){s.$set(s.processingStatisticsData,"openDialog",t)},expression:"processingStatisticsData.openDialog"}},[t("div",{staticClass:"xiaoJie"},[t("div",{staticClass:"text"},[s._v("公文效能月度小结已更新,请查看")]),s._v(" "),t("div",{staticClass:"gray"},[s._v(s._s((new Date).getMonth()+1)+"月累计办件")]),s._v(" "),t("div",{staticClass:"num"},[t("span",[s._v(s._s(s.processingStatisticsData.ljbjl)+" ")]),s._v(" 件\n      ")]),s._v(" "),t("div",{staticClass:"timer"},[t("span",[s._v("同比增长: "+s._s(s.processingStatisticsData.tbzz))]),s._v(" "),t("div",{staticClass:"red"},[s._v("\n          +"+s._s(s.processingStatisticsData.hbsq)+" "),t("span")])]),s._v(" "),t("div",{staticClass:"rectangle"},[t("div",{staticClass:"left"},[t("div",{staticClass:"text"},[s._v("平均耗时")]),s._v(" "),t("div",{staticClass:"num"},[t("span",[s._v(s._s(s.processingStatisticsData.pjhs))]),s._v(" 小时\n          ")])]),s._v(" "),t("div",{staticClass:"center"}),s._v(" "),t("div",{staticClass:"right"},[t("div",{staticClass:"text"},[s._v("按时办结率")]),s._v(" "),t("div",{staticClass:"num"},[t("span",[s._v(s._s(s.processingStatisticsData.asbjl))])])])]),s._v(" "),t("div",{staticClass:"btn",on:{click:function(t){return t.stopPropagation(),s.chaKanDetail.apply(null,arguments)}}},[s._v("查看详细数据")]),s._v(" "),t("div",{staticClass:"close",on:{click:function(t){return t.stopPropagation(),s.closePop.apply(null,arguments)}}},[s._v("关闭")])])])],1)},[],!1,null,"7182b798",null).exports}}]);