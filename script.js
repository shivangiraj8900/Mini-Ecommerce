const url = "https://dummyjson.com/products?limit=20";

let allProducts = [];

async function getProducts() {

    const response = await fetch(url);
    const data = await response.json();

    allProducts = data.products;

    displayProducts(allProducts);
}

function displayProducts(products) {

    const container = document.getElementById("container");

    container.innerHTML = "";

    products.forEach((product) => {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${product.thumbnail}">
            <h3>${product.title}</h3>
            <p style="color:green;font-size:20px;">₹${Math.floor(product.price * 85)}</p>
            <button onclick="addToCart('${product.title}', ${product.price})">Add to Cart</button>
        `;

        container.appendChild(card);
    });
}

document.getElementById("search").addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    const filtered = allProducts.filter(product =>
        product.title.toLowerCase().includes(value)
    );

    displayProducts(filtered);
});

function addToCart(name, price) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        name: name,
        price: price
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " Added To Cart Successfully 🛒");
}

getProducts();