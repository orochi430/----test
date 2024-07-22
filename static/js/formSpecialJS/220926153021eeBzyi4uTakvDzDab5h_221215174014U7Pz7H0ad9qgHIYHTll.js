//新疆兵团特殊js
/**
 * 操作按钮
 */
(function (){
    const exportObj = {};
    let strValue = '';
    // exportObj.initHandle = function (formData, formStruct, vueData) {
    //     console.log(formData.main.A0004.value);
    // }
    exportObj.custom8 = function(formData, formStruct, vueData){
        strValue =JSON.parse(sessionStorage.getItem('username')) 
        let moduleId = '220926153021eeBzyi4uTakvDzDab5h'
        let listId = '220929143347r5YfF4ddPGgL5qX9lLy'
        let pk = strValue
        let param ={
            pk:formStruct.parameters.pk,
            moduleId:formData.main.A0004.value,
            _content:'',
        }
        dsf.http.post("fn/consumablesopen/GetUpandDown",param).then(({data})=>{
            if(data.data[0].type_text == 1){
                pk = data.data[0].ID
                vueData.$router.push({
                    path:`/commonForm/${moduleId}/${pk}?listId=${listId}`
                })
            }else{
                pk = formStruct.parameters.pk
                vueData.$router.push({
                    path:`/commonForm/${moduleId}/${pk}?listId=${listId}`
                })
                dsf.layer.toast("当前是第一条数据!") 
            }
        })
    }

    exportObj.custom9 = function(formData, formStruct, vueData){
        strValue =JSON.parse(sessionStorage.getItem('username')) 
        let moduleId = '220926153021eeBzyi4uTakvDzDab5h'
        let listId = '220929143347r5YfF4ddPGgL5qX9lLy'
        let pk = ''
        let param ={
            pk:formStruct.parameters.pk,
            moduleId:formData.main.A0004.value,
            _content:strValue,
        }
        dsf.http.post("fn/consumablesopen/GetUpandDown",param).then(({data})=>{
            if(data.data[1].type_text == 1){
                pk = data.data[1].ID
                vueData.$router.push({
                    path:`/commonForm/${moduleId}/${pk}?listId=${listId}`
                })
            }else{
                pk = formStruct.parameters.pk
                vueData.$router.push({
                    path:`/commonForm/${moduleId}/${pk}?listId=${listId}`
                })
                dsf.layer.toast("已经盘点完当前列表所有数据!") 
            }
        })
    }

    window.spJS = exportObj;
    
})()