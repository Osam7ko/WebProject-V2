function loadHeader() {
    fetch('/HeaderComponent/header.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);

            setTimeout(() => { // Small delay ensures values are loaded
                const token = localStorage.getItem('token');
                const username = localStorage.getItem('username');
                const loginLink = document.querySelector('a[href="/auth/login.html"]');
                const signupLink = document.querySelector('a[href="/auth/regester.html"]');
                const nav = document.querySelector('.navigation');
                const welcomeUser = document.querySelector('#welcome-user');

                console.log("🔍 loadHeader.js - Checking stored values...");
                console.log("Token:", token);
                console.log("Username:", username);

                if (token && username) {
                    welcomeUser.textContent = `Welcome, ${username}`;

                    if (loginLink) loginLink.style.display = 'none';
                    if (signupLink) signupLink.style.display = 'none';

                    const logoutLink = document.createElement('a');
                    logoutLink.textContent = 'Logout';
                    logoutLink.className = 'logout-link';
                    logoutLink.style.cursor = 'pointer';
                    logoutLink.style.marginLeft = '20px';
                    logoutLink.style.color = 'red';
                    nav.appendChild(logoutLink);

                    logoutLink.addEventListener('click', () => {
                        console.log("Logging out, clearing localStorage...");
                        
                        // Properly clear storage on logout
                        localStorage.clear();

                        alert('Logged out successfully!');
                        window.location.href = '/auth/login.html';
                    });
                } else {
                    welcomeUser.textContent = '';
                    if (loginLink) loginLink.style.display = 'block';
                    if (signupLink) signupLink.style.display = 'block';
                }
            }, 500); // Small delay ensures values are loaded
        })
        .catch(error => console.error('Error loading header:', error));
}

window.onload = loadHeader;
