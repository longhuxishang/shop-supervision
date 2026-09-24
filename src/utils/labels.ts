/// Shared status / archive labels

export const STATUS_LABEL = {
  done: "已完成",
  active: "进行中",
  pending: "待推进",
} as const;

export const TYPE_LABEL = {
  photo: "邻居拍照",
  video: "现场视频",
  notice: "整改公示",
  update: "进展更新",
} as const;

export function formatDate(iso: string): string {
  if (!iso) return "";
  const parts = iso.split("-");
  if (parts.length === 2) return `${parts[0]}.${parts[1]}`;
  if (parts.length >= 3) return `${parts[0]}.${parts[1]}.${parts[2]}`;
  return iso;
}
