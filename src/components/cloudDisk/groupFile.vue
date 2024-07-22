<template>
<div class="groupFile">
    <common-head></common-head>
    <div class="tab-content">
        <div class="tab">
            <p>最近</p>
        </div>
        <img src="../../assets/imgs/cloudDisk/icon-more.png" alt="">
    </div>
    <div class="disk-file-list">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div class="file-item">
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
                <div class="moreIcon">
                    <img src="../../assets/imgs/cloudDisk/more-file.svg" alt="">
                </div>
            </div>
            <div class="file-item">
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
                <div class="moreIcon">
                    <img src="../../assets/imgs/cloudDisk/more-file.svg" alt="">
                </div>
            </div>
            <div class="file-item">
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
                <div class="moreIcon">
                    <img src="../../assets/imgs/cloudDisk/more-file.svg" alt="">
                </div>
            </div>
            <div class="file-item">
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
                <div class="moreIcon">
                    <img src="../../assets/imgs/cloudDisk/more-file.svg" alt="">
                </div>
            </div>
            <div class="file-item">
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
                <div class="moreIcon">
                    <img src="../../assets/imgs/cloudDisk/more-file.svg" alt="">
                </div>
            </div>
        </van-list>
    </div>
</div>
</template>

<script>
import CommonHead from './commonHead.vue'
export default {
    name: 'groupFile',
    components: {
        CommonHead
    },
    props: {},
    data() {
        return {
            loading: false,
            finished: false,
        }
    },
    computed: {},
    watch: {},
    created() {

    },
    mounted() {

    },
    methods: {
        getIconClass(title) {

        },
        onLoad() {

        }
    }
}
</script>

<style lang="scss" scoped>
.groupFile {
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 14px;
    box-sizing: border-box;
    overflow: hidden;

    .tab-content {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;

        .tab {
            display: flex;
            align-items: center;

            p {
                font-size: var(--font_size_3);
                color: #171A1D;
                font-weight: 600;
            }
        }

        img {
            width: 15px;
            height: 15px;
        }
    }

    .disk-file-list {
        width: 100%;
        height: calc(100% - 150px);

        .file-item {
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
    }
}
</style>
