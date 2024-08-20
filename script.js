document.addEventListener('DOMContentLoaded', () => {
    const productSelect = document.getElementById('product');
    const addProductButton = document.getElementById('add-product');
    const productList = document.getElementById('product-list');
    const addClientButton = document.getElementById('add-client');
    const clientList = document.getElementById('client-list');
    const clientNameInput = document.getElementById('client-name');

    let products = [];

    addProductButton.addEventListener('click', () => {
        const productValue = parseFloat(productSelect.value);
        if (productValue) {
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
