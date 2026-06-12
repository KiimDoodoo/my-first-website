// Renders logo design proposals to PNG for preview.
// Run with: node scripts/logo-proposals.mjs
import sharp from "sharp";

const proposals = {
  // A. 새싹 — 성장과 쉼의 리듬
  "proposal-a-sprout": `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <rect width="120" height="120" rx="28" fill="#e8eee2"/>
  <path d="M60 96V58" stroke="#5b724d" stroke-width="6" stroke-linecap="round"/>
  <path d="M60 62C60 44 46 36 30 36c0 18 14 26 30 26Z" fill="#748e63"/>
  <path d="M60 50c0-14 11-20 24-20 0 14-11 20-24 20Z" fill="#91a980"/>
  <circle cx="60" cy="103" r="4" fill="#cdc2b3"/>
</svg>`,

  // B. 잔잔한 달 — 하루의 끝, 부드러운 기록
  "proposal-b-moon": `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <rect width="120" height="120" rx="28" fill="#2c2823"/>
  <path d="M74 22a40 40 0 1 0 24 60A34 34 0 0 1 74 22Z" fill="#e8eee2"/>
  <circle cx="36" cy="38" r="3.5" fill="#748e63"/>
  <circle cx="46" cy="88" r="2.5" fill="#9a8a74"/>
</svg>`,

  // C. 조약돌 — 균형과 차분함
  "proposal-c-pebbles": `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <rect width="120" height="120" rx="28" fill="#f5f7f2"/>
  <ellipse cx="60" cy="88" rx="30" ry="14" fill="#cdc2b3"/>
  <ellipse cx="60" cy="62" rx="22" ry="12" fill="#91a980"/>
  <ellipse cx="60" cy="40" rx="14" ry="9" fill="#5b724d"/>
</svg>`,

  // D. 말풍선 — 매일의 짧은 대화
  "proposal-d-bubble": `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <rect width="120" height="120" rx="28" fill="#d2ddc7"/>
  <path d="M60 26c20 0 34 12 34 28S80 82 60 82c-3 0-6-.3-9-.9L36 88l4.5-12.6C33 70 26 63 26 54c0-16 14-28 34-28Z" fill="#faf8f5"/>
  <circle cx="46" cy="54" r="4.5" fill="#748e63"/>
  <circle cx="60" cy="54" r="4.5" fill="#91a980"/>
  <circle cx="74" cy="54" r="4.5" fill="#b3c5a4"/>
</svg>`,

  // E. 캐릭터 반전 — 세이지 배경 + 크림 블롭 (홈 화면에서 또렷)
  "proposal-e-blob-inverted": `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <rect width="120" height="120" rx="28" fill="#748e63"/>
  <path d="M60 16c23 0 42 15.5 42 40 0 26.5-16 46-42 46S18 82.5 18 56c0-24.5 19-40 42-40Z" fill="#f5f7f2"/>
  <circle cx="47" cy="58" r="4.5" fill="#463f35"/>
  <circle cx="73" cy="58" r="4.5" fill="#463f35"/>
  <path d="M51 72c3.2 3.8 6 4.7 9 4.7s5.8-.9 9-4.7" stroke="#463f35" stroke-width="3.5" stroke-linecap="round" fill="none"/>
  <circle cx="38" cy="66" r="4.5" fill="#e8eee2"/>
  <circle cx="82" cy="66" r="4.5" fill="#e8eee2"/>
</svg>`,
};

for (const [name, svg] of Object.entries(proposals)) {
  await sharp(Buffer.from(svg), { density: 300 })
    .resize(512, 512)
    .png()
    .toFile(new URL(`../public/${name}.png`, import.meta.url).pathname);
  console.log(`generated ${name}.png`);
}
