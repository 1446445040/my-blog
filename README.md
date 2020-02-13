# 展示型个人博客
看不少大佬都有自己的博客网站，我也有点心动了。虽然我不是大佬，但也在朝着这个方向努力。
为了能有一个自己的主页，能在介绍自己的时候跳转过去装装逼啥的（咳咳其实这是次要的...）。

总之呢，这是一个展示型的简约博客，也可以说是个人主页，不是那种登陆注册一堆的系统。
**只要替换掉后端数据就可以为你所用**。后端代码等完善了再放出来。

# 说明
## UI
使用[view-design（iview）](https://www.iviewui.com/docs/introduce)作为UI框架。
辗转了好多个UI框架：vue-beauty，element-ui等等最终还是选择了iview。主要还是因为，
好看又灵活，基础样式已经可以满足80%的需求了，样式容易修改。缺点是坑真的很多，比如引入方面，
我还是最终去源目录中探索了一番才正确引用，其他就不多说了，好看是真的。

## 优化
这篇文章是这个项目的优化过程：[Webpack优化实践，合理分包，为你的网页提速👆](https://juejin.im/post/5e450120f265da5749473c06)

# 快速开始
```
// 安装依赖
npm install
// 开发模式
npm run serve
// 构建生产环境代码
npm run build
// eslint规范代码
npm run lint
```

# 截图
## 文章列表界面
![文章列表](./screenshots/list.png)

## 文章界面
![文章界面](./screenshots/article.png)

## 管理界面
![管理界面](./screenshots/admin.png)

