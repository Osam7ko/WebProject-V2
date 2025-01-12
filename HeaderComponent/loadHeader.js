function loadHeader() {
    fetch('/HeaderComponent/header.html') // Make sure the path is correct
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
        })
        .catch(error => console.error('Error loading header:', error));
}

// Call the function when the page loads
window.onload = loadHeader;