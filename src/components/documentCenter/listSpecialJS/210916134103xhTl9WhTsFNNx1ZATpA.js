
// 江苏烟草统一待阅
const exportObj = {};
exportObj.initHandle = function (vueData) {
  vueData.readStatusKey = 'UNIFY-DATA-0020'
  vueData.haveReadVal = 1
}
exportObj.link = async function (listid, moduleId, pk, vueData, itemValue) {
  await dsf.http.post('ctrl/unifyOfficeInfo/requestChangeRead',{
    dataId: itemValue['A0001'],
    type: 'todoreadunify',
    appCode: itemValue['UNIFY-DATA-0001']
  }).then(res => {
    itemValue['UNIFY-DATA-0020'] = 1
  })
  console.log(4,itemValue)
  if (itemValue['UNIFY-DATA-0021']) {
    dsf.middleground.openUrl({
      url: itemValue['UNIFY-DATA-0021'],
      title: itemValue['UNIFY-DATA-0004'],
      getCodeParams: { appCode: itemValue['UNIFY-DATA-0001'] }
    })
    // if(window.wx) {
    //   wx.invoke('openUrl', {
    //     "type": 0, //0或不填表示使用内部浏览器新窗口打开，1表示用系统浏览器打开
    //     "url": itemValue['UNIFY-DATA-0021'] //url地址
    //   }, function(res){
    //       if (res.err_msg != "openUrl:ok") {
    //           //错误处理
    //       }
    //   });
    // } else if (window.dd) {
    //   dd.openLink({
    //     url: itemValue['UNIFY-DATA-0021']
    //   }).then(res => {
    //       console.log(res)
    //   }).catch(err => { })
    // } else {
    //   vueData.$router.push({
    //     path: "/iframe",
    //     query: {
    //         url: itemValue['UNIFY-DATA-0021'],
    //         title: itemValue['UNIFY-DATA-0004']
    //     }
    //   })
    // }
  }else {
    dsf.layer.toast('无跳转地址')
  }
}
export default exportObj;
