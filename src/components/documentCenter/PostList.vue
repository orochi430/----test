<!--
 * @Author: RONGWEI PENG
 * @Date: 2020-05-13 14:57:00
 * @LastEditTime: 2020-05-18 17:02:28
 * @LastEditors: Do not edit
 * @FilePath: /xzDing/src/components/PostList.vue
 * @Description:
 -->

<template>
  <div class="ds-postlist">
    <van-search
      v-model="value"
      show-action
      placeholder="搜索"
      @focus="onSearch"
      @cancel="onCancel"
    />

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        :offset="100"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <DsList
          :data="list"
          :columns="columns"
          @mainClick="handleActionClick"
          @commonClick="handleActionClick"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import DsList from "@/components/documentCenter/DsList";
import ButtonActions from "@/components/todoCenter/TodoCenter.mixin";

export default {
  name: "postlist",
  components: {
    DsList
  },
  mixins: [ButtonActions],
  data() {
    return {
      value: "",
      loading: false,
      finished: false,
      refreshing: false,
      pararms: {
        fid: "2005150207380I5RX93RDNOcgQQfQS7",
        limit: 15
      },
      isMaxLength: false,
      list: [],
      columns: [
        {
          showCategory: "mainTitle",
          showMetaColumn: "bt"
        },
        {
          showCategory: "subTitle",
          showMetaColumn: "fk",
          icon: "iconfasongren_danwei1"
        },
        {
          showCategory: "subTitle",
          showMetaColumn: "ry",
          icon: "iconfl-renyuan" //iconfl-renyuan
          // color: "#67C23B"
        },
        {
          showCategory: "subTitle",
          showMetaColumn: "date",
          icon: "iconriqi"
          // color: "#67C23B"
        }
        // {
        //   showCategory: "content",
        //   showMetaColumn: "coment",
        //   icon: "iconshijian",
        //   showRows: 2
        // }
      ]
    };
  },

  methods: {
    onSearch(val) {
      console.log("console");
      this.$router.push({ path: "/search" });
    },
    onCancel() {
      Toast("取消");
    },
    handleActionClick() {
      const action = arguments[0];
      const fn =
        this[`action-${action}`] ||
        function() {
          console.log(`action-${action}`);
        };
      fn(...Array.prototype.slice.call(arguments, 1));
    },
    onhandleHttp(pararms) {
      let url =
        // "fn/list/190318160937LCEKCGdLNoA5yXZFNnR/mobile/q?moduleId=190316150842gGFeRKU0VtkcDlBltcJ";
        "fn/list/200517204724Bc2geU4UAO7ON2brZWB/mobile/q?moduleId=200113151945A52p5tF0hUVkN2RlogI&page=1&limit=100";
      dsf.http
        .post(url, this.pararms)
        .done(res => {
          this.loading = false;
          if (!res) {
            return;
          }
          let arr = [];
          if (!res.datas && res.datas.length == 0) {
            this.finished = true;
            return;
          }
          res.datas.forEach((v, index) => {
            arr.push({
              dataValue: {
                /*  fid: v["dataValue"]["NBJHFW.A0001"],
                bt: v["dataValue"]["NBJHFW.B0001"],
                fk: v["dataValue"]["NBJHFW.200306170515Uc1ksCAXklAkgq3r7N5"],
                dw: v["dataValue"]["NBJHFW.200319172022ToMVNbZnPh4DL3ZsV9Z"],
                ry: v["dataValue"]["NBJHFW.B0009"],
                date: v["dataValue"]["NBJHFW.B0013"] */
                fid: v["dataValue"]["FW_XZD.A0001"],
                bt: v["dataValue"]["FW_XZD.B0001"],
                moduleId:v["dataValue"]["FW_XZD.A0004"],
                fk: v["dataValue"]["FW_XZD.A0005"],
                ry: v["dataValue"]["FW_XZD.B0009"],
                date: v["dataValue"]["FW_XZD.B0013"]
              },
              // buttons: v["buttons"]["commonButton"]
              buttons: {
                //签收情况、关注、置顶
                commonButton: [
                  ...v["buttons"]["commonButton"]
                  // {
                  //   icon: "iconguanzhu",
                  //   action: "guanZhu",
                  //   name: "关注"
                  // },
                  // {
                  //   icon: "iconzhiding",
                  //   action: "zhiDing",
                  //   name: "置顶"
                  // }
                ],
                mainButtons: [
                  ...v["buttons"]["mainButtons"]
                  // {
                  //   action: "qianShouQingKuang",
                  //   name: "签收情况"
                  // }
                ]
              }
            });
          });

          this.list = [...arr];

          this.total = res.total;
          if (this.total <= this.list.length) {
            this.finished = true;
          }
        })
        .error(error => {
          console.log("error", error);
          self.dsf.layer.toast("请求异常", false);
        });
    },
    onLoad() {
      this.onhandleHttp(pararms);
      if (!this.total) {
        return;
      }

      this.$set(this.pararms, "limit", this.pararms.limit + 15);
      let pararms = { ...this.pararms, limit: this.pararms.limit + 15 };
    },
    onRefresh() {
      console.log("onRefresh");
      this.finished = false;
      this.loading = true;
      this.onLoad();
    }
  }
};
</script>

<style lang="scss" scoped>
.ds-postlist {
  .van-search {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
  }
  ::v-deep .van-pull-refresh {
    position: relative;
    top: 54px;
    // min-height: calc(100vh - 54px);
    // border: 1px solid red;
    box-sizing: border-box;
  }
}
</style>
