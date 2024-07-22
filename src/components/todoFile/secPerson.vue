<template>
  <div class="dsf-select-person">
    <form action="/" v-if="!showSearch">
      <van-search v-model="searchValue" placeholder="搜索" @click="onSearch" />
    </form>
    <div v-if="!showSearch" class="tabs">
      <add-tree
        :personSelectData="personSelectData"
        :type="type"
        :multiple="Multiplayer"
        @select="getSelect"
        class="_add_tree"
        ref="addTree"
      ></add-tree>
      <div class="foot">
        <div class="tree_l" @click="showCheckUsers">
          <span>已选择：{{ selectArr.length }}人</span>
          <van-icon
            v-show="selectArr.length > 0"
            class="tree_icon"
            size="0.32rem"
            name="arrow-up"
          />
        </div>
        <van-button type="default" @click="cancePerson(true)">取消</van-button>
        <van-button type="info" @click="addPerson">确定</van-button>
      </div>
      <van-popup
        v-model="checkPopup"
        :style="{ height: '90%' }"
        round
        position="bottom"
      >
        <control-user-checked
          :select-arr="selectArr"
          :commonGroup="[]"
          :orgType="false"
          :fromSend="true"
          @close="close"
          @changeData="changeData"
          :person-add-list="personAddList"
          @onChangePerson="(val) => (personAddList = val)"
        ></control-user-checked>
      </van-popup>
    </div>
    <div v-else>
      <control-user-search-list
        @searchClose="onSearchClose"
        :selectper="selectArr"
        :personSelectData="personSelectData"
        @select="getSelect"
        @addPerson="addPerson"
      ></control-user-search-list>
    </div>
  </div>
</template>

