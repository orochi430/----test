<template>
<div class="collaboratorlist">
    <div class="listcontent">
        <div class="headcontent" v-if="isApp">
            <van-icon name="arrow-left" @click="close" />
            <span>协同人</span>
        </div>
        <div class="users_tab">
            <van-tabs v-model="xtr" color="#0091FF" @change="changeColTab">
                <van-tab :title="item.tab+' '+item.list.length" :name="item.type" v-for="(item,index) in collaboratorTabs" :key="index"></van-tab>
            </van-tabs>
            <div class="users_list" :class="{'appHeight':isApp}">
                <div v-for="(item,index) in collaboratorList" :key="index">
                    <van-image round src="./static/images/logo.jpg"></van-image>
                    <div class="dept">
                        <div class="username">
                            <span class="name">{{item.dataValue['C-TASKINFO-COLLABORATE-0001.text']}}</span>
                            <!-- <span class="tag">外部</span> -->
                        </div>
                        <div class="deptname">{{item.dataValue['C-TASKINFO-COLLABORATE-0002.text']?item.dataValue['C-TASKINFO-COLLABORATE-0002.text']:'暂未填写'}}-{{item.dataValue['C-TASKINFO-COLLABORATE-0003.value']?item.dataValue['C-TASKINFO-COLLABORATE-0003.value']:'暂未填写'}}</div>
                    </div>
                    <div class="buttons">
                        <span class="cbjl" @click="urgeRecord(item.dataValue['C-TASKINFO-COLLABORATE-0001.value'])" v-if="isShowRecord">推进记录</span>
                        <!-- <span class="cb" v-if="xtr != 4" @click="personalUrge(item.dataValue)">催办</span> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- :style="{ height: '100%',width:'100%',borderRadius: '6px',boxShadow:'0 0 15px #ccc' }" :overlay-style="{backgroundColor: 'rgba(0, 0, 0, 0)'}"  -->
    <van-popup v-model="recordUpdate" closeable :position="isApp?'bottom':'center'" class="listPcPop" round overlay-class="overlayClass">
        <div class="taskList">
            <div class="head">{{personalPropel.propulsor}}推进记录</div>
            <div class="taskContent">
                <div class="myjz">
                    <span class="text">我的进展</span>
                    <span :class="{'status': true,'wck':personalPropel.progressState == 1,'tjz':personalPropel.progressState == 2,'ykn':personalPropel.progressState == 3,'ywc':personalPropel.progressState == 4}">{{personalPropel.progressStateText}}</span>
                </div>
                <div class="percent">
                    <van-slider disabled v-model="personalPropel.percentage" bar-height="10px" :active-color="personalPropel.progressState==1?'#C0C2C3':(personalPropel.progressState==2?'#1064CD':(personalPropel.progressState == 3?'#EB6A0E':'#14C154'))" />
                    <span :class="{'wck':personalPropel.progressState == 1,'tjz':personalPropel.progressState == 2,'ykn':personalPropel.progressState == 3,'ywc':personalPropel.progressState == 4}">{{personalPropel.percentage}}%</span>
                </div>
                <recordHistory :recordData="personalPropel.propel"></recordHistory>
            </div>
        </div>
    </van-popup>
</div>
</template>

