import dsf from "../../../common";
// 菜品预定
const exportObj = {};
let hasSaved = false;
let count = 0
exportObj.initHandle = function (formData, formStruct, vueData) {

	let temp = 0;
	vueData.formData.multinfos['2012291621475Nx2r9znfrssYuHd8do'].rows.forEach(item => {
		temp += Number(item["201229102037KPKpUHuJI0O7jVQSW53"].value)
	})
	count = temp
	vueData.$set(vueData.formData.main["220419185254ZFkN4SQqH0C1Q7JBcIO"], "value", count)
	hasSaved = !!vueData.$route.query.cpydNum;
	formStruct.controls.forEach(item => { if (item.controlType == 'controlSubFormPrimary') item.controlType = 'controlSubFormPrimaryCPYD' })
	vueData.$bus.on("inpBus", function (busObj) {
		if (busObj.subFormIndex == null || busObj.metaData.metaId != '201229101800AuyqpP4yjv7vbphegCh') return;
		let subFormKey
		for (let [k, v] of Object.entries(formStruct.subform)) {
			v.controls.forEach((item, index) => {
				if (item.controlId == busObj.metaData.controlId) {
					subFormKey = k
				}
			})
		}
		let reg = /^[0-9]+[0-9]*[0-9]*$/;
		// if (!reg.test(Number(busObj.value)) || busObj.value.includes('.')) {
		// 	dsf.layer.toast('请输入正整数！');
		// 	let tempStr;
		// 	if (busObj.value.includes('.')) {
		// 		tempStr = busObj.value.replace('.', '')
		// 	} else {
		// 		tempStr = busObj.value.substring(0, busObj.value.length - 1);
		// 	}
		// 	vueData.$set(vueData.formData.subform[subFormKey][busObj.subFormIndex]['201229101800AuyqpP4yjv7vbphegCh'],
		// 		'value', tempStr)
		// 	return;
		// }
		if (formData.subform[subFormKey][busObj.subFormIndex] && formData.subform[subFormKey][busObj.subFormIndex][
			'2012211022246DnydH3mxIVZzlx1nzl'
		]) {
			let total = Number(busObj.value) * Number(formData.subform[subFormKey][busObj.subFormIndex][
				'2012211022246DnydH3mxIVZzlx1nzl'
			].value);
			vueData.$set(vueData.formData.subform[subFormKey][busObj.subFormIndex]['201229102037KPKpUHuJI0O7jVQSW53'],
				'value',
				String(total))
		}
		let temp = 0;
		vueData.formData.multinfos[subFormKey].rows.forEach(item => {
			temp += Number(item["201229102037KPKpUHuJI0O7jVQSW53"].value)
		})
		count = temp
		vueData.$set(vueData.formData.main["220419185254ZFkN4SQqH0C1Q7JBcIO"], "value", String(count))
	})
}

exportObj.saveFilter = function (formData, formStruct, vueData) {
	return new Promise(function (resolve, reject) {
		try {
			if (new Date(formData.main['201215110840O0QMozB2smlUxxYzxqq'].value).getTime() + 1000 * 60 * 60 * 4 < new Date()
				.getTime()) {
				reject("已超过截止时间,无法预订");
				return;
			}
			resolve()
		} catch (error) {
			resolve()
		}
	})
}


//点击取消发布
exportObj.custom1 = function (formData, formStruct, vueData) {
	//如果时间没有超过预定时间的12:00:00就可以进行取消                 这样设置的时间是早上8:00开始进行技术  所以在加4小时
	if (new Date(formData.main['201215110840O0QMozB2smlUxxYzxqq'].value).getTime() + 1000 * 60 * 60 * 4 < new Date().getTime()) {
		dsf.layer.toast("已超过截止时间,无法取消");
		return;
	}
	//获取主键
	let sourceId = formData.main['A0003'].value;
	dsf.http.post("fn/cpyd/cancel", {
		sourceId
	}).then((data) => {
		if (data.data.code == 200) {
			dsf.layer.toast("操作成功");
			vueData.backSucces();
		} else {
			dsf.layer.toast("取消失败");
		}
	})
}


//保存后事件
exportObj.saveAfter = function (vueData, formData, formStruct) {
	let sourceId = formStruct.main['A0003'].value;
	dsf.http.post("fn/cpyd/updateYdrs", {
		sourceId
	}).then(({
		data
	}) => {
		hasSaved = true;
		if (!data.data) {
			dsf.layer.toast("更新菜品发布预定人数出错!");
		} else {
			dsf.layer.toast("保存成功");
			vueData.backSucces()
		}
	});
}

exportObj.leaveHandle = function (formData, formStruct, vueData, routeObj) {
	if (hasSaved) return;
	dsf.http.post("fn/cpyd/updateCpyd", {
		pk: vueData.$route.params.pk,
	}).then(({
		data
	}) => {
		if (!data.data) {
			dsf.layer.toast('更新出错');
		}
	})
}

export default exportObj;
