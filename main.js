
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 19.99,
        image: "product1.jpg"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 29.99,
        image: "product2.jpg"
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 39.99,
        image: "product3.jpg"
    }
];

const productContainer = document.getElementById("product-container");

products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    // Product Image
    const productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = product.name;

    // Product Name
    const productName = document.createElement("h3");
    productName.textContent = product.name;

    // Product Price
    const productPrice = document.createElement("p");
    productPrice.textContent = `$${product.price.toFixed(2)}`;

    // Add to Cart Button
    const addButton = document.createElement("button");
    addButton.textContent = "Add to Cart";
    addButton.classList.add("add-cart");

    addButton.addEventListener("click", () => {
        alert(`${product.name} added to cart!`);
    });

    // Append elements
    productCard.appendChild(productImage);
    productCard.appendChild(productName);
    productCard.appendChild(productPrice);
    productCard.appendChild(addButton);

    productContainer.appendChild(productCard);
});
