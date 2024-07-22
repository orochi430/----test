// 校委会表单
const exportObj = {};

exportObj.handle = function (formData, formStruct) {}

exportObj.initHandle = function (formData, formStruct, vueData) {
  let self = vueData
  if (self.$route.query.listId == "220208155058BPOnc2DTE06nAN0mYr5") {
    self.$eventBus.onSubformOnload(vueData, (data) => {
      let subRows = formData.subform[data.formId]
      subRows.forEach((element, index) => {
        self.$el.querySelector(`#id${index}${data.formId}`).onclick = function () {
          self.$router.push({
            path: `/commonForm/210607181937YJxUC5fve4y7q3SH5hJ/${element["220119152759JZbI4uuk3LbVjUvcyCd"].value}`
          });
        }
      });
    });
  }
}

export default exportObj;
