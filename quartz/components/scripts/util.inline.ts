import { ContentIndex } from "../../plugins"
import { ContentDetails } from "../../plugins/emitters/contentIndex"
import { FullSlug } from "../../util/path"

export function registerEscapeHandler(outsideContainer: HTMLElement | null, cb: () => void) {
  if (!outsideContainer) return
  function click(this: HTMLElement, e: HTMLElementEventMap["click"]) {
    if (e.target !== this) return
    e.preventDefault()
    cb()
  }

  function esc(e: HTMLElementEventMap["keydown"]) {
    if (!e.key.startsWith("Esc")) return
    e.preventDefault()
    cb()
  }

  outsideContainer?.addEventListener("click", click)
  window.addCleanup(() => outsideContainer?.removeEventListener("click", click))
  document.addEventListener("keydown", esc)
  window.addCleanup(() => document.removeEventListener("keydown", esc))
}

export function removeAllChildren(node: HTMLElement) {
  while (node.firstChild) {
    node.removeChild(node.firstChild)
  }
}

declare global {
  interface Window {
    scriptPromiseMap: Map<string, Promise<void>>;
  }
}
if (!window.scriptPromiseMap) {
  window.scriptPromiseMap = new Map();
}

export function loadScript(url: string, preserve = true) {
  let resolve: (value: void) => void = () => { };
  let reject: (reason?: any) => void = () => { };
  const promise = new Promise<void>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  if (!url) {
    reject?.(new Error('URL is required'));
    return promise
  }
  if (window.scriptPromiseMap.get(url) && preserve) {
    return window.scriptPromiseMap.get(url) || Promise.resolve();
  }
  const script = document.createElement('script');
  script.src = url;
  script.async = true;
  if (preserve) {
    script.setAttribute('spa-preserve', 'true');
  }
  script.onload = () => {
    resolve();
  };
  script.onerror = () => {
    reject(new Error(`Failed to load script: ${url}`));
  };
  document.head.appendChild(script);
  if (preserve) {
    window.scriptPromiseMap.set(url, promise);
  }
  return promise
}

// Excalidraw
type ExcalidrawElement = any;
type ExcalidrawProps = {
  width?: string;
  height?: string;
};
declare global {
  interface Window {
    QuartzExcalidrawPlugin: {
      mountApp(element: HTMLElement, initialData: readonly ExcalidrawElement[] | null, options: ExcalidrawProps): void
      decodeData(data: string): ExcalidrawElement[];
    };
  }
}
export function getJsByMeta(name: string) {
  const pluginPath = document.querySelector(`meta[name="${name}"]`)?.getAttribute('content');
  if (!pluginPath) {
    throw new Error('Excalidraw plugin path not found');
  }
  return pluginPath;
}
async function loadExcalidraw(element: HTMLElement) {
  const data = element.getAttribute('data-excalidraw') ?? '';
  element.removeAttribute('data-excalidraw');
  const markdown = await fetch(data).then((res) => res.text());
  window.QuartzExcalidrawPlugin.mountApp(element as HTMLElement, window.QuartzExcalidrawPlugin.decodeData(markdown), {});
}
export async function initExcalidraw() {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 100);
  })
  const hasExcalidraw = document.querySelector('[data-excalidraw]');
  if (!hasExcalidraw) {
    return;
  }
  const pluginPath = getJsByMeta('excalidraw-plugin');
  await loadScript(pluginPath, false);
  const elements = document.querySelectorAll('[data-excalidraw]');
  if (!elements || !elements.length) {
    return;
  }
  elements.forEach((element) => {
    loadExcalidraw(element as HTMLElement);
  });
}

declare global {
  interface Window {
    FetchData: Record<string, ContentDetails> | null;
  }
}
window.FetchData = null
export async function fetchData(): Promise<Record<string, ContentDetails>> {
  if (window.FetchData) {
    return window.FetchData;
  }
  const url = document.querySelector('meta[name="contentIndex"]')?.getAttribute('content')!;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  const data: Record<string, ContentDetails> = await res.json();
  window.FetchData = data;
  return data;
}