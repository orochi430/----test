<template>
  <div>
    <van-sticky>
      <van-search
        v-model="keyword"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch()"
        @cancel="onCancel"
        @focus="onFocus"
      >
        <template #action>
          <van-icon @click="showCal = true" name="filter-o" />
          <span @click="onCancel">取消</span>
        </template>
      </van-search>
    </van-sticky>
    <div v-show="showPanel" class="panel">
      <div v-if="topSearch.length > 0" class="panel-tip">大家都在看</div>
      <span
        v-for="(item, idx) in topSearch"
        :key="idx"
        class="panel-keywords"
        @click="
          keyword = item;
          onSearch();
        "
      >
        {{ item }}
      </span>
    </div>
    <van-calendar
      v-model="showCal"
      type="range"
      @confirm="onCalConfirm"
      title="发布时间"
      :show-confirm="false"
      :min-date="minDate"
      :max-date="maxDate"
      :allow-same-day="true"
    />
    <div v-if="errored">
      数据获取失败！
    </div>
    <div v-else-if="files.length > 0">
      <div v-show="!showPanel" v-for="(file, index) in files" :key="index">
        <file-item :file="file" :meeting-id="meetingId"></file-item>
        <van-divider v-if="index < files.length - 1" />
      </div>
    </div>
    <div v-else-if="files.length == 0 && !showPanel" class="flex">
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
      keyword: "",
      showPanel: false,
      showCal: false,
      files: [],
      loading: null,
      meetingId: this.$route.params.meetingId,
      folderid: this.$route.params.folderid,
      errored: false,
      topSearch: [],
      minDate: new Date(new Date().getFullYear() - 5, 0, 1), //可选择的最小日期
      maxDate: new Date(new Date().getFullYear() + 5, 11, 31), //可选择的最大日期
      isSearch: this.$route.query.isSearch,
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
      if (self.isSearch && self.isFirstLoad) {
        self.onFocus();
      }
      self.loading = dsf.layer.loading();
      let url = `fn/peopleCongress/files`;
      if (dsf.config.staticJson.enable && self.folderid) {
        // 静态json数据特殊处理url
        url += `/${self.folderid}`;
      }
      // 获取会议文件
      dsf.http
        .post(url, {
          meetingId: self.meetingId,
          folderId: self.folderid ? self.folderid : ""
        })
        .done(res => {
          if (res.type == "success") {
            self.setFiles(res.data);
          } else {
            self.errored = true;
          }
        })
        .error(err => {
          console.log("getFiles-err", err);
          self.errored = true;
        })
        .always(() => {
          dsf.layer.closeLoading(self.loading);
        });
    },
    onSearch(sdate, edate) {
      let self = this;
      self.showPanel = false;
      self.files = [];
      self.loading = dsf.layer.loading();
      let params = {};
      if (self.keyword) params.keyword = self.keyword;
      if (sdate && edate) {
        params.sdate = sdate;
        params.edate = edate;
      }
      if (Object.keys(params).length > 0) {
        // 根据检索条件查询文件内容
        params.meetingId = self.meetingId;
        dsf.http
          .post(`fn/peopleCongress/fileQuery`, params)
          .done(res => {
            if (res.type == "success") {
              self.setFiles(res.data);
              // 设置关键字特殊样式
              self.files.forEach(item => {
                if (item.fileName)
                  item.fileName = item.fileName.replace(
                    self.keyword,
                    `<span class="keyword">${self.keyword}</span>`
                  );
                if (item.folderName)
                  item.folderName = item.folderName.replace(
                    self.keyword,
                    `<span class="keyword">${self.keyword}</span>`
                  );
              });
            } else {
              self.files = [];
              // dsf.layer.toast(res.message);
            }
          })
          .error(err => {
            console.log("fileQuery-err", err);
            self.errored = true;
          })
          .always(() => {
            dsf.layer.closeLoading(self.loading);
          });
      } else {
        // 无检索条件则显示当前目录内容
        self.getFiles();
      }
    },
    onCancel() {
      let self = this;
      self.showPanel = false;
    },
    onFocus() {
      let self = this;
      self.showPanel = true;
      self.topSearch = [];
      dsf.http
        .post(`fn/peopleCongress/fileTopSearch`, { meetingId: self.meetingId })
        .done(res => {
          if (res.type == "success") {
            self.topSearch = res.data;
          }
        })
        .error(err => {
          console.log("fileTopSearch-err", err);
          // self.errored = true;
        })
        .always(() => {});
    },
    setFiles(data) {
      let self = this;
      self.files = [];
      // 目录
      if (data.folders && data.folders.length > 0) {
        data.folders.map(item => {
          item.type = "folder";
          self.files.push(item);
        });
      }
      // 文件
      if (data.files && data.files.length > 0) {
        let arr = [];
        data.files.map(item => {
          item.type = item.fileName.substr(item.fileName.lastIndexOf(".") + 1);
          self.files.push(item);
        });
      }
    },
    onCalConfirm(dates) {
      let self = this;
      self.showCal = false;
      let sdate = dsf.date.format(dates[0], "yyyy-mm-dd");
      let edate = dsf.date.format(dates[1], "yyyy-mm-dd");
      self.onSearch(sdate, edate);
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
  height: 60vh;
}

::v-deep.van-divider {
  margin: 0;
  padding: 0 16px;
  border-color: #ddd;
  background-color: #fff;
}

.panel {
  padding: 0 1em;
  background-color: #fff;
  &-keywords {
    background-color: #f2f2f2;
    padding: 0.1rem;
    display: inline-block;
    vertical-align: middle;
    margin: 0 0.1rem 0.1rem 0;
    border-radius: 6px;
  }
  &-tip {
    font-weight: bold;
    padding-bottom: 0.8em;
  }
}
.van-search {
  .van-search__action {
    .van-icon {
      vertical-align: middle;
      font-size: var(--font_size_1);
      margin: 0 0.5em;
    }
    span {
      vertical-align: middle;
      color: #d00;
    }
  }
}
</style>
