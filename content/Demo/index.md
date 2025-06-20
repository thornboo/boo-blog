---
title: "Frontmatter字段示例文档"
date: 2023-10-15
lastmod: 2023-11-20
updated: 2023-11-25
last-modified: 2023-12-01
publishDate: 2023-10-20
tags:
  - demo
  - frontmatter
  - 示例
aliases:
  - "frontmatter示例"
  - "元数据示例"
cssclasses:
  - demo-page
  - documentation
description: "这是一个展示所有可用frontmatter字段的示例文档，可以作为创建新文章的参考模板。"
publish: true
draft: false
lang: zh-CN
enableToc: true
ccby: true
comments: true
permalink: /demo/frontmatter-example
excalidraw-plugin: false
no-rss: false
origin-link: https://example.com/original-article
origin-author: 原作者名称
origin-license: CC BY-NC-SA 4.0
origin-note: "此文档经过修改和翻译，增加了更多示例内容"
---

# Frontmatter字段示例文档

这是一个包含所有支持的frontmatter字段的示例文档。你可以将此文档作为模板，根据需要选择和修改相应的字段。

## 什么是Frontmatter？

Frontmatter是文档顶部的YAML格式元数据，用于定义文档的各种属性和行为。它位于文档开头，由三个连字符（`---`）包围。

## 基本字段

- **title**: 文档标题，如果不提供则使用文件名
- **date**: 创建日期
- **lastmod/updated/last-modified**: 最后修改日期
- **publishDate**: 发布日期
- **tags**: 文档标签，用于分类和导航
- **aliases**: 文档别名，可用于重定向
- **description**: 文档描述，用于搜索引擎优化和预览

## 显示控制字段

- **cssclasses**: 应用于文档的CSS类
- **enableToc**: 是否显示目录
- **lang**: 文档语言

## 发布控制字段

- **publish**: 是否显式发布文档
- **draft**: 是否为草稿（不发布）
- **no-rss**: 是否从RSS中排除

## 版权和来源字段

- **ccby**: 是否显示CC BY版权声明
- **comments**: 是否启用评论
- **permalink**: 永久链接
- **origin-link**: 原文链接（如果是转载）
- **origin-author**: 原文作者
- **origin-license**: 原文版权
- **origin-note**: 修改说明

## 特殊功能字段

- **excalidraw-plugin**: 是否为Excalidraw绘图

## 文档内容示例

这里是文档的正文内容。你可以使用Markdown语法来格式化文本。

### 二级标题示例

这是二级标题下的内容。

#### 三级标题示例

这是三级标题下的内容。

### 代码示例

```javascript
// 这是一段JavaScript代码
function hello() {
  console.log("Hello, world!");
}
```

### 表格示例

| 名称 | 类型 | 描述 |
|------|------|------|
| 示例1 | 文本 | 这是第一个示例 |
| 示例2 | 数字 | 这是第二个示例 |
| 示例3 | 布尔值 | 这是第三个示例 |

### 列表示例

有序列表:
1. 第一项
2. 第二项
3. 第三项

无序列表:
- 项目一
- 项目二
- 项目三

### 引用示例

> 这是一个引用示例。
> 
> 引用可以包含多个段落。

## 结语

这个示例展示了如何使用所有支持的frontmatter字段。根据你的具体需求，你可能只需要使用其中的一部分字段。
