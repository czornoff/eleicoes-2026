const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const iconv = require('iconv-lite');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 30000 }, (res) => {
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
  
  const resp = await fetchJson('https://dadosabertos.tse.jus.br/api/3/action/package_show?id=candidatos-2026');
  const resources = resp.result.resources;
  const csvRes = resources.find(r => r.name === 'Candidatos' && r.url.includes('consulta_cand_'));
  console.log('CSV URL:', csvRes.url);
  
  const zipPath = path.join(dir, 'consulta_cand_2026.zip');
  await download(csvRes.url, zipPath);
  console.log('ZIP downloaded');
  
  execSync('powershell -Command "Expand-Archive -Path \'' + zipPath + '\' -DestinationPath \'' + dir + '\' -Force"', { stdio: 'pipe' });
  
  const csvFiles = fs.readdirSync(dir).filter(f => f.endsWith('.csv'));
  for (const f of csvFiles) {
    const src = path.join(dir, f);
    fs.writeFileSync(src, iconv.decode(fs.readFileSync(src), 'win1252'), 'utf-8');
  }
  console.log('CSVs converted:', csvFiles.length);
  
  const states = ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RO','RR','RS','SC','SE','SP','TO','BR'];
  let totalByCargo = {};
  let totalByState = {};
  
  for (const st of states) {
    const csvPath = path.join(dir, 'consulta_cand_2026_' + st + '.csv');
    if (!fs.existsSync(csvPath)) continue;
    const lines = fs.readFileSync(csvPath, 'utf-8').split('\n').filter(l => l.trim());
    
    if (st === 'SP') {
      const header = lines[0].split(';');
      console.log('\nHeader columns:');
      header.forEach((h, i) => console.log('  [' + i + '] ' + h.replace(/"/g, '')));
    }
    
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(';');
      if (parts.length < 30) continue;
      const cargo = parts[14] ? parts[14].replace(/"/g, '').trim() : '';
      if (!cargo) continue;
      totalByCargo[cargo] = (totalByCargo[cargo] || 0) + 1;
      if (!totalByState[st]) totalByState[st] = {};
      totalByState[st][cargo] = (totalByState[st][cargo] || 0) + 1;
    }
  }
  
  console.log('\n=== TOTAL BY CARGO (CSV) ===');
  Object.entries(totalByCargo).sort((a,b) => b[1]-a[1]).forEach(([k,v]) => console.log('  ' + k + ': ' + v));
  
  console.log('\n=== TOTAL PER STATE (CSV) ===');
  for (const st of states) {
    if (!totalByState[st]) continue;
    const total = Object.values(totalByState[st]).reduce((s,v) => s+v, 0);
    const cargos = Object.entries(totalByState[st]).map(([k,v]) => k + ':' + v).join(', ');
    console.log('  ' + st + ' (' + total + '): ' + cargos);
  }
  
  // Check candidatos.js
  const jsPath = 'D:/projetos/eleicoes2026/public/js/candidatos.js';
  const jsContent = fs.readFileSync(jsPath, 'utf-8');
  
  // Count per state by looking at array contents
  const sections = [
    { name: 'GOVERNADORES_POR_ESTADO', regex: /GOVERNADORES_POR_ESTADO\s*=\s*\{([\s\S]*?)\n\};/ },
    { name: 'SENADORES_POR_ESTADO', regex: /SENADORES_POR_ESTADO\s*=\s*\{([\s\S]*?)\n\};/ },
    { name: 'DEPUTADOS_FEDERAIS_DESTAQUE', regex: /DEPUTADOS_FEDERAIS_DESTAQUE\s*=\s*\{([\s\S]*?)\n\};/ },
    { name: 'DEPUTADOS_ESTADUAIS_DESTAQUE', regex: /DEPUTADOS_ESTADUAIS_DESTAQUE\s*=\s*\{([\s\S]*?)\n\};/ },
  ];
  
  console.log('\n=== candidatos.js per-state counts ===');
  for (const sec of sections) {
    const m = jsContent.match(sec.regex);
    if (!m) { console.log(sec.name + ': NOT FOUND'); continue; }
    const block = m[1];
    const stateBlocks = block.match(/'([A-Z]{2})': \[/g);
    if (!stateBlocks) continue;
    console.log('\n' + sec.name + ':');
    for (const sb of stateBlocks) {
      const stCode = sb.match(/'([A-Z]{2})'/)[1];
      // Count entries in this state block
      const stateStart = block.indexOf(sb);
      const nextState = block.indexOf('\n  ],', stateStart + 1);
      const stateBlock = block.substring(stateStart, nextState > 0 ? nextState : block.length);
      const entryCount = (stateBlock.match(/sqCandidato:/g) || []).length;
      const csvCount = (totalByState[stCode] && totalByState[stCode][sec.name === 'GOVERNADORES_POR_ESTADO' ? 'GOVERNADOR' : sec.name === 'SENADORES_POR_ESTADO' ? 'SENADOR' : sec.name === 'DEPUTADOS_FEDERAIS_DESTAQUE' ? 'DEPUTADO FEDERAL' : 'DEPUTADO ESTADUAL']) || 0;
      const diff = csvCount - entryCount;
      if (diff > 0) {
        console.log('  ' + stCode + ': JS=' + entryCount + ' CSV=' + csvCount + ' FALTAM=' + diff);
      }
    }
  }
}

main().catch(console.error);
