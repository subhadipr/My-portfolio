/* ================================= */
/* ===== DARK MODE TOGGLE ========== */
/* ================================= */

const darkToggle = document.getElementById("darkToggle");

/* ===== LOAD SAVED MODE ===== */

function loadSavedTheme() {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");

        if (darkToggle) {
            darkToggle.textContent = "☀️";
        }
    }

}

/* ===== TOGGLE CLICK ===== */

if (darkToggle) {

    darkToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            localStorage.setItem("theme", "dark");
            darkToggle.textContent = "☀️";

        } else {

            localStorage.setItem("theme", "light");
            darkToggle.textContent = "🌙";

        }

    });

}

/* ===== INIT ===== */

loadSavedTheme();

console.log("🌙 Dark Mode Ready");
