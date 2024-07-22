/**
 * 督办管理--评价
 */

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
            relaMode: 1,
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
    console.log(vueData);
    console.log(vueData.$refs);
    dsf.http.post('ctrl/superviseV6/approval/getEvaluateResponsibleUnit', {
        sourcePk: vueData.$route.query.sourcePk
    }).then(res => {
        if (res.data.code == 200) {
            console.log(res.data);
            if (res.data.data.codeList) {
                res.data.data.codeList.forEach((item, index) => {
                    vueData.$refs.formTab[0].$refs["210702160321DBzcmz5Zm8ICv8iESZy"][0].$refs.subform.addCard(false).then((newData) => {
                        //责任单位
                        vueData.$set(newData, "C-EVALUATE-SUB-0001", {
                            value: item.value,
                            text: item.text
                        });

                    })
                })
            }

        }
    })

}


export default exportObj;
