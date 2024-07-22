/*!
 * Name: @dsf/cli-platform
 * Version: 5.17.0-alpha.5
 * Description: 平台基础包
 * BuildTime: 2024/6/19 17:49:40
*/
(("undefined"!==typeof self?self:this)["webpackJsonpplatform"]=("undefined"!==typeof self?self:this)["webpackJsonpplatform"]||[]).push([[23],{1187:function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"ds-control mobile ds-newsinfo"},[t._t("title",(function(){return[t.data.title?s("div",{staticClass:"ds-newsinfo-title"},[t._v(t._s(t.data.title))]):t._e()]})),t._t("desc"),s("div",{staticClass:"ds-newsinfo-content",domProps:{innerHTML:t._s(t.content)}}),t.data.title||t.data.content?t._e():s("dsf-empty-data",{attrs:{description:"无数据"}})],2)},i=[],r=dsf.component({name:"DsfMobileNewsInfo",mixins:[$mixins.control],ctrlCaption:"新闻详情",props:{url:{type:String,default:""}},data:function(){return{source:{}}},computed:{data:function(){return"string"===typeof this.source?{content:this.source}:{content:null===(t=this.source)||void 0===t?void 0:t.content,title:null===(e=this.source)||void 0===e?void 0:e.title};var t,e},content:function(){return this.data.content&&"string"===typeof this.data.content?this.data.content.replace(/(\d+)px/g,(function(t,e){t=t.replace("px","");var s=.01*parseInt(t);return"".concat(s)})):""}},created:function(){this.url&&this.loadData()},methods:{params:function(){return{id:this.$route.query.id}},loadData:function(){var t=this;this.$http.get(this.url,this.params).then((function(e){var s=e.data;t.source=s.data}))}}}),a=r,o=s(0),c=Object(o["a"])(a,n,i,!1,null,null,null);e["default"]=c.exports},1188:function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"ds-control mobile ds-news-detail",class:t.getCss},[t.isDesign?[n("div",{staticClass:"title"},[t._v("人民至上，抓实抓细防汛救灾各项措施")]),n("div",{staticClass:"user"},[n("van-image",{staticClass:"img",attrs:{width:"40",height:"40",src:t._f("imgFormat")(t.source.cover),fit:"cover",round:""},scopedSlots:t._u([{key:"loading",fn:function(){return[n("i",{staticClass:"iconfont icon-spinner2"}),t._v("加载中")]},proxy:!0},{key:"error",fn:function(){return[n("img",{attrs:{src:s(398),alt:""}})]},proxy:!0}],null,!1,2148504900)}),t._m(0)],1),n("div",{staticClass:"content"},[t._v(" 当前，全国防洪讯进入“七上八下‘阶段，长江流域中上游地区降雨偏多，黄河中上游，海河，松花江，淮河流域可能发生较重汛情。在防汛的关键时期，中央政治局常委会召开会议研究部署相关工作，习近平总书记主持会议并发表重要讲话，防汛救灾关系人民财产安全，关系粮食安全，经济安全，社会安全，国家安全。这为各方落实主体责任，加强统筹协调做好防汛救灾工作提供了根本遵循。 ")])]:[n("div",{staticClass:"title"},[t._v(t._s(t.source.title))]),t.source?n("div",{staticClass:"user"},[n("van-image",{staticClass:"img",attrs:{width:"40",height:"40",src:t._f("imgFormat")(t.source.cover),fit:"cover",round:""},scopedSlots:t._u([{key:"loading",fn:function(){return[n("i",{staticClass:"iconfont icon-spinner2"}),t._v("加载中")]},proxy:!0},{key:"error",fn:function(){return[n("img",{attrs:{src:s(398),alt:""}})]},proxy:!0}],null,!1,2148504900)}),n("div",{staticClass:"info"},[n("p",{staticClass:"name"},[t._v(t._s(t.source.authorName))]),n("p",{staticClass:"date"},[t._v(t._s(t.source.publishTime))])])],1):t._e(),"0"===t.source.type?n("div",{staticClass:"content",domProps:{innerHTML:t._s(t.content)}}):t._e(),"1"===t.source.type?n("div",{staticClass:"content"},t._l(t.source.articlesImagesVos,(function(e,s){return n("img",{key:s,attrs:{src:t._f("imgFormat")(e.imagePath),alt:""}})})),0):t._e(),"2"===t.source.type?n("div",{staticClass:"content"},[n("video",{attrs:{controls:"",width:"100%",src:t._f("imgFormat")(t.source.video)}})]):t._e(),"3"===t.source.type?n("iframe",{staticClass:"content",attrs:{src:t.source.externalLink,frameborder:"0",width:"100%",height:"100%"}}):t._e(),t.source.content||t.source.articlesImagesVos||t.source.video||t.source.externalLink?t._e():n("dsf-empty-data",{attrs:{description:"无数据"}})]],2)},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"info"},[s("p",{staticClass:"name"},[t._v("解放军报")]),s("p",{staticClass:"date"},[t._v("2020-06-22 20:00")])])}],r=dsf.component({name:"DsfMobileNewsDetail",mixins:[$mixins.control],ctrlCaption:"新闻详情",props:{url:{type:String,default:"cms/articles/queryArticlesById"}},data:function(){return{source:{}}},computed:{content:function(){return this.source.content&&"string"===typeof this.source.content?this.source.content.replace(/(\d+)px/g,(function(t,e){t=t.replace("px","");var s=.01*parseInt(t);return"".concat(s)})):""}},created:function(){this.url&&this.loadData()},methods:{params:function(){return{id:this.$route.query.id}},loadData:function(){var t=this;this.$http.get(this.url,this.params()).then((function(e){var s=e.data;t.source=s.data}))}}}),a=r,o=s(0),c=Object(o["a"])(a,n,i,!1,null,null,null);e["default"]=c.exports},398:function(t,e,s){t.exports=s.p+"modules/platform/img/default-header.png"}}]);
//# sourceMappingURL=../../../smap/platform/dsf-platform.platform_mobile_news.js.map