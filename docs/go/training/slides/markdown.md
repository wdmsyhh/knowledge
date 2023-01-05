title: Markdown
speaker: Aaron Wang

<slide />

# Markdown

Aaron Wang

<slide />

## 是什么

- 非常简洁、轻量的标记语言（不要被吓到，不是编程语言），常用语法就 10 种左右。
- 基于纯文本，可使用任何文本编辑器编写，文件名使用 `.md` 后缀。
- 原文高度可读。
- 通过工具渲染（render）成 HTML 后可在浏览器中获得更美观的展示效果。
- 广泛应用于写文档、写博客、写书以及各种在线协作系统的文字交流等场景。

<slide />

## 长啥样

```markdown
# 一级标题

## 二级标题 1

我是段落 1，*倾斜*。

我是段落 2，**加粗**。

## 二级标题 2

- 列表项 1
- 列表项 2
- 列表项 3
```

<slide />

## 好处

- 便于版本控制、团队协作。

    试过用 Word 维护文档吗？更新的时候要传来传去，多人维护要粘来粘去、手动合并。即便使用金山文档等可在线实时协作的平台，依然有诸多不便，比如无法高效的知道谁改了哪里、为啥改的。

    Markdonwn 是基于可读纯文本的，便于用 Git 进行版本控制，所有修改历史记录的清清楚楚，而且可以实施 MR review 流程。

- 可专注于内容，无需关心样式。

    你是否有过在所见即所得软件（比如 Word）里折腾半天调不出自己想要效果的经历？又或者某个地方样式莫名不对，感觉这个软件像个黑盒子一样让人摸不着头脑？

    使用 Markdown 不会有这种问题，**所写及所得**，不需要“智能”的软件来“添乱”。

<slide />

## 基本语法

- 标题
- 段落
- 强调
- 删除线
- 引用
- 列表
- 表格
- 链接
- 图片
- 行内代码
- 代码块

<slide />

## GitLab 扩展语法

- 用户 Mention
- Issue 引用
- Milestone 引用
- Merge Request 引用
- Commit 引用
- Emoji
- 任务列表

<slide />

## 知识库扩展语法

- [自定义容器](https://vuepress.vuejs.org/guide/markdown.html#custom-containers)
- [Mermaid](https://kb.maiscrm.com/CONTRIBUTING.html#mermaid)
- [Attrs](https://github.com/arve0/markdown-it-attrs)

<slide />

## 书写规范

见[这里](https://kb.maiscrm.com/develop/style.html#markdown)

<slide />

## Thanks
