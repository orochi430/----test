import dd from "dingtalk-jsapi";
import dsf from "../../../common";

// 江苏烟草已收便笺
const exportObj = {};
exportObj.initHandle = function (vueData) {
  vueData.readStatusKey = 'un.Unify-Note-User-0003'
  vueData.haveReadVal = 1
}
exportObj.link = async function (listid, moduleId, pk, vueData, itemValue) {
  await dsf.http.post('ctrl/unifyOfficeInfo/requestChangeRead',{
    dataId: itemValue['n.A0001'],
    type: 'unifynote',
    appCode: itemValue['n.Unify-Note-0012']
  }).then(res => {
    itemValue['un.Unify-Note-User-0003'] = 1
  })
  console.log(3,itemValue)
  if(itemValue['n.Unify-Note-0003']) {
    if(window.wx) {
      wx.invoke('openUrl', {
        "type": 0, //0或不填表示使用内部浏览器新窗口打开，1表示用系统浏览器打开
        "url": itemValue['n.Unify-Note-0003'] //url地址
      }, function(res){
          if (res.err_msg != "openUrl:ok") {
              //错误处理
          }
      });
    } else if (window.dd) {
      dd.openLink({
        url: itemValue['n.Unify-Note-0003']
      }).then(res => {
          console.log(res)
      }).catch(err => { })
    } else {
      vueData.$router.push({
        path: "/iframe",
        query: {
          url: itemValue['n.Unify-Note-0003'],
          // title: itemValue['S-UNIFY-TASK-0005']
        }
      })
    }
  }else {
    dsf.layer.toast('无跳转地址')
  }
}
export default exportObj;
