title: Linux 常用排查命令
speaker: Jerome Ge

<slide />

# Linux 常用排查命令

Jerome Ge

<slide />

## 分类

- 通用
- CPU
- 内存
- 磁盘
- I/O
- 网络

<slide />

### 通用

- pstree
- ps
- htop
- glances
- vmstat

<slide />

#### pstree

pstree 命令可以显示正在运行的进程树，可以很直观的看到进程之间的相互关系。命令不指定任何参数，会把系统启动时的第一个进程作为基层，显示基层之后的所有进程。

命令用法：

`pstree [选项] [进程号] [用户]`

常用选项：

- -a 显示命令参数
- -c 不压缩雷同子进程
- -p 显示进程号
- -s 显示指定进程父进程

<slide />

#### ps

ps 命令是强大的进程查看命令，可以查看进程用户、进程号、资源使用情况、运行状态等信息。

命令用法：

`ps [选项]`

常用选项：

- a 显示带有终端（tty）的所有进程
- x 显示当前用户的所有进程，连同 a 列出所有进程
- u 显示面向用户的格式
- v 显示虚拟内存格式
- -e 显示全部进程
- -f 显示完整格式的进程信息
- -t 显示与终端相关联的所有进程
- -p 显示进程使用的 cpu 时间
- -u 显示指定用户的的进程状态
- -L 显示指定进程的线程

最常用的方法是 `ps aux` 和 `ps -ef` 列出所有进程后再用 `grep` 过滤。也可以用 `ps -aux --sort -pmem | less` 和 `ps -aux --sort -pcpu | less` 按内存或 CPU 升序查看进程，或使用 `ps -aux --sort -pcpu,+pmem | head -n 10` 组合命令显示前 10 个资源使用率高进程。

<slide />

#### ps

字段含义：

- USER（UID）：进程所属用户
- PID：进程号
- PPID：父进程号
- %CPU：进程的 CPU 占用率
- %MEM：进程的内存占用率
- VSZ：进程使用的虚拟内存的大小，单位是 Kbytes
- RSS：进程实际使用内存的大小，单位是 Kbytes
- TTY：与进程关联的终端
- STAT：进程的状态，使用 STAT 状态码表示
- STIME：启动时间
- TIME：进程使用的 CPU 总时间
- COMMAND（CMD）：执行的命令

<slide />

#### ps

STAT 状态：

- R：运行，正在运行或在运行队列中等待
- S：中断，休眠中、受阻、在等待某个事件或信号
- D：不可中断，不可中断的休眠，通常是IO
- T：停止，进程收到 SIGSTOP、SIGSTP、SIGTIN、SIGTOU 信号后停止运行
- Z：僵尸，进程已终止，但进程描述符还存在，需等父进程调用 wait4() 系统调用后释放
- <：高优先级进程
- N：低优先级进程
- L：有 pages 在内存中 locked
- s：进程有子进程
- l：多线程
- +：位于前台的进程组

<slide />

#### htop

htop 是 top 的升级版，上半部分可直观的看到 CPU 核数及使用情况、内存或交换使用情况、进程数（task）、线程数（thread）、load、uptime；下半部分可以看到每个进程或线程的详细信息。

字段含义：

- PID：进程或线程号
- USER：所属用户
- PRI：优先级
- NI：由用户或 root 用户重置的优先级
- VIR：使用的虚拟内存
- RES：使用的物理内存
- SHR：使用的共享内存
- S：进程的状态
- CPU%：CPU 占用率
- MEM%：内存占用率
- TIME+：开始执行以来的时间
- Command：执行的命令

可以使用 F6 选择不同的列按升级排列；使用 F5 按子父关系显示；使用 F3 进行搜索等。

<slide />

#### glances

glances 提供了 CPU 使用率、内存和交换使用率、load、磁盘 I/O、磁盘使用率、网络 I/O、容器使用率、进程监控、网页查看等功能，如果有兴趣可以研究下。

<slide />

#### vmstat

