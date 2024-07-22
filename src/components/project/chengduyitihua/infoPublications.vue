<template>
  <div class="infoPub">
    <van-cell-group v-for="(item, key) in publication" :key="key" class="cellGroup">
      <van-cell :title="item.title" value="" is-link @click="goUrl(key)">
        <template #icon>
          <div class="leftIcon"></div>
        </template>
      </van-cell>
      <div class="contenDiv">
        <div class="coverInfo" v-for="(val, index) in item.dataVal" :key="index" @click="pubItem(val, key, index)">
          <van-image width="25vw" fit="contain" :src="getListImg(val.dataValue['oa_xxkw_tp'])" />
          <div class="coverTitle">{{ val.dataValue["B0001"] }}</div>
          <van-popup v-model="isShowEnclosure[key][index]" :close-on-click-overlay="false" lock-scroll position="bottom"
            get-container="#app" class="flex dc" style="height: 100vh">
            <van-nav-bar @click-left="closePop(key, index)" left-text="返回" left-arrow :title="fileTitle"></van-nav-bar>
            <enclosure ref="enclosure" :fileData="{
              info_id: formMeta.parameters ? formMeta.parameters.pk : '',
              moduleId: formMeta.parameters
                ? formMeta.parameters.moduleId
                : '',
              nodeId: formMeta.parameters ? formMeta.parameters.nodeId : '',
              nodeName: formMeta.parameters
                ? formMeta.parameters.nodeName
                : '',
              flowId: formMeta.parameters ? formMeta.parameters.flowId : '',
              pId: formMeta.parameters ? formMeta.parameters.pId : '',
              pnId: formMeta.parameters ? formMeta.parameters.pnId : '',
              uploadAttach: formMeta.parameters
                ? formMeta.parameters.uploadAttach
                : '',
            }" :allFile="allFile" :formMeta="formMeta"></enclosure>
          </van-popup>
        </div>
      </div>
    </van-cell-group>
  </div>
</template>

