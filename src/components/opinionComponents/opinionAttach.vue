<template>
<div>
  <div class="attachWrap">
    <div v-for="(item, index) in attachList" class="attach">
      <div class="title">{{ item.fileName || item.filename }}</div>
      <div class="icon"><img :src="dsf.util.getFileTypeIcon(item.fileName || item.filename)" alt=""><span>{{ item.showFileSize }}</span></div>
      <div class="del" @click.stop="delAttach(item, index)"><i class="iconfont iconquxiao1"></i></div>
    </div>
  </div>
  <van-uploader ref="uploader"
    :accept="accept">
    <van-icon size="0rem" name="add-o" />
  </van-uploader>
</div>
</template>

<script>
export default {
  props: ['formParameters'],
  data() {
    return {
      accept: (dsf.util.checkSystem() == 'ios' || dsf.util.getClientName().includes('ding')) ? "*" : "image/*, application/*",
      attachList: []
    }
  },
  methods: {
    afterRead(file) {
        this.$toast.loading({
            message: "上传中...",
            forbidClick: true,
            duration: 0,
            overlay: true,
        });
        this.doFileRead(file);
    },
    async doFileRead(file) {
        let self = this;
        let url =
            "fn/mobileSaveOpinion/upload"
        dsf.http.upload(url, file.file, {
          moduleId: this.formParameters.moduleId,
          mid: 0,
          pId: this.formParameters.pId || 0,
          pnId: this.formParameters.pnId || 0,
          nodeName: '拟稿',
          nrType: 9,
          pk: this.formParameters.pk,
          newFileFlag: 0,
          validataRename: 0,
          fileId: ''
        }).then(res => {
          if (res.data.code == 200) {
              this.attachList.push(res.data.data)
            }
            dsf.layer.toast(res.data.message);
        });
    },
    delAttach(file, index) {
      dsf.layer.confirm(
        {
          message: "是否确认删除",
          confirmButtonText: "确认",
        },
        () => {
          dsf.http.post('fn/file/delete', {
            moduleId: this.formParameters.moduleId,
            pk: this.formParameters.pk,
            nrType: 9,
            fileId: file.id,
            fileName: file.filename,
            pId: this.formParameters.pId || 0,
            pnId: this.formParameters.pnId || 0
          }).then(res => {
            if (res.data.code == 200) {
              dsf.layer.toast('删除成功')
              this.attachList.splice(index, 1)
            }
          })
        }
      )
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";
.attachWrap {
  display: flex;
  flex-wrap: wrap;
  margin: 0 10px;
  .attach {
    width: calc(100% / 4 - 12px);
    margin: 6px;
    word-break: break-all;
    padding: 6px;
    background: #F6F6F6;
    border-radius: 3px;
    position: relative;
    .title {
      line-height: 16px;
      height: 48px;
      font-size: var(--font_size_5);
      @include multi-ellipsis(3)
    }
    .icon {
      padding-top: 6px;
      font-size: 10px;
      img {
        height: 16px;
        width: auto;
        display: inline-block;
        margin-right: 6px;
      }
    }
    .del {
      position: absolute;
      color: #ccc;
      top: -6px;
      right: -6px;
      i {
        font-size: var(--font_size_5);
      }
    }
  }
}
</style>
