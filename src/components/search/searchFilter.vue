<template>
  <div class="ds-search-filter">
    <div class="_type">
      <h2 class="ds_font3">按类型</h2>
      <ul>
        <li v-for="(item, index) in search.type" :key="index" class="ds_font6"> {{ item.name }} </li>
      </ul>
    </div>
    <div class="_liuzhuan">
      <h2 class="ds_font3">按流转状态</h2>
      <ul>
        <li v-for="(item, index) in search.liuzhuan" :key="index" class="ds_font6"> {{ item.name }} </li>
      </ul>
    </div>
    <div class="_jieguo">
      <h2 class="ds_font3">按结果</h2>
      <ul>
        <li v-for="(item, index) in search.jieguo" :key="index" class="ds_font6"> {{ item.name }} </li>
      </ul>
    </div>
    <div class="_yueban">
      <h2 class="ds_font3">按阅办状态</h2>
      <ul>
        <li v-for="(item, index) in search.yueban" :key="index" class="ds_font6"> {{ item.name }} </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchFilter",
  data() {
    return {
      search: {
        type: [
          { name: "收文" },
          { name: "发文" },
          { name: "签报" },
          { name: "用车" },
          { name: "收文" },
          { name: "发文" },
          { name: "签报" },
          { name: "用车" }
        ],
        liuzhuan: [
          { name: "未开始" },
          { name: "进行中" },
          { name: "已起阅" },
          { name: "已结束" }
        ],
        jieguo: [
          { name: "已签发" },
          { name: "未签发" },
          { name: "有领导批示" },
          { name: "未领导批示" }
        ],
        yueban: [{ name: "阅件" }, { name: "办件" }]
      }
    };
  },
  mounted() {
    let _this = this;
    // this.dsf.http
    //   .get("wfm/getWFDefinition", {
    //     sID: "5b2d48d830c44b509d4fa730fa9d0b9b"
    //   })
    //   .done(res => {
    //     console.log("done==>", res);
    //     _this.dsf.layer.toast("模拟Get请求成功", true);
    //   })
    //   .error(err => {
    //     console.log("失败==>", err);
    //     _this.dsf.layer.toast("模拟Get请求失败", false);
    //   })
    //   .always(res => {
    //     console.log("always==>", res);
    //   });
  },
  methods: {}
};
</script>

<style scoped lang="scss">
// @import "../../assets/font/font.css";
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";
.ds-search-filter {
  padding: 23px 8px 23px 15px;
  @include background-theme("button_auxiliary_bgcolor");
  min-height: 570px;
  h2 {
    margin-bottom: 15px;
  }
  ul {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
      width: 80px;
      height: 33px;
      background: $bg_color;
      border-radius: 8px;
      color: $fontColor_main;
      margin-bottom: 10px;
      cursor: pointer;
      &:hover {
        @include font-theme("normal", true);
      }
    }
  }
}
</style>
