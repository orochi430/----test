import dsf from "../../../common";
//归土 发文
const exportObj = {};
let nodeId = "";
let nodeName = "";

exportObj.handle = function(formData, formStruct) {

}
exportObj.initHandle = function(formData, formStruct, vueData) {
    nodeId = vueData.formMeta.parameters.nodeId;
    nodeName = vueData.formMeta.parameters.nodeName
        //初始化表单数据
    if (!vueData.$route.params.pk) {
        var whlx = vueData.$route.params.pk;
        formData.main["C-FW-0022"].value = whlx;

        var masterId = vueData.$route.query.MASTERID;
        formData.main["B0035"].value = masterId;
    }

    //规范性文件选择否
    vueData.$bus.on("inputRadio", function(busObj) {
        if (busObj.metaData.metaId == "C-FW-0033" && busObj.value != 1) {
            var msg = "<span style='font-size: 16px;'>根据《上海市行政规范性文件制定和备案规定》（市政府令第26号），";
            msg = msg + "“规范性文件是指除政府规章外，行政机关依据法定职权";
            msg = msg + "或者法律、法规、规章的授权制定的涉及公民、法人或者其他组织";
            msg = msg + "权利、义务，具有普遍约束力，在一定期限内可以反复适用的文件。”";
            msg = msg + "规范性文件可在对外实施行政行为时引作依据。";
            msg = msg + "请确认发文是否具有以上定义所述特征。";
            msg = msg + "如有，请重新选择本属性为‘是’，并按照规范性文件制备相";
            msg = msg + "关规定办理。";
            msg = msg + "如继续选择“否”，所制定文件将不作为规范性文件管理，不";
            msg = msg + "得在对外实施审批管理时引作法规依据，复议、诉讼时也不具有法规效力。";
            msg = msg + "</span>";
            vueData.$dialog.alert({
                title: '提示',
                message: msg,
            }).then(() => {
                // dialogclosed = true
            });
            formData.main["C-FW-0037"].text = ""
            formData.main["C-FW-0037"].value = "5"
        }
    })

    vueData.$bus.on("checkVal", function(busObj) {
        //公文类别
        if (busObj.metaData.metaId == "C-FW-0060") {
            if (busObj.value) {
                dsf.http.post("fn/fws/getFwDept", {
                        "id": busObj.value
                    })
                    .then(({
                        data
                    }) => {
                        console.log(data);
                        let result = data
                        if (result.type == "success") {
                            vueData.$set(vueData.formData.main, "B0025", {
                                value: result.data[0].fieldStringShow
                            })
                            vueData.$set(vueData.formData.main, "C-FW-0048", {
                                value: result.data[0].fieldStringValue
                            })
                        }
                    })
            } else {
                vueData.$set(vueData.formData.main, "B0055", {
                    value: ""
                })
            }
        }
        //公开信息
        if (busObj.metaData.metaId == "C-FW-0037") {
            if (busObj.value == 1) { //公开
                vueData.$set(vueData.formData.main, "C-FW-0038", {
                    value: 1
                })
            } else if (busObj.value == 5) { //不予公开
                vueData.$set(vueData.formData.main, "C-FW-0038", {
                    value: 5
                })
            } else if (busObj.value == 10) { //其他

            }
        }

    })

    //通过AJAX初始化表单数据
    dsf.http.post("fn/fws/showyj", {
            "pk": vueData.$route.params.pk
        })
        .then(({
            data
        }) => {
            console.log(data);
            // if(data.html){
            //     $("#wbYPC2EHQTF6fqm4").html('<label class="ds_label" handler="context" for="riKOjBW13hvpGP4Z">意见：</label>');
            //     $('#VjzUj3KvlvX9WWdv').append('<div id="fwyj" style="padding-top: 40px;font-size: 18px;font-weight: 540;line-height: initial;">'+result.html+'</div>');
            //     $("#LBwtMO7XsaW7gc3c").hide();
            //     $("#KL2xhzmL8xb5lAvJ").hide();
            //     $("#ng1PRW9WC5D1wnn0").hide();
            // }
        })


    //指定编号节点生成文号
    if ('BN2qS5svAdAx6zS' == nodeId || nodeName == '编号定稿用印' || nodeName == '登记局定稿用印') {
        selectWhIdByFlAndDeptId(formData, formStruct, vueData);
    }


}



//删除后同时删除市政府公文备案记录
exportObj.afterLogicDeleteXForm = function(formData, formStruct, vueData) {
    dsf.http.post("fn/gwInterface/delete", {
            "pk": vueData.$route.params.pk
        })
        .then(({
            data
        }) => {})

}


//拖拽签章

