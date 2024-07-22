/**
 * 值班要情
 * 已读未读操作方法；
 */
(function () {
    const exportObj = {};
    function change(listData, vueData) {
        listData.forEach(element => {
            if (element.dataValue["XZBYQZB_0012.C-OA-ZBYQ-REC-0003.value"] == "-1" && element.dataValue["XZBYQZB_0012.220630172127nPhjgfpUqUSkOzMQFta.value"] == "1") {
                element.dataValue["readStyle"] = { "backgroundColor": "#e33e3e" }
            } else if (element.dataValue["XZBYQZB_0012.C-OA-ZBYQ-REC-0003.value"] == "-1" && element.dataValue["XZBYQZB_0012.220630172127nPhjgfpUqUSkOzMQFta.value"] == "-1") {
                element.dataValue["readStyle"] = { "backgroundColor": "#ffff4f" }
            }
            vueData.$set(element.dataValue, "XZBYQZB_0012.220630172127nPhjgfpUqUSkOzMQFta", "")
            vueData.$set(element.dataValue, "XZBYQZB_0012.220630172127nPhjgfpUqUSkOzMQFta.text", "")
            if (element.dataValue["XZBYQZB_0012.220520164554d666jiYmG1n0cWok1Nj.value"] == "1" && element.dataValue["XZBYQ_0012.220327154805LE1oWI0vlsrNtyNAX2P.value"] == "1") {
                element.dataValue["iconBeforeTitleStyle"] = { "backgroundColor": "#2271b3" }
                vueData.$set(element.dataValue, "XZBYQZB_0012.220630172127nPhjgfpUqUSkOzMQFta", "批示")
                vueData.$set(element.dataValue, "XZBYQZB_0012.220630172127nPhjgfpUqUSkOzMQFta.text", "批示")
            }
            else if (element.dataValue["XZBYQZB_0012.220520164554d666jiYmG1n0cWok1Nj.value"] == "-1" && element.dataValue["XZBYQ_0012.220327154805LE1oWI0vlsrNtyNAX2P.value"] == "1") {
                element.dataValue["iconBeforeTitleStyle"] = { "backgroundColor": "#e33e3e" }
                vueData.$set(element.dataValue, "XZBYQZB_0012.220630172127nPhjgfpUqUSkOzMQFta", "批示")
                vueData.$set(element.dataValue, "XZBYQZB_0012.220630172127nPhjgfpUqUSkOzMQFta.text", "批示")
            }
        });
    }
    let listInterval
    exportObj.dataFilter = function (listData, vueData) {
        clearInterval(listInterval)
        change(listData, vueData)
        if (!vueData.data.length) {
            let params = {
                limit: 15,
                page: 1
            }
            if(vueData.keyword) {
                params["_content"] = vueData.keyword
                params["key"] = vueData.keyword
            }
            params = JSON.parse(JSON.stringify(Object.assign(params, vueData.paramsData)))
            listInterval = setInterval(() => {
                dsf.http.post("fn/list/220317160207E92X2pritnesHd7IoHU/mobile/q?moduleId=220303113130omuV4PLAr9v5Th2d34D", params).then(({ data }) => {
                    vueData.data = data.datas
                    change(vueData.data, vueData)
                })
            }, 10000)
        }

    }
    exportObj.initHandle = function (vueData) {
        // ctrl/sx/schedule/makeRead
        // pk : 跟配置确认取ORDERLYEVENT_SUB_REC.ID字段
        // type : 固定传 yq
        vueData.readStatusKey = 'XZBYQZB_0012.C-OA-ZBYQ-REC-0003.value'
        vueData.haveReadVal = "1"

        vueData.$bus.on("emitPs", (data) => {
            vueData.data.forEach(itemdata => {
                if (itemdata.dataValue["XZBYQ_0012.A0001"] == data.pk) {
                    vueData.$delete(itemdata.dataValue, "iconBeforeTitleStyle");
                    vueData.$set(itemdata.dataValue, "iconBeforeTitleStyle", { "backgroundColor": "#2271b3" })
                }
            })
        })


    }
    exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
        let params = { pk: itemValue["XZBYQZB_0012.A0001"], type: "yq" }
        dsf.http.post("fn/sx/schedule/makeRead", params).then(res => {
            if (res.data.code == "200") {
                itemValue["XZBYQZB_0012.C-OA-ZBYQ-REC-0003"] = "已读"
                itemValue["XZBYQZB_0012.C-OA-ZBYQ-REC-0003.value"] = "1"
                // itemValue["XZBYQZB_0012.220630172127nPhjgfpUqUSkOzMQFta"] = ""
            }
        });
        vueData.$router.push({
            path: `/commonForm/${moduleId}/${pk}?listId=220216130055y1ZVwKmTeaAyZyW7QeU&validateByList=1&method=view&title=值班要情`
        })
    }
    window.spListJS = exportObj;
})();