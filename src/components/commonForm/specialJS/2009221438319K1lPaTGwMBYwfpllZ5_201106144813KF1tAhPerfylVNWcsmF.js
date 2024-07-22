// 督办任务--类别转换
import dsf from "../../../common";
import util from "@/common/util";
const exportObj = {};
exportObj.handle = function (formData, formStruct) {
    //根据表单数据变化，改变其他控件值
    /* if (formData.main["c-meetingtz-002"].text == "部级会议") {
        formData.main["c-meetingtz-006"].value = formData.main["c-meetingtz-002"].text;
    } */
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  // formData.main["B0035"]={value:"",text:""}
  // if(vueData.$route.query.dbmc){
  //   formData.main["B0001"].value=vueData.$route.query.dbmc
  //   formData.main["B0004"].value=vueData.$route.query.rwbh
  //   formData.main["A0003"].value=vueData.$route.query.rwzj
  //   vueData.$set(formData.main,"C-DB-FK-0023",{
  //     value:vueData.$route.query.rwlxValue,
  //     text:vueData.$route.query.rwlx,
  //   })
  //   vueData.$set(formData.main,"B0035",{
  //     value:vueData.$route.query.rwmsId,
  //   })
  //   vueData.$set(formData.main,"C-DB-FK-0035",vueData.$route.query.sjzrr)
  //   vueData.$set(formData.main,"C-DB-FK-0037",vueData.$route.query.zrr)
  // }
  if(vueData.$route.query.fkStatus>0){
    console.log(formStruct)
  }
}

export default exportObj;