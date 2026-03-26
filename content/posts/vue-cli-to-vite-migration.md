---
title: vue-cli 项目迁移到 Vite 遇到的问题和解决办法
description: 从 vue-cli 迁移到 Vite 不只是换个构建工具，路径、环境变量、静态资源和依赖兼容性都会一起暴露出来。
date: 2026-03-28
draft: false
tags:
  - Vue
  - Vite
  - 工程化
aliases: []
cssclasses: []
socialImage: ""
comments: true
---

# 写在前面

把一个已经在线上跑了一段时间的 `vue-cli` 项目迁移到 Vite，表面看像是“换掉构建工具”，实际做起来会发现很多历史细节都会被一起翻出来。

真正麻烦的通常不是 `vite.config.ts` 怎么写，而是项目原来那些默认依赖 `webpack` 语义的地方，在 Vite 下不再成立。

## 为什么想迁移

通常迁移的动机都差不多：

- 本地启动慢
- 热更新体验一般
- 构建配置越来越重
- 团队后续新项目已经转向 Vite

如果这些痛点已经很明显，那迁移是合理的。但它更像一次工程收债，而不是一次只改命令行的升级。

## 先做的准备

我比较建议先做三件事：

1. 把当前项目能跑通的基线先固定住
2. 先列出所有构建时依赖和运行时依赖
3. 先确认有没有 webpack 专属写法

比如这些地方都要先扫一遍：

- `process.env`
- `require.context`
- 别名配置
- 静态资源引用路径
- Less / Sass 全局变量注入
- devServer 代理

## 最常见的问题一：环境变量失效

在 `vue-cli` 里我们常写：

```ts
const apiBase = process.env.VUE_APP_API_BASE
```

到了 Vite 里，这一套要改成 `import.meta.env`，而且变量前缀也要改成 `VITE_`。

```ts
const apiBase = import.meta.env.VITE_API_BASE
```

### 解决办法

- 把 `VUE_APP_*` 全部迁移成 `VITE_*`
- 把 `process.env.xxx` 改成 `import.meta.env.xxx`
- 顺手检查有没有把变量暴露给浏览器端的风险

这一步很机械，但必须全量扫，不然运行时会出现一堆 `undefined`。

## 最常见的问题二：路径别名不一致

很多老项目里有这种写法：

```ts
import request from "@/utils/request"
```

如果 `vite.config.ts` 里没把 `@` 对齐，TypeScript、编辑器和运行时就会出现“有的地方认、有的地方不认”的问题。

### 解决办法

在 `vite.config.ts` 和 `tsconfig.json` 里都把别名配齐。

```ts
resolve: {
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
}
```

同时确认 `tsconfig` 里也有对应的 `paths`。

## 最常见的问题三：静态资源引用方式变了

一些在 webpack 下能工作的资源引用，到了 Vite 下会出现路径不对或者构建后找不到的问题。

尤其是这些场景要小心：

- CSS 里的背景图
- 动态拼接图片路径
- 直接写死 `/static/...`

### 解决办法

如果是模块内资源，尽量走 ESM 导入或 `new URL(..., import.meta.url)` 这种明确方式。

```ts
const iconUrl = new URL("../assets/icon.png", import.meta.url).href
```

如果是纯 public 资源，就统一放到 `public/`，不要混着来。

## 最常见的问题四：第三方依赖兼容性

有些老依赖默认假设自己运行在 webpack 环境里，迁到 Vite 后会出现：

- CommonJS / ESM 混用问题
- Node 内置模块找不到
- `this` 指向或默认导出行为不一致

### 解决办法

这类问题不要急着在 Vite 里硬补兼容，先分清两类：

- 只是导入方式不对，可以改写法
- 依赖本身太老，应该替换

如果一个依赖已经明显停更，而且全靠 bundler 魔法撑着，通常不值得继续保。

## 最常见的问题五：样式配置迁移不完整

`vue-cli` 里常见的全局样式注入、Less 变量、Sass mixin，在 Vite 里也能做，但配置位置和方式不一样。

### 解决办法

把原来 `vue.config.js` 里和样式相关的配置逐项搬到 Vite 的 `css.preprocessorOptions`。不要只迁“能跑起来”的最小配置，要把全局变量和预处理器行为一次对齐。

## 最常见的问题六：代理和本地开发习惯失效

原来 `devServer.proxy` 配好的接口代理，迁过来如果没同步，前端本地联调会立刻出问题。

### 解决办法

把代理配置迁到 `server.proxy`，并且顺手验证：

- 登录接口
- 上传接口
- 带 cookie 的接口
- WebSocket 是否正常

不要只测首页能不能打开。

## 迁移时我更在意什么

我更建议把迁移目标定成下面这四项，而不是“尽快切到 Vite”：

- 本地开发行为和旧项目一致
- 生产构建结果可控
- 环境变量和静态资源全部对齐
- 团队后续能继续维护

也就是说，迁移完成的标准不该只是“能跑”，而是“之后不用反复救火”。

## 结论

`vue-cli` 迁到 Vite 最常见的问题，不在 Vite 本身，而在项目长期依赖 webpack 语义形成的隐性约束。

真正有用的迁移方式是：

- 先把问题分类
- 能对齐的对齐
- 太旧的依赖该换就换

另外，迁移这类工程化工作时，什么时候切一笔干净的提交也很关键，这一点可以参考 [[when-to-commit]]。

- 不要把所有兼容性补丁都堆进配置文件里

如果迁完之后本地更快、配置更清楚、依赖更现代，那这次迁移才算真正值回票价。
