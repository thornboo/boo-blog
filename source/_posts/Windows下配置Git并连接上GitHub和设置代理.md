---
title: Windows下配置Git并连接上GitHub和设置代理
date: 2022-04-18 22:16:07
tags: git教程
---

本文将详细介绍 Windows 下配置 Git 连接上 GitHub和设置代理。

## 一、配置GitHub

1. 首先进入 GitHub 的 `settings` 页面，https://github.com/settings/keys
2. 如果之前设置过key，需要删除过期的key，如果没有就跳过。
3. 点击 New SSH key，你需要输入 Title（选填） 和 Key，由于现在还没有 key，所以接下来去获取key。
4. 打开 Git Bash并运行 `rm -rf ~/.ssh/*` （建议复制运行） 把本地现有的 ssh key 都删掉。
5. 运行 `ssh-keygen -t rsa -C "填写你的github邮箱"`，注意填写的是你的github邮箱！
6. 接着回车三次，什么都不要输入即可。
7. 运行 `cat ~/.ssh/id_rsa.pub`，得到一串密钥，完整的复制这串密钥，回到上面第 3 步的页面，在 Key 里粘贴刚刚你你复制的那串密钥。
8. 接着点击 Add SSH key， 回到 Git Bash 运行 `ssh -T git@github.com`，输入yes。
9. 如果你看到 Permission denied (publickey). 就说明你失败了，请回到第 1 步重来；如果你看到 Hi FrankFang! You've successfully authenticated, but GitHub does not provide shell access. 就说明你成功了！

## 二、配置本地Git

只有五局命令，依次在CLI中运行:

1. **`git config --global user.name 你的用户名`**
2. **`git config --global user.email 你的邮箱`**
3. **`git config --global push.default matching`**    其意是如果你执行 git push 但没有指定分支，它将 push 所有你本地的分支到远程仓库中对应匹配的分支。
4. **`git config --global core.quotepath false`**     设为false的话，就不会对0×80以上的字符进行quote。中文显示正常。
5. **`git config --global core.editor "vim"`**   设置编辑器为vim。

## 三、设置代理

如果使用的是 `socks5`，本地 ip 和端口是 `127.0.0.1:1080`，则：

1. 只设置GitHub的代理，忽略Gitee：

```
git config --global http.https://github.com.proxy socks5://127.0.0.1:1080
git config --global https.https://github.com.proxy socks5://127.0.0.1:1080
# 取消设置的代理
git config --global --unset http.https://github.com.proxy
git config --global --unset https.https://github.com.proxy
```

2. Git设置全面代理：
   
```
git config --global http.proxy socks5://127.0.0.1:1080
git config --global https.proxy socks5://127.0.0.1:1080
# 取消设置的代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```

## 四、Git其他操作

1. git 的配置文件在 `~/.gitconfig` ，仓库的配置文件是仓库内的 `.git/config`。
2. 加上 `--global` 参数，则设置内容对当前用户生效，不加 `--global` 则对当前仓库生效。
3. 检查配置情况：`git config --list` 。
4. 显示历史记录时每个提交的信息显示一行： `git --global config format.pretty oneline`。