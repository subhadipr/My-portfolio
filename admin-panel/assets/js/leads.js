const token = localStorage.getItem("adminToken");

if (!token) window.location.href = "login.html";

async function loadLeads() {

    const res = await fetch("http://localhost:5000/api/contact", {
        headers: {
            Authorization: "Bearer " + token
        }
    });

    const data = await res.json();

    const tbody = document.querySelector("tbody");

    tbody.innerHTML = "";

    data.forEach(l => {

        tbody.innerHTML += `
        <tr>
        <td>${l.name}</td>
        <td>${l.email}</td>
        <td>${l.phone}</td>
        <td>${l.projectType}</td>
        <td>${l.budget}</td>
        <td>${l.status}</td>
        <td>
        <button onclick="deleteLead('${l._id}')">Delete</button>
        </td>
        </tr>
        `;

    });

}

async function deleteLead(id) {

    if (!confirm("Delete Lead?")) return;

    await fetch(`http://localhost:5000/api/contact/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + token
        }
    });

    loadLeads();
}

loadLeads();
