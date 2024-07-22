/**
 * 值班要情表单
 */
 const exportObj = {};
 exportObj.initHandle = function (formData, formStruct, vueData) {
    console.log("formData",formData);
    let userId=dsf.util.loadSessionStore("user").user_id;
    let name=dsf.util.loadSessionStore("user").name;
    let params={pk:formStruct.parameters.pk,type:"yq",userId:userId, userName:name}
    //alert('要情表单添加访问记录')
    dsf.http.post("fn/sx/schedule/addViewLog", params).then(res => {
        if (res.data.code == "200"){    
            console.log('要情表单添加访问添加成功')
            vueData.$bus.emit("emitYq");
        }
    });

    //把记录变为已读；
//     ctrl/sx/schedule/makeRead
// pk : 跟配置确认取ORDERLYEVENT_SUB_REC.ID字段
// type : 固定传 yq
    // params={pk:vueData.$route.query["subfid"],type:"yq"}
    // dsf.http.post("fn/sx/schedule/makeRead", params).then(res => {
    //     if (res.data.code == "200"){
    //         //vueData.backSucces();    
    //     }
    // });
 }
 export default exportObj;