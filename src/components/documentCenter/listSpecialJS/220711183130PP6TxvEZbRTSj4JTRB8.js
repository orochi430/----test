//【江苏烟草一体化协同办公平台】多元联动→移动端核查列表标题设置已办结显示蓝色
const exportObj = {};

exportObj.dataFilter = function (listData,vueData) {
  let key = listData ? Object.keys(listData[0].dataValue).find(item => item.indexOf("A0009.value") !== -1) : ""
  console.log(key);
  listData.forEach( item => {
    if(item.dataValue[key] != "2") {
      vueData.$set(item.dataValue, "titleStyle" , {"color":"#3a74c5"})
    }
  })
}
export default exportObj