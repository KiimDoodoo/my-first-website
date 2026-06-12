// Pebble-concept (proposal C) variations, rendered to PNG for preview.
// Run with: node scripts/logo-proposals-c.mjs
import sharp from "sharp";

const proposals = {
  // C1. 원본 다듬기 — 자연스럽게 어긋나게 쌓인 돌
  "c1-organic": `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <rect width="120" height="120" rx="28" fill="#f5f7f2"/>
  <path d="M30 86c0-9 14-15 31-15s30 6 30 15-13 14-30 14-31-5-31-14Z" fill="#cdc2b3"/>
  <path d="M40 60c0-8 10-13 23-13s22 5 22 13-9 12-22 12-23-4-23-12Z" fill="#91a980"/>
  <path d="M48 38c0-6 7-10 16-10s15 4 15 10-6 9-15 9-16-3-16-9Z" fill="#5b724d"/>
</svg>`,

  // C2. 다크 — 밤에도 차분한 무드
  "c2-dark": `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <rect width="120" height="120" rx="28" fill="#2c2823"/>
  <path d="M30 86c0-9 14-15 31-15s30 6 30 15-13 14-30 14-31-5-31-14Z" fill="#6b5f4e"/>
  <path d="M40 60c0-8 10-13 23-13s22 5 22 13-9 12-22 12-23-4-23-12Z" fill="#748e63"/>
  <path d="M48 38c0-6 7-10 16-10s15 4 15 10-6 9-15 9-16-3-16-9Z" fill="#e8eee2"/>
</svg>`,

  // C3. 세이지 배경 — 크림·웜 돌과의 대비
  "c3-sage-bg": `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <rect width="120" height="120" rx="28" fill="#91a980"/>
  <path d="M30 86c0-9 14-15 31-15s30 6 30 15-13 14-30 14-31-5-31-14Z" fill="#e3dcd2"/>
  <path d="M40 60c0-8 10-13 23-13s22 5 22 13-9 12-22 12-23-4-23-12Z" fill="#f5f7f2"/>
  <path d="M48 38c0-6 7-10 16-10s15 4 15 10-6 9-15 9-16-3-16-9Z" fill="#3c4a35"/>
</svg>`,

  // C4. 미소 돌 — 맨 위 돌에 Softly 캐릭터의 얼굴
  "c4-smile": `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <rect width="120" height="120" rx="28" fill="#f5f7f2"/>
  <path d="M28 90c0-9 14-15 32-15s32 6 32 15-14 13-32 13-32-4-32-13Z" fill="#cdc2b3"/>
  <path d="M36 62c0-9 11-14 24-14s24 5 24 14-11 13-24 13-24-4-24-13Z" fill="#91a980"/>
  <path d="M42 34c0-8 8-13 18-13s18 5 18 13-8 12-18 12-18-4-18-12Z" fill="#e8eee2"/>
  <circle cx="54" cy="33" r="2.6" fill="#463f35"/>
  <circle cx="66" cy="33" r="2.6" fill="#463f35"/>
  <path d="M56 39c1.8 2 3 2.4 4 2.4s2.2-.4 4-2.4)" stroke="#463f35" stroke-width="2.2" stroke-linecap="round" fill="none"/>
</svg>`,

  // C5. 미니멀 — 돌 두 개 + 잎 하나
  "c5-minimal-leaf": `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <rect width="120" height="120" rx="28" fill="#faf8f5"/>
  <path d="M28 84c0-10 15-16 32-16s32 6 32 16-15 15-32 15-32-5-32-15Z" fill="#cdc2b3"/>
  <path d="M38 54c0-9 10-14 22-14s22 5 22 14-10 13-22 13-22-4-22-13Z" fill="#748e63"/>
  <path d="M64 34c0-10 8-15 19-15 0 10-8 15-19 15Z" fill="#91a980"/>
</svg>`,
};

for (const [name, svg] of Object.entries(proposals)) {
  await sharp(Buffer.from(svg), { density: 300 })
    .resize(512, 512)
    .png()
    .toFile(`/tmp/${name}.png`);
  console.log(`generated ${name}.png`);
}
