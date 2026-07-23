const testimonialContainer = document.getElementById("testimonialContainer");

async function loadTestimonials() {

    if (!testimonialContainer) return;

    try {

     const testimonials = await apiRequest("/testimonial");

        if (!Array.isArray(testimonials) || testimonials.length === 0) {

            testimonialContainer.innerHTML = `
                <div class="testimonial-card">
                    <p>No testimonials available yet.</p>
                </div>
            `;
            return;
        }

        testimonialContainer.innerHTML = "";

        testimonials.forEach(item => {

            testimonialContainer.innerHTML += `
                <div class="testimonial-card">

                    <p>"${item.review}"</p>

                    <h4>${item.clientName}</h4>

                    <span>${item.company || "Client"}</span>

                    <p>⭐ ${item.rating}/5</p>

                </div>
            `;

        });

    } catch (error) {

        console.error("Testimonial Load Error:", error);

        testimonialContainer.innerHTML = `
            <div class="testimonial-card">
                <p>Failed to load testimonials.</p>
            </div>
        `;

    }

}

document.addEventListener("DOMContentLoaded", loadTestimonials);
 