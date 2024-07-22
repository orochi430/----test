(function () {
  //黑医药服务周报
  const exportObj = {}
  let enumData = []
  exportObj.initHandle = function (formData, formStruct, vueData) {
    console.log('初始化了', vueData.pk)
    if (!vueData.pk) {
      vueData.service_about = {}
      enumData = getAllWear(vueData, formData) //一年总共周期数据
      dsf.http.post('ctrl/siteManager/getSiteInfo', {}).then((res) => {
        //获取用户所属服务站
        if (res.data.code == 200) {
          vueData.name_temp = res.data.data.name
          let num = formData.main['220920194224C1kqPPHOSa23xcTNcwU'].value
          let year = new Date().getFullYear()
          vueData.service_about = res.data.data
          vueData.$set(formData.main, 'B0001', {
            value: `${
              vueData.service_about.name || '服务站'
            }${year}年${num}期周报`,
          })
          vueData.$set(formData.main, '220916102923LiaeKG8cT9HMJsTdJQJ', {
            //存储服务站id
            value: res.data.data.id,
          })
          vueData.$set(formData.main, '22091610284377i43MVbA4Ar0KH2dcR', {
            //服务站name
            value: res.data.data.name,
          })
          getWeeklyData(vueData, formData)
        }
      })

      vueData.$bus.on('showCheckBox', function (vueObj) {
        // debugger
        if (vueObj.metaData.metaId == '220920194224C1kqPPHOSa23xcTNcwU') {
          vueObj.controlData.columnsValue.columns = enumData
          vueObj.currentColumns = enumData
        }
      })
      vueData.$bus.on('checkVal', (obj) => {
        console.log(obj)
        // debugger
        // 如果是选择的替换班员
        if (obj.metaData.metaId == '220920194224C1kqPPHOSa23xcTNcwU') {
          setWeekAround(obj, vueData, formData, 'setTitle')
        }
      })

      // 设置周报期数
    }
  }

  //   设置年 周  时间段
  function setWeekAround(obj, vueData, formData, mes) {
    let temp = {}
    if (mes == 'initial') {
      temp = obj
    } else {
      temp = enumData.filter((ele) => {
        return ele.value == obj.value
      })[0]
    }
    vueData.$set(formData.main, '220916103026FKrIzGlMNazHDVqFprL', {
      value: temp.year,
    })
    vueData.$set(formData.main, 'B0020 ', {
      value: temp.value,
    })
    vueData.$set(formData.main, '220916133734GFtpih8RTQZpT0pUHEz', {
      value: `${temp.week_result[0]}-${temp.week_result[1]}`,
    })

    vueData.$set(formData.main, 'B0001', {
      value: `${vueData.service_about.name || '服务站'}${temp.year}年${
        temp.value
      }期周报`,
    })
    if (mes == 'setTitle') {
      getWeeklyData(vueData, formData)
    }
  }

  //   获取周报数据
  function getWeeklyData(vueData, formData) {
    // console.log(vueData.service_about, formData.main)
    dsf.http
      .post('ctrl/siteManager/getFwzbInfo', {
        date: formData.main['220916133734GFtpih8RTQZpT0pUHEz'].value,
        siteId: vueData.service_about.id,
      })
      .then((res) => {
        //获取用户所属服务站
        if (res.data.code == 200) {
          let temp = res.data.data
          vueData.$set(formData.main, '220912094518NX1GNW1oDngsMlKTbwa', {
            value: temp.pj,
          })
          vueData.$set(formData.main, '220912094604tB4waxXT26eMXy2k6Iz', {
            value: temp.qd,
          })
          vueData.$set(formData.main, '220912094639XQvxdqmVqFlhvxOASnQ', {
            value: temp.qt,
          })
        }
      })
  }

  // 获取一年中的所有周，开始及结束
  function getAllWear(vueData, formData) {
    // 页面初始需要的周和月的数据
    const date = new Date()
    let year = date.getFullYear()
    //   该年总共多少周
    let total = getYearWeek(date.getFullYear(), 12, 31)
    let week_list = []

    for (let i = 1; i < total; i++) {
      let obj = {}
      let temp = year + '-' + i
      let result = week_date(temp)
      let text = `${i}期`
      obj = {
        id: i,
        remark: '',
        text: text,
        value: i,
        varClass: 'layui-col-md3',
        year: year,
        week_result: result,
      }

      //   判断是否为当前周，赋默认值
      if (
        new Date(result[0]).getTime() <= new Date().getTime() &&
        new Date().getTime() <= new Date(result[1]).getTime()
      ) {
        vueData.$set(formData.main, '220920194224C1kqPPHOSa23xcTNcwU', {
          value: i,
          text: text,
        })
        setWeekAround(obj, vueData, formData, 'initial')
      }

      week_list.push(obj)
    }
    console.log(week_list)

    return week_list
  }

  // 页面初始时获取当前是本年第几周
  function getYearWeek(a, b, c) {
    //a为年 b为月 c为日
    /*  
         date1是当前日期  
         date2是当年第一天  
         d是当前日期是今年第多少天  
         用d + 当前年的第一天的周差距的和在除以7就是本年第几周  
     */
    var date1 = new Date(a, parseInt(b) - 1, c),
      date2 = new Date(a, 0, 1),
      d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000)
    return Math.ceil((d + (date2.getDay() + 1 - 1)) / 7)
  }

  // 第n年的第n周，获取开始和结束时间 （星期一为一周的开始）
  function week_date(weekstr) {
    let year = weekstr.split('-')[0]
    let weekNo = weekstr.split('-')[1]
    // 此年1号是星期几
    // console.log('调用时传的',year,weekNo);
    let oneday = new Date(year + '-01-01').getDay() //0-6
    // console.log(oneday);
    // 方便计算，当为星期天时为7
    if (oneday == 0) {
      oneday = 7
    }

    let one_fistday
    let one_lastday
    // 如果1号刚好是星期一
    if (oneday == 1) {
      one_fistday = year + '-01-01'
      one_lastday = year + '-01-07'
    } else {
      let jj = 8 - oneday
      one_fistday =
        year -
        1 +
        '-12-' +
        (31 - oneday + 2 > 9 ? 31 - oneday + 2 : '0' + (31 - oneday + 2))
      one_lastday = year + '-01-' + (jj > 9 ? jj : '0' + jj)
    }

    let fistday
    let lastday
    // 如果刚好是第一周
    if (weekNo == 1) {
      fistday = one_fistday
      lastday = one_lastday
    } else {
      fistday = addDate(one_lastday, (weekNo - 2) * 7 + 1)
      lastday = addDate(one_lastday, (weekNo - 1) * 7)
    }
    // console.log(fistday, lastday)
    return [fistday, lastday]
  }

  //日期加减法  date参数为计算开始的日期，days为需要加的天数
  //格式:addDate('2017-1-11',20)
  function addDate(date, days) {
    var d = new Date(date)
    d.setDate(d.getDate() + days)
    var m = d.getMonth() + 1

    return (
      d.getFullYear() +
      '.' +
      (m > 9 ? m : '0' + m) +
      '.' +
      (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
    )
  }

  window.spJS = exportObj
})()
