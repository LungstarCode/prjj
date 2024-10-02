// Store registered users
let registeredUsers = [];

// Show the login form
function showLogin() {
    document.getElementById('login').classList.add('active');
    document.getElementById('register').classList.remove('active');
    document.getElementById('register').style.display = 'none';
    document.getElementById('login').style.display = 'block';
}

// Show the registration form
function showRegister() {
    document.getElementById('register').classList.add('active');
    document.getElementById('login').classList.remove('active');
    document.getElementById('login').style.display = 'none';
    document.getElementById('register').style.display = 'block';
}

// Toggle mobile menu
function toggleMenu() {
    const menu = document.getElementById('navMenu');
    menu.classList.toggle('active');
}

// Email validation pattern
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

// Display error pop-up
function showPopup(message) {
    document.getElementById('error-message').textContent = message;
    document.getElementById('error-popup').style.display = 'block';
}

// Close error pop-up
function closePopup() {
    document.getElementById('error-popup').style.display = 'none';
}

// Validate login credentials
function validateLogin() {
    const email = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (!email) {
        showPopup('Please enter your email.');
        return;
    }
    if (!password) {
        showPopup('Please enter your password.');
        return;
    }

    // Check if the user is registered
    const user = registeredUsers.find(user => user.email === email && user.password === password);
    if (user) {
        showPopup('Login successful! Redirecting to homepage...');
        // Redirect to the homepage after a brief delay
        setTimeout(() => {
            window.location.href = 'homepage.html'; // Replace with your homepage URL
        }, 2000);
    } else {
        showPopup('Incorrect email or password.');
    }
}

// Validate registration details
function validateRegistration() {
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const repeatPassword = document.getElementById('repeat-password').value;
    const termsAccepted = document.getElementById('register-check').checked;

    // Form validation
    if (!firstName) {
        showPopup('Please enter your first name.');
        return;
    }
    if (!lastName) {
        showPopup('Please enter your last name.');
        return;
    }
    if (!validateEmail(email)) {
        showPopup('Please enter a valid email address.');
        return;
    }
    if (!password) {
        showPopup('Please enter your password.');
        return;
    }
    if (password !== repeatPassword) {
        showPopup('Passwords do not match.');
        return;
    }
    if (!termsAccepted) {
        showPopup('You must accept the terms and conditions.');
        return;
    }

    // Check if the email is already registered
    const existingUser = registeredUsers.find(user => user.email === email);
    if (existingUser) {
        showPopup('Email is already registered.');
        return;
    }

    // Store user details
    registeredUsers.push({ firstName, lastName, email, password });
    
    // Notify successful registration
    showPopup('Registration successful! Redirecting to login page...');

    // Redirect to login after a brief delay
    setTimeout(() => {
        showLogin();
        closePopup();
    }, 2000);
}

// Handle report submission
function submitReport() {
    const reportText = document.querySelector('.anonymous-report-container textarea').value;

    if (!reportText) {
        showPopup('Please enter your report.');
        return;
    }

    // Process the report (e.g., save it, send it to the server, etc.)
    showPopup('Thank you for your report. It has been submitted successfully.');

    // Clear the textarea after submission
    document.querySelector('.anonymous-report-container textarea').value = '';
}


