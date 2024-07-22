<template>
  <div class="dsf-select-person">
    <van-nav-bar
      v-if="!showSearch && showAppTopMenu && showHeader"
      :title="title"
      :class="{ navBarSticky: navBarSticky }"
      :left-arrow="showBack"
      @click-left="back"
    >
      <template #left v-if="showBack">
        <van-icon name="arrow-left" /><span>返回</span>
      </template>
    </van-nav-bar>
    <form v-if="!showSearch && showSearchBox && showHeader" action="/">
      <van-search
        ref="search"
        v-model="searchValue"
        placeholder="搜索"
        @click="onSearch"
      >
      </van-search>
    </form>
    <!-- 对应pc手动输入 输入之后添加到已选项-->
    <!-- <div class="manual" v-if="extra.allowEdit && !showSearch">
      <van-button
        v-if="!isManual"
        type="default"
        size="small"
        @click="isManual = !isManual"
        >手动输入</van-button
      >
      <template v-else>
        <van-field v-model="manualValue" placeholder="请输入添加至已选择" />
        <van-button type="default" size="small" @click="manualToSelectArr"
          >确认</van-button
        >
      </template>
    </div> -->
    <div v-if="!showSearch" class="tabs">
      <van-tabs
        v-if="selectType == 0"
        v-model="tab"
        :offset-top="dsf.util.getOffsetTop(tabsOffsetTop)"
        animated
        sticky
        @click="onClick"
      >
        <van-tab
          v-for="(item, index) in tabs"
          :key="index"
          :title="item.name"
          :name="item.action"
        >
          <div v-if="tab == item.action && ifDataGood">
            <control-user-tree
              v-if="personSelectData.length"
              :metaId="metaId"
              :selectper="selectper"
              :multiple="personMultiple"
              :person-select-data="personSelectData"
              :params="item"
              :extra="extra"
              :currentTab="currentTab"
              :person-add-list="personAddList"
              :ref="item.name"
              class="_add_tree"
              @select="getSelect"
              @initData="initData"
              @onChangePerson="(val) => (personAddList = val)"
            ></control-user-tree>
            <commonempty v-else description="暂无人员" />
          </div>
        </van-tab>
      </van-tabs>
      <control-user-tree
        ref="controlUserTree"
        v-else-if="showTree"
        :metaId="metaId"
        :selectper="selectper"
        :person-select-data="personSelectData"
        :multiple="personMultiple"
        :currentTab="currentTab"
        :person-add-list="personAddList"
        :extra="extra"
        class="_add_tree"
        @select="getSelect"
        @initData="initData"
        @showDialogClick1="showDialogClick1"
        @onChangePerson="(val) => (personAddList = val)"
      ></control-user-tree>
    </div>
    <div v-else style="flex: 1; overflow: auto">
      <control-user-search-list
        :currentTab="currentTab"
        :selectper="selectper"
        :person-select-data="personSelectData"
        :person-add-list="personAddList"
        :multiple="personMultiple"
        @searchClose="onSearchClose"
        @select="getSelect"
        @onChangePerson="(val) => (personAddList = val)"
      >
      </control-user-search-list>
    </div>
    <van-tabbar placeholder>
      <van-tabbar-item class="_btns">
        <div class="tree_l" @click="showCheckUsers">
          <span>已选择：{{ selectObj }}</span>
          <van-icon
            v-show="selectArr.length > 0"
            class="tree_icon"
            size="0.32rem"
            name="arrow-up"
          />
        </div>
        <van-button
          v-if="!showAppTopMenu"
          class="tree_r"
          type="default"
          size="middle"
          @click="back"
          >取 消
        </van-button>
        <van-button
          v-if="selectType == '1' && extra.allowEdit && false"
          class="tree_r"
          type="info"
          size="middle"
          @click="showDialogClick"
          >存为小组</van-button
        >
        <van-button class="tree_r" type="info" size="middle" @click="addPerson"
          >确 定</van-button
        >
        <!--（{{selectArr.length}}/{{allCount}}）-->
      </van-tabbar-item>
    </van-tabbar>
    <van-popup
      v-model="show"
      :style="{ height: '90%' }"
      round
      position="bottom"
    >
      <control-user-checked
        :select-arr="selectArr"
        :commonGroup="[]"
        :orgType="false"
        @close="close"
        @changeData="changeData"
        :person-add-list="personAddList"
        @onChangePerson="(val) => (personAddList = val)"
      ></control-user-checked>
    </van-popup>
    <van-dialog
      v-model="showDialog"
      title="新建小组--命名"
      show-cancel-button
      :before-close="saveGroup"
    >
      <input class="input-g" v-model="inputVal" type="text" />
    </van-dialog>
    <van-dialog
      v-model="showDialog1"
      title="重命名小组--命名"
      show-cancel-button
      :before-close="renameGroup"
    >
      <input class="input-g" v-model="inputVal" type="text" />
    </van-dialog>
    <round-popup :show.sync="isShowManual" title="手动添加">
      <template #container>
        <van-field
          ref="manual"
          v-model="manualValue"
          type="textarea"
          :rows="5"
          placeholder="请输入添加至已选择"
          style="padding: 0"
        />
      </template>
      <template #btn>
        <van-button type="default" @click="isShowManual = false"
          >取消</van-button
        >
        <van-button type="theme" @click="manualToSelectArr()">确定</van-button>
      </template>
    </round-popup>
  </div>
