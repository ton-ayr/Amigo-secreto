let amigos = [];
let sorteioRealizado = false;

function adicionar() {
    const amigoInput = document.getElementById('nome-amigo');
    const nomes = amigoInput.value
        .trim() // Remove espaços extras no início e no final
        .split(',') // Divide a entrada por vírgulas
        .map(nome => nome.trim().toLowerCase()) // Remove espaços e converte para letras minúsculas
        .filter(nome => nome); // Remove strings vazias

    if (nomes.length === 0) {
        alert('Necessário informar ao menos um nome para adicionar.');
        return;
    }

    // Filtra nomes novos que ainda não estão na lista
    const nomesNovos = nomes.filter(nome => !amigos.includes(nome));
    if (nomesNovos.length === 0) {
        alert('Todos os nomes inseridos já estão na lista.');
        return;
    }

    amigos.push(...nomesNovos);
    atualizarListaAmigos();
    amigoInput.value = '';
}

function atualizarListaAmigos() {
    const lista = document.getElementById('lista-amigos');
    lista.textContent = amigos.map(capitalize).join(', '); // Exibe os nomes formatados
}

function sortear() {
    if (amigos.length < 3) {
        alert('Adicione pelo menos 3 nomes para sortear.');
        return;
    }

    sorteioRealizado = true;
    const listaSorteio = document.getElementById('lista-sorteio');
    listaSorteio.innerHTML = '';

    const embaralhados = [...amigos]; // Copia a lista de amigos
    embaralha(embaralhados); // Embaralha a lista de amigos

    for (let i = 0; i < embaralhados.length; i++) {
        const atual = embaralhados[i];
        const proximo = embaralhados[(i + 1) % embaralhados.length];
        listaSorteio.innerHTML += `<p>${capitalize(atual)} --> ${capitalize(proximo)}</p>`; // Adiciona o par ao resultado
    }
}

// Função para embaralhar a lista de amigos (algoritmo de Fisher-Yates)
function embaralha(lista) {
    for (let i = lista.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Gera um índice aleatório
        [lista[i], lista[j]] = [lista[j], lista[i]]; // Troca os elementos
    }
}

function capitalize(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1); // Transforma o primeiro caractere em maiúsculo
}

function reiniciar() {
    amigos = [];
    sorteioRealizado = false;
    document.getElementById('lista-amigos').textContent = '';
    document.getElementById('lista-sorteio').innerHTML = '';
}

// Adiciona um evento para tecla Enter realizar ações
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();

        const amigoInput = document.getElementById('nome-amigo');
        const valor = amigoInput.value.trim();

        if (sorteioRealizado) {
            reiniciar();
        } else if (valor) {
            adicionar();
        } else {
            sortear();
        }
    }
});
