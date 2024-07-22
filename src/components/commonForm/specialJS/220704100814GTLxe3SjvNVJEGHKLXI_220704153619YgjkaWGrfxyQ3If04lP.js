// 中共徐州市委党校迁建工程智慧校园平台软件】工作台-离退休管理 模块
const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {
  vueData.$bus.on("selectUserBus", function (userArr) {
    // 发送请求通过用户标识获取用户信息
    dsf.http
      .post(`/ctrl/getInformation/queryUser?ids=${userArr.value}`)
      .then((res) => {
        if (res.data.code == 200) {
          let result = res.data.data;
          // 性别
          vueData.$set(vueData.formData.main, "C-ERP-PERSONINFO-0002", {
            text: result[0].sexText,
            value: result[0].sex
          });
          // 年龄
          vueData.$set(vueData.formData.main, "B0020", {
            value: result[0].age
          });
          // 部门
          vueData.$set(vueData.formData.main, "B0010", {
            value: result[0].orgName
          });
        }
      });
  });
};
export default exportObj;
