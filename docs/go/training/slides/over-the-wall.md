title: 科学上网（翻墙）
speaker: Aaron Wang

<slide />

# 科学上网（翻墙）

Aaron Wang

<slide />

## 常见方式

- 购买 VPN 服务：
    - 优点：使用简单，通常有多个线路供选择，违法风险低。
    - 缺点：贵，限制带宽或流量，有可能跑路。
- 境外购买 VPS 自建服务器（SSH 动态端口转发 => Shadowsocks => v2ray-core + VMess）：
    - 优点：灵活，自由，不会跑路。
    - 缺点：折腾，IP 容易被封，违法风险高。

<slide />

## 2021-08 起的标准化开发机系统已内置翻墙软件

- 基于 [v2ray-core](https://github.com/v2fly/v2ray-core)（[VMess](https://www.v2ray.com/chapter_02/protocols/vmess.html)） + [Qv2ray](https://github.com/Qv2ray/Qv2ray) + 阿里云香港 ECS。
- Ubuntu 上通过修改 `/usr/share/applications/google-chrome.desktop` 给 Chrome 加了 `--proxy-server="socks5://127.0.0.1:1089"` 代理选项。如果不想用 Qv2ray，请自行编辑该文件删除相关选项（注意有多个，不要漏了）。另外升级 Chrome 可能导致这些选项丢失，这时需要自己加回去（加在所有 `Exec=` 行的末尾）。
- Windows 上不想用时退出 Qv2ray 即可，不需要额外做什么。
- 这个阿里云香港 ECS 是用我个人账号买的：
    - 不要用来干违法乱纪的事！
    - 不要看视频、大量下载文件，流量费是有点贵的。
    - 仅供新人过渡使用，建议尽快自行购买 VPN 或搭建服务器。
- 如果不管用（Chrome 中打不开 google.com）：
    - 先检查系统时间是否正确，VMess 协议对时间误差有要求，误差超过 90s 会无法使用。
    - 或者可能是 IP、端口、密码等配置信息过时，可 Chat 私聊 @aaron.wang 索要最新的。

<slide />

## 自建服务器演示

:::steps
注意：不要在工作时间折腾这个，不要为此耽搁培训进度。
:::

- 在阿里云控制台执行以下操作：
    - 购买 ECS：
        - 区域选香港。
        - 规格选 ecs.t5-lc2m1.nano。
        - 镜像选 Ubuntu 20.04。
        - 存储选高效云盘 20G。
        - 公网 IP 取消勾选分配公网 IPv4 地址。
    - 购买 EIP：
        - 区域选香港。
        - 线路类型选 BGP(多线)_国际。
        - 流量选按使用流量计费，带宽峰值设为 100Mbps。
    - 绑定 EIP 到 ECS。
    - 设置安全组。
    - 远程连接 ECS。
- [安装并配置 V2Ray。](https://www.v2fly.org/guide/start.html)

<slide />

## Qv2ray 使用说明

- Qv2ray 可以完成自动路由：局域网及国内网站不走代理，国外网站才走代理，不需要额外使用 SwitchyOmega 等浏览器扩展。
- 自动路由可能不准（比如国内网站走了代理导致很慢），可通过 Log 窗口观察某个域名是在直连还是在走代理，然后在【Preferences】>【Advanced Route Settings】中自行调整。
- 在命令行中使用：
    - 手动设置 proxy 环境变量 `export ALL_PROXY=socks5://127.0.0.1:1089`。注意，不要放到 `~/.zsh_rc` 等 rc 文件里，确实需要翻墙的时候再设置，否则可能导致一些问题。
    - 或者使用 [proxychains](https://github.com/haad/proxychains) 简化，标准化开发机系统已安装并配置，配置文件位于 `~/.proxychains/proxychains.conf`）。
- 各种包管理器应配置使用国内镜像源，无需走代理：[apt](https://developer.aliyun.com/mirror/ubuntu?spm=a2c6h.13651102.0.0.3e221b11r1f2Gl)、[homebrew](https://developer.aliyun.com/mirror/homebrew?spm=a2c6h.13651102.0.0.3e221b11r1f2Gl)、[docker](https://help.aliyun.com/document_detail/60750.html)、[npm](https://gist.github.com/52cik/c1de8926e20971f415dd)、[composer](https://developer.aliyun.com/composer?spm=a2c6h.13651102.0.0.3e221b11r1f2Gl)、[go](https://goproxy.cn/)、[maven](https://developer.aliyun.com/mirror/maven?spm=a2c6h.13651102.0.0.3e221b11r1f2Gl)、[pip](https://developer.aliyun.com/mirror/pypi?spm=a2c6h.13651102.0.0.3e221b11r1f2Gl)。

<slide />

## Thanks
