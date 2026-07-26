// ================= AUTH CHECK =================
const token = localStorage.getItem("adminToken");

if (!token) {
    window.location.href = "login.html";
}

// ================= UI ELEMENTS =================
const form = document.getElementById("projectForm");
const tableBody = document.getElementById("projectTable");
const submitBtn = form.querySelector(".save-btn");

// ================= API =================
const API_URL = "https://my-portfolio-92wy.onrender.com/api/projects";

// ================= EDIT STATE =================
let editingProjectId = null;

// ================= HEADERS =================
const getHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
});

// ================= LOAD PROJECTS =================
async function loadProjects() {

    tableBody.innerHTML = `
        <tr>
            <td colspan="5" style="text-align:center;padding:40px;">
                <i class="fa-solid fa-spinner fa-spin fa-2x"></i>
                <p style="margin-top:10px;">Loading Projects...</p>
            </td>
        </tr>
    `;

    try {

        const res = await fetch(API_URL);

        if (!res.ok) {
            throw new Error("Could not fetch projects");
        }

        const projects = await res.json();

        tableBody.innerHTML = "";

        if (!projects || projects.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align:center;padding:40px;">
                        <i class="fa-regular fa-folder-open fa-2x"></i>
                        <p style="margin-top:10px;">No Projects Found</p>
                    </td>
                </tr>
            `;

            return;
        }

        projects.forEach(project => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>
                    <strong>${project.title}</strong>
                </td>

                <td>
                    ${project.type || "Other"}
                </td>

                <td>
                    ${(project.techStack || [])
                        .slice(0, 3)
                        .join(", ")}
                </td>

                <td>
                    <button
                        class="feature-btn ${project.featured ? "active" : ""}"
                        onclick="toggleFeatured('${project._id}')">

                        <i class="fa-solid ${
                            project.featured
                                ? "fa-star"
                                : "fa-star-half-stroke"
                        }"></i>

                        ${
                            project.featured
                                ? "Featured"
                                : "Regular"
                        }

                    </button>
                </td>

                <td>
                    <div class="action-btns">

                        <button
                            class="edit-btn"
                            onclick="editProject('${project._id}')"
                            title="Edit">

                            <i class="fa-solid fa-pen-to-square"></i>

                        </button>

                        <button
                            class="delete-btn"
                            onclick="deleteProject('${project._id}')"
                            title="Delete">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </div>
                </td>
            `;

            tableBody.appendChild(row);

        });

    } catch (err) {

        console.error(err);

        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;padding:40px;color:red;">
                    <i class="fa-solid fa-triangle-exclamation fa-2x"></i>
                    <p style="margin-top:10px;">
                        Failed To Load Projects
                    </p>
                </td>
            </tr>
        `;
    }
}

// ================= EDIT PROJECT =================
async function editProject(id) {

    try {

        const res = await fetch(`${API_URL}/${id}`);

        if (!res.ok) {
            throw new Error("Project Not Found");
        }

        const project = await res.json();

        document.getElementById("title").value =
            project.title || "";

        document.getElementById("description").value =
            project.description || "";

        document.getElementById("tech").value =
            (project.techStack || []).join(", ");

        document.getElementById("live").value =
            project.demoLink || "";

        document.getElementById("github").value =
            project.githubLink || "";

        document.getElementById("type").value =
            project.type || "";

        document.getElementById("featured").checked =
            project.featured || false;

        editingProjectId = id;

        submitBtn.innerHTML =
            `<i class="fa-solid fa-floppy-disk"></i> Update Project`;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (err) {

        console.error(err);

        alert("❌ Failed To Load Project");
    }
}

// ================= ADD / UPDATE PROJECT =================
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;

    submitBtn.innerHTML =
        `<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...`;

    const projectData = {

        title: document.getElementById("title").value,

        description: document.getElementById("description").value,

        techStack: document
            .getElementById("tech")
            .value
            .split(",")
            .map(item => item.trim())
            .filter(Boolean),

        demoLink: document.getElementById("live").value,

        githubLink: document.getElementById("github").value,

        type: document.getElementById("type").value,

        featured: document.getElementById("featured").checked
    };

    try {

        let res;

        if (editingProjectId) {

            res = await fetch(
                `${API_URL}/${editingProjectId}`,
                {
                    method: "PUT",
                    headers: getHeaders(),
                    body: JSON.stringify(projectData)
                }
            );

        } else {

            res = await fetch(
                API_URL,
                {
                    method: "POST",
                    headers: getHeaders(),
                    body: JSON.stringify(projectData)
                }
            );
        }

        const data = await res.json();

        if (!res.ok) {
            throw new Error(
                data.message || "Operation Failed"
            );
        }

        alert(
            editingProjectId
                ? "✅ Project Updated Successfully"
                : "🎉 Project Added Successfully"
        );

        form.reset();

        editingProjectId = null;

        submitBtn.innerHTML =
            `<i class="fa-solid fa-plus"></i> Add Project`;

        loadProjects();

    } catch (err) {

        console.error(err);

        alert(`❌ ${err.message}`);

    } finally {

        submitBtn.disabled = false;

        if (!editingProjectId) {
            submitBtn.innerHTML =
                `<i class="fa-solid fa-plus"></i> Add Project`;
        } else {
            submitBtn.innerHTML = originalText;
        }
    }
});

// ================= DELETE PROJECT =================
async function deleteProject(id) {

    const confirmDelete = confirm(
        "⚠️ Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {

        const res = await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE",
                headers: getHeaders()
            }
        );

        if (!res.ok) {
            throw new Error("Delete Failed");
        }

        alert("🗑️ Project Deleted");

        loadProjects();

    } catch (err) {

        console.error(err);

        alert("❌ Failed To Delete Project");
    }
}

// ================= TOGGLE FEATURED =================
async function toggleFeatured(id) {

    try {

        const res = await fetch(
            `${API_URL}/feature/${id}`,
            {
                method: "PATCH",
                headers: getHeaders()
            }
        );

        if (!res.ok) {
            throw new Error("Failed");
        }

        loadProjects();

    } catch (err) {

        console.error(err);

        alert("❌ Failed To Update Featured Status");
    }
}

// ================= REFRESH =================
function refreshProjects() {
    loadProjects();
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
    loadProjects();
});