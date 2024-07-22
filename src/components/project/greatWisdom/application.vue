<template>
  <!-- 智慧人大应用页 -->
  <div class="wisdom_application">
    <!-- 头部 -->
    <img src="static/images/greatWisdom/application_bg.png" alt="" />

    <div class="body_content">
      <div class="header">
        <p class="user">
          <img src="static/images/greatWisdom/head_icon.png" alt="" />
          <span>早上好！{{ $user.name }}同志</span>
        </p>
        <p class="meeting">
          <span>{{ current_session.name }}</span>
          <img
            src="static/images/greatWisdom/application_exchange.png"
            alt=""
            @click="changeSession"
          />
        </p>
      </div>

      <!-- 内容部 -->
      <div class="contents">
        <div class="notice">
          <span class="notice_word">温馨提示</span>
          <p>
            <!-- <span class="notice_title">{{ notice_list }}</span> -->
            <van-notice-bar :text="notice_list" />
            <!-- <marquee behavior="scroll" direction="left" scrollamount="1">
              {{ notice_list }}
            </marquee> -->
          </p>
        </div>
        <div class="application">
          <div
            v-for="items in application_list"
            :key="items.menuType"
            class="single_item"
            @click="skipModule(items)"
          >
            <img
              :src="items.shortcutIcon"
              alt=""
              @error="$event.target.src = 'static/squMenu/menuNew/dywj.png'"
            />
            <span>{{ items.shortcutName }}</span>
          </div>

          <van-loading
            v-if="!application_error && !application_list.length"
            type="spinner"
            color="#1989fa"
            style="margin: auto;"
          />
        </div>
      </div>
    </div>

    <!-- 届次选择器 -->
    <van-popup v-model="show_session" round position="bottom">
      <van-picker
        :columns="session_column"
        show-toolbar
        @cancel="show_session = false"
        @confirm="sessionConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'wisdom_application',
  props: {
    bottom_active: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      application_list: [],
      notice_list: '--',
      current_session: {}, //当前届次
      show_session: false, //是否显示届次选择
      session_column: [],
      application_error: false,
    }
  },
  watch: {
    bottom_active(newV, oldV) {
      if (newV == 'application') {
        this.createdQuest()
      }
    },
  },
  created() {
    this.createdQuest()
  },
  mounted() {
    this.$nextTick(() => {
      this.isSkipControl()
    })
  },
  activated() {
    this.createdQuest()
  },
  methods: {
    createdQuest() {
      this.getSession() //获取届次
      this.getNotice() //获取温馨提示
    },
    isSkipControl() {
      //是否有疫情防控弹框，跳转疫情防控
      dsf.http
        .get('action?EpidemicAppAction=9', {
          userId: dsf.util.loadSessionStore('user').user_id,
        })
        .then((res) => {
          let data = res.data
          if (data.code == 200) {
            if (data.data) {
              this.$dialog
                .confirm({
                  title: '提示',
                  message: data.message,
                  confirmButtonText: '去处理',
                  confirmButtonColor: '#DA1C21',
                  cancelButtonText: '忽略',
                  cancelButtonColor: '#999',
                })
                .then(() => {
                  this.$router.push({
                    path: '/situationControl',
                    query: {},
                  })
                })
                .catch(() => {})
            }
          }
        })
    },
    getSession() {
      //获取届次
      dsf.http
        .get(
          'action?peoplesCongressInterfaceAction=2',
          {},
          {
            headers: { userId: dsf.util.loadSessionStore('user').user_id },
          },
        )
        .then((res) => {
          let data = res.data
          if (data.code == 200) {
            this.session_list = data.data
            this.session_column = []
            data.data.forEach((ele) => {
              this.session_column.push(ele.name)
            })
            if (dsf.util.loadSessionStore('current_session')) {
              this.current_session = dsf.util.loadSessionStore(
                'current_session',
              )
            } else {
              let i = this.session_list.length - 1
              this.current_session = this.session_list[i]
              dsf.util.saveToSessionStore(
                'current_session',
                this.current_session,
              )
            }
            this.getApplication() //获取应用内容
          }
        })
    },
    changeSession() {
      this.show_session = true
    },
    sessionConfirm(value) {
      //届次确认
      let temp = this.session_list.filter((ele) => {
        return ele.name == value
      })
      this.current_session = temp[0]
      dsf.util.saveToSessionStore('current_session', this.current_session)
      this.getApplication() //获取应用内容
      console.log(value, this.current_session, this.session_list)
      this.show_session = false
    },
    getNotice() {
      //温馨提示
      dsf.http
        .get('action?EpidemicAppAction=13&moduleType=4', {})
        .then((res) => {
          console.log(res)
          this.notice_list = res.data.content
        })
    },
    getApplication() {
      this.application_error = false
      dsf.http
        .get('action?peoplesCongressInterfaceAction=3', {
          type: this.current_session.type,
        })
        .then((res) => {
          let data = res.data
          if (data.code == 200) {
            this.application_list = data.data[0].children
          } else {
            this.application_error = true
            dsf.layer.alert(
              {
                title: '温馨提示',
                message: data.message,
              },
              () => {
                this.$router.back()
              },
            )
          }
        })
    },
    skipModule(item) {
      //跳转模块

      this.$router.push({
        path: item.actUrl,
        query: {
          jc: this.current_session.type,
          menuType: item.menuType,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.wisdom_application {
  height: calc(100vh - 1rem);
  position: relative;
  background: #efefef;
}
.van-notice-bar {
  width: 100%;
  background: transparent;
}
.body_content {
  position: absolute;
  padding: 0 15px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  top: 40px;
  height: calc(100% - 40px);
}
.header {
  color: #fff;
  padding: 0 5px;
  .user {
    display: flex;
    align-items: center;
    img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
    span {
      font-size: var(--font_size_2);
    }
  }
  .meeting {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 16px 0 18px;
    height: 50px;
    span {
      font-size: 18px;
      color: #ffffff;
      letter-spacing: 0;
      font-weight: 500;
      width: 290px;
    }
    img {
      width: 24px;
      height: 24px;
    }
  }
}
.contents {
  height: calc(100% - 30px - 50px - 34px);
  .notice {
    background-image: linear-gradient(180deg, #fee6e7 0%, #ffffff 100%);
    border: 1px solid rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 13px 0px rgba(171, 177, 182, 0.12);
    border-radius: 8px;
    padding: 0px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 46px;
    .notice_word {
      width: 40px;
      display: inline-block;
      display: inline-block;
      color: #d81b20;
      font-style: oblique;
      font-weight: 700;
    }
    p {
      font-size: var(--font_size_3);
      color: #666;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: calc(100% - 50px);
    }
    .notice_title {
      display: inline-block;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 90%;
      overflow: hidden;
    }
  }

  .application {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0 15px;
    height: calc(100% - 46px - 25px);
    background: #fff;
    overflow-y: auto;
    border: 1px solid rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 13px 0px rgba(171, 177, 182, 0.12);
    border-radius: 8px;
    display: flex;
    flex-wrap: wrap;
    padding: 25px 15px 5px;
    display: flex;
    flex-wrap: wrap;
    .single_item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
      width: 33.3%;
      span {
        font-size: var(--font_size_3);
        color: #333333;
        line-height: 36px;
        font-weight: 400;
      }
    }
    img {
      width: 46px;
      height: 46px;
      margin-bottom: 8px;
    }
  }
}
</style>
