async function isLoggedIn() {
    try {
        const response = await fetch('https://shop-9bgz.onrender.com/auth/profile', {
            method: 'GET',
            credentials: 'include' // Include cookies in the request
        });

        return response.ok;
    } catch (error) {
        console.error('Error checking login status:', error);
        return false;
    }
}

async function updateAuthLink() {
    const authLink = document.getElementById('auth-link');

    if (!authLink) {
        console.error('auth-link element not found');
        return;
    }

    const loggedIn = await isLoggedIn();

    if (loggedIn) {
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