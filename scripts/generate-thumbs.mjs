/**
 * 列表缩略图生成（与 elen compress / CDN 无关）。
 *
 * 输入: public/assets/photos/**
 * 输出: public/assets/thumbs/photos/**.webp（最长边 640）
 *
 * 增量：目标已存在且 mtime ≥ 源文件时跳过；仅处理新图或源图更新。
 * 强制全量：npm run thumbs -- --force
 *
 * 用法: npm run thumbs
 * pub 时由 .elencli.cjs prepublish 自动调用。
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, "public/assets/photos");
const OUT_DIR = path.join(ROOT, "public/assets/thumbs/photos");

const MAX_EDGE = 640;
const WEBP_QUALITY = 72;

/** 二维码等不生成缩略图（列表也不会引用） */
const SKIP_RE = /(?:wechat-.*-qr|xinfang-.*-qr)/i;

const IMAGE_RE = /\.(jpe?g|png|webp|gif)$/i;

const force = process.argv.includes("--force");

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (IMAGE_RE.test(ent.name)) {
      files.push(full);
    }
  }
  return files;
}

async function isUpToDate(srcPath, outPath) {
  try {
    const [srcStat, outStat] = await Promise.all([fs.stat(srcPath), fs.stat(outPath)]);
    return outStat.mtimeMs >= srcStat.mtimeMs && outStat.size > 0;
  } catch {
    return false;
  }
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const files = await walk(SRC_DIR);
  let created = 0;
  let skippedFresh = 0;
  let skippedQr = 0;

  for (const file of files) {
    const rel = path.relative(SRC_DIR, file);
    const base = path.basename(rel, path.extname(rel));
    if (SKIP_RE.test(base)) {
      skippedQr += 1;
      continue;
    }

    const outRel = path.join(path.dirname(rel), `${base}.webp`);
    const outPath = path.join(OUT_DIR, outRel);

    if (!force && (await isUpToDate(file, outPath))) {
      skippedFresh += 1;
      continue;
    }

    await fs.mkdir(path.dirname(outPath), { recursive: true });

    // sharp 不能直接覆盖正在读的同路径时用临时文件更稳妥
    const tmpPath = `${outPath}.tmp`;
    await sharp(file)
      .rotate()
      .resize({
        width: MAX_EDGE,
        height: MAX_EDGE,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: WEBP_QUALITY })
      .toFile(tmpPath);
    await fs.rename(tmpPath, outPath);

    const stat = await fs.stat(outPath);
    console.log(`✓ ${rel} → thumbs/photos/${outRel} (${(stat.size / 1024).toFixed(1)} KB)`);
    created += 1;
  }

  console.log(
    `\nDone: ${created} created/updated, ${skippedFresh} up-to-date, ${skippedQr} skipped (QR).` +
      (force ? " [--force]" : ""),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
