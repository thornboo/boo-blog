---
title: 关于Webpack，npm、Node的简单介绍
date: 2022-04-18 21:38:39
tags: 总结
---

### 一、npm相关

##### 1、介绍

`npm` 全称为 `Node Package Manager`，是一个基于 `Node.js` 的包管理器，是一个项目构建工具。它可以指定依赖库，设置项目属性等等，都在 `package.json` 配置文件里面。而 `package.json` 文件定义的是包，而 `node_modules` 文件夹则是存储模块的地方。便于js查找模块。  
`npm`主要是提供 `node_module` 的依赖支持, 而且是类似 `maven` 的 `dependency tree` 结构。

`npm` 由三个独立的部分组成：
* 网站：是开发者查找包（`package`）、设置参数以及管理 `npm` 使用体验的主要途径。
* 注册表（`registry`）：是一个巨大的数据库，保存了每个包（`package`）的信息。
* 命令行工具 (`CLI`)：通过命令行或终端运行。开发者通过 `CLI` 与 `npm` 打交道。

##### 2、npm的全局安装和局部安装（ `--save` 和 `--dev` 区别）

##### 3、npm更换镜像源

* 临时切换，通过 `npm` 命令指定下载源： **`npm --registry https://registry.npm.taobao.org install express`**
* 永久修改，使用命令： **`npm config set registry https://registry.npm.taobao.org`**

##### 4、如何查看全局和局部的包
##### 5、`npm` 和 `cnpm` 的区别，会不会产生冲突
##### 6、npm如何更换包的版本

### 二、webpack相关

`Webpack` 是一个前端资源加载/打包工具。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。除此之外，`webpack` 因为可以提高兼容性，可以将一些浏览器尚不支持的新特性转换为可以支持格式，进而减少由新特性带来的浏览器的兼容性问题。

![webpack流程图](https://cdn.jsdelivr.net/gh/thornboo/blog-image-bed@master/webpack流程图.518ty7jhnvw0.webp "webpack流程图")

### 三、node相关

简单的说， `Node.js` 就是一个服务器端的、 非阻断式I/O 的、事件驱动 的JavaScript运行环境。  
基于Google的V8引擎，V8引擎执行Javascript的速度非常快，性能非常好，提供了一种可以让JS代码跑在后端的能力，这就是`node`。

### 四、npm、webpack和node之间的联系

`webpack` 是 `npm` 生态中的一个模块，`webpack` 的运行依赖于 `node` 的环境，没有 `node` 是不能打包的。  
但是 `webpack` 打包后的项目本身只是前端静态资源，和后台没有关系，也就是说不依赖于 `node`，只要有后台能力的都可以部署项目。
