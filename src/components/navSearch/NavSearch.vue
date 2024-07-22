<template>
<div class="search-wrap">
    <router-link to="/commonList/200827143925vksrrlGEd1ZTyiwa7tm/200826154812jQpt0dBmNzZXaNnLhTR" class="search">
        <i class="iconfont iconsousuo i1"></i>
        <span>搜索文件</span>
    </router-link>
</div>
</template>

<script>
export default {
    name: "NavSearch",
    data() {
        return {
            keyWords: "",
        };
    },
    methods: {
        emptyEvent() {
            // 空事件
        },
        usericonEvent() {
            // 点击头像事件
        },
        qrcodeEvent() {
            // 扫码点击事件
            let that = this;
            dsf.dd.scan(
                function (data) {
                    //--调用成功;
                    that.dsf.layer.toast(JSON.stringify(data));
                },
                function (e) {
                    alert(JSON.stringify(e));
                }
            );
        }
    }
};
</script>

<style lang="scss">
// @import "../../assets/font/font.css";

@import "../../assets/styles/themes.scss";

@import "../../assets/styles/mixin.scss";

// 附件-悬浮按钮
.ds-nav-search {
    background-color: #fff;
    height: 44px;
    // padding: 8px 56px;
    padding: 0.16rem 0.28rem 0.16rem 1.12rem;
    box-sizing: border-box;
    position: relative;

    * {
        box-sizing: border-box;
    }

    .__search- {
        &usericon {
            width: 28px;
            height: 28px;
            position: absolute;
            top: 8px;
            left: 14px;
        }

        &qrbt {
            width: 44px;
            height: 44px;
            font-size: 24px;
            color: #000;
            line-height: 44px;
            text-align: center;
            font-weight: bold;
            position: absolute;
            top: 0;
            right: 8px;
        }

        &box {
            display: block;
            width: 100%;
            height: 28px;
            background-color: #ecedee;
            padding-right: 22px;
            border-radius: 6px;
            @include font_6();
            line-height: 28px;
            color: #999;
            overflow: hidden;
            position: relative;

            .iconsousuo {
                margin: 0 5px 0 10px;
            }

            .iconyuyin {
                width: 30px;
                height: 28px;
                line-height: 28px;
                text-align: center;
                position: absolute;
                top: 0;
                right: 0;
            }
        }
    }
}

.search-wrap {
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    background-color: #fff;
    z-index: 500;

    .search {
        height: 28px;
        width: 100%;
        display: block;
        background: #ecedee;
        border-radius: 7px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 5px;
        box-sizing: border-box;
        color: $fontColor_sub;
        @include font_6;

        .i1,
        .i2 {
            flex-basis: 20px;
        }

        span {
            display: block;
            flex-basis: calc(100% - 60px);
        }
    }
}
</style>
