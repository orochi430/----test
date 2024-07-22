<template>
  <div class="dq_searchComponent">
    <div class="flex ac search-container">
      <van-search
        v-model="content"
        :placeholder="placeholderVal"
        :clearable="false"
        @search="onSearch"
      >
        <template #label>
          <van-popover
            v-model="showPopover"
            trigger="click"
            :actions="actions"
            @select="onSelect"
            placement="bottom-start"
          >
            <template #reference>
              <div class="filterTit">
                {{ retricont }}
                <van-icon name="arrow-down" />
              </div>
            </template>
          </van-popover>
        </template>
        <template #left-icon>
          <i class="iconfont iconsousuo1" style="color: #fff"></i>
        </template>
      </van-search>
      <img src="static/images/platform/scan.png" alt="" @click="scan" />
    </div>
  </div>
</template>
<script>
// 节流
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
  name: "MiddlegroupSearchComponents",
  data() {
    return {
      content: "",
      searchMenu: [],
      rowNum: 4,
      showPopover: false,
      retricont: "应用检索",
      placeholderVal: "请输入您想要搜索的应用",
      // 通过 actions 属性来定义菜单选项
      actions: [{ text: "应用检索" }, { text: "全文检索" }],
    };
  },

  mounted() {},
  created() {},
  methods: {
    onSearch: throttle(function () {
      let self = this;
      self.searchMenu = [];
      if (self.content) {
        if (this.retricont == "全文检索") {
          this.$router.push({
            name: "globalSearch",
            query: {
              keyword: self.content,
            },
          });
        } else {
          this.$router.push({
            name: "topSearchMenu",
            query: {
              searchVal: self.content,
              t: Math.random(),
            },
          });
        }
      } else {
        self.searchMenu = [];
      }
    }, 500),

    onCancel() {
      this.searchMenu = [];
    },
    scan() {
      dsf.util.haddlerSacnCodeType((res) => {
        console.log(res.text);
      });
    },
    onSelect(action) {
      this.retricont = action.text;
      if (action.text == "全文检索") {
        this.placeholderVal = "请输入您想要搜索的内容";
      } else {
        this.placeholderVal = "请输入您想要搜索的应用";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";
.dq_searchComponent {
  padding: 10px 10px 25px;
  // background-color: #0069d3;
  @include background-theme("normal");

  .search-container {
    // margin-bottom: 10px;
    .filterTit {
      padding-right: 15px;
      color: white;
    }
    .van-search {
      padding: 0;
      border-radius: 4px;
      background-color: rgba(255, 255, 255, 0.2);
      flex: 1;

      .van-search__content {
        background-color: transparent;

        ::v-deep input {
          color: #fff;

          &::placeholder {
            color: #fff;
          }
        }
      }
    }

    img {
      width: 22px;
      margin-left: 8px;
    }
  }
}
</style>
