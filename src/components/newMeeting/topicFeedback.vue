<template>
  <div class="meetEnter" v-if="flag">
    <van-tabs v-model="active" color="#0075CD">
      <van-tab :title="`全部（${yfk + wfk}）`"></van-tab>
      <van-tab :title="`未反馈（${wfk}）`"></van-tab>
      <van-tab :title="`已反馈（${yfk}）`"></van-tab>
    </van-tabs>
    <div class="content" v-if="List.length > 0">
      <div class="card" v-for="(item, i) in List" :key="i">
        <div class="title">
          <van-checkbox
            v-if="active < 2"
            @change="checkChange(item)"
            icon-size="14px"
            v-model="item.checked"
            shape="square"
          ></van-checkbox>
          <div class="topic" @click="infoClick(item)">
            <img src="../../assets/imgs/hy-dept.png" alt="" />
            <span>{{ item.deptName }} </span>
            <label for="" :class="{ active: item.statusName != '未上报' }">{{
              item.statusName == "未上报"
                ? "未反馈"
                : item.statusName == "已上报"
                ? "已反馈"
                : item.statusName
            }}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="content" v-else>
      <commonempty
        :image="require('static/images/peopleCongress/img_hyap.png')"
        class="meeting-empty"
        description="暂无反馈情况"
      />
    </div>

    <div class="footer" v-if="active < 2">
      <button @click="btn1Click(1)" class="btn1">
        {{ checkAll ? "全选" : "全不选" }}
      </button>
      <button @click="btn1Click(2)" class="btn2">催办</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "topicFeedback",

  components: {},
  data() {
    return {
      active: 0,
      yfk: 0,
      wfk: 0,
      List: [],
      flag: false,
      checkAll: true,
    };
  },
  computed: {},
  watch: {
    active(val) {
      this.getData();
    },
  },
  methods: {
    infoClick(data) {
      if (data.status == -1) {
        return;
      }
      this.$router.push({
        path: `/commonList/210811150517FCnrNOnLfIKfGy2od3e/210607181937YJxUC5fve4y7q3SH5hJ`,
        query: {
          secQuery: `{"masterId": "${this.$route.query.pk}","fillDept":"${data.deptId}"}`,
        },
      });
    },
    checkChange(data) {
      let item = this.List.find((item) => {
        return item.status == -1 && !item.checked;
      });
      if (item) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },
    btn1Click(types) {
      let ids = "";
      let flag = false;
      if (types == 2) {
        this.List.forEach((item, index) => {
          if (item.checked) {
            if (item.statusName == "已上报") {
              flag = true;
            }
            if (ids == "") ids += item.id;
            else ids += "," + item.id;
          }
        });
        if (flag) {
          dsf.layer.toast("存在已上报人员，请重新选择");
          return;
        }
        if (!ids) {
          dsf.layer.toast("请至少选择一个部门");
          return;
        }
      } else {
        // this.List.forEach((item, index) => {
        //     if (item.status == -1) {
        //         if (ids == '') ids += item.id;
        //         else ids += "," + item.id;
        //     }
        // });
        // if (!ids) {
        //     dsf.layer.toast("当前无可催办部门");
        //     return
        // }

        this.List.forEach((item) => {
          if (item.status == -1) {
            item.checked = this.checkAll ? true : false;
          }
        });
        this.checkAll = false;
        return;
      }
      dsf.http
        .post("fn/meetingTopic/urgeRemindYtzx", {
          solicitId: this.$route.query.pk,
          type: types,
          fillTopicIds: ids,
        })
        .done((res) => {
          if (res.code == "200") {
            dsf.layer.toast(res.message);
          } else {
            dsf.layer.toast(res.message);
          }
        });
    },
    getNum(params) {
      dsf.http
        .post("/fn/meetingTopic/getTopicSolicitFeedbackData", {
          solicitId: this.$route.query.pk,
          type: params == 1 ? "wfk" : "yfk",
        })
        .done((res) => {
          if (res.code == "200") {
            if (params == 1) this.wfk = res.data.length;
            else this.yfk = res.data.length;
          } else {
            dsf.layer.toast(res.message);
          }
        });
    },
    getData() {
      var that = this;
      dsf.http
        .post("/fn/meetingTopic/getTopicSolicitFeedbackData", {
          solicitId: this.$route.query.pk,
          type: this.active == 0 ? "all" : this.active == 1 ? "wfk" : "yfk",
        })
        .done((res) => {
          if (res.code == "200") {
            if (res.data) {
              this.List = [];
              res.data.forEach((item) => {
                this.$set(item, "checked", false);
              });
              that.List = res.data;
              that.flag = true;
            }
          } else {
            dsf.layer.toast(res.message);
          }
        });
    },
  },
  created() {},
  mounted() {
    let that = this;
    this.$nextTick(() => {
      that.getData();
      that.getNum(1);
      that.getNum(2);
    });
  },
  destroyed() {},
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.van-tabs {
  /* position: fixed;
  left: 0;
  right: 0;
  top: 46px; */
  /* z-index: 1000 !important; */
}

.van-tabs{
  height: 46px;
  ::v-deep .van-tabs__wrap{
    height: 100%;
    .van-tab {
      // @include border-color-theme("normal", true);
      // @include font-theme("normal", true);
      color: #666666;
      font-size: 15px;

      &.van-tab--active {
        // @include background-theme("normal", true);
        // color: #fff !important;
        @include font-theme("normal", true);
        font-weight: 500;
      }
    }
  }
}

.content {
  position: absolute;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px 10px 64px;
  overflow: auto;
  background: #F9F9F9;

  .card {
    margin-bottom: 10px;
    padding: 15px 10px;
    width: 100%;
    background: #ffffff;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      // margin-bottom: 5px;
      width: 100%;

      .topic {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex: 1;
        img{
          margin-left: 10px;
          width: 18px;
          height: 18px;
        }
        span {
          margin-left: 5px;
          font-size: var(--font_size_2);
          color: #333333;
          line-height: 24px;
          flex: 1;
        }

        label {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 20px;
          background: rgba(250,100,0,0.10);
          border: 1px solid rgba(250,100,0,1);
          border-radius: 10px;
          color: #FA6400;
          font-size: var(--font_size_4);
          margin-left: 15px;

          &.active {
            color: #57BD6A;
            background: rgba(87,189,106,0.10);
            border: 1px solid rgba(87,189,106,1);
          }
        }
      }
    }
  }
}

.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 8px 10px;
  height: 60px;
  background: #ffffff;
  box-shadow: 0px -1px 3px 0px rgba(156,156,156,0.5);

  button {
    // margin: 0 7px;
    flex: 1;
    height: 44px;
    border: 1px solid rgba(51, 53, 56, 0.31);
    border-radius: 3px;
    color: #333333;
    background: #ffffff;
    font-size: 15px;
    font-weight: 500;

    &.btn2 {
      color: #fff;
      @include background-theme("normal", true);
      border: 1px solid;
      @include border-color-theme("normal", true);
      margin-left: 5px;
    }

    &.btn1{
      @include font-theme("normal", true);
      @include border-color-theme("normal", true);
      margin-right: 5px;
    }
  }
}

.van-tab__text {
  text-align: center !important;
}
</style>
