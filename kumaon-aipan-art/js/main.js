// Kumaon Aipan Art - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {

    // Interface text in the page's language (Hindi pages have <html lang="hi">)
    const LANG = document.documentElement.lang === 'hi' ? 'hi' : 'en';
    // Hindi pages live one folder down, so asset paths need "../"
    const BASE = document.documentElement.dataset.base || '';
    const T = {
        en: {
            openMenu: 'Open menu',
            closeMenu: 'Close menu',
            showing: (shown, total) => `Showing ${shown} of ${total} products`,
            noMatch: (query) => `No products match "${query}". Try another word, or choose All Products.`,
            emptyCategory: 'No products in this category yet.',
            whatsappText: (title, price) => `Hi! I am interested in the ${title} (${price}). Is it available?`,
            whatsappLabel: (title) => `Enquire on WhatsApp about ${title} (opens in a new tab)`,
            enquirySubject: (product) => `Enquiry: ${product}`,
            enquiryMessage: (product) => `Hello, I'd like to know more about the ${product}. `,
            inquirySubject: (type) => `Inquiry: ${type}`,
            fillAll: 'Please fill out all the fields.',
            invalidEmail: 'Please enter a valid email address.',
            emailApp: 'Your email app should open with this message ready to send.',
            sent: 'Thank you! Your message has been sent. We will reach out shortly.',
            newsletterClosed: 'Newsletter sign-up is not open yet. Please check back soon.',
            subscribed: 'Success! You have subscribed to our updates.',
            sendFailed: 'Sorry, your message could not be sent. Please email us directly.',
        },
        hi: {
            openMenu: 'मेनू खोलें',
            closeMenu: 'मेनू बंद करें',
            showing: (shown, total) => `कुल ${total} में से ${shown} उत्पाद दिख रहे हैं`,
            noMatch: (query) => `"${query}" से जुड़ा कोई उत्पाद नहीं मिला। कोई दूसरा शब्द आज़माएँ, या सभी उत्पाद चुनें।`,
            emptyCategory: 'इस श्रेणी में अभी कोई उत्पाद नहीं है।',
            whatsappText: (title, price) => `नमस्ते! मुझे ${title} (${price}) में रुचि है। क्या यह उपलब्ध है?`,
            whatsappLabel: (title) => `${title} के बारे में व्हाट्सऐप पर पूछें (नए टैब में खुलता है)`,
            enquirySubject: (product) => `पूछताछ: ${product}`,
            enquiryMessage: (product) => `नमस्ते, मुझे ${product} के बारे में और जानकारी चाहिए। `,
            inquirySubject: (type) => `पूछताछ: ${type}`,
            fillAll: 'कृपया सभी जानकारी भरें।',
            invalidEmail: 'कृपया सही ईमेल पता लिखें।',
            emailApp: 'संदेश भेजने के लिए आपका ईमेल ऐप खुलेगा, जिसमें यह संदेश पहले से लिखा होगा।',
            sent: 'धन्यवाद! आपका संदेश भेज दिया गया है। हम जल्द ही आपसे संपर्क करेंगे।',
            newsletterClosed: 'न्यूज़लेटर के लिए पंजीकरण अभी शुरू नहीं हुआ है। कृपया बाद में देखें।',
            subscribed: 'धन्यवाद! आपने हमारे अपडेट पाने के लिए सदस्यता ले ली है।',
            sendFailed: 'क्षमा करें, आपका संदेश नहीं भेजा जा सका। कृपया हमें सीधे ईमेल करें।',
        },
    }[LANG];
    // 1. Mobile Navigation Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    function setMenuOpen(open) {
        if (!menuToggle || !navLinks) return;
        navLinks.classList.toggle('active', open);
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', open ? T.closeMenu : T.openMenu);

        // Animate hamburger bars into an X
        const bars = menuToggle.querySelectorAll('span');
        bars[0].style.transform = open ? 'rotate(45deg) translate(6px, 6px)' : 'none';
        bars[1].style.opacity = open ? '0' : '1';
        bars[2].style.transform = open ? 'rotate(-45deg) translate(6px, -6px)' : 'none';
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            setMenuOpen(!navLinks.classList.contains('active'));
        });

        // Escape closes the menu and returns focus to the toggle
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                setMenuOpen(false);
                menuToggle.focus();
            }
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(item => {
        item.addEventListener('click', () => setMenuOpen(false));
    });

    // 2. Product Catalogue Filtering & Live Search
    const searchInput = document.getElementById('catalog-search');
    const filterPills = document.querySelectorAll('.filter-pill');
    const productCards = document.querySelectorAll('.product-card');

    // Say how many products are showing, including when nothing matches (also read out by screen readers)
    const resultsStatus = document.getElementById('results-status');
    function updateResultsStatus(query) {
        if (!resultsStatus) return;
        const shown = [...productCards].filter(card => card.style.display !== 'none').length;
        if (shown) {
            resultsStatus.textContent = T.showing(shown, productCards.length);
        } else if (query) {
            resultsStatus.textContent = T.noMatch(query);
        } else {
            resultsStatus.textContent = T.emptyCategory;
        }
        resultsStatus.classList.toggle('is-empty', !shown);
    }
    updateResultsStatus();

    let currentCategory = 'all';
    let searchQuery = '';

    function filterProducts() {
        productCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const title = card.querySelector('h3').innerText.toLowerCase();
            const meta = card.querySelector('.product-meta').innerText.toLowerCase();
            
            const categoryMatches = (currentCategory === 'all' || category === currentCategory);
            const searchMatches = (title.includes(searchQuery) || meta.includes(searchQuery));

            if (categoryMatches && searchMatches) {
                card.style.display = 'block';
                card.style.animation = 'slideUp 0.3s ease-out forwards';
            } else {
                card.style.display = 'none';
            }
        });
        updateResultsStatus(searchQuery);
    }

    if (filterPills.length && productCards.length) {
        filterPills.forEach(pill => {
            pill.addEventListener('click', () => {
                filterPills.forEach(p => {
                    p.classList.remove('active');
                    p.setAttribute('aria-pressed', 'false');
                });
                pill.classList.add('active');
                pill.setAttribute('aria-pressed', 'true');

                currentCategory = pill.getAttribute('data-filter');
                filterProducts();
            });
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            filterProducts();
        });
    }

    // 3. Product Details Modal
    const modal = document.getElementById('product-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const viewButtons = document.querySelectorAll('.product-btn');

    // Product details come from _data/<site>.json, embedded in the page at build time
    const productDataEl = document.getElementById('product-data');
    const productData = productDataEl
        ? Object.fromEntries(JSON.parse(productDataEl.textContent).map(p => [p.id, p]))
        : {};

    let lastFocused = null;

    function openModal(data) {
        document.getElementById('modal-title').innerText = data.title;
        document.getElementById('modal-category').innerText = data.category;
        document.getElementById('modal-price').innerText = data.price;
        document.getElementById('modal-description').innerText = data.description;
        document.getElementById('modal-image').src = BASE + data.img + '-800.webp';
        document.getElementById('modal-image').alt = data.title;

        // Contact page link carries the product, so the form is filled in on arrival
        const inquireLink = modal.querySelector('.modal-actions a[href^="contact.html"]');
        if (inquireLink) {
            inquireLink.href = `contact.html?product=${encodeURIComponent(`${data.title} (${data.price})`)}`;
        }

        // WhatsApp link pre-filled with the product name and price
        const whatsappBtn = document.getElementById('modal-whatsapp');
        if (whatsappBtn) {
            const text = T.whatsappText(data.title, data.price);
            // No number configured (demo): wa.me without a number lets the visitor pick the chat
            whatsappBtn.href = `https://wa.me/${whatsappBtn.dataset.whatsapp || ''}?text=${encodeURIComponent(text)}`;
            whatsappBtn.setAttribute('aria-label', T.whatsappLabel(data.title));
        }

        lastFocused = document.activeElement;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        closeModalBtn.focus();
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        // Return focus to the button that opened the modal
        if (lastFocused) lastFocused.focus();
    }

    if (viewButtons.length && modal && closeModalBtn) {
        viewButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const data = productData[btn.getAttribute('data-id')];
                if (data) openModal(data);
            });
        });

        closeModalBtn.addEventListener('click', closeModal);

        // Close modal when clicking outside content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Escape closes; Tab stays inside the modal while it is open
        document.addEventListener('keydown', (e) => {
            if (modal.style.display !== 'flex') return;
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'Tab') {
                const focusable = modal.querySelectorAll('a[href], button');
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        });
    }

    // 4. Contact Form and Newsletter
    // To receive submissions, create a free form at https://formspree.io (or similar)
    // and paste its URL into the form's data-endpoint attribute in the HTML.
    // Until then, the contact form opens the visitor's email app addressed to data-mailto.
    const contactForm = document.querySelector('.js-contact-form');
    const enquiredProduct = new URLSearchParams(window.location.search).get('product');
    if (contactForm && enquiredProduct) {
        const subject = document.getElementById('subject');
        const type = document.getElementById('inquiry-type');
        const message = document.getElementById('message');
        if (subject) subject.value = T.enquirySubject(enquiredProduct);
        if (type && !type.value) type.value = 'retail';
        if (message && !message.value) message.value = T.enquiryMessage(enquiredProduct);
    }
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const fields = Object.fromEntries(new FormData(contactForm));
            const { _gotcha, ...entries } = fields;
            if (_gotcha) return; // Spam bot filled the hidden field

            if (Object.values(entries).some(v => !String(v).trim())) {
                showToast(T.fillAll, 'error');
                return;
            }

            if (!validateEmail(entries.email.trim())) {
                showToast(T.invalidEmail, 'error');
                document.getElementById('email').focus();
                return;
            }

            const endpoint = contactForm.dataset.endpoint;
            if (!endpoint) {
                const subject = entries.subject || T.inquirySubject(entries['inquiry-type']);
                const body = `${entries.message}\n\nFrom: ${entries.name} <${entries.email}>`;
                window.location.href = `mailto:${contactForm.dataset.mailto}`
                    + `?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                showToast(T.emailApp, 'success');
                return;
            }

            if (await submitForm(contactForm, endpoint, fields)) {
                showToast(T.sent, 'success');
                contactForm.reset();
            }
        });
    }

    const newsletterForm = document.getElementById('subscribe-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (!validateEmail(email)) {
                showToast(T.invalidEmail, 'error');
                return;
            }

            const endpoint = newsletterForm.dataset.endpoint;
            if (!endpoint) {
                showToast(T.newsletterClosed, 'error');
                return;
            }

            if (await submitForm(newsletterForm, endpoint, { email })) {
                showToast(T.subscribed, 'success');
                emailInput.value = '';
            }
        });
    }

    // Utility Functions
    async function submitForm(form, endpoint, data) {
        const button = form.querySelector('button[type="submit"]');
        button.disabled = true;
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return true;
        } catch (err) {
            showToast(T.sendFailed, 'error');
            return false;
        } finally {
            button.disabled = false;
        }
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showToast(message, type = 'success') {
        // Live region so screen readers announce the message
        let container = document.querySelector('.toast-box-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-box-container';
            container.setAttribute('role', 'status');
            container.setAttribute('aria-live', 'polite');
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = 'toast-box';
        toast.style.borderLeft = `4px solid ${type === 'error' ? '#EF4444' : '#C23B22'}`;

        const icon = document.createElement('span');
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = type === 'error' ? '⚠️' : '✓';
        const text = document.createElement('span');
        text.textContent = message;
        toast.append(icon, ' ', text);
        container.appendChild(toast);

        // Remove toast after 5 seconds
        setTimeout(() => {
            toast.style.animation = 'toastSlide 0.3s ease reverse forwards';
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }
});
