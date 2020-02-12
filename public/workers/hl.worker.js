self.onmessage = event => {
  self.importScripts('http://cdn.staticfile.org/highlight.js/9.18.1/highlight.min.js')
  const result = self.hljs.highlightAuto(event.data)
  self.postMessage(result.value)
}
