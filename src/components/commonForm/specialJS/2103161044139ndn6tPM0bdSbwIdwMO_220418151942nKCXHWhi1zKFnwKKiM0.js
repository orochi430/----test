import dsf from "../../../common";

const exportObj = {};
function filterTime(time){
  var str=time.replace(/-/g,"/")
  return Date.parse(str)
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  let signupBtn = formStruct.buttons.commonButtons.find(item => item.action == 'SDYCMeetingSignUp')
  formStruct.buttons.commonButtons = formStruct.buttons.commonButtons.filter(item => item.action != 'SDYCMeetingSignUp')
  // formStruct.controls.find(item => item.metaId == 'c-meetingbm-004').privilege.editable = true
  if (filterTime(formData.main['c-meetingbm-004'].value) < new Date().getTime()) {
    vueData.formMeta.subform['210511171011tquPhPgvrO27iAarpBb'].controls.find(item => item.metaId == '210511171011tquPhPgvrO27iAarpBb').privilege.editable = false
    // subFormCtrl.privilege.visible = false
  }
  dsf.http.post('ctrl/meetingPlanP2085Controller/getMeetingApplyData', {pk: vueData.pk}).then(res => {
    if(res.data.code == 200) {
      vueData.formMeta.subform['210511171011tquPhPgvrO27iAarpBb'].controls.forEach(ctr => {
        if(ctr.label == '姓名') {
          ctr.privilege.editable = true
          ctr.extra.tabs[0].action = 'fn/meetingPlanP2085Controller/loadTreeNode?action=self_dept&types=person&rootObject=3&async=true'
        }
        if(res.data.data.colums.indexOf(ctr.label) > -1) {
          ctr.privilege.visible = true
        } else {
          ctr.privilege.visible = false
        }
        ctr.showLable = true
      })
      if((res.data.data.isJumper == '1' && res.data.data.isSendDept && res.data.data.type == 'unit') || (res.data.data.isJumper != '1'  && res.data.data.type == 'dept')){
        formStruct.buttons.commonButtons.push(signupBtn)
      }else if(res.data.data.isJumper == '1' && res.data.data.type == 'unit' && res.data.data.isSendDept && res.data.data.hasReport.length <=  1 ){
        formStruct.buttons.commonButtons.push(signupBtn)
      }else if(res.data.data.isZBJ) {
        formStruct.buttons.commonButtons.push(signupBtn)
      }
    }
  })
  // 选择姓名时 获取人员信息填入
  vueData.$bus.on("selectUserBus", function(busObj) {
    if(busObj.metaData.metaId=="210512180917AgDaONZD0DDk1nxlFPr"){ 
      console.log('--------------',busObj,formData, formStruct, vueData)
      // 单位内子表的编号
      let subFormKey = '210511171011tquPhPgvrO27iAarpBb'
      // 获取人员信息
      let userId = busObj.value
      dsf.http.post('fn/meetingPlanP2085Controller/getMeetingApplyData',{
        userIds: userId,
        type: 'subData',
        pk: vueData.pk
      }).then(res => {
        if(res.data.code == 200) {
          let userInfo = res.data.data.userInfos[busObj.value].split(',')
          // 填入子表信息
          console.log(userInfo)
          formData.multinfos[subFormKey].rows[busObj.subFormIndex]['B0036'] = {value: userInfo[1]} // 职务
          formData.multinfos[subFormKey].rows[busObj.subFormIndex]['210511170911Qu00JUdQirLn0VgdCF7'] = {value: userInfo[2]} // 性别
          formData.multinfos[subFormKey].rows[busObj.subFormIndex]['B0038'] = {value: userInfo[3]} // 单位
          formData.multinfos[subFormKey].rows[busObj.subFormIndex]['210602145440pShHxBpZ5P6xWFGpncj'] = {value: userInfo[4]} // 部门
        }
      })
      
    }
  })
}
exportObj.SDYCMeetingSignUp = function (formData, formStruct, vueData) {
  vueData.notVaildateMetas = formStruct.controls.map(control => control.metaId)
  vueData.buttonHandle['saveNoTip'](
    vueData.$route.params,
    vueData.formMeta,
    vueData.formData,
    vueData,
    function() {
      dsf.http.post('ctrl/meetingPlanP2085Controller/doReport', {pk: vueData.pk}).then(res => {
        if(res.data.code == 200) {
          dsf.layer.toast('上报成功', true)
          vueData.backSucces()
        }
      })
    },
    false
  )
}

export default exportObj;
