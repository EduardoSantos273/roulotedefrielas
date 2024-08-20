document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.querySelector('.product-grid');
    const addClientButton = document.getElementById('add-client');
    const clientList = document.getElementById('client-list');
    const clientNameInput = document.getElementById('client-name');
    let products = [];

    productGrid.addEventListener('click', (event) => {
        const productElement = event.target.closest('.product');
        if (productElement) {
            const productValue = parseFloat(productElement.getAttribute('data-value'));
            products.push(productValue);
            updateProductList();
        }
    });

    addClientButton.addEventListener('click', () => {
        const clientName = clientNameInput.value.trim();
        if (clientName && products.length > 0) {
            const total = products.reduce((acc, curr) => acc + curr, 0).toFixed(2);
            const clientDiv = document.createElement('div');
            clientDiv.classList.add('client-box');
            clientDiv.innerHTML = `
                <span>${clientName} - ${total}€</span>
                <button class="delete-client">Excluir</button>
            `;
            clientList.appendChild(clientDiv);
            clientNameInput.value = '';
            products = [];
            updateProductList();
        }
    });

    clientList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-client')) {
            event.target.parentElement.remove();
        }
    });

    function updateProductList() {
        productList.innerHTML = products.map(product => `<div>${product}€</div>`).join('');
    }
});
