import dsf from "../../../common";

const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    path: `/commonForm/${moduleId}/${pk}`,
    query: {
      method: 'view',
      listId: '220522162654F9P59Sm6QcuBL7qyatN',
    }
  });
}
exportObj['visitor_examine'] = function (item, vueData) {
  console.log(item)
  dsf.layer.confirm({
    message: '是否确认通过该访客审核',
    confirmButtonText: '确认'
  }, () => {
    dsf.http.post('ctrl/register/approve', {
      fileIds: item.dataValue['A0001'],
      approveState: '1'
    }).then(res => {
      if(res.data.code == 200) {
        dsf.layer.toast('操作成功')
        vueData.onRefresh()
      }
    })
  })
}
exportObj['visitor_examine_false'] = function (item, vueData) {
  console.log(item)
  dsf.layer.confirm({
    message: '是否确认不通过该访客审核',
    confirmButtonText: '确认'
  }, () => {
    dsf.http.post('ctrl/register/approve', {
      fileIds: item.dataValue['A0001'],
      approveState: '-1'
    }).then(res => {
      if(res.data.code == 200) {
        dsf.layer.toast('操作成功')
        vueData.onRefresh()
      }
    })
  })
}
export default exportObj;
