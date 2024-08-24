let clients = [];
let currentProducts = [];
let editingClientId = null;
let clientIdCounter = 1;
let selectedSpecial = '';
let actionHistory = [];

function addProduct(name, price) {
    if (selectedSpecial) {
        name = `${selectedSpecial} ${name}`;
        selectedSpecial = '';
    }
    const existingProduct = currentProducts.find(product => product.name === name);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        currentProducts.push({ name, price, quantity: 1 });
    }
    actionHistory.push({ action: 'add', product: { name, price } });
    renderCurrentOrder();
}

function selectSpecial(special) {
    selectedSpecial = special;
}

function renderCurrentOrder() {
    const orderList = document.getElementById('orderList');
    const orderTotal = document.getElementById('orderTotal');
    orderList.innerHTML = '';
    let total = 0;
    currentProducts.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - ${product.price}€ (${product.quantity})`;
        orderList.appendChild(li);
        total += product.price * product.quantity;
    });
    orderTotal.textContent = total.toFixed(2);
}

function undoLastAction() {
    const lastAction = actionHistory.pop();
    if (lastAction) {
        if (lastAction.action === 'add') {
            const productIndex = currentProducts.findIndex(product => product.name === lastAction.product.name);
            if (productIndex !== -1) {
                currentProducts[productIndex].quantity -= 1;
                if (currentProducts[productIndex].quantity === 0) {
                    currentProducts.splice(productIndex, 1);
                }
            }
        }
        renderCurrentOrder();
    }
}

function clearOrder() {
    currentProducts = [];
    actionHistory = [];
    renderCurrentOrder();
}

function addClient() {
    const clientName = document.getElementById('clientName').value || `Cliente ${clientIdCounter++}`;
    const client = {
        id: clientIdCounter,
        name: clientName,
        products: [...currentProducts],
        total: currentProducts.reduce((sum, product) => sum + product.price * product.quantity, 0)
    };
    if (editingClientId !== null) {
        const index = clients.findIndex(client => client.id === editingClientId);
        clients[index] = client;
        editingClientId = null;
        document.getElementById('addClientButton').textContent = 'Adicionar';
    } else {
        clients.push(client);
    }
    currentProducts = [];
    document.getElementById('clientName').value = '';
    renderClients();
    renderCurrentOrder();
}

function editClient(id) {
    const client = clients.find(client => client.id === id);
    currentProducts = [...client.products];
    document.getElementById('clientName').value = client.name;
    editingClientId = id;
    renderCurrentOrder();
    backToMain();
    document.getElementById('addClientButton').textContent = 'Confirmar';
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
                ${client.products.map(product => `<li>${product.name} - ${product.price}€ (${product.quantity})</li>`).join('')}
            </ul>
            <p>Total: ${client.total.toFixed(2)}€</p>
            <button onclick="editClient(${client.id})">Editar</button>
            <
