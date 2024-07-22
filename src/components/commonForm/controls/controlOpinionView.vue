<template>
  <div>
    <component v-if="templateComponent" :is="templateComponent" :metaData="metaData" :parameters="parameters"></component>
    <div class="controlOpinionView" v-else-if="!showDeptOpinion" ref="controlOpinionView">
        <div class="opinionBox" v-for="(item, index) in opinion" :key="index">
          <template v-if="item.editOpinion">
            <editOpinion :formMeta="formMeta" :metaData="metaData" v-if="canEditOpinion" @controlEditOpinion="controlEditOpinion"></editOpinion>
          </template>
          <template v-else>
            <div class="opinionType" v-show="isShowType(item, index)" style="font-weight: bold">{{ item.nodeName }}:</div>
            <div v-show="item.deptName" style="padding: 6px 0;">{{ item.deptName }}</div>
            <div class="opinionText" v-show="item.opinionContent" v-html="item.opinionContent">
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
            <div class="opinionTime tr" v-show="item.time">
                <img v-if="item.signPhoto && !dsf.config.commonForm.hideOpinionSignPhoto"
                    :src="dsf.url.getWebPath(item.signPhoto)" alt="">
                <i v-else>{{ item.userName }}&nbsp;</i>
                {{ item.time }}
            </div>
          </template>
        </div>
        <enclosurePopup ref="enclosurePopup"></enclosurePopup>

    </div>
    <div class="controlOpinionView" v-else ref="controlOpinionView">
        <div class="opinionBox" v-for="(itemdept, indexdept) in opinion" :key="indexdept">
            <div class="opinionType" v-show="itemdept.deptname" style="font-weight: bold">
                {{ itemdept.deptname }}:
            </div>
            <div class="opinionBox" v-for="(item, index) in itemdept.list" :key="index">
                <div v-show="item.nodeName">{{ item.nodeName }}</div>
                <div class="opinionText" v-show="item.opinionContent" v-html="item.opinionContent">
                </div>
                <div class="opinionWhere tr">

                </div>
                <div class="opinionTime tr" v-show="item.time">
                    <img v-if="item.signPhoto && !dsf.config.commonForm.hideOpinionSignPhoto"
                        :src="dsf.url.getWebPath(item.signPhoto)" alt="">
                    <i v-else>{{ item.userName }}&nbsp;&nbsp;</i>
                    {{ item.time }}
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import propMixin from "./mixin";
import enclosurePopup from "@/components/todoFile/attachPreivewPop.vue";
import editOpinion from "./opinionViewTemplate/component/editOpinion.vue";
import allComps from "./opinionViewTemplate";
export default {
    name: "controlOpinionView",
    mixins: [propMixin],
    props: ["parameters", "formMeta"],
    components: {enclosurePopup, editOpinion, ...allComps},
    data() {
        return {
            // opinion: [],
            // showDeptOpinion: false,
            user: dsf.util.loadSessionStore("user"),
            controlData: {},
            filePreview: false,
            imgPreview: false,
            videoPreview: false,
            preveiwImg: [],
            previewUrl: "",
            templateComponent: '',
        };
    },
    computed: {
        canEditOpinion() {
            return this.metaData.extra.mobileInput == 1
        },
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
            if (this.canEditOpinion) { // 允许意见输入时，找到对应排序插入空意见用于意见输入
                let tepmIndex = -1
                let myUserId = dsf.util.loadSessionStore('user').user_id
                if (this.$route.query.agencyType == 2) {
                    myUserId = this.$route.query.agencyUserId
                }
                let currentUserSort = this.metaData.extra.users?.findIndex(user => user.userId == myUserId) || 0
                let userIds = this.metaData.extra.users?.map(item => item.userId) || []
                for (let i = 0; i < tempOpinion.length; i++) {
                    let opId = tempOpinion[i].userId
                    if (userIds.findIndex(id => id == opId) >= currentUserSort) {
                        tepmIndex = i
                        break
                    }
                }
                let Index = tepmIndex == -1 ? tempOpinion.length : tepmIndex
                tempOpinion.splice(Index, 0, {editOpinion: true})
            }
            if(tempOpinion.length > 0){
                this.metaData.show = true
            }
            return tempOpinion
        },
        showDeptOpinion() {
            return this.metaData.extra.isDept == 1
        },
    },
    created() {
        let allCompsName = Object.keys(allComps);
        if (this.metaData.extra.template && allCompsName.includes(`template${this.metaData.extra.template}`)) {
          this.templateComponent = `template${this.metaData.extra.template}`
        }
    },
    mounted() {
        this.$eventBus.OnBtnWriteOpintion(this, () => {
            console.log('接收', this.metaData.extra.nodeIds.indexOf(this.parameters.nodeId))
            if (this.metaData.extra.nodeIds.indexOf(this.parameters.nodeId) > -1) {
                this.$nextTick(() => {
                    this.$refs.controlOpinionView.scrollIntoView({
                        behavior: "smooth",
                        block: "end"
                    });
                })
            }
        });
    },
    methods: {
        isShowType(item, index) { // 只有相同流程节点的第一个显示节点名称
            if (index == 0) {
                return item.nodeName
            } else {
                return item.nodeName && item.nodeName != this.opinion[index - 1].nodeName
            }
        },
        onClickLeft() {
            this.filePreview = false
        },
        priviewOpinionImg(data) {
            return
            this.imgPreview = true
            this.preveiwImg = [data]
        },
        // 过滤所有特殊字符
        stripscript(s) {
            var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\]<>/?~！@#￥……&*——|{}‘；：”“'？↵\r\n ]");
            var rs = "";
            for (var i = 0; i < s.length; i++) {
                rs = rs + s.substr(i, 1).replace(pattern, '');
            }
            return rs;
        },
        wpsOpen(part, fileUrl, suffix) {
            let self = this
            let rootPath = dsf.url.getRootPath()
            let downUrl = rootPath + fileUrl;
            let fileName = this.stripscript(part.fileName);
            console.log(fileName)
            var param = {
                keepCallback: true,
                downUrl: encodeURI(downUrl),
                saveUrl:"",
                fileName: fileName,
                openWithWPS: true,
                uploadFile: true,
                openMode: "readOnly", //不是已办结文件、已办事项 并且后台参数可编辑，允许编辑，否则只读
                enterReviseMode:false,
                showReviewingPaneRightDefault:false,
                userName: self.user.name
            };
            console.log(param);
            $WPS.downAndOpen(param, function (data) {
                console.log(data);
            }, function (data) {
                console.log("错误回调", data);
            });
        },
        priview(data) {
            // if (data.fileName.includes(".mp4")) {
            //     this.videoPreview = true
            //     this.previewUrl = data.priviewUrl
            //     return
            // }
            // if (data.fileName.includes(".png") || data.fileName.includes(".jpg") || data.fileName.includes(".mp4")) {
            //     this.imgPreview = true
            //     this.preveiwImg = [data.priviewUrl]
            //     return
            // }

            // const index = data.navtiveUrl.lastIndexOf(".");
            // const suffix = data.navtiveUrl.substr(index + 1);
            // if (dsf.config.commonForm.nativeWps) {
            //     this.wpsOpen(data, data.initUrl, suffix);
            // } else {
            //     this.previewUrl = data.priviewUrl
            //     this.filePreview = true
            // }
            console.log(data)
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
        controlEditOpinion(val) {
            this.$emit("controlEditOpinion", val);
        }
    }
};
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
            font-size: var(--font_size_0);
            font-weight: 600;
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
}
</style>
