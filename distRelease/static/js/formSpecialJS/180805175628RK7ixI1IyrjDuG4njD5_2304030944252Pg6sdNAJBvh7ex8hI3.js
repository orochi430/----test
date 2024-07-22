// 【济南市委党校】通知公告查看表单
(function () {
  const exportObj = {};

  exportObj.noticeForward = function (formData, formStruct, vueData) {
    let dataValue = {
        info_id: formStruct.parameters.pk,
        pnid: formStruct.parameters.pnId,
        wfId: formStruct.parameters.flowId,
        pid: formStruct.parameters.pId,
    }
    vueData.showPerson = true;
    vueData.dataValue = dataValue;
    vueData.extra = {
        multiple: true,
        tabs: [{
            name: "本部门",
            action: "fn/user/select/data?types=person&rootObject=2&action=self_dept&async=true",
            subTabKey: "department"
        }, {
            name: "本单位",
            action: "fn/user/select/data?types=person&rootObject=2&action=self_org&async=true",
            subTabKey: "department"
        }]
    }
    // 重写选人确认后的getSelectUser方法，调用接口
    vueData.getSelectUser = function (data) {
        let dataList = []
        data.forEach(item => {
            dataList.push({ key: item.id, text: item.name })
        });
        if (dataList.length <= 0) {
            dsf.layer.toast("请选择要转发的用户！");
        } else {
            dsf.http.post("ctrl/notice/forward"), {
                "pk": formStruct.parameters.pk,
                "users": JSON.stringify(dataList)
            }.then(({ data }) => {
                if ("success" === data.type) {
                    dsf.layer.toast("转发成功！", true);
                } else {
                    dsf.layer.toast(data.message, false);
                }
            });
        }
    }
}
  window.spJS = exportObj;
})()