---
title: Writing Guide
---

# Writing Guide

这份说明放在 `content/templates/` 里，只作为本地写作参考使用，不会发布到站点。

## 目录约定

- `content/posts/`
  放正式发布的文章，适合完整表达一个主题
- `content/notes/`
  放阶段性笔记、备忘、摘录和没必要写成长文的内容
- `content/projects/`
  放项目记录、阶段更新、设计思路和复盘
- `content/templates/`
  放模板和写作辅助文件，不发布

## 新建文件时怎么选

- 想写一篇正式文章：复制 `post-template.md`
- 想快速记一条短内容：复制 `note-template.md`
- 想记录一个项目：复制 `project-template.md`

## 文件命名规则

- 栏目页固定使用 `index.md`
- 正文文件默认使用英文 kebab-case 命名
- 文件名尽量短，并且和主题保持对应关系
- 不要在文件名里使用 `?`、`#`、`%`、`&` 这类特殊符号
- 推荐只使用小写字母、数字和连字符 `-`

推荐例子：

- `vue-reset-ref-state.md`
- `when-to-commit.md`
- `vscode-blog-writing-setup.md`

## Frontmatter 怎么写

通常至少写这些字段：

```yaml
---
title: Vue 实现重置 ref 状态的方法
description: 在 Vue 里管理局部状态时，怎样安全地把 ref 重置回初始值。
date: 2026-03-29
draft: false
tags:
  - Vue
  - 前端
comments: true
---
```

### 字段说明

- `title`
  页面标题，建议直接写成最终展示标题
- `description`
  页面摘要，会影响列表页和 SEO 描述，建议 1 句话写清主题
- `date`
  建议统一用 `YYYY-MM-DD`
- `draft`
  `true` 表示暂不发布，`false` 表示正常发布
- `tags`
  用来做主题聚合，建议 2 到 4 个，不要太多
- `comments`
  是否允许评论；如果这篇只是备忘，可以设成 `false`
- `aliases`
  只有在你改过文件名或 slug 时再补，不是每篇都必须写
- `socialImage`
  只有这篇需要单独社交分享图时再写
- `cssclasses`
  一般先不写，只有特殊样式需求再用

## 标签怎么用

建议优先用主题标签，而不是栏目标签。

比较好的写法：

- `Vue`
- `Vite`
- `工程化`
- `博客`
- `工作流`

不太建议每篇都机械加：

- `文章`
- `笔记`
- `项目`

因为栏目本身已经表达了这层信息。

## 什么时候用文章，什么时候用笔记

可以用这个简单标准：

- 能完整讲清一个问题，并且值得长期保留：放 `posts`
- 只是先记下来，后面可能继续整理：放 `notes`
- 明确围绕某个项目展开：放 `projects`

## 一套最省事的写作流程

1. 先决定内容放 `posts / notes / projects` 哪个目录
2. 复制对应模板，新建 Markdown 文件
3. 先写 `title / description / date / draft / tags`
4. 正文写完后，本地预览
5. 确认没问题再把 `draft` 改成 `false`
6. 提交并推送

## 改文件名时要注意什么

如果文章已经发布过，再改文件名时，建议在 frontmatter 里补 `aliases`，把旧地址留住。

例子：

```yaml
aliases:
  - posts/vue-reset-ref-state
```

这样旧链接还能跳转到新页面，不会直接失效。
