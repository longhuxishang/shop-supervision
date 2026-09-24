import type { ProcessStep } from "@/types/site";
import { SectionHead } from "@/components/media/SectionHead";
import { STATUS_LABEL } from "@/utils/labels";

interface ProcessProps {
  steps: ProcessStep[];
}

export function Process({ steps }: ProcessProps) {
  return (
    <section
      className="section"
      id="process"
      style={{ background: "rgba(20, 24, 28, 0.03)" }}
    >
      <div className="section-inner">
        <SectionHead
          title="整改流程"
          lead="从取证、通报到查处与恢复原状；邻居拍照与整改公示整理在册，持续公布。"
        />
        <div className="process-track">
          {steps.map((s) => (
            <article
              key={s.id}
              className="process-step reveal"
              data-status={s.status}
            >
              <div className="process-dot" aria-hidden="true">
                {s.id}
              </div>
              <div className="process-body">
                <span className="status-chip">{STATUS_LABEL[s.status]}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
