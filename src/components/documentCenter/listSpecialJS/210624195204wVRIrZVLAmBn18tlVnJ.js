// 草稿箱
const exportObj = {};

exportObj.convertMeetingNotice = function (itemValue, vueData) {
  console.log(itemValue, vueData)
  dsf.http.post("fn/meetingNotice/getHytzByHysYdId", {
    hysYdId: itemValue.dataValue['A0001']
  }).done(res => {
    dsf.layer.toast(res.message);
    if (res.code == 200) {
      let url = `/commonForm/${res.data.moduleId}/${res.data.tzId}`
      if (res.data.status != 0) {
        url = `/commonForm/${res.data.moduleId}/${res.data.tzId}?listId=${res.data.listId}&method=${res.data.method}&validateByList=${res.data.validateByList}`
      }
      vueData.$router.push({
        path: url
      })
    }
  }).error(function (message) {
    dsf.layer.toast(message);
  })
}

exportObj.logicDeleteXForm = function (formData, VueData) { //删除---------------YY
  const logicDeleteXFormFn = params => dsf.http.post("fn/recycle/logic", params); //删除
  //获取当前formData的下标
  let index = VueData.data.findIndex(item => {
    return item.dataValue["A0001"] == formData.dataValue["A0001"]
  })
  var array = new Array();
  var param = {
    "pk": formData.dataValue["A0001"],
    "moduleId": VueData.moduleId
  };
  array.push(param);
  var data = {
    "data": JSON.stringify(array),
    "moduleId": VueData.moduleId
  };
  dsf.layer.confirm({
    message: '是否确认删除',
    confirmButtonText: '确认'
  }, () => {
    logicDeleteXFormFn(data).then((res) => {
      console.log(res)
      dsf.layer.toast(res.data.message);
      if (res.data.code == 200) {
        VueData.data.splice(index, 1)
      }
    })
  })
}



exportObj.dataFilter = function (listData, vueData) {
  console.log(listData);
  listData.forEach(element => {
    let str = element.dataValue["c-meetingsq-007"] + " ~ " + element.dataValue["c-meetingsq-008"].substr(10)
    if (moment(new Date(element.dataValue["c-meetingsq-007"])).format("YYYYMMDD") != moment(new Date(element.dataValue["c-meetingsq-008"])).format("YYYYMMDD")) {
      str = element.dataValue["c-meetingsq-007"] + " ~ " + element.dataValue["c-meetingsq-008"].substr(5)
    }
    vueData.$set(element.dataValue, "c-meetingsq-007", str)


  });
}



//电气 我的会议室预定 撤销按钮
exportObj.cancleMeetingRoomReserve = function (listData, vueData) {
  let pk = listData.dataValue["A0001"] // 获取主键
  dsf.layer.confirm({
    message: '确认撤销吗？',
    confirmButtonText: '确认'
  }, () => {
    dsf.http.get('fn/dqzbjtcommon/cancleMeetingRoomReserve', {
      id: pk
    }).then(result => {
      if (result.data.type == "success") {
        dsf.layer.toast(result.data.message,true)
        vueData.onRefresh && vueData.onRefresh();
      } else
        dsf.layer.toast(result.data.message)
    })
  })
}
//电气 我的会议室预定 会议变更进入表单
exportObj.listRow = function (listData, vueData) {
  vueData.$router.push({
    path: `/commonForm/1905311647221BSf1doWPYLsr8nAdqB/${listData.dataValue["A0001"]}`,
    query: {
      listId: "210624195204wVRIrZVLAmBn18tlVnJ"
    }
  })
}




export default exportObj;