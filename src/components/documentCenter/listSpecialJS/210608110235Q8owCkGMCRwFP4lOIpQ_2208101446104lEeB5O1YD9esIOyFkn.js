/**
 * 督办催办特殊js
 */
const exportObj = {};

exportObj.initHandle = function(vueData) {

    console.log(vueData);
}

exportObj.dataFilter = function(listData, vueData) {
    listData.forEach(element => {
        // console.log(element)
    });
}

export default exportObj;