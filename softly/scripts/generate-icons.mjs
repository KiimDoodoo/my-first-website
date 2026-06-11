// Generates PNG app icons from public/icon.svg.
// Run with: node scripts/generate-icons.mjs
import sharp from "sharp";
import { readFile } from "node:fs/promises";

const svg = await readFile(new URL("../public/icon.svg", import.meta.url));
// iOS/maskable icons must be full-bleed squares: no transparent rounded
// corners (iOS renders them black) — the platform applies its own mask.
const squareSvg = Buffer.from(svg.toString().replace('rx="28"', 'rx="0"'));

const targets = [
  { file: "public/icon-192.png", size: 192, src: svg, flatten: false },
  { file: "public/icon-512.png", size: 512, src: svg, flatten: false },
  { file: "public/apple-touch-icon.png", size: 180, src: squareSvg, flatten: true },
  { file: "public/icon-maskable.png", size: 512, src: squareSvg, flatten: true },
];

for (const { file, size, src, flatten } of targets) {
  let img = sharp(src, { density: 300 }).resize(size, size);
  if (flatten) img = img.flatten({ background: "#748e63" });
  await img
    .png()
    .toFile(new URL(`../${file}`, import.meta.url).pathname);
  console.log(`generated ${file} (${size}x${size})`);
}
