<template>
  <van-popup v-model="show" :style="{ height: '100%' }" position="bottom" @close="close">
    <van-nav-bar title="领导批示" left-text="返回" left-arrow @click-left="close" />
    <div class="sxForwardSign" v-for="(item, index) in forwardSign" :key="index">
      <span class="elps content">{{ item.content }}</span>
      <div class="mUName">
        <span>{{ item.mUName }} &nbsp; {{ item.eDate }}</span>
        <button :style="{ 'color': item.convertLdpsInfoId ? 'blue' : 'red' }" @click="convert(item)"> {{
          item.convertLdpsInfoId ?
          "已转" : "转领导批示" }}
        </button>
      </div>
    </div>
  </van-popup>
</template>
  
<script>
export default {
  name: 'sxForwardSign',
  props: ["formParams"],
  data() {
    return {
      show: true,
      forwardSign: []
    };
  },
  methods: {
    close() {
      this.show = false
      this.$nextTick(() => {
        this.$emit("closeCallback", "")
      })
    },
    convert(item) {
      let self = this
      if (item.convertLdpsInfoId) {
        self.$router.replace({
          path: `/commonForm/231021182454DIvMsj0WRzJIVVswcJh/${item.convertLdpsInfoId}`
        })
      } else {
        dsf.layer.confirm(
          {
            message: "是否确定转为领导批示？",
            confirmButtonText: "确认",
          },
          () => {
            dsf.http.post("fn/convert/moduleConvert", {
              sourceModule: self.formParams.moduleId,
              targetModule: "231021182454DIvMsj0WRzJIVVswcJh",
              srcInfo: self.formParams.pk,
              fwPnid: item.pNId
            }).then((res) => {
              if (res.data.code == 200) {
                self.show = false
                self.$nextTick(() => {
                  self.$emit("closeCallback", "")
                  dsf.layer.toast("已成功转为领导批示！")
                  // () => {
                  //   self.$router.replace({
                  //     path: `/commonForm/231021182454DIvMsj0WRzJIVVswcJh/${res.data.data.pk}`
                  //   });
                  // }
                })
              } else {
                dsf.layer.toast("类别转换失败！")
              }
            });
          }
        )
      }
    }
  },
  created() {
    this.forwardSign = this.formParams.forwardSign
  },
}
</script>
<style lang="scss" scoped>
.sxForwardSign {
  padding: 8px 15px;
  font-size: 16px;
  border: 1px #ccc solid;
}

.content {
  font-size: 18px;
  font-weight: 600;
}

.mUName {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;

  button {
    background-color: #fff;
    border-bottom: 1px black solid;
    padding: 3px 5px;
    font-weight: 600;
  }
}
</style>