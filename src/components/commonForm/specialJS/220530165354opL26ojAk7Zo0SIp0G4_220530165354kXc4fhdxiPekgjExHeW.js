/**
 *   模块位置：
 *  业务模块-地产集团-项目-项目信息
 *  操作记录表单
 */

 import dsf from "../../../common";
 const exportObj = {};
 exportObj.initHandle = function (formData, formStruct, vueData) {
    
}
exportObj.saveFilter = function (formData, formStruct, vueData) {
    return new Promise(function (resolve, reject) {
        if (!vueData.pk) {
            dsf.http.post("fn/commonTool/getIdByTableName", { "tableName": "log_operation", "dbName": "ImSupportConnection" }).then(({ data }) => {
                let temp_pk = data.data.id
                vueData.pk = temp_pk
                vueData.formParams.pk = temp_pk
                vueData.$set(formStruct.parameters, 'pk', temp_pk)
                vueData.$set(formData.main, 'A0001', { value: temp_pk })
                vueData.$set(formData.main, 'B0035', { value: vueData.$route.query.fid })
                resolve()
            })
        }else{
            resolve();
        }
    })
}
export default exportObj;