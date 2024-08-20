document.getElementById('adicionar-cliente').addEventListener('click', function() {
    document.getElementById('pop-up').classList.remove('hidden');
});

document.getElementById('cancelar').addEventListener('click', function() {
    document.getElementById('pop-up').classList.add('hidden');
});

document.getElementById('confirmar-adicao').addEventListener('click', function() {
    const nome = document.getElementById('nome-cliente').value || 'Cliente Anônimo';
    const clienteContainer = document.getElementById('clientes-container');

    if (clienteContainer.children.length < 16) {
        const clienteDiv = document.createElement('div');
        clienteDiv.className = 'cliente';
        clienteDiv.textContent = `${nome} - Bifana Simples - 3€`;
        clienteContainer.appendChild(clienteDiv);
    } else {
        alert('Limite de 16 clientes atingido.');
    }

    document.getElementById('pop-up').classList.add('hidden');
    document.getElementById('nome-cliente').value = '';
});

document.getElementById('remover-cliente').addEventListener('click', function() {
    const clienteContainer = document.getElementById('clientes-container');
    const select = document.getElementById('select-cliente');

    select.innerHTML = ''; // Limpa o select

    Array.from(clienteContainer.children).forEach((cliente, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = cliente.textContent;
        select.appendChild(option);
    });

    document.getElementById('remover-pop-up').classList.remove('hidden');
});

document.getElementById('cancelar-remocao').addEventListener('click', function() {
    document.getElementById('remover-pop-up').classList.add('hidden');
});

document.getElementById('confirmar-remocao').addEventListener('click', function() {
    const select = document.getElementById('select-cliente');
    const clienteContainer = document.getElementById('clientes-container');
    const index = select.value;

    clienteContainer.removeChild(clienteContainer.children[index]);
    document.getElementById('remover-pop-up').classList.add('hidden');
});
