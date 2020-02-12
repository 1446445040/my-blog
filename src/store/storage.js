// 加密本地存储

class Storage {
  constructor () { // 参数为最长过期时间
    this.storage = window.localStorage
  }

  setItem (key, value) {
    // 这里的value已经是JSON格式
    this.storage.setItem(key, this.encode(value))
  }

  getItem (key) {
    return this.decode(this.storage.getItem(key))
  }

  removeItem (key) {
    this.storage.removeItem(key)
  }

  encode (str) {
    return Buffer.from(str.toString()).toString('base64')
  }

  decode (str) {
    return Buffer.from(str, 'base64').toString()
  }
}

export default Storage
