/**
 * 102261  【内蒙古自治区呼市政府xc项目】--移动办公，发文管理新增俩个关联表单--20220415
 * 待办表单
 * 处理特殊按钮的问题；
 */
 import dsf from "../../../common";
 import util from "@/common/util";
 const exportObj = {};
 exportObj.initHandle = function (formData, formStruct, vueData) {
 }

 //等价于saveFilter <=> saveBefore
 exportObj.saveFilter = function (formData, formStruct, vueData) {
    return new Promise(function (resolve, reject) {
        resolve();
        //reject();;
    });
 }

 //发送范围表
 exportObj.ReleaseScope=function(formData, metaData,  vueData) {
    let _pk=metaData.parameters.pk;
    vueData.$router.push({
        path:`/commonForm/210303143634UyF7M3RpHKoyVspJn5n/${_pk}/1?type=gw`,
        query: {"todoId":metaData.parameters.todoId,"formId":"f220421101523hE45B1Meqy5LIV4gO1s4"}
    })
    // this.$router.push({
    //     path: "/commonForm/" + params,
    //     query: Object.assign(query, linkToQuery)
    // });
}
 //属性表
exportObj.publicProperty=function(formData, metaData,  vueData) {
    let _pk=metaData.parameters.pk;
    vueData.$router.push({
        path: `/commonForm/210303143634UyF7M3RpHKoyVspJn5n/${_pk}/1?type=gw`,
        query: {"todoId":metaData.parameters.todoId,"formId":"f220421101643k9jSEx6dVTknS5owgPI"}
    })
}
export default exportObj;