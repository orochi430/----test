<template>
  <div class="sxCopyOpinion">
    <van-popup v-model="show" round @close="close" :style="{ height: '50%' }" position="bottom">
      <div class="pop">
        <van-nav-bar :title="showWeaver ? '退回原因' : '抄送意见'" />
        <van-field v-model="value" rows="4" type="textarea" placeholder="请输入意见" />
        <div class="btn">
          <van-button @click="closepage('取消')">取消</van-button>
          <van-button @click="closepage('确定')">{{ showWeaver ? '确定' : '下一步' }}</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>
  
<script>
export default {
  name: 'sxCopyOpinion',
  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    metaData: {
      type: Object,
      default: {}
    },
    formParams: {
      type: Object,
      default: {}
    }
  },
  created() {
    this.showWeaver = this.formParams.showWeaver
  },
  data() {
    return {
      show: true,
      value: "",
      showWeaver: false,
      obj: {}
    };
  },
  methods: {
    closepage(item) {
      this.obj = {
        value: this.value,
        actionName: item
      }
      this.show = false
    },
    close(value) {
      console.log("close");
      this.show = false
      this.$nextTick(() => {
        this.$emit("closeCallback", this.obj)
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.pop {
  position: relative;
  width: 100vw;
  height: 100%;
  min-height: 200px;
  border-radius: 8px;
  overflow: hidden;
}

.btn {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  width: 100%;

  button {
    width: 49%;
    font-size: 15px;
  }
}

.btn button:last-child {
  background-color: var(--normal);
  color: white;

}

.btn button:first-child {
  background-color: white;
  color: var(--normal);
  border: 1px solid var(--normal);
}

::v-deep .pop .van-nav-bar {
  position: sticky;
  top: 0;
  left: 0;
}

::v-deep .pop .van-cell {
  height: 70%;
}

::v-deep .pop .van-field .van-field__body {
  height: 100%;
}

::v-deep .pop .van-field--min-height .van-field__control {
  height: 100%;
  font-size: 20px !important;
}
</style>