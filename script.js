let clients = [];
let currentProducts = [];
let editingClientId = null;
let clientIdCounter = 1; // Adicionando um contador de identificadores

function addProduct(name, price) {
    const existingProduct = currentProducts.find(product => product.name === name);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        currentProducts.push({ name, price, quantity: 1 });
    }
    renderCurrentOrder();
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

function addClient() {
    const clientName = document.getElementById('clientName').value || `Cliente ${clientIdCounter}`;
    const client = {
        id: clientIdCounter++, // Usando o contador de identificadores
        name: clientName,
        products: [...currentProducts],
        total: currentProducts.reduce((sum, product) => sum + product.price * product.quantity, 0)
    };
    if (editingClientId !== null) {
        const index = clients.findIndex(client => client.id === editingClientId);
        clients[index] = client;
        editingClientId = null;
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
}

function removeClient(id) {
    clients = clients.filter(client => client.id !== id);
    renderClients();
}

function clearOrder() {
    currentProducts = [];
    renderCurrentOrder();
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
            <button onclick="editClient(${client.id})">Editar Cliente</button>
            <button onclick="removeClient(${client.id})">Excluir Cliente</button>
        `;
        clientsDiv.appendChild(clientDiv);
    });
}
