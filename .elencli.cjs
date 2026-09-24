/** @type {import('@elenjs/release').ElenCliConfig} */
module.exports = {
  allowBranch: ["master"],
  bumpFiles: ["package.json", "package-lock.json"],
  tagPrefix: "v",
  releasePrefix: "release-v",
  changelog: true,
  cdn: {
    // 三选一：qiniu | tencent | aliyun；密钥用环境变量 ELEN_CDN_ACCESS_KEY / ELEN_CDN_SECRET_KEY
    provider: "qiniu",
    bucket: "longhuxishang",
    region: "z2",
    domain: "https://tlujgn1fv.hn-bkt.clouddn.com",
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
  pages: {
    // Pages 仓分支（与源码仓 master 无关）
    repo: "longhuxishang/longhuxishang.github.io",
    branch: "main",
    dist: "dist",
    siteUrl: "https://longhuxishang.github.io",
    commitMessage: "deploy: site v{{version}}",
  },
  hooks: {
    // pub：缩略图 → 压缩 staging → 构建 →（发版）→ CDN 上传 → 同步 Pages
    prepublish: "npm run thumbs && npm run cdn:compress && npm run build",
    postpublish: "npm run cdn:upload && npm run pages",
  },
};
