const exportObj = {};
exportObj.init = function (vueData) {
  if(document.getElementById("qrcode"))document.getElementById("qrcode").innerHTML = "";
}
exportObj.createRow = function (btn, vueData) {
  vueData.$router.push({
    path: "/commonForm/220405162139n0I5f23XnQayBPWs21m",
    query: {
      fid: JSON.parse(vueData.$route.query.secQuery).communityId
    }
  })
}
import QRCode from 'qrcodejs2'
exportObj.qrcode = function (btn, vueData) {
  let qrcode
  // qrcode.hide() //清除二维码 
  // var canvas=qrcode.find('canvas').get(0);
  //如果有循环,此句必不可少 qrcode.find('canvas').remove();
  // var url = canvas.toDataURL('image/jpg');
  vueData.$dialog.alert({
    title: '设备码',
    message: `<div id="qrcode" style="margin: 0 auto;"></div><div style="padding-top: 0.2rem">请使用仪电哨兵设备扫码注册</div>`,
  }).then(() => {
    // on close
    vueData.onRefresh()
    document.getElementById("qrcode").innerHTML = "";
  });
  vueData.$nextTick(() => {
    let qrcodeWidth = document.getElementById('qrcode').clientWidth
    qrcode = new QRCode(document.getElementById('qrcode'), {
      text: `action:{"command": "deviceRegister","data": {"communityId": "${JSON.parse(vueData.$route.query.secQuery).communityId}","operateUserId": "${dsf.util.loadSessionStore('user').user_id}"}}`,
      width: qrcodeWidth, //图像宽度
      height: qrcodeWidth, //图像高度
      colorDark : "#000000", //前景色
      colorLight : "#ffffff", //背景色
      correctLevel : QRCode.CorrectLevel.H //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
    })
  })
}
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    path: `/commonForm/${moduleId}/${pk}`,
    query: {
      method: 'view',
      listId: listid,
    }
  });
}
export default exportObj;
