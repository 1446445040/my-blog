// 加载所需资源
self.importScripts('https://cdn.staticfile.org/highlight.js/9.18.1/highlight.min.js')

// 接收父进程的消息
self.onmessage = event => {
  const codes = event.data
  const results = codes.reduce((results, code) => {
    const { value } = self.hljs.highlightAuto(code)
    results.push(value)
    return results
  }, [])
  self.postMessage(results)
}
