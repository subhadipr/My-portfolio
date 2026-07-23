/* ================================= */
/* ===== LOAD BLOG DATA ============ */
/* ================================= */

const blogContainer = document.getElementById("blogContainer");
const featuredBlogContainer = document.getElementById("featuredBlog");
const blogEmpty = document.getElementById("blogEmpty");

async function loadBlogs() {

    try {

        const blogs = await apiRequest("/blog");

        console.log("Blogs:", blogs);

        if (!Array.isArray(blogs) || blogs.length === 0) {

            if (featuredBlogContainer) featuredBlogContainer.innerHTML = "";

            if (blogContainer) blogContainer.innerHTML = "";

            if (blogEmpty) blogEmpty.style.display = "block";

            return;
        }

        if (blogEmpty) blogEmpty.style.display = "none";

        /* ================================
           FEATURED BLOG
        ================================= */

        const featured = blogs[0];

        if (featuredBlogContainer) {

            featuredBlogContainer.innerHTML = `
                <div class="premium-card">

                    <span class="hero-badge">Featured</span>

                    <h3>${featured.title}</h3>

                    <p>${featured.excerpt || ""}</p>

                    <div class="hero-cta">
                        <button class="primary-btn">
                            Read Article
                        </button>
                    </div>

                </div>
            `;
        }

        /* ================================
           ALL BLOGS
        ================================= */

        if (blogContainer) {

            blogContainer.innerHTML = "";

            const otherBlogs = blogs.slice(1);

            if (otherBlogs.length === 0) {

                blogContainer.innerHTML = `
                    <div class="premium-card">

                        <h3>No More Articles</h3>

                        <p>More articles will be published soon.</p>

                    </div>
                `;

            } else {

                otherBlogs.forEach(blog => {

                    blogContainer.innerHTML += `
                        <div class="premium-card">

                            <span class="hero-badge">
                                ${blog.category || "Blog"}
                            </span>

                            <h3>${blog.title}</h3>

                            <p>${blog.excerpt || ""}</p>

                            <div class="hero-cta">
                                <button class="primary-btn">
                                    Read More
                                </button>
                            </div>

                        </div>
                    `;

                });

            }

        }

    } catch (error) {

        console.error("Blog Load Error:", error);

        if (featuredBlogContainer) {

            featuredBlogContainer.innerHTML = `
                <div class="premium-card">

                    <h3>Failed To Load Featured Article</h3>

                </div>
            `;
        }

        if (blogContainer) {

            blogContainer.innerHTML = `
                <div class="premium-card">

                    <h3>Failed To Load Blogs</h3>

                    <p>Please try again later.</p>

                </div>
            `;
        }

    }

}

document.addEventListener("DOMContentLoaded", loadBlogs);