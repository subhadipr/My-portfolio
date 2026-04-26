const token = localStorage.getItem("adminToken");

if (!token) window.location.href = "login.html";

const form = document.querySelector(".blog-form");
const tableBody = document.querySelector("tbody");

// ================= LOAD BLOGS =================

async function loadBlogs() {

    try {

        const res = await fetch("http://localhost:5000/api/blogs");
        const blogs = await res.json();

        tableBody.innerHTML = "";

        blogs.forEach(b => {

            const date = new Date(b.createdAt).toLocaleDateString();

            tableBody.innerHTML += `
            <tr>
                <td>${b.title}</td>
                <td>${b.category || "General"}</td>
                <td>${date}</td>
                <td>
                    <button onclick="deleteBlog('${b._id}')">Delete</button>
                </td>
            </tr>
            `;

        });

    } catch (err) {
        console.log(err);
    }

}

// ================= ADD BLOG =================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const inputs = form.querySelectorAll("input, textarea, select");

    const blogData = {
        title: inputs[0].value,
        content: inputs[1].value,
        category: inputs[2].value
    };

    try {

        await fetch("http://localhost:5000/api/blogs", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },

            body: JSON.stringify(blogData)

        });

        form.reset();
        loadBlogs();

    } catch (err) {
        alert("Blog Publish Failed");
    }

});

// ================= DELETE BLOG =================

async function deleteBlog(id) {

    if (!confirm("Delete Blog?")) return;

    await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + token
        }
    });

    loadBlogs();
}

// ================= INIT =================

loadBlogs();
