/** @type {import('@elenjs/release').ElenCliConfig} */
module.exports = {
  allowBranch: ["main", "master"],
  bumpFiles: ["package.json", "package-lock.json"],
  tagPrefix: "v",
  releasePrefix: "release-v",
  changelog: true,
  cdn: {
    // 三选一：qiniu | tencent | aliyun；密钥用环境变量 ELEN_CDN_ACCESS_KEY / ELEN_CDN_SECRET_KEY
    provider: "qiniu",
    bucket: "longhuxishang",
    region: "z2",
    domain: "https://tlujgn1fv.hn-bkt.clouddn.com ",
    root: "longhuxishang",
    sources: [{ from: ".cdn-staging/assets", to: "assets" }],
    upload: {
      overwrite: false,
      retry: 3,
      concurrency: 4,
    },
    compress: {
      enabled: true,
      config: "config/cdn-compress.cjs",
      input: "public/assets",
      output: ".cdn-staging/assets",
    },
  },
  hooks: {
    // pub 前：增量缩略图 → CDN 压缩 → 构建（thumbs 与 elen compress 互不混用）
    prepublish: "npm run thumbs && npm run cdn:compress && npm run build",
  },
};
