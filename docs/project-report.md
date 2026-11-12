# Uttarakhand Aipan Art: Websites for Women-Led Folk Art MSMEs

**Draft report.** Sections marked **[To complete]** need your own sources or your own test results. Do not fill them with estimates: an honest "not yet tested" is better than an invented number.

| | |
|---|---|
| **Student** | Deepanshi Agarwal |
| **Live site** | <https://deepanshi-code.github.io/Uttarakhand-Aipan-Art/> |
| **Source code** | <https://github.com/deepanshi-code/Uttarakhand-Aipan-Art> |
| **Date** | November 2026 |

---

## 1. Summary

This project designs and builds two websites for small Aipan art businesses from the Kumaon region of Uttarakhand. **Devbhoomi Aipan Art** presents Aipan as a ritual tradition (chowkis, wall art, puja decor). **Kumaon Aipan Art** presents it as modern lifestyle products (coasters, stoles, gift sets, bulk orders). Both sites let visitors browse a catalogue and send an enquiry by WhatsApp or a contact form, which suits small sellers who do not run an online payment system.

The sites are live, work on phones, meet WCAG AA colour contrast, and score 100 for Accessibility, Best Practices and SEO in Lighthouse. Performance improved from 78–83 to 83–98 after optimisation (section 7).

**[To complete]** One or two sentences on the main user-testing findings.

## 2. Problem

**[To complete, with sources]** Describe the problem small Aipan sellers face in reaching buyers. Every claim here needs a source (government MSME publications, news articles, research papers) or must be labelled as an assumption. Questions to answer:

- How do Aipan artisans sell today, and what limits their reach?
- Why does this matter to the artisans (income, preservation of the craft)?
- Did you speak to any artisans or sellers? If not, state this as a limitation.

## 3. Users

**[To complete]** Describe the intended buyers. The two sites were designed for these groups, which are working assumptions until tested:

| Site | Intended buyers | What they need from the site |
|---|---|---|
| Devbhoomi | People buying items for rituals, festivals and home worship | Understand the meaning of each piece; trust that it is traditional; enquire about custom work |
| Kumaon | Gift buyers, people furnishing modern homes, companies ordering corporate gifts | Browse by budget and category; find products quickly; enquire about bulk orders |

## 4. Alternatives considered

**[To complete]** Compare a website with the alternatives a small seller could use. Suggested comparison:

| Option | Strengths | Weaknesses |
|---|---|---|
| Instagram shop | | |
| WhatsApp Business catalogue | | |
| Marketplaces (e.g. Amazon Karigar, Etsy) | | |
| Own website (this project) | Full control over story and brand; no listing fees; free hosting | Needs someone to maintain it; buyers must find it |

State when a website is the better choice, and when it is not.

## 5. Design

### 5.1 Two brand directions

The project tests whether presentation affects how buyers respond to the same craft:

| | Devbhoomi | Kumaon |
|---|---|---|
| Positioning | Sacred, traditional | Modern, sustainable, everyday |
| Colours | Geru red `#801815`, gold, cream (from the clay base and rice-paste lines of Aipan) | Terracotta `#C23B22`, charcoal, beige |
| Typography | Cinzel (classical serif) with Inter | Outfit (geometric sans-serif) with Inter |
| Hero | Full-width Aipan pattern | Text beside a product photo |
| Catalogue | 7 products, category filters | 6 products, search and category filters |

A shared entry page introduces both sites and explains Aipan (Geru, Biswar, Bindu) for visitors unfamiliar with the art form.

### 5.2 Key decisions

- **Enquiry instead of a cart.** Each product popup offers *Inquire Now* (opens the contact form with the product already filled in) and *Enquire on WhatsApp* (opens WhatsApp with a pre-written message). This avoids payment handling, which a small seller may not have.
- **Mobile first.** All layouts collapse to one column with a slide-out menu; images load in two sizes so phones download the smaller one.
- **Honest sample content.** A banner on every page states that products, prices, figures, contact details and artisan profiles are sample content. Contact details use values that cannot reach anyone (reserved `.example` email domains, `+91 00000 00000`).

### 5.3 Wireframes

Wireframes of all 12 final page layouts, at desktop and phone size, are in `docs/wireframes.html` (open in a browser; print to PDF to include here).

**[To complete]** If you made earlier wireframes, include them and explain how the design changed between the first sketches and the final build.

## 6. Implementation

