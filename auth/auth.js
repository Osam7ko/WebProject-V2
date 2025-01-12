class Auth {
    constructor() {
        this.email = document.getElementById('email');
        this.password = document.getElementById('password');
        this.form = document.getElementById('login-form');
        this.form.addEventListener('submit', this.handleLogin.bind(this));
    }

    handleLogin(event) {
        event.preventDefault();
        const emailValue = this.email.value.trim();
        const passwordValue = this.password.value.trim();

        if (this.validateInputs(emailValue, passwordValue)) {
            alert('Login successful!');
            window.location.href = '../home.html';
        } else {
            alert('Invalid email or password. Please try again.');
        }
    }

    validateInputs(email, password) {
        return email !== '' && password !== '';
    }
}

// Initialize the Auth class
new Auth();
