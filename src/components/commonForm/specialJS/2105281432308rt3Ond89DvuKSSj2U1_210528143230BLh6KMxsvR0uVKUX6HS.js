const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {
  let total = 0
  let twinRoomTotal = 0
  let singleRoomTotal = 0
  let mealTotal = 0
  let placeTotal = 0
  let supplelyTotal = 0
  let carTotal = 0
  function setTotal() {
    total = twinRoomTotal + singleRoomTotal + mealTotal + placeTotal + supplelyTotal + carTotal + Number(formData.main['C-ERP-PAYCOST-0085'].value) + Number(formData.main['C-ERP-PAYCOST-0084'].value) + Number(formData.main['C-ERP-PAYCOST-0082'].value) + Number(formData.main['C-ERP-PAYCOST-0041'].value)
    vueData.$set(formData.main, 'C-ERP-PAYCOST-0001', {value: dsf.util.amountWords(total)})
  }
  vueData.$bus.on("blurBus", function (busObj) {
    console.log(busObj)
    if (busObj.metaData.metaId == "C-ERP-PAYCOST-0076" || busObj.metaData.metaId == "C-ERP-PAYCOST-0043") { // 标准间总价
      let num = !isNaN(Number(formData.main['C-ERP-PAYCOST-0076'].value)) ? formData.main['C-ERP-PAYCOST-0076'].value : 0
      let unit = !isNaN(Number(formData.main['C-ERP-PAYCOST-0043'].value)) ? formData.main['C-ERP-PAYCOST-0043'].value : 0
      twinRoomTotal = num * unit
      vueData.$set(formData.main, 'C-ERP-PAYCOST-0023', {value: twinRoomTotal})
      setTotal()
    } else if (busObj.metaData.metaId == "C-ERP-PAYCOST-0046" || busObj.metaData.metaId == "C-ERP-PAYCOST-0039") { // 单人间总价
      let num = !isNaN(Number(formData.main['C-ERP-PAYCOST-0046'].value)) ? formData.main['C-ERP-PAYCOST-0046'].value : 0
      let unit = !isNaN(Number(formData.main['C-ERP-PAYCOST-0039'].value)) ? formData.main['C-ERP-PAYCOST-0039'].value : 0
      singleRoomTotal = num * unit
      vueData.$set(formData.main, 'C-ERP-PAYCOST-0022', {value: singleRoomTotal})
      setTotal()
    } else if (busObj.metaData.metaId == "C-ERP-PAYCOST-0061" || busObj.metaData.metaId == "C-ERP-PAYCOST-0078") { //餐费总价
      let num = !isNaN(Number(formData.main['C-ERP-PAYCOST-0061'].value)) ? formData.main['C-ERP-PAYCOST-0061'].value : 0
      let unit = !isNaN(Number(formData.main['C-ERP-PAYCOST-0078'].value)) ? formData.main['C-ERP-PAYCOST-0078'].value : 0
      mealTotal = num * unit
      vueData.$set(formData.main, 'C-ERP-PAYCOST-0079', {value: mealTotal})
      setTotal()
    } else if (busObj.metaData.metaId == "C-ERP-PAYCOST-0040" || busObj.metaData.metaId == "C-ERP-PAYCOST-0047") { //场地总价
      let num = !isNaN(Number(formData.main['C-ERP-PAYCOST-0040'].value)) ? formData.main['C-ERP-PAYCOST-0040'].value : 0
      let unit = !isNaN(Number(formData.main['C-ERP-PAYCOST-0047'].value)) ? formData.main['C-ERP-PAYCOST-0047'].value : 0
      placeTotal = num * unit
      vueData.$set(formData.main, 'C-ERP-PAYCOST-0080', {value:  placeTotal})
      setTotal()
    } else if (busObj.metaData.metaId == "C-ERP-PAYCOST-0086" || busObj.metaData.metaId == "C-ERP-PAYCOST-0087") { //办公用品总价
      let num = !isNaN(Number(formData.main['C-ERP-PAYCOST-0086'].value)) ? formData.main['C-ERP-PAYCOST-0086'].value : 0
      let unit = !isNaN(Number(formData.main['C-ERP-PAYCOST-0087'].value)) ? formData.main['C-ERP-PAYCOST-0087'].value : 0
      supplelyTotal = num * unit
      vueData.$set(formData.main, 'C-ERP-PAYCOST-0088', {value:  supplelyTotal})
      setTotal()
    } else if (busObj.metaData.metaId == "C-ERP-PAYCOST-0054" || busObj.metaData.metaId == "C-ERP-PAYCOST-0042") { //租赁车辆总价
      let num = !isNaN(Number(formData.main['C-ERP-PAYCOST-0054'].value)) ? formData.main['C-ERP-PAYCOST-0054'].value : 0
      let unit = !isNaN(Number(formData.main['C-ERP-PAYCOST-0042'].value)) ? formData.main['C-ERP-PAYCOST-0042'].value : 0
      carTotal = num * unit
      vueData.$set(formData.main, 'C-ERP-PAYCOST-0081', {value: carTotal})
      setTotal()
    } else if (busObj.metaData.metaId == "C-ERP-PAYCOST-0041" || busObj.metaData.metaId == "C-ERP-PAYCOST-0082" || busObj.metaData.metaId == "C-ERP-PAYCOST-0084" || busObj.metaData.metaId == "C-ERP-PAYCOST-0085") {
      setTotal()
    }
  });
}
export default exportObj;