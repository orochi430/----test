<template>
  <div class="topic-container">
    <div class="top">
      <van-cell
        title="议题详情"
        icon="arrow-left"
        center
        @click="$router.back()"
      ></van-cell>
    </div>
    <div class="content">
      <div class="left">
        <div
          v-for="(item, index) in topicList"
          :key="index"
          :class="{ active: item.id == topicInfo.id }"
          class="topic-item"
          @click="topicClick(item)"
        >
          <span>{{ item.title }}</span>
        </div>
      </div>
      <div class="right">
        <div class="title">议题详情</div>
        <div v-if="topicInfo" class="content">
          <div class="info-item">
            <span class="name">会议议题</span>
            <span class="val">{{ topicInfo.title }}</span>
          </div>
          <div class="info-item">
            <span class="name">会议标签</span>
            <span class="val">{{ topicInfo.tag }}</span>
          </div>
          <div class="info-item">
            <span class="name">汇报人</span>
            <span class="val">{{ topicInfo.reporter }}</span>
          </div>
          <div class="info-item">
            <span class="name">汇报时长</span>
            <span class="val">{{ topicInfo.reportTime }}</span>
          </div>
          <div class="info-item">
            <span class="name">参会部门</span>
            <span class="val">{{ topicInfo.attendDept }}</span>
          </div>
          <div class="info-item">
            <span class="name">会议材料</span>
            <!-- <span class="val">
              <span v-for="(file,f) in topicInfo.files" :key="f" class="file-item">
                <div class="file-icon" style="background-image:url(static/images/meetingPad/file/word.png)"></div> {{ file.fileName }}
              </span>
            </span> -->
            <topicItem v-if="topicInfo && topicInfo.files" :files="topicInfo.files" class="val"></topicItem>
          </div>
          <div class="info-item">
            <span class="name">决议情况</span>
            <span class="val">{{ topicInfo.resolution }}</span>
          </div>
          <div class="info-item">
            <span class="name">审议状态</span>
            <span class="val">{{ topicInfo.reviewStatus }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VuexStore from "@/store";
import topicItem from "./components/topicItem";
export default {
  components: {
    topicItem
  },
  data() {
    return {
      id: this.$route.query.meetingId,
      // address: 'xx市xx区xx路香榭国际酒店  三楼 3004 麒麟厅  ',
      seat: "",
      title: "",
      tag: "",
      reporter: "",
      duration: "",
      // situation: '',
      state: "",
      dept: "",
      files: [],
      topicList: [],
      topicInfo: null,
      meeting: dsf.util.loadSessionStore("meeting")
    };
  },
  computed: {
    meetingPk() {
      return `${this.topicInfo && this.topicInfo.id}`;
    }
  },
  watch: {
    topicInfo: {
      deep: true,
      handler() {
        this.pageKey = new Date().getTime();
      }
    }
  },
  created() {
    VuexStore.commit("setMeetingName", this.meeting.title);
    this.getData();
  },
  methods: {
    topicClick(item) {
      this.topicInfo = item;
    },
    getData() {
      dsf.http
        .post(`fn/conferenceMobile/meetingTopics`, {
          meetingId: this.id
        })
        .done(result => {
          //console.log(result);
          if (result.code == 200 && result.data) {
            this.topicList = result.data;
            if (this.topicList.length > 0) {
              this.topicInfo = this.topicList[0];
            }
            // 议题信息
            // self.seat = result.data.seat;
            // self.title = result.data.title;
            // self.tag = result.data.tag;
            // self.reporter = result.data.reporter;
            // self.duration = result.data.duration;
            // self.state = result.data.state;
            // self.dept = result.data.dept;
            // // 附件信息
            // let arr = [];
            // result.data.files.map(item => {
            //   arr.push({
            //     fileId: item.fileId,
            //     fileName: item.fileName,
            //     flowId: item.flowId,
            //     isNew: item.count == 0,
            //     moduleId: item.moduleId,
            //     nodeId: item.nodeId,
            //     officeModuleId: "",
            //     viewCount: item.count || 0,
            //     type: item.fileName
            //       .substr(item.fileName.lastIndexOf(".") + 1)
            //       .toLowerCase()
            //   });
            // });
            // self.files.push(...arr);
          }
        })
        .error(error => {
          dsf.layer.toast("数据获取失败！", false);
        })
        .always(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.topic-container {
  height: 100%;
  display: flex;
  flex-direction: column;

  .top {
    ::v-deep .van-cell__title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      span {
        font-size: 0.88rem;
        padding-left: 0.4rem;
        color: #333333;
      }
    }

    .address {
      padding: 40px !important;
    }

    .van-cell__left-icon {
      font-size: 0.8rem;
    }
  }

  > .content {
    flex: 1;
    overflow: hidden;
    display: flex;

    .left {
      flex: 3;
      padding: 20px 200px 20px 20px;
      overflow: auto;
      box-sizing: content-box;

      .topic-item {
        height: 200px;
        line-height: 200px;
        border-bottom: 1px solid #dcdcdc;
        padding: 0 40px;
        overflow:hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        &.active {
          box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 12px 2px;
        }

        span {
          font-size: 44px;
          color: #333333;
          font-weight: 700;
        }
      }
    }

    .right {
      flex: 2;
      display: flex;
      flex-direction: column;
      border: 1px solid #dcdcdc;
      padding: 34px 40px;

      .title {
        font-size: 0.88rem;
        font-weight: 600;
        color: #333;
        margin-bottom: 50px;
      }

      .content {
        flex: 1;
        overflow: auto;
      }

      .topic-detail {
        height: calc(100% - 94px);
        overflow: auto;
      }

      .info-item {
        display: flex;
        padding-bottom: 40px;

        .name {
          min-width: 180px;
          text-align: right;
          padding-right: 50px;
          font-size: 40px;
          color: #333333;
        }

        .val {
          flex: 1;
          font-size: 40px;
          color: #666666;

          .file-item {
            display: block;
            margin-bottom: 30px;
          }

          .file-icon {
            display: inline-block;
            width: 30px;
            height: 40px;
            background-size: 100% 100%;
            vertical-align: text-top;
          }
        }
      }
    }
  }
}
</style>
