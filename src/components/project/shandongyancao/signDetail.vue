<template>
  <div class="signDetail">
    <van-tabs v-model="active" @change="changeTab">
      <van-tab
        :title="item.typeName + '(' + item.count + ')'"
        v-for="(item, index) in tabs"
        :key="index"
        :name="item.type"
      ></van-tab>
    </van-tabs>
    <van-search v-model="value" placeholder="搜索一下" @search="onSearch" />
    <div class="userLists" :class="{ noHeader: $store.state.isShowAppHeader }">
      <div class="users" v-for="(item, index) in data" :key="index">
        <div class="title" @click="openDrop(index)">
          <div class="name">{{ item.unitName }}</div>
          <van-icon :class="{ active: item.show }" name="arrow-down" />
        </div>
        <div class="lists" v-if="!item.show">
          <div
            class="userlist"
            v-for="(user, i) in item.users"
            :key="'user' + i"
          >
            <div class="imgs">
              <img
                :src="
                  dsf.url.getWebPath(
                    '/fn/file/downloadImage?fileName=' + user.img
                  )
                "
                :onerror="default_avatar"
              />
            </div>
            <div class="msgs">
              <p>
                <span>{{ user.name }}</span>
                <van-icon name="arrow" />
              </p>
              <p v-if="user.singValue == '1'">
                <span>{{ user.time }}</span>
                <span>签到</span>
              </p>
            </div>
            <div class="right" :class="{ yqd: user.singValue == '1' }">
              {{ user.singText }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SDYCSignDetail",
  components: {},
  data() {
    return {
      active: -1,
      value: "",
      data: [],
      tabs: [],
      id: this.$route.params.id,
      fid: this.$route.query.fid,
      default_avatar:
        'this.src="' +
        require("static/images/EnterpriseServices/default-avatar.png") +
        '"'
    };
  },
  computed: {},
  watch: {},
  methods: {
    openDrop(index) {
      if (this.data[index].show) {
        this.$set(this.data[index], "show", false);
      } else {
        this.$set(this.data[index], "show", true);
      }
    },
    loadData() {
      let that = this;
      this.data = [];
      this.$toast.loading("加载中");
      dsf.http
        .post("/fn/sdycMeeting/signInDetails", {
          meetingId: this.fid,
          scheduleId: this.id,
          type: this.active,
          query_key: this.value
        })
        .then(res => {
          console.log(res);
          that.$toast.clear();
          if (res && res.data && res.data.code == 200) {
            that.data = res.data.data;
          }
        });
    },
    loadSignInTabs() {
      let that = this;
      this.data = [];
      this.$toast.loading("加载中");
      dsf.http
        .post("/fn/sdycMeeting/signInTabs", {
          meetingId: this.fid,
          scheduleId: this.id
        })
        .then(res => {
          console.log(res);
          that.$toast.clear();
          if (res && res.data && res.data.code == 200) {
            that.tabs = res.data.data;
          }
        });
    },
    onSearch() {
      if (!this.value) {
        return;
      }
      this.loadData();
    },
    changeTab(name, title) {
      this.active = name;
      this.value = "";
      this.loadData();
    }
  },
  created() {
    this.loadSignInTabs();
    this.loadData();
  },
  mounted() {},
  destroyed() {}
};
</script>

<style lang="scss" scoped>
.signDetail {
  height: 100%;
  width: 100%;

  .userLists {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 95px;
    background: #fff;
    overflow-y: auto;

    &.noHeader {
      top: 142px;
    }

    .users {
      width: 100%;
      height: auto;
      overflow: hidden;

      .title {
        width: 100%;
        height: 35px;
        background: #ecf7f4;
        box-sizing: border-box;
        padding: 0 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #ebebeb;

        .name {
          font-size: 15px;
          color: #333333;
          font-family: "Alibaba-PuHuiTi-Regular";
        }

        .van-icon {
          font-size: var(--font_size_2);
          color: #999999;
          transition: all linear 0.2s;

          &.active {
            transform: rotate(-90deg);
          }
        }
      }

      .lists {
        width: 100%;
        height: auto;

        .userlist {
          width: 100%;
          height: auto;
          padding: 15px 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .imgs {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .msgs {
            flex: 1;
            margin-left: 12px;
            height: 100%;
            display: flex;
            flex-direction: column;

            & > p:nth-child(1) {
              display: flex;
              align-items: center;

              span {
                font-size: 15px;
                color: #333333;
                font-family: "Alibaba-PuHuiTi-Medium";
              }

              .van-icon {
                font-size: var(--font_size_3);
                color: #999999;
                margin-left: 10px;
              }
            }

            & > p:nth-child(2) {
              display: flex;
              align-items: center;
              height: 18px;
              margin-top: 5px;

              & > span:first-child {
                color: #03b98b;
                font-size: var(--font_size_3);
                height: 18px;
                display: flex;
                align-items: center;
              }

              & > span:last-child {
                color: #666666;
                font-size: var(--font_size_4);
                margin-left: 10px;
                height: 18px;
                display: flex;
                align-items: center;
              }
            }
          }

          .right {
            flex-shrink: 0;
            font-size: var(--font_size_3);
            color: #ff6200;

            &.yqd {
              color: #03b98b;
            }
          }
        }
      }
    }
  }
}
</style>
