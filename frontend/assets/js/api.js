/* ================================= */
/* ========= API CONFIG ============ */
/* ================================= */

const BASE_URL = "https://my-portfolio-92wy.onrender.com";

/* ================================= */
/* ========= API REQUEST =========== */
/* ================================= */

async function apiRequest(endpoint, method = "GET", body = null) {

    const token = localStorage.getItem("adminToken");

    const headers = {
        "Content-Type": "application/json"
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const options = {
        method,
        headers
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {

        const response = await fetch(`${BASE_URL}${endpoint}`, options);

        // Session expired
        if (response.status === 401) {

            localStorage.removeItem("adminToken");

            alert("Session expired. Please login again.");

           window.location.replace("/login.html");

            return null;

        }

        // 204 No Content
        if (response.status === 204) {
            return null;
        }

        const contentType = response.headers.get("content-type");

        const data = contentType &&
            contentType.includes("application/json")
            ? await response.json()
            : null;

        if (!response.ok) {

            throw new Error(
                data?.message || "API Request Failed"
            );

        }

        return data;

    } catch (err) {

        console.error("API Error:", err);

        throw err;

    }

}