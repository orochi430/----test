<template>
  <div class="dsf-select-person">
    <div v-show="!showSearch" class="tabs">
      <form action="/">
        <van-search
          v-model="searchValue"
          placeholder="搜索"
          @click="showSearch = true"
        />
      </form>
      <van-tabs
        v-model="TabActive"
        sticky
        :offset-top="dsf.util.getOffsetTop('52px')"
      >
        <van-tab title="请选择">
          <sec-tree
            class="sec-tree"
            ref="addTree"
            :multiple="currentLine.Multiplayer"
            :tree="root"
            @changeUser="changeTreeUser"
            @setAsyncNode="setAsyncNode"
          ></sec-tree>
        </van-tab>
        <van-tab title="小组">
          <sec-tree
            class="sec-tree"
            ref="addTree"
            :multiple="currentLine.Multiplayer"
            :tree="group"
            @changeUser="changeTreeUser"
          ></sec-tree>
        </van-tab>
      </van-tabs>
    </div>
    <sec-user-search-list
      v-show="showSearch"
      :selectArr="selectArr"
      :tree="root"
      :Response="Response"
      :currentLine="currentLine"
      @searchClose="showSearch = false"
      @changeUser="changeTreeUser"
      style="flex: 1"
    ></sec-user-search-list>
    <div class="foot">
      <div class="foot-left" @click="checkPopup = true">
        <span>已选择：{{ selectArr.length }}人</span>
        <van-icon
          v-show="selectArr.length > 0"
          class="tree_icon"
          size="0.32rem"
          name="arrow-up"
        />
      </div>
      <van-button type="default" @click="cancePerson">取消</van-button>
      <van-button type="info" @click="confirmPerson">确定</van-button>
    </div>
    <van-popup
      v-model="checkPopup"
      :style="{ height: '90%' }"
      round
      position="bottom"
      get-container="#app"
    >
      <sec-user-checked-list
        :select-arr.sync="selectArr"
        :currentLine="currentLine"
        @refreshGroup="getGroup"
        @close="checkPopup = false"
      ></sec-user-checked-list>
    </van-popup>
  </div>
</template>

