// Function to check if the user is logged in
function isLoggedIn() {
    const cookies = document.cookie.split(';');
    console.log('Cookies:', cookies); // Debugging: Log cookies
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
        console.log('User is logged in. Updating link to Profile.');
        authLink.innerHTML = `
            <a href="./profile.html"><i class="fas fa-user"></i> Profile</a>
        `;
    } else {
        console.log('User is not logged in. Showing Login/Register.');
        authLink.innerHTML = `
            <a href="./login.html"><i class="fas fa-user"></i> Login/Register</a>
        `;
    }
}

// Listen for the DOM content loaded event
document.addEventListener('DOMContentLoaded', () => {
    updateAuthLink();

    const logoutButton = document.getElementById('logout-btn');
    if (logoutButton) {
        console.log('Adding logout functionality to the logout button.');
        logoutButton.addEventListener('click', () => {
            // Redirect to the logout functionality in `profile.js`
            logout(); // Reuse the logout function from profile.js

            // Update the navigation bar after logout
            updateAuthLink();
        });
    }
});