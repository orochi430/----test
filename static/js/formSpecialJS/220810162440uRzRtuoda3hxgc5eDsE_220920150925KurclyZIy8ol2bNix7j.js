(function () {
  // 广东省委党校AK 外出报告申请天数
  const exportObj = {}
  exportObj.initHandle = function (formData, formStruct, vueData) {
    console.log('引入了外出报告表单js', formData)
    // 监听子表新增
    vueData.$bus.on('selectDateTime', function (busObj) {
      if (busObj.metaData.metaId == '220810164905lZAaxuM9EWpQqXtfpO1') {
        //   console.log(busObj)
        calculateDay(vueData, formData)
      }
      if (busObj.metaData.metaId == '220810165110NGMEqcGw56tiYZmD4vw') {
        //   console.log(busObj)
        calculateDay(vueData, formData)
      }
    })
    vueData.$bus.on('checkVal', (obj) => {
      // debugger
      if (obj.metaData.metaId == '220811101910UPIGpcY6GwiRDVGHzhg') {
        //开始上下午
        //   console.log(obj)
        calculateDay(vueData, formData)
      }
      if (obj.metaData.metaId == '220811102229xgmS2xfNCJajRWWDxoi') {
        //结束上下午
        //   console.log(obj)
        calculateDay(vueData, formData)
      }
    })
    vueData.$bus.off('inputRadio').on('inputRadio', function (busObj) {
      console.log(busObj)
      if (
        busObj.metaData.metaId == '2208101641236HUwMbM0FIj1dulJr0f' &&
        busObj.value == 2
      ) {
        dsf.http.post('fn/goabroadsuan/getAbroad', {}).then((res) => {
          if (parseInt(res.data) >= 2) {
            dsf.layer.toast('当年已申请出国(境)两次，不能继续申请')
          }
        })
      }
    })
    vueData.$bus.off('changeCityBus').on('changeCityBus', function (busObj) {
      let temp = busObj.text.split(',')
      let province = temp[0]
      let city = temp[1]
      if (province !== '广东省') {
        vueData.$set(formData.main, '220915151535PsjJ8TtUD9tj9VvNQ4z', {
          text: '离穗,离粤',
          value: '1,2',
        })
      }
      if (province == '广东省' && city !== '广州市') {
        vueData.$set(formData.main, '220915151535PsjJ8TtUD9tj9VvNQ4z', {
          text: '离穗',
          value: '1',
        })
      }
      if (province == '广东省' && city == '广东市') {
        vueData.$set(formData.main, '220915151535PsjJ8TtUD9tj9VvNQ4z', {
          text: '',
          value: '',
        })
      }
    })
  }

  exportObj.saveFilter = function (formData, formStruct, vueData, action) {
    return new Promise((resolve, reject) => {
      console.log(vueData.pk, action)
      if (action == 'save' || action == 'send') {
        if (formData.main['2208101641236HUwMbM0FIj1dulJr0f'].value == 2) {
          dsf.http.post('fn/goabroadsuan/getAbroad', {}).then((res) => {
            if (parseInt(res.data) >= 2) {
              reject(`当年已申请出国(境)两次，不能继续申请`)
            } else {
              resolve()
            }
          })
        } else {
          resolve()
        }
      } else {
        resolve()
      }
    })
  }

  function calculateDay(vueData, formData) {
    //计算天数
    let temp_start = '',
      temp_end = '',
      temp_am = '',
      temp_pm = ''
    temp_start = formData.main['220810164905lZAaxuM9EWpQqXtfpO1'].value
    temp_end = formData.main['220810165110NGMEqcGw56tiYZmD4vw'].value
    temp_am = formData.main['220811101910UPIGpcY6GwiRDVGHzhg'].text
    temp_pm = formData.main['220811102229xgmS2xfNCJajRWWDxoi'].text
    console.log('进入了', temp_start, temp_end, temp_am, temp_pm)
    if (temp_start && temp_end && temp_am && temp_pm) {
      let base =
        (new Date(temp_end).getTime() - new Date(temp_start).getTime()) /
        24 /
        60 /
        60 /
        1000 //基础天数
      // 结合上下午
      let extra = 0
      if (temp_am == temp_pm) {
        extra = 0.5
      }
      if (temp_am == '上午' && temp_pm == '下午') {
        extra = 1
      }
      if (temp_am == '下午' && temp_pm == '上午') {
        base -= 1 //分别缺失一个上下午
        extra = 1
      }
      let res = base + extra
      console.log(base, extra, res)
      //   修改子表
      vueData.$set(formData.main, '220810165220G2ogx8bp7lTPm1QFqzq', {
        value: res,
      })
      //   console.log(formData)
    }
  }
  window.spJS = exportObj
})()
