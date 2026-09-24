import type { EvidenceItem, LightboxItem, MediaRef } from "@/types/site";

/** 构建时通过 VITE_CDN_BASE 指向 CDN 前缀（含 root，末尾无 /） */
const CDN_BASE = String(import.meta.env.VITE_CDN_BASE || "").replace(/\/$/, "");

/** Vite base，如 `/shop-supervision`（无尾 /） */
const SITE_BASE = String(import.meta.env.BASE_URL || "/").replace(/\/$/, "");

/** 将站点内相对资源路径解析为可请求的 URL */
export function assetUrl(src: string): string {
  if (!src) return src;
  if (/^https?:\/\//i.test(src) || src.startsWith("data:")) return src;
  const path = src.replace(/^\//, "");
  if (!CDN_BASE) return `${SITE_BASE}/${path}`;
  return `${CDN_BASE}/${path}`;
}

/**
 * 列表展示用缩略图路径（由 `npm run thumbs` 生成）。
 * `assets/photos/foo.jpg` → `assets/thumbs/photos/foo.webp`
 * 非 photos 路径或二维码原样返回，详情 Lightbox 请继续用原图 + assetUrl。
 */
export function thumbSrc(src: string): string {
  if (!src) return src;
  if (/^https?:\/\//i.test(src) || src.startsWith("data:")) return src;
  const normalized = src.replace(/^\//, "");
  if (!normalized.startsWith("assets/photos/")) return normalized;
  if (/(?:wechat-.*-qr|xinfang-.*-qr)/i.test(normalized)) return normalized;
  return normalized
    .replace(/^assets\/photos\//, "assets/thumbs/photos/")
    .replace(/\.(jpe?g|png|gif|webp)$/i, ".webp");
}

/** 列表用：缩略图 URL */
export function thumbUrl(src: string): string {
  return assetUrl(thumbSrc(src));
}

export function toLightboxItem(
  item: Pick<EvidenceItem | MediaRef, "kind" | "src" | "poster"> & {
    caption?: string;
    tag?: string;
  },
): LightboxItem {
  return {
    kind: item.kind || "image",
    src: assetUrl(item.src),
    poster: item.poster ? assetUrl(item.poster) : undefined,
    caption: item.caption || item.tag || "",
  };
}
