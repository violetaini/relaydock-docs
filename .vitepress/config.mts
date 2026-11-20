import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'RelayDock',
  description: '次世代统一节点与代理转发管理平台官方技术手册',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    logo: '/brand.png',
    siteTitle: 'RelayDock Docs',
    outline: {
      label: '本页核心大纲',
      level: [2, 3],
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档 (Ctrl+K)',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '无法找到相关文档内容',
            resetButtonTitle: '清除所有过滤',
            footer: {
              selectText: '选择',
              navigateText: '上下切换',
              closeText: '退出',
            },
          },
        },
      },
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '系统全景图', link: '/docs/guide/overview' },
      { text: '快速开始', link: '/docs/intro/quick-start' },
      { text: '节点与核心', link: '/docs/servers/agent-deploy' },
      { text: 'DDNS & 证书', link: '/docs/features/ddns' },
      { text: '伪装与安全', link: '/docs/features/camouflage' },
      { text: '流量控制', link: '/docs/features/traffic' },
      { text: '排错手册 (FAQ)', link: '/docs/faq/common-issues' },
    ],
    sidebar: [
      {
        text: '📖 架构总览与关系图',
        collapsed: false,
        items: [
          { text: '全景功能矩阵与依赖图', link: '/docs/guide/overview' },
          { text: '系统底层通讯架构', link: '/docs/intro/architecture' },
          { text: '从零部署 12 步路线图', link: '/docs/intro/quick-start' },
        ],
      },
      {
        text: '🖥️ 服务器与 Agent 接入',
        collapsed: false,
        items: [
          { text: 'Agent 一键安装与守护', link: '/docs/servers/agent-deploy' },
          { text: 'Xray 核心管理（内嵌 vs 外部）', link: '/docs/servers/xray-modes' },
          { text: 'Nginx 双模式与原生测速', link: '/docs/servers/nginx-and-speedtest' },
        ],
      },
      {
        text: '🌐 域名、DDNS 与证书',
        collapsed: false,
        items: [
          { text: '智能 DDNS 动态域名自动化', link: '/docs/features/ddns' },
          { text: 'SSL 证书管理（DNS-01 / 手动）', link: '/docs/features/certificates' },
          { text: 'DNS 服务商接入规范', link: '/docs/features/dns-providers' },
        ],
      },
      {
        text: '🛡️ 前置伪装与流量计量',
        collapsed: false,
        items: [
          { text: 'WSS / 443 接管与防 CF 撞墙', link: '/docs/features/camouflage' },
          { text: '流量口径对比与超额熔断', link: '/docs/features/traffic' },
        ],
      },
      {
        text: '🛠️ 运维排错与审计',
        collapsed: false,
        items: [
          { text: '常见故障自诊断手册 (FAQ)', link: '/docs/faq/common-issues' },
        ],
      },
    ],
    docFooter: {
      prev: '上一章节',
      next: '下一章节',
    },
    lastUpdated: {
      text: '文档最后更新时间',
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Chitanda / RelayDock Team. Built with VitePress.',
    },
  },
})
