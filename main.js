/* ==============================
   PRODUCT CATEGORY FILTER
================================ */

const filterButtons = document.querySelectorAll(".filter");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const selectedCategory = button.textContent.trim().toLowerCase();

        productCards.forEach((card) => {
            const category = card.querySelector(".category")
                .textContent.trim().toLowerCase();

            if (selectedCategory === "all" || category === selectedCategory) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
});


/* ==============================
   SHOPPING CART VARIABLES
================================ */

let cart = [];
let quantity = 1;
let selectedUnitPrice = 0;
let activeProduct = null;

const cartModal = document.getElementById("cartModal");
const shoppingCartModal = document.getElementById("shoppingCartModal");

const quantityDisplay = document.getElementById("modalProductQuantity");
const increaseQuantity = document.getElementById("increaseQuantity");
const decreaseQuantity = document.getElementById("decreaseQuantity");


/* ==============================
   ADD TO CART
================================ */

const cartButtons = document.querySelectorAll(".add-cart");

cartButtons.forEach((button) => {

    button.addEventListener("click", (event) => {

        event.preventDefault();

        const productCard = button.closest(".product-card");

        if (!productCard || !cartModal) {
            return;
        }

        const productName = productCard.querySelector("h3").textContent.trim();
        const productImage = productCard.querySelector("img").src;

        const productPrice = productCard.querySelector(".price, .product-price")
            .textContent.trim();

        selectedUnitPrice = parseFloat(
            productPrice.replace(/[^\d.]/g, "")
        );

        if (Number.isNaN(selectedUnitPrice)) {
            return;
        }

        // Check if product already exists in cart
        let existingProduct = cart.find(
            (item) => item.name === productName
        );

        if (existingProduct) {
            existingProduct.quantity++;
            activeProduct = existingProduct;
        } else {

            activeProduct = {
                name: productName,
                image: productImage,
                price: selectedUnitPrice,
                quantity: 1
            };

            cart.push(activeProduct);
        }

        quantity = activeProduct.quantity;

        // Show product details
        document.getElementById("modalProductName").textContent =
            activeProduct.name;

        document.getElementById("modalProductImage").src =
            activeProduct.image;

        document.getElementById("modalProductPrice").textContent =
            "$" + activeProduct.price.toFixed(2);

        updateQuantityDisplay();

        cartModal.classList.add("active");

    });

});


/* ==============================
   UPDATE QUANTITY AND TOTAL
================================ */

function updateQuantityDisplay() {

    quantityDisplay.textContent = quantity;

    document.getElementById("modalTotalPrice").textContent =
        "Total: $" + (selectedUnitPrice * quantity).toFixed(2);
}


/* Increase Quantity */

increaseQuantity.addEventListener("click", () => {

    quantity++;

    activeProduct.quantity = quantity;

    updateQuantityDisplay();

});


/* Decrease Quantity */

decreaseQuantity.addEventListener("click", () => {

    if (quantity > 1) {

        quantity--;

        activeProduct.quantity = quantity;

        updateQuantityDisplay();

    }

});


/* ==============================
   CLOSE ADD TO CART MODAL
================================ */

window.closeCartModal = function () {
    cartModal.classList.remove("active");
};


/* ==============================
   OPEN SHOPPING CART
================================ */

window.openShoppingCart = function () {

    closeCartModal();

    displayCartItems();

    shoppingCartModal.classList.add("active");

};


/* ==============================
   DISPLAY CART ITEMS
================================ */

function displayCartItems() {

    const cartItemsList = document.getElementById("cartItemsList");

    const cartGrandTotal = document.getElementById("cartGrandTotal");

    cartItemsList.innerHTML = "";

    let grandTotal = 0;

    if (cart.length === 0) {

        cartItemsList.textContent = "Your cart is empty.";

    }

    cart.forEach((item) => {

        const itemTotal = item.price * item.quantity;

        grandTotal += itemTotal;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        const image = document.createElement("img");
        image.src = item.image;
        image.alt = item.name;

        const details = document.createElement("div");
        details.classList.add("cart-item-details");

        const name = document.createElement("h4");
        name.textContent = item.name;

        const price = document.createElement("p");
        price.textContent =
            "$" + item.price.toFixed(2) +
            " × " + item.quantity +
            " = $" + itemTotal.toFixed(2);

        details.appendChild(name);
        details.appendChild(price);

        cartItem.appendChild(image);
        cartItem.appendChild(details);

        cartItemsList.appendChild(cartItem);

    });

    cartGrandTotal.textContent =
        "Grand Total: $" + grandTotal.toFixed(2);

}


/* ==============================
   CLOSE SHOPPING CART
================================ */

window.closeShoppingCart = function () {

    shoppingCartModal.classList.remove("active");

};