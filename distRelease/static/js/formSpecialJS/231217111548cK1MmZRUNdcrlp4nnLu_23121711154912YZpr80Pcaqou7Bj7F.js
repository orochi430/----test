// 成都一体化  子流程 字体样式
(function () {
    const exportObj = {};


    exportObj.initHandle = function (formData, formStruct, vueData) {
        
        const cssRule = `.layout_box{font-family: KT_GB2312 !important;}`; // 特殊样式写在此
        let resetStyle = document.createElement("style");
        resetStyle.type = "text/css";
        vueData.$el.appendChild(resetStyle);
        resetStyle.innerHTML = cssRule;

    };


    window.spJS = exportObj;
})();