/**
 * 媒体压缩参数（由 elen compress / @elenjs/cdn 读取）。
 * 质量相关只放本文件，不写进 .elencli.cjs 的 upload 段。
 */
module.exports = {
  keepStructure: true,
  images: {
    glob: ["**/*.{jpg,jpeg,png,webp,gif}"],
    jpeg: { quality: 82, mozjpeg: true },
    png: { quality: 80, compressionLevel: 8 },
    webp: { quality: 80 },
    maxWidth: 1920,
    maxHeight: 1920,
    skipIfSmaller: true,
  },
  videos: {
    enabled: true,
    glob: ["**/*.{mp4,webm,mov,mkv}"],
    outputFormat: "mp4",
    videoCodec: "libx264",
    audioCodec: "aac",
    crf: 28,
    preset: "medium",
    maxWidth: 1920,
    maxHeight: 1080,
    audioBitrate: "128k",
    skipIfSmaller: true,
    keepOriginalExtension: false,
  },
};
