/**
 * 局外会议
 * 拟稿，直接发送，流程节点到caiguo
 * caiguo登录，发送给徐毅松xuys
 * xuys登录，发送给caiguo
 * caiguo发送给拟稿人
 * 拟稿人发送会议通知后，然后怎么走？
 */
 import dsf from "../../../common";
 import util from "@/common/util";
 const exportObj = {};
 exportObj.initHandle = function (formData, formStruct, vueData) {
    //let editOpinion = formData.main["210622150232gZx9GfuxBc0tJktGVuI"].value;
    let nodeId=formStruct.parameters.nodeId;
    //修改意见为空并且不在会议变更节点的时候，隐藏这个文本域
    // if ("" == editOpinion && nodeId != '88') {
    //     //$("#GiU0d8VZyRn8rKxP").hide();
    // }
    let user = dsf.util.loadSessionStore("user")
    let userId =user.user_id;   //除了谢颖和朱晔，在查看节点别人都没有权限
    if (nodeId == '-1' && (userId != '15029' && userId != '25113')) {
        //$("button[op='custom3']").hide();
    }

    //选择会议类型为其他时，则显示“其他会场”输入框，否则隐藏
    // vueData.$bus.on("checkVal", function (busObj) {
    //     if (busObj.metaData.metaId == "c-meetingsq-009") {
    //         console.log("busObj",busObj);
    //     }
    // });
 }

 //等价于saveFilter <=> saveBefore
 exportObj.saveFilter = function (formData, formStruct, vueData) {
    function beforeSaveForm(){
        let meetingTitle = formData.main["c-meetingsq-005"].value;
        vueData.$set(vueData.formData.main,"B0001", {value: meetingTitle})
        //DSF.setElementValueByKey("B0001", { value : meetingTitle});
        let ngbm = formData.main["c-meetingsq-081"];
        vueData.$set(vueData.formData.main,"B0010", {value: ngbm})
        //DSF.setElementValueByKey("B0010", { value : ngbm});
    }
    
    return new Promise(function (resolve, reject) {
        beforeSaveForm();
        resolve();
        //reject();;
    });
 }

 //会议变更
 exportObj.custom3=function(formData, metaData,  vueData) {
    let _pk=metaData.parameters.pk;
    VueData.$router.push({
        path: "/commonForm/19102514345571GZEAKETYwxBNavEet?nodeId=88&pk="+_pk
    })
    //var url = DSF.getURLRoot() + 'ctrl/formControl/sysForm?moduleId=19102514345571GZEAKETYwxBNavEet&nodeId=88&pk=' + _pk;
    //var index = layer.load(0,{shade: [0.3]});
    //simpleWin(this, {"url": url, "isfresh": true});
}

 //确认变更
 exportObj.custom4=function(formData, metaData,  vueData) {
    let _pk=metaData.parameters.pk;
    dsf.http.post("fn/meetingapi/meeting/getOldUsers", {pk:_pk,type:"1"}).then(({data}) => {
        let result = data;
        console.log("result",JSON.stringify(result));
        let oldUserIds = result.message;
        
        vueData.saveNoTip(function (result) {
            dsf.http.post("fn/meetingapi/meeting/confirmChange", {pk:_pk,old:oldUserIds,type:"局外会议"}).then(({data}) => {
                let res = data;
                if (res.type == "success"){
                    dsf.layer.toast("会议变更成功!");
                }
            })
        });
    });
}

