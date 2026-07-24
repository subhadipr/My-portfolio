const token = localStorage.getItem("adminToken");

if (!token) {
    window.location.href = "login.html";
}

/**
 * Common API helper
 */
async function apiCall(url, options = {}) {
    options.headers = {
        ...options.headers,
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
    };
    try {
        const res = await fetch(url, options);
        if (res.status === 401) {
            alert("Session expired. Please login again.");
            localStorage.removeItem("adminToken");
            window.location.href = "login.html";
            return null;
        }
        return res;
    } catch (err) {
        console.error("API Error:", err);
        return null;
    }
}

/**
 * Load all orders into the table
 */
async function loadOrders() {
    const tbody = document.getElementById("orderTable");
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;">⏳ Loading orders...</td></tr>`;

    const res = await apiCall("http://localhost:5000/api/student/orders");
    if (!res) return;

    const data = await res.json();
    tbody.innerHTML = "";

    if (!data || data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;">No orders found</td></tr>`;
        return;
    }

    data.forEach(o => {
        const formattedDate = o.deadline ? new Date(o.deadline).toISOString().split("T")[0] : "-";
        tbody.innerHTML += `
            <tr>
                <td>${o.studentName || '-'}</td>
                <td>${o.email || '-'}</td>
                <td>${o.college || '-'}</td>
                <td>${o.project || '-'}</td>
                <td>${formattedDate}</td>
                <td>${o.budget || '-'}</td>
                <td><span class="status ${o.status || 'new'}">${o.status || 'new'}</span></td>
                <td class="action-btns">
                    <button class="update" onclick="openEdit('${o._id}')">Edit</button>
                    <button class="delete" onclick="deleteOrder('${o._id}')">Delete</button>
                </td>
            </tr>`;
    });
}

/**
 * Open Modal and Show Calendar automatically on click
 */
async function openEdit(id) {
    const res = await apiCall(`http://localhost:5000/api/student/orders/${id}`);
    if (!res || !res.ok) return alert("Order not found!");

    const o = await res.json();

    document.getElementById("editId").value = o._id;
    document.getElementById("editName").value = o.studentName || "";
    document.getElementById("editEmail").value = o.email || "";
    document.getElementById("editCollege").value = o.college || "";
    document.getElementById("editProject").value = o.project || "";
    document.getElementById("editDeadline").value = o.deadline ? new Date(o.deadline).toISOString().split("T")[0] : "";
    document.getElementById("editBudget").value = o.budget || "";
    document.getElementById("editStatus").value = o.status || "new";

    document.getElementById("editModal").style.display = "flex";
}

/**
 * Close Modal Function
 */
function closeEditModal() {
    document.getElementById("editModal").style.display = "none";
}

// ==========================================
// 🔥 CALENDAR AUTO-OPEN LOGIC
// ==========================================
document.getElementById("editDeadline").addEventListener("click", function() {
    try {
        // This opens the native browser calendar picker immediately
        if (this.showPicker) {
            this.showPicker();
        }
    } catch (err) {
        console.warn("showPicker() not supported in this browser.");
    }
});

// Close modal if clicking outside the box
window.onclick = function(event) {
    const modal = document.getElementById("editModal");
    if (event.target == modal) {
        closeEditModal();
    }
}

/**
 * Handle Form Submit
 */
const editForm = document.getElementById("editForm");
if (editForm) {
    editForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const id = document.getElementById("editId").value;
        const updatedData = {
            studentName: document.getElementById("editName").value,
            email: document.getElementById("editEmail").value,
            college: document.getElementById("editCollege").value,
            project: document.getElementById("editProject").value,
            deadline: document.getElementById("editDeadline").value,
            budget: document.getElementById("editBudget").value,
            status: document.getElementById("editStatus").value
        };

        const res = await apiCall(`http://localhost:5000/api/student/orders/${id}`, {
            method: "PUT",
            body: JSON.stringify(updatedData)
        });

        if (res && res.ok) {
            alert("Order updated successfully!");
            closeEditModal();
            loadOrders();
        }
    });
}

/**
 * Handle Delete
 */
async function deleteOrder(id) {
    if (!confirm("Are you sure you want to delete this order?")) return;
    const res = await apiCall(`http://localhost:5000/api/student/orders/${id}`, { method: "DELETE" });
    if (res && res.ok) {
        alert("Order deleted successfully!");
        loadOrders();
    }
}

/**
 * Handle Logout
 */
function handleLogout() {
    localStorage.removeItem("adminToken");
    window.location.href = "login.html";
}

// Initialize
loadOrders();