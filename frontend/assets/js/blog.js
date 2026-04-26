/* ================================= */
/* ===== LOAD BLOG DATA ============ */
/* ================================= */

const blogContainer = document.getElementById("blogContainer");
const featuredBlogContainer = document.getElementById("featuredBlog");
const blogEmpty = document.getElementById("blogEmpty");

async function loadBlogs() {

    try {

        const blogs = await apiRequest("/blog");

        // Empty Check
        if (!blogs || blogs.length === 0) {

            blogContainer.innerHTML = "";
            if (blogEmpty) blogEmpty.style.display = "block";
            return;
        }

        // ===== FEATURED BLOG =====
        const featured = blogs[0];

        if (featuredBlogContainer) {

            featuredBlogContainer.innerHTML = `
                <div class="project-card">
                    <span class="hero-badge">Featured</span>
                    <h3>${featured.title}</h3>
                    <p>${featured.excerpt || ""}</p>
                    <div class="hero-cta">
                        <button class="primary-btn">Read Article</button>
                    </div>
                </div>
            `;

        }

        // ===== ALL BLOGS =====
        blogContainer.innerHTML = "";

        blogs.slice(1).forEach(blog => {

            blogContainer.innerHTML += `
                <div class="project-card">

                    <span class="hero-badge">${blog.category || "Blog"}</span>

                    <h3>${blog.title}</h3>

                    <p>${blog.excerpt || ""}</p>

                    <div class="hero-cta">
                        <button class="primary-btn">Read More</button>
                    </div>

                </div>
            `;

        });

    } catch (error) {

        console.error(error);

        if (blogContainer) {
            blogContainer.innerHTML = `
                <div class="project-card">
                    <h3>Failed To Load Blogs</h3>
                </div>
            `;
        }

    }

}

/* ================================= */
/* ===== PAGE LOAD ================= */
/* ================================= */

if (blogContainer) {
    loadBlogs();
}
