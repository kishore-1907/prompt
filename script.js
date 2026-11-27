
// MOBILE MENU

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("open");

    menuBtn.textContent = navLinks.classList.contains("open") ? "✕" : "☰";
    menuBtn.setAttribute(
        "aria-expanded",
        navLinks.classList.contains("open")
    );
});

document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuBtn.textContent = "☰";
        menuBtn.setAttribute("aria-expanded", "false");
    });
});


// TYPING ANIMATION

const typing = document.getElementById("typing");

const words = [
    "Web Developer",
    "Python Programmer",
    "College Student",
    "AI Enthusiast"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (!deleting) {
        typing.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
            deleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }
    } else {
        typing.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(typeEffect, deleting ? 50 : 100);
}

if (reducedMotion) {
    typing.textContent = words[0];
} else {
    typeEffect();
}


// DARK AND LIGHT MODE

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");

    const lightMode = document.body.classList.contains("light-mode");

    themeBtn.textContent = lightMode ? "🌙" : "☀️";
    themeBtn.setAttribute(
        "aria-label",
        lightMode ? "Switch to dark mode" : "Switch to light mode"
    );
});


// SCROLL REVEAL ANIMATION

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !reducedMotion) {
    const observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(function (element) {
        observer.observe(element);
    });
} else {
    revealElements.forEach(function (element) {
        element.classList.add("show");
    });
}


// SKILL PROGRESS BAR ANIMATION

const bars = document.querySelectorAll(".bar");

if ("IntersectionObserver" in window && !reducedMotion) {
    const skillObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const bar = entry.target;
                bar.style.width = bar.dataset.width;
                obs.unobserve(bar);
            }
        });
    }, {
        threshold: 0.5
    });

    bars.forEach(function (bar) {
        skillObserver.observe(bar);
    });
} else {
    bars.forEach(function (bar) {
        bar.style.width = bar.dataset.width;
    });
}


// CONTACT FORM VALIDATION

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    formStatus.className = "";

    if (name === "" || email === "" || message === "") {
        displayMessage("Please fill in all fields.", "error");
        return;
    }

    if (!emailPattern.test(email)) {
        displayMessage("Please enter a valid email address.", "error");
        return;
    }

    if (message.length < 10) {
        displayMessage("Message must contain at least 10 characters.", "error");
        return;
    }

    displayMessage(
        "Form validated successfully! This is a demo. No email was sent.",
        "success"
    );

    contactForm.reset();
});

function displayMessage(message, type) {
    formStatus.textContent = message;
    formStatus.className = type;
}


// FOOTER YEAR

document.getElementById("year").textContent = new Date().getFullYear();
