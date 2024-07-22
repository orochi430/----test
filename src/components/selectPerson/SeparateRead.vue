<template>
  <div class="ds-separate-read">
    <van-popup v-model="isShow1" position="bottom" @closed="closePopup">
      <div class="header">
        <van-nav-bar title="分阅意见" left-text="取消" @click-left="cancel1" />
      </div>
      <div class="body">
        <van-field v-model="optionValue" rows="4" type="textarea" placeholder="请输入分阅意见" autosize="" />
        <div class="tag-box">
          <div class="tag-list">
            <div v-for="(item, index) in opinionList" :key="index" class="tag-item">
              <div class="tag-item-text" @click="writeAdvice(item.context)">
                {{ item.context }}
              </div>
              <div class="tag-item-bt" @click="deleteAdvice(item, index)">
                <van-icon name="cross" />
              </div>
            </div>
          </div>
          <van-button icon="plus" size="small" plain @click="addAdvice">新增模板</van-button>
        </div>
        <div class="sms-container">
          <van-checkbox-group v-model="result" direction="horizontal">
            <van-checkbox name="isSms">是否提醒</van-checkbox>
            <van-checkbox name="isEndSms">阅闭是否提醒</van-checkbox>
          </van-checkbox-group>
          <van-field v-show="result.find(item => item == 'isSms')" v-model="smsContent" rows="4" autosize type="textarea"
            placeholder="请输入提醒内容" />
        </div>
      </div>
      <div class="footer">
        <van-button type="theme" @click="send">选择人员</van-button>
      </div>
    </van-popup>
    <van-popup v-model="isShow2" position="bottom" :close-on-click-overlay="false" ref="container"
      :style="{ height: '100%' }">
      <control-user-list :extra="extra" :default-select-array="defaultSelectArray" @close="cancel2"
        @getSelectUser="addReadSure"></control-user-list>
    </van-popup>
  </div>
</template>

