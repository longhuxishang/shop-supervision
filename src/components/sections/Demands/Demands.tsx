import type { DemandItem } from "@/types/site";
import { SectionHead } from "@/components/media/SectionHead";

interface DemandsProps {
  items: DemandItem[];
}

export function Demands({ items }: DemandsProps) {
  return (
    <section
      className="section"
      id="demands"
      style={{ background: "rgba(20, 24, 28, 0.03)" }}
    >
      <div className="section-inner">
        <SectionHead title="七、业主要求" lead="我们要求什么。" />
        <div className="demand-list">
          {items.map((d) => (
            <div key={d.num} className="demand-row reveal">
              <div className="num">{d.num}</div>
              <div>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
