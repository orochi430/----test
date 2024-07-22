<template>
  <div class="qingyuedu">
    <van-tabs >
      <van-tab :title="obj.name" v-for="(obj, index) in qydFiles" :key="obj.id">
        <iframe
          frameborder="0"
          width="100%"
          :src="obj.url"
          :key="obj.url"
          :id="'filePreview' + index"
          :style="isShowAppHeader ? { height: 'calc(100vh - 1.84rem)' } : { height: 'calc(100vh - 0.92rem)' }"
          @load="changeFrameHeight(index)"
        ></iframe>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: 'qingyuedu',


  components: {},

  data() {
    return {
        qydFiles:[],
    }
  },

  created() {
    this.qydFiles =  this.$route.params.qydFiles || this.$route.query.qydFiles || [];
  },

  mounted() {

  },

  activated() {},

  computed: {
    ...mapState({
      isShowAppHeader: state => state.isShowAppHeader
    })
  },

  watch: {},

  methods: {
    changeFrameHeight(index) {
      console.log("changeFrameHeight高度变化");
      let that = this;
      this.$nextTick(() => {
        try {
          let parentHeight = that.$refs.enclosurePre.offsetHeight;
          console.log("parentHeight高度变化" + parentHeight);
          document.querySelector("#filePreview" + index).style.height =
            parentHeight + "px";
        } catch (e) {
          //跨域获取不到
          throw new Error("自定义错误setIframeHeight Error");
        }
      });
    }
  },

}

</script>

<style scoped lang='scss'>
</style>