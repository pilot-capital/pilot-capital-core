// Helper to get CSRF token from cookie
function getCSRFToken() {
    const match = document.cookie.match(/csrftoken=([^;]+)/);
    return match ? match[1] : "";
}
// Blog API utility for frontend
export const API_BASE = "/api";

export async function fetchBlogPosts() {
    const res = await fetch(`${API_BASE}/blogposts/`);
    if (!res.ok) throw new Error("Failed to fetch blog posts");
    return res.json();
}

export async function createBlogPost(
    topic: string,
    description: string,
    token?: string
) {
    const res = await fetch(`${API_BASE}/blogposts/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCSRFToken(),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ topic, description }),
        credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to create blog post");
    return res.json();
}

export async function login(username: string, password: string) {
    const res = await fetch("/api-auth/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-CSRFToken": getCSRFToken(),
        },
        body: new URLSearchParams({ username, password }).toString(),
        credentials: "include",
    });
    if (!res.ok) throw new Error("Login failed");
    return res.text();
}

export async function logout() {
    await fetch("/api-auth/logout/", {
        method: "POST",
        credentials: "include",
    });
}
