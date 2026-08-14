const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const iconv = require('iconv-lite');

const STATES = ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RO','RR','RS','SC','SE','SP','TO'];
const ANO = 2026;
const ELEICAO_ID = 20322002026;
const TSE_API_BASE = 'https://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar';
const CKAN_API = 'https://dadosabertos.tse.jus.br/api/3/action/package_show?id=candidatos-2026';

const dataDir = path.join(__dirname, 'data_tmp');
const fotoDir = path.join(__dirname, 'public', 'fotos');
const jsDir = path.join(__dirname, 'public', 'js');

function ensureDir(dir) { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); }
function removeDir(dir) {
  if (fs.existsSync(dir)) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch (e) {
      // On Windows, EPERM can happen if files are still open; ignore safely
      console.warn(`Warning: could not remove directory ${dir}: ${e.message}`);
    }
  }
}

function download(url, dest, retries = 3) {
  return new Promise((resolve, reject) => {
    const doRequest = (attempt) => {
      const get = url.startsWith('https') ? https.get : http.get;
      get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }, timeout: 60000 }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          return download(res.headers.location, dest, retries).then(resolve).catch(reject);
        }
        if (res.statusCode === 404) { res.resume(); reject(new Error('NOT_FOUND')); return; }
        if (res.statusCode === 429) {
          res.resume();
          if (attempt < retries) setTimeout(() => doRequest(attempt + 1), 2000 * (attempt + 1));
          else reject(new Error('RATE_LIMITED'));
          return;
        }
        if (res.statusCode !== 200) { res.resume(); reject(new Error('HTTP_' + res.statusCode)); return; }
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => file.close(resolve));
        file.on('error', (err) => { if (fs.existsSync(dest)) fs.unlinkSync(dest); reject(err); });
      }).on('error', (err) => {
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        if (attempt < retries) setTimeout(() => doRequest(attempt + 1), 1000);
        else reject(err);
      }).on('timeout', function() {
        this.destroy();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        if (attempt < retries) setTimeout(() => doRequest(attempt + 1), 1000);
        else reject(new Error('TIMEOUT'));
      });
    };
    doRequest(0);
  });
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const get = url.startsWith('https') ? https.get : http.get;
    get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 30000 }, (res) => {
      if (res.statusCode !== 200) { res.resume(); reject(new Error('HTTP_' + res.statusCode)); return; }
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch (e) { reject(new Error('JSON_PARSE')); } });
    }).on('error', reject).on('timeout', function() { this.destroy(); reject(new Error('TIMEOUT')); });
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function convertToUtf8(src, dest) {
  fs.writeFileSync(dest, iconv.decode(fs.readFileSync(src), 'win1252'), 'utf-8');
}

async function getCkamUrls() {
  console.log('[1/6] Obtendo URLs do CKAN...');
  try {
    const resp = await fetchJson(CKAN_API);
    const resources = resp.result.resources;
    const urls = {};
    for (const r of resources) {
      if (r.name === 'Candidatos' && r.url.includes('consulta_cand_')) {
        urls.csv = r.url;
      }
      if (r.name === 'Candidatos - Informa\u00e7\u00f5es complementares') {
        urls.csvComplementar = r.url;
      }
      if (r.name && r.name.includes('Fotos')) {
        const ufMatch = r.name.match(/([A-Z]{2})/);
        if (ufMatch) urls['foto_' + ufMatch[1]] = r.url;
      }
    }
    console.log('  CSV URL:', urls.csv ? 'OK' : 'NAO ENCONTRADO');
    console.log('  Fotos:', Object.keys(urls).filter(k => k.startsWith('foto_')).length, 'estados');
    return urls;
  } catch (e) {
    console.log('  Erro CKAN:', e.message);
    return {};
  }
}

async function downloadCsv(urls) {
  console.log('[2/6] Baixando CSV de candidatos...');
  ensureDir(dataDir);
  if (!urls.csv) { console.log('  URL do CSV nao encontrada'); return; }

  const zipPath = path.join(dataDir, 'consulta_cand_2026.zip');

  try {
    await download(urls.csv, zipPath);
    console.log('  ZIP baixado, extraindo...');
    execSync(`powershell -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${dataDir}' -Force"`, { stdio: 'pipe' });

    const csvFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.csv'));
    for (const f of csvFiles) {
      const src = path.join(dataDir, f);
      convertToUtf8(src, src);
    }
    console.log('  CSVs extraidos e convertidos:', csvFiles.length);
  } catch (e) {
    console.log('  Erro:', e.message);
  }
}

