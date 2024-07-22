<template>
<div style="width: 100%" v-click-outside="handleBlur">
    <div class="ds-button-and-opinion">
        <div class="more-button" @click="showMore = true" v-if="allButtons.length > 1">
            <Icon :size="iconSize" name="apps-o" v-if="!dsf.config.commonForm.hideMoreBtnIcon" />
            <span class="btn-text">更多</span>
        </div>
        <controlEditOpinion :formMeta="formMeta" :metaData="metaData" :showOpinionAndBtn="true" v-model="value" class="flex1" ref="controlEditOpinion" :style="{'max-width': allButtons.length > 1 ? 'calc(100% - 2.1rem)' : 'calc(100% - 1.4rem)'}"></controlEditOpinion>
        <div v-if="allButtons.length > 1" class="ds-button">
            <debounce-click>
                <van-button size="middle" :icon="allButtons[0].icon" :type="allButtons[0].type ||'primary'" @click="onCommonClick(allButtons[0])" :disabled="allButtons[0].disabled" class="flex1">{{ allButtons[0].name }}</van-button>
            </debounce-click>
            <!-- <van-popover v-model="showPopover" trigger="click" placement="top-end">
                <ul class="popover-list">
                    <li v-for="(el,i) in actions" :key="i" @click.stop="onCommonClick(el)">{{el.name}}</li>
                </ul>
                <template #reference>
                    <div class="icon-item">
                        <van-icon name="more-o" size="35" />
                    </div>
                </template>
            </van-popover> -->
        </div>
        <div v-else-if="allButtons.length == 1">
            <div class="flex1 ds-button">
                <debounce-click v-for="(item, index) in allButtons" :key="item.action">
                    <van-button size="middle" class="flex1" :icon="item.icon" :type="item.type ||'primary'" @click="onCommonClick(item)" :disabled="item.disabled">{{ item.name }}</van-button>
                </debounce-click>
            </div>
        </div>
    </div>
    <van-action-sheet :value="isShowSub" :actions="subButtons" @select="onSubButton" @click-overlay="isShowSub = false" get-container="#app" />
    <van-popup v-model="isShowIntroductionImage" position="bottom" get-container="#app" overlay-class="introductionImageOverlay" round class="introductionImagePopup">
        <img :src="introductionImage[introductionImageIndex]" alt="" @click="clickintroductionImage">
        <div class="coverBtn" @click="updateGuidanceModule">已知晓</div>
    </van-popup>
    <van-popup :get-container="getContainer" :lock-scroll="true" v-model="showMore" round close-icon-position="top-right" position="bottom">
        <div class="popup-title">
            <Icon slot="icon" size="0.4rem" class="iconfont iconxialajiantou" color="#000000" @click="show = false" />更多
        </div>
        <div class="popup-btn">
            <Grid :column-num="4" clickable :border="false">
                <GridItem v-for="el in actions" :key="el.action" @click="showMore = false;onCommonClick(el);" v-if="!(el.action=='liuChengShiPin'&&!dsf.config.ddSetting.isDing)">
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
};
// 自定义指令，用于处理点击外部区域的事件
const clickOutside = {
    bind(el, binding) {
        el.clickOutsideEvent = function (event) {
            if (!(el === event.target || el.contains(event.target))) {
                // 如果点击事件发生在元素的外部，则触发指令绑定的方法,将点击的event数据传过去
                binding.value(event);
            }
        };
        document.addEventListener("click", el.clickOutsideEvent);
    },
    unbind(el) {
        document.removeEventListener("click", el.clickOutsideEvent);
    },
};
import DebounceClick from "@/components/common/debounceClick.jsx";
import controlEditOpinion from "@/components/commonForm/controls/controlEditOpinion";
import {
    Icon,
    Popup,
    Grid,
    GridItem
} from 'vant';
export default {
    directives: {
        "click-outside": clickOutside,
    },
    name: '',
    components: {
        DebounceClick,
        controlEditOpinion,
        Icon,
        Popup,
        Grid,
        GridItem,
    },
    props: {
        formMeta: {
            type: Object,
            default: () => {
                return {};
            },
        },
        subFormIndex: {
            type: Number,
            default: null,
        },
        buttons: {
            type: Object,
            default: () => {},
        },
        size: {
            type: String,
            default: "normal",
        },
        metaData: {
            type: Object,
            default: () => {
                return {};
            },
        },
        isShowWriteOpintionBtn: {
            type: Boolean,
        },
        isShowQiXiangJuEditOpinion: {
            type: Boolean,
        },
    },
    data() {
        return {
            showPopover: false,
            value: {
                value: ""
            }, //意见输入
            isShowSub: false,
            subButtons: [],
            isShowIntroductionImage: false,
            introductionImage: [],
            introductionImageIndex: 0,
            newButton: null,
            showMore: false
        }
    },
    created() {},
    mounted() {
        if (this.isShowWriteOpintionBtn != undefined)
            this.checkIsShowWriteOpintionBtn(); // 如果是表单，检查是否存在单独的意见按钮
        this.showIntroductionImage();
    },
    methods: {
        onCommonClick: throttle(function (button) {
            if (button.action == "subBtnPopup") {
                // 弹出二级按钮
                this.showSubButtons(button);
            } else {
                this.comfirmDialog(button).then(() => {
                    this.$emit("getNowButton", button);
                    this.$emit("commonClick", button.action);
                });
            }
        }, 1000),
        comfirmDialog(button) {
            // 按钮参数弹窗 {"key":"isComfirm","value":"","name":"是否确认弹窗","remark" : "0为不弹窗，1为弹窗"},{"key":"comfirmText","value":"","name":"弹窗内容"}
            return new Promise((resolve, reject) => {
                if (
                    button.parameters &&
                    button.parameters.find(
                        (item) => item.key == "isComfirm" && item.value == 1
                    )
                ) {
                    dsf.layer.confirm({
                            message: button.parameters
                                .find((item) => item.key == "comfirmText")
                                .value.replace(/\\n/gm, "<br/>"),
                            confirmButtonText: "确认",
                        },
                        () => {
                            resolve();
                        }
                    );
                } else {
                    resolve();
                }
            });
        },
        showSubButtons(button) {
            // 弹出子级按钮层
            if (
                button.parameters &&
                button.parameters.find((item) => item.key == "subButtons")
            ) {
                // console.log(button.parameters.find(item => item.key == 'subButtons').value)
                this.subButtons = button.parameters
                    .find((item) => item.key == "subButtons")
                    .value.split(";")
                    .map((btn) => {
                        return JSON.parse(btn.replace(/'/g, '"'));
                    });
                this.isShowSub = true;
            }
        },
        onSubButton(button) {
            // 点击子级按钮触发按钮操作
            console.log(button);
            this.isShowSub = false;
            this.$emit("getNowButton", button);
            this.$emit("commonClick", button.action);
        },
        checkIsShowWriteOpintionBtn() {
            // 检查是否存在单独的意见按钮，不需要在发送界面显示意见
            let allBtns = this.allButtons;
            let notShowActions = ["BtnWriteOpinion", "qxjEditOpinion"]; // 单独的意见按钮action
            allBtns.forEach((btn) => {
                if (btn.action == "qxjEditOpinion") {
                    this.$emit("update:isShowQiXiangJuEditOpinion", true);
                }
                if (notShowActions.indexOf(btn.action) > -1) {
                    this.$emit("update:isShowWriteOpintionBtn", true);
                }
                if (btn.action == "subBtnPopup") {
                    // 如果是弹出二级按钮，二级按钮中存在notShowActions
                    let subButtons = btn.parameters.find(
                        (item) => item.key == "subButtons"
                    ).value;
                    if (subButtons) {
                        if (subButtons.indexOf("qxjEditOpinion") > -1) {
                            this.$emit("update:isShowQiXiangJuEditOpinion", true);
                        }
                        if (
                            notShowActions.filter((action) => subButtons.indexOf(action) > -1)
                            .length > 0
                        ) {
                            this.$emit("update:isShowWriteOpintionBtn", true);
                        }
                    }
                }
            });
        },
        showIntroductionImage() {
            this.introductionImageIndex = 0
            let buttons = this.allButtons;
            let newButton = buttons.find(item => Array.isArray(item.introductionImage) && item.introductionImage.length > 0)
            if (newButton) {
                this.newButton = newButton
                this.introductionImage = newButton.introductionImage.map(img => dsf.url.getServerUrl(img))
                this.isShowIntroductionImage = true
                if (this.introductionImage.length == 1) {
                    this.isShowCoverBtn = true
                }
            }
        },
        updateGuidanceModule() {
            this.isShowIntroductionImage = false
            dsf.http.post('/fn/updateGuidanceModule/saveUserInfo', {
                type: 1,
                objId: this.newButton.buttonId,
                objName: this.newButton.name
            }).then(res => {
                this.newButton.introductionImage = ''
                this.showIntroductionImage()
            })
        },
        clickintroductionImage() {
            if (this.introductionImageIndex == this.introductionImage.length - 1) {
                this.updateGuidanceModule()
            } else {
                this.introductionImageIndex += 1
            }
        },
        handleBlur(event) {
            // this.$refs.controlEditOpinion.toBlur()
            this.$refs.controlEditOpinion.inputRows = 1;
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
        getContainer() {
            return document.body;
        },
    },
    computed: {
        commonButtons() {
            let btns =
                this.buttons.commonButton || this.buttons.commonButtons ? [...(this.buttons.commonButton || this.buttons.commonButtons)] : [];
            let all = this.buttons.mainButtons;
            return btns;
        },
        mainButtons() {
            const btns = this.buttons.mainButtons ? [...this.buttons.mainButtons] : [];
            return btns;
        },
        allButtons() {
            return [...this.mainButtons, ...this.commonButtons]
        },
        actions() {
            let all = JSON.parse(JSON.stringify(this.allButtons));
            let btns = all.slice(1);
            return btns;
        },
        iconSize() {
            if (dsf.config.commonForm.btnStyle == 'iconTile') return '0.52rem'
            return this.size === 'small' ? '0.4rem' : '0.48rem';
        },
    },
    watch: {},
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.ds-button-and-opinion {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 10px 0 0 0;

    .flex1 {
        flex: 1;
    }

    .ds-button {
        // width: 95px;
        width: 60px;
        box-sizing: border-box;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        margin: 0 0 10px 5px;

        .van-button {
            height: 35px;
            font-size: var(--font_size_2);
        }

        .icon-item {
            width: 30px;
            height: 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            padding-top: 6px;
            color: var(--normal);

            .van-icon {
                margin-left: 8px;
            }
        }
    }

    .more-button {
        margin: 0 0.2rem 0.2rem 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        // width: 50px;
        align-items: center;
        color: var(--normal);
        cursor: pointer;
        font-size: var(--font_size_4);
        text-align: center;

        .van-icon-apps-o::before {
            height: 1.1em;
            line-height: 1.1em;
        }

        .btn-text {
            // margin-top: 4px;
            font-size: var(--font_size_4);
        }
    }
}

.controlTextBox {
    padding: 6px 10px !important;
    border-radius: 2px;
}

.popover-list {
    width: auto;
    height: auto;
    padding: 0 10px;
    box-sizing: border-box;

    li {
        width: auto;
        min-width: 60px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--font_size_2);
        color: #333333;
        border-bottom: 1px solid #E5E6E7;

        &:last-child {
            border: none;
        }
    }
}

::v-deep .van-field--min-height .van-field__control {
    min-height: 0;
}

.introductionImagePopup {
    max-height: 95vh;
    border-top: 3px solid #fff;

    .coverBtn {
        position: absolute;
        top: 30px;
        right: 10px;
        background-color: rgba(130, 130, 130, 0.3);
        border-radius: 50px;
        color: #fff;
        padding: 6px 10px;
    }
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
</style><style>
.introductionImageOverlay {
    backdrop-filter: blur(0.2rem)
}
</style>
