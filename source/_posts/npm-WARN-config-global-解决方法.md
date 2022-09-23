---
title: npm WARN config global ,解决方法
date: 2022-09-23 17:22:56
tags:
---

## 出现问题原因
在安装配置node时，检查node没问题，但是检查npm就出现npm warn config global `--global`, `--local` are deprecated. use `--location=global` instead.的报警；
问题出在以前版本npm的命令一般时XXX -g 但是随着版本更替，这个老方法已被弃用，


## 解决方法
1. 修改npm的配置项（不推荐）
   1. 需要修改两个文件npm和npm.cmd，
   2. 将npm文件的第23行，修改为` prefix --location=global `
   3. 将npm.cmd文件的第12行，修改为` prefix --location=global `

2. 配置全局 '–global'
   1. 使用命令更新npm版本 ` npm install -g npm `
   2. 但是过程中可能会发生` Unexpected token '.' ` 这个错误，而这个错误其实并不是 Node 和 npm 的问题，而是 nvm-windows 的问题导致的，直接重启就能解决。
   3. 然后使用管理员身份启动终端去更新npm版本即可。