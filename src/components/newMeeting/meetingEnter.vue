<template>
  <div class="meetEnter" v-if="flag">
    <van-tabs v-model="active" color="#0075CD">
      <van-tab :title="`全部(${ybm + wbm})`"></van-tab>
      <van-tab :title="`未报名(${wbm})`"></van-tab>
      <van-tab :title="`已报名(${ybm})`"></van-tab>
    </van-tabs>
    <div
      class="content"
      v-if="List.length > 0"
      :style="{ top: $store.state.isShowAppHeader ? '1.84rem' : '0.92rem' }"
    >
      <div class="card" v-for="(item, index) in List" :key="index">
        <div class="title">
          <div class="title-box">
            <i></i>{{ item.name }}
            <label for="" v-if="active == 0 && item.ybm + item.wbm > 0">（{{ item.ybm }}/{{ item.ybm + item.wbm }}）</label>
          </div>
          <!-- <van-icon v-if="item.show" name="arrow" size="20px" />
          <van-icon v-else name="arrow-down" size="20px" /> -->
          <van-switch v-model="item.show" size="20px" />
        </div>
        <ul v-if="item.show">

          <li v-for="(ele, i) in item.data" :key="i">
            <van-swipe-cell>
              <div class="list-main">
                <div class="list-top">
              <van-checkbox
                @change="checkChange(ele)"
                icon-size="14px"
                v-model="ele.checked"
                shape="square"
              ></van-checkbox>
              <div class="info" @click="infoClick(ele)">
                <img src="../../assets/imgs/hy-dept.png" alt="" v-if="item.name.includes('部门')" />
                <img src="../../assets/imgs/hy-user.png" alt="" v-else />
                <div>
                  <div>
                    <span>{{ ele.name }}</span>
                    <label
                      for=""
                      :class="{
                        YiDu: ele.statusName == '已读',
                        WeiTuo: ele.statusName == '委托他人',
                        QinJia: ele.statusName == '已请假',
                        BaoMing: ele.statusName == '已报名',
                      }"
                      >{{ ele.statusName }}</label
                    >
                  </div>
                </div>
              </div>
              </div>
              <p v-if="ele.chr || ele.wtr" class="list-text">
                {{ ele.chr ? "参会人：" + ele.chr : "委托人:" + ele.wtr }}
              </p>
              <p v-if="ele.bzValue" class="list-text">
                请假理由：{{ ele.bzValue }}
              </p>
              </div>

              <template #right>
                <van-button v-if="ele.jsStatus == '-1'&&!dsf.config.meetProjectconfig?.BGTsingUpInfo" square type="danger" text="撤回" @click="canCleClick(ele)" />
              </template>
            </van-swipe-cell>

          </li>
        </ul>
      </div>
    </div>
    <div
      class="content"
      :style="{ top: $store.state.isShowAppHeader ? '1.84rem' : '0.92rem' }"
      v-else
    >
      <commonempty
        :image="require('static/images/peopleCongress/img_hyap.png')"
        class="meeting-empty"
        description="暂无反馈情况"
      />
    </div>
    <div class="footer" v-if="!dsf.config.meetProjectconfig?.BGTsingUpInfo">
      <button v-if="active != 2" @click="btn1Click" class="btn1">
        取消通知
      </button>
      <button v-if="active != 2" @click="btn2Click" class="btn2">
        未报名提醒
      </button>
      <button v-if="active == 2&&!dsf.config.meetProjectconfig?.JAQsingUpInfo" @click="btn3Click" class="btn2">重报</button>
    </div>
    <van-action-sheet v-model="dialogShow" title="提醒">
      <textarea v-model="text" name="" id="" rows="10"></textarea>
      <van-button @click="btn4Click" type="primary">确定</van-button>
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  name: "meetingEnter",

  components: {},
  data() {
    return {
      active: 0,
      ybm: 0,
      wbm: 0,
      checked: true,
      List: [],
      dialogShow: false,
      text: `您有会议【${this.$route.query.name}】需要报名，请您尽快报名`,
      flag: false,
      // BGTconfig: true,
    };
  },
  computed: {},
  watch: {
    active(val) {
      console.log(val);
      this.$nextTick(() => {
        this.getData();
      });
    },
  },
  methods: {
    infoClick(data) {
      if (data.statusName == "未读" || data.statusName == "已读") {
        return;
      }
      if (data.remoteType == '1') {
        this.$router.push({
        path: `/commonForm/${data.moduleId}/${data.id}?listId=MeetingBmList&method=viewFkb&validateByList=1&tzlx=${data.tzlx}&remoteStatus=${data.remoteType}`,
      });
      }else{
        this.$router.push({
        path: `/commonForm/${data.moduleId}/${data.id}?listId=MeetingBmList&method=viewBmb&validateByList=1&tzlx=${data.tzlx}`,
      });
      }
    },
    checkChange(data) {
      // this.$set(data, "checked", !data.checked);
      console.log(this.List);
    },
    btn1Click() {
      let ids = "";
      this.List.forEach((item) => {
        item.data.forEach((ele, i) => {
          if (ele.checked) {
            ids == "" ? (ids += ele.id) : (ids += "," + ele.id);
            this.wbm--;
          }
        });
      });
      if (!ids) {
        dsf.layer.toast("请至少选择一个人员或部门");
        return;
      }
      console.log(ids);
      dsf.http
        .post("/fn/meetingNotice/revoke", {
          pk: ids,
        })
        .done((res) => {
          console.log(res);
          if (res.code == "200") {
            dsf.layer.toast(res.message);
            this.getData();
          } else {
            dsf.layer.toast(res.message);
          }
        });
    },
    btn2Click() {
      let ids = "";
      let flag = false;
      this.List.forEach((item) => {
        item.data.forEach((ele, i) => {
          if (ele.checked) {
            if (ele.statusName == "已报名") {
              flag = true;
            }
            ids == "" ? (ids += ele.id) : (ids += "," + ele.id);
          }
        });
      });
      if (flag) {
        dsf.layer.toast("存在已报名人员，请重新选择");
        return;
      }
      if (!ids) {
        dsf.layer.toast("请至少选择一个人员或部门");
        return;
      } else {
        this.dialogShow = !this.dialogShow;
      }
      console.log(ids);
    },
    btn3Click() {
      //重报
      let flag = false;
      this.List.forEach((item) => {
        item.data.forEach((ele) => {
          if (ele.statusName == "无需报名" && ele.checked) {
            flag = true;
          }
        });
      });
      if (flag) {
        dsf.layer.toast("无需报名人员不可重报，请重新选择");
        return;
      }
      let ids = "";
      this.List.forEach((item) => {
        item.data.forEach((ele) => {
          if (ele.checked) {
            ids == "" ? (ids += ele.id) : (ids += "," + ele.id);
            this.ybm--;
            this.wbm++;
          }
        });
      });
      if (!ids) {
        dsf.layer.toast("请至少选择一个人员");
        return;
      }
      console.log(ids);
      dsf.http
        .post("/fn/meetingNotice/backNotice", {
          pk: ids,
        })
        .done((res) => {
          console.log(res);
          if (res.code == "200") {
            dsf.layer.toast(res.message);
            this.getData();
          } else {
            dsf.layer.toast(res.message);
          }
        });
    },
    btn4Click() {
      let ids = "";
      this.List.forEach((item) => {
        item.data.forEach((ele, i) => {
          if (ele.checked) {
            ids == "" ? (ids += ele.id) : (ids += "," + ele.id);
          }
        });
      });
      if (!ids) {
        dsf.layer.toast("请至少选择一个人员或部门");
        return;
      }
      dsf.http
        .post("/fn/meetingNotice/remind", {
          pk: ids,
          content: this.text,
        })
        .done((res) => {
          console.log(res);
          if (res.code == "200") {
            dsf.layer.toast(res.message);
            this.dialogShow = !this.dialogShow;
            this.getData();
            this.List.forEach((item) => {
              item.data.forEach((ele, i) => {
                ele.checked = false;
              });
            });
          } else {
            dsf.layer.toast(res.message);
          }
        });
    },
    getData() {
      dsf.http
        .post("fn/meetingNotice/getBmDetailData", {
          noticeId: this.$route.query.pk,
          type: this.active == 0 ? "all" : this.active == 1 ? "wbm" : "ybm",
        })
        .done((res) => {
          console.log(res);
          if (this.active == 0) {
            this.ybm = 0;
            this.wbm = 0;
          }
          this.List = [];
          if (res.code == "200") {
            if (res.data) {
              this.List = res.data;
              this.List.forEach((item) => {
                this.$set(item, "show", true);
                item.data.forEach((ele) => {
                  this.$set(ele, "checked", false);
                });
                if (this.active == 0) {
                  this.ybm += item.ybm;
                  this.wbm += item.wbm;
                }
              });
              console.log(this.List);
            }
            this.flag = true;
          } else {
            dsf.layer.toast(res.message);
          }
        });
    },
    canCleClick(item){
      dsf.http
        .post("ctrl/meetingNotice/revoke", {
          pk: item.id,
        })
        .done((res) => {
          console.log(res);
          if (res.code == "200") {
            this.getData();
          } else {
            dsf.layer.toast(res.message);
          }
        });
    }
  },
  created() {},
  mounted() {
    this.getData();
    console.log(this.$route.query.name);
  },
  destroyed() {},
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

