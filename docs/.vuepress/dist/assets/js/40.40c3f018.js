(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{393:function(t,a,s){t.exports=s.p+"assets/img/image-111.829d3ee5.png"},486:function(t,a,s){"use strict";s.r(a);var e=s(17),n=Object(e.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"kubectl"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#kubectl"}},[t._v("#")]),t._v(" kubectl")]),t._v(" "),a("h2",{attrs:{id:"安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[t._v("#")]),t._v(" 安装")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://kubernetes.io/zh-cn/docs/tasks/tools/install-kubectl-linux/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://kubernetes.io/zh-cn/docs/tasks/tools/install-kubectl-linux/"),a("OutboundLink")],1)]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("curl -LO https://dl.k8s.io/release/v1.18.0/bin/linux/amd64/kubectl\n")])])]),a("p",[t._v("或者在浏览器地址栏输入 "),a("code",[t._v("https://dl.k8s.io/release/v1.18.0/bin/linux/amd64/kubectl")])]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("注意版本和 k8s 的版本上下不要相差 1")]),t._v(" "),a("p",[t._v("Before you begin\nYou must use a kubectl version that is within one minor version difference of your cluster. For example, a v1.28 client can communicate with v1.27, v1.28, and v1.29 control planes. Using the latest compatible version of kubectl helps avoid unforeseen issues.")])]),t._v(" "),a("p",[t._v("版本对应关系："),a("a",{attrs:{href:"https://github.com/kubernetes-sigs/kind/releases?page=2",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/kubernetes-sigs/kind/releases?page=2"),a("OutboundLink")],1)]),t._v(" "),a("h2",{attrs:{id:"使用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用"}},[t._v("#")]),t._v(" 使用")]),t._v(" "),a("ul",[a("li",[t._v("查看版本")])]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 客户端版本")]),t._v("\nkubectl version "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--client")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 客户端和服务端版本")]),t._v("\nkubectl version\n")])])]),a("ul",[a("li",[t._v("查看集群信息")])]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("kubectl cluster-info\n")])])]),a("h2",{attrs:{id:"常用命令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#常用命令"}},[t._v("#")]),t._v(" 常用命令")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 部署应用")]),t._v("\nkubectl apply "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-f")]),t._v(" app.yaml\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看 deployment")]),t._v("\nkubectl get deployment\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看 pod")]),t._v("\nkubectl get pod "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-o")]),t._v(" wide\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看 pod 详情")]),t._v("\nkubectl describe pod pod-name\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看 log")]),t._v("\nkubectl logs pod-name\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 进入 Pod 容器终端， -c container-name 可以指定进入哪个容器。")]),t._v("\nkubectl "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("exec")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-it")]),t._v(" pod-name -- "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("bash")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 伸缩扩展副本")]),t._v("\nkubectl scale deployment test-k8s "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--replicas")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 把集群内端口映射到节点")]),t._v("\nkubectl port-forward pod-name "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("8090")]),t._v(":8080\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看历史")]),t._v("\nkubectl rollout "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("history")]),t._v(" deployment test-k8s\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 回到上个版本")]),t._v("\nkubectl rollout undo deployment test-k8s\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 回到指定版本")]),t._v("\nkubectl rollout undo deployment test-k8s --to-revision"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 删除部署")]),t._v("\nkubectl delete deployment test-k8s\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 进入 pod 中的容器")]),t._v("\nkubectl "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("exec")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-it")]),t._v(" pod-name "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-c")]),t._v(" container-name -- "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("bash")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 删除所有服务")]),t._v("\nkubectl delete all "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--all")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看 pods 默认是查看 default 命名空间的 pods")]),t._v("\nkubectl get pods\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看指定命名空间的 pods")]),t._v("\nkubectl get pods "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-n")]),t._v(" namespace\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 删除某个命名空间的 pods")]),t._v("\nkubectl delete pods "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--all")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-n")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("namespace"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 执行命令")]),t._v("\nkubectl "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("exec")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-it")]),t._v(" muji-go-crm-tmp-job-5795f798bc-9tp7j -- /bin/sh "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-c")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"ls"')]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 开两个窗口一个执行这个命令，另一个执行 kubectl log -f pod-name 查看日志可以看到输出 aaa")]),t._v("\nkubectl "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("exec")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-it")]),t._v(" muji-go-crm-tmp-job-5795f798bc-9tp7j -- /bin/sh "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-c")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"echo aaa 2>&1 | tee /proc/1/fd/1"')]),t._v("\n")])])]),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("在 Kubernetes 中，当你手动进入 Pod 并执行命令时，这些命令的输出通常不会被重定向到容器的标准输出或标准错误，因此 kubectl logs 无法捕获这些日志。不过，有一些方法可以让你在手动执行命令时，也能将日志输出到 kubectl logs 可以捕获的地方。")])]),t._v(" "),a("ul",[a("li",[t._v("使用 kubectl exec 结合重定向")])]),t._v(" "),a("p",[t._v("你可以使用 kubectl exec 来在容器内执行命令，并将输出重定向到标准输出或标准错误。这样，kubectl logs 可以捕获这些日志。")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("kubectl "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("exec")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-it")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("pod-name"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" -- /bin/sh "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-c")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./app temp generate_mobile --env=test --tableName=mobile_tmall1 --worker=10 --num=200 --minMobile=13499999999 --maxMobile=13999999999 2>&1 | tee /proc/1/fd/1"')]),t._v("\n")])])]),a("ul",[a("li",[t._v("启动一个临时容器并输出到标准输出")])]),t._v(" "),a("p",[t._v("可以创建一个临时 Pod 或容器，专门用于执行你需要的命令，并确保输出到标准输出。")]),t._v(" "),a("p",[t._v("临时 Pod 示例")]),t._v(" "),a("p",[t._v("创建一个临时 Pod 配置文件 temp-job.yaml：")]),t._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("apiVersion")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" batch/v1\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("kind")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Job\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("metadata")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" temp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("job\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("spec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("template")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("spec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("containers")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" temp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("job"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("container\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" your"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("image\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("command")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/bin/sh"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"-c"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("args")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./app temp generate_mobile --env=test --tableName=mobile_tmall1 --worker=10 --num=200 --minMobile=13499999999 --maxMobile=13999999999"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("restartPolicy")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Never\n")])])]),a("p",[t._v("应用这个配置：")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("kubectl apply "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-f")]),t._v(" temp-job.yaml\n")])])]),a("p",[t._v("然后你可以查看这个临时 Pod 的日志：")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("kubectl logs "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-f")]),t._v(" job/temp-job\n")])])]),a("ul",[a("li",[t._v("可以通过创建临时 Pod")])]),t._v(" "),a("p",[t._v("具体示例")]),t._v(" "),a("p",[t._v("假设你有一个简单的 Go 程序 app.go，内容如下：")]),t._v(" "),a("div",{staticClass:"language-go extra-class"},[a("pre",{pre:!0,attrs:{class:"language-go"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("package")]),t._v(" main\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"log"')]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"time"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("main")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tlog"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Println")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"生成手机号任务开始"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\tlog"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Printf")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"开始时间: %s\\n"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" time"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Now")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Format")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("time"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("RFC3339Nano"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 模拟工作")]),t._v("\n\ttime"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Sleep")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" time"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Second"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\tlog"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Println")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"生成手机号任务结束"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("Dockerfile:")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("FROM golang:1.18-alpine\nWORKDIR /app\nCOPY app.go "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(".")]),t._v("\nRUN go build "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-o")]),t._v(" app "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(".")]),t._v("\nCMD "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"sh"')]),t._v(", "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"-c"')]),t._v(", "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"tail -f /dev/null"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),a("p",[t._v("部署Pod:")]),t._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("apiVersion")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" v1\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("kind")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Pod\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("metadata")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" muji"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("go"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("crm"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("temp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("job\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("spec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("containers")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" muji"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("go"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("crm"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("temp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("job"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("container\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" your"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("image"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("latest\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("command")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"sh"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"-c"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"tail -f /dev/null"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 让容器保持运行")]),t._v("\n")])])]),a("p",[t._v("然后使用 kubectl exec 在 Pod 内执行命令并重定向输出：")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("kubectl "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("exec")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-it")]),t._v(" muji-go-crm-temp-job -- /bin/sh "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-c")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./app temp generate_mobile --env=test --tableName=mobile_tmall1 --worker=10 --num=200 --minMobile=13499999999 --maxMobile=13999999999 2>&1 | tee /proc/1/fd/1"')]),t._v("\n")])])]),a("p",[t._v("为了确保手动执行命令的日志能够被 kubectl logs 捕获，最简单的方法是使用 kubectl exec 结合重定向，将日志输出到标准输出或标准错误。此外，你也可以通过创建临时 Pod 或使用日志收集工具来实现这一目标。")]),t._v(" "),a("ul",[a("li",[t._v("直接在pod中执行并重定向")])]),t._v(" "),a("p",[a("img",{attrs:{src:s(393),alt:""}})]),t._v(" "),a("p",[t._v("进入阿里云k8s集群，进入pod执行：")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("./app temp generate_mobile "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--env")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("test "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--tableName")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("mobile_tmall1 "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--worker")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--num")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("200")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--minMobile")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("13000000000")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--maxMobile")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("13000000099")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[a("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[t._v("2")]),t._v(">")]),a("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[t._v("&1")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("tee")]),t._v(" /proc/1/fd/1\n")])])])])}),[],!1,null,null,null);a.default=n.exports}}]);