<script>
import recordHistory from './recordHistory.vue'
import $ from 'jquery'
export default {
    name: 'collaboratorList',
    components: {
        recordHistory
    },
    props: {
        taskId: {
            type: String,
            default: ''
        },
        isApp: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            collaboratorList: [],
            xtr: 2,
            collaboratorTabs: [{
                    tab: '未查看',
                    type: 1,
                    list: []
                },
                {
                    tab: '推进中',
                    type: 2,
                    list: []
                },
                {
                    tab: '有困难',
                    type: 3,
                    list: []
                },
                {
                    tab: '已完成',
                    type: 4,
                    list: []
                }
            ],
            isShowRecord: true, //是否需要展示推进记录
            recordUpdate: false,
            personalPropel: {
                "propulsor": "",
                "progressState": 0,
                "propel": [],
                "percentage": 0,
                "propulsorId": "",
                "progressStateText": ""
            }, //个人推进记录
            pk: '',
        }
    },
    created() {

    },
    mounted() {
        this.isShowRecord = this.$route.params.isRecord == 0 ? false : true;
        console.log(this.isShowRecord);
        // if (!this.isShowRecord) {
        //     $("#appTop").remove();
        // }
        this.pk = this.$route.params.pk ? this.$route.params.pk : this.taskId;
        this.getAllCollaborator();
    },
    methods: {
        // 切换协同人tab
        changeColTab(name, title) {
            this.collaboratorList = this.collaboratorTabs[name - 1].list;
        },
        // 协同人个人推进记录
        urgeRecord(id) {
            let that = this;
            this.recordUpdate = true;
            dsf.http.post(`/ctrl/taskman/task/getPersonalPropel?taskId=${that.pk}&propulsorId=${id}&timer=` + new Date().getTime()).then(res => {
                console.log(res)
                if (res && res.data.data) {
                    that.personalPropel = res.data.data;
                }
            })
        },
        //协同人个人催办
        personalUrge(item) {
            let options = {
                title: '新建催办', //可选
                data: {
                    "users": [{
                        "userId": item['C-TASKINFO-COLLABORATE-0001.value'],
                        "userName": item['C-TASKINFO-COLLABORATE-0001.text'],
                        "userAvatar": ''
                    }]
                }
            }
            if (window.top && window.top.createRemindInIm) {
                window.top.createRemindInIm(options)
                return
            }
            console.log(options)
            this.urgePerson(options); //催办
        },
        //催办IM
        urgePerson(options) {
            window.native && window.native.createRemind(options);
        },
        //协同人列表(未查看 1  推进中 2   有困难 3   已完成  4 )
        getCollaboratorByType(type) {
            let that = this;
            let arr = [];
            dsf.http.post(`fn/list/230110095530ie2dAay1DHZs7qTZAht/mobile/q?moduleId=230103192045EncoYZoaQ9Zee0afJmh&pk=${that.pk}&taskmanProgressState=${type}&timer=` + new Date().getTime(), {
                page: 1,
                limit: 100
            }).then(res => {
                // console.log(res.data)
                if (res && res.data) {
                    that.collaboratorTabs[type - 1].list = res.data.datas;
                    if (type == 2) {
                        that.collaboratorList = that.collaboratorTabs[1].list;
                    }
                }
            })
            // console.log(that.collaboratorTabs)
        },
        getAllCollaborator() {
            this.getCollaboratorByType(1);
            this.getCollaboratorByType(2);
            this.getCollaboratorByType(3);
            this.getCollaboratorByType(4);
        },
        close() {
            this.$emit('close')
        }
    },
    computed: {},
    watch: {}
}
</script>

