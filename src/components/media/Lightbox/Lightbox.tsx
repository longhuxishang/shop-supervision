import { useLightbox } from "@/context/LightboxContext";

export function Lightbox() {
  const { isOpen, current, close, step } = useLightbox();

  return (
    <div
      className={`lightbox${isOpen ? " is-open" : ""}`}
      aria-hidden={!isOpen}
      role="dialog"
      aria-label="媒体查看"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <button type="button" className="lightbox-close" onClick={close} aria-label="关闭">
        ✕
      </button>
      <button
        type="button"
        className="lightbox-nav prev"
        onClick={() => step(-1)}
        aria-label="上一项"
      >
        ‹
      </button>
      <button
        type="button"
        className="lightbox-nav next"
        onClick={() => step(1)}
        aria-label="下一项"
      >
        ›
      </button>
      <div className="lightbox-inner">
        <div>
          {current?.kind === "video" ? (
            <video
              key={current.src}
              src={current.src}
              poster={current.poster}
              controls
              autoPlay
              playsInline
            />
          ) : current ? (
            <img key={current.src} src={current.src} alt={current.caption || ""} />
          ) : null}
        </div>
        <p className="lightbox-cap">{current?.caption || ""}</p>
      </div>
    </div>
  );
}