exportObj.tzqz = function(formData, formStruct, vueData) {
    var infoId = formData.main["A0001"].value;
    var md = formData.main["A0004"].value;
    var fwdw = formData.main["B0025"].value;

    var fwdwCode = formData.main["C-FW-0048"].value;
    var readAllUrl = "ctrl/fws/redCheck";

    dsf.http.post(readAllUrl, {
            "id": infoId
        })
        .then(({
            data
        }) => {
            let result = data
            if (result.message == "操作成功") {

                dsf.http.post("ctrl/fws/dragElectronicSignature", {
                        "id": infoId,
                        "qzType": "3",
                        "moduleId": md,
                        "fwDw": fwdw,
                        "fwdwCode": fwdwCode
                    })
                    .then(({
                        data
                    }) => {
                        let result = data
                        if (result.message == "操作成功") {
                            var url = result.data[0].url1;
                            var documentId = result.data[0].documentId;

                            dsf.http.post("ctrl/fws/updateDocumentId", {
                                    "id": infoId,
                                    "documentId": documentId,
                                    "type": "1"
                                })
                                .then(({
                                    data
                                }) => {
                                    let result = data
                                        //把对应的签章 id 存进 表中
                                    if (result.message == "操作成功") {

                                    }
                                })
                        } else {
                            dsf.layer.toast("签章页面接口获取失败，请联系管理员！");
                        }
                    })

            } else {
                dsf.layer.toast("请先套红文件，后续才能签章！");
            }
        })
}


//电子签章
exportObj.dzqz = function(formData, formStruct, vueData) {
    var infoId = formData.main["A0001"].value;
    var md = formData.main["A0004"].value;
    var fwdw = formData.main["B0025"].value;

    var data = {
        "id": infoId
    };
    var fwdwCode = formData.main["C-FW-0048"].value;
    var readAllUrl = "ctrl/fws/redCheck";
    dsf.http.post(readAllUrl, data)
        .then(({
            data
        }) => {
            let result = data
            if (result.message == "操作成功") {
                if (fwdw == "上海市纪委监委驻市规划资源局纪检监察组" || fwdw == "上海市第三次全国国土调查领导小组办公室") {
                    //这两个是联合发文 盖两个章  （其中一个章要选择）
                    var url = DSF.getURLRoot() + "ctrl/list/2006111731398kCJcYzdgiqPxdLmO52?moduleId=200611171318kA8pZVVjrdGydSt4UFT&md=" + md;

                } else if (fwdw == "上海市人民政府" && fwdwCode == "10397，10722") {

                    let loadingIndex = dsf.layer.loading("电子签章中,请稍等...")
                        //特殊 不用选章 直接盖两个固定的章
                    dsf.http.post("ctrl/fws/electronicSignature", {
                            "id": infoId,
                            "qzType": "2",
                            "fwDw": fwdw,
                            "fwdwCode": fwdwCode
                        })
                        .then(({
                            data
                        }) => {
                            let result = data
                            if (result.message == "操作成功") {
                                dsf.layer.toast("签章成功");
                            } else {
                                dsf.layer.toast("签章失败，请联系管理员！");
                            }
                        })
                } else if (fwdw == "上海市规划委员会" || fwdw == "中国共产主义青年团上海市规划和自然资源局委员会" || fwdw == "中共上海市自然资源确权登记局支部委员会") {
                    //单位没有章的，目前不盖章
                    dsf.layer.toast("没有对应的签章，暂不盖章！");
                } else {
                    let loadingIndex = dsf.layer.loading("电子签章中,请稍等...")
                        //盖一个固定的章
                    dsf.http.post("ctrl/fws/electronicSignature", {
                            "id": infoId,
                            "qzType": "3",
                            "fwDw": fwdw,
                            "fwdwCode": fwdwCode
                        })
                        .then(({
                            data
                        }) => {
                            let result = data
                            if (result.message == "操作成功") {
                                dsf.layer.toast("签章成功");
                            } else {
                                dsf.layer.toast("签章失败，请联系管理员！");
                            }
                        })
                }
            } else {
                dsf.layer.toast("请先套红文件，后续才能签章！");
            }
        })
}


/**
 * 打印挂载
 */
exportObj.custom2 = function(formData, formStruct, vueData) {
    var pk = formStruct.parameters.pk;
    var nodeId = formStruct.parameters.nodeId;
    var flowId = formStruct.parameters.flowId;
    openPrintWordFile('191017155313FhhVNpnRSCB9hg4KOWP', pk, '', flowId, nodeId, '', formData, formStruct, vueData);
}

