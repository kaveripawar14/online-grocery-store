let cart = [];

function addToCart(productName, productPrice) {
    const existingProduct = cart.find(
        product => product.name === productName
    );

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    updateCart();
}

function increaseQuantity(productName) {
    const product = cart.find(
        product => product.name === productName
    );

    if (product) {
        product.quantity++;
    }

    updateCart();
}

function decreaseQuantity(productName) {
    const product = cart.find(
        product => product.name === productName
    );

    if (product) {
        product.quantity--;

        if (product.quantity === 0) {
            removeFromCart(productName);
            return;
        }
    }

    updateCart();
}

function removeFromCart(productName) {
    cart = cart.filter(
        product => product.name !== productName
    );

    updateCart();
}

function updateCart() {
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");
    const cartItems = document.getElementById("cart-items");

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(product => {
        totalItems += product.quantity;
        totalPrice += product.price * product.quantity;
    });

    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cartItems.innerHTML = "";

    cart.forEach(product => {
        const item = document.createElement("div");
        item.className = "cart-item";

        item.innerHTML = `
            <div>
                <strong>${product.name}</strong>
                <br>
                ₹${product.price} × ${product.quantity}
            </div>

            <div class="quantity-controls">
                <button onclick="decreaseQuantity('${product.name}')">
                    -
                </button>

                <span>${product.quantity}</span>

                <button onclick="increaseQuantity('${product.name}')">
                    +
                </button>

                <button onclick="removeFromCart('${product.name}')">
                    Remove
                </button>
            </div>
        `;

        cartItems.appendChild(item);
    });
}