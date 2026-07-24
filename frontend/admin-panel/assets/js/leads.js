// ===============================
// 🔐 AUTH & CONFIG
// ===============================
const token = localStorage.getItem("adminToken");
const API_URL = "http://localhost:5000/api/contact";

if (!token) window.location.href = "login.html";

// ===============================
// 📥 LOAD LEADS
// ===============================
async function loadLeads() {
    const tbody = document.getElementById("leadTable");
    // Updated colspan to 8 to match your new table structure
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:40px;">⏳ Loading leads...</td></tr>`;

    try {
        const res = await fetch(API_URL, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Failed to fetch");

        const leads = await res.json();
        renderLeads(leads);
    } catch (err) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; color:#ef4444; padding:40px;">⚠️ Error connecting to server!</td></tr>`;
    }
}

// ===============================
// 🧱 RENDER TABLE (Optimized for 8 Columns)
// ===============================
function renderLeads(leads) {
    const tbody = document.getElementById("leadTable");
    tbody.innerHTML = "";

    if (!leads.length) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:30px;">No leads found.</td></tr>`;
        return;
    }

    leads.forEach(l => {
        const row = document.createElement("tr");
        
        // We are splitting the data into 8 specific cells (td) 
        // to match the headers in your HTML and the CSS layout.
        row.innerHTML = `
            <td><strong>${l.name || "-"}</strong></td>
            <td>
                <div style="font-size: 13px;">${l.email || "-"}</div>
            </td>
            <td>${l.phone || "-"}</td>
            <td>${l.projectType || "-"}</td>
            <td>${l.budget || "-"}</td>
            <td>
                <select class="status-${l.status}" onchange="updateStatus('${l._id}', this)">
                    <option value="new" ${l.status === 'new' ? 'selected' : ''}>New</option>
                    <option value="contacted" ${l.status === 'contacted' ? 'selected' : ''}>Contacted</option>
                    <option value="converted" ${l.status === 'converted' ? 'selected' : ''}>Converted</option>
                    <option value="closed" ${l.status === 'closed' ? 'selected' : ''}>Closed</option>
                </select>
            </td>
            <td>
                <button class="view" onclick="viewLead('${l._id}')">View</button>
            </td>
            <td>
                <button class="delete" onclick="deleteLead('${l._id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// ===============================
// 🔄 UPDATE STATUS
// ===============================
async function updateStatus(id, selectElement) {
    const status = selectElement.value;
    selectElement.className = `status-${status}`;

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ status })
        });

        if (!res.ok) throw new Error("Update failed");
    } catch (err) {
        alert("Failed to update status on server.");
        loadLeads(); 
    }
}

// ===============================
// 👁 VIEW LEAD (MODAL)
// ===============================
async function viewLead(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();

        document.getElementById("modalBody").innerHTML = `
            <div style="display:grid; gap:12px; color: #334155;">
                <p><strong>Name:</strong> ${data.name || "-"}</p>
                <p><strong>Email:</strong> ${data.email || "-"}</p>
                <p><strong>Phone:</strong> ${data.phone || "-"}</p>
                <p><strong>Project Type:</strong> ${data.projectType || "-"}</p>
                <p><strong>Budget:</strong> ${data.budget || "-"}</p>
                <hr style="border: 0; border-top: 1px solid #eee;">
                <p><strong>Message:</strong></p>
                <div style="background: #f8fafc; padding: 10px; border-radius: 6px; font-style: italic;">
                    ${data.message || "No additional info provided."}
                </div>
            </div>
        `;
        document.getElementById("leadModal").style.display = "flex";
    } catch (err) {
        alert("Error loading lead details");
    }
}

// ===============================
// 🗑 DELETE LEAD
// ===============================
async function deleteLead(id) {
    if (!confirm("Are you sure you want to delete this lead?")) return;

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });
        
        if(res.ok) {
            loadLeads();
        } else {
            alert("Delete failed on server.");
        }
    } catch (err) {
        alert("Server error during deletion.");
    }
}

// ===============================
// 🔍 SEARCH FILTER
// ===============================
function filterLeads() {
    const value = document.getElementById("leadSearch").value.toLowerCase();
    const rows = document.querySelectorAll("#leadTable tr");

    rows.forEach(row => {
        // Only filter rows that actually contain data (skip the 'loading' or 'no leads' row)
        if (row.cells.length > 1) {
            row.style.display = row.innerText.toLowerCase().includes(value) ? "" : "none";
        }
    });
}

// ===============================
// 🚪 LOGOUT & MODAL CLOSE
// ===============================
function closeModal() {
    document.getElementById("leadModal").style.display = "none";
}

// Close modal if user clicks outside the content box
window.onclick = function(event) {
    const modal = document.getElementById("leadModal");
    if (event.target == modal) {
        closeModal();
    }
}

// Global handleLogout for the topbar button
function handleLogout() {
    localStorage.removeItem("adminToken");
    window.location.href = "login.html";
}

// Initial Call
loadLeads();