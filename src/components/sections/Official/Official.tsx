import type { ComplaintItem } from "@/types/site";
import { SectionHead } from "@/components/media/SectionHead";

interface OfficialProps {
  complaints: ComplaintItem[];
  closing: string;
}

export function Official({ complaints, closing }: OfficialProps) {
  return (
    <section className="section" id="official">
      <div className="section-inner">
        <SectionHead title="联系与反馈" lead="可通过下列渠道依法反映。" />
        <h3 className="materials-sub">投诉渠道</h3>
        <div className="complaint-grid">
          {complaints.map((c) => (
            <div key={c.label + c.value} className="complaint-item reveal">
              <span className="complaint-label">{c.label}</span>
              {c.href ? (
                <a className="complaint-value" href={c.href}>
                  {c.value}
                </a>
              ) : (
                <span className="complaint-value">{c.value}</span>
              )}
            </div>
          ))}
        </div>
        <p className="closing-text reveal">{closing}</p>
      </div>
    </section>
  );
}
