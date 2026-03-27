import fs from "fs"
import path from "path"
import { QuartzEmitterPlugin } from "../types"

// Keep Sakana's vendor CSS sourced from the installed package so style and
// runtime stay on the same version after dependency upgrades.
export const SakanaResources: QuartzEmitterPlugin = () => {
  return {
    name: "SakanaResources",
    async *emit() {},
    async *partialEmit() {},
    externalResources() {
      const cssPath = path.join(process.cwd(), "node_modules/sakana-widget/lib/index.css")
      const css = fs.readFileSync(cssPath, "utf8")

      return {
        css: [
          {
            content: css,
            inline: true,
          },
        ],
      }
    },
  }
}
