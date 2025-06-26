# 📖 Frequência EBD – Igreja do Nazareno

Sistema simples e funcional de registro de presença da **Escola Bíblica Dominical**, desenvolvido como Progressive Web App (PWA).

---

## ✨ Funcionalidades

- Registro de presença por nome, sala e token do dia
- Responsivo para celular e computador
- Logo da Igreja do Nazareno no topo
- Pode ser instalado como app (PWA)
- Layout moderno com efeito vidro (glassmorphism)

---

## 🖼️ Interface

![Interface da tela](imagens/Nazareno.png)

---

## 📂 Estrutura do Projeto

```
/presenca-ebd
├── index.html
├── style.css
├── script.js
├── manifest.json
├── service-worker.js
├── icon-192.png
├── icon-512.png
└── imagens/
    └── Nazareno.png
```

---

## 🚀 Como testar

1. Clone o repositório:
   ```bash
   git clone https://github.com/Jricardosl/presen-a_ebd.git
   cd presen-a_ebd
   ```

2. Abra o arquivo `index.html` no navegador  
   (ou publique no [Netlify](https://app.netlify.com/drop) para testar como PWA)

3. No celular, toque em "Instalar app" para adicionar à tela inicial.

---

## 📱 Sobre o PWA

O projeto utiliza:
- `manifest.json` para configurar o nome e ícone do app
- `service-worker.js` para funcionamento offline
- Ícones personalizados com as letras **EDB**

📊 Integração com Google Sheets
Todos os registros são enviados para uma aba chamada Geral em uma planilha do Google Sheets conectada via SheetDB.io.

As presenças são separadas automaticamente por sala (Adulto, Jovens, Adolescentes, etc.) usando a função FILTER do Google Sheets:

Excel
=FILTER(Geral!A:E; Geral!B:B = "Jovens")

Cada aba da planilha representa uma sala específica e é alimentada com os dados da aba "Geral", evitando múltiplas conexões externas e facilitando a organização dos dados.

☁️ Exemplo de separação automática por sala

| Nome        | Sala   | Token | Data       | Hora     |
| ----------- | ------ | ----- | ---------- | -------- |
| Maria Souza | Jovens | 3236  | 23/06/2025 | 09:01:02 |
| João Santos | Adulto | 3236  | 23/06/2025 | 09:05:33 |

Esses dados são enviados para a aba "Geral" e automaticamente filtrados para as demais abas conforme a sala informada.
---

## 🙏 Feito com propósito

Este projeto é usado pela **Igreja do Nazareno – Pau Amarelo** para organizar com excelência a presença dos alunos na EBD.

---
