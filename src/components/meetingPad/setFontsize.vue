<template>
  <div class="set-fontsize-container">
    <div class="set-fontsize-top">
      <van-icon name="arrow-left" @click="$router.back()" />
      <h2>设置字体大小</h2>
    </div>
    <div class="set-fontsize-form">
      <van-cell title="字体大小" value="预览字体大小" />
      <van-cell title="设置方式" value="拖动下面的滑块，可设置字体大小" />
      <van-cell
        title="问题反馈"
        label="设置后，会改变整体应用的字体大小，如使用过程中存在问题，请反馈给开发团队"
      />
    </div>
    <div class="slider" style="padding: 20px 20px 36px;">
      <div class="fontA">
        <span
          v-for="index in 6"
          :key="index"
          :style="{ fontSize: 11.2 + 1.6 * index + 'px' }"
          >{{ index == 3 ? "标准" : "A" }}</span
        >
      </div>
      <van-slider
        v-model="value"
        :step="0.5"
        :min="4"
        :max="6.5"
        active-color="#ee0a24"
      >
      </van-slider>
    </div>
  </div>
</template>
<script>
import { Slider } from 'vant';
export default {
  components: {[Slider.name]: Slider},
  data() {
    return {
      value: dsf.util.loadLocalStore('multiple') ? dsf.util.loadLocalStore('multiple') : 5,
      oldfontSize: '',
      oldMultiple: '',
    };
  },
  watch: {
    value(newValue, oldValue) {
      let docFontsize = document.documentElement.style.fontSize.split('px')[0]
      let multiple = dsf.util.loadLocalStore('multiple') || dsf.util.loadLocalStore('fontSizeMultiple') || 5
      let temFontSize = docFontsize / multiple * newValue
      dsf.util.saveToLocalStore('multiple', newValue)
      document.documentElement.style.fontSize = temFontSize + 'px'
    }
  },
  created() {
    this.oldfontSize = document.documentElement.style.fontSize.split('px')[0]
    this.oldMultiple = dsf.util.loadLocalStore('multiple') || dsf.util.loadLocalStore('fontSizeMultiple') || 5
  },
  methods: {
    save() {}
  }
};
</script>
<style lang="scss" scoped>
.set-fontsize-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  .set-fontsize-top {
    display: flex;
    padding-bottom: 50px;
    border-bottom: 1px solid #3389e0;

    ::v-deep .van-icon {
      line-height: 70px;
    }

    h2 {
      flex: 1;
      text-align: center;
      color: #3389e0;
      font-size: 52px;
    }
  }

  .set-fontsize-form {
    flex: 1;
  }

  .slider {

    ::v-deep .van-nav-bar {
      .van-nav-bar__title {
        font-weight: bold;
      }
    }
    .fontA {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding-bottom: 10px;
    }
    ::v-deep .van-slider__button {
      width: 18px;
      height: 18px;
    }
  }

  .set-fontsize-btn {
    display: flex;
    justify-content: center;

    ::v-deep .van-button {
      width: 17rem;
      height: 2rem;
      background-color: #3b74db;
      border-color: #3b74db;
      font-size: 40px;
      color: #ffffff;
    }
  }
}
</style>
