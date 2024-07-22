//通辽待办特殊处理，需要打开手写签批插件
(function () {
    const exportObj = {};
    let fileData = {}
    let self = {}
    let formUrl = ""
    let attachmentUrl = ""
    let fileTimer=null
   async function dianJuFileOpen(part, fileUrl, suffix) {
        let can_edit = String(part.canEdit) === "1" ? true : false;
        let rootPath = dsf.url.getRootPath();
        const save_url = rootPath + `fn/mobileOffice/upload?fileId=${part.id}&moduleId=${part.moduleId}&pnId=${fileData.pnid}&nodeName=${fileData.nodeName}&fileType=1&infoId=${part.infoId}&extension=${suffix}&x-auth-token=${dsf.util.loadSessionStore("loginToken")}`;
        const down_url = rootPath + fileUrl;
        let obj = {
            fileUrl: down_url,
            title: part.title,
            canEdit: can_edit,
            uploadUrl: save_url,
            keyId: part.id,
            userName: dsf.util.loadSessionStore("user").name,
            webData: {
                webDianjutTab: true,
                formUrl: location.href.split("#/")[0] + `#/autoLoginToUrl/${dsf.util.loadSessionStore("loginToken")}/${formUrl}/` + Math.random() + "?isdjOpen=1",
                attachmentUrl: location.href.split("#/")[0] + `#/autoLoginToUrl/${dsf.util.loadSessionStore("loginToken")}/${attachmentUrl}/` + Math.random() + "?isdjOpen=1"
            },
            tab:[{"title":"签批单","type":"sign"},{"title":"附件","type":"attachment"},{"title":"表单","type":"form"}]
        };
        let isOpenSign = await isSignFileLock(part.id);
        console.log("点聚参数", obj);
        if(!isOpenSign){
            xsfCommon.dianJuSdk(JSON.stringify(obj), function success(result) {
                result = JSON.parse(result);
                console.log("打开点聚的回调参数", result)
                if (result.message == "dianjuUploadSuccess") {
                    // self.$eventBus.listSend(self, fileData)
                    self.$parent.$parent.$parent["action-faSong"]({ dataValue: fileData})
                } else if (result.message == "dianjuOpenSuccess") {
                    // 轮询文件加锁接口
                    continueLockFile(part.id);
                } else if (result.message == "dianjuOpenError") {
                    dsf.layer.alert({
                        message: "文件打开失败:" + down_url,
                    });
                }
                else if (result.message == 'dianjuFileClose') {
                    if (!(result.type == 'open' && result.result)) {
                        //根据type判断，只要是open,且result为true，那就是加锁，其余情况回调，就是解锁
                        destroyFileInterval(part.id)
                    } else if (result.type == 'send') {//签批界面的发送按钮回调
                        self.$parent.$parent.$parent["action-faSong"]({ dataValue: fileData})
                    }
                }
            }, function error(error) {
                console.log("open failed: ", error);
            }
            );
        }
        
    }
    function getInfo(itemValue, vueData, listid, moduleId, pk,){
        let form = {} 
        form.pk = pk
        form.listid = listid
        form.moduleId = moduleId
        form.method = vueData.$route.query.method || vueData.params?.method
        form.isEnterTodo = 1;
        form.type = "gw"
        if (itemValue.todoId && itemValue.todoId.indexOf("_") > -1) {//todoId是待办使用的，目前有列表返回todoId但是格式不正确，增加判断
          form.todoId = itemValue.todoId;
        }
        let getInfoUrl = dsf.config.clientType == "iPad" ? "fn/xform/getInfo?hd=1" : "fn/xform/getInfo"
        return dsf.http.get(getInfoUrl, form)
    } 
    exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
        self = vueData
        fileData = itemValue
        
        let query = {}
        if (itemValue.todoId && itemValue.todoId.indexOf("_") > -1) {//todoId是待办使用的，目前有列表返回todoId但是格式不正确，增加判断
            query.todoId = itemValue.todoId;
        }
        let params = moduleId + "/" + pk;
        formUrl = dsf.base64.encode("/commonForm/" + params + "?isShowHeader=0&isdjOpen=1&activeTab=formTab&hideOtherTab=1&todoId=" + query.todoId)

        let handWrittenFile = []

        getInfo(itemValue, vueData, listid, moduleId, pk).then(({ data }) => {
            let extraPageNum = data.struct.parameters.extraPageNum
            attachmentUrl = dsf.base64.encode("/commonForm/" + params + `?isShowHeader=0&isdjOpen=1&activeTab=${extraPageNum ? 'feedbackHandle' : 'relevantFile'}&hideOtherTab=1&todoId=${query.todoId}`)
            return extraPageNum
        }).then((res) => {
            let filesParams = {
                info_id: itemValue.info_id,
                infoId: itemValue.info_id,
                nodeId: itemValue.nodeId,
                flowId: itemValue.flowId,
                moduleId: moduleId,
                start: 1,
                limit: 100,
            }
            res ? filesParams.extraPageNum = res : ""
            dsf.http.post("fn/mobileAttachment/getFormAttachment", filesParams).then((data) => {
                let rows = data.data.rows;
                let loginToken = dsf.util.loadSessionStore("loginToken");
                rows.forEach((item) => {
                    if (item.document) {
                        item.document.forEach((doc, idx) => {
                            let obj = {
                                id: doc.id,
                                title: doc.title,
                                type: doc.type,
                                size: doc.showFileSize || "",
                                navtiveUrl: doc.url,
                                initUrl: `fn/file/download?infoId=${doc.infoId}&fileId=${doc.id}&fileName=${doc.title}&nrType=${doc.type}&moduleId=${doc.moduleId}&x-auth-token=${loginToken}&fullfilename=${doc.title}`,
                                infoId: doc.infoId,
                                moduleId: doc.moduleId,
                                isHandwrite: doc.isHandwrite,
                                isRevise: doc.isRevise,
                                isNoModify: doc.isNoModify,
                                canEdit: doc.canEdit,
                                canDownLoad: doc.canDownLoad,
                                name:
                                    item.document.length > 1
                                        ? `${item.name}${idx + 1}`
                                        : item.name,
                            };
                            if (obj.isHandwrite == "1") {
                                handWrittenFile.push(obj);
                            }
                        });
                    }
                });
                if (handWrittenFile.length) {
                    let file = handWrittenFile[0]
                    const index = file.navtiveUrl.lastIndexOf(".");
                    const suffix = file.navtiveUrl.substr(index + 1);
                    dianJuFileOpen(file, file.initUrl, suffix)
                } else {
                    query.notShowFeedbackHandle = true
                    vueData.$router.push({
                        path: "/commonForm/" + params,
                        query
                    });
                }
            }).catch((err) => console.log(err));
        })
    };
    // 判断文件是否锁住状态,其他人无法继续签批
    async function isSignFileLock(fileId) {
        let isLocked = false;
        // 是否开启了第三方插件拦截多人签批功能
        if (dsf.config.commonForm.isInterceptMultiPersonSign) {
            await dsf.http.post("fn/office/isLock", { fileId: fileId}).then(res => {
                    console.log("isLock-res", res);
                    if (res.data.type == 'error') {
                        // 别人在操作
                        dsf.layer.alert({
                            message: "当前文件正在由" + res.data.data.uname + "办理，请稍后处理。",
                        });
                        isLocked = true;
                    }
                })
        }
        return isLocked;
    };
    // 文件修改签批过程定时轮询
    function continueLockFile(fileId) {
        // 是否开启了第三方插件拦截多人签批功能
        if (dsf.config.commonForm.isInterceptMultiPersonSign) {
            fileTimer = setInterval(() => {
                dsf.http
                    .post("fn/office/continueLock", {
                        fileId: fileId,
                    })
                    .then((res) => {
                        console.log(res, '文件定时上锁')
                    })
            }, 30000);
        }
    }
    // 文件解锁
    function destroyFileInterval(fileId) {
        clearInterval(fileTimer);
        fileTimer = null;
        if (dsf.config.commonForm.isInterceptMultiPersonSign) {
            dsf.http
                .post("fn/office/unLock", {
                    fileId: fileId,
                })
                .then((res) => {
                    console.log(res, '文件解锁')
                })
        }
    }
    window.spListJS = exportObj;
})();
