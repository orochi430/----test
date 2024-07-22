/**
 * 局签报
 */
 const exportObj = {};
 exportObj.initHandle = function (formData, formStruct, vueData) {
    console.log(vueData.formData)
    console.log("1");
    //todo
    let nodeId=formStruct.parameters.nodeId;
    if (nodeId==50||nodeId==51){
        //$(".dbbl").show();
    }

    let dbsj = formData.main["B0022"].value; //判断督办办理时间是否为空
    if(dbsj!=""){
        //$("#nc9AnlcNLedE9m8b").show();
    }else{
        //$("#nc9AnlcNLedE9m8b").hide();
    }
    let sfdb = formData.main["C-QB-0001"].value;
    if(sfdb=="1"){
        // $("#GSko035MnDlcYhBb").show();
        // $("#KiAuGAkcwhoJpVZ4").show();
    }else{
        // $("#GSko035MnDlcYhBb").hide();
        // $("#KiAuGAkcwhoJpVZ4").hide();
    }
    //noVerifyNodeId=",fwimU3y4u829mxW,IgdvJNqqfTSZp1x,UdbiVa64rL30GW6,feFxBLy0kt4dXSL,";

    dsf.http.post("fn/fws/showyj", {pk:formStruct.parameters.pk}).then(({data}) => {
      let result = data;
      console.log("result",JSON.stringify(result));
      if (result.type == "success") {
        if(result.html){
            // $("#8Afuz8A13jynMu4X").html('<label class="ds_label" handler="context" for="riKOjBW13hvpGP4Z">意见：</label>');
            // $('#PRGZyMAXCjZ87LnP').append('<div id="fwyj" style="padding-top: 40px;font-size: 18px;font-weight: 540;line-height: initial;">'+result.html+'</div>');
            // $("#OZ0d6mpqpblqTQ1K").hide();
            // $("#4lL4UIMbOdaT1iqj").hide();
            // $("#48imT4RTqE7nIoYQ").hide();
        }
      }
    });
}

 //等价于saveFilter <=> saveBefore
 exportObj.saveFilter = function (formData, formStruct, vueData) {
   function getTag(array,index){
      var resultArray=[];
      for(var i=index;i>0;i--){
          var obj = array[i];
          if(obj.type==3){
              resultArray.push(obj);
          }else if(obj.type==2){
              return resultArray ;
          }
      }
      return resultArray;
  
   }
   function getIndex(array,str){
      for(var i=0;i<array.length;i++){
          var obj = array[i];
          if(obj.tagName==str){
              return i;
          }
      }
      return -1;
   }
   //处理会签保存部门
   function beforeSaveOpinionTag(array,formData,vueData) {
      if ("FwV9UCL6Ej3PhPg"==formStruct.parameters.nodeId || "fwimU3y4u829mxW"==formStruct.parameters.nodeId|| "-2"==formStruct.parameters.nodeId){
          var tags=["阅核","阅研","阅处","审阅","审签","核","会核","核提意见"];
          for (var i=0;i<tags.length;i++) {
              var index = getIndex(array, tags[i]) - 1;
              if (index > 0) {
                  var resultArray = getTag(array, index);
                  if (resultArray == null) {
                      layuiError("无法识别会签部门，请检查意见语式");
                      return false;
                  } else if (resultArray.length > 0) {
                      var id = '';
                      var idtext = '';
                      let zbbm = '';
                      if ("fwimU3y4u829mxW" ===formStruct.parameters.nodeId) {
                          //zbbm = DSF.getElementValueByKey("C-QB-0003");
                          zbbm=formData.main["C-QB-0003"].value;
                          //vueData.$set(vueData.formData.main,"C-QB-0003", {value: "0"})
                      }
                      let deptIdArray=[];
                      for (var i = 0; i < resultArray.length; i++) {
                          if (zbbm != resultArray[i].id) {
                              deptIdArray.push(resultArray[i].id);
                              id += ("," + resultArray[i].id);
                              idtext += ("," + resultArray[i].tagName);
                          }
                      }
                      var obj = {"value": id.substr(1), "text": idtext.substr(1), schema: "1:" + id.substr(1)};
                      //DSF.setElementValueByKey("C-QB-0010", obj);
                      vueData.$set(vueData.formData.main,"C-QB-0010",obj)
                      //var deptIds=DSF.getElementValueByKey("C-QB-0010");
                      var deptIds=deptIdArray.join(",");
                      var param = {"pk":formStruct.parameters.pk,"deptIds":deptIds};
                      //DSF.Utils.ajaxRequest("ctrl/rsrm/getSyncById", param, function (result) {});
                      dsf.http.post("fn/rsrm/getSyncById", param).then(({data}) => {
                        let result = data;
                        console.log("result",JSON.stringify(result));
                        if (result.type == "success") {
                        }
                      });
                      return true;
                  }
              }
          }
      }
      return true;
   }

    return new Promise(function (resolve, reject) {
        ///todo
        let inputTagArray=JSON.parse(formData.flowinfo[`flow-${formStruct.parameters.pk}-${formStruct.parameters.pId || '0'}-${formStruct.parameters.pnId || formStruct.parameters.pk}`].opinionContentTag);
        beforeSaveOpinionTag(inputTagArray,formData,vueData)
        resolve()
        //reject();;
   })
}

 //局签报-列入待办
 exportObj["jqb.lrdb"]=(routerParam, metaData, formData, VueData, refs)=>{
 //'jqb.lrdb'(routerParam, metaData, formData, VueData, refs) {
   function AddDate(date,addDays){
     var Dates = new Date(date);
     Dates.setDate(parseInt(Dates.getDate()) + parseInt(addDays));
     var mon = parseInt(Dates.getMonth()) + parseInt(1),
         day = Dates.getDate();
     if(mon < 10){
         mon = "0" + mon;//月份小于10，在前面补充0
     }
     if(day < 10){
         day = "0" + day;//日小于10，在前面补充0
     }
     return Dates.getFullYear() + "-" + mon + "-" +day;
   }
   var pk=metaData.parameters.pk;
   var type="局领导批示";
   var num=100;
   let postData={id: pk,type:type,num:num,moduleId:"191017161345R6Q0lOvlCxxziL9ctrB",depId:formData.main["C-QB-0003"].value};
   let self=this;
   dsf.http.post('fn/supervise/updateSetIsDB', postData).then(res => {
     if (result.type == "success") {
         
        //列为督办成功，写入数据督办办理时间
        var swrq = formData.main["B0013"].value;
        var otime = AddDate(swrq, +14);
        //DSF.setElementValueByKey("B0022", {value: otime});
        vueData.$set(vueData.formData.main,"B0022", {value: otime})
        dsf.layer.toast("操作成功！");
        self.save(routerParam, metaData, formData, VueData, refs, null, false)
        //VueData.backSucces()
     }
   })

   
   // layuiOk("操作成功！", function () {
   //  DSF.Utils.ajaxSyncRequest("ctrl/supervise/updateSetIsDB", {id: pk,type:type,num:num,moduleId:"191017161345R6Q0lOvlCxxziL9ctrB",depId:DSF.getElementValueByKey("C-QB-0003")}, function (result) {
   //             if (result.type == "success") {
   //               //列为督办成功，写入数据督办办理时间
   //                 var swrq = DSF.getElementValueByKey("B0013");
   //                 var otime = AddDate(swrq, +14);
   //                 DSF.setElementValueByKey("B0022", {value: otime});

   //             }
   //         });
   //     top.openViewWindow.closeWinView({reloadGrid :"1"});
   //     window.parent.location.reload();
   // }, 2000);
}
 //局签报-办结
 exportObj["jqb.banjie"]=(routerParam, metaData, formData, VueData, refs)=>{
   var did=metaData.parameters.did;
   var info_id=metaData.parameters.pk;
   dsf.layer.confirm({
     message: '请确认是否办结？',
     confirmButtonText: '确认'}, () => {
       dsf.http.post('fn/shareRead/readedIds', {"infoIds":info_id,"distribIds" : did}).then(res => {
         if ("success" == res.type) {
           dsf.http.post('fn/supervise/cancelDisplay', {"infoId":info_id,"distribIds" : did}).then(res => {
             if ("success" == res.type) {
             }
           })
           dsf.layer.toast("办结成功");
           VueData.backSucces()
         }else{
           dsf.layer.toast("办结失败");
         }
       })
     })

   // var did=DSF.getURLParam("did");
   // var info_id=DSF.getURLParam("pk");
   // layuiConfirm("请确认是否办结？", function () {
   //     DSF.Utils.ajaxRequest("ctrl/shareRead/readedIds", {"infoIds":info_id,"distribIds" : did}, function (result) {
   //         if ("success" == result.type) {

   //             DSF.Utils.ajaxRequest("ctrl/supervise/cancelDisplay", {"infoId":info_id}, function (result) {
   //                 if ("success" == result.type) {

   //                 }
   //             })
   //             layuiOk("办结成功",function () {
   //                 top.openViewWindow.location.reload();
   //                 top.openViewWindow.closeWinView({reloadGrid :"1"});
   //             },2000);
   //         } else {
   //             layuiError("办结失败");
   //         }
   //     });
   // });

}

 //局签报-列入督办
 exportObj.setDuban=function(formData, formStruct, vueData) {
let today = new Date()
let selectdate =today.getFullYear()+"-"+(today.getMonth()+1)+"-"+(today.getDate()+14)
 vueData.$refs.calenderSelect.show = true
 vueData.$refs.calenderSelect.confirmCallBack= function (date) {
      let pk = vueData.formMeta.parameters.pk
      let moduleId = "191017161345R6Q0lOvlCxxziL9ctrB"
      selectdate = dsf.date.format(date,'yyyy-mm-dd')
      dsf.http.post("fn/supervise/updateSetIsDB",{id:pk,type: "局领导批示", num:100,moduleId:moduleId,depId:formData.main["C-QB-0003"].value, dbqx:selectdate}).then((res)=>{
            console.log(res.data.type);
            if (res.data.type === "success") {
              dsf.layer.toast("操作成功","",()=>{
                vueData.$router.go(-1)
              })
            }
     })  
 }
}

