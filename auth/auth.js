class Auth {
    constructor() {
        this.signupForm = document.getElementById('signup-form');
        if (this.signupForm) {
            this.signupForm.addEventListener('submit', this.handleSignup.bind(this));
        }

        this.loginForm = document.getElementById('login-form');
        if (this.loginForm) {
            this.loginForm.addEventListener('submit', this.handleLogin.bind(this));
        }
    }

    async handleSignup(event) {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirm-password').value.trim();

        if (password !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/api/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Signup successful! You can now log in.');
                window.location.href = '/auth/login.html';
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Signup error:', error);
        }
    }

    async handleLogin(event) {
        console.log("🔍 Checking stored login info BEFORE login:");
        console.log("🔹 LocalStorage Token:", localStorage.getItem("token"));
        console.log("🔹 LocalStorage Username:", localStorage.getItem("username"));
        event.preventDefault();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        console.log("🔍 Attempting login with:", { email, password });

        try {
            const response = await fetch("http://localhost:5001/api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log("🔍 Server Response:", data);

            // **Ensure login was successful before storing data**
            if (response.ok && data.token && data.username) {
                console.log("✅ Login successful, storing username & token...");

                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.username);

                console.log("🔍 Checking stored login info AFTER login:");
                console.log("🔹 LocalStorage Token:", localStorage.getItem("token"));
                console.log("🔹 LocalStorage Username:", localStorage.getItem("username"));

                alert(`Welcome back, ${data.username}!`);
                window.location.href = "/pages/home.html";
            } else {
                console.error("❌ Login failed:", data.message);
                alert(`Login failed: ${data.message}`);
            }
        } catch (error) {
            console.error("❌ Login error:", error);
            alert("An error occurred while logging in. Please try again.");
        }
    }
    
}

// Initialize the Auth class
new Auth();
