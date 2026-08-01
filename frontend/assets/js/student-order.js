const modal = document.getElementById("studentOrderModal");
const form = document.getElementById("studentOrderForm");

const planInput = document.getElementById("orderPlan");
const priceInput = document.getElementById("orderPrice");

const closeBtn = document.getElementById("closeOrderModal");

// ===============================
// OPEN MODAL
// ===============================
document.querySelectorAll(".studentOrderBtn").forEach(btn => {

    btn.addEventListener("click", () => {

        modal.style.display = "flex";

        planInput.value = btn.dataset.plan;
        priceInput.value = btn.dataset.price;

    });

});

// ===============================
// CLOSE MODAL
// ===============================
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// ===============================
// SUBMIT ORDER
// ===============================
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = Object.fromEntries(new FormData(form));

    try {

        await apiRequest("/api/student/order", "POST", data);

        alert("✅ Order Submitted Successfully.");

        modal.style.display = "none";

        form.reset();

    } catch (error) {

        console.error(error);

        alert("❌ Failed to Submit Order");

    }

});