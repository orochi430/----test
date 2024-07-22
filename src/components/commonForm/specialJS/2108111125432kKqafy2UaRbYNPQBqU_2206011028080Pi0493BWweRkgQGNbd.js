// 江苏烟草通知公告
const exportObj = {};
exportObj.initHandle = function (formData, formStruct, vueData) {
    formData.main['JSYC-NOTICE-0006'].value = formData.main['JSYC-NOTICE-0006'].value.replace(/http:\/\/jsyc.js.tobacco.com.cn:8091/g,'').replace(/\/JSYC\/oanfs\/word/g, '/JSYC')
  vueData.$nextTick(() => {
    setTimeout(() => {
        let detailEl = vueData.$el.querySelector('.formBox')
        let pEls = vueData.$el.querySelectorAll('.htmlBox p')
        let pOriginFontSize = []
        for (let i = 0; i < pEls.length; i++) {
        pOriginFontSize[i] = pEls[i].style.fontSize || '16px'
        }
        console.log(pOriginFontSize)
        let store = {
        scale: 1
        };
        if(detailEl) {
            detailEl.addEventListener('touchstart', function (event) {
                let touches = event.touches;
                let events = touches[0];
                let events2 = touches[1];
                
                // 第一个触摸点的坐标
                store.pageX = events.pageX;
                store.pageY = events.pageY;

                store.moveable = true;

                if (events2) {
                    event.preventDefault();
                    store.pageX2 = events2.pageX;
                    store.pageY2 = events2.pageY;
                }

                store.originScale = store.scale || 1;
            });
            detailEl.addEventListener('touchmove', function (event) {
                if (!store.moveable) {
                    return;
                }

                let touches = event.touches;
                let events = touches[0];
                let events2 = touches[1];
                // 双指移动
                if (events2) {
                    event.preventDefault();
                    // 第2个指头坐标在touchmove时候获取
                    if (!store.pageX2) {
                        store.pageX2 = events2.pageX;
                    }
                    if (!store.pageY2) {
                        store.pageY2 = events2.pageY;
                    }

                    // 获取坐标之间的举例
                    let getDistance = function (start, stop) {
                        return Math.hypot(stop.x - start.x, stop.y - start.y);
                    };
                    // 双指缩放比例计算
                    let zoom = getDistance({
                        x: events.pageX,
                        y: events.pageY
                    }, {
                        x: events2.pageX,
                        y: events2.pageY
                    }) /
                    getDistance({
                        x: store.pageX,
                        y: store.pageY
                    }, {
                        x: store.pageX2,
                        y: store.pageY2
                    });
                    // 应用在元素上的缩放比例
                    let newScale = store.originScale * zoom;
                    // 最大缩放比例限制
                    if (newScale > 2) {
                        newScale = 2;
                    }
                    // 记住使用的缩放值
                    store.scale = newScale;
                    // 字体缩放
                    console.log()
                    for (let i = 0; i < pEls.length; i++) {
                    pEls[i].style.fontSize = pOriginFontSize[i].slice(0, 2) * newScale + 'px'
                    }
                    // vueData.fontSize = 0.32 * newScale
                }
            });

            detailEl.addEventListener('touchend', function () {
                store.moveable = false;

                delete store.pageX2;
                delete store.pageY2;
            });
            detailEl.addEventListener('touchcancel', function () {
                store.moveable = false;

                delete store.pageX2;
                delete store.pageY2;
            });
        }
    }, 1000)
  })
  
}
export default exportObj;
