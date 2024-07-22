// 新疆兵团子表的数据关联模块
(function (){

    const exportObj = {};

    exportObj.initHandle = function (formData, formStruct, vueData) {
        vueData.$bus.on("blurBus",function (busObj){
            if(busObj.subFormId = "221014094355FfVTiYvWIdqLFquVJVI"){
                if(vueData.formData.multinfos['221014094355FfVTiYvWIdqLFquVJVI'].rows.length > 0){
                    let NumberValue = 0
                    vueData.formData.multinfos['221014094355FfVTiYvWIdqLFquVJVI'].rows.forEach(item =>{
                            if(item['221014092547nKoUkfslybSrnrX4tBe'].value != '' && item['221014092729P0hFGPEksB0P6TWuGFt'].value !=''){
                                item['221014092919Q9ZXGoJSfqUVEio1d2j'].value = item['221014092547nKoUkfslybSrnrX4tBe'].value * item['221014092729P0hFGPEksB0P6TWuGFt'].value
                            }
                            if(item['221014092919Q9ZXGoJSfqUVEio1d2j'].value != ''){
                                NumberValue += item['221014092919Q9ZXGoJSfqUVEio1d2j'].value
                                vueData.formData.main['221014094133smjhjm7NNmLl6zvYnVb'].value = NumberValue
                            }
                    })
                }
            }
        })
        //监听子表删除的状态
        vueData.$bus.on("subFormDelete",function (busObj){
             if(vueData.formData.multinfos['221014094355FfVTiYvWIdqLFquVJVI'].rows.length == 0){
                vueData.formData.main['221014094133smjhjm7NNmLl6zvYnVb'].value = ''
            }
        })

        vueData.$bus.on("subFormAdd",function (busObj){
            dsf.http.post("ctrl/consumableGoods/getRemainFunds").then(({data})=>{
                console.log(data.data.remainFunds);
                vueData.formData.main['nOpfDxX7c6Myg9kx'].value = data.data.remainFunds
            }) 
        })
    }

    window.spJS = exportObj;

})()