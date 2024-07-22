// 振华重工新闻公告的特殊listJson的特殊js点击页面：
(function () {
    const exportObj = {};
    exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
        // if (itemValue.sfsywblj == -1 || itemValue.sfsywblj == '') {
        //     if (itemValue.url.length) {
        //         dsf.http.post('/fn/fileToken/get', {}).then((res) => {
        //             if (res.data && res.data.code == 200) {
        //                 vueData.$router.push({
        //                     name: 'dsfIframe',
        //                     query: {
        //                         url: `${itemValue.url}&token=${res.data.data}`
        //                     }
        //                 })
        //             }
        //         })
        //         // location.href = `${itemValue.url}&token=${res.data.data}`
        //     }
        // } else {
        //     // location.href = `${itemValue.url}`
        //     // xsfWindow.openWebView({
        //     //     title: itemValue.bt,
        //     //     url: itemValue.url,
        //     //     colorString: "#111111"
        //     // });
        //     dsf.util.openWebviewToUrl({ url: itemValue.url, title: itemValue.bt, colorString: '#fff' })
        // }
        if (itemValue.sfsywblj == "1") {
            // xsfWindow.openWebView({
            //     title: itemValue.bt,
            //     url: itemValue.url,
            //     colorString: "#111111"
            // })
            dsf.util.openWebviewToUrl({ url: itemValue.url, title: itemValue.bt })
        } else {
            if (itemValue.url.length) {
                dsf.http.post('/fn/fileToken/get', {}).then((res) => {
                    if (res.data && res.data.code == 200) {
                        // vueData.$router.push({
                        //     name: 'dsfIframe',
                        //     query: {
                        //         url: `${itemValue.url}&token=${res.data.data}`
                        //     }
                        // })
                        let url = `${itemValue.url}&token=${res.data.data}`
                        dsf.util.openWebviewToUrl({ url: url, title: itemValue.bt })
                    }
                })
            }
        }
        console.log('itemValue: ', itemValue);
        console.log('vueData: ', vueData);
        console.log('listid: ', listid);
    }
    window.spListJS = exportObj;
})()