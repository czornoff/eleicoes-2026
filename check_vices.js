const fs = require('fs');

const regionMap = {
    'AC':'NORTE','AL':'NORDESTE','AM':'NORTE','AP':'NORTE','BA':'NORDESTE',
    'CE':'NORDESTE','DF':'CENTRO-OESTE','ES':'SUDESTE','GO':'CENTRO-OESTE',
    'MA':'NORDESTE','MT':'CENTRO-OESTE','MS':'CENTRO-OESTE','MG':'SUDESTE',
    'PA':'NORTE','PB':'NORDESTE','PR':'SUL','PE':'NORDESTE','PI':'NORDESTE',
    'RJ':'SUDESTE','RN':'NORDESTE','RO':'NORTE','RR':'NORTE','RS':'SUL',
    'SC':'SUL','SE':'NORDESTE','SP':'SUDESTE','TO':'NORTE'
};

function getTSELink(sq, uf, cargo) {
    const region = regionMap[uf] || 'BR';
    if (cargo === 'PRESIDENTE' || cargo === 'VICE-PRESIDENTE') {
        return 'https://divulgacandcontas.tse.jus.br/divulga/#/candidato/BR/BR/20322002026/' + sq + '/2026/BR';
    }
    return 'https://divulgacandcontas.tse.jus.br/divulga/#/candidato/' + region + '/' + uf + '/20322002026/' + sq + '/2026/' + uf;
}

// Read SP data to check vice/suplente structure
const spLines = fs.readFileSync('D:/projetos/eleicoes2026/data_utf8/consulta_cand_2026_SP.csv', 'utf-8').split('\n');
console.log('=== SP GOVERNOR + VICE ===');
for (let i = 1; i < spLines.length; i++) {
    if (!spLines[i].trim()) continue;
    const parts = spLines[i].split(';');
    const cargo = parts[14].replace(/"/g, '');
    if (cargo === 'GOVERNADOR' || cargo === 'VICE-GOVERNADOR') {
        const sq = parts[15].replace(/"/g, '');
        const num = parts[16].replace(/"/g, '');
        const nome = parts[17].replace(/"/g, '');
        const partido = parts[26].replace(/"/g, '');
        console.log(cargo + ' | NUM=' + num + ' | PARTIDO=' + partido + ' | NOME=' + nome + ' | SQ=' + sq);
    }
}

console.log('');
console.log('=== SP SENATOR + SUPLENTES ===');
for (let i = 1; i < spLines.length; i++) {
    if (!spLines[i].trim()) continue;
    const parts = spLines[i].split(';');
    const cargo = parts[14].replace(/"/g, '');
    if (cargo === 'SENADOR' || cargo.includes('SUPLENTE')) {
        const sq = parts[15].replace(/"/g, '');
        const num = parts[16].replace(/"/g, '');
        const nome = parts[17].replace(/"/g, '');
        const partido = parts[26].replace(/"/g, '');
        console.log(cargo + ' | NUM=' + num + ' | PARTIDO=' + partido + ' | NOME=' + nome + ' | SQ=' + sq);
    }
}

// Test TSE links
console.log('');
console.log('=== TEST TSE LINKS ===');
console.log('President Lula:', getTSELink('280002542548', 'BR', 'PRESIDENTE'));
console.log('President Samara:', getTSELink('280002538811', 'BR', 'PRESIDENTE'));
console.log('Governor SP:', getTSELink('250002541303', 'SP', 'GOVERNADOR'));
console.log('Senator SP:', getTSELink('250002541312', 'SP', 'SENADOR'));
