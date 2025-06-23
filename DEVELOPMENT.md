# 开发指南 (Development Guide)

本文档旨在为本项目的二次开发提供指导，主要介绍与 Quartz 框架相关的目录和文件。

## 核心文件

### `quartz.config.ts`

这是 Quartz 的主要配置文件。你可以在这里配置：
- **网站元数据**: 标题、基础 URL 等。
- **主题配置**: 字体、颜色、CSS 等。
- **插件系统**: 添加、删除或配置插件。

### `quartz.layout.ts`

该文件定义了网站的整体布局。它决定了页面上各个组件（如页眉、页脚、侧边栏、内容区域）的排列方式。如果你想调整页面的宏观结构，例如添加一个新的侧边栏或重新排列组件，你需要修改这个文件。

## `quartz` 目录详解

`quartz` 目录是框架的核心所在，包含了所有的功能组件、插件、样式和工具函数。

```
quartz/
├── components/   # UI 组件 (React/Preact)
├── plugins/      # 功能插件
├── processors/   # Markdown 内容处理器
├── styles/       # 全局样式文件 (CSS)
├── i18n/         # 国际化语言文件
├── util/         # 工具函数和辅助模块
├── cli/          # 命令行界面相关脚本
├── build.ts      # 构建脚本
└── worker.ts     # Web Worker 相关文件
```

### 目录功能说明

- **`components/`**: 存放所有可重用的 UI 组件，使用 `preact` (一种轻量级的 React 实现) 编写。例如，`Head.tsx`, `Footer.tsx`, `Graph.tsx` 等都在这里。如果你想修改某个特定 UI 元素的外观或行为，这通常是你需要查看的第一个地方。

- **`plugins/`**: Quartz 的功能通过插件系统进行扩展。这个目录包含了处理各种任务的插件，例如：
    - `emitters`: 生成最终产物，如 HTML 文件、RSS feed、站点地图等。
    - `filters`: 根据 frontmatter 过滤要处理的文件（例如，过滤掉草稿）。
    - `transformers`: 对 Markdown 内容进行转换（例如，添加 `lastmod` 日期、解析 frontmatter）。

- **`processors/`**: 包含与 Markdown 内容处理相关的模块。例如，解析 frontmatter、处理 wikilinks、转换 Markdown 到 HTML 等。

- **`styles/`**: 存放全局的 CSS 样式文件。这里定义了网站的基础样式、代码高亮主题等。如果你想进行全局的样式调整，可以修改这里的文件。

- **`i18n/`**: 存放国际化（i18n）的翻译文件。如果你想为博客添加新的语言支持，你需要在这里添加相应的翻译。

- **`util/`**: 包含各种工具函数和辅助模块，供框架的其他部分调用。

- **`cli/`**: 包含了驱动 `npx quartz` 命令行的所有脚本。

通过理解这些核心文件和目录的功能，你可以更轻松地对博客进行深度定制和功能扩展。