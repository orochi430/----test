<template>
  <div style="width: 100%; height: 100%" class="dsf-tree">
    <div v-for="(item, index) in personSelectData" :key="'index1' + index" style="overflow-y: hidden; overflow-x: auto">
      <div class="flex-box" v-if="!item.groupId" :class="{ treeMargin: item.deep == 1, tree_line: item.isopen && item.deep == 1 }">
        <!-- 父级是否可选 -->
        <van-checkbox
          icon-size="18px"
          :style="getStyle(item.deep)"
          v-if="!item.attrs.noselect && !(item.attrs.subNodeSelect === false) && !item.itemIndex == 0"
          v-model="item.checked"
          ref="check"
          @click="userClick(item)"
          style="flex: 1"
          :shape="`${multiple ? 'square' : 'round'}`"
        >
          <div class="tree_tit" :class="{ w_normal: !item.attrs.noselect }">
            {{ item.showName || item.name }}
          </div>
        </van-checkbox>
        <div class="tree_tit w_normal" v-else @click="usercheckAll(item, true)" :style="getStyle(item.deep)">
          {{ item.showName || item.name }}
        </div>
        <div class="isShowChiled" @click="checkAll(item)" v-if="item.attrs.childrenCount > 0 || item.children.length > 0">
          <van-icon v-if="item.isopen" name="arrow-up" />
          <van-icon v-else name="arrow-down" />
          <span class="r_span">{{ item.isopen ? "收起" : "展开" }}</span>
          <i v-if="multiple" class="icon iconfont iconcheckAll" @click.stop="userClick(item, true)" />
        </div>
      </div>
      <div v-for="(cell, inx) in item.children" :key="'index2' + inx" :style="{ display: item.isopen ? 'block' : 'none' }">
        <div v-if="!cell.children" :style="getStyle(item.deep + 1)" class="person">
          <div class="flex-box person_child">
            <van-checkbox icon-size="0.32rem" class="child_check" v-model="cell.checked" @click="userClick(cell)" style="flex: 1" :shape="`${multiple ? 'square' : 'round'}`">
              <div class="user-logo">
                <i class="icon iconfont iconyonghu"></i>
              </div>
              <div class="user-name">{{ cell.showName || cell.name }}</div>
            </van-checkbox>
          </div>
        </div>
        <div v-else>
          <add-tree
            :metaId="metaId"
            :selectper="selectper"
            :personSelectData="[cell]"
            @select="selectAll"
            @initData="initData"
            @showDialogClick1="showDialogClick1"
            @fncLoad="fncLoad"
            :extra="extra"
            :currentTab="currentTab"
            :multiple="multiple"
            :checkTotal="checkTotal"
            :person-add-list="personAddList"
            @onChangePerson="val => (personAddList = val)"
          ></add-tree>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "addTree",
  props: ["personSelectData", "selectper", "extra", "multiple", "currentTab", "personAddList", "metaId", "checkTotal", "commonGroup"],
  data: function () {
    return {
      isHidden: false,
      selectIds: [],
      UserAll: [],
      isShowManual: false,
      manualValue: "", // 手动输入的值
      isManual: false, // 是否显示手动输入框
      checkData: {}
    }
  },
  computed: {
    personAddList_: {
      get() {
        return this.personAddList
      },
      set(val) {
        //grants_改变由父组件控制
        this.$emit("on-change-person", val)
      }
    }
  },
  created() {
    this.isHidden = undefined
  },
  mounted() {
    if (this.selectper && this.selectper.length > 0) {
      this.initState(this.personSelectData)
    }
  },
  destroyed() {},
  methods: {
    initState(data) {
      this.selectIds = this.selectper.map(item => item.id)
      data.forEach(item => {
        let id = item.id.split("_").length > 1 ? item.id.split("_")[1] : item.id.split("_")[0]
        let pid = item.pid.split("_").length > 1 ? item.pid.split("_")[1] : item.pid.split("_")[0]
        if (
          this.selectper.find(
            select =>
              select.id.indexOf(id) > -1 &&
              (select.showName == item.showName || select.name == item.name) &&
              ((select.type == 1 && select.pid.indexOf(pid) > -1) || select.type != 1)
          )
        ) {
          item.checked = true
          // 初始化传入选中节点，存入this.personAddList_中
          if (!this.personAddList_.find(it => it.id.indexOf(id) > -1)) {
            this.personAddList_.push(item)
          } else {
            // 由于第一次回显的数据对象是自行拼装的，如果已经存在进行替换操作换成接口返回的对象
            let spliceIndex = this.personAddList_.findIndex(it => it.id.indexOf(id) > -1)
            this.personAddList_.splice(spliceIndex, 1, item)
            // console.log(JSON.parse(JSON.stringify(this.personAddList_)));
          }
        } else {
          item.checked = false
        }
        // }
        if (item.children && item.children.length > 0) {
          // this.initState(item.children);
          item.children.forEach(itm => {
            if (itm.type == 1 || itm.type == undefined) this.initState([itm])
          })
        }
      })
    },
    usercheckAll(item, islabel = false) {
      const self = this
      // 全选时触发事件，如果监听事件中需异步改变checked，只能将checkAll作为回调在改变后再次执行
      self.$bus.emit("usercheckAllBus", {
        user: item,
        metaId: self.metaId,
        callback: self.checkAll
      })
      self.checkAll(item, islabel)
    },
    checkAll(item, islabel = false) {
      let self = this
      let originalIsopen = item.isopen
      if (!islabel || !item.isopen) self.$set(item, "isopen", !item.isopen)
      if (item.attrs.childrenCount > 0 && !item.children.length > 0) {
        //点中了父级节点
        //准备获取当前节点下的人

      } else {
        //点中了子级--选中
        if (!item.children.length > 0) {
          if (item.checked) {
            this.personAddList_.forEach((del, inx) => {
              if (del.pid == item.pid) {
                this.personAddList_.splice(inx, 1)
              }
            })
          } else {
            this.personAddList_.push(item)
          }
          self.userClick(item)
        } else {
          if (islabel && originalIsopen) self.setSelectUser(item, islabel)
        }
      }
    },
    addPersonDeep(data, start) {
      let self = this
      this.$set(data, "deep", start)
      this.$set(data, "isopen", start <= 1 ? true : false)
      if (data.children && data.children.length > 0) {
        this.$set(data, "personChildrenLen", data.children.filter(it => it.type == 1).length)
        data.children.forEach(item => {
          self.addPersonDeep(item, start + 1)
        })
      }
    },
    //获取选择的人
    selectAll(data) {
      data = this.formatData(data)
      this.$emit("select", data)
    },
    fncLoad() {
      this.$emit("fncLoad")
    },
    initData(data) {
      this.$emit("initData")
    },
    getStyle(deep) {
      let styleObj = {
        "padding-left": (deep - 1) * 30 + "px",
        "box-sizing": "border-box"
      }
      return styleObj
    },
    itemClick(item) {
      this.$set(item, "checked", !item.checked)
      console.log(item)
    },
    //加载子节点数据，参数是父节点
    loadChildData(item, islabel) {
      console.log(this.selectper)
      let groupId = []
      this.selectper.forEach(ele => {
        if (ele.groupId) {
          ele.children.forEach(it => {
            groupId.push(it.id)
          })
        }
      })
      if (groupId.includes(item.id)) {
        item.checked = false
        dsf.layer.toast(`已有小组选中${item.showName}，不可操作！`)
        return
      }
      if (islabel) {
        let flag = false
        let name = ""
        item.children.forEach(ele => {
          if (groupId.includes(ele.id)) {
            flag = true
            name = ele.showName
          }
        })
        if (flag) {
          item.checked = false
          dsf.layer.toast(`已有小组选中该单位下${name}，请手动操作！`)
          return
        }
      }
      const self = this
      if (item.attrs.childrenCount > 0 && item.children.length <= 0) {
        //点中了父级节点
        //准备获取当前节点下的人
        let getDepts = Object.assign({}, this.currentTab)
        if (this.checkTotal) {
          getDepts.action = getDepts.action.replace("async=true", "async=false")
        }
        let customRoot = item.id.split("_").length > 1 ? item.id.split("_")[item.id.split("_").length - 1] : item.id
        dsf.http
          .get(getDepts.action + `&doType=${getDepts.subTabKey}&asyncRequest=true&customRoot=${customRoot}&nodeType=${item.type}`, getDepts.urlParams || {})
          .then(function (result) {
            let getChild = result.data.data.departmentList
            getChild.forEach(inx => {
              self.addPersonDeep(inx, item.deep + 1)
              item.children.push(inx)
            })

            self.setSelectUser(item, islabel)
          })
      } else {
        console.log("load child")
        if (this.checkTotal) {
          // 将同步数据替换异步数据，解决已加载的异步数据无后续数据，只能选择当前节点的bug
          self.selectAllUser(item, islabel)
        } else {
          self.setSelectUser(item, islabel)
        }
      }
    },
    selectAllUser(item, islabel) {
      //全选下级
      const self = this
      if (item.attrs.childrenCount > 0 && item.children.length <= 0) {
      } else {
        self.setSelectUser(item, islabel)
      }
    },
    loopUser(data) {
      //递归获取全部下级人员
      data.forEach(ele => {
        if (!ele.attrs.noselect) {
          this.UserAll.push(ele)
        } else {
          ele.children?.length > 0 ? this.loopUser(ele.children) : ""
        }
      })
    },
    syncData(data) {
      //同步数据
      data.forEach(ele => {
        this.$set(ele, "checked", false)
        if (ele.children?.length > 0) {
          this.syncData(ele.children)
        }
      })
    },
    userClick(user, islabel = false) {
      const self = this
      if (islabel && !user.isopen) self.$set(user, "isopen", !user.isopen)
      self.loadChildData(user, islabel)
    },
    setSelectUser(user, islabel) {
      const self = this
      if (this.multiple) {
        if (!islabel) {
          // 仅操作父级
          if (user.checked) {
            this.personAddList_.push(user)
          } else {
            let delIndex = this.personAddList_.findIndex(item => user.id.split("_")[user.id.split("_").length - 1] == item.id)
            if (delIndex > -1) this.personAddList_.splice(delIndex, 1)
          }
        } else {
          // 仅操作下级
          if (user.children && user.children.length > 0) {
            // 全选下级
            let condition = []
            user.children.forEach(item => {
              item.attrs.noselect ? "" : condition.push(item)
            })
            if (condition.every(item => !!item.checked == false)) {
              if (this.checkTotal) {
                //选中全部下级
                this.UserAll = []
                this.loopUser(user.children)
                user.children.forEach(item => {
                  if (!!item.attrs.noselect) return
                  self.$set(item, "checked", true)
                })
                console.log(this.UserAll)
                this.UserAll.forEach(item => {
                  self.$set(item, "checked", true)
                  this.personAddList_.push(item)
                })
              } else {
                //当前节点下级
                user.children.forEach(item => {
                  if (!!item.attrs.noselect) return
                  if (!item.checked) {
                    self.$set(item, "checked", true)
                    this.personAddList_.push(item)
                  }
                })
              }
            } else {
              //取消下级
              if (this.checkTotal) {
                //获取全部下级
                this.UserAll = []
                this.loopUser(user.children)
                // user.children.forEach((item) => {
                //     self.$set(item, "checked", false);
                // });
                this.syncData(user.children)
                console.log(user.children)
                this.UserAll.forEach(item => {
                  let delIndex = this.personAddList_.findIndex(toy => item.id.split("_")[item.id.split("_").length - 1] == toy.id)
                  if (delIndex > -1) this.personAddList_.splice(delIndex, 1)
                })
              } else {
                //当前节点下级
                user.children.forEach(item => {
                  self.$set(item, "checked", false)
                  let delIndex = this.personAddList_.findIndex(toy => item.id.split("_")[item.id.split("_").length - 1] == toy.id)
                  if (delIndex > -1) this.personAddList_.splice(delIndex, 1)
                })
              }
            }
          }
        }
      } else {
        // 单选
        if (user.checked) {
          this.personAddList_.forEach(toy => {
            if (toy.id != user.id) self.$set(toy, "checked", false)
          })
          this.personAddList_.splice(0, this.personAddList_.length, user)
        } else {
          this.personAddList_.forEach((toy, inx) => {
            self.$set(toy, "checked", false)
          })
          this.personAddList_.splice(0, this.personAddList_.length)
        }
      }
      console.log(this.personAddList_)
      this.personAddList_ = this.formatData(this.personAddList_)

      this.$emit("select", this.personAddList_)
      this.$forceUpdate()
    },
    showDialogClick1(item) {
      this.$emit("showDialogClick1", item)
    },
    deleteGroup(item) {
      console.log(item)
      let self = this
      this.$dialog
        .confirm({
          title: "提示",
          message: "是否删除小组--" + item.showName
        })
        .then(() => {
          dsf.http
            .post("/ctrl/org/select/groupRemove", {
              groupId: item.groupId
            })
            .then(function (result) {
              console.log(result)
              if (result.status == "200") {
                dsf.layer.toast(result.data.message)
                self.$emit("initData")
              }
            })
        })
        .catch(() => {})
    },
    formatData(dataArr) {
      //去重
      let hash = {}
      const data2 = dataArr.reduce((preVal, curVal) => {
        if (curVal.id.split("_").length > 1) {
          var id = curVal.id.split("_")[1]
          hash[id] ? "" : (hash[id] = true && preVal.push(curVal))
        } else {
          hash[curVal.id] ? "" : (hash[curVal.id] = true && preVal.push(curVal))
        }

        return preVal
      }, [])
      data2.forEach(idx => {
        if (idx.id.split("_").length > 1 && idx.id.split("_")[1]) {
          idx.id = idx.id.split("_")[1]
          idx.pid = idx.pid.split("_").length > 1 ? idx.pid.split("_")[1] : idx.pid.split("_")[0]
          if (idx.children && idx.children.length > 0) {
            idx.children.forEach(inx => {
              inx.id = inx.id.split("_").length > 1 ? inx.id.split("_")[1] : inx.id.split("_")[0]
              inx.pid = inx.pid.split("_").length > 1 ? inx.pid.split("_")[1] : inx.pid.split("_")[0]
            })
          }
        }
      })
      return data2
    },
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";
.dsf-tree {
  @include font_4(true);
}

.r_line {
  width: 1px;
  @include background-theme("normal");
  display: inline-block;
  height: 22px;
  margin-top: 2px;
}

.isShowChiled {
  // flex: 1;
  text-align: right;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  margin-left: 6px;
  padding-top: 4px;
  .van-icon {
    @include font-theme("normal");
  }
}
.icontianjia {
  margin-top: 3px;
  margin-right: 5px;
  font-size: 20px;
  @include font-theme("normal");
}
.iconcheckAll {
  margin-right: 5px;
  font-size: 24px;
  @include font-theme("normal");
}

.isShowChiled .r_span {
  @include font-theme("normal");
  display: flex;
  align-items: center;
  margin: 0px 6px 0px 15px;
}

.child_check {
  margin-right: 10px;
}

::v-deep .child_check .van-checkbox__label {
  display: flex;
}

.tree_tit {
  padding-left: 4px;
  font-size: var(--font_size_2);
  color: #000;
  font-family: PingFangSC-Regular;
  flex: 3;
  overflow: hidden;
  width: 100%;
  // overflow: scroll;
  // text-overflow: ellipsis;
  // overflow: hidden;
}

.tree_tit span {
  font-family: PingFangSC-Regular;
  font-size: var(--font_size_2);
  color: #a2a2a2;
  margin-left: 6px;
}

.flex-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 15px;
  min-height: 52px;
  background: #fff;
}
.flex-box > div {
  height: 100%;
}

