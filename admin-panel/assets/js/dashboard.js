const token = localStorage.getItem("adminToken");

if (!token) {
    window.location.href = "login.html";
}

async function loadDashboardStats() {

    try {

        // Leads
        const leadsRes = await fetch("http://localhost:5000/api/contact", {
            headers: {
                Authorization: "Bearer " + token
            }
        });

        const leads = await leadsRes.json();

        document.querySelectorAll(".card p")[0].textContent = leads.length;

        // Projects
        const projRes = await fetch("http://localhost:5000/api/projects");
        const projects = await projRes.json();

        document.querySelectorAll(".card p")[1].textContent = projects.length;

        // Orders
        const orderRes = await fetch("http://localhost:5000/api/student/orders", {
            headers: {
                Authorization: "Bearer " + token
            }
        });

        const orders = await orderRes.json();
        document.querySelectorAll(".card p")[2].textContent = orders.length;

        // Blogs
        const blogRes = await fetch("http://localhost:5000/api/blogs");
        const blogs = await blogRes.json();

        document.querySelectorAll(".card p")[3].textContent = blogs.length;

        loadRecentLeads(leads);

    } catch (err) {
        console.log(err);
    }

}

function loadRecentLeads(leads) {

    const tbody = document.querySelector(".recent tbody");

    tbody.innerHTML = "";

    leads.slice(0, 5).forEach(l => {

        tbody.innerHTML += `
        <tr>
        <td>${l.name}</td>
        <td>${l.email}</td>
        <td>${l.projectType}</td>
        <td>${l.status}</td>
        </tr>
        `;

    });

}

loadDashboardStats();
