/**
 * //上海地产  客户详情列表
 * 107909 [上海地产集团招商APP] -- 跟进人管理模块，保存前替换A0001字段 --2022.05.25
 */

import dsf from "../../../common";
const exportObj = {};
exportObj.initHandle = function (formData, formStruct, vueData) {
}

exportObj.saveAfter = function (vueData, params, formData) {
    vueData.$eventBus.refresh(vueData);
    if (vueData.pk) {
        dsf.layer.toast("表单保存成功")
    } else {
        let pk = formData.main["A0001"].value
        let moduleId = formData.main["A0004"].value
        dsf.layer.toast("表单保存成功", undefined, () => {
            vueData.$router.replace({
                path: `/commonForm/${moduleId}/${pk}`
            });
        });
    }
}
exportObj.saveFilter = function (formData, formStruct, vueData, action) {
    return new Promise(function (resolve, reject) {
        dsf.http.post("fn/followerController/checkExists", { followerId: formData.main["c-rq-space-follower-user-006"].value }).then(({ data }) => {
            if (!data.data) {
                if (!vueData.pk) {
                    dsf.http.post("fn/commonTool/getIdByTableName", { "tableName": "rq_space_follower_user", "dbName": "ImBzServiceConnection" }).then(({ data }) => {
                        let maxid = data.data.id
                        vueData.$set(formData.main, "A0001", { value: maxid });
                        resolve()
                    })
                } else {
                    resolve()
                }
            } else {
                reject("跟进人已存在!")
            }
        })
    })
}
export default exportObj;