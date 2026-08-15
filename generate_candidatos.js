const fs = require("fs");
const path = require("path");

const PARTIES = {
  AGIR: {
    nome: "Agir",
    numero: 36,
    cor: "#eab308",
    tendencia: "Centro",
    tendenciaPct: 50,
  },
  AVANTE: {
    nome: "Avante",
    numero: 70,
    cor: "#eab308",
    tendencia: "Centro",
    tendenciaPct: 50,
  },
  CIDADANIA: {
    nome: "Cidadania",
    numero: 23,
    cor: "#eab308",
    tendencia: "Centro",
    tendenciaPct: 50,
  },
  DC: {
    nome: "DC",
    numero: 27,
    cor: "#eab308",
    tendencia: "Centro",
    tendenciaPct: 45,
  },
  DEMOCRATA: {
    nome: "Democrata",
    numero: 35,
    cor: "#eab308",
    tendencia: "Centro",
    tendenciaPct: 50,
  },
  INTERSINDICAL: {
    nome: "Intersindical",
    numero: 0,
    cor: "#ff4444",
    tendencia: "Esquerda",
    tendenciaPct: 15,
  },
  MDB: {
    nome: "MDB",
    numero: 15,
    cor: "#eab308",
    tendencia: "Centro",
    tendenciaPct: 48,
  },
  MISSAO: {
    nome: "Missao",
    numero: 14,
    cor: "#eab308",
    tendencia: "Centro-Liberal",
    tendenciaPct: 50,
  },
  MOBILIZA: {
    nome: "Mobiliza",
    numero: 33,
    cor: "#eab308",
    tendencia: "Centro",
    tendenciaPct: 50,
  },
  NOVO: {
    nome: "Novo",
    numero: 30,
    cor: "#0055ff",
    tendencia: "Direita Liberal",
    tendenciaPct: 70,
  },
  PATRIOTA: {
    nome: "Patriota",
    numero: 0,
    cor: "#3b82f6",
    tendencia: "Direita",
    tendenciaPct: 70,
  },
  PCB: {
    nome: "PCB",
    numero: 21,
    cor: "#ff0000",
    tendencia: "Esquerda Radical",
    tendenciaPct: 5,
  },
  PCDOB: {
    nome: "PCdoB",
    numero: 65,
    cor: "#ff4444",
    tendencia: "Esquerda",
    tendenciaPct: 15,
  },
  PCO: {
    nome: "PCO",
    numero: 29,
    cor: "#ff0000",
    tendencia: "Esquerda Radical",
    tendenciaPct: 5,
  },
  PDT: {
    nome: "PDT",
    numero: 12,
    cor: "#f97316",
    tendencia: "Centro-Esquerda",
    tendenciaPct: 38,
  },
  PL: {
    nome: "Partido Liberal",
    numero: 22,
    cor: "#0055ff",
    tendencia: "Direita",
    tendenciaPct: 72,
  },
  PMN: {
    nome: "PMN",
    numero: 19,
    cor: "#f97316",
    tendencia: "Centro-Esquerda",
    tendenciaPct: 35,
  },
  PODE: {
    nome: "Podemos",
    numero: 20,
    cor: "#22c55e",
    tendencia: "Centro-Direita",
    tendenciaPct: 60,
  },
  PP: {
    nome: "Progressistas",
    numero: 11,
    cor: "#22c55e",
    tendencia: "Centro-Direita",
    tendenciaPct: 55,
  },
  PRD: {
    nome: "PRD",
    numero: 25,
    cor: "#22c55e",
    tendencia: "Centro-Direita",
    tendenciaPct: 60,
  },
  PROS: {
    nome: "PROS",
    numero: 90,
    cor: "#eab308",
    tendencia: "Centro",
    tendenciaPct: 48,
  },
  PRP: {
    nome: "PRP",
    numero: 44,
    cor: "#0055ff",
    tendencia: "Direita",
    tendenciaPct: 70,
  },
  PRTB: {
    nome: "PRTB",
    numero: 28,
    cor: "#0055ff",
    tendencia: "Direita",
    tendenciaPct: 72,
  },
  PSB: {
    nome: "PSB",
    numero: 40,
    cor: "#f97316",
    tendencia: "Centro-Esquerda",
    tendenciaPct: 35,
  },
  PSD: {
    nome: "PSD",
    numero: 55,
    cor: "#eab308",
    tendencia: "Centro",
    tendenciaPct: 45,
  },
  PSDB: {
    nome: "PSDB",
    numero: 45,
    cor: "#22c55e",
    tendencia: "Centro-Direita",
    tendenciaPct: 55,
  },
  PSOL: {
    nome: "PSOL",
    numero: 50,
    cor: "#ff4444",
    tendencia: "Esquerda",
    tendenciaPct: 10,
  },
  PSTU: {
    nome: "PSTU",
    numero: 16,
    cor: "#ff0000",
    tendencia: "Esquerda Radical",
    tendenciaPct: 5,
  },
  PT: {
    nome: "Partido dos Trabalhadores",
    numero: 13,
    cor: "#ff4444",
    tendencia: "Esquerda",
    tendenciaPct: 20,
  },
  PV: {
    nome: "Partido Verde",
    numero: 43,
    cor: "#f97316",
    tendencia: "Centro-Esquerda",
    tendenciaPct: 35,
  },
  REDE: {
    nome: "Rede",
    numero: 18,
    cor: "#f97316",
    tendencia: "Centro-Esquerda",
    tendenciaPct: 35,
  },
  REPUBLICANOS: {
    nome: "Republicanos",
    numero: 10,
    cor: "#22c55e",
    tendencia: "Centro-Direita",
    tendenciaPct: 58,
  },
  SOLIDARIEDADE: {
    nome: "Solidariedade",
    numero: 77,
    cor: "#eab308",
    tendencia: "Centro",
    tendenciaPct: 50,
  },
  UCDB: {
    nome: "UCDB",
    numero: 0,
    cor: "#eab308",
    tendencia: "Centro",
    tendenciaPct: 50,
  },
  UNIAO: {
    nome: "Uniao Brasil",
    numero: 44,
    cor: "#22c55e",
    tendencia: "Centro-Direita",
    tendenciaPct: 58,
  },
  UP: {
    nome: "UP",
    numero: 80,
    cor: "#ff4444",
    tendencia: "Esquerda",
    tendenciaPct: 10,
  },
};

