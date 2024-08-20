let quantidade = 0;

// Mostrar ou esconder o formulário
document.getElementById('adicionar-cliente').addEventListener('click', function() {
    document.getElementById('form-container').classList.remove('hidden');
});

document.getElementById('cancelar-adicao').addEventListener('click', function() {
    document.getElementById('form-container').classList.add('hidden');
    resetForm();
});

// Adicionar uma unidade de Bifana
document.getElementById('adicionar-unidade').addEventListener('click', function() {
    quantidade++;
    document.getElementById('quantidade').textContent = quantidade;
    document.getElementById('total').textContent = (quantidade * 3) + '€';
});

// Confirmar e adicionar cliente à lista
document.getElementById('confirmar-adicao').addEventListener('click', function() {
    const nome = document.getElementById('nome-cliente').value || 'Cliente Anônimo';
    const total = quantidade * 3;
    const clienteContainer = document.getElementById('clientes-container');

    if (total > 0) {
        const clienteDiv = document.createElement('div');
        clienteDiv.className = 'cliente';
        clienteDiv.textContent = `${nome} - ${total}€`;
        clienteContainer.appendChild(clienteDiv);
        resetForm();
    } else {
        alert('Adicione pelo menos uma Bifana.');
    }
});

// Resetar o formulário
function resetForm() {
    quantidade = 0;
    document.getElementById('nome-cliente').value = '';
    document.getElementById('quantidade').textContent = '0';
    document.getElementById('total').textContent = '0€';
    document.getElementById('form-container').classList.add('hidden');
}

// Remover cliente selecionado
document.getElementById('remover-cliente').addEventListener('click', function() {
    const clienteContainer = document.getElementById('clientes-container');
    const clientes = Array.from(clienteContainer.children);

    if (clientes.length > 0) {
        const clienteIndex = prompt('Digite o número do cliente para remover (começando de 0):');

        if (clienteIndex >= 0 && clienteIndex < clientes.length) {
            clienteContainer.removeChild(clientes[clienteIndex]);
        } else {
            alert('Número do cliente inválido.');
        }
    } else {
        alert('Não há clientes para remover.');
    }
});
