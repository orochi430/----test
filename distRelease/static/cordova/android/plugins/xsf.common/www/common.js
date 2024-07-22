cordova.define("common-main-plugin", function (require, exports, module) {
   var exec = require('cordova/exec');

   //通用插件

   var xsfCommon = {
      setFingerprint: function (data, successCallback, errorCallback) {//设置指纹
         call('setFingerprint', [data], successCallback, errorCallback);
      },
      cancerFingerprint: function (data, successCallback, errorCallback) {//取消指纹
         call("cancerFingerprint", [data], successCallback, errorCallback);
      },
      getStatus: function (data, successCallback, errorCallback) {//获取当前是否设置了指纹
         call("getStatus", [data], successCallback, errorCallback);
      },
      anHuiLogin: function (data, successCallback, errorCallback) {//安徽烟草双因子认证
         call("anHuiLogin", [data], successCallback, errorCallback);
      },
      dianJuSdk: function (data, successCallback, errorCallback) {//点聚
         call("dianJuSdk", [data], successCallback, errorCallback);
      },
      dianJuTabSdk: function (data, successCallback, errorCallback) {//点聚tab多签批单模式
         call("dianJuTabSdk", [data], successCallback, errorCallback);
      },
      UuSafeLoginMode: function (data, successCallback, errorCallback) {//是否开启指掌易单点登录
         call("UuSafeLoginMode", [data], successCallback, errorCallback);
      },
      UuSafeLogin: function (data, successCallback, errorCallback) {//指掌易单点登录获取用户名
         call("UuSafeLogin", [data], successCallback, errorCallback);
      },
      ssoAuthLogin: function (data, successCallback, errorCallback) {//sso单点登录获取用户名
         call("ssoAuthLogin", [data], successCallback, errorCallback);
      },
      openAppByScheme: function (data, successCallback, errorCallback) {//根据Scheme打开第三方APP
         call("openAppByScheme", [data], successCallback, errorCallback);
      },
      setAppBadge: function (data, successCallback, errorCallback) {//设置角标
         call("setAppBadge", [data], successCallback, errorCallback);
      },
      SystemTools: function (data, successCallback, errorCallback) {//获取系统相关参数
         call("SystemTools", [data], successCallback, errorCallback);
      },
      checkPackage: function (data, successCallback, errorCallback) {//获取系统相关参数
         call("checkPackage", [data], successCallback, errorCallback);
      },
      VPNSetting: function (data, successCallback, errorCallback) {//打开VPN设置
         call("VPNSetting", [data], successCallback, errorCallback);
      },
      changeVPNPassword: function (data, successCallback, errorCallback) {//打开vpp密码修改界面
         call("changeVPNPassword", [data], successCallback, errorCallback);
      },
      getStepCount: function (data, successCallback, errorCallback) {//获取当前步数
         call("getStepCount", [data], successCallback, errorCallback);
      },
      openVPNLoginPage: function (data, successCallback, errorCallback) {//打开vpn登录界面
         call("openVPNLoginPage", [data], successCallback, errorCallback);
      },
      UUMbsLogin: function (data, successCallback, errorCallback) {//指掌易mbs单点登录
         call("UUMbsLogin", [data], successCallback, errorCallback);
      },
      reload: function (data, successCallback, errorCallback) {//重新加载
         call("reload", [data], successCallback, errorCallback);
      },
      bsCaLogin: function (data, successCallback, errorCallback) {//宝山Ca认证
         call("bsCaLogin", [data], successCallback, errorCallback);
      },
      getNetState: function (data, successCallback, errorCallback) {//根据当前首页地址判断网络状态
         call("getNetState", [data], successCallback, errorCallback);
      },
      closeActivity: function (data, successCallback, errorCallback) {//关掉activity
         call("closeActivity", [data], successCallback, errorCallback);
      },
      goVPNSettingActivity: function (data, successCallback, errorCallback) {//进入 VPNSettingActivity
         call("goVPNSettingActivity", [data], successCallback, errorCallback);
      },
      unZipFile: function (data, successCallback, errorCallback) {//文件解压
         call("unZipFile", [data], successCallback, errorCallback);
      },
      downloadFile: function (data, successCallback, errorCallback) {//文件下载
         call("downloadFile", [data], successCallback, errorCallback);
      },
      getFileInfo: function (data, successCallback, errorCallback) {//获取本地文件信息
         call("getFileInfo", [data], successCallback, errorCallback);
      },
      deleteFile: function (data, successCallback, errorCallback) {//删除文件
         call("deleteFile", [data], successCallback, errorCallback);
      },
      enableScreenShot: function (data, successCallback, errorCallback) {//是否允许截屏
         call("enableScreenShot", [data], successCallback, errorCallback);
      },
      XDJARequestRsbForResourceAddress: function (data, successCallback, errorCallback) {//信大捷安 资源服务寻址
         call("XDJARequestRsbForResourceAddress", [data], successCallback, errorCallback);
      },
      XDJARequestRsbForResourceAddressApiCall: function (data, successCallback, errorCallback) {//信大捷安 资源服务寻址接口对接
         call("XDJARequestRsbForResourceAddressApiCall", [data], successCallback, errorCallback);
      },
      koalCaLogout: function (data, successCallback, errorCallback) {//格尔认证退出登录
         call("koalCaLogout", [data], successCallback, errorCallback);
      },
   };


   function call(callee, args, callback, errorCallback) {
      callback = callback || onSucceed;
      errorCallback = errorCallback || onError;
      exec(callback, errorCallback, "xsfCommon", callee, args);
   }


   module.exports = xsfCommon;
});

