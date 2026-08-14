const express = require('express');
const path = require('path');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;
const SENHA_ATUALIZAR = 'tseAtualizar';

let atualizacaoEmAndamento = false;
let logsAtualizacao = [];

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

// Rota para iniciar atualizacao
app.post('/admin/atualizar', (req, res) => {
  const { senha } = req.body;
  if (senha !== SENHA_ATUALIZAR) {
    return res.status(401).json({ erro: 'Senha invalida' });
  }
  if (atualizacaoEmAndamento) {
    return res.status(409).json({ erro: 'Atualizacao ja em andamento' });
  }

  atualizacaoEmAndamento = true;
  logsAtualizacao = [];
  logsAtualizacao.push('[' + new Date().toLocaleString('pt-BR') + '] Iniciando atualizacao...');

  const child = spawn('node', ['update.js'], { cwd: __dirname, shell: true });

  child.stdout.on('data', (data) => {
    const lines = data.toString().split('\n').filter(l => l.trim());
    lines.forEach(line => logsAtualizacao.push(line));
  });

  child.stderr.on('data', (data) => {
    logsAtualizacao.push('[ERRO] ' + data.toString().trim());
  });

  child.on('close', (code) => {
    atualizacaoEmAndamento = false;
    logsAtualizacao.push('[' + new Date().toLocaleString('pt-BR') + '] Finalizado com codigo ' + code);
  });

  res.json({ ok: true, mensagem: 'Atualizacao iniciada' });
});

// Rota para consultar status/logs
app.get('/admin/status', (req, res) => {
  res.json({ emAndamento: atualizacaoEmAndamento, logs: logsAtualizacao });
});

// Rota para limpar logs
app.post('/admin/limpar-logs', (req, res) => {
  const { senha } = req.body;
  if (senha !== SENHA_ATUALIZAR) return res.status(401).json({ erro: 'Senha invalida' });
  logsAtualizacao = [];
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
