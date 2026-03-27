import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/sakana.inline"
import style from "./styles/sakana.scss"
import { classNames } from "../util/lang"

const Sakana: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return <div id="sakana-widget" class={classNames(displayClass, "sakana-widget")}></div>
}

Sakana.afterDOMLoaded = script
Sakana.css = style

export default (() => Sakana) satisfies QuartzComponentConstructor
