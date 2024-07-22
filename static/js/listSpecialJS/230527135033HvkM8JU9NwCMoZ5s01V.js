// 点击选择列表
(function (){
    const exportObj = {}
    exportObj.createRow = function (btn, vueData) {
        vueData.checkType = "radio";
        vueData.commonPopParam = {
          listId: "230527103751WTKjVqb4SysrGwym0iu",
          moduleId: "230527101810EoLg79Pm0WBylm6O25Y"
        }
        vueData.commonPop = true;
    }
   // 230527135032zN2EJic4OUcu06z1wwe_230527135033VtfmIIcQFPmzdf5brYn
    exportObj.choose = function (checkItems, vueData) {
        console.log("choose", checkItems);
            vueData.commonPop = false;
            let route = {
                name: "commonForm",
                params: {
                  moduleId: "230527135032zN2EJic4OUcu06z1wwe"
                }
                ,
                query: {
                    didian: checkItems[0].dataValue['230527102336trrdA6tPhUuteE8qdo6'],
                    b001:checkItems[0].dataValue.B0001,
                    oa0002:checkItems[0].dataValue['OA-DY-SURVEY-0002'],
                    oa0005:checkItems[0].dataValue['OA-DY-SURVEY-0005'],
                    schema:checkItems[0].dataValue['OA-DY-SURVEY-0002.schema'],
                    value:checkItems[0].dataValue['OA-DY-SURVEY-0002.value']
                }
              }
         setTimeout(()=> {
            vueData.$router.push(route)
         },100)
    }

    window.spListJS = exportObj;
})()