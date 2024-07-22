// 8135演示 工资条列表
(function () {
  const exportObj = {};
  exportObj.init = function (vueData) {
    dsf.layer.confirm({
      title: "查询密码",
      overlayStyle: { backdropFilter: 'blur(50px)'},
      message: '<input rows="1" id="failReason" placeholder="请输入查询密码" type="password" class="van-field__control" style="border: 1px solid #ddd; padding: 6px"></input>',
    }, () => {
      document.getElementById('failReason').value = ''
      console.log(document.getElementById('failReason').value)
    }, () => {
      document.getElementById('failReason').value = ''
      vueData.$router.go(-1)
    })
  };
  window.spListJS = exportObj;
})();
