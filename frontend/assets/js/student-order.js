const modal = document.getElementById("studentOrderModal");
const form = document.getElementById("studentOrderForm");

const planInput = document.getElementById("orderPlan");
const priceInput = document.getElementById("orderPrice");

const closeBtn = document.getElementById("closeOrderModal");

// Open Modal
document.querySelectorAll(".studentOrderBtn").forEach(btn => {

    btn.addEventListener("click", () => {

        modal.style.display = "flex";

        planInput.value = btn.dataset.plan;
        priceInput.value = btn.dataset.price;

    });

});

// Close Modal
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Submit Order
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = Object.fromEntries(new FormData(form));

    try {

        await apiRequest("/student/order", "POST", data);

        alert("✅ Order Submitted");

        modal.style.display = "none";
        form.reset();

    } catch {

        alert("❌ Failed to Submit Order");

    }

});
