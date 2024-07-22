import dsf from "../../../common"
// 会议室通知
const exportObj = {}
exportObj.handle = function (formData, formStruct) {
  //根据表单数据变化，改变其他控件值
  /* if (formData.main["c-meetingtz-002"].text == "部级会议") {
        formData.main["c-meetingtz-006"].value = formData.main["c-meetingtz-002"].text;
    } */
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  console.log(11)
  let person = dsf.util.loadLocalStore("user")
  if (formData.main["c-meetingtz-049"].value.indexOf(person.user_id) >= 0 && vueData.$route.query.noticeType != 2) {
    let signBtnIndex = vueData.formButtons.mainButtons.findIndex(button => button.name == "报名")
    vueData.formButtons.mainButtons.splice(signBtnIndex, 1)
  }
}
exportObj.saveFilter = function(formData, formStruct, vueData) {
    function filterTime(time) {
        var str = time.replace(/-/g, "/")
        return str
    }
    return new Promise(function(resolve, reject) {
        try {
            let startTime = Date.parse(filterTime(formData.main["c-meetingtz-019"].value)) || ""
            let endTime = Date.parse(filterTime(formData.main["c-meetingtz-020"].value)) || ""
            if (startTime && endTime) {
                if (endTime <= startTime) {
                    reject("结束时间必须大于开始时间")
                } else {
                    resolve()
                }
            }
            resolve()
        } catch (error) {
            resolve()
        }



    })
}
export default exportObj;
