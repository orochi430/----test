// 会议请假单
import dsf from "../../../common";
const exportObj = {};

function changeByQjsy(vueData) {
  var qjsy = vueData.formData.main["C-LEAVE-0001"].value; //请假事由
  var yyTr = vueData.formMeta.controls.find(itemtab => itemtab.metaId == "C-LEAVE-0011"); //请假原因
  var fjTr = vueData.formTabs.find(itemtab => itemtab.name == "relevantFile"); //附件tab页
  let controlData = vueData.$refs.formTab[0].$refs["C-LEAVE-0011"][0].$refs.control.controlData;
  switch (qjsy) {
    case "1": //挂职锻炼
      vueData.$set(vueData.formData.main["C-LEAVE-0011"], "value", "")
      controlData.placeholder = "请输入";
      yyTr.show = 0;
      if (fjTr) {
        fjTr.enable = false;
      }
      break;
    case "5": //病假
      controlData.placeholder = "请说明具体事由";
      yyTr.show = 1;
      if (fjTr) {
        fjTr.enable = false;
      }
      break;
    case "10": //外出开会
      controlData.placeholder = "请说明会议地点及会议名称";
      yyTr.show = 1;
      if (fjTr) {
        fjTr.enable = true;
      } else {
        vueData.formTabs.push({
          name: "relevantFile",
          title: "相关文件",
          enable: true
        });
      }
      break;
    case "15": //校内讲课
      controlData.placeholder = "请说明班次名称";
      yyTr.show = 1;
      if (fjTr) {
        fjTr.enable = false;
      }
      break;
    case "20": //校外讲课
      controlData.placeholder = "请说明上课地点及班次名称";
      yyTr.show = 1;
      if (fjTr) {
        fjTr.enable = false;
      }
      break;
    case "25": //校外调研
      controlData.placeholder = "请说明调研地点及内容";
      yyTr.show = 1;
      if (fjTr) {
        fjTr.enable = false;
      }
      break;
    case "30": //事假
      controlData.placeholder = "请说明具体事由";
      yyTr.show = 1;
      if (fjTr) {
        fjTr.enable = false;
      }
      break;
    case "35": //其他
      controlData.placeholder = "请说明其他事由";
      yyTr.show = 1;
      if (fjTr) {
        fjTr.enable = false;
      }
      break;
    default:
      vueData.$set(vueData.formData.main["C-LEAVE-0011"], "value", "")
      controlData.placeholder = "请输入";
      yyTr.show = 0;
      if (fjTr) {
        fjTr.enable = false;
      }
      break;
  }
}
exportObj.handle = function (formData, formStruct) {}
exportObj.initHandle = function (formData, formStruct, vueData) {
  console.log("会议请假单", formData, formStruct, vueData)
  var masterid = vueData.$route.query.masterid;
  var hymc = vueData.$route.query.bt;
  var kssj = vueData.$route.query.kssj;
  if (masterid) {
    vueData.$set(vueData.formData.main["B0035"], "value", masterid)
    vueData.$set(vueData.formData.main["B0001"], "value", hymc)
    vueData.$set(vueData.formData.main["C-LEAVE-0002"], "value", kssj)
  }

  //监控表单控件值变化，改变其他控件值
  vueData.$watch(function () {
    return formData.main["C-LEAVE-0001"];
  }, function (newValue, oldValue) {
    //alert(newValue)
    changeByQjsy(vueData);
  }, {
    deep: true
  });
  changeByQjsy(vueData);
}
exportObj.saveFilter = function (formData, formStruct, vueData, action) {
  return new Promise(function (resolve, reject) {

    var qjsy = vueData.formData.main["C-LEAVE-0001"].value; //请假事由
    if (qjsy != "10") {
      resolve()
    }
		let allFile = vueData.$refs.relevantFile[0].$refs.enclosure.allFile || null;
		if(allFile&&allFile.length){
			resolve();
		}
    let params = {
      info_id: vueData.pk, // 文件id
      infoId: vueData.pk, // 文件id
      moduleId: vueData.moduleId, // 模块id
      nodeId: formStruct.parameters.nodeId, // 流程节点id
      start: 0, // 开始页码
      limit: 10, // 每页条数
      flowId: formStruct.parameters.flowId,
    };
    dsf.http.post("fn/mobileAttachment/getFormAttachment", params).then(res => {
      let attachcount = 0;
      res.data.rows.forEach(element => {
        if (element.document && element.document.length > 0) {
          attachcount++
        }
      });
      if (attachcount > 0) {
        resolve()
      } else {
        reject("请上传附件")
      }
    }).error(err => {
      console.log(err)
      reject("获取附件异常")
    })
  })
}


export default exportObj;
