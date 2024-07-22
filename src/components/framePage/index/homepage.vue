<template>
  <div class="ds-home">
    <!-- {{currentMenu.components}} -->
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      success-text="刷新成功"
      :disabled="!dsf.config.homePage.isEnablePullRefresh"
      :style="{minHeight: dsf.config.homePage.isEnablePullRefresh ? 'calc(100vh - 1.2rem)' : ''}"
    >
      <component v-for="(item, index) in currentMenu.components" :key="index + loadTime" :is="item.name" :ref="item.name"
        :itemdata="item"></component>
    </van-pull-refresh>
  </div>
</template>

<script>
import indexJs from "./index.js"; //统一注册组件JS
import { mapState } from "vuex";
import urlJs from "@/common/url";

export default {
  name: "framePage",
  props: ["isiframe"],
  data() {
    return {
      loadindex: 0,
      currentMenu: {},
      isLoading: false,
      loadTime: ''
    };
  },
  components: {},
  created() {
    //console.log(this.$route.meta.keepAlive)
    // console.log(this.isiframe)
  },
  computed: {
    ...mapState({
      appFooter: (state) => state.appFooter,
    }),
  },
  beforeRouteLeave(to, from, next) {
    var tag = document.getElementById("content");
    if (to.path == "/testLogin" || to.path.toLowerCase().indexOf("login") > -1) {
      let vnode = this.$vnode;
      let parentVnode = vnode && vnode.parent;
      if (parentVnode && parentVnode.componentInstance && parentVnode.componentInstance.cache) {
        var key = vnode.key == null ? vnode.componentOptions.Ctor.cid + (vnode.componentOptions.tag ? `::${vnode.componentOptions.tag}` : "") : vnode.key;
        var cache = parentVnode.componentInstance.cache;
        var keys = parentVnode.componentInstance.keys;

        if (cache[key]) {
          setTimeout(() => {
            // this.$destroy();
            // remove key
            if (keys.length) {
              var index = keys.indexOf(key);
              if (index > -1) {
                keys.splice(index, 1);
              }
            }

            keys.forEach((nowkey) => {
              cache[nowkey] = null;
            });
            cache = null;
            keys = null;
            this.$bus.emit("refreshBadge");
          }, 1000);
        }
      }
    }
    next();
  },
  activated() {
    this.getcurrentMenu();
  },
  methods: {
    onRefresh() {
      this.getcurrentMenu();
      this.isLoading = false;
      this.loadTime = new Date();
    },
    getcurrentMenu() {
      this.loadindex++;
      let self = this;
      let currentMenuTemp = self.appFooter.find((item) => {
        return item.id == self.$route.params.key;
      });
      if (currentMenuTemp) {
        self.appFooter.forEach((item) => {
          item.checked = false;
        });
        currentMenuTemp.checked = true;
      } else {
        currentMenuTemp = self.appFooter.find((item) => {
          return item.checked;
        });
      }
      let iframe = document.getElementById(currentMenuTemp.id);
      if (iframe) {
        //菜单点击时   发送一个postmessage   供iframe内部页面监听使用
        let postdata = {
            type: "OA",
            action: "click",
            params: currentMenuTemp
        }
        iframe.contentWindow.postMessage(postdata, "*");
      }

      if (!this.isiframe) {
        this.currentMenu = currentMenuTemp;
      }
      //当值班要情组件替换通知公告组件时，需定位到组件进行替换；
      if (dsf.config.homePage.componentsReplace) {
        dsf.config.homePage.componentsReplace.forEach(rep => {
          this.currentMenu.components.forEach((element, index) => {
            if (index == rep.index && element.name == rep.sourceComponents) {
              element.name = rep.replaceToComponents;
            }
          });
        })
      }
      urlJs.setTitle(this.currentMenu.showName);
    },
  },
  deactivated() {
    // if (this.$route.name.toLowerCase()=="testlogin") {
    //     this.$destroy()
    // }
  },
};
</script>

<style lang="scss" scoped>
#app {
  overflow-y: scroll;

  .menuBox {
    // background:white;
  }
}

.ds-home {
  height: 100%;

  div:only-child {
    height: 100%;
  }

  .application-header+div {
    margin-top: -24px;
  }
  .WorkerHeaderComponents+div {
    margin-top: -30px;
  }
  .noHeaderMenu+div {
    margin-top: -0.38rem;
  }
  .dq_searchComponent+div{
    margin-top: -24px;

  }
}
</style>
