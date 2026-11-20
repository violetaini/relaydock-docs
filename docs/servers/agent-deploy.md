# Agent 一键接入指南

将一台新的 Linux 实例接入 RelayDock 极其简单，整个流程仅需在控制面板生成一条命令并在目标节点执行。

---

## 接入步骤

### 第一步：在面板中添加服务器
1. 登录控制台，进入「**服务器管理**」页面。
2. 点击右上角的「**添加服务器**」按钮。
3. 输入您的服务器名称（例如 `Oracle SJC` 或 `DDPS JP`）。
4. 在「**极简接入模式**」下，公网 IPv4、系统架构、内存与磁盘等硬件信息均无需手动填写，Agent 首次上线后会自动上报。
5. 点击「**创建并生成命令**」。

### 第二步：在节点服务器执行安装脚本
面板会弹出一行安全的专属安装命令（示例）：

```bash
curl -fsSL https://relay.example.com/api/remote/install.sh?token=YOUR_SECURE_TOKEN | sudo bash
```

复制并在目标服务器终端执行，安装脚本将自动完成：
- 识别目标机器架构（amd64 / arm64）；
- 下载并校验匹配的 `relaydock-agent` 二进制；
- 写入安全认证 Token 并注册为 systemd 系统守护服务；
- 启动 Agent 并自动与控制端握手。

---

## 常用 Agent 运维命令

在目标服务器上，您可以使用以下命令检查 Agent 运行状态：

```bash
# 查看 Agent 实时运行状态
systemctl status relaydock-agent

# 查看实时日志
journalctl -u relaydock-agent -f -n 50

# 重启 Agent 服务
systemctl restart relaydock-agent
```
