/* ================================= */
/* ===== LOAD PROJECT DATA ========= */
/* ================================= */

const projectContainer = document.querySelector(".project-grid");

async function loadProjects() {

    try {

        const projects = await apiRequest("/projects");

        // Empty Check
        if (!projects || projects.length === 0) {

            projectContainer.innerHTML = `
                <div class="project-card">
                    <h3>No Projects Found</h3>
                </div>
            `;
            return;
        }

        projectContainer.innerHTML = "";

        projects.forEach(project => {

            // Tech Tags Render
            let techHTML = "";
            if (project.techStack && project.techStack.length) {
                techHTML = project.techStack
                    .map(t => `<span>${t}</span>`)
                    .join("");
            }

            projectContainer.innerHTML += `
                <div class="project-card">

                    <span class="hero-badge">
                        ${project.projectType || "Project"}
                    </span>

                    <h3>${project.title}</h3>

                    <p>${project.description || ""}</p>

                    <div class="tech-chips">
                        ${techHTML}
                    </div>

                    <div class="hero-cta">
                        ${project.liveLink ? `
                        <a href="${project.liveLink}" target="_blank" class="primary-btn">
                            Live Demo
                        </a>` : ""}

                        ${project.githubLink ? `
                        <a href="${project.githubLink}" target="_blank" class="outline-btn">
                            GitHub
                        </a>` : ""}
                    </div>

                </div>
            `;

        });

    } catch (error) {

        console.error(error);

        projectContainer.innerHTML = `
            <div class="project-card">
                <h3>Failed To Load Projects</h3>
            </div>
        `;

    }

}

/* ================================= */
/* ===== PAGE LOAD ================= */
/* ================================= */

if (projectContainer) {
    loadProjects();
}
