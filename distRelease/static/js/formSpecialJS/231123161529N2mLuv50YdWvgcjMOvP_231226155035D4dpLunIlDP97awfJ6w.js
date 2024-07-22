(function () {
	// 基层请示
	const exportObj = {};
	exportObj.saveFilter = function (formData, formStruct, vueData, action) {
    console.log(vueData);
    return new Promise(function (resolve, reject) {
      if (
        (vueData.nowButton?.name == "送部门办理" || vueData.nowButton?.name == "发送") &&
        !formData.main["240307174634eQ5qWhMOpjcT47uB4Ig"].value
      ) {
        reject("请填写主办部门");
      } else {
        resolve();
      }
    });
  };

  exportObj.increaseXbBm = function (formData, formStruct, VueData) {
    VueData.showPerson = true;
    VueData.extra = {
      typesString: "person,department,post,group,privateGroup",
      rootObject: "2",
      multiple: true,
      tabs: [
        {
          key: "self_org",
          action: `fn/user/select/data?types=person&rootObject=2&action=self_org&async=true`,
          urlParams: {},
        },
      ],
    };
    // 重写选人确认后的getSelectUser方法，调用接口
    VueData.getSelectUser = function (data) {
      console.log(data);
      let id = "";
      let name = "";
      let deptId = "";
      let deptName = "";
      let deptSchema = "";
      data.forEach((ele, i) => {
        i == 0 ? (id += ele.id) : (id += "," + ele.id);
        // i == 0 ? (name += ele.name) : (name += "," + ele.name);
      });
      dsf.http
      .post("ctrl/correctionsSw/queryReadDept", {
        userIds: id,
      })
      .then((res) => {
        console.log(res.data.data);
        if (res.data.code == "200") {
          res.data.data.forEach((item, i) => {
            if (!deptId.includes(item.dept_id)) {
              let index = i + 1;
              i == 0 ? (deptId += item.dept_id) : (deptId += "," + item.dept_id);
              i == 0 ? (deptName += item.org_name) : (deptName += "," + item.org_name);
              i == 0 ? (deptSchema += index + '::' + item.dept_id) : (deptSchema += "," + index + '::' + item.dept_id);
            }
          })
          ZFfunc()
        }
      })

      let ZFfunc = function () {
        dsf.http
        .post("ctrl/basicRequest/exSend", {
          deptIdY : formData.main['231214162545ggpklhUnXWQv89HOi0z'].value,
          deptNameY : formData.main['231214162545ggpklhUnXWQv89HOi0z'].text,
          deptSchemaY : formData.main['231214162545ggpklhUnXWQv89HOi0z'].schema,
          deptId : deptId,
          deptName : deptName,
          deptSchema : deptSchema,
          pk : formData.main["A0001"].value,
          userIds: id
        }).then((res) => {
          console.log(res);
          if (res.data.code === "200") {
            dsf.layer.toast('增发成功');
            VueData.init()
          }else{
            dsf.layer.toast(res.data.message);
          }
        });
        VueData.showPerson = false;
      };
      }
  }

	window.spJS = exportObj;
})();
