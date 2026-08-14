# Quiz Eleicoes 2026 - Alinhamento Politico

Quiz interativo de alinhamento politico para as Eleicoes 2026 do Brasil. O usuario responde perguntas sobre temas politicos e descobre sua posicao no espectro politico (Esquerda, Centro ou Direita), recebendo indicacoes de candidatos alinhados com suas views.

## Funcionalidades

- **Quiz de Alinhamento Politico**: Perguntas sobre economia, saude, educacao, seguranca, meio ambiente e costume
- **Calculo de Espectro**: Algoritmo que classifica o usuario em Esquerda, Centro ou Direita com percentual
- **Candidatos 2026**: Pagina com todos os candidatos por cargo (Presidente, Governador, Senador, Deputado Federal e Estadual)
- **Aba Partidos**: Visao geral de todos os partidos participantes com logos, numeros e tendencias
- **Dark Mode**: Suporte a tema claro e escuro
- **Pesquisas de Opiniao**: Grafico com dados de pesquisas para presidente
- **Dados do TSE**: Fonte oficial - Dados Abertos do Tribunal Superior Eleitoral

## Pre-requisitos

- [Node.js](https://nodejs.org/) (v14+)
- npm

## Instalacao

```bash
# Clonar o repositorio
git clone <url-do-repositorio>
cd eleicoes-2026

# Instalar dependencias
npm install

# Iniciar o servidor
npm start
```

O servidor iniciara em `http://localhost:3000`.

## Estrutura do Projeto

```
eleicoes-2026/
├── server.js                    # Servidor Express (porta 3000)
├── update.js                    # Script de atualizacao dos dados do TSE
├── generate_candidatos.js       # Gerador dos arquivos JS com dados dos candidatos
├── analyze_csv.js               # Analise dos CSVs do TSE
├── analyze_data.js              # Analise dos dados
├── check_vices.js               # Verificacao de vices
├── data_tmp/                    # CSVs baixados do TSE (gerado pelo update.js)
├── public/
│   ├── index.html               # Pagina principal com o Quiz
│   ├── candidatos.html          # Pagina de candidatos e partidos
│   ├── js/
│   │   ├── quiz.js              # Logica do quiz
│   │   ├── candidatos.js        # Dados de todos os candidatos (gerado)
│   │   └── partidos_logos.js    # Logos, cores e dados dos partidos (gerado)
│   ├── fotos/                   # Fotos dos candidatos
│   └── img/                     # Imagens estaticas
└── package.json
```

## Scripts

| Comando | Descricao |
|---------|-----------|
| `npm start` | Inicia o servidor de producao |
| `node update.js` | Baixa os dados atualizados do TSE (CSVs e fotos) |
| `node generate_candidatos.js` | Regenera os arquivos JS com dados dos candidatos |

## Atualizacao dos Dados

Para atualizar os dados com informacoes mais recentes do TSE:

```bash
node update.js
```

Ou pela API administrativa:

```bash
# Iniciar atualizacao
curl -X POST http://localhost:3000/admin/atualizar -H "Content-Type: application/json" -d '{"senha":"tseAtualizar"}'

# Consultar status
curl http://localhost:3000/admin/status
```

## Fonte dos Dados

- [Dados Abertos do TSE](https://dadosabertos.tse.jus.br/)
- [Divulga de Canditatas](https://divulgacandcontas.tse.jus.br/)

## Tecnologias

- **Frontend**: HTML, Tailwind CSS, JavaScript vanilla
- **Backend**: Node.js, Express
- **Dados**: CSVs do TSE (dadosabertos.tse.jus.br)
