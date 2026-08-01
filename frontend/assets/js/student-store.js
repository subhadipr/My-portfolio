/* ================================= */
/* ===== LOAD STUDENT PROJECTS ===== */
/* ================================= */

const studentContainer = document.getElementById("studentProjectContainer");

async function loadStudentProjects() {

    if (!studentContainer) return;

    try {

        // ✅ FIXED HERE
       const projects = await apiRequest("/api/projects");

        // Empty Check
        if (!Array.isArray(projects) || projects.length === 0) {

            studentContainer.innerHTML = `
                <div class="project-card">
                    <h3>No Projects Available</h3>
                </div>
            `;
            return;
        }

        studentContainer.innerHTML = "";

        projects.forEach(project => {

            let techHTML = "";

            if (project.techStack && project.techStack.length) {
                techHTML = project.techStack
                    .map(t => `<span>${t}</span>`)
                    .join("");
            }

            studentContainer.innerHTML += `
                <div class="project-card">

                    <span class="hero-badge">
                        ${project.category || "Project"}
                    </span>

                    <h3>${project.title}</h3>

                    <p>${project.description || ""}</p>

                    <div class="tech-chips">
                        ${techHTML}
                    </div>

                    <h3 style="margin-top:10px;">
                        ₹ ${project.price || "Contact"}
                    </h3>

                    <div class="hero-cta">

                        <button class="primary-btn buyProjectBtn"
                            data-id="${project._id}"
                            data-title="${project.title}">
                            Buy Project
                        </button>

                    </div>

                </div>
            `;

        });

        attachBuyEvents();

    } catch (error) {

        console.error("Student Project Load Error:", error);

        if (studentContainer) {
            studentContainer.innerHTML = `
                <div class="project-card">
                    <h3>Failed To Load Projects</h3>
                </div>
            `;
        }

    }

}

/* ================================= */
/* ===== BUY BUTTON EVENT ========== */
/* ================================= */

function attachBuyEvents() {

    const buttons = document.querySelectorAll(".buyProjectBtn");

    if (!buttons.length) return;

    buttons.forEach(btn => {

        btn.addEventListener("click", () => {

            const projectTitle = btn.dataset.title;

            window.location.href =
                `contact.html?project=${encodeURIComponent(projectTitle)}`;

        });

    });

}

/* ============================= */
/* ===== SUCCESS POPUP ========= */
/* ============================= */

const successPopup = document.getElementById("successPopup");
const successOkBtn = document.getElementById("successOkBtn");

function showSuccessPopup(){
    successPopup.style.display = "flex";
}

function hideSuccessPopup(){
    successPopup.style.display = "none";
}

/* OK Button */
if(successOkBtn){
    successOkBtn.addEventListener("click", hideSuccessPopup);
}


/* ================================= */
/* ===== PAGE LOAD ================= */
/* ================================= */

document.addEventListener("DOMContentLoaded", loadStudentProjects);


