/**
 * 督办反馈
 */
const exportObj = {};

exportObj.initHandle = function(vueData) {
    vueData.showProgress = true;
    vueData.StartTime = 'DBTZ.B0013' //进度条起始时间
    vueData.EndTime = 'DBTZ.C-DB-0052' //进度条结束时间
    console.log(vueData);
}
exportObj.dataFilter = function (listData,vueData) {
    listData.forEach(element => {
        let buttons = element.buttons.commonButton
        
        let dbzrr = element.dataValue['DBTZ.C-DB-0016.value']
        let status = element.dataValue['DBTZ.C-DB-0054.value']
        let sourceUserId = element.dataValue['DBTZ.C-DB-0095.value']
        let userId = dsf.util.loadSessionStore("user").user_id
        let masterId = element.dataValue['DBTZ.C-DB-0086']
        let id = element.dataValue['DBTZ.A0001']
        let fid = element.dataValue['DBTZ.A0031']
        let feedbackSystem= element.dataValue['DBTZ.C-DB-0078.value'] 
        let flag = feedbackSystem === "2";
        let SUB_COUNT= element.dataValue['DBTZ.SUB_COUNT']

        // 待确认无反馈情况和接收情况
        if (status == "1"){
            element.buttons.commonButton.splice(0, element.buttons.commonButton.length)
            element.buttons.mainButtons.splice(0, element.buttons.mainButtons.length)
        }
        if ("2" != status && "4" != status){
            //督办项目如果不是接收阶段，
            element.buttons.mainButtons = element.buttons.mainButtons.filter(item => item.action != 'feedback')
            // output.find('li[lay-event="feedback"]').remove();
        }else{
            if(dbzrr != userId){
                element.buttons.mainButtons = element.buttons.mainButtons.filter(item => item.action != 'feedback')
                // //延期
                // output.find('li[lay-event="defer"]').remove();
                // //反馈
                // output.find('li[lay-event="feedback"]').remove();
                // //部门内反馈
                // output.find('li[lay-event="deptFeedback"]').remove();
            }
            //如果没有下级项目则不出现催办按钮
            if(SUB_COUNT<=0) {
                // 催办
                if(dbzrr===userId) {
                    element.buttons.commonButton = element.buttons.commonButton.filter(item => !(['saveDBCB'].find(action => item.action == action)))
                    // output.find('li[lay-event="urge"]').remove();
                }
            }else{
                if(dbzrr!=userId) {
                    element.buttons.commonButton = element.buttons.commonButton.filter(item => !(['saveDBCB', 'pingJia'].find(action => item.action == action)))
                    //评价
                    // output.find('li[lay-event="evaluate"]').remove();
                    //催办
                    // output.find('li[lay-event="urge"]').remove();
                }
            }

        }
    })
}
exportObj.link = function(listid, moduleId, pk, vueData, itemValue) {
    vueData.$router.push({
        path: "/commonForm/210723164628N6ZfKTUlQtwXLTT7Mrg/" + itemValue['DBTZ.A0001']
    });
}
exportObj.fanKuiQingKuang = function (itemValue,vueData) {
    vueData.$router.push(`/superviseIdea?id=${itemValue.dataValue['DBLX.A0001']}`)
}
export default exportObj;