<template>
  <div class="searchUserList">
    <form action="/">
      <van-search
        ref="inputVal"
        v-model="searchValue"
        show-action
        autofocus
        shape="round"
        placeholder="搜索"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <div class="dsf-tree" v-if="getUserBySearchValue.length > 0">
      <div v-for="(cell, inx) in getUserBySearchValue" :key="'index' + inx">
        <div class="flex-box person">
          <van-checkbox
            icon-size="16px"
            class="child_check"
            v-model="cell.checked"
            @click="userClick(cell)"
          >
            <div class="user-name">{{ cell.showName || cell.name }}</div>
            &nbsp;&nbsp;
            <div class="user-dept">{{ cell.DeptName }}</div>
          </van-checkbox>
        </div>
      </div>
    </div>
    <commonempty
      v-if="getUserBySearchValue.length == 0 && searchValue.length > 0"
      description="暂无人员"
    />
  </div>
</template>

<script>
export default {
  name: "searchUserList",
  props: ["tree", "selectArr", "Response", "currentLine"],
  data() {
    return {
      searchValue: "",
      selectIds: [],
      selectItems: [],
      getUserBySearchValue: [],
      userdata: [],
      timer: null,
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      let input = this.$refs["inputVal"].querySelector("input");
      input.focus();
    });
  },
  methods: {
    getPerson(data, val) {
      let self = this;
      if (data.children && data.children.length > 0) {
        data.children.forEach((item) => {
          if (item.UserName && item.UserName.indexOf(val) > -1) {
            self.getUserBySearchValue.push(item);
          }
          self.getPerson(item, val);
        });
      }
    },
    getUserAsync(val) {
      this.getUserBySearchValue = [];
      let firstRule = this.currentLine.RangeRule.RuleList.Rule;
      if (Array.isArray(firstRule)) {
        firstRule = firstRule[0];
      }
      let obj = {
        sendRequestID: this.Response.SendRequestID,
        queryName: val, //检索条件
        lineIDs: this.currentLine.lineID,
        RangeOtherUser: "0",
        ExpandLevel: -1,
        ruleList: JSON.stringify([
          {
            nodeId: firstRule.NodeID,
            level: firstRule.Level,
            deptId: "",
            isDeep: "",
            isSelected: "0",
            rangeType: firstRule.RangeType,
            isUser: "1",
          },
        ]),
      };
      dsf.http
        .post("/fn/mobileFlow/getFlowNodeUserByNode", obj)
        .then(({ data }) => {
          console.log(data);
          if (data.data && data.data.length > 0) {
            let SendRangeTree = data.data[0].SendRangeTree;
            let allUsers = [];
            if (Array.isArray(SendRangeTree.Node)) {
              allUsers = SendRangeTree.Node;
            } else {
              allUsers = [SendRangeTree.Node];
            }
            this.getUserBySearchValue = this.openDataFilterUser(allUsers);
          }
        });
    },
    openDataFilterUser(userArr) {
      let users = [];
      userArr.forEach((item) => {
        if (item.UserID) {
          item.showName = item.name;
          item.checked = !!this.selectArr.find((select) =>
            this.isSame(item, select)
          );
          users.push(item);
        }
        if (item.Node) {
          if (!Array.isArray(item.Node)) {
            item.Node = [item.Node];
          }
          users = users.concat(this.openDataFilterUser(item.Node));
        }
      });
      return users;
    },
    onSearch(val) {
      let self = this;
      if (dsf.config.commonForm.isSelectProcessAsync) {
        self.getUserAsync(val);
      } else {
        self.getUserBySearchValue = [];
        self.userdata.forEach((item) => {
          self.getPerson(item, val);
        });
      }
    },
    onCancel() {
      this.getUserBySearchValue = [];
      this.$emit("searchClose");
    },
    userClick(user) {
      this.$emit("changeUser", user);
    },
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
  watch: {
    tree: {
      handler(newVal) {
        this.userdata = newVal;
      },
      deep: true,
      immediate: true,
    },
    searchValue(newVal) {
      //控制搜索间隔，只等他输完了之后再查询 @zgh 20240126
      let that = this;
      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        if (newVal) that.onSearch(newVal);
        else that.getUserBySearchValue = [];
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";
.searchUserList {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .dsf-tree {
    @include font_4(true);
    flex: 1;
    overflow: auto;
  }
}

.child_check {
  margin-right: 10px;
}

::v-deep .child_check .van-checkbox__label {
  display: flex;
  align-items: center;
  overflow: hidden;
}

.flex-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.person {
  padding: 10px 10px 10px 30px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  overflow: hidden;
}
.user-name {
  margin-top: 1px;
  flex-shrink: 0;
}
.user-dept {
  margin-top: 1px;
  color: #a5a7aa;
  font-size: var(--font_size_4);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  flex: 1;
}

._c {
  @include font-theme("normal");
  @include font_3();
}
</style>
