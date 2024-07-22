<template>
  <div class="PublicationComponents">
    <div class="card" v-if="isShow">
      <div class="title showIcon flex jb ac">
        <span>{{ title }}</span>
        <!-- <span class="more flex jc ac" @click="toUrl"><van-icon name="arrow" color="#666" /></span> -->
        <van-icon name="arrow" color="#999" size="0.32rem" @click="toUrl(0)" />
      </div>
      <div class="content-box">
        <div v-for="(item, index) in list" :key="index" class="content">
          <img :src="item.imgUrl" alt="" @click="toUrl(index)" />
          <div v-if="item.data" class="content-title elps" @click="toFile(item.data[0])" :style="{ fontWeight: item.data[0].isRead ? '' : '600' }">{{ item.data[0].title }}</div>
          <span v-if="item.total > 0" class="isNew">{{ item.newText }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['itemdata'],
  data() {
    return {
      title: this.itemdata.params.showName || "刊物管理",
      isShow: false,
      tabKey: 'kwgl',
      list: []
    }
  },
  created() {
    this.getData()
  },
  activated() {
    this.getData()
  },
  methods: {
    getData() {
      dsf.http.post("ctrl/informationReportInbox/getPublicationIndexData", { limit: 1 }).then(res => {
        if (res.data.length > 0) {
          this.isShow = true
          this.list = res.data
        }
      })
    },
    toUrl(index) {
      this.$router.push({
        path: `/commonTabs/${this.tabKey}`,
        query: {
          active: index
        }
      })
    },
    toFile(data) {
      dsf.http.post("ctrl/reportReadLog/accessed", { infoId: data.infoId }).then(res => {
        if (res.data.code == 200) {
          data.isRead = true
        }
      })
      if (data.fileId) {
        let privileges = dsf.util.loadLocalStore("user").privileges || [];
        this.$router.push({
          path: `/filePreview/${data.fileId}`,
          query: {
            title: data.title,
            moduleId: data.moduleId,
            isShowAddPage: 0,
            isHandwrite: privileges.find(item => item.name == '刊物查看领导') ? 1 : 0,
            leaderUser: privileges.find(item => item.name == '刊物查看领导') ? dsf.util.loadLocalStore("user").user_id : ''
          }
        })
      } else {
        dsf.layer.toast("暂无附件")
      }

    }
  }
}
</script>
<style lang="scss" scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";
.PublicationComponents {
  .card {
    background-color: #fff;
    margin: 10px;
    border-radius: 6px;
    padding: 10px 0 0;
    border-bottom: 1px solid #f7f7f7;
    box-shadow: 0px 2px 16px 0px rgba(213, 213, 213, 0.5);
    .title {
      padding: 2px 15px 10px;
      box-sizing: border-box;
      position: relative;
      padding-right: 0.2rem;
      @include font_2;

      span:first-child {
        font-size: var(--font_size_1);
        font-weight: bold;
        color: #333;
        margin-left: -5px;
      }
      .more {
        border-radius: 50%;
        // @include background-theme("normal");
        float: right;
        width: 16px;
        height: 16px;
        font-size: 10px;
      }
    }
    .showIcon {
      span:first-child {
        padding-left: 5px;
        border-left: 5px solid #fff;
        position: relative;
        &::before {
          content: " ";
          position: absolute;
          height: 18px;
          width: 5px;
          top: 50%;
          left: -5px;
          transform: translate(0, -50%);
          border-radius: 3px;
          @include background-theme("normal");
        }
      }
    }
  }
  .content-box {
    overflow-x: auto;
    display: flex;
    // margin: 0 10px 10px;
    .content {
      position: relative;
      margin: 0 10px 10px;
      width: 140px;
      flex-shrink: 0;
      img {
        width: 140px;
        height: 60px;
        margin-bottom: 8px;
        object-fit: cover;
      }
      .isNew {
        background-image: url("../../../../static/images/platform/isnewTag.png");
        background-size: contain;
        position: absolute;
        top: 4px;
        left: -4px;
        font-size: var(--font_size_4);
        color: #fff;
        width: 60px;
        height: 23px;
        text-align: center;
      }
    }
  }
}
</style>
