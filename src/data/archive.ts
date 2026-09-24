import type { ArchiveItem } from "@/types/site";

/**
 * 监督时间线（按日倒序）
 * type: photo | video | notice | update
 * 新增：把条目插到数组最前面，date 用 YYYY-MM-DD
 */
export const archive: ArchiveItem[] = [
  {
    id: "t-20260923-4",
    date: "2026-09-23",
    type: "photo",
    title: "邻居监督：问题商铺装修",
    body: "问题商铺装修实景。",
    media: [{ kind: "image", src: "assets/photos/entrance-pharmacy-web.jpg" }],
  },
  {
    id: "t-20260923-decor",
    date: "2026-09-23",
    type: "photo",
    title: "邻居监督：小区内部装饰条开窗",
    body: "外墙装饰条被开洞装窗，正对小区内部。",
    media: [
      { kind: "image", src: "assets/photos/decor-strip-window-web.jpg" },
      { kind: "image", src: "assets/photos/window-open-1-web.png" },
    ],
  },
  {
    id: "t-20260922-1",
    date: "2026-09-22",
    type: "video",
    title: "邻居监督：正对 8 号楼东边开窗",
    body: "正对 8 号楼东边开窗现场。",
    media: [
      {
        kind: "video",
        src: "assets/videos/window-open.mp4",
        poster: "assets/photos/b8-window-web.jpg",
      },
    ],
  },
  {
    id: "t-20260921-1",
    date: "2026-09-21",
    type: "video",
    title: "邻居监督：南边商铺内部改造",
    body: "南边商铺内部改造现场。",
    media: [
      {
        kind: "video",
        src: "assets/videos/south-shop-interior.mp4",
        poster: "assets/photos/pharmacy-interior-ceiling-web.png",
      },
    ],
  },
  {
    id: "t-20260920-1",
    date: "2026-09-20",
    type: "update",
    title: "与社区沟通",
    body: "物业称商家钻空子，在尚未交付、不归物业管时浇筑楼顶；社区表示将调查取证。",
    media: [{ kind: "image", src: "assets/photos/shop-interior-lit-web.jpg" }],
  },
  {
    id: "t-20260917-1",
    date: "2026-09-17",
    type: "photo",
    title: "邻居监督：空调外机",
    body: "空调外机挂进小区一侧。",
    media: [{ kind: "image", src: "assets/photos/courtyard-windows-web.jpg" }],
  },
  {
    id: "t-20260729-east",
    date: "2026-07-29",
    type: "photo",
    title: "东门南侧商铺违建",
    body: "钢屋面覆盖原露天区域。",
    media: [{ kind: "image", src: "assets/photos/east-gate-shop-web.jpg" }],
  },
  {
    id: "t-20260729-b9",
    date: "2026-07-29",
    type: "photo",
    title: "九号楼南侧商铺违建",
    body: "加建钢架与屋面。",
    media: [{ kind: "image", src: "assets/photos/b9-south-shop-web.jpg" }],
  },
];
