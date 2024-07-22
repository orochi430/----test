// 浦东环保局 局领导请休假
(function () {
  const exportObj = {};
  exportObj.initHandle = function (formData, formStruct, vueData) {
    dsf.http.post("/ctrl/askleave/getData").then(({data}) => {
      if(data.code == 200) {
        formData.main["211222202030QtbQc79uPS4kUGvSfbN"].value = data.data.gx
        formData.main["211222202104tFyPBDYmSgYCuGnRb0W"].value = data.data.yx
        formData.main["211222202136gIVhY0mCvylyjjMTS6A"].value = data.data.sygx
        formData.main["211222202248ghWMUHCkeNWqssZDM1G"].value = data.data.jb
        formData.main["211222202413nGoHL4a5JzVsF25WU6F"].value = data.data.yxtx
      }
    })
    vueData.$bus.on("checkVal",function(busObj){
      if(busObj.metaData.metaId == "C-LEAVE-0001") {
        let confirmArr = busObj.text ? busObj.text.split(",") : []
        let subFormRows = []
        formData.multinfos['220718103641Af8Z3yKgdq3YHdPBga4'].rows.forEach(item=>{subFormRows.push(item["B0006"].text)})
        for(let [i,v] of confirmArr.entries()) {
          if(subFormRows.indexOf(v)==-1){
            vueData.$refs.formTab[0].$refs['220718103641Af8Z3yKgdq3YHdPBga4'][0].$refs.subform.addCard(false).then((newData) => {
              vueData.$set(newData,"B0006",{text: v, value: ++i})
            })
          }
        }
        for(let v of subFormRows) {
          if(confirmArr.indexOf(v)==-1) {
            let index = formData.multinfos['220718103641Af8Z3yKgdq3YHdPBga4'].rows.findIndex(item => item["B0006"].text == v)
            formData.multinfos['220718103641Af8Z3yKgdq3YHdPBga4'].rows.splice(index,1)
          }
        }
      }
      if(busObj.metaData.metaId == "B0029" || busObj.metaData.metaId == "B0030"){
        let data = formData.multinfos['220718103641Af8Z3yKgdq3YHdPBga4'].rows[busObj.subFormIndex]
        if(data['B0013'].value == data['B0021'].value && data['B0029'].text=="下午" && data['B0030'].text=="上午"){
          dsf.layer.toast("开始时间不能大于结束时间！")
          data['B0029'].value = ""
          data['B0030'].value = ""
        }else{
          sum(busObj.subFormIndex)
        }
      }
    })
    vueData.$bus.on("selectDateTime",function(busObj){
      if(busObj.metaData.metaId == "B0013" || busObj.metaData.metaId == "B0021") {
         let subTime = formData.multinfos['220718103641Af8Z3yKgdq3YHdPBga4'].rows[busObj.subFormIndex]
         if(subTime['B0013'].value && subTime['B0021'].value) {
          if(subTime['B0013'].value > subTime['B0021'].value){
            dsf.layer.toast("开始时间不能大于结束时间！")
            subTime['B0013'].value = ""
            subTime['B0021'].value = ""
          }else if(subTime['B0013'].value == subTime['B0021'].value && subTime['B0029'].text=="下午" && subTime['B0030'].text=="上午"){
            dsf.layer.toast("开始时间不能大于结束时间！")
            subTime['B0029'].value = ""
            subTime['B0030'].value = ""
          }else {
            sum(busObj.subFormIndex)
          }
         }
      }
    })
    function sum(index){
      let subFormData = formData.multinfos['220718103641Af8Z3yKgdq3YHdPBga4'].rows[index]
      if(subFormData['B0013'].value && subFormData['B0021'].value && subFormData['B0029'].value && subFormData['B0030'].value){
        let days = getDays(subFormData['B0013'].value, subFormData['B0021'].value)
        subFormData['B0029'].value == subFormData['B0030'].value ? days+=0.5 : days+=1
        if(subFormData["B0006"].text == "年休假" && days > formData.main["211222202136gIVhY0mCvylyjjMTS6A"].value) {
          dsf.layer.toast("年休假时间大于剩余公休时间！")
          return
        }
        if(subFormData["B0006"].text == "调休" && days > formData.main["211222202413nGoHL4a5JzVsF25WU6F"].value) {
          dsf.layer.toast("调休时间大于有效可调休天数！")
          return
        }
        subFormData['B0010'].value = days
        let flag = false
        let minStartTime = {time: subFormData['B0013'].value,type: subFormData['B0029']}
        let maxEndTime = {time: subFormData['B0021'].value,type: subFormData['B0030']}
        let total = 0
        formData.multinfos['220718103641Af8Z3yKgdq3YHdPBga4'].rows.forEach(item=>{
          if(item['B0013'].value && item['B0021'].value && item['B0029'].value && item['B0030'].value){
            flag=true
            if(getDays(minStartTime.time, item['B0013'].value) <= 0) {
              minStartTime.time=item['B0013'].value
              if(minStartTime.time == item['B0013'].value){
                item['B0029'].text=="上午" ? minStartTime.type=item['B0029'] : ""
              }
            }
            if(getDays(maxEndTime.time, item['B0021'].value) >= 0) {
              maxEndTime.time=item['B0021'].value
              if(maxEndTime.time == item['B0021'].value){
                item['B0030'].text=="下午" ? maxEndTime.type=item['B0030'] : ""
              }
            }
            total+=Number(item['B0010'].value)
          }else{
            flag=false
            return
          }
        })
        if(flag){
          formData.main['C-LEAVE-0002'].value = minStartTime.time
          formData.main['C-LEAVE-0003'].value = maxEndTime.time
          formData.main['C-LEAVE-0004'] = minStartTime.type
          formData.main['C-LEAVE-0005'] = maxEndTime.type
          // if(total>formData.main["211222202413nGoHL4a5JzVsF25WU6F"].value) {
          //   dsf.layer.toast("总天数大于有效可调休天数")
          // }else {
          //   formData.main['C-LEAVE-0006'].value = total
          // }
          formData.main['C-LEAVE-0006'].value = total
        }
      }
    }
    function getDays(sDate, eDate){
      return days=(Date.parse(eDate) - Date.parse(sDate))/(24*60*60*1000)
    }
  }
  window.spJS=exportObj;
})();
