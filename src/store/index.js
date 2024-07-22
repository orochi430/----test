import Vuex from "vuex"
import Vue from "vue"
Vue.use(Vuex)

const state = {
  cacheRouterPaths: ["/todoCenter", "/meetingCenter", "/search"],
  cacheComponentInstance: [],
  socketStatus: false,
  pageTitle: "移动办公",
  homeTabs: true,
  isShowAppFooter: false,
  appFooter: [],
  isShowAppHeader: false,
  isCallRouterGo: false, // 是否调用router.go
  appHeader: [],
  meetingName: "",
  iframeHistory: {}, //当使用iframe内嵌页面的时候记录当前history的总个数
  searchParam: {}, //用户缓存列表上的查询条件 供发送时查询下一条用
  diskMenuType: "",
  clientType: "",
  showTopDiv: false,
  statusBarHeight: 0
}

const mutations = {
  toggleShowAppFooter(state, target) {
    state.isShowAppFooter = target.flag
  },
  toggleShowAppHeader(state, target) {
    state.isShowAppHeader = target.flag
  },
  refreshRouteByName(state, target) {
    const { cacheComponentInstance } = state
    const temp = [...cacheComponentInstance]
    const index = temp.findIndex(it => it.route.toLowerCase() === target.toLowerCase())
    if (index !== -1) {
      const targetInstance = temp[index]
      targetInstance.context.$destroy()
      temp.splice(index, 1)
      state.cacheComponentInstance = temp
    }
  },
  updateCacheComponent(state, target) {
    state.cacheComponentInstance = target
  },
  // 批量刷新组件缓存
  refreshRouteByReg(state, target) {
    const { cacheComponentInstance } = state
    const temp = []
    cacheComponentInstance.forEach(it => {
      const isReg = target instanceof RegExp
      const method = isReg ? "test" : "includes"
      if (method === "includes") {
        target = target.map(it => it.toLowerCase())
      }
      if (target[method](it.route)) {
        it.context.$destroy()
      } else {
        temp.push(it)
      }
    })
    state.cacheComponentInstance = temp
  },
  changeSocket(state, val) {
    state.socketStatus = val
  },
  changePageTitle(state, val) {
    state.pageTitle = val
  },
  changeHomeTabs(state, val) {
    state.homeTabs = val
  },
  changeAppFooter(state, val) {
    state.appFooter = val
  },
  changeAppHeader(state, val) {
    state.appHeader = val
  },
  setHistory(state, val) {
    if (!state.iframeHistory.hasOwnProperty(val.url)) {
      state.iframeHistory[val.url] = val.historyCount
    }
  },
  clearHistory(state, val) {
    if (state.iframeHistory.hasOwnProperty(val.url)) {
      delete state.iframeHistory[val.url]
    }
  },
  setMeetingName(state, data) {
    state.meetingName = data
  },
  setSearchParam(state, data) {
    state.searchParam = data
  },
  setCallRouterGo(state, val) {
    state.isCallRouterGo = val
  },
  setMenuType(state, val) {
    state.diskMenuType = val
  },
  setClientType(state, val) {
    state.clientType = val
  },
  changeShowTopDiv(state, val) {
    state.showTopDiv = val
  },
  setStatusBarHeight(state, val) {
    state.statusBarHeight = val
  }
}

const modulesFiles = require.context("./modules", true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1")
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  state,
  mutations,
  modules
})

export default store;
