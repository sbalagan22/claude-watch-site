import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map(s => sharp(readFileSync(`public/favicon-${s}.png`)).png().toBuffer()));
const header = Buffer.alloc(6); header.writeUInt16LE(0,0); header.writeUInt16LE(1,2); header.writeUInt16LE(pngs.length,4);
let offset = 6 + pngs.length * 16; const entries = [];
pngs.forEach((p, i) => { const e = Buffer.alloc(16); e.writeUInt8(sizes[i],0); e.writeUInt8(sizes[i],1); e.writeUInt16LE(1,4); e.writeUInt16LE(32,6); e.writeUInt32LE(p.length,8); e.writeUInt32LE(offset,12); offset += p.length; entries.push(e); });
writeFileSync('public/favicon.ico', Buffer.concat([header, ...entries, ...pngs]));
console.log(`favicon.ico ${sizes.join('/')}`);
