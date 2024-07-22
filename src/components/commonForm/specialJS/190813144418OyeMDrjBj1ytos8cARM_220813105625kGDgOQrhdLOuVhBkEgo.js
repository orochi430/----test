//【大事务二期移动端】会议通知模块，会议派会后，委托模块按钮及功能实现
const exportObj = {};
let userids = ""
let newmember = ""
let members = ""
let nameArr = ""
let arrname =[]
let arrid = []
exportObj.handle = function (formData, formStruct) {
}
exportObj.initHandle = function (formData, formStruct, vueData) {
    vueData.$bus.on("inputRadio",function(busObj) {
        console.log(busObj);
        if (busObj.metaData.metaId) {
          //选择委托的时候，请求接口
          if (busObj.value == 3) {
            dsf.http.post("fn/gtjMeeting/getCurrentDeptParticipants", {
                pk: vueData.$route.query.oldpk,
                deptId: dsf.util.loadSessionStore("user").deptId
              }).then(res => {
                if (res.data.data) {
                  //是否取消报名，如果取消报名则参会人员不自动显示当前用户用户名
                  if (vueData.$route.query.cancelsignup) {
                    res.data.data.forEach(item => {
                      if (item.userId != dsf.util.loadSessionStore("user").user_id) {
                        arrname.push(item.userName);
                      }
                    });
                    nameArr = arrname.join(",");
                    res.data.data.forEach(item => {
                      if (item.userId != dsf.util.loadSessionStore("user").user_id) {
                        arrid.push(item.userId);
                      }
                    });
                    userids = arrid.join(",");
                  } else {
                    //未取消报名显示当前用户用户名
                    nameArr = res.data.data.map(item => { return item.userName; }).join(","); //用户名
                    userids = res.data.data.map(item => { return item.userId; }).join(","); //拼接用户id
                  }
                  vueData.$set(vueData.formData.main,"C-MEETINGTZ-TODO-002", {text: nameArr,value:userids})
                }
              });
            } else {
                nameArr = []
                userids = ""
                arrname = []
                arrid = []
                vueData.$set(vueData.formData.main,"C-MEETINGTZ-TODO-002", {text: "", value: "", schema: ""})
            }
        }
        
    })
     //获取选人控件人员id
    vueData.$bus.on("selectUserBus",function(busObj) {
       newmember = busObj.value 
    })  
}

//触发确定按钮
exportObj.confirmAssign = function (formData, formStruct, vueData) {
    //判断是否是委托选项
   if (vueData.formData.main['C-MEETINGTZ-TODO-022'].value == 3) {
     //判断是否重选过
     if (newmember) {
        members = newmember
    }else{
        members = userids
    }
    //如果有委托人员，请求接口判断委托人是否会议冲突
   if (vueData.formData.main["C-MEETINGTZ-TODO-002"].text) {
        dsf.http.post("fn/gtjMeeting/checkConflict",{pk : vueData.$route.query.oldpk, userIds : userids}).then((res)=>{
            //会议冲突
            if (res.data.data) {
                dsf.layer.confirm({
                    title: '冲突提醒',
                    message: res.data.data,
                    confirmButtonText:"继续派会",
                    cancelButtonText:"重新选人",
                },
                ()=>{
                    //继续派会议
                    dsf.http.post("fn/meetingapi/meeting/entrustMember",{pk: vueData.$route.query.oldpk, oldUsers : userids, member: members, reason : vueData.formData.main['C-MEETINGTZ-TODO-009'].value}).then((res)=>{
                            if (res.data.type == "success") {
                                dsf.layer.toast("派会成功","",()=>{
                                    vueData.$router.back()
                                })
                               }else{
                                dsf.layer.toast("派会失败","",()=>{
                                    vueData.$router.back()
                                })
                               }
                    })
                },
                ()=>{
                    //关闭提示框，重新选人
                    dsf.layer.toast("请重新选人！")
                }
                )
               } else {
                 dsf.http.post("fn/meetingapi/meeting/entrustMember",{pk: vueData.$route.query.oldpk, oldUsers : userids, member: members, reason : vueData.formData.main['C-MEETINGTZ-TODO-009'].value}).then((res)=>{
                        if (res.data.type == "success") {
                            dsf.layer.toast("派会成功","",()=>{
                                vueData.$router.back()
                            })
                           }else{
                            dsf.layer.toast("派会失败","",()=>{
                                vueData.$router.back()
                            })
                           }
                })
               }
        })
   } else {
      dsf.layer.toast("请选择委托人员!")
   }   
   }
    
}
export default exportObj;