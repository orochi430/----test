<template>
  <div class="dsf-select-person">
    <form action="/" v-if="!showSearch">
      <van-search v-model="searchValue" placeholder="搜索" @click="onSearch" />
    </form>
    <div v-if="!showSearch" class="tabs">
      <van-tabs v-model="TabActive" sticky :offset-top="dsf.util.getOffsetTop('52px')">
        <van-tab title="本机构">
          <add-tree
            class="_add_tree"
            ref="addTree"
            :personSelectData="personSelectData"
            :checkData="checkData"
            :multiple="Multiplayer"
            :type="type"
            @select="getSelect"
            @callgroup="callGroup"
            @cutData="cutData"
            @cutPutyData="cutPutyData"
          ></add-tree>
        </van-tab>
        <van-tab title="小组">
          <add-group
            :groupData="groupData"
            :checkData="checkData"
            ref="addGroup"
            @getGroup="getGroup"
            @select="getSelect"
            @calltree="callTree"
            @cutData="cutData"
            @cutPutyData="cutPutyData"
          ></add-group>
        </van-tab>
      </van-tabs>

      <div class="foot">
          <van-button type="default" @click="cancePerson">取消</van-button>
          <van-button type="info" @click="showDialog = true"
            >另存为小组</van-button
          >
          <van-button type="info" @click="addPerson">确定</van-button>
      </div>
    </div>
    <div v-else>
      <control-user-search-list
        @searchClose="onSearchClose"
        :selectper="selectIdArr"
        :personSelectData="personSelectData"
        :lineNodeData="LineNodeData"
        :response="response"
        :checkData="checkData"
        @getGroup="getGroup"
        @select="getSelect"
        @calltree="callTree"
        @cutData="cutData"
        @cutPutyData="cutPutyData"
        @addPerson="addPerson"
        class="_add_tree"
      ></control-user-search-list>
    </div>
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
import addTree from "@/components/todoFile/secTreeAsync";
import addGroup from "@/components/todoFile/secGroup";
import controlUserSearchList from "./secUserSearchList";
export default {
  name: "secPersonAsync",
  components: {
    controlUserSearchList,
    addTree,
    addGroup,
  },
  props: [
    "type",
    "extra",
    "selectPersons",
    "Multiplayer",
    "LineNodeData",
    "checkData",
    "response"
  ], // type 0 选人； type 1 部门 ;type 2 部门+角色
  data() {
    return {
      show: true,
      TabActive: 0,
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
      showDialog: false,
      inputval: "",
      groupData: [],
      addcheckData: [],
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

    window.GLOBAL.selectType = this.type;
    window.GLOBAL.personMultiple = this.Multiplayer;
    console.log(this.Multiplayer);
    this.getGroup();
  },
  watch: {
    checkData: {
      handler(val) {
        this.addcheckData = val;
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {

  },

  methods: {
    //打开检索
    onSearch(val) {
      this.showSearch = true;
    },
    //关闭检索
    cutData(data) {
      //取消选中单个人员，删掉节点上人员
      if (data.sId) {
        this.addcheckData.forEach((item, index) => {
          if (data.sId == item.id) {
            item.checked = false;
          }
        });
      } else {
        this.addcheckData.forEach((item, index) => {
          if (data.id == item.id) {
            item.checked = false;
          }
        });
      }
    },
    cutPutyData(data) {
      //部门、分组选中取消多个人员，删掉节点上人员
      if (data.children[0].sId) {
        this.addcheckData.forEach((item, index) => {
          data.children.forEach((it) => {
            if (it.sId == item.id) {
              item.checked = false;
            }
          });
        });
      } else {
        this.addcheckData.forEach((item, index) => {
          data.children.forEach((it) => {
            if (it.id == item.id) {
              item.checked = false;
            }
          });
        });
      }
    },
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
      this.selectIdArr = this.selectArr;
      // 获取小组选中人员------jf
      if (this.$refs.addGroup) {
        let UserInGroup = this.$refs.addGroup.UserData();
        if (UserInGroup.length > 0) {
          UserInGroup.forEach((ele) => {
            let arr = this.selectArr.find((item) => {
              return item.id == ele.id;
            });
            if (!arr) {
              this.selectArr.push(ele);
            }
          });
        }
      }
      // 单选时不需要与上次已选的人员合并 2023年1月17日16:24:06 xiaochy
      if (window.GLOBAL.personMultiple) {
        this.addcheckData.forEach((item) => {
          if (item.checked) {
            let flag = this.selectArr.some((it) => {
              return it.id == item.id;
            });
            if (!flag) {
              this.selectArr.push(item);
            }
          }
        });
      }
      let PersonArr = this.selectArr.filter((ele) => {
        return ele.UserID;
      });
      this.selectArr = PersonArr;
      this.cancePerson();
      console.log("最终选择=====>", this.selectArr);
      //let forienArr = this.selectArr.map(item => item.id)
      //let forienArr = this.selectArr.map(item)
      //console.log(forienArr)
      this.$emit("secOk", this.selectArr);
    },
    cancePerson() {
      // 取消
      // this.show = false;
      // this.$emit("getSelectUser", this.selectArr);
      this.$emit("cancePerson");
    },
    loopPersonAdd(node, selectList) {
      if (node.children instanceof Array) {
        node.children.forEach((item) => {
          item.checked = false;
          //console.log("this.selectList",this.selectList);
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
      //console.log("self.personSelectData",self.personSelectData);
      for (let i in data) {
        self.selectList.push(data[i]);
      }
      if (window.GLOBAL.personMultiple) {
        self.personSelectData.forEach((item) => {
          if(item.UserID){ //说明当前节点是人
             if(this.selectList.some(user=>user.UserID == item.UserID)){
              this.$set(item,"checked",true)
             }
          }
          item.children.forEach((child) => {
            this.loopPersonAdd(child, self.selectList);
          });
        });

      }else{
        self.personSelectData.forEach((item) => {
          if(item.UserID){ //说明当前节点是人
             this.$set(item,"checked",false)
             if(this.selectList.some(user=>user.UserID == item.UserID)){
              this.$set(item,"checked",true)
             }
          }
          if(item.children){
            item.children.forEach((child) => {
              this.loopPersonAdd(child, self.selectList);
            });
          }
        });
      }

      //self.personSelectData=[];
      console.log("this.personSelectData",this.personSelectData)
    },
    userClick(user) {
      this.$refs.addTree.userClick(user);
    },
    getGroup() {
      //获取小组数据
      let self = this;
      dsf.http
        .post("/fn/flow/getSendGroupData", {
          moduleId: this.$route.params.moduleId,
          flowId: this.LineNodeData.FlowId,
          lineId: this.LineNodeData.LineID,
          isMulti: 1,
        })
        .then(function (result) {
          if (result.status == "200") {
            self.groupData = self.TreeData(result.data.data, [], "-1");
            if (window.GLOBAL.personMultiple) {
              self.addcheckData.forEach((item) => {
                self.groupData.forEach((ele) => {
                  ele.children.forEach((it) => {
                    if (it.sId == item.id) {
                      it.checked = true;
                    }
                  });
                });
              });
            }
            if (self.groupData[0]) {
              self.groupData[0].isopen = true;
            }
          }
        });
    },
    TreeData(Arr, ChildArr, params) {
      //扁平化数据转化树结构
      Arr.forEach((ele, i) => {
        if (ele.pId == params) {
          ele.isopen = false;

          ele.children = [];
          ChildArr.push(ele);
        }
      });
      this.Loop(ChildArr, Arr);
      return ChildArr;
    },

    Loop(ChildArr, arr) {
      //扁平化数据转化树结构
      ChildArr.forEach((ele) => {
        ele.children = [];
        arr.forEach((it) => {
          it.checked = false;
          if (ele.id == it.pId) {
            ele.children.push(it);
          }
        });
        this.Loop(ele.children, arr);
      });
    },
    saveGroup(action, done) {
      //保存小组数据
      let self = this;
      let params = {
        text: "",
        value: "",
        nodeId: this.LineNodeData.LineID,
        flowId: this.LineNodeData.FlowId,
      };
      if (action === "confirm") {
        if (this.inputval) {
          if (this.groupData.find((ele) => ele.showName == this.inputval)) {
            dsf.layer.toast("存在同名小组，请重新输入！");
            return done(false);
          }
          this.selectList.forEach((ele) => {
            params.text += ele.UserName + ",";
            params.value += ele.DeptID + "-" + ele.id + ",";
          });
          dsf.http
            .post("fn/code/select/saveSendGroup", {
              name: this.inputval,
              moduleId: this.$route.params.moduleId,
              data: JSON.stringify([params]),
            })
            .then(function (result) {
              if (result.status == "200") {
                self.getGroup();
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
    callGroup() {
      //单选时将去掉小组勾选数据
      console.log("清空小组");
      if (this.$refs.addGroup) {
        this.$refs.addGroup.singleChoice();
      }
    },
    callTree() {
      //单选时将去掉本机构树勾选数据
      console.log("清空树");
      if (this.$refs.addGroup) {
        this.$refs.addTree.singleChoice();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";
// .dsf-select-person {
//   position: relative;
//   height: 100%;
//   overflow: hidden !important;
// }
// .van-search {
//   height: 3em;
// }
// .dsf-select-person > div {
//   position: absolute;
//   top: 3em;
//   bottom: 3.1em;
//   left: 0;
//   right: 0;
//   // height: calc(100% - 3em);
// }
// .van-tabs {
//   height: 100%;
// }
// ::v-deep.van-tabs__content {
//   height: 100% !important;
// }
::v-deep.dsf-select-person {
  @include font_4(true);
  // padding-bottom: 60px;

  .van-tabbar-item__text {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  ._add_tree {
    height: calc(100% - 61px) !important;
    color: #333;
    margin-top: 5px;
    padding: 0px !important;
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
  .van-dialog__header {
    padding-top: 15px !important;
  }
  .van-dialog__content {
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
}
::v-deep.dsf-select-person {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  .tabs {
    flex: 1;
    background: #F8F8F8;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .van-tabs {
      flex: 1;
      overflow: auto;
    }
  }
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
  }
</style>
