const socketIO = {};
let socket = {};
// 必须先调用link函数，打通连接
socketIO.link = function(path, params) {
  socket = io(path, params);
  console.log("socket:",socket);
  socketIO.connect();
};
socketIO.connect = function(fun) {
  socket.on("connect", () => {
    console.log("socket连接成功");
    if (fun) fun();
  });
};
socketIO.disconnect = function(fun) {
  socket.on("disconnect", () => {
    console.log("socket断开连接");
    if (fun) fun();
  });
};
socketIO.emit = function(event, data, fun) {
  console.log("触发" + event);
  socket.emit(event, data);
  if (fun) fun();
};
// 回调函数放到最后一个参数
socketIO.send = function(...data) {
  if (typeof arguments[arguments.length - 1] == "function") {
    data.pop()()
    socket.send(data);
    console.log("发送" + data);
    // arguments[arguments.length - 1]();
  }else {
    socket.send(data);
    console.log("发送" + data);
  }
};
// 返回一个处于pedding状态的promise，直到监听的event被触发
socketIO.on = function(event, fun) {
  console.log("监听" + event);
  return new Promise(function(resolve, reject) {
    socket.on(event, res => {
      resolve(res);
    });
  });
};
window.socketIO = socketIO;
