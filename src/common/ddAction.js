import dsf from ".";

export default {
  Ding(param) {
    let sessionUser = dsf.util.loadSessionStore("user")
    let users = Array.from(new Set(param.users)).filter(item => {
      console.log(item.length, sessionUser.foreignId)
      if (item.length && item != sessionUser.foreignId) {
        return item
      }
    })
    if (!users.length) {
      dsf.layer.toast("暂无可钉人员");
      return
    }
    if (!param.alertType) {
      param.alertType = 2
    }
    param.users = users
    dsf.mix(param, {
      corpId: dsf.config.ddSetting.ddCoprId
    });
    if (dd.createDing) {
      dd.createDing(param).then(rest => {
        console.log("钉成功:", rest)
      }).catch(err => {
        console.log("钉失败:", err)
      })
    }
    else {
      dd.biz.ding.create(param);
    }

  },
  scan(success, error) {
    if (dd.scan) {
      dd.scan({
        type: "all"  // type 为 all、qrCode、barCode，默认是all。
      }).then(success).catch(error);
    }
    else {
      dd.biz.util.scan({
        type: 'all', // type 为 all、qrCode、barCode，默认是all。
        onSuccess: success,
        onFail: error
      });
    }

  },
  //关闭页面
  closePage() {
    dd.closePage().then(res => {
    }).catch(err => { })
  },
  createChatGroup(userList) {
    dd.createChatGroup({
      corpId: dsf.config.ddSetting.ddCoprId,
      users: userList,
    }).then(res => {
    }).catch(err => { })
  },
  video(param) {
    //alert(JSON.stringify(param));
    if (dd.createVideoMeeting) {
      //alert("政务丁丁发起视频")
      dd.createVideoMeeting({
        title: param.title, //会议名称
        calleeStaffIds: param.calleeStaffIds//人员列表
      }).then(param.success).catch(param.error)
    }
    else {
      dd.biz.conference.videoConfCall(param);
    }
  },
  signature(data, vue) {
    console.log(dsf.config.ddSetting.Kingecode,"Kingecode")
    let param = {
      mode: 0,
      copyRight: dsf.config.ddSetting.Kingecode,
      userName: data.userName,
      url: data.downloadUrl,
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      fileName: data.fileName,
      fileType: "",
      isSupportPen: false,
      saveUrl: data.saveUrl,
      success: function (res) {
        dsf.http.get(`${param.saveUrl}`, { sourceUrl: `${res.url}` })
          .then(resData => {
            console.log(param.width, resData)
            dsf.layer.toast("批示成功");
            console.log("vue", vue)
            vue.$emit("quanyue")
          })
      },
      errorFn: function (err) {
        console.log(err, "错误提示")
      }
    }
    // dsf.http.post("/ctrl/handWrite/signOff",data)
    // .then(res=>{
    // param.saveUrl=res.data.saveUrl
    if (dd.showSignature) {
      dd.showSignature(param)
        .then(param.success)
        .catch(param.errorFn)
    } else {
      dsf.layer.toast("暂不可发起该功能");
    }
    // })

  },
  saveFile(params){
    if(dsf.config.ddSetting.dingdingType=="dingding"){
      dd.biz.cspace.saveFile({
        corpId: params.corpId,
        url: params.mediaId, // 文件在第三方服务器地址， 也可为通过服务端接口上传文件得到的media_id，详见参数说明
        name: params.name,
        onSuccess: function (suc) {
          dsf.layer.toast("保存成功");
        },
        onFail: function(err) {
          alert(JSON.stringify(err));
        }
      })
    }else{
      dd.chooseSpaceDir().then(res => {
        dd.uploadRemoteFileToDisk({
          dirId: res.dirId,
          spaceId: res.dirId,
          fileName:params.name,
          mediaId: params.mediaId
        }).then(res => {
        }).catch(err => {
          console.error(err)
        })
      }).catch(err => {
        console.error(err)
      })
    }
  },
  serverDing(params){//假日值班报名---后台发钉
    let ids=params.length>1?params.join(","):params[0]
    return new Promise(function(res,rej){
      dsf.http.post(`fn/feedback/sendDm?ids=${ids}`)
      .then(({data})=>{
        if(data.code=="200"){
          res("点名成功")
        }else{
          rej(data.message)
        }
      })
    })
  },
  locateOnMap(){
    return  dd.locateOnMap()
    
  },
  getGeolocation(params){
    return dd.getGeolocation(params)
  },
  setTitle(titlename){
    if(window.dd){
      if (window.dd.biz) {
        try {
          window.dd.biz.navigation.setTitle({
            title:titlename,
            onSuccess : function(result) {
            },
            onFail : function(err) {
            }
          })
        } catch (error) {
          console.log(error,"catch")
        }
      }else{
        window.dd.setTitle({
          title: titlename,
          onSuccess: function(result) {
          // alert('succcess')
          },
          onFail: function(err) {
          }
        })
      }
    }
  },
  hideOptionMenu:function () { 
    dd.hideOptionMenu().then(res => {
    }).catch(err => {})
   }
};
