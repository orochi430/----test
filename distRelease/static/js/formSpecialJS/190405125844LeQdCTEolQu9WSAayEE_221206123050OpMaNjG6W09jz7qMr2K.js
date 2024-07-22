// 农业农村部 部收文
(function () {
  const exportObj = {};

  exportObj.initHandle = function (formData, formStruct, vueData) {
    if (formData.main['B0001'] && formData.main['B0001'].value) {
      dsf.url.setTitle(formData.main['B0001'].value)
    }
    const cssRule = `
      .pad_layout_box {font-family: '楷体';}
      .pad_layout_box .control_label{font-family: '方正书宋_GBK';}
      .pad_layout_box .control_mobile_fl{font-family: '方正书宋_GBK';}
      #ctr_Z2IGFyQRutjU865F .controlTextBox {font-family: '方正书宋_GBK';}
      .van-col {min-height: 0;}
      .formLayout {border-top: 0 !important;}
      .formLayout >.box >.padLeftRight:first-child::before, .formLayout>.box>.padLeftRight:last-child::after { border-width: 2px; }
      #row1_col1::after, #row1_col1::before, #row2_col1::before, #row2_col2::before, #row2_col2::after { border: 0;}      
      #ctr_Z2IGFyQRutjU865F::after, #ctr_1Jb0E8RW1l54wqzQ::after { border: 0 !important;}
      #ctr_5OdsE5Y4Fk2R0dZo ::after, #ctr_fH2SpKPFdXMkgwAU ::after { border: 0; }
      #row3_col1, #row9_col1, #row13_col1, #row15_col1, #row18_col1 {border-top: 1px solid ${vueData.formMeta.parameters.formColor}; border-bottom: 1px solid ${vueData.formMeta.parameters.formColor}}
      #ctr_OG7uMOS3grfyNv5o::after {border-width: 2px}
      
      #ctr_6xqFuf9EKebrJaY5 {min-height: 100px;}
      #ctr_1Jb0E8RW1l54wqzQ, #ctr_b49G4sQRYFgtFyXP {min-height: 30px;}

	  .controlOpinionView .opinionText {text-indent: 2em;}
    `;
    let resetStyle = document.createElement("style");
    resetStyle.type = "text/css";
    vueData.$el.appendChild(resetStyle);
    resetStyle.innerHTML = cssRule;

  }

  window.spJS = exportObj;
})();
