// 中共徐州市委党校迁建工程智慧校园平台软件】工作台-因私出国 模块

const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {
  // 获取当前用户的标识
  let userId = dsf.util.loadSessionStore("user");
  console.log(formData.main["B0009"].value);
  console.log(userId);
  // 发送请求通过用户标识获取用户信息
  dsf.http
    .post(`/ctrl/getInformation/queryUser?ids=${userId.user_id}`)
    .then((res) => {
      if (res.data.code == 200) {
        let result = res.data.data;
        // 性别
        vueData.$set(vueData.formData.main, "B0051", {
          text: result[0].sexText,
          value: result[0].sex,
        });
        // 职务
        vueData.$set(vueData.formData.main, "B0036", {
          value: result[0].unitRankText,
        });
      }
    });
};
export default exportObj;
