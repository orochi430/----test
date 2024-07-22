// 会议远程报名
const exportObj = {};
exportObj.initHandle = async function (formData, formStruct, vueData) {
  var viewBtn = formStruct.buttons.mainButtons.findIndex(
    (btn) => btn.action == "viewMeetingSign"
  ); //查看报名按钮按钮
  if (viewBtn>=0) {
    vueData.formButtons.mainButtons.splice(viewBtn, 1);
  }
  
  vueData.$bus.on("subFormTreeSelect", function (busObj) {
    console.log(busObj);
    busObj.selectArr.forEach((item, index) => {
      dsf.http
        .post("fn/meetingNotice/getUserDept", {
          userId: item.id,
          deptId: item.attrs.deptId,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.code == "200") {
            let data = res.data.data;
            vueData.$refs.formTab[0].$refs[busObj.subFormId][0].$refs.subform
              .addCard(false)
              .then((newData) => {
                JudgeList(newData, data);
              })
              .then(() => {
                RenderList();
              });
          }
        });
    });
  });

  function JudgeList(data, person) {
    //填充子表
    console.log(data);
    vueData.$set(data, "c-meetingchry-002", {
      value: person.userId,
      text: person.userName,
      schema: "1::" + person.deptId,
    }); //姓名
    vueData.$set(data, "c-meetingchry-004", {
      value: person.deptId,
      text: person.deptName,
      schema: "5::" + person.deptId,
    }); //部门
    vueData.$set(data, "c-meetingchry-0010", {
      value: person.userMobile,
    }); //联系方式
    vueData.$set(data, "B0001", {
      value: person.zw,
    }); //职务
  }
};

export default exportObj;