| Area | Approach |
|---|---|
| Structure | HTML, CSS and JavaScript, assembled by the Eleventy static site generator; shared header, footer, product card and popup templates; product and contact data in one JSON file per site |
| Hosting | GitHub Pages, rebuilt automatically by GitHub Actions on every push |
| Quality checks | Every push is checked for valid HTML (html-validate), broken links (linkinator) and WCAG 2.1 AA accessibility (axe-core) before publishing; a failed check blocks the deploy |
| Languages | Every page in English and Hindi, with a language switch in each header; Devanagari fonts (Noto Sans and Noto Serif Devanagari) on Hindi pages. Hindi text needs review by a fluent speaker. |
| Images | 17 crops of 6 openly licensed Wikimedia Commons photographs (CC BY-SA 4.0), credited on each site's Photo credits page; WebP at 480 and 800 px; one AI-generated sample image (coasters), labelled as such |
| Accessibility | Keyboard-operable menu and product popup (Escape closes, focus is kept inside and returned afterwards); labelled form fields; status messages announced to screen readers; one `h1` per page; WCAG AA colour contrast; reduced motion respected |
| Performance | Compressed WebP images with lazy loading; animations limited to inexpensive properties; fonts loaded without blocking the first paint; hero image preloaded; scripts deferred |

**[To complete]** State which tools and assistance you used, including any AI assistance, as your institution's rules require.

## 7. Evaluation

### 7.1 Automated testing (Lighthouse)

Measured on the live site with Lighthouse 12.8 in mobile mode (simulated slow phone network), lower score of two runs per page.

| Page | Performance before | Performance after | Accessibility | Best Practices | SEO |
|---|---|---|---|---|---|
| Entry page | 78 | 88 | 100 | 100 | 100 |
| Devbhoomi home | 81 | 95 | 100 | 100 | 100 |
| Devbhoomi products | 78 | 84 | 100 | 100 | 100 |
| Kumaon home | 79 | 83 | 100 | 100 | 100 |
| Kumaon products | 83 | 98 | 96* | 100 | 100 |

\* Caused by a low-contrast results line added during this round; corrected to 6.1:1 contrast, after which two further runs scored 100 for Accessibility.

Total Blocking Time stayed at 0–60 ms and Cumulative Layout Shift at 0 on every page. The main gain came from loading web fonts without blocking the first paint: First Contentful Paint on the entry page fell from 3.9 s to 1.4 s. Lighthouse scores vary between runs, so small differences should not be over-interpreted.

### 7.2 Expert review

An expert review against Nielsen's 10 usability heuristics found 17 issues (full table in `docs/expert-review.md`). 12 were fixed, including:

- Search and filters gave no feedback, and a search with no matches showed an empty page (severity 3: now shows a result count and a clear message)
- Placeholder contact details could have reached real people (severity 3: replaced with safe values)
- *Inquire Now* opened an empty form (severity 2: now pre-filled with the product)
- Gallery captions were invisible on touch screens (severity 2: now always shown)

5 issues remain because they need real content, mainly missing product details (size, material, delivery, returns) and photos of the actual products.

An expert review is not a substitute for testing with users.

### 7.3 User testing

**[To complete with your real results]** Method: `docs/user-testing-kit.md` (5 participants, 6 tasks, ease ratings, System Usability Scale).

| Task | Success rate (of 5) | Average time (s) | Average ease (1–5) |
|---|---|---|---|
| T1 Find a gift under ₹1,000 | | | |
| T2 Explain what Aipan is | | | |
| T3 Enquire about the Lakshmi Chowki | | | |
| T4 Find the studio location | | | |
| T5 Start a bulk enquiry | | | |

**Average SUS score:** ____  **Preferred site:** Devbhoomi __ / Kumaon __

**Main problems found:**

**Participants:** who they were, how you recruited them, and whether any knew the project.

## 8. Changes after testing

**[To complete]** For each change: the finding that prompted it, what you changed, and (if you re-tested) whether it worked.

## 9. Limitations

- Products, prices, figures (such as "50+ artisans"), contact details and artisan profiles are sample content, not a real business.
- Photos are of real Aipan artworks by other people (credited), not of the products shown; the coaster image is AI-generated.
- The contact form is not connected to a backend; without one it opens the visitor's email app. There is no online payment.
- **[To complete]** Size and make-up of the test group; any participants who knew the project; no interviews with artisans (if applicable).

## 10. Future work

- Partner with a real artisan group: real products, photos, prices and consented stories
- Connect the contact form and newsletter to a form service
- Add product details buyers need: size, material, care, delivery time, returns
- Share one stylesheet and script between the two sites
- Re-test with users after each round of changes
- Have the Hindi text reviewed by fluent speakers, ideally artisans or local buyers

## References

**[To complete]** List every source cited in sections 2–4, in your institution's required style.

Photo sources (all CC BY-SA 4.0, Wikimedia Commons):
- "Aipan design" and "Aipan work" by KapilAgrawal2110
- "Aipan art" by Rashmi dangi
- "Aipan folk art" by ADITITIWARI 2231119
- "Lakshmi-maa" by Callofthenight
- "Aipan wall art in Dehradun" by Amrit Sufi

Icons: Lucide (ISC licence).
