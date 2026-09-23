(() => {
  const data = window.SITE_DATA;
  if (!data) return;

  const STATUS_LABEL = {
    done: "已完成",
    active: "进行中",
    pending: "待推进",
  };

  const TYPE_LABEL = {
    photo: "邻居拍照",
    video: "现场视频",
    notice: "整改公示",
    update: "进展更新",
  };

  /* —— Hero media —— */
  const heroMedia = document.getElementById("hero-media");
  if (heroMedia && data.hero) {
    heroMedia.innerHTML = "";
    if (data.hero.kind === "video") {
      const v = document.createElement("video");
      v.src = data.hero.src;
      if (data.hero.poster) v.poster = data.hero.poster;
      v.autoplay = true;
      v.muted = true;
      v.loop = true;
      v.playsInline = true;
      v.setAttribute("playsinline", "");
      heroMedia.appendChild(v);
    } else {
      const img = document.createElement("img");
      img.src = data.hero.src;
      img.alt = `${data.meta.community} 商铺加建现场`;
      img.fetchPriority = "high";
      heroMedia.appendChild(img);
    }
  }

  document.getElementById("hero-brand").textContent = data.meta.community;
  document.getElementById("hero-title").textContent = data.meta.title;
  document.getElementById("hero-lead").textContent = data.meta.tagline;
  document.getElementById("meta-updated").textContent = `更新于 ${data.meta.updated}`;

  /* —— Facts —— */
  const factsEl = document.getElementById("facts-grid");
  factsEl.innerHTML = data.facts
    .map(
      (f) => `
    <article class="fact-item reveal">
      <div class="value">${escapeHtml(f.value)}<span class="unit">${escapeHtml(f.unit)}</span></div>
      <div class="label">${escapeHtml(f.label)}</div>
      <p class="note">${escapeHtml(f.note)}</p>
    </article>`
    )
    .join("");

  /* —— Evidence gallery (image + video) —— */
  const stage = document.getElementById("media-stage");
  const evidence = data.evidence || [];
  const lightboxItems = [];

  if (evidence.length) {
    const main = evidence[0];
    const rest = evidence.slice(1);
    const mainIdx = lightboxItems.length;
    lightboxItems.push(toLightboxItem(main));

    stage.innerHTML = `
      <button type="button" class="media-hero-tile ${main.kind === "video" ? "is-video" : ""}" data-lb="${mainIdx}" aria-label="查看大图或播放">
        ${mediaMarkup(main, true)}
        <div class="cap">
          ${main.tag ? `<span class="tag">${escapeHtml(main.tag)}</span>` : ""}
          <div>${escapeHtml(main.caption || "")}</div>
        </div>
      </button>
      <div class="media-grid" id="media-grid"></div>
    `;

    const grid = document.getElementById("media-grid");
    grid.innerHTML = rest
      .map((item) => {
        const idx = lightboxItems.length;
        lightboxItems.push(toLightboxItem(item));
        return `
        <button type="button" class="media-tile ${item.kind === "video" ? "is-video" : ""}" data-lb="${idx}" aria-label="${escapeAttr(item.tag || item.caption || "查看媒体")}">
          ${mediaMarkup(item, false)}
          ${item.tag ? `<span class="tag">${escapeHtml(item.tag)}</span>` : ""}
        </button>`;
      })
      .join("");
  }

  /* —— Drawing —— */
  const drawingFrame = document.getElementById("drawing-frame");
  const drawingIdx = lightboxItems.length;
  lightboxItems.push({
    kind: "image",
    src: data.drawing.src,
    caption: data.drawing.alt,
  });
  drawingFrame.innerHTML = `<img src="${escapeAttr(data.drawing.src)}" alt="${escapeAttr(data.drawing.alt)}" loading="lazy">`;
  drawingFrame.dataset.lb = String(drawingIdx);

  document.getElementById("drawing-points").innerHTML = data.drawing.points
    .map((p) => `<li>${escapeHtml(p)}</li>`)
    .join("");

  /* —— Risks —— */
  document.getElementById("risk-strip").innerHTML = data.risks
    .map(
      (r) => `
    <article class="risk-item reveal">
      <h3>${escapeHtml(r.title)}</h3>
      ${r.desc ? `<p>${escapeHtml(r.desc)}</p>` : ""}
    </article>`
    )
    .join("");

  /* —— Property —— */
  const propertyList = document.getElementById("property-list");
  if (propertyList && data.property) {
    propertyList.innerHTML = data.property
      .map(
        (p, i) => `
      <article class="property-item reveal">
        <span class="property-num">${i + 1}</span>
        <div>
          <h3>${escapeHtml(p.title)}</h3>
          <p>${escapeHtml(p.text)}</p>
        </div>
      </article>`
      )
      .join("");
  }

  const propertyQs = document.getElementById("property-questions");
  if (propertyQs && data.propertyQuestions) {
    propertyQs.innerHTML =
      `<li class="property-q-label">三个问题，请物业正面回答：</li>` +
      data.propertyQuestions.map((q) => `<li>${escapeHtml(q)}</li>`).join("");
  }

  /* —— Process —— */
  document.getElementById("process-track").innerHTML = data.process
    .map(
      (s) => `
    <article class="process-step reveal" data-status="${escapeAttr(s.status)}">
      <div class="process-dot" aria-hidden="true">${s.id}</div>
      <div class="process-body">
        <span class="status-chip">${STATUS_LABEL[s.status] || s.status}</span>
        <h3>${escapeHtml(s.title)}</h3>
        <p>${escapeHtml(s.desc)}</p>
      </div>
    </article>`
    )
    .join("");

  /* —— Demands —— */
  document.getElementById("demand-list").innerHTML = data.demands
    .map(
      (d) => `
    <div class="demand-row reveal">
      <div class="num">${escapeHtml(d.num)}</div>
      <div>
        <h3>${escapeHtml(d.title)}</h3>
        <p>${escapeHtml(d.text)}</p>
      </div>
    </div>`
    )
    .join("");

  /* —— Materials (evidence links + files + images) —— */
  const materials = data.materials || { links: [], files: [], images: [] };
  const materialsLinks = document.getElementById("materials-links");
  const materialsFiles = document.getElementById("materials-files");
  const materialsImages = document.getElementById("materials-images");

  function renderMaterialLinks(el, items, withDownload) {
    if (!el) return;
    el.innerHTML = (items || [])
      .map(
        (f) => `
      <a class="material-file" href="${escapeAttr(f.href)}" target="_blank" rel="noopener noreferrer"${withDownload ? " download" : ""}>
        <strong>${escapeHtml(f.title)}</strong>
        <span>${escapeHtml(f.detail)} →</span>
      </a>`
      )
      .join("");
  }

  renderMaterialLinks(materialsLinks, materials.links, false);
  renderMaterialLinks(materialsFiles, materials.files, true);

  if (materialsImages) {
    const materialLb = [];
    materialsImages.innerHTML = (materials.images || [])
      .map((img) => {
        const idx = materialLb.length;
        materialLb.push({ kind: "image", src: img.src, caption: img.caption || img.tag || "" });
        return `
        <button type="button" class="material-image" data-material-lb="${idx}" aria-label="${escapeAttr(img.tag || "查看图片")}">
          <img src="${escapeAttr(img.src)}" alt="${escapeAttr(img.caption || "")}" loading="lazy" />
          <span class="tag">${escapeHtml(img.tag || "")}</span>
        </button>`;
      })
      .join("");

    window.__MATERIAL_LB__ = materialLb;
  }

  /* —— Complaints —— */
  const complaintGrid = document.getElementById("complaint-grid");
  if (complaintGrid) {
    complaintGrid.innerHTML = (data.complaints || [])
      .map((c) => {
        const valueHtml = c.href
          ? `<a class="complaint-value" href="${escapeAttr(c.href)}">${escapeHtml(c.value)}</a>`
          : `<span class="complaint-value">${escapeHtml(c.value)}</span>`;
        return `
        <div class="complaint-item reveal">
          <span class="complaint-label">${escapeHtml(c.label)}</span>
          ${valueHtml}
        </div>`;
      })
      .join("");
  }

  document.getElementById("disclaimer").textContent = data.disclaimer;

  const closing = document.getElementById("closing-text");
  if (closing && data.closing) closing.textContent = data.closing;

  /* —— Reveal（须在 renderArchive 之前初始化） —— */
  let revealObserver;
  function observeReveals() {
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("is-in");
              revealObserver.unobserve(en.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
    }
    document.querySelectorAll(".reveal:not(.is-in)").forEach((el) => revealObserver.observe(el));
  }

  /* —— Timeline —— */
  const archiveList = document.getElementById("archive-list");
  let archiveFilter = "all";

  function renderArchive() {
    const items = (data.archive || [])
      .filter((a) => {
        if (archiveFilter === "all") return true;
        if (archiveFilter === "media") return a.type === "photo" || a.type === "video";
        return a.type === archiveFilter;
      })
      .slice()
      .sort((a, b) => String(b.date).localeCompare(String(a.date)));

    if (!items.length) {
      const emptyMsg =
        archiveFilter === "notice"
          ? "暂无整改公示。待主管部门查处结果公开后，将在此更新。"
          : "暂无记录。邻居监督拍照、视频将按日更新于此。";
      archiveList.innerHTML = `<p class="archive-empty">${emptyMsg}</p>`;
      return;
    }

    const groups = [];
    const map = new Map();
    items.forEach((item) => {
      if (!map.has(item.date)) {
        const g = { date: item.date, items: [] };
        map.set(item.date, g);
        groups.push(g);
      }
      map.get(item.date).items.push(item);
    });

    archiveList.innerHTML = groups
      .map((g) => {
        const entries = g.items
          .map((a) => {
            const mediaHtml = (a.media || [])
              .map(
                (m) => `
                <button type="button"
                  class="media-open ${m.kind === "video" ? "is-video" : ""}"
                  data-kind="${escapeAttr(m.kind || "image")}"
                  data-src="${escapeAttr(m.src)}"
                  ${m.poster ? `data-poster="${escapeAttr(m.poster)}"` : ""}
                  data-caption="${escapeAttr(a.title)}"
                  aria-label="${m.kind === "video" ? "播放视频" : "查看图片"}">
                  ${mediaMarkup(m, false)}
                </button>`
              )
              .join("");

            return `
            <article class="timeline-entry reveal">
              <span class="archive-type">${TYPE_LABEL[a.type] || a.type}</span>
              <h3>${escapeHtml(a.title)}</h3>
              ${a.body ? `<p class="body">${escapeHtml(a.body)}</p>` : ""}
              ${mediaHtml ? `<div class="archive-media">${mediaHtml}</div>` : ""}
            </article>`;
          })
          .join("");

        return `
        <div class="timeline-day">
          <div class="timeline-date">
            <span class="timeline-dot" aria-hidden="true"></span>
            <time datetime="${escapeAttr(g.date)}">${formatDate(g.date)}</time>
          </div>
          <div class="timeline-entries">${entries}</div>
        </div>`;
      })
      .join("");

    observeReveals();
  }

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("is-on"));
      btn.classList.add("is-on");
      archiveFilter = btn.dataset.filter;
      renderArchive();
    });
  });

  renderArchive();

  /* —— Lightbox —— */
  const lb = document.getElementById("lightbox");
  const lbMedia = document.getElementById("lightbox-media");
  const lbCap = document.getElementById("lightbox-cap");
  let lbIndex = 0;

  let activeSet = lightboxItems;

  function showItem(item) {
    if (!item) return;
    lbMedia.innerHTML = "";
    if (item.kind === "video") {
      const v = document.createElement("video");
      v.src = item.src;
      if (item.poster) v.poster = item.poster;
      v.controls = true;
      v.autoplay = true;
      v.playsInline = true;
      lbMedia.appendChild(v);
    } else {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.caption || "";
      lbMedia.appendChild(img);
    }
    lbCap.textContent = item.caption || "";
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function openLightbox(index, set) {
    activeSet = set || lightboxItems;
    lbIndex = index;
    showItem(activeSet[lbIndex]);
  }

  function closeLightbox() {
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    lbMedia.innerHTML = "";
    document.body.style.overflow = "";
  }

  function stepLightbox(delta) {
    if (!activeSet.length) return;
    lbIndex = (lbIndex + delta + activeSet.length) % activeSet.length;
    showItem(activeSet[lbIndex]);
  }

  document.addEventListener("click", (e) => {
    const indexed = e.target.closest("[data-lb]");
    if (indexed) {
      openLightbox(Number(indexed.dataset.lb), lightboxItems);
      return;
    }
    const materialBtn = e.target.closest("[data-material-lb]");
    if (materialBtn && window.__MATERIAL_LB__) {
      openLightbox(Number(materialBtn.dataset.materialLb), window.__MATERIAL_LB__);
      return;
    }
    const compareBtn = e.target.closest(".compare-media[data-lb-src]");
    if (compareBtn) {
      const block = compareBtn.closest(".compare-block");
      const set = [...(block || document).querySelectorAll(".compare-media[data-lb-src]")].map((el) => ({
        kind: "image",
        src: el.dataset.lbSrc,
        caption: el.dataset.lbCaption || "",
      }));
      const idx = [...(block || document).querySelectorAll(".compare-media[data-lb-src]")].indexOf(compareBtn);
      openLightbox(Math.max(0, idx), set);
      return;
    }
    const direct = e.target.closest(".media-open[data-src]");
    if (direct) {
      const parent = direct.closest(".archive-media");
      const set = parent
        ? [...parent.querySelectorAll(".media-open")].map((el) => ({
            kind: el.dataset.kind || "image",
            src: el.dataset.src,
            poster: el.dataset.poster,
            caption: el.dataset.caption || "",
          }))
        : [
            {
              kind: direct.dataset.kind || "image",
              src: direct.dataset.src,
              poster: direct.dataset.poster,
              caption: direct.dataset.caption || "",
            },
          ];
      const idx = parent ? [...parent.querySelectorAll(".media-open")].indexOf(direct) : 0;
      openLightbox(Math.max(0, idx), set);
    }
  });

  document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
  document.getElementById("lightbox-prev").addEventListener("click", () => stepLightbox(-1));
  document.getElementById("lightbox-next").addEventListener("click", () => stepLightbox(1));
  lb.addEventListener("click", (e) => {
    if (e.target === lb) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") stepLightbox(-1);
    if (e.key === "ArrowRight") stepLightbox(1);
  });

  /* —— Nav —— */
  const nav = document.getElementById("site-nav");
  const navLinks = document.getElementById("nav-links");
  const navToggle = document.getElementById("nav-toggle");

  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("is-open");
  });

  navLinks.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => navLinks.classList.remove("is-open"));
  });

  window.addEventListener(
    "scroll",
    () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 12);
    },
    { passive: true }
  );

  observeReveals();

  /* —— helpers —— */
  function mediaMarkup(item, eager) {
    if (item.kind === "video") {
      if (item.poster) {
        return `<img src="${escapeAttr(item.poster)}" alt="${escapeAttr(item.caption || item.tag || "视频")}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'}>`;
      }
      return `<video src="${escapeAttr(item.src)}" muted playsinline preload="metadata"></video>`;
    }
    return `<img src="${escapeAttr(item.src)}" alt="${escapeAttr(item.caption || item.tag || "")}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'}>`;
  }

  function toLightboxItem(item) {
    return {
      kind: item.kind || "image",
      src: item.src,
      poster: item.poster,
      caption: item.caption || item.tag || "",
    };
  }

  function formatDate(iso) {
    if (!iso) return "";
    const parts = iso.split("-");
    if (parts.length === 2) return `${parts[0]}.${parts[1]}`;
    if (parts.length >= 3) return `${parts[0]}.${parts[1]}.${parts[2]}`;
    return iso;
  }

  function escapeHtml(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(str) {
    return escapeHtml(str).replace(/'/g, "&#39;");
  }
})();
