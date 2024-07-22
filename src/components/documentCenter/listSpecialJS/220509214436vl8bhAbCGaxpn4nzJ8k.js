/**
 * 信息填报
 * 
 * */
 const exportObj = {};
 exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    //  let newpk='';
    //  //请求接口获取当前操作数据的pk
        vueData.$router.push({
                path: "/commonForm/220509172517m6bynFnIjv7yMk28uzq/"+pk,
                query: {
                    listId:"220509201313UNAlxxeSZoGWEXImCr1",
                    method:"view",
                    validateByList:1
                  }
            });
 }
 export default exportObj;