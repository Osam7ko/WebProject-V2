class Auth {
    constructor() {
        this.email = document.getElementById('email');
        this.password = document.getElementById('password');
        this.form = document.getElementById('login-form');
        if (this.form) {
            this.form.addEventListener('submit', this.handleLogin.bind(this));
        }

        this.forgotPasswordForm = document.getElementById('forgot-password-form');
        if (this.forgotPasswordForm) {
            this.forgotPasswordForm.addEventListener('submit', this.handleForgotPassword.bind(this));
        }
    }

    handleLogin(event) {
        event.preventDefault();
        const emailValue = this.email.value.trim();
        const passwordValue = this.password.value.trim();

        if (this.validateInputs(emailValue, passwordValue)) {
            alert('Login successful!');
            window.location.href = '/pages/home.html';
        } else {
            alert('Invalid email or password. Please try again.');
        }
    }

    handleForgotPassword(event) {
        event.preventDefault();
        const email = document.getElementById('email').value.trim();

        if (email === '') {
            alert('Please enter your email address.');
        } else {
            alert('A reset link has been sent to your email address.');
            // You can replace this alert with an actual API call to handle password reset
        }
    }

    validateInputs(email, password) {
        return email !== '' && password !== '';
    }
}

// Initialize the Auth class
new Auth();