function openPrintWordFile(moduleId, pk, templateId, flowId, nodeId, watermark, formData, formStruct, vueData) {
    debugger;
    var templateType = 1;
    if (moduleId) {
        if (templateId) { //后台打印
            var url = "ctrl/office/generatorFile?fileType=100&templateId=" + templateId + "&moduleId=191017155313FhhVNpnRSCB9hg4KOWP&pk=" + pk;
            dsf.http.post(url, {})
                .then(({
                    data
                }) => {
                    let loadingIndex = dsf.layer.loading("打印单下载中,请稍等...")
                    dsf.http.post("ctrl/fws/leaderAutograph", {
                            "moduleId": moduleId,
                            "pk": pk
                        })
                        .then(({
                            data
                        }) => {
                            let result = data;
                            //领导签名
                            if (result.message == "操作成功") {
                                //下载打印单
                                dsf.http.post("ctrl/menhu/gjcs/gnr", {
                                        infoId: pk,
                                        attValue: 100
                                    })
                                    .then(({
                                        data
                                    }) => {
                                        let result = data;
                                        if (result.type === "success") {
                                            if (result.data.list <= 0) {
                                                dsf.layer.toast("没有打印单下载!");
                                            } else {
                                                //暂时不知道怎么弄


                                            }
                                        }
                                    })
                            } else {
                                dsf.layer.toast(result.message);
                            }
                        })


                })
        } else {
            //多个模板选择
            var bllx = formData.main["C-LW-0004"].value; //收文办理类型
            dsf.http.post("ctrl/office/template", {
                    "moduleId": moduleId,
                    "templateType": templateType,
                    "pk": pk,
                    "bllx": bllx
                })
                .then(({
                    data
                }) => {
                    let result = data;
                    if ("success" == result.type) {
                        if (result.data) {
                            var count = parseInt(result.data.count, 10);
                            //count = 2 ;
                            if (count == 1) {
                                var tpl = result.data["templateId"];
                                if (tpl) {
                                    openPrintWordFile(moduleId, pk, tpl, flowId, nodeId, watermark, formData, formStruct, vueData);
                                }
                            } else if (count > 1) {
                                //选择模板
                                // top.openTemplateWindow = window;
                                // top.openTemplateOpts = {
                                //   callback: function (id) {

                                //     openPrintWordFile(moduleId, pk, id, flowId, nodeId, watermark, formData, formStruct, vueData);

                                //     top.layer.close(top.openTemplateIndex);

                                //     delete top.openTemplateWindow;
                                //     delete top.openTemplateOpts;
                                //     delete top.openTemplateIndex;
                                //   }
                                // };

                                // top.openTemplateIndex = top.layer.open({
                                //   type: 2,
                                //   area: ['800px', '546px'],
                                //   fixed: false,
                                //   title: '',
                                //   content: DSF.getURLRoot() + 'ctrl/office/templateListView?moduleId=' + moduleId + "&templateType=" + templateType + "&pk=" + pk,
                                //   cancel: function (index) {

                                //     top.layer.close(top.openTemplateIndex);

                                //     delete top.openTemplateWindow;
                                //     delete top.openTemplateOpts;
                                //     delete top.openTemplateIndex;
                                //   }
                                // });
                            } else {
                                dsf.layer.toast("缺少打印模板!");
                            }
                        }
                    }

                })
        }
    } else {
        dsf.layer.toast("缺少打印模板!");
    }
};

exportObj.saveFilter = function(formData, formStruct, vueData) {
    return new Promise(function(resolve, reject) {
        //检验大规划是否已经取走当前号了，避免重复
        let wh = formData.main["B0003"];
        let data = {
            ruleId: wh["ruleid"],
            whNum: wh["num"]
        }
        let flag = false;
        dsf.http.post("fn/fws/checkWh", data)
            .then(({
                data
            }) => {
                console.log(data);
                let result = data;
                if (result.type == "success" && result.data == 0) {
                    flag = true;
                }

                if (flag == false) {
                    reject('文号已经被取走了，需要重新获取文号');
                    selectWhIdByFlAndDeptId(formData, formStruct, vueData);
                    return; //如果重复了就不保存
                }
                //检验完毕
                var isok = true;
                var mess = "";
                var isGk = formData.main["C-FW-0037"].text;
                if ("主动公开信息" == isGk) {
                    var id = formData.main["C-FW-0035"].value;
                    if (!id) {
                        mess += "选择主动公开信息时，政策法规类别必选。";
                        isok = false;
                    }
                }
                var hyjy = formData.main["C-GW-FW-0202"].text;
                if ("会议纪要" == hyjy) {
                    var id = formData.main["B0056"].value;
                    if (!id) {
                        mess += "公文文种 选择会议纪要时，会议纪要子项必选。";
                        isok = false;
                    }
                }
                var deptId = formData.main["B0051"].value;
                if (deptId == 10729) {
                    var id = formData.main["C-FW-0022"].value;
                    if (id) {
                        var sendDeptId = formData.main["C-GW-FW-0103"].value;
                        if (!sendDeptId) {
                            mess = "选择科研管理发文时，消息发送范围必选。";
                            isok = false;
                        }
                    }
                }
                if (mess) {
                    reject(mess);
                }
                resolve()
            })
    })
}


