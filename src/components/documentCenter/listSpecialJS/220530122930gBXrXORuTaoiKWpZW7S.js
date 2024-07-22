// 【西藏自治区人民政府移动办公项目】 预约会议：列表中添加会议状态提示 已开始，进行中，已结束
const exportObj = {};

exportObj.dataFilter = function (listData,vueData) {
    console.log(listData);
    listData.forEach((item)=>{
        let newTime = new Date().getTime()
        console.log(newTime);
        console.log(item.dataValue["c-meetingsq-007"]);
        if(newTime < new Date(item.dataValue["c-meetingsq-007"]).getTime()){
            item.dataValue["B0001"] += "（未开始）"
        } else if (newTime >= new Date(item.dataValue["c-meetingsq-007"]).getTime() && newTime <= new Date(item.dataValue["c-meetingsq-008"]).getTime()){
            item.dataValue["B0001"] += "（已开始）"
        } else {
            item.dataValue["B0001"] += "（已结束）"
        }
    })
}

export default exportObj;
