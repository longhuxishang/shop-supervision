import { useEffect, useRef } from "react";

/** IntersectionObserver reveal — adds `.is-in` when in view */
export function useReveal<T extends HTMLElement = HTMLElement>(deps: unknown[] = []) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

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

    root.querySelectorAll(".reveal:not(.is-in)").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, deps);

  return ref;
}
