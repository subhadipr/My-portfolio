// ================= CONFIG =================

const API_URL = "http://localhost:5000/api/testimonial";
const BASE_URL = "http://localhost:5000";

const token = localStorage.getItem("adminToken");

if (!token) {
    window.location.href = "login.html";
}

const form = document.getElementById("testimonialForm");
const tableBody = document.getElementById("testimonialTableBody");

// ================= LOAD TESTIMONIALS =================

async function loadTestimonials() {

    try {

        const res = await fetch(API_URL);
        const data = await res.json();

        tableBody.innerHTML = "";

        if (!Array.isArray(data) || data.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="loading-text">
                        No Testimonials Found
                    </td>
                </tr>
            `;

            return;
        }

        data.forEach(t => {

            let imageUrl = "assets/img/default-user.png";

            if (t.image) {

                if (t.image.startsWith("http")) {
                    imageUrl = t.image;
                } else {
                    imageUrl = `${BASE_URL}/${t.image.replace(/^\/+/, "")}`;
                }

            }

            tableBody.innerHTML += `
                <tr>

                    <td>
                        <div class="client-info">

                            <img
                                src="${imageUrl}"
                                alt="${t.clientName}"
                                onerror="this.src='assets/img/default-user.png'"
                            >

                            <div>
                                <div class="client-name">
                                    ${t.clientName}
                                </div>
                            </div>

                        </div>
                    </td>

                    <td class="company-name">
                        ${t.company}
                    </td>

                    <td>
                        <div class="rating">
                            ${"★".repeat(Number(t.rating))}
                        </div>
                    </td>

                    <td>
                        <div class="review">
                            ${t.review}
                        </div>
                    </td>

                    <td class="text-center">

                        <button
                            class="delete-btn"
                            onclick="deleteTestimonial('${t._id}')">

                            <i class="fas fa-trash"></i>
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
                <td colspan="5" class="loading-text">
                    Failed to load testimonials.
                </td>
            </tr>
        `;
    }

}

// ================= ADD TESTIMONIAL =================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("clientName", document.getElementById("clientName").value);
    formData.append("company", document.getElementById("companyName").value);
    formData.append("rating", document.getElementById("testimonialRating").value);
    formData.append("review", document.getElementById("clientReview").value);

    const image = document.getElementById("clientImageFile").files[0];

    if (image) {
        formData.append("image", image);
    }

    try {

        const res = await fetch(API_URL, {

            method: "POST",

            headers: {
                Authorization: "Bearer " + token
            },

            body: formData

        });

        const data = await res.json();

        if (!res.ok) {
            return alert(data.message || "Failed to add testimonial.");
        }

        alert("Testimonial Added Successfully.");

        form.reset();

        loadTestimonials();

    } catch (err) {

        console.error(err);

        alert("Server Error.");

    }

});

// ================= DELETE =================

async function deleteTestimonial(id) {

    if (!confirm("Are you sure you want to delete this testimonial?")) {
        return;
    }

    try {

        const res = await fetch(`${API_URL}/${id}`, {

            method: "DELETE",

            headers: {
                Authorization: "Bearer " + token
            }

        });

        const data = await res.json();

        if (!res.ok) {
            return alert(data.message || "Delete failed.");
        }

        alert("Deleted Successfully.");

        loadTestimonials();

    } catch (err) {

        console.error(err);

        alert("Server Error.");

    }

}

// ================= INIT =================

loadTestimonials();