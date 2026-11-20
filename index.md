---
layout: home
hero:
  name: RelayDock
  text: 从部署到运维
  tagline: 部署、服务器接入、节点与转发、用户订阅，以及遇到问题时的排查方法。
  image:
    src: /images/docs-cover.svg
    alt: 控制端、节点、用户与运维的文档导航图
  actions:
    - theme: brand
      text: 开始部署
      link: /docs/intro/quick-start
    - theme: alt
      text: 按任务查文档
      link: /docs/guide/overview
    - theme: alt
      text: 排查故障
      link: /docs/operations/troubleshooting
features:
  - title: 安装与接入
    details: 裸机、Docker、HTTPS、三种 Agent 连接模式和核心管理，逐步跑通最小链路。
    link: /docs/install/panel
    linkText: 查看部署指南
  - title: 节点与转发
    details: 讲清任意门入口、目标绑定、协议继承、动态 IP、域名与二维码地址选择。
    link: /docs/nodes/forwarding
    linkText: 查看线路图解
  - title: 用户与订阅
    details: 从账号、套餐到服务授权和个人凭据，再到客户端模板与配置交付。
    link: /docs/users/authorization
    linkText: 了解授权流程
  - title: 域名与证书
    details: 区分 DNS-01 和 DDNS 的服务商支持，说明域名、证书、SNI 与 CDN 的边界。
    link: /docs/features/dns-providers
    linkText: 查看能力表
  - title: 安全与登录
    details: 账号停用、双因素认证、OAuth / OIDC、自动登录与错误响应的处理。
    link: /docs/security/sso
    linkText: 配置统一登录
  - title: 维护与排错
    details: 流量口径、备份恢复、更新回滚、Agent 升级失败和分层日志定位。
    link: /docs/operations/troubleshooting
    linkText: 打开排错手册
---

<div class="home-reading">

## 按你现在要做的事进入

| 想完成的任务 | 直接阅读 |
| --- | --- |
| 从零部署并连接第一条节点 | [快速开始](/docs/intro/quick-start) |
| 给动态 IP 节点添加任意门入口 | [转发绑定](/docs/nodes/forwarding) · [域名规则](/docs/nodes/domains) |
| 服务器已有域名，分享链接还显示 IP | [二维码与分享](/docs/nodes/qr) |
| 新用户能登录却没有可用节点 | [服务授权](/docs/users/authorization) · [用户门户](/docs/users/portal) |
| Agent 升级失败、网页 504 或节点不通 | [更新排错](/docs/operations/update) · [分层排错](/docs/operations/troubleshooting) |
| 不确定当前版本是否有新功能 | [版本范围与修复](/docs/reference/versions) |

## 阅读约定

本手册包含 **38 篇专题说明、实际界面示例与流程图**。示例使用演示账号、保留地址和假凭据，操作时以自己的实例配置为准。

内容核对于 **2026-11-20**，覆盖当前源码的近期修复；旧发行版可能没有相同界面。文档更新不代表创建了新的软件 Release。

</div>
