// Back Button Logic
document.addEventListener("DOMContentLoaded", () => {
    // Retrieve query parameters from the URL
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("productId"); // Get productId from URL
    const category = params.get("category") || "all";
    const origin = params.get("origin");

    // Check if productId exists
    if (!productId) {
        alert("Error: Product ID is missing."); // Show error if no productId
        return;
    }

    // Dynamically set the href for the back button
    const backButton = document.getElementById("back-to-products");
    if (backButton) {
        if (origin === "cart") {
            backButton.href = "./cart.html"; // Redirect back to cart
        } else if (origin === "home") {
            backButton.href = "/"; // Redirect back to home
        } else {
            backButton.href = `./products.html?category=${category}`; // Default to products page
        }
    }

    // Add to Cart Button Logic
    const addToCartButton = document.querySelector(".add-to-cart");
    if (addToCartButton) {
        addToCartButton.addEventListener("click", () => {
            // Send a POST request to add the product to the cart
            fetch("https://shop-9bgz.onrender.com/auth/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ productId }), // Pass the productId in the body
                credentials: 'include'
            })
                .then((response) => {
                    if (response.ok) {
                        alert("Product added to cart successfully!");
                    } else {
                        return response.json().then((data) => {
                            throw new Error(data.error || "Failed to add product to cart.");
                        });
                    }
                })
                .catch((error) => {
                    alert(`Error: ${error.message}`);
                });
        });
    }
});