<template>
  <div class="controlImage" :style="style">
    <van-uploader ref="vanUploader" v-model="fileList" :image-fit="imageFit" multiple :max-count="litmitImgNum"
      :after-read="afterReadFile" :before-read="beforeReadFile" :before-delete="beforeDeleteFile" :disabled="!canEdit"
      :deletable="canEdit" :show-upload="canEdit && !lxUploader" />
    <div v-if="lxUploader" class="van-uploader" @click="clickUpload">
      <div class="van-uploader__wrapper">
        <div class="van-uploader__upload"><i class="van-icon van-icon-photograph van-uploader__upload-icon"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import propMixin from "./mixin";
export default {
  name: "controlImage",
  mixins: [propMixin],
  components: {},
  data() {
    return {
      fileList: [],
      controlData: {},
      litmitImgSize: null,
      uploadArr: [],
      canEdit: true,
      lxUploader: dsf.config.commonForm.controlImage?.lanxin?.isEnable,
      // contain：缩放使图片完整展示；cover：裁剪；fill：拉伸；none：保持图片原有尺寸；scale-down：取none或contain中较小的一个。
      imageFit: dsf.config.commonForm.controlImage?.imageFit || "contain"
    };
  },
  watch: {
    value(n, o) {
      console.log("value");
      this.fileList = [];
      this.uploadArr = [];
      if (n && n.value.length) {
        let imgarr = n.value.split(",");
        imgarr.forEach(item => {
          this.uploadArr.push(item);
          if (item.length && item.indexOf("http") == 0) {
            this.fileList.push({ url: item + "&imageMogr2/thumbnail/!50p" });
          } else {
            item = `fn/file/downloadImage?fileName=` + item;
            this.fileList.push({ url: dsf.url.getServerUrl(item) });
          }
        });
      }
    }
  },
  created() {
    if (!this.metaData.privilege.editable) {
      this.canEdit = false;
    }
    if (this.value.value && this.value.value.length) {
      let imgarr = this.value.value.split(",");
      imgarr.forEach(item => {
        this.uploadArr.push(item);
        if (item.length && item.indexOf("http") == 0) {
          this.fileList.push({ url: item + "&imageMogr2/thumbnail/!50p" });
        } else {
          item = `fn/file/downloadImage?fileName=` + item;
          this.fileList.push({ url: dsf.url.getServerUrl(item) });
        }
      });
    }
  },
  computed: {
    style() {
      return dsf.config.clientType == "mobile" &&
        dsf.config.commonForm.layout == "row" &&
        dsf.config.commonForm.textlayout == "right"
        ? "text-align: right"
        : "";
    },
    litmitImgNum() {
      return this.metaData.extra.maxCount || 3;
    }
  },
  methods: {
    afterReadFile(file) {
      this.$toast.loading({
        message: "上传中...",
        forbidClick: true,
        duration: 0,
        overlay: true
      });
      if (file.length) {
        let arrPromise = [];
        file.forEach(item => {
          item.uploadTag = `${item.file.name}_${new Date().getTime()}`
          arrPromise.push(dsf.http.upload(`fn/file/uploadImage`, {}, item));
        });
        Promise.all(arrPromise).done(res => {
          this.$toast.clear();
          res.forEach(item => {
            this.uploadArr.push(item.data.data.filePath);
          });
          console.log(this.uploadArr);
          this.emitFn(this.uploadArr.join(","));
        });
      } else {
        file.uploadTag = `${file.file.name}_${new Date().getTime()}`
        dsf.http.upload(`fn/file/uploadImage`, {}, file).done(res => {
          this.$toast.clear();
          this.uploadArr.push(res.data.filePath);
          this.emitFn(this.uploadArr.join(","));
        });
      }
    },
    beforeReadFile() {
      return true;
    },
    beforeDeleteFile(file, detail) {
      this.uploadArr.splice(detail.index, 1);
      this.emitFn(this.uploadArr.join(","));
      return true;
    },
    emitFn(str) {
      let obj = this.value;
      obj.value = str;
      this.$emit("input", obj);
      console.log(this.value);
    },
    clickUpload() {
      let self = this
      lx.media.chooseImage({
        count: 9,
        sourceType: ["album", "camera"],
        quality: "high",
        success: function (res) {
          console.log("success", res);
          let files = []
          res.tempFiles.forEach(item => {
            let imgObj = {
              content: item.base64,
              file: dsf.util.base64ToFile(item.base64, item.type, item.name),
              message: "",
              status: ""
            }
            files.push(imgObj)
          })
          console.log("files", files);
          if (files.length) {
            let arrPromise = [];
            files.forEach(item => {
              item.uploadTag = `${item.file.name}_${new Date().getTime()}`
              self.fileList.push(item)
              arrPromise.push(dsf.http.upload(`fn/file/uploadImage`, {}, item));
            });
            Promise.all(arrPromise).done(res => {
              self.$toast.clear();
              res.forEach(item => {
                self.uploadArr.push(item.data.data.filePath);
              });
              self.emitFn(self.uploadArr.join(","));
            });
          }
        },
        fail: function (err) {
          console.log("imageUpErr", err);
          dsf.layer.toast("获取图片失败，请联系管理员！")
        },
      });
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep .van-image {
  img {
    height: 100% !important;
  }
}
</style>
