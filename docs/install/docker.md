# Docker Compose 部署

适合已有 Docker 运维习惯的 Linux 主机。使用与仓库匹配的 Compose；不要照搬仅映射一个网页端口的通用容器模板。

## 1. 获取配置

```bash
git clone https://github.com/violetaini/relaydock.git
cd relaydock
```

检查仓库 `docker-compose.yml` 后启动：

```bash
docker compose pull
docker compose up -d
docker compose ps
docker compose logs --tail=100 arcway
```

默认服务名为 `arcway`，镜像为 `ghcr.io/violetaini/relaydock:latest`，支持 AMD64 与 ARM64。正式环境应记录实际镜像摘要；准备回滚时应保留可重新获取的旧镜像版本。

## 2. 理解网络与挂载

| 配置 | 仓库默认行为 | 含义 |
| --- | --- | --- |
| `network_mode: host` | 共享宿主机网络 | 动态代理端口不需要逐个写 `ports`，同时也没有普通 bridge 的网络隔离 |
| `PORT=12889` | 面板监听端口 | 与宿主机其他服务冲突时需要修改 |
| `DATABASE_PATH` | `/app/data/arcway.db` | 数据库在持久卷中 |
| `./data:/app/data` | 保存运行数据 | 重建容器时必须保留 |
| `./rule_templates` | 保存规则模板 | 备份时一并检查 |
| `/etc/localtime:ro` | 继承主机时间设置 | 与定时任务和流量周期有关 |

host 网络下不要依靠“没有映射端口”判断服务不对外监听。还需配置主机防火墙和云安全组。

## 3. 初始化与 HTTPS

访问 `http://服务器地址:12889` 完成初始化。用独立反代提供 HTTPS，参见[反向代理](/docs/install/https)。容器部署不代表节点 Agent 自动安装，需要在服务管理中单独接入。

## 更新与回退

更新在 **宿主机 Compose 目录**执行：

```bash
docker compose pull
docker compose up -d
docker compose ps
```

不要在容器内部执行裸机安装脚本，也不要在面板内尝试原地替换容器程序。更新前保存数据备份、旧镜像版本与 Compose 配置；数据库有迁移时需评估旧镜像是否仍兼容。

## 常见错误

- **重建后变成首次初始化**：检查执行目录和数据卷是否变化，别立即重新创建管理员覆盖判断依据。
- **端口占用**：在宿主机执行 `ss -lntup`，核对 host 网络下的冲突。
- **时区不一致**：核对宿主机时区、容器时间和挂载，而不是仅修改浏览器。
- **容器健康、代理失败**：健康检查通常验证控制端 HTTP，不等于所有业务入站健康。

备份和迁移见[备份恢复](/docs/operations/backup)。
