// 驻京办 入住登记已安排
;(function () {
  const exportObj = {}
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    dsf.http.post('ctrl/official/getRegistRoom', { pk: pk }).then(res => {
      if (res.data.code == 200) {
        vueData.$router.push({
          path: `/commonForm/230523195650wi1cAJX7q18JRpeqzK9/${res.data.message}?listId=${listid}`
        })
      }
    })

  }
  window.spListJS = exportObj
})()
