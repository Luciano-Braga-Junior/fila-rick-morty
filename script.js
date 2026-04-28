let fila = [];

// Atualiza a lista na tela
function atualizarFila() {
  const lista = document.getElementById("fila");
  lista.innerHTML = "";

  fila.forEach((nome) => {
    let li = document.createElement("li");
    li.textContent = nome;
    lista.appendChild(li);
  });
}

// Adiciona na fila (FIFO)
function adicionarFila() {
  const input = document.getElementById("nome");
  const nome = input.value.trim();

  if (nome === "") {
    alert("Digite um nome!");
    return;
  }

  fila.push(nome);
  input.value = "";

  atualizarFila();
}

// Remove da fila (FIFO) e chama API
async function atender() {
  if (fila.length === 0) {
    alert("Fila vazia!");
    return;
  }

  const nome = fila.shift(); // FIFO

  atualizarFila();

  buscarPersonagem(nome);
}

// API Rick and Morty
async function buscarPersonagem(nome) {
  try {
    const resposta = await fetch(`https://rickandmortyapi.com/api/character/?name=${nome}`);
    const dados = await resposta.json();

    const personagem = dados.results[0];

    document.getElementById("personagem").innerHTML = `
      <h2>${personagem.name}</h2>
      <img src="${personagem.image}" width="200">
      <p>Status: ${personagem.status}</p>
      <p>Espécie: ${personagem.species}</p>
    `;
  } catch (erro) {
    document.getElementById("personagem").innerHTML = `
      <p>Personagem não encontrado.</p>
    `;
  }
}