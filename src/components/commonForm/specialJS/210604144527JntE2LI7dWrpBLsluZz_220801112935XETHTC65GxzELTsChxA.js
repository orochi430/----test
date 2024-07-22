import dsf from "../../../common";

/**
 * 督办计划表单
 */
const exportObj = {};
exportObj.initHandle=function (formData, formStruct, vueData){
    // 将关联督办立项表单pk存入元数据
    let relationId = JSON.parse(vueData.$route.query.specialSaveObj).relationId
    vueData.$set(formData.main, 'C-SCHEDULED-TASK-0018', {value: relationId})
    if (!formData.main['C-SCHEDULED-TASK-0019'].value) {
        dsf.http.post('ctrl/superviseV6/m/system/config/db').then(res => {
            vueData.$set(formData.main, 'C-SCHEDULED-TASK-0019', { value: res.data.data.remindDays || '' })
        })
    }
}

export default exportObj;