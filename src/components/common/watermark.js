let watermark = {}

let setWatermark = str => {
  let id = "1.23452384164.123412416"

  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id))
  }

  //创建一个画布
  let can = document.createElement("canvas")
  //设置画布的长宽
  can.width = 150
  can.height = 120

  let cans = can.getContext("2d")
  //旋转角度
  cans.rotate((-30 * Math.PI) / 180)
  cans.font = "14px Vedana"

  // cans.lineWidth = 1;//设置边框大写
  // cans.strokeStyle = "red";//填充边框颜色
  // cans.strokeRect(50.5,50.5,100,100);//对边框的设置

  //设置填充绘画的颜色、渐变或者模式
  let opacity = dsf.config.setting["SYS-SYS-0092"] || 0.3
  cans.fillStyle = `rgba(200, 200, 200, ${opacity})`
  //设置文本内容的当前对齐方式
  cans.textAlign = "left"
  //设置在绘制文本时使用的当前文本基线
  cans.textBaseline = "top"
  //在画布上绘制填色的文本（输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置）
  //console.log(can.width / 2, can.height / 2)
  cans.fillText(str, -20, can.height / 2 + 10)

  let div = document.createElement("div")
  div.id = id
  div.style.pointerEvents = "none"
  div.style.top = "0px"
  div.style.left = "0px"
  div.style.position = "fixed"
  // div.style.border = '1px solid red';
  div.style.zIndex = "9999"
  div.style.width = document.documentElement.clientWidth + "px"
  div.style.height = document.documentElement.clientHeight + "px"
  div.style.background = "url(" + can.toDataURL("image/png") + ") left top repeat"
  div.className = "watermark"
  document.body.appendChild(div)
  return id
}

// 该方法只允许调用一次
watermark.set = (str) => {
    let id = setWatermark(str);
    setInterval(() => {
        if (document.getElementById(id) === null) {
            id = setWatermark(str);
        }
    }, 500);
    window.onresize = () => {
        setWatermark(str);
    };
}
// 自己写一个隐藏水印的方法  随便写的··   配合下路由守卫使用
watermark.hide = () => {
    let id = setWatermark();
    document.getElementById(id).style.display = "none";
    // console.log("隐藏水印对象方法执行");
}
// 初始化页面水印
watermark.init = (to) => {
    let isOpenWaterMark =
        dsf.config.setting["SYS-SYS-0037"] > 0 ||
        dsf.config.setting["SYS-MOBILE-FORM-0015"] > 0;
    let rule =
        dsf.config.setting["SYS-MOBILE-FORM-0016"] || "[userName],[mobile]";
    let waterMarkRule = rule.split(",");
    let waterMarkContent = "";
    let isShowMark = dsf.config.waterMark?.allSite;
    let ruters = dsf.config.waterMark?.ruters ? dsf.config.waterMark.ruters : [];
    if (
        dsf.util.loadSessionStore("user") &&
        isOpenWaterMark &&
        (isShowMark || ruters.includes(to.name))
    ) {
        let userInfo = dsf.util.loadSessionStore("user");
        waterMarkRule.forEach(element => {
            switch (element) {
                case "[unitName]":
                    waterMarkContent += " " + userInfo.unitName;
                    break;
                case "[userName]":
                    waterMarkContent += " " + userInfo.name;
                    break;
                case "[mobile]":
                    waterMarkContent +=
                        " " + userInfo.mobile.substr(userInfo.mobile.length - 4);
                    break;
                case "[datetime]":
                    waterMarkContent +=
                        " " + dsf.date.format(new Date(), "yy/mm/dd hh:ii:ss");
                    break;
                case "[logName]":
                    waterMarkContent += " " + userInfo.logName;
                    break;
                default:
                    waterMarkContent += " " + element;
            }
        });
        watermark.set(waterMarkContent);
    } else {
        watermark.hide();
    }
}

export default watermark;
