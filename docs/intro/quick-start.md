# 从零部署 12 步路线图

本指南采用与业界标杆（妙妙屋X）相同标准的实战步骤，指导您从一台全新的 Linux VPS 开始，在 10 分钟内完成 RelayDock 控制端主控、SSL 证书配置、Agent 节点接入与客户端分发的全流程闭环。

---

## 路线图总览

```text
[阶段一: 控制端准备]
  步骤 1: 准备云服务器与独立域名
  步骤 2: 部署 RelayDock 主控服务
  步骤 3: 配置反向代理与 HTTPS (WebCrypto 安全上下文)
  步骤 4: 登录管理后台并设置高强度凭据

[阶段二: DNS 与证书凭据配置]
  步骤 5: 接入 DNS 提供商 API (华为云/Cloudflare/DNSPod)
  步骤 6: 签发或上传泛域名 SSL 证书 (*.example.com)

[阶段三: 节点接入与核心配置]
  步骤 7: 在面板添加首台远程服务器
  步骤 8: 目标节点执行一键安装命令启动 Agent
  步骤 9: 配置域名与启用 DDNS 动态域名同步
  步骤 10: 设定 Xray 核心运行模式 (内嵌核心 vs 外部接管)

[阶段四: 安全伪装与分发交付]
  步骤 11: 配置 WSS / 443 伪装反代与安全防撞墙
  步骤 12: 创建用户与套餐，下发客户端订阅
```

---

## 实操详解（12 步实战）

### 步骤 1：准备云服务器与独立域名
- **服务器要求**：Debian 11+ / Ubuntu 22.04+，最低 1 核 CPU、1GB 内存、10GB 磁盘。
- **域名准备**：准备一个属于您的主域名（如 `chitanda.net`），并将主控子域名（如 `relay.chitanda.net`）解析至主控服务器 IP。

### 步骤 2：部署 RelayDock 主控服务
主控端支持一键二进制部署或 systemd 托管，默认服务监听在 `127.0.0.1:12889`。

### 步骤 3：配置反向代理与 HTTPS
由于现代浏览器对于敏感 API（如 WebCrypto 加密通道、剪贴板等）强制要求处于安全上下文环境（HTTPS），强烈建议使用 Nginx 前置反代：

```nginx
server {
    listen 80;
    listen 443 ssl http2;
    server_name relay.chitanda.net;

    ssl_certificate /etc/letsencrypt/live/relay.chitanda.net/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/relay.chitanda.net/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:12889;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 步骤 4：登录管理后台并设置安全认证
浏览器访问 `https://relay.chitanda.net`，首次登录输入默认凭据，并在「账号设置」中绑定 Google Authenticator 双因素认证（2FA）。

### 步骤 5：接入 DNS 提供商 API
进入「**证书与 DNS 管理**」->「**DNS 提供商**」：
- **华为云 DNS**：输入 `Access Key ID` 与 `Secret Access Key`。
- **Cloudflare**：输入拥有 DNS Edit 权限的 `API Token`。
- **DNSPod**：输入腾讯云 `SecretId` 与 `SecretKey`。
点击测试连通性，确保 API 状态标绿。

### 步骤 6：签发或上传泛域名证书
- 点击「**申请证书**」，选择刚才配置的 DNS 服务商，输入 `*.chitanda.net` 与 `chitanda.net`，系统将通过 DNS-01 自动完成挑战并签发证书。
- 如已有 PEM/KEY 证书，可选择手动上传，并在「关联 DNS 提供商」下拉中选中对应服务商以供后续 DDNS 自动复用。

### 步骤 7：在面板添加服务器
进入「**服务器管理**」-> 点击「**添加服务器**」：
- 输入服务器名称（例如 `Oracle SJC`）。
- 保持默认的「**极简接入模式**」与「**WebSocket 模式**」。

### 步骤 8：在节点执行一键安装命令
复制生成的 `curl -fsSL https://... | sudo bash` 命令，在节点终端回车执行。10 秒内服务自动注册上线，卡片右上角显示绿色的「在线」图标。

### 步骤 9：配置节点域名与启用 DDNS
在编辑服务器中选择「**启用本面板 DDNS 服务的域名**」：
- 点击下方快捷证书 Chips 标签（如 `*.chitanda.net`），自动拼接为子域名 `sjc.chitanda.net`。
- DDNS 提供商保持「**根据域名自动匹配**」，下方即时亮起绿色成功徽章。

### 步骤 10：确认 Xray 核心运行模式
- 默认为 **全托管内嵌核心 (Embedded)**，Xray 代码直接编译在 Agent 内，单进程运行，免系统服务冲突。

### 步骤 11：配置 WSS 前置伪装与防撞墙
展开「**前置与伪装站高级选项**」：
- 选择接管模式（Tunnel 或 Fallback）。
- 设置反代目标（例如 `https://www.bing.com`），面板会自动安全审计，若目标套用了 Cloudflare CDN 将自动阻止保存以保护服务器。

### 步骤 12：交付与订阅下发
节点就绪后，进入「节点管理」生成订阅链接，支持直接导入 Clash / Mihomo / Sing-box / Shadowrocket 等客户端。
