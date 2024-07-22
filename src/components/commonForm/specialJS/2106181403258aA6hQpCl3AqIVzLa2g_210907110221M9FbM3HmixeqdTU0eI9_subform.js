// 会议室预定
import dsf from "../../../common";
import util from "@/common/util";
const exportObj = {};
exportObj.handle = function (formData, formStruct) {

}

function deepCopy(data) {
  return JSON.parse(JSON.stringify(data))
}

function checkShow(rows, controls, vueData) {
  // rows.forEach(element => {
  //   if (element["C-MEETINGBI-0010"].value == "-1") {
  //     vueData.$set(controls.find(item => item.metaId == "C-MEETINGBI-0007").privilege, "visible", 0)
  //   } else if(element["C-MEETINGBI-0015"].value == "1") {
  //     vueData.$set(controls.find(item => item.metaId == "C-MEETINGBI-0007").privilege, "visible", 1)
  //   }else{
  //     vueData.$set(controls.find(item => item.metaId == "C-MEETINGBI-0007").privilege, "visible", 0)
  //   }
  // });
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  console.log('新会议室预定子表');
  let k = "210618140913eyr1RCNdtl8vLddWR0q";
  if (!formData.subform||!formData.subform[k].length) {
    let pk = formStruct.parameters.pk;
    let nodeId = formStruct.parameters.nodeId;
    if (nodeId == "0" || nodeId == "-2") {
      let resource = {
        typeId: vueData.pformData.B0035.value,
        from: "hys"
      };
      dsf.http.post("fn/meetingResource/getResourceDataByType", resource).then(({
        data
      }) => {
        let result = data;
        if (result.type == "success") {
          var subformData = [];
          result.data.forEach(item => {
            subformData.push({
              "210618140913eyr1RCNdtl8vLddWR0q": {
                "foreign": pk,
                "value": ""
              },
              "C-MEETINGBI-0022": {
                "value": item.mc
              },
              "B0035": {
                "value": item.id
              },
              "C-MEETINGBI-0010": {
                "value": item.hcsfzyValue || "-1"
              },
              "action": "Added"
            });
          });
          let subformOldData = [];
          let subformDefaultData = JSON.parse(JSON.stringify(formStruct.subform[k].controls.find(item => item.metaId == k).defaultValue));
          if (subformData.length) {
            let postdata = {
              size: subformData.length,
              multiple: true
            };
            dsf.http.get("fn/common/generateUUID", postdata).then(({
              data
            }) => {
              let uuidArray = data.data.UUID;
              subformData.forEach((item, index) => {
                let newData = {}
                newData = deepCopy(subformDefaultData)
                newData[k].value = uuidArray[index]
                newData["C-MEETINGBI-0022"] = item["C-MEETINGBI-0022"];
                newData["C-MEETINGBI-0010"] = item["C-MEETINGBI-0010"];
                newData["B0035"] = item["B0035"];
                newData["action"] = item.action;
                subformOldData.push(newData);
              });
              vueData.$set(formData.multinfos[k], "rows", subformOldData)
              checkShow(formData.multinfos[k].rows, formStruct.subform[k].controls, vueData)
            })
          } else {
            vueData.$set(formData.multinfos[k], "rows", subformOldData)
            checkShow(formData.multinfos[k].rows, formStruct.subform[k].controls, vueData)
          }
        }
      })
    }
  } else {
    checkShow(formData.multinfos[k].rows, formStruct.subform[k].controls, vueData)
  }


  //复选框联动
  vueData.$bus.on("checkVal", function (busObj) {
    if (busObj.metaData.metaId == "C-MEETINGBI-0015") {
      // if (busObj.value=="1") {
      //   vueData.$set(formStruct.subform["210618140913eyr1RCNdtl8vLddWR0q"].controls.find(item => item.metaId == "C-MEETINGBI-0007").privilege, "visible", 1)
      // } else {
      //   vueData.$set(formStruct.subform["210618140913eyr1RCNdtl8vLddWR0q"].controls.find(item => item.metaId == "C-MEETINGBI-0007").privilege, "visible", 0)
      // }
    }
  })


}

//控件根据当前数据行来判断是否显示和隐藏
exportObj.checkShowByData = function (data) {
  if (data.ctr.metaId == "C-MEETINGBI-0007") {
    return data.item["C-MEETINGBI-0010"].value == 1 && data.item["C-MEETINGBI-0015"].value == "1"
  } else {
    return true
  }
}
export default exportObj;
