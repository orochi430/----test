"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[7076],{7076:function(t,e,s){s.r(e),s.d(e,{default:function(){return i}});var e=s(69273),a=s(25108),e={name:"fileTrends",components:{fileTypeIcon:e.Z},data:function(){return{list:[],finished:!1,loading:!1,refreshing:!1,start:1,limit:15,userInfo:{}}},computed:{},watch:{},methods:{onClickLeft:function(){this.$router.go(-1)},onLoad:function(){var i=this,n=this;n.nodata=!1,dsf.http.post("fn/cloud/dynamic/list",{page:this.start,limit:this.limit},{headers:{"Content-Type":"application/json"}}).then(function(t){var e=t.status,t=t.data;a.log(t,e),200===e?(0==t.data.length&&1==n.start&&(n.nodata=!0),t&&t.data&&0<t.data.length&&(t.data.forEach(function(t){t.createTime=t.createTime?moment(new Date(t.createTime)).format("YYYY/MM/DD"):""}),n.list=n.list.concat(t.data)),t.data.length<n.limit?i.finished=!0:n.start+=1):(i.finished=!0,n.nodata=!0)}).catch(function(t){t.message;i.finished=!0,n.nodata=!0}).finally(function(){i.loading=!1,i.refreshing=!1})},doRefresh:function(t){this.keyword=t,this.start=1,this.list=[],this.finished=!1,this.loading=!0,this.onLoad()}},created:function(){},mounted:function(){this.userInfo=dsf.util.loadSessionStore("user")},destroyed:function(){}},i=(0,s(51900).Z)(e,function(){var i=this,n=i._self._c;return n("div",{staticClass:"fileTrends"},[n("div",{staticClass:"fileList"},[n("van-pull-refresh",{attrs:{disabled:i.finished},on:{refresh:i.doRefresh},model:{value:i.refreshing,callback:function(t){i.refreshing=t},expression:"refreshing"}},[n("van-list",{attrs:{finished:i.finished,"finished-text":""},on:{load:i.onLoad},model:{value:i.loading,callback:function(t){i.loading=t},expression:"loading"}},i._l(i.list,function(t,e){return n("div",{key:e,staticClass:"dongtai"},[n("div",{staticClass:"filetop"},[n("van-image",{attrs:{src:i.userInfo.photo},scopedSlots:i._u([{key:"error",fn:function(){return[n("img",{attrs:{src:s(10627),alt:"",srcset:""}})]},proxy:!0}],null,!0)}),i._v(" "),n("p",[n("span",[i._v(i._s(t.info))]),i._v(" "),n("span",[i._v(i._s(t.createTime))])])],1),i._v(" "),t.files&&0<t.files.length?n("div",{staticClass:"files"},i._l(t.files,function(t,e){return n("div",{key:t.fileId+e},[n("fileTypeIcon",{attrs:{"file-name":t.fileName,width:28,height:32,isDirectory:0}}),i._v(" "),n("p",[n("span",[i._v(i._s(t.fileName))]),i._v(" "),n("span")])],1)}),0):i._e()])}),0)],1)],1)])},[],!1,null,"5a5135c5",null).exports},69273:function(t,e,i){i.d(e,{Z:function(){return n}});var e={name:"fileTypeIcon",props:{fileName:{type:String,default:"cloud"},width:{type:Number,default:32},height:{type:Number,default:38},isDirectory:{type:Number,default:0}},components:{},data:function(){return{}},computed:{iconUrl:function(){var t=this.fileName.substr(this.fileName.lastIndexOf(".")+1);return 1==this.isDirectory?"./static/images/fileTypeIcons/folder.png":"./static/images/fileTypeIcons/"+t+".png"}},watch:{},methods:{},created:function(){},mounted:function(){},destroyed:function(){}},n=(0,i(51900).Z)(e,function(){var t=this,e=t._self._c;return e("van-image",{attrs:{src:t.iconUrl,width:t.width,height:t.height},scopedSlots:t._u([{key:"error",fn:function(){return[e("img",{attrs:{src:i(54073),alt:"",srcset:""}})]},proxy:!0}])})},[],!1,null,null,null).exports},54073:function(t,e,i){t.exports=i.p+"static/img/cloud.e0e5c0c..png"},10627:function(t,e,i){t.exports=i.p+"static/img/user-img.de92786..svg"}}]);