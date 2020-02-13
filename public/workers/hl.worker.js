// 加载所需资源
self.importScripts('https://cdn.staticfile.org/highlight.js/9.18.1/highlight.min.js')

// 将任务分配给子worker
function handleCode (code) {
  return new Promise(resolve => {
    const worker = new Worker('/worker/hl.child.worker.js')
    worker.onmessage = event => {
      resolve(event.data)
    }
    worker.postMessage({
      hljs: self.hljs,
      code
    })
  })
}

// 接收父进程的消息
self.onmessage = event => {
  const codes = event.data
  const promises = codes.map(code => handleCode(code))
  Promise.all(promises).then(results => {
    self.postMessage(results)
  })
}
