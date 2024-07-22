const exportObj = {};
exportObj.saveFilter = function(formData, formStruct, vueData) {
	return new Promise(function(resolve, reject) {
		try {
			if (vueData.allFile.find(item=> item.attachType == 0).file[0]) {
        let fileName = vueData.allFile.find(item=> item.attachType == 0).file[0].title
        vueData.$set(formData.main, 'B0001', {value: fileName.substring(0,fileName.lastIndexOf('.'))})
        resolve()
			}
			resolve()
		} catch (error) {
			resolve()
		}
	})
}
export default exportObj;
