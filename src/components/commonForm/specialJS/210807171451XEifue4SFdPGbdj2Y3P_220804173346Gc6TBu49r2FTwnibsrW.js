/**
 * 督办立项 子任务单
*/

import dsf from "../../../common";

const exportObj = {};

//获取计划任务的labelText
function reloadScheduledTask(formData,vueData,formStruct) {
    let aLinkCtr = formStruct.controls.find(item => item.metaId == 'controlMobileAlink')
    dsf.http.post("fn/superviseV6/approvalTask/hasTasks", {"relationId": formStruct.parameters.pk}).then(res=> {
        let specialSaveObj = JSON.stringify({relationId: formStruct.parameters.pk})
        let linkName="查看/新建任务计划";
        let linkInfo = `/commonForm/210604144527JntE2LI7dWrpBLsluZz?specialSaveObj=${specialSaveObj}`
        if (res.data.code == 200&&res.data.data&&res.data.data.taskTitle) {
            linkName = res.data.data.taskTitle;
            linkInfo = `/commonForm/210604144527JntE2LI7dWrpBLsluZz/${res.data.data.taskId}?specialSaveObj=${specialSaveObj}`
        }
        console.log(aLinkCtr)
        aLinkCtr.extra.linkInfo = linkInfo
        aLinkCtr.extra.linkName = linkName
    });
}

// 检查选中部门是否有督办专员
function hasRolePersonByDept(user) {
    return new Promise((resolve, reject) => {
        dsf.http.post('fn/superviseV6/approval/hasRolePersonByDept', {
            deptId: user.id.slice(user.id.lastIndexOf('_') + 1), 
            deptName: user.showName
        }).then(res => {
            if (res.data.code == 200) {
                resolve()
            } else {
                dsf.layer.toast(res.data.message)
                reject()
            }
        })
    }) 
}
// 主办单位与协办单位不能重复
function checkRepeat(comparisonObj, user) {
    if (comparisonObj.value.split(',').find(item => item == user.id.slice(user.id.lastIndexOf('_') + 1))) {
        user.checked = false
        dsf.layer.toast('主办单位与协办单位不能重复')
    }
}
// 显示隐藏计划任务
function isShowControlMobileAlink (val, ctr) {
    val == 2 ? ctr.show = 1 : ctr.show = 0
}
exportObj.initHandle = function (formData, formStruct, vueData){
    // 获取计划任务的labelText
    let aLinkCtr = formStruct.controls.find(item => item.metaId == 'controlMobileAlink')
    if (aLinkCtr) reloadScheduledTask(formData,vueData,formStruct)

    // 显示隐藏计划任务
    let DB_0078 = formData.main['C-DB-0078'].value
    if (DB_0078 && aLinkCtr)isShowControlMobileAlink(DB_0078, aLinkCtr)
    
    // 初始化源督办id
    if (!formData.main['C-DB-0086'] || !formData.main['C-DB-0086'].value) {
        vueData.$set(formData.main, 'C-DB-0086', {value: formStruct.parameters.pk})
    }
    // 初始化督办状态
    if (!formData.main['C-DB-0054'] || !formData.main['C-DB-0054'].value) {
        vueData.$set(formData.main, 'C-DB-0054', {value: '1', text: '待确认'})
    }
    vueData.$bus.$off("selectUserBus").on("selectUserBus", function(busObj){
        console.log("busObj.metaData",busObj.metaData);
        if(busObj.metaData.metaId === "C-DB-0001"){ 
            // 主办单位为多个时清空协办单位,且协办单位不能再选
            if (busObj.selectArr.length > 1) {
                vueData.$set(formData.main, "C-DB-0002", {"value": '', "text": ''});
                formStruct.controls.find(item => item.metaId == 'C-DB-0002').privilege.editable = false
            } else {
                formStruct.controls.find(item => item.metaId == 'C-DB-0002').privilege.editable = true
            }
        }
    });
    // 绑定前先注销，否则引起多次触发, 主办单位协办单位选人时不能重复，且判断是否有督办专员
    vueData.$bus.$off("userClickBus").on("userClickBus", function(busObj){
        // console.log(busObj)
        if (busObj.metaId == 'C-DB-0002' || busObj.metaId == 'C-DB-0001') {
            let comparisonObj = busObj.metaId == 'C-DB-0002' ? formData.main['C-DB-0001'] : formData.main['C-DB-0002']

            checkRepeat(comparisonObj, busObj.user)

            if (busObj.user.checked) {
                hasRolePersonByDept(busObj.user).catch(() => {
                    busObj.user.checked = false
                    // 异步无法在 树控件loadChildData前改变checked，只能改变后再次执行loadChildData
                    busObj.callback(busObj.user)
                })
            }
        }
    });
    vueData.$bus.on("inputRadio", function (busObj) {
        // 反馈类型控制计划任务
        if (busObj.metaData.metaId == "C-DB-0078") {
            isShowControlMobileAlink(busObj.value, aLinkCtr)
        }
    })
}
exportObj.saveFilter = function (formData, formStruct, vueData, action) {
    return new Promise(function (resolve, reject) {
        let endTime=dsf.date.parse(formData.main["C-DB-0052"].value).getTime() // 子项目办结期限
        let main_endTime=dsf.date.parse(vueData.$route.query.endDate).getTime() // 主项目办结期限
        if(endTime > main_endTime){
            reject("办结期限不能大于主项目办结期限")
        }else{
            resolve()
        }
    });
}

exportObj.saveAfter = function (vueData, formData, formStruct) {
    vueData.backSucces()
}
export default exportObj;