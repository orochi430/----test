// 局内会议
const exportObj = {};

exportObj.initHandle = function(formData, formStruct, vueData) {
    // 会议类型字段（c-meetingsq-075）在移动端要求不可编辑
    formStruct.controls.find(
        (item) => item.metaId == "c-meetingsq-075"
    ).privilege.editable = false;

    function initControl(formData, formStruct, vueData) {
        let roomId = formData.main["c-meetingsq-009"].value;
        if ("210521142010SF5Ab0z3RsoOzg6ERpO" == roomId) {
            formStruct.controls.find((element) => element.metaId == "B0038").show = 1;
        } else {
            formStruct.controls.find((element) => element.metaId == "B0038").show = 0;
        }
    }
    initControl(formData, formStruct, vueData);
    //当会议地点 c-meetingsq-009 为其他会场时，显示其他会场的输入；
    vueData.$bus.on("checkVal", function(busObj) {
        if (busObj.metaData.metaId == "c-meetingsq-009") {
            initControl(formData, formStruct, vueData);
        }
    });
};
exportObj.saveFilter = function(formData, formStruct, vueData) {
    function filterTime(time) {
        var str = time.replace(/-/g, "/");
        return str;
    }
    return new Promise(function(resolve, reject) {
        try {
            let startTime =
                Date.parse(filterTime(formData.main["c-meetingsq-007"].value)) || "";
            let endTime =
                Date.parse(filterTime(formData.main["c-meetingsq-008"].value)) || "";
            let roomId = formData.main["c-meetingsq-009"].value;
            var bt = formData.main["c-meetingsq-005"].value;
            vueData.$set(formData.main, "B0001", { value: bt });

            if (startTime && endTime) {
                if (endTime <= startTime) {
                    reject("结束时间必须大于开始时间");
                }
            }
            //当会议地点 c-meetingsq-009 为其他会场时，显示其他会场的输入；
            if ("210521142010SF5Ab0z3RsoOzg6ERpO" == roomId) {
                let otherRoomVal = formData.main["B0038"].value;
                if ("" == otherRoomVal) {
                    reject("请输入其他会场");
                }
                dsf.http.post("fn/meetingapi/meeting/checkRoom", {
                        room: roomId,
                        startTime: formData.main["c-meetingsq-007"].value,
                        endTime: formData.main["c-meetingsq-008"].value,
                        pk: formStruct.parameters.pk,
                    }).then(({ data }) => {
                        if (!data.type == "success") {
                            reject(data.message);
                        }
                    });
            }
            dsf.http.post("fn/huiYiController/jyhys", { hys: formData.main["B0038"].value }).then(({ data }) => {
                if (!data) {
                    reject("其他会场和会议有冲突,请重新填写!");
                }
            });
            resolve();
        } catch (error) {
            resolve();
        }
    });
};

// exportObj.custom1=function(formData, metaData,  vueData) {
//     var flag = MeetingApi.checkDate(3);

//     //按钮操作: 发布会议通知
//     function publishMeetingNotice2(formData, metaData,vueData,convertId){
//         let _pk=metaData.parameters.pk;
//         vueData.saveNoTip(function (result) {
//             dsf.http.post("fn/meetingapi/meeting/publishMeetingNotice", {pk:_pk,convertId:convertId}).then(({data}) => {
//                 let res = data;
//                 if (res.type == "success"){
//                     dsf.layer.toast("发布会议通知成功!");
//                     //发布短信
//                     dsf.http.post("fn/meetingapi/meeting/sendJuNeiMsg", {pk:_pk}).then(({data}) => {
//                         let result=data;
//                         if (result.type == "success") {
//                         }
//                     });

//                     dsf.http.post("fn/sql/autoFinish", {pk:_pk,tableName:"MEETINGSQ"}).then(({data}) => {
//                         let result=data;
//                         if (result.type == "success") {
//                             dsf.layer.toast("办结成功!");
//                         }
//                     });
//                     dsf.http.post("fn/jwj/getXxzxHy2", {pk:_pk}).then(({data}) => {
//                         let result=data;
//                         if (result.type == "success") {
//                         }
//                     });
//                 }else{
//                     dsf.layer.toast("发布会议通知失败!");
//                 }
//             })
//         });
//     }
//     if (flag == 1) {
//         publishMeetingNotice2(formData, metaData,vueData,'2103110959168MfJCssug5LQKpLmQa2');
//     }
// }
//  // 打印挂载
// exportObj.custom2=function(formData, metaData,  vueData) {
//     // var obj = {};
//     // //obj.attr = '210131203141ebhnJb64eLop0ezhdos';
//     // obj.attr = function (type) {
//     //     if (type == "templates") {
//     //         return '210525095143cyIpXGZ1cL4WzIvmISp';
//     //     } else if (type == "nrType") {
//     //         return 15;
//     //     }
//     // };
//     // WordDoc.insertDraftWordFile(obj);
// }
//  //会议变更按钮
//  exportObj.custom4=function(formData, metaData,  vueData){
//     let _pk=metaData.parameters.pk;
//     vueData.$router.push({
//         path: "/commonForm/190111184257QgSNR8cW92akDpqeWMA?nodeId=88&pk="+_pk
//     })

