import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import Home from '@/pages/home/Home.vue'
import setting from '@/config/setting'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false, easing: 'ease', speed: 500 })
Vue.use(Router)

// 首页
export const HOME_PAGE = '/dashboard/console'

// 不需要权限的路由
export const routes = [
  {
    path: '/',
    redirect: HOME_PAGE
  }, {
    path: '/dashboard',
    component: Home,
    meta: {
      title: '监控中心'
    },
    children: [
      buildRoute('console', 'dashboard/Console', { title: '工作台' }),
    ]
  },
  buildRoute('/login', 'login/Login', { title: '登录', newPage: true }),
  {
    path: '/exception',
    component: Home,
    meta: {
      title: '异常页面'
    },
    children: [
      buildRoute('403', 'exception/403', { title: '403' }),
      buildRoute('404', 'exception/404', { title: '404' }),
      buildRoute('500', 'exception/500', { title: '500' }),
    ]
  }
]

const router = new Router({
  routes
})

// 需要权限的路由
export const allowRouters = [
  {
    path: '/article',
    component: Home,
    meta: {
      title: '文章管理'
    },
    children: [
      buildRoute('article-publish', 'article/ArticlePublish', { title: '文章发布' }),
      buildRoute('article-edit', 'article/ArticleEdit', { title: '文章编辑' }),
      buildRoute('article-list', 'article/ArticleList', { title: '文章列表' }),
      buildRoute('classify', 'article/Classify', { title: '文章分类' }),
    ]
  }, {
    path: '/message',
    component: Home,
    meta: {
      title: '消息中心'
    },
    children: [
      buildRoute('message', 'message/Message', { title: '系统消息' }),
    ]
  }, {
    path: '/system',
    component: Home,
    meta: {
      title: '系统设置'
    },
    children: [
      buildRoute('setting', 'system/Setting', { title: '系统设置' }),
      buildRoute('log', 'system/Log', { title: '操作日志' }),
    ]
  }, {
    path: '/safeguard',
    component: Home,
    meta: {
      title: '运维管理'
    },
    children: [
      buildRoute('server', 'safeguard/server', { title: '服务器管理' }),
      buildRoute('database', 'safeguard/database', { title: '数据库管理' }),
    ]
  }, {
    path: '/plan',
    component: Home,
    meta: {
      title: '计划'
    },
    children: [
      buildRoute('year-plan', 'plan/YearPlan', { title: '年度计划' }),
    ]
  }, {
    path: '/user',
    component: Home,
    meta: {
      title: '用户管理'
    },
    children: [
      buildRoute('user', 'user/User', { title: '个人中心' }),
      buildRoute('account', 'user/Account', { title: '账号管理' }),
      buildRoute('department', 'user/Department', { title: '部门管理' }),
      buildRoute('role', 'user/Role', { title: '角色权限' }),
    ]
  }, {
    path: '/menu',
    component: Home,
    meta: {
      title: '菜单管理'
    },
    children: [
      buildRoute('menu', 'menu/Menu', { title: '菜单权限' }),
      buildRoute('api', 'menu/Api', { title: '角色权限' }),
      buildRoute('operation', 'menu/Operation', { title: '操作历史' }),
    ]
  }, {
    path: '/widget',
    component: Home,
    meta: {
      title: '组件中心'
    },
    children: [
      buildRoute('excel', 'widget/Excel', { title: 'Excel' }),
      buildRoute('icon', 'widget/Icon', { title: 'Icon' }),
      buildRoute('icon-selector', 'widget/IconSelector', { title: 'IconSelector' }),
    ]
  }
]

export const allRoutes = routes.concat(allowRouters);

router.beforeEach((to, from, next) => {
  let isLogin = false
  let { meta, matched, name, path, params } = to
  let { title, title_en, newPage, keepAlive } = meta
  let { showNprogress } = store.state.setting.setting
  let sys = JSON.parse(localStorage.getItem("sys"))

  if (showNprogress) {
    NProgress.start()
  }

  if (sys) {
    isLogin = sys.user.isLogin
  }

  params.keepAlive = keepAlive

  if (!isLogin && path !== '/login') {
    next('/login')
    return
  } else {
    let { menuList } = store.state.menu
    
    // 打开的页面不存在
    if (menuList.length > 0 && !matched.length) {
      next('/exception/404')
      return
    }
    next()
  }

  // 不是标签页
  if (newPage) {
    return
  }

  let { name: fName, meta: fMeta, path: fPath } = from

  // 路由添加到标签页
  store.dispatch('worktab/worktabRoute', {
    to: {
      name: name || '',
      title: (meta && title) ? title : '',
      title_en: (meta && title_en) ? title_en : '',
      path,
      params
    },
    from: {
      name: fName || '',
      title: (fMeta && fMeta.title) ? fMeta.title : '',
      title_en: (fMeta && fMeta.title_en) ? fMeta.title_en : '',
      path: fPath,
      params
    }
  })

  // 设置网页title
  if (title) {
    document.title = `${title} - ${setting.systemName}`
  }
  return
})

router.afterEach(() => {
  let { showNprogress } = store.state.setting.setting

  if (showNprogress) {
    NProgress.done()
  }
})

// 构建路由
function buildRoute(path, component, meta) {
  return {
    path,
    component: () => import(`@/pages/${component}`),
    meta
  }
}

export default router