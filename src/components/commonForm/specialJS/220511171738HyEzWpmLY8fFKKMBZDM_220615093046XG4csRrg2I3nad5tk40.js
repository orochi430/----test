//上海奉贤党校   差旅费计算  
const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {
  function calcData() {
    /**
     * 地区金额：
      1.崇明180一天
      2.市内区外120一天
      3.奉城镇、四团镇、海港开发区、海湾旅游区80一天
      4.金汇镇、市外差旅费为0
      5.其他区域都按50一天计算
      计算规则：
      1、差旅费 = 选中地区最高金额 × 出差天数
      备注：
      1、出差天数可以为小数、差旅费自动进一位
      2、外出地点支持多选
      3、无论是先输入外出天数还是先输入外出地点都需要计算差旅费
      例如：
      A地区：150；B地区：180；C地区：200；
      共出差2.5天
      差旅费的计算规则是：3×200 
     */
    if (!formData.main["B0020"].value.length) {
      return
    }
    if (isNaN(formData.main["B0020"].value)) {
      dsf.layer.toast("请正确输入外出天数")
      vueData.$set(formData.main, "B0020", { value: 0 })
      return
    }
    let days = Math.ceil(Number(formData.main["B0020"].value))
    let valueArr = [50]
    let spaces = formData.main["C-XXFB-0001"].text
    if (spaces != undefined && spaces.length) {
      if (spaces.indexOf("崇明") > -1) {
        valueArr.push(180)
      }
      if (spaces.indexOf("市内区外") > -1) {
        valueArr.push(120)
      }
      if (spaces.indexOf("奉城镇") > -1 || spaces.indexOf("四团镇") > -1 || spaces.indexOf("海港开发区") > -1 || spaces.indexOf("头桥公司") > -1 || spaces.indexOf("海湾旅游区") > -1) {
        valueArr.push(80)
      }
      let maxValue = Math.max(...valueArr)
      vueData.$set(formData.main, "B0036", { value: (maxValue * days) })
    }
    //只选择后两项差旅费为0
    if(spaces == "市外" || spaces == "金汇镇" || spaces == "金汇镇,市外" || spaces == "市外,金汇镇"){
      vueData.$set(formData.main, "B0036", { value: "0" })
     }
  }
  calcData()

  vueData.$bus.on("blurBus", function (busObj) {
    if (busObj.metaData.metaId == "B0020") {
      calcData()
    }
  })
  vueData.$bus.on("checkVal", function (busObj) {
    if (busObj.metaData.metaId == "C-XXFB-0001") {
      calcData()
    }
  })

  vueData.$bus.on("blurBus",function(busObj){
    console.log(busObj,'//');
  })

  // formStruct.parameters.nodeId == "Bw99bBeIzUF8zg9" 
  // vueData.allFile.find((item)=>{
        //   item.name = "差旅反馈表"
        //   item.allowVerify = "1"
        // })

  vueData.$bus.on("inputRadio", function(busObj) {
    console.log(busObj);
    if(busObj.metaData.metaId == "B0030" || formStruct.parameters.nodeId == "Bw99bBeIzUF8zg9") {
      if(busObj.text == "调研" || busObj.text == "授课") {
        vueData.allFile.find(item => item.name == "差旅反馈表").allowVerify = "1"
      } else {
        vueData.allFile.find(item => item.name == "差旅反馈表").allowVerify = "-1"
      }
    }
  })


  vueData.$bus.on("selectUserBus",function (busObj) {
    if (busObj.metaData.controlId == "P39mQe61sPV4iwBy") {
    let userdepname = []
    let userdepid = []
    busObj.selectArr.forEach(ele => {
      if (userdepid.indexOf(ele.attrs.deptId) == -1) {
        userdepname.push(ele.attrs.orgNameLV1Text)
        userdepid.push(ele.attrs.deptId)
      }
    });
    userdepid = userdepid.join(",")
    userdepname = userdepname.join(",")
    vueData.$set(formData.main,"B0072",{text:userdepname,value:userdepid})
    }
  })

}

exportObj.saveFilter = function (formData, formMeta,vueData,){

  const param = {
    pk:vueData.formParams.pk,
    startTime:formData.main["B0005"].value, //开始时间
    startTimeWB:formData.main["B0054"].value, //开始时间  上午下午
    endTime:formData.main["B0021"].value,     // 结束时间  
    endTimeWB:formData.main["C-XXFB-0002"].value,  // 上午下午选择
    userValue:formData.main["B0051"].value,   //   姓名
    type:formData.main["B0030"].value,       //   外出类型
    address:formData.main["C-XXFB-0001"].value,   // 外出地点
  } 

  let sD = formData.main["B0005"].value.split("-")
  let eD = formData.main["B0021"].value.split("-")
  let startDateStr = sD[1]+"月"+sD[2]+"日"
  let endDateStr = eD[1]+"月"+eD[2]+"日"

  
  const strs = '系统分析到'+formData.main["B0009"].value+'老师已填写关于'+formData.main["B0051"].text
  +startDateStr+formData.main["B0054"].text+'至'+endDateStr
  +formData.main["C-XXFB-0002"].text+'到'+formData.main["C-XXFB-0001"].text + '的' + formData.main["B0030"].text 
  + '活动,请核对是否是同一公务活动,是否进行填写。'

  let  startTimeNian = Number(formData.main["B0005"].value.slice(0,4)) // 开始年
  let  nowTimeNian   = Number(formData.main["B0013"].value.slice(0,4)) // 当前年
  let  startTimeYue  = Number(formData.main["B0005"].value.slice(5,7)) // 开始月
  let  nowTimeYue    = Number(formData.main["B0013"].value.slice(5,7)) // 当前月
  return new Promise(function(resolve,reject){

    if( startTimeNian >= nowTimeNian){
      if(startTimeYue >= nowTimeYue){
        resolve()
      }else{
        reject('禁止申报当前时间公务外出')
      }
    }else{
      reject('禁止申报当前时间公务外出')
    }

    if(vueData.formData.main['A0040'].value == '返回申请人'){
      if(formData.main['B0030'].text == '调研' || formData.main['B0030'].text == '授课'){
        if(vueData.allFile[1].name == '差旅反馈表'){
          if(vueData.allFile[1].file.length > 0){
            vueData.formData.main['C-XXFB-0003'].value = 1
            resolve()
          }else{
            reject('差旅反馈表不能为空,请上传文件')
          }
        }
      }else{
        vueData.formData.main['C-XXFB-0003'].value = 0
        resolve()
      }
    }

    dsf.http.post("ctrl/businessTravel/validate",param).then(({data})=>{
      if(data.data == false){
        dsf.layer.confirm({
          message: strs,
          title: '提示',
          confirmButtonText:'确定'
        },() =>{
          resolve()
        },() =>{
          reject('取消了该行程!')
        })
      }else{
        resolve()
      }
    })

  })
}
export default exportObj;
