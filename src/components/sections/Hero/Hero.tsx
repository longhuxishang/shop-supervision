import type { HeroMedia, SiteMeta } from "@/types/site";
import { assetUrl } from "@/utils/media";

interface HeroProps {
  meta: SiteMeta;
  hero: HeroMedia;
}

export function Hero({ meta, hero }: HeroProps) {
  return (
    <section className="hero" aria-label="首页主视觉">
      <div className="hero-media">
        {hero.kind === "video" ? (
          <video
            src={assetUrl(hero.src)}
            poster={hero.poster ? assetUrl(hero.poster) : undefined}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={assetUrl(hero.src)}
            alt={`${meta.community} 商铺加建现场`}
            fetchPriority="high"
            width={1600}
            height={1200}
          />
        )}
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-content">
        <div className="hero-copy">
          <p className="sr-only">更新于 {meta.updated}</p>
          <h1 className="hero-brand">
            <span>{meta.community}</span>
            <br />
            <span>{meta.title}</span>
          </h1>
          <p className="hero-lead">{meta.tagline}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#evidence">
              现场实拍
            </a>
            <a className="btn btn-ghost" href="#archive">
              监督时间线
            </a>
          </div>
        </div>
        <HeroJoin />
      </div>
    </section>
  );
}

function HeroJoin() {
  return (
    <aside className="hero-join" id="join-group" aria-label="加入小区业主群">
      <div className="hero-join-qrs">
        <figure className="hero-join-qr-item">
          <div className="hero-join-qr-wrap">
            <img
              className="hero-join-qr"
              src={assetUrl("assets/photos/wechat-group4-qr-web.png")}
              alt="龙湖熙上业主4群进群二维码"
              width={280}
              height={280}
            />
          </div>
          <figcaption className="hero-join-qr-cap">龙湖熙上业主4群🏠</figcaption>
        </figure>
        <figure className="hero-join-qr-item">
          <div className="hero-join-qr-wrap">
            <img
              className="hero-join-qr"
              src={assetUrl("assets/photos/wechat-oa-qr-web.png")}
              alt="微信公众号二维码"
              width={280}
              height={280}
            />
          </div>
          <figcaption className="hero-join-qr-cap">关注公众号</figcaption>
        </figure>
      </div>
      <div className="hero-join-copy">
        <p className="hero-join-title">加入小区业主群</p>
        <p className="hero-join-text">扫码进四群，或关注公众号私信入群。</p>
        <p className="hero-join-note">四群二维码有效期至 9 月 30 日</p>
      </div>
    </aside>
  );
}
