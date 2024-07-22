import dsf from "../../common";
import store from "@/common/util";
import B64 from "@/common/base64";
// import { slice } from "lodash"

export default {
  methods: {
    // 会议报名
    "action-baoMing"(item, index) {
      const { dataValue } = item;
      console.log(dataValue);
      if (dsf.config.projectName == "xzd") {
        //县政钉选本单位
        this.$refs.signFile.extra = {
          typesString: "person,department,post,group,privateGroup",
          rootObject: "5",
          tabs: [
            {
              key: "self_unit",
            },
          ],
        };
      }

      this.$refs.signFile
        .show({
          meetingtzId: dataValue.info_id,
          pk: dataValue.info_id,
          pnId: dataValue.pnid,
          deptBaoming: true,
        })
        .then(
          () => {
            dsf.layer.toast("报名成功", true);
            this.onRefresh && this.onRefresh();
          },
          (res) => {
            // 弹窗关闭
          }
        );
      // this.$router.push({
      //   name: 'signFile',
      //   params: {
      //     data: dataValue
      //   }
      // })
    },
    "action-personBaoMing"(item, index) {
      const { dataValue } = item;
      console.log(dataValue);
      this.$refs.signFilePerson
        .show({
          meetingtzId: dataValue.id,
          pk: dataValue.id,
          pnId: 0,
          deptBaoming: false,
        })
        .then(
          () => {
            dsf.layer.toast("报名成功", true);
            this.onRefresh && this.onRefresh();
          },
          (res) => {
            // 弹窗关闭
          }
        );
      // this.$router.push({
      //   name: 'signFile',
      //   params: {
      //     data: dataValue
      //   }
      // })
    },
    // 会议请假
    "action-qingJia"(item, index) {
      this.$refs.askLeave
        .show({
          meetingtzId: item.dataValue.id,
        })
        .then(() => {
          dsf.layer.toast("请假成功", true);
          this.onRefresh && this.onRefresh();
        });
    },
    // 会议取消
    "action-quXiao"(item, index) {
      this.$toast.loading({
        forbidClick: true,
        message: "提交中",
      });
      dsf.http
        .post("fn/meeting/endMeetingInstance", {
          sqid: item.dataValue.id,
        })
        .then(({ data }) => {
          const { message, result, type } = data;
          if (type === "success" || result) {
            this.onRefresh && this.onRefresh();
          }
          this.dsf.layer.toast(message);
        })
        .catch(() => {
          this.$toast.clear();
        });
    },
    // 签到
    "action-qianDao"(item, index) {
      this.$toast.loading({
        forbidClick: true,
        message: "提交中",
      });
      dsf.http
        .post("fn/meeting/signMeeting", {
          pk: item.dataValue.pid,
          deviceId: "",
          userId: dsf.util.loadSessionStore("user").user_id,
        })
        .then(({ data }) => {
          const { message, result, type } = data;
          if (type === "success" || result) {
            this.onRefresh && this.onRefresh();
          }
          this.dsf.layer.toast(message);
        })
        .catch(() => {
          this.$toast.clear();
        });
    },
    // 公文签收
    "action-qianShou"(item, index) {
      this.$toast.loading({
        forbidClick: true,
        message: "提交中",
      });
      dsf.http
        .post("fn/remoteExchangeData/getReceiveTarget", {
          rcvRecordId: item.dataValue["A0001"] || item.dataValue["info_id"],
        })
        .then(({ data }) => {
          const target = data.data[0] || {};
          // debugger
          // return
          //一体化签收
          var postdata = {
            pk: item.dataValue["A0001"],
            convertId: target.id,
            targetModuleId: target.targetModuleId,
            isConvertToDo: "",
            moduleId: item.dataValue["A0004"],
            ruleId: target.ruleId,
          };
          dsf.http
            .post("ctrl/exRemoteInterfaceController/acceptDoc", postdata)
            .then(({ data }) => {
              const { message, result, type } = data;
              if (type === "success" || result) {
                this.onRefresh && this.onRefresh();
              }
              this.dsf.layer.toast(message, true);
            })
            .catch(() => {
              this.$toast.clear();
            });

          // //其他方式兼容所有
          // var postdata = {
          //   pk: item.dataValue["A0001"],
          //   convertId: target.id,
          //   targetModuleId: target.targetModuleId,
          //   isConvertToDo: false,
          //   doSign: true,
          //   ruleId: target.ruleId,
          // };
          // dsf.http
          //   .post("fn/remoteExchange/acceptByRule", postdata)
          //   .then(({ data }) => {
          //     const { message, result, type } = data;
          //     if (type === "success" || result) {
          //       this.onRefresh && this.onRefresh();
          //     }
          //     this.dsf.layer.toast(message, true);
          //   })
          //   .catch(() => {
          //     this.$toast.clear();
          //   });
          //以下是.NET教务版本方式
          // dsf.http
          //   .post("fn/remoteExchange/accept", {
          //     pk: item.dataValue['A0001'],
          //     moduleId: target.moduleId,
          //     targetModuleId: target.targetModuleId,
          //   })
          //   .then(({
          //     data
          //   }) => {
          //     const {
          //       message,
          //       result,
          //       type
          //     } = data;
          //     if (type === "success" || result) {
          //       this.onRefresh && this.onRefresh();
          //     }
          //     this.dsf.layer.toast(message, true);
          //   })
          //   .catch(() => {
          //     this.$toast.clear();
          //   });
        });
    },
    // 公文退回
    "action-tuiHui"(item, index) {
      this.showFlowBack = true;
      this.$nextTick(() => {
        this.$refs.wfDialog.show({
          text: "退回",
        });
      });
      this.selected = item.dataValue;
    },
    // 关注
    "action-guanZhu"(item, index) {
      console.log("ddd", index);
      if (dsf.config.setting["SYS-MOBILE-FORM-0018"] != 1) {
        this.$toast.loading({
          forbidClick: true,
          message: "提交中",
        });
        dsf.http
          .post("/fn/mobileFocus/setFocus", {
            fid: 0,
            infoId:
              item.dataValue.fid ||
              item.dataValue.info_id ||
              item.dataValue.infoId ||
              item.dataValue["A0001"] ||
              item.dataValue.id ||
              item.dataValue["SW_XZD.A0001"] ||
              item.dataValue["G_INFOS.A0001"] ||
              item.dataValue["XZBYQ_0012.A0001"],
            "x-auth-token": dsf.util.loadSessionStore("loginToken"),
          })
          .then(({ data }) => {
            const { message, result, type } = data;
            if (type === "success" || result) {
              // this.onRefresh && this.onRefresh();
              //修改关注不刷新列表
              let arr = [
                ...(item.buttons.commonButtons || item.buttons.commonButton),
                ...(item.buttons.mainButtons || item.buttons.mainButton),
              ];
              let button = arr.find((btn) => btn.action == "guanZhu");
              if (button) {
                // button.name = '已' + button.name;
                button.name = "取消";
                button.icon = "iconai-mark";
                button.action = "quXiaoGuanZhu";
              }
            }
            this.dsf.layer.toast("操作成功");
          })
          .catch(() => {
            this.$toast.clear();
          });
      } else {
        this.showChooseFolder = true;
      }
    },
    // 取消关注
    "action-quXiaoGuanZhu"(item, index) {
      this.$toast.loading({
        forbidClick: true,
        message: "提交中",
      });
      console.log(item);
      dsf.http
        .post("/fn/mobileFocus/deleteFocus", {
          infoId:
            item.dataValue.fid ||
            item.dataValue.info_id ||
            item.dataValue.infoId ||
            item.dataValue["A0001"] ||
            item.dataValue.id ||
            item.dataValue["SW_XZD.A0001"] ||
            item.dataValue["G_INFOS.A0001"],
        })
        .then(({ data }) => {
          const { message, result, type } = data;
          if (type === "success" || result) {
            dsf.layer.toast("操作成功");
            //如果是关注的列表   取消关注之后 刷新页面，否则修改按钮状态
            if (
              this.listId == "200829130745dElHh3RtPgDfI9hhFVP"
            ) {
              this.onRefresh && this.onRefresh();
            } else {
              let arr = [
                ...(item.buttons.commonButtons || item.buttons.commonButton),
                ...(item.buttons.mainButtons || item.buttons.mainButton),
              ];
              let button = arr.find((btn) => btn.action == "quXiaoGuanZhu");
              if (button) {
                // button.name = button.name.replace("已", ""); //'关注';
                button.name = "关注"; //'关注';
                button.icon = "iconshoucang";
                button.action = "guanZhu";
              }
            }
          }
        })
        .catch(() => {
          this.$toast.clear();
        });
    },
    getType() {
      let type = 6;
      switch (this.tab) {
        case "gw":
          type = 1;
          break;
        case "hy":
          type = 2;
          break;
        case "dbfk":
          type = 3;
          break;
        case "db":
          type = 3;
          break;
        case "dy":
          type = 4;
          break;
        case "dqs":
          type = 5;
          break;
      }
      return type;
    },
    // 置顶
    "action-zhiDing"(item, index) {
      this.$toast.loading({
        forbidClick: true,
        message: "提交中",
      });
      dsf.http
        .post("/fn/mobileToDo/topRead", {
          pk:
            this.getType() === 2
              ? item.dataValue.todoId
              : item.dataValue.id ||
              item.dataValue["A0001"] ||
              item.dataValue.info_id,
          type: this.getType(),
        })
        .then(({ data }) => {
          const { message, result, type } = data;
          if (type === "success" || result) {
            this.onRefresh && this.onRefresh();
          }
          this.dsf.layer.toast("操作成功");
        })
        .catch(() => {
          this.$toast.clear();
        });
    },
    // 取消置顶
    "action-quXiaoZhiDing"(item, index) {
      this.$toast.loading({
        forbidClick: true,
        message: "提交中",
      });
      dsf.http
        .post("/fn/mobileToDo/unTopRead", {
          pk:
            this.getType() === 2
              ? item.dataValue.todoId
              : item.dataValue.id ||
              item.dataValue["A0001"] ||
              item.dataValue.info_id,
          type: this.getType(),
        })
        .then(({ data }) => {
          const { message, result, type } = data;
          if (type === "success" || result) {
            this.onRefresh && this.onRefresh();
          }
          this.dsf.layer.toast("操作成功");
        })
        .catch(() => {
          this.$toast.clear();
        });
    },
    // 督办反馈--赣政通
    "action-fanKui"(item, index) {
      console.log(item);
      dsf.http
        .get(
          `fn/superviseV5/feedback/mobileTransFeedBack?id=${item.dataValue["A0001"]}`
        )
        .then(({ data }) => {
          if (data.code == "200") {
            this.$router.push({
              path: `/commonForm/2009221438319K1lPaTGwMBYwfpllZ5/${data.data.pk}`,
              query: {
                fkStatus: data.data.status,
              },
            });
          }
        });
      // this.$router.push({
      //   name: "FeedBack",
      //   params: {
      //     data: item
      //   }
      // });
    },
    // 督办---转交
    "action-Transfer"(item, index) {
      this.showPerson = true;
      this.selected = item;
      this.isTransfer = true;
      if (dsf.config.projectName == "xzd") {
        //县政钉要求选择本单位
        this.extra = {
          typesString: "person,department,post,group,privateGroup",
          rootObject: "5",
          tabs: [
            {
              key: "self_unit",
            },
          ],
        };
      }
    },
    "action-feedback"(item, index) {
      // 督办反馈
      dsf.http
        .post("/ctrl/convert/moduleRuleConvert", {
          convertId: "210723164631rGtQC0zTkW9rU5dYlxQ",
          initDataSource: 1,
          srcInfo: item.dataValue["DBTZ.A0001"] || item.dataValue["A0001"],
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.$router.push({
              path: `/commonForm/${res.data.data.moduleId}/${res.data.data.pk}`,
              query: {
                initDataSource: 1,
                sourcePk:
                  item.dataValue["DBTZ.A0001"] || item.dataValue["A0001"],
                relationId:
                  item.dataValue["DBTZ.A0001"] || item.dataValue["A0001"],
                type: "反馈",
              },
            });
          }
        });
    },
    "action-deptFeedback"(item, index) {
      // 督办部门内反馈-------------YY
      dsf.http
        .post("/ctrl/convert/moduleRuleConvert", {
          convertId: "2207191416105iDaeqzLIL5zalLANw6",
          initDataSource: 1,
          srcInfo: item.dataValue["DBTZ.A0001"] || item.dataValue["A0001"],
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.$router.push({
              path: `/commonForm/${res.data.data.moduleId}/${res.data.data.pk}`,
              query: {
                initDataSource: 1,
                sourcePk: item.dataValue["DBTZ.A0001"] || item.dataValue["A0001"],
                relationId: item.dataValue["DBTZ.A0001"] || item.dataValue["A0001"],
              },
            });
          }
        });
    },
    "action-releaseNotice"(item, index) {
      console.log(item);
    },
    // 督办延期
    "action-shenQingYanQi"(item, index, isPop) {
      if (isPop) {
        this.showDelayform = true;
      } else {
        this.$router.push({
          name: "DelayForm",
          params: {
            data: item,
          },
        });
      }
    },
    // 督办办结
    "action-banJie"(item, index) {
      this.$router.push({
        name: "supervise",
        params: {
          data: item,
        },
      });
    },
    // 阅毕
    "action-yueBi"(item, index) {
      this.$toast.loading({
        forbidClick: true,
        message: "提交中",
      });
      dsf.http
        .post("fn/mobileToReadOperation/readed", {
          infoIds: item.dataValue.info_id,
          distribIds: item.dataValue.distribId,
        })
        .then(({ data }) => {
          const { message, result, type } = data;
          if (type === "success" || result) {
            this.onRefresh && this.onRefresh();
          }
          this.dsf.layer.toast(message);
        })
        .catch(() => {
          this.$toast.clear();
        });
    },
    allYueBi(item, index) {
      if (!this.distribIds.length) {
        dsf.layer.toast("您暂无待阅文件!");
        return;
      }
      dsf.layer.confirm(
        {
          title: "批量阅毕",
          message: `是否确认批量阅毕当前列表文件？`,
          cancelButtonColor: "#000",
        },
        () => {
          this.$toast.loading({
            forbidClick: true,
            message: "提交中",
          });
          dsf.http
            .post("/fn/shareRead/readedIds", {
              distribIds: this.distribIds,
            })
            .then(({ data }) => {
              const { message, result, type } = data;
              if (type === "success" || result) {
                this.onRefresh && this.onRefresh();
              }
              this.dsf.layer.toast(message);
            })
            .catch(() => {
              this.$toast.clear();
            });
        }
      );
    },
    // 分阅
    "action-fenYue"(item, index) {
      this.showFyyj = true;
      if (!item.dataValue.info_id) {
        item.dataValue.info_id = item.dataValue["SW_XZD.A0001"];
      }
      this.$nextTick(() => {
        this.$refs.readPop.show(item.dataValue).then(
          () => {
            // 成功
            this.onRefresh && this.onRefresh();
            this.showFyyj = false;
          },
          (msg) => {
            // 窗体关闭
            console.log(msg);
            this.showFyyj = false;
          }
        );
      });
    },
    //转督办  阿拉善项目
    "action-zhuanDuBan"(item, index) {
      let srcModule = item.dataValue["moduleId"] || item.dataValue["A0004"];
      let srcInfo = item.dataValue["info_id"] || item.dataValue["A0001"];
      let targetModule = "2106021016102xjgjpCc6tqdMZkrX20"; // 督办立项
      let opts = {};
      const that = this;
      opts.isOpenForm = true;
      opts.convertParams = {
        autoRela: "",
      };
      let callback = function (result) {
        if ("success" == result.type) {
          // 新文件，给源督办项目ID赋值
          dsf.http.post("ctrl/superviseV6/convert/setDefaultValue", {
            pk: result.data.pk,
          });
        } else {
          dsf.layer.toast(result.message);
        }
      };
      moduleConvertEx(targetModule, srcModule, srcInfo, callback, null, opts);

      function moduleConvertEx(
        targetModule,
        srcModule,
        sourcePk,
        callback,
        errorCallback,
        opts
      ) {
        opts = opts || {};
        let initData = opts.initData;
        let postData = {
          sourceModule: srcModule,
          targetModule: targetModule,
          srcInfo: sourcePk,
        };
        if (initData) {
          postData["initDataSource"] = 1;
        }
        if (opts.isEndSrcFlow) {
          postData.isEndSrcFlow = 1;
        }
        if (opts.pnid) {
          postData.pnid = opts.pnid;
        }
        // if (typeof (ModuleObjectConvert) != "undefined" && ModuleObjectConvert[targetModule]) {
        //   var objectCovertParam = ModuleObjectConvert[targetModule]["params"] || {};
        //   $.extend(postData, objectCovertParam);
        // }
        if (opts.convertParams) {
          Object.assign(postData, opts.convertParams);
        } else {
          opts.convertParams = postData;
        }

        function dataConvertEx() {
          if (targetModule && srcModule) {
            let result = dsf.http
              .post("ctrl/convert/moduleConvert", postData)
              .then((result) => {
                // var exeAfterModuleConvertEx = false;
                let callbackResult;
                if (callback) {
                  callbackResult = callback(result.data);
                }
                if (callbackResult === undefined || callbackResult === false) {
                  if ("success" == result.data.type) {
                    if (
                      opts.isOpenForm != undefined &&
                      opts.isOpenForm == "false"
                    ) {
                      return false;
                    }
                    if (result.data.data["jump"] == "0") {
                    } else if (result.data.data["jump"] == "-1") {
                      //转换至拟稿节点
                      // this.$router.back();
                    } else {
                      let openFlowNode = result.data.data["openFlowNode"] || "";
                      let queryValue = {
                        reloadParentFormOnSave: true,
                        srcModule: srcModule,
                      };
                      let paramsValue = {
                        pk: result.data.data.pk,
                        moduleId: targetModule,
                      };
                      if (openFlowNode) {
                        queryValue.listId = "customConvertOpenBean";
                        queryValue.method = "viewList";
                        queryValue.openFlowNode = openFlowNode;
                      }
                      that.$router.push({
                        name: "commonForm",
                        params: {
                          ...paramsValue,
                        },
                        query: {
                          ...queryValue,
                        },
                      });
                    }
                    //办结源文件后操作
                    // if (!exeAfterModuleConvertEx && opts.isEndSrcFlow) {
                    //   that.$router.back();
                    // }
                    //是否刷新当前表单
                    // if (result.data.data && result.data.data["reloadForm"] == 1) {
                    //   window.location.href = window.location.href;
                    // }
                  } else {
                    dsf.layer.toast(result.data.messagee);
                  }
                }
              });
            if (
              result &&
              result.type !== "success" &&
              typeof errorCallback === "function"
            ) {
              errorCallback();
            }
          }
        }

        //需要文件限制
        dsf.http
          .post("ctrl/convert/fileConvertCount", postData)
          .then((result) => {
            if ("success" == result.data.type) {
              //取值
              let canCount = parseInt(result.data.data);
              if (canCount == -1) {
                dataConvertEx();
              } else if (canCount == 0) {
                dsf.layer.toast("转换生成文件已达到设定限制！");
              } else if (canCount > 0) {
                dsf.layer.confirm(
                  {
                    message:
                      "已存在" +
                      canCount +
                      "个转换文件，请确认是否继续转换生成新文件？",
                    confirmButtonText: "确认",
                  },
                  () => {
                    dataConvertEx();
                  }
                );
              }
            }
          });
      }
    },
    // 发送
    "action-faSong"(item, index) {
      dsf.http
        .post("/fn/xform/validate", {
          pk: item.dataValue.info_id || item.dataValue.infoId,
          moduleId: item.dataValue.moduleId,
          flowId: item.dataValue.flowId,
          nodeId: item.dataValue.nodeId,
          pId: item.dataValue.pid,
          pnId: item.dataValue.pnid,
          hd: dsf.config.clientType == "mobile" ? "0" : "1",
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.showFlowSend = true;
            this.$nextTick(() => {
              this.$refs["sendPop"].$el.style.display = "none";
              this.$refs.sendFile.show("isList");
            });
            this.selected = item.dataValue;
          } else {
            dsf.layer.confirm(
              {
                message: res.data.message,
                confirmButtonText: "进入表单",
              },
              () => {
                this.$nextTick(() => {
                  if (this.$refs.dslist.link) {
                    //单个时在commonlist中使用
                    this.$refs.dslist.link(item);
                  } else if (this.$refs.dslist.length) {
                    //数组时在todocenter.vue中使用
                    this.$refs.dslist[0].link(item);
                  }
                });
              }
            );
          }
        });
    },
    // 批量发送
    batchSend() {
      this.showCheck = true;
      this.$eventBus.onDefaultListCheck(this, (data) => {
        console.log(data);
        this.showFlowSend = true;
        this.$nextTick(() => {
          this.$refs["sendPop"].$el.style.display = "none";
          this.$refs.sendFile.show("isList");
        });
        this.selected = JSON.parse(JSON.stringify(data[0].dataValue));
        if (data.length > 1) {
          this.selected.disableAutoSend = 1;
          this.selected.disableAutoSend4EndNode = 1;
          this.selected.batchSend = 1;
          this.selected.allowEditOpinion = 0;
        }
        this.batchSendArr = data.map((item) => {
          return {
            type: "SR_SEND",
            bt: item.dataValue.bt,
            infoId: item.dataValue.info_id || item.dataValue.infoId,
            pid: item.dataValue.pid,
            pnid: item.dataValue.pnid,
            wfId: item.dataValue.flowId,
            nodeId: item.dataValue.nodeId,
            moduleId: item.dataValue.moduleId,
            moduleName: item.dataValue.moduleName,
            nodeName: item.dataValue.nodeName,
            agencyType: "0",
            disableAutoSend: -1,
            disableAutoSend4EndNode: -1,
            onlyCopyNode: false,
          };
        });
      });
      this.batchSend_checkClick = function (item) {
        if (!this.checkList.length) {
          this.checkList.push(item);
        } else {
          if (item.checked) {
            if (
              this.checkList[0].dataValue.moduleId == item.dataValue.moduleId &&
              this.checkList[0].dataValue.flowId == item.dataValue.flowId &&
              this.checkList[0].dataValue.nodeId == item.dataValue.nodeId
            ) {
              this.checkList.push(item);
            } else {
              item.checked = false;
              dsf.layer.toast("选择的文件必须同一类型、同一流程和同一环节");
            }
          } else {
            let index = this.checkList.findIndex(
              (listitem) => item.dataValue.id === listitem.dataValue.id
            );
            if (index > -1) {
              this.checkList.splice(index, 1);
            }
          }
        }
      };
    },
    // 安排人员
    "action-anPaiRenYuan"(item, index) {
      this.showPerson = true;
      this.selected = item;
    },
    // 拒签
    "action-juQian"(item, index) {
      this.$router.push({
        name: "RejectedSign",
        params: {
          data: item,
        },
      });
    },

    // 报名情况
    "action-baoMingQingKuang"(item, index) {
      console.log(dsf.config.meetingConfig.meetingNoToDoUrl);
      if (dsf.config.projectName == "xzd") {
        this.$router.push({
          path: "/meetingSignupStatus",
          query: {
            id: item.dataValue.id,
          },
        });
      } else {
        this.$router.push({
          path: "/meeting/signup/status",
          query: {
            id: item.dataValue.id,
          },
        });
      }
    },
    // 报名情况县政丁
    "action-baoMingQingKuang2"(item, index) {
      console.log(dsf.config.meetingConfig.meetingNoToDoUrl);
      this.$router.push({
        path: "/meetingSignupStatus",
        query: {
          id: item.dataValue["A0001"],
        },
      });
    },
    // 签收情况
    "action-qianShouQingKuang"(item, index) {
      let self = this;
      let remoteId = item.dataValue["fid"];
      if (item.dataValue["SW_XZD.A0001"]) {
        remoteId = item.dataValue["SW_XZD.A0001"];
      }
      Object.entries(item.dataValue).forEach((itm, index) => {
        if (itm[0].indexOf("A0001") >= 0) {
          remoteId = itm[1];
        }
      });
      console.log(item);
      dsf.http
        .post("fn/remoteExchangeData/getSendRecord", {
          remoteId: remoteId,
        })
        .then(function (data) {
          console.log(data.data.code);
          if (data.data.code == "200") {
            item.dataValue.fid = data.data.data.sendRecordId;
            self.$router.push({
              name: "signIn",
              params: {
                data: item,
              },
            });
          } else {
            dsf.layer.toast(data.data.message);
          }
        });
    },
    // 督办情况
    "action-duBanQingKuang"(item, index) {
      if (dsf.config.projectName == "xzd") {
        this.$router.push({
          name: "inspectorConditionXZD",
          params: {
            data: item,
          },
        });
      } else {
        this.$router.push({
          name: "InspectorCondition",
          params: {
            data: item,
          },
        });
      }
    },
    "action-duBanQingKuang1"(item, index) {
      this.$router.push({
        name: "InspectorConditionRB",
        params: {
          data: item,
        },
      });
    },
    "action-huiyibaoming"(item, index) {
      this.$router.push({
        name: "InspectorConditionRBhuiyi",
        params: {
          data: item,
        },
      });
    },
    "action-qianshouqingkuang"(item, index) {
      this.$router.push({
        name: "InspectorConditionRBqianshou",
        params: {
          data: item,
        },
      });
    },
    // 督办情况，后端鸟人把拼音拼错了
    "action-doBanQingKuang"(item, index) {
      this.$router.push({
        name: "InspectorCondition",
        params: {
          data: item,
        },
      });
    },

    // 视频会议
    "action-huiYiShiPin"(item, index) {
      if (window.dd) {
        dsf.layer.loading("发起视频中");
        dsf.video.startWithConf(
          item.dataValue.info_id || item.dataValue.id || item.dataValue["A0001"]
        );
      } else {
        dsf.layer.toast("功能暂未开放");
      }
    },
    // 流程视频
    "action-liuChengShiPin"(item, index) {
      if (window.dd) {
        console.log(
          item.dataValue.info_id,
          item.dataValue["A0001"],
          item.dataValue.id
        );
        dsf.video.startWithForm(
          item.dataValue.info_id || item.dataValue["A0001"] || item.dataValue.id
        );
      } else {
        dsf.layer.toast("功能暂未开放");
      }
    },

    // 会议2.0钉钉会议
    "action-huiYiShiPinNew"(item, index) {
      console.log(item);
      if (window.dd) {
        dsf.layer.loading("发起视频中");
        dsf.video.startWithConfNew({
          pk: item.dataValue["A0001"],
          moduleId: item.dataValue["A0004"],
        });
      } else {
        // dsf.layer.toast('功能暂未开放');
      }
    },

    // 会议2.0通知会议补发按钮
    "action-noticeRessiue"(item, index) {
      console.log(item);
      this.$router.push({
        path: `/commonForm/221121182120DMMgw8OAPFEWnUXDHhm`,
        query: {
          pk: item.dataValue["B0035"],
          type: item.dataValue["c-meetingtz-004.value"],
          fid: item.dataValue["B0035"],
        },
      });
    },
    // 会议2.0申请会议补发按钮
    "action-tongzBf"(item, index) {
      console.log(item);
      this.$router.push({
        path: `/commonForm/221121182120DMMgw8OAPFEWnUXDHhm`,
        query: {
          pk: item.dataValue["B0035"],
          type: item.dataValue["c-meetingsq-075.value"],
          fid: item.dataValue["B0035"],
        },
      });
    },
    // 会议2.0通知管理下发通知按钮
    "action-issueNotice"(item, index) {
      console.log(item);
      dsf.http
        .post("/fn/meetingNotice/issueNotice", {
          pk: item.dataValue["A0001"],
          moduleId: item.dataValue["A0004"],
        })
        .then((res) => {
          console.log(res);
          if (res.code == "200") {
            dsf.layer.toast("通知下发成功");
          } else {
            dsf.layer.toast("通知下发失败");
          }
        });
    },

    // 会议2.0会议申请会议通知按钮--jf
    "action-convertMeetingNotice"(item, index) {
      console.log(item);
      dsf.http
        .post("ctrl/flow/sendRequest", {
          pk: item.dataValue["A0001"],
          moduleId: "190111184257QgSNR8cW92akDpqeWMA",
          nextNodeId: 2,
          nextLineId: "uJTr9VgRtvRqBTs",
          todoId: "",
          exSendOpinion: "",
          handleUserId: 1,
          sendType: "SR_EXSEND",
          likeSendType: "SR_SEND",
        })
        .then((res) => {
          console.log(res);
        });
    },
    // 会议2.0会议申请材料回收--jf
    "action-recoveryTopicmMterial"(item, index) {
      console.log(item);
      dsf.http
        .post("ctrl/meetingTopic/modifyTopicRecoveryStatus", {
          pk: item.dataValue["A0001"],
          moduleId: item.dataValue["A0004"],
          type: "-1",
        })
        .then((res) => {
          console.log(res);
          if (res.status == "200") {
            dsf.layer.toast(res.data.message);
            this.onRefresh();
          }
        });
    },
    // 会议2.0会议申请材料下发--jf
    "action-cancelRecoveryTopicmMterial"(item, index) {
      console.log(item);
      dsf.http
        .post("ctrl/meetingTopic/modifyTopicRecoveryStatus", {
          pk: item.dataValue["A0001"],
          moduleId: item.dataValue["A0004"],
          type: 1,
        })
        .then((res) => {
          console.log(res);
          if (res.status == "200") {
            dsf.layer.toast(res.data.message);
            this.onRefresh();
          }
        });
    },
    // 新会议通讯录
    "action-meetingAddressList"(item) {
      console.log(item);
      this.$router.push({
        path: "/commonTabs/MailListDetail",
        query: {
          pk:
            item.dataValue["c-meetingsq-121.value"] ||
            item.dataValue["A0001"] ||
            item.dataValue["FTZ.A0001.value"],
          notLink: 1,
        },
      });
    },
    // 经信委会议通讯录
    "action-jxwAddressBook"(item) {
      console.log(item);
      this.$router.push({
        path: "/commonTabs/jxwMailListDetail",
        query: {
          secQuery: `{"pk": "${item.dataValue["FTZ.A0001.value"] ||
            item.dataValue["c-meetingsq-121.value"] ||
            item.dataValue["A0001"]
            }"}`,
          // notLink: 1
        },
      });
    },
    // 新会议报名情况--jf
    "action-meetingSignUp"(item) {
      // this.$router.push({
      //         path: '/commonTabs/MeetingSignDetail',
      //         query: {
      //             pk: item.dataValue['c-meetingsq-121.value'] || item.dataValue['A0001']
      //         }
      //     })
      this.$router.push({
        path: "/meetingEnter",
        query: {
          pk:
            item.dataValue["c-meetingsq-121.value"] || item.dataValue["A0001"],
          name: item.dataValue["B0001.value"],
        },
      });
    },
    // 议题征询反馈情况--jf
    "action-zxFeedBack"(item) {
      // this.$router.push({
      //     path: '/commonTabs/MeetingSignDetail',
      //     query: {
      //         pk: item.dataValue['c-meetingsq-121.value'] || item.dataValue['A0001']
      //     }
      // })
      this.$router.push({
        path: "/topicFeedback",
        query: {
          pk: item.dataValue["A0001"],
          name: item.dataValue["B0001.value"],
          moduleId: item.dataValue["A0004.value"],
        },
      });
    },
    // 议题查看--jf
    "action-YiTiChaKan"(item) {
      console.log(item);
      // this.$router.push({
      //     path: '/commonTabs/MeetingSignDetail',
      //     query: {
      //         pk: item.dataValue['c-meetingsq-121.value'] || item.dataValue['A0001']
      //     }
      // })
      this.$router.push({
        path: "/commonList/210803152651ysvjiVvXwDx6GPRxN7E/210607181937YJxUC5fve4y7q3SH5hJ",
        query: {
          secQuery: `{"pk": "${item.dataValue["A0001"]}"}`,
        },
      });
    },
    // 议题新增--jf
    "action-createRow"(item) {
      this.$router.push({
        path: "/topicFeedback",
        query: {
          pk: item.dataValue["A0001"],
          name: item.dataValue["B0001.value"],
        },
      });
    },
    // 新会议变更--jf
    "action-meetingChange"(item) {
      dsf.http
        .post("fn/meetingChange/convert", {
          masterId: item.dataValue["B0035"],
        })
        .then((res) => {
          if (res.data.code == 200) {
            let query = {
              initDataSource: 1,
              fid: item.dataValue["B0035"],
              pk: res.data.data.pk,
              source: res.data.data.source,
            };
            if (res.data.data.showNodeId) {
              Object.assign(query, {
                showNodeId: res.data.data.showNodeId,
                listId: "MeetingList",
                method: "customNode",
              });
            }
            if (res.data.data.hyTodo && res.data.data.hyTodo == '1') {
              dsf.layer.toast("操作成功", true, () => this.$router.push({
                path: `/commonForm/${res.data.data.moduleId}/${res.data.data.pk}`,
                query: query,
              }));
            } else {
              this.$router.push({
                path: `/commonForm/${res.data.data.moduleId}/${res.data.data.pk}`,
                query: query,
              });
            }
          } else {
            dsf.layer.toast(res.data.message);
          }
        });

      return;
      this.$router.push({
        name: "commonForm",
        params: {
          moduleId: "200819103404M68aBaOHQCJpEAaAES2",
        },
        query: {
          type: item.dataValue["c-meetingtz-004.value"],
          fid: item.dataValue["B0035"],
        },
      });
    },
    // 一体化会议变更--jf
    "action-DSF.Meeting.Action.meetingChange"(item) {
      dsf.http
        .post("ctrl/meetingChange/convert", {
          masterId: item.dataValue["B0035"],
        })
        .then((res) => {
          if (res.data.code == 200) {
            let query = {
              initDataSource: 1,
              fid: item.dataValue["B0035"],
              pk: res.data.data.pk,
              source: res.data.data.source,
            };
            if (res.data.data.showNodeId) {
              Object.assign(query, {
                showNodeId: res.data.data.showNodeId,
                listId: "MeetingList",
                method: "customNode",
              });
            }
            if (res.data.data.hyTodo && res.data.data.hyTodo == '1') {
              dsf.layer.toast("操作成功", true, () => this.$router.push({
                path: `/commonForm/${res.data.data.moduleId}/${res.data.data.pk}`,
                query: query,
              }));
            } else {
              this.$router.push({
                path: `/commonForm/${res.data.data.moduleId}/${res.data.data.pk}`,
                query: query,
              });
            }
          } else {
            dsf.layer.toast(res.data.message);
          }
        });
      return;
      this.$router.push({
        name: "commonForm",
        params: {
          moduleId: "200819103404M68aBaOHQCJpEAaAES2",
        },
        query: {
          type: item.dataValue["c-meetingtz-004.value"],
          fid: item.dataValue["B0035"],
        },
      });
    },
    // 一体化历史会议--jf
    "action-meetingChangeLog"(item) {
      console.log(item);
      this.$router.push({
        path: `/commonList/23082309373047kuAFRMFLXJi4PruqQ/200819103404M68aBaOHQCJpEAaAES2`,
        query: {
          secQuery: JSON.stringify({
            fid: item.dataValue["B0035.value"],
          }),
        },
      });
    },
    // 冲突会议发送--jf
    "action-ctflowSend2"(item) {
      console.log(item);
      // 先判断会议室有无冲突，若无冲突可发送
      dsf.http
        .post("fn/meetingRoomOccupy/checkRoomOccupy", {
          pk: item.dataValue["B0035"],
          hys: item.dataValue["C-MEETINGROOM-POCCUPY-0003.value"],
          sdate: item.dataValue["C-MEETINGROOM-POCCUPY-0001"],
          edate: item.dataValue["C-MEETINGROOM-POCCUPY-0002"],
        })
        .then((result) => {
          if (result.data.type == "error") {
            dsf.layer.toast(result.data.message);
          } else {
            dsf.http
              .post("ctrl/meetingRoomOccupy/getTodoData", {
                pk: item.dataValue["C-MEETINGROOM-POCCUPY-0011.value"],
              })
              .then((res) => {
                var data = {
                  info_id: item.dataValue["C-MEETINGROOM-POCCUPY-0011.value"],
                };
                Object.assign(data, res.data.data);
                console.log(data);
                dsf.http
                  .post("/fn/xform/validate", {
                    pk: data.info_id,
                    moduleId: data.moduleId,
                    flowId: data.flowId,
                    nodeId: data.nodeId,
                    pId: data.pid,
                    pnId: data.pnid,
                    hd: dsf.config.clientType == "mobile" ? "0" : "1",
                  })
                  .then((res) => {
                    if (res.data.code == 200) {
                      this.showFlowSend = true;
                      this.$nextTick(() => {
                        this.$refs["sendPop"].$el.style.display = "none";
                        this.$refs.sendFile.show("isList");
                      });
                      this.selected = data;
                    }
                  });
              });
          }
        });
    },

    // 冲突会议退回--jf
    "action-ctflowSendBack"(item) {
      console.log(item);
      dsf.http
        .post("ctrl/meetingRoomOccupy/getTodoData", {
          pk: item.dataValue["C-MEETINGROOM-POCCUPY-0011.value"],
        })
        .then((res) => {
          var data = {
            info_id: item.dataValue["C-MEETINGROOM-POCCUPY-0011.value"],
          };
          Object.assign(data, res.data.data);
          this.showFlowBack = true;
          this.$nextTick(() => {
            this.$refs.wfDialog.show({
              text: "退回",
            });
          });
          this.selected = data;
        });
    },
    // 意见回执
    "action-yiJianHuiZhi"(item, index) {
      let receiveDocId, rcvRecordId;
      Object.entries(item.dataValue).forEach((itm, index) => {
        if (itm[0].indexOf("A0001") >= 0) {
          receiveDocId = itm[1];
        }
        if (itm[0].indexOf("A0002") >= 0) {
          rcvRecordId = itm[1];
        }
      });

      dsf.http
        .post("fn/remoteExchange/feedbackByServer", {
          rcvRecordId: receiveDocId,
          doFeedback: false,
        })
        .then((res) => {
          const { message, type, data } = res.data;
          if (type === "success") {
            this.$router.push({
              name: "commonForm",
              params: {
                pk: data.feedbackId,
                moduleId: data.feedbackModuleId,
                rcvRecordId: data.rcvRecordId,
              },
            });
          } else {
            this.dsf.layer.toast(message);
          }
        });
    },
    // 会议出席
    "action-chuXi"(item, index) { },
    // 会议变更
    "action-huiYiBianGeng"(item, index) {
      this.$router.push({
        path: "/meeting/change",
        query: {
          pk: item.dataValue.id,
          moduleId: item.dataValue.moduleId,
        },
      });
    },
    // 会议取消
    "action-huiYiQuXiao"(item, index) {
      const loading = dsf.layer.loading("取消中");
      dsf.http
        .post("fn/meeting/endMeetingInstance", {
          sqid: item.dataValue.id,
        })
        .then((res) => {
          const { message, type } = res.data;
          if (type === "success") {
            this.onRefresh && this.onRefresh();
          }
          this.dsf.layer.toast(message);
        })
        .finally(() => {
          dsf.layer.closeLoading(loading);
        });
    },
    // ding
    "action-ding"(item, index) {
      if (dd.env.platform === "notInDingTalk") {
        return;
      }
      this.showPerson = true;
      this.selected = item;
      this.isDing = true;
    },
    "action-gout"(item, index) {
      dd.biz.conference.videoConfCall({
        title: "视频会议",
        calleeCorpId: "dinga215a69365c38b4e24f2f5cc6abecb85",
        calleeStaffIds: [
          "01073527405729134428",
          "121068281424150312",
          "1866470252761733",
        ],
        onSuccess: function () { },
        onFail: function () { },
      });
    },
    // 督办---转交
    "action-transfer"(item, index) {
      this.showPerson = true;
      this.selected = item;
      this.isTransfer = true;
      if (this.transferType !== undefined) this.transferType = "db";
      this.extra = {
        multiple: false,
        tabs: [
          {
            action:
              "fn/user/select/data?types=person&rootObject=3&action=self_org&async=false",
            name: "本机构",
            subTabKey: "department",
          },
        ],
      };
    },

    // 公文---转交
    "action-xform.changeUser"(item, index) {
      this.showPerson = true;
      this.selected = item;
      this.isTransfer = true;
      if (this.transferType !== undefined) this.transferType = "gw";
      this.extra = {
        multiple: false,
        tabs: [
          {
            action:
              "fn/user/select/data?types=person&rootObject=3&action=self_org&async=false",
            name: "本机构",
            subTabKey: "department",
          },
        ],
      };
    },
    //错发回收
    "action-recycle"(item, index) {
      let self = this;
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认回收此份文件吗?",
        })
        .then(() => {
          if (item.data) {
            // 错发回收中的回收
            let params = {
              pk: item.data.infoId,
              flowId: item.data.wfId,
              pId: item.data.pid,
              pnId: item.data.pnid,
              fPnId: item.data.fid,
              bt: item.data.bt,
              userId: item.data.userId,
              nodeName: item.data.actname,
            };
            console.log(params);
            dsf.http.post("fn/flow/recycle", params).then((retVal) => {
              if (retVal.data.type == "success") {
                dsf.layer.toast(retVal.data.message, "html");
                self.onRefresh();
              }
            });
          } else if (item.dataValue) {
            // 已办文件中的回收
            dsf.http
              .post("fn/flow/checkRecycle", {
                pk: item.dataValue.id || item.dataValue[self.keyColumn],
              })
              .then((res) => {
                if (res.data.type == "success") {
                  if (res.data.message == 1) {
                    // 单节点直接回收
                    let params = res.data.data;
                    dsf.http.post("fn/flow/recycle", params).then((retVal) => {
                      if (retVal.data.type == "success") {
                        dsf.layer.toast(retVal.data.message, "html", () => {
                          self.onRefresh();
                          self.$eventBus.refreshBadge(self);
                        });
                      }
                    });
                  } else {
                    // 多发需选择回收节点进行批量回收
                    let batchData = [];
                    dsf.http
                      .post("fn/flow/recycleListData", {
                        pk: item.dataValue.id,
                      })
                      .then((retVal) => {
                        self.$refs.ckDialog
                          .show(
                            retVal.data.data,
                            "选择回收人员",
                            "id",
                            "uName,deptName"
                          )
                          .then((idArr) => {
                            // idArr为选中项标识
                            batchData = idArr.map((id) => {
                              let node = retVal.data.data.find(
                                (item) => item.id == id
                              );
                              return {
                                pk: node.infoId,
                                flowId: node.wfId,
                                pId: node.pId,
                                pnId: node.pNId,
                                fPnId: node.fId,
                                bt: node.bt,
                                userId: node.userId,
                                nodeName: node.actName,
                              };
                            });
                            dsf.http
                              .post("fn/flow/batchRecycle", {
                                data: JSON.stringify(batchData),
                              })
                              .then((r) => {
                                if (r.data.type == "success") {
                                  dsf.layer.toast(r.data.message, "html");
                                  self.onRefresh();
                                }
                              });
                          })
                          .catch(() => {
                            dsf.layer.toast("请选择回收人员");
                          });
                      });
                  }
                } else {
                  dsf.layer.toast(res.data.message);
                }
              });
          }
        })
        .catch(() => {
          console.log("cancell");
        });
    },
    "action-custom1"(item, index) {
      dsf.dd
        .serverDing([item.dataValue["A0001"]])
        .then((res) => {
          dsf.layer.toast(res);
        })
        .catch((err) => {
          dsf.layer.toast(err);
        });
    },
    "action-cuibanRB"(item, index) {
      let self = this;
      dsf.http.post(`fn/cuibanRB`, {}).then(() => {
        dsf.layer.toast("催办成功");
      });
    },
    "action-custom3"(item, index) {
      // dsf.dd.serverDing([item.dataValue["A0001"]])
      this.$router.push({
        name: "commonListWrap",
        params: {
          moduleType: "pinganfankui",
          fid: item.dataValue["A0001"],
        },
      });
    },
    //通知公告阅读情况
    "action-NoticeReadDetail"(item, index) {
      // this.$router.push({
      //   path: "/commontabs/NoticeReadDetail"
      // });
      this.$router.push({
        path: "/announcementStatus",
        query: {
          pk: item.dataValue.A0001,
          bt: "您有一份标题为【" + item.dataValue.B0001 + "】的公告,请及时处理",
        },
      });
    },
    //通知公告发布
    "action-NoticePublish"(item, index) {
      dsf.layer.loading("发布中");
      dsf.http
        .post("/fn/notice/publish", {
          pks: item.dataValue.infoId || item.dataValue["A0001"],
          moduleId: item.dataValue.moduleId || item.dataValue["A0004"],
        })
        .then((response) => {
          if (response.data.code != 200) {
            dsf.layer.toast(response.data.message);
          } else {
            dsf.layer.toast(response.data.message, true);
            self.onRefresh();
          }
        });
    },
    // 取消通知公告发布
    "action-cancelPublish"(item, index) {
      let self = this;
      console.log(item);
      self.$dialog
        .confirm({
          title: "提示",
          message: "是否确认取消发布该条通知公告",
        })
        .then(() => {
          console.log("then");
          dsf.http
            .post("fn/notice/cancelPublish", {
              pks: item.dataValue.infoId || item.dataValue["A0001"],
              moduleId: item.dataValue.moduleId || item.dataValue["A0004"],
            })
            .then((retVal) => {
              if (retVal.data.code == 200) {
                dsf.layer.toast(retVal.data.message, true);
                self.onRefresh();
              }
            });
        })
        .catch(() => {
          console.log("cancell");
        });
    },

    // 会议未报名撤回
    "action-revoke"(item, index) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "是否确认撤回",
        })
        .then(() => {
          dsf.http
            .post("fn/meetingNotice/revoke", {
              pk: item.dataValue.infoId || item.dataValue["A0001"],
            })
            .then((retVal) => {
              if (retVal.data.code == 200) {
                dsf.layer.toast(retVal.data.message, true);
                this.onRefresh();
              }
            });
        })
        .catch(() => {
          console.log("cancell");
        });
    },
    // 会议未报名催办
    "action-meetingNoticeRemind"(item, index) {
      this.$refs.remindDialog.show(
        "催办",
        `您有会议【${item.dataValue["B0001"]}】需要报名，请您尽快报名`
      );
      this.$refs.remindDialog.submitFun = () => {
        dsf.http
          .post("/fn/meetingNotice/remind", {
            pk: item.dataValue["A0001"],
            content: this.$refs.remindDialog.message,
          })
          .then((res) => {
            if (res.data.code == 200) {
              this.$refs.remindDialog.close();
            }
            dsf.layer.toast(res.data.message, true);
          });
      };
    },
    // 沟通按钮
    async "action-goutong"(item, index) {
      let formPk = "",
        formType = "";
      formType = item.dataValue["fileType"];
      if (dsf.util.getClientName() == "mobileIM") {
        switch (formType) {
          case "ToDo":
            formPk = item.dataValue["info_id"];
            break;
          case "ToRead":
            formPk = item.dataValue["info_id"];
            break;
          default:
            break;
        }
        await new Promise((resolve, reject) => {
          dsf.http.get('fn/im/operation/getGroupInfo', {
            groupId: formPk,
            type: 'document'
          }).then(res => {
            if (res.data.type == "success" && res.data.data?.groupId) {
              let groupId = res.data.data.groupId;
              if (res.data.data.inGroup) {
                window.native && window.native.chatTo({
                  "conversationType": "GROUP",
                  "toId": groupId
                });
              } else {
                dsf.http.get('fn/im/operation/joinGroup', {
                  groupId: groupId,
                }).then(response => {
                  if ("success" === response.data.type) {
                    window.native && window.native.chatTo({
                      "conversationType": "GROUP",
                      "toId": groupId
                    });
                  } else {
                    dsf.layer.toast(response.data.message);
                  }
                })
              }
            } else {
              resolve()
            }
          })
        })
        dsf.http
          .post("fn/im/operation/getChatUsersByDocument", { pk: formPk })
          .then(res => {
            if (res.data.type == "success" && res.data.data) {
              let users = res.data.data.users || []
              let options = {
                title: "选择联系人",
                data: {
                  users: users,
                  //不限制选择数
                  isLimitCount: false,
                  //最大选择数
                  total: 9999,
                }
              }
              console.log(options)
              window.native &&
                window.native.showSelectUsers(options, function (selUsers) {
                  console.log(selUsers)
                  if (selUsers && selUsers.userIds) {
                    let chatUsers = selUsers.userIds.join(",");
                    let opts = {
                      groupId: formPk,
                      type: "document",
                      userIds: chatUsers
                    }
                    dsf.http.post('fn/im/operation/createChatGroup', opts).then(response => {
                      if ("success" === response.data.type && response.data.data) {
                        let groupId = response.data.data.groupId;
                        dsf.layer.toast("创建群成功");
                        window.native && window.native.chatTo({
                          "conversationType": "GROUP",
                          "toId": groupId
                        });
                      } else {
                        dsf.layer.toast(response.data.message);
                      }
                    })
                  }
                })
            }
          })
          .catch(err => {
            dsf.layer.toast("创建群聊失败")
          })
      } else if (dsf.config.ddSetting.isDing) {
        //|| 1 == 1
        switch (formType) {
          case "ToDo":
            formPk = item.dataValue["id"];
            break;
          case "ToRead":
            formPk = item.dataValue["info_id"];
            break;
          default:
            break;
        }
        let url = `fn/mobileToDo/getDingUsersByToDo?pk=${formPk}`;
        dsf.http.post(url).then(function (result) {
          let personSelectData = result.data.data.codeList;
          if (!personSelectData[0].children.length) {
            dsf.layer.toast("当前暂无钉钉人员");
            return;
          }
          console.log("钉钉人员", personSelectData);
          dd.biz.contact.createGroup({
            corpId: dsf.config.ddSetting.ddCoprId, //企业id，可选，若配置必须是用户所属企业的corpId，即实现在指定企业创建群聊天；
            users: [],
            onSuccess: function (result) {
              dd.biz.chat.toConversation({
                corpId: dsf.config.ddSetting.ddCoprId, ////企业id,必须是用户所属的企业的corpid
                chatId: result.id, //会话Id
                onSuccess: function () { },
                onFail: function () { },
              });
            },
            onFail: function (err) { },
          });
        });
        return;
        // } else if (window.wx) {
        //   wx.invoke('openChatWithMsg', {
        //     'userIds': 'e8f03da1-ca4a-4782-8aa5-a250c53e4e6e;b23828d4-c1e1-41fe-9e1c-4ad5e85a1296;490d70d2-8493-4fa8-9009-a191776a3cc1',    //参与会话的单位成员列表，格式为userid1;userid2;...，用分号隔开。
        //     'groupName': '讨论组',  // 非必填，会话名称。单聊时该参数传入空字符串''即可。
        //     'chatId': '', //新建会话时，chatId必须为空串
        //     'msg': {}
        //   }, function (res) {
        //     console.log(res)
        //     if (res.err_msg == 'openChatWithMsg:ok') {
        //       var chatId = res.chatId;
        //     }
        //   });
      }
    },
    // 访客登记[人民日报]
    visitorRegistration(item, index) {
      let user = store.loadSessionStore("user") || store.loadLocalStore("user");
      if (user) {
        let paras = {
          deptId: user.deptId,
          deptName: encodeURI(user.deptName),
          userId: user.user_id,
          userName: encodeURI(user.name),
          tel: user.tel,
        };
        console.log(paras);
        // paras = encodeURIComponent(JSON.stringify(paras));
        paras = encodeURIComponent(B64.encode(JSON.stringify(paras)));
        let url =
          dsf.url.getRootPath() +
          `dist/index.html#/PeopleDaily/Login?paras=${paras}`;
        // console.log(url);
        // url = encodeURIComponent(url);
        // self.imgSrc = dsf.url.getServerUrl(`fn/genrateQr?url=${url}`);
        // this.$router.push({
        //   name: "PeopleDailyVisitQRCode",
        //   params:{
        //     paras
        //   }
        // })
        import("dingtalk-jsapi").then((dd) => {
          dd.biz.util.share({
            type: 0, //分享类型，0:全部组件 默认；1:只能分享到钉钉；2:不能分享，只有刷新按钮
            url: url,
            title: "访客登记单",
            content: "访客登记单",
            image: "",
            onSuccess: function () {
              //onSuccess将在调起分享组件成功之后回调
              /**/
            },
            onFail: function (err) { },
          });
        });
      } else {
        dsf.layer.toast("未授权的访问，请重新登录！");
      }
    },
    //督办项目台账-催办
    "action-saveDBCB"(item, index) {
      console.log("action-saveDBCB");
      dsf.http
        .post("/ctrl/convert/moduleRuleConvert", {
          convertId: "2106161334381PC5vugnZwQyjNoMLzA",
          initDataSource: 1,
          srcInfo: item.dataValue.A0001 || item.dataValue["DBTZ.A0001"],
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.$router.push({
              path: `/commonForm/${res.data.data.moduleId}/${res.data.data.pk}`,
              query: {
                initDataSource: 1,
                sourcePk: item.dataValue.A0001 || item.dataValue["DBTZ.A0001"],
                relationId:
                  item.dataValue.A0001 || item.dataValue["DBTZ.A0001"],
                type: "催办",
              },
            });
          }
        });
    },
    //督办项目台账-延期
    "action-ApplyDelay"(item, index) {
      console.log("action-ApplyDelay");
      console.log(item.dataValue.A0001);
      dsf.http
        .post("/ctrl/convert/moduleRuleConvert", {
          convertId: "2106161334595i5kcF958pSy79wI6t1",
          initDataSource: 1,
          srcInfo: item.dataValue.A0001,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.$router.push({
              path: `/commonForm/${res.data.data.moduleId}/${res.data.data.pk}`,
              query: {
                initDataSource: 1,
                sourcePk: item.dataValue.A0001,
                relationId: item.dataValue.A0001,
                type: "延期",
              },
            });
          }
        });
    },
    //督办项目台账-办结
    "action-banJie"(item, index) {
      console.log("action-banJie");
      console.log(item.dataValue.A0001);
      dsf.http
        .post("/ctrl/convert/moduleRuleConvert", {
          convertId: "210616133423XmMnuQ7yvMILNoWX6NY",
          initDataSource: 1,
          srcInfo: item.dataValue.A0001,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.$router.push({
              path: `/commonForm/${res.data.data.moduleId}/${res.data.data.pk}`,
              query: {
                initDataSource: 1,
                sourcePk: item.dataValue.A0001,
                relationId: item.dataValue.A0001,
                type: "办结",
              },
            });
          }
        });
    },
    //督办项目台账-评价
    "action-pingJia"(item, index) {
      console.log("action-pingJia");
      dsf.http
        .post("/ctrl/convert/moduleRuleConvert", {
          convertId: "210723193202gK3WrhlYN0pG9bE77fE",
          initDataSource: 1,
          srcInfo: item.dataValue.A0001,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.$router.push({
              path: `/commonForm/${res.data.data.moduleId}/${res.data.data.pk}`,
              query: {
                initDataSource: 1,
                sourcePk: item.dataValue.A0001,
                relationId: item.dataValue.A0001,
                type: "评价",
              },
            });
          }
        });
    },
    //督办项目台账-增加承办
    "action-increaseChengBan"(item, index) {
      console.log("action-increaseChengBan");
      dsf.http
        .post("/ctrl/convert/moduleRuleConvert", {
          convertId: "220805171120LY8GOHEtSNDgVStRskk",
          initDataSource: 1,
          srcInfo: item.dataValue.A0001,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.$router.push({
              path: `/commonForm/${res.data.data.moduleId}/${res.data.data.pk}`,
              query: {
                initDataSource: 1,
                sourcePk: item.dataValue.A0001,
                relationId: item.dataValue.A0001,
                type: "增加承办",
              },
            });
          }
        });
    },
    //督办项目台账-变更计划
    "action-bianGengPlan"(item, index) {
      console.log("action-bianGengPlan");
      dsf.http
        .post("/ctrl/convert/moduleRuleConvert", {
          convertId: "220805171717HXpWekYcCtbO2GgbEWh",
          initDataSource: 1,
          srcInfo: item.dataValue.A0001,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.$router.push({
              path: `/commonForm/${res.data.data.moduleId}/${res.data.data.pk}`,
              query: {
                initDataSource: 1,
                sourcePk: item.dataValue.A0001,
                relationId: item.dataValue.A0001,
                type: "变更计划",
              },
            });
          }
        });
    },
    //督办项目台账-变更
    "action-dbtzChange"(item, index) {
      dsf.http
        .post("/ctrl/convert/moduleRuleConvert", {
          convertId: "210715193605z4SYYk4JHBUGNy3b7tF",
          initDataSource: 1,
          srcInfo: item.dataValue.A0001 || item.dataValue["DBTZ.A0001"],
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.$router.push({
              path: `/commonForm/${res.data.data.moduleId}/${res.data.data.pk}`,
              query: {
                initDataSource: 1,
                sourcePk: item.dataValue.A0001 || item.dataValue["DBTZ.A0001"],
                relationId:
                  item.dataValue.A0001 || item.dataValue["DBTZ.A0001"],
                type: "变更",
              },
            });
          }
        });
    },
    //督办项目台账-反馈情况
    "action-fanKuiQingKuang"(item, index) {
      console.log("action-fanKuiQingKuang");
      this.$router.push(`/superviseIdea?id=${item.dataValue.A0001}`);
    },
    //督办项目台账-接收情况
    "action-DBjieShouQingKuang"(item, index) {
      console.log("action-DBjieShouQingKuang");
      this.$router.push(`/superviseAccept?id=${item.dataValue.A0001}`);
    },
    createDay(item, index) {
      // 日报：moduleId=220407154218C862fYgw0KRsdwUgHgm，
      // formId=2204071542186aIi7XlzLAMun9S9SRi
      ///let _pk=metaData.parameters.pk;
      this.$router.push({
        path: "/commonForm/220407154218C862fYgw0KRsdwUgHgm",
      });
    },
    createWeek(item, index) {
      // 周报：moduleId=220408101939oHnveN4uZe0cIhPtEz1
      // formId=220408101939iVboR4FdWmyt9OZ8qfb
      this.$router.push({
        path: "/commonForm/220408101939oHnveN4uZe0cIhPtEz1",
      });
    },
    createMonth(item, index) {
      // 月报：moduleId=220408102004WCgZ3kAk3iIyuxfcAoe
      // formId=220408102004oixCo5Jx3F9mHwKVSbt
      this.$router.push({
        path: "/commonForm/220408102004WCgZ3kAk3iIyuxfcAoe",
      });
    },
    // 校历列表 杭州市委党校，取消发布
    "action-unRelease"(item, index) {
      var pk = item.dataValue["A0001"];
      var param = {
        pk: pk,
      };
      dsf.http
        .post("fn/calendar/unRelease", param)
        .then((res) => {
          const { message, type } = res.data;
          if (type === "success" && message == "1") {
            this.dsf.layer.toast("取消成功");
            setTimeout(() => {
              this.onRefresh && this.onRefresh();
            }, 1500);
          } else {
            this.dsf.layer.toast("已有部门填写了校历征集,不能取消发布!");
          }
        })
        .finally(() => { });
    },
    // 校历列表 杭州市委党校，发布
    "action-release"(item, index) {
      var pk = item.dataValue["A0001"];
      var flag = item["2108241539404N5u3scBD2B9v1lJWtg"]; //是否发布

      if (flag == "1") {
        this.dsf.layer.toast("该通知已发布!");
      } else {
        var param = {
          pk: pk,
        };

        dsf.http
          .post("fn/calendar/release", param)
          .then((res) => {
            const { message, type } = res.data;

            if (type === "success" && message == "1") {
              this.onRefresh && this.onRefresh();
              this.dsf.layer.toast("发布成功");
            } else {
              this.dsf.layer.toast("发布失败");
            }
          })
          .finally(() => { });
      }
    },
    // 校历列表 杭州市委党校，汇总
    "action-custom9"(item, index) {
      var pk = item.dataValue["A0001"];
      this.$router.push({
        path: "/commonList",
        query: {
          fileType: "xlzjckhz",
          pk: pk,
        },
      });
    },
    // 在imApp中一键建群
    "action-quickPull"(item, index) {
      let postdata = {
        pk: item.dataValue["A0001"],
        moduleId: item.dataValue["A0004"],
      };
      dsf.http.post(`fn/meeting/sendimgroup`, postdata).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          let data = res.data.data;
          if (data.groupId) {
            window.native &&
              window.native.chatTo({
                conversationType: "GROUP",
                toId: data.groupId,
              });
          }
        } else {
          dsf.layer.toast(res.data.message);
        }
      });
    },
    // 内蒙呼和浩特 远程发送列表增发
    "action-addHair"(item, index) {
      let temp = item.dataValue["FW.C-GW-FW-0202"];
      let orgType = "";
      if (temp) {
        switch (temp) {
          case "上行文":
            orgType = -1;
            break;
          case "平行文":
            orgType = 0;
            break;
          case "下行文":
            orgType = 1;
            break;
          default:
            break;
        }
      } else {
        orgType = 1;
      }
      this.extra = {
        multiple: true,
        tabs: [
          {
            action: `fn/orgManager/getOrgByType?orgType=${orgType}&checkedIds=`,
            name: "远程增发",
            subTabKey: "department",
          },
        ],
      };
      this.showPerson = true;
      this.selected = item;
      this.isTransfer = true;
      this.selectType = 1;
      this.getSelectUser = (data) => {
        let uids = "",
          unames = "",
          domains = "",
          printNums = "";
        data.forEach((ele) => {
          uids += ele.id + ",";
          unames += ele.name + ",";
          domains += ele.attrs.domain + ",";
          printNums += "999,";
        });
        let range = uids + "|" + unames + "|" + domains + "|" + printNums;

        let param = {
          infoId: item.dataValue["hhht_fw.A0001"],
          range: range,
          nrtypes: "",
          targetType: 3,
          orgType: orgType,
        };
        let loader = dsf.layer.loading("发送中");
        dsf.http.get("fn/proxySend/remotesend", param).then((res) => {
          dsf.layer.closeLoading(loader);
          if (res.data.code == 200) {
            dsf.layer.alert(
              {
                title: "温馨提示",
                message: "远程发送成功",
              },
              () => {
                this.showPerson = false;
              }
            );
          } else {
            dsf.layer.toast("远程发送失败");
          }
        });
      };
    },
    // 内蒙呼和浩特 远程发送签收情况
    "action-receiptStatus"(item, index) {
      this.$router.push({
        path: "/commonList/211203143107ZUz7KDyUJUWU5mCEn8J/190316115452TEcLfcQBFJozNasHYrm",
        query: {
          secQuery: JSON.stringify({
            info_id: item.dataValue["hhht_fw.A0001"],
          }),
        },
      });
    },
    // 内蒙呼和浩特 已发远程列表回收
    "action-batchRetriece"(item, index) {
      if (
        String(item.dataValue["C-R-SEND-0010.value"]) != "0" &&
        String(item.dataValue["C-R-SEND-0010.value"])
      ) {
        dsf.layer.toast("该文件非未签收，无法进行回收");
        return;
      }
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定要回收吗？",
        })
        .then(() => {
          dsf.http
            .post("fn/proxySend/retrieve", {
              sendIds: item.dataValue["A0001"],
            })
            .then((res) => {
              if (res.data.code == 200) {
                dsf.layer.alert(
                  {
                    title: "温馨提示",
                    message: "回收成功",
                  },
                  () => {
                    this.onRefresh && this.onRefresh();
                  }
                );
              } else {
                dsf.layer.toast("回收失败");
              }
            });
        })
        .catch(() => { });
    },
    "action-RemoteDocExchange.accept"(item, index) {
      /***
       * 公文交换 签收
       * 1、获取要转换的目标模块，多个时弹出选择框
       * 2、选择模块后，根据不同的交换类型，调用不同的接口
       * 3、调用接口后会返回原业务表单的pk，跳转到该表单
       ***/
      let self = this;
      doAccept();

      function doAccept() {
        let opts = {
          mode: item.dataValue["C-R-RCV-0088"],
          backFileId: item.dataValue["C-R-RCV-0056"],
          isfeedback: item.dataValue["C-R-RCV-0041"],
          moduleId: item.dataValue["A0004"],
        };
        let loadIndex = dsf.layer.loading();
        let pk = item.dataValue["A0001"];
        dsf.http
          .post("ctrl/remoteExchangeData/getReceiveTarget", { rcvRecordId: pk })
          .then((res) => {
            dsf.layer.closeLoading(loadIndex);
            if (res.data.type === "success") {
              if (res.data.data && res.data.data.length > 1) {
                self.$refs.ckDialog
                  .show(
                    res.data.data,
                    "请选择要转换的目标模块",
                    "ruleId",
                    "ruleName",
                    [],
                    false
                  )
                  .then((idArr) => {
                    let targetData = idArr[0];
                    accept(
                      pk,
                      targetData.id,
                      targetData.targetModuleId,
                      opts,
                      targetData.ruleId
                    );
                  })
                  .catch(() => {
                    dsf.layer.toast("请选择要转换的目标模块");
                  });
              } else {
                if (res.data.data && res.data.data.length > 0) {
                  let targetData = res.data.data[0];
                  // bug93825 添加参数后面openForm 需要这参数做标识 by:三七 20220418
                  opts.convertId = targetData.id; //类别转换id
                  opts.ruleId = targetData.ruleId; //规则id
                  opts.exchangeDocType = targetData.exchangeDocType;
                  accept(
                    pk,
                    targetData.id,
                    targetData.targetModuleId,
                    opts,
                    targetData.ruleId
                  );
                } else {
                  dsf.layer.toast("签收模块未配置");
                }
              }
            } else {
              dsf.layer.toast(res.data.message);
            }
          });
      }

      function accept(pk, convertId, targetModuleId, opts, ruleId) {
        opts = opts || {};
        let systemExchangeVendor = item.dataValue["C-R-RCV-0088"];
        if (systemExchangeVendor == "3") {
          // 类别转换
          convert({
            convertId: convertId,
            srcInfo: pk,
          }).then((res) => {
            if (res.data.code != 200) {
              dsf.layer.toast(res.data.message);
              return;
            } else {
              const { data } = res.data;
              acceptCallback(pk, data.pk, data.moduleId, data.moduleName, opts);
            }
          });
        } else {
          let url = "";
          let data = null;
          if (systemExchangeVendor == "5") {
            //新内部签收
            url = "ctrl/localInsideController/accept";
            data = {
              pk: pk,
              convertId: convertId,
              targetModuleId: targetModuleId,
              moduleId: opts.moduleId,
            };
          } else if (systemExchangeVendor == "6" || opts.mode == "6") {
            // 目前都走这个接口
            //交换中心统一接口
            url = "ctrl/exRemoteInterfaceController/acceptDoc";
            data = {
              pk: pk,
              convertId: convertId,
              targetModuleId: targetModuleId,
              isConvertToDo:
                opts.isConvertToDo == undefined ? "" : opts.isConvertToDo,
              moduleId: opts.moduleId,
              ruleId: ruleId,
            };
          } else {
            url = "ctrl/remoteExchange/acceptByRule";
            data = {
              pk: pk,
              convertId: convertId,
              targetModuleId: targetModuleId,
              isConvertToDo:
                opts.isConvertToDo === undefined ? false : opts.isConvertToDo,
              doSign: opts.doSign === undefined ? true : opts.doSign,
              ruleId: ruleId,
            };
          }
          let loadIndex = dsf.layer.loading();
          dsf.http
            .post(url, data)
            .then((res) => {
              dsf.layer.closeLoading(loadIndex);
              if (res.data.type == "success" && res.data.data) {
                let dt = res.data.data;
                let targetPk = dt.pk;
                let targetModuleName = dt.moduleName;
                onFinishAcceptCallback(
                  targetPk,
                  targetModuleId,
                  targetModuleName,
                  opts
                );
              } else {
                dsf.layer.toast(res.data.message);
              }
            })
            .catch((error) => {
              dsf.layer.toast("请求失败");
            });
        }
      }

      function acceptCallback(
        pk,
        targetPk,
        targetModuleId,
        targetModuleName,
        opts
      ) {
        let systemExchangeVendor = item.dataValue["C-R-RCV-0088"];
        opts = opts || {};
        let data = {
          sourcePk: pk,
          targetPk: targetPk,
          targetModuleId: targetModuleId,
          isConvertToDo:
            opts.isConvertToDo === undefined ? false : opts.isConvertToDo,
          doSign: opts.doSign === undefined ? true : opts.doSign,
        };
        var acceptCallbackUrl = "ctrl/remoteExchange/acceptCallback";
        //公司内部
        if (systemExchangeVendor == "3") {
          acceptCallbackUrl = "ctrl/hardDiskExchange/acceptCallback";
        }
        dsf.http.post(acceptCallbackUrl, data).then((res) => {
          if (res.data.type == "success") {
            onFinishAcceptCallback(
              targetPk,
              targetModuleId,
              targetModuleName,
              opts
            );
          } else {
            dsf.layer.toast(res.data.message);
          }
        });
      }

      function onFinishAcceptCallback(
        targetPk,
        targetModuleId,
        moduleName,
        opts
      ) {
        dsf.layer.toast("签收成功");
        self.onRefresh();
        // 暂不做跳转表单功能
        // self.$router.push(`/commonForm/${targetModuleId}/${targetPk}`)
      }
    },
    "action-exchangeSendBack"(item, index) {
      // 公文交换退回
      console.log(this.chooseItem);
      dsf.http
        .post("ctrl/remoteExchange/checkCanReject", {
          pk: item.dataValue["A0001"],
          moduleId: item.dataValue["A0004"],
          level: 3,
        })
        .then((res) => {
          if (res.data.type === "success") {
            this.componentName = "exchangeSendBack";
          } else {
            dsf.layer.toast(res.data.message);
          }
        });
    },
    // 单点通知补发--jf
    "action-MeetingNoticeBuFa"(item) {
      this.$router.push({
        path: `/commonForm/2307211034185H9YpnhGCGcs47M1bxn`,
        query: {
          fid: item.dataValue["A0001"],
        },
      });
    },
    // 单点通知通讯录--jf
    "action-AddressBooks"(item) {
      this.$router.push({
        path: "/commonList/210812175757ButsoHgEfB7zGXq5xW9/210812175755YL1w4jjIh65pNqDaSBh",
        query: {
          pk: item.dataValue["A0001"],
        },
      });
    },
    // 单点议题征询反馈--jf
    "action-remoteMeetingFeedBack"(item) {
      if (item.dataValue["C-R-RCV-0058.value"] == 1) {
        dsf.layer.toast("该数据是强制签收数据，请联系发件单位后操作!");
        return;
      }
      if (item.dataValue["A0003"]) {
        dsf.http
          .get("ctrl/remoteExchangeData/getInboxData", {
            pk: item.dataValue["A0003"],
          })
          .then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              let data = res.data.data;
              if (data.pid && data.pnid) {
                //本人有待办
                url = `/commonForm/${data.moduleId}/${item.dataValue["A0003"]
                  }?pk=${item.dataValue["A0003"]}&todoId=${data.pid + "_" + data.pnid
                  }`;
              } else {
                if (data.status == 1) {
                  //其他人有代办
                  url = `/commonForm/${data.moduleId}/${item.dataValue["A0003"]}?listId=RemoteMeetingList&mId=${data.moduleId}&method=openRemoteNoticeView&validateByList=1&pk=${item.dataValue["A0003"]}`;
                } else {
                  //无待办
                  url = `/commonForm/${data.moduleId}/${item.dataValue["A0003"]}?listId=20082313555438zby5yWOGo2grZPrkJ& method=meetingSignUpRcv&validateByList=1&pk=${dataValue["A0003"]}`;
                }
              }
              vueData.$router.push({
                path: url,
              });
            }
          });
      } else {
        dsf.layer.toast("未找到需要反馈的通知!");
      }
    },
    // 经信委我的通知列表跳人员信息按钮--jf
    "action-signUpUserInfo"(item) {
      this.$router.push({
        path: "/commonTabs/jxwpersonInfo",
      });
    },
    //取消办结节点
    "action-Flow.cancelEndNode"(item, index) {
      dsf.http
        .post("/fn/flow/cancelEndNode", {
          pk:
            item.dataValue.info_id ||
            item.dataValue["A0001"] ||
            item.dataValue.infoId,
        })
        .then(({ data }) => {
          dsf.layer.toast(
            data.message,
            true,
            () => this.onRefresh && this.onRefresh()
          );
        });
    },
    //跨节点撤回 成都一体化
    "action-recycle2"(item, index) {
      let self = this;
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认需要跨节点撤回吗?",
        })
        .then(() => {
          // 已办文件中的回收
          dsf.http
            .post("fn/flowListController/recycleReserveOpinion", {
              infoId: item.dataValue.id || item.dataValue.infoId,
            })
            .then((res) => {
              if (res.data.type == "success") {
                let sendData = {
                  sendType: "SR_SPECIAL",
                };
                sendData.pk = item.dataValue.infoId; //文件id
                sendData.isBackTrack = 1; //是否原路返回，传1
                sendData.pId = res.data.data.pid; //流程实例id
                sendData.pnId = res.data.data.pnid; // 指定当前节点，比如发起回送的开始节点
                sendData.nextNodeId = res.data.data.nodeId; //指定节点id
                sendData.opinionType = 4; //4退回
                sendData.opinionContent = ""; //回送原因
                sendData.disableAutoSend = -1;
                sendData.nextHandleType = "SR_BACKSEND"; //回送

                sendData.agencyType = 2; //回送原因
                sendData.determineUser = res.data.data.duserId;
                sendData.determineUserName = res.data.data.duserName; //回送
                sendData.receiverList = [];
                sendData.receiverList.push({
                  //接收人，比如收文拟稿人的信息
                  type: 1,
                  userId: res.data.data.userId,
                  userName: res.data.data.userName,
                  deptId: res.data.data.deptId,
                  deptName: res.data.data.deptName,
                });
                // sendData.receiverList = JSON.stringify(sendData.receiverList);
                if (res.data.data.count == 1) {
                  sendRequest(sendData);
                } else {
                  let loading = dsf.layer.loading();
                  dsf.http
                    .post("ctrl/flowListController/recycleNodeList", {
                      infoId: item.dataValue.infoId,
                      page: 1,
                      limit: 10,
                    })
                    .then((res) => {
                      dsf.layer.closeLoading(loading);

                      // if (res.data.type === "success") {
                      this.$refs.ckDialog
                        .show(
                          res.data.data,
                          "环节名称",
                          "id",
                          "nodeName",
                          [res.data.data[0].id],
                          false
                        )
                        .then((idArr) => {
                          let obj = res.data.data.find(
                            (item) => item.id == idArr[0]
                          );
                          sendData.pnId = obj.id;
                          sendData.determineUserName = obj.uname;
                          sendData.determineUser = obj.userId;
                          sendRequest(sendData);
                          // console.log("222",sendData);
                        });
                      // } else {
                      //     dsf.layer.toast(res.data.message);
                      // }
                    });
                }
                function sendRequest(sendData) {
                  dsf.http
                    .post("fn/flow/sendRequest", sendData, {
                      headers: {
                        "Content-Type": "application/json;charset=utf-8",
                      },
                    })
                    .then((retVal) => {
                      if (retVal.data.type == "success") {
                        dsf.layer.toast("回收成功");
                        self.onRefresh && self.onRefresh();
                      }
                    })
                    .catch(() => {
                      console.log("cancell");
                    });
                }
              }
            })

            .error((err) => {
              dsf.layer.closeLoading(loading);
              console.log(err);
            });
        });
    },
    //补发 成都一体化
    reissue(item) {
      let self=this;
      let moduleId = this.$route.query.moduleId;
      let pk = this.$route.query.pk;
      this.extra = {
        multiple: true,
        tabs: [
          {
            action: `fn/distribute/queryDeptsTree?moduleId=${moduleId}`,
            name: "选择部门",
            subTabKey: "department",
          },
        ],
      };
      this.showPerson = true;
      this.selected = item;
      this.isTransfer = true;
      this.selectType = 1;
      this.getSelectUser = (data) => {
        console.log("data",data);
        let depts=[];
        data.forEach(item=>{
          depts.push(item.id);
        })
        depts = depts.join(",");
        if (depts == null || depts == "") {
          dsf.layer.toast("未选择需要补发的部门！");
          return
        }
        console.log("depts",depts);
          let loading = dsf.layer.loading();
          dsf.http
            .post("ctrl/distribute/sendForward", { sendType: "send", pk, moduleId, depts })
            .then((res) => {
              dsf.layer.closeLoading(loading);
            self.showPerson = false;
              if (res.data.type === "success") {
                dsf.layer.toast("补发成功！", true, () => self.onRefresh && self.onRefresh());
              } else {
                dsf.layer.toast("补发失败！");
              }
            })
            .catch((err) => {
              dsf.layer.closeLoading(loading);
              console.log(err);
            });
      }
       
    },
    //回收 成都一体化
    recover() {
      let self=this;
      this.showCheck = true;
      // this.checkType = "radio";
      this.$eventBus.onDefaultListCheck(this, (data) => {
        console.log("data", data);
        // let info = data[0].dataValue.infoId;//info
        let infoArray = [];
        if (data.length==0) {
          dsf.layer.toast("请选择");
          return false;
        }
        data.forEach(item=>{
          if (item.dataValue.handleStatus!=1){
            dsf.layer.toast("文件已收回！");
            return false;
          }
          infoArray.push(item.dataValue['infoId']);
        })
        let pks = infoArray.join(",");
        console.log("pks",pks);
        this.$dialog
          .confirm({
            title: "提示",
            message: "确定要收回该文件吗?",
          })
          .then(() => {
            let loading = dsf.layer.loading();
            dsf.http
              .post("ctrl/distribute/recover", { pks })
              .then((res) => {
                dsf.layer.closeLoading(loading);

                if (res.data.type === "success") {
        self.showCheck = false;
                  dsf.layer.toast("收回成功！", true, () => self.onRefresh && self.onRefresh());
                } else {
                  dsf.layer.toast("收回失败！");
                }
              })
              .catch((err) => {
                dsf.layer.closeLoading(loading);
                console.log(err);
              });
          });
      })

      this.recover_checkClick = function (item) {
        if (!this.checkList.length) {
          this.checkList.push(item);
        } else {
          if (item.checked) {
            if (
              this.checkList[0].dataValue.moduleId == item.dataValue.moduleId &&
              this.checkList[0].dataValue.flowId == item.dataValue.flowId &&
              this.checkList[0].dataValue.nodeId == item.dataValue.nodeId
            ) {
              this.checkList.push(item);
            } else {
              item.checked = false;
              // dsf.layer.toast("选择的文件必须同一类型、同一流程和同一环节");
            }
          } else {
            let index = this.checkList.findIndex(
              (listitem) => item.dataValue.id === listitem.dataValue.id
            );
            if (index > -1) {
              this.checkList.splice(index, 1);
            }
          }
        }
      };
    },
    //催办 成都一体化
    reminders() {
      let self=this;
      this.showCheck = true;
      // this.checkType = "radio";
      this.$eventBus.onDefaultListCheck(this, (data) => {
        console.log("data", data);
        // let info = data[0].dataValue.infoId;//info
        // let infoArray = [];
        // let bt = data[0].dataValue.bt;
        if (data.length==0) {
          dsf.layer.toast("请选择");
          return false;
        }
        data.forEach(item=>{
          if (item.dataValue.handleStatus!=1){
            dsf.layer.toast("请选择在待办的文件催办！");
            return false;
          }
          // infoArray.push(item.dataValue['infoId']);
        })
        // let pks = infoArray.join(",");
        // console.log("pks",pks);
        self.componentName ="remindersDialog";
        self.chooseItem ={data};

        // self.$refs.remindersDialog
        //   .show("",,"")
        //   .then((result) => {
        //     console.log("result", result);
        //     // let loading = dsf.layer.loading();
        //     // dsf.http
        //     //   .post("ctrl/distribute/recover", { pks })
        //     //   .then((res) => {
        //     //     dsf.layer.closeLoading(loading);

        //     //     if (res.data.type === "success") {
        //     //     self.showCheck = false;
        //     //       dsf.layer.toast("收回成功！", true, () => self.onRefresh && self.onRefresh());
        //     //     } else {
        //     //       dsf.layer.toast("收回失败！");
        //     //     }
        //     //   })
        //     //   .catch((err) => {
        //     //     dsf.layer.closeLoading(loading);
        //     //     console.log(err);
        //     //   });
        //   });
      })

      this.recover_checkClick = function (item) {
        if (!this.checkList.length) {
          this.checkList.push(item);
        } else {
          if (item.checked) {
            if (
              this.checkList[0].dataValue.moduleId == item.dataValue.moduleId &&
              this.checkList[0].dataValue.flowId == item.dataValue.flowId &&
              this.checkList[0].dataValue.nodeId == item.dataValue.nodeId
            ) {
              this.checkList.push(item);
            } else {
              item.checked = false;
              // dsf.layer.toast("选择的文件必须同一类型、同一流程和同一环节");
            }
          } else {
            let index = this.checkList.findIndex(
              (listitem) => item.dataValue.id === listitem.dataValue.id
            );
            if (index > -1) {
              this.checkList.splice(index, 1);
            }
          }
        }
      };
    },
    //成都一体化（签收）
    // "action-convergencePlatFormAccept"(item, index) {
    //   var data = {
    //     "pk": item.dataValue["A0001.value"],
    //     "documentIdentifier": item.dataValue["A0002.value"],
    //     "operation": "Accepted",
    //     "orgCode": item.dataValue["240106212322dbjK3oHMMRWwAVXlHl5.value"],
    //     "lhfw": item.dataValue["240108192756ZD85WULZFnSzqZwLsfE.value"]
    //   }
    //   let loading = dsf.layer.loading();
    //   dsf.http
    //     .post("fn/convergencePlatformInside/feedback", data)
    //     .then((res) => {
    //       dsf.layer.closeLoading(loading);

    //       if (res.data.type === "success") {
    //         const result = res.data.data;
    //         dsf.layer.toast("签收成功", true, () => {
    //           if (result != null) {
    //             let pk = result.pk;
    //             let moduleId = result.moduleId;
    //             // let url = DSF.getURLRoot() + "ctrl/formControl/form?moduleId=" + moduleId + "&pk=" + pk;
    //             let url = `/commonForm/${moduleId}/${pk}`;
    //             if (result.pnid != null) {
    //               let agencyType = 0;
    //               url += "&todoId=" + result.pid + "_" + result.pnid + "&agencyType=" + agencyType + "&agencyUserId=" + result.uid + "&agencyUserName=" + result.uname;
    //             }
    //             this.$router.push({ path: url });
    //           }
    //         });

    //       } else {
    //         dsf.layer.toast(res.data.message);
    //       }
    //     })
    //     .catch((err) => {
    //       dsf.layer.closeLoading(loading);
    //       console.log(err);
    //     });
    // },
    //成都一体化（拒收）
    // "action-convergencePlatFormReject"(item, index) {
    //   var data = {
    //     "pk": item.dataValue["A0001.value"],
    //     "documentIdentifier": item.dataValue["A0002.value"],
    //     "operation": "Rejected",
    //     "orgCode": item.dataValue["240106212322dbjK3oHMMRWwAVXlHl5.value"]
    //   }
    //   let self=this;
    //   this.$refs.rejectDialog.showDialog = true;
    //   this.$refs.rejectDialog.title = "拒收";
    //   this.$refs.rejectDialog.placeholder = "请输入拒绝原因";
    //   this.$refs.rejectDialog.subTitle = "";
    //   this.$refs.rejectDialog.confirmCallBack = function (reason) {
    //     data.opinion = reason;
    //     let loading = dsf.layer.loading();
    //     dsf.http
    //       .post("fn/convergencePlatformInside/feedback", data)
    //       .then((res) => {
    //         dsf.layer.closeLoading(loading);

    //         if (res.data.type === "success") {
    //           dsf.layer.toast("拒收成功", true, () => {
    //             self.onRefresh && self.onRefresh();
    //           });

    //         } else {
    //           dsf.layer.toast(res.data.message);
    //         }
    //       })
    //       .catch((err) => {
    //         dsf.layer.closeLoading(loading);
    //         console.log(err);
    //       });
    //     }
    // },
  },
};
