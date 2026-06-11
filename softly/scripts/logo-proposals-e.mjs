// Variations on proposal E (sage background + cream blob character).
// Run with: node scripts/logo-proposals-e.mjs
import sharp from "sharp";

const BLOB =
  "M60 16c23 0 42 15.5 42 40 0 26.5-16 46-42 46S18 82.5 18 56c0-24.5 19-40 42-40Z";

const proposals = {
  // E1. 기본 다듬기 — 볼터치를 은은하게, 미소를 또렷하게
  "e1-refined": `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <rect width="120" height="120" rx="28" fill="#748e63"/>
  <path d="${BLOB}" fill="#f5f7f2"/>
  <circle cx="46" cy="56" r="4.8" fill="#463f35"/>
  <circle cx="74" cy="56" r="4.8" fill="#463f35"/>
  <path d="M50 70c3.6 4.2 6.6 5.2 10 5.2s6.4-1 10-5.2" stroke="#463f35" stroke-width="3.8" stroke-linecap="round" fill="none"/>
  <circle cx="35" cy="65" r="5" fill="#e8d9c8" opacity="0.85"/>
  <circle cx="85" cy="65" r="5" fill="#e8d9c8" opacity="0.85"/>
</svg>`,

  // E2. 딥 세이지 — 더 진한 배경으로 또렷하게
  "e2-deep-sage": `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <rect width="120" height="120" rx="28" fill="#495b3f"/>
  <path d="${BLOB}" fill="#f5f7f2"/>
  <circle cx="46" cy="56" r="4.8" fill="#3c4a35"/>
  <circle cx="74" cy="56" r="4.8" fill="#3c4a35"/>
  <path d="M50 70c3.6 4.2 6.6 5.2 10 5.2s6.4-1 10-5.2" stroke="#3c4a35" stroke-width="3.8" stroke-linecap="round" fill="none"/>
  <circle cx="35" cy="65" r="5" fill="#d2ddc7" opacity="0.9"/>
  <circle cx="85" cy="65" r="5" fill="#d2ddc7" opacity="0.9"/>
</svg>`,

  // E3. 감은 눈 — 편안하게 쉬는 표정
  "e3-resting": `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <rect width="120" height="120" rx="28" fill="#748e63"/>
  <path d="${BLOB}" fill="#f5f7f2"/>
  <path d="M41 57c1.6-3.6 8.4-3.6 10 0" stroke="#463f35" stroke-width="3.4" stroke-linecap="round" fill="none"/>
  <path d="M69 57c1.6-3.6 8.4-3.6 10 0" stroke="#463f35" stroke-width="3.4" stroke-linecap="round" fill="none"/>
  <path d="M52 70c3 3.6 5.6 4.4 8 4.4s5-.8 8-4.4" stroke="#463f35" stroke-width="3.4" stroke-linecap="round" fill="none"/>
  <circle cx="35" cy="65" r="5" fill="#e8d9c8" opacity="0.85"/>
  <circle cx="85" cy="65" r="5" fill="#e8d9c8" opacity="0.85"/>
</svg>`,

  // E4. 새싹 머리 — 정수리에 작은 잎 하나
  "e4-sprout-head": `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <rect width="120" height="120" rx="28" fill="#748e63"/>
  <path d="M60 100c21 0 38-14 38-37 0-22-17-36-38-36S22 41 22 63c0 23 17 37 38 37Z" fill="#f5f7f2"/>
  <path d="M60 28V18" stroke="#3c4a35" stroke-width="4" stroke-linecap="round"/>
  <path d="M60 18c0-8 6-12 15-12 0 8-6 12-15 12Z" fill="#d2ddc7"/>
  <circle cx="47" cy="61" r="4.6" fill="#463f35"/>
  <circle cx="73" cy="61" r="4.6" fill="#463f35"/>
  <path d="M51 74c3.4 4 6.2 5 9 5s5.6-1 9-5" stroke="#463f35" stroke-width="3.6" stroke-linecap="round" fill="none"/>
  <circle cx="36" cy="70" r="5" fill="#e8d9c8" opacity="0.85"/>
  <circle cx="84" cy="70" r="5" fill="#e8d9c8" opacity="0.85"/>
</svg>`,

  // E5. 밤 인사 — 다크 배경 + 감은 눈 + 잔별
  "e5-night": `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <rect width="120" height="120" rx="28" fill="#333e2e"/>
  <path d="${BLOB}" fill="#e8eee2"/>
  <path d="M41 57c1.6-3.6 8.4-3.6 10 0" stroke="#3c4a35" stroke-width="3.4" stroke-linecap="round" fill="none"/>
  <path d="M69 57c1.6-3.6 8.4-3.6 10 0" stroke="#3c4a35" stroke-width="3.4" stroke-linecap="round" fill="none"/>
  <path d="M52 70c3 3.6 5.6 4.4 8 4.4s5-.8 8-4.4" stroke="#3c4a35" stroke-width="3.4" stroke-linecap="round" fill="none"/>
  <circle cx="22" cy="26" r="3" fill="#b3c5a4"/>
  <circle cx="98" cy="22" r="2.4" fill="#9a8a74"/>
  <circle cx="102" cy="42" r="1.8" fill="#b3c5a4"/>
</svg>`,

  // E6. 웜 베이지 배경 — 세이지 대신 따뜻한 톤
  "e6-warm": `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <rect width="120" height="120" rx="28" fill="#cdc2b3"/>
  <path d="${BLOB}" fill="#f5f7f2"/>
  <circle cx="46" cy="56" r="4.8" fill="#463f35"/>
  <circle cx="74" cy="56" r="4.8" fill="#463f35"/>
  <path d="M50 70c3.6 4.2 6.6 5.2 10 5.2s6.4-1 10-5.2" stroke="#463f35" stroke-width="3.8" stroke-linecap="round" fill="none"/>
  <circle cx="35" cy="65" r="5" fill="#b3c5a4" opacity="0.9"/>
  <circle cx="85" cy="65" r="5" fill="#b3c5a4" opacity="0.9"/>
</svg>`,
};

for (const [name, svg] of Object.entries(proposals)) {
  await sharp(Buffer.from(svg), { density: 300 })
    .resize(512, 512)
    .png()
    .toFile(`/tmp/${name}.png`);
  console.log(`generated ${name}.png`);
}
