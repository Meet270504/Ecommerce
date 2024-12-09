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

// Function to log out the user
function logout() {
    // Clear the token cookie by setting it with an expired date
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    console.log('User logged out.');

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
            credentials: 'include', // Ensure cookies are sent with the request
        });

        if (response.status === 401 || response.status === 403) {
            console.error('Unauthorized access. Redirecting to login...');
            window.location.href = './login.html';
            return;
        }

        if (!response.ok) {
            throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        console.log('Profile data:', data);

        // Update the email in the DOM
        emailSpan.textContent = data.email;
    } catch (error) {
        console.error('Error fetching profile data:', error.message);
        alert('Failed to load profile data. Please log in again.');
        window.location.href = './login.html';
    }
}