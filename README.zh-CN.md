# thornboo's blog

[English README](README.md)

这是一个个人博客、笔记花园，以及一个基于 Quartz v4 深度定制的站点。

这个仓库直接 vendoring 了 Quartz 源码，而不是把它作为一个独立的上游包来依赖。这样做的好处是，布局调整、插件改造、组件定制、样式实验和内容工作流都放在同一个仓库里，做深度修改时更直接，也更容易维护。

## 这个仓库是什么

- 一个基于 Quartz v4 的个人站点。
- 一个以 Markdown 为核心的博客、笔记和主题页知识花园。
- 一个经过定制的 Quartz 代码仓库，不是原版 starter 模板的原样镜像。
- 一个把“内容”和“站点行为”放在一起演化的地方，不用每次都去上游包里打申请。

## 亮点

- `content/` 存放真正的内容：文章、笔记、主题页和模板。
- `quartz/` 存放 vendored 的 Quartz 源码，方便直接定制。
- `quartz.config.ts` 负责站点元信息、主题、语言、分析、插件和构建行为。
- `quartz.layout.ts` 负责页面布局编排，包括侧边栏工具、关系图、目录树、反向链接和页脚链接。
- 站点当前使用 `zh-CN`，并启用了 RSS、sitemap、KaTeX、SPA 导航、popover、搜索、关系图和自定义 OG 图片。
- 布局里还放了一个 `Sakana` 组件，算是一点不过分的轻松点缀。

## 项目结构

```text
.
├── content/            # Markdown 内容、索引页、模板
├── public/             # 生成后的静态站点输出
├── quartz/             # vendored Quartz 源码
├── quartz.config.ts    # 站点配置与插件流水线
├── quartz.layout.ts    # 页面布局组合
├── package.json        # 脚本与项目元信息
└── LICENSE.txt         # MIT 开源协议
```

## 本地开发

### 环境要求

- Node.js `22+`
- `pnpm`

### 安装依赖

```bash
pnpm install
```

### 启动本地开发构建

```bash
pnpm quartz build --serve
```

这个命令会构建站点并启动本地服务，方便你直接在浏览器里预览修改效果。

### 常用命令

```bash
pnpm quartz build        # 单次生产风格构建
pnpm quartz build --serve
pnpm test                # 使用 tsx --test 跑测试
pnpm check               # typecheck + prettier 检查 + markdownlint
pnpm format              # prettier 写回 + markdownlint 修复内容
pnpm profile             # 用 0x 做构建性能分析
```

## 定制入口速查

如果你想改东西，但不想先把整个仓库都读一遍，可以从这里开始：

- 站点身份、主题、语言、分析、插件：`quartz.config.ts`
- 共享布局和页面布局：`quartz.layout.ts`
- 自定义样式：`quartz/styles/custom.scss`
- 组件和页面 UI：`quartz/components/`
- Markdown 内容：`content/`
- 静态资源与生成产物：`public/`

## 内容组织约定

内容目录主要分成这几类：

- `content/posts/`：更偏博客文章的内容
- `content/notes/`：笔记和知识花园条目
- `content/topics/`：主题聚合页
- `content/templates/`：可复用的内容模板
- `content/about.md`、`content/now.md`、`content/archive.md`：站点核心页面

`quartz.config.ts` 里还配置了忽略规则，比如私有内容和模板内容不会直接发布到公开站点。

## 部署说明

- 仓库中有 `vercel.json`，所以直接部署到 Vercel 很顺手。
- 也有 `Dockerfile`，如果你更偏好容器化环境，也可以直接走容器方案。
- `public/` 是生成产物，应该按构建输出看待。

## 为什么直接 vendoring Quartz？

因为“直接用上游包”很多时候确实是好建议，但如果你需要更深的控制能力、更低的内部修改成本，以及更直接的问题定位路径，把源码放进仓库里会更合适。

这样做的好处包括：

- 可以直接修改组件
- 可以深度调整插件流水线
- 可以按需重塑布局行为
- 可以把内容和框架定制统一放在一个仓库里维护
- 可以减少复杂改动时跨外部依赖边界排查的成本

## 开源协议

本项目使用 MIT 协议，详见 `LICENSE.txt`。

## 文档语言切换

- English: `README.md`
- 简体中文：`README.zh-CN.md`
