// 个人日程
const exportObj = {};
// exportObj.handle = function (formData, formStruct) {
//   console.log('tag', '1');
//   formData["C-RC-0016"].value="日程事项："+formData["B0001"].value+" 将于"
//   +formData["C-RC-0003"].value+" 开始，请注意时间。";

//   //根据表单数据变化，改变其他控件值
//   /* if (formData.main["c-meetingtz-002"].text == "部级会议") {
//       formData.main["c-meetingtz-006"].value = formData.main["c-meetingtz-002"].text;
//   } */
// }
exportObj.saveAfter = function (vueData, formData, formStruct) {
	vueData.$eventBus.refreshSchedule(vueData); // 事件总线的日程刷新事件通知
	dsf.layer.toast("日程保存成功", undefined, () => vueData.$router.go(-1));
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  if (vueData.$route.query.startTime) vueData.$set(formData.main, "C-RC-0003", { value: vueData.$route.query.startTime })
  if (vueData.$route.query.endTime) vueData.$set(formData.main, "C-RC-0004", { value: vueData.$route.query.endTime })
  if (vueData.$route.query.bt) vueData.$set(formData.main, "B0001", { value: vueData.$route.query.bt })

}
exportObj.saveFilter = function (formData, formStruct, vueData, action) {

	return new Promise(function (resolve, reject) {
		if (!formData.main["C-RC-0004"].value) {
			let end = formData.main["C-RC-0003"].value.split(' ')[0] + ' 23:59'
			vueData.$set(formData.main, "C-RC-0004", { value: end })
		}
		resolve()
	})

}
exportObj.afterLogicDeleteXForm = function (formData, formStruct, vueData) {
	console.log('删除后')
	dsf.http.post('fn/schedulecenter/delScheduleRemind', { pk: formStruct.parameters.pk }).then(res => {
		if (res.data.code == 200) {
			vueData.$eventBus.refreshSchedule(vueData); // 事件总线的日程刷新事件通知
		}
	})
}
export default exportObj;