//     // var pk = DSF.getURLParam("pk");
//     // var url = DSF.getURLRoot() + 'ctrl/formControl/sysForm?moduleId=190111184257QgSNR8cW92akDpqeWMA&nodeId=88&pk=' + pk;
//     // var index = layer.load(0,{shade: [0.3]});
//     // simpleWin(this, {"url": url, "isfresh": true});
// }
//  //确认变更
//  exportObj.custom5=function(formData, metaData,  vueData) {
//     let _pk = metaData.parameters.pk;
//     dsf.http.post("fn/meetingapi/meeting/getOldUsers", {pk:_pk,"type":'2'}).then(({data}) => {
//         let oldUserIds = res.message;
//         vueData.saveNoTip(function (result) {
//             dsf.http.post("fn/meetingapi/meeting/confirmChange", {pk:_pk,"old": oldUserIds,"type":'局内会议'}).then(({data}) => {
//                 let result=data;
//                 if (result.type == "success") {
//                     dsf.layer.toast("会议变更成功!");
//                 }
//             });
//         });
//     });
//     // var oldUserIds;
//     // DSF.Utils.ajaxSyncRequest("ctrl/meetingapi/meeting/getOldUsers", {
//     //     "pk":DSF.getURLParam("pk"),
//     //     "type":'2'
//     // }, function (res) {
//     //     oldUserIds = res.message;
//     // });
//     // var config = {};
//     // config.enableTip = false;
//     // xform.saveForm(config, function (result) {
//     //     debugger
//     //     if (result && result.status == DSF.SaveStatus.Success) {
//     //         DSF.Utils.ajaxSyncRequest("ctrl/meetingapi/meeting/confirmChange", {
//     //             "pk":DSF.getURLParam("pk"),
//     //             "old": oldUserIds,
//     //             "type":'局内会议'
//     //         },function(res){
//     //             if (res.type == "success"){
//     //                 layuiOk("会议变更成功!", function () {
//     //                     setTimeout(function () {
//     //                         window.close();
//     //                     }, 1500)
//     //                 })
//     //             }
//     //         })
//     //     }
//     // })
// }
//  //取消会议
// exportObj.custom6=function(formData, metaData,  vueData) {
//     let _pk = metaData.parameters.pk;
//     dsf.layer.confirm({
//         message: '是否确认取消当前会议？',
//         confirmButtonText: '确认'}, () => {
//             dsf.http.post("fn/meetingapi/meeting/cancelMeeting", {pk:_pk}).then(({data}) => {
//                 let result=data;
//                 if (result.type == "success") {
//                     dsf.layer.toast("会议取消成功!");
//                     VueData.backSucces()
//                 }else{
//                     dsf.layer.toast("会议取消失败!");
//                 }
//             });
//         }
//     );
// }
//发布会议通知按钮

exportObj.publishMeetingNotice = function(formData, metaData, vueData) {
    publishMeetingNotice(formData, metaData, vueData)
        // let _pk = metaData.parameters.pk;
        // let moduleId = metaData.parameters.moduleId;
        // let meetingType = formData.main["c-meetingsq-075"].value;
        // let flagMeet = formData.main["B0058"].value == "1" ? "220620174737bVEaMUmHpFOjkiQLDte" : "220620175357LIm1ZAYkMUciKvN3tB6";
        // vueData.saveNoTip(function () {
        //   dsf.http.post("fn/office/generatorFile", {fileType: 15,templateId: flagMeet,moduleId: moduleId,pk: _pk}).then((res) => {
        //       return res
        //     }).then(({ data }) => {
        //       if(data.type == "success"){
        //         return dsf.http.post("fn/fws/redCheck",{id: _pk,type: 5})
        //       }else {
        //           dsf.layer.toast("发布会议通知失败!");
        //         }
        //     }).then(({ data }) => {
        //       if (data.type == "success"){
        //         return dsf.http.post("fn/fws/electronicSignature",{id: _pk,qzType: 5})
        //       }else {
        //           dsf.layer.toast("发布会议通知失败!");
        //         }
        //     }).then(({ data }) => {
        //       if (data.type == "success") {
        //         return dsf.http.post("fn/meetingapi/meeting/publishMeetingNotice", {pk: _pk,convertId: "2103110959168MfJCssug5LQKpLmQa2",meetingType: meetingType,moduleId: moduleId,});
        //       }else {
        //           dsf.layer.toast("发布会议通知失败!");
        //         }
        //     }).then(({data})=>{
        //       if (data.type == "success") {
        //         dsf.layer.toast("发布会议通知成功");
        //         metaData.buttons.mainButtons.forEach((item, index) => {
        //             if(item.action == "publishMeetingNotice") {
        //               metaData.buttons.mainButtons.splice(index,1)
        //             }
        //         })
        //         return dsf.http.post("fn/meetingapi/meeting/sendJuNeiMsg", {pk: _pk,moduleId: moduleId,meetingType: meetingType})
        //       } else {
        //         dsf.layer.toast("发布会议通知失败!");
        //       }
        //     }).then(({data})=>{
        //       if (!data.type == "success") {
        //         dsf.layer.toast("发布会议通知失败!");
        //       }
        //     })
        // });
};

