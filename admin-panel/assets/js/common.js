// ===============================
// 🔐 INIT (run after DOM ready)
// ===============================
window.addEventListener("DOMContentLoaded", () => {

  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".overlay");

  // ===== LOAD THEME =====
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark");
  }

  // ===== AUTO CLOSE ON LINK CLICK (mobile UX) =====
  document.querySelectorAll(".sidebar a").forEach(link => {
    link.addEventListener("click", closeSidebar);
  });

  // ===== ESC KEY CLOSE =====
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSidebar();
  });

  // ===== CLICK OUTSIDE (fallback if no overlay click bound) =====
  document.addEventListener("click", (e) => {
    if (!sidebar.classList.contains("active")) return;

    const isClickInside = sidebar.contains(e.target) ||
                          e.target.closest(".menu-btn");

    if (!isClickInside) closeSidebar();
  });

});


// ===============================
// 📱 SIDEBAR TOGGLE
// ===============================
function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".overlay");

  sidebar.classList.toggle("active");
  overlay && overlay.classList.toggle("active");
}


// ===============================
// ❌ CLOSE SIDEBAR
// ===============================
function closeSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".overlay");

  sidebar.classList.remove("active");
  overlay && overlay.classList.remove("active");
}


// ===============================
// 🌙 DARK MODE
// ===============================
function toggleTheme() {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}