# 控制端安装与初始化

本页适用于 Linux 裸机或虚拟机；容器部署见 [Docker](/docs/install/docker)。如果服务器已运行旧版 RelayDock，应使用[更新流程](/docs/operations/update)，不要把新装步骤当成覆盖修复。

## 环境与边界

| 项目 | 当前实现 / 建议 |
| --- | --- |
| 架构 | AMD64 / ARM64；32 位及其他架构需自行核对构建支持 |
| 系统 | 安装器识别 apt、dnf/yum、apk、pacman 等；服务管理依赖 systemd，优先使用 Debian/Ubuntu 等 systemd 环境 |
| 权限 | 安装、端口及服务管理需要 root 或 sudo |
| 网络 | 访问 GitHub API、Raw 与 Release 下载地址；能进行正常 DNS/TLS 请求 |
| 容量 | 为数据库、备份、日志和更新临时文件预留空间；按实际用户和节点规模评估 |

识别包管理器不代表覆盖所有发行版及 init 系统。尤其 Alpine 默认 OpenRC，不能仅根据脚本出现 `apk` 就承诺可直接完成服务托管。

## 安装步骤

1. 确认机器架构和操作系统。

   ```bash
   uname -m
   cat /etc/os-release
   df -h
   ```

2. 下载入口脚本并运行。

   ```bash
   curl -fsSL https://raw.githubusercontent.com/violetaini/relaydock/main/quick-install.sh -o quick-install.sh
   sudo bash quick-install.sh
   ```

3. 按菜单选择安装，记录控制端端口及服务名。GitHub 下载失败时保留完整错误，优先检查网络和目标资产，不要不断换来源执行未知脚本。
4. 云安全组和系统防火墙放行需要的入口。首次初始化应限制到自己的来源地址，完成后尽快启用 HTTPS。
5. 访问 `http://服务器地址:12889`，按向导创建管理员。

::: warning 端口并非固定绑定本机
默认 HTTP 监听为 `0.0.0.0:12889`，端口可修改。仅允许反代访问时，可通过 `BIND_HOST=127.0.0.1` 或防火墙限制；跨机/容器反代不能照搬本机回环地址。
:::

## 默认路径与历史名称

| 内容 | 脚本默认值 | 注意 |
| --- | --- | --- |
| 服务名 | `arcway` | 旧部署或定制部署可能是 `relaydock` |
| 数据目录 | `/etc/arcway` | 可由安装环境变量及已有配置改变 |
| 安装目录 | `/usr/local/bin` | 以安装日志和 systemd 单元为准 |
| HTTP/API 端口 | `12889` | 安装菜单或配置可以改变 |

项目更名后仍保留部分 `arcway` 命名以兼容现有部署。不要因目录名称不同而额外装第二份。

```bash
systemctl list-unit-files | grep -E 'arcway|relaydock'
sudo systemctl status arcway --no-pager
sudo journalctl -u arcway -n 100 --no-pager
```

若实际服务名为 `relaydock`，替换上述命令中的服务名。

## 安装后的管理入口

安装器注册的快捷命令为 `relaydock`。常用子命令：

```bash
relaydock status
relaydock log
relaydock restart
relaydock port 18080
relaydock reset-password
```

修改端口会影响反代、云安全组和监控；本地重置密码仅供持有服务器管理权限者使用。完成紧急恢复后检查账号、双因素认证及会话。

## 首次验收

确认刷新页面后仍能登录、数据库数据能保留、外部 HTTPS 可访问、系统服务已设置开机启动。再接入 [Agent](/docs/servers/agent-deploy)。若网页可访问但静态资源 404，核对[前后端版本](/docs/reference/versions)。
