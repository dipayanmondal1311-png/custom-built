
/* =========================================================
   HEERA PHOTOGRAPHY JAIPUR
   WEBSITE INTERACTIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------- 01. PRELOADER -------------------- */

    const preloader = document.querySelector(".preloader");

    function hidePreloader() {
        if (preloader) {
            preloader.classList.add("loaded");
        }
    }

    window.addEventListener("load", hidePreloader);

    // Fallback in case the load event has already fired.
    if (document.readyState === "complete") {
        hidePreloader();
    }


    /* -------------------- 02. MOBILE NAVIGATION -------------------- */

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    function closeMenu() {
        if (!menuToggle || !navLinks) return;

        menuToggle.classList.remove("active");
        navLinks.classList.remove("open");
        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

    if (menuToggle && navLinks) {

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.classList.toggle("active", isOpen);
            document.body.classList.toggle("menu-open", isOpen);

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 780) {
                closeMenu();
            }
        });
    }


/* =========================================================
   03. HEERA — ALL PAGES PREMIUM SCROLL ANIMATIONS
   ========================================================= */

const revealSelectors = [
    /* HOME */
    ".love-story-image",
    ".love-story-content",
    ".intro-top",
    ".intro-heading",
    ".intro-bottom",
    ".section-header",
    ".portfolio-card",
    ".service-card",
    ".about-image-wrapper",
    ".about-content",
    ".ai-visual-wrapper",
    ".ai-content",
    ".testimonial-card",
    ".booking-content",

    /* ABOUT */
    ".about-hero-content",
    ".story-heading",
    ".story-content",
    ".founder-container",
    ".vision-heading",
    ".vision-card",
    ".team-heading",
    ".team-image-wrapper",
    ".team-description",
    ".values-heading",
    ".value-item",
    ".about-cta-content",

    /* SERVICES */
    ".services-hero-content",
    ".services-intro",
    ".services-main-heading",
    ".service-detail-card",
    ".services-cta-content",

    /* TESTIMONIALS */
    ".testimonial-hero-content",
    ".featured-intro",
    ".featured-testimonial-card",
    ".reviews-heading",
    ".client-review-card",
    ".review-card",
    ".statistics-heading",
    ".statistic-item",
    ".testimonial-emotion-content",
    ".testimonial-cta-content",

    /* CONTACT */
    ".contact-hero-content",
    ".contact-intro .section-heading",
    ".contact-information",
    ".contact-form-wrapper",
    ".map-heading",
    ".map-container",
    ".contact-cta-content",
    /* WEDDING */
    ".wedding-hero-content",
    ".wedding-intro-container",
    ".wedding-types-container",
    ".wedding-story-content",
    ".wedding-gallery-container",
    ".wedding-approach-container",
    ".wedding-cta-content",
   
/* OTHER SERVICES PAGE */

'.other-services-intro',
'.other-services-locations',
'.other-services-approach',
'.other-services-cta',
'.other-services-gallery',
   
    /* FOOTERS */
    ".footer-column",
    ".footer-main"
];

/* Add reveal classes */
revealSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
        element.classList.add("reveal");
    });
});

/* Stagger animation groups */
const staggerGroups = [
    ".portfolio-grid",
    ".services-grid",
    ".testimonial-grid",
    ".vision-grid",
    ".values-grid",
    ".client-reviews-grid",
    ".statistics-grid",
   ".other-services-style-grid",
   ".other-services-gallery"
];

staggerGroups.forEach(selector => {
    document.querySelectorAll(selector).forEach(group => {
        Array.from(group.children).forEach((card, index) => {
            card.classList.add("reveal");

            card.style.setProperty(
                "--reveal-delay",
                `${Math.min(index * 120, 600)}ms`
            );
        });
    });
});
/* WEDDING CARD STAGGER */

const weddingStaggerSelectors = [
    ".wedding-type-item",
    ".wedding-story-highlight",
    ".wedding-gallery-item",
    ".wedding-approach-card"
];

weddingStaggerSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((card, index) => {
        card.classList.add("reveal");

        card.style.setProperty(
            "--reveal-delay",
            `${Math.min(index * 100, 500)}ms`
        );
    });
});
/* Intersection Observer */
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -45px 0px"
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach(element => {
        element.classList.add("visible");
    });

}


    /* -------------------- 04. CONTACT FORM -------------------- */

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        const ownerWhatsAppNumber = "918209825535";

        const nameInput = document.getElementById("fullName");
        const phoneInput = document.getElementById("phone");
        const emailInput = document.getElementById("email");
        const serviceInput = document.getElementById("service");
        const dateInput = document.getElementById("eventDate");
        const locationInput = document.getElementById("eventLocation");
        const budgetInput = document.getElementById("budget");
        const messageInput = document.getElementById("message");
        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        // Prevent visitors from selecting a past event date.
        if (dateInput) {

            const today = new Date();
            const localToday = new Date(
                today.getTime() - today.getTimezoneOffset() * 60000
            ).toISOString().split("T")[0];

            dateInput.min = localToday;
        }


        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            // Run the browser's built-in validation.
            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const fullName = nameInput.value.trim();
            const phone = phoneInput.value.trim();
            const email = emailInput.value.trim();
            const service = serviceInput.value;
            const eventDate = dateInput.value;
            const eventLocation = locationInput.value.trim();
            const budget = budgetInput.value;
            const message = messageInput.value.trim();

            // Additional basic phone-number validation.
            const cleanPhone = phone.replace(/[\s\-+]/g, "");

            if (!/^\d{10,15}$/.test(cleanPhone)) {
                phoneInput.setCustomValidity(
                    "Please enter a valid phone number."
                );

                phoneInput.reportValidity();
                phoneInput.setCustomValidity("");
                return;
            }

            // Format date for a readable WhatsApp message.
            let formattedDate = "Not specified";

            if (eventDate) {
                const dateParts = eventDate.split("-");

                formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
            }

            // Create a professional enquiry message.
            const whatsappMessage = `
*NEW WEBSITE ENQUIRY*
*HEERA PHOTOGRAPHY JAIPUR*

Hello! A new enquiry has been received through your website.

*CLIENT DETAILS*
Name: ${fullName}
Phone: ${phone}
Email: ${email || "Not provided"}

*PROJECT DETAILS*
Service: ${service}
Event Date: ${formattedDate}
Event Location: ${eventLocation || "Not specified"}
Estimated Budget: ${budget || "Not specified"}

*ADDITIONAL MESSAGE*
${message}

--------------------------------
Enquiry received through the official website.
            `.trim();

            const encodedMessage = encodeURIComponent(whatsappMessage);

            const whatsappURL =
                `https://wa.me/${ownerWhatsAppNumber}?text=${encodedMessage}`;

            // Open WhatsApp with the enquiry message.
            const whatsappWindow = window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );

            // If the browser blocks the new tab, use the current tab.
            if (!whatsappWindow) {
                window.location.href = whatsappURL;
            }

        });

    }


    /* -------------------- 05. SMOOTH INTERNAL LINKS -------------------- */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", event => {

            const targetId = anchor.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });


    /* -------------------- 06. CURRENT YEAR -------------------- */

    document.querySelectorAll("[data-current-year]").forEach(element => {
        element.textContent = new Date().getFullYear();
    });

});

// Featured Testimonial Animation
document.addEventListener("DOMContentLoaded", function () {

    const featuredCard = document.querySelector(".featured-testimonial-card");

    if (!featuredCard) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                featuredCard.classList.add("visible");
                observer.unobserve(featuredCard);
            }
        });
    }, {
        threshold: 0.1
    });

    observer.observe(featuredCard);

});


// PREMIUM GOLDEN CURSOR GLOW

document.addEventListener("DOMContentLoaded", function () {

    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        return;
    }

    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    document.body.appendChild(glow);

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener("mousemove", function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        glow.classList.add("active");
    });

    document.addEventListener("mouseleave", function () {
        glow.classList.remove("active");
    });

    function animateGlow() {
        currentX += (mouseX - currentX) * 0.12;
        currentY += (mouseY - currentY) * 0.12;

        glow.style.transform =
            `translate3d(${currentX - 80}px, ${currentY - 80}px, 0)`;

        requestAnimationFrame(animateGlow);
    }

    animateGlow();

});

