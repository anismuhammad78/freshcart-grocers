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