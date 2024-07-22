<template>
  <!-- 自己封装出来一个配合postMessage的组件 2019-12-30 =。=   -->
  <div style="width: 100%; height: 100%" class="dsf-tree">
    <div
      v-for="(item, index) in personSelectData"
      :key="'index1' + index"
      style="overflow-y: hidden"
    >
      <div
        class="flex-box"
        :class="{ treeMargin: !deep, tree_line: item.isopen && !deep }"
      >
        <!-- 父级是否可选 -->
        <!--<div  @click="userClick(item)" :style="{'width':'16px','height':'16px','margin-right':'10px'}" :class="{'open-status':item.isopen,'close-status':!item.isopen}"></div>-->
        <van-checkbox
          icon-size="18px"
          v-if="!item.attrs.noselect"
          v-model="item.checked"
          ref="check"
          @click="userClick(item)"
          :shape="`${multiple ? 'square' : 'round'}`"
        ></van-checkbox>
        <img
          class="van-image"
          v-if="
            !item.attrs.noselect &&
            dsf.config.commonForm &&
            dsf.config.commonForm.isshowPhoto
          "
          :src="getFavicon(item)"
          alt
          :onerror="default_img"
        />
        <div class="tree_tit">
          <span :class="{ tit_width: !item.children.length > 0 }">{{
            item.showName
          }}</span
          ><span
            :class="{
              active:
                InListState ||
                personSelectData[0].children?.find(
                  (ele) => ele.checked && ele.Type != 0
                ),
            }"
            v-if="item.children.length > 0"
            >({{ item.children.length }})</span
          >
        </div>
        <div
          class="isShowChiled"
          @click.stop="checkAll(item)"
          v-if="item.children.length > 0"
        >
          <van-icon v-if="item.isopen" name="arrow-up" />
          <van-icon v-else name="arrow-down" />
          <span class="r_span">{{ item.isopen ? "收起" : "展开"  }}</span>
          <i
            v-if="multiple&&!item.hideCheckAll &&!(item.unitId&&item.unitId == item.id)"
            class="icon iconfont iconcheckAll"
            @click.stop="checkAll(item, 'check')"
          />
        </div>
      </div>
      <div
        v-for="(cell, inx) in item.children"
        :key="'index2' + inx"
        class="child"
        :style="{ display: item.isopen ? 'block' : 'none' }"
      >
        <div
          v-if="cell.type == 1"
          :style="{ 'padding-left': '30px' }"
          class="person"
          @click="userClick(cell)"
        >
          <div class="flex-box person_child">
            <van-checkbox
              icon-size="16px"
              class="child_check"
              v-model="cell.checked"
            >
              <div class="user-logo">
                <i class="icon iconfont iconyonghu"></i>
              </div>
              <div class="username">{{ cell.showName }}</div>
            </van-checkbox>
          </div>
        </div>
        <div v-else :style="getStyle(item.deep)">
          <add-tree
            :deep="true"
            :multiple="multiple"
            :personSelectData="[cell]"
            @select="selectAll"
          ></add-tree>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import req from "@/api/api";
