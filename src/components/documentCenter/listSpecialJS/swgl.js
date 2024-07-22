//西藏收文管理特殊列表开发 
const exportObj = {};

exportObj.link = function (listid, moduleId, pk, VueData, itemValue) {
    console.log(itemValue)
    VueData.$router.push({
        path: `/commonForm/201029202238XX22yGinKtNuDUisrKC/${itemValue.id}`
    })
}

export default exportObj;
