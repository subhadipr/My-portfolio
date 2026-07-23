const token = localStorage.getItem("adminToken");

if (!token) {
    window.location.href = "login.html";
}

const form = document.querySelector(".blog-form");
const tableBody = document.querySelector("#blogTable");

// ================= LOAD BLOGS =================

async function loadBlogs() {

    try {

        const res = await fetch("http://localhost:5000/api/blog");
        const blogs = await res.json();

        tableBody.innerHTML = "";

        if (!blogs.length) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align:center;padding:30px;">
                        No Articles Found
                    </td>
                </tr>
            `;
            return;
        }

        blogs.forEach((b) => {

            const date = new Date(b.createdAt).toLocaleDateString();

            tableBody.innerHTML += `
                <tr>
                    <td>${b.title}</td>

                    <td>
                        <span class="badge-category">
                            ${b.category || "General"}
                        </span>
                    </td>

                    <td>${date}</td>

                    <td>
                        <div class="action-btns">

                            <button
                                class="delete-btn"
                                onclick="deleteBlog('${b._id}')"
                                title="Delete Blog">

                                <i class="fa-solid fa-trash"></i>

                            </button>

                        </div>
                    </td>
                </tr>
            `;

        });

    } catch (err) {

        console.error(err);

        tableBody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center;color:red;padding:30px;">
                    Failed to Load Blogs
                </td>
            </tr>
        `;
    }

}

// ================= ADD BLOG =================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const blogData = {

        title: document.getElementById("blogTitle").value,

        category: document.getElementById("blogCategory").value,

        content: document.getElementById("blogContent").value,

        image: document.getElementById("blogImage").value,

        tags: document.getElementById("blogTags").value

    };

    try {

        const res = await fetch("http://localhost:5000/api/blog", {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                Authorization: "Bearer " + token

            },

            body: JSON.stringify(blogData)

        });

        if (!res.ok) {
            throw new Error("Publish Failed");
        }

        form.reset();

        loadBlogs();

    } catch (err) {

        console.error(err);

        alert("Blog Publish Failed");

    }

});

// ================= DELETE BLOG =================

async function deleteBlog(id) {

    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {

        const res = await fetch(`http://localhost:5000/api/blog/${id}`, {

            method: "DELETE",

            headers: {

                Authorization: "Bearer " + token

            }

        });

        if (!res.ok) {

            throw new Error("Delete Failed");

        }

        loadBlogs();

    } catch (err) {

        console.error(err);

        alert("Failed to Delete Blog");

    }

}

// ================= INIT =================

loadBlogs();