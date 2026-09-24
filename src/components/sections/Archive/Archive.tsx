import { useMemo, useState } from "react";
import type { ArchiveItem, LightboxItem } from "@/types/site";
import { useLightbox } from "@/context/LightboxContext";
import { MediaThumb } from "@/components/media/MediaThumb";
import { SectionHead } from "@/components/media/SectionHead";
import { useReveal } from "@/hooks/useReveal";
import { TYPE_LABEL, formatDate } from "@/utils/labels";
import { toLightboxItem } from "@/utils/media";

type Filter = "all" | "media" | "notice";

interface ArchiveProps {
  items: ArchiveItem[];
}

export function Archive({ items }: ArchiveProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const { open } = useLightbox();

  const groups = useMemo(() => {
    const filtered = items
      .filter((a) => {
        if (filter === "all") return true;
        if (filter === "media") return a.type === "photo" || a.type === "video";
        return a.type === filter;
      })
      .slice()
      .sort((a, b) => String(b.date).localeCompare(String(a.date)));

    const map = new Map<string, ArchiveItem[]>();
    const order: string[] = [];
    filtered.forEach((item) => {
      if (!map.has(item.date)) {
        map.set(item.date, []);
        order.push(item.date);
      }
      map.get(item.date)!.push(item);
    });
    return order.map((date) => ({ date, items: map.get(date)! }));
  }, [items, filter]);

  const revealRef = useReveal<HTMLDivElement>([filter, groups]);

  const emptyMsg =
    filter === "notice"
      ? "暂无整改公示。待主管部门查处结果公开后，将在此更新。"
      : "暂无记录。邻居监督拍照、视频将按日更新于此。";

  return (
    <section className="section" id="archive">
      <div className="section-inner">
        <SectionHead
          title="监督时间线"
          lead="后续每日邻居监督拍照、视频与整改公示，按日整理在册。"
        />
        <div className="archive-filters" role="tablist" aria-label="筛选类型">
          {(
            [
              ["all", "全部"],
              ["media", "拍照／视频"],
              ["notice", "整改公示"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={`filter-btn${filter === key ? " is-on" : ""}`}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="timeline" ref={revealRef}>
          {!groups.length ? (
            <p className="archive-empty">{emptyMsg}</p>
          ) : (
            groups.map((g) => (
              <div key={g.date} className="timeline-day">
                <div className="timeline-date">
                  <span className="timeline-dot" aria-hidden="true" />
                  <time dateTime={g.date}>{formatDate(g.date)}</time>
                </div>
                <div className="timeline-entries">
                  {g.items.map((a) => {
                    const mediaSet: LightboxItem[] = (a.media || []).map((m) =>
                      toLightboxItem({ ...m, caption: a.title }),
                    );
                    return (
                      <article key={a.id} className="timeline-entry reveal">
                        <span className="archive-type">
                          {TYPE_LABEL[a.type] || a.type}
                        </span>
                        <h3>{a.title}</h3>
                        {a.body ? <p className="body">{a.body}</p> : null}
                        {mediaSet.length ? (
                          <div className="archive-media">
                            {(a.media || []).map((m, i) => (
                              <button
                                key={`${a.id}-${m.src}`}
                                type="button"
                                className={`media-open${m.kind === "video" ? " is-video" : ""}`}
                                aria-label={m.kind === "video" ? "播放视频" : "查看图片"}
                                onClick={() => open(i, mediaSet)}
                              >
                                <MediaThumb item={m} />
                              </button>
                            ))}
                          </div>
                        ) : null}
                      </article>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
