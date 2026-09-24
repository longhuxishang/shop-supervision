interface SiteFooterProps {
  disclaimer: string;
}

export function SiteFooter({ disclaimer }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="inner">
        <p>{disclaimer}</p>
        <p>龙湖熙上 · 致全体业主 · 请转发到各楼栋群</p>
      </div>
    </footer>
  );
}
