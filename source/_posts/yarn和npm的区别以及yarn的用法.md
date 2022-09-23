---
title: yarn和npm的区别以及yarn的用法
date: 2022-09-23 16:48:57
tags:
---

## 什么是yarn？
yarn和npm都是JS包管理工具，且yarn是为了弥补npm中的缺陷而出现的。

## 两者的区别
- yarn比npm速度快：
- yarn使用的是异步安装，而npm使用的是同步安装
- yarn安装过程信息很干净，npm会罗列很多其它包的信息
- yarn安装后是有个yarn.lock文件，这个文件是会锁定你安装的版本，别人安装时会直接读取yarn.lock文件，这样可以保证安装的依赖的版本是一样的，npm在5.x.x的版本也引入了这个机制，它的文件叫package-lock.json
- 

## yarn优点
- 速度快
- 安装版本统一
- 更简洁的输出