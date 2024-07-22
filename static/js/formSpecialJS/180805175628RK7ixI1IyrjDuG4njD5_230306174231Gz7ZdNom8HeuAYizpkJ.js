// 24660 【济南市委党校】通知公告如果在移动端点击办结，在办结前增加个提示 ‘请先发布在办结’

(function () {
    const exportObj = {};
    exportObj.initHandle = function (formData, formStruct, vueData) {
        // 【成都市一体化协同办公平台服务采购项目】通知公告权限移动端
        //如果这个人要是没有权限那么就让他显示本部门 本机构
        if (!dsf.util.loadSessionStore('user').privileges.length) {
            formStruct.controls[3].extra.tabs.pop();
            return;
        }
        //判断他的全部权限,如果没有这个权限,就让他为默认
        for (let item of dsf.util.loadSessionStore('user').privileges) {
            if (item.name == '蓉易办通知公告管理员') {
                return;
            }
        }
        formStruct.controls[3].extra.tabs.pop();
    };

    exportObj.saveFilter = function (formData, formStruct, vueData) {
        return new Promise((resolve, reject) => {
            if (vueData.nowButton.action == "send" && vueData.nowButton.name == "办结") {
                if (formData.main["C-NOTICE-0020"].value == "-1") {
                    reject("请先发布在办结");
                } else {
                    resolve();
                }
            } else {
                resolve();
            }
        })
    }

    window.spJS = exportObj;
})()