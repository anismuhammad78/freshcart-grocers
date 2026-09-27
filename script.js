"use strict";

/* =========================
ELEMENTS
========================= */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

const backToTop = document.querySelector(".back-to-top");

const sections = document.querySelectorAll("section[id]");

const productButtons = document.querySelectorAll(".add-product");


/* =========================
MOBILE NAVIGATION
========================= */

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation"
                : "Open navigation"
        );

        menuToggle.textContent = isOpen
            ? "✕"
            : "☰";

    });

}


/* =========================
CLOSE MOBILE MENU
========================= */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (!navMenu || !menuToggle) {
            return;
        }

        navMenu.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation"
        );

        menuToggle.textContent = "☰";

    });

});


/* =========================
ACTIVE NAVIGATION
========================= */

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }

    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        const target =
            link.getAttribute("href");

        if (target === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

}


/* Run on scroll */

window.addEventListener(
    "scroll",
    updateActiveNavigation
);


/* Run when page loads */

updateActiveNavigation();


/* =========================
BACK TO TOP
========================= */

function toggleBackToTop() {

    if (!backToTop) {
        return;
    }

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}

window.addEventListener(
    "scroll",
    toggleBackToTop
);

if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================
PRODUCT BUTTONS
========================= */

productButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            button.textContent = "✓";

            button.classList.add("added");

            button.setAttribute(
                "aria-label",
                "Product added"
            );


            setTimeout(() => {

                button.textContent = "+";

                button.classList.remove("added");

                button.setAttribute(
                    "aria-label",
                    "Add product"
                );

            }, 1200);

        }
    );

});
/* =========================
CONTACT FORM VALIDATION
========================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    const submitBtn = document.getElementById("submitBtn");
    const successToast = document.getElementById("successToast");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const fields = {
        name: { input: nameInput, error: nameError, valid: false },
        email: { input: emailInput, error: emailError, valid: false },
        message: { input: messageInput, error: messageError, valid: false }
    };

    function setFieldState(fieldKey, isValid, message) {

        const field = fields[fieldKey];
        const group = field.input.closest(".form-group");

        field.valid = isValid;
        field.error.textContent = isValid ? "" : message;

        group.classList.toggle("invalid", !isValid);
        group.classList.toggle("valid", isValid && field.input.value.trim() !== "");

    }

    function validateName() {

        const value = nameInput.value.trim();

        if (value === "") {
            setFieldState("name", false, "Name is required.");
        } else if (value.length < 2) {
            setFieldState("name", false, "Name must be at least 2 characters.");
        } else {
            setFieldState("name", true, "");
        }

    }

    function validateEmail() {

        const value = emailInput.value.trim();

        if (value === "") {
            setFieldState("email", false, "Email is required.");
        } else if (!emailPattern.test(value)) {
            setFieldState("email", false, "Please enter a valid email address.");
        } else {
            setFieldState("email", true, "");
        }

    }

    function validateMessage() {

        const value = messageInput.value.trim();

        if (value === "") {
            setFieldState("message", false, "Message is required.");
        } else if (value.length < 10) {
            setFieldState("message", false, "Message must be at least 10 characters.");
        } else {
            setFieldState("message", true, "");
        }

    }

    function updateSubmitState() {

        const allValid = fields.name.valid && fields.email.valid && fields.message.valid;

        submitBtn.disabled = !allValid;

    }

    nameInput.addEventListener("input", () => {
        validateName();
        updateSubmitState();
    });

    emailInput.addEventListener("input", () => {
        validateEmail();
        updateSubmitState();
    });

    messageInput.addEventListener("input", () => {
        validateMessage();
        updateSubmitState();
    });

    function showToast() {

        successToast.classList.add("show");

        setTimeout(() => {
            successToast.classList.remove("show");
        }, 3000);

    }

    function resetForm() {

        contactForm.reset();

        Object.keys(fields).forEach((key) => {

            const group = fields[key].input.closest(".form-group");

            fields[key].valid = false;
            fields[key].error.textContent = "";

            group.classList.remove("valid", "invalid");

        });

        submitBtn.disabled = true;

    }

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        validateName();
        validateEmail();
        validateMessage();
        updateSubmitState();

        const allValid = fields.name.valid && fields.email.valid && fields.message.valid;

        if (!allValid) {
            return;
        }

        showToast();
        resetForm();

    });

}