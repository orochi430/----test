<template>
  <div style="width: 100%; height: 100%" class="dsf-tree">
    <div
      v-for="(item, index) in groupData"
      :key="index"
      style="overflow-y: hidden"
      class="list-group"
    >
    <van-swipe-cell>
      <div class="flex-box treeMargin tree_line">
        <div class="tree_tit" @click="checkAll(item, index)">
          <div>
            <span :class="{ tit_width: !item.children.length > 0 }">{{
              item.showName
            }}</span
            ><span v-if="item.children.length > 0"
              >({{ item.children.length }})</span
            >
          </div>
        </div>
        <div class="isShowChiled" v-if="item.children.length > 0">
          <van-icon v-if="item.isopen" name="arrow-up" />
          <van-icon v-else name="arrow-down" />
          <span class="r_span" @click="item.isopen = !item.isopen">{{
            item.isopen ? "收起" : "展开"
          }}</span>
        </div>
      </div>
    <template #right>
      <van-button @click.stop="deleteGroup(item)" square type="danger" text="删除" />
    </template>
  </van-swipe-cell>
      
      <div
        v-for="(cell, inx) in item.children"
        :key="'index2' + inx"
        :style="{ display: item.isopen ? 'block' : 'none' }"
      >
        <div
          :style="{ 'padding-left': '30px' }"
          class="person"
          @click="userClick(cell, index)"
        >
          <div class="flex-box person_child">
            <van-checkbox
              icon-size="16px"
              class="child_check"
              v-model="cell.checked"
              :shape="`${multiple?'square':'round'}`"
            >
            </van-checkbox>
            <img
              class="van-image"
              :src="getFavicon(cell)"
              alt
              :onerror="default_img"
            />
            <div class="username">{{ cell.showName }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="groupData.length == 0" class="nodata">
      <img src="../../assets/imgs/constructor/wait.png" alt="" />
      <span>暂无分组!</span>
    </div>
  </div>
</template>

<script>
//import req from "@/api/api";
export default {
  name: "addGroup",
  props: ["groupData", "type", "checkData"],
  data: function () {
    return {
      multiple: window.GLOBAL.personMultiple,
      default_img:
        'this.src="' + require("../../assets/imgs/defaultUser.png") + '"',
    };
  },
  created() {},
  mounted() {
  },
  watch: {},
  methods: {
    userClick(item, inx) {
      console.log(item);
      if (!window.GLOBAL.personMultiple) {
        this.groupData.forEach((ele) => {
          if (ele.sId != item.sId) {
            ele.children.forEach((it) => (it.checked = false));
          }
        });
        this.$emit("calltree");
      } else {
        this.groupData.forEach((ele, index) => {
          if (inx != index) {
            ele.children.forEach((it) => {
              if (it.sId == item.sId) {
                it.checked = !item.checked;
              }
            });
          }
        });
      }

      if (item.checked) {
        this.$emit("cutData", item);
      }
    },
    singleChoice() {
      this.groupData.forEach((item) => {
        item.children.forEach((ele) => {
          this.$set(ele, "checked", false);
        });
      });
    },
    checkAll(item) {
      console.log(item);
      console.log(item.checked);
      if (!window.GLOBAL.personMultiple) {
        this.groupData.forEach((ele) => {
          if (ele.sId != item.sId) {
            ele.checked = false;
            ele.children.forEach((it) => this.$set(it, "checked", false));
          }
        });
        this.$emit("calltree");
      } else {
        this.groupData.forEach((ele) => {
          //多选时，若其他小组存有选中人员，一起选中
          if (item.sId != ele.sId) {
            item.children.forEach((it1) => {
              ele.children.forEach((it2) => {
                if (it1.sId == it2.sId) {
                  it2.checked = !item.checked;
                }
              });
            });
          }
        });
      }
      item.checked = !item.checked;
      item.children.forEach((ele) => {
        ele.checked = item.checked;
      });

      if (!item.checked) {
        this.$emit("cutPutyData", item);
      }
    },
    UserData() {
      let data = [];
      this.groupData.forEach((item) => {
        item.children.forEach((ele) => {
          ele.checked ? data.push(ele) : "";
        });
      });
      data.forEach((ele) => {
        ele.id = ele.sId;
        ele.UserName = ele.showName;
        ele.UserID = ele.sId;
        ele.DeptID = ele.deptId;
        ele.DeptName = ele.deptName;
        ele.Type = ele.type;
      });
      return data;
    },
    deleteGroup(item) {
      console.log(item);
      let self = this;
      this.$dialog
        .confirm({
          title: "提示",
          message: "是否删除小组--" + item.showName,
        })
        .then(() => {
          dsf.http
            .post("fn/code/select/deleteSendGroup", {
              id: item.sId,
            })
            .then(function (result) {
              console.log(result);
              if (result.status == "200") {
                self.$emit("getGroup");
              }
            });
        })
        .catch(() => {});
    },
    getFavicon(user) {
      if (user.Photo) {
          return dsf.url.getWebPath(`/fn/mobilePhoto/download?id=${user.id}&time=${new Date().getTime()}`);
      } else {
          return require("../../assets/imgs/defaultUser.png")
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

.child_check {
  margin-right: 8px;
}

::v-deep .child_check .van-checkbox__label {
  display: flex;
}
.van-image {
  margin-right: 3px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
}
.tree_tit {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 5px;
  padding-right: 20px;
  font-size: var(--font_size_2);
  color: #000;
  font-family: PingFangSC-Regular;
  flex: 1;
}
.tree_tit > div {
  display: flex;
  align-items: center;
}
.tree_tit > div :first-child {
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
  margin-left: 10px;
}

.tree_line{
  position: relative;
  
}
.tree_line::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 15px;
  right: 15px;
  height: 1;
  border-bottom: 1px solid #eee;
}
.list-group{
  margin-top: 15px;
  background: #fff;
}
.flex-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 15px;
  min-height: 52px;
  
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 52px;
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
.nodata {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
  text-align: center;
}
.nodata img {
  width: 60%;
}
.nodata span {
  margin-top: 20px;
  color: #c1c9d7 !important;
  font-size: 18px;
}
/deep/.van-swipe-cell__right{
  width: 60px !important;
}
.van-swipe-cell__right button{
  margin: 0 !important;
  width: 100% !important;
  height: 100% !important;
}
</style>
