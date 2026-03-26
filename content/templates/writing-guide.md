---
title: 写作指南
---

# 写作指南

这份说明放在 `content/templates/` 里，只作为本地写作参考使用，不会发布到站点。

## 当前内容结构

博客内容按“内容关系”而不是按“主题”来组织。

```text
content/
├── posts/      公开文章
├── notes/      知识笔记
├── projects/   项目笔记
├── private/    本地草稿，不发布
└── templates/  本地模板，不发布
```

### `posts/`

适合完整表达、可以独立阅读的公开文章。

当前建议分到这些子目录：

- `posts/tech/`
- `posts/essays/`
- `posts/life/`

### `notes/`

适合知识沉淀、概念整理、持续补充的笔记条目。

当前建议分到这些子目录：

- `notes/frontend/`
- `notes/engineering/`
- `notes/ai/`
- `notes/product/`
- `notes/workflow/`

### `projects/`

适合围绕同一个项目持续增长的一组笔记。

例子：

- `projects/openclaw/`

### `private/`

适合临时草稿、半成品、提纲和暂不公开的内容。

这个目录已经在 Quartz 配置里忽略，不会生成到站点。

推荐用法：

- 没想好放 `posts / notes / projects` 哪个目录，先放这里
- 只是想快速记下来，先不整理，先放这里
- 明确不想公开的个人记录，也先放这里

这个目录也统一用 `index.md` 做说明页，不再混用 `README.md`。

等你想清楚后，再移动到公开目录，并补完整 frontmatter。

## 新建文件时怎么选

- 想写一篇完整文章：复制 `post-template.md`
- 想记一条知识笔记：复制 `note-template.md`
- 想记录一个项目笔记：复制 `project-template.md`
- 只是临时草稿：直接在 `content/private/` 新建文件

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
- `market-research.md`

不建议：

- `README.md`
- `note.md`
- `new-note.md`
- `未命名.md`

## Frontmatter 统一约定

### 文章 `posts/*`

推荐模板：

```yaml
---
title: Vue 实现重置 ref 状态的方法
description: 在 Vue 里管理局部状态时，怎样安全地把 ref 重置回初始值。
date: 2026-03-29
updated: 2026-03-29
draft: false
tags:
  - vue
  - frontend
  - state-management
aliases: []
cssclasses: []
socialImage: ""
comments: true
enableToc: true
---
```

### 笔记 `notes/*`

推荐模板：

```yaml
---
title: VSCode 博客写作环境说明
description: 记录本地写博客时用到的目录结构、预览方式和基本约定。
date: 2026-03-29
updated: 2026-03-29
draft: false
tags:
  - workflow
  - blog
aliases: []
cssclasses: []
comments: false
enableToc: true
---
```

### 项目笔记 `projects/*`

推荐模板：

```yaml
---
title: openclaw 定位思考
description: 围绕 openclaw 项目当前定位、目标用户和核心问题的阶段性判断。
date: 2026-03-29
updated: 2026-03-29
draft: false
tags:
  - openclaw
  - product
  - strategy
aliases: []
cssclasses: []
socialImage: ""
comments: true
enableToc: true
---
```

## 字段说明

当前最常用的一组字段可以直接记成：`title / description / date / updated / draft / tags`。

- `title`
  页面标题，直接写成最终展示标题
- `description`
  页面摘要，建议 1 句话说明主题和价值
- `date`
  首次创建日期，统一使用 `YYYY-MM-DD`
- `updated`
  最近一次明显更新内容时再改，不是每次改错别字都必须改
- `draft`
  `true` 表示暂不发布，`false` 表示正常发布
- `tags`
  建议 2 到 4 个，优先写主题标签，统一用英文 kebab-case
- `comments`
  文章和项目笔记默认可开，知识笔记默认可关
- `aliases`
  只有在你改过路径或 slug 时再补
- `socialImage`
  只有这篇需要单独社交分享图时再写
- `cssclasses`
  一般先不写，只有特殊样式需求再用
- `enableToc`
  默认写 `true`，长文和知识笔记通常都值得保留目录

## 日期怎么维护

- 站点当前配置使用的是 `modified` 作为默认展示日期，所以列表页和文章页优先显示 `updated`
- `date` 用来表示首次创建或首次发布的时间
- `updated` 用来表示一次有意义的内容更新，不需要为每个错别字都改
- 如果你没有填写 `updated`，Quartz 会回退到 `date`

## 标签怎么用

建议优先用主题标签，而不是栏目标签；并且统一用英文 kebab-case，避免同义标签越积越乱。

比较好的写法：

- `vue`
- `vite`
- `engineering`
- `blog`
- `workflow`
- `openclaw`

不太建议每篇都机械加：

- `posts`
- `notes`
- `projects`

因为目录本身已经表达了这层信息。

如果你想保留中文阅读体验，可以把中文写在标题里，把标签保持英文规范化。

## 一套最省事的写作流程

1. 先判断内容属于 `posts / notes / projects / private` 哪一类
2. 进入对应子目录
3. 复制模板或新建 Markdown 文件
4. 先写 `title / description / date / updated / draft / tags`
5. 正文写完后，本地预览
6. 确认没问题再把 `draft` 改成 `false`
7. 提交并推送

## 改文件名时要注意什么

如果文章已经发布过，再改文件名或目录位置时，建议在 frontmatter 里补 `aliases`，把旧地址留住。

例子：

```yaml
aliases:
  - posts/vue-reset-ref-state
```

这样旧链接还能跳转到新页面，不会直接失效。
