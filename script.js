// Selecionar os elementos do DOM
const calculadora = document.querySelector('.calculadora');
const clientes = document.querySelector('.clientes');

// Criar os botões dos produtos dinamicamente (exemplo)
function criarBotaoProduto(nome, valor) {
    const botao = document.createElement('button');
    botao.textContent = `${nome} - ${valor}€`;
    // Adicionar um event listener para cada botão
    botao.addEventListener('click', () => {
        // Lógica para adicionar o produto ao pedido
    });
    calculadora.appendChild(botao);
}

// Chamar a função para criar os botões
criarBotaoProduto('Simples', 3);
criarBotaoProduto('Queijo', 3.25);
// ... e assim por diante

// Função para adicionar um cliente
function adicionarCliente(pedido, valorTotal) {
    // Criar um elemento para o cliente e adicionar à lista
}
