//西藏发文管理特殊列表开发 
const exportObj = {};

exportObj.link = function (listid, moduleId, pk, VueData, itemValue) {
    console.log(itemValue)
    VueData.$router.push({
        path: `/commonForm/201029221317m0ChF5q6AbNkmO36yp9/${itemValue.id}`
    })
}

export default exportObj;
