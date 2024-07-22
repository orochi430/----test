<template>
    <!-- 市教委一体化意见模板 -->
    <div class="controlOpinionView">
        <div class="opinionBox" v-for="(item, index) in opinion" :key="index">
          <template>
            <!-- <div class="opinionType" v-show="isShowType(item, index)" style="font-weight: bold">{{ item.nodeName }}:</div>
            <div v-show="item.deptName" style="padding: 6px 0;">{{ item.deptName }}</div> -->
            <div class="opinionText" :class="{'current': item.nodeName == '处长'}" v-show="item.opinionContent" v-html="item.opinionContent">
            </div>
            <div class="opinionText opinionImg" v-show="item.handwritePic" @click="priviewOpinionImg(item.handwritePic)">
                <img :src="item.handwritePic" alt="" :style="{ width: dsf.config.commonFlow.opinionImgWidth || '50%' }">
            </div>
            <div v-if="item.opinionFiles && item.opinionFiles.length <= 2">
              <div class="opinionFile ellipsis" v-for="(itm, inx) in item.opinionFiles" :key="inx" @click="priview(itm)">
                <img :src="dsf.util.getFileTypeIcon(itm.fileName)">
                <div class="info">
                  <p class="elps">{{ itm.fileName }}</p>
                  <p class="sub">{{ dsf.util.filesizeTostr(itm.fileSize) }}</p>
                </div>
              </div>
            </div>
            <div class="attachWrap" v-if="item.opinionFiles && item.opinionFiles.length > 2">
              <div v-for="(itm, index) in item.opinionFiles" class="attach" @click="priview(itm)">
                <div class="title">{{ itm.fileName }}</div>
                <div class="icon elps"><img :src="dsf.util.getFileTypeIcon(itm.fileName)" alt=""><span>{{ dsf.util.filesizeTostr(itm.fileSize) }}</span></div>
              </div>
            </div>
            <div class="opinionTime tr" v-show="item.time"  :class="{'current': item.nodeName == '处长'}">
                <img v-if="item.signPhoto && !dsf.config.commonForm.hideOpinionSignPhoto"
                    :src="dsf.url.getWebPath(item.signPhoto)" alt="">
                <i v-else>{{ item.userName }}&nbsp;</i>
                {{ item.time }}
            </div>
          </template>
        </div>
        <enclosurePopup ref="enclosurePopup"></enclosurePopup>

    </div>
</template>

<script>
import round from "./component/round.vue";
import enclosurePopup from "@/components/todoFile/attachPreivewPop.vue";
import editOpinion from "../opinionViewTemplate/component/editOpinion.vue";
export default {
    props: ["metaData", "parameters"],
    components: {
        enclosurePopup,
        editOpinion,
        round,
    },
    data() {
        return {
            activeNames: [''],
            dataTree: []
        }
    },
    computed: {
        opinion() {
            let tempOpinion = []
            if (this.metaData.extra.list?.length) {
                let opinion = this.metaData.extra.list
                let loginToken = dsf.util.loadSessionStore("loginToken");
                let map = {};
                opinion.forEach(element => {
                    if (element.handwritePic) {
                        element.handwritePic = dsf.url.getServerUrl(element.handwritePic)
                    }
                    if (element.opinionFiles) {
                        element.opinionFiles.forEach((item) => {
                            item.priviewUrl = dsf.url.getServerUrl(
                                `fn/office/openMobileOffice?fileId=${item.id}&moduleId=${this.$route.params.moduleId}&nodeId=${element.nodeId}&&flowId=${this.parameters.flowId}&x-auth-token=${loginToken}`
                            )
                            item.navtiveUrl = item.filePath;
                            item.initUrl = `fn/mobileFileDownload/download?fileId=${item.id}&moduleId=${this.$route.params.moduleId}&fileName=${item.fileName}&x-auth-token=${loginToken}`

                            if (item.fileName.includes(".png") || item.fileName.includes(".jpg")) {
                                item.priviewUrl = dsf.url.getServerUrl(
                                    `fn/mobileFileDownload/download?fileId=${item.id}&moduleId=${this.$route.params.moduleId}&fileName=${item.fileName}`
                                )
                            }
                            if (item.fileName.includes(".mp4")) {
                                item.priviewUrl = dsf.url.getServerUrl(
                                    `fn/mobileFileDownload/download?fileId=${item.id}&moduleId=${this.$route.params.moduleId}&fileName=${item.fileName}`
                                )
                            }
                        })
                    }
                    // 根据节点分组
                    let ai = element
                    if (!map[element.nodeName]) {
                        map[element.nodeName] = [ai]
                    } else {
                        map[ai.nodeName].push(ai)
                    }
                });
                Object.values(map).forEach(item => tempOpinion.push(...item))
            }
            if(tempOpinion.length > 0){
                this.metaData.show = true
            }
            return tempOpinion
        },
    },
    mounted() {},
    methods: {
        isShowType(item, index) { // 只有相同流程节点的第一个显示节点名称
            if (index == 0) {
                return item.nodeName
            } else {
                return item.nodeName && item.nodeName != this.opinion[index - 1].nodeName
            }
        },
        priview(data) {
            let file = {
              "fileName": data.fileName,
              "isNew": true,
              "moduleId": this.parameters.moduleId,
              "officeModuleId": "",
              "nodeId": "-1",
              "flowId": "0",
              "fileId": data.infoId,
              "id": data.id,
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
        // border: 1px solid #eee;
        // padding: 10px;
        // border-radius: 2px;
        .opinionText {
            // margin-top: 5px;
            // min-height: 30px;
            font-size: var(--font_size_1);
            
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

        &:not(:first-child)::before {
            position: absolute;
            box-sizing: border-box;
            content: " ";
            pointer-events: none;
            right: 0;
            top: -5px;
            left: 0;
            border-bottom: 1px solid #ebedf0;
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
  .current{
    color: #0080FF !important;
    font-weight: 600;
    i{
      color: #0080FF !important;
      font-weight: 600;
    }
  }
}
</style>
