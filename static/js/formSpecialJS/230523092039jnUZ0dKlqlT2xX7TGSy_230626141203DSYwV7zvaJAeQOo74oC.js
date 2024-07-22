(function () {
    const exportObj = {};
    exportObj.initHandle = async function (formData, formStruct, vueData) {
        vueData.$bus.on("selectUserBus", function (busObj) {
            console.log(busObj,"0000");
            dsf.http.post(`/ctrl/leave/approval/userInfo`, {
                userID: busObj.selectArr[0].id,
                schema: busObj.schema
            })
                .then(({ data }) => {
                    if (data.code == 200) {
                        vueData.$set(formData.multinfos['230626163909y8bqSp287lw63X9rIMK'].rows[busObj.subFormIndex], 'B0011',{value:data.data.unit})
                        vueData.$set(formData.multinfos['230626163909y8bqSp287lw63X9rIMK'].rows[busObj.subFormIndex], 'B0010',{value:data.data.department})
                        vueData.$set(formData.multinfos['230626163909y8bqSp287lw63X9rIMK'].rows[busObj.subFormIndex], '230523100934IQrog7tLyi9RQ84vyX1',{value:data.data.duties})
                    }
                })
                .catch(({ data }) => {
                    dsf.layer.toast(data.message)
                })
        })
    }
    window.spJS = exportObj;
})()