/**
 * 舟山后勤部门  信息部门资产物品申领
 */

(function(){
   const exportObj = {};
   
   exportObj.link = function (listid, moduleId,pk, vueData, itemValue){
      console.log(listid,'111');
      vueData.$router.push({
         name: "commonForm",
         params: {
            moduleId: moduleId,
            pk: pk
         },
         query:{
            formId:"2212071528501SGcNBcmdUOfaFNs8Qv",
            listId:"220607185943bgCXVC160zh0eoqtijS"
         }
      })
   }

   exportObj.createRow = function (btn, vueData){
      vueData.$router.push({
         name: "commonForm",
         params: {
           moduleId: "220408093457S0PLZSRjf60HOnwf8LJ"
         },
         query:{
           formId:"2212071528501SGcNBcmdUOfaFNs8Qv",
         }
      })
   }
   window.spListJS = exportObj;
})();
