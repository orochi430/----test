const exportObj = {};
// 1，发布部门不能默认出现本部门，元数据已设置默认出现本部门，pc端打开通知公告默认出现的就是本部门

// 2、短信内容，不能自动带出来，您有一条标题为“”的通知公告，请注意查收！发送部门：办公室〔区县（市）校院工作处〕


// 杭州党校-oa移动端
exportObj.initHandle = function (formData, formStruct, vueData) {
    console.log(vueData);
    let form = {}
    form.pk = vueData.pk;
    form.moduleId = vueData.moduleId;
    form.isEnterTodo = vueData.$route.params.isEnterTodo ? 1 : -1;
    // 发送部门数据
    let val = formData.main['B0010']
    console.log(formData);
    // 标题数据
    let intVal = ''
    vueData.$bus.on("inpBus",function (param) { 
        console.log(param);
        if(param.metaData.metaId=='B0001'){
            intVal = param.value
            // 为短信内容赋值
            vueData.$set(formData.main, "C-NOTICE-0013", {
                value:`您有一条标题为“${intVal}”的通知公告，请注意查收！发送部门：${val.value}`
            })
        }
     })


};


export default exportObj;
