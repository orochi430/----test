// 成都一体化 发文管理
(function () {
    const exportObj = {};
    exportObj.initHandle = function (formData, formStruct, vueData) {
        const cssRule = `.layout_box{font-family: KT_GB2312 !important;}`; // 特殊样式写在此
        let resetStyle = document.createElement("style");
        resetStyle.type = "text/css";
        vueData.$el.appendChild(resetStyle);
        resetStyle.innerHTML = cssRule;
        let metaIds = ["B0016", "C-GW-FW-0001", "C-GW-FW-0002", "C-FW-0031", "B0024", "C-GW-FW-0112", "C-FW-0022", "B0005", "B0022", "C-FW-0010", "C-FW-0042", "B0060","B0003"];
        // this["metaData"].show = 0;
        metaIds.forEach(item=>{
            let obj = formStruct.controls.find(it => it.metaId == item &&!it.privilege.editable && it.privilege.visible);
            if ((formData.main[item].value == "" || formData.main[item].text == "") && obj){
                obj.show=0;
                obj.privilege.visible =false;
            }
            
        })
        // let control= formStruct.controls.find(item=>item.metaId =="B0003");
        // control.propertyShow=true;
        // let validators = ["C-FW-0028", "B0050"];
        // validators.forEach(item=>{
        //     let obj = formStruct.controls.find(it => it.metaId == item && !it.privilege.editable && it.privilege.visible);
        //     // console.log("obj111",obj);
        //     vueData.$nextTick(()=>{
        //         if (obj) vueData.$delete(obj.validator, 'required');
        //     })
            
            
        // })
        
    }
    window.spJS = exportObj;
})();