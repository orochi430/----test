<template>
  <div class="meeting-detail">
    <div class="meeting-title">
      <div class="van-multi-ellipsis--l2">会议标题会会议标题会议标题会议标议标题会议标题会议标题标题会议标题会议标题会议标题会议标题会议标题</div>
    </div>
    <div class="tab-list">
      <div>未读4人</div>
      <div>报名4人</div>
      <div>请假4人</div>
      <div class="go-list" @click="goCrew()">
        <i class="iconfont iconjiantou" />
      </div>
    </div>
    <div class="meet-desc">
      <div class="time">
        <i class="iconfont iconshijian" />
        <div>05-04到05-09</div>
      </div>
      <div class="address">
        <i class="iconfont icondidian" />
        <div>综合楼A308教室</div>
      </div>
    </div>
    <div class="file-list">
      <div class="list-item">
        <i class="iconfont iconfujian" />
        <div class="van-ellipsis">附件名称.docx</div>
      </div>
      <div class="list-item">
        <i class="iconfont iconfujian" />
        <div class="van-ellipsis">附件名称附件名称附件名称附件名称附件名称附件名称附件名称附件名称.docx</div>
      </div>
      <div class="list-item">
        <i class="iconfont iconfujian" />
        <div class="van-ellipsis">附件名称.docx</div>
      </div>
    </div>
    <div class="btn-bar"></div>
  </div>
</template>

<script>
export default {
  name: "MeetingDetail",
  components: {},
  data: function() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    goCrew() {
      //此处0 表示会议未开始 1表示开始
      this.$router.push({
        path: `/meetingcrew/${0}`
      });
    }
  }
};
</script>

<style>
</style>