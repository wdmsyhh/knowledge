# Ubuntu 命令

## nohup使用

[https://www.runoob.com/linux/linux-comm-nohup.html](https://www.runoob.com/linux/linux-comm-nohup.html)

```shell
nohup ./app temp generate_mobile --env=test --tableName=mobile_tmall1 --worker=10 --num=200 --minMobile=13000000000 --maxMobile=13099999999 > print.log 2>&1 &
```

## vi或者vim查找关键字的方法

在命令模式下敲斜杆( / )这时在状态栏（也就是屏幕左下角）就出现了 “/” 然后输入你要查找的关键字敲回车就可以了。如果你要继续查找此关键字，敲字符 n 就可以继续查找了。
敲字符N（大写N）就会向前查询。

## Vim

- 预备知识（三种模式介绍）

基本上 vi/vim 共分为三种模式，分别是命令模式（Command mode），输入模式（Insert mode）和底行命令模式（Last line mode）。 这三种模式的作用分别是：
一般/ 命令模式(Normal mode)：Vim 启动后，默认进入命令模式。在此模式下，我们可以 控制屏幕光标的移动，字符、字或行的删除，移动复制某区段及进入Insert mode下，或者到 last line mode下
输入模式(Insert mode)：只有在此模式下我们可以编辑文本内容。在命令模式下按 `i、 a 、o`等键可以进入输入模式， 按「ESC」键可回到命令行模式
底行模式（Last line mode）： 在命令模式下，`shift+:` 即可进入底行模式。这时光标会移到屏幕底部，在这里可以输入相关指令进行 文件保存或退出，也可以进行文件替换，找字符串，列出行号等操作。

- 三种模式的相互切换：

[正常模式]切换至[插入（输入）模式]： 可以输入`i、a、o`任意一键切换（但三种按键进入的插入模式对应的效果不一样，下文会介绍）
[ 正常模式 ] 切换至 [底行 模式]：  按下`shift + :`, 其实就是输入 `:`
切换至 [正常模式]： 在任何模式下，都可以按 `Esc` 键返回到命令模式，可以多按几次 `Esc` 键，保证顺利返回到命令模式。

- 退出 vim 及保存文件，在底行模式下输入 。

```shell
#（保存当前文件）
w
#(输入「wq」,保存文件并退出vim)
wq
#(输入q!,不存盘强制退出vim)
q!
```

- 进入插入模式。

按「a」进入插入模式后，是从目前光标所在位置的下一个位置开始输入文字

按「i」切换进入插入模式「insert mode」，按“i”进入插入模式后是从光标当前位置开始输入文件

按「o」进入插入模式后，是插入新的一行，从行首开始输入文字

- 移动光标。

vim可以直接用键盘上的光标来上下左右移动，但正规的vim是用小写英文字母「h」「j」「k」、「l」，分别控制光标左、下、上、右移一格

按［ gg］或［ngg］：进入到文本首行或者跳转到第n行

按「shift+g (G)」或［nG］：移动到文章的最后或跳转到第n行

按「shift+4 ($) 」：移动到光标所在行的行尾

按「shift+6 (^)」：移动到光标所在行的行首

按「w」：光标跳到下个字的开头

按「e 」：光标跳到下个字的字尾

按「b 」：光标跳到上个字的开头

按「 nl 」：光标移到该行的第n 个位置

按「 ctrl + b 」：屏幕往 “ 后 ” 移动一页

按「 ctrl + f 」：屏幕往 “ 前 ” 移动一页

按「 ctrl +u 」：屏幕往 “ 后 ” 移动半页

按「 ctrl + d 」：屏幕往 “ 前 ” 移动半页

- 删除文字
按「x」或「nx」：每按一次，删除光标所在位置的一个字符或删除包括光标所在位置及其后面的n个字符

按「X」或「nX」：大写的X，每按一次，删除光标所在位置的前面一个字符或删除光标位置之前的n个字符

按「dd」或「ndd」：对当前行或者当前行在内的n行内容进行删除操作（搭配p可进行剪切操作）

- 复制
按「yw」或「nyw」：将光标所在之处到字尾的字符（或指定n个光标后的字符）复制到缓冲区中

按「yy」或「nyy」 ：复制当前行或者复制当前行所在的指定若干行

按「p」：将缓冲区内的字符贴到光标所在位置；注意：所有与“y”有关的复制命令都必须与“p”配合才能完成复制与粘贴功能。

按「dd+p」:进行剪切操作 ，只按「dd」等于删除

- 替换
按「r」或「nr」：替换光标所在处的字符；

按「R」：替换光标所到之处的字符，直到按下「ESC」键为止；

按「shift+~」：实现大小写转换

- 跳至指定的行
按「ctrl+g」列出光标所在行的行号；

按「nG」：例如，「15G」，表示移动光标至文章的第15行行首.

- 撤销上一次操作

按「u」：撤销刚才的操作，回到上一个操作。按多次“u”可以执行多次撤销；

「ctrl + r」: 对撤销的恢复

- 更改内容

按「cw」：更改光标所在处的字到字尾处

按「cnw」：例如，「c3w」表示更改3个字

- vim底行模式下命令集

- 列出行号

「set nu」: 输入「set nu」后，会在文件中的每一行前面列出行号

- 跳到文件中的某一行

「n」: 在冒号后输入一个数字，再按回车键就会跳到该行了，如输入数字15，再回车，就会跳到文章的第15行

- 查找字符

「/关键字」: 先按「/」键，再输入您想寻找的字符，如果第一次找的关键字不是您想要的，可以一直按 「n」会往后寻找到您要的关键字为止。

「?关键字」：先按「?」键，再输入您想寻找的字符，如果第一次找的关键字不是您想要的，可以一直按「n」会往前寻找到您要的关键字为止。

- 保存文件并退出

「w」: 在冒号输入字母「w」就可以将文件保存起来

「q」：按「q」就是退出，如果无法离开vim，可以在「q」后跟一个「!」强制离vim

「wq」：一般建议离开时，搭配「w」一起使用，这样在退出的时候还可以保存文件

## 查询当前 Linux 系统的信息

- 查询当前 Linux 系统的信息，包括内核版本、主机名、操作系统

```shell
uname -a
```

- 查询当前 Linux 系统的版本（例如 Ubuntu 的版本是 18.04 或 20.04）

先安装命令

```shell
sudo apt-get update
sudo apt-get install -y lsb-release
```

查询

```shell
lsb_release -a
```

## 怎么查找一个文件在那？

find 起始目录 -name 文件名

- 查找当前用户主目录下的文件 example.txt

```shell
find ~ -name example.txt
```

- 查找整个文件系统中名为 myfile.txt 的文件：

```shell
find / -name myfile.txt
```

## awk

awk 是一种文本处理工具，它在类 Unix 系统中非常常用。它的名字来源于其创始人 Alfred Aho、Peter Weinberger 和 Brian Kernighan 的姓氏的首字母。

awk 的主要功能是对文本进行逐行扫描和处理。它使用一种特定的语法，可以方便地从文本数据中提取和处理特定的字段、记录和行。awk 通过定义模式和操作来匹配和处理文本数据。

具体来说，awk 有以下的特点和功能：

1.文本处理：awk 可以扫描和处理文本文件中的每一行，对它们进行匹配、提取、修改和输出。

2.分隔符：awk 默认使用空白字符作为字段分隔符，但可以灵活地设定其他分隔符，例如空格、制表符、逗号等。

3.模式匹配：awk 通过模式来匹配文本行，可以使用正则表达式、逻辑运算符等来定义模式。

4.字段处理：awk 将每一行分解成多个字段，可以根据需要操作和处理这些字段。通过 $ 符号加上字段的编号，可以引用和操作特定的字段，例如 $1 表示第一个字段。

5.内置变量和函数：awk 提供了许多内置的变量和函数，用于处理文本数据，例如 NR 表示当前行号，NF 表示当前行的字段数等。

6.操作命令：awk 可以在匹配到的行上执行一系列的操作命令，包括打印、计算、赋值、循环等。

总之，awk 提供了一种强大而灵活的文本处理工具，可以在命令行中执行，也可以根据需要编写脚本文件。它在数据分析、报告生成和日志处理等方面非常有用。

## cut

`cut -d ' ' -f 1` 是什么意思？

`cut`：这是用于提取文本字段的命令。

`-d ' '`：这是指定字段之间的分隔符。在这个例子中，将空格作为字段的分隔符。-d 参数后面跟着的是分隔符，本例中是一个空格，可以根据实际情况进行修改。

`-f 1`：这是指定要提取的字段。在这个例子中，-f 1 表示提取第一个字段。

举个例子来说明这个命令的作用。假设有以下文本：

```text
John Doe,40,Male
Jane Smith,35,Female
```

运行 `cut -d ',' -f 1` 命令将提取逗号分隔的第一个字段。结果如下：

```text
John Doe
Jane Smith
```

在这个示例中，我们使用 -d ',' 指定逗号为字段的分隔符，然后使用 -f 1 提取第一个字段。

所以，回到之前的问题，cut -d ' ' -f 1 的意思是将空格作为字段的分隔符，然后提取每行文本的第一个字段。该命令将返回第一列的输出。

## Ubuntu hostname

在 Ubuntu 中，主机名（hostname）通常保存在以下两个文件之一：

- `/etc/hostname` 文件：

该文件中只包含主机名，不包含域名。

在大多数情况下，该文件的内容只有一行，指定系统的主机名。

若要查看主机名，可以使用命令 `cat /etc/hostname`。

- `/etc/hosts` 文件：

该文件通常包含主机名和与之关联的 IP 地址。

主机名以及与之关联的 IP 地址是在 hosts 文件的开头部分进行定义的。

若要查看主机名，可以使用命令 cat /etc/hosts 并查找具有 127.0.1.1 IP 地址的行。

请注意，对于特定的 Ubuntu 发行版版本或网络配置，主机名可能在其他文件或位置中定义。但通常情况下，在 /etc/hostname 或 /etc/hosts 文件中可以找到主机名。

## Ubuntu ip

- 使用 `ip` 命令：

打开终端，并执行以下命令：`ip addr show` 或 `ip a`

在输出中，查找以 inet 或 inet6 开头的行，其中包含 IP 地址。通常，IPv4 地址是以 inet 开头的，IPv6 地址是以 inet6 开头的。

例如，你可以查找 inet 开头的行来找到 IPv4 地址，如下所示：

```shell
$ ip addr show
...
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
   inet 192.168.0.100/24 brd 192.168.0.255 scope global dynamic enp0s3
   ...
```

- 使用 `ifconfig` 命令（在某些 Ubuntu 版本中可能已被弃用）：

打开终端，并执行以下命令：`ifconfig`

在输出中，查找以 inet 开头的行，并标有 inet addr 的一行。该行将显示 IPv4 地址。

例如，可以查找 inet addr 来找到 IPv4 地址，如下所示：

```shell
$ ifconfig
...
enp0s3: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.0.100  netmask 255.255.255.0  broadcast 192.168.0.255
        ...
```

## curl

- get 请求

```shell
curl "localhost:9091/accessToken?appId=111&appSecret=222"
# 响应结果
{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjExMSIsImFwcFNlY3JldCI6IjIyMiIsImF1ZCI6ImF1ZCIsImV4cCI6MTY5NDE2NzQxMiwiaWF0IjoxNjk0MTYzODEyLCJpc3MiOiJpc3MiLCJzdWIiOiIxMTE6MjIyIn0.OpKA3kZq7z63-l2ioaxnHf-hb080ApoXj62nsGWSOPI","expires_in":3600}%

# 可以将该命令与 -i 或 -I 选项一起使用，以便在控制台中显示响应头信息和内容
curl -i "localhost:9091/accessToken?appId=111&appSecret=222"
# 响应结果
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Fri, 08 Sep 2023 09:03:35 GMT
Content-Length: 261

{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjExMSIsImFwcFNlY3JldCI6IjIyMiIsImF1ZCI6ImF1ZCIsImV4cCI6MTY5NDE2NzQxNSwiaWF0IjoxNjk0MTYzODE1LCJpc3MiOiJpc3MiLCJzdWIiOiIxMTE6MjIyIn0.vnTYd5nA9MXGp4bx_o4rDPgfJ8jAV1U0zWiUjOJFR9g","expires_in":3600}%
```

可以使用 -H 或 --header 选项来在 cURL 请求中传递一个或多个自定义头部信息。以下是使用 cURL 传递头部的示例命令：

```shell
curl -H "Content-Type: application/json" -H "Authorization: Bearer abcdef123456" "https://example.com/api"
```
