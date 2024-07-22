<template>
  <div id="common-tabs">
    <!-- <van-nav-bar v-if="tabsConfig" :title="tabsConfig.remark" left-arrow @click-left="$router.go(-1)" /> -->
    <van-search
      v-model="tempKeyWord"
      show-action
      placeholder="请输入查询信息"
      left-icon=""
      :clearable="false"
      @search="onSearch"
      @focus="onFocus"
      v-if="tabsConfig && tabsConfig.showSearchBox"
    >
      <template #right-icon>
        <div @click="onSearch" class="flex ac">
          <van-icon name="search" size="0.44rem" />
        </div>
      </template>
      <template #action>
        <!-- <div @click="onSearch" class="flex ac">
                    <img class="search-icon" src="static/images/EnterpriseServices/icon-menu.png" alt="">
                </div> -->
      </template>
    </van-search>
    <van-tabs
      v-model="active"
      :sticky="sticky"
      @change="tabChange"
      :offset-top="
        tabOppsetTop ? dsf.util.getOffsetTop(tabOppsetTop) : dsf.util.getOffsetTop()
      "
      swipeable
      swipe-threshold
      class="commontabs"
    >
      <van-tab
        :title="'tabs' + item.name"
        :badge="item.badge | badgeCount"
        v-for="(item, index) in tabParams.tabslist"
        :key="index"
        :name="index"
      >
        <!-- tab前置插槽 -->
        <template #title>
          <van-icon v-if="item.icon" :name="item.icon" />
          <span>{{ item.name }}</span
          ><span v-if="item.count">({{ item.count | badgeCount }})</span>
          <!-- <span v-if="item.badgeUrl&&item.count" class="badge">{{item.count}}</span> -->
        </template>
        <keep-alive v-if="item.goRoute == 'defaultList'">
          <default-list
            :currentTabs="index"
            :params="item"
            :tabsPage="tabsPage"
            :clickTabIndex="clickTabIndex"
            :routeKey="routeKey"
            :mainKeyWord="realKeyWord"
            :oppsetTop="oppsetTop ? oppsetTop : isShowAppHeader ? '1.8rem' : '0.88rem'"
            :checkable="checkable"
            :check-type-pop="checkType"
            @cancelCheck="cancelCheck"
            @confirmCheck="confirmCheck"
          ></default-list>
        </keep-alive>
        <jiangsuyancao-table
          v-else-if="item.goRoute == 'jiangsuyancaoTable'"
          :params="item"
          :oppsetTop="isShowAppHeader ? '1.8rem' : '0.88rem'"
        ></jiangsuyancao-table>
        <keep-alive v-else-if="item.goRoute == 'elecHomePage'">
          <ElecHomePage
            :clickTabIndex="clickTabIndex"
            :currentTabs="index"
            :tabParams="tabParams.tabslist[clickTabIndex]"
          ></ElecHomePage>
        </keep-alive>
        <commonForm
          v-else-if="item.goRoute == 'commonForm'"
          :currentTabs="index"
          :clickTabIndex="clickTabIndex"
          :_moduleId="item.params.moduleId"
          :_pk="item.params.pk"
          :_formId="item.params.formId"
          :_params="item.params || {}"
        ></commonForm>
        <diskFile
          v-else-if="item.goRoute == 'diskFile'"
          :currentTabs="index"
          :clickTabIndex="clickTabIndex"
          :params="item"
          :mainKeyWord="realKeyWord"
        ></diskFile>
        <keep-alive v-else-if="item.goRoute == 'cdReportIndex'">
          <cdReportIndex
            :currentTabs="index"
            :clickTabIndex="clickTabIndex"
            :params="item"
            :mainKeyWord="realKeyWord"
          ></cdReportIndex>
        </keep-alive>
        <tab-todo v-else :params="item"></tab-todo>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapState } from "vuex";
import urlJs from "@/common/url";
// import defaultList from "../documentCenter/DefaultList";
// import jiangsuyancaoTable from "@/components/project/jiangsuyancao/table.vue";
// import tabTodo from "../documentCenter/commonTabTodo.vue";
// import commonForm from "@/components/commonForm/commonForm.vue";
// import ElecHomePage from "../project/dianqi/elecHomePage";
// import diskFile from "@/components/netDisk/diskfile.vue";
// import cdReportIndex from "@/components/project/chengduyitihua/dubanReport/reportHome.vue";

