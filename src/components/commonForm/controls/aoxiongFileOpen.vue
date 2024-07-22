<template>
  <div></div>
</template>
<script>
export default {
  props: ["aoxiongParams"],
  data() {
    return {
      data: {},
      aos: null,
    };
  },
  created() {
    this.data = this.aoxiongParams || this.$route.query;
  },
  mounted() {
    this.$nextTick(() => {
      this.getFiles();
    });
  },
  methods: {
    getToken(file) {
      dsf.http
        .post(`fn/aosController/getToken?pk=${this.aoxiongParams.infoId}`)
        .then(async (res) => {
          if (res.data.code == "200") {
            await dsf
              .loadJs("http://10.1.214.47:20025/sdk/umd/isigning.min.js")
              .then(() => {})
              .error((err) => {
                console.log(err);
              });
            await dsf
              .loadJs(
                "http://10.1.214.47:20025/sdk/plugins/isigning.light-weight.min.js"
              )
              .then(() => {})
              .error((err) => {
                console.log(err);
              });
            this.aos = window.axLib.AosSign({
              // http://192.1.54.183:32302/{渠道ID}-{应用ID}/aoscript-api
              // 渠道ID和应用ID都由<运营人员>同客户端凭证和公钥一同颁发颁发
              host: "http://10.1.214.47:20026/23BVw9aHQTS-20nG7MJJo64/aoscript-api",
              headers: {
                "X-Aos-Voucher":
                  "1727498403312738304_1727498403312738304_1700702760282",
              },
            });
            this.aos.setToken(res.data.message);
            let obj;
            // if (this.aoxiongParams.signId) {
            //   obj = {
            //     // signId: this.aoxiongParams.signId,
            //     files: [{ 
            //       currentFileId:this.aoxiongParams.currentFileId
            //     }],
            //     isFree: true,
            //     thirdBizId: this.aoxiongParams.thirdBizId,     
            //   };
            // } else {
              obj = {
                files: [{ 
                  file ,
                  name:this.aoxiongParams.fileName
                }],
                isFree: true,
                thirdBizId: this.aoxiongParams.thirdBizId,
                toolsBar: { signApprove: {autoActive: true }}
              };
            // }
            this.aos.startSign(obj);
            this.aos.event.on("onSubmitSuccess", (options) => {
              // 签署成功执行回调
              const { signId, thirdBizId, files, sourceFileList, fileMd5List } =
                options;
              this.aoxiongParams.signId = signId;
              this.aoxiongParams.thirdBizId = thirdBizId;
              this.aoxiongParams.currentFileId = files[0];
              this.aoxiongParams.save_url =
                this.aoxiongParams.save_url + "&downLoadId=" + files[0];
              //  fn/aosController/saveFile?pk=[文件id:必填]&moduleId=[模块ID:必填]&fileId=[附件ID:必填]&downLoadId=[傲雄回传附件id:必填]&nodeName=[节点名称:有就传]&pnId=[pnid:有就传]
              this.doFileRead();
            });
            this.aos.event.on("onCloseFrame", () => {
              this.$emit("update:msg", false);
            });
          } else {
            console.log("token获取失败");
          }
        })
        .error((err) => {
          // dsf.layer.closeLoading(loading);
          console.log(err);
        })
        .error((err) => {
          // dsf.layer.closeLoading(loading);
          console.log(err);
        });
    },
    async doFileRead(file) {
      let self = this;
      dsf.http.upload(this.aoxiongParams.save_url).then(async function (data) {
        console.log("uploaded", data.data);
        self.$emit("update:msg", false);
        self.dsf.layer.toast(data.data.message);
      });
    },
    getFiles() {
      let loading = dsf.layer.loading();
      let self = this;
      let url = self.aoxiongParams.initUrl;

      dsf.http
        .post(
          url,
          {},
          {
            responseType: "blob",
          }
        )
        .then((res) => {
          dsf.layer.closeLoading(loading);
          if (res.status == "200") {
            // console.log("Blob", res.data);
            this.getToken(res.data);
            // this.getToken(
            //   new File([res.data], self.aoxiongParams.fileName, {
            //     type: res.data.type,
            //   })
            // );
            // console.log("url", window.URL.createObjectURL(res.data));
            // window.URL.createObjectURL(blob);
            // console.log(
            //   "file对象",
            //   new File([res.data], self.aoxiongParams.fileName, {
            //     type: "application/pdf",
            //   })
            // );
          }
        })
        .error((err) => {
          dsf.layer.closeLoading(loading);
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.wps_office {
  height: calc(100vh - 0.92rem);
}
</style>
