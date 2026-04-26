console.log("LOGIN JS LOADED");

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {

        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok && data.token) {

            localStorage.setItem("adminToken", data.token);
            window.location.href = "dashboard.html";

        } else {
            alert(data.message || "Login Failed");
        }

    } catch (error) {
        console.log(error);
        alert("Server Error. Try Again.");
    }

});