/* .van-tabs {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  z-index: 1000 !important;
} */
.van-tabs{
  height: 46px;
  ::v-deep .van-tabs__wrap{
    height: 100%;
    .van-tab {
      // @include border-color-theme("normal", true);
      // @include font-theme("normal", true);
      color: #666666;
      font-size: var(--font_size_2);

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
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px 10px 64px 10px;
  overflow: auto;

  .card {
    margin-bottom: 10px;
    // padding: 15px 15px 10px;
    width: 100%;
    // background: #ffffff;
    // box-shadow: 0 1px 20px 4px rgba(191, 191, 191, 0.26);
    // border-radius: 7px;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      width: 100%;

      // span {
      //   font-size: 18px;
      //   color: #333333;
      // }
      .title-box{
        display: flex;
        align-items: center;
        font-size: var(--font_size_1);
        color: #333333;
        font-weight: 600;
        i{
          background: #0086D9;
          border-radius: 1px;
          width: 4px;
          height: 14px;
          margin-right: 8px;
        }
      }
    }

    ul {
      width: 100%;
      background: #FFFFFF;
      border: 1px solid rgba(230,230,230,1);
      box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.08);
      border-radius: 3px;
      li {
        width: 100%;
        min-width: 0;
        box-sizing: border-box;
        border-bottom: 5px solid rgba(248,248,248,1);
        &:last-child{
          border-bottom: none;
        }
        .list-main{
          display: flex;
          flex-direction: column;
          padding: 15px 10px;
          width: 100%;
          height: 100%;
        }
        .list-top{
          display: flex;
          width: 100%;
          align-items: center;
          .van-checkbox {
            margin-top: 0;
          }

          .info {
            margin-left: 15px;
            flex: 1;
            // border-bottom: 1px solid rgba(225, 225, 225, 1);
            min-width: 0;
            display: flex;
            align-items: center;
            // min-height: 32px;

            img {
              margin-right: 10px;
              width: 21px;
              height: 21px;
            }

            > div {
              min-width: 0;
              flex: 1;

              > div {
                display: flex;
                align-items: center;
                justify-content: space-between;

                > span {
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
                  background: rgba(199,199,199,0.10);
                  border: 1px solid rgba(153,153,153,1);
                  border-radius: 10px;
                  color: #999;
                  font-size: var(--font_size_4);
                  &.YiDu {
                    color: #0086d9;
                    border: 1px solid #0086d9;
                    background: #e5f2fb;
                  }

                  &.WeiTuo {
                    color: #fa6400;
                    border: 1px solid #fa6400;
                    background: #feefe5;
                  }

                  &.QinJia {
                    color: #e30000;
                    border: 1px solid #e30000;
                    background: #feefe5;
                  }

                  &.BaoMing {
                    color: #57BD6A;
                    background: rgba(87,189,106,0.10);
                    border: 1px solid rgba(87,189,106,1);
                  }
                }
              }


            }
          }

        }

        .list-text{
          margin-top: 5px;
          color: #666666;
          font-weight: 400;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: var(--font_size_4);
          padding-left: 60px;
          box-sizing: border-box;
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

.van-action-sheet__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  textarea {
    margin-bottom: 10px;
    width: 100%;
    font-size: var(--font_size_2);
  }

  button {
    width: 80%;
  }
}
/deep/.van-button--danger{
  height: 100% !important;
}
</style>
