<template>
  <div>
    <div class="box">
      <div class="title">推荐主题色</div>
      <div class="color-container">
        <div class="color" v-for="theme in themes" :key="theme.name" @click="changeTheme(theme)"
          :style="{ backgroundColor: theme.color }"></div>
      </div>
    </div>
    <div class="box">
      <div class="title">自定义</div>
      <el-color-picker class="checkedColor" v-model="checkedColor" @change="changeColor"></el-color-picker>
    </div>

    <div class="btn-container">
      <van-button class="btn" type="info"
        :style="{ backgroundColor: sureColor ? `${sureColor} !important` : '', borderColor: sureColor ? `${sureColor} !important` : '' }"
        @click="setTheme">确认
      </van-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import { ColorPicker } from 'element-ui'
import { THEME_COLORS, setThemeColor } from '@/common/setTheme'
Vue.use(ColorPicker)
export default {
  components: { ColorPicker },
  data() {
    return {
      checkedColor: '',
      originalColor: '',
      sureColor: '',
      themes: [],
      recommend: ''
    }
  },
  created() {
    this.themes = Object.entries(THEME_COLORS).map(item => { return { name: item[0], color: item[1] } });
    let nowClass = $("body").attr("class").split(' ').find(item => item.indexOf('-theme') > -1)
    this.checkedColor = this.sureColor = dsf.util.loadLocalStore('self-theme') ? dsf.util.loadLocalStore('self-theme') : this.themes.find(theme => theme.name == nowClass).color
  },
  mounted() {
  },
  methods: {
    setTheme() {
      //recommend-theme 表示推荐主题，self-theme表示自定义主题色
      if (this.recommend) {
        dsf.util.saveToLocalStore('recommend-theme', this.recommend)
        dsf.util.removeToLocalStore('self-theme')
      } else {
        dsf.util.saveToLocalStore('self-theme', this.sureColor)
        dsf.util.removeToLocalStore('recommend-theme')
      }
      setThemeColor(this.sureColor, this.recommend)
      this.$router.go(-1)
    },
    changeColor() {
      this.sureColor = this.checkedColor
      this.recommend = ''
    },
    changeTheme(theme) {
      this.sureColor = theme.color
      this.recommend = theme.name
    }
  }
}
</script>
<style lang='scss' scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.box {
  padding: 0 20px;

  .title {
    height: 40px;
    line-height: 40px;
  }
}

.color-container {
  display: flex;
  // justify-content: space-between;
  flex-wrap: wrap;

  .color {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 6px;
  }
}

.btn-container {
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 12px;

  .btn {
    width: 100%;
  }
}
</style>