/* ==========================================
   LOVE STORY — MOUSE FOLLOWING GLOW
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const section = document.querySelector(".love-story-section");
    const image = document.querySelector(".love-story-image");

    if (!section || !image) return;

    // Desktop mouse devices only
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        return;
    }

    // Background glow tracking
    section.addEventListener("mousemove", function (event) {

        const rect = section.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        section.style.setProperty("--section-glow-x", x + "px");
        section.style.setProperty("--section-glow-y", y + "px");

        section.classList.add("glow-active");
    });

    section.addEventListener("mouseleave", function () {
        section.classList.remove("glow-active");
    });

    // Photograph glow tracking
    image.addEventListener("mousemove", function (event) {

        const rect = image.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        image.style.setProperty("--image-glow-x", x + "px");
        image.style.setProperty("--image-glow-y", y + "px");

        image.classList.add("glow-active");
    });

    image.addEventListener("mouseleave", function () {
        image.classList.remove("glow-active");
    });

});

/* =========================================
   ABOUT PAGE — SCROLL RESPONSIVE BACKGROUND
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const aboutMain = document.querySelector(".about-page-main");

    if (!aboutMain) return;

    function updateHeritageZoom() {

        const rect = aboutMain.getBoundingClientRect();

        const totalScrollable = aboutMain.offsetHeight - window.innerHeight;

        if (totalScrollable <= 0) return;

        const scrolled = Math.max(
            0,
            Math.min(totalScrollable, -rect.top)
        );

        const progress = scrolled / totalScrollable;

        const zoom = 1 + (progress * 0.30);

        aboutMain.style.setProperty(
            "--heritage-zoom",
            zoom.toFixed(3)
        );
    }

    window.addEventListener("scroll", updateHeritageZoom, {
        passive: true
    });

    window.addEventListener("resize", updateHeritageZoom);

    updateHeritageZoom();

});



/* ==========================================
   HOME PAGE — SCROLL RESPONSIVE BACKGROUND ZOOM
   CINEMATIC HERO EXCLUDED
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const backgroundSections = [
        {
            section: ".intro-section",
            image: ".intro-heritage-background img",
            base: 1.06
        },
        {
            section: ".services-section",
            image: ".services-heritage-background img",
            base: 1.06
        },
        {
            section: ".testimonials-section",
            image: ".testimonial-hero-background img",
            base: 1.00
        },
        {
            section: ".booking-section",
            image: ".booking-background img",
            base: 1.04
        }
    ];

    const targets = backgroundSections
        .map(item => ({
            ...item,
            sectionElement: document.querySelector(item.section),
            imageElement: document.querySelector(item.image)
        }))
        .filter(item => item.sectionElement && item.imageElement);

    if (!targets.length) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotion.matches) return;

    let ticking = false;

    function updateBackgroundZoom() {

        const viewportHeight = window.innerHeight;

        targets.forEach(item => {

            const rect = item.sectionElement.getBoundingClientRect();

            const progress = Math.max(
                0,
                Math.min(
                    1,
                    (viewportHeight - rect.top) /
                    (viewportHeight + rect.height)
                )
            );

            const zoom = item.base + (progress * 0.12);

            item.imageElement.style.setProperty(
                "--home-scroll-zoom",
                zoom.toFixed(3)
            );

        });

        ticking = false;
    }

    function requestZoomUpdate() {

        if (!ticking) {
            window.requestAnimationFrame(updateBackgroundZoom);
            ticking = true;
        }

    }

    window.addEventListener("scroll", requestZoomUpdate, {
        passive: true
    });

    window.addEventListener("resize", requestZoomUpdate);

    updateBackgroundZoom();

});


/* ==========================================
   PREWEDDING — SCROLL RESPONSIVE BACKGROUND
   SCROLL DOWN = ZOOM OUT
   SCROLL UP = ZOOM IN
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const preweddingBackground = document.querySelector(
        ".prewedding-shared-bg"
    );

    if (!preweddingBackground) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotion.matches) return;

    let ticking = false;

    function updatePreweddingBackgroundZoom() {

        const rect = preweddingBackground.getBoundingClientRect();

        const viewportHeight = window.innerHeight;

        const totalDistance = viewportHeight + rect.height;

        const progress = Math.max(
            0,
            Math.min(
                1,
                (viewportHeight - rect.top) / totalDistance
            )
        );

        // Start zoom: 100%
        // End zoom: 140%
       const zoom = 100 + (progress * 40);

        preweddingBackground.style.setProperty(
            "--prewedding-bg-size",
            `${zoom.toFixed(2)}%`
        );

        ticking = false;
    }

    function requestZoomUpdate() {

        if (!ticking) {

            window.requestAnimationFrame(
                updatePreweddingBackgroundZoom
            );

            ticking = true;
        }
    }

    window.addEventListener("scroll", requestZoomUpdate, {
        passive: true
    });

    window.addEventListener("resize", requestZoomUpdate);

    updatePreweddingBackgroundZoom();

});

/* ==========================================
   WEDDING — SCROLL RESPONSIVE BACKGROUND ZOOM
   SCROLL DOWN = ZOOM IN
   SCROLL UP = ZOOM OUT
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const weddingIntro = document.querySelector(
        ".wedding-introduction"
    );

    const weddingCTA = document.querySelector(
        ".wedding-cta-section"
    );

    if (!weddingIntro || !weddingCTA) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotion.matches) return;

    let ticking = false;

    function updateWeddingBackgroundZoom() {

        const introRect = weddingIntro.getBoundingClientRect();
        const ctaRect = weddingCTA.getBoundingClientRect();

        const startPosition = introRect.top + window.scrollY;
        const endPosition = ctaRect.bottom + window.scrollY;

        const currentPosition = window.scrollY;

        const totalDistance = endPosition - startPosition;

        if (totalDistance <= 0) return;

        const progress = Math.max(
            0,
            Math.min(
                1,
                (currentPosition - startPosition) / totalDistance
            )
        );

        // Start: 100%
        // End: 140%
        const zoom = 1 + (progress * 0.40);

        document.body.style.setProperty(
            "--wedding-bg-zoom",
            zoom.toFixed(3)
        );

        ticking = false;
    }

    function requestZoomUpdate() {

        if (!ticking) {

            window.requestAnimationFrame(
                updateWeddingBackgroundZoom
            );

            ticking = true;
        }
    }

    window.addEventListener("scroll", requestZoomUpdate, {
        passive: true
    });

    window.addEventListener("resize", requestZoomUpdate);

    updateWeddingBackgroundZoom();

});



/* ==========================================
   EVENTS PAGE — REVEAL & SCROLL BACKGROUND
   APPEND TO EXISTING GLOBAL script.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* EVENTS REVEAL ANIMATIONS */

    const eventsSelectors = [
        ".events-hero-content",
        ".events-intro-inner",
        ".events-section-heading",
        ".events-highlights-content",
        ".events-highlight-item",
        ".events-approach-intro",
        ".events-cta"
    ];

    eventsSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add("reveal");
        });
    });


    /* EVENTS STAGGER */

    const eventsStaggerSelectors = [
        ".events-type-card",
        ".events-gallery-item",
        ".events-approach-card"
    ];

    eventsStaggerSelectors.forEach(selector => {

        document.querySelectorAll(selector).forEach((el, index) => {

            el.classList.add("reveal");

            el.style.setProperty(
                "--reveal-delay",
                `${Math.min(index * 100, 500)}ms`
            );

        });

    });


    /* EVENTS REVEAL OBSERVER */

    const eventsRevealElements = document.querySelectorAll(
        ".events-page .reveal"
    );

    if ("IntersectionObserver" in window) {

        const eventsRevealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -45px 0px"
            }
        );

        eventsRevealElements.forEach(el => {
            eventsRevealObserver.observe(el);
        });

    } else {

        eventsRevealElements.forEach(el => {
            el.classList.add("visible");
        });

    }


    /* EVENTS SCROLL RESPONSIVE BACKGROUND */

    const shared = document.querySelector(".events-shared-bg");

    if (!shared) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotion.matches) return;

    let ticking = false;

    function updateEventsZoom() {

        const rect = shared.getBoundingClientRect();

        const total = window.innerHeight + rect.height;

        const progress = Math.max(
            0,
            Math.min(
                1,
                (window.innerHeight - rect.top) / total
            )
        );

        const zoom = 100 + (progress * 40);

        shared.style.setProperty(
            "--events-bg-size",
            `${zoom.toFixed(2)}%`
        );

        ticking = false;

    }


    function requestUpdate() {

        if (!ticking) {

            requestAnimationFrame(updateEventsZoom);

            ticking = true;

        }

    }


    window.addEventListener("scroll", requestUpdate, {
        passive: true
    });

    window.addEventListener("resize", requestUpdate);

    updateEventsZoom();

});

