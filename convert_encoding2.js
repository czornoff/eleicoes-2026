const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');
const utf8Dir = path.join(__dirname, 'data_utf8');

// Windows-1252 to Unicode mapping for characters above 0x7F
const win1252 = new Uint8Array([
  0x20AC,0x0081,0x201A,0x0192,0x201E,0x2026,0x2020,0x2021,
  0x02C6,0x2030,0x0160,0x2039,0x0152,0x008D,0x017D,0x008F,
  0x0090,0x2018,0x2019,0x201C,0x201D,0x2022,0x2013,0x2014,
  0x02DC,0x2122,0x0161,0x203A,0x0153,0x009D,0x017E,0x0178
]);

function decodeWin1252(buffer) {
  let result = '';
  for (let i = 0; i < buffer.length; i++) {
    const byte = buffer[i];
    if (byte < 0x80) {
      result += String.fromCharCode(byte);
    } else {
      const idx = byte - 0x80;
      result += String.fromCharCode(win1252[idx] || byte);
    }
  }
  return result;
}

const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.csv'));
for (const file of files) {
    const srcPath = path.join(dataDir, file);
    const dstPath = path.join(utf8Dir, file);
    
    const buffer = fs.readFileSync(srcPath);
    const text = decodeWin1252(buffer);
    fs.writeFileSync(dstPath, text, 'utf-8');
    console.log(`Converted: ${file}`);
}
