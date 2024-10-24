// Define os candidatos e inicializa a contagem de votos usando LocalStorage
let candidatos = {
  21: { nome: 'Vitor Sekido Nunes', votos: 0, imagem: './images/vitor-sekido-nunes.jpg' },
  34: { nome: 'Luis Amorim Rosa', votos: 0, imagem: './images/luis-amorim-rosa.jpg' },
  24: { nome: 'Toddynho', votos: 0, imagem: './images/toddynho.jpg' },
  88: { nome: 'Dante Agostinho', votos: 0, imagem: './images/dante-agostinho.jpg' }
};

let votosBrancos = 0;
let numeroVoto = '';
let confirmVotoElement = document.querySelector('.js-confirm-voto');

function carregarVotos() {
  let votosSalvos = localStorage.getItem('votosCandidatos');
  let brancosSalvos = localStorage.getItem('votosBrancos');
  
  if (votosSalvos) {
      candidatos = JSON.parse(votosSalvos);
  }
  
  if (brancosSalvos) {
      votosBrancos = parseInt(brancosSalvos);
  }
}

// Salva os votos no LocalStorage
function salvarVotos() {
  localStorage.setItem('votosCandidatos', JSON.stringify(candidatos));
  localStorage.setItem('votosBrancos', votosBrancos.toString());
}

// Funções para a tela de votação
function digitar(numero) {
  if (numeroVoto.length < 2) {
      numeroVoto += numero;
      document.getElementById('numeroCandidato').value = numeroVoto;

      if (numeroVoto.length === 2) {
          mostrarCandidato();
      }
  }
}

function mostrarCandidato() {
  const candidato = candidatos[numeroVoto];
  const detalhesDiv = document.getElementById('detalhesCandidato');

  if (candidato) {
      detalhesDiv.innerHTML = `
          <p>Nome: ${candidato.nome}</p>
          <img src="${candidato.imagem}" alt="${candidato.nome}" />
      `;
  } else {
      detalhesDiv.innerHTML = '<p>Número inválido</p>';
  }
}

function corrige() {
  numeroVoto = '';
  document.getElementById('numeroCandidato').value = '';
  document.getElementById('detalhesCandidato').innerHTML = '';
}

function votoBranco() {
  corrige();
  votosBrancos++;
  salvarVotos();
  confirmVotoElement.innerHTML = `Voto em branco confirmado <span class="check"> &check; </span>`;
  confirmaSom();
  setTimeout(() => {
    confirmVotoElement.innerHTML = '';
  }, 1500)
  atualizarContagem();
}

function confirma() {
  if (numeroVoto.length === 2) {
      const candidato = candidatos[numeroVoto];
      if (candidato) {
          candidato.votos++;
          salvarVotos();
          confirmVotoElement.innerHTML = `Voto confirmado para ${candidato.nome} <span class="check"> &check; </span>`;
          confirmaSom();
          setTimeout(() => {
            confirmVotoElement.innerHTML = '';
          }, 2000)
      } else {
          alert('Número inválido, voto não registrado.');
      }
  } else {
      alert('Digite um número de candidato válido.');
  }
  corrige();
  atualizarContagem();
}

// Funções para a tela de contagem de votos
function atualizarContagem() {
  carregarVotos();
  const tabelaVotos = document.getElementById('tabelaVotos');
  tabelaVotos.innerHTML = '';

  for (const numero in candidatos) {
      const candidato = candidatos[numero];
      tabelaVotos.innerHTML += `
          <tr>
              <td>${candidato.nome}</td>
              <td>${candidato.votos}</td>
          </tr>
      `;
  }

  tabelaVotos.innerHTML += `
      <tr>
          <td>Votos Brancos</td>
          <td>${votosBrancos}</td>
      </tr>
  `;
}

if (document.getElementById('tabelaVotos')) {
  atualizarContagem();
}

function confirmaSom() {
  const confirmaAudio = document.getElementById('confirmAudio');

  confirmaAudio.play();
}
