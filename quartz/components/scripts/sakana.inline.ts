import SakanaWidget from "sakana-widget"

const widgetId = "sakana-widget"
let widget: SakanaWidget | null = null
let widgetRoot: HTMLElement | null = null

function destroySakana() {
  if (widget && widgetRoot?.isConnected) {
    try {
      widget.unmount()
    } catch {
      // Quartz SPA navigation can replace the old mount node before cleanup runs.
      // Ignore stale-instance teardown failures and let the next mount recreate state.
    }
  } else if (widgetRoot) {
    widgetRoot.replaceChildren()
  }

  widget = null
  widgetRoot = null
}

function mountSakana() {
  destroySakana()

  const container = document.getElementById(widgetId)
  if (!container) return

  widget = new SakanaWidget({
    character: "takina",
    size: 150,
    controls: false,
    rod: true,
    draggable: true,
  })

  widget.mount(container)
  widgetRoot = document.getElementById(widgetId)
  window.addCleanup?.(destroySakana)
}

document.addEventListener("nav", mountSakana)
