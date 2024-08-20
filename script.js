document.getElementById("addClientBtn").addEventListener("click", function() {
    if (document.querySelectorAll(".client").length < 16) {
        document.getElementById("popup").style.display = "flex";
    } else {
        alert("O máximo de 16 clientes foi atingido.");
    }
});

document.getElementById("closePopup").addEventListener("click", function() {
    document.getElementById("popup").style.display = "none";
});

document.getElementById("addExpenseBtn").addEventListener("click", function() {
    const expense = document.getElementById("expenseInput").value;
    if (expense) {
        addClient(expense);
        document.getElementById("popup").style.display = "none";
        document.getElementById("expenseInput").value = "";
    } else {
        alert("Por favor, insira uma despesa.");
    }
});

document.getElementById("removeClientBtn").addEventListener("click", function() {
    const clients = document.querySelectorAll(".client");
    if (clients.length > 0) {
        clients[clients.length - 1].remove();
    } else {
        alert("Nenhum cliente para remover.");
    }
});

function addClient(expense) {
    const clientContainer = document.getElementById("clientsContainer");
    const clientDiv = document.createElement("div");
    clientDiv.className = "client";
    clientDiv.innerText = `Cliente: Despesa R$ ${expense}`;
    clientContainer.appendChild(clientDiv);
}
