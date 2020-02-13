self.onmessage = event => {
  const { hljs, code } = event.data
  const result = hljs.highlightAuto(code)
  self.postMessage(result.value)
}
