let clients = [];
let currentProducts = [];

function addProduct(name, price) {
    currentProducts.push({ name, price });
    renderCurrentOrder();
}

function renderCurrentOrder() {
    const orderList = document.getElementById('orderList');
    const orderTotal = document.getElementById('orderTotal');
    orderList.innerHTML = '';
    let total = 0;
    currentProducts.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - ${product.price}€`;
        orderList.appendChild(li);
        total += product.price;
    });
    orderTotal.textContent = total.toFixed(2);
}

function addClient() {
    const clientName = document.getElementById('clientName').value || `Cliente ${clients.length + 1}`;
    const client = {
        id: clients.length + 1,
        name: clientName,
        products: [...currentProducts],
        total: currentProducts.reduce((sum, product) => sum + product.price, 0)
    };
    clients.push(client);
    currentProducts = [];
    renderClients();
    renderCurrentOrder();
}

function removeClient(id) {
    clients = clients.filter(client => client.id !== id);
    renderClients();
}

function renderClients() {
    const clientsDiv = document.getElementById('clients');
    clientsDiv.innerHTML = '';
    clients.forEach(client => {
        const clientDiv = document.createElement('div');
        clientDiv.className = 'client';
        clientDiv.innerHTML = `
            <h3>${client.name}</h3>
            <ul>
                ${client.products.map(product => `<li>${product.name} - ${product.price}€</li>`).join('')}
            </ul>
            <p>Total: ${client.total.toFixed(2)}€</p>
            <button onclick="removeClient(${client.id})">Excluir Cliente</button>
        `;
        clientsDiv.appendChild(clientDiv);
    });
}
