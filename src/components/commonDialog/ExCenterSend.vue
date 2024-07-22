<!-- 公文交换远程发送 -->
<template>
  <van-popup :style="{ height: '100%' }" v-model.sync="showPerson" :close-on-click-overlay="false" lock-scroll position="bottom" get-container="#app">
    <div class="dsf-select-person">
      <van-nav-bar v-if="!showSearch && showAppTopMenu && showHeader" title="远程发送" :class="{ navBarSticky: navBarSticky }" :left-arrow="showBack" @click-left="back">
        <template #left v-if="showBack">
          <van-icon name="arrow-left" />
          <span>返回</span>
        </template>
      </van-nav-bar>
      <form v-if="!showSearch && showSearchBox && showHeader" action="/">
        <van-search ref="search" v-model="searchValue" placeholder="搜索" @click="onSearch"></van-search>
      </form>
      <div v-if="!showSearch" class="tabs">
        <control-user-tree
          ref="controlUserTree"
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
          @onChangePerson="val => (personAddList = val)"
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
          @onChangePerson="val => (personAddList = val)"
        ></control-user-search-list>
      </div>
      <van-collapse v-model="activeName" accordion class="attachCollapse">
        <van-collapse-item :name="1">
          <template #title>
            <span>附件与关联文件</span>
            <span>({{ attachArr.filter(item => item.checked).length + fileRelationArr.filter(item => item.checked).length }}/{{ attachArr.length + fileRelationArr.length }})</span>
          </template>
          <van-checkbox v-for="attach in attachArr" v-model="attach.checked" shape="square" :key="attach.id">
            <img :src="dsf.util.getFileTypeIcon(attach.fileName)" alt="" style="width: 16px; height: auto; display: inline-block" />
            {{ attach.attValueText }}：
            {{ attach.fileName }}
          </van-checkbox>
          <van-checkbox v-for="fileRelation in fileRelationArr" v-model="fileRelation.checked" shape="square" :key="fileRelation.id">{{ fileRelation.fileName }}</van-checkbox>
        </van-collapse-item>
      </van-collapse>
      <van-tabbar placeholder>
        <van-tabbar-item class="_btns">
          <div class="tree_l" @click="showCheckUsers">
            <span>已选择：{{ selectObj }}</span>
            <van-icon v-show="selectArr.length > 0" class="tree_icon" size="0.32rem" name="arrow-up" />
          </div>
          <van-button v-if="!showAppTopMenu" class="tree_r" type="default" size="middle" @click="back">取 消</van-button>
          <van-button class="tree_r" type="info" size="middle" @click="addPerson">确 定</van-button>
        </van-tabbar-item>
      </van-tabbar>
      <van-popup v-model="show" :style="{ height: '90%' }" round position="bottom">
        <control-user-checked
          :select-arr="selectArr"
          :commonGroup="[]"
          :orgType="false"
          @close="close"
          @changeData="changeData"
          :person-add-list="personAddList"
          @onChangePerson="val => (personAddList = val)"
        ></control-user-checked>
      </van-popup>
    </div>
  </van-popup>
</template>

