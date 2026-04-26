const token = localStorage.getItem("adminToken");

if (!token) window.location.href = "login.html";

const form = document.querySelector(".project-form");
const tableBody = document.querySelector("tbody");

// ================= LOAD PROJECTS =================

async function loadProjects() {

    try {

        const res = await fetch("http://localhost:5000/api/projects");
        const projects = await res.json();

        tableBody.innerHTML = "";

        projects.forEach(p => {

            tableBody.innerHTML += `
            <tr>
                <td>${p.title}</td>
                <td>${p.type || "N/A"}</td>
                <td>${p.techStack?.join(", ") || ""}</td>
                <td>
                    <button onclick="toggleFeatured('${p._id}')">
                        ${p.featured ? "Yes" : "No"}
                    </button>
                </td>
                <td>
                    <button onclick="deleteProject('${p._id}')">Delete</button>
                </td>
            </tr>
            `;

        });

    } catch (err) {
        console.log(err);
    }

}

// ================= ADD PROJECT =================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const inputs = form.querySelectorAll("input, textarea, select");

    const projectData = {
        title: inputs[0].value,
        description: inputs[1].value,
        techStack: inputs[2].value.split(","),
        demoLink: inputs[3].value,
        githubLink: inputs[4].value,
        type: inputs[5].value,
        featured: form.querySelector("input[type=checkbox]").checked
    };

    try {

        await fetch("http://localhost:5000/api/projects", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },

            body: JSON.stringify(projectData)

        });

        form.reset();
        loadProjects();

    } catch (err) {
        alert("Project Add Failed");
    }

});

// ================= DELETE =================

async function deleteProject(id) {

    if (!confirm("Delete Project?")) return;

    await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + token
        }
    });

    loadProjects();
}

// ================= FEATURE TOGGLE =================

async function toggleFeatured(id) {

    await fetch(`http://localhost:5000/api/projects/feature/${id}`, {
        method: "PATCH",
        headers: {
            Authorization: "Bearer " + token
        }
    });

    loadProjects();
}

// ================= INIT =================

loadProjects();
