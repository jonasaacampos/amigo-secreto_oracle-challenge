
let listaAmigos = [];
let paresSorteados = [];

/**
 * Valida se o nome inserido é válido
 * @param {string} nome - Nome a ser validado
 * @returns {boolean} - Retorna true se o nome for válido
 */
function validarNome(nome) {
    // Remove espaços extras e verifica se tem pelo menos 3 caracteres
    return nome.trim().length >= 3 && !listaAmigos.includes(nome.trim());
}


/**
 * Adiciona um novo amigo à lista
 */
function adicionarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nome = inputAmigo.value;

    if (!validarNome(nome)) {
        alert('Nome inválido ou já existente! Digite um nome com pelo menos 3 caracteres.');
        return;
    }

    listaAmigos.push(nome.trim());
    inputAmigo.value = '';

    atualizarListaAmigos();
}

/**
 * Atualiza a lista de amigos na interface
 */
function atualizarListaAmigos() {
    const listaElement = document.getElementById('lista-amigos');
    if (listaElement) {
        listaElement.innerHTML = listaAmigos.join(', ');
    }
    console.log(listaAmigos);
}

/**
 * Embaralha a lista de amigos e sorteia os pares
 */
function sortearAmigo() {
    if (listaAmigos.length < 4) {
        alert('Adicione pelo menos 4 participantes para realizar o sorteio!');
        return;
    }

    const sorteados = [...listaAmigos];
    let resultado = [];
    let paresSorteados = [];

    // Fisher-Yates shuffle algorithm
    for (let i = sorteados.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sorteados[i], sorteados[j]] = [sorteados[j], sorteados[i]];
    }

    // Criar pares
    for (let i = 0; i < sorteados.length; i++) {
        const atual = sorteados[i];
        const proximo = sorteados[(i + 1) % sorteados.length];
        resultado.push(`${atual} -> ${proximo}`);
        
        // Criar objeto para localStorage
        paresSorteados.push({
            pessoa: atual,
            amigo: proximo
        });
    }

    // Salvar no localStorage
    localStorage.setItem('paresSorteados', JSON.stringify(paresSorteados));
    
    exibirResultado(resultado);
}





/**
 * Exibe o resultado do sorteio
 * @param {string[]} pares - Array com os pares sorteados
 */
function exibirResultado(pares) {
    const resultadoElement = document.getElementById('resultado');
    if (resultadoElement) {
        resultadoElement.innerHTML = pares.join('<br>');
    }
    showLogConsole(pares);
}

function showLogConsole(log_list) {
    console.log(log_list);
}




function buscarParSorteado() {
    const nomePessoa = document.getElementById('nome-pessoa').value.trim();
    const resultadoDiv = document.getElementById('resultado-par');
    
    if (!nomePessoa) {
        resultadoDiv.innerHTML = 'Por favor, digite um nome';
        return;
    }

    try {
        const paresSorteados = JSON.parse(localStorage.getItem('paresSorteados')) || [];
        const par = paresSorteados.find(par => 
            par.pessoa.toLowerCase() === nomePessoa.toLowerCase()
        );

        if (par) {
            resultadoDiv.innerHTML = `Você tirou: ${par.amigo}`;
        } else {
            resultadoDiv.innerHTML = 'Nome não encontrado no sorteio';
        }
    } catch (error) {
        console.error('Erro ao buscar par:', error);
        resultadoDiv.innerHTML = 'Erro ao buscar resultado';
    }
}


/**
 * Reinicia o sorteio, limpando todas as listas
 */


function reiniciar() {
    if (confirm('Tem certeza que deseja reiniciar o sorteio?')) {
        listaAmigos = [];
        atualizarListaAmigos();

        const resultadoElement = document.getElementById('resultado');
        if (resultadoElement) {
            resultadoElement.innerHTML = '';
        }
    }

}



