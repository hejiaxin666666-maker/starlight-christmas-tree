# 制作星钻圣诞树

先按 [README](README.md) 启动本地页面。下面的函数都在 [index.html](index.html) 中，可以直接搜索名称。

## 1. 搭建场景和旋转

从 `bootstrap()` 进入，`initThree()` 创建场景、相机和渲染器，再用 `EffectComposer` 和 `UnrealBloomPass` 添加辉光。`animate()` 每帧更新 `STATE.rotY`，`setupCanvasInteraction()` 把水平拖动加进同一个角度。先验证拖动和松手后的连续旋转，再调装饰。

## 2. 用分层半径生成树身

在 `createSilverCanvasTree()` 中，`radiusAt(y)` 给出任一高度的树身半宽。调各层的外扩和收边，做出裙摆轮廓。`treePoint()` 按树形采样碎光点，密集底尘预绘在单独的画布上，亮点再按时间闪烁。调视觉时分别调整半径、亮粒大小和闪烁透明度，便于观察每项变化。

`createDiamondStarlightTree()` 另外创建 Three.js 粒子层，给每个点保存树形和散开形态的位置，由着色器插值。Canvas 树主体通过 `THREE.CanvasTexture` 放进场景。

## 3. 给五星绕银线

从 `starOutline` 看五个外尖点和内凹点，接着看构建 `wireTones` 的循环。银丝沿五条星臂生成并按亮度分组。`drawStar(angle)` 将线段投影到画布，用不同线宽和透明度描边。正面确认五尖轮廓后，再转到侧面看线束是否有厚度。

## 4. 画螺旋灯带和跑光

`ribbonTurns(t)` 计算各圈的位置和移动。`curve()` 用控制点绘制贝塞尔线，`drawRibbonRear()` 画较暗的背面连接，`drawRibbonFront()` 叠加正面亮线。`ribbonGlints` 给出沿带移动的亮点。可以分别改弧线控制点、线宽和透明度，以及亮点随时间移动的速度。

## 5. 做本机照片和纸页翻动

`handlePhotoFiles()` 读取选中的照片，经 `savePhotoToDB()` 写入 IndexedDB。`loadPhotosFromDB()` 在刷新后恢复。`buildSpreadHTML()` 将照片排成左右跨页，`renderPaperAlbum()` 显示当前页并准备邻页。

`bindPaperSwipe()` 把触摸位移转为纸页的 `rotateY()` 角度。用当前页和邻页组合出双面纸页，让它绕书脊转。拖动开始时读一次纸宽，后续每个动画帧只用最新触点。移动达到 45 CSS 像素且有下一页时完成翻页，短滑回弹。手机打开相册时，后台场景沿用上一帧，关闭后恢复实时绘制。

## 6. 加入音乐和手势

`MELODY` 和 `BASS` 提供默认音乐的频率序列，`prepareBackgroundMusic()` 会读取浏览器里的自选音乐。部分手机要求先点按页面才能播放音频。

`HANDS_CDN` 指向 MediaPipe Hands，开启相机后由 `predictWebcam()` 处理画面。相册打开时暂停手势控制，浏览期间使用直接触屏输入。

## 完成后自测

1. 左右拖树，松手后观察是否继续转动。
2. 加三张测试照片并刷新，确认相册仍显示这些照片。用无痕窗口打开同一地址，确认相册独立。
3. 在手机尺寸左右滑动翻页，再短滑确认回弹，点图确认可以放大。
4. 暂停和恢复音乐，关掉相册后观察树是否继续实时旋转。
