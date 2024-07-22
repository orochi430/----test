<template>
  <div>
    <van-form @submit="login">
      <van-field
        :id="myInput"
        v-model="logname"
        name="用户名"
        label="用户名"
        placeholder="用户名"
      />
      <van-field
        v-model="txtpassword"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
    <icon color="red" name="hand-holding-usd" label="Forked Repository" />

    <van-button type="info" @click="scan">扫码</van-button>
    <van-button type="info" @click="video">视频</van-button>
    <van-button type="info" @click="ding">发丁</van-button>
    <van-button type="info" @click="createChatGroup">创建聊天</van-button>
    <van-button type="info" @click="dandian">单点</van-button>
    <icon label="No Photos">
      <icon name="camera" />
      <icon name="ban" scale="2" class="alert" />
    </icon>
    <van-button type="info" @click="pudong">浦东</van-button>
    <van-button type="info" @click="writingseal">手写批章</van-button>
    <van-button type="info" @click="writingseal2">手写批章2</van-button>
    <van-button type="info" @click="showSPZ">输入生僻字</van-button>

    <div class="ipt" id="receiveWord">
      <div>
        㐀㓿䐀䓿䫟䶵一廿渀绿踀 黿龥𬍛  𬱖𬘡𬀩䮄瓅﨩𠀀
        𡀀𢀀𣀀𤀀𥀀𦀀𧀀𨀀𩀀𪀀𪛖 𪛖𫍽𬬮妭䗴姐鿍鿎鿏 
        𪃾1𦰣𦮶𦮻𦰊23䓍䓐䓊78910
      </div>
    </div>
    <DsfMobileDateIntervalPicker v-model="date1"></DsfMobileDateIntervalPicker>
  </div>
</template>