let vueData;
export default {
  props: ["value", "tabKey", "checkable", "checkType", "oppsetTop", "tabOppsetTop"],
  name: "customTabs",
  model: {
    prop: "value",
    event: "input",
  },
  components: {
    'defaultList': () => import('../documentCenter/DefaultList'),
    'tabTodo': () => import('../documentCenter/commonTabTodo.vue'),
    'jiangsuyancaoTable': () => import('@/components/project/jiangsuyancao/table.vue'),
    'commonForm': () => import('@/components/commonForm/commonForm.vue'),
    'ElecHomePage': () => import('../project/dianqi/elecHomePage'),
    'diskFile': () => import('@/components/netDisk/diskfile.vue'),
    'cdReportIndex': () => import('@/components/project/chengduyitihua/dubanReport/reportHome.vue'),
  },
  data() {
    return {
      active: 0,
      tabParams: {},
      tabsPage: false,
      clickTabIndex: 0,
      routeKey: "",
      tabsConfig: null,
      tempKeyWord: "",
      realKeyWord: "",
      docTitle: "",
      showDetailBadge: false,
      sticky: true,
      goSearchRoute: this.$route.query.goSearch,
    };
  },
  computed: {
    ...mapState({
      isShowAppFooter: (state) => state.isShowAppFooter,
      isShowAppHeader: (state) => state.isShowAppHeader,
    }),
  },
  activated() {
    urlJs.setTitle(this.docTitle);
    this.refreshBadge(this.active);
    // 如果tab返回只有一个，隐藏页签
    if (this.tabsConfig.url && this.tabsConfig.tabslist.length == 1) {
      this.oppsetTop = dsf.util.getOffsetTop("0.92rem");
    }
  },
  async created() {
    vueData = this;
    if (this.$route.query.active) {
      this.active = Number(this.$route.query.active);
    }
    let data = dsf.config.commonTabs;
    this.routeKey = this.tabKey || this.$route.params.key;
    this.tabsConfig = data[this.routeKey];
    if (this.tabsConfig.url) {
      await dsf.http.post(this.tabsConfig.url).then((res) => {
        if (res.data.code == 200) {
          this.tabsConfig.tabslist = res.data.data;
          // 如果tab返回只有一个，隐藏页签
          if (this.tabsConfig.tabslist.length == 1) {
            this.sticky = false;
            setTimeout(() => {
              $(".commontabs > .van-tabs__wrap").css("display", "none");
              this.oppsetTop = dsf.util.getOffsetTop("0.92rem");
            }, 100);
          }
        }
      });
    }
    //console.log(this.tabsConfig)
    if (this.tabsConfig) {
      this.docTitle = this.$route.query.title || this.tabsConfig.remark;
      this.showDetailBadge = this.tabsConfig.showDetailBadge || false;
      urlJs.setTitle(this.docTitle);
      this.tabParams = JSON.parse(JSON.stringify(this.tabsConfig)); //深度赋值，不修改原始的对象
      let newTabs = [];
      this.tabParams.tabslist.forEach((item) => {
        let newItem = { ...item };
        if (newItem.params) {
          Object.keys(newItem.params).forEach((element) => {
            //循环params的属性  替换值
            newItem.params[element] = dsf.util.getReplaceUrl(newItem.params[element]);
          });
        }
        if (newItem.badgeUrl) {
          newItem.badgeUrl = dsf.util.getReplaceUrl(newItem.badgeUrl);
          dsf.http.get(newItem.badgeUrl).then((data) => {
            this.$delete(newItem, "badge");
            let badge = data.data.total || data.data.badge || data.data.data;
            this.$set(newItem, "badge", badge);
          });
        }
        if (newItem.countUrl) {
          newItem.countUrl = dsf.util.getReplaceUrl(newItem.countUrl);
          dsf.http.get(newItem.countUrl).then((data) => {
            this.$delete(newItem, "count");
            let count = data.data.total || data.data.badge || data.data.data;
            this.$set(newItem, "count", count);
          });
        }
        // 加权限privilege 与 noPrivilege过滤菜单
        if (newItem.privilege) {
          if (
            dsf.util
              .loadSessionStore("user")
              ?.privileges.some((item) => item.name == newItem.privilege)
          ) {
            newTabs.push(newItem);
          }
        } else if (
          !dsf.util
            .loadSessionStore("user")
            ?.privileges.some((item) => item.name == newItem.noPrivilege)
        ) {
          newTabs.push(newItem);
        }
      });
      this.tabParams.tabslist = newTabs;
    }

    this.$eventBus.onRefreshBadge(this, (tabindex) => {
      this.refreshBadge(tabindex);
    });
  },
  filters: {
    badgeCount(val) {
      if (val > 100) {
        if (vueData.showDetailBadge) {
          return val;
        }
        return "99+";
      }
      if (val < 1) {
        return "";
      }
      return val;
    },
  },
  methods: {
    refreshBadge(tabindex) {
      this.tabParams.tabslist.forEach((item, index) => {
        if (item.badgeUrl && (tabindex != undefined ? tabindex == index : true)) {
          dsf.http.get(item.badgeUrl).then((data) => {
            let badge = data.data.total || data.data.badge || data.data.data;
            this.$set(item, "badge", badge);
          });
        }
        if (item.countUrl && (tabindex != undefined ? tabindex == index : true)) {
          dsf.http.get(item.countUrl, {}).then((data) => {
            let count = data.data.total || data.data.badge || data.data.data;
            this.$set(item, "count", count);
          });
        }
      });
    },
    tabChange(index, title) {
      console.log(index + "---" + title);
      this.clickTabIndex = index;
      // switch (index) {
      // 	case 0:
      // 		this.clickTabIndex = 0
      // 		break
      // 	case 1:
      // 		this.clickTabIndex = 1
      // 		break
      // 	case 2:
      // 		this.clickTabIndex = 2
      // 		break
      // }
    },
    onSearch() {
      this.realKeyWord = this.tempKeyWord;
    },
    onFocus() {
      if (this.goSearchRoute) this.$router.push({ name: this.goSearchRoute });
    },
    cancelCheck() {
      this.$emit("cancelCheck");
    },
    confirmCheck(checkItems) {
      this.$emit("confirmCheck", checkItems);
    },
  },
  deactivated() {
    let self = this;
    let arr = ["jiangsuyancaoNewsDetail"];
    if (!arr.filter((item) => item == this.$route.name).length) {
      //this.$destroy();
    }

    //上海地产特殊地址需要销毁缓存组件
    if (dsf.config.setting["SYS-MOBILE-FORM-0020"]) {
      let paths = dsf.config.setting["SYS-MOBILE-FORM-0020"].split(",");
      let isGo = false;
      paths.forEach((pathsItem) => {
        if (self.$route.path.toLowerCase() == pathsItem) {
          isGo = true;
        }
      });
      if (isGo) {
        self.$eventBus.Off(this, "refreshBadge");
        self.$deleteCache(this);
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (
      to.name == "commonList" ||
      to.name == "index" ||
      to.name == "wanHome" ||
      to.name.toLowerCase().includes("index")
    ) {
      //如果是去列表的话   则销毁，解决tab页固定的问题 2022年3月20日16:20:01  @ly
      this.$eventBus.Off(this, "refreshBadge");
      let self = this;
      setTimeout(() => {
        self.$deleteCache(self); //延迟删除缓存，防止第一次删不掉
      }, 500);
      // this.$destroy();
    }
    next();
  },
};
</script>

<style lang="scss" scoped>
#common-tabs {
  .van-info {
    top: 10px;
  }

  .van-sticky {
    background: white;
    z-index: 999;
    /* padding: 15px; */
  }

  ::v-deep .van-nav-bar .van-icon {
    color: #000;
  }
}

.search-icon {
  width: 30px;
}

.badge {
  font-size: var(--font_size_4);
  background-color: #f65959;
  color: #fff;
  border-radius: 50%;
  padding: 1px 5px;
  position: relative;
  left: -2px;
}
</style>
