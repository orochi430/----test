// 上海地产招商 核心商务书模块，列表客户比选/二次审批按钮触发弹框。
const exportObj = {};

function confirmCheck (btn, listData, vueData, diglogData){
  let pks = ""
  listData.forEach((item, index) => {
    index == listData.length - 1 ? pks = pks + item.dataValue["A0001"] : pks = pks + item.dataValue["A0001"] + ","
  })
  dsf.http.post(btn.parameters.find(item => item.key == "api").value, {pks: pks}).then(({data}) => {
    if(data.code == "1"){
      vueData.$refs.rejectDialog.showDialog = true
      vueData.$refs.rejectDialog.title = diglogData.title
      vueData.$refs.rejectDialog.placeholder = diglogData.placeholder
      vueData.$refs.rejectDialog.subTitle = diglogData.subTitle
      vueData.$refs.rejectDialog.confirmCallBack = function(reason){
        dsf.http.post(diglogData.api,{pks: pks, nr: reason}).then(({data}) => {
          dsf.layer.toast(data.message)
          vueData.showCheck = false
        })
      }
    } else {
      dsf.layer.toast(data.message)
    }
  })
}

exportObj.operationRows = function(btn, vueData) {
  let diglogData2 = {
    title: "客户评选清单",
    placeholder: "请输入推荐说明",
    subTitle: "推荐说明",
    buttonText: "提交",
    api: "fn/coreBusiness/sendBX"
  }
  let diglogData1 = {
    title: "核心商务书破红线审批",
    placeholder: "请输入审批说明",
    subTitle: "审批说明",
    buttonText: "提交",
    api: "fn/coreBusinessContract/sendSecond"
  }
  vueData.showCheck = true
  vueData.$eventBus.onDefaultListCheck(vueData, function(data){
    if(btn.name == "二次审批") { 
      console.log("二次审批");
      confirmCheck(btn, data, vueData, diglogData1)
    } else if(btn.name == "客户比选") {
      console.log("客户比选");
      confirmCheck(btn, data, vueData, diglogData2)
    }
  })
}
export default exportObj;