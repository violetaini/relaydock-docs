# 分层排错与日志收集

先确定失败层和最近一次变更，每次只改变一个有依据的配置。重启全部服务、恢复整库或关闭安全校验通常会丢失定位线索。

[![从浏览器到代理出口的排错分层](/images/troubleshooting.svg)](/images/troubleshooting.svg)

## 1. 网页访问失败

分别检查 DNS、TCP/TLS、Nginx 和本地后端：

```bash
dig +short A panel.example.com
dig +short AAAA panel.example.com
curl -I --connect-timeout 10 https://panel.example.com/
curl -I --connect-timeout 5 http://127.0.0.1:12889/
```

后端直连仅在对应主机本地且该地址适用时执行。外部失败、本地正常时看 DNS、反代、CDN 和防火墙；本地也失败时看服务和监听。

## 2. 登录失败

区分密码错误、账号停用、TOTP、限流与 SSO。记录状态码和发生阶段，不要把所有错误归为“密码错”。

SSO 点击后还停在本站并 504，优先看本站后端是否请求外部接口超时；已跳到 Google 且页面打不开，则检查浏览器网络。见[SSO 排错](/docs/security/sso#回调失败排查)。

## 3. Agent 离线

1. 核对服务记录和 Agent 启动参数的模式、控制端地址、令牌。
2. 在节点侧确认 DNS、TLS 和系统时间。
3. WebSocket 检查反代升级及空闲超时；HTTP Push 检查节点到主控的上报；Pull 抓取和 HTTP 管理检查主控到 Agent 的可达性及来源限制。
4. 查看 Agent 日志的首个认证或网络错误。

不要删除服务器来消除离线状态，它还关联业务资源。

## 4. Agent 在线、核心异常

检查配置解析、协议版本、证书路径和端口占用。内嵌模式查看 Agent 进程；外部模式另外检查独立核心服务。

```bash
ss -lntup
systemctl list-unit-files | grep -Ei 'arcway|relaydock|xray'
```

## 5. 客户端连不上

按客户端 → 入口 → 目标入站 → 出站逐段检查。核对端口的 TCP/UDP 类型、云安全组、系统防火墙、地址族、协议和个人凭据。

对域名转发，在**入口服务器**解析目标域名。客户端电脑解析正确不代表入口解析也正确。新旧连接还可能使用不同缓存结果。

## 6. 订阅或流量不对

订阅先看授权与个人凭据，再看缓存/模板/客户端；流量先看来源、时间范围、方向与用户归因。详见[订阅](/docs/features/templates)和[流量](/docs/features/traffic)。

## 7. 保存超时或部分失败

刷新读取最新状态，检查远端是否已执行、是否回滚及是否有并发修改。切勿仅因 HTTP 超时就无条件重复提交新增/删除操作。

## 收集一份有效的问题报告

| 信息 | 示例 |
| --- | --- |
| 时间与时区 | 2026-11-20 15:00 UTC+8 |
| 版本与部署 | 控制端、前端、Agent、核心；裸机或容器 |
| 对象与模式 | 服务器展示名称、WebSocket/Push/Pull、内嵌/外部 |
| 复现步骤 | 点击什么、预期与实际结果、是否稳定复现 |
| 证据 | 状态码、首个错误、脱敏截图和日志时间窗口 |
| 最近变更 | 更新、域名、令牌、证书、路由或授权修改 |

不要公开完整订阅 URI、Agent 安装令牌、Cookie、Authorization 头、私钥或数据库。保留结构与错误码即可。
