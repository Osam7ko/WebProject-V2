document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    console.log("Checking authentication on page load...");
    console.log("LocalStorage Token:", token);
    console.log("LocalStorage Username:", username);

    if (!token || !username) {
        console.warn("No token or username found. Redirecting to login.");
        alert("You must log in first!");
        window.location.href = "/auth/login.html";
    }
});
