<template>
<div class="ds-button-swipe">
    <div class="ds-button-toolbox">
        <div class="dsf-button-list">
            <template v-if="showMore">
                <div class="dsf-button-item" @click="show = true" :style="{color: showNum == 1 ? 'var(--normal)' : '', background: '#CCCCCC'}">
                    <van-icon name="ellipsis" :size="iconSize" color="#ffffff" />
                    <span :class="dsf.config.commonList&&dsf.config.commonList.btnToggleShow?'':'btn-text'">更多</span>
                </div>
            </template>
            <debounce-click v-for="(item, index) in showData" :key="item.action">
                <div class="dsf-button-item" @click="onBtnClick(item)">
                    <Icon :size="iconSize" :class="['iconfont', item.icon]" color="#ffffff" />
                    <span :class="dsf.config.commonList&&dsf.config.commonList.btnToggleShow?'':'btn-text'">{{ item.name }}</span>
                </div>
            </debounce-click>
        </div>
    </div>
    <van-popup :get-container="getContainer" :lock-scroll="true" v-model="show" round close-icon-position="top-right" position="bottom">
        <div class="popup-title">
            <Icon slot="icon" size="0.4rem" class="iconfont iconxialajiantou" color="#000000" @click="show = false" />更多
        </div>
        <div class="popup-btn">
            <Grid :column-num="4" clickable :border="false">
                <GridItem v-for="el in moreData" :key="el.action" @click="show = false;onMoreClick(el);" v-if="!(el.action=='liuChengShiPin'&&!dsf.config.ddSetting.isDing)">
                    <Icon slot="icon" :size="iconSize" :class="['iconfont', el.icon]" :style="getIconColor(el)" />
                    <span slot="text" class="grid-text">{{ el.name }}</span>
                </GridItem>
            </Grid>
        </div>
    </van-popup>
</div>
</template>