.tree_line {
  position: relative;
}
.tree_line::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 15px;
  right: 15px;
  height: 1;
  border-bottom: 1px solid #eee;
}
.treeMargin {
  margin-top: 10px;
}

.open-status {
  // background-image: url("../../assets/imgs/workflow/icon_institution_down.png");
  background-image: url("../../../assets/imgs/chooseUser/wbj-close.png");
  background-size: cover;
}

.close-status {
  // background-image: url("../../assets/imgs/workflow/icon_institution_right.png");
  background-image: url("../../../assets/imgs/chooseUser/wbj-open.png");
  background-size: cover;
}

.nocheck-status {
  background-image: url("../../../assets/imgs/workflow/check_no.png");
  background-size: cover;
}

.checked-status {
  background-image: url("../../../assets/imgs/workflow/check_yes.png");
  background-size: cover;
}

.icon-nocheck-status {
  background-image: url("../../../assets/imgs/workflow/icon_nocheck_ah.png");
  background-size: cover;
}

.icon-checked-status {
  background-image: url("../../../assets/imgs/workflow/icon_check_ah.png");
  background-size: cover;
}

.person {
  height: 38px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  /* border-bottom: 1px solid #ddd; */
}

.person_child {
  height: 38px;
  width: 100%;
}

.user-logo {
  margin-top: 2px;
  width: 22px;
  height: 22px;
  margin-right: 8px;
}

.user-name {
  margin-top: 2px;
}

.user-logo i {
  @include font-theme("normal");
  font-size: var(--font_size_0);
}

.dept-icon {
  width: 22px;
  height: 22px;
  background-image: url("../../../assets/imgs/workflow/icon_institution_level_one.png");
  background-size: cover;
  margin-right: 5px;
}

._c {
  @include font-theme("normal");
  @include font_3();
}

.w_normal {
  white-space: normal !important;
  text-align: justify;
}
/deep/ .van-swipe-cell__right {
  padding-left: 10px;
}
</style>