<script>
import enclosure from "../../commonForm/controls/enclosure.vue";
export default {
  components: { enclosure },
  data() {
    return {
      fileTitle: "",
      formMeta: {},
      allFile: [],
      isShowEnclosure: {
        gzdt: [false],
        mryq: [false],
        zydt: [false],
      },
      // publicationTitle: ["工作动态", "每日要情", "政研动态"],
      publication: {
        gzdt: { title: "工作动态", dataVal: [] },
        mryq: { title: "每日要情", dataVal: [] },
        zydt: { title: "政研动态", dataVal: [] },
      },
      listParams: [
        {
          module: "gzdt",
          listId: "231113152123YlS9UrRPpq5ibRAKFnq",
          moduleId: "231111101402AlIRsyiV1ihwqvjaeKs",
        },
        {
          module: "mryq",
          listId: "231113152136mlXkxKL1lzSqFGKzHBD",
          moduleId: "231111101402AlIRsyiV1ihwqvjaeKs",
        },
        {
          module: "zydt",
          listId: "231113152146J9T9kSE5Ysmu8xd5Htz",
          moduleId: "231111101402AlIRsyiV1ihwqvjaeKs",
        },
      ],
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      let self = this;
      let params = {
        limit: 3,
        page: 1,
        showTotal: true,
        isFirst: 1,
        start: 1,
      };
      for (let item of this.listParams) {
        await dsf.http
          .post(
            `fn/list/${item.listId}/mobile/q?moduleId=${item.moduleId}`,
            params
          )
          .then((res) => {
            if (res.status == 200) {
              self.publication[item.module].dataVal = res.data.datas;
            }
          });
      }
      // console.log(Object.entries({ title: "工作动态", dataVal: [] }));
    },
    getListImg(item) {
      return dsf.url.getServerUrl(`fn/file/downloadImage?fileName=${item}`);
    },
    async pubItem(item, key, index) {
      let listId = this.listParams.find((el) => el.module == key).listId;
      await dsf.http
        .get(
          `fn/xform/getInfo?listId=${listId}&pk=${item.dataValue["A0001"]}&moduleId=${item.dataValue["A0004"]}`
        )
        .then((res) => {
          if (res.status == 200) {
            this.formMeta = res.data.struct;

            let paramInfo = this.formMeta.parameters;
            let params = {
              info_id: paramInfo.pk,
              infoId: paramInfo.pk,
              nodeId: paramInfo.nodeId,
              flowId: paramInfo.flowId,
              moduleId: paramInfo.moduleId,
              start: 1,
              limit: 100,
            };
            dsf.http
              .post("fn/mobileAttachment/getFormAttachment", params)
              .then((elem) => {
                console.log("elem", elem);
                // this.allFile = elem.data.rows;
                let rows = elem.data.rows;
                let loginToken = dsf.util.loadSessionStore("loginToken");
                let timestamp = new Date().getTime();
                rows.forEach((item) => {
                  let arr = [];
                  if (item.document) {
                    item.document.forEach((doc, idx) => {
                      doc.downloadFileName = dsf.util.stripscript(
                        doc.downloadFileName || doc.title
                      );
                      let obj = {
                        id: doc.id,
                        title: doc.title,
                        downloadFileName: doc.downloadFileName,
                        type: doc.type,
                        size: doc.showFileSize || "",
                        navtiveUrl: doc.url,
                        url: dsf.url.getServerUrl(
                          `fn/office/openMobileOffice?fileId=${doc.id}&moduleId=${doc.moduleId}&fileName=${doc.downloadFileName}&nodeId=${paramInfo.nodeId}&flowId=${paramInfo.flowId}&x-auth-token=${loginToken}`
                        ),
                        //永中H5手写签批地址
                        // handWrittenUrl: dsf.url.getServerUrl(
                        //     `fn/mobileYozo/signature?fileId=${id}&moduleId=${moduleId}&nodeId=${struct.parameters.nodeId}&flowId=${struct.parameters.flowId}&x-auth-token=${loginToken}`
                        // ),
                        editUrl: dsf.url.getServerUrl(
                          `fn/mobileOffice/wordEdit?fileId=${doc.id}&moduleId=${doc.moduleId}&fileName=${doc.downloadFileName}&nodeId=${paramInfo.nodeId}&flowId=${paramInfo.flowId}&x-auth-token=${loginToken}`
                        ),
                        initUrl: `fn/file/download?infoId=${doc.infoId}&fileId=${doc.id}&fileName=${doc.downloadFileName}&nrType=${doc.type}&moduleId=${doc.moduleId}&x-auth-token=${loginToken}&fullfilename=${timestamp}${doc.downloadFileName}`,
                        handwritingUrl: dsf.url.getServerUrl(
                          `fn/office/openMobileOffice?fileId=${doc.id}&moduleId=${doc.moduleId}&fileName=${doc.downloadFileName}&nodeId=${paramInfo.nodeId}&flowId=${paramInfo.flowId}&x-auth-token=${loginToken}&handwriting=1&screenWidth=${document.body.clientWidth}`
                        ),
                        infoId: doc.infoId,
                        moduleId: doc.moduleId,
                        isHandwrite: this.$route.query.isdjOpen
                          ? -1
                          : doc.isHandwrite,
                        isRevise: doc.isRevise,
                        isNoModify: doc.isNoModify,
                        canEdit: doc.canEdit,
                        canDownLoad: doc.canDownLoad,
                        //name: title
                        name:
                          item.document.length > 1
                            ? `${item.name}${idx + 1}`
                            : item.name,
                      };
                      if (
                        doc.title.toLowerCase().includes(".png") ||
                        doc.title.toLowerCase().includes(".jpg") ||
                        doc.title.toLowerCase().includes(".jpeg") ||
                        doc.title.toLowerCase().includes(".bmp") ||
                        doc.title.toLowerCase().includes(".gif") ||
                        doc.title.toLowerCase().includes(".mp4")
                      ) {
                        obj.url = dsf.url.getServerUrl(
                          `fn/mobileFileDownload/download?fileId=${doc.id}&moduleId=${doc.moduleId}&fileName=${doc.downloadFileName}`
                        );
                      }
                      if (item.canShow == "1") {
                        arr.push(obj);
                      }
                    });
                    item.file = arr;
                  } else {
                    item.file = [];
                  }
                  //如果当前附件类型不可编辑并且没有文件则不显示该类别 2022年5月6日23:37:47 @ly
                  if (
                    !(
                      item.allowMaintain > 0 &&
                      dsf.config.commonForm.canEditFile != false
                    ) &&
                    item.file.length == 0
                  ) {
                    item.canShow = "-1";
                  }
                });
                this.allFile = rows.filter((row) => row.canShow == 1);
                let filtTitles = this.allFile[0]?.file[0]?.title
                this.fileTitle = filtTitles.includes(".") ? filtTitles.split(".")[0] : filtTitles;
                this.isShowEnclosure[key][index] = true;
              });
          }
        });
    },
    closePop(key, index) {
      history.back()
    },
    goUrl(key) {
      this.$router.push({
        name: "allPublications",
        query: {
          title: this.publication[key].title,
          type: key
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.infoPub {
  padding: 10px;

  :not(:first-child).cellGroup {
    margin-top: 12px;
  }

  .leftIcon {
    width: 5px;
    height: 17px;
    background-color: #3389e0;
    border-radius: 10px;
    margin-right: 6px;
  }

  ::v-deep .van-cell {
    display: flex;
    align-items: center;
  }

  .contenDiv {
    padding: 0 15px 10px;
    display: flex;
    justify-content: flex-start;

    :not(:last-child).coverInfo {
      margin-right: 12px;
    }

    .coverInfo {
      .coverTitle {
        max-width: 110px;
      }

      // display: flex;
      // flex-direction: column;
      // align-items: center;
    }
  }
}
</style>
