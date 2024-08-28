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
    updateProductButtons();
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
        li.textContent = `(${product.quantity}) ${product.name} - ${product.price}€`;
        orderList.appendChild(li);
        total += product.price * product.quantity;
    });
    orderTotal.textContent = total.toFixed(2);
}

function updateProductButtons() {
    const productButtons = document.querySelectorAll('#products button');
    productButtons.forEach(button => {
        const productName = button.textContent.split(' - ')[0].trim();
        const product = currentProducts.find(p => p.name === productName || p.name.includes(productName));
        if (product) {
            button.innerHTML = `${productName} - ${button.textContent.split(' - ')[1].split('<')[0]}<span class="quantity">${product.quantity}</span>`;
        } else {
            button.innerHTML = `${productName} - ${button.textContent.split(' - ')[1].split('<')[0]}`;
        }
    });
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
    updateProductButtons();
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
    const client = clients.find(client => client.id === id);
    actionHistory.push({ type: 'removeClient', client });
    clients = clients.filter(client => client.id !== id);
    renderClients();
}

function clearOrder() {
    actionHistory.push({ type: 'clearOrder', products: [...currentProducts] });
    currentProducts = [];
    renderCurrentOrder();
    updateProductButtons();
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
                ${client.products.map(product => `<li>(${product.quantity}) ${product.name} - ${product.price}€</li>`).join('')}
            </ul>
            <p>Total: ${client.total.toFixed(2)}€</p>
            <button onclick="editClient(${client.id})">Editar</button>
            <button onclick="removeClient(${client.id})">Excluir</button>
        `;
        clientsDiv.appendChild(clientDiv);
    });
}

function showClients() {
    document.getElementById('mainScreen').style.display = 'none';
    document.getElementById('clientsScreen').style.display = 'flex';
}

function backToMain() {
    document.getElementById('clientsScreen').style.display = 'none';
    document.getElementById('mainScreen').style.display = 'flex';
}

function undoAction() {
    const lastAction = actionHistory.pop();
    if (!lastAction) return;

    switch (lastAction.type) {
        case 'addProduct':
            // Implementar lógica para desfazer a adição de produto
            break;
        case 'addClient':
            // Implementar lógica para desfazer a adição de cliente
            break;
        case 'removeClient':
            // Implementar lógica para desfazer a remoção de cliente
            break;
        case 'clearOrder':
            // Implementar lógica para desfazer a limpeza do pedido
            break;
    }
}
