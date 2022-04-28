const menuData = [
  {
    id: 1,
    title: "监控中心",
    title_en: "Dashboard",
    icon: "\ue6b2",
    path: "/dashboard",
    children: [
      {
        id: 101,
        title: "工作台",
        title_en: "Workbench",
        path: "/dashboard/console"
      }
    ]
  },
  {
    id: 2,
    title: "文章管理", 
    title_en: "Article manguage",
    icon: "\ue61e",
    path: "/article",
    children: [
      {
        id: 201,
        title: "文章列表",
        title_en: "Article list",
        path: "/article/article-list"
      },
      {
        id: 202,
        title: "文章分类",
        title_en: "Article category",
        path: "/article/classify"
      },
      {
        id: 203,
        title: "文章发布",
        title_en: "Article publish",
        path: "/article/article-publish"
      }
    ]
  },
  {
    id: 3,
    title: "用户管理",
    title_en: "User manguage",
    icon: "\ue725",
    path: "/user",
    children: [
      {
        id: 301,
        title: "个人中心",
        title_en: "User center",
        path: "/user/user",
        noMenu: true
      },
      {
        id: 302,
        title: "账号管理",
        title_en: "Account manguage",
        path: "/user/account"
      },
      {
        id: 303,
        title: "部门管理",
        title_en: "Department manguage",
        path: "/user/department"
      },
      {
        id: 304,
        title: "角色权限",
        title_en: "Roles",
        path: "/user/role"
      }
    ]
  },
  {
    id: 4,
    title: "菜单管理",
    title_en: "Menu manguage",
    icon: "\ue662",
    path: "/menu",
    children: [
      {
        id: 401,
        title: "菜单权限",
        title_en: "Menu permissions",
        path: "/menu/menu",
        permission: [
          {
            id: 4011,
            title: "新增",
            keep_alive: 1,
            permission_mark: "menu/add"
          },{
            id: 4012,
            title: "编辑",
            keep_alive: 1,
            permission_mark: "menu/edit"
          },{
            id: 4013,
            title: "删除",
            keep_alive: 1,
            permission_mark: "menu/delete"
          }
        ]
      },
      {
        id: 402,
        title: "API管理",
        title_en: "API manguage",
        path: "/menu/api"
      }
    ]
  },
  {
    id: 5,
    title: "组件中心",
    title_en: "Components",
    icon: "\ue61c",
    path: "/widget",
    children: [
      {
        id: 501,
        title: "Element UI",
        title_en: "Element UI",
        path: "https://element.eleme.cn/#/zh-CN"
      },{
        id: 502,
        title: "Excel",
        title_en: "Excel",
        path: "/widget/excel"
      },{
        id: 503,
        title: "Icon 图标",
        title_en: "Icon",
        path: "/widget/icon"
      },{
        id: 504,
        title: "图标选择器",
        title_en: "Icon selector",
        path: "/widget/icon-selector"
      }
    ]
  },
  {
    id: 6,
    title: "计划管理",
    title_en: "Plan manguage",
    icon: "\ue651",
    path: "/plan",
    children: [
      {
        id: 601,
        title: "年度计划",
        title_en: "Annual plan",
        path: "/plan/year-plan"
      }
    ]
  },
  {
    id: 7,
    title: "消息中心",
    title_en: "Message center",
    icon: "\ue72c",
    path: "/message",
    children: [
      {
        id: 701,
        title: "系统消息",
        title_en: "System message",
        path: "/message/message"
      }
    ]
  },
  {
    id: 8,
    title: "异常页面",
    title_en: "Exception",
    icon: "\ue600",
    path: "/exception",
    children: [
      {
        id: 801,
        title: "403",
        title_en: "403",
        path: "/exception/403"
      }, {
        id: 802,
        title: "404",
        title_en: "404",
        path: "/exception/404"
      },{
        id: 803,
        title: "500",
        title_en: "500",
        path: "/exception/500"
      }
    ]
  },
  {
    id: 9,
    title: "系统设置",
    title_en: "System setting",
    icon: "\ue65d",
    path: "/system",
    children: [
      {
        id: 901,
        title: "系统设置",
        title_en: "System setting",
        path: "/system/setting"
      },
      {
        id: 902,
        title: "系统日志",
        title_en: "System log",
        path: "/system/log"
      }
    ]
  },
  {
    id: 10,
    title: "运维管理",
    title_en: "Safeguard",
    icon: "\ue6b2",
    path: "/safeguard",
    children: [
      {
        id: 1010,
        title: "服务器管理",
        title_en: "Server manguage",
        path: "/safeguard/server"
      },
      {
        id: 1011,
        title: "数据库管理",
        title_en: "Database manguage",
        path: "/safeguard/database"
      }
    ]
  },
  {
    id: 11,
    title: "帮助中心",
    title_en: "Help center",
    icon: "\ue636",
    path: "",
    children: [{
        id: 1101,
        title: "项目官网",
        title_en: "Project website",
        path: "http://www.lingchen.kim/tao_admin_doc"
      }
    ]
  }
]

export {
  menuData
}