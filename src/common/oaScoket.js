class scoket {
  ws = null
  userid = ""
  ponReceivedTodo = null
  ponScanCodeAfter = null
  setIntervalWesocketPush = null

  static getInstance(vueObj, gofunction, params) {
    if (!scoket.instance) {
      scoket.instance = new scoket();
      //打开chatScoket连接
      scoket.instance.open(() => {
        scoket.instance.sendPing();
        if (gofunction && params) {
          scoket.instance[gofunction](params);
        }
      });
    }
    return scoket.instance;
  }

  static close(fun) {
    if (!scoket.instance) {
      return;
    }
    if (!scoket.instance.ws) {
      return;
    }
    clearInterval(scoket.instance.setIntervalWesocketPush);
    if (scoket.instance.ws.readyState == 1) {
      scoket.instance.ws.close();
    }
    scoket.instance = null;
    if (fun) {
      fun()
    }
  }
  //只要调用一次，建立webscoket链接
  open(fun) {
    let wsUrl = dsf.url.getRootPath();
    let user_id = dsf.util.loadSessionStore("user").user_id || dsf.util.loadSessionStore("user").userId;
    if (wsUrl.startsWith("http:")) {
      wsUrl = wsUrl.replace("http", "ws") + "servletWebsocket/" + user_id;
    } else if (wsUrl.startsWith("https:")) {
      wsUrl = wsUrl.replace("https", "wss") + "servletWebsocket/" + user_id;
    }
    this.ws = new WebSocket(wsUrl);
    this.ws.onopen = function () {
      if (fun) {
        fun()
      }
    };
    this.ws.onmessage = function (data) {
      if (data.data == "pong") {
        return
      }
      console.log(data);
      let receviedObj = JSON.parse(data.data);
      let scoketInstance = scoket.getInstance();
      if (receviedObj.badgeType.indexOf("inbox") > -1 && receviedObj.userIds.filter(item => item == scoketInstance.userid).length > 0) {
        if (scoketInstance.ponReceivedTodo != null)
          scoketInstance.ponReceivedTodo({
            "badgeType": receviedObj.badgeType,
            "refresh": true
          });
      } else if(receviedObj.badgeType == "qrCodeMessag" && receviedObj.userIds == scoketInstance.userid) {
        if (scoketInstance.ponScanCodeAfter != null)
          scoketInstance.ponScanCodeAfter({
            "data": receviedObj.data
          });
      } else if(receviedObj.badgeType == "sameScreenMessage" && receviedObj.userIds.includes(scoketInstance.userid)) {
        if (scoketInstance.ponmeettingSameScreen != null)
          scoketInstance.ponmeettingSameScreen({
            "data": receviedObj.data
          });
      }
    };
    this.ws.onerror = function (err) {
      console.log(err)
    }
    this.ws.onclose = function () {
      //断了重新连接
      scoket.getInstance()
    };
  }
  sendMessage(obj) {
    this.ws.send(JSON.stringify(obj));
  }
  //待办消息
  onReceivedTodo(userid, fun) {
    this.userid = userid
    this.ponReceivedTodo = fun
  }
  //扫码事件通知（江西数字人大）
  onScanCodeAfter(userid, func){
    this.userid = userid
    this.ponScanCodeAfter = func
  }
  //会议同屏消息推送
  onmeettingSameScreen(userid, func){
    this.userid = userid
    this.ponmeettingSameScreen = func
  }
  //清空全部监听事件
  clearFunction() {
    this.ponReceivedTodo = null;
    this.ponScanCodeAfter = null;
  }
  sendPing(time = 60000, ping = 'ping') { //发送心跳,防止socket超时断链
    clearInterval(this.setIntervalWesocketPush);
    if (this.ws && this.ws.readyState == 1) this.ws.send(ping);
    this.setIntervalWesocketPush = setInterval(() => {
      if (this.ws && this.ws.readyState == 1) {
        this.ws.send(ping);
      } else {
        clearInterval(this.setIntervalWesocketPush);
      }
    }, time)
  }
  getWsReadyState() { //获取socket链接状态 1:连接 2:连接中 3:断连
    return scoket.instance.ws.readyState;
  }
}
export default scoket;
