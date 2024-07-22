<template>
    <div class="headerimg" :class="{ 'vertical': vertical }">
        <div class="logoDiv">
            <img class="logo" src="static/images/project/fgwPad/gh.png" alt="" srcset="">
            <img class="logo" src="static/images/project/fgwPad/title.png" alt="" srcset="">
        </div>
        <div class="btns">
            <span class="reflush" @click="$emit('reflush')">刷新</span>
            <span class="reflush" v-if="showBack" @click="goBack">返回</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'headerimg',
    props: {
        showBack: {
            type: false,
            default: false
        }
    },
    components: {},
    data() {
        return {
            vertical: false
        };
    },
    computed: {},
    watch: {},
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        checkScreen() {
            const width = document.documentElement.clientWidth;
            const height = document.documentElement.clientHeight;
            if (width > height) {
                this.vertical = false
            } else {
                this.vertical = true
            }
        },
        initSize() {
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
                    if (window.location.href.indexOf('meetingPad') > -1) {
                        docEl.style.fontSize = initialClientWidth / 51.2 + 'px';
                    } else if (window.location.href.indexOf('shGovSM') > -1) {
                        var rem = docEl.clientWidth / 128 * 5
                        docEl.style.fontSize = rem + 'px'
                    } else if (height < width && (window.location.href.indexOf('deptNews') > -1 || window.location.href.indexOf('fgwStaging') > -1 || window.location.href.indexOf('fgwPad') > -1)) { //这里是发改委涉密PAD的特殊逻辑， 如果是横屏的话就还是用PAD的方式处理  竖屏的话就用
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
        }
    },
    created() { },
    mounted() {
        this.checkScreen()
        window.addEventListener("resize", () => {
            this.initSize()
            this.checkScreen()
            // window.location.reload()
        })
    },
    destroyed() { },
}
</script>

<style lang="scss" scoped>
.headerimg {
    height: 45px;
    width: 100%;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    justify-content: space-between;

    .back {
        display: flex;
        align-items: center;

        .van-icon {
            font-size: 20px;
            font-weight: bold;
            margin-top: 3px;
        }

        span {
            font-size: 20px;
            color: #1b5385;
            font-weight: bold;
        }
    }

    .logoDiv {
        display: flex;
        align-items: center;

        img {
            height: 45px;
            width: auto;
            margin-right: 10px;
            flex-shrink: 0;
        }
    }

    &.vertical {
        .logoDiv {
            img {
                height: 36px;
            }
        }
    }

    .btns {
        display: flex;
        align-items: center;
    }

    .reflush {
        width: 60px;
        height: 36px;
        border: 1px solid rgba(9, 162, 227, 1);
        box-shadow: inset 0px 0px 10px 4px #5893cd;
        text-align: center;
        line-height: 36px;
        font-size: 16px;
        background: #1b5385;
        color: #FFF;
        border-radius: 5px;
        margin-left: 10px;
    }

}
</style>


