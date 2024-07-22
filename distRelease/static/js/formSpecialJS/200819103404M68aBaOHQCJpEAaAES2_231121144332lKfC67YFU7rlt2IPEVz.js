(function () {
    const exportObj = {};
    exportObj.initHandle = function(formData, formStruct, vueData) {
        if (vueData.formData.main['opinionView']&&!vueData.formData.main['opinionView'].value && formStruct.parameters.nodeId != '2o3sbXeCYmEMkA8') {
            let Arr = ['opinionView', 'opinionFiles']
            formStruct.controls.forEach((item) => {
                Arr.includes(item.metaId) ? vueData.$set(item, "show", 0) : "";
            });
        }
        
        if (!vueData.formData.main['c-meetingsqbg-012'].value) {
            formStruct.controls.forEach((item) => {
                item.metaId == 'c-meetingsqbg-012' ? vueData.$set(item, "show", 0) : "";
            });
        }
        if (formStruct.parameters.nodeId == '11') {
            vueData.$set(vueData.formData.main, "c-meetingsqbg-024", {value: 2, text: "不提醒"});
            if (!vueData.formData.main['c-meetingsqbg-013'].value) {
                formStruct.controls.forEach((item) => {
                    item.metaId == 'c-meetingsqbg-013' ? vueData.$set(item, "show", 0) : "";
                    if (item.metaId == 'c-meetingsqbg-013') {
                        console.log(item.show);
                        vueData.$set(item, "show", 0)
                    }
                });
            }
    
        }
        if (formStruct.parameters.nodeId == 0 || formStruct.parameters.nodeId == 11) {
            // 拟稿节点
            dsf.http
                .post("/fn/meetingRoomOccupy/getData", {
                    pk: vueData.$route.query.fid,
                })
                .then((res) => {
                    console.log(res);
                    if (res.data.code == "200" && res.data.data) {
                        let data = res.data.data;
                        vueData.$set(vueData.formData.main, "c-meetingsqbg-001", {
                            value: data.bt,
                        }); //原会议开始时间
                        vueData.$set(vueData.formData.main, "c-meetingsqbg-005", {
                            value: data.hykssj,
                        }); //原会议开始时间
                        vueData.$set(vueData.formData.main, "c-meetingsqbg-006", {
                            value: data.hyjssj,
                        }); //原会议结束时间
                        vueData.$set(vueData.formData.main, "c-meetingsqbg-003", {
                            value: data.roomId,
                            text: data.roomText,
                        }); //原会议室
                        vueData.$set(vueData.formData.main, "c-meetingsqbg-004", {
                            value: data.roomId,
                            text: data.roomText,
                        }); //现会议室
                        vueData.$set(vueData.formData.main, "c-meetingsqbg-007", {
                            value: data.hykssj,
                        }); //现会议开始时间
                        vueData.$set(vueData.formData.main, "c-meetingsqbg-008", {
                            value: data.hyjssj,
                        }); //现会议结束时间
                        vueData.$set(vueData.formData.main, "c-meetingsqbg-012", {
                            value: data.hydz,
                        }); //原会议室其他
                        vueData.$set(vueData.formData.main, "c-meetingsqbg-013", {
                            value: data.hydz,
                        }); //现会议室其它
                        vueData.$set(vueData.formData.main, "B0001", { value: data.bt }); //标题
                        vueData.$set(vueData.formData.main, "c-meetingsqbg-002", {
                            value: "1",
                            text: "修改",
                        }); //变更类型
                        vueData.$set(vueData.formData.main, "c-meetingsqbg-024", {
                            value: "1",
                            text: "提醒参会人",
                        }); //消息提醒类型
                        data.resourceArr.forEach((item) => {
                            console.log(item);
                            for (let key in formData.multinfos) {
                                vueData.$refs.formTab[0].$refs[key][0].$refs.subform
                                    .addCard(false)
                                    .then((newData) => {
                                        //会议使用资源-资源类别
                                        subForm(newData, item);
                                    });
                            }
                        });
                        vueData.$set(vueData.formData.main, "A0031", {
                            value: vueData.$route.query.fid,
                        }); //id赋值
                        if (formStruct.parameters.nodeId == '11') {
                            if (!vueData.formData.main['c-meetingsqbg-013'].value) {
                                formStruct.controls.forEach((item) => {
                                    item.metaId == 'c-meetingsqbg-013' ? vueData.$set(item, "show", 0) : "";
                                });
                            }
                        }
                    } else {
                        console.log(res.data.message);
                    }
                });
            console.log(formData);
            dsf.http
                .post("fn/meetingRoom/getHysSqzyLimitAmount", {
                    roomId: formData.main,
                })
                .then((res) => {
                    console.log(res);
                });
        }
        let sourData = []; //会议资源最大数量限制
        vueData.$bus.on("subFormTreeSelect", function(data) {
            console.log(data);
            data.selectArr.forEach((item, index) => {
                console.log(item);
                // 判重
                if (data.subFormId == "220726170139N9GeFDJFnyFoRhSCVyu") {
                    if (
                        formData.multinfos["220726170139N9GeFDJFnyFoRhSCVyu"].rows.find(
                            (row) => row["C-MEETING-RESOURCE-004"].value == item.id
                        )
                    ) {
                        console.log("有重复");
                        return;
                    }
                    if (vueData.$refs.formTab[0]) {
                        vueData.$refs.formTab[0].$refs[
                                "220726170139N9GeFDJFnyFoRhSCVyu"
                            ][0].$refs.subform
                            .addCard(false)
                            .then((newData) => {
                                //会议使用资源-资源类别
                                vueData.$set(newData, "C-MEETING-RESOURCE-001", {
                                    value: item.attrs.resourceTypeText,
                                });
                                //会议使用资源-资源名称
                                vueData.$set(newData, "C-MEETING-RESOURCE-003", {
                                    value: item.name,
                                });
                                //会议使用资源-资源分类id
                                vueData.$set(newData, "C-MEETING-RESOURCE-002", {
                                    value: item.attrs.resourceTypeId,
                                });
                                //会议使用资源-资源id
                                vueData.$set(newData, "C-MEETING-RESOURCE-004", {
                                    value: item.id,
                                });
                                //会议使用资源-资源名称
                                vueData.$set(newData, "C-MEETING-RESOURCE-006", {
                                    value: item.attrs.isWriteNum,
                                    text: item.attrs.isWriteNum > 0 ? "是" : "否",
                                });
                                if (item.attrs.isWriteNum < 0) {
                                    newData.structControl.find(
                                        (item) => item.metaId == "C-MEETING-RESOURCE-005"
                                    ).show = false;
                                }
                            });
                    }
                }
            });
        });
        //会议室选择时，清空资源
        vueData.$bus.on("checkVal", function(data) {
            console.log(data);
            if (data.value != formData.main["c-meetingsqbg-003"].value) {
                vueData.$set(
                    formData.multinfos["220726170139N9GeFDJFnyFoRhSCVyu"],
                    "rows", []
                );
            }
            if (data.metaData.metaId == "c-meetingsqbg-004") {
                dsf.http
                    .post("/fn/meetingRoom/getMeetingRoomDefaultResource", {
                        roomId: data.value,
                    })
                    .then((res) => {
                        console.log(res);
                        if (res && res.data && res.data.data && res.data.data.dzValue) {
                            vueData.$set(formData.main, "c-meetingsqbg-013", {
                                value: res.data.data.dzValue,
                            }); //会议室地址
                        }
                    });
            }
        });
        
    
        function subForm(newData, item) {
            //子表渲染
            vueData.$set(newData, "C-MEETING-RESOURCE-001", {
                value: item.resourceTypeMc,
            });
            //会议使用资源-资源名称
            vueData.$set(newData, "C-MEETING-RESOURCE-003", {
                value: item.resourceMc,
            });
            //会议使用资源-资源分类id
            vueData.$set(newData, "C-MEETING-RESOURCE-002", {
                value: item.resourceTypeId,
            });
            //会议使用资源-资源id
            vueData.$set(newData, "C-MEETING-RESOURCE-004", {
                value: item.resourceId,
            });
            //会议使用资源-资源id
            vueData.$set(newData, "C-MEETING-RESOURCE-005", {
                value: item.resourceNum,
            });
            //会议使用资源-资源名称
            vueData.$set(newData, "C-MEETING-RESOURCE-006", {
                value: item.isWriteNum,
                text: item.isWriteNum > 0 ? "是" : "否",
            });
        }

        vueData.$bus.on("getUser", function (data) {
            console.log(data);
            if (data.metaData.metaId == "c-meetingsqbg-004") {
              vueData.$bus.emit(
                "codeSelect",
                `&startTime=${formData.main["c-meetingsqbg-007"].value}&endTime=${formData.main["c-meetingsqbg-008"].value}`
              );
            }
          });
    };
    
    // 保存之前
    exportObj.saveFilter = function(formData, formStruct, vueData, action) {
        return new Promise(function(resolve, reject) {
            // 点击取消时
            if (formData.main["c-meetingsqbg-002"].value == "2") {
                vueData.$set(vueData.formData.main, "c-meetingsqbg-007", { value: "" }); //现会议开始时间
                vueData.$set(vueData.formData.main, "c-meetingsqbg-008", { value: "" }); //现会议结束时间
                vueData.$set(vueData.formData.main, "c-meetingsqbg-013", { value: "" });
                vueData.$set(vueData.formData.main, "c-meetingsqbg-004", {
                    value: "",
                    text: "",
                }); //现会议室
            }
            resolve();
        });
    };
    // 确认
    exportObj.sureChange = function(formData, formStruct, vueData) {
        console.log(formData, formStruct, vueData);
        // 判断日期
        var flog = true;
        let newTime = formData.main["c-meetingsqbg-008"].value;
        let oldTime = formData.main["c-meetingsqbg-007"].value;
        let newTime1 = formData.main["c-meetingsqbg-006"].value;
        let oldTime1 = formData.main["c-meetingsqbg-005"].value;
        if (newTime == "" || oldTime == "" || newTime1 == "" || oldTime1 == "") {
            dsf.layer.toast("会议时间为空！");
            return;
        }
        let newStartTime = new Date(newTime).getTime();
        let oldEndTime = new Date(oldTime).getTime();
        let newStartTime1 = new Date(newTime1).getTime();
        let oldEndTime1 = new Date(oldTime1).getTime();
        if (newStartTime <= oldEndTime || newStartTime1 <= oldEndTime1) {
            flog = false;
            dsf.layer.toast("会议结束时间小于开始时间，请重新选择会议时间！");
        }
    
        if (flog) {
            let bglx = formData.main["c-meetingsqbg-002"].value;
            dsf.layer.confirm({
                    message: "确认" + (bglx == 1 ? "变更" : "取消") + "会议吗?",
                    confirmButtonText: "确认",
                },
                () => {
                    // 如果是变更
                    if (bglx == 1) {
                        let fid = vueData.$route.query.fid || formData.main["A0031"].value;
                        let hys =
                            formData.main["c-meetingsqbg-004"].value ||
                            formData.main["c-meetingsqbg-003"].value;
                        if (hys != "QT") {
                            let sdate =
                                formData.main["c-meetingsqbg-007"].value ||
                                formData.main["c-meetingsqbg-005"].value;
                            let edate =
                                formData.main["c-meetingsqbg-008"].value ||
                                formData.main["c-meetingsqbg-006"].value;
                            let flag = true;
                            dsf.http
                                .post("ctrl/meetingRoomOccupy/checkRoomOccupy", {
                                    pk: fid,
                                    hys: hys,
                                    sdate: sdate,
                                    edate: edate,
                                })
                                .then((result) => {
                                    if (result.data.type == "success") {
                                        console.log(result);
    
                                        vueData.saveNoTip(function(result) {
                                            dsf.http
                                                .post(`ctrl/meetingNotice/changeMeetingInfo`, {
                                                    pk: vueData.formParams.pk,
                                                })
                                                .then((result) => {
                                                    if (result.data.type == "success") {
                                                        dsf.layer.toast("操作成功！");
                                                        vueData.$eventBus.refresh(vueData);
                                                    } else {
                                                        dsf.layer.toast("操作失败");
                                                    }
                                                });
                                        });
                                    } else {
                                        debugger;
                                        dsf.layer.toast(result.data.message);
                                    }
                                });
                        }
                    }
                }
            );
        }
    };
        window.spJS = exportObj;
    })();
    