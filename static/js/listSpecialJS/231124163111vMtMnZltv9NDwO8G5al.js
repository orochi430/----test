//陕西一体化特殊颜色标题
(function (){
    const exportObj = {};

    exportObj.initHandle = function (vueData) {
        // vueData.readStatusKey = 'zwIsRead'
        // vueData.haveReadVal = "9"
        vueData.$bus.on("commonListValue",(data)=>{
            vueData.data.forEach(item =>{
                if(item.dataValue['A0001'] == data){
                    vueData.$set(item.dataValue, "titleStyle" , { color: "#9F9F9F" })
                }
            })
            //vueData.refresh()
        })
        vueData.$bus.on("shanxiListValue",(data)=>{
            vueData.data.forEach(item =>{
                if(item.dataValue['A0001'] == data){
                    item.dataValue["iconBeforeTitleStyle"] = { "backgroundColor": "#2271B3" }
                }
            })
            //vueData.refresh()
        })
    }
    exportObj.dataFilter = function (listData, vueData) {
        listData.forEach(item=>{
            if(item.dataValue['zwIsReadText'] == '未读'){
                //item.dataValue["readStyle"] = { "backgroundColor": "#FFFFFF" }
                vueData.$set(item.dataValue, "titleStyle" , { "font-weight": "700" })
            }else{
                //item.dataValue["readStyle"] = { "backgroundColor": "#FFFFFF" }
                vueData.$set(item.dataValue, "titleStyle" , { color: "#9F9F9F" })
            }
            if(item.dataValue['psIsReadText'] == '未读'){
                item.dataValue["iconBeforeTitleStyle"] = { "backgroundColor": "#DC0C0C" }
            }else{
                item.dataValue["iconBeforeTitleStyle"] = { "backgroundColor": "#2271B3" }
            }
        })
    }


    window.spListJS = exportObj;
})()