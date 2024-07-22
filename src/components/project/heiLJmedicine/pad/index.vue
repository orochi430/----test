<template>
  <div id="hljPad_index">
    <img src="static/images/hljMedicine/login_logo.png" alt />
    <div
      v-show="show_content && tab_active == 'service'"
      ref="indexService"
      class="index_body index_one"
    >
      <!-- 具体内容 -->
      <div class="contents">
        <div v-for="(items, i) in index_list" :key="i" class="content">
          <!-- <div v-for="(item, i2) in items" :key="i2" :class="'single_content single_content' + i"
                        :style="{ 'background-image': 'url(' + item.img + ')' }" @click="skipTo(item)">
                        <div class="word">
                            <p>{{ item.name }}</p>
                            <p v-if="item.subname" class="subname">{{ item.subname }}</p>
                            <van-button v-if="item.button" round size="normal">
                                查看
                            </van-button>
                            <span v-show="false">{{ item.badge }}</span>
                            <van-badge v-if="item.badge" :content="item.badge"></van-badge>
                        </div>
          </div>-->
          <div
            v-for="(item2, i2) in items"
            :key="i2"
            :class="'single_content single_content' + i"
            :style="{ width: item2[0].width }"
          >
            <div
              v-for="(item, i3) in item2"
              :key="i3"
              :style="{
                'background-image': 'url(' + item.img + ')',
                height: item.height,
              }"
              class="single_item"
              @click="skipTo(item)"
            >
              <div class="word">
                <p>{{ item.name }}</p>
                <p v-if="item.subname" class="subname">{{ item.subname }}</p>
                <van-button v-if="item.button" round size="normal">
                  查看
                </van-button>
                <span v-show="false">{{ item.badge }}</span>
                <van-badge v-if="item.badge" :content="item.badge"></van-badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-show="show_content && tab_active == 'school'"
      class="index_body index_school"
    >
      <!-- <iframe :src="school_url" width="100%" height="100%" style="border: 1px solid #ccc; border-radius: 6px;"
      @load="school_load = true"></iframe>-->
      <!-- <div v-if="!school_load" class="school_load">加载中...</div> -->
    </div>
    <div
      v-show="show_content && tab_active == 'mine'"
      class="index_body index_mine"
    >
      <MyInfo style="height: 100% !important;"></MyInfo>
    </div>

    <div class="test">
      <div
        v-for="(item, i) in tab_list"
        :key="i"
        :class="{ tab_item: true, tab_active: tab_active == item.active_name }"
      >
        <div
          style="height: 100%; display: inline-block; padding: 5px 0;"
          @click="tabClick(item)"
        >
          <img :src="item.img" alt />
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <van-popup v-model="sign_popup" :close-on-click-overlay="false">
      <div class="sign_popup">
        <p style="color: #666;">当前时间</p>
        <p class="time">
          {{ current_time.year }}年{{ current_time.mounth }}月{{
            current_time.day
          }}日
        </p>
        <p class="time">{{ current_time.hour }}:{{ current_time.minutes }}</p>
        <p style="color: #333;">是否{{ signstae }}</p>
        <div>
          <van-button
            color="#BFC9D6"
            style="color: #666; margin-right: 15px;"
            @click="sign_popup = false"
          >
            否
          </van-button>
          <van-button color="#3E8BEC" @click="sign()">是</van-button>
        </div>
      </div>
    </van-popup>
    <!--弹窗-->
    <div v-if="hljConfig.swiperSelect">
      <Pswiper ref="popSwiper" :hljConfig="hljConfig" />
    </div>
  </div>
</template>