<script>
import controlUserTree from "@/components/commonForm/controls/controlUserTree";
import DebounceClick from "@/components/common/debounceClick.jsx";
import controlUserList from "@/components/commonForm/controls/controlUserList";
export default {
  name: "SeparateRead",
  components: {
    controlUserTree,
    DebounceClick,
    controlUserList
  },
  props: {
    separateTabs: {
      type: Array,
      default: () => ([])
    },
    formParams: {
      type: Object,
      default: () => ({})
    },
    nowButtonParameters: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    return {
      result: [],
      resolve: () => { },
      reject: () => { },
      isShow1: false,
      isShow2: false,
      opinionList: [],
      message: "",
      optionValue: "",
      nowList: [],
      showList1: [],
      organizeList: [],
      userList: [],
      privateData: [],
      data: {},
      selectList: [],
      personSelectData: "",
      oldV: [],
      selectArr: [],
      selectParent: [],
      selectChild: [],
      type: 0,
      extra: {
        multiple: true,
        filterSelf: dsf.config.setting["SYS-FY-0012"] == "-1",
        tabs: []
      },
      tab: "",
      defaultSelectArray: [],
      smsContent: ""
    };
  },
  async created() {
    await this.getTabs();
    let tabSetting = dsf.config.setting["SYS-FY-0010"]
      ? dsf.config.setting["SYS-FY-0010"]
      : [];
    if (this.separateTabs && this.separateTabs.length) {
      this.extra.tabs = this.separateTabs;
    } else if (tabSetting.length) {
      this.extra.tabs = JSON.parse(tabSetting).filter(
        item => item.name != "角色"
      );
    } else {
      this.extra.tabs = {
        multiple: true,
        filterSelf: dsf.config.setting["SYS-FY-0012"] == "-1",
        tabs: [
          {
            action:
              "fn/user/select/data?types=person&rootObject=1&action=self_dept&async=true",
            name: "本部门",
            subTabKey: "department"
          },
          {
            action:
              "fn/user/select/data?types=person&rootObject=1&action=self_org&async=true",
            name: "本机构",
            subTabKey: "department"
          },
          {
            name: "群组",
            action:
              "fn/user/select/data?types=person,department,post,privateGroup,own_group&rootObject=2&action=private_group&async=true&source=share",
            subTabKey: "department"
          }
        ]
      };
    }
  },
  methods: {
    getTabs() {
      // 获取分阅选人范围tab
      return new Promise((resolve, reject) => {
        try {
          dsf.http.post("/fn/mobileToRead/mobileShareInfo", {
            selectedTabs: this.nowButtonParameters.selectedTabs || '',
            pk: this.formParams.pk,
            moduleId: this.formParams.moduleId,
            distribId: this.formParams.distribId || '',
          }).then(res => {
            if (res.data.code == 200) {
              dsf.config.setting["SYS-FY-0010"] = JSON.stringify(
                res.data.data.tabs
              );
              let regex2 = /\[(.+?)\]/g;
              let content = res.data.data.fySmsContent;
              let replaceData = {
                "分阅用户": dsf.util.loadSessionStore("user").name,
                "分阅时间": moment().format("YYYY-MM-DD HH:mm:ss"),
                "模块名称": this.data.moduleName,
                "文件标题": this.data.bt,
                "分阅意见": this.optionValue
              };

              if (content.match(regex2)) {
                content.match(regex2).forEach(element => {
                  let key = element.replace("[", "").replace("]", "")
                  if (replaceData[key]) {
                    content = content.replace(element, replaceData[key])
                  }
                });
              }
              this.smsContent = content
            }
            resolve();
          });
        } catch (error) {
          resolve();
        }
      });
    },
    show(data, selectArray) {
      this.data = data;
      this.defaultSelectArray = selectArray;
      this.getAdvice();
      // 市政府办公厅默认不要分阅意见，后续如有项目需要在按钮上加参数扩展
      if (this.nowButtonParameters.opinion == 1) {
        this.isShow1 = true;
      } else {
        this.isShow2 = true;
      }
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    cancel1() {
      this.isShow1 = false;
      this.reject("流程被中断");
    },
    cancel2() {
      this.isShow2 = false;
    },
    send() {
      this.isShow2 = true;
    },
    // 获取常见意见模板
    getAdvice() {
      dsf.http.get("fn/mobileUsedOpinion/find").then(res => {
        this.opinionList = res.data.rows;
      });
    },
    // 添加意见
    addAdvice() {
      if (this.optionValue === "") {
        dsf.layer.toast("请输入内容");
      } else {
        dsf.http
          .post("fn/mobileUsedOpinion/add", {
            __DATA: JSON.stringify({
              opinion: this.optionValue
            })
          })
          .then(() => {
            this.getAdvice();
          });
      }
    },
    // 删除意见
    deleteAdvice(item) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定要删除吗？"
        })
        .then(() => {
          dsf.http.get("fn/mobileUsedOpinion/delete?id=" + item.id).then(() => {
            this.getAdvice();
          });
        });
    },
    //点击意见
    writeAdvice(txt) {
      this.optionValue = this.optionValue + txt;
      this.$forceUpdate();
    },
    // 确定分阅
    async addReadSure(data) {
      let schemaVal = "",
        userIds = "",
        userNames = "";
      let deptName = []
      data.forEach((i, index) => {
        let spit = index ? "," : "";
        schemaVal += `${spit}${i.type}::${i.id}`;
        userIds += i.type == 5 ? `${spit}${i.id}` : `${spit}${i.attrs.realDeptId || i.pid}-${i.id}`;
        userNames +=
          i.type == 5
            ? `${spit}${i.name}`
            : `${spit}${i.attrs.orgNameLV2Text || i.attrs.orgNameLV1Text}-${i.name
            }`;
        if (i.type == 5) {
          deptName.push(i.name)
        }
      });
      if (deptName.length) {
        await new Promise((resolve, reject) => {
          dsf.layer.confirm({
            title: "提示",
            message: `是否确认分阅给【${deptName.join(',')}】内所有人员？`,
          },
            () => {
              resolve()
            }),
            () => {
              reject()
            }
        })
      }
      let obj = {
        infoId: this.data.info_id,
        userIds: userIds,
        userNames: userNames,
        schemaVals: schemaVal,
        distribId: this.data.distribId || "",
        canRedistrib: 1, //分阅完以后是否允许再次分阅
        infoType: this.data.infoType || "",
        infoTypeText: this.data.infoTypeText || "",
        shareContent: this.optionValue,
        shareList: "",
        isSms: this.result.find(item => item == "isSms") ? "1" : "-1", //是否发送短信 1是，-1 否
        smsContent: "", //短信内容
        reShare: 0, //再次分阅
        isEndSms: this.result.find(item => item == "isEndSms") ? "1" : "-1" //阅闭是否提醒
      };
      if (this.data.distribId && this.data.distribId != "0") {
        obj.reShare = 1;
        //obj.canRedistrib = -1;
      }
      // console.log("分阅接口传参对象分阅接口传参对象",obj.userIds);
      if (obj.userIds === "") {
        dsf.layer.toast("请选择人员");
        return;
      }
      this.isShow1 = false;
      this.isShow2 = false;
      console.log(obj);
      dsf.layer.loading()
      dsf.http.post("fn/mobileToReadOperation/toShare", obj).then(data => {
        dsf.layer.clear()
        dsf.layer.toast(data.data.message, true);
        if (
          this.data.distribId &&
          this.data.distribId != "0" &&
          dsf.config.commonForm.toShareAndRead
        ) {
          dsf.http
            .post("fn/mobileToReadOperation/readed", {
              infoIds: this.data.info_id,
              distribIds: this.data.distribId
            })
            .then(res => {
              this.resolve(data.data.message);
            });
        } else {
          this.resolve(data.data.message);
        }
      });
    },
    closePopup() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.ds-separate-read {
  @include font_4();

  * {
    box-sizing: border-box;
  }

  .van-popup {
    display: flex;
    flex-direction: column;
    height: 90%;
  }

  .van-tabs__nav {
    padding: 0;
  }

  .van-tabs__line {
    bottom: 0;
  }

  .body {
    flex: auto;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    border-top: 16px solid #f3f3f3;
    border-bottom: 16px solid #f3f3f3;
    padding-bottom: 1.5rem;

    .tag {
      &-box {
        border-top: 16px solid #eee;
        padding: 16px;
        text-align: right;

        .van-button {
          color: #333;
          border: 1px solid #ddd;
          background-color: #f5f5f5;
          border-radius: 4px;
        }
      }

      &-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        text-align: left;
      }

      &-item {
        max-width: 100%;
        padding-right: 27px;
        @include font_6();
        margin-right: 10px;
        margin-bottom: 10px;
        position: relative;

        &-text {
          border: 1px solid #ddd;
          padding: 2px 8px;
          color: #333;
          line-height: 1.35;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          background-color: #f5f5f5;
          word-wrap: break-word;
        }

        &-bt {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 25px;
          height: 100%;
          border: 1px solid #ddd;
          color: #666;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          background-color: #f5f5f5;
          position: absolute;
          top: 0;
          right: 0;
        }
      }
    }
  }

  .footer {
    display: flex;
    flex: none;
    justify-content: space-between;
    align-items: center;
    padding: 15px 18px;
    height: 75px;
    width: 100%;
    background-color: #fff;
    position: fixed;
    bottom: 0;

    .van-button {
      flex: auto;
      height: 48px;
    }
  }
}

.sms-container {
  padding: 15px;
  border-top: 16px solid #eee;

  .van-cell {
    padding: 0;
    margin-top: 10px;
    border: 1px solid #ccc;

    .van-field__body {
      padding: 5px;
    }
  }
}
</style>
