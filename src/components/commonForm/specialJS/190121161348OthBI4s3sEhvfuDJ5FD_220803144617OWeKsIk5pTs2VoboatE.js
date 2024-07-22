// 【大事务二期移动端】会议通知模块，会议派会按钮及功能
import dsf from "../../../common";

const exportObj = {};
exportObj.handle = function(formData, formStruct) {}
exportObj.assignMeeting = function(formData, formStruct, vueData) {
    //请求接口判断是否报名
    let cancelsignup = false
    dsf.http.post("fn/gtjMeeting/checkAttendance", { pk: vueData.formParams.pk, userId: dsf.util.loadSessionStore("user").user_id }).then((res) => {
        if (res.data.data > 0) {
            //已经报名是否取消报名
            dsf.layer.confirm({
                    title: '信息',
                    message: '您是否取消报名？',
                    cancelButtonText: "不取消报名",
                    confirmButtonText: "取消报名"
                },
                () => {
                    //取消报名
                    dsf.layer.toast("您已成功取消报名!", "", () => {
                        cancelsignup = true
                        vueData.$router.push({
                            path: "/commonForm/190813144418OyeMDrjBj1ytos8cARM/220813105625kGDgOQrhdLOuVhBkEgo",
                            query: {
                                listId: "AssignMeeting",
                                method: "assignMeeting",
                                validByList: "validateByList",
                                oldpk: vueData.formParams.pk,
                                oldtitle: formData.main['B0001'].value,
                                cancelsignup: cancelsignup
                            }

                        })
                    })


                },
                () => {
                    //不取消报名
                    vueData.$router.push({
                        path: "/commonForm/190813144418OyeMDrjBj1ytos8cARM/220813105625kGDgOQrhdLOuVhBkEgo",
                        query: {
                            listId: "AssignMeeting",
                            method: "assignMeeting",
                            validByList: "validateByList",
                            oldpk: vueData.formParams.pk,
                            oldtitle: formData.main['B0001'].value,
                            cancelsignup: cancelsignup
                        }
                    })
                }
            )
        }

    })

}
export default exportObj;