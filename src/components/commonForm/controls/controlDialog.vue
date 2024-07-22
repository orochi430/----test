<template>
  <van-popup get-container="#app" v-model="showPopup" position="bottom" round style="height: 60vh;" class="flex dc" @close="pupupClose">
    <div class="popup-title">
        <i size="0.4rem" class="iconfont iconxialajiantou" @click="showPopup = false" />
        <span>选择</span>
    </div>
    <div class="choose-container">
      <div v-for="item in columns.columns" class="choose-col flex jb" @click="selectValue(item)">
        <span class="elps">{{ item.text }}</span>
        <i v-if="item.value == checkedVal" class="iconfont iconcheck"></i>
      </div>
    </div>
    <!-- <van-picker show-toolbar :columns="columns.columns" @cancel="showPopup = false" @confirm="selectValue" value-key="text">
      <template #columns-top v-if="metaData.allowEdit">
        <van-field :label="`${metaData.label}：`" v-model="textTemp" class="textTemp" placeholder="手动输入"></van-field>
      </template>
    </van-picker> -->
  </van-popup>
</template>

<script>
export default {
  props: ["value", "columns", "metaData","checkedVal"],
  data() {
    return {
      showPopup: this.value,
      nextPopup: false,
      textTemp: ""
    }
  },
  watch: {
    value() {
      this.showPopup = this.value
    }
  },
  methods: {
    pupupClose() {
      this.$emit("input", this.showPopup)
      this.$emit("pupopClose", this.showPopup)
    },
    selectValue(val) {
      console.log(val)
      if (this.textTemp) {
        val = {
          text: this.textTemp,
          value: this.textTemp
        }
        this.textTemp = ""
      }
      if (!val.children) {
        this.showPopup = !this.showPopup
      }
      this.$emit("input", this.showPopup)
      this.$emit("selectItem", val)
    }
  },
  created() {}
}
</script>

<style scoped lang="scss">
.textTemp {
  width: calc(100% - 20px);
  margin: 0 10px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  padding: 6px;
}
.popup-title{
  text-align: center;
  font-size: var(--font_size_2);
  padding: 15px;
  border-bottom: 5px solid #F1F2F4;
  color: #000000;
  position: relative;
  .iconfont{
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
  }
}
.choose-container {
  flex: 1;
  overflow: auto;
  font-size: var(--font_size_2);
  .choose-col{
    margin: 20px;
    i {
      font-size: var(--font_size_0);
    }
  }

}
</style>
<style lang="scss">
.controlDialog {
  .van-dialog__header {
    padding-top: 10px;
    font-size: var(--font_size_2);
    font-weight: 600;
    margin-bottom: 10px;
  }
}
</style>
