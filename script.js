let clientIdCounter = 1;
let clients = [];

function addClient() {
    const clientNameInput = document.getElementById('clientName');
    const clientName = clientNameInput.value || `Cliente ${clientIdCounter}`;
    const clientId = clientIdCounter++;

    const client = {
        id: clientId,
        name: clientName,
        order: []
    };

    clients.push(client);
    renderClients();
    clientNameInput.value = '';
}

function removeClient(clientId) {
    clients = clients.filter(client => client.id !== clientId);
    renderClients();
}

function renderClients() {
    const clientsContainer = document.getElementById('clients');
    clientsContainer.innerHTML = '';

    clients.forEach(client => {
        const clientDiv = document.createElement('div');
        clientDiv.className = 'client';
        clientDiv.innerHTML = `
            <h3>${client.name}</h3>
            <button onclick="removeClient(${client.id})">Remover</button>
        `;
        clientsContainer.appendChild(clientDiv);
    });
}

function addProduct(productName, productPrice) {
    const currentOrderList = document.getElementById('orderList');
    const orderTotal = document.getElementById('orderTotal');
    const listItem = document.createElement('li');
    listItem.textContent = `${productName} - ${productPrice}€`;
    currentOrderList.appendChild(listItem);

    const currentTotal = parseFloat(orderTotal.textContent) || 0;
    orderTotal.textContent = (currentTotal + productPrice).toFixed(2);
}

function clearOrder() {
    const currentOrderList = document.getElementById('orderList');
    const orderTotal = document.getElementById('orderTotal');
    currentOrderList.innerHTML = '';
    orderTotal.textContent = '0';
}
