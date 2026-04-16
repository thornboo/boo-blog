# thornboo's blog

[简体中文 README](README.zh-CN.md)

A personal blog, notes garden, and customized Quartz v4 site.

This repo vendors the Quartz source directly instead of depending on it as a separate upstream package. That keeps layout tweaks, plugin changes, component customizations, style experiments, and content workflows in one place, which makes deeper changes much easier to reason about and maintain.

## What this repo is

- A personal site powered by Quartz v4.
- A Markdown-first knowledge base with posts, notes, and topic pages.
- A customized Quartz codebase, not a vanilla starter template.
- A place where content and site behavior evolve together instead of filing paperwork with an upstream package.

## Highlights

- `content/` stores the actual writing, notes, topic pages, and templates.
- `quartz/` contains the vendored Quartz source for direct customization.
- `quartz.config.ts` defines site metadata, theme, locale, analytics, plugins, and build behavior.
- `quartz.layout.ts` wires together the page layout, sidebar tools, graph, explorer, backlinks, and footer links.
- The site runs in `zh-CN`, ships RSS and sitemap generation, supports KaTeX, SPA navigation, popovers, search, graph view, and custom OG images.
- The layout also includes a small `Sakana` component, because not every interface detail needs to be aggressively serious.

## Project structure

```text
.
├── content/            # Markdown content, indexes, templates
├── public/             # Generated site output
├── quartz/             # Vendored Quartz source code
├── quartz.config.ts    # Site config and plugin pipeline
├── quartz.layout.ts    # Layout composition
├── package.json        # Scripts and project metadata
└── LICENSE.txt         # MIT license
```

## Local development

### Requirements

- Node.js `22+`
- `pnpm`

### Install dependencies

```bash
pnpm install
```

### Start a local dev build

```bash
pnpm quartz build --serve
```

Quartz will build the site and start a local server for previewing changes in the browser.

### Useful commands

```bash
pnpm quartz build        # one-off production-style build
pnpm quartz build --serve
pnpm test                # test suite via tsx --test
pnpm check               # typecheck + prettier check + markdownlint
pnpm format              # prettier write + markdownlint fix for content
pnpm profile             # build profiling with 0x
```

## Customization map

If you want to tweak things without reading the whole repo first, this is the fast lane:

- Site identity, theme, locale, analytics, plugins: `quartz.config.ts`
- Shared and page layouts: `quartz.layout.ts`
- Custom styles: `quartz/styles/custom.scss`
- Components and page UI: `quartz/components/`
- Markdown content: `content/`
- Static assets and generated output: `public/`

## Content conventions

The content tree is organized around a few main areas:

- `content/posts/` for more blog-like writing
- `content/notes/` for notes and knowledge-garden entries
- `content/topics/` for curated topic hubs
- `content/templates/` for reusable content templates
- `content/about.md`, `content/now.md`, and `content/archive.md` for core site pages

Ignored content patterns are configured in `quartz.config.ts`, including private notes and templates that should not ship to the public site.

## Deployment notes

- `vercel.json` is present, so Vercel is an obvious deployment path.
- `Dockerfile` is available if you prefer running the site in a containerized environment.
- `public/` is generated output and should be treated as build artifact territory.

## Why vendor Quartz?

Using the upstream package is often the simplest path, but vendoring the source is more practical when you want direct control over internals without adding another layer between the site and its implementation.

Vendoring Quartz here makes it easier to:

- patch components directly
- adjust the plugin pipeline
- customize layout behavior deeply
- keep content and framework changes in one repo
- avoid tracing every non-trivial tweak through an external package boundary

## License

This project is released under the MIT license. See `LICENSE.txt`.

## Cross-language docs

- English: `README.md`
- 简体中文：`README.zh-CN.md`
