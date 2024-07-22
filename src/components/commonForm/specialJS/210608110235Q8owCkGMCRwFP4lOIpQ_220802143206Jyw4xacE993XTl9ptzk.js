/**
 * 督办管理--延期
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

    function filterTime(time) {
        var str = time.replace(/-/g, "/")
        return Date.parse(str)
    }

    vueData.$bus.on("selectDateTime", function(busObj) {
        console.log(vueData);
        if (busObj.metaData.metaId == "C-DB-YQ-0002") {
            let start = filterTime(busObj.value)
                // console.log(vueData.formData.main['C-DB-YQ-0001'].value.substr);
            let end = filterTime(vueData.formData.main['C-DB-YQ-0001'].value)
            if (end && start < end) {
                vueData.$set(formData.main, 'C-DB-YQ-0002', { value: "" })
                dsf.layer.toast(`延期时间必须大于办结日期\n${vueData.formData.main['C-DB-YQ-0001'].value}`)
            }
        }

    })


}



export default exportObj;