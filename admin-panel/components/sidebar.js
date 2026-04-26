// Sidebar Active Menu Highlight

document.addEventListener("DOMContentLoaded", () => {

    const links = document.querySelectorAll(".sidebar nav a");

    links.forEach(link => {

        link.addEventListener("click", () => {

            links.forEach(l => l.classList.remove("active"));

            link.classList.add("active");

        });

    });

});
