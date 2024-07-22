<template>
<!-- 市教委一体化意见模板 -->
<div class="controlOpinionView">
    <div class="opinionBox opinionBox0" v-for="(ops, key) in opinion" :key="key">
        <div class="opinionBox opinionBox1" v-for="(item, key1) in ops" :key="key1">
            <span>{{ item.deptName }}</span>
            <div class="opion-box">
                <template v-if="parameters.moduleId != '231206094611ozfPecj2tTcgzjb8mHx'">
                    <div class="opinionBox" v-for="(it, index) in item.leaderOpinions" :key="index">
                        <template>
                            <div class="opinionText" :class="{'current': !it.handler}" v-show="it.leaderOpinion"    v-html="it.leaderOpinion">
                            </div>
                            <div class="opinionTime tr" :class="{'current': !it.handler}" v-show="it.leaderOpinionDate">
                                <i>{{ it.leaderName }}&nbsp;</i>
                                {{ it.leaderOpinionDate }}
                            </div>
                        </template>
                    </div>
                </template>
                
                <div class="file-div">
                    <div v-if="item.acceptStr&&parameters.moduleId != '231206094611ozfPecj2tTcgzjb8mHx'">采纳情况：{{ item.acceptStr }}</div>
                    <div v-if="item.publicStr&&parameters.moduleId != '231206094611ozfPecj2tTcgzjb8mHx'">公开情况：{{ item.publicStr }}</div>
                    <div v-if="item.privateReason&&parameters.moduleId != '231206094611ozfPecj2tTcgzjb8mHx'">非主动公开理由：{{ item.privateReason }}</div>
                    <div v-if="item.fileId" class="tr">
                        <div class="opinionFile ellipsis" @click="priview(item)">
                            <img :src="dsf.util.getFileTypeIcon(item.fileName)">
                            <div class="info">
                                <p class="elps">{{ item.fileName }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <enclosurePopup ref="enclosurePopup"></enclosurePopup>
</div>
</template>

<script>
import enclosurePopup from "@/components/todoFile/attachPreivewPop.vue";
import editOpinion from "./opinionViewTemplate/component/editOpinion.vue";
export default {
    name: "controlMultiDeptOpinion",
    props: ["formData","metaData", "parameters"],
    components: {
        enclosurePopup,
        editOpinion,
    },
    data() {
        return {
            activeNames: [''],
            opinion: []
        }
    },
    computed: {},
    mounted() {
        console.log(this.formData);
        this.getopinion() 
    },
    methods: {
        isShowType(item, index) { // 只有相同流程节点的第一个显示节点名称
            if (index == 0) {
                return item.nodeName
            } else {
                return item.nodeName && item.nodeName != this.opinion[index - 1].nodeName
            }
        },
        getopinion() {
            let self = this
            dsf.http
                .post("/ctrl/suggestionProposal/getMinorDeptOpinionList", {
                    nodeId: this.parameters.nodeId,
                    pk: this.parameters.moduleId == '231206094611ozfPecj2tTcgzjb8mHx' ? this.formData.main['A0003'].value :this.parameters.pk,
                })
                .then(function (res) {
                    if (res.status == "200" && res.data?.data) {
                        self.opinion = res.data.data
                    }
                });
        },
        priview(data) {
            let file = {   
                "fileName": data.fileName,
                "isNew": true,
                "moduleId": this.parameters.moduleId,
                "officeModuleId": "",
                "nodeId": "-1",
                "flowId": "0",
                "fileId": data.infoId || data.fileId,
                "id": data.id || data.fileId,
                "isHandwrite": "0"
            }
            this.$refs.enclosurePopup.open(file)
        },
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";

.controlOpinionView {
    font-size: var(--font_size_2);
    width: 100%;

    .tf {
        text-align: left;
    }

    .tc {
        text-align: center;
    }

    .tr {
        text-align: right;
    }

    iframe {
        width: 100%;
        height: calc(100vh - 40px);
    }

    >>>.van-nav-bar__content {
        height: 40px;
    }

    .videoBox {
        background-color: rgba(0, 0, 0, .8);
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .opinionBox {
        // padding-left: 15px;
        position: relative;
        margin: 10px 0 5px;
        color: #333;

        /* font-weight: 600; */
        // border: 1px solid #eee;
        // padding: 10px;
        // border-radius: 2px;
        >span {
            font-weight: 600;
        }

        .opinionText {
            // margin-top: 5px;
            // min-height: 30px;
            font-size: var(--font_size_2);
            // text-indent: 1em;
            padding-bottom: 12px;
        }

        .opinionImg {
            display: flex;
            justify-content: flex-end;
        }

        .opinionTime {
            font-size: var(--font_size_2);
            color: #333;

            img {
                width: auto;
                height: 34px;
                display: inline-block;
                vertical-align: bottom;
            }
        }

        // &:first-child {
        //     margin-top: 5px;
        // }

        &:nth-child(n+3)::before {
            position: absolute;
            box-sizing: border-box;
            content: " ";
            pointer-events: none;
            right: 0;
            top: -5px;
            left: 0;
            border-bottom: 1px dashed #ebedf0;
        }

        .opinionFile {
            margin: 6px 0;
            padding: 9px 6px;
            background-color: #eee;
            display: flex;
            align-items: center;
            border-radius: 3px;

            img {
                width: 32px;
                height: 32px;
                margin-right: 6px;
                object-fit: contain;
            }

            .info {
                flex: 1;
                overflow: hidden;
                font-size: var(--font_size_3);

                .sub {
                    font-size: var(--font_size_4);
                }
            }
        }
    }

    .opinionBox0 {
        >div:nth-child(n+2) {
            margin-top: 20px;
        }
    }

    .attachWrap {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -6px;

        .attach {
            width: calc(100% / 4 - 12px);
            margin: 6px;
            word-break: break-all;
            padding: 6px;
            background: #eee;
            border-radius: 3px;
            position: relative;

            .title {
                line-height: 16px;
                height: 48px;
                font-size: var(--font_size_4);
                @include multi-ellipsis(3)
            }

            .icon {
                padding-top: 6px;
                font-size: 10px;

                img {
                    height: 16px;
                    width: auto;
                    display: inline-block;
                    margin-right: 4px;
                    vertical-align: bottom;
                }
            }

            .del {
                position: absolute;
                color: #ccc;
                top: -6px;
                right: -6px;

                i {
                    font-size: var(--font_size_4);
                }
            }
        }
    }

    .file-div {
        display: flex;
        flex-wrap: wrap;
        border-top: 1px dashed #EBEDF0;

        >div {
            margin-top: 10px;
            padding-right: 10px;
            min-width: 50%;
            font-size: var(--font_size_3);
        }
        .tr{
            margin-top: 0 !important;
        }
    }

    .current {
        color: #0080FF !important;
        font-weight: 600;

        i {
            color: #0080FF !important;
            font-weight: 600;
        }
    }

    .opion-box {
        margin-top: 8px;
        padding: 0 8px;
        border: 1px solid #EBEDF0;
    }
}
</style>
