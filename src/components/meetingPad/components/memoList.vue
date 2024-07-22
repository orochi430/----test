<template>
  <div class="container">
    <van-swipe-cell v-for="(item, index) in memos" :key="index">
      <van-cell
        :title="item.title"
        :value="item.time | dateFormat"
        center
        @click="to(item)"
      >
        <template #icon>
          <img
            class="left-icon"
            src="static/images/meetingPad/llq.png"
            alt=""
          />
        </template>
      </van-cell>
      <template #right>
        <van-button square type="danger" text="删除" @click="delClick(item)"/>
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
export default {
  filters: {
    //日期格式化
    dateFormat: function(val) {
      if (!val) return "";
      let str = dsf.date.format(val, "yyyy-mm-dd hh:ii");
      return str;
    }
  },
  props: {
    memos: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      meeting: dsf.util.loadSessionStore("meeting"),
    };
  },
  methods: {
    to(item) {
      this.$router.push({
        name: "dsfIframe",
        params: {
          url: `./static/signatureMobile/mindex_meeting.html?fileId=${item.id}&meetingId=${this.meeting.id}&type=edit`,
          title: "编辑备忘录"
        }
      });
    },
    delClick(item){
      dsf.http
        .post(`fn/conferenceMemorandum/delMemorandum`, {
          id:item.id
        })
        .done(result => {
          if (result.code==='200') {
           dsf.layer.toast("删除成功！", true);
           this.$emit("reload")
          }
        })
        .error(error => {
          console.log("error", error);
        })
    }
  }
};
</script>

<style lang="scss" scoped>
.left-icon {
  width: 98px;
  padding-right: 40px;
}

::v-deep .van-swipe-cell__right {
  width: 3rem;
  .van-button {
    height: 100%;
    width: 100%;
    font-size: .7rem;
  }
}
</style>
