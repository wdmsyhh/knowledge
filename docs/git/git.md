# Git

## 阅读

- [https://www.runoob.com/git/git-tutorial.html](https://www.runoob.com/git/git-tutorial.html)
- [https://git-scm.com/book/zh/v2](https://git-scm.com/book/zh/v2)

## 配置

- 添加 SSH Key 到 GitLab

```shell
# 生成 SSH key，一路回车即可，不要设置密码，否者可能导致后面脚本执行失败；
# 如果以前生成过且未设置密密，跳过这一步，如设置了密码，需重新生成；
# 执行时修改命令中 ${email} 为自己的邮箱
ssh-keygen -t rsa -C "${email}"
# 复制 SSH pub key 添加到 gitlab
cat ~/.ssh/id_rsa.pub
```

- 查看所有配置

```shell
git config --list --show-origin
```

- 第一次 commit 时会提示如下：

![](./images/git-config.png)

- 配置用户信息

```shell
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
```

## 常用操作

### 提交代码

```shell
git push -u origin feat-xxx
```

### 修改代码后覆盖上次的 commit

```shell
git commit --amend

git push -f
```

### 回退上次的 commit

```shell
git reset --soft HEAD^
```

### 暂存变动的文件

```shell
git stash
```

应用上次暂存的文件

```shell
git stash apply
```

### rebase（变基）

```shell
git rebase origin/develop
```
