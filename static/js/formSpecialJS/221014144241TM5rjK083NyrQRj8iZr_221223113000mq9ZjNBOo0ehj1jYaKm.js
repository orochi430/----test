// 新疆兵团采购单
(function (){
    const exportObj = {};

    exportObj.initHandle = function (formData, formStruct, vueData) {
        //监听子表输入
        vueData.$bus.on("blurBus",function (busObj){  
            if(busObj.subFormId == "221014160104KxuN3Xut4mayHZrDgMU"){
                if(vueData.formData.multinfos['221014160104KxuN3Xut4mayHZrDgMU'].rows.length > 0){
                    let arrValue =0
                    vueData.formData.multinfos['221014160104KxuN3Xut4mayHZrDgMU'].rows.forEach(item =>{
                        if(item['221014155640J3C09zhx5SDdXyfC9zM'].value !='' && item['221014155758IPq3ZgfkdOtfiyzNMGh'].value !=''){
                            item['221014155830JTmXtuKCunM05iVOvvX'].value = item['221014155640J3C09zhx5SDdXyfC9zM'].value *  item['221014155758IPq3ZgfkdOtfiyzNMGh'].value
                        }
                        if(item['221014155830JTmXtuKCunM05iVOvvX'].value !=''){
                            arrValue += item['221014155830JTmXtuKCunM05iVOvvX'].value
                            vueData.formData.main['221014153912BqAVIGjlZ2SzdFiMxoB'].value = arrValue
                        }
                    })
                }
            }
        })
        //监听删除子表
        vueData.$bus.on("subFormDelete",function (busObj){
            if(vueData.formData.multinfos['221014160104KxuN3Xut4mayHZrDgMU'].rows.length == 0){
               vueData.formData.main['221014153912BqAVIGjlZ2SzdFiMxoB'].value = ''
            }
            if(vueData.formData.multinfos['221014160104KxuN3Xut4mayHZrDgMU'].rows.length > 0){
                let sum = 0
                vueData.formData.multinfos['221014160104KxuN3Xut4mayHZrDgMU'].rows.forEach(item =>{
                    sum += Number(item['221014155830JTmXtuKCunM05iVOvvX'].value) 
                    vueData.formData.main['221014153912BqAVIGjlZ2SzdFiMxoB'].value = sum
                })
            }
        })
        // 选择采购计划子表新增
        vueData.$bus.on("subFormSelect",function (busObj){
            let pasmes = '';
            busObj.checkItems.forEach(item =>{
                pasmes += item.dataValue.A0001+','
            })
            let pasm ={ ids:pasmes }
            let NuberVa = 0
            dsf.http.post("ctrl/consumableGoods/getPurchaseOrderDataByIds",pasm).then(({data})=>{
                data.data.forEach(item => {
                    vueData.$refs.formTab[0].$refs['221014160104KxuN3Xut4mayHZrDgMU'][0].$refs.subform.addCard(false).then((newData) =>{
                        //易耗品名称
                        vueData.$set(newData,'221014154711AaUMgKWe5ngn3Kq9PWg',{
                            value:item.name
                        })
                        //易耗品分类
                        vueData.$set(newData,'221212130937TkIG8BWD6PXq02ppo86',{
                            value:item.yhpfl,
                            text:item.yhpfl_text
                        })
                        //品牌
                        vueData.$set(newData,'221014155553RtmOWS8EiWkrRjJfCwx',{
                            value:item.brand
                        })
                        //型号
                        vueData.$set(newData,'221014155616IWMlaSoEJOo1bDQ5j5L',{
                            value:item.model
                        })
                        //数量
                        vueData.$set(newData,'221014155640J3C09zhx5SDdXyfC9zM',{
                            value:item.numbers
                        })
                        //估算价格
                        vueData.$set(newData,'221014155758IPq3ZgfkdOtfiyzNMGh',{
                            value:item.price
                        })
                        //估算总价
                        vueData.$set(newData,'221014155830JTmXtuKCunM05iVOvvX',{
                            value:item.money
                        })
                    })
                    
                    if(vueData.formData.main['221014153912BqAVIGjlZ2SzdFiMxoB'].value != ''){
                        vueData.formData.main['221014153912BqAVIGjlZ2SzdFiMxoB'].value = Number(vueData.formData.main['221014153912BqAVIGjlZ2SzdFiMxoB'].value) + Number(item.money)
                    }else{
                        NuberVa +=Number(item.money)
                        vueData.formData.main['221014153912BqAVIGjlZ2SzdFiMxoB'].value = NuberVa
                    }
                })
            })
        })
    }

    window.spJS = exportObj;
})()