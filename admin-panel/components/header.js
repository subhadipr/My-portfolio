// Header Script With Logout

document.addEventListener("DOMContentLoaded", () => {

    console.log("Header Loaded");

    // ===== LOGOUT BUTTON =====
    const logoutBtn = document.querySelector(".logout-btn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", () => {

            // Remove Token
            localStorage.removeItem("adminToken");

            // Redirect To Login
            window.location.href = "login.html";

        });

    }

});

// Future:
    // Admin Name Load
    // Logout Button
    // Notification Bell