# HTTPS 与反向代理

以下示例适用于 Nginx 与控制端位于同一台主机。请将 `panel.example.com`、证书路径及后端端口替换成真实配置。已有宝塔、1Panel 或其他网关时，优先在现有站点中配置，避免重复争抢 80/443。

## 配置前检查

1. 域名 A/AAAA 指向正确主机；若没有可用 IPv6，别保留指向错误机器的 AAAA。
2. 已取得域名证书与对应私钥，证书链完整。
3. 控制端本机 HTTP 正常，反代目标端口正确。
4. 云安全组和系统防火墙放行 80/443。

## Nginx 示例

`map` 位于 `http` 上下文中，不要放进 `server`：

```nginx
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

server {
    listen 80;
    server_name panel.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name panel.example.com;
    ssl_certificate     /etc/nginx/certs/panel/fullchain.pem;
    ssl_certificate_key /etc/nginx/certs/panel/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:12889;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_read_timeout 300s;
        proxy_send_timeout 300s;
    }
}
```

这里的超时用于长连接，不能解决后端无法访问外部身份提供商等问题。跨主机反代时修改 `proxy_pass` 并限制后端来源；控制端在 bridge 容器中时，`127.0.0.1` 指代当前容器或宿主环境，需按实际拓扑判断。

## 测试并加载

```bash
sudo nginx -t
sudo systemctl reload nginx
curl -I https://panel.example.com/
```

测试成功后再加载配置。随后用浏览器验证登录、页面刷新和 Agent WebSocket 心跳；HTTP 首页返回 200 不代表升级通道一定正确。

## 代理后的登录与回调

统一使用一个规范的 HTTPS 入口配置 OIDC 回调。保留 `Host` 和 `X-Forwarded-Proto`，避免生成 HTTP 回调或错误域名。复制系统设置显示的完整回调地址到身份提供商，不要手工猜路径。

反代应保留真实来源信息，同时防止任意公网来源直连后端伪造这些头。具体可信代理范围依部署配置决定。

## 缓存与 CDN

- 不缓存登录、`/api/`、订阅私有响应或 OAuth 回调。
- 对带内容哈希的静态资源可以长缓存，HTML 不宜长期缓存。
- 若启用 CDN，单独核对 WebSocket、超时及上传限制。
- CDN 支持 HTTPS 网站不代表支持所有代理 TCP/UDP 端口，见[伪装与前置](/docs/features/camouflage)。

## 常见症状

| 症状 | 优先检查 |
| --- | --- |
| 502 | 后端进程、监听地址、端口和本机可达性 |
| 504 | 后端请求卡住、外部依赖超时、代理日志；不要仅延长超时 |
| Agent 频繁断连 | Upgrade/Connection 头、代理空闲超时及网络 |
| 登录后跳回 HTTP | 规范入口、转发协议头和回调配置 |
| 仅部分网络 TLS 错误 | DNS 分线路、AAAA、CDN 与证书链 |
