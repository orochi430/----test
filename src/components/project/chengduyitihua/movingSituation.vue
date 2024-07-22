<template>
<div class="ds-workflow ds-moving-situation" :class="{'control-workflow': isControl}">
    <div :class="['_btn', {_controlBtn: isControl}]" v-show="hasYongDao">
        <span @click="handClickBtn('left')" :class="isActive=='left' ? '_active' : ''">简约</span>
        <span @click="handClickBtn('right')" :class="isActive=='right' ? '_active' : ''">详细</span>
    </div>

    <movingSituationSimple v-show="isActive=='left' && hasYongDao" :flowInfo="flowInfo" />
    <template v-show="isActive=='right'">
      <movingSituationDetails v-if="!showNewFlow" :flowInfo="flowInfo" :parameters="parameters"/>
      <movingSituationDetailsNew v-else :formData="formData"></movingSituationDetailsNew>
    </template>
    <Ding-btn :class="[isControl ? 'controlDingBtn': 'dingBtn']" :pk="formData.info_id" :styleOptions="{'width':'0.9rem','height':'0.9rem','border-radius': '50%'}" :prarms="dingObj" :options="{ size: 'small', type: 'info' }" text="提醒"></Ding-btn>
</div>
</template>

<script>
import movingSituationSimple from "./movingSituationSimple";
import movingSituationDetails from "./movingSituationDetails";
import movingSituationDetailsNew from "./movingSituationDetails_new";
import DingBtn from "@/components/common/DingBtn";
export default {
    name: "movingSituation",
    components: {
        movingSituationSimple,
        movingSituationDetails,
        DingBtn,
        movingSituationDetailsNew
    },
    props: {
        formData: {
            type: Object,
            default: () => {
                return {};
            }
        },
        isControl: {
            type: Boolean,
            default: false
        },
        parameters: {
          type: Object,
          default: () => {
              return {};
          }
        }
    },
    data() {
        return {
            active: 0,
            isActive: "right",
            hasYongDao: false,
            flowInfo: {},
            dingObj: {},
            showNewFlow: dsf.config.commonFlow.useNewFlowPage
        };
    },
    mounted() {
        console.log(this.parameters)
    },
    created() {
        this.loadData();
        if (dsf.config.ddSetting.isDing) {
            this.Ding()
        }
        this.isActive = dsf.config.commonFlow.isDefaultShowDetail ? "right" : "left"
    },
    methods: {
        handClickBtn(status) {
            this.isActive = status;
        },
        loadData() {
            var self = this;
            //console.log(111,self.formData);
            dsf.flow.getWorkFlowNodes({
                param: {
                    infoId: self.formData.info_id || self.formData.A0001 || self.formData.id,
                },
                thenFun: (res, data) => {
                    self.flowInfo = data;
                    //如果没有泳道信息，则设置只显示流程详情
                    if (!data.stageList || data.stageList.length == 0) {
                        self.isActive = "right";
                        self.hasYongDao = false;
                    }else{
                        self.hasYongDao = true;
                    }
                }
            });
        },
        Ding() {
            let textData = dsf.http.get(`fn/common/getFileInfo?pk=${this.formData.info_id}`)
            let dingUser = dsf.http.get(`fn/mobileNote/getMeetingUsersByNotepaper?pk=${this.formData.info_id}`)
            Promise.all([textData, dingUser])
                .then(([{
                    data: btData
                }, {
                    data: {
                        data: users
                    }
                }]) => {
                    if (users.length) {
                        let text = `您有一份标题为【${btData.bt}】的文件未处理，请及时处理！`
                        this.dingObj = {
                            users,
                            text
                        }
                    } else {
                        // dsf.layer.toast("暂无可钉人员")
                    }

                }).catch(err => {
                    console.log(err)
                })
        },
    }
};
</script>

<style lang="scss" scoped>
._btn>span {
    background: white;
}
.ds-workflow.ds-moving-situation{
    height: 100%;
}
.control-workflow {
    position: relative;
    margin: 0;
    height: 100%;
    overflow-y: hidden;

    ._controlBtn {
        position: static !important;
        margin: 0 auto;
        justify-content: center !important;
        padding: 0.22rem 0rem;
    }

    .ds-moving-situation-simple {
        margin-top: 16px !important;
    }

    .moving-situation-details {
        margin-top: 16px !important;
    }

    .controlDingBtn {
        position: absolute;
        bottom: 17px;
        right: 16px;
    }
}
.ds-workflow.ds-moving-situation{
    margin: 0 !important;
}
.dingBtn {
    position: absolute;
    bottom: 57px;
    right: 16px;
}
</style>
