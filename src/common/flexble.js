!function (window) {

  /* 设计图文档宽度 */
  var docWidth = 750;

  var doc = window.document,
    docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  var initialClientWidth = ''
  var recalc = (function refreshRem() {
    var clientWidth = docEl.getBoundingClientRect().width;
    // 有些设备没有orientationchange屏幕旋转事件，是会触发resize事件，但是键盘弹起也会触发resize，所以增加判断屏幕宽度变化才执行
    if (!initialClientWidth || initialClientWidth != clientWidth) {
      initialClientWidth = clientWidth
      let multiple = dsf.util.loadLocalStore('multiple') || dsf.util.loadLocalStore('fontSizeMultiple') || 5
      /* 8.55：小于320px不再缩小，11.2：大于420px不再放大，20：大于750 */
      const width = document.documentElement.clientWidth;
      const height = document.documentElement.clientHeight;
      if (window.location.href.indexOf('meetingPad') > -1 ) {
        docEl.style.fontSize = initialClientWidth / 51.2 + 'px';
      } else if (window.location.href.indexOf('shGovSM') > -1 || window.location.href.indexOf('fgwPadSM') > -1) {
        var rem = docEl.clientWidth / 128 * 5
        docEl.style.fontSize = rem + 'px'
      } else if(height<width && ( window.location.href.indexOf('deptNews') > -1 || window.location.href.indexOf('fgwStaging') > -1 || window.location.href.indexOf('fgwPad') > -1)){ //这里是发改委涉密PAD的特殊逻辑， 如果是横屏的话就还是用PAD的方式处理  竖屏的话就用
        var rem = docEl.clientWidth / 128 * 5
        docEl.style.fontSize = rem + 'px'
      } else {
        docEl.style.fontSize = Math.max(Math.min(20 * (initialClientWidth / docWidth), 11.2), 8.55) * multiple + 'px';
      }
    }

    return refreshRem;
  })();

  try {
    /* 添加倍屏标识，安卓为1 */
    docEl.setAttribute('data-dpr', window.navigator.appVersion.match(/iphone/gi) ? window.devicePixelRatio : 1);
    if (window.navigator.userAgent.indexOf("like Mac OS X") > 1) {
      /* 添加IOS标识 */
      doc.documentElement.classList.add('ios');
      /* IOS8以上给html添加hairline样式，以便特殊处理 */
      var appTemp = navigator.appVersion ? navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/) : [];
      if (appTemp.length > 1 && parseInt(appTemp[1], 10) >= 8)
        doc.documentElement.classList.add('hairline');
    }

    if (!doc.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
  } catch (e) {
    console.log(e)
  }
}(window);
