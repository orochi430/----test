//西藏内部事务特殊列表开发 
const exportObj = {};

exportObj.link = function (listid, moduleId, pk, VueData, itemValue) {
    console.log(itemValue)
    VueData.$router.push({
        path: `/commonForm/201117102051C4894GDt5qtR1LaIk1F/${itemValue.id}`
    })
}

export default exportObj;
