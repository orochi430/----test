<template>
  <div ref="meetingInfoContainer" class="meeting-info-container">
    <div ref="meetingInfoInner" class="meeting-info-inner">
      <div class="info-item">
        <span class="name">会议名称</span>
        <span class="val">{{ title }}</span>
      </div>
      <div class="info-item">
        <span class="name">会议地点</span>
        <span class="val">{{ address }}</span>
      </div>
      <div class="info-item">
        <span class="name">主持人</span>
        <span class="val">{{ host }}</span>
      </div>
      <div class="info-item">
        <span class="name">开始时间</span>
        <span class="val">{{ startTime }}</span>
      </div>
      <div class="info-item">
        <span class="name">结束时间</span>
        <span class="val">{{ endTime }} </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    meeting: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      title: "",
      address: "",
      host: "",
      startTime: "",
      endTime: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //日期格式化
    dateFormat: function(val) {
      if (!val) return "";
      let str = dsf.date.format(val, "yyyy-mm-dd hh:ii");
      return str;
    },
    getData(item) {
      dsf.http
        .post(`fn/conferenceMobile/meetingInfo`, {
          meetingId: (item && item.id) || this.meeting.id
        })
        .done(result => {
          if (result.code == 200 && result.data) {
            this.title = result.data.title;
            this.address = result.data.address;
            this.host = result.data.moderator;
            this.startTime = this.dateFormat(result.data.startDateTime);
            this.endTime = this.dateFormat(result.data.endDateTime);
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
.meeting-info-container {
  height: 100%;
  font-size: 40px;
  color: #333333;

  .info-item {
    display: flex;
    margin-top: 26px;
    align-items: center;

    &:first-child {
      margin-top: 0;
    }

    .name {
      width: 272px;
      text-align: right;
      padding-right: 40px;
    }

    .val {
      flex: 1;
      align-items: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 650px;
    }
  }

  ::v-deep .el-date-editor {
    width: 8.6rem;
    margin-left: 0.6rem;
    .el-input__inner {
      line-height: 1.6rem;
      height: 1.6rem;
    }
    .el-input__icon {
      line-height: 1.6rem;
    }
  }
}
</style>
