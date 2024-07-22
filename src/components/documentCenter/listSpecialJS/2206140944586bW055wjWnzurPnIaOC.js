import dd from "dingtalk-jsapi";
import dsf from "../../../common";

// 皖政通统一待办
const exportObj = {};
exportObj.initHandle = function (vueData) {
  vueData.readStatusKey = 'S-UNIFY-TASK-00014'
  vueData.haveReadVal = 1
}
exportObj.link = async function (listid, moduleId, pk, vueData, itemValue) {
  if(itemValue['S-UNIFY-TASK-00028']) {
    await dsf.http.post('ctrl/unifyOfficeInfo/requestChangeRead',{
      dataId: itemValue['S-BASE-0001'],
      type: 'todounify',
      appCode: itemValue['S-UNIFY-TASK-0002.value']
    }).then(res => {
      itemValue['S-UNIFY-TASK-00014'] = 1
    })
    if(window.wx) {
      wx.invoke('openUrl', {
        "type": 0, //0或不填表示使用内部浏览器新窗口打开，1表示用系统浏览器打开
        "url": itemValue['S-UNIFY-TASK-00028'] //url地址
      }, function(res){
          if (res.err_msg != "openUrl:ok") {
              //错误处理
          }
      });
    } else if (window.dd) {
      dd.openLink({
        url: itemValue['S-UNIFY-TASK-00028']
      }).then(res => {
          console.log(res)
      }).catch(err => { })
    } else {
      vueData.$router.push({
        path: "/iframe",
        query: {
            url: itemValue['S-UNIFY-TASK-00028'],
            title: itemValue['S-UNIFY-TASK-0005']
        }
      })
    }
  }else {
    dsf.layer.toast('该文件建议在电脑端处理')
  }
}
export default exportObj;