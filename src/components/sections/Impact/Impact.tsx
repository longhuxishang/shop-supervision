import type { RiskItem } from "@/types/site";
import { SectionHead } from "@/components/media/SectionHead";

interface ImpactProps {
  items: RiskItem[];
}

export function Impact({ items }: ImpactProps) {
  return (
    <section className="section section-impact" id="impact">
      <div className="section-inner">
        <SectionHead
          title="五、今天不管，明天更糟"
          lead="现在不强硬，以后的烦心事不会断。商铺一旦开业，下面这些大概率会一件一件出现在楼下。"
        />
        <div className="risk-strip">
          {items.map((r) => (
            <article key={r.title} className="risk-item reveal">
              <h3>{r.title}</h3>
              {r.desc ? <p>{r.desc}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
