<template>
  <div class="leader-picker">
    <div class="radio-container">
      <div v-for="item in state" @click="setState(item.value)" class="radio">
        <span :class="['radio-icon', { 'radio-checked': chooseState == item.value }]"></span>
        <span>{{ item.text }}</span>
      </div>
      <i v-show="chooseState == 1" :class="['iconfont', isShowLeader ? 'iconshangjiantou' : 'iconxialajiantou']" style="flex: 1;text-align: right;" @click="isShowLeader = !isShowLeader"></i>
    </div>
    <collapseTransition>
      <div class="leader-container" v-show="isShowLeader && chooseState == 1" style="display: flex">
        <template v-if="isShowImg">
          <div v-for="item in leaders" :key="item.id" @click="choose(item)" :class="['leader', {'leader-checked': item.checked}]">
            <img v-if="item.photo" class="userImg" :src="dsf.url.getWebPath(item.photo)" :onerror="default_avatar" />
            <img v-else class="userImg" :src="item.sex == 1 ? femalePhoto : malePhoto" alt="">
            <!-- <div v-else class="userImg nameImg">{{ item.name | filterName }}</div> -->
            <i v-show="item.checked" class="iconfont iconchoose"></i>
            <p :class="['name', {'name-scroll': item.name.length > 4}]">{{ item.name }}</p>
          </div>
        </template>
        <template v-else>
          <div v-for="item in leaders" :key="item.id" @click="choose(item)" :class="['leader-noimg', {'leader-noimg-checked': item.checked}]">
            <p class="name">{{ item.name }}</p>
          </div>
        </template>
      </div>
    </collapseTransition>
  </div>
</template>

<script>
import collapseTransition from "@/components/project/platform/conference/components/collapseTransition.jsx"
export default {
  components: { collapseTransition },
  props: {
    isShowImg: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isShowLeader: true, // 只看时是否显示领导头像区域
      default_avatar: 'this.src="' + require('static/images/EnterpriseServices/default-avatar.png') + '"',
      femalePhoto: 'static/images/platform/leaderSchedule/female.png',
      malePhoto: 'static/images/platform/leaderSchedule/male.png',
      state: [
        {
          value: 0,
          text: "全选"
        },
        {
          value: 1,
          text: "只看"
        }
      ],
      chooseState: 0,
      leaders: []
    }
  },
  filters: {
    filterName(name) {
      return name.slice(name.length - 2);
    }
  },
  computed: {
    chooseLeaders() {
      return this.leaders.filter(item => item.checked).map(item => item.id)
    }
  },
  watch: {
    chooseLeaders(newValue, oldValue) {
      this.$emit("chooseLeader", newValue)
    }
  },
  created() {
    this.getLeader()
  },
  methods: {
    getLeader() {
      dsf.http.post('fn/leaderScheduleApi/getLeaderUserInfoForMobile').then(res => {
        if (res.data.code == 200) {
          this.leaders = res.data.data
          this.leaders.forEach(item => {
            this.$set(item, 'checked', false)
          })
        }
      })
    },
    // 选择全选or只看 val 0：全选  1：只看
    setState(val) {
      this.chooseState = val
      this.isShowLeader = true
      if (val == 0) {
        this.leaders.forEach(item => {
          this.$set(item, 'checked', false)
        })
      }
    },
    // 选中领导
    choose(item) {
      item.checked = !item.checked
    }
  }
}
</script>
<style lang="scss" scoped>
.leader-picker {
  padding: 10px;
  .radio-container {
    display: flex;
    align-items: center;
    font-size: 15px;
    .radio {
      font-size: 15px;
      padding-right: 18px;
      .radio-icon {
        width: 16px;
        height: 16px;
        display: inline-block;
        border: 1px solid #ccc;
        vertical-align: bottom;
        border-radius: 50%;
      }
      .radio-checked {
        border-color: var(--normal);
        position: relative;
        &::before {
          position: absolute;
          content: " ";
          display: inline-block;
          width: 0.24rem;
          height: 0.24rem;
          background-color: var(--normal);
          border-radius: 50%;
          top: 50%;
          right: 50%;
          transform: translate(50%, -50%);
        }
      }
    }
  }
  .leader-container {
    display: flex;
    flex-wrap: wrap;
    .leader {
      width: calc(100% / 6);
      overflow: hidden;
      text-align: center;
      .userImg {
        width: 32px;
        height: 32px;
        display: block;
        margin: 10px auto 4px;
        border-radius: 2px;
      }
      .nameImg {
        background-color: var(--normal);
        line-height: 32px;
        text-align: center;
        font-size: var(--font_size_4);
        color: #fff;
      }
      .name {
        text-align: center;
        font-size: var(--font_size_4);
        &-scroll {
          display: inline-block;
          white-space: nowrap;
          animation: scroll 4s infinite linear;
        }
      }
      &-checked {
        position: relative;
        .userImg {
          border: 1px solid var(--normal);
          box-sizing: border-box;
        }
        .iconfont {
          position: absolute;
          left: calc(50% + 0.2rem);
          top: 0.12rem;
          font-size: var(--font_size_4);
          background: #fff;
          color: var(--normal);
          border-radius: 50%;
        }
      }
    }
    .leader-noimg {
      background: #EEEEEE;
      border-radius: 3px;
      margin: 12px 6px 0;
      padding: 0 12px;
      p {
        line-height: 24px;
      }
      &-checked {
        background: rgba(0,134,217,0.10);
        border: 1px solid var(--normal);
        color: var(--normal);
      }
    }
  }
}
@keyframes scroll {
    0% {
        transform: translateX(calc(100vw / 6))
    }
    100% {
        transform: translateX(-100%);
    }
}
</style>
