/**
 * 新疆兵团特殊列表
 */
(function (){
    const exportObj = {};
    exportObj.dataFilter = function (listData, vueData) {
        sessionStorage.setItem( 'username',JSON.stringify(vueData.keyword));
        //let arrValue =JSON.parse(sessionStorage.getItem('username')) 
    }

    window.spListJS = exportObj;
})()