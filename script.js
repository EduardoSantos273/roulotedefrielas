let clientes = [];
let quantidade = 0;

document.getElementById('adicionar-cliente').addEventListener('click', function() {
    document.getElementById('pop-up-adicionar').classList.remove('hidden');
});

document.getElementById('cancelar-adicao').addEventListener('click', function() {
    document.getElementById('pop-up-adicionar').classList.add('hidden');
    resetPopUpAdicionar();
});

document.getElementById('adicionar-unidade').addEventListener('click', function() {
    quantidade++;
    document.getElementById('quantidade').textContent = quantidade;
    document.getElementById('total').textContent = (quantidade * 3) + '€';
});

document.getElementById('confirmar-adicao').addEventListener('click', function() {
    const nome = document.getElementById('nome-cliente').value || 'Cliente Anônimo';
    const total = quantidade * 3;
    const clienteContainer = document.getElementById('clientes-container');

    if (total > 0) {
        const clienteDiv = document.createElement('div');
        clienteDiv.className = 'cliente';
        clienteDiv.textContent = `${nome} - ${total}€`;
        clienteContainer.appendChild(clienteDiv);
        clientes.push(`${nome} - ${total}€`);
    } else {
        alert('Adicione pelo menos uma Bifana.');
    }

    document.getElementById('pop-up-adicionar').classList.add('hidden');
    resetPopUpAdicionar();
});

function resetPopUpAdicionar() {
    quantidade = 0;
    document.getElementById('nome-cliente').value = '';
    document.getElementById('quantidade').textContent = '0';
    document.getElementById('total').textContent = '0€';
}

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

    if (select.options.length > 0) {
        document.getElementById('pop-up-remover').classList.remove('hidden');
    } else {
        alert('Não há clientes para remover.');
    }
});

document.getElementById('cancelar-remocao').addEventListener('click', function() {
    document.getElementById('pop-up-remover').classList.add('hidden');
});

document.getElementById('confirmar-remocao').addEventListener('click', function() {
    const select = document.getElementById('select-cliente');
    const clienteContainer = document.getElementById('clientes-container');
    const index = select.value;

    clienteContainer.removeChild(clienteContainer.children[index]);
    clientes.splice(index, 1);

    document.getElementById('pop-up-remover').classList.add('hidden');
});
