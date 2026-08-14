const fs = require('fs');

// Check SP governors in CSV
const csv = fs.readFileSync('D:/projetos/eleicoes2026/data_utf8/consulta_cand_2026_SP.csv', 'utf-8');
const lines = csv.split('\n');
console.log('=== GOVERNADORES SP (CSV) ===');
const govCsv = [];
lines.forEach((l, i) => {
  if (!l.trim()) return;
  const p = l.split(';');
  const cargo = (p[14] || '').replace(/"/g, '');
  if (cargo === 'GOVERNADOR') {
    const sq = (p[15] || '').replace(/"/g, '');
    const num = (p[16] || '').replace(/"/g, '');
    const nome = (p[17] || '').replace(/"/g, '');
    const partido = (p[26] || '').replace(/"/g, '');
    const sit = (p[48] || '').replace(/"/g, '');
    console.log(`  ${num} - ${nome} (${partido}) [${sit}] sq=${sq}`);
    govCsv.push({ sq, num, nome, partido, sit });
  }
});
console.log(`Total CSV: ${govCsv.length}`);

// Check SP governors in candidatos.js
const content = fs.readFileSync('D:/projetos/eleicoes2026/public/js/candidatos.js', 'utf-8');
const match = content.match(/'SP':\s*\[([\s\S]*?)\],\n\s*'SR'/);
if (match) {
  const govBlock = match[1];
  const re = /\{([^}]*)\}/g;
  const govJs = [];
  let m;
  while ((m = re.exec(govBlock)) !== null) {
    const block = m[1];
    if (block.includes("tendencia:") && !block.includes("suplente1:")) {
      const nomeMatch = block.match(/nome:'([^']+)'/);
      const partidoMatch = block.match(/partido:'([^']+)'/);
      const numMatch = block.match(/numero:(\d+)/);
      if (nomeMatch) {
        govJs.push({ nome: nomeMatch[1], partido: partidoMatch?.[1], num: numMatch?.[1] });
      }
    }
  }
  console.log(`\n=== GOVERNADORES SP (JS) ===`);
  govJs.forEach(g => console.log(`  ${g.num} - ${g.nome} (${g.partido})`));
  console.log(`Total JS: ${govJs.length}`);
}

// Find which one is missing
console.log('\n=== COMPARACAO ===');
for (const csvCand of govCsv) {
  const found = govJs.some(j => j.nome === csvCand.nome);
  if (!found) {
    console.log(`  FALTANDO: ${csvCand.nome} (${csvCand.partido}) num=${csvCand.num}`);
  }
}
