// Function to check if the user is logged in
function isLoggedIn() {
    const cookies = document.cookie.split(';');
    console.log('Cookies:', cookies); // Debugging: Log cookies
    return cookies.some(cookie => cookie.trim().startsWith('token=') && cookie.split('=')[1] !== 'undefined' && cookie.split('=')[1] !== '');
}

// Function to update navigation links dynamically
function updateAuthLink() {
    const authLink = document.getElementById('auth-link');

    if (!authLink) {
        console.error('auth-link element not found');
        return;
    }

    if (isLoggedIn()) {
        console.log('User is logged in. Updating link to Profile.'); // Debugging
        authLink.innerHTML = `
            <a href="./profile.html"><i class="fas fa-user"></i> Profile</a>
        `;
    } else {
        console.log('User is not logged in. Showing Login/Register.'); // Debugging
        authLink.innerHTML = `
            <a href="./login.html"><i class="fas fa-user"></i> Login/Register</a>
        `;
    }
}

// Run the function after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', updateAuthLink);