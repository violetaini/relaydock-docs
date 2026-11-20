import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/',
  title: 'RelayDock',
  description: 'RelayDock 使用手册：安装、Agent 接入、任意门转发、DDNS、用户授权、订阅与运维排错。',
  lang: 'zh-CN',
  cleanUrls: true,
  lastUpdated: false,
  head: [['meta', { name: 'theme-color', content: '#6e5cb1' }]],
  themeConfig: {
    logo: '/brand.png',
    siteTitle: 'RelayDock 文档',
    outline: { label: '本页目录', level: [2,3] },
    sidebarMenuLabel: '章节导航',
    returnToTopLabel: '返回顶部',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换至浅色',
    darkModeSwitchTitle: '切换至深色',
    nav: [
      { text: '开始使用', link: '/docs/intro/quick-start' },
      { text: '功能地图', link: '/docs/guide/overview' },
      { text: '运维与排错', link: '/docs/operations/troubleshooting' },
      { text: '源码', items: [
        { text: '控制端', link: 'https://github.com/violetaini/relaydock' },
        { text: '前端', link: 'https://github.com/violetaini/relaydock-frontend' },
        { text: 'Agent', link: 'https://github.com/violetaini/relaydock-agent' }
      ] }
    ],
    sidebar: [
      {
            "text": "入门与架构",
            "collapsed": false,
            "items": [
                  {
                        "text": "功能地图与阅读路线",
                        "link": "/docs/guide/overview"
                  },
                  {
                        "text": "快速开始",
                        "link": "/docs/intro/quick-start"
                  },
                  {
                        "text": "系统架构与数据流",
                        "link": "/docs/intro/architecture"
                  },
                  {
                        "text": "术语与概念",
                        "link": "/docs/intro/glossary"
                  }
            ]
      },
      {
            "text": "安装与访问",
            "collapsed": false,
            "items": [
                  {
                        "text": "控制端安装",
                        "link": "/docs/install/panel"
                  },
                  {
                        "text": "Docker Compose",
                        "link": "/docs/install/docker"
                  },
                  {
                        "text": "HTTPS 与反向代理",
                        "link": "/docs/install/https"
                  }
            ]
      },
      {
            "text": "服务器与 Agent",
            "collapsed": false,
            "items": [
                  {
                        "text": "Agent 安装与升级",
                        "link": "/docs/servers/agent-deploy"
                  },
                  {
                        "text": "三种连接模式",
                        "link": "/docs/servers/connection-modes"
                  },
                  {
                        "text": "服务器字段与动态 IP",
                        "link": "/docs/servers/server-fields"
                  },
                  {
                        "text": "Xray 核心模式",
                        "link": "/docs/servers/xray-modes"
                  },
                  {
                        "text": "Nginx 与测速",
                        "link": "/docs/servers/nginx-and-speedtest"
                  }
            ]
      },
      {
            "text": "节点与线路",
            "collapsed": false,
            "items": [
                  {
                        "text": "创建与编辑节点",
                        "link": "/docs/nodes/create"
                  },
                  {
                        "text": "任意门转发与绑定",
                        "link": "/docs/nodes/forwarding"
                  },
                  {
                        "text": "动态 IP 与域名",
                        "link": "/docs/nodes/domains"
                  },
                  {
                        "text": "分享链接与二维码",
                        "link": "/docs/nodes/qr"
                  },
                  {
                        "text": "多跳、出站与路由",
                        "link": "/docs/nodes/routing"
                  }
            ]
      },
      {
            "text": "用户与订阅",
            "collapsed": true,
            "items": [
                  {
                        "text": "用户与服务授权",
                        "link": "/docs/users/authorization"
                  },
                  {
                        "text": "套餐、周期与限制",
                        "link": "/docs/users/packages"
                  },
                  {
                        "text": "用户门户与订阅",
                        "link": "/docs/users/portal"
                  },
                  {
                        "text": "模板、规则与生成",
                        "link": "/docs/features/templates"
                  }
            ]
      },
      {
            "text": "域名与运行管理",
            "collapsed": true,
            "items": [
                  {
                        "text": "DNS 服务商能力表",
                        "link": "/docs/features/dns-providers"
                  },
                  {
                        "text": "DDNS 自动解析",
                        "link": "/docs/features/ddns"
                  },
                  {
                        "text": "证书申请与续期",
                        "link": "/docs/features/certificates"
                  },
                  {
                        "text": "前置与伪装",
                        "link": "/docs/features/camouflage"
                  },
                  {
                        "text": "流量、计费与重置",
                        "link": "/docs/features/traffic"
                  },
                  {
                        "text": "系统设置",
                        "link": "/docs/features/settings"
                  },
                  {
                        "text": "探针与通知",
                        "link": "/docs/features/observability"
                  }
            ]
      },
      {
            "text": "安全与运维",
            "collapsed": true,
            "items": [
                  {
                        "text": "登录与双因素认证",
                        "link": "/docs/security/login"
                  },
                  {
                        "text": "OAuth / OIDC / SSO",
                        "link": "/docs/security/sso"
                  },
                  {
                        "text": "备份、恢复与迁移",
                        "link": "/docs/operations/backup"
                  },
                  {
                        "text": "更新与回滚",
                        "link": "/docs/operations/update"
                  },
                  {
                        "text": "分层排错",
                        "link": "/docs/operations/troubleshooting"
                  },
                  {
                        "text": "常见问题",
                        "link": "/docs/faq/common-issues"
                  }
            ]
      },
      {
            "text": "参考与维护",
            "collapsed": true,
            "items": [
                  {
                        "text": "端口、路径与配置",
                        "link": "/docs/reference/ports"
                  },
                  {
                        "text": "API 认证与示例",
                        "link": "/docs/reference/api"
                  },
                  {
                        "text": "版本范围与修复",
                        "link": "/docs/reference/versions"
                  },
                  {
                        "text": "文档站维护",
                        "link": "/docs/reference/docs-maintenance"
                  }
            ]
      }
],
    search: { provider: 'local', options: { translations: {
      button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
      modal: { noResultsText: '没有找到相关内容', resetButtonTitle: '清空搜索',
        footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' } }
    } } },
    docFooter: { prev: '上一篇', next: '下一篇' },
    footer: { message: '操作示例与截图均使用演示数据 · 内容核对于 2026-11-20', copyright: 'RelayDock / Chitanda · 使用手册' }
  },
  markdown: { image: { lazyLoading: true } }
})
