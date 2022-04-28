/**
 * 菜单|权限列表
 */

const state = {
  menuList: [],
  menuWidth: '',
  menuOpen: true,
}

const getters = {
  menu: (state) => state.menuList
}

const mutations = {
  setMenuList(state, list) {
    state.menuList = list
  },
  setMenuWidth(state, e) {
    state.menuWidth = e
  },
  setMenuOpen(state, e) {
    state.menuOpen = e
  }
}

const actions = {
  setMenuList({commit}, e) {
    commit('setMenuList', e)
  },
  setMenuWidth({commit}, e) {
    commit('setMenuWidth', e)
  },
  setMenuOpen({commit}, e) {
    commit('setMenuOpen', e)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}