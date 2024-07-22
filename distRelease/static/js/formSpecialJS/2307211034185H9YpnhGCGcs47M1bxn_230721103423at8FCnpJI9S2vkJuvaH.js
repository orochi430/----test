// 单点通知补发
(function () {
  const exportObj = {};

  exportObj.initHandle = function (formData, formStruct, vueData) {
    dsf.http
          .post("/ctrl/meetingRemote/getSingleMeetingNotice", {
            pk: vueData.$route.query.fid,
          })
          .then((res) => {
            console.log(res);
            if (res.status == '200') {
                let data = res.data.data
                vueData.$set(formData.main, "c-meetingsqbg-001", {
                    value: data.bt,
                });
                vueData.$set(formData.main, "B0001", {
                    value: data.bt + "补发",
                }); 
                vueData.$set(formData.main, "c-meetingsqbg-027", {
                    value: data.cxUnit,
                    text: data.cxunitText,
                    schema: data.cxUnitSchema,
                }); //原出席单位
                vueData.$set(formData.main, "c-meetingsqbg-028", {
                    value: data.cxUnit,
                    text: data.cxunitText,
                    schema: data.cxUnitSchema,
                }); //现出席单位
            }
          });
}

exportObj.saveFilter = function (formData, formStruct, vueData, action) {
  return new Promise(function (resolve, reject) {
    dsf.layer.toast(`补发成功`, ()=>{ resolve();});
    
  });
  
}
  window.spJS = exportObj;
})()