/**
 * 杭州市委党校
 * 议题库 点击按钮 再次编辑
 */

(function () {
    const exportObj = {};

    exportObj.yiti = function (itemValue, vueData) {
        let paramsPk = {
            pk: itemValue.dataValue.A0001
        }
        if (itemValue.dataValue["210812103728geY5PedJ4TlDLDmCIHw"] == "已上会") {
            if (itemValue.dataValue["210812150137UmsTsX4oHclQldgoTle"] == "0") {
                dsf.http.post("fn/afterReision/allowedUpdate", paramsPk).then(({ data }) => {
                    if (data.code == '200') {
                        dsf.layer.toast("上会材料修改已打开") 
                    }
                })
            } else {
                dsf.http.post("/fn/afterReision/notAllowedUpdate",paramsPk).then(({data})=>{
                    if (data.code == '200') {
                        dsf.layer.toast("上会材料修改已关闭")
                    }
                })
            }
        } else {
            dsf.layer.toast("您还没有申请上会")
        }
    }
    window.spListJS = exportObj;
})()