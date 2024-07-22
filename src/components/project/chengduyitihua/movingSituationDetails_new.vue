<template>
<div class="movingSituationDetails_new">
    <div class="flows" v-for="(item, index) in contentData" :key="index">
        <div class="photo">
            <img class="img" src="xxx" alt :onerror="`this.src='${defaultIcon}'`" />
            <van-icon v-if="item.status < 0||item.pDate" name="checked" color="#13BA84" />
            <van-icon v-else name="more" color="#E6A23C" />
        </div>
        <div class="texts">
            <div class="title">
                <span>{{item.actName}}</span>
                <span v-if="item.pDate">{{item.pDate.substring(5)}}</span>
            </div>
            <!--多人处理的时候-->
            <div class="username" v-if="item.children && item.children.length > 0">
                <div>
                    <p>
                        <span>{{item.userName}}</span>
                    </p>
                </div>
            </div>
            <!--单个节点的时候-->
            <div class="username" v-if="!item.children || item.children.length == 0">
                <div>
                    <p>
                        <span>{{item.userName}}</span>
                        <span>{{getStatus(item)}}</span>
                    </p>
                    <span v-if="item.content">"{{item.content}}"</span>
                </div>
            </div>
            <div v-show="!item.children || item.children.length > 0">
                <div class="duoren" v-for="(node,i) in item.children" :key="'node'+i">
                    <div class="dept">
                        <span>{{i+1}}、并行处理【{{node.deptName}}】</span>
                        <van-icon :class="{'active': node.active}" @click="changeState(index,i)" name="arrow" />
                    </div>
                    <div class="details" v-show="node.active">
                        <div v-for="(detail,y) in node.children" v-show="!detail.children" :key="'detail'+y">
                            <p>
                                <span>发件人：</span>
                                <span>{{detail.fDUserName}}</span>
                            </p>
                            <p>
                                <span>接收人：</span>
                                <span>{{detail.dUserName}}</span>
                            </p>
                            <p>
                                <span>接收部门：</span>
                                <span>{{detail.deptName}}</span>
                            </p>
                            <p>
                                <span>阅读时间：</span>
                                <span>{{detail.pDate}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
export default {
    name: 'movingSituationDetails_new',
    props: {
        formData: {
            type: Object,
            default: function () {
                return {};
            }
        }
    },
    components: {},
    data() {
        return {
            defaultIcon: require("../../../assets/imgs/workflow/icon_institution_level_two.png"),
            contentData: []
        };
    },
    computed: {},
    watch: {},
    methods: {
        changeState(index, i) {
            this.$set(this.contentData[index].children[i], "active", !this.contentData[index].children[i].active)
        },
        getNodeName(lists) {
            let obj = {}
            if (lists.children && lists.children.length > 0) {
                obj = this.getNodeName(lists.children[0])
            } else {
                obj = lists
            }
            return obj
        },
        getPersonList() {
            let loader = dsf.layer.loading('流程获取中');
            let that = this;
            let url = `fn/mobileFormComment/showPnodesTree`;
            dsf.http.post(url, {
                    sourceType: 16,
                    isShowAbn: -1,
                    infoId: this.formData.info_id
                })
                .then(function (result) {
                    if (result && result.status == 200) {
                        result.data.data.forEach(item => {
                            if (item.children && item.children.length > 0) {
                                item.userName = "多人处理"
                                let node = that.getNodeName(item)
                                item.actName = node.actName
                                item.deptName = node.deptName

                                item.children.forEach(obj => {
                                    let node1 = that.getNodeName(obj)
                                    obj.deptName = node1.deptName
                                    obj.active = false
                                })
                            }
                        })
                        console.log(result.data.data)
                        that.contentData = result.data.data
                    }

                }).finally(() => {
                    that.$nextTick(() => {
                        dsf.layer.closeLoading(loader);
                    })
                })
        },
        getStatus(node) {
            if (node.nodeType == "7") {
                return "(抄送)"
            } else if (node.status > 0) {
                return "(审批中)"
            }
            return ""
        }
    },
    created() {},
    mounted() {
        console.log(this.data)
        this.getPersonList()
    },
    destroyed() {},
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";

._content-children {
    ._item {
        margin: 0 !important;

        &:first-child {
            padding-top: 16px !important;
        }

        &:last-child {
            padding: 0 !important;
        }

        ._con {
            .status {
                border: 1px solid;
                border-radius: 3px;
                @include font-theme('normal');
                @include border-color-theme('normal');
                padding: 0 4px;
                margin: 0 8px;
                font-size: var(--font_size_4);
            }
        }
    }
}

.movingSituationDetails_new {
    width: 100%;
    height: auto;
    overflow: hidden;
    box-sizing: border-box;
    padding: 20px;
    margin-top: 50px;

    .flows {
        width: 100%;
        height: auto;
        position: relative;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        min-height: 100px;

        &::before {
            content: '';
            width: 1px;
            background: #ebebeb;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 20px;
            z-index: 2;
        }

        &:last-child {
            &::before {
                display: none;
            }
        }

        .photo {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            position: relative;
            flex-shrink: 0;
            z-index: 3;

            .img {
                width: 100%;
                height: 100%;
            }

            .van-icon {
                position: absolute;
                bottom: -0.06rem;
                right: -0.06rem;
            }
        }

        .texts {
            flex: 1;
            margin-left: 15px;
            padding-bottom: 20px;

            .title {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;

                &>span:nth-child(1) {
                    font-size: var(--font_size_2);
                    color: #333;
                }

                &>span:nth-child(2) {
                    font-size: var(--font_size_3);
                    color: #999;
                }
            }

            .username {
                width: 100%;
                height: auto;
                display: flex;
                margin-top: 5px;
                justify-content: space-between;
                align-items: flex-end;

                &>div {
                    p {
                        display: flex;
                        align-items: center;

                        &>span {
                            font-size: var(--font_size_3);
                            color: #5f81a3;
                            line-height: 20px;
                            margin-right: 10px;
                        }
                    }

                    &>span {
                        font-size: var(--font_size_3);
                        color: #666;
                        line-height: 20px;
                    }
                }
            }

            .duoren {
                width: 100%;
                height: auto;
                border-radius: 5px;

                .dept {
                    width: 100%;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    box-sizing: border-box;
                    padding: 0 10px;
                    border-bottom: 1PX solid #ebebeb;

                    &>span {
                        font-size: var(--font_size_3);
                        font-weight: bold;
                        color: #333;
                    }

                    .van-icon {
                        width: 20px;
                        height: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        @include background-theme("normal");
                        border-radius: 50%;
                        color: #FFF;
                        flex-shrink: 0;
                        margin-left: 20px;
                        transform: rotate(0deg);
                        transition: all linear .2s;
                        font-size: var(--font_size_4);

                        &.active {
                            transform: rotate(90deg);
                            transition: all linear .2s;
                        }
                    }

                }
            }

            .details {
                margin: 0 10px;
                height: auto;
                overflow: hidden;
                display: flex;
                flex-direction: column;

                &>div {
                    width: 100%;
                    height: auto;
                    border: 1PX solid #ebebeb;
                    border-radius: 5px;
                    margin-top: 10px;

                    &:last-child {
                        margin-bottom: 10px;
                    }

                    &>p {
                        width: 100%;
                        height: 24px;
                        display: flex;
                        align-items: center;
                        box-sizing: border-box;
                        padding: 0 10px;
                        border-bottom: 1PX solid #ebebeb;

                        &:last-child {
                            border: none;
                        }

                        span {
                            font-size: var(--font_size_3);
                            color: #666;
                        }

                        span:nth-child(1) {
                            width: 80px;
                            flex-shrink: 0;
                            text-align: right;
                        }

                        span:nth-child(2) {
                            color: #333;
                        }
                    }
                }
            }
        }
    }
}
</style>
