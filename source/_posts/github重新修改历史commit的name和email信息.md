---
title: github重新修改历史commit的name和email信息
date: 2022-04-17 01:04:23
tags: git教程
---

前言：本文将介绍如何批量修改 git 历史提交记录中的 username 和 email。

##### 1、给你的repo创建一个全新的clone，并复制粘贴脚本。

```
git clone --bare https://github.com/user/repo.git
cd repo.git
```

##### 2、根据你的信息修改以下变量：旧的Email地址，正确的用户名，正确的邮件地址；然后按Enter键执行脚本。

```
#!/bin/sh
git filter-branch --env-filter '
OLD_EMAIL="旧的Email地址"
CORRECT_NAME="正确的用户名"
CORRECT_EMAIL="正确的邮件地址"
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```

##### 3、用git log命令看看新 Git 历史有没有错误，如果没有错误就把把正确历史 push 到 Github。

```
git push --force --tags origin 'refs/heads/*'
```

##### 4、接着删掉刚刚临时创建的 clone。

```
cd ..
rm -rf repo.git
```

##### _备注：如何正确设置你的 git 个人信息（全局设置）_

```
git config --global user.email "你的邮件地址"
git config --global user.name "你的Github用户名"
```