<script>
import secTree from "./secTree";
import secUserCheckedList from "./secUserCheckedList";
import secUserSearchList from "./secUserSearchList";
export default {
  name: "DsfSelectPerson",
  components: {
    secUserSearchList,
    secUserCheckedList,
    secTree,
  },
  props: ["currentLine", "Response"],
  data() {
    return {
      TabActive: 0,
      show: true,
      searchValue: "",
      showSearch: false,
      checkPopup: false,
      personAddList: [],
      root: [],
      group: [],
      selectArr: [],
    };
  },
  watch: {
    selectArr: {
      handler(newVal, oldVal) {
        this.refreshTree(this.root);
        this.refreshTree(this.group);
      },
    },
  },
  created() {
    this.getDefaultSelected();
    this.setTree();
  },
  mounted() {},
  methods: {
    getDefaultSelected() {
      this.selectArr = JSON.parse(
        JSON.stringify(this.currentLine.checkedUserList)
      );
    },
    async setTree() {
      this.getGroup();
      this.getData();
    },
    /** 处理节点树结构开始 */
    getData() {
      this.root = [
        {
          attrs: {
            noselect: true,
            level: 0,
          },
          keyCode: "",
          isopen: true,
          checked: false,
          hideCheckAll: this.currentLine.NodeType == "7", //NodeType == '7' 不显示节点的全选
          showName: this.currentLine.title,
          children: this.mapNode(
            JSON.parse(JSON.stringify(this.currentLine.SendRangeTree.Node)),
            1
          ),
        },
      ];
    },
    mapNode(node, level) {
      if (!(node instanceof Array)) {
        node = [node];
      }
      node.forEach((item) => {
        this.setChild(item, level);
      });
      return node;
    },
    setChild(data, level) {
      data.checked = !!this.selectArr.find((select) =>
        this.isSame(data, select)
      );
      data.showName = data.name;
      data.isopen = level <= 1;
      data.children = [];
      data.attrs = {
        noselect: data.Type == "0",
        level: level,
      };
      if (data.Node) {
        data.children = this.mapNode(data.Node, level + 1);
      }
    },
    refreshTree(arr) {
      arr.forEach((node) => {
        if (node.attrs.noselect) {
          this.refreshTree(node.children);
        } else {
          node.checked = !!this.selectArr.find((select) =>
            this.isSame(node, select)
          );
        }
      });
    },
    setAsyncNode(node) {
      let firstRule = this.currentLine.RangeRule.RuleList.Rule;
      if (Array.isArray(firstRule)) {
        firstRule = firstRule[0];
      }
      let obj = {
        sendRequestID: this.Response.SendRequestID,
        lineIDs: this.currentLine.lineID,
        RangeOtherUser: this.currentLine.RangeOtherUser,
        ExpandLevel: -1,
        ruleList: JSON.stringify([
          {
            nodeId: this.currentLine.NodeID,
            level: 2,
            deptId: node.DeptID,
            roleId: firstRule.RoleID,
            isDeep: "1",
            isSelected: firstRule.IsSelected || "0",
            rangeType: firstRule.RangeType,
            isUser: this.currentLine.RangeRule.IsUser || "0",
          },
        ]),
      };
      dsf.http.post("/fn/mobileFlow/getFlowNodeUserByNode", obj).then((res) => {
        if (res.data.data) {
          if (res.data.data[0].SendRangeTree?.Node?.Node) {
            node.children = this.mapNode(
              res.data.data[0].SendRangeTree.Node.Node,
              node.attrs.level + 1
            );
          } else {
            dsf.layer.toast("该部门暂无人员！");
          }
        }
      });
    },
    /** 处理节点树结构结束 */

    /** 处理小组树结构开始 */
    getGroup() {
      dsf.http
        .post("/fn/flow/getSendGroupData", {
          moduleId: this.currentLine.moduleId,
          flowId: this.currentLine.flowID,
          lineId: this.currentLine.lineID,
          isMulti: 1,
        })
        .then((res) => {
          let group = [];
          if (res.data.code == "200" && res.data.data) {
            let lastGroupIndex = -1;
            res.data.data.forEach((item, index) => {
              if (item.pId == "-1") {
                group.push({
                  attrs: {
                    noselect: true,
                    level: 0,
                  },
                  keyCode: "",
                  isopen: true,
                  checked: false,
                  showName: item.showName,
                  children: this.setGroupChild(
                    JSON.parse(
                      JSON.stringify(
                        res.data.data.slice(lastGroupIndex + 1, index)
                      )
                    )
                  ),
                });
                lastGroupIndex = index;
              }
            });
          }
          this.group = group;
        });
    },
    setGroupChild(data) {
      data.forEach((item) => {
        item.isopen = false;
        item.children = [];
        item.UserID = item.sId;
        item.DeptID = item.deptId;
        item.Type = item.type;
        item.checked = !!this.selectArr.find((select) =>
          this.isSame(item, select)
        );
        item.attrs = {
          noselect: false,
          level: 1,
        };
      });
      return data;
    },
    /** 处理小组树结构结束 */

    /** 确认取消选中结果 */
    cancePerson() {
      this.$emit("cancePerson");
    },
    confirmPerson() {
      this.$emit("confirmPerson", this.selectArr);
    },
    /** 确认取消选中结果 */
    /**  */
    changeTreeUser(user) {
      console.log(user);
      if (user.checked) {
        if (this.currentLine.Multiplayer != 1) {
          this.selectArr.splice(0, this.selectArr.length);
        }
        this.addToSelectArr(user);
      } else {
        this.removeFormSelectArr(user);
      }
    },
    addToSelectArr(user) {
      if (!this.selectArr.find((item) => this.isSame(user, item))) {
        this.selectArr.push(user);
      }
    },
    removeFormSelectArr(user) {
      if (user.Selected == '2') {
        dsf.layer.toast('必选用户不能删除')
        return
      }
      let index = this.selectArr.findIndex((item) => this.isSame(user, item));
      if (index >= 0) {
        this.selectArr.splice(index, 1);
      }
    },
    /**  */
    isSame(user, checkedUser) {
      let result = false;
      if (user.Type == "1") {
        result =
          user.UserID == checkedUser.UserID &&
          user.DeptID == checkedUser.DeptID;
      } else if (user.Type == "2") {
        result =
          user.RoleID == checkedUser.RoleID &&
          user.DeptID == checkedUser.DeptID;
      }
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.dsf-select-person {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  .tabs {
    flex: 1;
    overflow-y: hidden;
    background: #f8f8f8;
    display: flex;
    flex-direction: column;
    .van-tabs {
      overflow: auto;
      flex: 1;
    }
  }
  @include font_4(true);
  // padding-bottom: 60px;

  .foot {
    height: 60px;
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 0 10px;
    .van-button {
      flex: 1;
      margin: 0 10px;
    }

    .foot-left {
      display: flex;
      align-items: center;
      width: 35%;

      //text-align: center;
      .tree_icon {
        vertical-align: text-top;
      }
      .van-icon {
        @include font-theme("normal");
        @include font_5;
      }
      span {
        @include font-theme("normal");
        @include font_5;
        margin-right: 3px;
      }
    }
  }
}
</style>