/**
 *  生成指定文号
 * @param whId  文号id
 * @returns {string}
 */
async function loadWh(whId, text, formData, formStruct, vueData) {
    var iswh = formData.main["B0003"].value;
    if (iswh) {
        return "";
    }
    var id = vueData.formMeta.parameters.pk;
    var time = new Date();
    var date = dsf.date.format(time, "yyyy-dd-dd hh:ii:ss");
    var wh = '';
    var wh1 = '';
    var wh2 = '';
    var wh3 = '';
    var wh4 = '';
    var wh5 = '';

    await dsf.http.post("fn/filecode/template", {
            pk: id,
            ruleId: whId
        })
        .then(({
            data
        }) => {
            let result = data
            if (result.type == "success") {
                //  沪国土调查办〔
                wh1 = result.data.selects[0].data;
                //  〕
                wh3 = result.data.selects[2].data;
                //  号
                // 不为空，文号  ^2020^1
                var leg = result.data.selects.length;
                if (leg > 4) {
                    wh5 = result.data.selects[4].data;
                }
            }
            var data = {
                pk: id,
                ruleId: whId,
                date: date,
                moduleId: formData.main["A0004"].value,
                metaId: "B0003",
                allowRecycle: "1"
            };
            return dsf.http.post("fn/filecode/data", data)
        })
        .then(({
            data
        }) => {
            let result = data
            if (result.type == "success") {
                // year
                wh2 = result.data[0].data[0].showValue;
                // num
                wh4 = result.data[1].data[0].showValue
            }
        })

    if (wh1) {
        wh = wh1 + wh2 + wh3 + wh4 + wh5;
    } else {
        wh = wh2 + "-" + wh4;
    }

    if (text) {
        wh = wh.replace("deptName", text); // 办公室     沪规划资源deptName〔$Y4$〕$n1$号   替换  沪规划资源deptName  text 是部门的简称
    }

    if (wh.match("^") && text == undefined) {
        wh = wh.split('^').join('');
    }

    vueData.$set(vueData.formData.main, "B0003", {
            text: whId,
            value: wh
        })
        //   var whControl = $("div[x-metadata=B0003]");
        //   whControl.find("div[class='x-data']")[0].innerText = wh;
        //   whControl.find("input[class='x-ruleid']")[0].value = whId;
        //   whControl.find("input[class='x-oldruleid']")[0].value = whId;
        //   whControl.find("input[class='x-value']")[0].value = wh;
        //   whControl.find("input[class='x-period']")[0].value = wh2;
        //   whControl.find("input[class='x-num']")[0].value = wh4;
        //   whControl.find("input[class='x-tnum']")[0].value = wh4;
        //   whControl.find("input[class='x-order']")[0].value = wh2 + wh4;
}

/***
 * 1 根据分类id   2  根据部门id   3 根据文种名称
 * 后续需求更新：如果是规范性文件：直接使用沪规划自然资源规的文号
 */
function selectWhIdByFlAndDeptId(formData, formStruct, vueData) {
    var type = 1;
    var gfwj = formData.main["C-FW-0033"].value;
    var flId = formData.main["C-FW-0060"].value;
    if (gfwj == 1) {
        type = 4
    } else if (flId == 110 || flId == 120) {
        type = 2;
    }
    var deptId = formData.main["A0012"].value;
    var wz = formData.main["C-GW-FW-0202"].text;
    if ('情况专报' == wz) {
        type = 3;
    }
    if ('会议纪要' == wz) {
        wz = formData.main["B0056"].text;
        type = 3;
    }

    dsf.http.post("fn/fws/getFwWh", {
            type: type,
            flId: flId,
            deptId: deptId,
            wz: wz
        })
        .then(({
            data
        }) => {
            let result = data;
            if (result.type == "success") {
                var whid = result.message;
                if (whid) {
                    if (whid) {
                        if (type == 2) {
                            var text = whid.split("-");
                            loadWh(text[0], text[1], formData, formStruct, vueData);
                        } else {
                            loadWh(whid, null, formData, formStruct, vueData);
                        }
                    } else {
                        loadWh(whid, null, formData, formStruct, vueData);
                    }
                }
            }
        })


}
export default exportObj;