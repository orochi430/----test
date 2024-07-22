<template>
  <div class="checkusers">
    <van-nav-bar
      title="选中范围"
      placeholder
      @click-left="define"
      @click-right="showDialog = true"
    >
      <template #left>
        <van-icon name="arrow-down" />
      </template>
      <template v-if="orgType" #right>
        <van-button type="theme" size="mini" v-if="selectArr_.length > 0"
          >存为小组</van-button
        >
      </template>
    </van-nav-bar>
    <draggable
      group="people"
      class="list-group"
      ghost-class="ghost"
      chosenClass="chosen"
      v-model="selectArr_"
      animation="200"
      handle=".sort"
      @sort="onEnd"
    >
      <div
        class="list-group-item"
        v-for="(item, index) in selectArr_"
        :key="index"
      >
        <div class="item-top">
          <span>{{ item.showName || item.name }}</span>
          <div>
            <div
              class="isShowChiled"
              v-if="item.children && item.children.length > 0 && item.groupId"
              @click="showClick(item)"
            >
              <span class="r_span">{{ item.isopen ? "收起" : "展开" }}</span>
              <van-icon v-if="item.isopen" name="arrow-up" />
              <van-icon v-if="!item.isopen" name="arrow-down" />
            </div>
            <div class="sort" style="padding: 0 10px">
              <van-icon name="sort" size="15" />
            </div>
            <van-icon @click="del(item, index)" size="0.36rem" name="cross" />
          </div>
        </div>
        <div
          class="item-bottom"
          v-if="
            item.children &&
            item.children.length > 0 &&
            item.groupId &&
            item.isopen
          "
        >
          <span v-for="it in item.children" :key="it.id">{{
            it.showName || it.name
          }}</span>
        </div>
      </div>
    </draggable>
    <van-dialog
      v-model="showDialog"
      title="新建小组--命名"
      show-cancel-button
      :before-close="saveGroup"
    >
      <input class="input-g" v-model="inputVal" type="text" />
    </van-dialog>
  </div>
</template>

<script>
// import draggable from "vuedraggable";
export default {
  name: "controlUserChecked",
  props: {
    orgType: {
      type: Boolean,
      default: false,
    },
    selectArr: {
      type: Array,
      default: [],
    },
    commonGroup: {
      type: Array,
      default: [],
    },
    personAddList: {
      type: Array,
      default: [],
    },
    fromSend: {
      // 是否为发送调用该组件
      type: Boolean,
      default: false,
    },
  },
  components: {
    "draggable": () => import("vuedraggable"),
  },
  data() {
    return {
      showDialog: false,
      inputVal: "",
    };
  },
  computed: {
    personAddList_: {
      get() {
        return this.personAddList;
      },
      set(val) {
        //grants_改变由父组件控制
        this.$emit("on-change-person", val);
      },
    },
    selectArr_: {
      get() {
        return this.selectArr;
      },
      set(val) {
        console.log(val);
        this.$emit("changeData", val);
      },
    },
  },
  methods: {
    //确定
    showClick(item) {
      item.isopen = !item.isopen;
    },
    onEnd() {},
    define() {
      this.show = false;
      this.$emit("close", this.show);
      this.$emit("getSelectUser", this.selectArr_);
    },
    //移除选中项
    del(item, index) {
      this.$delete(item, "checked");
      this.$set(item, "checked", false);
      this.selectArr_.splice(index, 1);
      if (this.fromSend) {
        this.$emit("changeData", this.selectArr_);
        this.$bus.$emit("InListState", this.selectArr_);
      }
    },
    saveGroup(action, done) {
      //保存小组数据
      let self = this;
      console.log(this.selectArr_);
      let subs = [];
      this.selectArr_.forEach((element) => {
        if (element.groupId) {
          element.children.forEach((child) => {
            if (!subs.find((sub) => sub.id == child.id)) {
              subs.push(child);
            }
          });
        } else {
          if (!subs.find((sub) => sub.id == element.id)) {
            subs.push(element);
          }
        }
      });
      if (action === "confirm") {
        if (this.inputVal) {
          if (this.commonGroup.find((ele) => ele.showName == this.inputVal)) {
            dsf.layer.toast("存在同名小组，请重新输入！");
            return done(false);
          }
          dsf.http
            .post("/ctrl/org/select/groupSave", {
              groupName: this.inputVal,
              subs: JSON.stringify(subs),
            })
            .then(function (result) {
              console.log(result);
              if (result.status == "200") {
                dsf.layer.toast(result.data.message);
                self.$emit("initData", "");
              }
            });

          done(true);
          this.inputVal = "";
        } else {
          dsf.layer.toast("请命名小组！");
          return done(false);
        }
      } else {
        done(true);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";
.checkusers {
  position: relative;
  width: 100%;
  height: 100%;
  .List {
    padding-top: 50px;
    width: 100%;
    height: 100%;
  }
  .userlist {
    padding-right: 16px;

    .van-icon-user-circle-o {
      @include font-theme("normal");
      font-size: var(--font_size_0);
    }
  }
  .space {
    display: inline-block;
    border-right: 1px solid #ddd;
    margin: 0 8px;
  }
}
/deep/.van-dialog__content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.input-g {
  margin: 15px 0;
  padding: 0 10px;
  width: 80%;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #dddddd;
}
/deep/ .van-nav-bar__content {
  position: fixed;
  left: 15px;
  right: 15px;
  background: #fff;
}
/deep/.van-nav-bar__left {
  padding-left: 0;
}
/deep/.van-nav-bar__right {
  padding-right: 0;
}
/deep/ .van-popup {
  overflow: hidden;
}
/deep/ .van-icon-sort {
  margin-left: 12px;
  margin-right: 10px;
  @include font-theme("normal", true);
}
/deep/ .van-icon-arrow-up,
.van-icon-arrow-down {
  margin-left: 6px;
  @include font-theme("normal", true);
}
/deep/ .van-icon-cross {
  padding-left: 0 !important;
  @include font-theme("normal", true);
}
.r_span {
  @include font-theme("normal", true);
}
.list-group {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 10px;

  width: 100%;
  overflow: auto;
  background: #f8f8f8;
  .list-group-item {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    padding: 0 15px;
    width: 100%;
    background: #fff;
    .item-top {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;

      width: 100%;
      min-height: 52px;
      &::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 1px;
        background: #eee;
      }
      > div {
        display: flex;
        align-items: center;
      }
      .isShowChiled {
        display: flex;
        align-items: center;
        margin-left: 15px;
        width: 60px;
      }
    }
    .item-bottom {
      display: flex;
      flex-direction: column;
      padding-left: 15px;
      width: 100%;
      min-height: 52px;
      span {
        display: flex;
        align-items: center;
        min-height: 52px;
      }
    }
    > span {
      margin-right: 5px;
      flex: 1;
      font-size: var(--font_size_2);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    i {
      width: 20px;
    }
    .van-icon-close {
      margin-left: 15px;
    }
  }
}
</style>
