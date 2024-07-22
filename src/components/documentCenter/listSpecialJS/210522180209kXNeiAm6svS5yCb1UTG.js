//【大事务二期移动端】综合查询allowMobile属性为-1的，即不能在移动端上处理的件，标题颜色淡化
const exportObj = {};
exportObj.dataFilter = function (listData,vueData) {
    console.log(listData);
    listData.forEach( item => {
      if(item.dataValue.allowMobile && item.dataValue.allowMobile != 1) {
        vueData.$set(item.dataValue, "titleStyle" , { color: "#d3d3d3" })
        vueData.$set(item.dataValue, "subtitleStyle" , { color: "#d3d3d3" })
      }
    })
  }
export default exportObj;