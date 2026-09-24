# 龙湖熙上 · 商铺违规加建情况通报

React + TypeScript + SCSS 站点。源码仓：`longhuxishang/shop-supervision`。

线上地址：https://longhuxishang.github.io/（产物同步到 `longhuxishang/longhuxishang.github.io`）

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

## 缩略图（与 elen compress 无关）

列表/网格用 `public/assets/thumbs/`，Lightbox 详情仍用 `photos/` 原图。

```bash
npm run thumbs         # 增量：只处理新图或源图更新过的
npm run thumbs:force   # 强制全量重生成
```

`elen pub` 的 `prepublish` 会自动跑 `npm run thumbs`（增量）。

## CDN（@elenjs/cli）

环境变量（密钥不入库）：

```bash
export ELEN_CDN_ACCESS_KEY=...
export ELEN_CDN_SECRET_KEY=...
```

在 `.elencli.cjs` 的 `cdn` 段填写 `provider` / `bucket` / `region` / `domain`。

```bash
npm run cdn:compress
npm run cdn:upload:dry
npm run cdn:upload
```

构建走 CDN 时：

```bash
export VITE_CDN_BASE=https://你的CDN域名/longhuxishang
npm run build
```

## GitHub Pages

```bash
npm run build
npm run pages          # elen pages → longhuxishang/longhuxishang.github.io (main)
```

目标仓 Settings → Pages → Deploy from branch：`main` / 根目录。

`elen pub` 的 `postpublish` 会自动执行 `npm run pages`。

## 日常更新时间线

编辑 `src/data/archive.ts`，新条目插到数组最前面，`date` 用 `YYYY-MM-DD`。

## 发版

```bash
npx elen release patch
# 合并 release-v* 回主分支后
npx elen pub
```

`prepublish`：`thumbs` → `cdn:compress` → `build`  
`postpublish`：`pages`（同步 dist）
