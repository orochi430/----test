import dsf from "../../../common";

const exportObj = {};
exportObj.handle = function(formData, formStruct) {
    //根据表单数据变化，改变其他控件值
    /* if (formData.main["c-meetingtz-002"].text == "部级会议") {
        formData.main["c-meetingtz-006"].value = formData.main["c-meetingtz-002"].text;
    } */
}
exportObj.initHandle = function(formData, formStruct, vueData) {
    //初始化表单数据
    formData.main["c-meetingtz-006"].value = "1000000000000";
    //通过AJAX初始化表单数据
    dsf.http.get("fn/common/getConfig")
        .then(({ data }) => {
            formData.main["c-meetingtz-006"].value = data.ticket;
        })

    //监控表单控件值变化，改变其他控件值
    vueData.$watch(function() {
        return formData.main["c-meetingtz-006"];
    }, function(newValue, oldValue) {
        //alert(newValue)
    }, {
        deep: true
    });
    vueData.$watch(function() {
        return formData.main["c-meetingtz-002"];
    }, function(newValue, oldValue) {
        formData.main["c-meetingtz-009"].value = newValue.text;
    }, {
        deep: true
    })


}
export default exportObj;