import dsf from "."

const THEME_COLORS = {
  "red-theme": "#b50009",
  "blue-theme": "#3296fa",
  "green-theme": "#4daf7b",
  "anHui-theme": "#e32416",
  "darkBlue-theme": "#0051c2",
  "gov-theme": "#2271b3",
  "ycgreen-theme": "#026a52",
  "xzblue-theme": "#3875F6",
  "npcred-theme": "#C30E12",
  "npcorange-theme": "#ED5403",
  "npcpurple-theme": "#5447B5",
  "npcblue-theme": "#087FE3"
}

// 将颜色变深或变浅，color16进制颜色，amount变化程度，type：lighten变浅，darken变深
function changeColor(color, amount, type) {
  function toHSL(r, g, b) {
    ;(r /= 255), (g /= 255), (b /= 255)
    let max = Math.max(r, g, b),
      min = Math.min(r, g, b)
    let h,
      s,
      l = (max + min) / 2

    if (max == min) {
      h = s = 0
    } else {
      let d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    return {
      h,
      s,
      l
    }
  }

  function hslToRgb(h, s, l) {
    let r, g, b

    if (s == 0) {
      r = g = b = l
    } else {
      let hue2rgb = function hue2rgb(p, q, t) {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1 / 6) return p + (q - p) * 6 * t
        if (t < 1 / 2) return q
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
        return p
      }

      let q = l < 0.5 ? l * (1 + s) : l + s - l * s
      let p = 2 * l - q
      r = hue2rgb(p, q, h + 1 / 3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1 / 3)
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
  }

  function rgbToHex(rgbArr) {
    let hex = ""
    rgbArr.forEach(rgb => {
      let result = Number(rgb).toString(16)
      if (result.length === 1) {
        result = result.toString().padStart(2, "0")
      }
      hex += result.toLocaleLowerCase()
    })
    return hex
  }

  function clamp(val) {
    return Math.min(1, Math.max(0, val))
  }
  function hexToRGB(hex) {
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    let sColor = hex.toLowerCase()
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#"
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
        }
        sColor = sColorNew
      }
      let sColorChange = []
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)))
      }
      return sColorChange
    }
  }
  // hex ->  rgb -> hsl -> 计算l -> rgb -> hex
  let hsl = toHSL(...hexToRGB(color))
  if (type === "darken") {
    hsl.l -= amount / 100
  } else if (type === "lighten") {
    hsl.l += amount / 100
  }
  hsl.l = clamp(hsl.l)
  return "#" + rgbToHex(hslToRgb(hsl.h, hsl.s, hsl.l))
}

let initTheme = () => {
  // dsf.config.setting['SYS-MOBILE-STYLE-0001']后台系统设置的主题
  // dsf.util.loadLocalStore('recommend-theme') 设置主题中选中的推荐主题
  // dsf.util.loadLocalStore('self-theme') 设置主题中选中的自定义主题
  dsf.config.defaultTheme = dsf.config.setting["SYS-MOBILE-STYLE-0001"] || "blue-theme"
  let nowClass = $("body")
    .attr("class")
    .split(" ")
    .find(item => item.indexOf("-theme") > -1)
  let theme = dsf.config.defaultTheme
  $("body").removeClass(nowClass)
  let themeColor = ""
  if (dsf.util.loadLocalStore("recommend-theme")) {
    theme = dsf.util.loadLocalStore("recommend-theme")
    $("body").addClass(dsf.util.loadLocalStore("recommend-theme"))
    themeColor = ""
  } else {
    $("body").addClass(dsf.config.defaultTheme)
    themeColor = dsf.util.loadLocalStore("self-theme") || dsf.config.setting["SYS-MOBILE-STYLE-0009"]
  }
  // 配置颜色非16进制错误处理
  if (!themeColor?.startsWith("#")) themeColor = ""

  setThemeColor(themeColor, theme)
}
// 设置主题色，改变css变量
let setThemeColor = (color, themeName) => {
  // 如果有颜色则优先取颜色，如果只设置了主题则使用配置的主题色
  let themeColor = color || THEME_COLORS[themeName]
  let nowClass = $("body")
    .attr("class")
    .split(" ")
    .find(item => item.indexOf("-theme") > -1)
  $("body").removeClass(nowClass)
  $("body").addClass(themeName)
  document.body.style.setProperty("--main", themeColor)
  document.body.style.setProperty("--normal", themeColor)
  document.body.style.setProperty("--nav_active_bgColor", themeColor)
  document.body.style.setProperty("--light", changeColor(themeColor, 20, "lighten"))
  document.body.style.setProperty("--lightdark", changeColor(themeColor, 5, "lighten"))
  document.body.style.setProperty("--dark", changeColor(themeColor, 20, "darken"))
  document.body.style.setProperty("--darklight", changeColor(themeColor, 12, "darken"))
}
let setAppTopColor = (topColor,isDark) => {//topColor头部电池栏自定义颜色，isDark头部电池栏文字是黑色还是白色
  let themeColor = topColor||dsf.util.loadLocalStore('self-theme') || dsf.config?.setting?.['SYS-MOBILE-STYLE-0009']
  if (themeColor && dsf.config?.login?.isShowAppTopColor && dsf.util.getClientName() == "app" && dsf.util.checkSystem() != "ios") {
    /*
    设置状态栏背景颜色
    设置状态栏文字颜色，true黑色，false白色
    */
    window.StatusBar?.backgroundColorByHexString(themeColor)
    window.StatusBar?.setStatusTextColorDark(isDark||false)

  }
}

export {
  THEME_COLORS,
  initTheme,
  setThemeColor,
  setAppTopColor
}
