import type { EvidenceItem, MediaRef } from "@/types/site";
import { assetUrl, thumbUrl } from "@/utils/media";

interface MediaThumbProps {
  item: Pick<EvidenceItem | MediaRef, "kind" | "src" | "poster"> & {
    caption?: string;
    tag?: string;
  };
  eager?: boolean;
}

/** 列表/网格缩略图；点开详情请用 toLightboxItem 原图 */
export function MediaThumb({ item, eager = false }: MediaThumbProps) {
  if (item.kind === "video") {
    if (item.poster) {
      return (
        <img
          src={thumbUrl(item.poster)}
          alt={item.caption || item.tag || "视频"}
          {...(eager ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
        />
      );
    }
    return <video src={assetUrl(item.src)} muted playsInline preload="metadata" />;
  }

  return (
    <img
      src={thumbUrl(item.src)}
      alt={item.caption || item.tag || ""}
      {...(eager ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
    />
  );
}
