const TOTAL_QUESTIONS = 15;

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".totalQuestions").forEach((span) => {
    span.textContent = TOTAL_QUESTIONS;
  });
});

const questions = [
  {
    id: 1,
    text: "Qual deve ser o papel das empresas estatais (como Petrobras e Correios) na economia?",
    options: [
      {
        letter: "A",
        text: "Devem ser ferramentas de investimento público e controle de preços estratégicos.",
        value: "A",
      },
      {
        letter: "B",
        text: "Devem ser mantidas sob controle do Estado, mas com gestão profissional e técnica.",
        value: "B",
      },
      {
        letter: "C",
        text: "O Estado deve manter apenas setores essenciais, abrindo espaço para parcerias público-privadas (PPPs).",
        value: "C",
      },
      {
        letter: "D",
        text: "A maioria deve ser privatizada para aumentar a eficiência e reduzir a corrupção.",
        value: "D",
      },
      {
        letter: "E",
        text: "O Estado não deve ser dono de empresas; todas devem ser privatizadas imediatamente.",
        value: "E",
      },
    ],
  },
  {
    id: 2,
    text: "Sobre a carga tributária e impostos no Brasil:",
    options: [
      {
        letter: "A",
        text: "É preciso taxar fortemente as grandes fortunas e lucros/dividendos para financiar o social.",
        value: "A",
      },
      {
        letter: "B",
        text: "Deve-se aumentar o imposto sobre a renda dos mais ricos e reduzir impostos sobre o consumo.",
        value: "B",
      },
      {
        letter: "C",
        text: "A prioridade deve ser uma reforma que simplifique o sistema (IVA) sem necessariamente reduzir a arrecadação.",
        value: "C",
      },
      {
        letter: "D",
        text: "É urgente reduzir os impostos sobre empresas e produção para gerar empregos.",
        value: "D",
      },
      {
        letter: "E",
        text: "O Estado deve ser reduzido ao mínimo para que os impostos sejam os menores possíveis para todos.",
        value: "E",
      },
    ],
  },
  {
    id: 3,
    text: "Em relação aos programas de transferência de renda (como o Bolsa Família):",
    options: [
      {
        letter: "A",
        text: "Devem ser ampliados e transformados em uma Renda Básica Universal permanente.",
        value: "A",
      },
      {
        letter: "B",
        text: "São essenciais para combater a fome, mas precisam de portas de saída e foco em educação.",
        value: "B",
      },
      {
        letter: "C",
        text: "Devem ser mantidos com rigor fiscal, focando apenas nos extremamente pobres.",
        value: "C",
      },
      {
        letter: "D",
        text: "Devem ser temporários, focando na qualificação para que o cidadão não dependa do Estado.",
        value: "D",
      },
      {
        letter: "E",
        text: "O foco deve ser a liberdade econômica; o crescimento do mercado naturalmente substituirá o auxílio.",
        value: "E",
      },
    ],
  },
  {
    id: 4,
    text: "Qual sua posição sobre a flexibilização do porte e posse de armas de fogo?",
    options: [
      {
        letter: "A",
        text: "Sou totalmente contrário; o Estado deve desarmar a população para reduzir a violência.",
        value: "A",
      },
      {
        letter: "B",
        text: "Defendo restrições rigorosas, permitindo apenas em casos muito específicos e técnicos.",
        value: "B",
      },
      {
        letter: "C",
        text: "Apoio o direito à posse (em casa), mas com controle rígido e critérios psicológicos/técnicos.",
        value: "C",
      },
      {
        letter: "D",
        text: "O cidadão comum tem o direito de se defender e o acesso deve ser facilitado.",
        value: "D",
      },
      {
        letter: "E",
        text: "É um direito fundamental de liberdade individual; qualquer cidadão apto deve poder portar armas.",
        value: "E",
      },
    ],
  },
  {
    id: 5,
    text: "Como o governo deve lidar com o Meio Ambiente e a Amazônia?",
    options: [
      {
        letter: "A",
        text: "Fiscalização rigorosa e tolerância zero ao desmatamento, priorizando povos indígenas.",
        value: "A",
      },
      {
        letter: "B",
        text: "Conciliar a preservação ambiental com o desenvolvimento sustentável e créditos de carbono.",
        value: "B",
      },
      {
        letter: "C",
        text: "O foco deve ser o cumprimento da lei ambiental, sem impedir o crescimento econômico regional.",
        value: "C",
      },
      {
        letter: "D",
        text: "A legislação ambiental é muito burocrática e atrapalha o agronegócio; precisa ser flexibilizada.",
        value: "D",
      },
      {
        letter: "E",
        text: "A soberania nacional sobre o território é absoluta e o desenvolvimento econômico deve ser o foco principal.",
        value: "E",
      },
    ],
  },
  {
    id: 6,
    text: "Sobre o Direito ao Aborto:",
    options: [
      {
        letter: "A",
        text: "Deve ser legalizado e tratado como uma questão de saúde pública e autonomia feminina.",
        value: "A",
      },
      {
        letter: "B",
        text: "Deve ser descriminalizado em mais casos além dos atuais (estupro, risco de vida e anencefalia).",
        value: "B",
      },
      {
        letter: "C",
        text: "Manutenção da lei atual, sem ampliar nem restringir os direitos já existentes.",
        value: "C",
      },
      {
        letter: "D",
        text: "Sou contrário à ampliação; o foco deve ser a defesa da vida desde a concepção.",
        value: "D",
      },
      {
        letter: "E",
        text: "Deve haver proibição total, inclusive nos casos atualmente permitidos por lei.",
        value: "E",
      },
    ],
  },
  {
    id: 7,
    text: "Qual o modelo ideal para a Educação Pública?",
    options: [
      {
        letter: "A",
        text: "Fortalecimento total das universidades federais e cotas sociais/raciais amplas.",
        value: "A",
      },
      {
        letter: "B",
        text: "Ensino integral e valorização salarial dos professores com recursos do pré-sal.",
        value: "B",
      },
      {
        letter: "C",
        text: "Incentivo ao ensino técnico e uso de 'vouchers' para que o governo pague escolas privadas aos pobres.",
        value: "C",
      },
      {
        letter: "D",
        text: "Foco na alfabetização básica e implementação de escolas cívico-militares.",
        value: "D",
      },
      {
        letter: "E",
        text: "Prioridade ao ensino básico, combate à 'doutrinação ideológica' e incentivo ao Homeschooling.",
        value: "E",
      },
    ],
  },
  {
    id: 8,
    text: "Qual deve ser a prioridade da Política Externa brasileira?",
    options: [
      {
        letter: "A",
        text: "Alinhamento com o Sul Global, fortalecimento do BRICS e Mercosul.",
        value: "A",
      },
      {
        letter: "B",
        text: "Pragmatismo total, buscando diálogo com todos os blocos (EUA, China, UE).",
        value: "B",
      },
      {
        letter: "C",
        text: "Focar na entrada do Brasil na OCDE e em acordos de livre comércio.",
        value: "C",
      },
      {
        letter: "D",
        text: "Alinhamento estratégico com democracias ocidentais e afastamento de ditaduras de esquerda.",
        value: "D",
      },
      {
        letter: "E",
        text: "Alinhamento prioritário com países conservadores e defesa de valores judaico-cristãos.",
        value: "E",
      },
    ],
  },
  {
    id: 9,
    text: "Em relação às Leis Trabalhistas:",
    options: [
      {
        letter: "A",
        text: "Revogação da reforma trabalhista de 2017 e fortalecimento dos sindicatos.",
        value: "A",
      },
      {
        letter: "B",
        text: "Manutenção de direitos básicos, mas adaptação para novas realidades (como entregadores de app).",
        value: "B",
      },
      {
        letter: "C",
        text: "Flexibilização moderada para reduzir o 'Custo Brasil' e estimular contratações.",
        value: "C",
      },
      {
        letter: "D",
        text: "O trabalhador e o patrão devem ter liberdade para negociar sem tanta interferência do Estado.",
        value: "D",
      },
      {
        letter: "E",
        text: "Mínima intervenção estatal; as leis atuais apenas geram desemprego e burocracia.",
        value: "E",
      },
    ],
  },
  {
    id: 10,
    text: "Qual a solução principal para a Segurança Pública?",
    options: [
      {
        letter: "A",
        text: "Investimento em inteligência e combate às causas sociais da criminalidade.",
        value: "A",
      },
      {
        letter: "B",
        text: "Integração das polícias e reforma do sistema prisional com foco em ressocialização.",
        value: "B",
      },
      {
        letter: "C",
        text: "Investimento em tecnologia, videomonitoramento e endurecimento de penas para crimes graves.",
        value: "C",
      },
      {
        letter: "D",
        text: "Apoio total às polícias, redução da maioridade penal e fim das 'saidinhas'.",
        value: "D",
      },
      {
        letter: "E",
        text: "Tolerância zero, policiamento ostensivo agressivo e excludente de ilicitude para policiais.",
        value: "E",
      },
    ],
  },
  {
    id: 11,
    text: "Sobre a reforma agrária e conflitos de terra:",
    options: [
      {
        letter: "A",
        text: "O governo deve desapropriar terras improdutivas e assentar famílias do MST.",
        value: "A",
      },
      {
        letter: "B",
        text: "Prioridade para a agricultura familiar com crédito e assistência técnica.",
        value: "B",
      },
      {
        letter: "C",
        text: "Regularização fundiária para dar títulos de propriedade a quem já está na terra.",
        value: "C",
      },
      {
        letter: "D",
        text: "Rigor absoluto contra invasões de terra e proteção total à propriedade privada.",
        value: "D",
      },
      {
        letter: "E",
        text: "Tipificação de invasões de terra como terrorismo e defesa armada das propriedades.",
        value: "E",
      },
    ],
  },
  {
    id: 12,
    text: "Como o Estado deve gerir o sistema de Saúde?",
    options: [
      {
        letter: "A",
        text: "Investimento exclusivo no SUS, eliminando a dependência de serviços privados.",
        value: "A",
      },
      {
        letter: "B",
        text: "Fortalecimento do SUS, mas permitindo que hospitais filantrópicos ajudem a reduzir filas.",
        value: "B",
      },
      {
        letter: "C",
        text: "Gestão eficiente do SUS através de Organizações Sociais (OS) e parcerias privadas.",
        value: "C",
      },
      {
        letter: "D",
        text: "Estímulo aos planos de saúde privados para desafogar o sistema público.",
        value: "D",
      },
      {
        letter: "E",
        text: "O Estado deve fornecer apenas o básico; a saúde deve ser majoritariamente privada e de livre escolha.",
        value: "E",
      },
    ],
  },
  {
    id: 13,
    text: "Qual sua opinião sobre a legalização das drogas (como a maconha)?",
    options: [
      {
        letter: "A",
        text: "Legalização total para fins recreativos e medicinais, com controle do Estado.",
        value: "A",
      },
      {
        letter: "B",
        text: "Descriminalização do porte para uso pessoal, tratando como questão de saúde.",
        value: "B",
      },
      {
        letter: "C",
        text: "Manutenção da proibição, mas com diferenciação clara entre usuário e traficante.",
        value: "C",
      },
      {
        letter: "D",
        text: "Sou contra qualquer tipo de flexibilização; as drogas destroem as famílias.",
        value: "D",
      },
      {
        letter: "E",
        text: "Endurecimento total das penas, inclusive para o usuário, para desencorajar o consumo.",
        value: "E",
      },
    ],
  },
  {
    id: 14,
    text: "Sobre a liberdade de expressão nas redes sociais:",
    options: [
      {
        letter: "A",
        text: "Deve haver regulação estatal rigorosa para combater Fake News e discursos de ódio.",
        value: "A",
      },
      {
        letter: "B",
        text: "Moderação por parte das plataformas sob supervisão do Judiciário.",
        value: "B",
      },
      {
        letter: "C",
        text: "Equilíbrio entre liberdade e punição de crimes já previstos em lei (calúnia, difamação).",
        value: "C",
      },
      {
        letter: "D",
        text: "Qualquer regulação é censura disfarçada; as plataformas devem ser livres.",
        value: "D",
      },
      {
        letter: "E",
        text: "Liberdade total e absoluta; o Estado não deve interferir no que é dito na internet.",
        value: "E",
      },
    ],
  },
  {
    id: 15,
    text: "Qual deve ser o teto de gastos do governo?",
    options: [
      {
        letter: "A",
        text: "O Estado deve ter liberdade para investir e gastar em momentos de crise, sem tetos rígidos.",
        value: "A",
      },
      {
        letter: "B",
        text: "Responsabilidade fiscal é importante, mas os gastos com saúde e educação devem ter pisos.",
        value: "B",
      },
      {
        letter: "C",
        text: "É necessário um controle de gastos rigoroso para manter a inflação baixa e atrair investidores.",
        value: "C",
      },
      {
        letter: "D",
        text: "O governo deve gastar apenas o que arrecada; o equilíbrio fiscal é a prioridade número um.",
        value: "D",
      },
      {
        letter: "E",
        text: "Corte drástico de gastos públicos e redução do tamanho da máquina do Estado.",
        value: "E",
      },
    ],
  },
  {
    id: 16,
    text: "Sobre as políticas de cotas em concursos e universidades:",
    options: [
      {
        letter: "A",
        text: "Devem ser ampliadas para incluir critérios raciais, sociais e de gênero.",
        value: "A",
      },
      {
        letter: "B",
        text: "São necessárias como reparação histórica, mas devem focar principalmente no critério social.",
        value: "B",
      },
      {
        letter: "C",
        text: "Devem ser mantidas apenas até que a desigualdade na educação básica seja resolvida.",
        value: "C",
      },
      {
        letter: "D",
        text: "Sou contrário a cotas raciais; o critério deve ser exclusivamente o mérito individual.",
        value: "D",
      },
      {
        letter: "E",
        text: "Cotas geram divisões na sociedade; a igualdade deve ser apenas perante a lei.",
        value: "E",
      },
    ],
  },
  {
    id: 17,
    text: "O que você pensa sobre a relação entre Religião e Estado?",
    options: [
      {
        letter: "A",
        text: "O Estado deve ser estritamente laico e combater qualquer influência religiosa em políticas públicas.",
        value: "A",
      },
      {
        letter: "B",
        text: "O Estado é laico, mas deve respeitar a diversidade religiosa e a cultura popular.",
        value: "B",
      },
      {
        letter: "C",
        text: "Os valores religiosos fazem parte da sociedade e podem inspirar leis, respeitando as minorias.",
        value: "C",
      },
      {
        letter: "D",
        text: "O Brasil é um país cristão e o governo deve governar de acordo com esses princípios.",
        value: "D",
      },
      {
        letter: "E",
        text: "Defesa intransigente dos valores da 'família tradicional' como base de todas as decisões do governo.",
        value: "E",
      },
    ],
  },
  {
    id: 18,
    text: "Qual sua visão sobre a exploração de petróleo e combustíveis fósseis?",
    options: [
      {
        letter: "A",
        text: "O Brasil deve liderar a transição energética e parar de investir em novas explorações.",
        value: "A",
      },
      {
        letter: "B",
        text: "Devemos usar o dinheiro do petróleo para financiar a transição para energias limpas.",
        value: "B",
      },
      {
        letter: "C",
        text: "A exploração deve continuar enquanto for lucrativa para financiar o desenvolvimento.",
        value: "C",
      },
      {
        letter: "D",
        text: "Precisamos explorar o máximo possível, inclusive na Margem Equatorial, para garantir soberania.",
        value: "D",
      },
      {
        letter: "E",
        text: "O foco deve ser o preço baixo na bomba para o cidadão, independentemente da fonte de energia.",
        value: "E",
      },
    ],
  },
  {
    id: 19,
    text: "Sobre o Supremo Tribunal Federal (STF):",
    options: [
      {
        letter: "A",
        text: "O STF é o guardião da democracia e deve atuar firmemente contra ameaças autoritárias.",
        value: "A",
      },
      {
        letter: "B",
        text: "O STF deve ser respeitado, mas os ministros deveriam ter mandatos com tempo determinado.",
        value: "B",
      },
      {
        letter: "C",
        text: "É preciso haver um equilíbrio maior entre os poderes, evitando interferências no Legislativo.",
        value: "C",
      },
      {
        letter: "D",
        text: "O Judiciário está cometendo abusos e 'ativismo'; é necessário limitar os poderes dos ministros.",
        value: "D",
      },
      {
        letter: "E",
        text: "Defendo o impeachment de ministros e uma reforma profunda para reduzir o poder do STF.",
        value: "E",
      },
    ],
  },
  {
    id: 20,
    text: "Qual o principal motor do desenvolvimento do Brasil?",
    options: [
      {
        letter: "A",
        text: "O investimento público pesado e o fortalecimento do mercado interno.",
        value: "A",
      },
      {
        letter: "B",
        text: "Uma economia mista com forte proteção social e justiça tributária.",
        value: "B",
      },
      {
        letter: "C",
        text: "A segurança jurídica, infraestrutura e abertura para o capital estrangeiro.",
        value: "C",
      },
      {
        letter: "D",
        text: "A livre iniciativa, o agronegócio e a redução da burocracia estatal.",
        value: "D",
      },
      {
        letter: "E",
        text: "O empreendedorismo individual livre de qualquer amarra ou regulação do governo.",
        value: "E",
      },
    ],
  },
];

