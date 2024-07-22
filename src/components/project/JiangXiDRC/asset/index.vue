<template>
  <div class="container">
    <commonempty v-if="errored" image="error" description="请检查配置" />
    <div v-else>
      <div v-if="!dsf.config.homePage.asset.isHideWelcomeWords" class="title">
        <div class="top">
          <span>欢迎使用</span
          ><strong style="padding-left: 16px">固定资产管理系统</strong>
        </div>
        <div class="bottom">统一计划，分级管理</div>
      </div>
      <div class="bg">
        <img
          src="static/images/jiangxiDRC/bg.png"
          alt=""
          data-img="scan-2"
          data-img2="scan-1"
        />
      </div>
      <div class="btn">
        <div
          v-for="(btn, idx) in myBtns"
          :class="{ active: active == idx }"
          :key="idx"
          class="btn-saoma"
          @click="act(btn, idx)"
        >
          <div class="left">{{ btn.name }}</div>
          <div class="right">
            <img :src="active == idx ? btn.activeImg : btn.img" alt="" />
          </div>
        </div>
      </div>
      <div class="blank"></div>
      <div v-if="!dsf.config.homePage.asset.isHideCpoyright" class="p-bottom">
        江西省发展和改革委员会
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errored: false,
      active: 0,
      btns: [
        {
          id: 1,
          name: "扫码登记",
          img: "static/images/jiangxiDRC/scan-1.png",
          activeImg: "static/images/jiangxiDRC/scan-2.png",
          type: "scan"
        },
        {
          id: 2,
          name: "扫码查看",
          img: "static/images/jiangxiDRC/query-1.png",
          activeImg: "static/images/jiangxiDRC/query-2.png",
          type: "query"
        },
        {
          id: 3,
          name: "固定资产查询",
          img: "static/images/jiangxiDRC/fixed-assets-1.png",
          activeImg: "static/images/jiangxiDRC/fixed-assets-2.png",
          type: "showAll"
        },
        {
          id: 4,
          name: "个人资产查询",
          img: "static/images/jiangxiDRC/person-assets-1.png",
          activeImg: "static/images/jiangxiDRC/person-assets-2.png",
          type: "showMine"
        }
      ],
      myBtns: [],
      role: "0",
      entryModuleId: dsf.config.homePage.asset.form.entry.moduleId,
      entryListId: dsf.config.homePage.asset.form.entry.listId,
      checkModuleId: dsf.config.homePage.asset.form.check.moduleId,
      checkListId: dsf.config.homePage.asset.form.check.listId
    };
  },
  created() {
    console.log("getClientName =", dsf.util.getClientName());
    let self = this;
    if (!dsf.config.homePage.asset) self.errored = true;
    self.getMyFuncs();
    console.log("dsf.dd", dsf.dd);
  },
  methods: {
    // 按钮操作
    act(btn, idx) {
      let self = this;
      self.active = idx;
      switch (btn.type) {
        case "scan":
          self.scan();
          break;
        case "query":
          self.query();
          break;
        case "showAll":
          self.showAll();
          break;
        case "showMine":
          self.showMine();
          break;
        default:
          self.scan();
      }
    },
    // 扫码
    scan() {
      let self = this;
      if (dsf.util.getClientName() == "app") {
        xsfBarcode.scan(
          res => {
            console.log("scan", res);
            if (!res.cancelled) {
              self.warehouse(res.text);
            }
          },
          error => {
            alert("扫码失败: " + error);
          }
        );
      } else if (dsf.dd) {
        dsf.dd.scan(
          function(res) {
            //--调用成功;
            console.log("scan", res);
            self.warehouse(res.text);
          },
          function(err) {
            console.log(err);
          }
        );
      } else {
        // dsf.layer.alert('需在app中进行扫码')
        dsf.layer.alert({
          // title: '温馨提示',
          message: `需在app或赣政通中进行扫码`
        });
      }
    },
    // 入库
    warehouse(barcode) {
      let self = this;
      if (barcode) {
        // 入库校验
        dsf.http
          .post(`fn/assets/checkCode`, {
            code: barcode
          })
          .done(res => {
            if (res.type == "success") {
              if (res.data == "0") {
                // 未入库
                self.$router.push({
                  path: `/commonForm/${self.entryModuleId}`,
                  query: {
                    code: barcode,
                    listId: self.entryListId,
                    method: "ydedit"
                  }
                });
              } else {
                //已入库
                dsf.layer.alert({
                  // title: '温馨提示',
                  message: `该条码已完成入库登记`
                });
              }
            } else {
              // dsf.layer.toast(`${res.message}`);
              dsf.layer.alert({
                // title: '温馨提示',
                message: `${res.message}`
              });
            }
          })
          .error(error => {
            console.log("error =", error);
            // dsf.layer.toast(`${error.message}`);
            dsf.layer.alert({
              // title: '温馨提示',
              message: `${error}`
            });
          });
      } else {
        dsf.layer.alert({
          // title: '温馨提示',
          message: `无效的条形码`
        });
      }
    },
    // 查询
    query() {
      let self = this;
      if (dsf.util.getClientName() == "app") {
        xsfBarcode.scan(
          res => {
            console.log("scan", res);
            if (!res.cancelled) {
              self.checkAsset(res.text);
            }
          },
          error => {
            alert("扫码失败: " + error);
          }
        );
      } else if (dsf.dd) {
        dsf.dd.scan(
          function(res) {
            //--调用成功;
            console.log("scan", res);
            self.checkAsset(res.text);
          },
          function(err) {
            console.log("scan-err", err);
          }
        );
      } else {
        // dsf.layer.alert('需在app中进行扫码')
        dsf.layer.alert({
          // title: '温馨提示',
          message: `需在app中进行扫码`
        });
      }
    },
    checkAsset(barcode) {
      let self = this;
      if (barcode) {
        // 查询资产pk
        dsf.http
          .post(`fn/assets/getPKByCode`, {
            code: barcode
          })
          .done(res => {
            if (res.type == "success") {
              self.$router.push({
                path: `/commonForm/${self.checkModuleId}/${res.data}`,
                query: {
                  listId: self.checkListId,
                  method: "ydview"
                }
              });
            } else {
              // dsf.layer.toast(`${res.message}`);
              dsf.layer.alert({
                // title: '温馨提示',
                message: `${res.message}`
              });
            }
          })
          .error(error => {
            console.log("getPKByCode-error =", error);
            // dsf.layer.toast(`${error.message}`);
            dsf.layer.alert({
              // title: '温馨提示',
              message: `${error.message}`
            });
          });
      } else {
        dsf.layer.alert({
          // title: '温馨提示',
          message: `无效的条形码`
        });
      }
    },
    // 固定资产查询
    showAll() {
      let self = this;
      let url = "";
      if (self.menus && self.menus.authorized) {
        // switch (self.role) {
        //     case "1":
        //         url = dsf.config.homePage.asset.queryUrlDept;
        //         break;
        //     case "2":
        //         url = dsf.config.homePage.asset.queryUrlUnit;
        //         break;
        //     default:
        //         url = "";
        // }
        let menu = self.menus.authorized.find(item => item.role == self.role);
        if (menu) url = menu.url;
      }
      if (url) {
        self.$router.push({
          path: url
        });
      } else {
        dsf.layer.alert({
          // title: '温馨提示',
          message: `请配置链接地址`
        });
      }
    },
    // 个人资产查看
    showMine() {
      let self = this;
      let url = "";
      if (self.menus) url = self.menus.personal;
      if (url) {
        self.$router.push({
          path: url
        });
      } else {
        dsf.layer.alert({
          // title: '温馨提示',
          message: `请配置链接地址`
        });
      }
    },
    getMyFuncs() {
      let self = this;
      dsf.http
        .get(`fn/assets/myFuncs`)
        .done(res => {
          if (res.type == "success") {
            console.log("myFuncs", res);
            self.role = res.jslx;
            self.myBtns = self.btns.filter((item, idx) =>
              res.data.includes(item.id)
            );
          } else {
            dsf.layer.toast(`${res.message}`);
          }
        })
        .error(error => {
          console.log("myFuncs-error =", error);
          // dsf.layer.toast(`${error.message}`);
        })
        .always(() => {
          // self.loading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.blank {
  height: 1rem;
}

.container {
  background-color: #fff;

  .title {
    padding: 22px 22px 0;

    .top {
      font-size: 22px;
    }

    .bottom {
      font-size: 15px;
      padding-top: 12px;
    }
  }

  .bg {
    padding: 16px 22px;
  }

  .btn {
    margin: 0 34px;

    .btn-saoma {
      margin-bottom: 14px;
      padding: 16px 26px;
      border-radius: 2vw;
      background: #f7f7f7
        url("../../../../../static/images/jiangxiDRC/bg-2.png") no-repeat right
        center;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-size: 100px 100%;
      color: #355e92;

      .left {
        font-size: 22px;
      }

      .right {
        img {
          width: 30px;
          height: 30px;
        }
      }
    }

    .active {
      background: #355e92;
      color: #fff;
    }
  }

  .p-bottom {
    padding: 16px;
    text-align: center;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>
