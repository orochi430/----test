<template>
  <div>
    <div v-if="errored" class="flex">
      <!-- 通用错误 -->
      <commonempty image="error" description="数据获取失败" />
    </div>
    <div v-else-if="files.length > 0">
      <div v-for="(file, index) in files" :key="index">
        <file-item :file="file" :isShowCount="false"></file-item>
        <van-divider v-if="index < files.length - 1" />
      </div>
    </div>
    <div v-else class="flex">
      <commonempty description="暂无文件" />
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
  mounted() { },
  methods: {
    getFiles() {
      console.log("getFiles");
      let self = this;
      self.loading = dsf.layer.loading();
      let url = `fn/whszfLw/mobileData`;
      // 获取会议文件
      dsf.http
        .get(url)
        .done(result => {
          self.files = [];
          if (result.type == "success") {
            self.files = result.data.map(item => {
              return {
                name: `${item.name}（${item.num}）`,
                count: item.num,
                listId: item.listId,
                moduleId: item.moduleId,
                params: item.param,
                type: "folder"
              };
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
  // height: 100vh;
}

::v-deep.van-divider {
  margin: 0;
  padding: 0 16px;
  border-color: #ddd;
  background-color: #fff;
}
</style>
