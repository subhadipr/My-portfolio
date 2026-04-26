/* ================================= */
/* ===== CONTACT FORM SUBMIT ======= */
/* ================================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const formData = new FormData(contactForm);

        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            projectType: formData.get("projectType"),
            budget: formData.get("budget"),
            message: formData.get("message")
        };

        try {

            const res = await apiRequest(
                "/contact",
                "POST",
                data
            );

            alert("✅ Inquiry Sent Successfully");

            contactForm.reset();

        } catch (error) {

            alert("❌ Failed To Send Inquiry");

        }

    });

}
