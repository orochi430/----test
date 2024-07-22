let loadBaiduMap = false
// 江苏烟草信息录入
const exportObj = {};
function getLocationShop(point, vueData) {
  var geoc = new BMap.Geocoder();
  geoc.getLocation(new BMap.Point(point.lon, point.lat), function(res){ // 根据经纬度获取详细地址
    console.log (res.addressComponents)  
    dsf.config.listJson.find(item => item.fileType == 'getLocationShop').params = {
      lon: point.lon,
      lat: point.lat,
      cityName: res.addressComponents.city
    }
    vueData.commonPopParam.params.fileType = 'getLocationShop'
    vueData.commonPopParam.params.showSearch = false
    vueData.commonPop = true
  })
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  if (!loadBaiduMap) {
    // 加载百度地图，使用逆地址解析
    var baiduscript = document.createElement("script");
    baiduscript.type = "text/javascript";  
    baiduscript.src = "https://api.map.baidu.com/api?v=2.0&ak=3gqRCzNgHHe1uMHGkrYzfv0o&callback=init";  
    document.head.appendChild(baiduscript);
    loadBaiduMap = true
  }
  // 店铺列表
  vueData.commonPopParam = {
    params: {
      fileType: 'dpxkz',
      showFilterIcon: true,
      showSearch: true
    }
  }
  // 获取编号
  dsf.http.post('ctrl/informAtionEntry/getOrganizeNumber', {orgId: dsf.util.loadSessionStore('user').unitId}).then(res => {
    if(res.data.code == 200) {
      vueData.$set(formData.main, "C-ENTRY-013", { value: res.data.data.dyldbm + res.data.data.year + res.data.data.number })
    }
  })
  // 点击许可证输入框 弹出列表选择，带出店铺信息
  vueData.$bus.on("focusBus", function (busObj) {
    if (busObj.metaData.metaId == "C-ENTRY-005") {
      // vueData.commonPop = true
      vueData.$refs.ckDialog.show([{value: '1', name: '自动定位'}, {value: '2', name: '手动搜索'}], '', 'value', 'name', [], false, false).then(idArr => {
        // dsf.layer.toast(ids)
        if (idArr[0] == 2) {
          vueData.commonPopParam.params.fileType = 'dpxkz'
          vueData.commonPopParam.params.showSearch = true
          vueData.commonPop = true
        } else {
          // 根据经纬度获取市名
          if (window.wx) {
            wx.getLocation({
              type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              success: function (result) {
                getLocationShop({lon: result.longitude, lat: result.latitude}, vueData)
              }
            })
          } else {
            getLocationShop({lon: 118.78962, lat: 32.03193}, vueData)
          }
        }
      }).catch(() => {
        dsf.layer.toast('请重试')
      })
    }
  })
  // 反馈类型选中后拼接标题 ‘反馈 企业字号 反馈类型’
  vueData.$bus.on("selectUserBus", function (busObj) {
    //经营主体发生变更二级成员内容
    if (busObj.metaData.metaId == "C-ENTRY-002") {
      if (busObj.value) {
        vueData.$set(vueData.formData.main, "B0001", { value: `反馈${formData.main['C-ENTRY-003'].value}${formData.main['C-ENTRY-002'].text}` })
        //反馈类型为无证经营时许可证号需自动设置成12位的9
        if (busObj.value.indexOf('17')!=-1) {
          vueData.$set(vueData.formData.main, "C-ENTRY-005", { value: `999999999999` })
        }
      }
    }
  })
}
exportObj.choose = function (checkItems, vueData) {
  console.log("choose", checkItems);
  vueData.commonPop = false;
  vueData.$set(vueData.formData.main, "C-ENTRY-014", { value: checkItems[0].dataValue.cuStatusNm })
  vueData.$set(vueData.formData.main, "C-ENTRY-015", { value: checkItems[0].dataValue.orgDeptSnm })
  vueData.$set(vueData.formData.main, "C-ENTRY-005", { value: checkItems[0].dataValue.licNo })
  vueData.$set(vueData.formData.main, "C-ENTRY-003", { value: checkItems[0].dataValue.companyName })
  vueData.$set(vueData.formData.main, "C-ENTRY-004", { value: checkItems[0].dataValue.managerName })
  vueData.$set(vueData.formData.main, "C-ENTRY-006", { value: checkItems[0].dataValue.retailTel })
  vueData.$set(vueData.formData.main, "C-ENTRY-007", { value: checkItems[0].dataValue.businessAddr })
  vueData.$set(vueData.formData.main, "C-ENTRY-016", { value: checkItems[0].dataValue.orgDeptCd })
  vueData.$set(vueData.formData.main, "B0001", { value: `反馈${checkItems[0].dataValue.companyName}${vueData.formData.main['C-ENTRY-002'].text ? vueData.formData.main['C-ENTRY-002'].text : ''}` })
}
function saveRetailInfo(type,formStruct,formData){
  return dsf.http.post("ctrl/saveRetailInfo/saveOtherData", {
    pk: formStruct.parameters.pk,
    cuStatusNm: type ? "" : formData.main["C-ENTRY-014"].value,
    orgDeptCd: type ? "" : formData.main["C-ENTRY-016"].value,
    orgDeptSnm: type ? "" : formData.main["C-ENTRY-015"].value,
    credentialNum: formData.main["C-ENTRY-005"].value
  })
}
exportObj.custom1 = function(formData, formStruct, vueData) {
  let submit = function () {
    dsf.http.post('ctrl/informAtionEntry/addInformVerfication', {pk: formStruct.parameters.pk, orgDeptCdVal: formData.main["C-ENTRY-010"].value, callSyb: 1}).then(res => {
      if(res.data.code == 200) {
        if(res.data.message == '专卖管理' || res.data.message == '客户服务') {
          // 返回单位参数为ids的默认选中
          let defaultData = res.data.data.find(item => item.ids)
          defaultData.id = defaultData.ids
          res.data.data.forEach(item => {
            if(item.data.length > 0) {
              item.data.forEach( el => item["ORG_NAME"] = item["ORG_NAME"] + "\n" + el)
            }
          })
          vueData.$refs.ckDialog.show(res.data.data, '选择发送机构', 'id', 'ORG_NAME', [defaultData.ids], false).then(idArr => { // idArr为选中项标识
            saveRetailInfo(0,formStruct,formData).then(({data})=>{
              if(data.code == 200) {
                console.log(data);
                return dsf.http.post('ctrl/informAtionEntry/addInformVerfication', {pk: formStruct.parameters.pk, callSyb: 2, orgId: idArr[0]})
              } else{
                dsf.layer.toast(data.message)
                reject()
              }
            }).then(result => {
              if (result.data.code == 200) {
                return dsf.http.post('ctrl/informAtionEntry/addginbox', {pk: formStruct.parameters.pk})
              } else {
                dsf.layer.toast(result.data.message)
                reject()
              }
            }).then(response => {
              if(response.data.code == 200) {
                dsf.layer.toast("提交成功","",vueData.backSucces())
              } else {
                dsf.layer.toast(response.data.message)
              }
            })
          }).catch(() => {
            dsf.layer.toast('请选择发送机构')
          })
        } else {
          saveRetailInfo(0,formStruct,formData).then(({data})=>{
            if(data.code == 200) {
              return dsf.http.post('ctrl/informAtionEntry/addginbox', {pk: formStruct.parameters.pk})
            } else{
              dsf.layer.toast(data.message)
              reject()
            }
          }).then(response => {
            if(response.data.code == 200) {
              dsf.layer.toast('提交成功','',vueData.backSucces())
            } else {
              dsf.layer.toast(response.data.message)
            }
          })
        }
      } else {
        dsf.layer.toast(res.data.message)
      }
    })
  }
  vueData.buttonHandle['save'](
    vueData.$route.params,
    vueData.formMeta,
    vueData.formData,
    vueData,
    vueData.$refs,
    submit
  )
}
exportObj.saveFilter = function(formData, formMeta, vueData, action) {
  // return saveRetailInfo(1,formMeta,formData).then(({data})=>{
  //   if(data.code == 200) {
  //     resolve()
  //   } else{
  //     reject("111")
  //   }
  // })
  return new Promise(function (resolve, reject) {
    saveRetailInfo(1,formMeta,formData)
    resolve()
  })
}
export default exportObj;