</template>

<script>
import controlUserTree from "@/components/commonForm/controls/controlUserTree";
import controlUserChecked from "@/components/commonForm/controls/controlUserChecked";
import controlUserSearchList from "@/components/commonForm/controls/controlUserSearchList";
import roundPopup from "@/components/commonComponents/roundPopup.vue";
export default {
  name: "controlUser",
  components: {
    controlUserTree,
    controlUserChecked,
    controlUserSearchList,
    roundPopup,
  },
  props: {
    metaId: {
      type: String,
      default: "",
    },
    extra: {
      type: Object,
      default: {},
    },
    selectType: {
      type: Number,
      default: 0,
    },
    pageTitle: {
      type: String,
      default: null,
    },
    defaultSelectArray: {
      type: Array,
      default: () => [],
    },
    topformMeta: {
      type: Object,
      default: () => ({}),
    },
    showBack: {
      type: Boolean,
      default: true,
    },
    showHeader: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      tab: 0,
      tabsLoad: [],
      multiple: false,
      allCount: 0,
      searchValue: "",
      tabs: [],
      show: false,
      selectList: [],
      personSelectData: [],
      oldV: [],
      type: 0,
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
      navBarSticky: false,
      selectIdArr: [],
      ifDataGood: true,
      showSearch: false,
      showSearchBox: false,
      tabsOffsetTop: 0,
      showAppTopMenu: dsf.config.appTopMenu.value,
      currentTab: {},
      manualValue: "", // 手动输入的值
      isManual: false, // 是否显示手动输入框
      personMultiple: false,
      personAddList: [],
      showTree: false,
      showDialog: false,
      showDialog1: false,
      checkData: false,
      inputVal: "",
      groupData: [],
      addcheckData: [],
      showDialogTitle: "",
      renameData: {},
      isShowManual: false,
    };
  },
  computed: {
    title() {
      let self = this;
      if (
        self.selectType == 1 &&
        self.personSelectData.length > 0 &&
        self.personSelectData[0].showName
      ) {
        return self.personSelectData[0].showName;
      } else {
        return (
          self.pageTitle || (self.selectType == 0 ? "用户选择" : "代码选择")
        );
      }
    },
    selectObj() {
      let tempStr = "";
      if (this.selectType == 0) {
        let type1Count = 0,
          type5Count = 0,
          otherCount = 0;
        this.selectArr.forEach((element) => {
          if (element.type == "5") {
            type5Count++;
          } else if (element.type == "1") {
            type1Count++;
          } else {
            otherCount++;
          }
        });
        if (type1Count > 0) {
          tempStr += type1Count + "人,";
        }
        if (type5Count > 0) {
          tempStr += type5Count + "组织,";
        }
        if (otherCount > 0) {
          tempStr += otherCount + "项,";
        }
        tempStr = tempStr.trim(",");
        tempStr = tempStr.substring(0, tempStr.lastIndexOf(","));
      } else if (this.selectArr.length) {
        tempStr = this.selectArr.length + "项";
      }
      return tempStr;
    },
    btnDisable() {
      return this.selectArr.length == 0;
    },
  },
  watch: {
    extra: {
      handler(newValue, oldValue) {
        if (newValue && oldValue) {
          this.initData();
        }
      },
      deep: true,
      immediate: true,
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
  },
  created() {
    this.initData();
  },
  mounted() {
    this.$parent.$el.onscroll = this.handleScroll;
    let docFontsize = document.documentElement.style.fontSize.split("px")[0];
    let searchHeight = this.$refs.search ? this.$refs.search.offsetHeight : 0;
    let headerHeight = this.showAppTopMenu ? (46 / 50) * docFontsize : 0;
    this.tabsOffsetTop = searchHeight + headerHeight-5;//多减去5，解决吸顶会露出后面的文字问题
  },
  methods: {
    initData() {
      console.log(this.extra);
      let self = this;
      self.selectArr =
        self.selectper =
        this.personAddList =
          self.defaultSelectArray.concat() || [];
      this.searchValue = "";
      let selectParams = this.extra;
      this.multiple = selectParams;
      this.tabs = selectParams.tabs;
      let url = "";
      let urlParams = {};
      if (this.selectType == "0") {
        //用户选择
        url = selectParams.tabs[0].action.replace("ctrl/", "fn/");
        urlParams = selectParams.tabs[0].urlParams || "";
      } else {
        //代码选择
        url = selectParams.tabs[0].action;
      }

      //if (url.indexOf("person") > -1) //默认都有检索  2022年6月22日15:29:09 @ly
      this.showSearchBox = true;
      //}

      this.getPersonList(selectParams, url, urlParams);
      this.currentTab = this.tabs[0];
    },
    handleScroll() {
      // 获取屏幕滑动的高度
      if (this.$parent.$el.scrollTop > 0) {
        this.navBarSticky = true;
      } else {
        this.navBarSticky = false;
      }
    },
    //关闭弹层
    close(par) {
      this.show = par;
    },
    //展示选中的人
    showCheckUsers() {
      this.show = true;
    },
    //打开检索
    onSearch(val) {
      this.showSearch = true;
    },
    //关闭检索
    onSearchClose() {
      console.log("关闭人员检索层");
      this.showSearch = false;
    },
    //切换tab
    onClick(name, title) {
      this.ifDataGood = false;
      //console.log(this.tab,name)
      let param = this.multiple;
      let url = name;
      this.allCount = 0;
      let checkTab = this.tabs.filter((item) => {
        return item.action == name;
      });
      //console.log(checkTab)
      // window.GLOBAL.TabActions = checkTab;

      this.currentTab = checkTab[0];
      //   //如果当前tab页已经加载过数据则直接获取已经加载好的数据，否则调用接口获取数据
      //   const dataTemp = this.tabsLoad.filter((item) => item.dataurl == url);
      //   if (dataTemp.length > 0) {
      //     this.personSelectData = dataTemp[0].datalist;
      //     this.ifDataGood = true;
      //   //  this.$refs[title][0].initState(this.personSelectData);//重现渲染内存中的视图
      //   } else
      if (checkTab.length > 0) {
        this.getPersonList(param, url, checkTab[0].urlParams || {});
      }
    },
    //返回
    back() {
      this.$emit("close", false);
    },
    mapCodeList(data) {
      data.forEach((item) => {
        if (!item.attr) {
          item.attrs = {};
        }
        item.attrs.noselect = false;
        item.attrs.childrenCount = item.children ? item.children.length : 0;
        if (item.children) {
          if (item.children.length) {
            item.attrs.noselect = true;
            this.mapCodeList(item.children);
          }
        } else {
          item.children = [];
        }
      });
    },
    getPersonList(param, url, urlParams) {
      let loader = dsf.layer.loading("获取中");
      //console.log(this.tabs);
      // window.GLOBAL.personMultiple = param.multiple;
      this.personMultiple = param.multiple;
      let that = this;
      let query = urlParams || {};
      if (this.selectType != "0") {
        //用户选择
        query = dsf.util.deepCopy(this.$route.query);
        query.pk =
          this.$route.params?.pk ||
          this.$route.query?.pk ||
          this.topformMeta?.parameters?.pk;
        query.customCode = 1;
      }
      dsf.http
        .post(url, query)
        .then(function (result) {
          // 改造个人代码组数据--jf
          if (that.selectType != "0") {
            result.data.data.codeList.forEach((item) => {
              item.groupId == "codeGroupPrivate"
              if (item.id == "codeGroupPrivate") {
                item.children.forEach((it) => {
                  that.groupData.push(it);
                  let Ids = it.attrs.value.split(",");
                  Ids.forEach((ele, i) => {
                    let obj = that.CodeGroup(
                      result.data.data.codeList,
                      ele,
                      it.id
                    );
                    if (obj) {
                      it.children.push(Object.assign({}, obj));
                    }
                  });
                });
              }
            });
            // 个人代码组放最下面，children为空不显示
            let index = result.data.data.codeList.findIndex(
              (ele) => ele.id == "codeGroupPrivate"
            );
            if (
              index >= 0 &&
              result.data.data.codeList[index].children.length > 0
            ) {
              for (var x in result.data.data.codeList)
                result.data.data.codeList[x].id == "codeGroupPrivate"
                  ? result.data.data.codeList.push(
                      result.data.data.codeList.splice(x, 1)[0]
                    )
                  : 0;
            } else {
              for (var x in result.data.data.codeList)
                result.data.data.codeList[x].id == "codeGroupPrivate"
                  ? result.data.data.codeList.splice(x, 1)[0]
                  : 0;
            }
          }

          let userList =
            that.selectType == "0"
              ? result.data.data.departmentList
              : result.data.data.codeList;

          // liya添加开始，为内蒙呼和浩特远程发送最外层无attrs?.noselect，controlUserTree渲染错误
          if (!userList?.[0]?.attrs) {
            userList[0].attrs = {
              noselect: true,
            };
          }
          // liya添加结束

          if (that.selectType == "0" || that.selectType == "1") {
            // 0用户选择，1代码选择
            userList.forEach((toy) => {
              that.addPersonDeep(toy, 1);
              //计算总人数
              that.sumPerson(toy);
            });
          } else {
            userList[0].isopen = true;
            that.mapCodeList(userList);
            // userList.forEach((toy) => {
            //     toy.isopen=true;
            //     that.mapCodeList(toy.children);
            // });
          }
          if (userList.length) {
            userList.forEach((item) => {
              that.$set(item, "checked", false);
            });
            if (
              that.extra.filterSelf &&
              userList[0].children.findIndex(
                (item) =>
                  item.attrs.idValue ==
                  dsf.util.loadSessionStore("user").user_id
              ) > -1
            ) {
              userList[0].children.splice(
                userList[0].children.findIndex(
                  (item) =>
                    item.attrs.idValue ==
                    dsf.util.loadSessionStore("user").user_id
                ),
                1
              );
            }
            userList[0].children.forEach((item, index) => {
              that.$set(item, "checked", false);
            });
          }
          that.personSelectData = userList;
          that.personSelectData.forEach((item) => {
            if (item.id == "codeGroupPrivate") {
              item.children.forEach((it) => {
                it.attrs.noselect = true;
                it.group = true;
              });
            }
          });

          that.showTree = true;
          that.ifDataGood = true;
          that.tabsLoad.push({
            dataurl: url,
            datalist: userList,
          }); //已经加载过的tab不再重复加载
          console.log("人员选择控件", that.personSelectData);
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
        this.$set(
          data,
          "personChildrenLen",
          data.children.filter((it) => it.type == 1).length
        );
        data.children.forEach((item) => {
          self.addPersonDeep(item, start + 1);
        });
      }
    },
    sumPerson(item) {
      if (item.children.length > 0) {
        if (item.children[0].children && item.children[0].children.length > 0) {
          item.children.forEach((inx) => {
            this.sumPerson(inx);
          });
        } else {
          item.ChildCount = item.children.length;
          this.allCount += item.ChildCount;
        }
      }
    },
    addPerson() {
      let name = "";
      let val = "";
      let sch = "";
      let temp1 = [];
      let temp2 = [];
      let temp3 = [];
      //console.log("最终选择的人", this.selectArr);
      for (let cell of this.selectArr) {
        temp1.push(cell.name);
        temp2.push(cell.attrs.idValue);
        temp3.push(cell.type + "::" + cell.attrs.pidValue);
      }
      name = temp1.join(",");
      val = temp2.join(",");
      sch = temp3.join(",");
      this.person = name;
      this.show = false;
      this.oldV = this.selectList;
      this.show = false;
      this.selectIdArr = this.selectArr;
      this.$emit("getSelectUser", this.selectArr);
      console.log("最终选择=====>", this.person);
      this.showSearch = false;
      this.$bus.$emit("selectData", this.selectIdArr);
    },
    changeData(data){
      this.selectArr = data
    },
    getSelect(data) {
      data = this.formatData(data);
      //debugger
      let self = this;
      // manualArr为代码选择手动输入的代码值（不在树结构中）
      let manualArr = self.selectArr.filter((item) => item.isManual);
      self.selectArr = [];
      self.selectper = [];
      let hash = {};
      self.selectper = data.reduce((preVal, curVal) => {
        hash[curVal.id] ? "" : (hash[curVal.id] = true && preVal.push(curVal));
        return preVal;
      }, []);
      // console.log("选择人", self.selectper);
      self.selectper.forEach((item, index) => {
        if (item.checked) {
          if (self.multiple.multiple) {
            if (!self.selectArr.find((itm) => itm.id == item.id)) {
              self.selectArr.push(item);
            }
          } else {
            self.selectArr.splice(0, self.selectArr.length, item);
          }
        } else {
          self.selectArr.forEach((inx, i) => {
            if (inx.id == item.id) {
              self.selectArr.splice(i, 1);
            }
          });
        }
      });
      self.selectArr = [...new Set(self.selectArr.concat(manualArr))];
    },
    formatData(dataArr) {
      //去重
      let hash = {};
      const data2 = dataArr.reduce((preVal, curVal) => {
        if (curVal.id.split("_").length > 1) {
          var id = curVal.id.split("_")[curVal.id.split("_").length - 1];
          hash[id] ? "" : (hash[id] = true && preVal.push(curVal));
        } else {
          hash[curVal.id]
            ? ""
            : (hash[curVal.id] = true && preVal.push(curVal));
        }

        return preVal;
      }, []);
      return data2;
    },
    showManual() {
      this.isShowManual = true;
      this.$nextTick(() => {
        this.$refs.manual.focus();
      });
    },
    // 手动输入添加到已选项
    manualToSelectArr() {
      let self = this;
      if (!this.manualValue) {
        dsf.layer.toast("请输入");
        return;
      }
      let obj = {
        attrs: {},
        checked: true,
        id: this.manualValue,
        name: this.manualValue,
        pid: this.manualValue,
        showName: this.manualValue,
        type: 0,
        isManual: true, // 用于标识是手动输入的
      };
      dsf.http
        .post("/ctrl/codemanage/add", {
          name: this.manualValue,
          isDirectory: 3,
          isDirectoryText: "代码值",
          codeValue: this.manualValue,
          rowState: 1,
          fId: this.personSelectData[0].id,
        })
        .then(function (result) {
          console.log(result);
          if (result.status == "200") {
            dsf.layer.toast(result.data.message);
            self.initData();
          }
        });
      if (this.multiple.multiple) {
        // 多选直接push
        this.selectArr.push(obj);
      } else {
        // 单选时将选中项清空
        if (this.selectArr.length)
          this.$set(this.selectArr[0], "checked", false);
        this.selectArr.splice(0, this.selectArr.length, obj);
      }
      this.manualValue = "";
      this.isShowManual = false;
    },
    showDialogClick() {
      //新增小组弹框
      if (this.personAddList.length == 0) {
        dsf.layer.toast("未选中数据，请选择");
        return;
      }
      this.showDialog = true;
    },
    showDialogClick1(item) {
      //重命名弹框
      this.showDialog1 = true;
      this.renameData = item;
    },
    renameGroup(action, done) {
      let self = this;
      if (action === "confirm") {
        if (this.inputVal) {
          if (this.groupData.find((ele) => ele.showName == this.inputVal)) {
            dsf.layer.toast("存在同名小组，请重新输入！");
            return done(false);
          }
          dsf.http
            .post("/fn/code/select/updatePrivateCodeGroupName", {
              name: this.inputVal,
              key: this.renameData.id,
            })
            .then(function (result) {
              console.log(result);
              if (result.status == "200") {
                dsf.layer.toast(result.data.message);
                self.initData();
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
    saveGroup(action, done) {
      let Group = this.personSelectData.find(
        (ele) => ele.id != "codeGroupPrivate"
      );
      //保存小组数据
      let self = this;
      let params = {
        text: "",
        value: "",
      };
      if (action === "confirm") {
        if (this.inputVal) {
          if (this.groupData.find((ele) => ele.showName == this.inputVal)) {
            dsf.layer.toast("存在同名小组，请重新输入！");
            return done(false);
          }
          this.personAddList.forEach((ele) => {
            params.text += ele.name + ",";
            params.value += ele.id + ",";
          });
          console.log(params);
          dsf.http
            .post("/fn/code/select/savePrivateCodeGroup", {
              name: this.inputVal,
              groupId: Group.id,
              // data: JSON.stringify([params]),
              text: params.text,
              value: params.value,
            })
            .then(function (result) {
              console.log(result);
              if (result.status == "200") {
                self.initData();
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
    loopUser(data, Arr) {
      //递归获取全部下级人员
      data.forEach((ele) => {
        Arr.push(ele);
        ele?.children?.length > 0 ? this.loopUser(ele.children, Arr) : "";
      });
      return Arr;
    },
    CodeGroup(data, id, pid) {
      let Arr = this.loopUser(data, []);
      let Obj = Arr.find((item) => item?.id == id);
      if (Obj) {
        Obj = Object.assign({ pid: pid }, Obj);
      }
      return Obj;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";

.van-nav-bar {
  @include font-theme("normal");

  .van-icon {
    @include font-theme("normal");
    @include font_5;
    margin-right: 3px;
  }
}

.van-button--info {
  @include background-theme("normal");
  @include border-color-theme("normal");
}

::v-deep.dsf-select-person {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;

  .tabs {
    flex: 1;
    overflow-y: auto;
    background: #F8F8F8;
  }

  @include font_4(true);

  .van-tabs {
    height: auto;
  }

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
    // margin-bottom: 65px;
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

  ._btns {
    flex: 1;
    padding: 0 10px;

    .tree_l {
      display: flex;
      align-items: center;
      width: 50%;

      //text-align: center;
      .tree_icon {
        vertical-align: text-top;
      }
      span{
        font-size: 14px;
      }
    }

    .tree_r {
      width: 50%;
    }

    button {
      margin-left: 10px;
      height: 0.8rem;
      padding: 0;
      flex: 1;
    }
  }

  .van-tabbar--fixed {
    height: 1.2rem;
  }

  .navBarSticky {
    width: 100%;
    position: fixed;
    top: 0;

    &::after {
      // border-bottom:none;
    }
  }

  .manual {
    display: flex;
    align-items: center;
    padding: 0 12px;

    .van-field {
      border: 1px solid #ebedf0;
      margin-right: 6px;
    }

    button {
      flex-grow: 1;
      flex-shrink: 0;
      height: 38px;
      padding: 0 16px;
    }
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

.switch{
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-right: 4px;
  padding-top: 4px;
  padding-left: 15px;
  span{
    margin-top: 5px;
    font-size: 12px;
    color: #333333;
  }
}
</style>
