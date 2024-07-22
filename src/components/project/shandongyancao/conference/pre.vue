<template>
  <div class="contaniner">
    <commonempty
      v-if="errored"
      image="error"
      description="数据获取失败，请稍后重试"
    />
    <commonempty
      v-else-if="meetings.length == 0"
      description="您近期无会议安排"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: null,
      errored: false,
      meetings: []
    };
  },
  created() {
    let self = this;
    self.init();
  },
  methods: {
    init() {
      let self = this;
      self.loading = dsf.layer.loading();
      dsf.http
        .get(`fn/sdycMeeting/meetingInfo`)
        .done(res => {
          if (res.type == "success") {
            if (res.data.length > 0) {
              self.meetings = res.data;
              let meeting = self.meetings[0];
              if (!meeting.edPolicy)
                meeting.edPolicy = `本人承诺提交信息的真实性，如因不实信息引起疫情传播和扩散，本人愿意承担由此带来的全部法律责任。`;
              dsf.util.saveToSessionStore("meeting", meeting);
              if (meeting.edpk) {
                self.$router.replace(`SDYCConferenceIndex/${meeting.id}`);
              } else {
                self.$router.replace("SDYCConferenceED");
              }
            }
          } else {
            self.errored = true;
          }
        })
        .error(error => {
          self.errored = true;
          console.log("meetingInfo-error", error);
        })
        .always(() => {
          dsf.layer.closeLoading(self.loading);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.contaniner {
  .van-empty {
    height: 60vh;
  }
}
</style>
