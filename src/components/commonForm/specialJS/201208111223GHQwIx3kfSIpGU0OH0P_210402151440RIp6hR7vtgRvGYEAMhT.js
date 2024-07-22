import dsf from "../../../common";

// 【浙江省委党校管理服务平台升级改造项目】——用车申请，子表功能开发
const exportObj = {};
exportObj.initHandle = function (formData, formStruct, vueData) {
    let flag = false
    window["2104122007002xCpTqn2B1SYWjxIFQ5_beforeOpenCode"] = function (formData, url,vueDataNew) {   
        let tempurl = "ctrl/applyUseCar/GetDriver"
        return tempurl 
    }

    window["220623120531y3O2nOWNxUnDjJTu20L_beforeOpenCode"] = function (formData, url,vueDataNew) {   
        let tempurl = "ctrl/applyUseCar/GetBoardingLocation"
        return tempurl
    }

    // 监听子表列表点击
    vueData.$bus.on("subFormSelect",(checkItems, subFormId)=>{
        flag = true
        if (formData.multinfos['20120815093889lVQFYTpr6DVHgM2x5'].rows.length > 0) {      
            // 删除重复元素
            let arrMul = formData.multinfos['20120815093889lVQFYTpr6DVHgM2x5'].rows
            let flog = false
            let arrCheck = checkItems.checkItems
            for (let i = 0; i <arrCheck.length; i++) {
                for(let j = 0; j<arrMul.length;j++){
                    if (arrMul[j]['C-CARAPPLY-0015'].value == arrCheck[i].dataValue['C-CAR-INFO-0001']) {
                        arrMul.splice(j, 1)
                        flog = true
                        break
                    }
                }
                
            }
            if (flog) {
                dsf.layer.toast("不可重复选择车辆");
            }
        }
     
    })
    vueData.$bus.on("subFormAdd",(busObj)=>{
       if (flag) {
        vueData.$set(busObj.newData,"220705140459t5uODow2TPeuPHowa8G",{
            value: 1,
            text: "校内"
        })
        flag = false
       }
       vueData.$nextTick(() => {
       if (busObj.newData['C-CARAPPLY-0012'].value) {
        vueData.$set(busObj.newData, '220928094805zvax3zBLV9XIebLgMR8', {
            value: busObj.newData['C-CARAPPLY-0012'].value,
        })
       }
    })
    })
    vueData.$bus.on("selectUserBus",(busObj)=>{
        if (busObj.metaData.metaId == "2104122007002xCpTqn2B1SYWjxIFQ5") {
         let drivermessga = busObj.text.split(',')
         vueData.$set(vueData.formData.multinfos['20120815093889lVQFYTpr6DVHgM2x5'].rows[busObj.subFormIndex], '2104122007002xCpTqn2B1SYWjxIFQ5', {
                    value: drivermessga[0],
                    text: drivermessga[0],
                })
         vueData.$set(vueData.formData.multinfos['20120815093889lVQFYTpr6DVHgM2x5'].rows[busObj.subFormIndex], '220928094805zvax3zBLV9XIebLgMR8', {
                    value: drivermessga[1]
                })
        }
     })
    // vueData.$bus.on("blurBus",(busObj)=>{
    //     console.log(busObj.value);
    //     if(busObj.value.metaId == "220621195151yOxNtPRYllzuLzWVdB8"){
    //             console.log('1');
    //             dsf.layer.toast("乘车人校外不可为空!")
    //     }
    // })

}
exportObj.choose = function (checkItems, vueData,) {
    vueData.commonPop = false;
    // 类型
    console.log(111111);
    vueData.$set(vueData.formData.multinfos['20120815093889lVQFYTpr6DVHgM2x5'].rows[subFormIndex], '220705140459t5uODow2TPeuPHowa8G', {
        value: checkItems[0].dataValue['B0056.value'],
        text: checkItems[0].dataValue['B0056.text']
    })
    // 姓名
    vueData.$set(vueData.formData.multinfos['20120815093889lVQFYTpr6DVHgM2x5'].rows[subFormIndex], '2104122007002xCpTqn2B1SYWjxIFQ5', {
        value: checkItems[0].dataValue['B0001.value'],
        text: checkItems[0].dataValue['B0001.value'],
    })
    // 手机号码
    vueData.$set(vueData.formData.multinfos['20120815093889lVQFYTpr6DVHgM2x5'].rows[subFormIndex], '220928094805zvax3zBLV9XIebLgMR8', {
        value: checkItems[0].dataValue['C-CAR-INFO-0007.value'],
    })
}
exportObj.saveFilter= function (formData, formMeta){
    console.log(formData);
    return new Promise(function(resolve,reject){
        if(formData.main['220621195151yOxNtPRYllzuLzWVdB8'].value != '' 
        && formData.main['201208140850S66WSvrH95k4SwSCAh3'].value == '' || 
        formData.main['220621195151yOxNtPRYllzuLzWVdB8'].value == '' 
        && formData.main['201208140850S66WSvrH95k4SwSCAh3'].value !== '' ||
        formData.main['220621195151yOxNtPRYllzuLzWVdB8'].value !== '' 
        && formData.main['201208140850S66WSvrH95k4SwSCAh3'].value !== ''
        ){
          resolve()
        }else{
          reject('乘车人校内校外二者必填之一')  
        }
    })
}

export default exportObj;
