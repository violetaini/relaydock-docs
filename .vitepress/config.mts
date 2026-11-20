import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'RelayDock',
  description: '次世代统一节点与代理转发管理平台官方文档',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    logo: '/brand.png',
    siteTitle: 'RelayDock Docs',
    outline: {
      label: '本页目录',
      level: [2, 3],
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/docs/intro/quick-start' },
      { text: '节点接入', link: '/docs/servers/agent-deploy' },
      { text: '核心功能', link: '/docs/features/ddns' },
      { text: '常见问题', link: '/docs/faq/common-issues' },
    ],
    sidebar: [
      {
        text: '新手指南',
        items: [
          { text: '平台介绍与优势', link: '/docs/intro/quick-start' },
          { text: '系统整体架构', link: '/docs/intro/architecture' },
        ],
      },
      {
        text: '服务器与节点接入',
        items: [
          { text: 'Agent 一键接入指南', link: '/docs/servers/agent-deploy' },
          { text: 'Xray 核心管理（内嵌 vs 外部）', link: '/docs/servers/xray-modes' },
        ],
      },
      {
        text: '核心功能手册',
        items: [
          { text: '动态 DNS (DDNS) 自动化', link: '/docs/features/ddns' },
          { text: 'SSL 证书管理与自动续期', link: '/docs/features/certificates' },
          { text: '前置伪装与防 CF 撞墙', link: '/docs/features/camouflage' },
          { text: '流量统计、重置与配额', link: '/docs/features/traffic' },
        ],
      },
      {
        text: '运维与排错',
        items: [
          { text: '常见问题排查 (FAQ)', link: '/docs/faq/common-issues' },
        ],
      },
    ],
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    lastUpdated: {
      text: '最后更新于',
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Chitanda / RelayDock Team',
    },
  },
})
