(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{458:function(t,s,e){"use strict";e.r(s);var r=e(17),a=Object(r.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"安装"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[t._v("#")]),t._v(" 安装")]),t._v(" "),s("h2",{attrs:{id:"ubuntu-安装"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#ubuntu-安装"}},[t._v("#")]),t._v(" Ubuntu 安装")]),t._v(" "),s("h3",{attrs:{id:"安装-protoc-可执行文件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装-protoc-可执行文件"}},[t._v("#")]),t._v(" 安装 protoc 可执行文件")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("进入 "),s("a",{attrs:{href:"https://github.com/protocolbuffers/protobuf/releases",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/protocolbuffers/protobuf/releases"),s("OutboundLink")],1),t._v(" 页面")])]),t._v(" "),s("li",[s("p",[t._v("这里下载 "),s("a",{attrs:{href:"https://github.com/protocolbuffers/protobuf/releases/download/v22.3/protoc-22.3-linux-x86_64.zip",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/protocolbuffers/protobuf/releases/download/v22.3/protoc-22.3-linux-x86_64.zip"),s("OutboundLink")],1)])]),t._v(" "),s("li",[s("p",[t._v("解压后把其中的 protoc 文件拷贝到 "),s("code",[t._v("/usr/local/bin")]),t._v(" 中")])]),t._v(" "),s("li",[s("p",[t._v("打开终端输入 "),s("code",[t._v("protoc --version")]),t._v(" 或 "),s("code",[t._v("protoc")]),t._v(" 执行，查看结果")])])]),t._v(" "),s("h3",{attrs:{id:"安装-protoc-gen-go-可执行文件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装-protoc-gen-go-可执行文件"}},[t._v("#")]),t._v(" 安装 protoc-gen-go 可执行文件")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("下载 "),s("a",{attrs:{href:"https://github.com/golang/protobuf/archive/refs/tags/v1.0.0.tar.gz",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/golang/protobuf/archive/refs/tags/v1.0.0.tar.gz"),s("OutboundLink")],1)])]),t._v(" "),s("li",[s("p",[t._v("进入项目根目录执行")])])]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[t._v("go mod init github.com/golang/protobuf\n")])])]),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),s("p",[t._v("这里选择 v1.0.0 版本的原因是，定义 proto 文件中 go_package 的值前面不用加 "),s("code",[t._v("/")]),t._v("，且生成的 go 文件中比较干净没有多余的字段。（当然还是建议用较新的稳定版，如果是为了实现 web 项目的一些功能，1.0.0 版本也足够了）")])]),t._v(" "),s("div",{staticClass:"language-go extra-class"},[s("pre",{pre:!0,attrs:{class:"language-go"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// v1.0.0 版本生成大致如下")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" StringMessage "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tValue                "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),t._v("   "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('`protobuf:"bytes,1,opt,name=value" json:"value,omitempty"`')]),t._v("\n\tUser                 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("User    "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('`protobuf:"bytes,2,opt,name=User" json:"User,omitempty"`')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// v1.0.0 版本以上版本生成大致如下")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" StringMessage "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tValue                "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),t._v("   "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('`protobuf:"bytes,1,opt,name=value" json:"value,omitempty"`')]),t._v("\n\tUser                 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("User    "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('`protobuf:"bytes,2,opt,name=User" json:"User,omitempty"`')]),t._v("\n\tXXX_NoUnkeyedLiteral "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('`json:"-"`')]),t._v("\n\tXXX_unrecognized     "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("byte")]),t._v("   "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('`json:"-"`')]),t._v("\n\tXXX_sizecache        "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("int32")]),t._v("    "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('`json:"-"`')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("ul",[s("li",[s("p",[t._v("解压并 "),s("code",[t._v("cd protoc-gen-go")])])]),t._v(" "),s("li",[s("p",[t._v("执行 "),s("code",[t._v("go build")]),t._v(" 将在当前目录生成 "),s("code",[t._v("protoc-gen-go")]),t._v(" 可执行文件，并拷贝该文件到 GOBIN 目录或 "),s("code",[t._v("/usr/local/bin")]),t._v(" 中。也可执行 "),s("code",[t._v("go install")]),t._v(" 直接将可执行文件安装到 GOBIN 目录")])])])])}),[],!1,null,null,null);s.default=a.exports}}]);