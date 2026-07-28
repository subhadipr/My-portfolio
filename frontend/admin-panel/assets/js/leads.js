// ===============================
// 🔐 AUTH & CONFIG
// ===============================
const token = localStorage.getItem("adminToken");
const API_URL = "https://my-portfolio-92wy.onrender.com/api/contact";

if (!token) {
    window.location.replace("/login.html");
}

// ===============================
// 📥 LOAD LEADS
// ===============================
async function loadLeads() {

    const tbody = document.getElementById("leadTable");

    tbody.innerHTML = `
    <tr>
        <td colspan="8" style="text-align:center;padding:40px;">
            ⏳ Loading leads...
        </td>
    </tr>`;

    try {

        const res = await fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!res.ok) throw new Error("Failed");

        const leads = await res.json();

        renderLeads(leads);

    } catch (err) {

        tbody.innerHTML = `
        <tr>
            <td colspan="8"
                style="text-align:center;color:#ef4444;padding:40px;">
                ⚠️ Error connecting to server!
            </td>
        </tr>`;

    }

}

// ===============================
// 📋 RENDER TABLE
// ===============================
function renderLeads(leads) {

    const tbody = document.getElementById("leadTable");

    tbody.innerHTML = "";

    if (!leads.length) {

        tbody.innerHTML = `
        <tr>
            <td colspan="8"
                style="text-align:center;padding:30px;">
                No leads found.
            </td>
        </tr>`;

        return;
    }

    leads.forEach((l) => {

        const row = document.createElement("tr");

        row.innerHTML = `

        <td><strong>${l.name || "-"}</strong></td>

        <td>${l.email || "-"}</td>

        <td>${l.phone || "-"}</td>

        <td>${l.projectType || "-"}</td>

        <td>${l.budget || "-"}</td>

        <td>
            <select class="status-${l.status}"
                    onchange="updateStatus('${l._id}',this)">

                <option value="new"
                    ${l.status === "new" ? "selected" : ""}>
                    New
                </option>

                <option value="contacted"
                    ${l.status === "contacted" ? "selected" : ""}>
                    Contacted
                </option>

                <option value="converted"
                    ${l.status === "converted" ? "selected" : ""}>
                    Converted
                </option>

                <option value="closed"
                    ${l.status === "closed" ? "selected" : ""}>
                    Closed
                </option>

            </select>
        </td>

        <td>
            <button class="view"
                onclick="viewLead('${l._id}')">
                View
            </button>
        </td>

        <td>
            <button class="delete"
                onclick="deleteLead('${l._id}')">
                Delete
            </button>
        </td>

        `;

        tbody.appendChild(row);

    });

}

// ===============================
// 🔄 UPDATE STATUS
// ===============================
async function updateStatus(id, select) {

    try {

        const res = await fetch(`${API_URL}/${id}`, {

            method: "PATCH",

            headers: {

                "Content-Type": "application/json",

                Authorization: `Bearer ${token}`

            },

            body: JSON.stringify({

                status: select.value

            })

        });

        if (!res.ok) throw new Error();

    } catch {

        alert("Failed to update.");

        loadLeads();

    }

}

// ===============================
// 👁 VIEW
// ===============================
async function viewLead(id) {

    try {

        const res = await fetch(`${API_URL}/${id}`, {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        if (!res.ok) throw new Error();

        const data = await res.json();

        document.getElementById("modalBody").innerHTML = `

        <p><b>Name :</b> ${data.name}</p>

        <p><b>Email :</b> ${data.email}</p>

        <p><b>Phone :</b> ${data.phone}</p>

        <p><b>Project :</b> ${data.projectType}</p>

        <p><b>Budget :</b> ${data.budget}</p>

        <p><b>Message :</b> ${data.message}</p>

        `;

        document.getElementById("leadModal").style.display = "flex";

    } catch {

        alert("Unable to load lead.");

    }

}

// ===============================
// 🗑 DELETE
// ===============================
async function deleteLead(id) {

    if (!confirm("Delete this lead?")) return;

    try {

        const res = await fetch(`${API_URL}/${id}`, {

            method: "DELETE",

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        if (!res.ok) throw new Error();

        loadLeads();

    } catch {

        alert("Delete failed.");

    }

}

// ===============================
// 🔍 SEARCH
// ===============================
function filterLeads() {

    const value =
        document.getElementById("leadSearch")
        .value
        .toLowerCase();

    document
        .querySelectorAll("#leadTable tr")
        .forEach((row) => {

            row.style.display =
                row.innerText.toLowerCase().includes(value)
                    ? ""
                    : "none";

        });

}

// ===============================
// ❌ CLOSE MODAL
// ===============================
function closeModal() {

    document.getElementById("leadModal").style.display = "none";

}

window.onclick = (e) => {

    if (e.target === document.getElementById("leadModal")) {

        closeModal();

    }

};

// ===============================
// 🚪 LOGOUT
// ===============================
function handleLogout() {

    localStorage.removeItem("adminToken");

    window.location.replace("/login.html");

}

// ===============================
// 🚀 INIT
// ===============================
loadLeads();