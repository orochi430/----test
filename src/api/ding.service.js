/** 移动平台封装钉钉方法 */
let DingDing = {
  /**
   * 判断当前是否钉钉环境
   * @returns true是、false否
   */
  isDD: () => {
    return /DingTalk/.test(window.navigator.userAgent);
  },
  // 设置页面标题
  setTitle: (title) => {
    return new Promise((resolve, reject) => {
      dd.biz.navigation.setTitle({
        title: title,// 控制标题文本，空字符串表示显示默认文本
        onSuccess: result => resolve(result),
        onFail: err => reject(err),
      });
    });
  },
  // 设置右侧单个按钮
  setRight: (text, control, isShow) => {
    return new Promise((resolve, reject) => {
      dd.biz.navigation.setRight({
        show: isShow || true,// 控制按钮显示， true 显示， false 隐藏， 默认true
        control: control || true,// 是否控制点击事件，true 控制，false 不控制， 默认false
        text: text,// 控制显示文本，空字符串表示显示默认文本
        onSuccess : result => resolve(result),
        onFail: err => reject(err),
      });
    });
  },
  /**
   * 设置导航栏右侧多个按钮(针对不同的点击处理不同的内容)
   * @param {*} items [
          {
            "id":"1",// 字符串
            "iconId":"file",// 字符串，图标命名
            "text":"帮助",
          },
        ]
   * @param {*} backgroundColor 
   * @param {*} textColor 
   * @returns 
   */
  setMenu: (items, backgroundColor, textColor) => {
    return new Promise((resolve, reject) => {
      dd.biz.navigation.setMenu({
        backgroundColor: backgroundColor || "#ADD8E6",
        textColor: textColor || "#ADD8E611",
        items: items,
        onSuccess: res => resolve(res),
        onFail: err => reject(err),
      });
    });
  },
  /**
   * 扫码
   * @param {*} type type 为 all、qrCode二维码、barCode条形码，默认是all。
   * @returns  { 'text': String}
   */
  scan: (type) => {
    return new Promise((resolve, reject) => {
      dd.biz.util.scan({
        type: type || "all",
        onSuccess: res => resolve(res.text),
        onFail: err => reject(err),
      });
    });
  },
  /**
   * 二维码扫码
   * @returns 
   */
  qrCode: () => {
    return new Promise((resolve, reject) => {
      dd.biz.util.scan({
        type: "qrCode",
        onSuccess: res => resolve(res.text),
        onFail: err => reject(err),
      });
    });
  },
  /**
   * 条形码扫码
   * @returns 
   */
  barCode: () => {
    return new Promise((resolve, reject) => {
      dd.biz.util.scan({
        type: "barCode",
        onSuccess: res => resolve(res.text),
        onFail: err => reject(err),
      });
    });
  },
  /**
   * 拨打电话
   * @param {*} phoneNum 
   */
  phone(phoneNum) {
    dd.biz.telephone.showCallMenu({
      phoneNumber: phoneNum, // 期望拨打的电话号码
      code: '+86', // 国家代号，中国是+86
      showDingCall: true, // 是否显示钉钉电话
      onSuccess: function () { },
      onFail: function () { },
    });
  },
  /**
   * 定位
   * @returns 
   */
  geolocation() {
    return new Promise((resolve, reject) => {
      dd.device.geolocation.get({
        targetAccuracy: 200,
        coordinate: 1,
        withReGeocode: true,
        useCache: false, // 默认是true，如果需要频繁获取地理位置，请设置false
        onSuccess: function(result) {
          resolve(result);
        },
        onFail: err => reject(err),
      });
    });
  },
  /**
   * 钉钉免登--单点登录
   * @param {*} agentId
   * @returns
   */
  ddLogin(agentId) {
    return new Promise((resolve, reject) => {
      if (!agentId) {
        sinoware.device.notification.alert("缺失agentId");
        reject("缺失agentId");
      }
      sinoware.ready({
        agentId: agentId,
        jsApiList: ['runtime.info', 'biz.contact.choose', 'runtime.getPasstoken', 'device.nfc.nfcRead',
          'device.notification.confirm', 'device.notification.alert', 'device.geolocation.get', 'device.nfc.nfcRead',
          'device.notification.prompt', 'biz.ding.post', 'biz.telephone.call', 'biz.telephone.showCallMenu',
          'biz.util.openLink', 'biz.navigation', 'biz.util.uploadImage', 'device.launcher.checkInstalledApps',
          'device.launcher.launchApp', 'biz.map.view', 'biz.map.locate', 'biz.util.ut', 'device.base.getUUID',
          'device.geolocation.start', 'device.geolocation.stop', 'device.audio.onRecordEnd', 'device.audio.startRecord',
          'device.audio.stopRecord', 'device.audio.download', 'device.audio.play', 'device.audio.pause',
          'device.audio.resume', 'device.audio.stop', 'device.audio.onPlayEnd',
        ]
      },
      function () {
        // 获取免登授权码
        sinoware.runtime.permission.requestAuthCode({
          onSuccess: function (token) {
            // 获取人员信息
            sinoware.runtime.getAccountInfo({
              onSuccess: function (data) {
                resolve(data);
              },
              onFail: err => {
                sinoware.device.notification.alert('getAccountInfo.fail: ' + JSON.stringify(err));
                reject(err);
              }
            });
          },
          onFail: err => {
            sinoware.device.notification.alert('requestAuthCode.fail:' + JSON.stringify(err));
            reject(err);
          }
        });
      });
    });
  }
}

export default DingDing;