const exportObj = {};
exportObj.initHandle = function (formData, formStruct, vueData) {
  dsf.http
    .post("/fn/conferenceMobile/getSeatNumber", {
      pk: vueData.formData.main["A0001"].value,
    })
    .then((res) => {
      //{"code":"200","type":"success","message":"","metadata":null,"token":"","data":"5排3座","serverTime":"2023-10-09 18:32:42"}
      if (res.code = '200') {
        vueData.$set(vueData.formData.main, "C-HWXT-SERVE-CALL-0001", {
          value: res.data,
        });
      }
    });
}

exportObj.HistoricalCall = function (formData, formStruct, vueData) {
  //历史服务
  console.log(vueData);
  vueData.$router.push({
    path: `/commonList/230926163417A2vDZXKMHusuS9N3udk/2309261533084McuxrMrlgFwifxwlxT?fid=${vueData.$route.query.fid}`
  });
};

export default exportObj;
