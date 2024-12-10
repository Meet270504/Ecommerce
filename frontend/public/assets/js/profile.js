// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Attach the logout function to the logout button
    const logoutButton = document.getElementById('logout-btn');

    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    } else {
        console.error('Logout button not found.');
    }

    // Fetch and display user profile data
    fetchUserProfile();
});

function logout() {
    // Clear the token cookie for the backend domain
    document.cookie = "token=; path=/; domain=shop-9bgz.onrender.com; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    console.log('User logged out.'); // Debugging

    // Redirect to the home page
    window.location.href = './index.html';
}

// Function to fetch and display user profile data
async function fetchUserProfile() {
    const emailSpan = document.getElementById('user-email');

    try {
        // Fetch user profile data from the server
        const response = await fetch('https://shop-9bgz.onrender.com/auth/profile', {
            method: 'GET',
            credentials: 'include', // Include cookies in cross-origin requests
        });

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                alert('Session expired. Please log in again.');
                window.location.href = './login.html'; // Redirect to login
            }
            throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        console.log('Profile data:', data);

        // Update the email in the DOM
        emailSpan.textContent = data.email;
    } catch (error) {
        console.error(error.message);
        alert('Failed to load profile data. Please log in again.');
        window.location.href = '/html/login.html'; // Redirect to login
    }
}