<script>
import store from "@/common/util";
export default {
  data() {
    return {
      date1:{sdate:"",edate:""},
      logname: "zhangshan",
      txtpassword: "111111",
      myInput: "myinput",
    };
  },
  mounted() {
    var tid = "ef7c20afa45dcf5fa8d17416378550cf";
    var token = "676a17a1321d10316f0fe71890572b0e";
    var domainUrl = "https://ufont.foundertype.com/";
    var contextPath = "";

    
    
  },
  created() {},
  methods: {
    showSPZ() {
      window.kb.show();
    },
    dandian() {
      var serverUrl = "http://ahyc.com.cn/"; //1179361621
      import("dingtalk-jsapi")
        .then((dd) => {
          window.dd = dd;
          dd.ready(function () {
            store.clearSession();
            // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。  zjpCode
            // alert("dd-jsapi准备就绪   开始获取免密code");
            dd.runtime.permission.requestAuthCode({
              //县政钉
              corpId: "dingf5850a5877fdc7d5a39a90f97fcb1e09",
              onSuccess: function (result) {
                dsf.http
                  .postUrls(
                    serverUrl + "/sinoware/v1/sso/getUserInfo",
                    { code: result.code, token: "", resourcesId: "" },
                    {}
                  )
                  .then(function (result) {
                    if (result.data.rcode == 1) {
                      //console.log(result.data);
                      store.saveToSessionStore("user", result.data.data);
                      store.saveToSessionStore(
                        "loginToken",
                        result.data.data.auth.token
                      );
                      store.saveToSessionStore("Role", result.data.data.role);
                      //鉴权
                      //钉钉获取token getDingTalkToken
                      return dsf.http.get(`/fn/DingDing/getToken`, {});
                    } else if (result.rcode == 0) {
                      dd.device.notification.alert({
                        message: result.message,
                        title: "温馨提示", //可传空
                        buttonName: "确定",
                        onSuccess: function () {},
                        onFail: function (err) {},
                      });
                    } else {
                      dd.device.notification.alert({
                        message: "登录失败!",
                        title: "温馨提示", //可传空
                        buttonName: "确定",
                        onSuccess: function () {},
                        onFail: function (err) {},
                      });
                    }
                  })
                  .then(function (token) {
                    if (token.data && token.data.message) {
                      //钉钉获取ticket  getDingTalkTicket
                      return dsf.http.get(
                        `/fn/DingDing/getTicket?token=${token.data.message}`,
                        {}
                      );
                    } else {
                      dsf.layer.toast("获取钉钉token出错");
                    }
                  })
                  .then(function (ticket) {
                    //换取ticket
                    if (ticket.data && ticket.data.message) {
                      //钉钉获取签名参数  getDingTalkSignature
                      let url_ = window.location.href; //获取签名url不带#后面的东西
                      let url = url_.split("#")[0];
                      var $chars =
                        "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
                      var maxPos = $chars.length;
                      var pwd = "";
                      for (var i = 0; i < 16; i++) {
                        pwd += $chars.charAt(
                          Math.floor(Math.random() * maxPos)
                        );
                      }
                      let nonceStr = pwd;
                      var agentId = dsf.config.ddSetting.ddAgentId;
                      var timeStamp = Date.parse(new Date());
                      var corpId = dsf.config.ddSetting.ddCoprId;

                      dsf.http
                        .get(
                          `/fn/DingDing/getSign2?ticket=${ticket.data.message}&nonceStr=${nonceStr}&timeStamp=${timeStamp}&url=${url}`,
                          {}
                        )
                        .then(function (autograph) {
                          if (autograph.data && autograph.data.message) {
                            dd.config({
                              agentId: DingConfig.agentId, // 必填，微应用ID
                              corpId: DingConfig.corpId, //必填，企业ID
                              timeStamp: timeStamp, // 必填，生成签名的时间戳
                              nonceStr: nonceStr, // 必填，生成签名的随机串
                              signature: autograph.data.message, // 必填，签名
                              type: 0, //选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
                              jsApiList: [
                                "device.connection.getNetworkType",
                                "device.base.getWifiStatus",
                                "device.base.getPhoneInfo",
                                "device.base.getUUID",
                                "biz.cspace.saveFile",
                                "biz.conference.videoConfCall",
                                "biz.util.scan",
                                "biz.ding.create",
                                "biz.microApp.openApp",
                                "biz.util.openLink",
                              ],
                            });
                            store.logIn(() => {
                              beforeNext(toDo);
                            });
                          } else {
                            dsf.layer.toast("钉钉JS签名出错");
                          }
                        });
                    }
                  });
              },
              onFail: function (err) {
                var str = JSON.stringify(err);
                alert("失败" + str);
              },
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    scan() {
      dsf.dd.scan(function (data) {
        console.log("scan", data);
      });
    },
    createChatGroup() {
      dsf.dd.createChatGroup(["479561", "467677"]);
    },
    video() {
      //dsf.dd.video("200217020459QOvsKArgFPC1aj6faDu");
      dsf.dd.video({
        title: "视频会议",
        calleeCorpId: dsf.config.ddSetting.ddCoprId,
        calleeStaffIds: ["479561", "467677"],
        onSuccess: function (res) {
          alert("success:" + res);
        },
        onFail: function (e) {
          alert("error:" + e);
        },
      });
    },
    pudong() {
      dd.biz.util.openLink({
        url: "http://180.167.126.152/DreamMobile/dist/index.html#!/MainIndexPage/false", //要打开链接的地址
        onSuccess: function (result) {
          /**/
        },
        onFail: function (err) {},
      });
    },
    ding() {
      dsf.dd.Ding({
        users: ["72177"],
        alertType: 2,
        text: "测试丁丁",
      });
    },
    login() {
      store.clearSession();
      let self = this;
      dsf.http
        .post("/fn/mobileAuth/login", {
          __DATA: JSON.stringify({
            logname: this.logname,
            password: this.txtpassword,
            device_id: "postman",
            device_desc: "postman",
          }),
        })
        .then(function (data) {
          if (data.data.rcode == 1) {
            store.saveToSessionStore("user", data.data.data);
            store.saveToSessionStore("loginToken", data.data.data.auth.token);

            dsf.http
              .post("fn/mobileToDo/getToDoBadge", {})
              .then(function (data1) {
                console.log("ddd", data1);
              });
            self.$router.push("/");
          }
          dsf.layer.toast(data.data.message);
        });
    },
    writingseal() {
      let param = {
        mode: 0,
        copyRight: dsf.config.ddSetting.Kingecode,
        userName: "zhangsan",
        url: "http://116.236.111.158:8011/DreamMobile/demo/1.pdf",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        fileName: "",
        fileType: "",
        isSupportPen: false,
      };
      // success:function(res){
      //     // dsf.http.post(`${param.saveUrl}`,{sourceUrl:`${res.url}`})
      //     // .then(res=>{
      //       console.log(param.width,res)
      //       dsf.layer.toast("批示成功");
      //     // })
      //   }
      // function foo(param){
      //   new Promise(function(resolve,reject){
      //     var a=1;
      //     console.log(a++)
      //     resolve(444)
      //   }).then(param.success)
      // }
      // foo(param)
      // dsf.dd.signature(param)
      dd.showSignature(param)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {});
    },
    writingseal2() {
      let param = {
        mode: 0,
        copyRight: dsf.config.ddSetting.Kingecode,
        userName: "zhangsan",
        url: "http://116.236.111.158:8011/DreamMobile/demo/1.pdf",
        top: "30",
        left: "30",
        width: "800",
        height: "1000",
        fileName: "",
        fileType: "",
        isSupportPen: false,
      };
      dd.showSignature(param)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {});
    },
  },
};
</script>