exportObj.custom5=function(formData, metaData,  vueData){//发布会议通知 校验
    let chr =  formData.main['c-meetingsq-013'].value;//参会人字段
    let chld = formData.main['c-meetingsq-027'].value;//参会领导
    let nodeId=metaData.parameters.nodeId;

    function mergeDept(formData, metaData,vueData) {
        //先把常列席部门和议题里的列席部门合并到备注（隐藏域）里
        if(formData.main.hasOwnProperty('c-meetingsq-043')){
            let clxbm = routerParam.main['c-meetingsq-043'].value;    //常列席部门
            let clxbm_text = clxbm.text || '';
            let clxbm_value = clxbm.value || '';
        
            let jylxbm_text =""; //议题里的建议列席部门
            let jylxbm_value = "";
            // $("div[x-metadata='C-MEETING-TOPIC-0014']").find(".x-data").each(function () {
            //     if (jylxbm_text != "") {
            //         jylxbm_text += ("," + $(this).val());
            //     } else {
            //         jylxbm_text += $(this).val();
            //     }
            // });
            // $("div[x-metadata='C-MEETING-TOPIC-0014']").find(".x-value").each(function () {
            //     if (jylxbm_value != "") {
            //         jylxbm_value += ("," + $(this).val());
            //     } else {
            //         jylxbm_value += $(this).val();
            //     }
            // });
            //把部门的text保存到隐藏域（用于在会议通知单上展示）
            let clxbm_arr = clxbm_text.split(",");
            let jylxbm_arr = jylxbm_text.split(",");
            clxbm_arr = clxbm_arr.concat(jylxbm_arr);   //合并数组
            let arr= new Set(clxbm_arr); //通过集合去重
            arr = Array.from(arr);    //集合转换回数组，得到了合并且去重的数组
            //DSF.setElementValueByKey("c-meetingsq-032", {value: arr.toString()});
            vueData.$set(formData.main,"c-meetingsq-032", {value: arr.toString()})
            //把部门的value保存到隐藏域（用于后期发送短信以及会议通知）
            let clxbm_val_arr = clxbm_value.split(",");
            let jylxbm_val_arr = jylxbm_value.split(",");
            clxbm_val_arr = clxbm_val_arr.concat(jylxbm_val_arr);
            arr= new Set(clxbm_val_arr);
            arr = Array.from(arr);
            vueData.$set(formData.main,"c-meetingsq-010", {value: arr.toString()})
        }
        //DSF.setElementValueByKey("c-meetingsq-010", {value: arr.toString()});
    }

    function publishMeetingNotice(formData, metaData,vueData,convertId){
        mergeDept(formData,metaData,vueData);
        vueData.saveNoTip(function (result) {
            let _pk=metaData.parameters.pk;
            dsf.http.post("fn/meetingapi/meeting/publishMeetingNotice", {pk:_pk,convertId:convertId}).then(({data}) => {
                let result=data;
                if (result.type == "success") {
                    dsf.layer.toast("发布会议通知成功!");
                    dsf.http.post("fn/jwj/getXxzxHy2", {pk:_pk}).then(({data}) => {
                        let result=data;
                        if (result.type == "success") {
                            
                        }
                    });
                } else {
                    var msg = "发布会议通知失败!";
                    if(result){
                        msg = result.message;
                    }
                    dsf.layer.toast(msg);
                }
            });
        });
    }
    //按钮操作: 发布会议通知
    function publishMeetingNotice2(formData, metaData,vueData,convertId){
        let _pk=metaData.parameters.pk;
        vueData.saveNoTip(function (result) {
            dsf.http.post("fn/meetingapi/meeting/publishMeetingNotice", {pk:_pk,convertId:convertId}).then(({data}) => {
                let res = data;
                if (res.type == "success"){
                    dsf.layer.toast("发布会议通知成功!");
                    //发布短信
                    dsf.http.post("fn/meetingapi/meeting/sendJuNeiMsg", {pk:_pk}).then(({data}) => {
                        let result=data;
                        if (result.type == "success") {
                            
                        }
                    });

                    dsf.http.post("fn/sql/autoFinish", {pk:_pk,tableName:"MEETINGSQ"}).then(({data}) => {
                        let result=data;
                        if (result.type == "success") {
                            dsf.layer.toast("办结成功!");
                        }
                    });
                    dsf.http.post("fn/jwj/getXxzxHy2", {pk:_pk}).then(({data}) => {
                        let result=data;
                        if (result.type == "success") {
                            
                        }
                    });
                }else{
                    dsf.layer.toast("发布会议通知失败!");
                }
            })
        });
    }

    if(chr!='' || chld != ''){
        if(nodeId == 0||nodeId == -2||nodeId == null||'J3evC3qotkoLP0c'==nodeId ){//拟稿发布会议通知之后直接办结
            publishMeetingNotice2(formData, metaData,vueData,'210225161108vLRQQ1axjZRQPbfNQ01');//发布会议通知
        }else{
            publishMeetingNotice(formData, metaData,vueData,'210225161108vLRQQ1axjZRQPbfNQ01');//发布会议通知
        }
    }else {
        dsf.layer.toast("请先选择参会领导或者参会人!");
    }
}

//取消会议
exportObj.custom6=function(formData, metaData,  vueData) {
    let _pk = metaData.parameters.pk;
    dsf.layer.confirm({
        message: '是否确认取消当前会议？',
        confirmButtonText: '确认'}, () => {
            dsf.http.post("fn/meetingapi/meeting/cancelMeeting", {pk:_pk}).then(({data}) => {
                let result=data;
                if (result.type == "success") {
                    dsf.layer.toast("会议取消成功!");
                    VueData.backSucces()
                }else{
                    dsf.layer.toast("会议取消失败!");
                }
            });
        }
    );
}
export default exportObj;