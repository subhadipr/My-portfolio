console.log("LOGIN JS LOADED");

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {

        const res = await fetch("https://my-portfolio-92wy.onrender.com/api/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await res.json();

        if (res.ok && data.token) {

            localStorage.setItem("adminToken", data.token);

            alert("Login Successful!");

            window.location.href = "admin-panel/dashboard.html";

        } else {

            alert(data.message || "Login Failed");

        }

    } catch (error) {

        console.error(error);

        alert("Server Error. Please try again.");

    }

});