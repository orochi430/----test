(function () {
  // 皖政通提醒未完成列表
  const exportObj = {};
  exportObj.doneMyRemind = function (itemValue, vueData) {
    dsf.layer.confirm({
      message: '是否确认完成',
      confirmButtonText: '确认'
    }, () => {
      dsf.http.get('/ctrl/myRemind/done', { myRemindId: itemValue.dataValue["A0001"] }).then(res => {
        if (res.data.code == 200) {
          dsf.layer.toast('操作成功')
          vueData.onRefresh()
        }
      })
    })
  }
  exportObj.deleteMyRemind = function (itemValue, vueData) {
    dsf.layer.confirm({
      message: '是否确认删除',
      confirmButtonText: '确认'
    }, () => {
      dsf.http.get('/ctrl/myRemind/delete', { myRemindId: itemValue.dataValue["A0001"] }).then(res => {
        if (res.data.code == 200) {
          dsf.layer.toast('删除成功')
          vueData.onRefresh()
        }
      })
    })
  }
  exportObj.updateMyRemind = function (itemValue, vueData) {
    vueData.$router.push(`/commonForm/${itemValue.dataValue["A0004"]}/${itemValue.dataValue["A0001"]}?listId=220916154111LeSnFKWuqsb03TZkjSq`)
  }

  //此处window下面的对象spListJS要和表单spJS的区分，不然列表加载以后再打开表单会被冲掉。
  window.spListJS = exportObj;
})();
