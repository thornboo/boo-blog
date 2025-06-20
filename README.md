# thornboo's blog

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

这里是 thornboo 的个人博客源码。本项目基于 [Quartz](https://quartz.jzhao.xyz/) 搭建，并进行了一些个性化修改。

---

## 🚀 快速开始 (Quick Start)

按照以下步骤在本地运行本项目：

1.  **克隆仓库**
    ```bash
    git clone https://github.com/thornboo/boo-blog.git
    cd boo-blog
    ```

2.  **安装依赖**
    > **前置要求:** 请确保你已经安装了 [Node.js](https://nodejs.org/) (v20 or higher) 和 [npm](https://www.npmjs.com/).

    ```bash
    pnpm i
    ```

3.  **创建内容**
    将你的 Markdown 文章放入 `content` 目录下。

    ```bash
    npx quartz create
    ```
    
    > **💡 注意：** `npx quartz create` 命令仅用于**首次**初始化项目结构。它会生成必要的文件夹（如 `content`, `quartz`, `assets` 等）和配置文件。项目创建完成后，便无需再次运行此命令。

4.  **本地预览**
    ```bash
    npx quartz build --serve
    ```
    现在，你可以在浏览器中访问 `http://localhost:8080` 来预览你的博客。

---

## 🌳 目录结构 (Directory Structure)

```
.
├── content/          # 博客文章存放目录
├── public/           # 静态资源，如图片、字体等
├── quartz/           # Quartz 核心代码
├── scripts/          # 自定义脚本
├── quartz.config.ts  # Quartz 核心配置文件
├── quartz.layout.ts  # 网站布局配置文件
├── package.json      # 项目依赖与脚本
└── README.md         # 项目说明文档
```

- **`content/`**: 存放所有 Markdown 格式的博客文章。你可以根据自己的喜好在这里创建子目录来组织文章。
- **`public/`**: 用于存放所有静态资源，例如图片、字体、favicon 等。构建时，此目录下的所有文件都会被直接复制到最终的输出目录中。
- **`quartz/`**: Quartz 的核心代码，包括布局、组件、插件等。如果你想深度定制博客的外觀和功能，可以修改這裡的文件。
- **`scripts/`**: 存放一些自定义的辅助脚本。
- **`quartz.config.ts`**: Quartz 的主要配置文件。你可以在这里配置网站标题、插件、主题等。
- **`quartz.layout.ts`**: 定义网站的整体布局，例如页面头部、内容区域、左右侧边栏和页脚的组件排列。
- **`package.json`**: Node.js 项目的配置文件，用于管理项目依赖和定义 `pnpm` 脚本。

---

## ⚙️ Frontmatter 配置

Quartz 支持丰富的 `frontmatter` 字段来自定义每篇内容的元数据和行为。

| 字段名 | 描述 | 类型 | 默认值 | 定义位置 |
|---|---|---|---|---|
| `title` | 文档标题 | `string` | 文件名 | `frontmatter.ts` |
| `tags` / `tag` | 标签 | `string[]` | 无 | `frontmatter.ts` |
| `aliases` / `alias` | 别名 | `string[]` | 无 | `frontmatter.ts` |
| `cssclasses` / `cssclass` | CSS类名 | `string[]` | 无 | `frontmatter.ts` |
| `description` | 描述 | `string` | 无 | `description.ts` |
| `publish` | 是否发布 | `boolean` | `false` | `explicit.ts` |
| `draft` | 是否为草稿 | `boolean` | `false` | `draft.ts` |
| `date` | 创建日期 | `Date` | 无 | `lastmod.ts` |
| `lastmod` / `updated` / `last-modified` | 最后修改日期 | `Date` | 无 | `lastmod.ts` |
| `publishDate` | 发布日期 | `Date` | 无 | `lastmod.ts` |
| `enableToc` | 是否启用目录 | `boolean` | `true` | `toc.ts` |
| `lang` | 语言 | `string` | 配置的locale | `renderPage.tsx` |
| `ccby` | 是否显示CC BY版权声明 | `boolean` | `true` | `Content.tsx` |
| `comments` | 是否启用评论 | `boolean` | `false` | `Content.tsx` |
| `origin-link` | 原文链接 | `string` | 无 | `Content.tsx` |
| `origin-author` | 原文作者 | `string` | 无 | `Content.tsx` |
| `origin-license` | 原文版权 | `string` | 无 | `Content.tsx` |
| `origin-note` | 修改说明 | `string` | 无 | `Content.tsx` |
| `excalidraw-plugin` | 是否为Excalidraw绘图 | `boolean` | `false` | `Content.tsx` |
| `no-rss` | 是否在RSS中排除 | `boolean` | `false` | `contentIndex.ts` |
| `permalink` | 永久链接 | `string` | 无 | 多个文件 |

---

## 🤝 贡献 (Contributing)

欢迎通过提交 Pull Request 或 Issue 的方式来帮助改进本项目。

## 📄 许可证 (License)

本项目采用 [MIT License](LICENSE.txt) 授权。
