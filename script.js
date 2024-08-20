let clients = [];
let currentProducts = [];

function addProduct(name, price) {
    currentProducts.push({ name, price });
    console.log(currentProducts);
}

function addClient() {
    const client = {
        id: clients.length + 1,
        products: [...currentProducts],
        total: currentProducts.reduce((sum, product) => sum + product.price, 0)
    };
    clients.push(client);
    currentProducts = [];
    renderClients();
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
            <h3>Cliente ${client.id}</h3>
            <ul>
                ${client.products.map(product => `<li>${product.name} - ${product.price}€</li>`).join('')}
            </ul>
            <p>Total: ${client.total}€</p>
            <button onclick="removeClient(${client.id})">Excluir Cliente</button>
        `;
        clientsDiv.appendChild(clientDiv);
    });
}
