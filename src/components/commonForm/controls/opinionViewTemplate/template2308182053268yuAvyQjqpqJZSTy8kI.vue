<template>
  <div class="controlOpinionView">
    <div class="opinionBox" v-for="(item, index) in opinion" :key="index">
      <!-- <div v-show="item.deptName" style="padding: 6px 0">{{ item.deptName }}</div> -->
      <div class="opinionText" v-show="item.opinionContent || (item.handwritePageNum!==undefined && String(item.handwritePageNum).length > 0)">
        <span v-html="item.opinionContent"></span>
        <span @click="toShuke(item)" v-if="item.handwritePageNum!==undefined && String(item.handwritePageNum).length > 0" style="padding:color: #999">
          有手写<span style="color: var(--normal)">签批意见</span>
        </span>
      </div>
      <div class="opinionText opinionImg" v-show="item.handwritePic" @click="priviewOpinionImg(item.handwritePic)">
        <img :src="item.handwritePic" alt="" :style="{ width: dsf.config.commonFlow.opinionImgWidth || '50%' }" />
      </div>
      <div class="opinionTime tr" v-show="item.time">
        <img v-if="item.signPhoto && !dsf.config.commonForm.hideOpinionSignPhoto" :src="dsf.url.getWebPath(item.signPhoto)" alt="" />
        <i v-else>{{ item.userName }}&nbsp;</i>
        {{ item.time.split(" ")[0] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["metaData", "parameters"],
  data() {
    return {
      dataTree: {}
    }
  },
  computed: {
    opinion() {
      let tempOpinion = []
      if (this.metaData.extra.list) {
        let opinion = this.metaData.extra.list
        let loginToken = dsf.util.loadSessionStore("loginToken")
        let map = {}
        opinion.forEach(element => {
          if (element.handwritePic) {
            element.handwritePic = dsf.url.getServerUrl(element.handwritePic)
          }
          // 根据节点分组
          let ai = element
          if (!map[element.nodeName]) {
            map[element.nodeName] = [ai]
          } else {
            map[ai.nodeName].push(ai)
          }
        })
        Object.values(map).forEach(item => tempOpinion.push(...item))
      }
      return tempOpinion
    }
  },
  methods: {
    toShuke(item) {
      let formParameters = this.parameters
      dsf.layer.loading()
      let openToPage = String(item.handwritePageNum).split(',').reduce((pre, cur) => { return pre < cur ? pre : cur })
      dsf.http
        .post(`ctrl/instructions/signedFile`, {
          id: formParameters.moduleId == "230716135502ednDlLWLSO8VsLwqzrC" ? formParameters.pnId : formParameters.pk,
          moduleId: formParameters.moduleId,
          nodeId: formParameters.nodeId,
          pnId: item.pnid,
          needSignFile: 1
        })
        .then(res => {
          dsf.layer.clear()
          if (res.data.code == 200 && res.data.data && res.data.data.fileId) {
            let data = res.data.data
            let type = data.fileName.substr(data.fileName.lastIndexOf(".") + 1)
            let file = {
              id: data.fileId,
              title: type != "ofd" && type != "pdf" ? data.fileName.substr(0, data.fileName.lastIndexOf(".")) + ".pdf" : data.fileName,
              isHandleWrite: false,
              openToPage: Number(openToPage)
            }
            let formData = {
              info_id: formParameters.pk,
              moduleId: formParameters.moduleId,
              nodeId: formParameters.nodeId,
              nodeName: formParameters.nodeName,
              flowId: formParameters.flowId,
              pId: formParameters.pId,
              pnId: formParameters.pnId,
              type: "todo",
              canBack: false // 无后置才可退回
            }
            dsf.shuke.shGovShuke(file, formData, shukeRes => {
              // console.log(shukeRes)
              // if (shukeRes.type == "send" || shukeRes.type == "save") {
              //   VueData.alreadyWriteOpintion = true
              //   VueData.isShowWriteOpintionBtn = true
              //   if (hasPostposition) {
              //     VueData.handleActionClick("xform.inboxToSecretary")
              //   } else {
              //     VueData.handleActionClick("send")
              //   }
              // } else if (shukeRes.type == "close" || shukeRes.type == "back") {
              //   VueData.backSucces()
              // }
            })
          }
        })
        .catch(err => {
          dsf.layer.toast("不能手写签批")
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.opinionBox {
  position: relative;
  margin: 10px 0 5px;
  color: #333;
  .opinionText {
    font-size: var(--font_size_0);
    font-weight: 600;
    text-indent: 1em;
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
}
.tr {
  text-align: right;
}
</style>
