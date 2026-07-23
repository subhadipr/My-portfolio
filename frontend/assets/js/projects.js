/* ================================= */
/* ===== LOAD PROJECT DATA ========= */
/* ================================= */

const projectContainer =
document.querySelector(".featured-grid") ||
document.querySelector(".project-grid");

async function loadProjects() {

    if (!projectContainer) {
        console.error("❌ Project Container Not Found");
        return;
    }

    try {

        const projects = await apiRequest("/projects");

        console.log("✅ Projects Loaded:", projects);

        if (!Array.isArray(projects) || projects.length === 0) {

            projectContainer.innerHTML = `
                <div class="featured-card">
                    <h3>No Projects Found</h3>
                </div>
            `;
            return;
        }

        projectContainer.innerHTML = "";

        projects.forEach(project => {

            let techHTML = "";

            if (
                project.techStack &&
                Array.isArray(project.techStack)
            ) {

                techHTML = project.techStack
                    .map(
                        tech => `
                        <span>${tech}</span>
                        `
                    )
                    .join("");
            }

            projectContainer.innerHTML += `

                <div class="featured-card">

                    <span class="hero-badge">
                        ${project.projectType || project.type || "Project"}
                    </span>

                    <h3>
                        ${project.title || "Untitled Project"}
                    </h3>

                    <p>
                        ${project.description || "No Description Available"}
                    </p>

                    <div class="tech-chips">
                        ${techHTML}
                    </div>

                    <div class="hero-cta">

                        ${
                            project.liveLink
                            ? `
                            <a href="${project.liveLink}"
                               target="_blank"
                               class="primary-btn">
                                Live Demo
                            </a>
                            `
                            : ""
                        }

                        ${
                            project.githubLink
                            ? `
                            <a href="${project.githubLink}"
                               target="_blank"
                               class="outline-btn">
                                GitHub
                            </a>
                            `
                            : ""
                        }

                    </div>

                </div>

            `;

        });

    } catch (error) {

        console.error("❌ Project Load Error:", error);

        projectContainer.innerHTML = `
            <div class="featured-card">
                <h3>Failed To Load Projects</h3>
                <p>${error.message}</p>
            </div>
        `;
    }
}

/* ================================= */
/* ===== PAGE LOAD ================= */
/* ================================= */

document.addEventListener("DOMContentLoaded", () => {
    loadProjects();
});