/**
 * 上海地产跟进记录表单
 */
import dsf from "../../../common";
const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {

  if (vueData.$route.query.fid) {
    vueData.$set(vueData.formData.main, "B0035", {
      value: vueData.$route.query.fid
    })
  }
  //初始化表单数据
  if (!vueData.pk) {
    dsf.http.post("fn/CustomerLeadInfoController/selectCustomerLeadInformationById", { pk: vueData.$route.query.fid }).then((res) => {
      if (res.data.type === 'success') {
        let result = res.data.data;
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-009", {
          value: result["C-RQ-SPACE-REQUIREMENT-009_value"],
          text: result["C-RQ-SPACE-REQUIREMENT-009_text"]
        });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-058", { value: result['C-RQ-SPACE-REQUIREMENT-058_value'] });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-059", { value: result['C-RQ-SPACE-REQUIREMENT-059_value'] });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-060", {
          value: result['C-RQ-SPACE-REQUIREMENT-060_value'],
          text: result["C-RQ-SPACE-REQUIREMENT-060_text"]
        });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-002", { value: result['C-RQ-SPACE-REQUIREMENT-002_value'] });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-006", {
          value: result['C-RQ-SPACE-REQUIREMENT-006_value'],
          text: result["C-RQ-SPACE-REQUIREMENT-006_text"]
        });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-061", {
          value: result['C-RQ-SPACE-REQUIREMENT-061_value'],
          text: result["C-RQ-SPACE-REQUIREMENT-061_text"]
        });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-063", { value: result['C-RQ-SPACE-REQUIREMENT-063_value'] });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-018", { value: result['C-RQ-SPACE-REQUIREMENT-018_value'] });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-041", {
          value: result['C-RQ-SPACE-REQUIREMENT-041_value'],
          text: result["C-RQ-SPACE-REQUIREMENT-041_text"]
        });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-014", { value: result['C-RQ-SPACE-REQUIREMENT-014_value'] });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-043", { value: result['C-RQ-SPACE-REQUIREMENT-043_value'] });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-044", { value: result['C-RQ-SPACE-REQUIREMENT-044_value'] });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-034", { value: result['C-RQ-SPACE-REQUIREMENT-034_value'] });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-035", {
          value: result['C-RQ-SPACE-REQUIREMENT-035_value'],
          text: result["C-RQ-SPACE-REQUIREMENT-035_text"]
        });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-005", {
          value: result['C-RQ-SPACE-REQUIREMENT-005_value'],
          text: result["C-RQ-SPACE-REQUIREMENT-005_text"]
        });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-045", {
          value: result['C-RQ-SPACE-REQUIREMENT-045_value'],
          text: result["C-RQ-SPACE-REQUIREMENT-045_text"]
        });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-046", {
          value: result['C-RQ-SPACE-REQUIREMENT-046_value'],
          text: result["C-RQ-SPACE-REQUIREMENT-046_text"]
        });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-047", {
          value: result['C-RQ-SPACE-REQUIREMENT-047_value'],
          text: result["C-RQ-SPACE-REQUIREMENT-047_text"]
        });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-019", { value: result['C-RQ-SPACE-REQUIREMENT-019_value'] });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-020", { value: result['C-RQ-SPACE-REQUIREMENT-020_value'] });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-064", {
          value: result['C-RQ-SPACE-REQUIREMENT-064_value'],
          text: result["C-RQ-SPACE-REQUIREMENT-064_text"]
        });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-065", { value: result['C-RQ-SPACE-REQUIREMENT-065_value'] });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-066", { value: result['C-RQ-SPACE-REQUIREMENT-066_value'] });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-067", { value: result['C-RQ-SPACE-REQUIREMENT-067_value'] });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-015", {
          value: result['C-RQ-SPACE-REQUIREMENT-015_value'],
          text: result["C-RQ-SPACE-REQUIREMENT-015_text"]
        });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-016", { value: result['C-RQ-SPACE-REQUIREMENT-016_value'] });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-017", { value: result['C-RQ-SPACE-REQUIREMENT-017_value'] });

      }
    })
  }

}


exportObj.saveFilter = function (formData, formStruct, vueData) {
  return new Promise(function (resolve, reject) {
    try {
      resolve()
    } catch (error) {
      resolve()
    }
  })
}



export default exportObj;
