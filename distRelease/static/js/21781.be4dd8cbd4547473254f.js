"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[21781],{54397:function(e,t,n){n.d(t,{b:function(){return a}});var t=n(8450),i=n.n(t),s=n(25108),a=function(t){function n(t){$XYLink.execute(["joinMeeting",t],function(e){s.log(4),e.status||dsf.layer.toast("加入会议：".concat(t.meetingNum,"失败,").concat(e.msg),!1)},function(e){s.log(e)})}s.log(1),$XYLink.execute(["getConnectStatus",{}],function(e){s.log(2),e.connected?n(t):(e={userName:(e=dsf.util.loadSessionStore("user")).name,userId:e.user_id,userData:[{user:e},{loginToken:dsf.util.loadSessionStore("loginToken")}]},$XYLink.execute(["loginById",e],function(e){s.log(3),n(t)},function(e){s.log(e)}))},function(e){s.log(i()(e)),alert(i()(e))})}},21781:function(e,t,n){n.r(t),n.d(t,{default:function(){return a}});var i=n(54397),s=n(25108),t={name:"joinMeeting",components:{},data:function(){return{meetingData:{},number:"",pd:"",title:"加入会议",checked:!1,checked1:!1}},computed:{checkComfirm:function(){var e=!0;return e=this.number.length?!1:e}},methods:{goBack:function(){this.$router.back()},confirm:function(){var t={meetingNum:this.number,password:this.pd,micMute:!this.checked,videoMute:!this.checked1,title:""};s.log(t),dsf.http.post("fn/vedioMeeting/judgeMeetingRoomAndPsd?meetingRoom=".concat(this.number,"&passWord=").concat(this.pd)).then(function(e){e=e.data;"200"!=e.code?dsf.layer.toast(e.message):(0,i.b)(t)})}}},a=(0,n(51900).Z)(t,function(){var t=this,e=t._self._c;return e("div",{staticClass:"ds-user-dialog"},[e("div",{staticClass:"__user_box"},[e("div",{staticClass:"__user_box-body"},[e("div",{staticClass:"box"},[e("van-field",{attrs:{label:"会议室号：","label-align":"right",type:"number",placeholder:"请输入会议室号"},model:{value:t.number,callback:function(e){t.number=e},expression:"number"}}),t._v(" "),e("van-field",{attrs:{label:"密　　码：","label-align":"right",type:"number",placeholder:"请输入密码"},model:{value:t.pd,callback:function(e){t.pd=e},expression:"pd"}})],1),t._v(" "),t._m(0),t._v(" "),e("div",{staticStyle:{"margin-top":"10px"}},[e("div",{staticClass:"box"},[e("div",{staticClass:"p"},[e("span",[t._v("开启麦克风")]),t._v(" "),e("van-switch",{attrs:{size:"20px"},model:{value:t.checked,callback:function(e){t.checked=e},expression:"checked"}})],1),t._v(" "),e("div",{staticClass:"p"},[e("span",{staticClass:"justify"},[t._v("开启视频")]),t._v(" "),e("van-switch",{attrs:{size:"20px"},model:{value:t.checked1,callback:function(e){t.checked1=e},expression:"checked1"}})],1)])])]),t._v(" "),e("div",{staticClass:"__user_box-footer"},[e("van-button",{attrs:{type:"default"},on:{click:t.goBack}},[t._v("返回")]),t._v(" "),e("van-button",{attrs:{type:"primary",disabled:t.checkComfirm},on:{click:t.confirm}},[t._v("确定")])],1)])])},[function(){var e=this._self._c;return e("div",{staticClass:"box"},[e("span",{staticClass:"tip"},[this._v("注：如会议无需密码可不填！")])])}],!1,null,"52ded3b8",null).exports}}]);