//局签报-特殊办结
exportObj.delGatherPlan=function(formData, formStruct, vueData) {
   let pk = vueData.formMeta.parameters.pk
   dsf.layer.confirm({
    message:"请确认是否办结？",
    confirmButtonText:"是",
    cancelButtonText:"否",
   },
   ()=>{
    dsf.http.post("ctrl/shareRead/readedIds",{"infoIds":pk,"distribIds" : " "}).then((res)=>{
      if (res.data.type === "success") {
        dsf.http.post("ctrl/supervise/cancelDisplay",{"infoId":pk}).then(()=>{})
        dsf.layer.toast("办结成功","",()=>{
          vueData.$router.go(-1)
        })
      } else {
        dsf.layer.toast("办结失败")
      }
    })
   },
   ()=>{

   })
}

//局签报-督办办结
exportObj.dbbj=function (formData, formStruct, vueData) {
  let count = 0
  let pk = vueData.formMeta.parameters.pk
  let moduleId = vueData.formMeta.parameters.moduleId
  let Success = function (p,m) {
    dsf.http.post("fn/priority/changeStatus",{pk: p,moduleId: m}).then((res)=>{
      if (res.data.type === "success") {
        dsf.layer.toast("办结成功","",()=>{
          vueData.$router.go(-1)
        })
      }
    })
    
  }
  dsf.http.post("fn/supervise/queryBlqk",{id: pk}).then((res)=>{
        count = res.data.data.count
        if (count>0) {
          vueData.buttonHandle['saveNoTip'](
            vueData.$route.params,
            vueData.formMeta,
            vueData.formData,
            vueData,
            vueData.$refs,
            Success(pk,moduleId)
          )
        } else {
          dsf.layer.toast("请填写督办办理结果")
        }
  })
}

//保存之后
exportObj.saveAfter=function(vueData,formData, formStruct){
  let nodeId = vueData.formMeta.parameters.nodeId
  let pk = vueData.formMeta.parameters.pk
  if (nodeId == "50") {
    dsf.http.post("ctrl/supervise/saveStatus",{id : pk}).then((res)=>{
    vueData.$router.go(0)
  })
  }
  if (nodeId==""||nodeId=="0") {
    dsf.http.post("ctrl/supervise/updateFileNameByBT",{pk : pk , nrType : 0})
  }
  dsf.layer.toast("保存成功")
}

export default exportObj;