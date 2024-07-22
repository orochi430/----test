/*
统一管理cordova回退事件
2022年8月4日@ly
*/
let listenerType = ""
let elementDiv = document.createElement("div")
elementDiv.className = "alertDiv";
elementDiv.innerHTML = "再按一次退出"
//addEventListener    backbutton
function backbutton() {
  let url = location.href.split("#")[1].toLowerCase()
  let homePage = dsf.util.loadSessionStore('homePage') || dsf.config.login.defaultUrl || '/index'
  if (url == '/') {
    return
  }
  // console.log(vueObj)
  //避免重复监听
  if (url == '/testlogin' || (url.indexOf(homePage.toLowerCase()) > -1 && window.addressIndex == 0)) {
    if (window.exitAppTicker == 0) {
      // console.log('分支1，exitAppTicker的值为：',exitAppTicker);
      window.exitAppTicker++
      document.body.appendChild(elementDiv)
      setTimeout(() => {
        window.exitAppTicker = 0
        document.body.removeChild(elementDiv)
      }, 2000)
    } else {
      document.body.removeChild(elementDiv);
      /**防止第一次启动APP时弹出防误触页面 退出时需要重置一个值*/
      if ($sharedPreferences) {
        $sharedPreferences.save('{"Tnasucceed":false}', function () { }, function (e) { });
      }
      navigator.app.exitApp();
    }
  } else if (window.xsfWindow && vueObj.$route.query.webViewBack) {//蒙正通左滑关闭webview
    if (history.state.popIndex) {
      history.back(-1);
    } else {
      xsfWindow.closeWebView('', function success(result) {
        console.log("successcloseWebView", result);
      }, function error(err) {
        console.log("errorcloseWebView", err);
      })
    }
  } else {
    let oldUrl = location.href
    // console.log('调用了history back');
    history.back(-1);


    //防止IM加载之后导致无法返回的问题
    // if (dsf.config.IMSetting?.OATOIM?.length) {
    //   setTimeout(() => {
    //     let newUrl = location.href
    //     // console.log(oldUrl, newUrl)
    //     if (oldUrl == newUrl) {
    //       history.back(-1);
    //     }
    //   }, 100);
    // }

  }
}
let addEventBackbutton = function (type) {
  try {
    if (type == listenerType) {
      return
    }
    removeAddEventBackbutton()
    listenerType = type
    document.addEventListener('backbutton', backbutton, false)
    // console.log('addEventBackbutton');
  } catch (err) {
    console.error('调用了history back fail', err);
  }
}

function backbuttonNoExist() {
  // console.log('调用了history back');
  history.back(-1);
}

let addEventBackbuttonNoExist = function (type) {
  try {
    if (type == listenerType) {
      return
    }
    removeAddEventBackbutton()
    listenerType = type
    document.addEventListener('backbutton', backbuttonNoExist, false)
    // console.log('addEventBackbuttonNoExist');
  } catch (err) {
    console.error('调用了history back fail', err);
  }
}

let removeAddEventBackbutton = function () {
  try {
    if (listenerType == "backbutton") {
      // console.log('removebackbutton');
      document.removeEventListener("backbutton", backbutton, false)
    }
    else if (listenerType == "backbuttonNoExist") {
      // console.log('removebackbuttonNoExist');
      document.removeEventListener("backbutton", backbuttonNoExist, false)
    }
  } catch (err) {
    console.error('调用了removeEventListener fail', err);
  }
}

export default {
  addEventBackbutton,
  addEventBackbuttonNoExist
};
