
let cart = [];

function renderCart() {
    const cartContainer = document.getElementById("cart");
    if (cart.length === 0) {
    cartContainer.innerHTML = "<p>El carrito está vacío</p>";
    return;
    }

    let total = 0;
    let html = "<ul>";
    cart.forEach((item, index) => {
    total += item.price;
    html += `<li>${item.name} - $${item.price}
        <button onclick="removeFromCart(${index})">❌</button></li>`;
    });
    html += "</ul>";
    html += `<p><strong>Total:</strong> $${total}</p>`;
    cartContainer.innerHTML = html;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = parseInt(button.getAttribute("data-price"));
    cart.push({ name, price });
    renderCart();
    });
});

document.getElementById("checkoutBtn").addEventListener("click", () => {
    if (cart.length === 0) {
    alert("Tu carrito está vacío 🚨");
    return;
    }
// Aca tengo que poner la API de Mercado Pago
    alert("Aquí iría la integración con Mercado Pago 💳");
});

renderCart();