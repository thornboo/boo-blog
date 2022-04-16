---
title: 关于npm的一些基础设置和常用命令
date: 2022-04-17 01:25:46
tags:
---

#### 1、换镜像源

目前国内一般都使用淘宝镜像源，访问速度非常快。

1. npm查看当前使用源： **`npm config get registry`**

2. 临时切换，通过 npm 命令指定下载源： **`npm --registry https://registry.npm.taobao.org install express`**

3. 永久修改，使用命令： **`npm config set registry https://registry.npm.taobao.org`**

4. 切换官方源： **`npm config set registry https://registry.npmjs.org`**

#### 2、常用命令

1. 安装： **`npm install 模块名`** （加-g全局安装；加--save安装运行时依赖）

2. 卸载： **`npm uninstall 模块名`**

3. 查找：
   1. 查看模块安装目录： **`npm root`** （加 -g 为全局）
   2. 查看全局安装的包： **`npm list -g --dept 0`** （深度为0）
   3. 查看配置信息： **`npm config list`** （查看详细配置： **`npm config list -l`** ）

4. 更新：
   1. 包更新： **`npm undate`** 模块名
   2. npm版本更新： **`npm update`** （更新的是当前目录下的 **node_modules** ）
   3. npm更新升级： **`npm install n -g`**

#### 3、package.json文件的配置说明

```
{
  "name": "blog",  //项目名称
  "version": "0.0.0",   //版本
  "description": "",   //项目描述
  "private": true,  
  "main": "index.js",  //入口文件
  "scripts": {   //配置一些通用的命令脚本
	"start": "node ./bin/www"
  },
  "keywords": [],  //项目的关键字
  "author": "",  //作者
  "dependencies": {   //开发时的依赖
	"body-parser": "~1.16.0",
	"cookie-parser": "~1.4.3",
	"debug": "~2.6.0",
	"ejs": "~2.5.5",
	"express": "~4.14.1",
	"morgan": "~1.7.0",
	"serve-favicon": "~2.3.2"
  },
  "devDependencies": {   //运行时的依赖
	"express-session": "^1.15.1"
  }
}
```