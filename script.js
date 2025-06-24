const tokenCorreto = "3236"; // Seu token do dia

const urls = {
  "Adulto": "https://sheetdb.io/api/v1/1xync6z0w3igs",
  "Jovens": "https://sheetdb.io/api/v1/1xync6z0w3igs",
  "Adolescentes": "https://sheetdb.io/api/v1/1xync6z0w3igs",
  "TerceiraIdade": "https://sheetdb.io/api/v1/1xync6z0w3igs",
  "Discipulado": "https://sheetdb.io/api/v1/1xync6z0w3igs"
};

document.getElementById('presencaForm').addEventListener('submit', e => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const sala = document.getElementById('sala').value;
  const token = document.getElementById('token').value.trim();

  if (token !== tokenCorreto) {
    document.getElementById('resposta').innerText = '❌ Token inválido. Tente novamente.';
    return;
  }

  const agora = new Date();
  const data = agora.toLocaleDateString('pt-BR');
  const hora = agora.toLocaleTimeString('pt-BR');

  const dados = {
    nome: nome,
    sala: sala,
    token: token,
    data: data,
    hora: hora
  };

  const scriptURL = urls[sala];

  if (!scriptURL) {
    document.getElementById('resposta').innerText = '❌ Sala não encontrada. Verifique a configuração.';
    return;
  }

  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify({
      data: [dados],
      sheet: sala // Define a aba para o SheetDB
    }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => {
    if (res.ok) {
      document.getElementById('resposta').innerText = '✅ Presença registrada com sucesso!';
      e.target.reset();
    } else {
      document.getElementById('resposta').innerText = '❌ Erro ao registrar presença!';
    }
  })
  .catch(err => {
    document.getElementById('resposta').innerText = '❌ Falha ao conectar.';
    console.error(err);
  });
});
