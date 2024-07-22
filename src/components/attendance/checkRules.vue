<template>
  <div class="checkRules-page">
    <div class="info">
      <div class="info-avatar">
        <img :src="avatar" :onerror="default_avatar" />
        <!-- <van-image round :src="avatar" :error-icon="require('static/images/EnterpriseServices/default-avatar.png')" /> -->
      </div>
      <div class="info-msg">
        <div class="name">{{ userName }}</div>
        <div class="group">考勤组：{{ groupName }}</div>
      </div>
    </div>
    <div class="content">
      <van-collapse v-model="activeNames">
        <van-collapse-item title="考勤时间" name="1">
          <!-- <div class="item-title">上下班时间：（法定假时间除外）</div> -->
          <div v-if="timeRule.lenth == 0">
            <div>上班时间：{{ startTime }}</div>
            <div>下班时间：{{ endTime }}</div>
          </div>
          <div v-else v-for="(item, idx) in timeRule" :key="idx">
            <div :class="['rule-box', { 'rule-item': idx }]">
              <div>上班时间：{{ item.startTime }}</div>
              <div>下班时间：{{ item.endTime }}</div>
            </div>
          </div>
          <div class="rule-item">打卡地点：{{ positioin }}</div>
          <div class="rule-item" v-if="timeRule.lenth == 0">
            提前{{ signOutStand }}分钟算早退
          </div>
          <div class="rule-item" v-else>
            提前{{ timeRule[0].signOutStand }}分钟算早退
          </div>
          <div class="rule-item" v-if="timeRule.lenth == 0">
            晚到{{ signInStand }}分钟算迟到
          </div>
          <div class="rule-item" v-else>
            晚到{{ timeRule[0].signInStand }}分钟算迟到
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: dsf.util.loadSessionStore("user").name,
      groupName:
        dsf.util.loadSessionStore("user").attndGroupName || this.getMyGroup(),
      default_avatar:
        'this.src="' +
        require("static/images/EnterpriseServices/default-avatar.png") +
        '"',
      avatar: dsf.url.getWebPath(
        `/fn/mobilePhoto/download?id=${
          dsf.util.loadSessionStore("user").user_id
        }&time=${new Date().getTime()}`
      ),
      activeNames: ["1"],
      startTime: "0:00",
      endTime: "0:00",
      signInStand: 0,
      signOutStand: 0,
      positioin: undefined,
      timeRule: []
    };
  },
  created() {
    let self = this;
    self.getRules();
  },
  mounted() {},
  methods: {
    getMyGroup() {
      let self = this;
      dsf.http
        .get(`fn/attnd/getMyGroup`)
        .done(res => {
          if (res.type == "success") {
            self.groupName = res.data.groupName;
            let user = dsf.util.loadSessionStore("user");
            if (!user.attndGroupName) {
              user.attndGroupName = res.data.groupName;
              dsf.util.saveToSessionStore("user", user);
            }
          }
        })
        .error(error => {
          console.log("getMyGroup-error", error);
          // dsf.layer.toast("数据获取失败！", false);
          // self.errored = true;
        })
        .always(() => {
          // dsf.layer.closeLoading(self.loading);
        });
    },
    getRules() {
      let self = this;
      dsf.http
        .get(`fn/attnd/getRules`)
        .done(res => {
          if (res.type == "success") {
            self.startTime = res.data.startTime;
            self.endTime = res.data.endTime;
            self.signInStand = res.data.signInStand;
            self.signOutStand = res.data.signOutStand;
            self.positioin = res.data.location;
            self.timeRule = res.data.timeRule;
          }
        })
        .error(error => {
          console.log("getRules-error", error);
          // dsf.layer.toast("数据获取失败！", false);
          // self.errored = true;
        })
        .always(() => {
          // dsf.layer.closeLoading(self.loading);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.checkRules-page {
  .info {
    background-color: #fff;
    // margin: 16px;
    padding: 16px;

    display: flex;
    justify-content: flex-start;

    &-avatar {
      width: 1rem;
      height: 1rem;
      & > img {
        border-radius: 50%;
      }
    }

    &-msg {
      // width: calc(100vw - 20vw - 1rem);
      margin: 0px 8px;

      .name {
        font-size: var(--font_size_0);
        font-weight: bold;
      }
    }
  }

  .content {
    .van-collapse-item__content {
      .rule-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      div:not(:first-child) {
        // margin-top: 12px;
      }
      .rule-item {
        margin-top: 12px;
      }

      .item-title {
        color: #323233;
      }
    }
  }
}
</style>
