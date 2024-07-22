<template>
<div class="rencent-item">
    <div class="fileIcon">
        <img src="../../assets/imgs/cloudDisk/file-doc.svg" alt="" />
    </div>
    <div class="fileBody">
        <div class="fileTitle">共性办公应用功能清单.xlsx</div>
        <div class="filePath">
            <span>群聊：</span>
            <label>梦创双杨 /</label>
            <label>团队文件 /</label>
            <label>测试 /</label>
            <label>一体化办公平台开发群</label>
        </div>
    </div>
    <div class="moreIcon" @click="showItem = true">
        <img src="../../assets/imgs/cloudDisk/more-file.svg" alt="">
    </div>
    <van-popup v-model="showItem" position="bottom" round get-container="#app">
        <div class="handle-contain">
            <div class="file-box">
                <div class="fileIcon">
                    <img src="../../assets/imgs/cloudDisk/file-doc.svg" alt="" />
                </div>
                <div class="fileBody">
                    <div class="fileTitle">共性办公应用功能清单.xlsx</div>
                    <div class="filePath">
                        <span>20.6KB · 17:09</span>
                    </div>
                </div>
                <div class="closeIcon" @click="showItem = false">
                    <img src="../../assets/imgs/cloudDisk/icon-close.png" alt="">
                </div>
            </div>
            <div class="handle-list">
                <div class="handle-box">
                    <div>
                        <img src="../../assets/imgs/cloudDisk/icon-forward.png" alt="">
                        <p>
                            <span>转发副本</span>
                            <img src="../../assets/imgs/cloudDisk/icon-detail.png" alt="">
                        </p>
                    </div>
                    <div>
                        <img src="../../assets/imgs/cloudDisk/icon-info.png" alt="">
                        <p>
                            <span>详细信息</span>
                            <img src="../../assets/imgs/cloudDisk/icon-detail.png" alt="">
                        </p>
                    </div>
                    <div>
                        <img src="../../assets/imgs/cloudDisk/icon-list.png" alt="">
                        <p>
                            <span>打开目录</span>
                            <img src="../../assets/imgs/cloudDisk/icon-detail.png" alt="">
                        </p>
                    </div>
                    <div>
                        <img src="../../assets/imgs/cloudDisk/icon-clear.png" alt="">
                        <p>
                            <span>清除记录</span>
                            <img src="../../assets/imgs/cloudDisk/icon-detail.png" alt="">
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </van-popup>
</div>
</template>

<script>
export default {
    name: 'rencentItem',
    components: {},
    props: {},
    data() {
        return {
            showItem: false,
        }
    },
    computed: {},
    watch: {},
    created() {

    },
    mounted() {

    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
.rencent-item {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 20px 0;

    .fileIcon {
        width: 38px;
        height: 38px;
        margin-right: 11px;

        img {
            width: 100%;
            height: 100%;

        }
    }

    .fileBody {
        flex: 1;
        margin-right: 11px;

        .fileTitle {
            width: 100%;
            font-size: 13px;
            color: #171A1D;
            letter-spacing: 0;
            font-weight: 400;
            margin-bottom: 5px;
            overflow: hidden; //溢出内容隐藏
            text-overflow: ellipsis; //文本溢出部分用省略号表示
            display: -webkit-box; //特别显示模式
            -webkit-line-clamp: 2; //行数
            line-clamp: 2;
            -webkit-box-orient: vertical; //盒子中内容竖直排列
        }

        .filePath {
            width: 100%;

            span {
                font-size: 11px;
                color: #A2A3A4;
                font-weight: 400;
            }

            label {
                font-size: 11px;
                color: #A2A3A4;
                font-weight: 400;

                &:last-child {
                    color: #317ED0;
                }
            }
        }
    }

    .moreIcon {
        width: 24px;
        height: 24px;
    }

}

.handle-contain {
    width: 100%;
    padding: 1px 14px 20px 14px;
    box-sizing: border-box;
    background: #F2F2F5;

    .file-box {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 28px 0;

        .fileIcon {
            width: 28px;
            height: 28px;
            margin-right: 15px;

            img {
                width: 100%;
                height: 100%;

            }
        }

        .fileBody {
            flex: 1;
            margin-right: 11px;

            .fileTitle {
                width: 100%;
                font-size: 13px;
                color: #171A1D;
                letter-spacing: 0;
                font-weight: 400;
                margin-bottom: 5px;
                overflow: hidden; //溢出内容隐藏
                text-overflow: ellipsis; //文本溢出部分用省略号表示
                display: -webkit-box; //特别显示模式
                -webkit-line-clamp: 2; //行数
                line-clamp: 2;
                -webkit-box-orient: vertical; //盒子中内容竖直排列
            }

            .filePath {
                width: 100%;

                span {
                    font-size: 11px;
                    color: #A2A3A4;
                    font-weight: 400;
                }

                label {
                    font-size: 11px;
                    color: #A2A3A4;
                    font-weight: 400;

                    &:last-child {
                        color: #317ED0;
                    }
                }
            }
        }

        .closeIcon {
            width: 19px;
            height: 19px;

            img {
                width: 100%;
                height: 100%;
            }
        }

    }

    .handle-list {
        width: 100%;

        .handle-box {
            width: 100%;
            height: auto;
            overflow: hidden;
            background: #FFFFFF;
            border-radius: 11px;
            padding: 0 10px 0 16px;
            box-sizing: border-box;

            &>div {
                width: 100%;
                height: 46px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                &>img {
                    width: 17px;
                    height: 17px;
                    margin-right: 15px;
                }

                p {
                    height: 100%;
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px solid rgba(224, 226, 228, 1);

                    span {
                        font-size: 13px;
                        color: #171A1D;
                        letter-spacing: 1px;
                        font-weight: 400;
                    }

                    img {
                        width: 11px;
                        height: 11px;
                    }
                }
            }
        }
    }
}
</style>
