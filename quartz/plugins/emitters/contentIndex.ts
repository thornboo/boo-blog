import { Root } from "hast"
import { GlobalConfiguration } from "../../cfg"
import { getDate } from "../../components/Date"
import { escapeHTML } from "../../util/escape"
import { FilePath, FullSlug, SimpleSlug, joinSegments, simplifySlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { toHtml } from "hast-util-to-html"
import { write } from "./helpers"
import { i18n } from "../../i18n"
import DepGraph from "../../depgraph"

export type ContentIndex = Map<FullSlug, ContentDetails>
export type ContentDetails = {
  title: string
  links: SimpleSlug[]
  tags: string[]
  content: string
  richContent?: string
  date?: Date
  description?: string
  frontmatter?: Record<string, unknown>
}

interface Options {
  enableSiteMap: boolean
  enableRSS: boolean
  rssLimit?: number
  rssFullHtml: boolean
  includeEmptyFiles: boolean
}

const defaultOptions: Options = {
  enableSiteMap: true,
  enableRSS: true,
  rssLimit: 15,
  rssFullHtml: false,
  includeEmptyFiles: true,
}

function generateSiteMap(cfg: GlobalConfiguration, idx: ContentIndex): string {
  const base = cfg.baseUrl ?? ""
  const createURLEntry = (slug: SimpleSlug, content: ContentDetails): string => `<url>
    <loc>https://${joinSegments(base, encodeURI(slug))}</loc>
    ${content.date && `<lastmod>${content.date.toISOString()}</lastmod>`}
  </url>`
  const urls = Array.from(idx)
    .map(([slug, content]) => createURLEntry(simplifySlug(slug), content))
    .join("")
  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`
}

function generateRSSFeed(cfg: GlobalConfiguration, idx: ContentIndex, limit?: number): string {
  const base = cfg.baseUrl ?? ""

  const createURLEntry = (slug: SimpleSlug, content: ContentDetails): string => {
    const permalink = content.frontmatter?.['permalink']?.toString();
    const guid = permalink ? `https://${joinSegments(base, encodeURI(permalink))}` : `https://${joinSegments(base, encodeURI(slug))}`
    return `<item>
    <title>${escapeHTML(content.title)}</title>
    <link>https://${joinSegments(base, encodeURI(slug))}</link>
    <guid>${guid}</guid>
    <description>${content.richContent ?? content.description}</description>
    <pubDate>${content.date?.toUTCString()}</pubDate>
  </item>`
  }
  const currentFull = Array.from(idx)
    .sort(([_, f1], [__, f2]) => {
      if (f1.date && f2.date) {
        return f2.date.getTime() - f1.date.getTime()
      } else if (f1.date && !f2.date) {
        return -1
      } else if (!f1.date && f2.date) {
        return 1
      }

      return f1.title.localeCompare(f2.title)
    })
    .filter(([_slug, content]) => content.frontmatter?.['permalink'])
    .filter(([_slug, content]) => !content.frontmatter?.['excalidraw-plugin'])
    .filter(([_slug, content]) => !content.frontmatter?.['no-rss'])

  const items = currentFull
    .map(([slug, content]) => createURLEntry(simplifySlug(slug), content))
    .slice(0, Math.min(limit ?? idx.size, currentFull.length))
    .join("")
  const description = `${!!limit ? i18n(cfg.locale).pages.rss.lastFewNotes({ count: limit }) : i18n(cfg.locale).pages.rss.recentNotes} on ${escapeHTML(
    cfg.pageTitle,
  )}`

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
    <channel>
      <title>${escapeHTML(cfg.pageTitle)}</title>
      <link>https://${base}</link>
      <follow_challenge>
        <feedId>52340201851637774</feedId>
        <userId>68901958086173696</userId>
      </follow_challenge>
      <description>${limit === Infinity ? `在 ${cfg.pageTitle} 上的 ${currentFull.length} 条笔记` : description}</description>
      <generator>Quartz -- quartz.jzhao.xyz</generator>
      ${items}
    </channel>
  </rss>`
}

export const ContentIndex: QuartzEmitterPlugin<Partial<Options>> = (opts) => {
  opts = { ...defaultOptions, ...opts }
  return {
    name: "ContentIndex",
    async getDependencyGraph(ctx, content, _resources) {
      const graph = new DepGraph<FilePath>()

      for (const [_tree, file] of content) {
        const sourcePath = file.data.filePath!

        graph.addEdge(
          sourcePath,
          joinSegments(ctx.argv.output, "static/contentIndex.json") as FilePath,
        )
        if (opts?.enableSiteMap) {
          graph.addEdge(sourcePath, joinSegments(ctx.argv.output, "sitemap.xml") as FilePath)
        }
        if (opts?.enableRSS) {
          graph.addEdge(sourcePath, joinSegments(ctx.argv.output, "index.xml") as FilePath)
        }
      }

      return graph
    },
    async emit(ctx, content, _resources) {
      const cfg = ctx.cfg.configuration
      const emitted: FilePath[] = []
      const linkIndex: ContentIndex = new Map()
      for (const [tree, file] of content) {
        const slug = file.data.slug!
        const date = getDate(ctx.cfg.configuration, file.data) ?? new Date()
        if (opts?.includeEmptyFiles || (file.data.text && file.data.text !== "")) {
          linkIndex.set(slug, {
            frontmatter: file.data.frontmatter,
            title: file.data.frontmatter?.title!,
            links: file.data.links ?? [],
            tags: file.data.frontmatter?.tags ?? [],
            content: file.data.text ?? "",
            richContent: opts?.rssFullHtml
              ? escapeHTML(toHtml(tree as Root, { allowDangerousHtml: true }))
              : undefined,
            date: date,
            description: file.data.description ?? "",
          })
        }
      }

      if (opts?.enableSiteMap) {
        emitted.push(
          await write({
            ctx,
            content: generateSiteMap(cfg, linkIndex),
            slug: "sitemap" as FullSlug,
            ext: ".xml",
          }),
        )
      }

      if (opts?.enableRSS) {
        (await Promise.all([
          await write({
            ctx,
            content: generateRSSFeed(cfg, linkIndex, opts.rssLimit),
            slug: "index" as FullSlug,
            ext: ".xml",
          }),
          await write({
            ctx,
            content: generateRSSFeed(cfg, linkIndex, Infinity),
            slug: "rss-full" as FullSlug,
            ext: ".xml",
          }),
        ])).map((p) => emitted.push(p))
      }

      const fp = joinSegments("static", "contentIndex") as FullSlug
      const simplifiedIndex = Object.fromEntries(
        Array.from(linkIndex).map(([slug, content]) => {
          // remove description and from content index as nothing downstream
          // actually uses it. we only keep it in the index as we need it
          // for the RSS feed
          delete content.description
          delete content.date
          delete content.richContent
          if (content.frontmatter?.['excalidraw-plugin']) {
            return [slug, { ...content, richContent: "" }]
          }
          return [slug, content]
        }),
      )

      emitted.push(
        await write({
          ctx,
          content: JSON.stringify(simplifiedIndex),
          slug: fp,
          ext: ".json",
        }),
      )

      return emitted
    },
    getQuartzComponents: () => [],
  }
}
