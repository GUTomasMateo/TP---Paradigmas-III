document.addEventListener("DOMContentLoaded", () => {
    fetch("backend/get_products.php")
        .then(res => res.json())
        .then(productos => {
            const cont = document.getElementById("productList");
            cont.innerHTML = "";

            productos.forEach(p => {
                cont.innerHTML += `
                    <div class="product-card mix ${p.categoria}">
                        <img src="${p.imagen}" alt="${p.nombre}">
                        <h3>${p.nombre}</h3>
                        <button class="add-to-cart"
                            data-id="${p.id}"
                            data-name="${p.nombre}"
                            data-price="${p.precio}">
                            Agregar al carrito
                        </button>
                        <a href="${p.link_externo}" target="_blank">Ver en Mercado Libre</a>
                    </div>
                `;
            });

            /* IMPORTANTE → iniciar MixItUp después de cargar productos */
            if (window.mixer) {
                window.mixer.destroy();
            }

            window.mixer = mixitup('.product-list', {
                selectors: {
                    target: '.product-card'
                },
                animation: { duration: 300 }
            });
        });
});
