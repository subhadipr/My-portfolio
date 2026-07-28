// ===============================
// 🚀 INIT (Run After DOM Ready)
// ===============================
window.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".overlay");

    // ===== LOAD SAVED THEME =====
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }

    // ===== AUTO CLOSE SIDEBAR ON LINK CLICK =====
    if (sidebar) {
        sidebar.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeSidebar);
        });
    }

    // ===== OVERLAY CLICK =====
    if (overlay) {
        overlay.addEventListener("click", closeSidebar);
    }

    // ===== ESC KEY CLOSE =====
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeSidebar();
        }
    });

    // ===== CLICK OUTSIDE SIDEBAR =====
    document.addEventListener("click", (e) => {

        if (!sidebar || !sidebar.classList.contains("active")) {
            return;
        }

        const clickedInsideSidebar = sidebar.contains(e.target);
        const clickedMenuButton = e.target.closest(".menu-btn");

        if (!clickedInsideSidebar && !clickedMenuButton) {
            closeSidebar();
        }

    });

});


// ===============================
// 📱 TOGGLE SIDEBAR
// ===============================
function toggleSidebar() {

    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".overlay");

    if (!sidebar) return;

    sidebar.classList.toggle("active");

    if (overlay) {
        overlay.classList.toggle("active");
    }

}


// ===============================
// ❌ CLOSE SIDEBAR
// ===============================
function closeSidebar() {

    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".overlay");

    if (!sidebar) return;

    sidebar.classList.remove("active");

    if (overlay) {
        overlay.classList.remove("active");
    }

}


// ===============================
// 🌙 TOGGLE DARK MODE
// ===============================
function toggleTheme() {

    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    localStorage.setItem("theme", isDark ? "dark" : "light");

}