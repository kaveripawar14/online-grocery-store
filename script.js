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
    const checkoutButton = document.getElementById("checkout-button");

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
        checkoutButton.style.display = "none";
        return;
    }

    checkoutButton.style.display = "inline-block";
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

function showOrderForm() {
    if (cart.length === 0) {
        alert("Please add products to your cart first.");
        return;
    }

    document.getElementById("order-section").style.display = "block";

    document.getElementById("order-section").scrollIntoView({
        behavior: "smooth"
    });
}

function placeOrder(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const customerName = document.getElementById("customer-name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const totalPrice = document.getElementById("cart-total").textContent;

    const orderNumber = Math.floor(1000 + Math.random() * 9000);

    document.getElementById("order-confirmation").innerHTML = `
        <h2>Order Placed Successfully! 🎉</h2>
        <p>Thank you, <strong>${customerName}</strong>!</p>
        <p>Your order number is: <strong>#${orderNumber}</strong></p>
        <p>Delivery Address: ${address}</p>
        <p>Phone Number: ${phone}</p>
        <p>Total Amount: <strong>₹${totalPrice}</strong></p>
        <p>Your order will be delivered soon.</p>
    `;

    document.getElementById("order-confirmation").style.display = "block";

    document.getElementById("order-section").style.display = "none";

    cart = [];
    updateCart();

    document.getElementById("order-form").reset();

    document.getElementById("order-confirmation").scrollIntoView({
        behavior: "smooth"
    });
}