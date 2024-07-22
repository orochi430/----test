//上海地产切换账号  2022年6月28日15:44:21 @ly
const exportObj = {};
exportObj.switchAccount = function (itemValue, vueData) {
    let loadingIndx =dsf.layer.loading("切换中...")
    let postData = {
        __DATA: JSON.stringify({
            logname: itemValue.dataValue["logName"],
            password: "",
            device_id: "",
            device_desc: "",
        }),
    };
    dsf.http.post("fn/api/para/switchAccount", postData).then(res => {
        console.log(res)

        dsf.util.removeSessionStore('user');
        dsf.util.removeSessionStore('loginToken');
        dsf.util.removeToLocalStore('user');
        dsf.util.removeToLocalStore('loginToken');

        let dateUserTemp = res.data.data
        dsf.util.saveToSessionStore("user", dateUserTemp);
        dsf.util.saveToSessionStore("loginToken", dateUserTemp.auth.token);
        dsf.util.saveToLocalStore("loginToken", dateUserTemp.auth.token);
        dsf.util.saveToLocalStore("user", dateUserTemp);
        vueData.$router.push({
            path: `/index`
        })
    }).always(()=>{
        dsf.layer.closeLoading(loadingIndx)
    })
}
export default exportObj;
