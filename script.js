// Initialize cart from localStorage or as an empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to update the cart count display
function updateCartCount() {
    document.getElementById("cart-count").textContent = cart.length;
}

// Function to add product to the cart
function addToCart(productName, productPrice) {
    // Check if the product already exists in the cart
    const productIndex = cart.findIndex(item => item.name === productName);
    
    if (productIndex > -1) {
        // If the product exists, increase its quantity
        cart[productIndex].quantity += 1;
    } else {
        // If the product doesn't exist, add it to the cart with quantity 1
        const product = { name: productName, price: productPrice, quantity: 1 };
        cart.push(product);
    }
    
    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Update the cart count display
    updateCartCount();
    
    // Alert message (optional)
    alert(`${productName} has been added to the cart.`);
}

// Function to render cart items on cart page
function renderCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");
    
    // Clear existing cart items
    cartItemsContainer.innerHTML = "";
    
    let total = 0;
    
    // Populate cart items
    cart.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item d-flex justify-content-between align-items-center";
        
        listItem.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</span>
            <div>
                <button class="btn btn-sm btn-secondary mr-1" onclick="changeQuantity(${index}, -1)">-</button>
                <button class="btn btn-sm btn-secondary mr-3" onclick="changeQuantity(${index}, 1)">+</button>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Delete</button>
            </div>
        `;
        
        cartItemsContainer.appendChild(listItem);
        total += item.price * item.quantity;
    });
    
    // Update total price
    cartTotalElement.textContent = total.toFixed(2);
}

// Function to change the quantity of a cart item
function changeQuantity(index, change) {
    // Update the quantity, ensuring it doesn't go below 1
    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
    } else {
        cart.splice(index, 1);  // Remove item if quantity is zero
    }
    
    // Update localStorage and re-render cart
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
    updateCartCount();
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1);  // Remove item from cart
    localStorage.setItem("cart", JSON.stringify(cart));  // Update localStorage
    renderCartItems();  // Re-render cart
    updateCartCount();  // Update cart count
}

// Checkout function to clear the cart
function checkout() {
    alert("Thank you for your purchase!");
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

// Initialize page-specific functionalities
if (window.location.pathname.includes("cart.html")) {
    renderCartItems();  // Only render cart items if we're on the cart page
} else {
    updateCartCount();  // Only update cart count if we're on other pages
}
