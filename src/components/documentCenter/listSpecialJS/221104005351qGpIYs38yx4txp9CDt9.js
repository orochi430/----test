/*
 * @Author: jiangfeng
 * @Date: 2023-05-05 10:11:36
 * @Last Modified by: 会议
 * @Last Modified time: 2023-05-05 10:16:07
 */

const exportObj = {};

exportObj.dataFilter = function(listData, vueData) {
  console.log(listData);
  listData.forEach(element => {
    let str =
      element.dataValue["C-HYJY-0001"] +
      " ~ " +
      element.dataValue["C-HYJY-0002"].substr(10);
    if (
      moment(new Date(element.dataValue["C-HYJY-0001"])).format("YYYYMMDD") !=
      moment(new Date(element.dataValue["C-HYJY-0002"])).format("YYYYMMDD")
    ) {
      str =
        element.dataValue["C-HYJY-0001"] +
        " ~ " +
        element.dataValue["C-HYJY-0002"].substr(5);
    }
    vueData.$set(element.dataValue, "C-HYJY-0001", str);
  });
};

export default exportObj;
