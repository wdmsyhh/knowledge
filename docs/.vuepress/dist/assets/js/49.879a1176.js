(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{347:function(t,s,a){"use strict";a.r(s);var n=a(14),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"在-ubuntu-中安装"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#在-ubuntu-中安装"}},[t._v("#")]),t._v(" 在 Ubuntu 中安装")]),t._v(" "),s("ul",[s("li",[t._v("中文官网参考 "),s("a",{attrs:{href:"https://www.jenkins.io/zh/doc/pipeline/tour/getting-started/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.jenkins.io/zh/doc/pipeline/tour/getting-started"),s("OutboundLink")],1)])]),t._v(" "),s("h2",{attrs:{id:"下载并运行-jenkins"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#下载并运行-jenkins"}},[t._v("#")]),t._v(" 下载并运行 Jenkins")]),t._v(" "),s("p",[t._v("前提条件需要安装 Java，操作目录 "),s("code",[t._v("/opt")])]),t._v(" "),s("p",[t._v("安装（下载链接可能会失效，如果失效，需要去官网登录下载，亦或者去其他平台下载\n解压）")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 下载")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("wget")]),t._v(" https://download.oracle.com/java/17/latest/jdk-17_linux-x64_bin.tar.gz\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 解压")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("tar")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-vxf")]),t._v(" jdk-17_linux-x64_bin.tar.gz\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 修改名称")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("mv")]),t._v(" jdk-17.0.1  jdk17\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 修改环境变量")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("vim")]),t._v(" /etc/profile\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 在文件末尾新增以下，jdk目录在opt/jdk17")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("JAVA_HOME")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("/opt/jdk17\n"),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("PATH")])]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$JAVA_HOME")]),t._v("/bin:"),s("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("$PATH")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("export")]),t._v(" JAVA_HOME "),s("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("PATH")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 重新加载环境变量")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("source")]),t._v(" /etc/profile\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 验证 jdk 安装是否成功")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("java")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-version")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 安装成功现在如下")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("java")]),t._v(" version "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"17.0.6"')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2023")]),t._v("-01-17 LTS\nJava"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("TM"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" SE Runtime Environment "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("build "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("17.0")]),t._v(".6+9-LTS-190"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nJava HotSpot"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("TM"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("64")]),t._v("-Bit Server VM "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("build "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("17.0")]),t._v(".6+9-LTS-190, mixed mode, sharing"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("ul",[s("li",[s("a",{attrs:{href:"http://mirrors.jenkins.io/war-stable/latest/jenkins.war",target:"_blank",rel:"noopener noreferrer"}},[t._v("下载 Jenkins"),s("OutboundLink")],1)]),t._v(" "),s("li",[t._v("打开终端进入到下载目录")]),t._v(" "),s("li",[t._v("运行命令")])]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("java")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-jar")]),t._v(" jenkins.war "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--httpPort")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("8080")]),t._v("\n")])])]),s("ul",[s("li",[t._v("打开浏览器进入链接 "),s("a",{attrs:{href:"http://localhost:8080",target:"_blank",rel:"noopener noreferrer"}},[t._v("http://localhost:8080"),s("OutboundLink")],1)])]),t._v(" "),s("h2",{attrs:{id:"后台启动"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#后台启动"}},[t._v("#")]),t._v(" 后台启动")]),t._v(" "),s("ul",[s("li",[t._v("以使用以下命令在后台启动 Jenkins 并将日志写入指定文件：")])]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("nohup")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("java")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-jar")]),t._v(" jenkins.war "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--httpPort")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("8080")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">>")]),t._v(" jenkins.log "),s("span",{pre:!0,attrs:{class:"token operator"}},[s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[t._v("2")]),t._v(">")]),s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[t._v("&1")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("\n")])])]),s("p",[t._v("其中，nohup 命令用于让进程在后台运行，并忽略 HUP 信号（即终止信号），以避免在关闭终端或者网络断开时停止 Jenkins 进程。> jenkins.log 将 Jenkins 的标准输出重定向到名为 jenkins.log 的文件中，2>&1 则将标准错误输出重定向到与标准输出相同的地方。")]),t._v(" "),s("p",[t._v("执行这个命令之后，Jenkins 会在后台以 HTTP 端口为 8080 的方式启动，并将日志输出到 jenkins.log 文件中。您可以使用 "),s("code",[t._v("tail -f jenkins.log")]),t._v(" 命令来实时查看 Jenkins 的日志输出。")]),t._v(" "),s("ul",[s("li",[t._v("查看 jenkins.log 的大小：")])]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("ls")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-lh")]),t._v(" jenkins.log\n")])])]),s("h2",{attrs:{id:"docker-方式启动"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#docker-方式启动"}},[t._v("#")]),t._v(" Docker 方式启动")]),t._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),s("p",[t._v("待更新")])]),t._v(" "),s("p",[t._v("此方式的 Jenkins 在执行 shell 命令时是执行的 docker 容器内的命令，如果要执行宿主机的 shell 脚本还需要一些配置。")])])}),[],!1,null,null,null);s.default=e.exports}}]);