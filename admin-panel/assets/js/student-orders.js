const token = localStorage.getItem("adminToken");

if (!token) window.location.href = "login.html";

async function loadOrders() {

    const res = await fetch("http://localhost:5000/api/student/orders", {
        headers: {
            Authorization: "Bearer " + token
        }
    });

    const data = await res.json();

    const tbody = document.querySelector("tbody");

    tbody.innerHTML = "";

    data.forEach(o => {

        tbody.innerHTML += `
        <tr>
        <td>${o.studentName}</td>
        <td>${o.email}</td>
        <td>${o.college}</td>
        <td>${o.projectId}</td>
        <td>${o.deadline}</td>
        <td>${o.budget}</td>
        <td>${o.status}</td>
        </tr>
        `;

    });

}

loadOrders();
