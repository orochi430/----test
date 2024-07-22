
export default {
    // 成都一体化  已阅
    toEndNotConfirm(routerParam, metaData, formData, VueData, refs, saveAfter) {
        console.log("nowButtonParameters", VueData.nowButtonParameters);
        const { defaultOpinion } = VueData.nowButtonParameters;
        const { pk, pnId } = metaData.parameters;
        let batchEndNode = function (postData) {
            dsf.http
                .post("fn/flow/batchEndNode", {
                    todoData: JSON.stringify(postData),
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        if (defaultOpinion != null && defaultOpinion.trim() != "") {
                            dsf.http
                                .post("fn/flowListController/setOpinion", {
                                    pk,
                                    pnId,
                                    content: defaultOpinion,
                                })
                                .then((resu) => {

                                    if (resu.data.type === "success") {
                                        dsf.layer.toast("操作成功", true, () => VueData.backSucces());
                                    } else {
                                        dsf.layer.toast(resu.data.message);
                                    }
                                })
                                .catch((err) => {

                                    console.log(err);
                                });
                        } else {
                            dsf.layer.toast("操作成功", true, () => VueData.backSucces());
                        }
                    } else {
                        dsf.layer.toast("办结失败", false);
                    }
                }).catch((err) => {
                    console.log(err);
                });
        };
        let data = {
            pk,
            pnid: pnId,
            isNeedOpinion: -1
        }
        VueData.buttonHandle.save(routerParam, metaData, formData, VueData, refs, function () {
            // console.log("xxx", data);
            let param = [];
            param.push(data);
            batchEndNode(param);
        });
    },
    // 成都一体化  圈阅
    sendDefaultOpinion(routerParam, metaData, formData, VueData, refs, saveAfter) {
        const { pk, pnId } = metaData.parameters;
        const { defaultOpinion } = VueData.nowButtonParameters;
        // dsf.config.commonFlow.openOpinionPopupBeforeSend = false;
        VueData.buttonHandle.send(routerParam, metaData, formData, VueData, refs, function () {
            if (defaultOpinion != null && defaultOpinion.trim() != "") {
                dsf.http
                    .post("fn/flowListController/setOpinion", {
                        pk,
                        pnId,
                        content: defaultOpinion,
                    })
                    .then((resu) => {
                        // dsf.config.commonFlow.openOpinionPopupBeforeSend = true;
                        if (resu.data.type === "success") {
                            // dsf.layer.toast("办结成功", true, () => VueData.backSucces());
                        } else {
                            dsf.layer.toast(resu.data.message);
                        }
                    })
                    .catch((err) => {
                        // dsf.config.commonFlow.openOpinionPopupBeforeSend = true;
                        console.log(err);
                    });
            }
        });

    },
    // 成都一体化  议题入库
    topicIssue(routerParam, metaData, formData, VueData, refs, saveAfter) {
        const { pk } = metaData.parameters;
        const { nextLineId } = VueData.nowButtonParameters;
        // dsf.config.commonFlow.openOpinionPopupBeforeSend = false;
        dsf.http
            .post("fn/meetingTopic/topicIssue", {
                pk,
            })
            .then((res) => {
                // dsf.config.commonFlow.openOpinionPopupBeforeSend = true;

                if (res.data.type == "success") {
                    if (!VueData.alreadyWriteOpintion) {
                        dsf.layer.toast("入库成功", false, () => {
                            VueData.$set(formData.main, "C-MEETING-TOPIC-0021", {
                                value: "2",
                                text: "已入库",
                            });
                            if (nextLineId) {
                                VueData.buttonHandle.send(routerParam, metaData, formData, VueData, refs);
                            }

                        })
                    }
                } else {
                    dsf.layer.toast("入库失败", false);

                }
            }).catch((err) => {
                console.log(err);

                // dsf.config.commonFlow.openOpinionPopupBeforeSend = true;
            });

    },
    // 成都一体化  流转情况
    chengDu_showFlow(routerParam, metaData, formData, VueData, refs, saveAfter) {
        const { pk } = metaData.parameters;
        const { showFlowUrl } = VueData.nowButtonParameters;
        let url = showFlowUrl;
        url += "?infoId=" + pk;
        url = dsf.url.getServerUrl(`fn/redirect/relative?x-auth-token=${dsf.util.loadSessionStore("loginToken")}&redirectUrl=`) + url
        VueData.componentName = "TabsMovingDialog";
        VueData.formParams.url = url;
        // VueData.$router.push({
        //   path: "/iframe",
        //   query: {
        //     url,
        //     title: "流转情况"
        //   },
        // });
    },
    // 成都一体化  驳回
    distributeSendBackRefuse(routerParam, metaData, formData, VueData, refs, saveAfter) {
        const { pk, flowId, pId, pnId } = VueData.$route.query;
        const { closeNum } = VueData.nowButtonParameters;
        if (flowId == "" || pId == "" || pnId == "" || pk == "") {
            dsf.layer.toast("流程信息不完整，无法驳回");
            return;
        }

        let data = {
            pk: pk,
            flowId: flowId,
            pid: pId,
            pnid: pnId
        }
        console.log("reason", formData.main["240106185415QcDHKj7ELLrV7zMkypL"]);
        if (formData.main["240106185415QcDHKj7ELLrV7zMkypL"].value == "") {
            dsf.layer.toast("请填写审批意见！");
            return
        }
        data.backReason = formData.main["240106185415QcDHKj7ELLrV7zMkypL"].value;
        // VueData.$refs["rejectDialog"]
        // .show(VueData.nowButton.name)
        // .then((reason) => {
        // data.backReason = reason;
        // console.log("reason", reason);
        let loading = dsf.layer.loading();
        dsf.http
            .post("ctrl/distribute/sendBackRefuse", data)
            .then((res) => {
                dsf.layer.closeLoading(loading);

                if (res.data.type === "success") {
                    dsf.layer.toast("驳回成功！", true, () => VueData.backSucces(closeNum));
                } else {
                    dsf.layer.toast("驳回失败！");
                }
            })
            .catch((err) => {
                dsf.layer.closeLoading(loading);
                console.log(err);
            });
        // });

    },
    // 成都一体化  通过
    distributeSendBackPass(routerParam, metaData, formData, VueData, refs, saveAfter) {
        const { pk } = VueData.$route.query;
        let loading = dsf.layer.loading();
        const { closeNum } = VueData.nowButtonParameters;
        dsf.http
            .post("ctrl/distribute/sendBackPass", {
                pk
            })
            .then((res) => {
                dsf.layer.closeLoading(loading);

                if (res.data.type === "success") {
                    dsf.layer.toast("审批成功", true, () => VueData.backSucces(closeNum));
                } else {
                    dsf.layer.toast("审批成功");
                }
            })
            .catch((err) => {
                dsf.layer.closeLoading(loading);
                console.log(err);
            });
    },
    // 成都一体化  分送记录
    distributeRecord(routerParam, metaData, formData, VueData, refs, saveAfter) {
        const { pk, moduleId } = metaData.parameters;
        VueData.$router.push({
            path: `/commonTabs/distributionRecords?pk=${pk}&moduleId=${moduleId}&isFooterBtnShow=1&title=分送记录`
        })
    },
    // 成都一体化  子流程分送记录
    distributeSubRecord(routerParam, metaData, formData, VueData, refs, saveAfter) {
        const { pk, moduleId } = metaData.parameters;
        VueData.$router.push({
            path: `/commonList?fileType=subTingnei&pk=${pk}&moduleId=${moduleId}&title=分送记录`
        })
    },
    // 成都一体化  子流程分送退回记录	
    distributeSendBackSubRecord(routerParam, metaData, formData, VueData, refs, saveAfter) {
        const { pk, moduleId } = metaData.parameters;
        VueData.$router.push({
            // path: `/commonTabs/distributionForwardRecords?pk=${pk}&moduleId=${moduleId}&isFooterBtnShow=1`
            path: `/commonList?fileType=Tzhuanfa&pk=${pk}&moduleId=${moduleId}&title=分送回退记录`
        })
    },
    // 成都一体化  分送退回记录
    distributeSendbackRecord(routerParam, metaData, formData, VueData, refs, saveAfter) {
        const { pk, moduleId } = metaData.parameters;
        VueData.$router.push({
            path: `/commonTabs/distributionBackRecords?pk=${pk}&moduleId=${moduleId}&title=分送回退记录`
        })
    },
    //成都一体化（分送退回）
    distributeSendback(routerParam, metaData, formData, VueData, refs, saveAfter) {
        const { pk, flowId, pId, pnId } = metaData.parameters;


        if (flowId == "" || pId == "" || pnId == "" || pk == "") {
            dsf.layer.toast("流程信息不完整，无法退回");
            return false;
        }

        let data = {
            pk: pk,
            flowId: flowId,
            pid: pId,
            pnid: pnId
        }
        let isSeventh = false;
        dsf.http
            .post("ctrl/distribute/getDistributeRecordList", {
                pk: formData.main["A0003"].value,
                handleType: 1,
                infoId: pk
            })
            .then((res) => {
                if (res.data.count > 0) {
                    isSeventh = true;
                }
                VueData.$refs["rejectDialog"]
                    .show("退回", isSeventh ? "" : true)
                    .then((reason) => {
                        var remark = reason;
                        data.backReason = remark;
                        //判断退回原因是否必填

                        console.log("reason", reason);
                        let loading = dsf.layer.loading();
                        dsf.http
                            .post("ctrl/distribute/sendBack", data)
                            .then((res) => {
                                dsf.layer.closeLoading(loading);

                                if (res.data.type === "success") {
                                    dsf.layer.toast("退回成功！", true, () => VueData.backSucces());
                                } else {
                                    dsf.layer.toast("退回失败！");
                                }
                            })
                            .catch((err) => {
                                dsf.layer.closeLoading(loading);
                                console.log(err);
                            });

                    })



            }).catch((err) => {
                dsf.layer.closeLoading(loading);
                console.log(err);
            });

    },
    //成都一体化（退回审批）
    openReturnApprovalForm(routerParam, metaData, formData, VueData, refs, saveAfter) {
        const { pk, flowId, pId, pnId } = metaData.parameters;
        VueData.$router.push({
            path: `/commonForm/240106185335dKPmYEgDVNmKj6xMZDk?pnId=${pnId}&pId=${pId}&flowId=${flowId}&pk=${pk}`
        })
    },
    //成都一体化（签收）
    convergencePlatFormAccept(routerParam, metaData, formData, VueData, refs, saveAfter) {
        var data = {
            "pk": formData.main["A0001"].value,
            "documentIdentifier": formData.main["A0002"].value,
            "operation": "Accepted",
            "orgCode": formData.main["240106212322dbjK3oHMMRWwAVXlHl5"].value,
            "lhfw": formData.main["240108192756ZD85WULZFnSzqZwLsfE"].value
        }
        let loading = dsf.layer.loading();
        dsf.http
            .post("fn/convergencePlatformInside/feedback", data)
            .then((res) => {
                dsf.layer.closeLoading(loading);

                if (res.data.type === "success") {
                    const result = res.data.data;
                    dsf.layer.toast("签收成功", true, () => {
                        if (result != null) {
                            let pk = result.pk;
                            let moduleId = result.moduleId;
                            // let url = DSF.getURLRoot() + "ctrl/formControl/form?moduleId=" + moduleId + "&pk=" + pk;
                            let url = `/commonForm/${moduleId}/${pk}`;
                            if (result.pnid != null) {
                                let agencyType = 0;
                                url += "?todoId=" + result.pid + "_" + result.pnid + "&agencyType=" + agencyType + "&agencyUserId=" + result.uid + "&agencyUserName=" + result.uname;
                            }
                            VueData.$router.push({ path: url });
                        }
                    });

                } else {
                    dsf.layer.toast(res.data.message);
                }
            })
            .catch((err) => {
                dsf.layer.closeLoading(loading);
                console.log(err);
            });
    },
    //成都一体化（拒收）
    convergencePlatFormReject(routerParam, metaData, formData, VueData, refs, saveAfter) {
        var data = {
            "pk": formData.main["A0001"].value,
            "documentIdentifier": formData.main["A0002"].value,
            "operation": "Rejected",
            "orgCode": formData.main["240106212322dbjK3oHMMRWwAVXlHl5"].value
        }
        VueData.$refs.rejectDialog.showDialog = true;
        VueData.$refs.rejectDialog.title = "拒收";
        VueData.$refs.rejectDialog.placeholder = "请输入拒绝原因";
        VueData.$refs.rejectDialog.subTitle = "";
        VueData.$refs.rejectDialog.confirmCallBack = function (reason) {
            data.opinion = reason;
            let loading = dsf.layer.loading();
            dsf.http
                .post("fn/convergencePlatformInside/feedback", data)
                .then((res) => {
                    dsf.layer.closeLoading(loading);

                    if (res.data.type === "success") {
                        dsf.layer.toast("拒收成功", true, () => {
                            VueData.backSucces()
                        });

                    } else {
                        dsf.layer.toast(res.data.message);
                    }
                })
                .catch((err) => {
                    dsf.layer.closeLoading(loading);
                    console.log(err);
                });
        }
    },
    //成都一体化（撤回）
    recycle(routerParam, metaData, formData, VueData, refs) {
        let dataParams = {
            pk: VueData.pk,
            pid: metaData.parameters.pid || metaData.parameters.pId,
            bt: formData.main["B0001"].value
        };
        dsf.layer.confirm({
            message: "<div style='font-size: 18px;'>确定回收该文件吗？</div>",
            confirmButtonText: "确定",
        }, function () {
            dsf.http.post("ctrl/flow/checkRecycle", dataParams).then(function ({ data }) {
                if (data.type == "success") {
                    if (data.message == "1") {
                        dsf.http.post("ctrl/flow/recycle", data.data).then(function (result) {
                            dsf.http.post("fn/remind2512/batchRecycle", {
                                pk: metaData.parameters.pk,
                                pnIds: data.data.pnId,
                                remindModes: ""
                            })
                            //分送撤回，撤回成功后更新分送退回记录状态
                            dsf.http.post("fn/distribute/recycleSendBackApply", {
                                pk: metaData.parameters.pk,
                            })
                            if (result.data.type == "success") {
                                dsf.layer.toast(result.data.message, () => {
                                    VueData.backSucces()
                                })
                            } else {
                                dsf.layer.toast(result.data.message);
                            }
                        });

                    } else {
                        dsf.http.post("ctrl/flow/recycleListData", { pk: VueData.pk }).then(function ({ data }) {
                            if (data.count == 0) {
                                dsf.layer.toast("暂无回收节点！")
                            } else {
                                VueData.formParams.superRecycleData = data.data
                                VueData.formParams.isSuperRecycle = false
                                VueData.componentName = "sxSuperRecycle"
                            }
                        })
                    }
                } else {
                    dsf.layer.toast(data.message);
                }
            });
            // let recyle = {
            //     pk: metaData.parameters.pk,
            //     flowId: metaData.parameters.flowId,
            //     pId: metaData.parameters.pId,
            //     pnId: metaData.parameters.pnId,
            //     fPnId: metaData.parameters.fPnId,
            //     bt: formData.main["B0001"].value,
            //     userId: dsf.util.loadSessionStore('user').user_id,
            //     nodeName: metaData.parameters.nodeName
            // }
            // dsf.http.post("fn/flow/batchRecycle", JSON.stringify(recyle)).then(res => {
            //     if (res.type == "success") {
            //         dsf.http.post("fn/distribute/recycleSendBackApply", { pk: metaData.parameters.pk })
            //         dsf.http.post("fn/remind2512/batchRecycle", {
            //             pk: metaData.parameters.pk,
            //             pnIds: metaData.parameters.pnId,
            //             remindModes: ""
            //         })
            //         dsf.layer.toast(res.data.message, () => {
            //             VueData.backSucces()
            //         })
            //     }
            //     else
            //         dsf.layer.toast(result.data.message);
            // })
        });
    },
    //成都一体化（补发）
    "xform.todoExSend"(routerParam, metaData, formData, VueData, refs, saveAfter) {
        var todoId = VueData.$route.query.todoId || (metaData.parameters.pId + "_" + metaData.parameters.pnId);
        if (!todoId || todoId == "") {
            dsf.layer.toast("非待办文件，不能增发");
        }
        VueData.buttonHandle.send(routerParam, metaData, formData, VueData, refs);
        // sendType: 'SR_EXSEND',

    },
    //转派处室
    transpondDept(routerParam, metaData, formData, VueData, refs, saveAfter) {
        let sourceId = formData.main["A0003"].value;
        let pk = VueData.formParams.pk;
        let moduleId = VueData.formParams.moduleId;
        let { customUserSelectScope } = VueData.nowButtonParameters;
        let rootObject = "2";
        if (customUserSelectScope && customUserSelectScope != "") {
            rootObject = "6";
        }

        VueData.showPerson = true;
        VueData.extra = {
            multiple: false,
            tabs: [
                {
                    action: "fn/user/select/data?types=department&rootObject=" + rootObject + "&action=custom_user_select_scope&async=true&customUserSelectScope=" + customUserSelectScope,
                    name: "自定义用户选择范围",
                    subTabKey: "department"
                }
            ],
        };

        // 重写选人确认后的getSelectUser方法，调用接口
        VueData.getSelectUser = function (data) {
            let uids = "", unames = ""

            data.forEach((ele, i) => {
                i == 0 ? (uids += ele.id) : (uids += "," + ele.id);
                i == 0 ? (unames += ele.name) : (unames += "," + ele.name);
            });

            if (uids == "") {
                dsf.layer.toast("未选择部门");
                return;
            }
            let loader = dsf.layer.loading("转派中");
            let postdata = {
                "pk": pk,
                "moduleId": moduleId,
                "sourceId": sourceId,
                "dept": uids,
                "deptName": unames
            };
            dsf.http.get("fn/convergencePlatformInside/transpondDept", postdata).then((res) => {
                console.log(res);
                dsf.layer.closeLoading(loader);
                if (res.data.type == "success") {
                    VueData.showPerson = false;
                    dsf.layer.toast("转派成功", true, () => {
                        VueData.backSucces();
                    });
                } else {
                    dsf.layer.toast(res.data.message);
                }
            });

        };
    },
    // 成都一体化（分送情况）
    distributeSituationTab(routerParam, metaData, formData, VueData, refs, saveAfter) {
        const { pk, moduleId } = metaData.parameters;
        VueData.$router.push({
            path: `/commonTabs/distributeSituationTab?pk=${pk}&moduleId=${moduleId}&title=分送情况`
        })
    },
    //成都一体化(取消办结)
    cancelBJ(routerParam, metaData, formData, VueData, refs, saveAfter) {
        dsf.layer.confirm(
            {
                message: "<div style='font-size: 18px;'>确认取消办结并将文件回收到最后的处理人手中？</div>",
                confirmButtonText: "确认",
            },
            () => {
                let loader = dsf.layer.loading("取消办结中")
                dsf.http.post("fn/flowEvent/cancelEndInstance", { pk: metaData.parameters.pk }).then(res => {
                    dsf.layer.closeLoading(loader);
                    if (res.data.type == "success") {
                        dsf.layer.toast("取消办结成功", true, () => {
                            VueData.backSucces();
                        });
                    }
                    else
                        dsf.layer.toast(res.data.message);
                    
                })
            }
        );
    }
}
