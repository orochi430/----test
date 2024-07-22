(function () {
	// 通知补发
	const exportObj = {};
	exportObj.initHandle = function(formData, formStruct, vueData) {
		console.log('通知补发')
		console.log(vueData);
		dsf.http.post('ctrl/meetingRoomOccupy/getData', {
			pk: vueData.$route.query.pk,
		}).then(res => {
			if (res.data.code == '200') {
				let data = res.data.data
				vueData.$set(formData.main, "c-meetingsqbg-014", { value: data.leaderValue, text: data.leaderText, schema: data.leaderSchema }); //原出席领导
				vueData.$set(formData.main, "c-meetingsqbg-015", { value: data.leaderValue, text: data.leaderText, schema: data.leaderSchema }); //现出席领导
				vueData.$set(formData.main, "c-meetingsqbg-016", { value: data.tzbmValue, text: data.tzbmText, schema: data.tzbmSchema }); //原通知部门
				vueData.$set(formData.main, "c-meetingsqbg-017", { value: data.tzbmValue, text: data.tzbmText, schema: data.tzbmSchema }); //现通知部门
				vueData.$set(formData.main, "c-meetingsqbg-009", { value: data.chrValue, text: data.chrText, schema: data.chrSchema }); //原参会人员
				vueData.$set(formData.main, "c-meetingsqbg-010", { value: data.chrValue, text: data.chrText, schema: data.chrSchema }); //参会人员
				vueData.$set(formData.main, "c-meetingsqbg-018", { value: data.lxbmValue, text: data.lxbmText, schema: data.lxbmSchema }); //原列席部门
				vueData.$set(formData.main, "c-meetingsqbg-019", { value: data.lxbmValue, text: data.lxbmText, schema: data.lxbmSchema }); //现列席部门
				vueData.$set(formData.main, "c-meetingsqbg-020", { value: data.zcrValue, text: data.zcrText, schema: data.zcrSchema }); //原主持人
				vueData.$set(formData.main, "c-meetingsqbg-021", { value: data.zcrValue, text: data.zcrText, schema: data.zcrSchema }); //现主持人
				vueData.$set(formData.main, "c-meetingsqbg-022", { value: data.lxrValue, text: data.lxrText, schema: data.lxrSchema }); //原列席人员
				vueData.$set(formData.main, "c-meetingsqbg-023", { value: data.lxrValue, text: data.lxrText, schema: data.lxrSchema }); //现列席人员
	
				vueData.$set(formData.main, "c-meetingsqbg-025", { value: data.lxLeader, text: data.lxLeaderText, schema: data.lxLeaderSchema }); //原列席领导
				vueData.$set(formData.main, "c-meetingsqbg-026", { value: data.lxLeader, text: data.lxLeaderText, schema: data.lxLeaderSchema }); //现列席领导
	
				vueData.$set(formData.main, "c-meetingsqbg-027", { value: data.cxUnit, text: data.cxUnitText, schema: data.cxUnitSchema }); //原出席单位
				vueData.$set(formData.main, "c-meetingsqbg-028", { value: data.cxUnit, text: data.cxUnitText, schema: data.cxUnitSchema }); //现出席单位
	
				vueData.$set(formData.main, "c-meetingsqbg-029", { value: data.lxUnit, text: data.lxUnitText, schema: data.lxUnitSchema }); //原列席单位
				vueData.$set(formData.main, "c-meetingsqbg-030", { value: data.lxUnit, text: data.lxUnitText, schema: data.lxUnitSchema }); //现列席单位
	
				vueData.$set(formData.main, "c-meetingsqbg-031", { value: data.tyUser, text: data.tyUserText, schema: data.tyUserSchema }); //原特邀人员
				vueData.$set(formData.main, "c-meetingsqbg-032", { value: data.tyUser, text: data.tyUserText, schema: data.tyUserSchema }); //现特邀人员
	
				vueData.$set(formData.main, "c-meetingsqbg-033", { value: data.workUser, text: data.workUserText, schema: data.workUserSchema }); //原工作人员
				vueData.$set(formData.main, "c-meetingsqbg-034", { value: data.workUser, text: data.workUserText, schema: data.workUserSchema }); //现工作人员
	
				vueData.$set(formData.main, "c-meetingsqbg-035", { value: data.outsideUserId, text: data.outsideUserName, schema: data.outsideUserSchema }); //原单位外人员
				vueData.$set(formData.main, "c-meetingsqbg-036", { value: data.outsideUserId, text: data.outsideUserName, schema: data.outsideUserSchema }); //现单位外人员
			}
	
		})
	
		formStruct.controls.forEach(item => {
			item.show = 0
		})
		dsf.http.post('/fn/meetingType/getMeetingType', {
			'meetingTypeId': vueData.$route.query.type
		}).then(res => {
			if (res.data.code == 200 && res.data.data) {
				let data = res.data.data
				if (data && data.chdxText) {
					let Arr = data.chdxText.split(',')
	
					Arr.forEach(ele => {
						formStruct.controls.forEach(item => {
							if (item.label.indexOf(ele) != -1) {
								item.show = 1
							}
						})
					})
				}
	
			}
	
		})
	}
	window.spJS = exportObj;
})();
