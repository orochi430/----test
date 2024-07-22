<template>
  <div class="meeting-crew">
    <van-tabs :swipeable="true">
      <van-tab v-for="(item,inx) in tablist" :title="item.name" :key="inx">
        <People-List :tabParams="item.name" />
      </van-tab>
    </van-tabs>
    <div class="btn-bar"></div>
  </div>
</template>

<script>
import PeopleList from "./PeopleList";
export default {
  name: "MeetingCrew",
  components: {
    PeopleList
  },
  props: {},
  data: function() {
    return {
      tabListMode1: [
        { name: "参会人员" },
        { name: "已报名" },
        { name: "未报名" },
        { name: "请假" },
        { name: "未读" }
      ],
      tabListMode2: [
        { name: "参会人员" },
        { name: "已签到" },
        { name: "未签到" },
        { name: "请假" }
      ],
      tablist: []
    };
  },
  created() {
    console.log(this.$route.params.status);
    this.$route.params.status == 0
      ? (this.tablist = this.tabListMode1)
      : (this.tablist = this.tabListMode2);
  },
  mounted() {},
  methods: {}
};
</script>

<style>
</style>