/* ==========================================
   PORTRAIT PAGE — REVEAL & SCROLL BACKGROUND
   APPEND TO EXISTING GLOBAL script.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* PORTRAIT REVEAL ANIMATIONS */

    const portraitSelectors = [

        ".portrait-hero-content",
        ".portrait-intro-inner",
        ".portrait-section-heading",
        ".portrait-perspective-content",
        ".portrait-perspective-item",
        ".portrait-approach-intro",
        ".portrait-cta"

    ];


    portraitSelectors.forEach(selector => {

        document.querySelectorAll(selector).forEach(el => {

            el.classList.add("reveal");

        });

    });


    /* PORTRAIT STAGGER */

    const portraitStaggerSelectors = [

        ".portrait-style-card",
        ".portrait-gallery-item",
        ".portrait-approach-card"

    ];


    portraitStaggerSelectors.forEach(selector => {

        document.querySelectorAll(selector).forEach((el, index) => {

            el.classList.add("reveal");

            el.style.setProperty(
                "--reveal-delay",
                `${Math.min(index * 100, 500)}ms`
            );

        });

    });


    /* PORTRAIT REVEAL OBSERVER */

    const portraitRevealElements = document.querySelectorAll(
        ".portrait-page .reveal"
    );


    if ("IntersectionObserver" in window) {


        const portraitRevealObserver = new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12,

                rootMargin: "0px 0px -45px 0px"
            }

        );


        portraitRevealElements.forEach(el => {

            portraitRevealObserver.observe(el);

        });


    } else {


        portraitRevealElements.forEach(el => {

            el.classList.add("visible");

        });

    }


    /* PORTRAIT SCROLL RESPONSIVE BACKGROUND */

    const shared = document.querySelector(".portrait-shared-bg");


    if (!shared) return;


    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


    if (reducedMotion.matches) return;


    let ticking = false;


    function updatePortraitZoom() {


        const rect = shared.getBoundingClientRect();


        const total = window.innerHeight + rect.height;


        const progress = Math.max(

            0,

            Math.min(

                1,

                (window.innerHeight - rect.top) / total

            )

        );


        const zoom = 100 + (progress * 40);


        shared.style.setProperty(

            "--portrait-bg-size",

            `${zoom.toFixed(2)}%`

        );


        ticking = false;

    }


    function requestUpdate() {


        if (!ticking) {

            requestAnimationFrame(updatePortraitZoom);

            ticking = true;

        }

    }


    window.addEventListener("scroll", requestUpdate, {

        passive: true

    });


    window.addEventListener("resize", requestUpdate);


    updatePortraitZoom();


});


/* ==========================================
   OTHER SERVICES — SCROLL RESPONSIVE BACKGROUND
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const otherServicesBackground = document.querySelector(
        ".other-services-shared-bg"
    );

    if (!otherServicesBackground) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotion.matches) return;

    let ticking = false;

    function updateOtherServicesBackgroundZoom() {

        const rect = otherServicesBackground.getBoundingClientRect();

        const viewportHeight = window.innerHeight;

        const totalDistance = viewportHeight + rect.height;

        const progress = Math.max(
            0,
            Math.min(
                1,
                (viewportHeight - rect.top) / totalDistance
            )
        );

        const zoom = 100 + (progress * 40);

        otherServicesBackground.style.setProperty(
            "--other-services-bg-size",
            `${zoom.toFixed(2)}%`
        );

        ticking = false;
    }

    function requestZoomUpdate() {

        if (!ticking) {

            window.requestAnimationFrame(
                updateOtherServicesBackgroundZoom
            );

            ticking = true;
        }
    }

    window.addEventListener("scroll", requestZoomUpdate, {
        passive: true
    });

    window.addEventListener("resize", requestZoomUpdate);

    updateOtherServicesBackgroundZoom();

});
