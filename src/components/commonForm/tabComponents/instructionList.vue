<template>
  <div class="instruction-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="pushContainer">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
        <div class="instruction-item" v-for="(item, idex) in list" :key="idex">
          <van-row class="instruction-data-header">
            <van-col class="instruction-header-col">{{ item.leaderNameText }}批示:</van-col>
          </van-row>
          <van-row class="instruction-data-item">
            <van-col class="instruction-col">{{ item.postilContent }}</van-col>
          </van-row>
        </div>
        <commonempty v-if="noRecord" description="暂无记录" />
      </van-list>
    </van-pull-refresh>
    <div class="stickyContainer">
      <van-button type="primary" v-if="showPSBtn" block @click="showOpinion()">批示</van-button>
    </div>
    <van-popup v-model="showOpinionPopup" position="bottom" get-container="#app" round>
      <van-nav-bar title="填写批示" left-text="取消" @click-left="hiddenPopup()">
      </van-nav-bar>
      <van-cell-group class="_file">
        <van-field class="psInput" ref="editOpinion" :error-message="errorMessage" v-model="opinionValue"
          type="textarea" rows="10" autofocus autosize placeholder="请输入批示" />
      </van-cell-group>
      <div style="text-align: center;width:90%;margin:0 auto;padding-bottom:10px;">
        <debounce-click>
          <van-button type="primary" block @click="sumbmitOpinion()">确定</van-button>
        </debounce-click>
      </div>
    </van-popup>
  </div>
</template>
<script>
// -- 获取要情批示
// ctr/sx/schedule/showScheduleYqPS
// 参数：pk

// -- 添加批示接口
// ctrl/sx/schedule/mobileAddScheduleYqPs
// 参数
// fid
// content

// ctrl/sx/schedule/showScheduleYqPS
// 参数
// pk  - 要情pk
// userId -- 用户ID

import DebounceClick from "@/components/common/debounceClick.jsx";
export default {
  name: "instructionList",
  components: {
    DebounceClick,
  },
  props: ["formData", "formMeta"],
  data() {
    return {
      active: 0,
      showOpinionPopup: false,
      showPSBtn: dsf.util.loadSessionStore("user").privileges.findIndex(item => { return item.name == "移动批示" }) > -1,// ,
      opinionValue: "",
      errorMessage: "",
      noRecord: false,
      loading: false,
      finished: false,
      refreshing: false,
      start: 0,
      startindex: 0,
      limit: 10,
      list: [],
      user: dsf.util.loadSessionStore("user"),
      Interval: ""
    };
  },
  created() {
    let self = this;
    dsf.http.post("fn/sx/schedule/addViewLog", {
      pk: this.formMeta.parameters.pk,
      type: "yqps",
      userId: this.user.user_id,
      userName: this.user.name,
    })
      .then((res) => {
        if (res.data.type == "success") {
          console.log("批示添加访问记录")
          self.$bus.emit("emitPs", { pk: self.formMeta.parameters.pk });
          // self.$eventBus.refresh(self);
        }
      });
    this.getViewLog()
    this.Interval = setInterval(()=>{this.getViewLog()},10000)
  },
  beforeDestroy() {
    clearInterval(this.Interval)
  },
  methods: {
    getViewLog() {
      dsf.http.post('fn/sx/schedule/showScheduleYqPS', {
        start: 0,
        limit: (this.startindex + 1) * this.limit,
        pk: this.formMeta.parameters.pk
      }).then((res) => {
        if (!res.data || res.data.data.length == 0) {
          this.finished = true;
          clearInterval(this.Interval)
        } else {
          this.list = res.data.data
        }
      })
    },
    postDataHandle() {
      let self = this;
      let params = {
        start: self.start,
        limit: self.limit,
        pk: self.formMeta.parameters.pk,
      };
      dsf.http
        .post("fn/sx/schedule/showScheduleYqPS", params)
        .then((res) => {

          if (!res) {
            return;
          }

          if (self.refreshing) {
            self.list = [];
            self.refreshing = false;
          }


          if (res.data.type == "success") {
            if (self.list.length > 0) {
              self.list = [...self.list, ...res.data.data];
            } else {
              self.list = res.data.data;
            }
          } else {
            self.dsf.layer.toast(res.message);
          }
          self.loading = false;
          if (!res.data || res.data.data.length == 0) {
            self.finished = true;
            return;
          }
        })
        .catch((res) => {
          self.dsf.layer.toast(res.message);
        })
        .finally(() => { });
    },
    onLoad() {
      let self = this;
      this.startindex++;
      this.start = this.startindex * this.limit;
      self.postDataHandle();
    },
    initData() {
      this.finished = false;
      this.loading = true;
      this.start = 0;
      this.startindex = -1;
      this.list = [];
      this.onLoad();
    },
    onRefresh() {
      this.initData();
    },
    hiddenPopup() {
      this.showOpinionPopup = false;
    },
    showOpinion() {
      //先加载之前提交的批示
      let self = this;
      self.showOpinionPopup = true;

      dsf.http
        .post("fn/sx/schedule/showScheduleYqPS", {
          pk: self.formMeta.parameters.pk,
          userId: self.user.user_id,
        })
        .then((res) => {
          self.opinionValue = "";
          if (res.data.type == "success") {
            self.opinionValue = res.data.data[0].content;
          }
        });
    },
    /***
      * --添加要情批示
        ctrl/sx/schedule/mobileAddScheduleYqPs
        fid-要情ID
        content-- 批示内容
      */
    sumbmitOpinion() {
      let self = this;
      if (!self.opinionValue || self.opinionValue == "") {
        dsf.layer.toast("请输入批示内容");
        return;
      }
      dsf.layer.loading("提交中");
      dsf.http
        .post("fn/sx/schedule/mobileAddScheduleYqPs", {
          fid: self.formMeta.parameters.pk,
          content: self.opinionValue,
          userId: self.user.user_id,
          userName: self.user.name,
        })
        .then((res) => {
          if (res.data.type == "success") {
            self.showOpinionPopup = false;
            setTimeout(() => {
              dsf.layer.toast("提交成功");
            }, 500)
            self.initData();
          } else {
            self.dsf.layer.toast(res.data.message, false);
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.psInput {

  >>>textarea,
  textarea:focus {
    font-size: var(--font_size_2) !important;
  }
}

.instruction-list {
  background-color: white;
  height: 100%;

  /* display: flex;
  flex: 1;
  flex-direction: column; */
  .pushContainer {
    padding: 0 0.32rem 54px;
    background-color: white;
  }

  .stickyContainer {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: white;
    width: 100%;
    padding: 0 10px 10px;
  }

  .instruction-item {
    padding-top: 10px;

    .instruction-header {
      line-height: 1rem;
    }

    .instruction-data-header {
      color: #1989fa;

      // background-color: #d4d4d4;
      // border: 1px solid #d5d5d5;
      >>>.instruction-header-col {
        text-align: center;
        font-size: var(--font_size_3);
        line-height: 0.5rem;
      }
    }

    .instruction-data-item {
      // border-left: 1px solid #d5d5d5;
      // border-right: 1px solid #d5d5d5;
      border-bottom: 1px solid #d5d5d5;

      >>>.instruction-col {
        text-align: left;
        font-size: var(--font_size_2);
        line-height: 0.5rem;
        padding-bottom: 5px;
        table-layout: fixed;
        word-wrap: break-all;
        word-break: break-all;
      }
    }
  }
}
</style>
