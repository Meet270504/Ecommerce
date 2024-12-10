document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('https://shop-9bgz.onrender.com/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                    credentials: 'include' // Include cookies in cross-origin requests
                });

                if (response.ok) {
                    console.log('Login response headers:', response.headers);

                    alert('Login successful!');
                    window.location.href = './index.html';
                } else {
                    const error = await response.json();
                    alert(error.message || 'Login failed.');
                }
            } catch (error) {
                console.error('Error logging in:', error);
                alert('Something went wrong. Please try again.');
            }
        });
    }
});