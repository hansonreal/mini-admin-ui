/**
 * 个性化设置
 */

const state = {
  setting: {
    theme: '',                // 主题
    uniqueOpened: true,       // 是否开启手风琴模式
    menuButton: true,         // 是否显示菜单展开按钮
    showRefreshButton: true,  // 是否显示页面刷新按钮
    showCrumbs: true,         // 是否显示全局面包屑
    autoClose: false,         // 设置后是否自动关闭窗口
    showWorkTab: true,        // 是否显示多标签
    showLanguage: true,       // 是否显示多语言选择
    showNprogress: false,     // 是否显示顶部进度条
    themeModel: '',           // 主题模式
  }
}

const getters = {
  setting: (state) => state.setting
}

const mutations = {
  // 初始化state
  initState() {
    let sys = JSON.parse(localStorage.getItem("sys"))
    if(sys && sys.user && sys.user.setting) {
      state.setting = sys.user.setting
    }
  },
  // 设置主题
  setUpTheme(state, theme) {
    state.setting.theme = theme
  },
  // 设置菜单是否为手风琴模式
  setLeftMenuUniqueOpened(state, e) {
    state.setting.uniqueOpened = e.show
  },
  // 显示侧边栏折叠按钮
  setLeftMenuButton(state, e) {
    state.setting.menuButton = e.show
  },
  // 是否自动关闭个性化设置
  setPersonalityAutoClose(state, e) {
    state.setting.autoClose = e.show
  },
  // 是否显示页面刷新按钮
  setPageRefreshButton(state, e) {
    state.setting.showRefreshButton = e.show
  },
  // 是否显示面包屑导航
  setLeftMenuCrumbs(state, e) {
    state.setting.showCrumbs = e.show
  },
  // 是否显示多标签
  setWorkTab(state, e) {
    state.setting.showWorkTab = e.show
  },
  // 是否显示多语言选择
  setLanguage(state, e) {
    state.setting.showLanguage = e.show
  },
  // 是否显示顶部进度条
  setNprogress(state, e) {
    state.setting.showNprogress = e.show
  },
  // 主题模式
  setThemeModel(state, theme) {
    state.setting.themeModel = theme
  }
}

const actions = {
  initState ({commit }) {
    commit('initState')
  },
  setUpTheme ({commit}, e) {
    commit('setUpTheme', e)
  },
  setLeftMenuUniqueOpened({commit}, e) {
    commit('setLeftMenuUniqueOpened', e)
  },
  setLeftMenuButton({commit}, e) {
    commit('setLeftMenuButton', e)
  },
  setPersonalityAutoClose({commit}, e) {
    commit('setPersonalityAutoClose', e)
  },
  setPageRefreshButton({commit}, e) {
    commit('setPageRefreshButton', e)
  },
  setLeftMenuCrumbs({commit}, e) {
    commit('setLeftMenuCrumbs', e)
  },
  setWorkTab({commit}, e) {
    commit('setWorkTab', e)
  },
  setLanguage({commit}, e) {
    commit('setLanguage', e)
  },
  setNprogress({commit}, e) {
    commit('setNprogress', e)
  },
  setThemeModel({commit}, e) {
    commit('setThemeModel', e)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}