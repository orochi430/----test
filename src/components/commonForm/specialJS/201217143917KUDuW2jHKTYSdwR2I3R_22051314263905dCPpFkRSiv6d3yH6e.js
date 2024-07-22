// 【江西省委党校智慧校园二期-oa】设施设备及配件领用申请 移动端对该项标题进行桥接 。
const exportObj = {};
exportObj.saveFilter =  function (formData, formStruct, VueData) {
    let dataArr = [];
    // 获取子表的物品名称和领用理由
    formData.multinfos['211217151706BpiLQH2M278Rdt2zo4G'].rows.forEach((item)=>{
        let dataObj = {};
        dataObj.title=item['C-ERP-OFFICE-REPAIR-0002'].value;
        dataObj.main=item['C-ERP-OFFICE-REPAIR-0003'].value;
        // 把所有子表的物品名称和领用理由放进数组
        dataArr.push(dataObj);
    })
    // 把所有子表的物品名称和领用理由放进数组，把数组的每一项转变成 标题桥接的模板：物品名称（领用理由） 字符串
    let newArr= dataArr.map((item)=>{
        return `${item.title}(${item.main})`;
    })
    // 拆分成数组并赋值为标题
    let newtitle = newArr.length==1?newArr.join() : newArr.join(',')
    VueData.$set(formData.main, 'B0001',{value:newtitle});

    return new Promise(function(resolve,reject){
        resolve();
    })
   
  }

export default exportObj;
