---
title: vue-cli项目迁移到vite遇到的问题和解决办法
date: 2022-09-23 17:32:09
tags:
---

## 为什么要迁移到vite？
主要是构建速度上的差别，除此之外Vite也有一些其他的优势：
- 构建速度：Vite相比Vue CLI最显著的优势应该就是构建速度，Vite基于esbuild预构建依赖，所以速度会快很多。
- 打包方式更快

## 迁移之后配置文件改变
迁移后 vue.config.js 就不再使用了，使用vite.config.js文件来配置项目。其中配置相比vue.config.js更复杂一点，配置项更多。

## 入口文件路径改变
与Vue CLI不同，Vite会将index.html文件放置在项目的根目录中，而不是public目录中，因此需要移动它。并且在index.html我们也需要做一些改变：
- 需要把“<%=BASE_URL%>”占位符改为绝对路径。
- 需要将<%= htmlWebpackPlugin.options.title %>占位符改为硬编码值。
- 应用程序不是自动注入的，所以需要手动引入。

## 测试