<script>
// 节流
const throttle = (fn, wait) => {
    let canRun = true;
    return function () {
        if (!canRun) return;
        canRun = false;
        fn.apply(this, arguments);
        setTimeout(() => {
            canRun = true;
        }, wait);
    };
}
import DebounceClick from '@/components/common/debounceClick.jsx'
import DsfButtonGroup from './DsfButtonGroup';
import {
    Icon,
    Popup,
    Grid,
    GridItem
} from 'vant';
export default {
    data() {
        return {
            btnSty: false,
            moreBtn: [],
            isShowMoreBtn: false,
            isShowSub: false,
            subButtons: [],
            showNum: 3,
            show: false,
        }
    },
    components: {
        DebounceClick,
        DsfButtonGroup,
        Icon,
        Popup,
        Grid,
        GridItem
    },
    props: {
        // 按钮
        buttons: {
            type: Object,
            default: () => {},
        },
        more: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: 'normal',
        },
    },
    mounted() {
    },
    computed: {
        iconSize() {
            return this.size === 'small' ? '0.4rem' : '0.48rem';
        },
        commonButtons() {
            let btns = this.buttons.commonButton || this.buttons.commonButtons ? [...(this.buttons.commonButton || this.buttons
                .commonButtons)] : [];
            return btns
        },
        mainButtons() {
            let btnArr = this.buttons.mainButtons ? [...this.buttons.mainButtons] : []
            return btnArr
        },
        allButtons() {
            let allCommon = this.buttons.commonButton || this.buttons.commonButtons ? [...(this.buttons.commonButton || this.buttons
                .commonButtons)] : [];
            let allMain = this.buttons.mainButtons ? [...this.buttons.mainButtons] : [];
            allCommon = allCommon.map(item => {
                return {
                    ...item,
                    type: 'common'
                }
            })
            allMain = allMain.map(item => {
                return {
                    ...item,
                    type: 'main'
                }
            })
            let all = [...allMain, ...allCommon];
            return all
        },
        showData() {
            let btnlist = [];
            this.allButtons.slice(0, this.showNum - 1).forEach((element, indx) => {
                btnlist.push(element);
            });
            let all = this.allButtons;
            return this.showMore ? btnlist.reverse() : all.reverse();
        },
        moreData() {
            let btnlist = [];
            this.allButtons.slice(this.showNum - 1).forEach((element, indx) => {
                btnlist.push(element);
            });
            return btnlist;
        },
        showMore() {
            return this.more && this.allButtons.length > this.showNum;
        },
    },
    methods: {
        getContainer() {
            return document.body;
        },
        comfirmDialog(button) {
            // 按钮参数弹窗 {"key":"isComfirm","value":"","name":"是否确认弹窗","remark" : "0为不弹窗，1为弹窗"},{"key":"comfirmText","value":"","name":"弹窗内容"}
            return new Promise((resolve, reject) => {
                if (button.parameters && button.parameters.find(item => item.key == 'isComfirm' && item.value == 1)) {
                    dsf.layer.confirm({
                        message: button.parameters.find(item => item.key == 'comfirmText').value.replace(/\\n/gm, "<br/>"),
                        confirmButtonText: '确认'
                    }, () => {
                        resolve()
                    }, )
                } else {
                    resolve()
                }
            })
        },
        getIconColor(button) {
            let arr = ['已关注', '已置顶', '取消关注', '取消置顶', '取消收藏', '已收藏', '取消'];
            if (arr.indexOf(button.name) >= 0 || button.name.indexOf("已") > -1) {
                return {
                    color: "#F1B902"
                }
            }
            if (button.parameters && button.parameters.find(item => item.key == 'color')) {
                return {
                    color: button.parameters.find(item => item.key == 'color').value
                }
            }
        },
        onBtnClick: throttle(function (button) {
            console.log(button)
            this.comfirmDialog(button).then(() => {
                if (button.type == 'common') {
                    this.$emit('commonClick', button.action);
                } else {
                    this.$emit('mainClick', button.action);
                }

            })
        }, 1000),
        onMoreClick(el) {
            setTimeout(() => {
                this.onBtnClick(el)
            }, 200)
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/themes.scss';
@import '../../assets/styles/mixin.scss';

.van-button--success {
    background: #07c160;
    border: 1px solid #07c160;
    color: #ffffff;
}

.van-button--warning {
    background: #ff976a;
    border: 1px solid #ff976a;
    color: #ffffff;
}

.ds-button-swipe {
    display: flex;
}

.ds-button-right {
    width: 50%;
    box-sizing: border-box;
    padding-left: 5px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    button+button {
        margin-left: 10px;
    }

    button {
        // @include font-theme('normal');

        &.van-button--primary,
        &.van-button--info {
            color: #ffffff;
        }

        &.van-button--empty {
            background: #ffffff;
            box-sizing: border-box;
            border: 1px solid #ebebee;
        }

        &.van-button--small {
            @include font_6;
            min-width: 50px;
            max-width: 120px;
        }

        &.van-button--normal {
            @include font_5;
        }

        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    &.ds-button-many {
        button {
            border-radius: 3.5px;

            &.van-button--small {
                @include font_6;
                // width: 50%;
            }

            &.van-button--normal {
                // width: 50%;
            }
        }
    }

    &.ds-button-single {
        button {
            border-radius: 3.5px;

            &.van-button--normal {
                width: 100%;
            }

            &.van-button--small {
                @include font_6;
                // width: 50%;
            }
        }
    }

    &.full {
        width: 100%;
    }
}

.ds-button-left {
    height: 40px;
    width: 50%;
    padding-right: 0px;
    box-sizing: border-box;
}

.ds-button-toolbox {
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;

    .single {
        width: 100%;
    }

    .singleBtn {
        height: 0.8rem;
    }

    .dsf-button-list {
        display: flex;
        width: 100%;
        flex: 1;

        .dsf-button-item {
            width: 80px;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .btn-text {
                display: block;
                text-align: center;
                margin-top: 4px;
                font-size: var(--font_size_1);
                color: #ffffff;
                font-weight: 400;
                width: 40px;
                table-layout: fixed;
                word-wrap: break-all;
                word-break: normal;
                overflow: hidden;
            }

            &:nth-last-child(1) {
                background: #0086D9;
            }

            &:nth-last-child(2) {
                background: #F7B500;
            }

            &:nth-last-child(3) {
                background: #CCCCCC;
            }
        }
    }
}

.ds-button-center {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button+button {
        margin-left: 10px;
    }
}

.flex1 {
    flex: 1;
}

.grid-text {
    margin-top: 5px;
    @include font_5;
}

.popup-title {
    text-align: center;
    font-size: var(--font_size_2);
    padding: 15px;
    border-bottom: 5px solid #F1F2F4;
    color: #000000;

    .iconfont {
        position: absolute;
        left: 15px;
    }
}

.popup-btn {
    padding-bottom: 16px;
}
</style>
