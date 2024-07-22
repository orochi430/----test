import dsf from "../../../common";

// 皖政通综合查询
const exportObj = {};
exportObj.link = async function (listid, moduleId, pk, vueData, itemValue) {
  if(itemValue.mobileUrl) {
    if(window.wx) {
      wx.invoke('openUrl', {
        "type": 0, //0或不填表示使用内部浏览器新窗口打开，1表示用系统浏览器打开
        "url": itemValue.mobileUrl //url地址
      }, function(res){
          if (res.err_msg != "openUrl:ok") {
              //错误处理
          }
      });
    } else if (window.dd) {
      if (itemValue.mobileUrl.indexOf(`${location.host}${location.pathname}`) > -1) {
        vueData.$router.push(itemValue.mobileUrl.split('#')[1]);
      } else {
        dd.openLink({
          url: itemValue.mobileUrl
        }).then(res => {
            console.log(res)
        }).catch(err => { })
      }
    } else {
      if (itemValue.mobileUrl.indexOf(`${location.host}${location.pathname}`) > -1) {
        vueData.$router.push(itemValue.mobileUrl.split('#')[1]);
      } else {
        vueData.$router.push({
          path: "/iframe",
          query: {
              url: itemValue.mobileUrl,
              title: itemValue.bt
          }
        })
      }
    }
  }else {
    dsf.layer.toast('该文件建议在电脑端处理')
  }
}
export default exportObj;