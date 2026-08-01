// ===============================
// AUTH CHECK
// ===============================
const token = localStorage.getItem("adminToken");

if (!token) {
    window.location.replace("/login.html");
    throw new Error("Unauthorized");
}

// ===============================
// API CONFIG
// ===============================
const BASE_URL = "https://my-portfolio-92wy.onrender.com";
const API_URL = `${BASE_URL}/api/student/orders`;

// ===============================
// ELEMENTS
// ===============================
const orderTable = document.getElementById("orderTable");
const editForm = document.getElementById("editForm");
const editModal = document.getElementById("editModal");
const deadlineInput = document.getElementById("editDeadline");

// ===============================
// API HELPER
// ===============================
async function apiCall(url, options = {}) {

    options.headers = {
        ...options.headers,
        "Authorization": `Bearer ${token}`,
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

        console.error(err);

        alert("Server connection failed.");

        return null;

    }

}

// ===============================
// LOAD ORDERS
// ===============================
async function loadOrders() {

    orderTable.innerHTML = `
        <tr>
            <td colspan="8" style="text-align:center;">
                ⏳ Loading Orders...
            </td>
        </tr>
    `;

    const res = await apiCall(API_URL);

    if (!res) return;

    const orders = await res.json();

    orderTable.innerHTML = "";

    if (!orders.length) {

        orderTable.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center;">
                    No Orders Found
                </td>
            </tr>
        `;

        return;

    }

    orders.forEach(order => {

        const deadline = order.deadline
            ? new Date(order.deadline).toISOString().split("T")[0]
            : "-";

        orderTable.innerHTML += `
            <tr>

                <td>${order.studentName || "-"}</td>

                <td>${order.email || "-"}</td>

                <td>${order.college || "-"}</td>

                <td>${order.project || "-"}</td>

                <td>${deadline}</td>

                <td>${order.budget || "-"}</td>

                <td>
                    <span class="status ${order.status || "new"}">
                        ${order.status || "new"}
                    </span>
                </td>

                <td class="action-btns">

                    <button
                        class="update"
                        onclick="openEdit('${order._id}')">

                        Edit

                    </button>

                    <button
                        class="delete"
                        onclick="deleteOrder('${order._id}')">

                        Delete

                    </button>

                </td>

            </tr>
        `;

    });

}

// ===============================
// OPEN EDIT
// ===============================
async function openEdit(id) {

    const res = await apiCall(`${API_URL}/${id}`);

    if (!res || !res.ok) {

        alert("Order Not Found");

        return;

    }

    const order = await res.json();

    document.getElementById("editId").value = order._id;
    document.getElementById("editName").value = order.studentName || "";
    document.getElementById("editEmail").value = order.email || "";
    document.getElementById("editCollege").value = order.college || "";
    document.getElementById("editProject").value = order.project || "";
    document.getElementById("editDeadline").value =
        order.deadline
            ? new Date(order.deadline).toISOString().split("T")[0]
            : "";
    document.getElementById("editBudget").value = order.budget || "";
    document.getElementById("editStatus").value = order.status || "new";

    editModal.style.display = "flex";

}

// ===============================
// CLOSE MODAL
// ===============================
function closeEditModal() {

    editModal.style.display = "none";

}

// ===============================
// DATE PICKER
// ===============================
if (deadlineInput) {

    deadlineInput.addEventListener("click", function () {

        if (this.showPicker) {

            this.showPicker();

        }

    });

}

// ===============================
// CLICK OUTSIDE
// ===============================
window.onclick = function (event) {

    if (event.target === editModal) {

        closeEditModal();

    }

};

// ===============================
// UPDATE ORDER
// ===============================
if (editForm) {

    editForm.addEventListener("submit", async function (e) {

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

        const res = await apiCall(`${API_URL}/${id}`, {

            method: "PUT",

            body: JSON.stringify(updatedData)

        });

        if (res && res.ok) {

            alert("Order Updated Successfully.");

            closeEditModal();

            loadOrders();

        }

    });

}

// ===============================
// DELETE ORDER
// ===============================
async function deleteOrder(id) {

    if (!confirm("Delete this order?")) return;

    const res = await apiCall(`${API_URL}/${id}`, {

        method: "DELETE"

    });

    if (res && res.ok) {

        alert("Order Deleted Successfully.");

        loadOrders();

    }

}

// ===============================
// LOGOUT
// ===============================
function handleLogout() {

    if (!confirm("Are you sure you want to logout?")) return;

    localStorage.removeItem("adminToken");

    window.location.replace("/login.html");

}

// ===============================
// INIT
// ===============================
loadOrders();