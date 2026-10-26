# Report Guide: Uttarakhand Aipan Art

A structure and checklist for your project report. The questions are prompts: the answers, evidence and writing need to be yours. Where a section asks for evidence, use your own data from testing, not assumptions.

---

## Suggested structure

### 1. Problem
- What problem do small Aipan art businesses have in reaching buyers? **How do you know?** Cite sources (government MSME reports, news articles, interviews) or say clearly that it is an assumption.
- Did you talk to any artisans or sellers? If not, say so and treat it as a limitation.

### 2. Users
- Who are the buyers? (For example: people buying ritual items, gift buyers, companies ordering corporate gifts.)
- What do they need from a website? Base this on research or testing, not guesses.

### 3. Alternatives
- Instagram shop, WhatsApp Business catalogue, Amazon Karigar, Etsy, local fairs.
- For each: what does it do well, and what does it lack? **Why is a website better, or in what situations is it?**

### 4. Design
- Why two sites? Explain the traditional versus modern positioning and who each is for.
- Key decisions: colours (Geru red, Biswar white), typography, layout, WhatsApp enquiries rather than a cart.
- Include your **wireframes** (see the checklist below) and screenshots of the final pages.

### 5. Build
- Technologies: HTML, CSS, JavaScript, Eleventy, GitHub Pages, GitHub Actions.
- Accessibility work: keyboard navigation, labels, WCAG AA contrast, reduced motion.
- Performance work: compressed WebP images in two sizes, lazy loading, cheaper animations.
- Mention what you built yourself and what tools or assistance you used, following your institution's rules on AI assistance.

### 6. Testing and results
- Method: the user-testing kit (`docs/user-testing-kit.md`), number of participants, how you recruited them.
- Results: task success rates, times, ease ratings, SUS score, design preference.
- Lighthouse scores, with screenshots.
- The top problems found, with severity.

### 7. Changes made after testing
- What you changed, and why (link each change to a finding).
- If you re-tested: before versus after.

### 8. Limitations and honesty
State these plainly; examiners respect a clear account of what is and is not real:
- Products, prices, figures (such as "50+ artisans" and "5000+ products shipped"), contact details and artisan profiles are **sample content**.
- Photos are crops of openly licensed Wikimedia Commons images (CC BY-SA 4.0, credited on each site's Photo credits page), not photos of real products. The coaster image is AI-generated.
- The contact form is not connected to a backend, and there is no payment.
- Number of test participants, and any participants who knew the project.

### 9. Future work
- Real product photos, a connected form (e.g. Formspree), real contact details, online payment, shared CSS and JavaScript between the sites.

---

## Wireframe checklist

Redraw wireframes so they match the built pages. For each page, include these sections in this order. Low-fidelity (boxes and labels) is enough.

### Shared on every page
- Demo banner, then header: logo, menu (Home, About Us, Products, Gallery, Contact Us), call-to-action button. Hamburger menu on phones.
- Footer: about text, quick links, categories, newsletter form, copyright with Photo credits link.

### Landing page
1. Hero: label, title, intro, two buttons (one per site)
2. Two site cards: image, tag, name, description, 3 features, link
3. "What is Aipan?": Geru, Biswar, Bindu
4. About this project: text and 4 facts
5. Footer

### Devbhoomi
| Page | Sections in order |
|---|---|
| Home | Hero (badge, title, text, 2 buttons) → 3 feature cards → story (image + text + quote + button) → 3 featured products + "View all" |
| Products | Hero → 4 filter buttons → 7 product cards → product popup (image, category, title, price, description, Inquire Now + WhatsApp) |
| Gallery | Hero → 6 photos with captions |
| About | Hero → story (text + image) → 3 motif cards → 3 artisan cards |
| Contact | Hero → form (name, email, subject, message) beside info panel (address, email, phone) → map |

### Kumaon
| Page | Sections in order |
|---|---|
| Home | Hero split (text + 2 buttons beside a product photo) → 3 value cards → story (text + 2 stats + button beside image) → 3 featured products + "Browse full shop" |
| Products | Hero → search box + 4 filter pills → 6 product cards → product popup |
| Gallery | Hero → 6 photo cards with captions |
| About | Hero → mission (text + image) → 3 number cards → 3 artisan cards |
| Contact | Hero → form (name, email, inquiry type, message) beside details panel (address, email, phone) → map |

Draw at least **Home, Products and Contact** for one site at phone and desktop size. Note where the layouts differ (for example, the phone menu and the stacked Kumaon hero).

---

## Before you submit

- [ ] Every factual claim about Aipan, MSMEs or the market has a source, or is clearly marked as an assumption
- [ ] Testing results are your real data (no invented numbers)
- [ ] Screenshots are of the live site
- [ ] Wireframes match the final pages
- [ ] Photo credits are included or referenced
- [ ] Links work: live site and GitHub repository