<style lang="scss" scoped>
.collaboratorlist {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 3;
    overflow: hidden;
    background: #FFFFFF;

    .listcontent {
        width: 100%;
        height: 100%;
        overflow: hidden;

        .headcontent {
            height: 50px;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding: 0 20px;
            border-bottom: 1PX solid #ebebeb;

            ::v-deep .van-icon-arrow-left {
                font-size: var(--font_size_3);
                color: #666;
            }

            span {
                font-size: var(--font_size_2);
                color: #333333;
                margin-left: 5px;
            }
        }

        .users_tab {
            width: 100%;
            height: 100%;
            overflow: hidden;

            .users_list {
                width: 100%;
                height: calc(100% - 50px);
                overflow-y: auto;
                box-sizing: border-box;
                padding: 0 20px;

                &::-webkit-scrollbar {
                    width: 4px;
                    height: 60px;
                    background-color: transparent;
                    cursor: pointer;
                }

                &::-webkit-scrollbar-thumb {
                    height: 60px;
                    background-color: #ebebeb;
                    border-radius: 2px;
                }

                &.appHeight {
                    height: calc(100% - 94px);
                }

                &>div {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex: 1;
                    overflow: hidden;
                    margin-top: 20px;

                    .van-image {
                        width: 30px;
                        height: 30px;
                        flex-shrink: 0;
                    }

                    .dept {
                        flex: 1;
                        margin-left: 10px;
                        display: flex;
                        flex-direction: column;
                        margin-right: 20px;
                        overflow: hidden;

                        .username {
                            .name {
                                font-size: var(--font_size_4);
                                color: #333333;
                                line-height: 24px;
                            }

                            .tag {
                                width: 40px;
                                height: 22px;
                                background: #FFFFFF;
                                border: 1px solid rgba(0, 145, 255, 1);
                                font-size: var(--font_size_4);
                                color: #0091FF;
                                text-align: center;
                                line-height: 22px;
                            }
                        }

                        .deptname {
                            width: 100%;
                            font-size: var(--font_size_4);
                            color: #999999;
                            line-height: 24px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }

                    .buttons {
                        display: flex;
                        align-items: center;
                        flex-shrink: 0;

                        &>span {
                            margin-left: 15px;
                            font-size: var(--font_size_4);
                            color: #1064CD;
                            cursor: pointer;
                        }
                    }

                }
            }
        }
    }

    .taskList {
        width: 100%;
        height: 100%;
        overflow: hidden;

        .head {
            height: 50px;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding: 0 20px;
            font-size: var(--font_size_2);
            color: #333333;
            border-bottom: 1PX solid #ebebeb;
        }

        .taskContent {
            width: 100%;
            height: calc(100% - 50px);
            overflow-y: auto;

            &::-webkit-scrollbar {
                width: 4px;
                height: 60px;
                background-color: transparent;
                cursor: pointer;
            }

            &::-webkit-scrollbar-thumb {
                height: 60px;
                background-color: #ebebeb;
                border-radius: 2px;
            }

            .myjz {
                width: 100%;
                height: 50px;
                display: flex;
                align-items: center;
                box-sizing: border-box;
                padding: 0 20px;

                .text {
                    font-size: var(--font_size_4);
                    color: #333333;
                }

                .status {
                    margin-left: 15px;
                    font-size: var(--font_size_4);
                    color: #ccc;
                    // background: #F0F5FF;
                    // border: 1px solid rgba(222, 232, 251, 1);
                    border-radius: 4px;
                    width: 75px;
                    height: 30px;
                    font-size: var(--font_size_4);
                    // color: #0091FF;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    &.wck {
                        background: #F1F1F1;
                        border: 1px solid rgba(229, 229, 229, 1);
                        color: #999999;
                    }

                    &.tjz {
                        background: #F0F5FF;
                        border: 1px solid rgba(222, 232, 251, 1);
                        color: #0091FF;
                    }

                    &.ykn {
                        background: #f3efe9;
                        border: 1px solid rgba(247, 234, 216, 1);
                        color: #EB6A0E;
                    }

                    &.ywc {
                        background: #F0FFF6;
                        border: 1px solid rgba(216, 247, 229, 1);
                        color: #0DBF4F;
                    }
                }

            }

            .percent {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 50px;
                box-sizing: border-box;
                padding: 0 20px;

                .van-slider {
                    flex: 1;
                }

                &>span {
                    font-size: var(--font_size_4);
                    // color: #14C154;
                    flex-shrink: 0;
                    margin-left: 20px;

                    &.wck {
                        color: #999999;
                    }

                    &.tjz {
                        color: #0091FF;
                    }

                    &.ykn {
                        color: #EB6A0E;
                    }

                    &.ywc {
                        color: #0DBF4F;
                    }
                }
            }
        }
    }
}

::v-deep .van-tab__text {
    font-size: var(--font_size_3) !important;
}

::v-deep .van-tab.van-tab--active {
    color: #0091FF !important;
}

::v-deep .van-tabs__line {
    background: #0091FF !important;
}

::v-deep .van-checkbox__icon--checked .van-icon {
    background-color: #0091FF;
    border-color: #0091FF;
}

::v-deep .van-tabs__wrap {
    border: 1PX solid rgba(245, 245, 245, 1);
}

::v-deep.collaboratorlist .overlayClass {
    background: rgba(0, 0, 0, 0);
}

::v-deep.collaboratorlist .listPcPop {
    height: 100%;
    width: 100%;
    border-radius: 6px;
    box-shadow: 0 0 15px #ccc;
    top: 50%;
    left: 50%;
    // margin-left: -50%;
    // margin-top: calc(-50% + 50px);
    // transform: translate3d(0, 0, 0);
    transform: translate(-50%, -50%);
}
</style>
