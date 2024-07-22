const spJS = {}
let spHandleJS = {}
// let requireComponent = require.context(
//   "./", // 在当前目录下查找
//   false, // 不遍历子文件夹
//   /\.js$/ // 正则匹配 以 .vue结尾的文件
// )
spJS.init = function (listId, initAfter) {
  return new Promise(async (resolve, reject) => {
    //载入表单对应的处理JS
    spHandleJS = {}
    spJS.spHandleJS = {}
    await import(/* webpackChunkName: 'listSpecialJS' */ `./${listId}.js`)
      .then(res => {
        console.log('11111')
        spHandleJS = res.default
        spJS.spHandleJS = spHandleJS
        initAfter ? initAfter() : ""
      })
      .catch(err => {
        console.log("无特殊js")
      })
    // requireComponent.keys().forEach(fileName => {
    //   let fileKey = fileName.replace(/\.\/|\.js/g, "")
    //   if (fileKey == listId) {
    //     spHandleJS = requireComponent(fileName).default
    //     spJS.spHandleJS = spHandleJS
    //     initAfter ? initAfter() : ""
    //   }
    // })
    console.log("22222")
    let scriptTag = document.createElement("script")
    scriptTag.type = "text/javascript"
    scriptTag.src = "./static/js/listSpecialJS/" + listId + ".js" + "?random=" + Math.random()
    scriptTag.onerror = function () {
      //alert("error")
      resolve()
    }
    window.noJS = false
    document.body.appendChild(scriptTag)
    scriptTag.onload = function () {
      if (!window.noJS) {
        console.log('3333')
        //后台拦截器拦截到没有JS时会返回noJS=true，这个时候就不用再替换spHandleJS等对象 2023年3月24日16:41:57 @luy
        spHandleJS = window.spListJS
        spJS.spHandleJS = spHandleJS
        initAfter ? initAfter() : ""
      }
      resolve()
    }
  })
}

export default spJS
