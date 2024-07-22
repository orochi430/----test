<template>
  <div>
    <div v-if="errored">
      数据获取失败！
    </div>
    <div v-else-if="files.length > 0">
      <div v-for="(file, index) in files" :key="index">
        <file-item :file="file" :meeting-id="meetingId"></file-item>
        <van-divider v-if="index < files.length - 1" />
      </div>
    </div>
    <div v-else class="flex">
      <commonempty
        :image="require('static/images/peopleCongress/img_zwwj.png')"
        class="file-empty"
        description="暂无文件"
      />
    </div>
  </div>
</template>

<script>
import fileItem from "./components/fileItem";
export default {
  components: {
    fileItem
  },
  data() {
    return {
      files: [],
      loading: null,
      meetingId: this.$route.params.meetingId,
      folderId: this.$route.params.folderId,
      errored: false,
      isFirstLoad: false // 是否初次加载
    };
  },
  created() {
    let self = this;
    self.isFirstLoad = true;
    self.getFiles();
    // self.$eventBus.OnrefreshNPC(self, () => {
    //     self.getFiles();
    // });
  },
  activated() {
    let self = this;
    // 刷新文件列表
    if (!self.isFirstLoad) {
      self.getFiles();
    }
    self.isFirstLoad = false;
  },
  mounted() {},
  methods: {
    getFiles() {
      console.log("getFiles");
      let self = this;
      self.loading = dsf.layer.loading();
      let url = `fn/sdycMeeting/files`;
      if (dsf.config.staticJson.enable && self.folderId) {
        // 静态json数据特殊处理url
        url += `/${self.folderId}`;
      }
      // 获取会议文件
      dsf.http
        .post(url, {
          meetingId: self.meetingId,
          id: self.folderId
        })
        .done(result => {
          self.files = [];
          if (result.type == "success") {
            self.files = result.data.map(item => {
              if (item.fileType == "1") {
                item.type = "folder";
              } else {
                item.type = item.name.substr(item.name.lastIndexOf(".") + 1);
              }
              return item;
            });
          } else {
            self.errored = true;
          }
        })
        .error(error => {
          // console.log(error);
          // dsf.layer.toast("数据获取失败！");
          self.errored = true;
        })
        .always(() => {
          dsf.layer.closeLoading(self.loading);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.file-empty {
  display: flex;
  flex-direction: row;
  padding: 0.2rem 0.5rem;

  ::v-deep .van-empty__image {
    flex: none;
  }

  ::v-deep .van-empty__description {
    padding: 0;
  }
}

.flex {
  justify-content: center;
  height: 100vh;
}

::v-deep.van-divider {
  margin: 0;
  padding: 0 16px;
  border-color: #ddd;
  background-color: #fff;
}
</style>
