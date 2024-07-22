export default {
  setStatusBgColor: statusBackgroundColor => {
    $dsfMobile.execute(
      "$SystemAction.backgroundColorByHexString",
      { statusBackgroundColor: statusBackgroundColor || "#FFFFFF" },
      function (s) {
        console.log(s)
      },
      function (e) {
        console.log(e.message)
      }
    )
  },
  // 设置导航栏字体颜色
  setStatusTextColorDark: isDark => {
    $dsfMobile.execute(
      "$SystemAction.setStatusTextColorDark",
      { isDark: isDark == undefined ? true : isDark },
      function (s) {
        console.log(s)
      },
      function (e) {
        console.log(e.message)
      }
    )
  },
  // 设置导航栏显示和隐藏（statusTop），字体颜色（textColorDark） true 字体黑色，false 字体白色
  setStatusBarVisibility: (visibility, textColorDark) => {
    $dsfMobile.execute(
      "$SystemAction.statusTop",
      {
        statusTop: visibility,
        textColorDark: textColorDark == undefined ? true : textColorDark
      },
      function (s) {
        console.log(s)
      },
      function (e) {
        console.log(e.message)
      }
    )
  },
  getStatusBarHeight: callback => {
    $dsfMobile.execute(
      "$SystemAction.getStatusBarHeight",
      function (success) {
        console.log(JSON.stringify(success))
        const devicePixelRatio = window.devicePixelRatio || 1
        let height = success.data.height / devicePixelRatio
        callback(height)
      },
      function (e) {
        alert(e.message)
      }
    )
  }
}
