<template>
<div>
  <div class="data" v-show="isShowData">
    <div class="glowIn">{{dsf.config.yanshi.voiceAssistantText}}</div>
    <div v-show="isShowRicheng" class="richeng">
      <div>为您创建日程，请确认：</div>
      <div>召开部门会议</div>
      <div class="flex jb ac">
        <span>
          {{dsf.config.yanshi.voiceAssistantStartTime}}<br>{{dsf.config.yanshi.voiceAssistantWeekDay}}
        </span>
        <van-icon name="arrow" size="26"/>
        <span>
          {{dsf.config.yanshi.voiceAssistantEndTime}}<br>{{dsf.config.yanshi.voiceAssistantWeekDay}}
        </span>
      </div>
      <div class="btn-box flex jb ac">
        <van-button type="default" @click="init">取消</van-button>
        <van-button type="info" @click="link">确定</van-button>
      </div>
    </div>
  </div>
  <div class="intro" v-show="isShowIntro">
    <h2>Hi,我是小梦</h2>
    <h5>有什么能帮助您的吗？</h5>
  </div>
  <div class="time-box" v-show="isShowTime">
    <span class="start-taste-line">
      <hr class="hr1" />
      <hr class="hr2" />
      <hr class="hr3" />
      <hr class="hr4" />
      <hr class="hr5" />
      <hr class="hr6" />
      <hr class="hr7" />
      <hr class="hr8" />
      <hr class="hr9" />
      <hr class="hr10" />
    </span>
  </div>
  <div class="circle" @touchstart="gtouchstart()"
    @touchmove="gtouchmove()"
    @touchend="gtouchend()">
    <img src="./yanshi/yuyin.svg" alt="" @touchmove.prevent>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      isShowData: false,
      isShowIntro: true,
      isShowTime: false,
      isShowRicheng: false,
      time: 0,
    }
  },
  methods: {
    init() {
      this.isShowData = false
      this.isShowIntro = true
      this.isShowTime = false
      this.isShowRicheng = false
    },
    gtouchstart() {
      this.isShowData = false
      this.isShowIntro = false
      this.isShowTime = true
      this.isShowRicheng = false
    },
    gtouchend() {
      this.isShowData = true
      this.isShowIntro = false
      this.isShowTime = false
      this.isShowRicheng = false
      this.glowIn()
    },
    glowIn() {
      let glowInTexts = document.querySelectorAll(".glowIn")
        glowInTexts.forEach(glowInText => {
            let letters = glowInText.textContent.split("")
            glowInText.textContent = ""
            letters.forEach((letter, i) => {
                let span = document.createElement("span")
                span.textContent = letter
                span.style.animationDelay = `${i * 0.05}s`
                glowInText.append(span)
            })
        })
        setTimeout(() => {
          this.isShowRicheng = true
        },2000)
    },
    link() {
      console.log('1111111111111')
      this.$router.replace({
        path: '/commonForm/180719094152MnF6C2hEPtqIvhjJIxo',
        query: {
          startTime: dsf.config.yanshi.voiceAssistantStartTime,
          endTime: dsf.config.yanshi.voiceAssistantEndTime,
          bt: '部门会议'
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@import '@/assets/styles/themes.scss';
@import '@/assets/styles/mixin.scss';
.data {
  font-size: var(--font_size_2);
  padding: 16px;
  background-color: #fff;
  .glowIn {
    padding: 10px;
    border: 1px solid #ddd;
    margin-bottom: 20px;
  }
  .richeng {
    > div {
      padding-bottom: 16px;
    }
  }
  .btn-box {
    button {
      flex: 1;
    }
  }
}
.intro {
  text-align: center;
  margin-top: 200px;
  h2 {
    font-size: 30px;
    padding-bottom: 20px;
  }
  h5 {
    font-size: 18px;
  }
}
.circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    @include background-theme("normal");
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    img {
      width: 60%;
      pointer-events: none;
    }
  }
  .time-box {
    width: 50vw;
    height: 1rem;
    @include background-theme("normal");
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 200px auto 0;
    position: relative;
    &::after {
      content: " ";
      position: absolute;

    }
    hr {
      background-color: #fff;  //声波颜色
      width: 3px;
      height: 6px;
      margin: 0 0.03rem;
      display: inline-block;
      border: none;
    }
  }
  hr {
    animation: note 0.2s ease-in-out;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  .hr1 {
    animation-delay: -1s;
  }

  .hr2 {
    animation-delay: -0.9s;
  }

  .hr3 {
    animation-delay: -0.8s;
  }

  .hr4 {
    animation-delay: -0.7s;
  }

  .hr5 {
    animation-delay: -0.6s;
  }

  .hr6 {
    animation-delay: -0.5s;
  }

  .hr7 {
    animation-delay: -0.4s;
  }

  .hr8 {
    animation-delay: -0.3s;
  }

  .hr9 {
    animation-delay: -0.2s;
  }

  .hr10 {
    animation-delay: -0.1s;
  }

  @keyframes note {
    from {
      transform: scaleY(1);
    }
    to {
      transform: scaleY(4);
    }
  }
  .pulse {
    background: rgba(239, 45, 2, 0.6)!important;
    animation: warn 0.9s ease-out;
    animation-iteration-count: infinite;
    box-shadow: 1px 1px 30px #ef2d02;
    position: absolute;
    width: 420px;
    height: 420px;
    border: 2px solid #EF2D02;
    background: rgba(239, 45, 2, 0.8);
    border-radius: 50%;
    z-index: 100;
    opacity: 0;
}
@keyframes warn {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
.glowIn {
    // color: white;
}
.glowIn ::v-deep span {
    animation: glow-in 0.8s both;
}
@keyframes glow-in {
    from {
        opacity: 0;
    }
    65% {
        opacity: 1;
        text-shadow: 0 0 25px white;
    }
    100% {
        opacity: 1;
    }
}
</style>
