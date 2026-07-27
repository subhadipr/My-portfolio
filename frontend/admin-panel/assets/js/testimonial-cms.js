// ===============================
// AUTH CHECK
// ===============================
const token = localStorage.getItem("adminToken");

if (!token) {
    window.location.href = "login.html";
}

// ===============================
// API CONFIG
// ===============================
const BASE_URL = "https://my-portfolio-92wy.onrender.com";
const API_URL = `${BASE_URL}/api/testimonial`;

// ===============================
// UI ELEMENTS
// ===============================
const form = document.getElementById("testimonialForm");
const tableBody = document.getElementById("testimonialTableBody");

// ===============================
// LOAD TESTIMONIALS
// ===============================
async function loadTestimonials() {

    tableBody.innerHTML = `
        <tr>
            <td colspan="5" class="loading-text">
                Loading Testimonials...
            </td>
        </tr>
    `;

    try {

        const res = await fetch(API_URL);

        if (!res.ok) {
            throw new Error("Failed to load testimonials");
        }

        const testimonials = await res.json();

        tableBody.innerHTML = "";

        if (!Array.isArray(testimonials) || testimonials.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="loading-text">
                        No Testimonials Found
                    </td>
                </tr>
            `;

            return;
        }

        testimonials.forEach((item) => {

            let imageUrl = "assets/img/default-user.png";

            if (item.image) {

                imageUrl = item.image.startsWith("http")
                    ? item.image
                    : `${BASE_URL}/${item.image.replace(/^\/+/, "")}`;

            }

            tableBody.innerHTML += `
                <tr>

                    <td>

                        <div class="client-info">

                            <img
                                src="${imageUrl}"
                                alt="${item.clientName}"
                                onerror="this.src='assets/img/default-user.png'"
                            >

                            <div>

                                <div class="client-name">
                                    ${item.clientName || "-"}
                                </div>

                            </div>

                        </div>

                    </td>

                    <td>${item.company || "-"}</td>

                    <td>

                        <div class="rating">
                            ${"★".repeat(Number(item.rating || 0))}
                        </div>

                    </td>

                    <td>

                        <div class="review">
                            ${item.review || "-"}
                        </div>

                    </td>

                    <td class="text-center">

                        <button
                            class="delete-btn"
                            onclick="deleteTestimonial('${item._id}')">

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
                    Failed To Load Testimonials
                </td>
            </tr>
        `;

    }

}

// ===============================
// ADD TESTIMONIAL
// ===============================
if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append(
            "clientName",
            document.getElementById("clientName").value
        );

        formData.append(
            "company",
            document.getElementById("companyName").value
        );

        formData.append(
            "rating",
            document.getElementById("testimonialRating").value
        );

        formData.append(
            "review",
            document.getElementById("clientReview").value
        );

        const image = document.getElementById("clientImageFile").files[0];

        if (image) {
            formData.append("image", image);
        }

        try {

            const res = await fetch(API_URL, {

                method: "POST",

                headers: {
                    Authorization: `Bearer ${token}`
                },

                body: formData

            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed To Add Testimonial");
            }

            alert("✅ Testimonial Added Successfully.");

            form.reset();

            loadTestimonials();

        } catch (err) {

            console.error(err);

            alert(err.message);

        }

    });

}

// ===============================
// DELETE TESTIMONIAL
// ===============================
async function deleteTestimonial(id) {

    if (!confirm("Are you sure you want to delete this testimonial?")) {
        return;
    }

    try {

        const res = await fetch(`${API_URL}/${id}`, {

            method: "DELETE",

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Delete Failed");
        }

        alert("✅ Testimonial Deleted Successfully.");

        loadTestimonials();

    } catch (err) {

        console.error(err);

        alert(err.message);

    }

}

// ===============================
// INIT
// ===============================
document.addEventListener("DOMContentLoaded", loadTestimonials);