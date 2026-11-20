---
layout: home

hero:
  name: "RelayDock"
  text: "次世代统一节点与代理转发平台"
  tagline: "全托管 Xray 核心 · 智能 DDNS 解析 · 零配置极简接入"
  image:
    src: /brand.png
    alt: RelayDock
  actions:
    - theme: brand
      text: 🚀 快速上手
      link: /docs/intro/quick-start
    - theme: alt
      text: 📖 查阅核心功能
      link: /docs/features/ddns

features:
  - icon: ⚡
    title: 极简接入 · 秒级上线
    details: 支持 WebSocket、Push、Pull 三种连接架构，一键命令无感部署，自动上报节点指标。
  - icon: 🚀
    title: 内嵌核心 · 全托管 Xray
    details: 底层代码级内嵌 Xray-core，零宿主机残留与端口冲突，随 Agent 平滑无缝热重载。
  - icon: 🌐
    title: 智能 DDNS · 动态感知
    details: 支持华为云、Cloudflare、DNSPod 等主流服务商，自动匹配泛域名证书并同步 A/AAAA 记录。
  - icon: 🔒
    title: 证书自动化 · DNS-01 续签
    details: 内置 ACME 自动化，支持 Let's Encrypt 泛域名免费签发与 PEM/KEY 手动证书生命周期管理。
  - icon: 🛡️
    title: 伪装反代 · 防 CF 穿透
    details: 具备 443 端口接管与 WSS 伪装反代能力，内置防 Cloudflare 撞墙保护机制。
  - icon: 📊
    title: 精准计量 · 多源聚合
    details: 灵活切换系统网卡口径与 Xray 聚合口径，支持流量月度重置日与上下行方向校准。
---
