// ===============================
// 🔐 AUTH CHECK
// ===============================
const token = localStorage.getItem("adminToken");

if (!token) {
    window.location.href = "login.html";
}

// ===============================
// 🚪 LOGOUT
// ===============================
document.querySelector(".logout-btn").addEventListener("click", () => {
    localStorage.removeItem("adminToken");
    window.location.href = "login.html";
});

// ===============================
// 📊 LOAD DASHBOARD DATA
// ===============================
async function loadDashboardStats() {

    try {

        // ===== LEADS =====
        const leadsRes = await fetch("http://localhost:5000/api/contact", {
            headers: {
                Authorization: "Bearer " + token
            }
        });

        if (!leadsRes.ok) throw new Error("Leads API Failed");

        const leads = await leadsRes.json();
        document.getElementById("totalLeads").textContent = leads.length;


        // ===== PROJECTS =====
        const projRes = await fetch("http://localhost:5000/api/projects");
        const projects = await projRes.json();
        document.getElementById("totalProjects").textContent = projects.length;


        // ===== ORDERS =====
        const orderRes = await fetch("http://localhost:5000/api/student/orders", {
            headers: {
                Authorization: "Bearer " + token
            }
        });

        const orders = await orderRes.json();
        document.getElementById("totalOrders").textContent = orders.length;


        // ❌ BLOG REMOVED (404 issue fix)

        document.getElementById("totalBlogs").textContent = "0";


        // ===== RENDER TABLE =====
        renderRecentLeads(leads);

    } catch (err) {
        console.log("Dashboard Error:", err);

        document.getElementById("leadTable").innerHTML =
            "<tr><td colspan='4'>Error loading data</td></tr>";
    }
}


// ===============================
// 📋 RENDER LEADS TABLE
// ===============================
function renderRecentLeads(leads) {

    const tbody = document.getElementById("leadTable");
    tbody.innerHTML = "";

    if (!leads || leads.length === 0) {
        tbody.innerHTML = "<tr><td colspan='4'>No Data Found</td></tr>";
        return;
    }

    leads.slice(0, 5).forEach(l => {
        tbody.innerHTML += `
        <tr>
            <td>${l.name || "-"}</td>
            <td>${l.email || "-"}</td>
            <td>${l.projectType || "-"}</td>
            <td class="status ${l.status || "new"}">${l.status || "new"}</td>
        </tr>`;
    });
}


// ===============================
// 🚀 INIT
// ===============================
loadDashboardStats();

