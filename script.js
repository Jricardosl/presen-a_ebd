const tokenCorreto = "3236";

const urls = {
  "Adulto": "https://sheetdb.io/api/v1/1xync6z0w3igs/sheet/adulto",
  "Jovens": "https://sheetdb.io/api/v1/1xync6z0w3igs/sheet/jovens",
  "Adolescentes": "https://sheetdb.io/api/v1/1xync6z0w3igs/sheet/adolescentes",
  "TerceiraIdade": "https://sheetdb.io/api/v1/1xync6z0w3igs/sheet/terceiraidade",
  "Discipulado": "https://sheetdb.io/api/v1/1xync6z0w3igs/sheet/discipulado"
};

const form = document.getElementById("presencaForm");
const resposta = document.getElementById("resposta");

// Cria a barra de status de conexão
const statusConexao = document.createElement("div");
statusConexao.id = "statusConexao";
statusConexao.style.position = "fixed";
statusConexao.style.top = "0";
statusConexao.style.left = "0";
statusConexao.style.right = "0";
statusConexao.style.padding = "10px";
statusConexao.style.textAlign = "center";
statusConexao.style.zIndex = "999";
statusConexao.style.fontWeight = "bold";
document.body.prepend(statusConexao);

// Atualiza a barra de status de conexão
function atualizarStatusConexao() {
  if (!navigator.onLine) {
    statusConexao.textContent = "⚠️ Você está offline. Presenças serão salvas e enviadas quando reconectar.";
    statusConexao.style.background = "#ffb703";
  } else {
    statusConexao.textContent = "✅ Conectado. Presenças serão enviadas automaticamente.";
    statusConexao.style.background = "#219653";
    reenviarPendentes();
    setTimeout(() => {
      statusConexao.textContent = "";
    }, 3000);
  }
}

window.addEventListener("online", atualizarStatusConexao);
window.addEventListener("offline", atualizarStatusConexao);
document.addEventListener("DOMContentLoaded", atualizarStatusConexao);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const sala = document.getElementById("sala").value;
  const token = document.getElementById("token").value.trim();

  if (token !== tokenCorreto) {
    resposta.textContent = "❌ Token inválido. Tente novamente.";
    return;
  }

  const agora = new Date();
  const dados = {
    nome: nome,
    sala: sala,
    token: token,
    data: agora.toLocaleDateString("pt-BR"),
    hora: agora.toLocaleTimeString("pt-BR"),
  };

  if (!navigator.onLine) {
    salvarOffline(dados);
    resposta.textContent = "💾 Presença salva offline. Será enviada ao reconectar.";
    form.reset();
    return;
  }

  const sucesso = await enviarPresenca(dados);
  if (sucesso) {
    resposta.textContent = "✅ Presença registrada com sucesso!";
    form.reset();
  } else {
    salvarOffline(dados);
    resposta.textContent = "⚠️ Erro ao enviar. Presença salva para envio posterior.";
  }
});

// Envia os dados para a URL correta da sala
async function enviarPresenca(dados) {
  try {
    const url = urls[dados.sala];
    if (!url) return false;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [dados] }),
    });

    return response.ok;
  } catch (err) {
    console.error("Erro ao enviar presença:", err);
    return false;
  }
}

// Salva localmente
function salvarOffline(dados) {
  const pendentes = JSON.parse(localStorage.getItem("pendentes")) || [];
  pendentes.push(dados);
  localStorage.setItem("pendentes", JSON.stringify(pendentes));
}

// Reenvia as pendentes
async function reenviarPendentes() {
  const pendentes = JSON.parse(localStorage.getItem("pendentes")) || [];
  const enviados = [];

  for (const dados of pendentes) {
    const sucesso = await enviarPresenca(dados);
    if (sucesso) enviados.push(dados);
  }

  if (enviados.length > 0) {
    const restantes = pendentes.filter((d) => !enviados.includes(d));
    localStorage.setItem("pendentes", JSON.stringify(restantes));
    resposta.textContent = `✅ ${enviados.length} presença(s) enviadas automaticamente.`;
  }
}
