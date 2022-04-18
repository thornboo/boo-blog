---
title: Git Commit message 规范指南
date: 2022-04-18 21:57:47
tags: git教程
---

前言：git 每次提交代码，都要写 Commit message（提交说明），否则就不允许提交。但是一般来说，commit message 应该清晰明了，说明本次提交的目的。

## 一、git提交格式

代码格式为： **`git commit -m "hello world"`**

上面代码的 -m 参数，就是用来指定 commit mesage 的。  如果一行不够，可以只执行 git commit ，就会跳出文本编辑器，让你写多行。

## 二、commit message格式

代码格式： **`<type>(<scope>): <subject>`**

1. **type**（必须）
   用于说明 git commit 的类别，只允许使用下面的标识 。
   如果 type 为 `feat` 和 `fix` ，则该commit将肯定出现在 Change log 之中。其他情况由你决定，要不要放入 Change log ，（建议不要放入）。

   **`feat`**:增加新功能。
   **`fix`**: 修复问题/bug 。
   **`docs`**: 文档/注释。
   **`style`**: 代码风格相关/格式（不影响代码运行的变动）。
   **`pre`**: 优化/性能提升。
   **`refactor`**: 代码重构。
   **`test`**: 测试相关 。
   **`chore`**: 依赖更新/脚手架配置修改（构建过程或辅助工具的变动）。
   **`revert`**: 撤销修改（回滚到上一个版本） 。
   **`merge`**: 代码合并 。
   **`types`**: 类型定义文件更改。
   **`wip`**: 开发中。
   **`workflow`**: 工作流改进 。

2. scope（可选）
   scope用于说明 `commit 影响的范围`，比如数据层、控制层、视图层等等，视项目不同而不同。如果你的修改影响了不止一个scope，你可以使用* 代替。

3. subject（必须）
   subject是 `commit目的的简短描述`，不超过50个字符。建议使用中文（毕竟中国人用中文描述问题能更清楚一些），单词开头的第一个字母小写，且结尾不加句号或其他标点符号。

## 三、生成change log

如果你的所有 Commit 都符合格式，那么发布新版本时， Change log 就可以用脚本自动生成。生成的文档应该包括以下三个部分：

* New features
* Bug fixes
* Breaking changes

每个部分都会罗列相关的 commit ，并且有指向这些 commit 的链接。并且生成的文档允许手动修改，所以发布前，你还可以添加其他内容。

conventional-changelog就是生成 Change log 的工具，运行下面的命令即可。

```
npm install -g conventional-changelog
cd my-project
conventional-changelog -p angular -i CHANGELOG.md -w
```