vmstat 可对操作系统的虚拟内存、进程、CPU 进行监控，可对系统的整体情况进行分析。

命令用法：

`vmstat [选项] [间隔 [次数]]`

常用选项：

- -a 显示活跃和非活跃内存
- -f 显示系统启动到现在的 fork 数量
- -m 显示 slabinfo
- -n 仅显示一次标题
- -s 显示内存相关统计信息及多种系统活动数量
- -d 显示磁盘统计信息
- -D 显示有关磁盘活动的一些摘要统计信息
- -p 显示指定磁盘分区统计信息
- -w 宽输出模式
- -t 将时间戳附加到每行

<slide />

#### vmstat

字段含义：

- procs
    - r：正在运行或正在等待运行的进程数
    - b：等待 I/O 的进程数
- memory
    - swpd：使用的交换内存量
    - free：空闲物理内存量
    - buff：用作缓冲的内存量
    - cache：用作缓存的内存量
    - inact：不活动的内存量
    - active：活动内存量
- swap
    - si：每秒从交换区写到内存的大小，由磁盘调入内存
    - so：每秒写入交换区的内存大小，由内存调入磁盘
- io
    - bi：每秒接收的块数
    - bo：每秒写入的块数
- system
    - in：每秒中断数，包括时钟
    - cs：每秒上下文切换数
- cpu
    - us：用户进程执行时间百分比
    - sy：系统进程执行时间百分比
    - id：空闲时间百分比
    - wa：I/O 等待时间百分比
    - st：等待宿主机为其他虚拟 CPU 提供服务的时间百分比

<slide />

### CPU

#### mpstat

可使用 `mpstat -P ALL 2 10` 命令查看所有 CPU 的统计数据，每 2 秒输出一次，共输出 10 次。

字段含义：

- %usr：用户进程执行时间百分比
- %nice：执行用户带 nice 优先级的的进程执行时间百分比
- %sys：系统进程执行时间百分比，不包括硬、软中断
- %iowait：I/O 等待时间百分比
- %irq：硬中断的时间百分比
- %soft：硬中断时间百分比
- %steal：等待宿主机为其他虚拟 CPU 提供服务的时间百分比
- %guest：宿主机角度运行虚拟 CPU 的时间百分比
- %gnice：宿主机角度运行带有 nice 优先级 CPU 的时间百分比
- %idle：空闲时间百分比

<slide />

### 内存

#### free

统计内存和交换使用情况，可使用 `free -h` 命令查看，字段含义如下：

- total：表示物理内存或交换的总大小
- used：已使用物理内存或交换，不包含 buff/cache
- free：可用物理内存或交换
- shared：多个进程共享的内存量
- buff/cache：缓存量，包含以下内容
    - buffer：内核缓冲区使用的内存
    - cache：page cache 和 slab 所占用的内存之和，slab 使用可用 `slabtop` 命令查看
- available：可用物理内存，是 free 加上可回收 page cache 和 slab 值的总和

<slide />

### 磁盘

- du
- df
- iozone

<slide />

#### du

显示目录或文件的大小，查找文件和目录的磁盘使用情况。

示例：

- `du -sh` 统计当前目录的大小，以直观方式展现
- `du -sh * | sort - rh` 查看目录下文件的大小并按排序
- `du -h --max-depth=1 | sort` 查看目录下所有一级目录大小并排序

<slide />

#### df

显示磁盘分区摘要信息，如分区格式、空间大小、已用空间、可用空间、挂载信息等，一般使用 `df -Th` 查看。

<slide />

#### iozone

磁盘性能测试工具，可测试磁盘的顺序读写和随机读机速度。常用参数如下：

