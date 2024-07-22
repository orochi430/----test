import VuexStore from "@/store"
import ddAction from "@/common/ddAction"

function getWebPath(url) {
  if (!url) {
    return ""
  }
  if (url.indexOf("/") == 0) {
    url = url.substr(1)
  } else if (url.indexOf(".") == 0 || url.indexOf("http://") == 0 || url.indexOf("https://") == 0) {
    return url
  }
  if (url.indexOf("static") == 0) {
    if (process.env.NODE_ENV == "development") {
      return url
    } else {
      return "../" + "dist/" + url
    }
  }
  /*
  如果是开发环境就读取dsf.config.webRoot,因为开发环境走代理，接口在远程服务器
  如果是生产环境直接../拼上url即可，支持在DreamMobile中和DreamWeb中部署移动端dist
  @ly 2021年1月26日
  */
  if (process.env.NODE_ENV == "development") {
    return dsf.config.webRoot + url
  } else {
    return "../" + url
  }
}

function openOffice(url) {
  // let officeUrl = 'https://doc.pudong.gov.cn:1443/?furl=' + url;
  let officeUrl = dsf.config.previewSetting.previewLocation + url
  return officeUrl
}

function getServerUrl(url) {
  if (url.indexOf("fn/office/openMobileOffice") > -1) {
    //为了附件预览统一加的地址
    url += "&screenWidth=" + window.screen.availWidth
  }
  if (process.env.NODE_ENV == "development") {
    return dsf.config.webRoot + url
  } else {
    return "../" + url
  }
}

function getRootPath() {
  if (process.env.NODE_ENV == "development") {
    return "http://116.236.111.158:39006/DreamWeb/" //140
  } else {
    var strFullPath = window.document.location.href
    var strPath = window.document.location.pathname
    var pos = strFullPath.indexOf(strPath)
    var prePath = strFullPath.substring(0, pos)
    var postPath = strPath.substring(0, strPath.substr(1).indexOf("/") + 1)
    return prePath + postPath + "/"
  }
}

function setTitle(docTitle) { //修改钉钉的内置浏览器title
  if (docTitle && (dsf.noRefreshTitle == undefined || !dsf.noRefreshTitle)) {
    VuexStore.commit("changePageTitle", docTitle)
    document.title = docTitle;
    ddAction.setTitle(docTitle);
  }
}
export default {
  getWebPath,
  getRootPath,
  openOffice,
  getServerUrl,
  setTitle
}
