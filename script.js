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
    actionHistory.push({ type: 'addProduct', name, price });
    renderCurrentOrder();
    updateProductButton(name);
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

function updateProductButton(name) {
    const productButton = document.getElementById(name);
    const product = currentProducts.find(product => product.name === name);
    const quantitySpan = document.getElementById(`${name}-quantity`);
    if (product && quantitySpan) {
        quantitySpan.textContent = product.quantity;
    }
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
        clients[index] = { ...client, id: editingClientId }; // Preserve the original ID
        editingClientId = null;
        document.getElementById('addClientButton').textContent = 'Adicionar';
    } else {
        clients.push(client);
    }
    actionHistory.push({ type: 'addClient', client });
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
    document.getElementById('addClientButton').text
