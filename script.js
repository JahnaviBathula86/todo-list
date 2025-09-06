document.addEventListener("DOMContentLoaded", function() {
    const letters = ['T', 'O', '-', 'D', 'O'];
    const websiteName = document.getElementById("website-name");

    websiteName.innerHTML = "";
    letters.forEach(letter => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.style.color = 'black'; // Set color to black
        websiteName.appendChild(span);
    });

    // Elements for scroll animations
    const elements = [
        { text: document.getElementById("text1"), image: document.getElementById("image1") },
        { text: document.getElementById("text2"), image: document.getElementById("image2") },
        { text: document.getElementById("text3"), image: document.getElementById("image3") }
    ];

    function handleScroll() {
        elements.forEach((el) => {
            const textPosition = el.text.getBoundingClientRect().top;
            const imagePosition = el.image.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (textPosition < screenPosition) {
                el.text.classList.add("slide-in-left");
                el.text.classList.remove("hidden");
            }

            if (imagePosition < screenPosition) {
                el.image.classList.add("slide-in-left");
                el.image.classList.remove("hidden");
            }
        });
    }

    window.addEventListener("scroll", handleScroll);

    // Initial check in case elements are already in view
    handleScroll();

    // Show the sign-up popup when "Get Started" is clicked
    const getStartedBtn = document.getElementById('get-started-btn');
    const signupPopup = document.getElementById('signup-popup');

    getStartedBtn.addEventListener('click', function() {
        signupPopup.classList.remove('hidden');
        document.body.classList.add('blurred');
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const loginPopup = document.getElementById("login-popup");
    const signupPopup = document.getElementById("signup-popup");
    const loginBtn = document.querySelector(".auth-buttons .login-btn");
    const signupBtn = document.querySelector(".auth-buttons .signup-btn");
    const closeLoginBtn = loginPopup.querySelector(".close-btn");
    const closeSignupBtn = signupPopup.querySelector(".close-btn");

    // Show the login popup
    loginBtn.addEventListener("click", function() {
        loginPopup.classList.remove("hidden");
        document.body.classList.add("blurred");
    });

    // Show the sign-up popup
    signupBtn.addEventListener("click", function() {
        signupPopup.classList.remove("hidden");
        document.body.classList.add("blurred");
    });

    // Hide the login popup
    closeLoginBtn.addEventListener("click", function() {
        loginPopup.classList.add("hidden");
        document.body.classList.remove("blurred");
    });

    // Hide the sign-up popup
    closeSignupBtn.addEventListener("click", function() {
        signupPopup.classList.add("hidden");
        document.body.classList.remove("blurred");
    });

    // Hide popups when clicking outside of them
    window.addEventListener("click", function(event) {
        if (event.target === loginPopup) {
            loginPopup.classList.add("hidden");
            document.body.classList.remove("blurred");
        }
        if (event.target === signupPopup) {
            signupPopup.classList.add("hidden");
            document.body.classList.remove("blurred");
        }
    });

    // Links between login and sign-up
    document.getElementById("signup-link").addEventListener("click", function() {
        loginPopup.classList.add("hidden");
        signupPopup.classList.remove("hidden");
    });

    document.getElementById("login-link").addEventListener("click", function() {
        signupPopup.classList.add("hidden");
        loginPopup.classList.remove("hidden");
    });

    // Handle login form submission and redirect to home.html
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the default way
        // Add your authentication logic here (e.g., verifying username and password)
        window.location.href = 'home.html'; // Redirect to home.html
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Toggle password visibility for login
    const toggleLoginPassword = document.querySelector('#toggleLoginPassword');
    const loginPassword = document.querySelector('#login-password');

    toggleLoginPassword.addEventListener('click', () => {
        const type = loginPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        loginPassword.setAttribute('type', type);
        toggleLoginPassword.classList.toggle('fa-eye');
        toggleLoginPassword.classList.toggle('fa-eye-slash');
    });

    // Toggle password visibility for signup
    const toggleSignupPassword = document.querySelector('#toggleSignupPassword');
    const signupPassword = document.querySelector('#signup-password');

    toggleSignupPassword.addEventListener('click', () => {
        const type = signupPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        signupPassword.setAttribute('type', type);
        toggleSignupPassword.classList.toggle('fa-eye');
        toggleSignupPassword.classList.toggle('fa-eye-slash');
    });
});
