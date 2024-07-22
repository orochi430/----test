import dsf from "../../../common";

const exportObj = {};

exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    path: `/commonForm/${moduleId}/${itemValue['G_COMUSER_PLACE.C-COMUSER-PLACE-0001']}`,
    query: {
      listId: listid,
      method:"edit"
    }
  })
}
exportObj.createRow = function (btn, vueData) {
  let placeIds = ''
  let loading = dsf.layer.loading()
  dsf.http.post('ctrl/communityUser/placeList', {communityId: JSON.parse(vueData.$route.query.secQuery).communityId}).then(res => {
    dsf.layer.closeLoading(loading)
    if(res.data.code == 200) {
      if(res.data.data.length == 0) {
        dsf.layer.toast('请联系单位管理员维护场所管理权限')
      } else if(res.data.data.length == 1) {
        placeIds = res.data.data[0].value
        createFn()
        } else {
        vueData.$refs.ckDialog.show(res.data.data, '选择场所', 'value', 'name').then(idArr => {
          // dsf.layer.toast(ids)
          placeIds = idArr.join(',')
          createFn()
        }).catch(() => {
          dsf.layer.toast('请选择场所')
        })
      }
    }
  })
  function createFn() {
    vueData.$router.push({
      path: "/commonForm/220319194130l6pirMZJe74yeqvID8I",
      query: {
        specialSaveObj: JSON.stringify({placeIds: placeIds}),
        fid: JSON.parse(vueData.$route.query.secQuery).communityId
      }
    })
  }
  
}

