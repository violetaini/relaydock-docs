# RelayDock 官方技术文档与运维手册

本仓库托管 **RelayDock** 次世代统一节点与代理转发管理平台的官方技术文档站。

- **文档框架**：基于 [VitePress](https://vitepress.dev/) 驱动
- **托管平台**：GitHub Actions + GitHub Pages 自动化部署
- **在线文档**：[https://violetaini.github.io/relaydock-docs/](https://violetaini.github.io/relaydock-docs/)

## 本地开发与预览

```bash
# 安装依赖
npm install

# 启动本地实时预览服务
npm run docs:dev

# 本地打包静态网站
npm run docs:build
```

## 目录结构

```text
├── .github/workflows/deploy.yml  # GitHub Actions 自动化部署工作流
├── .vitepress/config.mts         # 导航栏、侧边栏、搜索与网站全局配置
├── docs/                         # Markdown 技术文档目录
│   ├── guide/                    # 全景架构图与功能依赖
│   ├── intro/                    # 快速开始与部署路线图
│   ├── servers/                  # Agent 接入与 Xray 核心管理
│   ├── features/                 # 动态 DDNS、SSL 证书与伪装反代
│   └── faq/                      # 常见故障排查手册
├── public/                       # 静态资源与图片
└── index.md                      # 网站首页
```
