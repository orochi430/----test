/*
郑州市委   对接移动办公  处理代理请求   
2024年2月3日14:39:21 
@luy
*/
export let zzsw_http = (path, params, type = "POST") => {
  console.log("path", path, params);
  return new Promise(function (resolve, reject) {
    c2.system.request({
      requestMethod: type,//请求方式，大写
      url: "",//请求的url
      bodyParams: {},//body参数
      headers: {},//头部信息
      onSuccess: function (result) {
        console.log(result)
        /*只有成功返回，才会回调此方法返回json数据给前端*/
        // result = {
        //   code: 200,
        //   headers: {},
        //   body: "",//后台返回的response数据
        // }
        resolve(result)
      },
      onFail: function (err) {
        /*异常的错误*/
        // {
        //   code: code,
        //     headers: { },
        //   body: "",//后台返回的response数据
        // }
        console.log(err)
        reject(err)
      }
    })
  })
}
export let setItem = (name, value) => {
  window.c2.domainStorage.setItem({
    name,
    value,
    imTemp: true,
    onSuccess: function (info) {
      console.log("domainStorage.SetItem.Info", info);
    },
    onFail: function (err) {
      console.log("domainStorage.SetItem.error", err);
      dsf.layer.toast("储存信息失败")
    }
  })
}
export let getItem = (name) => {
  return new Promise(function (resolve, reject) {
    window.c2.domainStorage.getItem({
      name,
      onSuccess: function (info) {
        console.log("domainStorage.GetItem.Info", info);
        resolve(info)
      },
      onFail: function (err) {
        console.log("domainStorage.GetItem.error", err);
        reject()
        dsf.layer.toast("获取信息失败")
      }
    })
  })
}
export let removeItem = (name) => {
  window.c2.domainStorage.removeItem({
    name,
    onSuccess: function (info) {
      console.log("domainStorage.removeItem.Info", info);
    },
    onFail: function (err) {
      console.log("domainStorage.removeItem.error", err);
      dsf.layer.toast("删除信息失败")
    }
  })
}