import { useMemo } from "react";
import type { EvidenceItem, LightboxItem } from "@/types/site";
import { useLightbox } from "@/context/LightboxContext";
import { MediaThumb } from "@/components/media/MediaThumb";
import { SectionHead } from "@/components/media/SectionHead";
import { thumbUrl, toLightboxItem } from "@/utils/media";

interface EvidenceProps {
  items: EvidenceItem[];
}

const COMPARE_SRC = [
  {
    kind: "image" as const,
    src: "assets/photos/gate-original-web.jpg",
    caption: "原大门形象",
  },
  {
    kind: "image" as const,
    src: "assets/photos/entrance-pharmacy-web.jpg",
    caption: "现状：问题商铺装修",
  },
];

export function Evidence({ items }: EvidenceProps) {
  const { open } = useLightbox();
  const lightboxItems = useMemo(() => items.map(toLightboxItem), [items]);
  const compareItems: LightboxItem[] = useMemo(
    () => COMPARE_SRC.map((item) => toLightboxItem(item)),
    [],
  );
  const [main, ...rest] = items;

  return (
    <section className="section" id="evidence">
      <div className="section-inner">
        <SectionHead
          title="一、先看现场"
          lead="原本是露天的地方，现在盖成了商铺。面宽 5.05 米 → 近 9 米，占的全是业主共有空间。"
        />

        <div className="compare-block reveal" aria-label="正门原貌与现状对比">
          <figure className="compare-pane">
            <button
              type="button"
              className="compare-media"
              aria-label="放大原大门形象"
              onClick={() => open(0, compareItems)}
            >
              <img
                src={thumbUrl(COMPARE_SRC[0]!.src)}
                alt="龙湖熙上原大门形象"
                loading="lazy"
                width={800}
                height={500}
              />
            </button>
            <figcaption>
              <span className="compare-tag">原貌</span>
              <strong>原大门形象</strong>
            </figcaption>
          </figure>
          <figure className="compare-pane">
            <button
              type="button"
              className="compare-media"
              aria-label="放大现状照片"
              onClick={() => open(1, compareItems)}
            >
              <img
                src={thumbUrl(COMPARE_SRC[1]!.src)}
                alt="问题商铺装修现状"
                loading="lazy"
                width={800}
                height={525}
              />
            </button>
            <figcaption>
              <span className="compare-tag compare-tag-now">现状</span>
              <strong>问题商铺装修</strong>
            </figcaption>
          </figure>
        </div>

        {main ? (
          <div className="media-stage">
            <button
              type="button"
              className={`media-hero-tile${main.kind === "video" ? " is-video" : ""}`}
              aria-label="查看大图或播放"
              onClick={() => open(0, lightboxItems)}
            >
              <MediaThumb item={main} eager />
              <div className="cap">
                {main.tag ? <span className="tag">{main.tag}</span> : null}
                <div>{main.caption || ""}</div>
              </div>
            </button>
            <div className="media-grid">
              {rest.map((item, i) => (
                <button
                  key={item.src + (item.tag || i)}
                  type="button"
                  className={`media-tile${item.kind === "video" ? " is-video" : ""}`}
                  aria-label={item.tag || item.caption || "查看媒体"}
                  onClick={() => open(i + 1, lightboxItems)}
                >
                  <MediaThumb item={item} />
                  {item.tag ? <span className="tag">{item.tag}</span> : null}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
