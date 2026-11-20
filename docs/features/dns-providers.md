# DNS 服务商凭据与支持范围

DNS 凭据可用于证书 DNS-01 验证和 DDNS，但这两类功能使用不同实现。**能申请证书，不代表同一服务商一定能自动更新 A/AAAA。**

## 当前能力表

根据本次核对的控制端源码：

| 服务商类型 | DNS-01 证书 | 内置 DDNS A/AAAA | 关键凭据字段 |
| --- | --- | --- | --- |
| Cloudflare | 支持 | 支持 | `CF_DNS_API_TOKEN`；另有旧 Key 模式 |
| 阿里云 `alidns` | 支持 | 支持 | `ALICLOUD_ACCESS_KEY`、`ALICLOUD_SECRET_KEY` |
| 腾讯云 `tencentcloud` | 支持 | 支持 | `TENCENTCLOUD_SECRET_ID`、`TENCENTCLOUD_SECRET_KEY` |
| DNSPod `dnspod` | 支持 | 支持 | `DNSPOD_API_KEY`，格式为 `ID,Token` |
| NameSilo | 支持 | 支持 | `NAMESILO_API_KEY` |
| GoDaddy | 支持 | 支持 | `GODADDY_API_KEY`、`GODADDY_API_SECRET` |
| 华为云 `huaweicloud` / `huawei` | 支持 | 当前 DDNS 工厂未接入 | `HUAWEICLOUD_ACCESS_KEY_ID`、`HUAWEICLOUD_SECRET_ACCESS_KEY`、区域 |

实际安装的发行版可能滞后于源码，应结合界面和执行结果判断。旧文档笼统写“华为云同时支持全部 DDNS”的表述已纠正。

## 通用配置流程

1. 在 DNS 服务商控制台创建专用凭据，限定到需要的区域/域名及必要操作。
2. 在 **证书管理** 的 DNS 服务商入口添加记录，选择正确类型。
3. 按当前表单填写字段，别把不同服务商密钥格式混用。
4. 保存后进行可用的测试，或在测试域名上执行一次实际挑战/同步。
5. 记录凭据归属、允许的域名和轮换时间。

测试能获取区域列表，不等于具有写记录或删除 TXT 的权限；实际执行仍需验证。

## Cloudflare

建议使用限域 API Token，授予对应区域必要的 DNS 编辑及区域读取能力。不要把 Global API Key 填到 Token 字段。区域范围仅包含要维护的域名，权限设置按服务商当前控制台为准。

内置 DDNS 创建/更新记录时使用 DNS-only；不能指望橙云承载任意代理协议和端口。

## DNSPod 与腾讯云是两种类型

`dnspod` 使用 DNSPod 的 `ID,Token` 形式；`tencentcloud` 使用腾讯云 API `SecretId/SecretKey`。两者不能因为都属于腾讯体系就互换。

## 华为云

证书 DNS-01 使用 AK/SK 与区域字段，具体权限按 DNS 区域读写需求授予。当前内置 DDNS 未实现相应工厂分支，可继续用已有外部 DDNS，或在新增支持并验证后再切换。

## 编辑与轮换

保存前确认新凭据的可写范围；已有 Secret 显示掩码时按界面提示保留或替换，不把掩码当成真实密钥复制到其他系统。

轮换后测试证书验证和 DDNS 两条路径。撤销旧凭据前，确认所有引用的证书/服务器已改用新值。

## 数据保护

DNS 凭据、数据库和备份都按敏感数据保护。不要因为网页遮住 Secret 就认定磁盘上没有敏感内容；本手册不承诺无法验证的“内存立即清零”或“任何日志绝无秘密”。授权范围、主机权限、备份加密和日志脱敏应一起落实。
