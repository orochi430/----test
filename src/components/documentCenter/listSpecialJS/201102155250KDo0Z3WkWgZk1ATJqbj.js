//外卖食品预定 
const exportObj = {};
exportObj.createRow=function (btn, vueData) {
    console.log('custom1');
    let date = new Date();
    let day = date.getDay();
    let h = date.getHours();
    let M = date.getMinutes();
    let tip = "预定外卖时间为每周二、周三上午8:00-11:30其他时间段内暂不允许预定。";
    //判断时间
    if (h >= 8 && h < 12 && (day == 2 || day == 3)) {
        if (h == 11 && M > 30) {
            dsf.layer.toast(tip)
        } else {
            vueData.$router.push({
                name: "commonForm",
                params: {
                  moduleId: vueData.moduleId,
                }
              })
        }
    } else {
        dsf.layer.toast(tip)
    }
}
export default exportObj;