// ===============================
// AUTH CHECK
// ===============================
const token = localStorage.getItem("adminToken");

if (!token) {
    window.location.replace("/login.html");
    throw new Error("Unauthorized");
}

//api helper//

async function apiRequest(url, options = {}) {

    const headers = {
        Authorization: `Bearer ${token}`,
        ...(options.headers || {})
    };

    if (!(options.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
    }

    try {

        const response = await fetch(url, {
            ...options,
            headers
        });

        if (response.status === 401) {

            alert("Session expired. Please login again.");

            localStorage.removeItem("adminToken");

            window.location.replace("/login.html");

            throw new Error("Unauthorized");
        }

        return response;

    } catch (error) {

        console.error(error);

        alert("Unable to connect to the server.");

        throw error;

    }

}

// ===============================
// API CONFIG
// ===============================
const BASE_URL = "https://my-portfolio-92wy.onrender.com";
const API_URL = `${BASE_URL}/api/blog`;

// ===============================
// UI ELEMENTS
// ===============================
const form = document.querySelector(".blog-form");
const tableBody = document.getElementById("blogTable");

// ===============================
// LOAD BLOGS
// ===============================
async function loadBlogs() {

    tableBody.innerHTML = `
        <tr>
            <td colspan="4" style="text-align:center;padding:30px;">
                Loading Blogs...
            </td>
        </tr>
    `;

    try {

        const res = await apiRequest(API_URL);

        if (!res.ok) {
            throw new Error("Failed to load blogs");
        }

        const blogs = await res.json();

        tableBody.innerHTML = "";

        if (!Array.isArray(blogs) || blogs.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align:center;padding:30px;">
                        No Articles Found
                    </td>
                </tr>
            `;

            return;
        }

        blogs.forEach(blog => {

            const date = blog.createdAt
                ? new Date(blog.createdAt).toLocaleDateString()
                : "-";

            tableBody.innerHTML += `
                <tr>

                    <td>${blog.title || "-"}</td>

                    <td>

                        <span class="badge-category">
                            ${blog.category || "General"}
                        </span>

                    </td>

                    <td>${date}</td>

                    <td>

                        <div class="action-btns">

                            <button
                                class="delete-btn"
                                onclick="deleteBlog('${blog._id}')">

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
                <td colspan="4"
                    style="text-align:center;color:red;padding:30px;">

                    Failed To Load Blogs

                </td>
            </tr>
        `;

    }

}

// ===============================
// ADD BLOG
// ===============================
if (form) {

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const blogData = {

            title: document.getElementById("blogTitle").value.trim(),

            category: document.getElementById("blogCategory").value.trim(),

            content: document.getElementById("blogContent").value.trim(),

            image: document.getElementById("blogImage").value.trim(),

            tags: document.getElementById("blogTags").value.trim()

        };

        try {

           const res = await apiRequest(API_URL, {

    method: "POST",

    body: JSON.stringify(blogData)

       });

            const data = await res.json();

            if (!res.ok) {

                throw new Error(data.message || "Blog Publish Failed");

            }

            alert("✅ Blog Published Successfully.");

            form.reset();

            loadBlogs();

        } catch (err) {

            console.error(err);

            alert(err.message);

        }

    });

}

// ===============================
// DELETE BLOG
// ===============================
async function deleteBlog(id) {

    if (!confirm("Are you sure you want to delete this blog?")) {
        return;
    }

    try {

       const res = await apiRequest(`${API_URL}/${id}`, {

    method: "DELETE"

      });

        const data = await res.json();

        if (!res.ok) {

            throw new Error(data.message || "Delete Failed");

        }

        alert("✅ Blog Deleted Successfully.");

        loadBlogs();

    } catch (err) {

        console.error(err);

        alert(err.message);

    }

}

// ===============================
// LOGOUT
// ===============================
function handleLogout() {

    if (!confirm("Are you sure you want to logout?")) {
        return;
    }

    localStorage.removeItem("adminToken");

    window.location.replace("/login.html");
}

// ===============================
// INIT
// ===============================
document.addEventListener("DOMContentLoaded", loadBlogs);