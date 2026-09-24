import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { LightboxItem } from "@/types/site";

interface LightboxContextValue {
  open: (index: number, items: LightboxItem[]) => void;
  close: () => void;
  step: (delta: number) => void;
  isOpen: boolean;
  current: LightboxItem | null;
}

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<LightboxItem[]>([]);
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback((i: number, set: LightboxItem[]) => {
    if (!set.length) return;
    setItems(set);
    setIndex(i);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setItems([]);
    document.body.style.overflow = "";
  }, []);

  const step = useCallback(
    (delta: number) => {
      if (!items.length) return;
      setIndex((prev) => (prev + delta + items.length) % items.length);
    },
    [items.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close, step]);

  const current = isOpen && items[index] ? items[index] : null;

  const value = useMemo(
    () => ({ open, close, step, isOpen, current }),
    [open, close, step, isOpen, current],
  );

  return (
    <LightboxContext.Provider value={value}>{children}</LightboxContext.Provider>
  );
}

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error("useLightbox must be used within LightboxProvider");
  return ctx;
}
