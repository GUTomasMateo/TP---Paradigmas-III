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

        html += `
            <li>
                ${item.name} - $${item.price}
                <button onclick="removeFromCart(${index})">❌</button>
            </li>`;
    });

    html += "</ul>";
    html += `<p><strong>Total:</strong> $${total}</p>`;

    cartContainer.innerHTML = html;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
        const id = e.target.dataset.id;
        const name = e.target.dataset.name;
        const price = parseFloat(e.target.dataset.price);

        addToCart({ id, name, price });
    }
});

function addToCart(product) {
    const item = cart.find(p => p.id == product.id);

    if (item) {
        item.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    renderCart();
}

document.getElementById("checkoutBtn").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Tu carrito está vacío 🚨");
        return;
    }

    const form = document.getElementById("checkoutForm");

    // Si el formulario NO está visible → mostrarlo
    if (form.style.display === "none") {
        form.style.display = "block";
        return;
    }

    // Si ya está visible → enviar pedido
    enviarPedido();
});

function enviarPedido() {
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const telefono = document.getElementById("telefono").value.trim();

    if (!nombre || !apellido || !telefono) {
        alert("Por favor completá todos los datos");
        return;
    }

    if (cart.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("apellido", apellido);
    formData.append("telefono", telefono);
    formData.append("items", JSON.stringify(cart));

    fetch("backend/guardar_pedido.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.text())
    .then(resp => {
        if (resp === "ok") {
            alert("Pedido guardado correctamente");

            // Reiniciar carrito
            cart = [];
            renderCart();

            // Ocultar formulario
            document.getElementById("checkoutForm").style.display = "none";

            // Limpiar campos
            document.getElementById("nombre").value = "";
            document.getElementById("apellido").value = "";
            document.getElementById("telefono").value = "";
        } else {
            console.log(resp);
            alert("Hubo un problema al guardar el pedido.");
        }
    });
}
