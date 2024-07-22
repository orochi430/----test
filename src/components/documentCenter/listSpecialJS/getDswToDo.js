
//【大事务二期移动端】办件列表 
const exportObj = {};
exportObj.initHandle = function (vueData) {
 vueData.alwaysShowStatus=true
}
exportObj.dataFilter = function(listData, vueData) {
  
  function filterTime(time) {
    var str = time.replace(/-/g, "/");
    return Date.parse(str);
  }
   
 

  listData.forEach(item => {
    

    //allowMobile属性为-1的，即不能在移动端上处理的件，标题颜色淡化
    if (item.dataValue.allowMobile && item.dataValue.allowMobile != 1) {
      vueData.$set(item.dataValue, "titleStyle", { color: "#d3d3d3" });
      vueData.$set(item.dataValue, "subtitleStyle", { color: "#d3d3d3" });
    }

    //已读不加粗
    if (item.dataValue.isRead) {
      if (item.dataValue.allowMobile && item.dataValue.allowMobile != 1) { //已读但是不是移动端
        vueData.$set(item.dataValue, "titleStyle", {"font-weight":"400","color":"#d3d3d3" });
      } else {
        vueData.$set(item.dataValue, "titleStyle", {"font-weight":"400" });
      }
      
    }

    

    //获取时间差
    let end = 0;
    let now = new Date().getTime();
    if (item.dataValue.deadline) {
      end = filterTime(item.dataValue.deadline);
    }

    let utc = end - now;
    let dayTimes = Math.floor(utc / (24 * 60 * 60 * 1000)) + 1;


   //是否有办理期限 没有 设置白色，有 判断时间差
    if (!item.dataValue.deadline) {
      vueData.$set(item.dataValue, "readStyle", { backgroundColor: "#ffffff" });
    } else {
      if (dayTimes <= 0) {  //过期设置为红色
        vueData.$set(item.dataValue, "readStyle", {
          backgroundColor: "#FF0000"
        });                //3天（包含3天）设置为黄色
      } else if (dayTimes > 0 && dayTimes <= 3) {
        vueData.$set(item.dataValue, "readStyle", {
          backgroundColor: "#FF7F00"
        });
      } else {//未过期（3天以上）

        if (item.dataValue.isRead) {//已读设置为绿色
          vueData.$set(item.dataValue, "readStyle", {
            backgroundColor: "#00FF00"
          });
        } else {   //未读设置为白色（不可见）
          vueData.$set(item.dataValue, "readStyle", {
            backgroundColor: "#ffffff"
          });
        }
      }
    }

   
  });
};
export default exportObj;
