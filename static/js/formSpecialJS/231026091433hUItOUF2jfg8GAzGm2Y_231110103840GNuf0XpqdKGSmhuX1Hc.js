// 成都一体化 签报管理   字体样式
(function () {
    const exportObj = {};
    exportObj.initHandle = function (formData, formStruct, vueData) {
        const cssRule = `.layout_box{font-family: KT_GB2312 !important;}`; // 特殊样式写在此
        let resetStyle = document.createElement("style");
        resetStyle.type = "text/css";
        vueData.$el.appendChild(resetStyle);
        resetStyle.innerHTML = cssRule;
        let metaIds = ["C-QB-0005"];
        // this["metaData"].show = 0;
        metaIds.forEach(item => {
            let obj = formStruct.controls.find(it => it.metaId == item && !it.privilege.editable && it.privilege.visible);
            if ((formData.main[item].value == "" || formData.main[item].text == "") && obj) {
                obj.show = 0;
                obj.privilege.visible = false;
            }

        })
    }
    window.spJS = exportObj
})();
