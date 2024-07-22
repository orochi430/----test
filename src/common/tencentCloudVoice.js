const tencentCloudVoice = {
  tallLogin() {
    let userId = dsf.util.loadSessionStore("user").user_id;
    dsf.http.post(`/fn/terminal/thirdPart/getUserSig?userId=${userId}`).then(({ data }) => {
      console.log("usersig" + data.data);
      let params = {
        appId: "1400602791",
        userId,
        userSig: data.data
      };
      console.log("tallLogin参数", params);
      $TCall.login(
        params,
        function(success) {
          console.log("success", JSON.stringify(success));
        },
        function(error) {
          alert(error);
        }
      );
    });
  }
};
export default tencentCloudVoice;
