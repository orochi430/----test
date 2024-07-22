<template>
  <div class="schedule">
    <van-collapse v-if="schedule.content" v-model="activeNames">
      <van-collapse-item name="1">
        <template #title>
          <i class="iconfont icon17shijian" size="0.2rem"></i>
          <span class="time">{{ schedule.time }}</span
          ><span>{{ schedule.title }}</span>
        </template>
        <!-- <template #right-icon>
                <van-icon :name="activeNames.length == 0 ? 'arrow-down' : 'arrow-up'" />
            </template> -->
        <div class="content" v-html="schedule.content"></div>
      </van-collapse-item>
    </van-collapse>
    <van-cell v-else>
      <template #title>
        <i class="iconfont icon17shijian" size="0.2rem"></i>
        <span class="time">{{ schedule.time }}</span
        ><span>{{ schedule.title }}</span>
      </template>
    </van-cell>
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
}

::v-deep .van-cell__title {
  display: flex;
  align-items: baseline;

  .time {
    flex-shrink: 0;
    padding: 0 10px 0 5px;
  }
}

::v-deep .van-hairline--top-bottom::after {
  border: 0;
}

::v-deep .van-collapse-item__content {
  padding-top: 0;
}
</style>
