/* ================================= */
/* ===== API BASE CONFIG =========== */
/* ================================= */

const BASE_URL = "https://my-portfolio-92wy.onrender.com";

/* ================================= */
/* ===== API REQUEST FUNCTION ====== */
/* ================================= */

async function apiRequest(endpoint, method = "GET", body = null) {

    try {

        const res = await fetch(BASE_URL + endpoint, {

            method,

            headers: {
                "Content-Type": "application/json"
            },

            body: body ? JSON.stringify(body) : null

        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "API Error");
        }

        return data;

    } catch (error) {

        console.error("API ERROR:", error);
        throw error;

    }

}
