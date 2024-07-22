// 各项目数科插件相关
function shGovShuke(file, form, callback) {
  let rootPath = dsf.url.getRootPath()
  let loginToken = dsf.util.loadSessionStore("loginToken")
  const down_url = rootPath + `fn/office/defaultPreview?fileId=${file.id}&x-auth-token=${loginToken}` + (file.originalAttachName ? `&initDataSource=1&originalAttachName=${file.originalAttachName}` : '')
  const backUrl = rootPath + `fn/mobileFlow/sendBack?pid=${form.pId}&pnid=${form.pnId}&wfId=${form.flowId}&x-auth-token=${loginToken}`
  const save_url =
    rootPath +
    `fn/mobileOffice/upload?fileId=${file.uploadFileId || file.id}&moduleId=${form.moduleId}&pnId=${form.pnId}&nodeName=${form.nodeName}&fileType=${file.fileType || 1}&infoId=${form.info_id}&extension=${file.title.substr(file.title.lastIndexOf(".") + 1)}&x-auth-token=${loginToken}`
  const send_url =
    form.type == "toRead"
      ? rootPath + `ctrl/p2433Common/readed?pk=${form.info_id}&distribId=${form.distribId}&moduleId=${form.moduleId}&nrId=${file.id}&x-auth-token=${loginToken}`
      : ""
  const afterReading_url = rootPath + `fn/mobileToReadOperation/readed?infoIds=${form.info_id}&distribIds=${form.distribId}&x-auth-token=${loginToken}`
  const uploadLogUrl = `http://116.236.111.158:28089/DeviceLogs/uploadLog?userId=${dsf.util.loadSessionStore("user").user_id}`
  let write_photo = rootPath + "fn/getimage/downloadImage?userid=" + dsf.util.loadSessionStore("user").user_id
  let can_edit = file.isHandleWrite //20221130修改--有签批权限的时候就置为true
  let can_afterReading = file.isAfterReading
  let externalStorage = dsf.config.commonForm.shuke.externalStorage ? dsf.config.commonForm.shuke.externalStorage : false
  let screenshots = dsf.config.setting['SYS-MOBILE-ATTACH-0010'] != undefined ? dsf.config.setting['SYS-MOBILE-ATTACH-0010'] > 0 : !!dsf.config.commonForm.shuke.screenshots
  let foldingScreen = dsf.config.commonForm.shuke.foldingScreen ? dsf.config.commonForm.shuke.foldingScreen : ""
  let penPad = dsf.config.commonForm.shuke.penPad ? dsf.config.commonForm.shuke.penPad : ""
  let project = dsf.config.commonForm.shuke.project ? dsf.config.commonForm.shuke.project : ""
  let opinions = []
  let btnList = [
    { title: "发送", tag: "send" },
    // { title: "退回", tag: "tuihui" },
    { title: "暂存", tag: "zancun" },
    { title: "手写", tag: "shouxie" },
    { title: "文字", tag: "wenzi" },
    { title: "撤回", tag: "chehui" },
    { title: "恢复", tag: "huifu" },
    { title: "擦除", tag: "cachu" },
    { title: "笔写", tag: "bixie" },
    { title: "笔锋调节", tag: "bftj" },
    { title: "页码", tag: "yema" },
  ]
  // if (form.type == "toRead" || form.canBack === false) btnList = btnList.filter(item => item.tag != "tuihui")
  if (!file.hasWenzi) btnList = btnList.filter(item => item.tag != "wenzi")
  let obj = {
    uploadLogUrl: uploadLogUrl,
    downUrl: down_url,
    backUrl: backUrl,
    sendUrl: send_url,
    writePhoto: write_photo,
    externalStorage: externalStorage, // 文件是否放在外部存储，默认内部存储
    saveUrl: save_url,
    handTip: "",
    fileName: file.title,
    title: file.title.substr(0, file.title.lastIndexOf(".")),
    navTab: file.navTab || [],
    userName: dsf.util.loadSessionStore("user").name,
    foldingScreen: foldingScreen, //折叠屏设备适配，传设备型号，多个用英文逗号隔开
    penPad: penPad, //笔写设备型号适配，传设备型号，多个用英文逗号隔开
    screenshots: screenshots, //是否允许截屏，录屏
    canEdit: can_edit,
    project: project,
    pid: form.pId,
    pnid: form.pnId,
    fileId: file.id,
    opinions: opinions, //常用意见，数组格式
    nodeOpinion: "", //签批建议，采用按钮填充的意见文本
    copyRight: dsf.config.setting['SYS-MOBILE-ATTACH-0009'] || dsf.config.commonForm.shuke.keyCode,
    choicePenType: 0,
    isForcePenMode: false,
    buttonState: {
      signFontSize: dsf.config.commonForm.shuke.buttonState?.signFontSize || false,
      rectWrite: dsf.config.commonForm.shuke.buttonState?.rectWrite || false
    },
    secretData: {
      //署名相关，signKey：授权key,signSecret：授权signSecret
      signKey: dsf.config.commonForm.shuke.secretData?.signKey,
      signSecret: dsf.config.commonForm.shuke.secretData?.signSecret
    },
    btnList: btnList,
    afterReading: {
      showBtn: can_afterReading,
      opinionInput: false,
      afterReadingUrl: afterReading_url
    },
    unModifyInsertName: false, // 未签批的时候是否自动署名
    showCollapse: false, // 是否显示收起按钮
    isForceUpload: true, // 控制是否退出上传文件的参数
    openToPage: file.openToPage,
    changeNetFramework: true, // 针对下载超时的问题，失败了换一个网络框架进行请求
    textSignSetting: { showTextSignName: true, signType: "Text", signFontSize: 16, signTimeFormat: "M月d日", signFontColor: "ff0000", name: "" } //文字签批落款设置
  }
  console.log(obj)
  console.log(dsf.base64.encode(JSON.stringify(obj)))
  if (dsf.util.checkSystem() == "ios") {
    throw new Error("ios")
  } else {
    window.top.wx.invoke(
      "ext_sySignSdk_startSign",
      {
        data: obj
      },
      res => {
        if (res.result == "true") {
          console.log(res)
          callback(JSON.parse(res.data))
          // }
        }
      }
    )
  }
  // wx.invoke(
  //       "request3rdApp",
  //       {
  //         scheme: "dream://app:8888?seq=DreamMobile",
  //         needToken: 0,
  //         param: dsf.base64.encode(JSON.stringify(obj)),
  //       },
  //       function (res) {
  //         if (res.err_msg != "request3rdApp:ok") {
  //           //alert(res.err_msg);//错误信息输出
  //         }
  //         console.log(res)
  //       }
  //     )
}
export default {
  shGovShuke
}
