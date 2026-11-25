document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // HEERA AI — Predefined Photography Assistant
    // ==========================================

    const form = document.getElementById("ai-chat-form");
    const input = document.getElementById("ai-chat-input");
    const messages = document.getElementById("ai-messages");
    const suggestions = document.querySelectorAll(".suggestion");

    // Floating chatbot controls (optional)
    const launcher = document.getElementById("heera-ai-launcher");
    const panel = document.getElementById("heera-ai-panel");
    const closeButton = document.getElementById("heera-ai-close");

    // ==========================================
    // FLOATING CHAT PANEL
    // ==========================================

    function openPanel() {
        if (!panel) return;

        panel.hidden = false;
        panel.setAttribute("aria-hidden", "false");

        launcher?.setAttribute("aria-expanded", "true");

        input?.focus();
    }

    function closePanel() {
        if (!panel) return;

        panel.hidden = true;
        panel.setAttribute("aria-hidden", "true");

        launcher?.setAttribute("aria-expanded", "false");
    }

    if (launcher && panel) {
        launcher.addEventListener("click", () => {
            if (panel.hidden) {
                openPanel();
            } else {
                closePanel();
            }
        });
    }

    closeButton?.addEventListener("click", closePanel);

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && panel && !panel.hidden) {
            closePanel();
        }
    });

    // ==========================================
    // VERIFY REQUIRED CHAT ELEMENTS
    // ==========================================

    if (!form || !input || !messages) {
        console.error(
            "HEERA AI: Required HTML elements not found. " +
            "Check ai-chat-form, ai-chat-input and ai-messages."
        );

        return;
    }

    // ==========================================
    // ADD CHAT MESSAGE
    // ==========================================

    function addMessage(text, sender) {
        const bubble = document.createElement("div");

        bubble.className = sender === "user"
            ? "message user-message"
            : "message bot-message";

        bubble.textContent = text;

        messages.appendChild(bubble);

        messages.scrollTop = messages.scrollHeight;
    }

    // ==========================================
    // MATCH QUESTIONS TO PREDEFINED RESPONSES
    // ==========================================

    function getReply(message) {

        const text = message
            .toLowerCase()
            .replace(/[^\p{L}\p{N}\s]/gu, " ")
            .replace(/\s+/g, " ")
            .trim();

        const has = (...words) =>
            words.some(word => text.includes(word));

        // ------------------------------------------
        // GREETINGS
        // ------------------------------------------

        if (/^(hi|hello|hey|hii|hiii|হ্যালো|নমস্কার)$/.test(text)) {
            return "Hello! Welcome to HEERA Photography. How can we help you make your special moments unforgettable?";
        }

        // ------------------------------------------
        // PRICING AND PACKAGES
        // ------------------------------------------

        const asksPrice = (has(
            "price",
            "pricing",
            "cost",
            "costs",
            "charge",
            "charges",
            "how much",
            "rate",
            "rates",
            "budget",
            "package",
            "packages",
            "দাম",
            "টাকা"
    "starting price",
    "starts from",
    "start from",
    "starting cost",
    "minimum price",
    "minimum cost",
    "starting rate",
    "start at",
    "price start",
    "prices start",
    "beginning price"
)) {
    return "Our photography packages start from INR 10,000/-. The final price depends on the type of event, coverage duration, location and your specific requirements. Feel free to contact HEERA Photography for a personalised quote.";
}

            // Pre-wedding pricing
            if (has(
                "pre wedding",
                "prewedding",
                "couple shoot",
                "engagement shoot"
            )) {
                return "Our pre-wedding shoot charges depend on the location, shoot duration, and the photography package you choose. Please contact HEERA Photography for the latest pricing and a personalised quote. We don't want to give you an incorrect price.";
            }

            // Candid photography pricing
            if (has("candid")) {
                return "Our candid photography charges depend on your event, coverage duration, and requirements. Please contact HEERA Photography for the latest pricing and a personalised quote.";
            }

            // Cinematic film pricing
            if (has(
                "cinematic",
                "videography",
                "wedding video",
                "wedding film"
            )) {
                return "Our cinematic film packages depend on the event, coverage duration, and requirements. Please contact HEERA Photography for the latest pricing and a personalised quote.";
            }

            // General pricing
            return "Our photography packages depend on your event, location, coverage duration, and requirements. Please contact HEERA Photography for the latest pricing and a personalised quote.";
        }

        // ------------------------------------------
        // BOOKING AND AVAILABILITY
        // ------------------------------------------

        if (has(
            "booking",
            "book",
            "reserve",
            "availability",
            "available date"
        )) {
            return "We would love to hear about your event! Please visit our Contact Us page and share your event date, venue and the photography services you need. Our team can then discuss availability with you.";
        }

        // ------------------------------------------
        // PRE-WEDDING PHOTOGRAPHY
        // ------------------------------------------

        if (has(
            "pre wedding",
            "prewedding",
            "engagement shoot",
            "couple shoot"
        )) {
            return "Make your love story part of the memories. Our pre-wedding photography can capture natural moments, romantic portraits and creative couple shots. Contact us to discuss your preferred style and location.";
        }

        // ------------------------------------------
        // CANDID PHOTOGRAPHY
        // ------------------------------------------

        if (has(
            "candid",
            "natural moments",
            "candid photo"
        )) {
            return "Candid photography is all about capturing genuine emotions, spontaneous smiles and those little moments you may not even notice on the day. Ask us about candid coverage for your event.";
        }

        // ------------------------------------------
        // CINEMATIC FILMS
        // ------------------------------------------

        if (has(
            "cinematic",
            "wedding film",
            "wedding video",
            "videography",
            "video"
        )) {
            return "A cinematic wedding film brings your special day back to life through meaningful moments, atmosphere and storytelling. Contact us to discuss video coverage for your celebration.";
        }

        // ------------------------------------------
        // EVENT PHOTOGRAPHY
        // ------------------------------------------

        if (has(
            "event photography",
            "birthday",
            "anniversary",
            "reception",
            "corporate event"
        )) {
            return "HEERA Photography can help you preserve the memories of your special celebrations. Tell us what kind of event you are planning, along with the date and venue, so we can discuss suitable coverage.";
        }

        // ------------------------------------------
        // WEDDING PHOTOGRAPHY
        // ------------------------------------------

        if (has(
            "wedding",
            "marriage",
            "বিয়ে",
            "বিবাহ"
        )) {
            return "Every wedding has a unique story. From emotional rituals to joyful celebrations, wedding photography helps preserve the moments you will want to revisit for years. Contact us to discuss your wedding plans.";
        }

       // ==========================================
