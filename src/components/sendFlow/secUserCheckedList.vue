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
      <template #right>
        <van-button type="theme" size="mini" v-if="_selectArr.length > 0"
          >存为小组</van-button
        >
      </template>
    </van-nav-bar>
    <draggable
      group="people"
      class="list-group"
      ghost-class="ghost"
      chosenClass="chosen"
      v-model="_selectArr"
      animation="200"
      handle=".sort"
      @sort="onEnd"
    >
      <div
        class="list-group-item"
        v-for="(item, index) in _selectArr"
        :key="index"
      >
        <div class="item-top">
          <span>{{ item.showName || item.name }}</span>
          <div class="sort" style="padding: 0 10px">
            <van-icon name="sort" size="15" />
          </div>
          <van-icon
            v-if="item.Selected != '2'"
            @click.stop="del(item, index)"
            size="0.36rem"
            name="cross"
          />
        </div>
      </div>
    </draggable>
    <van-dialog
      v-model="showDialog"
      title="新建小组--命名"
      show-cancel-button
      :before-close="saveGroup"
    >
      <input class="input-g" v-model="inputval" type="text" />
    </van-dialog>
  </div>
</template>

<script>
// import draggable from "vuedraggable";
export default {
  name: "controlUserChecked",
  props: {
    selectArr: {
      type: Array,
      default: [],
    },
    currentLine: {
      type: Object,
    },
  },
  components: {
    "draggable": () => import("vuedraggable"),
  },
  data() {
    return {
      showDialog: false,
      inputval: "",
    };
  },
  computed: {
    _selectArr: {
      get() {
        return this.selectArr;
      },
      set(val) {
        this.$emit("update:selectArr", val);
      },
    }
  },
  methods: {
    //确定
    showClick(item) {
      item.isopen = !item.isopen;
    },
    onEnd() {
    },
    define() {
      this.$emit("close");
    },
    //移除选中项
    del(item, index) {
      this._selectArr.splice(index, 1);
    },
    saveGroup(action, done) {
      //保存小组数据
      let params = {
        text: "",
        value: "",
        nodeId: this.currentLine.lineID,
        flowId: this.currentLine.flowID,
      };
      if (action === "confirm") {
        if (this.inputval) {
          this._selectArr.forEach((ele) => {
            params.text += ele.showName + ",";
            params.value += ele.DeptID + "-" + ele.UserID + ",";
          });
          dsf.http
            .post("fn/code/select/saveSendGroup", {
              name: this.inputval,
              moduleId: this.currentLine.moduleId,
              data: JSON.stringify([params]),
            })
            .then((res) => {
              if (res.data.code == "200") {
                this.$emit("refreshGroup");
                dsf.layer.toast("新建小组成功");
              }
            });

          done(true);
          this.inputval = "";
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
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";
.checkusers {
  position: relative;
  width: 100%;
  height: 100%;
  .List {
    padding-top: 50px;
    width: 100%;
    height: 100%;
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
      > span {
        flex: 1;
      }
      &::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 1px;
        background: #eee;
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