async function downloadFotos(urls) {
  ensureDir(fotoDir);
  console.log('[3/6] Baixando fotos...');

  const fotoKeys = Object.keys(urls).filter(k => k.startsWith('foto_'));
  if (fotoKeys.length === 0) { console.log('  URLs de fotos nao encontradas'); return; }

  let totalBaixadas = 0, totalErros = 0;
  for (const key of fotoKeys) {
    const uf = key.replace('foto_', '');
    const url = urls[key];
    const zipPath = path.join(dataDir, `foto_${uf}.zip`);
    const tmpExtractDir = path.join(dataDir, `foto_${uf}_tmp`);
    try {
      await download(url, zipPath);
      // extract to a temporary directory
      ensureDir(tmpExtractDir);
      execSync(`powershell -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${tmpExtractDir}' -Force"`, { stdio: 'pipe' });
      const extracted = fs.readdirSync(tmpExtractDir).filter(f => f.startsWith(`F${uf}`));
      let moved = 0;
      for (const f of extracted) {
        const srcPath = path.join(tmpExtractDir, f);
        const destPath = path.join(fotoDir, f);
        if (!fs.existsSync(destPath)) {
          fs.renameSync(srcPath, destPath);
          moved++;
        } else {
          fs.unlinkSync(srcPath);
        }
      }
      totalBaixadas += moved;
      process.stdout.write(`\r  ${uf}: ${moved} novas fotos   `);
    } catch (e) {
      totalErros++;
      process.stdout.write(`\r  ${uf}: ERRO         `);
    }
    // cleanup zip and temporary folder
    if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
    if (fs.existsSync(tmpExtractDir)) removeDir(tmpExtractDir);
    await sleep(200);
  }
  console.log(`\n  Fotos: ${totalBaixadas} baixadas, ${totalErros} erros`);
}

async function fetchTseApiData() {
  console.log('[4/6] Buscando dados da API TSE...');
  const apiData = {};

  apiData.BR = {};
  for (const [cargoId, cargoNome] of [[1, 'PRESIDENTE'], [2, 'VICE-PRESIDENTE']]) {
    const url = `${TSE_API_BASE}/${ANO}/BR/${ELEICAO_ID}/${cargoId}/candidatos`;
    try {
      const resp = await fetchJson(url);
      if (resp.candidatos && resp.candidatos.length > 0) apiData.BR[cargoNome] = resp.candidatos;
      await sleep(150);
    } catch (e) {}
  }

  for (const state of STATES) {
    apiData[state] = {};
    for (const [cargoId, cargoNome] of [[3, 'GOVERNADOR'], [5, 'SENADOR'], [6, 'DEPUTADO FEDERAL'], [7, 'DEPUTADO ESTADUAL']]) {
      const url = `${TSE_API_BASE}/${ANO}/${state}/${ELEICAO_ID}/${cargoId}/candidatos`;
      try {
        const resp = await fetchJson(url);
        if (resp.candidatos && resp.candidatos.length > 0) {
          const stateCandidates = resp.candidatos.filter(c => {
            const cUf = (c.siglaUe || c.UF || '').toUpperCase();
            return cUf === state || cUf === '' || cUf === 'BR';
          });
          if (stateCandidates.length > 0) apiData[state][cargoNome] = stateCandidates;
        }
        await sleep(150);
      } catch (e) {}
    }
    process.stdout.write(`\r  API: ${state} ok   `);
  }
  console.log('\n  API TSE concluida');
  return apiData;
}

function mergeAndGenerate(apiData) {
  console.log('[5/6] Gerando candidatos.js e partidos_logos.js...');
  execSync('node generate_candidatos.js', {
    cwd: __dirname, stdio: 'inherit',
    env: { ...process.env, TSE_API_DATA: JSON.stringify(apiData) }
  });
}

function cleanup() {
  console.log('[6/6] Limpando arquivos temporarios...');
  removeDir(dataDir);
  console.log('  data_tmp removido');
}

async function main() {
  const start = Date.now();
  console.log('========================================');
  console.log('  ATUALIZACAO COMPLETA - ELEICOES 2026');
  console.log('  ' + new Date().toLocaleString('pt-BR'));
  console.log('========================================\n');

  removeDir(dataDir);

  const urls = await getCkamUrls();
  await downloadCsv(urls);
  await downloadFotos(urls);
  const apiData = await fetchTseApiData();
  mergeAndGenerate(apiData);
  cleanup();

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log('\n========================================');
  console.log(`  CONCLUIDO em ${elapsed}s`);
  console.log('========================================');
}

if (require.main === module) {
  main().catch(err => { console.error('Erro fatal:', err); process.exit(1); });
}

module.exports = { main };
