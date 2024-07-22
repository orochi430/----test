<template>
  <!-- 智慧人大-疫情防控 -->
  <div class="situation_control">
    <div class="single_item">
      <img
        src="static/images/greatWisdom/message.png"
        alt=""
        @click="concreteHandle('1')"
      />
      <van-icon
        v-if="!three_handle[1].can_handle"
        class="can_handle"
        name="warning-o"
      />
    </div>
    <div class="single_item">
      <img
        src="static/images/greatWisdom/code.png"
        alt=""
        @click="concreteHandle('2')"
      />
      <van-icon
        v-if="!three_handle[2].can_handle"
        class="can_handle"
        name="warning-o"
      />
    </div>
    <div class="single_item">
      <img
        src="static/images/greatWisdom/promise.png"
        alt=""
        @click="concreteHandle('3')"
      />
      <van-icon
        v-if="!three_handle[3].can_handle"
        class="can_handle"
        name="warning-o"
      />
    </div>

    <!-- 承诺书 -->
    <div v-if="promise_show" class="promise">
      <div class="content">
        <p class="close">
          <van-icon name="cross" @click="promise_show = false" />
        </p>
        <h5>承诺书</h5>
        <div class="word_content">
          <iframe
            :src="promise_message.content"
            frameborder="0"
            title="承诺书内容"
          ></iframe>
          <div style="text-align: right;">
            <p>{{ promise_message.name }}</p>
            <p class="date">{{ promise_message.date }}</p>
          </div>
        </div>

        <van-button
          :disabled="promise_message.flag"
          type="info"
          @click="sureRead"
        >
          我已阅读，确认提交
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'situation_control',
  data() {
    return {
      promise_show: false,
      promise_message: {
        //承诺书相关信息
      },
      three_handle: {
        1: {
          can_handle: true,
          message: '',
          skip: false,
        },
        2: {
          can_handle: true,
          message: '',
          skip: false,
        },
        3: {
          can_handle: true,
          message: '',
          skip: false,
        },
      }, //三项是否允许跳转或弹框
    }
  },
  created() {
    let temp = ['1', '2', '3']

    temp.forEach((ele) => {
      this.checkFill(ele)
    })
  },
  methods: {
    checkFill(type) {
      //校验是否可填写
      dsf.http
        .get('action?EpidemicAppAction=1', {
          moduleType: type,
          userId: dsf.util.loadSessionStore('user').user_id,
        })
        .then((res) => {
          let data = res.data
          if ((data.code = 200)) {
            this.three_handle[type] = {
              skip: data.data.flag,
              message: data.message,
              can_handle: data.data.writeFlag,
            }
            console.log(this.three_handle)
          }
        })
    },
    concreteHandle(type) {
      //具体处理
      if (this.three_handle[type].skip) {
        switch (type) {
          case '1':
            this.skipToPage('/messageSurvey')
            break
          case '2':
            this.skipToPage('/greenCodeUpload')
            break
          case '3':
            this.getPromise()
            break
          default:
            break
        }
      } else {
        dsf.layer.toast(this.three_handle[type].message)
      }
    },
    getPromise() {
      dsf.http
        .get('action?EpidemicAppAction=5', {
          userId: dsf.util.loadSessionStore('user').user_id,
        })
        .then((res) => {
          let data = res.data
          if (data.code == 200) {
            this.promise_message = data.data
            if (!this.promise_message.date) {
              let temp = new Date()
              this.promise_message.date = `${temp.getFullYear()}-${
                temp.getMonth() + 1 > 9
                  ? temp.getMonth() + 1
                  : '0' + (temp.getMonth() + 1)
              }-${temp.getDate() > 9 ? temp.getDate() : '0' + temp.getDate()}`
            }
            this.promise_show = true
          }
          console.log(this.promise_message)
        })
    },
    sureRead() {
      if (this.promise_message.flag) {
        //已确认过承诺书
        return
      }
      dsf.http
        .get('action?EpidemicAppAction=6', {
          userId: dsf.util.loadSessionStore('user').user_id,
          name: this.promise_message.name,
          date: this.promise_message.date,
        })
        .then((res) => {
          let data = res.data
          if (data.code == 200) {
            this.checkFill('3')
            dsf.layer.toast(data.message)
            this.promise_show = false
          }
        })
    },
    skipToPage(path) {
      this.$router.push({
        path: path,
        query: {},
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.situation_control {
  background: #fcfcfc;
  height: calc(100vh - 46px);
  padding: 25px 15px;
  .single_item {
    width: calc(50% - 8px);
    display: inline-block;
    margin-bottom: 15px;
    position: relative;
    &:nth-child(2n + 1) {
      margin-right: 10px;
    }
  }
}
.can_handle {
  color: red;
  font-size: 22px;
  position: absolute;
  right: 10px;
  top: 5px;
  font-weight: 700;
}
.promise {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.2);
  h5,
  .close {
    height: 26px;
    line-height: 26px;
  }
  .close {
    text-align: right;
    color: #999;
    height: 18px;
    line-height: 18px;
  }
  .content {
    text-align: center;
    position: absolute;
    background: #fff;
    width: 84%;
    left: 8%;
    top: 60px;
    border-radius: 8px;
    font-size: var(--font_size_2);
    height: 550px;
    padding: 15px 24px 25px;
  }
  .word_content {
    height: calc(100% - 26px - 18px - 36px);
    overflow-y: auto;
    text-align: left;
    .date {
      margin-top: 5px;
    }
  }
  iframe {
    width: 100%;
    margin: auto;
    height: calc(100% - 75px);
    margin-bottom: 15px;
  }
  .van-button {
    width: 100%;
    border-radius: 4px;
  }
}
</style>
