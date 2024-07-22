// 菜品维护
import dsf from "../../../common";
const exportObj = {};
exportObj.link = async function (listid, moduleId, pk, vueData, itemValue) {
	var pk = itemValue["A0001"];
	var srcModule = "201230170107FTM46tEGeG4rwLX9mDr";
	var targetModule = "201230170107FTM46tEGeG4rwLX9mDr";
	//判断是否有权限进行预定，返回0是预定，1是查看
	let result = await dsf.http.post("fn/cpyd/getCpydNum", {
		sourceId: pk
	})
	let loading = dsf.layer.loading();
	if (result.data.data) {
		//获取当前人的预定信息
		dsf.http.post("fn/cpyd/getCpydByUserId", {
			sourceId: pk
		}).then(({
			data
		}) => {
			if ("success" == data.type) {
				var data = data.data.pk;
				if (data == null) {
					data = pk;
				}
				vueData.$router.push({
					path: "/commonForm/" + targetModule + "/" + data,
					query: {
						listId: "201221102956MUAaaK3R8Xv8DFoljAU",
						method: "viewList",
						node: -1,
						formId: "2103091347418PyIHGAz84hO8SDC4ak",
						cpydNum: result.data.data
					}
				});
			}
			dsf.layer.closeLoading(loading);
		});
		return;
	}
	function filterTime(time) {
		var str = time.replace(/-/g, "/")
		return Date.parse(str)
	}
	let endtime = filterTime(itemValue["201215110840O0QMozB2smlUxxYzxqq"] + " 12:00:00")
	if (endtime < new Date()) {
		dsf.layer.toast("已过预约时间，预约截止时间为截止日期当天中午12点之前!");
		return
	}
	//类别转换进行预定
	dsf.http.post("fn/cpyd/moduleConvert", {
		sourceModule: srcModule,
		targetModule: targetModule,
		srcInfo: pk
	}).then(({
		data
	}) => {
		if ("success" == data.type) {
			var sourceId = data.data.pk;
			//复制菜品信息
			dsf.http.post("fn/cpyd/copyCp", {
				sourceId,
				pk
			}).then(({
				data
			}) => {
				if (data.data) {
					if (data.data) {
						vueData.$router.push({
							path: "/commonForm/" + targetModule + "/" + sourceId,
							query: {
								listId: "201221102956MUAaaK3R8Xv8DFoljAU",
								method: "viewList",
								node: 11,
								formId: "2103091347418PyIHGAz84hO8SDC4ak"
							}
						});
					} else {
						dsf.layer.toast("更新出错!");
					}
				} else {
					dsf.layer.toast("复制菜品维护子表出错!");
				}
				dsf.layer.closeLoading(loading);
			});
		} else {
			dsf.layer.closeLoading(loading);
			dsf.layer.toast(result.message);
		}
	});
}
export default exportObj;
