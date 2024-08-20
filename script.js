document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.querySelector('.product-grid');
    const addClientButton = document.getElementById('add-client');
    const clientList = document.getElementById('client-list');
    let currentClient = {
        name: '',
        products: []
    };

    productGrid.addEventListener('click', (event) => {
        const productElement = event.target.closest('.product');
        if (productElement) {
            const productValue = parseFloat(productElement.getAttribute('data-value'));
            currentClient.products.push(productValue);
            updateClientList();
        }
    });

    addClientButton.addEventListener('click', () => {
        const clientName = prompt('Nome do Cliente (opcional):').trim();
        if (clientName || currentClient.products.length > 0) {
            currentClient.name = clientName;
            const total = currentClient.products.reduce((acc, curr) => acc + curr, 0).toFixed(2);
            const clientDiv = document.createElement('div');
            clientDiv.classList.add('client-box');
            clientDiv.innerHTML = `
                <span><strong>Cliente:</strong> ${currentClient.name || 'Anônimo'}<br><strong>Total:</strong> ${total}€</span>
                <ul>
                    ${currentClient.products.map(product => `<li>${product}€</li>`).join('')}
                </ul>
                <button class="delete-client">Excluir</button>
            `;
            clientList.appendChild(clientDiv);
            currentClient = { name: '', products: [] };
        }
    });

    clientList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-client')) {
            event.target.parentElement.remove();
        }
    });

    function updateClientList() {
        // Função auxiliar para atualizar a lista de produtos, se necessário.
    }
});
