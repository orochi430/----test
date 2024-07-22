/*
 * @Author: jiangfeng
 * @Date: 2023-04-28 15:10:01
 * @Last Modified by: 会议
 * @Last Modified time: 2023-04-29 17:15:28
 */

const exportObj = {};
exportObj.link = function(listid, moduleId, pk, vueData, itemValue) {
  console.log(itemValue);
  vueData.$router.push({
    name: 'commonForm',
    params: {
      moduleId: '200819103404M68aBaOHQCJpEAaAES2',
    },
    query: {
      type: itemValue['C-MEETINGROOM-POCCUPY-0010.value'],
      fid: itemValue['A0001']
    }
  })
};
exportObj.meetingChange = function (btn,  vueData) {
    console.log(btn,  vueData);
    let masterId =btn.dataValue['B0035'];

    dsf.http.post("ctrl/meetingRoomOccupy/getStatus", { "masterId": masterId }).then((result) => {
        if (result.data.type == "success") {
            vueData.$router.push({
                path: `/commonForm/200819103404M68aBaOHQCJpEAaAES2`,
                query: {
                    fid: masterId
                }
            });
        } else {
            dsf.layer.toast(result.message)
        }
    })

}
export default exportObj;

