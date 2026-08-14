const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');
const utf8Dir = path.join(__dirname, 'data_utf8');

const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.csv'));
for (const file of files) {
    const srcPath = path.join(dataDir, file);
    const dstPath = path.join(utf8Dir, file);
    
    // Read as binary buffer
    const buffer = fs.readFileSync(srcPath);
    
    // Convert from Windows-1252 to UTF-8
    const text = buffer.toString('latin1');
    fs.writeFileSync(dstPath, text, 'utf-8');
    console.log(`Converted: ${file}`);
}
