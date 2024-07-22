import dsf from "../../../common";
// 会议议题征询单--jf

// 会议议题征询单
const exportObj = {};
exportObj.handle = function (formData, formStruct) {};
exportObj.initHandle = function (formData, formStruct, vueData) {
  vueData.$bus.on("checkVal", function (busObj) {
    console.log(busObj);
    if (busObj.metaData.metaId == "C-MEETINGAGENDA-0012") {
      vueData.$set(
        formData.main["B0001"],
        "value",
        `关于${busObj.text}的议题征询单`
      );
    }
  });

  vueData.$bus.on("selectUserBus", function (busObj) {
    console.log(busObj);
    if (busObj.metaData.metaId == "C-MEETINGAGENDA-004") {
      vueData.$set(
        formData.main["C-MEETINGAGENDA-008"],
        "value",
        busObj.selectArr.length
      );
    }
    if (busObj.metaData.metaId == "C-MEETINGAGENDA-0013") {
      vueData.$set(
        formData.main["C-MEETINGAGENDA-0014"],
        "value",
        busObj.selectArr.length
      );
    }
  });

  vueData.$watch(
    function () {
      return vueData.formData.main["C-MEETINGAGENDA-0014"].value;
    },
    function (n, o) {
      vueData.$set(
        formData.main["C-MEETINGAGENDA-0015"],
        "value",
        Number(formData.main["C-MEETINGAGENDA-008"].value || 0) +
          Number(formData.main["C-MEETINGAGENDA-0014"].value || 0)
      );
    },
    {
      deep: true,
      immediate: true,
    }
  );

  vueData.$watch(
    function () {
      return vueData.formData.main["C-MEETINGAGENDA-008"].value;
    },
    function (n, o) {
      vueData.$set(
        formData.main["C-MEETINGAGENDA-0015"],
        "value",
        Number(formData.main["C-MEETINGAGENDA-008"].value || 0) +
          Number(formData.main["C-MEETINGAGENDA-0014"].value || 0)
      );
    },
    {
      deep: true,
      immediate: true,
    }
  );
};

export default exportObj;