export default {
  name: "addTree",
  props: ["personSelectData", "type", "multiple", "deep"],
  data: function () {
    return {
      default_img:
        'this.src="' + require("../../assets/imgs/defaultUser.png") + '"',
      InListState: false,
    };
  },
  created() {
    this.$set(
      this.personSelectData[0],
      "isopen",
      !this.personSelectData[0].state
    );
    // if (this.personSelectData) {
    //   this.personSelectData[0].isopen=true;
    // }
    //当存在默认选中值时，先加载;
    window.GLOBAL.ParentNode = [];
    if (!window.GLOBAL.personAddList) window.GLOBAL.personAddList = [];
    if (
      this.personSelectData[0].checked == true &&
      (this.personSelectData[0].Type == 1 || this.personSelectData[0].Type == 2)
    ) {
      window.GLOBAL.personAddList instanceof Array
        ? window.GLOBAL.personAddList.push(this.personSelectData[0])
        : (window.GLOBAL.personAddList = this.personSelectData);
      window.GLOBAL.renderList = window.GLOBAL.personAddList; // 初始化时保存默认数据，多次打开不会触发created，在secPerson加上判断是否置空
    }
  },
  mounted() {
    let self = this;
    this.$bus.$on("InListState", (val) => {
      window.GLOBAL.personAddList = val;
      let DeptIDs = "";
      let IDs = "";
      if (val.length > 0) {
        val.forEach((ele) => {
          if (ele.Type != 0) DeptIDs += ele.DeptID + ",";
          if (ele.Type != 0) IDs += ele.id + ",";
        });
      }
      if (
        IDs &&
        IDs.includes(this.personSelectData[0].id) &&
        DeptIDs.includes(this.personSelectData[0].DeptID) &&
        this.personSelectData[0].Type != 0
      ) {
        this.$set(this.personSelectData[0], "checked", true);
      } else {
        this.$set(this.personSelectData[0], "checked", false);
      }

      // if (
      //   val &&
      //   val.includes(this.personSelectData[0].DeptID) &&
      //   this.personSelectData[0].Type == 0
      // ) {
      //   self.InListState = true;
      // } else {
      //   self.InListState = false;
      // }
    });
  },
  watch: {},
  methods: {
    checkAll(item, ischeckAll) {
      if (item.children && item.children.length > 0) {
        if (!ischeckAll) {
          this.$set(item, "isopen", !item.isopen);
        } else {
          // 多选时则全选下级
          if (!item.isopen) this.$set(item, "isopen", !item.isopen);
          if (window.GLOBAL.personMultiple) {
            this.$set(item, "checked", !item.checked);
            this.userClick(item);
          }
        }
        if (item.isopen) {
          window.GLOBAL.ParentNode.push(item);
        } else {
          window.GLOBAL.ParentNode.forEach((del, inx) => {
            if (del.showName == item.showName) {
              window.GLOBAL.ParentNode.splice(inx, 1);
            }
          });
        }
      } else {
        if (item.checked) {
          this.$delete(item, "checked");
          this.$set(item, "checked", false);
        } else {
          this.$delete(item, "checked");
          this.$set(item, "checked", true);
        }
        this.userClick(item);
      }
    },
    //获取选择的人
    selectAll(data) {
      this.$emit("select", data);
    },
    getStyle(deep) {
      return {
        "padding-left": 30 + "px",
        "box-sizing": "border-box",
      };
    },
    mapTree(data, state) {
      data.children.forEach((item) => {
        item.checked = state;
        if (item.checked) {
          window.GLOBAL.personAddList.push(item);
        } else {
          window.GLOBAL.personAddList.forEach((del, inx) => {
            if (del.showName == item.showName) {
              window.GLOBAL.personAddList.splice(inx, 1);
            }
          });
        }
        if (item.children && item.children.length > 0) {
          this.mapTree(item, state);
        }
      });
    },
    userClick(user) {
      const self = this;
      if (window.GLOBAL.personMultiple) {
        if (user.checked) {
          window.GLOBAL.personAddList.push(user);
          if (user.children && user.children.length > 0) {
            //选中父级
            window.GLOBAL.ParentNode.push(user);
            this.mapTree(user, user.checked);
          }
        } else {
          if (user.children && user.children.length > 0) {
            //取消选中父级
            window.GLOBAL.ParentNode.forEach((del, inx) => {
              if (del.id == user.id && del.DeptID == user.DeptID) {
                window.GLOBAL.ParentNode.splice(inx, 1);
              }
            });
            this.mapTree(user, user.checked);
          }
          window.GLOBAL.personAddList.forEach((del, inx) => {
            if (del.id == user.id && del.DeptID == user.DeptID) {
              window.GLOBAL.personAddList.splice(inx, 1);
            }
          });
        }
      } else {
        if (user.checked) {
          //该段代码多余注释
          window.GLOBAL.personAddList.forEach((toy) => {
            self.$set(toy, "checked", false);
          });
          window.GLOBAL.personAddList = [];
          window.GLOBAL.personAddList.push(user);
        } else {
          window.GLOBAL.personAddList.forEach((toy, inx) => {
            self.$set(toy, "checked", false);
            if (toy.id == user.id && toy.DeptID == user.DeptID) {
              window.GLOBAL.personAddList.splice(inx, 1);
            }
          });
        }
      }
      //去重
      let dataArr = window.GLOBAL.personAddList;
      let hash = {};
      const data2 = dataArr.reduce((preVal, curVal) => {
        if (curVal.Type == "2") {
          hash[curVal.id + curVal.DeptID + curVal.RoleID]
            ? ""
            : (hash[curVal.id + curVal.DeptID + curVal.RoleID] =
                true && preVal.push(curVal));
        } else {
          hash[curVal.id + curVal.DeptID]
            ? ""
            : (hash[curVal.id + curVal.DeptID] = true && preVal.push(curVal));
        }
        return preVal;
      }, []);
      data2.forEach((idx) => {
        if (idx.id && idx.id.split("_").length > 1 && idx.id.split("_")[1]) {
          idx.id = idx.id.split("_")[1];
          idx.pid = idx.pid.split("_")[1];
          if (idx.children && idx.children.length > 0) {
            idx.children.forEach((inx) => {
              inx.id =
                inx.id.split("_").length > 1
                  ? inx.id.split("_")[1]
                  : inx.id.split("_")[0];
              inx.pid =
                inx.pid.split("_").length > 1
                  ? inx.pid.split("_")[1]
                  : inx.pid.split("_")[1];
            });
          }
        }
      });
      window.GLOBAL.personAddList = data2;
      // console.log("选中的父节点", window.GLOBAL.ParentNode);
      //如果父节点下的所有子元素都未选中，就取消父节点的选中状态
      window.GLOBAL.ParentNode.forEach((par) => {
        let isParentNodeCheckedFalse = par.children.find(
          (child) => child.checked == true
        );
        let isParentNodeCheckedTrue = par.children.find(
          (child) => child.checked == false
        );
        if (isParentNodeCheckedFalse == undefined) {
          this.$delete(par, "checked");
          this.$set(par, "checked", false);
        }
        if (isParentNodeCheckedTrue == undefined) {
          this.$delete(par, "checked");
          this.$set(par, "checked", true);
        }
      });
      this.$emit("select", data2);
      this.$forceUpdate();

      // // 当人员选中，改变当前节点的选中样式
      // let InListStateDeptIDs = "";
      // data2.forEach((ele) => {
      //   if (ele.Type != 0) InListStateDeptIDs += ele.DeptID + ",";
      // });
      // this.$bus.$emit("InListState", InListStateDeptIDs);
    },

    getFavicon(user) {
      if (user.Photo) {
        return dsf.url.getWebPath(
          `/fn/mobilePhoto/download?id=${user.id}&time=${new Date().getTime()}`
        );
      } else {
        return require("../../assets/imgs/defaultUser.png");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.dsf-tree {
  @include font_4(true);
}

.tree_line .van-icon,
.person .van-icon {
  line-height: unset !important;
}

.r_line {
  width: 1px;
  background: #dddddd;
  display: inline-block;
  height: 22px;
  margin-top: 10px;
}

.flex-box .van-icon {
  line-height: unset;
}

.isShowChiled {
  width: 70px;
  height: 100%;
  text-align: right;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  line-height: 43px;
}

.isShowChiled .r_span {
  @include font-theme("normal");
  line-height: 43px;
  margin: 0px 6px 0px 15px;
}

.isShowChiled i {
  @include font-theme("normal");
}
.iconcheckAll {
  font-size: 24px;
  @include font-theme("normal");
}
.child_check {
  margin-right: 10px;
}

::v-deep .child_check .van-checkbox__label {
  display: flex;
}
.van-checkbox {
  margin-right: 10px;
}
.van-image {
  width: 25px;
  height: 25px;
  border-radius: 50%;
}
.tree_tit {
  display: flex;
  // margin-left: 5px;
  font-size: var(--font_size_2);
  color: #000;
  font-family: PingFangSC-Regular;
  flex: 1;
  .active {
    // @include font-theme("normal");
  }
}

.tree_tit :first-child {
  height: 100%;
  display: inline-block;
  max-width: 144px;
  overflow: hidden;
  color: #000;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tree_tit .tit_width {
  max-width: 244px;
}

.tree_tit span {
  font-family: PingFangSC-Regular;
  font-size: var(--font_size_2);
  color: #a2a2a2;
  margin-left: 5px;
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

.flex-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 15px;
  min-height: 52px;
  background: #fff;
}
.child {
  background: #fff;
}

.open-status {
  // background-image: url("../../assets/imgs/workflow/icon_institution_down.png");
  background-image: url("../../assets/imgs/chooseUser/wbj-close.png");
  background-size: cover;
}

.close-status {
  // background-image: url("../../assets/imgs/workflow/icon_institution_right.png");
  background-image: url("../../assets/imgs/chooseUser/wbj-open.png");
  background-size: cover;
}

.nocheck-status {
  background-image: url("../../assets/imgs/workflow/check_no.png");
  background-size: cover;
}

.checked-status {
  background-image: url("../../assets/imgs/workflow/check_yes.png");
  background-size: cover;
}

.icon-nocheck-status {
  background-image: url("../../assets/imgs/workflow/icon_nocheck_ah.png");
  background-size: cover;
}

.icon-checked-status {
  background-image: url("../../assets/imgs/workflow/icon_check_ah.png");
  background-size: cover;
}

.person {
  height: 38px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
}

.person_child {
  width: 100%;
  height: 38px;
}

.person_child .username {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 80%;
}

.user-logo {
  width: 22px;
  height: 22px;
  margin-right: 8px;
  line-height: 24px;
}

.user-logo i {
  @include font-theme("normal", true);
  font-size: var(--font_size_0);
}

// .user-logo {
//     width: 18px;
//     height: 18px;
//     background-image: url("../../assets/imgs/workflow/icon_institution_level_two.png");
//     background-size: cover;
//     margin-right: 8px;
// }

.dept-icon {
  width: 22px;
  height: 22px;
  background-image: url("../../assets/imgs/workflow/icon_institution_level_one.png");
  background-size: cover;
  margin-right: 5px;
}

._c {
  @include font-theme("normal");
  @include font_3();
}
</style>
