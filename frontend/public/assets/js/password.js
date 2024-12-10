// Toggle Password Visibility
document.addEventListener("DOMContentLoaded", function () {
    const togglePassword = document.querySelector(".toggle-password");
    const passwordField = document.querySelector('input[name="password"]');

    // Check if elements exist before adding event listeners
    if (togglePassword && passwordField) {
        togglePassword.addEventListener("click", () => {
            const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
            passwordField.setAttribute("type", type);
            togglePassword.textContent = type === "password" ? "👁️" : "🙈";
        });
    } else {
        console.error("Password toggle elements not found in the DOM.");
    }
});