<script>
import { Badge, Toast } from 'vant'
import Pswiper from './pswiper.vue'
export default {
  name: 'hljPad_index',
  components: {
    Pswiper,
    [Badge.name]: Badge,
    MyInfo: () => import('@/components/common/myInfo.vue'),
  },
  data() {
    return {
      tab_list: [],
      tab_active: 'service',
      index_list: [],
      show_content: false, //显示内容
      school_url: '', //学院链接
      school_load: false, //学院链接是否加载完成
      sign_popup: false, //签到弹出层
      current_time: {
        year: new Date().getFullYear(),
        mounth:
          new Date().getMonth() + 1 > 9
            ? new Date().getMonth() + 1
            : '0' + (new Date().getMonth() + 1),
        day:
          new Date().getDate() > 9
            ? new Date().getDate()
            : '0' + new Date().getDate(),
        hour:
          new Date().getHours() > 9
            ? new Date().getHours()
            : '0' + new Date().getHours(),
        minutes:
          new Date().getMinutes() > 9
            ? new Date().getMinutes()
            : '0' + new Date().getMinutes(),
      },
      issign: 0, //0未签到，1已签到  -1 已签退
      signstae: '签到',
      hljConfig: {},
    }
  },
  watch: {
    tab_active(newV, oldV) {
      switch (newV) {
        case 'service':
          this.getBadge({}, 'request')
          break
        default:
          break
      }
      if (newV == 'service') {
        this.getBadge({}, 'request')
      }
    },
  },
  created() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 1000,
      onClose: () => {
        this.show_content = true
      },
    })
    dsf.http.get('static/hljMedicine.json').then((res) => {
      dsf.config.hlj = res.data
      this.hljConfig = res.data
      console.log(111)
      console.log(dsf.config.hlj)
      this.tab_list = res.data.tab_list
      this.tab_active = res.data.tab_active
      this.index_list = res.data.index_list
      //   this.school_url = res.data.school_url
      let reg = /\[.*?.\]/gi //正则匹配[xxx]字符
      let list = res.data.school_url.match(reg)
      console.log(list)
      let url = res.data.school_url
      list.forEach((ele) => {
        let temp = ele.substring(1).replace(']', '')
        url = url.replace(ele, this.$user[temp])
      })
      this.school_url = url
      console.log(this.school_url, res)
      this.getBadge({}, 'request')
    })
  },
  activated() {
    this.getBadge({}, 'request')
  },
  mounted() {},
  methods: {
    tabClick(item) {
      if (item.active_name == 'school') {
        if (dsf.util.getClientName() == 'app') {
          xsfWindow.openWebView(
            {
              title: item.name,
              url: this.school_url,
              colorString: '#111111',
              show_loading: true,
              orientation: 0,
            },
            () => {},
          )
        } else {
          this.$router.push({
            name: 'dsfIframe',
            params: {
              url: this.school_url,
              title: item.name,
            },
            query: {
              url: encodeURIComponent(this.school_url),
            },
          })
        }
      } else this.tab_active = item.active_name
    },
    sign() {
      let self = this
      let postData = {
        userName: this.$user.name,
        userId: this.$user.user_id,
        state: '1',
      }
      if (self.issign == 1) {
        postData.state = '-1'
      } else if (self.issign == -1) {
        dsf.layer.toast('请勿重复操作！')
      }
      dsf.http.post('fn/mobile/sign', postData).then((data) => {
        self.sign_popup = false
        dsf.layer.toast(data.data.message)
      })
    },
    checkSign(showFuc) {
      let self = this
      dsf.http
        .post('fn/mobile/checksign', {
          userName: this.$user.name,
          userId: this.$user.user_id,
          state: '1',
        })
        .then((data) => {
          if (data.data.code == 200) {
            if (data.data.data.status) {
              self.issign = 1
              return dsf.http.post('fn/mobile/checksign', {
                userName: this.$user.name,
                userId: this.$user.user_id,
                state: '-1',
              })
            } else {
              self.issign = 0
              showFuc()
            }
          }
        })
        .then((data) => {
          if (data.data.code == 200) {
            if (data.data.data.status) {
              self.issign = -1
            } else {
              self.signstae = '签退'
            }
            showFuc(data.data.data)
          }
        })
    },
    getBadge(item, mes) {
      //获取角标
      if (mes == 'request') {
        this.index_list.forEach((ele) => {
          ele.forEach((ele2) => {
            ele2.forEach((ele3) => {
              if (ele3.badge_url) {
                this.getBadge(ele3)
              }
            })
          })
        })
      } else {
        dsf.http
          .post(item.badge_url, {})
          .then((res) => {
            item.badge = res.data.badge > 99 ? '99+' : res.data.badge
          })
          .error((err) => {
            if (err.message.indexOf('404') > -1) {
              dsf.layer.toast('登录接口异常，请联系系统管理员！')
            }
            return 0
          })
      }
    },
    skipTo(item) {
      //跳转到对应链接
      if (!item.router && item.toast) {
        dsf.layer.toast(item.toast)
        return
      }
      function skipToPush(self, item) {
        self.$router.push({
          name: 'dsfIframe',
          params: {
            url: item.router,
            title: item.name,
          },
          query: {
            url: item.router,
            title: item.name,
          },
        })
      }
      switch (String(item.type)) {
        case '1': //跳转到内链
          this.$router.push({
            path: item.router,
          })
          break
        case '2': //外部链接打开
          console.log('进入到了')
          if (item.name.indexOf('地图') > -1) {
            console.log('服务地图')
            let that = this
            try {
              $BaiduLocation.getLocation(
                {},
                function (locationObj) {
                  console.log('插件方法体', locationObj)
                  let location = JSON.parse(locationObj)
                  let url = item.router
                    .replace('[latitude]', location.latitude)
                    .replace('[longitude]', location.longitude)
                  that.$router.push({
                    name: 'dsfIframe',
                    params: {
                      url: url,
                      title: item.name,
                    },
                    query: {
                      url: url,
                      title: item.name,
                    },
                  })
                },
                function (e) {
                  alert(e)
                },
              )
            } catch (error) {
              dsf.layer.toast('定位失败')
            }
          } else {
            if (item.confirm) {
              dsf.layer.toast(item.confirm, 0, () => {
                skipToPush(this, item)
              })
            } else {
              skipToPush(this, item)
            }
          }
          break
        case '3': //有特殊操作
          if (item.operate == 'showPopup') {
            this.current_time.hour =
              new Date().getHours() > 9
                ? new Date().getHours()
                : '0' + new Date().getHours()
            this.current_time.minutes =
              new Date().getMinutes() > 9
                ? new Date().getMinutes()
                : '0' + new Date().getMinutes()

            // this.sign_popup = true
            this.checkSign((data) => {
              if (this.issign == -1) {
                dsf.layer.toast(`您已在：${data.sign_time}签退成功！`)
              } else {
                this.sign_popup = true
              }
            })
          } else if (item.operate == 'showSwiper') {
            this.$refs.popSwiper.show = true
            this.$refs.popSwiper.showPop = false
          }
          break
        default:
          dsf.layer.toast('当前功能正在建设。。。')
          break
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#hljPad_index {
  //   padding: 1% 4.5%;
  padding: 20px 0 0;
  position: relative;
  width: 100vw;
  height: 100vh;

  > img {
    height: 40px;
    width: auto;
    margin-left: 20px;
  }

  background: #1a66b9;
}

.test {
  height: 54px;
  font-size: var(--font_size_2);
  display: flex;
  width: 100%;
  color: #acacac;
  background: #1a66b9;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 2px 0;

  .tab_item {
    width: 33.3%;
    text-align: center;
  }

  .tab_active {
    color: #fff;
  }

  img {
    height: 18px;
    width: auto;
    margin: 0 auto 6px;
  }
}

.index_body {
  position: relative;
  height: calc(100vh - 20px - 40px - 10px - 54px);
  width: 90%;
  margin: 10px auto 0;

  .contents {
    position: absolute;
    height: 100%;
    top: 0;
    padding: 2.5% 2% 2%;
    width: 100%;

    .content {
      height: 35%;
      display: flex;

      &:nth-child(2) {
        margin: 1.5% 0 1%;
        height: 31%;
      }

      &:last-child {
        height: 30%;
      }
    }

    .single_content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .single_item {
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        border-radius: 12px;
        width: 100%;
        height: 100%;
        position: relative;
      }
    }

    .single_content0 {
      position: relative;
      margin-right: 2%;
      width: 49%;

      &:last-child {
        margin-right: 0;

        .word {
          right: 0;
          width: 100%;
          text-align: center;
        }
      }

      .word {
        right: 18%;
      }
    }

    .single_content1 {
      position: relative;
      margin-right: 2%;
      width: 24%;

      .word {
        right: 50%;
        transform: translate(50%, -50%);
        width: 100%;
        text-align: center;
      }

      &:last-child {
        margin-right: 0;
      }
    }

    .single_content2 {
      position: relative;
      margin-right: 1.3%;
      width: 24%;

      .single_item {
        border-radius: 16%;
      }

      .word {
        font-size: 18px;
        color: #333333;
        right: 12.5%;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .word {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
    font-size: var(--font_size_0);

    // font-weight: 700;
    .subname {
      font-size: var(--font_size_4);
      color: #bfe9ff;
    }

    ::v-deep .van-button--default {
      font-size: var(--font_size_4);
      color: #165bc3;
      letter-spacing: 0;
      text-align: center;
      height: 26px;
      line-height: 26px;
      box-sizing: content-box;
      margin-top: 10px;
    }
  }
}

.index_one {
  background: url('../../../../../static/images/hljMedicine/index_background.png')
    no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 18px;
}

.school_load {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: var(--font_size_3);
  padding: 5px 15px;
  color: #fff;
  border-radius: 8px;
  background: rgba($color: #333, $alpha: 0.6);
}

.van-badge {
  right: 16%;
  position: absolute;
  top: -30%;
}

.sign_popup {
  background-image: linear-gradient(192deg, #ffffff 62%, #c8e7ff 100%);
  background-image: linear-gradient(192deg, #ffffff 62%, #c8e7ff 100%);
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.07),
    inset 0 -24px 35px 0 rgba(135, 203, 253, 0.27);
  border-radius: 32px;
  border-radius: 12px;
  text-align: center;
  width: 380px;
  height: 236px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    font-size: var(--font_size_2);
    text-align: center;
    line-height: 30px;
  }

  .time {
    font-size: var(--font_size_0);
    color: #d6973f;
    letter-spacing: 1px;
    line-height: 32px;
  }
}

.van-popup {
  border-radius: 14px;

  .van-button {
    width: 150px;
    border-radius: 8px;
    margin-top: 15px;
  }
}
::v-deep .van-icon-cross {
  position: absolute;
  top: 2px;
  right: 5px;
  color: black;
}
</style>
