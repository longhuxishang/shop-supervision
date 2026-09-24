import type { FactItem } from "@/types/site";

interface FactsProps {
  items: FactItem[];
}

export function Facts({ items }: FactsProps) {
  return (
    <section className="facts" aria-label="关键数字">
      <div className="facts-grid">
        {items.map((f) => (
          <article key={f.label} className="fact-item reveal">
            <div className="value">
              {f.value}
              <span className="unit">{f.unit}</span>
            </div>
            <div className="label">{f.label}</div>
            <p className="note">{f.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