// SERVICES
// ==========================================

if (has(
    "service",
    "services",
    "photography",
    "what do you offer",
    "what do you do",
    "shoots",
    "photoshoot",
    "photoshoots"
)) {
    return "HEERA Photography offers a wide range of photography and videography services:\n\n📸 Wedding Photography & Shoots:\n• Wedding Shoot\n• Cinematic Wedding Shoot\n• Destination Wedding Shoot\n• Vintage Wedding Shoot\n• Wedding Anniversary Shoot\n• Post Wedding Shoot\n• Candid Wedding Shoot\n• Traditional Wedding Shoot\n• Pre Wedding Shoot\n• Teaser Shoot\n\n📸 Other Photography & Shoots:\n• Drone Shoot\n• Newborn Shoot\n• Travel Shoot\n• Candid Photography\n\n🎥 Additional Services:\n• Albums\n• Traditional Videography\n• Cinematography\n\n🌿 Lifestyle Photoshoot:\n• Maternity Shoot\n• Portrait Shoot\n\n🏢 Commercial Photoshoot:\n• Fashion Shoot\n\nWhich service are you interested in? I'd be happy to help you with more details!";
}
        // ------------------------------------------
        // PORTFOLIO AND GALLERY
        // ------------------------------------------

        if (has(
            "portfolio",
            "gallery",
            "photos",
            "photographs",
            "sample work",
            "previous work"
        )) {
            return "You can explore HEERA Photography's website gallery and portfolio to get an idea of our photography style. If you have a particular look in mind, tell us whether you prefer candid, traditional, romantic or cinematic photography.";
        }

        // ------------------------------------------
        // LOCATION
        // ------------------------------------------

        if (has(
            "location",
            "where are you",
            "area",
            "kolkata",
            "west bengal",
            "travel"
        )) {
            return "Please share your event location with us. Our team can confirm whether coverage is available for your venue and whether any travel arrangements are needed.";
        }

        // ------------------------------------------
        // CONTACT DETAILS
        // ------------------------------------------

        if (has(
            "contact",
            "phone",
            "phone number",
            "mobile number",
            "email",
            "email address",
            "whatsapp",
            "contact details",
            "contact number",
            "reach you",
            "যোগাযোগ"
       )) {
    return "You can contact HEERA Photography through the following details:\n\n📞 Phone: +91 82098 25535\n📧 Email: heeraphotographyjaipur@gmail.com\n\nFor complete contact information and further enquiries, please visit our Contact Us page on this website.";
}

        // ------------------------------------------
        // ASSISTANT IDENTITY
        // ------------------------------------------

        if (has(
            "who are you",
            "who r you",
            "what is your name",
            "whats your name",
            "your name",
            "introduce yourself",
            "tell me about yourself",
            "who created you",
            "who is your owner",
            "your owner",
            "are you a bot",
            "are you an ai",
            "your details",
            "chatbot details"
        )) {
            return "Hello! I'm HEERA Assistant, here to help you explore HEERA Photography's services, learn about packages, enquire about bookings, and find information for your special day. I'm your first point of contact for photography enquiries. How may I assist you today?";
        }

        // ------------------------------------------
        // ABOUT HEERA
        // ------------------------------------------

        if (has("about", "heera")) {
            return "HEERA Photography captures meaningful celebrations through photography and visual storytelling. Explore the website to learn more about our work and services.";
        }

        // ------------------------------------------
        // CUSTOMER COMPLAINTS
        // ------------------------------------------

        if (has(
            "not satisfied",
            "unsatisfied",
            "unhappy",
            "disappointed",
            "bad service",
            "poor service",
            "worst service",
            "not good",
            "very bad",
            "complaint",
            "issue",
            "problem",
            "waste of money",
            "not worth it",
            "unprofessional",
            "খারাপ",
            "সন্তুষ্ট নই"
        )) {
            return "I'm sorry to hear that your experience has not met your expectations. At HEERA Photography, we value feedback and take concerns seriously. Could you please tell us a little more about what went wrong? You can also contact our team through the Contact Us page so we can understand your concern and help you find a suitable resolution. Thank you for bringing this to our attention.";
        }

        // ------------------------------------------
        // THANK YOU
        // ------------------------------------------

        if (has(
            "thank",
            "thanks",
            "ধন্যবাদ"
        )) {
            return "You're very welcome! Thank you for considering HEERA Photography to capture your special moments.";
        }

        // ------------------------------------------
        // HELP
        // ------------------------------------------

        if (has(
            "help",
            "options",
            "what can i ask"
        )) {
            return "I can help you explore:\n\n• Photography services\n• Wedding and pre-wedding shoots\n• Candid photography\n• Cinematic films\n• Packages and pricing enquiries\n• Booking and event locations\n• Contact information\n\nWhat would you like to know?";
        }

        // ------------------------------------------
        // DEFAULT RESPONSE
        // ------------------------------------------

        return "Thank you for your question! I'd be happy to help with your enquiry. I may not have the exact information you're looking for right now, and I don't want to give you incorrect details. Please explore the website or contact the HEERA Photography team through the Contact Us page for personalised assistance. We'll be happy to help you make your special moments memorable!";
    }

    // ==========================================
    // TYPING INDICATOR
    // ==========================================

    function showTypingIndicator() {

        const wrapper = document.createElement("div");

        wrapper.className = "message bot-message ai-typing";

       wrapper.innerHTML = `
    <span class="typing-robot">🤖</span>
    <span class="typing-content">
        <span class="typing-label">
            HEERA AI is thinking
        </span>
        <span class="typing-dots">
            <i></i>
            <i></i>
            <i></i>
        </span>
    </span>
`;

        messages.appendChild(wrapper);

        messages.scrollTop = messages.scrollHeight;

        return wrapper;
    }

    // ==========================================
    // SEND MESSAGE
    // ==========================================

    function sendMessage(value) {

        const message = value.trim();

        if (!message) return;

        addMessage(message, "user");

        input.value = "";

        input.focus();

        const typingIndicator = showTypingIndicator();

        window.setTimeout(() => {

            typingIndicator.remove();

            addMessage(getReply(message), "bot");

        }, 1100);
    }

    // ==========================================
    // FORM SUBMISSION
    // ==========================================

    form.addEventListener("submit", event => {

        event.preventDefault();

        sendMessage(input.value);

    });

    // ==========================================
    // SUGGESTION BUTTONS
    // ==========================================

    suggestions.forEach(button => {

        button.addEventListener("click", () => {

            sendMessage(
                button.dataset.message || button.textContent
            );

        });

    });

});
