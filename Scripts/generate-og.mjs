// The OG image renders in every X post about the app. Master mark, palette
// colours, no invented UI.
import sharp from 'sharp';
const mark = await sharp('design/claude_watch_app_icon-removebg-preview.png').trim({ threshold: 8 }).resize(440, 440, { fit: 'inside' }).png().toBuffer();
const m = await sharp(mark).metadata();
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><radialGradient id="g" cx="0.28" cy="0.5" r="0.45"><stop offset="0" stop-color="#D97757" stop-opacity="0.22"/><stop offset="1" stop-color="#D97757" stop-opacity="0"/></radialGradient></defs>
  <rect width="1200" height="630" fill="#141413"/>
  <rect width="1200" height="630" fill="url(#g)"/>
  <g font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif">
    <text x="560" y="262" fill="#FAF9F5" font-size="72" font-weight="600" letter-spacing="-2">Claude Watch</text>
    <text x="560" y="332" fill="#FAF9F5" font-size="36" font-weight="500">Is Claude done yet?</text>
    <text x="560" y="380" fill="#E8E6DC" font-size="26">Every Claude Code session, in your menu bar.</text>
    <text x="560" y="450" fill="#B0AEA5" font-size="23">macOS 14 or later. $2.99, once.</text>
    <text x="560" y="540" fill="#8C8A83" font-size="19">Not affiliated with Anthropic.</text>
  </g></svg>`;
await sharp(Buffer.from(svg)).composite([{ input: mark, left: Math.round(300 - m.width/2), top: Math.round(315 - m.height/2) }]).png().toFile('public/brand/og-image.png');
console.log('public/brand/og-image.png 1200x630');
