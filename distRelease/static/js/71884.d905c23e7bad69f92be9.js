"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[71884],{71884:function(e,n,t){t.r(n),t.d(n,{default:function(){return s}});var a=t(25108),n={data:function(){return{pwd:"",newPwd:"",confirmPwd:""}},created:function(){},methods:{newPwdRules:function(e,n){return/^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{6,}$/.test(e)},confirmPwdRules:function(e,n){return this.newPwd===e},save:function(){var n=this;dsf.http.post("fn/userinfo/updatePwd",{pwd:this.pwd,newPwd:this.newPwd,userId:dsf.util.loadSessionStore("user").user_id}).done(function(e){200==e.code?(dsf.layer.toast("修改成功",!1),n.$router.push({path:"/meetingPad/index/personal"})):dsf.layer.toast(e.message,!1)}).error(function(e){a.log("error",e)}).always(function(){})}}},s=(0,t(51900).Z)(n,function(){var n=this,e=n._self._c;return e("div",{staticClass:"change-pwd-container"},[e("div",{staticClass:"change-pwd-top"},[e("van-icon",{attrs:{name:"arrow-left"},on:{click:function(e){return n.$router.back()}}}),n._v(" "),e("h2",[n._v("修改密码")])],1),n._v(" "),e("div",{staticClass:"change-pwd-form"},[e("van-form",{attrs:{"validate-first":"","validate-trigger":"onBlur"},on:{submit:n.save}},[e("div",{staticClass:"change-pwd-form-con"},[e("van-field",{attrs:{type:"password",label:"旧密码"},model:{value:n.pwd,callback:function(e){n.pwd=e},expression:"pwd"}}),n._v(" "),e("van-field",{attrs:{rules:[{validator:n.newPwdRules,message:"请输入正确内容"}],type:"password",label:"新密码"},model:{value:n.newPwd,callback:function(e){n.newPwd=e},expression:"newPwd"}}),n._v(" "),e("van-field",{attrs:{rules:[{validator:n.confirmPwdRules,message:"请输入正确内容"}],type:"password",label:"确认密码"},model:{value:n.confirmPwd,callback:function(e){n.confirmPwd=e},expression:"confirmPwd"}}),n._v(" "),e("p",{staticClass:"point-content"},[n._v("密码必须至少6位，而且同时包含数字+字母")])],1),n._v(" "),e("div",{staticClass:"change-pwd-btn"},[e("van-button",{attrs:{type:"info","native-type":"submit"}},[n._v("保存")])],1)])],1)])},[],!1,null,"510d60f0",null).exports}}]);