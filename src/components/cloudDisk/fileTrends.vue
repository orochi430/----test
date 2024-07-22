<template>
<div class="fileTrends">
    <div class="fileList">
        <van-pull-refresh v-model="refreshing" :disabled="finished" @refresh="doRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="" @load="onLoad">
                <!-- <recent-item v-for="(item,index) in list" :key="index"></recent-item> -->
                <div class="dongtai" v-for="(item,index) in list" :key="index">
                    <div class="filetop">
                        <van-image :src="userInfo.photo">
                            <template v-slot:error>
                                <img src="../../../static/images/platform/user-img.svg" alt="" srcset="">
                            </template>
                        </van-image>
                        <p>
                            <span>{{ item.info }}</span>
                            <span>{{ item.createTime }}</span>
                        </p>
                    </div>
                    <div class="files" v-if="item.files && item.files.length>0">
                        <div v-for="(file,i) in item.files" :key="file.fileId+i">
                            <fileTypeIcon :file-name="file.fileName" :width="28" :height="32" :isDirectory="0"></fileTypeIcon>
                            <p>
                                <span>{{ file.fileName }}</span>
                                <span></span> <!--{{ file.filePath }}-->
                            </p>
                        </div>
                    </div>
                </div>
            </van-list>
        </van-pull-refresh>
    </div>
</div>
</template>

<script>
import fileTypeIcon from './fileTypeIcon.vue';
export default {
    name: 'fileTrends',
    components: {
        fileTypeIcon
    },
    data() {
        return {
            list: [],
            finished: false,
            loading: false,
            refreshing: false,
            start: 1,
            limit: 15,
            userInfo:{}
        };
    },
    computed: {},
    watch: {},
    methods: {
        onClickLeft() {
            this.$router.go(-1)
        },
        onLoad() {
            let that = this
            that.nodata = false
            dsf.http
                .post("fn/cloud/dynamic/list", {
                    page: this.start,
                    limit: this.limit
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(({
                    status,
                    data
                }) => {
                    console.log(data, status)
                    if (status === 200) {
                        if (data.data.length == 0 && that.start == 1) {
                            that.nodata = true
                        }

                        if (data && data.data && data.data.length > 0) {
                            data.data.forEach(item => {
                                // item.createTime = item.createTime ? moment(new Date(item.createTime)).calendar() : '';
                                item.createTime = item.createTime ? moment(new Date(item.createTime)).format("YYYY/MM/DD") : '';
                            })
                            that.list = that.list.concat(data.data)
                        }
                        if (data.data.length < that.limit) {
                            this.finished = true;
                        } else {
                            that.start += 1
                        }

                    } else {
                        this.finished = true;
                        that.nodata = true
                    }
                }).catch(({
                    message
                }) => {
                    this.finished = true;
                    that.nodata = true
                }).finally(() => {
                    this.loading = false;
                    this.refreshing = false;
                });
        },
        // 下拉刷新处理函数
        doRefresh(title) {
            this.keyword = title
            this.start = 1
            this.list = []
            // 清空列表数据
            this.finished = false;

            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            this.onLoad();
        },
    },
    created() {},
    mounted() {
        this.userInfo = dsf.util.loadSessionStore("user");
    },
    destroyed() {},
}
</script>

<style lang="scss" scoped>
.fileTrends {
    background: #FFF;

    .setting {
        font-size: 18px;
        color: #171A1D;
        ;
    }

    .fileList {
        width: 100%;
        height: calc(100vh - 46px);
        overflow-y: auto;

        .dongtai {
            width: calc(100% - 28px);
            margin-left: 14px;
            height: auto;
            box-sizing: border-box;
            padding: 23px 14px;
            border-bottom: 1PX solid rgba(224, 226, 228, 1);

            .filetop {
                display: flex;
                align-items: center;
                .van-image{
                    width: 35px;
                    height: 35px;
                    border-radius: 5px;
                    flex-shrink: 0;
                    overflow: hidden;
                    background: #CCC;
                }
                img {
                    width: 35px;
                    height: 35px;
                    border-radius: 5px;
                    flex-shrink: 0;

                }

                p {
                    display: flex;
                    flex-direction: column;
                    margin-left: 15px;

                    &>span:first-child {
                        font-size: var(--font_size_3);
                        color: #171A1D;
                        line-height: 20px;
                    }

                    &>span:last-child {
                        font-size: var(--font_size_4);
                        color: #747577;
                    }
                }
            }

            .files {
                width: 100%;
                box-sizing: border-box;
                background: #FFFFFF;
                border: 1PX solid rgba(224, 226, 228, 1);
                box-sizing: border-box;
                padding: 14px;
                margin-top: 14px;

                div {
                    display: flex;
                    width: 100%;
                    height: auto;
                    box-sizing: border-box;
                    align-items: center;
                    overflow: hidden;
                    /deep/ .van-image{
                        flex-shrink: 0;
                    }
                    img {
                        width: 24px;
                        height: 24px;
                        flex-shrink: 0;
                    }

                    p {
                        display: flex;
                        flex-direction: column;
                        margin-left: 14px;
                        border-bottom: 1PX solid rgba(224, 226, 228, 1);
                        padding: 10px 0;
                        overflow: hidden;
                        flex: 1;

                        &>span:first-child {
                            font-size: var(--font_size_3);
                            color: #171A1D;
                            line-height: 20px;

                        }

                        &>span:last-child {
                            font-size: var(--font_size_4);
                            color: #747577;
                            width: 100%;
                            display: block;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }

                    &:last-child {
                        p {
                            border: none;
                        }
                    }
                }
            }
        }
    }
}
</style>
