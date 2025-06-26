
const tokenCorreto = "3236";

const urlGeral = "https://sheetdb.io/api/v1/1xync6z0w3igs";

const form = document.getElementById("presencaForm");
const resposta = document.getElementById("resposta");
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

function atualizarStatusConexao() {
  if (!navigator.onLine) {
    statusConexao.textContent = "⚠️ Você está offline. Conecte-se para registrar presença.";
    statusConexao.style.background = "#ffb703";
  } else {
    statusConexao.textContent = "✅ Conectado. Presenças podem ser registradas.";
    statusConexao.style.background = "#219653";
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

  if (!navigator.onLine) {
    resposta.textContent = "⚠️ Sem conexão com a internet. Presença não registrada.";
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

  const sucesso = await enviarPresenca(dados);
  if (sucesso) {
    resposta.textContent = "✅ Presença registrada com sucesso!";
    form.reset();
  } else {
    resposta.textContent = "❌ Erro ao enviar presença. Verifique a internet e tente novamente.";
  }
});

async function enviarPresenca(dados) {
  try {
    const url = urlGeral;
    if (!url) {
      console.error("❌ Sala não encontrada:", dados.sala);
      return false;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [dados] })
    });

    const textoResposta = await response.text();
    console.log("Status da resposta:", response.status);
    console.log("Conteúdo da resposta:", textoResposta);

    if (!response.ok) {
      throw new Error(`Erro HTTP ${response.status}`);
    }

    return true;
  } catch (err) {
    console.error("❌ Erro ao enviar presença:", err);
    return false;
  }
}
