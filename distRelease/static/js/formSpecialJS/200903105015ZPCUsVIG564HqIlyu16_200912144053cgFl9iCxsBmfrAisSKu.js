(function() {
  const exportObj = {};

  exportObj.initHandle = function (formData, formStruct, vueData) {
    let dsEnclosureButton = document.querySelector(".ds-enclosure-button")
    dsEnclosureButton ? dsEnclosureButton.style.display = "none" : ""
  }

  window.spJS = exportObj;
})();