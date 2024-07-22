import dsf from "../../../common";
const exportObj = {};
exportObj.initHandle = function (formData, formStruct, vueData) {
    
    vueData.$bus.on("selectUserBus",function (busObj) {
        let uid = formData.main['C-MEETING-TOPIC-0004'].value
        dsf.http.post('fn//meetingapi/tdf/getyhbm',{"userid":uid}).then(res => {
        vueData.$set(vueData.formData.main,"C-MEETING-TOPIC-0003",{text:res.data.orgname,value:res.data.id})
      })
    })
   
   
   
  
}
export default exportObj;