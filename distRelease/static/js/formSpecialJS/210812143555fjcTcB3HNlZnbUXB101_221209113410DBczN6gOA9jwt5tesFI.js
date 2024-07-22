

(function () {
	// 民政办 督办模块
	const exportObj = {};

	exportObj.sendAfter = function (formData, formMeta, vueData) {
		console.log('vueData',vueData.sendLineIds,formData)
		if(vueData.sendLineIds.includes("E85QpD9wtNCDMfy")){
			// vueData.buttonHandle['Public.moduleRuleConvert'](vueData,formData);
		let convertId = "";
		switch (formMeta.parameters.moduleId){
			case "2108171143328kAjWGWeQY5yxxxm3SQ":
				convertId = "210817114332Hw9JToMf3QUjYj25g3n";
				break;
			case "210812143555fjcTcB3HNlZnbUXB101":
				convertId = "210813152012lhUSdhk2MYB38Y9gqDG";
				break;
			case "210817112252ieDo76iiq4Bm9nzwvur":
				convertId = "210817112253xnStoOc5rn2OP1jUZag";
				break;
			case "210814115058rxyx9UlipT0qsV26FVU":
				convertId = "2108141150584UeBJ2o327ZjKd1nDKW";
				break;
			case "210814114602u4m9SDPUgaXz029WQqp":
				convertId = "210814114602Ybe37Ghv0G5PRbfEqJX";
				break;
			case "210814114234OKfTUJzpR3HGO4l9JKs":
				convertId = "210814114235wXKQAH4dLBpFiNjkSKS";
				break;
			case "210814113838esUSRs7EzQa1fyRNbdQ":
				convertId = "210814113838ly3CfkK7mFb7ZJRu3PJ";
				break;
			case "210814113600kGcbAMwAYW5F6IfEO0H":
				convertId = "210819144620SY0nfP37Fs2jIXw5jtr";
				break;
			case "210813153408ByTmGv4vqZalieVz6lG":
				convertId = "210813153408zsd8HMU0RxMlz76MJMA";
				break;
		}
			let params={
				infoId:formMeta.parameters.pk,
				convertId,
				userId:dsf.util.loadSessionStore("user").user_id,
			};
			dsf.http.post("/ctrl/leeSupervise/convert", params).then(res => {
				// if (res.data.type != "success") {
				// 	dsf.layer.toast(res.data.message);
				// 	return
				// } else {
					
					// dsf.layer.toast("成功")
					if(res.data.code==200){
						let route = {
							name: "commonForm",
							params: {
								pk: res.data.message,
								moduleId: formMeta.parameters.moduleId
							}
						}
						console.log("route",route,vueData.$router)
						vueData.$router.push(route)
					}
					
				// }
			}).error(function () { })
		}
	}
	

	
	window.spJS = exportObj;
})();