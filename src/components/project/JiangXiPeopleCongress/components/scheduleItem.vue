<template>
  <div class="schedule">
    <van-collapse v-model="activeNames">
      <van-collapse-item name="1">
        <template #title>
          <i v-if="false" class="iconfont icon17shijian" size="0.2rem"></i>
          <span class="time" v-if="schedule.time">{{ schedule.time }}</span
          ><span>{{ schedule.title }}</span>
        </template>
        <!-- <template #right-icon>
                <van-icon :name="activeNames.length == 0 ? 'arrow-down' : 'arrow-up'" />
            </template> -->
        <div
          class="content"
          v-html="schedule.content"
          @click="
            $router.push({
              name: 'peopleCongressScheduleDetail',
              params: { agendaId: schedule.id }
            })
          "
        ></div>
      </van-collapse-item>
    </van-collapse>
    <!-- <div class="left-line"></div> -->
    <!-- <div class="top">
    <i class="iconfont icon17shijian"></i>
    <span class="title">{{schedule.time}}&nbsp;&nbsp;{{schedule.title}}</span>
    <i class="iconfont iconarrow-down-drop-circle-outline" @click="show = !show"></i>
  </div>
  <transition name="fade">
    <div v-if="show" class="content">{{schedule.content}}</div>
  </transition> -->
  </div>
</template>

<script>
export default {
  props: {
    schedule: {
      type: Object,
      default: () => {}
    },
    isFold: {
      type: Boolean
    }
  },
  data() {
    return {
      activeNames: [],
      show: false
    };
  },
  mounted() {
    if (!this.isFold) {
      this.activeNames = ["1"];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";
.schedule {
  .top {
    display: flex;

    .title {
      flex: 1;
    }
  }

  .content {
    padding: 0.2rem;
    background: #f5f6f7;
    border-radius: 0.1rem;
    color: #666;
    font-size: var(--font_size_3);
  }

  ::v-deep .van-hairline--top-bottom::after {
    border: 0;
  }
  .van-collapse {
    ::v-deep .van-collapse-item__title {
      position: relative;
      overflow: initial;
      &::before {
        content: " ";
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(-50%, -50%);
        background-color: #fff;
        border-radius: 50%;
        width: 8px;
        height: 8px;
        border: 2px solid;
        @include border-color-theme("normal");
        z-index: 1;
      }
      .van-cell__title {
        display: flex;
        align-items: center;

        .time {
          flex-shrink: 0;
          padding: 0 10px 0 5px;
        }
      }
    }

    ::v-deep .van-collapse-item__content {
      padding-top: 0;
      padding-bottom: 0;
    }
  }
}
</style>
