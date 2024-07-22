<template>
  <div class="WorkerTodoCenterComponents">
    <div class="card">
      <div class="title showIcon flex jb ac">
        <span>{{ title }}</span>
        <!-- <span class="more flex jc ac" @click="toUrl"><van-icon name="arrow" color="#666" /></span> -->
        <van-icon name="arrow" color="#999" size="0.32rem" @click="toUrl" />
      </div>
      <van-tabs v-model="active" :ellipsis="false" class="tabs" @change="changeTab" swipeable>
        <van-tab v-for="(item, index) in tabParams.tabslist" :key="index" :name="index" :title="item.name" :badge="item.badge | badgeCount">
          <template #title>
            <van-icon v-if="item.icon" :name="item.icon" />
            <span>{{ item.name }}</span>
            <span v-if="item.count">({{ item.count | badgeCount }})</span>
            <!-- <span v-if="item.badgeUrl&&item.count" class="badge">{{item.count}}</span> -->
          </template>
          <DefaultList v-if="index == active" :key="refreshKey" :params="item" :filterData="filterData"></DefaultList>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import DefaultList from "@/components/documentCenter/DefaultList"
export default {
  props: ["itemdata"],
  components: { DefaultList },
  data() {
    return {
      active: 0,
      refreshKey: Math.random(),
      filterData: {
        limit: 3
      },
      tabKey: "",
      tabsConfig: null,
      tabParams: {},
      userInfo: dsf.util.loadSessionStore("user")
    }
  },
  filters: {
    badgeCount(val) {
      if (val > 100) {
        return "99+"
      }
      if (val < 1) {
        return ""
      }
      return val
    }
  },
  computed: {
    title() {
      return this.tabParams.remark || ""
    }
  },
  async created() {
    console.log(this.itemdata.params.fileType)
    this.tabKey = this.itemdata.params.fileType
    if (this.itemdata?.params?.showRows) {
      this.filterData.limit = this.itemdata.params.showRows
    }
    let data = dsf.config.commonTabs
    this.tabsConfig = data[this.tabKey]
    //console.log(this.tabsConfig)
    if (this.tabsConfig.url) {
      await dsf.http.post(this.tabsConfig.url).then(res => {
        if (res.data.code == 200) {
          this.tabsConfig.tabslist = res.data.data
        }
      })
    }
    if (this.tabsConfig) {
      this.showDetailBadge = this.tabsConfig.showDetailBadge || false
      this.tabParams = JSON.parse(JSON.stringify(this.tabsConfig)) //深度赋值，不修改原始的对象
      let newTabs = []
      this.tabParams.tabslist.forEach(item => {
        if (item.params) {
          Object.keys(item.params).forEach(element => {
            //循环params的属性  替换值
            item.params[element] = dsf.util.getReplaceUrl(item.params[element])
          })
          item.params.showSearchBox = false
          item.params.justShowCard = true
          // item.params.hideReadStatus = true
          item.params.hideListButton = true
        }
        if (item.badgeUrl) {
          item.badgeUrl = dsf.util.getReplaceUrl(item.badgeUrl)
          dsf.http.get(item.badgeUrl).then(data => {
            this.$delete(item, "badge")
            let badge = data.data.total || data.data.badge || data.data.data
            this.$set(item, "badge", badge)
          })
        }
        if (item.countUrl) {
          item.countUrl = dsf.util.getReplaceUrl(item.countUrl)
          dsf.http.get(item.countUrl).then(data => {
            this.$delete(item, "count")
            let count = data.data.total || data.data.badge || data.data.data
            this.$set(item, "count", count)
          })
        }
        // 加权限privilege 与 noPrivilege过滤菜单
        if (item.privilege) {
          if (this.userInfo?.privileges.some(it => it.name == item.privilege)) {
            newTabs.push(item)
          }
        } else if (!this.userInfo?.privileges.some(it => it.name == item.noPrivilege)) {
          newTabs.push(item)
        }
      })
      this.tabParams.tabslist = newTabs
    }
  },
  activated() {
    this.refreshBadge()
    setTimeout(() => {
      this.isShow = true
      this.refreshKey = Math.random()
    }, 10)
  },
  methods: {
    refreshBadge(tabindex) {
      this.tabParams.tabslist.forEach((item, index) => {
        if (item.badgeUrl && (tabindex != undefined ? index == tabindex : true)) {
          dsf.http.get(item.badgeUrl).then(data => {
            let badge = data.data.total || data.data.badge || data.data.data
            this.$set(item, "badge", badge)
          })
        }
        if (item.countUrl && (tabindex != undefined ? index == tabindex : true)) {
          dsf.http.get(item.countUrl, {}).then(data => {
            let count = data.data.total || data.data.badge || data.data.data
            this.$set(item, "count", count)
          })
        }
      })
    },
    toUrl() {
      this.$router.push({
        path: `/commonTabs/${this.tabKey}`,
        query: {
          active: this.active
        }
      })
    },
    changeTab(index) {
      this.refreshBadge(index)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";
.WorkerTodoCenterComponents {
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
      // &::after {
      //   position: absolute;
      //     box-sizing: border-box;
      //     content: ' ';
      //     pointer-events: none;
      //     right: 15px;
      //     bottom: 0;
      //     left: 15px;
      //     border-bottom: 1px dotted #cfcfcf;
      //     -webkit-transform: scaleY(0.5);
      //     transform: scaleY(0.5);
      // }
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
  .tabs {
    ::v-deep .van-info {
      top: 50%;
      transform: translate(100%, -50%);
      font-size: var(--font_size_4);
      background-color: #ff3300;
      line-height: 0.32rem;
      height: 0.32rem;
      border: 0;
      right: -4px;
    }
    ::v-deep .van-tabs__nav--complete {
      padding-left: 0;
      padding-right: 0;
    }
  }
  ::v-deep .ds-list {
    padding: 0;
    background-color: #fff;
    & ~ .van-uploader {
      height: 0;
      display: block;
    }
    .ds-item {
      & + .ds-item {
        margin-top: 0;
        position: relative;
        &::after {
          position: absolute;
          box-sizing: border-box;
          content: " ";
          pointer-events: none;
          right: 16px;
          top: 0;
          left: 16px;
          border-bottom: 1px dotted #cfcfcf;
          -webkit-transform: scaleY(0.5);
          transform: scaleY(0.5);
        }
      }
      .ds-card {
        border-radius: 0;
        box-shadow: 0 0 0 0;
        .ds-card-header {
          padding: 16px 10px 0;
          font-size: var(--font_size_2);
        }
        .ds-card-content {
          padding: 0 10px 10px;
          .subTitle {
            font-size: var(--font_size_4);
            .iconfont {
              font-size: var(--font_size_4);
            }
          }
        }
        .ds-card-footer {
          display: none;
        }
      }
    }
  }
}
</style>
