# 星钻圣诞树 · Starlight Christmas Tree

用 Canvas 和 Three.js 实时绘制银线五星、分层粒子树和螺旋灯带。支持拖动旋转、触屏翻页、背景音乐和可选的相机手势。

## 在本机运行

准备 Node.js 20 或以上和 Python 3，在仓库根目录运行：

```sh
npm ci
npm run build
python -m http.server 8080 --bind 127.0.0.1 --directory dist
```

打开 <http://127.0.0.1:8080/>。修改 `index.html` 后重新构建并刷新。相机手势需在控制面板开启、授予浏览器相机权限，并联网加载 MediaPipe Hands。

| 文件 | 内容 |
| --- | --- |
| [index.html](index.html) | 完整可读源码，包含样式、绘制、音乐、手势和相册 |
| [TUTORIAL.md](TUTORIAL.md) | 从树形到触屏相册的制作步骤和代码定位 |
| [build.mjs](build.mjs) | 将 Three.js 与页面打包到 `dist/index.html` |
| [package.json](package.json) / [锁文件](package-lock.json) | 构建命令和固定版本依赖 |

拖动背景可以转树，松手后继续自动旋转。可在控制面板添加自己的照片，再打开相册左右滑动。照片与自选音乐保存在当前浏览器的 IndexedDB，文案和相册偏好保存在 localStorage。示例卡片、封面和默认音乐由代码生成。相机图像在浏览器中处理。

本项目源码使用 [MIT 许可证](LICENSE)。Three.js、esbuild 和外部加载的 MediaPipe、字体按各自上游许可使用。
