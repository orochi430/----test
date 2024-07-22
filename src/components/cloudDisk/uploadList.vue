<template>
<div class="uploadList">
    <div class="list" v-if="list.length>0">
        <div class="shangchuan">
            <span>上传1项</span>
        </div>
        <div class="file" v-for="(item,index) in list" :key="index">
            <img class="icon" src="../../assets/imgs/cloudDisk/file-vedio.png" alt="" srcset="">
            <div>
                <p>
                    <span class="ydq">IMG-5003.MOV</span>
                    <span>7.5MB/10.8MB</span>
                </p>
                <van-progress :percentage="50" :show-pivot="false" />
            </div>
        </div>
    </div>
    <div class="empty" v-if="list.length==0">
        <img src="../../assets/imgs/cloudDisk/empty.png" alt="" srcset="">
        <span>暂无上传任务</span>
    </div>
</div>
</template>

<script>
export default {
    name: 'uploadList',
    components: {},
    data() {
        return {
            list: [1,2,3]
        };
    },
    computed: {},
    watch: {},
    methods: {},
    created() {},
    mounted() {},
    destroyed() {},
}
</script>

<style lang="scss" scoped>
.uploadList {
    width: 100%;
    background: #f5f5f5;

    .shangchuan {
        width: 100%;
        height: 25px;
        background: #F2F2F5;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 14px;
        font-size: var(--font_size_4);
        color: #171A1D;
    }

    .file {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #FFF;
        box-sizing: border-box;
        padding: 0 14px;

        .icon {
            width: 38px;
            height: 38px;
            flex-shrink: 0;
        }

        &>div {
            display: flex;
            flex-direction: column;
            flex: 1;
            margin-left: 14px;
            border-bottom: 1PX solid rgba(224, 226, 228, 1);
            box-sizing: border-box;
            padding: 14px 0;

            /deep/ .van-image {
                width: 24px;
                height: 24px;
                flex-shrink: 0;
            }

            .van-progress {
                margin-top: 10px;
            }

            p {
                display: flex;
                flex-direction: column;
                flex: 1;
                margin-right: 20px;

                &>span:first-child {
                    font-size: var(--font_size_3);
                    color: #171A1D;
                    line-height: 20px;
                    display: flex;
                    align-items: center;
                }

                &>span:last-child {
                    font-size: var(--font_size_4);
                    color: #A2A3A4;
                    display: flex;
                    align-items: center;

                    label {
                        font-size: var(--font_size_4);
                        color: #A2A3A4;
                        margin-left: 10px;
                    }
                }
            }
        }
    }

    .empty {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
            width: 230px;
            height: 150px;
        }

        span {
            font-size: var(--font_size_4);
            color: #A2A3A4;
        }
    }
}
</style>
