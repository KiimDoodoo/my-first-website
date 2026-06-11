// Generates PNG app icons from public/icon.svg.
// Run with: node scripts/generate-icons.mjs
import sharp from "sharp";
import { readFile } from "node:fs/promises";

const svg = await readFile(new URL("../public/icon.svg", import.meta.url));

const targets = [
  { file: "public/icon-192.png", size: 192 },
  { file: "public/icon-512.png", size: 512 },
  { file: "public/apple-touch-icon.png", size: 180 },
];

for (const { file, size } of targets) {
  await sharp(svg, { density: 300 })
    .resize(size, size)
    .png()
    .toFile(new URL(`../${file}`, import.meta.url).pathname);
  console.log(`generated ${file} (${size}x${size})`);
}
