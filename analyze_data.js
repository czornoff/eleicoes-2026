const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const iconv = require('iconv-lite');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const get = url.startsWith('https') ? https.get : http.get;
    get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 30000 }, (res) => {
      if (res.statusCode !== 200) { res.resume(); reject(new Error('HTTP_' + res.statusCode)); return; }
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch (e) { reject(e); } });
    }).on('error', reject);
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const get = url.startsWith('https') ? https.get : http.get;
    get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 60000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  const dir = 'D:/projetos/eleicoes2026/data_tmp';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive:true});
  const fotoDir = 'D:/projetos/eleicoes2026/public/fotos';
  
  // Get CKAN URLs
  const resp = await fetchJson('https://dadosabertos.tse.jus.br/api/3/action/package_show?id=candidatos-2026');
  const resources = resp.result.resources;
  
  // Find CSV and complementar URLs
  const csvRes = resources.find(r => r.name === 'Candidatos' && r.url.includes('consulta_cand_'));
  const compRes = resources.find(r => r.name && r.name.includes('complementares'));
  
  console.log('CSV:', csvRes ? csvRes.url : 'NOT FOUND');
  console.log('Complementar:', compRes ? compRes.url : 'NOT FOUND');
  
  // Download CSV
  const zipPath = path.join(dir, 'consulta_cand_2026.zip');
  await download(csvRes.url, zipPath);
  execSync('powershell -Command "Expand-Archive -Path \'' + zipPath + '\' -DestinationPath \'' + dir + '\' -Force"', { stdio: 'pipe' });
  
  // Download complementar
  if (compRes) {
    const compZipPath = path.join(dir, 'complementar.zip');
    try {
      await download(compRes.url, compZipPath);
      execSync('powershell -Command "Expand-Archive -Path \'' + compZipPath + '\' -DestinationPath \'' + dir + '\' -Force"', { stdio: 'pipe' });
      console.log('Complementar downloaded');
    } catch(e) {
      console.log('Complementar download error:', e.message);
    }
  }
  
  // Convert all CSVs to UTF-8
  const csvFiles = fs.readdirSync(dir).filter(f => f.endsWith('.csv'));
  for (const f of csvFiles) {
    const src = path.join(dir, f);
    fs.writeFileSync(src, iconv.decode(fs.readFileSync(src), 'win1252'), 'utf-8');
  }
  console.log('CSVs:', csvFiles.join(', '));
  
  // List all files
  console.log('\nAll files in data_tmp:');
  fs.readdirSync(dir).forEach(f => {
    const stats = fs.statSync(path.join(dir, f));
    console.log('  ' + f + ' (' + (stats.size / 1024).toFixed(1) + ' KB)');
  });
  
  // Analyze complementar CSV
  const compFiles = fs.readdirSync(dir).filter(f => f.includes('complem') || f.includes('compl'));
  for (const f of compFiles) {
    const content = fs.readFileSync(path.join(dir, f), 'utf-8');
    const lines = content.split('\n').filter(l => l.trim());
    console.log('\n=== ' + f + ' ===');
    console.log('Lines:', lines.length);
    if (lines.length > 0) {
      const header = lines[0].split(';');
      console.log('Columns:', header.length);
      header.forEach((h, i) => console.log('  [' + i + '] ' + h.replace(/"/g, '')));
    }
    // Show first 3 data lines
    for (let i = 1; i < Math.min(4, lines.length); i++) {
      const parts = lines[i].split(';');
      console.log('  Row ' + i + ':', parts.slice(0, 10).map(p => p.replace(/"/g, '')).join(' | '));
    }
  }
  
  // Analyze main CSV for missing data
  const states = ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RO','RR','RS','SC','SE','SP','TO','BR'];
  
  // Check photo coverage
  const allPhotos = fs.readdirSync(fotoDir);
  let noPhotoByCargo = {};
  let totalByCargo = {};
  
  for (const st of states) {
    const csvPath = path.join(dir, 'consulta_cand_2026_' + st + '.csv');
    if (!fs.existsSync(csvPath)) continue;
    const lines = fs.readFileSync(csvPath, 'utf-8').split('\n').filter(l => l.trim());
    
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(';');
      if (parts.length < 30) continue;
      const cargo = parts[14] ? parts[14].replace(/"/g, '').trim() : '';
      const sq = parts[15] ? parts[15].replace(/"/g, '').trim() : '';
      const nome = parts[17] ? parts[17].replace(/"/g, '').trim() : '';
      if (!cargo || !sq) continue;
      
      totalByCargo[cargo] = (totalByCargo[cargo] || 0) + 1;
      
      const hasPhoto = allPhotos.some(f => f.includes(sq) && f.endsWith('.jpg'));
      if (!hasPhoto) {
        if (!noPhotoByCargo[cargo]) noPhotoByCargo[cargo] = [];
        if (noPhotoByCargo[cargo].length < 5) noPhotoByCargo[cargo].push(st + ' ' + nome + ' (sq:' + sq + ')');
      }
    }
  }
  
  console.log('\n=== FOTO COVERAGE ===');
  Object.entries(totalByCargo).sort((a,b) => b[1]-a[1]).forEach(([cargo, total]) => {
    const missing = noPhotoByCargo[cargo] ? noPhotoByCargo[cargo].length : 0;
    console.log('  ' + cargo + ': ' + (total - missing) + '/' + total + ' com foto (' + missing + ' sem)');
    if (noPhotoByCargo[cargo]) {
      noPhotoByCargo[cargo].slice(0, 3).forEach(n => console.log('    Exemplo: ' + n));
    }
  });
  
  // Check vice/suplente data
  console.log('\n=== VICE/SUPLENTE CHECK (from CSV) ===');
  for (const st of ['SP', 'RJ', 'MG', 'BA', 'AM']) {
    const csvPath = path.join(dir, 'consulta_cand_2026_' + st + '.csv');
    if (!fs.existsSync(csvPath)) continue;
    const lines = fs.readFileSync(csvPath, 'utf-8').split('\n').filter(l => l.trim());
    
    const govCount = {total: 0, vice: 0};
    const senCount = {total: 0, sup1: 0, sup2: 0};
    
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(';');
      if (parts.length < 30) continue;
      const cargo = parts[14] ? parts[14].replace(/"/g, '').trim() : '';
      
      if (cargo === 'GOVERNADOR') govCount.total++;
      if (cargo === 'VICE-GOVERNADOR') govCount.vice++;
      if (cargo === 'SENADOR') senCount.total++;
      if (cargo === '1º SUPLENTE') senCount.sup1++;
      if (cargo === '2º SUPLENTE') senCount.sup2++;
    }
    
    console.log('  ' + st + ': Gov=' + govCount.total + '/Vice=' + govCount.vice + ' | Sen=' + senCount.total + '/Sup1=' + senCount.sup1 + '/Sup2=' + senCount.sup2);
  }
  
  // Check coligacao in candidatos.js
  const jsPath = 'D:/projetos/eleicoes2026/public/js/candidatos.js';
  const jsContent = fs.readFileSync(jsPath, 'utf-8');
  
  const govWithoutColigacao = (jsContent.match(/GOVERNADORES_POR_ESTADO[\s\S]*?coligacao:''/g) || []).length;
  const senWithoutColigacao = (jsContent.match(/SENADORES_POR_ESTADO[\s\S]*?coligacao:''/g) || []).length;
  
  console.log('\n=== candidatos.js coligacao check ===');
  console.log('  Governadores without coligacao:', govWithoutColigacao);
  console.log('  Senadores without coligacao:', senWithoutColigacao);
}

main().catch(console.error);
