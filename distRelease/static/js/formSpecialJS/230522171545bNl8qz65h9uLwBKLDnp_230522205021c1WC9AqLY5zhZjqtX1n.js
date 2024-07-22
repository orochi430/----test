(function () {
	// 培训管理 培训报名
    const exportObj = {};

	exportObj.initHandle = function (formData, formStruct, vueData) {
  
        dsf.http.post('ctrl/trainplanMobile/getSignUpStatus', {infoId: vueData.pk,userId:dsf.util.loadSessionStore("user").user_id}).then(res => {
            if(res.data.code==200){
                if(res.data.data.status==0){
                    formStruct.buttons.commonButtons.push({
                        action:'TrainSignUp',
                        name:'报名'
                    })
                }
            }
        })
    }
    exportObj.TrainSignUp = function (formData, formStruct, vueData) {
        dsf.layer.confirm({
            message: '请确认是否报名?',
            confirmButtonText: '确认'
        },()=>{
            dsf.http.post('ctrl/trainplanMobile/signUp', {infoId: vueData.pk,userId:dsf.util.loadSessionStore("user").user_id}).then(res => {
                if (res.data.code != 200) {
                    dsf.layer.toast(res.data.message);
                } else {
                    dsf.layer.toast("报名成功", true)
                    formStruct.buttons.commonButtons=[]
                }
            })
        })
    }
	window.spJS = exportObj;
})();