# 龙湖熙上 · 商铺违规加建情况通报

React + TypeScript + SCSS 站点。仓库：`longhuxishang/shop-supervision`。

线上地址：https://longhuxishang.github.io/shop-supervision/

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

在 `.elencli.cjs` 的 `cdn` 段填写 `provider` / `bucket` / `region` / `domain`（占位符需改成真实值）。

```bash
# 压缩 public/assets → .cdn-staging/assets（视频需本机 ffmpeg）
npm run cdn:compress

# 预览将上传的对象键
npm run cdn:upload:dry

# 上传到 CDN
npm run cdn:upload
```

构建时若资源已上 CDN，设置：

```bash
# 例：https://cdn.example.com/longhuxishang
export VITE_CDN_BASE=https://你的CDN域名/longhuxishang
npm run build
```

未设置 `VITE_CDN_BASE` 时仍使用站点相对路径（含 Vite `base`：`/shop-supervision/`）。

## 日常更新时间线

编辑 `src/data/archive.ts`，新条目插到数组最前面，`date` 用 `YYYY-MM-DD`。

## 发版

```bash
npx elen release patch
# 合并 release-v* 回主分支后
npx elen pub
```

`prepublish` 会执行 `thumbs`（增量）→ `cdn:compress` → `build`。CDN 上传需自行 `npm run cdn:upload`（或把该命令写进 hooks）。

## GitHub Pages

推送到 `main` 后由 `.github/workflows/deploy.yml` 构建并发布 `dist/`。

仓库 Settings → Pages → Source 选 **GitHub Actions**。
