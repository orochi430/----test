// 一体化 收文
;(function () {
  const exportObj = {}
  var txTime = ""
  var bxtime = ""
  /**
   * 根据当前时间获取N天后的时间
   * @param date
   * @param days
   * @returns {*}
   */
  function addWorkdays(date, days) {
    date.setDate(date.getDate() + days - 1)
    return date
  }
  exportObj.initHandle = function (formData, formStruct, vueData) {
    vueData.$bus.on("checkVal", function (busObj) {
      if (busObj.metaData.metaId == "B0006") {
        var jjcd = busObj.value //获取当前公文种类
        // 获取当前时间
        var currentDate = new Date()
        //紧急程度为加急，办理期限默认值为当前时间+5天
        var target = $("#B0018")
        //增加之前先删除之前的
        $("div[name='timeRemaining']").remove()
        //加急
        if (jjcd == 2) {
          target.after(
            "<div  name='timeRemaining' class='ds_control ds_label_box text-center colorInherit' style='clear:both;color: red; font-size: 16px;display: flex;'><p>剩余5天</p></div>"
          )
          var futureDate = addWorkdays(currentDate, 5)
          var blrq = futureDate.getFullYear() + "-" + (futureDate.getMonth() + 1) + "-" + futureDate.getDate()
          vueData.$set(formData.main, "B0018", { value: blrq })
        }
        //紧急程度为特级，办理期限默认值为当前时间+3天
        if (jjcd == 3) {
          target.after(
            "<div  name='timeRemaining' class='ds_control ds_label_box text-center colorInherit' style='clear:both;color: red; font-size: 16px;display: flex;'><p>剩余3天</p></div>"
          )
          var futureDate = addWorkdays(currentDate, 3)
          var blrq = futureDate.getFullYear() + "-" + (futureDate.getMonth() + 1) + "-" + futureDate.getDate()
          vueData.$set(formData.main, "B0018", { value: blrq })
        }
      }
    })
    vueData.$bus.on("selectDateTime", function (busObj) {
      if (busObj.metaData.metaId == 'B0018') {
        if (new Date(busObj.value).getTime() < new Date(dsf.date.format(new Date(), 'yyyy-mm-dd')).getTime()) {
          vueData.$set(formData.main, 'B0018', {value: ''})
          dsf.layer.toast('办理期限小于当前时间，请重新选择。')
        }
      }
    })
    vueData.$watch(
      function () {
        return vueData.formData.main["B0018"].value
      },
      function (n, o) {
        //增加之前先删除之前的
        $("div[name='timeRemaining']").remove()
        if (n != '') {
          let today = new Date();
          let year = today.getFullYear();
          let month = today.getMonth() + 1;
          let day = today.getDate();
          if (month < 10) {
              month = '0' + month;
          }
          if (day < 10) {
              day = '0' + day;
          }
          let formattedDate = year + '-' + month + '-' + day;
          let xztime=new Date(n);
          let dqtime=new Date(formattedDate);
          let timeDiff = xztime - dqtime;
          let diffDays = '';
          if(timeDiff<0){
              diffDays = Math.ceil(Math.abs(timeDiff) / (1000 * 3600 * 24));
          }else{
              diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))+1;
          }
          let target = $("#B0018")
          target.after(`<div name='timeRemaining' style='color: ${timeDiff < 0 ? '#e30000' : diffDays > 1 ? '#0086d9' : '#FA6400'}'>
            ${timeDiff < 0 ? '超期' : '剩余'}${diffDays}天</div>`)
        }
      },
      {
        immediate: true
      }
    )
  }

  window.spJS = exportObj
})()
