import { useMemo } from "react";
import type { MaterialsData } from "@/types/site";
import { useLightbox } from "@/context/LightboxContext";
import { SectionHead } from "@/components/media/SectionHead";
import { thumbUrl, toLightboxItem } from "@/utils/media";

interface MaterialsProps {
  data: MaterialsData;
}

export function Materials({ data }: MaterialsProps) {
  const { open } = useLightbox();
  const imageSet = useMemo(
    () =>
      data.images.map((img) =>
        toLightboxItem({
          kind: "image",
          src: img.src,
          caption: img.caption || img.tag || "",
        }),
      ),
    [data.images],
  );

  return (
    <section className="section" id="materials">
      <div className="section-inner">
        <SectionHead
          title="证据材料"
          lead="官方公示、法规文件与条款摘录、规划图纸等，便于查证与转发。"
        />
        <h3 className="materials-sub">公示链接</h3>
        <div className="materials-files">
          {data.links.map((f) => (
            <a
              key={f.href}
              className="material-file"
              href={f.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>{f.title}</strong>
              <span>{f.detail} →</span>
            </a>
          ))}
        </div>
        <h3 className="materials-sub">文件</h3>
        <div className="materials-files">
          {data.files.map((f) => (
            <a
              key={f.href}
              className="material-file"
              href={f.href}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              <strong>{f.title}</strong>
              <span>{f.detail} →</span>
            </a>
          ))}
        </div>
        <h3 className="materials-sub">图片</h3>
        <div className="materials-images">
          {data.images.map((img, i) => (
            <button
              key={img.src + (img.tag || "")}
              type="button"
              className="material-image"
              aria-label={img.tag || "查看图片"}
              onClick={() => open(i, imageSet)}
            >
              <img src={thumbUrl(img.src)} alt={img.caption || ""} loading="lazy" />
              <span className="tag">{img.tag || ""}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
