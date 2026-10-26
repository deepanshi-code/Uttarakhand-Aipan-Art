// Devbhoomi Aipan Art - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    function setMenuOpen(open) {
        if (!menuToggle || !navLinks) return;
        navLinks.classList.toggle('active', open);
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');

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

    // 2. Dynamic Product Catalogue Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterButtons.length && productCards.length) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and add to clicked
                filterButtons.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');

                const filterValue = btn.getAttribute('data-filter');

                productCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'block';
                        // Add fade-in animation
                        card.style.animation = 'modalIn 0.4s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 3. Product Detail Modal
    const modal = document.getElementById('product-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const viewDetailsButtons = document.querySelectorAll('.view-details');

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
        document.getElementById('modal-image').src = data.img + '-800.webp';
        document.getElementById('modal-image').alt = data.title;

        // WhatsApp link pre-filled with the product name and price
        const whatsappBtn = document.getElementById('modal-whatsapp');
        if (whatsappBtn) {
            const text = `Hi! I am interested in the ${data.title} (${data.price}). Is it available?`;
            whatsappBtn.href = `https://wa.me/${whatsappBtn.dataset.whatsapp}?text=${encodeURIComponent(text)}`;
            whatsappBtn.setAttribute('aria-label', `Enquire on WhatsApp about ${data.title} (opens in a new tab)`);
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

    if (viewDetailsButtons.length && modal && closeModalBtn) {
        viewDetailsButtons.forEach(btn => {
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
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const fields = Object.fromEntries(new FormData(contactForm));
            const { _gotcha, ...entries } = fields;
            if (_gotcha) return; // Spam bot filled the hidden field

            if (Object.values(entries).some(v => !String(v).trim())) {
                showToast('Please fill out all the fields.', 'error');
                return;
            }

            if (!validateEmail(entries.email.trim())) {
                showToast('Please enter a valid email address.', 'error');
                document.getElementById('email').focus();
                return;
            }

            const endpoint = contactForm.dataset.endpoint;
            if (!endpoint) {
                const subject = entries.subject || `Inquiry: ${entries['inquiry-type']}`;
                const body = `${entries.message}\n\nFrom: ${entries.name} <${entries.email}>`;
                window.location.href = `mailto:${contactForm.dataset.mailto}`
                    + `?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                showToast('Your email app should open with this message ready to send.', 'success');
                return;
            }

            if (await submitForm(contactForm, endpoint, fields)) {
                showToast('Thank you! Your message has been sent. We will reach out shortly.', 'success');
                contactForm.reset();
            }
        });
    }

    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (!validateEmail(email)) {
                showToast('Please enter a valid email address.', 'error');
                return;
            }

            const endpoint = newsletterForm.dataset.endpoint;
            if (!endpoint) {
                showToast('Newsletter sign-up is not open yet. Please check back soon.', 'error');
                return;
            }

            if (await submitForm(newsletterForm, endpoint, { email })) {
                showToast('Success! You have subscribed to our updates.', 'success');
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
            showToast('Sorry, your message could not be sent. Please email us directly.', 'error');
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
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            container.setAttribute('role', 'status');
            container.setAttribute('aria-live', 'polite');
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.style.borderLeft = `4px solid ${type === 'error' ? '#f44336' : '#4CAF50'}`;

        const icon = document.createElement('span');
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = type === 'error' ? '⚠️' : '✓';
        const text = document.createElement('span');
        text.textContent = message;
        toast.append(icon, ' ', text);
        container.appendChild(toast);

        // Remove toast after 5 seconds
        setTimeout(() => {
            toast.style.animation = 'toastIn 0.3s ease reverse forwards';
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }
});
