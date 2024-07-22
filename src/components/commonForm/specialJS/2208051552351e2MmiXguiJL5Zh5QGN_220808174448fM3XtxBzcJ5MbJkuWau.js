import dsf from "../../../common";

const exportObj = {};
//获取关联文件
function getRelationFile(vueData) {
    let fileRela={
        relaMode:1,//1为单向关联，2为双向关联
        relacountLimit:1,//限制条数
        relaName:"文件关联",//名称
        relaValue:2, //关联文件类型值
        fileTotal:0//文件总数
    }
    return new Promise(function(resolve, reject) {
    dsf.http.post('ctrl/filerelation/select/checkedJson',  {
        pks: vueData.$route.query.relationId,
        infoId: vueData.pk,
        relaType: fileRela.relaValue,
        relaName: fileRela.relaName
    }).then(res => {
        if (res.data.code == 200) {
            resolve(res.data.data)
        } else {
            reject()
        }
    })
    })
}
    
exportObj.initHandle = function(formData, formStruct, vueData) {
    // 关联立项单
    if (!vueData.relationList[0] || !vueData.relationList[0].document.length) {
        getRelationFile(vueData).then(data => {
        dsf.http.post('fn/mobileRelationFile/save',{
            relaMode: data[0].relaMode,
            relaIds: data[0].relaId,
            pk: vueData.pk,
            moduleId: vueData.moduleId,
            fileRelaId: vueData.relationList[0].fileRelaId
        }).then(res => {
            if (res.data.code == 200) {
            dsf.http.get("fn/mobileRelationFile/getFormRelationFiles", {
                pk: vueData.pk,
                moduleId: vueData.moduleId,
                nodeId: formStruct.parameters.nodeId,
                flowId: formStruct.parameters.flowId
            })
            .then((response) => {
                vueData.$set(vueData, 'relationList', response.data.rows)
            });
            }
        })
        })
    }

    let OldLinkCtr = formStruct.controls.filter(item => item.metaId == 'controlMobileAlink')[0]
    dsf.http.post("fn/superviseV6/approvalTask/hasTasks", { "relationId": vueData.$route.query.sourcePk || formData.main['A0031'].value }).then(res => {
        let specialSaveObj = JSON.stringify({ relationId: vueData.$route.query.sourcePk || formData.main['A0031'].value })
        let linkName = "不定期/一次性反馈";
        let linkInfo = `/commonForm/210604144527JntE2LI7dWrpBLsluZz?specialSaveObj=${specialSaveObj}`
        if (res.data.code == 200 && res.data.data && res.data.data.taskTitle) {
            linkName = res.data.data.taskTitle;
            linkInfo = `/commonForm/210604144527JntE2LI7dWrpBLsluZz/${res.data.data.taskId}?specialSaveObj=${specialSaveObj}&method=view&listId=210618141757PmEKNvvLIJQtgqyDW44`
        }
        console.log(OldLinkCtr)
        OldLinkCtr.extra.linkInfo = linkInfo
        OldLinkCtr.extra.linkName = linkName
    });
    let NewLinkCtr = formStruct.controls.filter(item => item.metaId == 'controlMobileAlink')[1]
    let NewLinkName = "新建反馈计划";
    let specialSaveObj = JSON.stringify({ relationId: vueData.$route.query.sourcePk || formData.main['A0031'].value })
    let NewLinkInfo = `/commonForm/210604144527JntE2LI7dWrpBLsluZz?specialSaveObj=${specialSaveObj}`
    if (formStruct.parameters.nodeId != 0) {
        dsf.http.post("fn/superviseV6/approvalTask/hasTasks", {
            "relationId": vueData.$route.query.sourcePk || formData.main['A0031'].value,
            startDate: dsf.date.format(new Date(), 'yyyy-mm-dd') + ' 09:00'
        }).then(res => {
            if (res.data.code == 200 && res.data.data && res.data.data.taskTitle) {
                NewLinkName = res.data.data.taskTitle;
                NewLinkInfo = `/commonForm/210604144527JntE2LI7dWrpBLsluZz/${res.data.data.taskId}?specialSaveObj=${specialSaveObj}`
            }
            console.log(NewLinkCtr)
            NewLinkCtr.extra.linkInfo = NewLinkInfo
            NewLinkCtr.extra.linkName = NewLinkName
        });
    } else {
        NewLinkCtr.extra.linkInfo = NewLinkInfo
        NewLinkCtr.extra.linkName = NewLinkName
    }   
    

}


export default exportObj;