function getTendency(partido) {
  const norm = (partido || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toUpperCase()
    .trim();
  const p = PARTIES[norm] || {};
  return {
    tendencia: p.tendencia || "",
    cor: p.cor || "#888",
    pct: p.tendenciaPct || 50,
  };
}

const regionMap = {
  AC: "NORTE",
  AL: "NORDESTE",
  AM: "NORTE",
  AP: "NORTE",
  BA: "NORDESTE",
  CE: "NORDESTE",
  DF: "CENTRO-OESTE",
  ES: "SUDESTE",
  GO: "CENTRO-OESTE",
  MA: "NORDESTE",
  MT: "CENTRO-OESTE",
  MS: "CENTRO-OESTE",
  MG: "SUDESTE",
  PA: "NORTE",
  PB: "NORDESTE",
  PR: "SUL",
  PE: "NORDESTE",
  PI: "NORDESTE",
  RJ: "SUDESTE",
  RN: "NORDESTE",
  RO: "NORTE",
  RR: "NORTE",
  RS: "SUL",
  SC: "SUL",
  SE: "NORDESTE",
  SP: "SUDESTE",
  TO: "NORTE",
};

function getTSELink(sq, uf, cargo) {
  const region = regionMap[uf] || "BR";
  if (cargo === "PRESIDENTE" || cargo === "VICE-PRESIDENTE") {
    return (
      "https://divulgacandcontas.tse.jus.br/divulga/#/candidato/BR/BR/20322002026/" +
      sq +
      "/2026/BR"
    );
  }
  return (
    "https://divulgacandcontas.tse.jus.br/divulga/#/candidato/" +
    region +
    "/" +
    uf +
    "/20322002026/" +
    sq +
    "/2026/" +
    uf
  );
}

const states = [
  "AC",
  "AL",
  "AM",
  "AP",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RO",
  "RR",
  "RS",
  "SC",
  "SE",
  "SP",
  "TO",
];
const dataDir = path.join(__dirname, "data_tmp");
const fotoDir = path.join(__dirname, "public", "fotos");
const jsDir = path.join(__dirname, "public", "js");
const photoFiles = fs.readdirSync(fotoDir);

function findFoto(sq) {
  // Primeiro, tenta encontrar o arquivo padrão contendo o SQ
  let photoFile = photoFiles.find((f) => f.includes(sq) && f.endsWith(".jpg"));
  // Caso não encontre, tenta com o prefixo 'FBR' (usado para fotos de presidente)
  if (!photoFile) {
    const prefixed = photoFiles.find(
      (f) => f.includes("FBR" + sq) && f.endsWith(".jpg"),
    );
    if (prefixed) photoFile = prefixed;
  }
  return photoFile ? "fotos/" + photoFile : "";
}

// Parse all state CSVs
const allCandidates = {};
for (const state of states) {
  const csvPath = path.join(dataDir, "consulta_cand_2026_" + state + ".csv");
  if (!fs.existsSync(csvPath)) continue;
  const lines = fs.readFileSync(csvPath, "utf-8").split("\n");
  allCandidates[state] = {};
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const parts = lines[i].split(";");
    const cargo = parts[14]
      .replace(/"/g, "")
      .replace("DEPUTADO DISTRITAL", "DEPUTADO ESTADUAL");
    const sq = parts[15].replace(/"/g, "");
    const num = parts[16].replace(/"/g, "");
    const nome = parts[17].replace(/"/g, "");
    const nomeUrna = parts[18].replace(/"/g, "");
    const partido = parts[26].replace(/"/g, "");
    const nomeColigacao = parts[33].replace(/"/g, "");
    const composicaoColigacao = parts[34].replace(/"/g, "");
    const foto = findFoto(sq);
    if (!allCandidates[state][cargo]) allCandidates[state][cargo] = [];
    allCandidates[state][cargo].push({
      sq,
      numero: num,
      nome,
      nomeUrna,
      partido,
      nomeColigacao,
      composicaoColigacao,
      foto,
    });
  }
}

// Build mappings
const governorViceByNum = {};
for (const state of states) {
  const vices = allCandidates[state]?.["VICE-GOVERNADOR"] || [];
  for (const v of vices) governorViceByNum[state + "_" + v.numero] = v;
}

const senatorSuplenteByNum = {};
for (const state of states) {
  const sup1 = allCandidates[state]?.["1\u00ba SUPLENTE"] || [];
  const sup2 = allCandidates[state]?.["2\u00ba SUPLENTE"] || [];
  for (const s of sup1) senatorSuplenteByNum[state + "_1_" + s.numero] = s;
  for (const s of sup2) senatorSuplenteByNum[state + "_2_" + s.numero] = s;
}

// Parse BR for presidents
const brCsvPath = path.join(dataDir, "consulta_cand_2026_BR.csv");
const brLines = fs.readFileSync(brCsvPath, "utf-8").split("\n");
const presidents = [];
const viceMap = {};
for (let i = 1; i < brLines.length; i++) {
  if (!brLines[i].trim()) continue;
  const parts = brLines[i].split(";");
  const cargo = parts[14].replace(/"/g, "");
  const sq = parts[15].replace(/"/g, "");
  const num = parts[16].replace(/"/g, "");
  const nome = parts[17].replace(/"/g, "");
  const nomeUrna = parts[18].replace(/"/g, "");
  const partido = parts[26].replace(/"/g, "");
  const nomeColigacao = parts[33].replace(/"/g, "");
  const composicaoColigacao = parts[34].replace(/"/g, "");
  const foto = findFoto(sq);
  if (cargo === "PRESIDENTE") {
    presidents.push({
      sq,
      numero: num,
      nome,
      nomeUrna,
      partido,
      nomeColigacao,
      composicaoColigacao,
      foto,
    });
  } else if (cargo === "VICE-PRESIDENTE") {
    viceMap[num] = { sq, nome, nomeUrna, partido, foto };
  }
}

// Load TSE API supplement
let tseSupplement = {};
if (process.env.TSE_API_DATA) {
  try {
    tseSupplement = JSON.parse(process.env.TSE_API_DATA);
    console.log("Loaded TSE API supplement");
  } catch (e) {}
}

function mergeTseData(csvArray, apiArray) {
  if (!apiArray || apiArray.length === 0) return csvArray;
  const existingNums = new Set(csvArray.map((c) => String(c.numero)));
  const merged = [...csvArray];
  for (const c of apiArray) {
    if (!existingNums.has(String(c.numero))) {
      merged.push({
        sq: String(c.id || c.sq),
        numero: String(c.numero),
        nome: c.nomeCompleto || c.nomeUrna || c.nome,
        nomeUrna: c.nomeUrna,
        partido: c.partido?.sigla || c.partido || "",
        nomeColigacao: c.nomeColigacao || "",
        composicaoColigacao: c.composicaoColigacao || "",
        foto: findFoto(String(c.id || c.sq)),
      });
    }
  }
  return merged;
}

// Merge API data
if (tseSupplement.BR?.PRESIDENTE) {
  const before = presidents.length;
  const merged = mergeTseData(presidents, tseSupplement.BR.PRESIDENTE);
  if (merged.length > before)
    console.log(`BR - PRESIDENTE: +${merged.length - before}`);
  presidents.length = 0;
  presidents.push(...merged);
}
if (tseSupplement.BR?.["VICE-PRESIDENTE"]) {
  for (const v of tseSupplement.BR["VICE-PRESIDENTE"]) {
    const num = String(v.numero);
    if (!viceMap[num]) {
      viceMap[num] = {
        sq: String(v.id || v.sq),
        nome: v.nomeCompleto || v.nomeUrna || v.nome,
        nomeUrna: v.nomeUrna,
        partido: v.partido?.sigla || v.partido || "",
        foto: findFoto(String(v.id || v.sq)),
      };
    }
  }
}
for (const state of states) {
  const api = tseSupplement[state] || {};
  for (const cargo of [
    "GOVERNADOR",
    "SENADOR",
    "DEPUTADO FEDERAL",
    "DEPUTADO ESTADUAL",
  ]) {
    if (api[cargo] && allCandidates[state]) {
      const before = (allCandidates[state][cargo] || []).length;
      allCandidates[state][cargo] = mergeTseData(
        allCandidates[state][cargo] || [],
        api[cargo],
      );
      const after = allCandidates[state][cargo].length;
      if (after > before)
        console.log(`${state} - ${cargo}: +${after - before}`);
    }
  }
}

// Collect all party abbreviations used
const allParties = new Set();
function addParty(sigla) {
  if (sigla) allParties.add(sigla.toUpperCase().trim());
}
presidents.forEach((c) => addParty(c.partido));
for (const state of states) {
  for (const cargo of [
    "GOVERNADOR",
    "SENADOR",
    "DEPUTADO FEDERAL",
    "DEPUTADO ESTADUAL",
  ]) {
    (allCandidates[state]?.[cargo] || []).forEach((c) => addParty(c.partido));
  }
}

// Generate candidatos.js
let js = "// ============================================\n";
js += "// DADOS DOS CANDIDATOS - ELEICOES 2026\n";
js += "// Fonte: TSE - dadosabertos.tse.jus.br\n";
js += "// Atualizado: " + new Date().toISOString().split("T")[0] + "\n";
js += "// ============================================\n\n";
js += "const ESTADOS = [\n  '" + states.join("','") + "'\n];\n\n";

const nomes = {
  AC: "Acre",
  AL: "Alagoas",
  AP: "Amapa",
  AM: "Amazonas",
  BA: "Bahia",
  CE: "Ceara",
  DF: "Distrito Federal",
  ES: "Espirito Santo",
  GO: "Goias",
  MA: "Maranhao",
  MT: "Mato Grosso",
  MS: "Mato Grosso do Sul",
  MG: "Minas Gerais",
  PA: "Para",
  PB: "Paraiba",
  PR: "Parana",
  PE: "Pernambuco",
  PI: "Piaui",
  RJ: "Rio de Janeiro",
  RN: "Rio Grande do Norte",
  RO: "Rondonia",
  RR: "Roraima",
  RS: "Rio Grande do Sul",
  SC: "Santa Catarina",
  SE: "Sergipe",
  SP: "Sao Paulo",
  TO: "Tocantins",
};
js += "const NOMES_ESTADOS = {\n";
for (const [k, v] of Object.entries(nomes).sort())
  js += "  '" + k + "':'" + v + "',\n";
js += "};\n\n";

// CANDIDATOS_PRESIDENTE
function getCandidateFields(c, t, role, state, extra = {}) {
  const fields = [
    "numero:" + c.numero,
    "nome:'" + (c.nome || "").replace(/'/g, "\\'") + "'",
    "nomeUrna:'" + (c.nomeUrna || "").replace(/'/g, "\\'") + "'",
    "partido:'" + (c.partido || "") + "'",
    "sqCandidato:'" + (c.sq || "") + "'",
    "foto:'" + (c.foto || "") + "'",
    "tendencia:'" + (t.tendencia || "") + "'",
    "tendenciaCor:'" + (t.cor || "#888") + "'",
    "tendenciaPct:" + (t.pct || 50),
    "linkPlano:'" + getTSELink(c.sq, state, role) + "'",
    "coligacao:'" + (c.nomeColigacao || "").replace(/'/g, "\\'") + "'",
    "composicaoColigacao:'" +
      (c.composicaoColigacao || "").replace(/'/g, "\\'") +
      "'",
    "vice:'" +
      (extra.vice
        ? extra.vice.nomeUrna.replace(/'/g, "\\'") +
          (extra.vice.partido ? ` (${extra.vice.partido})` : "")
        : extra.viceStr
          ? extra.viceStr.replace(/'/g, "\\'")
          : ""
      ).replace(/'/g, "\\'") +
      "'",
    "viceFoto:'" + (extra.vice ? extra.vice.foto || "" : "") + "'",
    "viceSq:'" + (extra.vice ? extra.vice.sq || "" : "") + "'",
    "viceNomeUrna:'" +
      (extra.vice ? extra.vice.nomeUrna.replace(/'/g, "\\'") || "" : "") +
      "'",
    "suplente1:'" +
      (extra.sup1 ? extra.sup1.nomeUrna.replace(/'/g, "\\'") : "") +
      "'",
    "suplente1Foto:'" + (extra.sup1 ? extra.sup1.foto || "" : "") + "'",
    "suplente1Sq:'" + (extra.sup1 ? extra.sup1.sq || "" : "") + "'",
    "suplente1NomeUrna:'" +
      (extra.sup1 ? extra.sup1.nomeUrna.replace(/'/g, "\\'") : "") +
      "'",
    "suplente2:'" +
      (extra.sup2 ? extra.sup2.nomeUrna.replace(/'/g, "\\'") : "") +
      "'",
    "suplente2Foto:'" + (extra.sup2 ? extra.sup2.foto || "" : "") + "'",
    "suplente2Sq:'" + (extra.sup2 ? extra.sup2.sq || "" : "") + "'",
    "suplente2NomeUrna:'" +
      (extra.sup2 ? extra.sup2.nomeUrna.replace(/'/g, "\\'") : "") +
      "'",
  ];
  return fields.join(", ");
}

js += "const CANDIDATOS_PRESIDENTE = [\n";
for (const p of presidents) {
  const vice = viceMap[p.numero];
  const viceStr = vice
    ? vice.nomeUrna + " (" + vice.partido + ")"
    : "A definir";
  const t = getTendency(p.partido);
  js +=
    "  {" +
    getCandidateFields(p, t, "PRESIDENTE", "BR", { vice, viceStr }) +
    "},\n";
}
js += "];\n\n";

// GOVERNADORES_POR_ESTADO
js += "const GOVERNADORES_POR_ESTADO = {\n";
for (const state of states) {
  const govs = allCandidates[state]?.["GOVERNADOR"] || [];
  js += "  '" + state + "': [\n";
  for (const g of govs) {
    const t = getTendency(g.partido);
    const vice = governorViceByNum[state + "_" + g.numero];
    js +=
      "    {" +
      getCandidateFields(g, t, "GOVERNADOR", state, { vice }) +
      "},\n";
  }
  js += "  ],\n";
}
js += "};\n\n";

// SENADORES_POR_ESTADO
js += "const SENADORES_POR_ESTADO = {\n";
for (const state of states) {
  const sens = allCandidates[state]?.["SENADOR"] || [];
  js += "  '" + state + "': [\n";
  for (const s of sens) {
    const t = getTendency(s.partido);
    const sup1 = senatorSuplenteByNum[state + "_1_" + s.numero];
    const sup2 = senatorSuplenteByNum[state + "_2_" + s.numero];
    js +=
      "    {" +
      getCandidateFields(s, t, "SENADOR", state, { sup1, sup2 }) +
      "},\n";
  }
  js += "  ],\n";
}
js += "};\n\n";

// DEPUTADOS_FEDERAIS_DESTAQUE
js += "const DEPUTADOS_FEDERAIS_DESTAQUE = {\n";
for (const state of states) {
  const deps = allCandidates[state]?.["DEPUTADO FEDERAL"] || [];
  js += "  '" + state + "': [\n";
  for (const d of deps) {
    const t = getTendency(d.partido);
    js +=
      "    {" + getCandidateFields(d, t, "DEPUTADO FEDERAL", state) + "},\n";
  }
  js += "  ],\n";
}
js += "};\n\n";

// DEPUTADOS_ESTADUAIS_DESTAQUE
js += "const DEPUTADOS_ESTADUAIS_DESTAQUE = {\n";
for (const state of states) {
  const deps = allCandidates[state]?.["DEPUTADO ESTADUAL"] || [];
  js += "  '" + state + "': [\n";
  for (const d of deps) {
    const t = getTendency(d.partido);
    js +=
      "    {" + getCandidateFields(d, t, "DEPUTADO ESTADUAL", state) + "},\n";
  }
  js += "  ],\n";
}
js += "};\n";

fs.writeFileSync(path.join(jsDir, "candidatos.js"), js, "utf-8");
console.log(
  "candidatos.js gerado (" +
    (fs.statSync(path.join(jsDir, "candidatos.js")).size / 1024 / 1024).toFixed(
      2,
    ) +
    " MB)",
);

// Generate partidos_logos.js
let pl = "// ============================================\n";
pl += "// LOGOTIPOS DOS PARTIDOS - ELEICOES 2026\n";
pl += "// Fonte: divulgacandcontas.tse.jus.br\n";
pl += "// ============================================\n\n";
pl += "const PARTIDOS_LOGOS = {\n";
// Helper to normalize sigla (remove diacritics)
const normalizeSigla = (s) =>
  (s || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toUpperCase();
for (const sigla of [...allParties].sort()) {
  const norm = normalizeSigla(sigla);
  const info = PARTIES[norm] || { nome: sigla, numero: 0, cor: "#888" };
  const logoName = norm === "PCDOB" ? "PCB" : norm === "UNIAO" ? "UNIAO" : norm;
  // original sigla entry
  pl += "  " + sigla + ": {\n";
  pl += '    nome: "' + info.nome + '",\n';
  pl +=
    '    logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/' +
    logoName +
    '.jpg",\n';
  pl += '    cor: "' + info.cor + '",\n';
  pl += "    numero: " + info.numero + ",\n";
  pl += "  },\n";
  // alias entry for normalized key if different
  if (norm !== sigla) {
    pl += "  " + norm + ": {\n";
    pl += '    nome: "' + info.nome + '",\n';
    pl +=
      '    logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/' +
      logoName +
      '.jpg",\n';
    pl += '    cor: "' + info.cor + '",\n';
    pl += "    numero: " + info.numero + ",\n";
    pl += "  },\n";
  }
}
pl += "};\n\n";
pl += `function getPartidoLogo(sigla) { return PARTIDOS_LOGOS[(sigla||"").toUpperCase().trim()]?.logo || ""; }
function getPartidoCor(sigla) { return PARTIDOS_LOGOS[(sigla||"").toUpperCase().trim()]?.cor || "#888"; }
function getPartidoNumero(sigla) { return PARTIDOS_LOGOS[(sigla||"").toUpperCase().trim()]?.numero || 0; }
function getPartidoNome(sigla) { return PARTIDOS_LOGOS[(sigla||"").toUpperCase().trim()]?.nome || sigla; }
`;

fs.writeFileSync(path.join(jsDir, "partidos_logos.js"), pl, "utf-8");
console.log("partidos_logos.js gerado");

// Count totals
let totalGov = 0,
  totalSen = 0,
  totalDepFed = 0,
  totalDepEst = 0;
for (const state of states) {
  totalGov += (allCandidates[state]?.["GOVERNADOR"] || []).length;
  totalSen += (allCandidates[state]?.["SENADOR"] || []).length;
  totalDepFed += (allCandidates[state]?.["DEPUTADO FEDERAL"] || []).length;
  totalDepEst += (allCandidates[state]?.["DEPUTADO ESTADUAL"] || []).length;
}
console.log(
  `\nResumo: ${presidents.length} presidentes, ${totalGov} governadores, ${totalSen} senadores, ${totalDepFed} dep.federais, ${totalDepEst} dep.estaduais`,
);
console.log(`Partidos: ${allParties.size}`);
