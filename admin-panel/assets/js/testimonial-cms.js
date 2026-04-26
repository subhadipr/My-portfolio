const token = localStorage.getItem("adminToken");

if (!token) window.location.href = "login.html";

const form = document.querySelector(".testimonial-form");
const tableBody = document.querySelector("tbody");

// ================= LOAD TESTIMONIAL =================

async function loadTestimonials() {

    try {

        const res = await fetch("http://localhost:5000/api/testimonials");
        const data = await res.json();

        tableBody.innerHTML = "";

        data.forEach(t => {

            tableBody.innerHTML += `
            <tr>
                <td>${t.clientName}</td>
                <td>${t.company || "N/A"}</td>
                <td>${"⭐".repeat(t.rating || 5)}</td>
                <td>${t.review}</td>
                <td>
                    <button onclick="deleteTestimonial('${t._id}')">Delete</button>
                </td>
            </tr>
            `;

        });

    } catch (err) {
        console.log(err);
    }

}

// ================= ADD TESTIMONIAL =================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const inputs = form.querySelectorAll("input, textarea, select");

    const ratingText = inputs[3].value;
    let ratingNumber = 5;

    if (ratingText.includes("4")) ratingNumber = 4;
    if (ratingText.includes("3")) ratingNumber = 3;

    const testimonialData = {
        clientName: inputs[0].value,
        company: inputs[1].value,
        review: inputs[2].value,
        rating: ratingNumber
    };

    try {

        await fetch("http://localhost:5000/api/testimonials", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },

            body: JSON.stringify(testimonialData)

        });

        form.reset();
        loadTestimonials();

    } catch (err) {
        alert("Add Testimonial Failed");
    }

});

// ================= DELETE =================

async function deleteTestimonial(id) {

    if (!confirm("Delete Testimonial?")) return;

    await fetch(`http://localhost:5000/api/testimonials/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + token
        }
    });

    loadTestimonials();
}

// ================= INIT =================

loadTestimonials();
