//[电气] 我的会议室 会议变更
(function () {
  const exportObj = {};
  exportObj.initHandle = function(formData, formStruct, vueData) {
    if (formStruct.parameters.nodeId == 0) { // 拟稿节点
        dsf.http.post('/fn/meetingRoomOccupy/getData', {
            pk: vueData.$route.query.fid
        }).then(res => {
            console.log(res)
            if (res.data.code == '200' && res.data.data) {
                // let Obj = ['出席领导', '列席领导', '出席部门', '列席部门', '出席单位', '出席人员', '列席人员', '特邀人员', '外单位人员', '列席单位', '工作人员', '通知部门', '参会人员']
                // Obj.forEach(ele => {
                //     formStruct.controls.forEach(item => {
                //         if (item.label.indexOf(ele) != -1) {
                //             vueData.$set(item, 'show', 0)
                //         }
                //     })
                // })
                let data = res.data.data
                vueData.$set(vueData.formData.main, "c-meetingsqbg-001", { value: data.bt }) //原会议名称
                vueData.$set(vueData.formData.main, "B0001", { value: `${data.bt}变更`}) //标题

                vueData.$set(vueData.formData.main, "c-meetingsqbg-033", { value: data.bt }) //现会议名称

                vueData.$set(vueData.formData.main, "c-meetingsqbg-005", { value: data.hykssj }) //原会议开始时间
                vueData.$set(vueData.formData.main, "c-meetingsqbg-006", { value: data.hyjssj }) //原会议结束时间
                vueData.$set(vueData.formData.main, "c-meetingsqbg-003", { value: data.roomId, text: data.roomText }) //原会议室
                vueData.$set(vueData.formData.main, "c-meetingsqbg-004", { value: data.roomId, text: data.roomText }) //现会议室
                vueData.$set(vueData.formData.main, "c-meetingsqbg-007", { value: data.hykssj }) //现会议开始时间
                vueData.$set(vueData.formData.main, "c-meetingsqbg-008", { value: data.hyjssj }) //现会议结束时间
                vueData.$set(vueData.formData.main, "c-meetingsqbg-012", { value: data.hydz }) //原会议室其他
                vueData.$set(vueData.formData.main, "c-meetingsqbg-013", { value: data.hydz }) //现会议室其它

                vueData.$set(vueData.formData.main, "c-meetingsqbg-024", { value: data.hylx, text: data.hylxText }) //原会议类型
                vueData.$set(vueData.formData.main, "c-meetingsqbg-045", { value: data.hylx, text: data.hylxText }) //现会议类型

                vueData.$set(vueData.formData.main, "B0009", { value: data.ngr }) //原联系人
                vueData.$set(vueData.formData.main, "c-meetingsqbg-035", { value: data.ngr }) //现联系人

                vueData.$set(vueData.formData.main, "B0010", { value: data.ngbm }) //原联系部门
                vueData.$set(vueData.formData.main, "c-meetingsqbg-034", { value: data.ngbm }) //现联系部门

                vueData.$set(vueData.formData.main, "B0012", { value: data.ngdh }) //原联系电话
                vueData.$set(vueData.formData.main, "c-meetingsqbg-036", { value: data.ngdh }) //现联系电话

                vueData.$set(vueData.formData.main, "B0013", { value: data.ngrq }) //原预定日期
                vueData.$set(vueData.formData.main, "c-meetingsqbg-037", { value: data.ngrq }) //现预定日期

                vueData.$set(vueData.formData.main, "c-meetingsqbg-025", { text: data.hyxsText, value: data.hyxs }) //原会议形式
                vueData.$set(vueData.formData.main, "c-meetingsqbg-038", { text: data.hyxsText, value: data.hyxs }) //现会议形式

                vueData.$set(vueData.formData.main, "c-meetingsqbg-026", { text: data.sfxkText, value: data.sfxk }) //原是否需要席卡
                vueData.$set(vueData.formData.main, "c-meetingsqbg-039", { text: data.sfxkText, value: data.sfxk }) //现是否需要席卡

                vueData.$set(vueData.formData.main, "c-meetingsqbg-032", { value: data.tssj }) //原调试时间
                vueData.$set(vueData.formData.main, "c-meetingsqbg-040", { value: data.tssj }) //现调试时间

                vueData.$set(vueData.formData.main, "c-meetingsqbg-028", { value: data.hyyq }) //原会议要求
                vueData.$set(vueData.formData.main, "c-meetingsqbg-041", { value: data.hyyq }) //现会议要求

                vueData.$set(vueData.formData.main, "c-meetingsqbg-029", { schema: data.workUserSchema, text: data.workUserText, value: data.workUser }) //原工作人员
                  vueData.$set(vueData.formData.main, "c-meetingsqbg-043", { schema: data.workUserSchema, text: data.workUserText, value: data.workUser }) //现工作人员
                vueData.$set(vueData.formData.main, "c-meetingsqbg-030", { value: data.wdwUser }) //原外单位人员
                vueData.$set(vueData.formData.main, "c-meetingsqbg-044", { value: data.wdwUser }) //现外单位人员

                vueData.$set(vueData.formData.main, "c-meetingsqbg-031", { value: data.qtzy }) //原其他资源
                vueData.$set(vueData.formData.main, "c-meetingsqbg-042", { value: data.qtzy }) //原其他资源

 


                if (data.roomText != '其他') {
                    formStruct.controls.forEach(ele => {
                        if (ele.metaId == "c-meetingsqbg-012") vueData.$set(ele, "show", 0) //原会议室其他
                    });
                }

                vueData.$set(vueData.formData.main, "c-meetingsqbg-014", { value: data.leaderValue, schema: data.leaderSchema, text: data.leaderText }) //原出席领导
                vueData.$set(vueData.formData.main, "c-meetingsqbg-015", { value: data.leaderValue, schema: data.leaderSchema, text: data.leaderText }) //现出席领导
                vueData.$set(vueData.formData.main, "c-meetingsqbg-016", { value: data.tzbmValue, schema: data.tzbmSchema, text: data.tzbmText }) //原通知部门
                 vueData.$set(vueData.formData.main, "c-meetingsqbg-017", { value: data.tzbmValue, schema: data.tzbmSchema, text: data.tzbmText }) //现通知部门
                vueData.$set(vueData.formData.main, "c-meetingsqbg-009", { value: data.chrValue, schema: data.chrSchema, text: data.chrText }) //原参会人员
                 vueData.$set(vueData.formData.main, "c-meetingsqbg-010", { value: data.chrValue, schema: data.chrSchema, text: data.chrText }) //现参会人员
                vueData.$set(vueData.formData.main, "c-meetingsqbg-018", { value: data.lxbmValue, schema: data.lxbmSchema, text: data.lxbmText }) //原列席部门
                vueData.$set(vueData.formData.main, "c-meetingsqbg-019", { value: data.lxbmValue, schema: data.lxbmSchema, text: data.lxbmText }) //现列席部门


            } else {
                console.log(res.data.message)
            }
        })
    }
}

// 保存之前
exportObj.saveFilter = function(formData, formStruct, vueData, action) {
        return new Promise(function(resolve, reject) {
            // 点击取消时
            if (formData.main['c-meetingsqbg-002'].value == "2") {
                vueData.$set(vueData.formData.main, "c-meetingsqbg-007", { value: "" }) //现会议开始时间
                vueData.$set(vueData.formData.main, "c-meetingsqbg-008", { value: "" }) //现会议结束时间
                vueData.$set(vueData.formData.main, "c-meetingsqbg-013", { value: "" })
                vueData.$set(vueData.formData.main, "c-meetingsqbg-004", { value: "", text: "" }) //现会议室
            }
            resolve()
        })

    }
    // 确认
exportObj.sureChange = function(formData, formStruct, vueData) {
    console.log(formData, formStruct, vueData);
    // 判断日期
    var flog = true;
    let newTime = formData.main['c-meetingsqbg-008'].value
    let oldTime = formData.main['c-meetingsqbg-007'].value
    let newTime1 = formData.main['c-meetingsqbg-006'].value
    let oldTime1 = formData.main['c-meetingsqbg-005'].value
    if (newTime == '' || oldTime == "" || newTime1 == '' || oldTime1 == "") {
        dsf.layer.toast("会议时间为空！")
        return
    }
    let newStartTime = new Date(newTime).getTime()
    let oldEndTime = new Date(oldTime).getTime()
    let newStartTime1 = new Date(newTime1).getTime()
    let oldEndTime1 = new Date(oldTime1).getTime()
    if ((newStartTime <= oldEndTime) || (newStartTime1 <= oldEndTime1)) {
        flog = false;
        dsf.layer.toast("会议结束时间小于开始时间，请重新选择会议时间！")
    }

    if (flog) {
        let bglx = formData.main['c-meetingsqbg-002'].value;
        dsf.layer.confirm({
            message: "确认" + (bglx == 1 ? "变更" : "取消") + "会议吗?",
            confirmButtonText: '确认'
        }, () => {
            // 如果是变更
            if (bglx == 1) {
                let fid = vueData.$route.query.fid || formData.main['A0031'].value;
                let hys = formData.main['c-meetingsqbg-004'].value || formData.main['c-meetingsqbg-003'].value;
                if (hys != "QT") {
                    let sdate = formData.main['c-meetingsqbg-007'].value || formData.main['c-meetingsqbg-005'].value;
                    let edate = formData.main['c-meetingsqbg-008'].value || formData.main['c-meetingsqbg-006'].value;
                    let flag = true;
                    dsf.http.post("ctrl/meetingRoomOccupy/checkRoomOccupy", { pk: fid, hys: hys, sdate: sdate, edate: edate })
                        .then((result) => {
                            if (result.data.type == 'success') {
                                console.log(result);

                                vueData.saveNoTip(function(result) {
                                    dsf.http.post(`ctrl/meetingNotice/changeMeetingInfo`, { pk: vueData.formParams.pk }).then((result) => {
                                        if (result.data.type == "success") {
                                            dsf.layer.toast("操作成功！");
                                            vueData.$eventBus.refresh(vueData);
                                        } else {
                                            dsf.layer.toast("操作失败");
                                        }
                                    })
                                })
                            } else {
                                dsf.layer.toast(result.data.message)
                            }
                        })
                }
            }

        })
    }


}

  window.spJS = exportObj;
})()
