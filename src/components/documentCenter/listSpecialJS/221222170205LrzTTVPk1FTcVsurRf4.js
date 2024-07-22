// 冲突会议列表链接--jf
const exportObj = {};
exportObj.link = function(listid, moduleId, pk, vueData, itemValue) {
    vueData.$router.push({
        path: `/commonForm/${itemValue['C-MEETINGROOM-POCCUPY-0005.value']}/${itemValue['C-MEETINGROOM-POCCUPY-0011.value']}`,
        query: {
            listId: '2106211601159duvNrTl9jdgtRo0fSJ',
        }
    })

}
export default exportObj;