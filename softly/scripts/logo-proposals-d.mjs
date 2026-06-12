// Second round of pebble-concept variations.
// Run with: node scripts/logo-proposals-d.mjs
import sharp from "sharp";

const proposals = {
  // D1. 라인 아트 — 선으로만 그린 돌, 가장 가벼운 인상
  "d1-lineart": `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <rect width="120" height="120" rx="28" fill="#faf8f5"/>
  <path d="M30 86c0-9 14-15 31-15s30 6 30 15-13 14-30 14-31-5-31-14Z" fill="none" stroke="#9a8a74" stroke-width="4"/>
  <path d="M40 60c0-8 10-13 23-13s22 5 22 13-9 12-22 12-23-4-23-12Z" fill="none" stroke="#748e63" stroke-width="4"/>
  <path d="M48 38c0-6 7-10 16-10s15 4 15 10-6 9-15 9-16-3-16-9Z" fill="#748e63"/>
</svg>`,

  // D2. 4단 쌓기 — 아슬아슬 귀여운 균형
  "d2-four-stack": `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <rect width="120" height="120" rx="28" fill="#f5f7f2"/>
  <path d="M28 92c0-8 14-13 32-13s32 5 32 13-14 12-32 12-32-4-32-12Z" fill="#cdc2b3"/>
  <path d="M38 70c0-7 10-11 23-11s22 4 22 11-9 10-22 10-23-3-23-10Z" fill="#91a980"/>
  <path d="M46 50c0-6 7-9 16-9s15 3 15 9-6 8-15 8-16-2-16-8Z" fill="#5b724d"/>
  <path d="M53 33c0-4 4-6 9-6s8 2 8 6-3 5-8 5-9-1-9-5Z" fill="#e3dcd2"/>
</svg>`,

  // D3. 물결 위의 돌 — 잔잔한 물에 비친 평온
  "d3-ripple": `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <rect width="120" height="120" rx="28" fill="#e8eee2"/>
  <path d="M36 56c0-11 11-17 24-17s24 6 24 17-11 16-24 16-24-5-24-16Z" fill="#5b724d"/>
  <path d="M26 84c6 4 14 4 20 0s14-4 20 0 14 4 20 0" stroke="#91a980" stroke-width="4" stroke-linecap="round" fill="none"/>
  <path d="M34 96c5 3 11 3 16 0s11-3 16 0 11 3 16 0" stroke="#b3c5a4" stroke-width="4" stroke-linecap="round" fill="none"/>
</svg>`,

  // D4. 원형 배지 — 동그란 프레임 안의 돌탑
  "d4-badge": `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <rect width="120" height="120" rx="28" fill="#e3dcd2"/>
  <circle cx="60" cy="60" r="40" fill="#faf8f5"/>
  <path d="M38 76c0-7 10-11 22-11s22 4 22 11-10 10-22 10-22-3-22-10Z" fill="#cdc2b3"/>
  <path d="M44 56c0-6 7-10 16-10s16 4 16 10-7 9-16 9-16-3-16-9Z" fill="#91a980"/>
  <path d="M50 38c0-5 5-8 10-8s10 3 10 8-5 7-10 7-10-2-10-7Z" fill="#5b724d"/>
</svg>`,

  // D5. 기울어진 쌓기 — 비대칭의 자연스러움
  "d5-leaning": `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <rect width="120" height="120" rx="28" fill="#f5f7f2"/>
  <path d="M26 88c0-9 15-14 33-14s33 5 33 14-15 13-33 13-33-4-33-13Z" fill="#cdc2b3"/>
  <path d="M44 63c1-8 11-12 24-11s21 6 20 14-11 11-23 10-22-5-21-13Z" fill="#91a980" transform="rotate(-4 64 62)"/>
  <path d="M52 40c1-6 8-9 16-8s14 5 13 11-8 8-16 7-14-4-13-10Z" fill="#5b724d" transform="rotate(5 66 42)"/>
</svg>`,

  // D6. 밤의 돌탑 — 달과 함께 (B+C 결합)
  "d6-night": `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <rect width="120" height="120" rx="28" fill="#333e2e"/>
  <path d="M88 22a14 14 0 1 0 10 24 12 12 0 0 1-10-24Z" fill="#e8eee2"/>
  <path d="M28 90c0-8 14-13 32-13s32 5 32 13-14 12-32 12-32-4-32-12Z" fill="#6b5f4e"/>
  <path d="M38 68c0-7 10-11 23-11s22 4 22 11-9 10-22 10-23-3-23-10Z" fill="#748e63"/>
  <path d="M46 48c0-6 7-9 16-9s15 3 15 9-6 8-15 8-16-2-16-8Z" fill="#e3dcd2"/>
</svg>`,
};

for (const [name, svg] of Object.entries(proposals)) {
  await sharp(Buffer.from(svg), { density: 300 })
    .resize(512, 512)
    .png()
    .toFile(`/tmp/${name}.png`);
  console.log(`generated ${name}.png`);
}
