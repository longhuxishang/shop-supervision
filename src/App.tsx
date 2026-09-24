import { useEffect } from "react";
import { siteData } from "@/data";
import { LightboxProvider } from "@/context/LightboxContext";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Lightbox } from "@/components/media/Lightbox";
import { Hero } from "@/components/sections/Hero";
import { Facts } from "@/components/sections/Facts";
import { Evidence } from "@/components/sections/Evidence";
import { Drawing } from "@/components/sections/Drawing";
import { Impact } from "@/components/sections/Impact";
import { Property } from "@/components/sections/Property";
import { Process } from "@/components/sections/Process";
import { Archive } from "@/components/sections/Archive";
import { Demands } from "@/components/sections/Demands";
import { Materials } from "@/components/sections/Materials";
import { Official } from "@/components/sections/Official";

function observeReveals() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          observer.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );
  document.querySelectorAll(".reveal:not(.is-in)").forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}

export default function App() {
  const d = siteData;

  useEffect(() => observeReveals(), []);

  return (
    <LightboxProvider>
      <SiteNav />
      <main id="top">
        <Hero meta={d.meta} hero={d.hero} />
        <Facts items={d.facts} />
        <Evidence items={d.evidence} />
        <Drawing data={d.drawing} />
        <Impact items={d.risks} />
        <Property items={d.property} questions={d.propertyQuestions} />
        <Process steps={d.process} />
        <Archive items={d.archive} />
        <Demands items={d.demands} />
        <Materials data={d.materials} />
        <Official complaints={d.complaints} closing={d.closing} />
      </main>
      <SiteFooter disclaimer={d.disclaimer} />
      <Lightbox />
    </LightboxProvider>
  );
}
