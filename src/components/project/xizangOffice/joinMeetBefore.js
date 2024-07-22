export let joinMeetBefore = ( query ) => {
  let joinMeet = function(query){
      // 加入会议
      $XYLink.execute(["joinMeeting", query], function(success) {
        console.log(4);
        if (!success.status) {
          dsf.layer.toast(`加入会议：${query.meetingNum}失败,${success.msg}`, false);
        }
        }, function (error) {
            console.log(error)
      });
  }
  console.log(1);
  // 验证
  $XYLink.execute(["getConnectStatus", {}], function(success) {
    console.log(2);
      if (!success.connected) {
        let userData = dsf.util.loadSessionStore("user");
        let param = {
          userName: userData.name,
          userId: userData.user_id,
          userData: [{ user: userData }, { loginToken: dsf.util.loadSessionStore("loginToken") }]
        };
        // 注册
        $XYLink.execute(["loginById", param], function(success) { 
            console.log(3);
            joinMeet(query)
          },
          function(error) {
            console.log(error);
          }
        );
      } else{
        joinMeet(query)
      }
      
    },
    function(error) {
      console.log(JSON.stringify(error));
      alert(JSON.stringify(error));
    });
};

