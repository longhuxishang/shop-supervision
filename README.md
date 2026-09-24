# 龙湖熙上 · 商铺违规加建情况通报

React + TypeScript + SCSS 站点。源码仓：`longhuxishang/shop-supervision`。

线上地址：https://longhuxishang.github.io/（产物同步到 `longhuxishang/longhuxishang.github.io`）

图片/视频等静态资源当前走 **GitHub Pages 本站路径**（`/assets/...`），便于微信内打开。

## 开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build    # 输出到 dist/
npm run preview
```

构建时请勿设置 `VITE_CDN_BASE`（否则资源会指向 CDN）。

## 缩略图（与 elen compress 无关）

列表/网格用 `public/assets/thumbs/`，Lightbox 详情仍用 `photos/` 原图。

```bash
npm run thumbs         # 增量：只处理新图或源图更新过的
npm run thumbs:force   # 强制全量重生成
```

`elen pub` 的 `prepublish` 会自动跑 `npm run thumbs`（增量）。

## GitHub Pages

```bash
npm run build
npm run pages          # elen pages → longhuxishang/longhuxishang.github.io (main)
```

目标仓 Settings → Pages → Deploy from branch：`main` / 根目录。

`elen pub` 的 `postpublish` 会执行 `npm run pages`。

## CDN（可选，默认不启用）

脚本仍保留，需要时手动执行。微信对七牛测试域名常拦截，正式使用请绑定自有 HTTPS 域名，并设置：

```bash
export VITE_CDN_BASE=https://你的CDN域名/longhuxishang
npm run cdn:compress && npm run cdn:upload && npm run build && npm run pages
```

## 日常更新时间线

编辑 `src/data/archive.ts`，新条目插到数组最前面，`date` 用 `YYYY-MM-DD`。

## 发版

默认分支为 **`master`**。版本：`0.1.1`。

```bash
npx elen release patch
# 合并 release-v* 回 master 后
npx elen pub
```

`prepublish`：`thumbs` → `build`  
`postpublish`：`pages`（同步 dist 到 longhuxishang.github.io）
