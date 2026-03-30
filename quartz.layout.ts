import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/thornboo",
      Email: "mailto:zhaozhuang1210@gmail.com",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      title: "目录",
      folderClickBehavior: "link",
      sortFn: (a, b) => {
        const order = {
          notes: 0,
          posts: 1,
          topics: 2,
          tags: 3,
          archive: 4,
          now: 5,
          about: 6,
        }
        const aRank = order[a.slugSegment] ?? Number.MAX_SAFE_INTEGER
        const bRank = order[b.slugSegment] ?? Number.MAX_SAFE_INTEGER
        if (aRank !== bRank) {
          return aRank - bRank
        }
        if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
          return a.displayName.localeCompare(b.displayName, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        }
        return !a.isFolder && b.isFolder ? 1 : -1
      },
      filterFn: (node) => node.slugSegment !== "tags" || Boolean(node.data),
      mapFn: (node) => {
        if (node.slugSegment === "tags" && node.data) {
          node.isFolder = false
        }
      },
    }),
    Component.DesktopOnly(Component.Sakana()),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.ConditionalRender({
      component: Component.RecentNotes({
        title: "最新文章",
        limit: 5,
        showTags: true,
        linkToMore: false,
        filter: (page) => Boolean(page.slug?.startsWith("posts/")) && page.slug !== "posts/index",
      }),
      condition: (page) => page.fileData.slug === "index",
    }),
    Component.Explorer({
      title: "目录",
      folderClickBehavior: "link",
      sortFn: (a, b) => {
        const order = {
          notes: 0,
          posts: 1,
          topics: 2,
          tags: 3,
          archive: 4,
          now: 5,
          about: 6,
        }
        const aRank = order[a.slugSegment] ?? Number.MAX_SAFE_INTEGER
        const bRank = order[b.slugSegment] ?? Number.MAX_SAFE_INTEGER
        if (aRank !== bRank) {
          return aRank - bRank
        }
        if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
          return a.displayName.localeCompare(b.displayName, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        }
        return !a.isFolder && b.isFolder ? 1 : -1
      },
      filterFn: (node) => node.slugSegment !== "tags" || Boolean(node.data),
      mapFn: (node) => {
        if (node.slugSegment === "tags" && node.data) {
          node.isFolder = false
        }
      },
    }),
    Component.DesktopOnly(Component.Sakana()),
  ],
  right: [],
}
