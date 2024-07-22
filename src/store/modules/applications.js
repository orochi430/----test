const state = {
  menus: [],
  myMenus: [],
  rowNum: 4
}

const mutations = {
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_MY_MENUS: (state, menus) => {
    state.myMenus = menus
  },
  SET_ROW_NUM: (state, num) => {
    state.rowNum = num
  }
}

const actions = {
  setMenus({ commit }, menus) {
    commit("SET_MENUS", menus)
  },
  setMyMenus({ commit }, menus) {
    commit("SET_MY_MENUS", menus)
  },
  setRowNum({ commit }, num) {
    commit("SET_ROW_NUM", num)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
