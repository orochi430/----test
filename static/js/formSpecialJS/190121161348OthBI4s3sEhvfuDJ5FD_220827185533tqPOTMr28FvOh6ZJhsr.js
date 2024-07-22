// 会议通知

(function () {
  const exportObj = {};
  exportObj.initHandle = function (formData, formStruct, vueData) {
    console.log("会议通知16节点");
  
    //在初始化的时候判断有没有会议议题， 有的话就添加一个会议议题的tab
    dsf.http
      .post("/fn/meetingNotice/getTopic", {
        pk: vueData.formData.main["A0001"].value,
      })
      .then((res) => {
        console.log(res);
        if (res.data.code == 200 && res.data.data.length > 0) {
          console.log(vueData.formTabs);
          vueData.formTabs.push({
            enable: true,
            name: "meettingTopic",
            title: "会议议题",
          });
        } else {
          //
        }
      });
  
    if (
      formStruct.parameters.nodeId != 0 &&
      formStruct.parameters.nodeId != "-2" &&
      !formData.main["B0003"].value
    ) {
      let obj = ["会议届次"];
      formStruct.controls.forEach((item) => {
        obj.includes(item.label) ? (item.show = 0) : "";
      });
    }
  
    // //判断如果不需要报名反馈的话就不要出现转交按钮了  个人通知单也不需要转交按钮
    if (
      formData.main["c-meetingtz-016"].value == -1 &&
      vueData.$route.query.noticeType == 1
    ) {
      let signBtnIndex = vueData.formButtons.mainButtons.findIndex(
        (button) => button.name == "转交"
      );
      if (signBtnIndex >= 0) {
        vueData.formButtons.mainButtons.splice(signBtnIndex, 1);
      }
    }
    let Obj = [
      "出席领导",
      "列席领导",
      "出席部门",
      "列席部门",
      "出席单位",
      "出席人员",
      "列席人员",
      "特邀人员",
      "外单位人员",
      "列席单位",
      "工作人员",
    ];
    Obj.forEach((ele) => {
      formStruct.controls.forEach((item) => {
        if (item.label == ele) {
          item.show = 0;
        }
      });
    });
    dsf.http
      .post("/fn/meetingType/getMeetingType", {
        meetingTypeId: formData.main["c-meetingtz-004"].value,
      })
      .then((res) => {
        if (res.data.code == 200 && res.data.data) {
          console.log(res);
          let data = res.data.data;
          if (data.chdxText) {
            let Arr = data.chdxText.split(",");
            Arr.forEach((ele) => {
              formStruct.controls.forEach((item) => {
                if (item.label == ele) {
                  item.show = 1;
                }
              });
              if (ele == "出席部门") {
                formStruct.controls.forEach((item) => {
                  if (item.label == "通知部门") {
                    item.show = 1;
                  }
                });
              }
            });
          }
        }
      });
    // //参会领导的通知单不需要出现报名按钮
    let person = dsf.util.loadLocalStore("user");
    if (
      formData.main["c-meetingtz-049"].value.indexOf(person.user_id) >= 0 &&
      vueData.$route.query.noticeType != 2
    ) {
      let signBtnIndex = vueData.formButtons.mainButtons.findIndex(
        (button) => button.name == "报名"
      );
      if (signBtnIndex >= 0) {
        vueData.formButtons.mainButtons.splice(signBtnIndex, 1);
      }
    }
  };

  exportObj.viewMeetingSign = function (formData, formStruct, vueData) {
    vueData.$router.push({
      path: `/commonForm/${vueData.$route.query.signUpModuleId}/${vueData.$route.query.signUpPk}?listId=MeetingBmList&method=viewBmb&validateByList=1&tzlx=${vueData.$route.query.hyTzlx}`,
    });
  };

  window.spJS = exportObj;
})()