- -a 全自动模式，使用的块大小从 4k 到 16M，文件大小从 64k 到 512M
- -b 输出结果时将创建一个兼容 Excel 的二进格式的文件
- -c 计算时间时将 clone() 包括进来。
- -e 计算时间时将 flush（fsync，fflush）包括进来
- -g 设置自动模式可使用的最大文件大小，单位是 Kbytes
- -i 用来指定运行哪个测试（0=write/rewrite，1=read/re-read，2=random-read/write，3=Read-backwards，4=Re-write-record，5=stride-read，6=fwrite/re-fwrite，7=fread/Re-fread,8=random mix，9=pwrite/Re-pwrite，10=pread/Re-pread，11=pwritev/Re-pwritev，12=preadv/Re-preadv）
- -K 在普通测试时生成一些随机访问
- -n 自动模式设置最小文件大小
- -N 报告结果以毫秒每操作的方式显示
- -r 指定测试块大小
- -s 指定测试文件大小
- -t 指定测试时使用多少个线程或进程
- -w 当临时文件使用完毕后不删除
- -y 设置自动模式下使用的最小块大小

示例

`iozone -s 10G -r 4k -i 0 -i 1 -i 2` 设置测试文件为 10G，测试块大小为 4K，只测试顺序读写和随机读写。

<slide />

### I/O

#### iotop

iotop 可以显示实时的磁盘活动，监控内核输出的 I/O 使用信息，并显示系统中进程或线程的当前 I/O 使用情况。常用参数如下：

- -o 只显示正在产生 I/O 的进程或线程，可按 o 切换
- -n 设置监控显示次数，默认是无限
- -d 设置显示的间隔秒数
- -p 只显示指定进程的信息
- -P 只显示进程，不显示线程，可以按 p 切换
- -k 使用 KB 为单位显示

字段含义：

- Total DISK READ：进程和线程总的读取量
- Total DISK WRITE：进程和线程总的写入量
- Actual DISK READ：内核块设备子系统和磁盘实际磁盘读取量
- Actual DISK WRITE：内核块设备子系统和磁盘实际磁盘写入量
- TID：线程或进程号
- PRIO：运行时的 I/O 优先级
- USER：所属用户
- DISK READ：刷新时间间隔内读取量
- DISK WRITE：刷新时间间隔内写入量
- SWAPIN：交换使用率
- IO>：I/O 利用率，包含磁盘和交换
- COMMAND：执行的命令

<slide />

### 网络

- iftop
- telnet
- curl
- dig
- mtr
- ss
- netstat
- tcpdump

<slide />

#### iftop

iftop 可用来统计本机网络流量以及和其他地址通信的实量流量，常用参数如下：

- -i 指定需要检测的网卡
- -n 将输出的主机信息都通过 IP 显示
- -P 显示主机以及端口号
- -F 显示指定网段的进出流量

字段含义：

- TX：发送的数据量
- RX：接收的数据量
- TOTAL：发送和接收的总数据量
- cum：从 iftop 运行到目前的发送、接收和总数据量
- peak：发送、接收以及总的峰值
- rates：过去 2s、10s、40s 的平均值

<slide />

#### telnet

telnet 用于登陆远程主机，对远程主机进行管理，采用明文传输，安全性较差。目前一般用来测试端口的连通性。

命令用法：

`telnet [选项] [主机] [端口]`

<slide />

#### curl

curl 是在命令行方式下与服务器之间传输文件和数据的工具，支持的协议包含 HTTP、HTTPS、FTP、SMTP、TELNET 等协议。

命令用法：

`curl [选项] [URL]`

常用选项：

