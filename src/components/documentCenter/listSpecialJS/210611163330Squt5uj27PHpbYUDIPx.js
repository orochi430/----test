//浙江请假列表
const exportObj = {};

exportObj.dataFilter = function (listData,vueData) {
  listData.forEach(element => {
    if (element.dataValue["220107162859MHh50kHBG02TES3AD9Y"]) {//核酸计算结果
      vueData.$set(element.dataValue,"220107162859MHh50kHBG02TES3AD9Y",`${element.dataValue["220107162859MHh50kHBG02TES3AD9Y"]+"小时"}`)
      vueData.$set(element.dataValue,"220107162859MHh50kHBG02TES3AD9Y.value",`${element.dataValue["220107162859MHh50kHBG02TES3AD9Y"]+"小时"}`)
    }
  });
}

export default exportObj;
