# thornboo's blog

Personal blog and notes site built on top of Quartz v4.

This repository vendors the Quartz source code directly so the site can be customized at the config, layout, component, plugin, and style layers without depending on a separate upstream package.

## Project Structure

- `content/`: Markdown content for the site
- `quartz/`: vendored Quartz source code
- `quartz.config.ts`: site configuration
- `quartz.layout.ts`: page layout composition
- `public/`: generated output, ignored by git

## Local Development

Requirements:

- Node.js 22+
- pnpm

Common commands:

- `pnpm install`
- `pnpm quartz build --serve`
- `pnpm test`
- `pnpm check`

## Notes

- This repository is a customized Quartz-based site, not a clean mirror of the upstream Quartz template.
- Generated output and local caches are intentionally excluded from version control.