function publishMeetingNotice(formData, metaData, vueData) {
    let flag = false
    let _pk = metaData.parameters.pk;
    let moduleId = metaData.parameters.moduleId;
    let meetingType = formData.main["c-meetingsq-075"].value;
    let flagMeet = formData.main["B0058"].value == "1" ? "220620174737bVEaMUmHpFOjkiQLDte" : "220620175357LIm1ZAYkMUciKvN3tB6";
        dsf.http.post("fn/office/generatorFile", { fileType: 15, templateId: flagMeet, moduleId: moduleId, pk: _pk }).then((res) => {
            return res
        }).then(({ data }) => {
            if (data.type == "success") {
                return dsf.http.post("fn/fws/redCheck", { id: _pk, type: 5 })
            } else {
                dsf.layer.toast("发布会议通知失败!");
            }
        }).then(({ data }) => {
            if (data.type == "success") {
                return dsf.http.post("fn/fws/electronicSignature", { id: _pk, qzType: 5 })
            } else {
                dsf.layer.toast("发布会议通知失败!");
            }
        }).then(({ data }) => {
            if (data.type == "success") {
                return dsf.http.post("fn/gtjMeeting/publishMeetingNotice", { pk: _pk, convertId: "2103110959168MfJCssug5LQKpLmQa2", meetingType: meetingType, moduleId: moduleId, });
            } else {
                dsf.layer.toast("发布会议通知失败!");
            }
        }).then(({ data }) => {
            if (data.type == "success") {
                dsf.layer.toast("发布会议通知成功");
                vueData.buttonHandle['send'](
                    vueData.$route.params,
                    vueData.formMeta,
                    vueData.formData,
                    vueData,
                    vueData.$refs
                )
                flag = true
                metaData.buttons.mainButtons.forEach((item, index) => {
                    if (item.action == "publishMeetingNotice") {
                        metaData.buttons.mainButtons.splice(index, 1)
                    }
                })
            } else {
                dsf.layer.toast("发布会议通知失败!");
            }
        })
    return flag
};

//局内会议追加模块，发送前校验会议通知是否发布，若没发布，提示用户是否发布
exportObj.meetingSend = function(formData, metaData, vueData) {
    let send = function() {
            dsf.http.post("fn/meetingapi/meeting/isMeetingNoticeConverted", { pk: vueData.formParams.pk }).then((res) => {
                //若没发布，提示用户是否发布
                if (!res.data.data.converted) {
                    dsf.layer.confirm({
                            message: "尚未发布会议通知，是否要发布会议通知？",
                            confirmButtonText: "发布通知并发送",
                            cancelButtonText: "不发布，仍要发送"
                        }, () => {
                            //发布通知并发送
                            publishMeetingNotice(formData, metaData, vueData)
                            vueData.$set(vueData.formData.main, "c-meetingsq-040", { value: "1" })
                        },
                        () => {
                            //不发布，仍要发送
                            vueData.buttonHandle['send'](
                                vueData.$route.params,
                                vueData.formMeta,
                                vueData.formData,
                                vueData,
                                vueData.$refs
                            )
                        })
                } else {
                    vueData.buttonHandle['send'](
                        vueData.$route.params,
                        vueData.formMeta,
                        vueData.formData,
                        vueData,
                        vueData.$refs
                    )
                }
            })
        }
        //先触发保存
        vueData.buttonHandle['save'](
        vueData.$route.params,
        vueData.formMeta,
        vueData.formData,
        vueData,
        vueData.$refs,
        send
    )
}

exportObj.publishAndSend = function(formData, metaData, vueData) {
    let flow = JSON.parse(formData.flowinfo[`flow-${metaData.parameters.pk}-${metaData.parameters.pId || '0'}-${metaData.parameters.pnId || metaData.parameters.pk}`].opinionContentTag)
    let flag = flow.findIndex(item => item.tagName == "同意")
    if(flag != -1) {
        publishMeetingNotice(formData, metaData, vueData) ? dsf.layer.toast("发布会议成功", false, () => {
              vueData.buttonHandle["send"](
                vueData.$route.params,
                vueData.formMeta,
                vueData.formData,
                vueData,
                vueData.$refs
              )
            }) : "";
    } else {
        dsf.layer.toast("未同意,不发布会议", false, () => {
          vueData.buttonHandle["send"](
            vueData.$route.params,
            vueData.formMeta,
            vueData.formData,
            vueData,
            vueData.$refs
          );
        });
    }
}
export default exportObj;