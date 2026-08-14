// ============================================
// LOGOTIPOS DOS PARTIDOS - ELEICOES 2026
// Fonte: divulgacandcontas.tse.jus.br
// ============================================

const PARTIDOS_LOGOS = {
  AGIR: {
    nome: "Agir",
    logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/AGIR.jpg",
    cor: "#FF6600",
    numero: 36,
  },
  AVANTE: {
    nome: "Avante",
    logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/AVANTE.jpg",
    cor: "#FF6600",
    numero: 70,
  },
  CIDADANIA: {
    nome: "Cidadania",
    logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/CIDADANIA.jpg",
    cor: "#FF6600",
    numero: 23,
  },
  DC: {
    nome: "DC",
    logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/DC.jpg",
    cor: "#FF6600",
    numero: 27,
  },
  DEMOCRATA: {
    nome: "Democrata",
    logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/DEMOCRATA.jpg",
    cor: "#003399",
    numero: 35,
  },
  MDB: {
    nome: "MDB",
    logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/MDB.jpg",
    cor: "#0066CC",
    numero: 15,
  },
  MISSÃO: {
    nome: "Missao",
    logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/MISSAO.jpg",
    cor: "#003399",
    numero: 14,
  },
  MOBILIZA: {
    nome: "Mobiliza",
    logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/MOBILIZA.jpg",
    cor: "#FF6600",
    numero: 33,
  },
  NOVO: {
    nome: "Novo",
    logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/NOVO.jpg",
    cor: "#FF6600",
    numero: 30,
  },
  PCB: {
    nome: "PCB",
    logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/PCB.jpg",
    cor: "#CC0000",
    numero: 21,
  },
  PCDOB: {
    nome: "PCdoB",
    logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/PCB.jpg",
    cor: "#CC0000",
    numero: 65,
  },
  PDT: {
    nome: "PDT",
    logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/PDT.jpg",
    cor: "#CC0000",
    numero: 12,
  },
  PL: {
    nome: "Partido Liberal",
    logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/PL.jpg",
    cor: "#003399",
    numero: 22,
  },
  PODE: {
    nome: "Podemos",
    logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/PODE.jpg",
    cor: "#003399",
    numero: 20,
  },
  PP: {
    nome: "Progressistas",
    logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/PP.jpg",
    cor: "#003399",
    numero: 11,
  },
  PRD: {
    nome: "PRD",
    logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/PRD.jpg",
    cor: "#003399",
    numero: 25,
  },
  PSB: {
    nome: "PSB",
    logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/PSB.jpg",
    cor: "#FF9900",
    numero: 40,
  },
  PSD: {
    nome: "PSD",
    logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/PSD.jpg",
    cor: "#FF6600",
    numero: 55,
  },
  PSDB: {
    nome: "PSDB",
    logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/PSDB.jpg",
    cor: "#0066CC",
    numero: 45,
  },
  PSOL: {
    nome: "PSOL",
    logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/PSOL.jpg",
    cor: "#CC0000",
    numero: 50,
  },
  PSTU: {
    nome: "PSTU",
    logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/PSTU.jpg",
    cor: "#CC0000",
    numero: 16,
  },
  PT: {
    nome: "Partido dos Trabalhadores",
    logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/PT.jpg",
    cor: "#CC0000",
    numero: 13,
  },
  PV: {
    nome: "Partido Verde",
    logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/PV.jpg",
    cor: "#009933",
    numero: 43,
  },
  REDE: {
    nome: "Rede",
    logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/REDE.jpg",
    cor: "#009933",
    numero: 18,
  },
  REPUBLICANOS: {
    nome: "Republicanos",
    logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/REPUBLICANOS.jpg",
    cor: "#003399",
    numero: 10,
  },
  SOLIDARIEDADE: {
    nome: "Solidariedade",
    logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/SOLIDARIEDADE.jpg",
    cor: "#FF6600",
    numero: 77,
  },
  UNIÃO: {
    nome: "Uniao Brasil",
    logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/UNIAO.jpg",
    cor: "#003399",
    numero: 44,
  },
  UP: {
    nome: "UP",
    logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/UP.jpg",
    cor: "#CC0000",
    numero: 80,
  },
  UNIAO: { nome: "Uniao Brasil", logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/UNIAO.jpg", cor: "#003399", numero: 44 },
  MISSAO: { nome: "Missao", logo: "https://divulgacandcontas.tse.jus.br/divulga/assets/images/partidos/MISSAO.jpg", cor: "#003399", numero: 14 },
};

function normalizeSigla(sigla) { return (sigla || "").normalize('NFD').replace(/\p{Diacritic}/gu, '').toUpperCase().trim(); }
function getPartidoLogo(sigla) { return PARTIDOS_LOGOS[(sigla||"" ).toUpperCase().trim()]?.logo || PARTIDOS_LOGOS[normalizeSigla(sigla)]?.logo || ""; }
function getPartidoCor(sigla) { return PARTIDOS_LOGOS[(sigla||"" ).toUpperCase().trim()]?.cor || PARTIDOS_LOGOS[normalizeSigla(sigla)]?.cor || "#888"; }
function getPartidoNumero(sigla) { return PARTIDOS_LOGOS[(sigla||"" ).toUpperCase().trim()]?.numero || PARTIDOS_LOGOS[normalizeSigla(sigla)]?.numero || 0; }
function getPartidoNome(sigla) { return PARTIDOS_LOGOS[(sigla||"" ).toUpperCase().trim()]?.nome || PARTIDOS_LOGOS[normalizeSigla(sigla)]?.nome || sigla; }
