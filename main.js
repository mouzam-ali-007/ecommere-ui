const filterButtons = document.querySelectorAll(".filter");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {

        // Active button change
        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        // Selected category
        const selectedCategory = button.textContent.trim().toLowerCase();

        // Filter products
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

// Add to Cart Functionality

const cartButtons = document.querySelectorAll(".add-cart");

cartButtons.forEach((button) => {
    button.addEventListener("click", () => {

        const productCard = button.closest(".product-card");
        const productName = productCard.querySelector("h3").textContent;

        alert(`${productName} added to cart successfully!`);

    });
});