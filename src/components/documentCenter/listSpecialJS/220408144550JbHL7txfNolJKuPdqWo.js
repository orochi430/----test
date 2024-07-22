const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    path: `/commonForm/${moduleId}/${pk}`,
    query: {
      method: 'view',
      listId: '2204081328382DrK6cmYfJouxuSQXlT',
    }
  });
}
exportObj.createRow = function (btn, vueData) {
  vueData.$router.push({
    path: "/commonForm/220408140943LvGf0iRvUFfpgGT8KYx",
    query: {
      fid: JSON.parse(vueData.$route.query.secQuery).communityId
    }
  })
}

import QRCode from 'qrcodejs2'
exportObj.init = function (vueData) {
  if(document.getElementById("qrcode"))document.getElementById("qrcode").innerHTML = "";
}
function downFile() {
  //console.log(item)
  // const loginToken = dsf.util.loadSessionStore("loginToken");
  let rootPath = dsf.url.getRootPath()
  const downUrl = rootPath + `ctrl/register/genrateQr`

  if (dsf.util.getClientName() == "app") {
      // $iaction.downloadFile({
      //     "url": downUrl,
      //     "title": '预约码'
      // }, function (s) {
      //     dsf.layer.toast('下载成功')
      //     // alert(s);
      // }, function (e) {
      //     // alert(e);
      // });

      var fileTransfer = new FileTransfer();
      var uri = encodeURI(downUrl);
      let fileURL = cordova.file.externalRootDirectory + "/Download/item/" + '预约二维码.png';

      fileTransfer.download(
          uri,
          fileURL,
          function (entry) {
              dsf.layer.toast('下载成功');
          },
          function (error) {
              console.log("download error source " + error.source);
              console.log("download error target " + error.target);
              console.log("upload error code" + error.code);
          },
          false, {
          headers: {
              Authorization: "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA==",
          },
      }
      );

  } else {
      window.open(downUrl)
  }
}
exportObj.qrcode = function (btn, vueData) {
  let qrcode
  // qrcode.hide() //清除二维码 
  // var canvas=qrcode.find('canvas').get(0);
  //如果有循环,此句必不可少 qrcode.find('canvas').remove();
  // var url = canvas.toDataURL('image/jpg');
  vueData.$dialog.alert({
    title: '预约二维码',
    message: `<div id="qrcode" ref="qrcode" style="margin: 0 auto;"></div><div style="padding-top: 0.2rem">请下载该二维码分享给访客</div>`,
    showCancelButton: true,
    confirmButtonText: '下载二维码'
  }).then(() => {
    // dsf.http.get('/ctrl/register/genrateQr').then(res => {})
    downFile()
    if(document.getElementById("qrcode"))document.getElementById("qrcode").innerHTML = "";
  }).catch(() => {
    if(document.getElementById("qrcode"))document.getElementById("qrcode").innerHTML = "";
  });
  vueData.$nextTick(() => {
    let qrcodeWidth = document.getElementById('qrcode').clientWidth
    let path = `/commonForm/220408140943LvGf0iRvUFfpgGT8KYx?fid=${dsf.util.loadSessionStore('user').communityId}&examineState=0`
    let toPath = dsf.base64.encode(path)
    qrcode = new QRCode(document.getElementById('qrcode'), {
      text: `${location.origin}/DreamWeb/dist/index.html#/logNameAutologin?logName=fysb&state=${toPath}`,
      width: qrcodeWidth, //图像宽度
      height: qrcodeWidth, //图像高度
      colorDark : "#000000", //前景色
      colorLight : "#ffffff", //背景色
      correctLevel : QRCode.CorrectLevel.M //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
    })
  })
}
export default exportObj;
