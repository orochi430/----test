/**
 * 信息填报
 * 
 * */
const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    return;
    //alert(1);
    //  let newpk='';
    //  //请求接口获取当前操作数据的pk
    //  dsf.http.post("/fn/resumption/toadyForm?projectId="+pk, {}).then(res => {
    //     if (res.data.code == 200) {
    //         newpk=res.data.data.pk;
    //         vueData.$router.push({
    //             path: "/commonForm/220509172517m6bynFnIjv7yMk28uzq/"+newpk,
    //             query: {
    //                 projectName:itemValue["C-PROJECT-MAINTAIN-001"]
    //               }
    //         });
    //     }
    // });
}

exportObj.fillInProjectInfo = function (rowObj, vueData) {
    let newpk = '';
    //请求接口获取当前操作数据的pkA0001
    dsf.http.post("/fn/resumption/toadyForm?projectId=" + rowObj.dataValue["A0001"], {}).then(res => {
        if (res.data.code == 200) {
            newpk = res.data.data.pk;
            let queryObj = {
                projectName: rowObj.dataValue["C-PROJECT-MAINTAIN-001"],
                B0054: rowObj.dataValue["B0054.value"],
                CPROJECTMAINTAIN006: rowObj.dataValue["C-PROJECT-MAINTAIN-006.value"]
            };
            if (res.data.data.initDataSource && res.data.data.initDataSource == 1) {
                queryObj.initDataSource = res.data.data.initDataSource
            }
            vueData.$router.push({
                path: "/commonForm/220509172517m6bynFnIjv7yMk28uzq/" + newpk,
                query: queryObj
            });
        }
    });
}
exportObj.fillInProjectInfoByWeek = function (rowObj, vueData) {
    let newpk = '';
    //请求接口获取当前操作数据的pkA0001
    dsf.http.post("/fn/resumption/toWeekForm?projectId=" + rowObj.dataValue["A0001"], {}).then(res => {
        if (res.data.code == 200) {
            newpk = res.data.data.pk;
            let queryObj = {
                listId: "220509201313UNAlxxeSZoGWEXImCr1",
                method: "edit",
                projectName: rowObj.dataValue["C-PROJECT-MAINTAIN-001"],
                projectName007t: rowObj.dataValue["C-PROJECT-MAINTAIN-007.text"],
                projectName007v: rowObj.dataValue["C-PROJECT-MAINTAIN-007.value"],
                projectName008t: rowObj.dataValue["C-PROJECT-MAINTAIN-008.text"],
                projectName008v: rowObj.dataValue["C-PROJECT-MAINTAIN-008.value"]
            };
            if (res.data.data.initDataSource && res.data.data.initDataSource == 1) {
                queryObj.initDataSource = res.data.data.initDataSource
            }
            vueData.$router.push({
                path: "/commonForm/220509172517m6bynFnIjv7yMk28uzq/" + newpk,
                query: queryObj
            });
        }
    });
}
export default exportObj;