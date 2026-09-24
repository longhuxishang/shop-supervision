import type { DrawingData } from "@/types/site";
import { useLightbox } from "@/context/LightboxContext";
import { SectionHead } from "@/components/media/SectionHead";
import { thumbUrl, toLightboxItem } from "@/utils/media";

interface DrawingProps {
  data: DrawingData;
}

export function Drawing({ data }: DrawingProps) {
  const { open } = useLightbox();
  const item = toLightboxItem({
    kind: "image",
    src: data.src,
    caption: data.alt,
  });

  return (
    <section className="section" id="drawing" style={{ paddingTop: 0 }}>
      <div className="section-inner">
        <SectionHead title="三、图纸对照" lead="对照原规划图纸：这里本该是室外。" />
        <div className="drawing-block reveal">
          <button
            type="button"
            className="drawing-frame"
            aria-label="放大规划图纸"
            onClick={() => open(0, [item])}
          >
            <img
              src={thumbUrl(data.src)}
              alt={data.alt}
              loading="lazy"
              width={800}
              height={450}
            />
          </button>
          <ul className="drawing-points">
            {data.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
