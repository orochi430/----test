/**
 * 舟山 后勤
 * 表单校验
 */

(function () {
    const exportObj = {};

    exportObj.initHandle = function (formData){
        if(formData.main["A0040"].value == "拟稿中"){
           formData.main['OA-ASSETS-0038'].value = '0'
            formData.main['OA-ASSETS-0038'].text = '后勤处'  
        }
    }

    exportObj.saveFilter = function (formData, formMeta, vueData) {
        let obj = [];
        formData.multinfos["220408095920vohoZK2cOrkv6U55hvz"].rows.forEach(item => {
            if (Number(item["OA-ASSETS-DETAILED-0006"].value) <= Number(item["221207184025nH7JW0E8iDUggzgALyL"].value)) {
                var NumberValue = 1;
                obj.push(NumberValue);
            } else {
                var NumberValue = 0;
                obj.push(NumberValue);
            }
        });



        let flag = obj.every(function (a) {
            return a == 1;
        });

        return new Promise(function (resolve, reject) {
            if (flag == true) {
                resolve();
            } else if (flag == false) {
                reject("申领的数量不能大于库存!");
            }
        });
    };

    window.spJS = exportObj;
})();
