import { useState } from "react";
import { useScrollNav } from "@/hooks/useScrollNav";

const LINKS = [
  { href: "#evidence", label: "现场实拍" },
  { href: "#materials", label: "证据材料" },
  { href: "#process", label: "整改流程" },
  { href: "#archive", label: "监督时间线" },
  { href: "#demands", label: "业主要求" },
  { href: "#join-group", label: "加入业主群" },
  { href: "#official", label: "联系与反馈" },
] as const;

export function SiteNav() {
  const scrolled = useScrollNav();
  const [open, setOpen] = useState(false);

  return (
    <header className={`site-nav${scrolled ? " is-scrolled" : ""}`} id="site-nav">
      <a className="nav-brand" href="#top">
        龙湖熙上 · 业主关注
      </a>
      <button
        className="nav-toggle"
        type="button"
        aria-label="打开菜单"
        onClick={() => setOpen((v) => !v)}
      >
        <span />
      </button>
      <ul className={`nav-links${open ? " is-open" : ""}`} id="nav-links">
        {LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
}
