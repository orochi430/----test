(function () {
  // 广东省委党校AK 请假审批天数
  const exportObj = {}
  exportObj.initHandle = function (formData, formStruct, vueData) {
    console.log(vueData.pk)
    vueData.childK = '220901160716kPi98viWEwXYTAKjakI'
    console.log('引入了表单js')

    // 监听子表新增
    vueData.$bus.on('selectDateTime', function (busObj) {
      if (busObj.metaData.metaId == '220825095138x75p6LUFyF2yRbDCr9q') {
        //   console.log(busObj)
        calculateDay(vueData, formData, busObj.subFormIndex)
      }
      if (busObj.metaData.metaId == '220825100334ri7SdtvliWy0D1D1lm4') {
        //   console.log(busObj)
        calculateDay(vueData, formData, busObj.subFormIndex)
      }
      if (busObj.metaData.metaId == '2208031650305IzQVLtsC3TMlhuy3TX') {
        let row = formData.multinfos[vueData.childK].rows[0]
        let start = row['220825095138x75p6LUFyF2yRbDCr9q'].value
        console.log(busObj, start)
        if (new Date(busObj.value).getTime() < new Date(start).getTime()) {
          dsf.layer.toast('销假时间不能早于请假开始时间')
        }
      }
    })
    vueData.$bus.on('checkVal', (obj) => {
      // debugger
      if (obj.metaData.metaId == '220825095305xC0XmguHqkahYxRI8Ub') {
        //开始上下午
        //   console.log(obj)
        calculateDay(vueData, formData, obj.subFormIndex)
      }
      if (obj.metaData.metaId == '220825100122226q9w3vVYcS556xz8C') {
        //结束上下午
        //   console.log(obj)
        calculateDay(vueData, formData, obj.subFormIndex)
      }
    })
  }

  exportObj.saveFilter = function (formData, formStruct, vueData, action) {
    return new Promise((resolve, reject) => {
      console.log(
        vueData.pk,
        action,
        formData.main['2208031650305IzQVLtsC3TMlhuy3TX'],
      )
      if (action == 'save' || action == 'send') {
        let ruin = formData.main['2208031650305IzQVLtsC3TMlhuy3TX'].value
        let row = formData.multinfos[vueData.childK].rows[0]
        let start = row['220825095138x75p6LUFyF2yRbDCr9q'].value
        if (new Date(ruin).getTime() < new Date(start).getTime()) {
          reject('销假时间不能早于请假开始时间')
        } else {
          resolve()
        }
      } else {
        resolve()
      }
    })
  }

  function calculateDay(vueData, formData, index) {
    //计算天数
    // console.log(index, formData.multinfos[vueData.childK])
    let row = formData.multinfos[vueData.childK].rows[index]
    let temp_start = '',
      temp_end = '',
      temp_am = '',
      temp_pm = ''
    temp_start = row['220825095138x75p6LUFyF2yRbDCr9q'].value
    temp_end = row['220825100334ri7SdtvliWy0D1D1lm4'].value
    temp_am = row['220825095305xC0XmguHqkahYxRI8Ub'].text
    temp_pm = row['220825100122226q9w3vVYcS556xz8C'].text
    console.log('进入了', temp_start, temp_end, temp_am, temp_pm, index)
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
      vueData.$set(
        formData.multinfos[vueData.childK].rows[index],
        '220825100618QfVVve2jsXQW0t2u9Kj',
        { value: res },
      )
      //   console.log(formData)
    }
  }
  window.spJS = exportObj
})()
