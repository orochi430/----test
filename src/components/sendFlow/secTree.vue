<template>
  <div class="dsf-tree">
    <commonempty v-if="!tree.length"></commonempty>
    <div v-else v-for="(item, index) in tree" :key="'index1' + index">
      <div
        class="flex-box"
        :class="{
          treeMargin: item.attrs.level == 0,
          tree_line: item.isopen && item.attrs.level == 0,
        }"
        :style="{ paddingLeft: `${item.attrs.level * 16 + 16}px` }"
      >
        <van-checkbox
          icon-size="18px"
          v-if="!item.attrs.noselect"
          v-model="item.checked"
          :disabled="item.Selected == '2'"
          ref="check"
          @click="userClick(item)"
          :shape="`${multiple ? 'square' : 'round'}`"
        ></van-checkbox>
        <div class="tree_tit">
          <img
            v-if="
              !item.attrs.noselect &&
              dsf.config.commonForm &&
              dsf.config.commonForm.isshowPhoto
            "
            :src="getFavicon(item)"
            alt
            :onerror="default_img"
          />
          <span :class="{ tit_width: !item.children.length > 0 }">{{
            item.showName
          }}</span>
        </div>
        <div
          class="isShowChiled"
          @click.stop="expand(item)"
          v-if="
            (!isAsync && item.children.length > 0) ||
            (isAsync && item.attrs.noselect)
          "
        >
          <van-icon v-if="item.isopen" name="arrow-up" />
          <van-icon v-else name="arrow-down" />
          <span class="r_span">{{ item.isopen ? "收起" : "展开" }}</span>
          <i
            v-if="multiple && !item.hideCheckAll && item.children.length > 0"
            class="icon iconfont iconcheckAll"
            @click.stop="checkAll(item)"
          />
        </div>
      </div>
      <template v-if="item.children && item.children.length > 0">
        <sec-tree
          v-show="item.isopen"
          class="sec-tree"
          ref="addTree"
          :multiple="multiple"
          :tree="item.children"
          @changeUser="changeUser"
          @setAsyncNode="setAsyncNode"
        ></sec-tree>
      </template>
    </div>
  </div>
</template>

<script>
//import req from "@/api/api";
export default {
  name: "secTree",
  props: ["tree", "multiple"],
  data: function () {
    return {
      default_img:
        'this.src="' + require("../../assets/imgs/defaultUser.png") + '"',
      InListState: false,
      isAsync: !!dsf.config.commonForm.isSelectProcessAsync,
    };
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    expand(node) {
      node.isopen = !node.isopen;
      if (this.isAsync && node.children.length == 0) {
        this.$emit("setAsyncNode", node);
      }
    },
    checkAll(node) {
      node.isopen = true;
      if (node.children) {
        let checked = true;
        if (
          node.children
            .filter((item) => !item.attrs.noselect)
            .every((item) => item.checked)
        ) {
          checked = false;
        }
        node.children.forEach((item) => {
          if (!item.attrs.noselect) {
            this.userClick(item, checked);
          }
        });
      }
    },
    userClick(user, checked) {
      if (checked != undefined) {
        user.checked = checked;
      }
      this.$emit("changeUser", user);
    },
    changeUser(data) {
      this.$emit("changeUser", data);
    },
    setAsyncNode(data) {
      this.$emit("setAsyncNode", data);
    },
    getFavicon(user) {
      if (user.Photo) {
        return dsf.url.getWebPath(
          `/fn/mobilePhoto/download?id=${user.id}&time=${new Date().getTime()}`
        );
      } else {
        return require("@/assets/imgs/defaultUser.png");
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
.flex-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 15px;
  min-height: 52px;
  background: #fff;
  overflow: hidden;
}
.isShowChiled {
  height: 100%;
  text-align: right;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  line-height: 43px;
  flex-shrink: 0;
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
}
.tree_tit {
  display: flex;
  font-size: var(--font_size_2);
  color: #000;
  flex: 1;
  overflow: hidden;
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 10px;
  }
}

.tree_tit .tit_width {
  max-width: 244px;
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

.child {
  background: #fff;
}

._c {
  @include font-theme("normal");
  @include font_3();
}
</style>
