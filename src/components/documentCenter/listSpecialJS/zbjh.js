import dsf from "../../../common";
// 【民政部信创项目】—移动端替换班开发
const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
}
// 换班
exportObj.shift = function (listData, vueData) {
    let moduleId = "2201111459470bsEO9ZhaLsZZeoHY33";
    let pk = listData.dataValue.id;
    let formId = '220623160239a923sSlGlcmBvLLUPoP'
    let zbsd = listData.dataValue.zbsdText;
    let zbrq = listData.dataValue.zbrq;
    // let url = DSF.getURLRoot() + "ctrl/formControl/sysForm?flowId=0&nodeId=0&moduleId=" +
    //     moduleId + "&formId=" + formId + "&zbsd=" + zbsd + "&zbrq=" + zbrq;
    vueData.$router.push({
        path: `/commonForm/${moduleId}?flowId=0&nodeId=0&zbsd=${zbsd}&zbrq=${zbrq}&formId=${formId}`
    })
}
// 替换
exportObj.replace = function (listData, vueData) {
    let moduleId = "220115180631zC5pgq9RhIc6oEND2rQ";
    let formId = "220823152045c97NEnpCWpIeehB95gG";
    // let url = DSF.getURLRoot() + "ctrl/formControl/sysForm?flowId=0&nodeId=0&moduleId=" +
    //     moduleId + "&formId=" + formId;
    vueData.$router.push({
        path: `/commonForm/${moduleId}?flowId=0&nodeId=0&formId=${formId}`
    })
}


// 签到
exportObj.signIn = function (listData, vueData) {
    let url = "fn/schedule/signin";
    let zbsd = null;
    dsf.http.post(url, { }).then((result) => {
        if ("success" == result.data.type) {
            dsf.layer.toast(result.data.message);
            vueData.$eventBus.refresh(vueData);
        } else {
            dsf.layer.toast(result.data.message);
        }
    })
}
// 签退
exportObj.signOut = function (listData, vueData) {
    let url = "fn/schedule/signout";
    dsf.http.post(url).then((result) => {
        if ("success" == result.data.type) {
            dsf.layer.toast(result.data.message);
            vueData.$eventBus.refresh(vueData);
        } else {
            dsf.layer.toast(result.data.message);
        }
    })
}
export default exportObj;