- -i 显示 Response 的 Header 信息
- -I 发送 HEAD 请求并显示 Header 信息
- -v 输出通信的整个过程，用于调试
- -k 跳过 SSL 证书检测
- -w 在请求成功完成后输出指定信息到标准输出，如 DNS 解析时间（time_namelookup），详细内容请参考[文档](https://everything.curl.dev/usingcurl/verbose/writeout#available-write-out-variables)
- -L 让 HTTP 请求跟随服务器的重定向
- --limit-rate 限制 HTTP 请求和返回的带宽，模拟网速慢的环境
- -s 不输出错误和进度信息
- -X 指定 HTTP method，如 GET、POST、PUT、DELETE
- -H 设置 Header
- -e 设置 Referer 值，也可以在 -H 中设置
- -d 设置 POST 方法的数据体（HTTP Body）
- -G 使用 GET 方法发送数据体（HTTP Body）
- -u 设置服务器认证的用户名和密码
- -b 向服务器发送 Cookie
- -A 设置 User-Agent 值，也可以在 -H 中设置
- -C 断点续传
- -x 设置请求的代理
- -U 设置代理认证的用户名和密码
- -o 将输出写入文件
- -D 将 Header 信息写入指定文件

<slide />

#### curl

示例：

- `curl -Iv https://www.maiscrm.com`
- `curl -L http://www.maiscrm.com`
- `curl -o maiscrm.html https://www.maiscrm.com`
- `curl -o /dev/null -s -w "time_namelookup: %{time_namelookup}\n" https://www.maiscrm.com`

<slide />

#### dig

dig 是一个简单易用的域名解析查询工具。

命令用法：

`dig [@域名服务器] [域名] [选项]`

常用选项：

- -b 指定用本机的哪个 IP 地址向域名服务器发送域名查询请求
- -f 从文件中读取需要解析的域名列表，每行一个
- -t 配置查询类型，缺省类型是 A
- tcp 连接域名服务器时使用 TCP 协议
- short 显示简要的输出

示例：

- `dig maiscrm.com`
- `dig maiscrm.com +short`
- `dig maiscrm.com -t txt`

<slide />

#### mtr

mtr 是一个网络诊断工具，可检查到服务器的每个节点丢包、延迟等原因。

命令用法：

`mtr [选项] [域名或IP地址]`

常用选项：

- -u 使用 UDP 数据包，而不是 ICMP
- -r 生成报告，只会发送 10 个数据包，如果想要发送更多数据包，可以使用 -c 配置
- -a 设置发送数据包的 IP 地址
- -s 指定发送的数据包大小，单位是字节
- -c 指定发送数据包的数量
- -4 只使用 IPv4

字段含义：

- Host：到服务器经过的每个节点的 IP 或名称
- Loss%：对应节点的丢包率
- Snt：已发送的数据包数量
- Last：最后一个数据包的响应时间
- Avg：平均响应时间
- Best：最短响应时间
- Wrst：最长响应时间
- StDev：标准偏差，偏差值越高说明各个数据包在该节点的响应时间相差越大

示例：

- `mtr maiscrm.com`
- `mtr -r maiscrm.com`

<slide />

#### ss

ss 可以获取 socket（套接字） 统计信息，可以显示更多更详继的 TCP 连接状态信息，比 netstat 更快更高效。

命令用法：

`ss [选项] [过滤器]`

常用选项：

- -4 只显示 IPv4 套接字
- -6 只显示 IPv6 套接字
- -t 只显示 TCP 套接字
- -u 只显示 UDP 套接字
- -d 只显示 DCCP 套接字
- -w 只显示 RAW 套接字
- -w 只显示 Unix 套接字
- -l 显示正监听的套接字
- -m 使用套接字的内存使用情况
- -p 显示套接字的进程
- -a 显示所有套接字信息
- -s 显示套接字使用概况
- -D 不显示任何信息，将原始 TCP socket 信息存到指定文件
- -f 只显示指定类型的 socket，如 unix、inet、inet6、link、netlink

示例：

- `ss -ta` 显示所有 TCP 连接信息
- `ss -ua` 显示所有 UDP 连接信息
- `ss -o state established '(dport = :ssh or sport = :ssh )'` 显示状态为 established 的 SSH 连接
- `ss -tan|awk 'NR>1{++S[$1]}END{for (a in S) print a,S[a]}'` 统计各状态连接信息，状态值含义请阅读 [TCP 连接的建立和终止过程](https://www.masterraghu.com/subjects/np/introduction/unix_network_programming_v1.3/ch02lev1sec6.html)

<slide />

#### netstat

netstat 命令可以用来查看实际网络连接、路由表、网络统计数据等。

命令用法：

`netstat [选项]`

常用选项：

- -a 显示所有连接中的套接字
- -c 持续列出网络状态
- -i 显示网络界面信息表单
- -l 显示监听中的套接字
- -n 使用 IP 地址显示
- -r 显示路由表
- -s 显示网络工作信息统计
- -t 只显示 TCP 套接字
- -u 只显示 UDP 套接字
- -w 只显示 RAM 套接字
- -v 显示指令执行过程

示例：

- `netstat -ntl` 显示正在监听的 TCP 信息
- `netstat -antp | grep ssh` 查看 SSH 连接信息
- `netstat -an|awk '/^tcp/{++S[$NF]}END{for(a in S) print a,S[a]}'` 统计各状态连接信息，状态值含义请阅读 [TCP 连接的建立和终止过程](https://www.masterraghu.com/subjects/np/introduction/unix_network_programming_v1.3/ch02lev1sec6.html)

<slide />

#### tcpdump

tcpdump 是 Linux 系统上最常用的抓包工具，用来抓取网络通信中的数据包并进行分析。在网络性能急剧下降的时候，可以通过 tcpdump 工具分析原因，找出造成网络阻塞的来源。tcpdump 支持针对网络层、协议、主机、网络接口或端口的过滤，并提供 and、or、not 等逻辑语句过滤不必要的信息。

命令用法：

`tcpdump [选项] [-c 数量] [-F 文件名] [-i 网络接口] [-r 文件名] [-s snaplen] [-T 类型] [-w 文件名] [表达式]`

常用选项：

- -A 以 ASCII 码方式显示每一个数据包，在程序调试时可方便查看数据
- -a 将网络地址和广播地址转变成名字
- -c 将接收到指定数目的数据包后退出
- -d 将匹配信息包的代码以人们能够理解的汇编格式输出
- -f 将外部的 Internet 地址以数字的形式打印出来
- -F 使用文件作为过滤条件表达式的输入，命令行上的输入将被忽略
- -i 指定监听的网络接口
- -l 使标准输出变为缓冲形式
- -n 不把网络地址转换为名字
- -N 不打印出 host 的域名部分
- -q 打印很少的协议相关信息，从而输出行都比较简短
- -r 从文件中读取包数据
- -s 设置数据包抓取长度，默认为 68 字节
- -t 在输出的每一行不打印时间戳
- -tt 不对每行输出的时间进行格式处理
- -ttt 输出时每两行打印之间会延迟一个时间段，以毫秒为单位
- -v 输出一个稍微详细的信息，例如在 ip 包中可以包括 ttl 和服务类型的信息
- -vv 输出说细的报文信息
- -vvv 输出比 -vv 更详细的信息

<slide />

#### tcpdump

示例：

- `tcpdump -i eth0` 抓取 eth0 网卡接口数据包
- `tcpdump -i any` 抓取所有网卡接口数据包
- `tcpdump -i eth0 arp` 基于协议抓取数据包
- `tcpdump -w /path/to/file.pcap` 保存数据包信息到文件，可用 wirshark 打开分析
- `tcpdump -n -i eth0 net 192.168.2.2 and port 53` 抓取指定地址和端口的网络数据包
- `tcpdump -n -i eth0 src 192.168.2.3 and port 80` 抓取指定源定地和端口的数据包

<slide />

#### tcpdump

理解输出：

- [官方文档](http://www.tcpdump.org/manpages/tcpdump.1.html#lbAG)
- 具体的字段根据不同的报文类型会有所不同，一般格式如下：
    - 第一字段是数据包被抓取时的本地时间戳
    - 第二个字段是网络层协议类型
    - 第三个字段是源 IP 地址和端口
    - 第四个字段是目标 IP 地址和端口
    - 第五个字段数据包参数
- flags 字段通常取值如下：
    - [S] SYN 开始连接
    - [.] ACK 成功接收或没有标记
    - [P] PUSH 数据推送
    - [F] FIN 结束连接
    - [R] RST 重启连接
    - [U] URG 紧急报文，优先处理
    - [E] ECE 阻塞通知
    - [W] CWR 阻塞窗口变小
