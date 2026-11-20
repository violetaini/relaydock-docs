# 功能地图与阅读路线

RelayDock 把多台服务器的代理核心、节点、用户授权、订阅与流量放到一个控制端管理。文档以实际任务组织，不要求先读完所有章节。

## 我应该从哪里开始

| 当前阶段 | 推荐阅读顺序 | 完成标志 |
| --- | --- | --- |
| 第一次部署 | [快速开始](/docs/intro/quick-start) → [控制端安装](/docs/install/panel) → [HTTPS](/docs/install/https) | 可以安全登录 |
| 接入服务器 | [Agent](/docs/servers/agent-deploy) → [连接模式](/docs/servers/connection-modes) → [核心管理](/docs/servers/xray-modes) | 控制通道与核心正常 |
| 配置线路 | [创建节点](/docs/nodes/create) → [转发绑定](/docs/nodes/forwarding) → [域名](/docs/nodes/domains) | 客户端实测通过 |
| 交付用户 | [授权](/docs/users/authorization) → [套餐](/docs/users/packages) → [订阅使用](/docs/users/portal) | 用户只获得自己的可用服务 |
| 长期维护 | [流量](/docs/features/traffic) → [备份](/docs/operations/backup) → [更新](/docs/operations/update) | 数据与恢复路径可控 |
| 已出现故障 | [分层排错](/docs/operations/troubleshooting) → [常见问题](/docs/faq/common-issues) | 找到失败层及证据 |

## 功能对应关系

| 后台入口 | 主要职责 | 相关说明 |
| --- | --- | --- |
| 流量信息 / 流量明细 | 总览、按服务器/用户/节点查看数据 | [计量口径](/docs/features/traffic) |
| 服务管理 | 服务器接入、Agent、核心、Nginx、DDNS、测速 | [字段说明](/docs/servers/server-fields) |
| 节点管理 | 节点属性、绑定、分享与二维码 | [节点基础](/docs/nodes/create) |
| 转发管理 | 转发服务、路径及相关授权 | [转发与多跳区别](/docs/nodes/routing) |
| 用户管理 / 套餐管理 | 账号状态、服务范围、有效期及限制 | [授权模型](/docs/users/authorization) |
| 证书管理 | DNS 凭据、证书申请与维护 | [DNS 服务商](/docs/features/dns-providers) |
| 模板管理 / 规则配置 / 覆写管理 | 生成订阅所需的规则和模板 | [订阅生成](/docs/features/templates) |
| 系统设置 | 品牌、登录方式、订阅行为、系统维护 | [系统设置](/docs/features/settings) |
| 账户中心 | 个人资料、凭据与双因素认证 | [登录安全](/docs/security/login) |

不同角色只会看到有权使用的入口，版本或布局设置可能改变菜单位置。

## 先分清四类对象

[![控制端、服务器、节点、用户授权之间的关系](/images/object-model.svg)](/images/object-model.svg)

- **服务器**是承载 Agent 和核心的机器，记录公网地址、节点域名等信息。
- **入站**是核心上的监听配置，包含协议、端口和用户。
- **节点**是客户端使用的连接配置，可以是物理节点、转发入口或导入条目。
- **授权**决定某个用户在何时能使用哪些服务、额度与限制。

服务器在线不会自动授权所有用户；节点存在也不代表所有订阅都应包含它。

## 典型部署选择

**单机起步**：控制端和一个 Agent 共用服务器，先跑通一条节点；注意面板端口与代理端口不冲突。

**多机管理**：独立控制端，多个 Agent 通过 WebSocket 回连；各节点独立开放业务端口。

**入口转发**：入口 A 的任意门转发到目标 B。A 负责监听和转发，客户端仍使用 B 的代理协议。详见[任意门](/docs/nodes/forwarding)。

## 文档范围

本次内容核对日期为 **2026-11-20**，覆盖当天 `main` 的登录、转发绑定、域名与二维码修复。文档发布不等于 GitHub 新版本发布；较旧安装包可能尚无对应界面。请结合[版本说明](/docs/reference/versions)核对。

示例域名、地址、账号和截图数据均用于演示，不是可直接连接的真实服务。截图使用实际前端构建与隔离样例数据，未连接生产管理接口。
