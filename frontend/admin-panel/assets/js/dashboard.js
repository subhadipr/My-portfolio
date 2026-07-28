// ===============================
// 🔐 AUTH CHECK
// ===============================
const token = localStorage.getItem("adminToken");

if (!token) {

    window.location.replace("/login.html");

}

// ===============================
// 🌐 API BASE URL
// ===============================
const BASE_URL = "https://my-portfolio-92wy.onrender.com";

// ===============================
// 🚪 LOGOUT
// ===============================
document.querySelector(".logout-btn").addEventListener("click", () => {

    localStorage.removeItem("adminToken");

    
    window.location.replace("/login.html");

});

// ===============================
// 📊 LOAD DASHBOARD DATA
// =============================== 
async function loadDashboardStats() {

    try {

        // ===== LEADS =====
        const leadsRes = await fetch(`${BASE_URL}/api/contact`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!leadsRes.ok) throw new Error("Leads API Failed");

        const leads = await leadsRes.json();
        document.getElementById("totalLeads").textContent = leads.length;


        // ===== PROJECTS =====
        const projRes = await fetch(`${BASE_URL}/api/projects`);

        if (!projRes.ok) throw new Error("Projects API Failed");

        const projects = await projRes.json();
        document.getElementById("totalProjects").textContent = projects.length;


        // ===== ORDERS =====
        const orderRes = await fetch(`${BASE_URL}/api/student/orders`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!orderRes.ok) throw new Error("Orders API Failed");

        const orders = await orderRes.json();
        document.getElementById("totalOrders").textContent = orders.length;


        // ===== BLOG =====
        document.getElementById("totalBlogs").textContent = "0";


        // ===== TABLE =====
        renderRecentLeads(leads);

    } catch (err) {

        console.error("Dashboard Error:", err);

        document.getElementById("leadTable").innerHTML =
            "<tr><td colspan='4'>Error loading data</td></tr>";
    }
}

// ===============================
// 📋 RENDER LEADS
// ===============================
function renderRecentLeads(leads) {

    const tbody = document.getElementById("leadTable");
    tbody.innerHTML = "";

    if (!leads || leads.length === 0) {

        tbody.innerHTML =
            "<tr><td colspan='4'>No Data Found</td></tr>";

        return;
    }

    leads.slice(0, 5).forEach((lead) => {

        tbody.innerHTML += `
        <tr>
            <td>${lead.name || "-"}</td>
            <td>${lead.email || "-"}</td>
            <td>${lead.projectType || "-"}</td>
            <td class="status ${lead.status || "new"}">${lead.status || "new"}</td>
        </tr>
        `;

    });
}

// ===============================
// 🚀 INIT
// ===============================
loadDashboardStats();