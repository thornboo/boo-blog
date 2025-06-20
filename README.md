thornboo`s blog

这里是 thornboo 博客的源码站，本项目是基于 [quartz-blog](https://github.com/iceprosurface/quartz-blog) 模板进行修改的。


# 使用说明

1. Get Started

拉取仓库并初始化Quartz

```bash
git clone https://github.com/jackyzha0/quartz.git
cd quartz
npm i
cd ..
npx quartz create
```

2. Writing Content

将你的创作内容放入 content 目录中

3. Build and Preview

构建并预览你的Quartz

```bash
npx quartz build --serve
```

# 支持的 Frontmatter 字段

| 字段名 | 描述 | 类型 | 默认值 | 定义位置 |
|-------|------|------|--------|---------|
| title | 文档标题 | string | 文件名 | frontmatter.ts |
| tags / tag | 标签 | string[] | 无 | frontmatter.ts |
| aliases / alias | 别名 | string[] | 无 | frontmatter.ts |
| cssclasses / cssclass | CSS类名 | string[] | 无 | frontmatter.ts |
| description | 描述 | string | 无 | description.ts |
| publish | 是否发布 | boolean | false | explicit.ts |
| draft | 是否为草稿 | boolean | false | draft.ts |
| date | 创建日期 | Date | 无 | lastmod.ts |
| lastmod / updated / last-modified | 最后修改日期 | Date | 无 | lastmod.ts |
| publishDate | 发布日期 | Date | 无 | lastmod.ts |
| enableToc | 是否启用目录 | boolean | true | toc.ts |
| lang | 语言 | string | 配置的locale | renderPage.tsx |
| ccby | 是否显示CC BY版权声明 | boolean | true | Content.tsx |
| comments | 是否启用评论 | boolean | false | Content.tsx |
| origin-link | 原文链接 | string | 无 | Content.tsx |
| origin-author | 原文作者 | string | 无 | Content.tsx |
| origin-license | 原文版权 | string | 无 | Content.tsx |
| origin-note | 修改说明 | string | 无 | Content.tsx |
| excalidraw-plugin | 是否为Excalidraw绘图 | boolean | false | Content.tsx |
| no-rss | 是否在RSS中排除 | boolean | false | contentIndex.ts |
| permalink | 永久链接 | string | 无 | 多个文件 |
