export async function fetchCSRFToken() {
    const response = await fetch("http://127.0.0.1:8000/api/get-csrf-token/", {
        credentials: "include",  // ✅ Allows cookies from Django backend
    });
    const data = await response.json();
    return data.csrfToken;
}