let selectedQuestions = [];
let currentQuestion = 0;
let answers = [];
let shuffledOptionsMap = {};

// Theme Management
function initTheme() {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = saved ? saved === "dark" : prefersDark;
  document.documentElement.classList.toggle("dark", isDark);
  updateThemeIcon(isDark);
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
  document.getElementById("themeIcon").textContent = isDark ? "☀️" : "🌙";
}

document.getElementById("themeToggle").addEventListener("click", toggleTheme);
initTheme();

// Shuffle array (Fisher-Yates)
function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Quiz Functions
function startQuiz() {
  selectedQuestions = shuffleArray(questions).slice(0, TOTAL_QUESTIONS);
  answers = new Array(TOTAL_QUESTIONS).fill(null);
  currentQuestion = 0;
  shuffledOptionsMap = {};

  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("quizScreen").classList.remove("hidden");
  renderQuestion();
}

function renderQuestion() {
  const q = selectedQuestions[currentQuestion];
  document.getElementById("currentQ").textContent = currentQuestion + 1;
  document.getElementById("questionNumber").textContent = currentQuestion + 1;
  document.getElementById("questionText").textContent = q.text;

  const progress = (currentQuestion / TOTAL_QUESTIONS) * 100;
  document.getElementById("progressBar").style.width = progress + "%";
  document.getElementById("progressPercent").textContent =
    Math.round(progress) + "%";

  const container = document.getElementById("optionsContainer");
  container.innerHTML = "";

  // Shuffle options only once per question
  if (!shuffledOptionsMap[currentQuestion]) {
    shuffledOptionsMap[currentQuestion] = shuffleArray(q.options);
  }
  const shuffledOptions = shuffledOptionsMap[currentQuestion];

  shuffledOptions.forEach((opt, index) => {
    const isSelected = answers[currentQuestion] === opt.value;
    const card = document.createElement("div");
    card.className = `option-card p-4 rounded-xl border-2 cursor-pointer transition-all ${
      isSelected
        ? "border-primary-500 bg-primary-50 dark:bg-primary-900/30 shadow-md"
        : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-700/50"
    }`;
    card.onclick = () => selectOption(opt.value);

    card.innerHTML = `
      <div class="flex items-start gap-3">
        <span class="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
          isSelected
            ? "bg-primary-600 text-white"
            : "bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
        }">${index + 1}</span>
        <p class="text-sm md:text-base leading-relaxed">${opt.text}</p>
      </div>
    `;
    container.appendChild(card);
  });

  document
    .getElementById("prevBtn")
    .classList.toggle("hidden", currentQuestion === 0);
  const nextBtn = document.getElementById("nextBtn");
  if (currentQuestion === TOTAL_QUESTIONS - 1) {
    nextBtn.textContent = "Ver Resultado ✓";
    nextBtn.className =
      "px-6 py-3 rounded-xl font-medium bg-green-600 hover:bg-green-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  } else {
    nextBtn.textContent = "Próxima →";
    nextBtn.className =
      "px-6 py-3 rounded-xl font-medium bg-primary-600 hover:bg-primary-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  }

  document.getElementById("questionCard").classList.remove("slide-up");
  void document.getElementById("questionCard").offsetWidth;
  document.getElementById("questionCard").classList.add("slide-up");
}

function selectOption(value) {
  answers[currentQuestion] = value;
  renderQuestion();
  if (currentQuestion < TOTAL_QUESTIONS - 1) {
    setTimeout(() => nextQuestion(), 300);
  }
}

function nextQuestion() {
  if (currentQuestion < TOTAL_QUESTIONS - 1) {
    currentQuestion++;
    renderQuestion();
  } else if (answers.every((a) => a !== null)) {
    showResults();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
}

function calculateResults() {
  const scores = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  answers.forEach((answer) => {
    if (answer) scores[answer]++;
  });

  const answered = answers.filter((a) => a !== null).length;
  const leftScore = scores.A + scores.B;
  const centerScore = scores.C;
  const rightScore = scores.D + scores.E;

  let position;
  if (leftScore > rightScore && leftScore > centerScore) {
    position = scores.A > scores.B ? 20 : 35;
  } else if (rightScore > leftScore && rightScore > centerScore) {
    position = scores.E > scores.D ? 85 : 70;
  } else {
    position = 50;
  }

  if (scores.A >= 7) position = 10;
  else if (scores.E >= 7) position = 90;
  else if (leftScore >= 10) position = 20;
  else if (rightScore >= 10) position = 80;
  else if (centerScore >= 7) position = 50;

  return { scores, position, leftScore, centerScore, rightScore, answered };
}

function getResultInfo(scores, leftScore, centerScore, rightScore) {
  if (scores.A >= 8) {
    return {
      title: "Esquerda Radical",
      description:
        "Você se identifica fortemente com posições de esquerda progressista.",
      color: "#dc2626",
    };
  } else if (scores.A >= 6 && leftScore > rightScore) {
    return {
      title: "Esquerda / Progressista",
      description:
        "Suas respostas indicam uma tendência clara ao espectro de esquerda.",
      color: "#ff4444",
    };
  } else if (scores.E >= 8) {
    return {
      title: "Direita Conservadora",
      description:
        "Você se identifica fortemente com posições de direita conservadora.",
      color: "#2563eb",
    };
  } else if (scores.D >= 6 && rightScore > leftScore) {
    return {
      title: "Direita / Liberal",
      description:
        "Suas respostas indicam uma tendência clara ao espectro de direita.",
      color: "#3b82f6",
    };
  } else if (centerScore >= 7) {
    return {
      title: "Centro / Liberal-Social",
      description:
        "Suas posições indicam um equilíbrio entre progressismo e conservadorismo.",
      color: "#eab308",
    };
  } else if (leftScore > rightScore && leftScore > centerScore) {
    return {
      title: "Centro-Esquerda",
      description:
        "Você tende ao centro, mas com inclinação para propostas progressistas.",
      color: "#f97316",
    };
  } else if (rightScore > leftScore && rightScore > centerScore) {
    return {
      title: "Centro-Direita",
      description:
        "Você tende ao centro, mas com inclinação para propostas liberais-conservadoras.",
      color: "#0ea5e9",
    };
  } else {
    return {
      title: "Centro Moderado",
      description: "Suas posições equilibram diferentes espectros políticos.",
      color: "#eab308",
    };
  }
}

function getTopicName(questionId) {
  const topicMap = {
    1: "Empresas Estatais",
    2: "Tributação",
    3: "Transferência de Renda",
    4: "Armas de Fogo",
    5: "Meio Ambiente",
    6: "Direito ao Aborto",
    7: "Educação",
    8: "Política Externa",
    9: "Leis Trabalhistas",
    10: "Segurança Pública",
    11: "Reforma Agrária",
    12: "Saúde",
    13: "Drogas",
    14: "Liberdade de Expressão",
    15: "Teto de Gastos",
    16: "Cotas",
    17: "Religião e Estado",
    18: "Petróleo/Fósseis",
    19: "STF",
    20: "Desenvolvimento",
  };
  return topicMap[questionId] || "Tema";
}

function showResults() {
  const { scores, position, leftScore, centerScore, rightScore } =
    calculateResults();
  const resultInfo = getResultInfo(scores, leftScore, centerScore, rightScore);

  // Calculate percentage based on dominant spectrum
  const total = leftScore + centerScore + rightScore;
  let percentage = 0;
  if (leftScore >= centerScore && leftScore >= rightScore) {
    percentage = Math.round((leftScore / total) * 100);
  } else if (rightScore >= centerScore && rightScore >= leftScore) {
    percentage = Math.round((rightScore / total) * 100);
  } else {
    percentage = Math.round((centerScore / total) * 100);
  }

  document.getElementById("quizScreen").classList.add("hidden");
  document.getElementById("resultsScreen").classList.remove("hidden");
  document.getElementById("detailsSection").classList.add("hidden");
  document.getElementById("detailsToggleText").textContent =
    "Ver detalhes do resultado";
  document.getElementById("detailsArrow").style.transform = "rotate(0deg)";

  document.getElementById("progressBar").style.width = "100%";
  document.getElementById("progressPercent").textContent = "100%";

  setTimeout(() => {
    document.getElementById("spectrumMarker").style.left = position + "%";
  }, 300);

  document.getElementById("resultTitle").textContent = resultInfo.title;
  document.getElementById("resultPercentage").textContent = percentage + "%";

  document.getElementById("scoreLeft").textContent = leftScore;
  document.getElementById("scoreCenter").textContent = centerScore;
  document.getElementById("scoreRight").textContent = rightScore;

  const analysisDiv = document.getElementById("analysisContent");
  analysisDiv.innerHTML = "";

  selectedQuestions.forEach((q, index) => {
    const answer = answers[index];
    if (!answer) return;

    const topic = getTopicName(q.id);
    let alignment, color;
    if (["A", "B"].includes(answer)) {
      alignment = "Esquerda";
      color = "text-red-500";
    } else if (answer === "C") {
      alignment = "Centro";
      color = "text-yellow-500";
    } else {
      alignment = "Direita";
      color = "text-blue-500";
    }

    const row = document.createElement("div");
    row.className =
      "flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-600 last:border-0";
    row.innerHTML = `
      <span class="font-medium">${index + 1}. ${topic}</span>
      <span class="${color} font-semibold">${alignment}</span>
    `;
    analysisDiv.appendChild(row);
  });

  // Show matching candidates
  renderMatchingCandidates(position);
  initResultEstados();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Global variable to store user position
let userPositionGlobal = 50;

function renderMatchingCandidates(userPosition) {
  userPositionGlobal = userPosition;

  // Render Presidente
  const containerPres = document.getElementById("matchingPresidente");
  if (containerPres && typeof CANDIDATOS_PRESIDENTE !== "undefined") {
    const candidates = CANDIDATOS_PRESIDENTE.map((c) => {
      const diff = Math.abs(c.tendenciaPct - userPosition);
      const match = Math.max(0, 100 - diff);
      return { ...c, match };
    })
      .sort((a, b) => b.match - a.match)
      .slice(0, 2);

    containerPres.innerHTML = candidates
      .map((c) => renderCandidateCard(c, c.tendenciaCor || "#3b82f6"))
      .join("");
  }
}

function initResultEstados() {
  const select = document.getElementById("resultEstadoSelect");
  if (!select || typeof ESTADOS === "undefined") return;
  select.innerHTML = '<option value="">Selecione o estado</option>';
  ESTADOS.forEach((uf) => {
    const opt = document.createElement("option");
    opt.value = uf;
    opt.textContent = `${uf} - ${NOMES_ESTADOS[uf]}`;
    select.appendChild(opt);
  });
}

function renderLocalCandidates() {
  const uf = document.getElementById("resultEstadoSelect").value;
  if (!uf) {
    [
      "matchingGovernador",
      "matchingSenador",
      "matchingDepFederal",
      "matchingDepEstadual",
    ].forEach((id) => {
      document.getElementById(id).innerHTML =
        '<p class="text-xs text-gray-400 italic">Selecione o estado acima</p>';
    });
    return;
  }

  // Governador
  const govContainer = document.getElementById("matchingGovernador");
  if (
    typeof GOVERNADORES_POR_ESTADO !== "undefined" &&
    GOVERNADORES_POR_ESTADO[uf]
  ) {
    const govList = GOVERNADORES_POR_ESTADO[uf]
      .map((c) => {
        const cor = c.tendenciaCor ? c.tendenciaCor : "#888";
        const diff = Math.abs(c.tendenciaPct - userPositionGlobal);
        const match = Math.max(0, 100 - diff);
        return { ...c, tendenciaCor: cor, match };
      })
      .sort((a, b) => b.match - a.match)
      .slice(0, 2);
    govContainer.innerHTML = govList
      .map((c) => renderCandidateCard(c, c.tendenciaCor))
      .join("");
  } else {
    govContainer.innerHTML =
      '<p class="text-xs text-gray-400">Sem dados para este estado</p>';
  }

  // Senador
  const senContainer = document.getElementById("matchingSenador");
  if (typeof SENADORES_POR_ESTADO !== "undefined" && SENADORES_POR_ESTADO[uf]) {
    const senList = SENADORES_POR_ESTADO[uf]
      .map((c) => {
        const cor = c.tendenciaCor ? c.tendenciaCor : "#888";
        const tendenciaPct = c.tendencia.includes("Esquerda")
          ? 20
          : c.tendencia.includes("Centro")
            ? 45
            : c.tendencia.includes("Direita")
              ? 70
              : 45;
        const diff = Math.abs(tendenciaPct - userPositionGlobal);
        const match = Math.max(0, 100 - diff);
        return { ...c, tendenciaPct, tendenciaCor: cor, match };
      })
      .sort((a, b) => b.match - a.match)
      .slice(0, 2);
    senContainer.innerHTML = senList
      .map((c) => renderCandidateCard(c, c.tendenciaCor))
      .join("");
  } else {
    senContainer.innerHTML =
      '<p class="text-xs text-gray-400">Sem dados para este estado</p>';
  }

  // Deputado Federal
  const depFedContainer = document.getElementById("matchingDepFederal");
  if (
    typeof DEPUTADOS_FEDERAIS_DESTAQUE !== "undefined" &&
    DEPUTADOS_FEDERAIS_DESTAQUE[uf]
  ) {
    const depList = DEPUTADOS_FEDERAIS_DESTAQUE[uf]
      .map((c) => {
        const cor = c.tendencia.includes("Esquerda")
          ? "#ff4444"
          : c.tendencia.includes("Centro")
            ? "#eab308"
            : "#3b82f6";
        const tendenciaPct = c.tendencia.includes("Esquerda")
          ? 20
          : c.tendencia.includes("Centro")
            ? 45
            : c.tendencia.includes("Direita")
              ? 70
              : 45;
        const diff = Math.abs(tendenciaPct - userPositionGlobal);
        const match = Math.max(0, 100 - diff);
        return { ...c, tendenciaPct, tendenciaCor: cor, match };
      })
      .sort((a, b) => b.match - a.match)
      .slice(0, 3);
    depFedContainer.innerHTML = depList
      .map((c) => renderCandidateCard(c, c.tendenciaCor))
      .join("");
  } else {
    depFedContainer.innerHTML =
      '<p class="text-xs text-gray-400">Sem dados para este estado</p>';
  }

  // Deputado Estadual
  const depEstContainer = document.getElementById("matchingDepEstadual");
  if (
    typeof DEPUTADOS_ESTADUAIS_DESTAQUE !== "undefined" &&
    DEPUTADOS_ESTADUAIS_DESTAQUE[uf]
  ) {
    const depList = DEPUTADOS_ESTADUAIS_DESTAQUE[uf]
      .map((c) => {
        const cor = c.tendencia.includes("Esquerda")
          ? "#ff4444"
          : c.tendencia.includes("Centro")
            ? "#eab308"
            : "#3b82f6";
        const tendenciaPct = c.tendencia.includes("Esquerda")
          ? 20
          : c.tendencia.includes("Centro")
            ? 45
            : c.tendencia.includes("Direita")
              ? 70
              : 45;
        const diff = Math.abs(tendenciaPct - userPositionGlobal);
        const match = Math.max(0, 100 - diff);
        return { ...c, tendenciaPct, tendenciaCor: cor, match };
      })
      .sort((a, b) => b.match - a.match)
      .slice(0, 5);
    depEstContainer.innerHTML = depList
      .map((c) => renderCandidateCard(c, c.tendenciaCor))
      .join("");
  } else {
    depEstContainer.innerHTML =
      '<p class="text-xs text-gray-400">Sem dados para este estado</p>';
  }
}

function renderCandidateCard(c, cor) {
  const matchColor =
    c.match >= 70
      ? "text-green-600 dark:text-green-400"
      : c.match >= 50
        ? "text-yellow-600 dark:text-yellow-400"
        : "text-gray-500 dark:text-gray-400";

  const linkTSE = c.linkPlano
    ? `<a href="${c.linkPlano}" target="_blank" rel="noopener" class="text-blue-600 dark:text-blue-400 text-xs hover:underline">Saiba mais no TSE</a>`
    : "";
  const fotoUrl = c.foto || "";
  const fotoHtml = fotoUrl
    ? `<img src="${fotoUrl}" alt="${c.nome}" class="w-10 h-10 rounded-full object-cover border-2 flex-shrink-0" style="border-color:${cor}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="w-10 h-10 rounded-full items-center justify-center text-white font-bold text-xs border-2 flex-shrink-0 hidden" style="background:${cor}">${c.nome
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)}</div>`
    : `<div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs border-2 flex-shrink-0" style="background:${cor}">${c.nome
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)}</div>`;

  const numeroHtml = c.numero
    ? `<span class="text-xs font-mono px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">${c.numero}</span>`
    : "";
  const partidoLogo =
    typeof getPartidoLogo === "function" ? getPartidoLogo(c.partido) : "";
  const partidoNome =
    typeof getPartidoNome === "function" ? getPartidoNome(c.partido) : "";
  const partidoHtml = partidoLogo
    ? `<div class="w-32 text-center"><img src="${partidoLogo}" alt="${c.partido}" class="h-10 w-auto rounded mx-auto" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline'"><span class="text-[10px] font-medium" style="color:${c.tendenciaCor}; display:inline">${partidoNome}</span></div>`
    : "";

  return `
    <div class="bg-white dark:bg-gray-800 rounded-xl p-3 flex items-center gap-3" style="border:2px solid ${cor}">
      ${fotoHtml}
      <div class="flex-2 min-w-0">
        
        <div class="flex items-center gap-1 flex-wrap">
          <span class="font-bold text-sm truncate">${c.nomeUrna}</span>
          ${numeroHtml}
        </div>
        <div class="flex items-center gap-1 flex-wrap">
          ${linkTSE}<br>
          <span class="text-xs text-gray-500">${c.tendencia}</span>
        </div>
      </div>
      <div class="ml-auto flex items-center gap-2 flex-shrink-0">
        ${partidoHtml}
        <div class="w-16 text-center">
          <div class="text-lg font-extrabold ${matchColor}">${c.match}%</div>
          <div class="text-[10px] text-gray-400">match</div>
        </div>
      </div>
    </div>
  `;
}

function toggleDetails() {
  const section = document.getElementById("detailsSection");
  const text = document.getElementById("detailsToggleText");
  const arrow = document.getElementById("detailsArrow");

  if (section.classList.contains("hidden")) {
    section.classList.remove("hidden");
    text.textContent = "Ocultar detalhes";
    arrow.style.transform = "rotate(180deg)";
  } else {
    section.classList.add("hidden");
    text.textContent = "Ver detalhes do resultado";
    arrow.style.transform = "rotate(0deg)";
  }
}

function restartQuiz() {
  currentQuestion = 0;
  selectedQuestions = [];
  answers = [];
  document.getElementById("resultsScreen").classList.add("hidden");
  document.getElementById("startScreen").classList.remove("hidden");
  document.getElementById("progressBar").style.width = "0%";
  document.getElementById("progressPercent").textContent = "0%";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function shareResult() {
  const { scores, leftScore, centerScore, rightScore } = calculateResults();
  const resultInfo = getResultInfo(scores, leftScore, centerScore, rightScore);

  const total = leftScore + centerScore + rightScore;
  let percentage = 0;
  if (leftScore >= centerScore && leftScore >= rightScore) {
    percentage = Math.round((leftScore / total) * 100);
  } else if (rightScore >= centerScore && rightScore >= leftScore) {
    percentage = Math.round((rightScore / total) * 100);
  } else {
    percentage = Math.round((centerScore / total) * 100);
  }

  const text = `Quiz Eleições 2026 - Meu Alinhamento Político\n\n${resultInfo.title}\n${percentage}% de acordo\n\nEsquerda: ${leftScore} | Centro: ${centerScore} | Direita: ${rightScore}`;

  if (navigator.share) {
    navigator.share({ title: "Quiz Eleições 2026", text });
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      alert("Resultado copiado para a área de transferência!");
    });
  }
}

renderQuestion();
