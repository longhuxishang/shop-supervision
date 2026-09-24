interface SectionHeadProps {
  title: string;
  lead?: string;
  className?: string;
}

export function SectionHead({ title, lead, className = "" }: SectionHeadProps) {
  return (
    <header className={`section-head reveal ${className}`.trim()}>
      <h2>{title}</h2>
      {lead ? <p>{lead}</p> : null}
    </header>
  );
}
