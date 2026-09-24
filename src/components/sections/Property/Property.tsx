import type { PropertyItem } from "@/types/site";
import { SectionHead } from "@/components/media/SectionHead";

interface PropertyProps {
  items: PropertyItem[];
  questions: string[];
}

export function Property({ items, questions }: PropertyProps) {
  return (
    <section className="section" id="property">
      <div className="section-inner">
        <SectionHead
          title="六、这次要说清楚"
          lead="物业的三副面孔：谁声音大，就听谁的。"
        />
        <div className="property-list">
          {items.map((p, i) => (
            <article key={p.title} className="property-item reveal">
              <span className="property-num">{i + 1}</span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </article>
          ))}
        </div>
        <ol className="property-questions">
          <li className="property-q-label">三个问题，请物业正面回答：</li>
          {questions.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
