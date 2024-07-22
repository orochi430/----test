<template>
  <commonempty v-if="dirs.length == 0" description="暂无数据" />
  <div v-else class="dir-contanier">
    <div v-for="(item, idx) in dirs" :key="idx" class="dir" @click="go(item)">
      {{ item.name }}<span>（{{ item.fileCount }}）</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dirs: [],
      folderId: this.$route.params.folderId,
      meetingId: this.$route.params.meetingId
    };
  },
  created() {
    this.getDirs();
  },
  methods: {
    getDirs() {
      let self = this;
      dsf.http
        .post("fn/sdycMeeting/files", {
          meetingId: self.meetingId,
          id: self.folderId
        })
        .done(res => {
          if (res.type == "success") {
            self.dirs = res.data.filter(item => item.fileType == "1");
          }
        })
        .error(error => {
          console.log("fileDetails-error", error);
        })
        .always(() => {
          // dsf.layer.closeLoading(self.loading);
        });
    },
    go(item) {
      let self = this;
      self.$router.push({
        path: `/SDYCConferenceFile/${self.meetingId}/${item.id}`,
        query: { title: item.name }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.dir-contanier {
  margin-top: 16px;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 16px;
  .dir {
    width: 48%;
    background-color: #f7f7f7;
    text-align: center;
    margin-bottom: 16px;
    padding: 16px;
    border-radius: 6px;
  }
}
</style>