<script>
import addTree from "@/components/todoFile/secTree";
import controlUserChecked from "@/components/commonForm/controls/controlUserChecked";
import controlUserSearchList from "./secUserSearchList";
export default {
  name: "DsfSelectPerson",
  components: {
    controlUserSearchList,
    controlUserChecked,
    addTree,
  },
  props: [
    "type",
    "extra",
    "selectPersons",
    "Multiplayer",
    "selectIndexUserList",
  ], // type 0 选人； type 1 部门 ;type 2 部门+角色
  data() {
    return {
      show: true,
      selectList: [],
      personSelectData: "",
      oldV: [],
      param: {
        allowEdit: false,
        containUnit: "-1",
        data: "",
        displayFullPath: "-1",
        fullOrganize: false,
        key: "C-RC-0008",
        multiple: true,
        roles: "",
        rootObject: "2",
        schema: "",
        separator: ",",
        tabs: [
          {
            key: "self_org",
            list: [
              {
                key: "department",
                name: "本机构",
              },
            ],
            name: "本单位",
          },
        ],
        title: "选择参与人员",
        type: "userselect",
        types: ["person", "department", "post"],
        typesString: "person,department,post",
        value: "",
      },
      selectArr: [],
      selectper: [],
      selectIdArr: [],
      pk: "",
      searchValue: "",
      showSearch: false,
      showSearchBox: false,
      checkPopup: false,
      personAddList: [],
    };
  },
  created() {
    window.GLOBAL = {};
    if (this.extra) {
      this.pk = this.extra.pk;
    }
    if (this.selectPersons) {
      this.personSelectData = JSON.parse(JSON.stringify(this.selectPersons));
    } else {
      this.getPersonList(this.param);
    }
    // 根据sendfile 传递过来的值,初始化选择人员;防止不做任何操作时,点击确定按钮secok抛出的值为空
    if (this.selectIndexUserList) {
      this.selectList = this.selectIndexUserList;
      this.selectList.forEach((item) => {
        if (item.Type == 1 || item.Type == 2) this.selectArr.push(item);
      });
    }
    window.GLOBAL.selectType = this.type;
    window.GLOBAL.personMultiple = this.Multiplayer;
    if (!window.GLOBAL.renderList) window.GLOBAL.renderList = []; // 保留默认带入的数据，取消操作后，将数据还原为renderList
  },
  mounted() {
    console.log(this.selectPersons);
  },
  methods: {
    //展示选中的人
    showCheckUsers() {
      this.checkPopup = true;
    },
    changeData(data) {
      this.selectArr = data;
      let LineArr = [];
      // console.log("数据改变", data);
      this.selectList.forEach((item) => {
        if (item.Type == 0) LineArr.push(item);
      });
      this.selectList = [];
      this.selectList = data.concat(LineArr);
      console.log("数据改变", this.selectArr);
      console.log("数据改变", this.selectList);
    },
    //关闭弹层
    close(par) {
      this.checkPopup = par;
    },
    //打开检索
    onSearch(val) {
      this.showSearch = true;
    },
    //关闭检索
    onSearchClose() {
      //console.log("关闭人员检索层");
      this.showSearch = false;
    },
    getPersonList(param) {
      let loader = dsf.layer.loading("获取中");
      let that = this;
      let url = `fn/mobileToDo/getDingUsersByToDo?pk=${this.pk}`;
      dsf.http
        .post(url)
        .then(function (result) {
          that.personSelectData = result.data.data.codeList;
          if (!that.personSelectData[0].children.length) {
            that.$emit("close");
          }
          that.personSelectData.forEach((toy) => {
            that.addPersonDeep(toy, 1);
          });
          that.personSelectData.forEach((item) => {
            item.checked = false;
          });
          that.personSelectData[0].children.forEach((item) => {
            item.type = 1;
            item.checked = false;
          });
          //console.log("人员选择控件", that.personSelectData);
        })
        .finally(() => {
          that.$nextTick(() => {
            dsf.layer.closeLoading(loader);
          });
        });
    },
    addPersonDeep(data, start) {
      let self = this;
      this.$set(data, "deep", start);
      this.$set(data, "isopen", start <= 1 ? true : false);
      if (data.children && data.children.length > 0) {
        data.children.forEach((item) => {
          self.addPersonDeep(item, start + 1);
        });
      }
    },
    addPerson() {
      let name = "";
      let val = "";
      let sch = "";
      let temp1 = [];
      let temp2 = [];
      let temp3 = [];
      this.selectArr = [];
      this.selectList.forEach((item) => {
        if (
          item.children &&
          item.children.length > 0 &&
          item.children[0].children.length > 0
        ) {
          this.selectArr = [...this.selectArr];
        } else {
          if (item.children && item.children.length > 0) {
            //this.selectArr = [];
            item.children.forEach((child) => {
              if (child.checked) {
                this.selectArr.push(child);
              } else {
                this.selectArr.forEach((inx, i) => {
                  if (inx.showName == child.showName) {
                    this.selectArr.splice(i, 1);
                  }
                });
              }
            });
          } else {
            if (item.checked) {
              this.selectArr.push(item);
            } else {
              this.selectArr.forEach((inx, i) => {
                if (inx.showName == item.showName) {
                  this.selectArr.splice(i, 1);
                }
              });
            }
          }
        }
      });
      let hash = {};
      this.selectArr = this.selectArr.reduce((preVal, curVal) => {
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
      for (let cell of this.selectArr) {
        temp1.push(cell.showName);
        temp2.push(cell.attrs.idValue);
        temp3.push(cell.type + "::" + cell.attrs.idValue);
      }
      name = temp1.join(",");
      val = temp2.join(",");
      sch = temp3.join(",");
      this.person = name;
      this.show = false;
      this.oldV = this.selectList;
      // this.$emit("getSelectUser", this.selectArr);
      // this.selectIdArr = this.selectArr;
      //console.log(this.selectIdArr);
      this.cancePerson(false);
      console.log("最终选择=====>", this.selectArr);
      //let forienArr = this.selectArr.map(item => item.id)
      //let forienArr = this.selectArr.map(item)
      //console.log(forienArr)
      this.$emit("secOk", this.selectArr);
    },
    cancePerson(params) {
      if (params) {
        let uniqueArr = Array.from(new Set(window.GLOBAL.renderList.map(item => JSON.stringify(item)))).map(str => JSON.parse(str));  //数组去重
        this.$emit("secOk", uniqueArr);
      }
      this.$emit("cancePerson");
    },
    loopPersonAdd(node, selectList) {
      if (node.children instanceof Array) {
        node.children.forEach((item) => {
          item.checked = false;
          if (item.Type == "2") {
            if (
              this.selectList.findIndex(
                (itx) =>
                  itx.id == item.id &&
                  itx.DeptID == item.DeptID &&
                  itx.RoleID == item.RoleID
              ) > -1
            ) {
              item.checked = true;
            }
          } else {
            //当出现跨部门简直时 只选择第一个部门的人  第二个部门的人也会被选中，此处也要增加deptid的判断  2022年1月20日23:47:22 @ly
            if (
              this.selectList.findIndex(
                (itx) => itx.id == item.id && itx.DeptID == item.DeptID
              ) > -1
            ) {
              item.checked = true;
            }
          }
          if (item.children.length > 0) {
            this.loopPersonAdd(item);
          }
        });
      }
    },
    getSelect(data) {
      let self = this;
      self.selectList = [];
      for (let i in data) {
        self.selectList.push(data[i]);
      }

      self.personSelectData.forEach((item) => {
        item.children.forEach((child) => {
          this.loopPersonAdd(child, self.selectList);
        });
      });
      this.selectArr = [];
      this.selectList.forEach((item) => {
        if (item.Type != 0&&item.id) this.selectArr.push(item);
      });
    },
    userClick(user) {
      this.$refs.addTree.userClick(user);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

::v-deep.dsf-select-person {
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
  }
  @include font_4(true);
  // padding-bottom: 60px;

  .van-tabbar-item__text {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  ._add_tree {
    // height: calc(100% - 61px) !important;
    color: #333;
    margin-top: 5px;
    padding: 0px !important;
    flex: 1;
    overflow: auto;
    div {
      white-space: nowrap;
    }

    .checkbox {
      position: relative;
      top: -2px;
    }
  }

  .selec_b {
    position: relative;
    bottom: 50px;

    .select_box {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
    }
  }

  button {
    height: 0.8rem;
    padding: 0;
    flex: 1;
    margin: 0 10px;
  }

  ._btns {
    padding: 0 10px;
  }

  .van-tabbar--fixed {
    height: 1.2rem;
  }
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

    .tree_l {
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
