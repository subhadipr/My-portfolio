// ===============================
// AUTH CHECK
// ===============================
const token = localStorage.getItem("adminToken");

if (!token) {
    window.location.href = "login.html";
}

// ===============================
// API CONFIG
// ===============================
const BASE_URL = "https://my-portfolio-92wy.onrender.com";
const API_URL = `${BASE_URL}/api/projects`;

// ===============================
// UI ELEMENTS
// ===============================
const form = document.getElementById("projectForm");
const tableBody = document.getElementById("projectTable");
const submitBtn = form.querySelector(".save-btn");

const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const techInput = document.getElementById("tech");
const liveInput = document.getElementById("live");
const githubInput = document.getElementById("github");
const typeInput = document.getElementById("type");
const featuredInput = document.getElementById("featured");

// ===============================
// EDIT STATE
// ===============================
let editingProjectId = null;

// ===============================
// HEADERS
// ===============================
const getHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
});

// ===============================
// LOAD PROJECTS
// ===============================
async function loadProjects() {

    tableBody.innerHTML = `
        <tr>
            <td colspan="5" style="text-align:center;padding:40px;">
                <i class="fa-solid fa-spinner fa-spin fa-2x"></i>
                <p>Loading Projects...</p>
            </td>
        </tr>
    `;

    try {

        const res = await fetch(API_URL);

        if (!res.ok) throw new Error("Failed to load projects");

        const projects = await res.json();

        tableBody.innerHTML = "";

        if (!projects.length) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align:center;padding:40px;">
                        No Projects Found
                    </td>
                </tr>
            `;

            return;
        }

        projects.forEach(project => {

            tableBody.innerHTML += `
                <tr>

                    <td><strong>${project.title}</strong></td>

                    <td>${project.type || "Other"}</td>

                    <td>${(project.techStack || []).slice(0,3).join(", ")}</td>

                    <td>

                        <button
                            class="feature-btn ${project.featured ? "active" : ""}"
                            onclick="toggleFeatured('${project._id}')">

                            ${project.featured ? "⭐ Featured" : "☆ Regular"}

                        </button>

                    </td>

                    <td>

                        <button
                            class="edit-btn"
                            onclick="editProject('${project._id}')">

                            Edit

                        </button>

                        <button
                            class="delete-btn"
                            onclick="deleteProject('${project._id}')">

                            Delete

                        </button>

                    </td>

                </tr>
            `;

        });

    } catch (err) {

        console.error(err);

        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;color:red;padding:40px;">
                    Failed To Load Projects
                </td>
            </tr>
        `;

    }

}

// ===============================
// EDIT PROJECT
// ===============================
async function editProject(id) {

    try {

        const res = await fetch(`${API_URL}/${id}`);

        if (!res.ok) throw new Error("Project Not Found");

        const project = await res.json();

        titleInput.value = project.title || "";
        descriptionInput.value = project.description || "";
        techInput.value = (project.techStack || []).join(", ");
        liveInput.value = project.demoLink || "";
        githubInput.value = project.githubLink || "";
        typeInput.value = project.type || "";
        featuredInput.checked = project.featured || false;

        editingProjectId = id;

        submitBtn.innerHTML = `
            <i class="fa-solid fa-floppy-disk"></i>
            Update Project
        `;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (err) {

        console.error(err);

        alert(err.message);

    }

}

// ===============================
// SAVE PROJECT
// ===============================
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    submitBtn.disabled = true;

    submitBtn.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        Saving...
    `;

    const projectData = {

        title: titleInput.value,

        description: descriptionInput.value,

        techStack: techInput.value
            .split(",")
            .map(item => item.trim())
            .filter(Boolean),

        demoLink: liveInput.value,

        githubLink: githubInput.value,

        type: typeInput.value,

        featured: featuredInput.checked

    };

    const url = editingProjectId
        ? `${API_URL}/${editingProjectId}`
        : API_URL;

    const method = editingProjectId
        ? "PUT"
        : "POST";

    try {

        const res = await fetch(url, {

            method,

            headers: getHeaders(),

            body: JSON.stringify(projectData)

        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Operation Failed");
        }

        alert(
            editingProjectId
                ? "✅ Project Updated Successfully"
                : "🎉 Project Added Successfully"
        );

        form.reset();

        editingProjectId = null;

        submitBtn.innerHTML = `
            <i class="fa-solid fa-plus"></i>
            Add Project
        `;

        loadProjects();

    } catch (err) {

        console.error(err);

        alert(err.message);

    } finally {

        submitBtn.disabled = false;

    }

});

// ===============================
// DELETE PROJECT
// ===============================
async function deleteProject(id) {

    if (!confirm("Delete this project?")) return;

    try {

        const res = await fetch(`${API_URL}/${id}`, {

            method: "DELETE",

            headers: getHeaders()

        });

        if (!res.ok) throw new Error("Delete Failed");

        alert("🗑️ Project Deleted");

        loadProjects();

    } catch (err) {

        console.error(err);

        alert(err.message);

    }

}

// ===============================
// TOGGLE FEATURED
// ===============================
async function toggleFeatured(id) {

    try {

        const res = await fetch(`${API_URL}/feature/${id}`, {

            method: "PATCH",

            headers: getHeaders()

        });

        if (!res.ok) throw new Error("Failed");

        loadProjects();

    } catch (err) {

        console.error(err);

        alert(err.message);

    }

}

// ===============================
// REFRESH
// ===============================
function refreshProjects() {
    loadProjects();
}

// ===============================
// INIT
// ===============================
document.addEventListener("DOMContentLoaded", loadProjects);