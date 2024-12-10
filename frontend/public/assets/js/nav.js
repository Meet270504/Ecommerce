// Function to check if the user is logged in
function isLoggedIn() {
    const cookies = document.cookie.split(';');
    return cookies.some(cookie => cookie.trim().startsWith('token='));
}

// Function to update navigation links dynamically
function updateAuthLink() {
    const authLink = document.getElementById('auth-link');

    if (!authLink) {
        console.error('auth-link element not found');
        return;
    }

    if (isLoggedIn()) {
        authLink.innerHTML = `
            <a href="./profile.html"><i class="fas fa-user"></i> Profile</a>
        `;
    } else {
        authLink.innerHTML = `
            <a href="./login.html"><i class="fas fa-user"></i> Login/Register</a>
        `;
    }
}

// Run the function after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', updateAuthLink);