<script>
import controlUserTree from "./ExCenterSendControls/userTree"
import controlUserChecked from "@/components/commonForm/controls/controlUserChecked"
import controlUserSearchList from "@/components/commonForm/controls/controlUserSearchList"
import roundPopup from "@/components/commonComponents/roundPopup.vue"
export default {
  name: "ExCenterSend",
  components: {
    controlUserTree,
    controlUserChecked,
    controlUserSearchList,
    roundPopup
  },
  props: {
    metaId: {
      type: String,
      default: ""
    },
    extra: {
      type: Object,
      default: {}
    },
    selectType: {
      type: Number,
      default: 1
    },
    pageTitle: {
      type: String,
      default: null
    },
    defaultSelectArray: {
      type: Array,
      default: () => []
    },
    topformMeta: {
      type: Object,
      default: () => ({})
    },
    showBack: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
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
                name: "本机构"
              }
            ],
            name: "本单位"
          }
        ],
        title: "选择参与人员",
        type: "userselect",
        types: ["person", "department", "post"],
        typesString: "person,department,post",
        value: ""
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
      personMultiple: false,
      personAddList: [],
      showTree: false,
      renameData: {},
      activeName: 0,
      showPerson: true,
      attachArr: [],
      fileRelationArr: [],
      urlParams: {}
    }
  },
  computed: {
    selectObj() {
      let tempStr = ""
      if (this.selectType == 0) {
        let type1Count = 0,
          type5Count = 0,
          otherCount = 0
        this.selectArr.forEach(element => {
          if (element.type == "5") {
            type5Count++
          } else if (element.type == "1") {
            type1Count++
          } else {
            otherCount++
          }
        })
        if (type1Count > 0) {
          tempStr += type1Count + "人,"
        }
        if (type5Count > 0) {
          tempStr += type5Count + "组织,"
        }
        if (otherCount > 0) {
          tempStr += otherCount + "项,"
        }
        tempStr = tempStr.trim(",")
        tempStr = tempStr.substring(0, tempStr.lastIndexOf(","))
      } else if (this.selectArr.length) {
        tempStr = this.selectArr.length + "项"
      }
      return tempStr
    },
    btnDisable() {
      return this.selectArr.length == 0
    }
  },
  watch: {
    extra: {
      handler(newValue, oldValue) {
        if (newValue && oldValue) {
          this.initData()
        }
      },
      deep: true,
      immediate: true
    },
    checkData: {
      handler(val) {
        this.addcheckData = val
      },
      deep: true,
      immediate: true
    },
    showPerson(nv, ov) {
      if (!nv) {
        this.$nextTick(() => {
          this.$emit("closeCallback")
        })
      }
    }
  },
  created() {
    this.initData()
    this.initAttachData()
    this.initFileRelationData()
  },
  mounted() {
    this.$parent.$el.onscroll = this.handleScroll
    let docFontsize = document.documentElement.style.fontSize.split("px")[0]
    let searchHeight = this.$refs.search ? this.$refs.search.offsetHeight : 0
    let headerHeight = this.showAppTopMenu ? (46 / 50) * docFontsize : 0
    this.tabsOffsetTop = searchHeight + headerHeight
  },
  methods: {
    strToObj(url) {
      let obj = {}
      let arr = url.split("&")
      if (arr.length > 0) {
        arr.forEach(item => {
          let index = item.indexOf("=")
          let key = item.substr(0, index)
          let value = item.substr(index + 1)
          obj[key] = value || ""
        })
      }
      return obj
    },
    // 发送范围中附件显示并且根据设置勾选默认值
    initAttachData() {
      let selectAtt = this.urlParams.selectAtt,
        moduleId = this.urlParams.moduleId,
        pk = this.urlParams.pk
      dsf.http
        .post("fn/remoteExchangeView/attachmentData", {
          moduleId: moduleId,
          pk: pk,
          selectAtt: selectAtt
        })
        .then(res => {
          if (res.data && res.data.data && res.data.data.length) {
            let arr = res.data.data
            arr.forEach(item => {
              if (item.id == "-1000") {
                if (item.flag) {
                  item.checked = true
                } else {
                  item.checked = false
                }
              } else {
                if (selectAtt) {
                  let defaultSelects = selectAtt.split(";")[0]
                  let attvalueArray = defaultSelects.split(",")
                  if (attvalueArray.indexOf("" + item.attValue) > -1) {
                    item.checked = true
                  } else {
                    item.checked = false
                  }
                } else {
                  item.checked = true
                }
              }
            })
            this.attachArr = arr
          }
        })
    },
    //范围选择中关联文件的展示
    initFileRelationData() {
      let selectFileRelationValue = this.urlParams.selectFileRelationValue,
        moduleId = this.urlParams.moduleId,
        pk = this.urlParams.pk
      dsf.http
        .post("fn/remoteExchangeView/fileRelationData", {
          moduleId: moduleId,
          pk: pk,
          selectFileRelationValue: selectFileRelationValue
        })
        .then(res => {
          if (res.data && res.data.data && res.data.data.length) {
            let arr = res.data.data
            arr.forEach(item => {
              item.checked = false
              if (selectFileRelationValue) {
                let defaultSelects = selectFileRelationValue.split(";")[0]
                if (defaultSelects) {
                  let attvalueArray = defaultSelects.split(",")
                  if (attvalueArray.indexOf("" + item.relaType) > -1) {
                    item.checked = true
                  }
                }
              }
            })
            this.fileRelationArr = arr
          }
        })
    },
    initData() {
      console.log(this.extra)
      let self = this
      self.selectArr = self.selectper = this.personAddList = self.defaultSelectArray.concat() || []
      this.searchValue = ""
      let selectParams = this.extra
      this.multiple = selectParams
      this.tabs = selectParams.tabs
      let url = ""
      let urlParams = {}
      url = selectParams.tabs[0].action
      this.urlParams = this.strToObj(url)
      //if (url.indexOf("person") > -1) //默认都有检索  2022年6月22日15:29:09 @ly
      this.showSearchBox = true
      //}

      this.getPersonList(selectParams, url, urlParams)
      this.currentTab = this.tabs[0]
    },
    handleScroll() {
      // 获取屏幕滑动的高度
      if (this.$parent.$el.scrollTop > 0) {
        this.navBarSticky = true
      } else {
        this.navBarSticky = false
      }
    },
    //关闭弹层
    close(par) {
      this.show = par
    },
    //展示选中的人
    showCheckUsers() {
      this.show = true
    },
    //打开检索
    onSearch(val) {
      this.showSearch = true
    },
    //关闭检索
    onSearchClose() {
      console.log("关闭人员检索层")
      this.showSearch = false
    },
    //返回
    back() {
      this.showPerson = false
    },
    mapCodeList(data) {
      data.forEach(item => {
        if (!item.attr) {
          item.attrs = {}
        }
        item.attrs.noselect = false
        item.attrs.childrenCount = item.children ? item.children.length : 0
        if (item.children) {
          if (item.children.length) {
            item.attrs.noselect = true
            this.mapCodeList(item.children)
          }
        } else {
          item.children = []
        }
      })
    },
    getPersonList(param, url, urlParams) {
      let loader = dsf.layer.loading("获取中")
      //console.log(this.tabs);
      // window.GLOBAL.personMultiple = param.multiple;
      this.personMultiple = param.multiple
      let that = this
      let query = urlParams || {}
      if (this.selectType != "0") {
        //用户选择
        query = dsf.util.deepCopy(this.$route.query)
        query.pk = this.$route.params?.pk || this.$route.query?.pk || this.topformMeta?.parameters?.pk
        query.customCode = 1
      }
      dsf.http
        .post(url, query)
        .then(function (result) {
          let userList = that.selectType == "0" ? result.data.data.departmentList : result.data.data.codeList

          if (that.selectType == "0" || that.selectType == "1") {
            // 0用户选择，1代码选择
            userList.forEach(toy => {
              that.addPersonDeep(toy, 1)
              //计算总人数
              that.sumPerson(toy)
            })
          } else {
            userList[0].isopen = true
            that.mapCodeList(userList)
          }
          if (userList.length) {
            userList.forEach(item => {
              that.$set(item, "checked", false)
            })
            if (that.extra.filterSelf && userList[0].children.findIndex(item => item.attrs.idValue == dsf.util.loadSessionStore("user").user_id) > -1) {
              userList[0].children.splice(
                userList[0].children.findIndex(item => item.attrs.idValue == dsf.util.loadSessionStore("user").user_id),
                1
              )
            }
            userList[0].children.forEach((item, index) => {
              that.$set(item, "checked", false)
            })
          }
          that.personSelectData = userList

          that.showTree = true
          that.ifDataGood = true
          that.tabsLoad.push({
            dataurl: url,
            datalist: userList
          }) //已经加载过的tab不再重复加载
          console.log("人员选择控件", that.personSelectData)
        })
        .finally(() => {
          that.$nextTick(() => {
            dsf.layer.closeLoading(loader)
          })
        })
    },
    addPersonDeep(data, start) {
      let self = this
      this.$set(data, "deep", start)
      this.$set(data, "isopen", start <= 1 ? true : false)
      if (data.children && data.children.length > 0) {
        this.$set(data, "personChildrenLen", data.children.filter(it => it.type == 1).length)
        data.children.forEach(item => {
          self.addPersonDeep(item, start + 1)
        })
      }
    },
    sumPerson(item) {
      if (item.children.length > 0) {
        if (item.children[0].children && item.children[0].children.length > 0) {
          item.children.forEach(inx => {
            this.sumPerson(inx)
          })
        } else {
          item.ChildCount = item.children.length
          this.allCount += item.ChildCount
        }
      }
    },
    addPerson() {
      let name = ""
      let val = ""
      let sch = ""
      let temp1 = []
      let temp2 = []
      let temp3 = []
      //console.log("最终选择的人", this.selectArr);
      for (let cell of this.selectArr) {
        temp1.push(cell.name)
        temp2.push(cell.attrs.idValue)
        temp3.push(cell.type + "::" + cell.attrs.pidValue)
      }
      name = temp1.join(",")
      val = temp2.join(",")
      sch = temp3.join(",")
      this.person = name
      this.show = false
      this.oldV = this.selectList
      this.show = false
      this.selectIdArr = this.selectArr
      console.log("最终选择=====>", this.person)
      let param = this.onBeforeCodeSelectCallback()
      let params = this.extra.tabs[0].params
      if (param) {
        param.moduleId = this.urlParams.moduleId
        $.extend(param, params)
        if ((params.sealType === "normal" || params.sealType === "new" || params.sealType === "reseal") && this.selectArr.length) {
          param.sealUnit = this.selectArr[0]?.id || ""
        }
        if (params.remoteSendPaper == "convert") {
          // if (checkSendPaper(param)) { //暂不支持
          //   doRemoteSendPaperConvert(pk, param)
          // } else {
          params.remoteSendPaper = null
          params.convertId = null
          param.filterFileList = param.selectedAttachments || "" //发送指定附件
          this.doSend(param, params)
          // }
        } else {
          param.filterFileList = param.selectedAttachments || "" //发送指定附件
          this.doSend(param, params)
        }
      }
    },
    onBeforeCodeSelectCallback() {
      if (this.selectArr.length == 0) {
        dsf.layer.toast("请选择需要发送的单位")
        return null
      }
      let ids = this.attachArr.filter(item => item.checked).map(attch => attch.id)
      let filerelationFileIds = this.fileRelationArr.filter(item => item.checked).map(file => file.id)
      let filerelationFileDatas = this.fileRelationArr.filter(item => item.checked).map(file => {
        return { id: file.id, name: file.name }
      })
      if (ids.length == 0) {
        //没有勾选代表不发送附件
        ids.push("-1")
      }
      if (filerelationFileIds.length == 0) {
        //没有勾选代表不选择关联文件
        filerelationFileIds.push("-1")
      }
      let targetData = this.selectArr.map(item => {
        let attrs = item.attrs
        let obj = {
          id: item.id,
          name: item.name,
          domain: item.attrs?.domain || ''
        }
        if (item.hasOwnProperty("copy")) {
          obj.copy = item.copy
        }
        if (item.hasOwnProperty("page")) {
          obj.page = item.page
        }
        if (item.hasOwnProperty("down")) {
          obj.down = item.down
        }
        //ex:send to user
        if (attrs && attrs["exchNodeType"] === "user") {
          obj.nodeType = "user"
          obj.orgId = attrs.orgId || ""
          obj.orgName = attrs.orgName || ""
        }
        return obj
      })
      return {
        pk: this.urlParams.pk,
        targets: JSON.stringify(targetData),
        desc: "",
        selectedAttachments: ids.join(","),
        filerelationFileIds: filerelationFileIds.join(","),
        filerelationFileDatas: JSON.stringify(filerelationFileDatas)
      }
    },
    doSend(data, opts) {
      //根据类型判断发送类型
      let sentType = opts.exchangeDocType
      let url = "fn/exchangeCenterCaller/sendDoc"
      if (sentType == "EXCENTER-HY") {
        url = "fn/remoteMeeting/sendMeetingTz"
      } else if (sentType == "exchangeNote") {
        url = "fn/remoteNoteController/sendNotes"
      }
      if (opts.vendor == 6) {
        url = "fn/exRemoteInterfaceController/sendDoc"
        data.typeclass = opts.typeclass
        data.typeclassName = opts.typeclassName
        data.typemethod = opts.typemethod
        data.typemethodname = opts.typemethodname
      }
      let projectUrl = opts.projectUrl //业务自定义后台
      if (projectUrl != null && projectUrl != "") {
        url = projectUrl
      }
      dsf.http.post(url, data).then(res => {
        if (res.data.code == 200) {
          dsf.layer.toast("发送成功")
          this.showPerson = false
        } else {
          dsf.layer.toast(res.data.message)
        }
      })
    },
    changeData(data) {
      this.selectArr = data
    },
    getSelect(data) {
      data = this.formatData(data)
      //debugger
      let self = this
      self.selectArr = []
      self.selectper = []
      let hash = {}
      self.selectper = data.reduce((preVal, curVal) => {
        hash[curVal.id] ? "" : (hash[curVal.id] = true && preVal.push(curVal))
        return preVal
      }, [])
      // console.log("选择人", self.selectper);
      self.selectper.forEach((item, index) => {
        if (item.checked) {
          if (self.multiple.multiple) {
            if (!self.selectArr.find(itm => itm.id == item.id)) {
              self.selectArr.push(item)
            }
          } else {
            self.selectArr.splice(0, self.selectArr.length, item)
          }
        } else {
          self.selectArr.forEach((inx, i) => {
            if (inx.id == item.id) {
              self.selectArr.splice(i, 1)
            }
          })
        }
      })
    },
    formatData(dataArr) {
      //去重
      let hash = {}
      const data2 = dataArr.reduce((preVal, curVal) => {
        if (curVal.id.split("_").length > 1) {
          var id = curVal.id.split("_")[curVal.id.split("_").length - 1]
          hash[id] ? "" : (hash[id] = true && preVal.push(curVal))
        } else {
          hash[curVal.id] ? "" : (hash[curVal.id] = true && preVal.push(curVal))
        }

        return preVal
      }, [])
      return data2
    },
    loopUser(data, Arr) {
      //递归获取全部下级人员
      data.forEach(ele => {
        Arr.push(ele)
        ele?.children?.length > 0 ? this.loopUser(ele.children, Arr) : ""
      })
      return Arr
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";

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
    background: #f8f8f8;
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
      span {
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
}
/deep/.van-dialog__content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.attachCollapse {
  .van-checkbox {
    margin-bottom: 10px;
  }
}
</style>
