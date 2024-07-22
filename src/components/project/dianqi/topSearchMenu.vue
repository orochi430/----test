<template>
  <div class="search-list">
    <van-search
      v-model="searchVal"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
      @input="onSearch"
    />
    <van-cell-group
      title="我的应用"
      class="searchCell"
      v-if="searchMenu.apps.length"
    >
      <van-cell
        center
        :title="item.name"
        value=""
        label=""
        v-for="item in searchMenu.apps"
        :key="item.mobileUrl"
      >
        <template #icon>
          <van-icon :name="dsf.url.getWebPath(item.icon)" />
        </template>
        <template #extra>
          <span @click="openMenu(item)">打开</span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group
      title="常用功能"
      class="searchCell"
      v-if="searchMenu.dings.length"
    >
      <van-cell
        center
        :title="item.name"
        value=""
        label=""
        v-for="item in searchMenu.dings"
        :key="item.mobileUrl"
      >
        <template #icon>
          <van-icon :name="item.icon" />
        </template>
        <template #extra>
          <span @click="openMenu(item)">打开</span>
        </template>
      </van-cell>
    </van-cell-group>
    <commonempty
      v-if="searchMenu.apps.length == 0 && searchMenu.dings.length == 0"
    ></commonempty>
  </div>
</template>

<script>
const throttle = (fn, delay) => {
  let timeout = null;
  return function () {
    let args = arguments;
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        fn.apply(this, args);
      }, delay);
    }
  };
};
export default {
  data() {
    return {
      searchMenu: {
        apps: [],
        dings: [],
      },
      searchVal: "",
    };
  },
  computed: {},
  created() {
    this.searchVal = this.$route.query.searchVal;
    this.initData();
  },
  methods: {
    initData() {
      console.log(typeof this.searchVal);
      dsf.http
        .get(
          `fn/application/portal/searchAppAndShortcutDing?searchText=${this.searchVal}`
        )
        .then((res) => {
          if (res.data.code == "200") {
            this.searchMenu = res.data.data;
          }
        });
    },
    onSearch: throttle(function (val) {
      console.log("231234", val);
      this.searchVal = val;
      this.initData();
    }),

    onCancel() {
      this.searchVal = "";
      this.initData();
    },
    openMenu(menu) {
      console.log("menu", menu);
      //本系统
      if (menu.appType == 1) {
        this.$router.push({
          path: menu.mobileUrl,
          query: {
            title: menu.name,
          },
        });
      } else {
        //外部链接
        //我的应用中的菜单
        if (menu.type == "app") {
          if (!menu.mobileUrl) {
            dsf.layer.toast("请配置应用地址");
            return;
          }
          setTimeout(() => {
            dsf.middleground.openUrl({
              url: menu.mobileUrl,
              title: menu.appName,
              getCodeParams: { appCode: menu.appCode },
            });
          }, 100);
        } else {
          if (menu.appCode) {
            dsf.middleground.openUrl({
              url: menu.mobileUrl,
              title: menu.appName,
              getCodeParams: { appCode: menu.appCode },
            });
          } else {
            this.$router.push({
              name: "dsfIframe",
              query: {
                url: menu.mobileUrl,
                title: menu.name,
              },
            });
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.search-list {
  .searchCell {
    ::v-deep .van-icon {
      margin-right: 10px;
    }
    ::v-deep .van-icon__image {
      height: 30px;
      width: 30px;
    }
  }
}
</style>