exportObj.delCommunityUsers = function (itemValue, vueData) {
  dsf.layer.confirm({
    message: '是否确认删除',
    confirmButtonText: '确认'
  }, () => {
    let loading = dsf.layer.loading()
    dsf.http.post('ctrl/communityUser/delCommunityUsers', {ids: itemValue.dataValue['G_COMUSER_PLACE.A0001']}).then(res => {
      dsf.layer.closeLoading(loading)
      if(res.data.code == 200) {
        dsf.layer.toast('删除成功')
        vueData.onRefresh()
      }
    })
  })
}
exportObj.excelImport = function (btn, vueData) {
  let placeIds = ''
  let placeText = ''
  let loading = dsf.layer.loading()
  dsf.http.post('ctrl/communityUser/placeList', {communityId: JSON.parse(vueData.$route.query.secQuery).communityId}).then(res => {
    dsf.layer.closeLoading(loading)
    if(res.data.code == 200) {
      if(res.data.data.length == 0) {
        dsf.layer.toast('请联系单位管理员维护场所管理权限')
      } else if(res.data.data.length == 1) {
        placeIds = res.data.data[0].value
        placeText = res.data.data[0].name
        importFn()
      } else {
        vueData.$refs.ckDialog.show(res.data.data, '选择场所', 'value', 'name').then(idArr => {
          // dsf.layer.toast(ids)
          placeIds = idArr.join(',')
          placeText = res.data.data.filter(item => placeIds.includes(item.value)).map(item => item.name).join(',')
          importFn()
        }).catch(() => {
          dsf.layer.toast('请选择场所')
        })
      }
    }
  })
  function importFn() {
    vueData.$dialog.confirm({
      // title: '标题',
      showConfirmButton: false,
      showCancelButton: false,
      closeOnClickOverlay: true,
      message: `<div id="excelImport">仅导入人员</div>
      <div id="imageImport">仅导入照片</div>
      <div id="zipImport">导入人员及照片</div>`,
    })
      .then(() => {
        // on confirm
      })
      .catch(() => {
        // on cancel
      });
    vueData.$nextTick(() => {
      document.getElementById('excelImport').onclick = function() {
        // vueData.$refs.uploader.accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
        vueData.$refs.uploader.afterRead = function(file) {
          vueData.$toast.loading({
              message: "上传中...",
              forbidClick: true,
              duration: 0,
              overlay: true,
          });
          dsf.http.upload(`ctrl/exPo/communityUser/excelImport?fid=${JSON.parse(vueData.$route.query.secQuery).communityId}&placeIds=${placeIds}&placeText=${placeText}`,{}, file).then(res => {
            if (res.data.code == 200) {
              console.log(res)
              vueData.$toast.clear();
              vueData.$dialog.close();
              if(res.data.data) {
                dsf.layer.confirm({
                  message: `${res.data.data.total ? '总记录数：' + res.data.data.total : ''}
${res.data.data.importCount ? '导入总数:' + res.data.data.importCount : ''}
${res.data.data.dupCardNo ? '重复身份证号：:' + res.data.data.dupCardNo : ''}`,
                  confirmButtonText: '确认',
                  showCancelButton: false
                },() => {
                  vueData.onRefresh()
                })
              } else {
                vueData.$toast('导入成功')
                vueData.onRefresh()
              }
            } else {
              if(res.data.data && res.data.data.error) {
                vueData.$toast.clear();
                dsf.layer.confirm({
                  message: `${res.data.data.mobilerror ? '手机号格式不正确名单如下：\n' + res.data.data.mobilerror : ''}\n${res.data.data.idNumberError ? '身份证号格式不正确名单如下:\n' + res.data.data.idNumberError : ''}\n${res.data.data.requiredError ? '姓名或身份证未填写行号如下:\n' + res.data.data.requiredError : ''}${res.data.data.imageSuccessCount ? '图片导入成功数:' + res.data.data.imageSuccessCount : ''}`,
                  confirmButtonText: '确认',
                  showCancelButton: false
                })
              } else {
                vueData.$toast(res.data.message.replace(/<br\/>/gm,"\n"))
              }
            }
          }).error(e => {
              vueData.$toast.clear();
              vueData.$toast('导入失败')
              console.log(e)
          })
        }
        console.log(vueData.$refs.uploader)
        vueData.$refs.uploader.chooseFile()
      }
      document.getElementById('imageImport').onclick = function() {
        // vueData.$refs.uploader.accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
        vueData.$refs.uploader.afterRead = function(file) {
          vueData.$toast.loading({
              message: "上传中...",
              forbidClick: true,
              duration: 0,
              overlay: true,
          });
          dsf.http.upload(`ctrl/exPo/communityUser/imageImport?fid=${JSON.parse(vueData.$route.query.secQuery).communityId}&placeIds=${placeIds}&placeText=${placeText}`,{}, file).then(res => {
            if (res.data.code == 200) {
              console.log(res)
              vueData.$toast.clear();
              vueData.$dialog.close();
              if(res.data.data) {
                dsf.layer.confirm({
                  message: `${res.data.data.imageTotalCount ? '图片总数:' + res.data.data.imageTotalCount : ''}
${res.data.data.imageSuccessCount ? '图片导入成功数:' + res.data.data.imageSuccessCount : ''}
${res.data.data.imageImportError || ''}`,
                  confirmButtonText: '确认',
                  showCancelButton: false
                },() => {
                  vueData.onRefresh()
                })
              } else {
                vueData.$toast('导入成功')
                vueData.onRefresh()
              }
            } else {
              if(res.data.data && res.data.data.error) {
                vueData.$toast.clear();
                dsf.layer.confirm({
                  message: `${res.data.data.mobilerror ? '手机号格式不正确名单如下：\n' + res.data.data.mobilerror : ''}\n${res.data.data.idNumberError ? '身份证号格式不正确名单如下:\n' + res.data.data.idNumberError : ''}\n${res.data.data.requiredError ? '姓名或身份证未填写行号如下:\n' + res.data.data.requiredError : ''}${res.data.data.imageSuccessCount ? '图片导入成功数:' + res.data.data.imageSuccessCount : ''}`,
                  confirmButtonText: '确认',
                  showCancelButton: false
                })
              } else {
                vueData.$toast(res.data.message.replace(/<br\/>/gm,"\n"))
              }
            }
          }).error(e => {
              vueData.$toast.clear();
              vueData.$toast('导入失败')
              console.log(e)
          })
        }
        console.log(vueData.$refs.uploader)
        vueData.$refs.uploader.chooseFile()
      }
      document.getElementById('zipImport').onclick = function() {
        // vueData.$refs.uploader.accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
        vueData.$refs.uploader.afterRead = function(file) {
          vueData.$toast.loading({
              message: "上传中...",
              forbidClick: true,
              duration: 0,
              overlay: true,
          });
          dsf.http.upload(`ctrl/exPo/communityUser/zipImport?fid=${JSON.parse(vueData.$route.query.secQuery).communityId}&placeIds=${placeIds}&placeText=${placeText}`,{}, file).then(res => {
            if (res.data.code == 200) {
              console.log(res)
              vueData.$toast.clear();
              vueData.$dialog.close();
              if(res.data.data) {
                dsf.layer.confirm({
                  message: `${res.data.data.total ? '总记录数：' + res.data.data.total : ''}
${res.data.data.importCount ? '导入总数:' + res.data.data.importCount : ''}
${res.data.data.imageTotalCount ? '图片总数:' + res.data.data.imageTotalCount : ''}
${res.data.data.imageSuccessCount ? '图片导入成功数:' + res.data.data.imageSuccessCount : ''}
${res.data.data.dupCardNo ? '重复身份证号：:' + res.data.data.dupCardNo : ''}`,
                  confirmButtonText: '确认',
                  showCancelButton: false
                },() => {
                  vueData.onRefresh()
                })
              } else {
                vueData.$toast('导入成功')
                vueData.onRefresh()
              }
            } else {
              if(res.data.data && res.data.data.error) {
                vueData.$toast.clear();
                dsf.layer.confirm({
                  message: `${res.data.data.mobilerror ? '手机号格式不正确名单如下：\n' + res.data.data.mobilerror : ''}\n${res.data.data.idNumberError ? '身份证号格式不正确名单如下:\n' + res.data.data.idNumberError : ''}\n${res.data.data.requiredError ? '姓名或身份证未填写行号如下:\n' + res.data.data.requiredError : ''}${res.data.data.imageSuccessCount ? '图片导入成功数:' + res.data.data.imageSuccessCount : ''}`,
                  confirmButtonText: '确认',
                  showCancelButton: false
                })
              } else {
                vueData.$toast(res.data.message.replace(/<br\/>/gm,"\n"))
              }
            }
          }).error(e => {
              vueData.$toast.clear();
              vueData.$toast('导入失败')
              console.log(e)
          })
        }
        console.log(vueData.$refs.uploader)
        vueData.$refs.uploader.chooseFile()
      }
    })
  }
  
}
export default exportObj;
