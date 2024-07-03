(window.webpackJsonp=window.webpackJsonp||[]).push([[64],{469:function(e,t,s){"use strict";s.r(t);var a=s(17),n=Object(a.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"kubectl"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#kubectl"}},[e._v("#")]),e._v(" kubectl")]),e._v(" "),t("h2",{attrs:{id:"安装"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[e._v("#")]),e._v(" 安装")]),e._v(" "),t("p",[t("a",{attrs:{href:"https://kubernetes.io/zh-cn/docs/tasks/tools/install-kubectl-linux/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://kubernetes.io/zh-cn/docs/tasks/tools/install-kubectl-linux/"),t("OutboundLink")],1)]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("curl -LO https://dl.k8s.io/release/v1.18.0/bin/linux/amd64/kubectl\n")])])]),t("p",[e._v("或者在浏览器地址栏输入 "),t("code",[e._v("https://dl.k8s.io/release/v1.18.0/bin/linux/amd64/kubectl")])]),e._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),t("p",[e._v("注意版本和 k8s 的版本上下不要相差 1")]),e._v(" "),t("p",[e._v("Before you begin\nYou must use a kubectl version that is within one minor version difference of your cluster. For example, a v1.28 client can communicate with v1.27, v1.28, and v1.29 control planes. Using the latest compatible version of kubectl helps avoid unforeseen issues.")])]),e._v(" "),t("p",[e._v("版本对应关系："),t("a",{attrs:{href:"https://github.com/kubernetes-sigs/kind/releases?page=2",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://github.com/kubernetes-sigs/kind/releases?page=2"),t("OutboundLink")],1)]),e._v(" "),t("h2",{attrs:{id:"使用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#使用"}},[e._v("#")]),e._v(" 使用")]),e._v(" "),t("ul",[t("li",[e._v("查看版本")])]),e._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 客户端版本")]),e._v("\nkubectl version "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("--client")]),e._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 客户端和服务端版本")]),e._v("\nkubectl version\n")])])]),t("ul",[t("li",[e._v("查看集群信息")])]),e._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[e._v("kubectl cluster-info\n")])])]),t("h2",{attrs:{id:"常用命令"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#常用命令"}},[e._v("#")]),e._v(" 常用命令")]),e._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 部署应用")]),e._v("\nkubectl apply "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-f")]),e._v(" app.yaml\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 查看 deployment")]),e._v("\nkubectl get deployment\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 查看 pod")]),e._v("\nkubectl get pod "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-o")]),e._v(" wide\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 查看 pod 详情")]),e._v("\nkubectl describe pod pod-name\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 查看 log")]),e._v("\nkubectl logs pod-name\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 进入 Pod 容器终端， -c container-name 可以指定进入哪个容器。")]),e._v("\nkubectl "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("exec")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-it")]),e._v(" pod-name -- "),t("span",{pre:!0,attrs:{class:"token function"}},[e._v("bash")]),e._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 伸缩扩展副本")]),e._v("\nkubectl scale deployment test-k8s "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("--replicas")]),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[e._v("5")]),e._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 把集群内端口映射到节点")]),e._v("\nkubectl port-forward pod-name "),t("span",{pre:!0,attrs:{class:"token number"}},[e._v("8090")]),e._v(":8080\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 查看历史")]),e._v("\nkubectl rollout "),t("span",{pre:!0,attrs:{class:"token function"}},[e._v("history")]),e._v(" deployment test-k8s\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 回到上个版本")]),e._v("\nkubectl rollout undo deployment test-k8s\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 回到指定版本")]),e._v("\nkubectl rollout undo deployment test-k8s --to-revision"),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[e._v("2")]),e._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 删除部署")]),e._v("\nkubectl delete deployment test-k8s\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 进入 pod 中的容器")]),e._v("\nkubectl "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("exec")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-it")]),e._v(" pod-name "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-c")]),e._v(" container-name -- "),t("span",{pre:!0,attrs:{class:"token function"}},[e._v("bash")]),e._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 删除所有服务")]),e._v("\nkubectl delete all "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("--all")]),e._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 查看 pods 默认是查看 default 命名空间的 pods")]),e._v("\nkubectl get pods\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 查看指定命名空间的 pods")]),e._v("\nkubectl get pods "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-n")]),e._v(" namespace\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 删除某个命名空间的 pods")]),e._v("\nkubectl delete pods "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("--all")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-n")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("namespace"),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v("\n")])])])])}),[],!1,null,null,null);t.default=n.exports}}]);