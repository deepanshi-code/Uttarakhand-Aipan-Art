# Expert Review: Uttarakhand Aipan Art

**Method:** heuristic evaluation against Jakob Nielsen's 10 usability heuristics, plus automated Lighthouse audits.
**Evaluator:** ______________________ (state who carried out the review, including any AI assistance, as your institution requires)
**Date:** November 2026
**Scope:** the entry page and all pages of both sites, on desktop and phone sizes.

> **Limitation:** an expert review is not a substitute for testing with real users. A single evaluator typically finds only part of a design's usability problems, and may rate issues differently from how users actually experience them. Use these findings alongside the user tests in `user-testing-kit.md`.

## Severity scale (Nielsen)

| Rating | Meaning |
|---|---|
| 0 | Not a usability problem |
| 1 | Cosmetic: fix if there is time |
| 2 | Minor: low priority |
| 3 | Major: important to fix |
| 4 | Catastrophe: must fix before release |

## Findings

### Fixed

| # | Heuristic | Finding | Severity | Fix |
|---|---|---|---|---|
| 1 | Visibility of system status | Searching or filtering products gave no feedback, and a search with no matches (e.g. "lamp") showed an empty grid that looked broken. | 3 | A results line ("Showing 2 of 6 products") and a clear no-results message, announced to screen readers. |
| 2 | Error prevention | Placeholder contact details (phone numbers, email domains) might have belonged to real people, so test enquiries could reach strangers. | 3 | Demo values that cannot reach anyone; WhatsApp opens the chat picker when no number is set. |
| 3 | Recognition rather than recall; flexibility and efficiency | "Inquire Now" opened an empty contact form, so visitors had to remember and retype which product they wanted. | 2 | The form arrives filled in with the product name and price. |
| 4 | Error prevention | The newsletter form accepted an email address and only then said sign-up was not open. | 2 | The form is replaced by "Our newsletter is launching soon" until a sign-up service is connected. |
| 5 | Help users recognise, diagnose and recover from errors | A mistyped address showed GitHub's generic 404 page, with no way back to the sites. | 2 | A themed "Page Not Found" page with links to both sites. |
| 6 | Recognition rather than recall | Gallery captions appeared only on mouse hover, so phone users never saw them. | 2 | Captions are always visible on touch screens. |
| 7 | Consistency and standards | Social media icons linked to `#` and did nothing. | 2 | Icons are hidden until real profile URLs are set. |
| 8 | Consistency and standards; aesthetic and minimalist design | Emoji icons rendered differently on each device and clashed with both brands. | 1 | One set of line icons in each brand's colours. |
| 9 | Aesthetic and minimalist design | At tablet widths the navigation was crowded and the call-to-action button touched the screen edge. | 1 | Tighter navigation spacing between 769 and 1080 px. |
| 10 | User control and freedom | No link back from either site to the project's entry page or the other site. | 1 | "All Aipan sites" link in every footer. |
| 11 | Consistency and standards (accessibility) | Heading levels skipped from h1 to h3 on the products pages (Lighthouse). | 1 | A heading for the product grid, visible to screen readers. |
| 12 | Visibility of system status (performance) | Buttons and links responded sluggishly, and on slow phone connections the first paint was delayed about 1 s by the font stylesheet. | 2 | Cheaper animations; fonts load without blocking; hero image preloaded; script deferred. |

### Not fixed: need real content or a decision

| # | Heuristic | Finding | Severity | Recommendation |
|---|---|---|---|---|
| 13 | Match between system and the real world | Products have no size, material, care, delivery time or returns information, which buyers usually need before enquiring. | 3 | Add these details for each product once the real catalogue is known. |
| 14 | Visibility of system status | Without a form service, "Send" opens the visitor's email app; on a device with no email app set up, nothing visible happens. | 2 | Connect the form to a service such as Formspree (`contact.formEndpoint` in `_data/<site>.json`). |
| 15 | Match between system and the real world | Kumaon's lifestyle products (tote, stole, tray, gift box) show Aipan designs rather than the actual products. | 2 | Photograph the real products. |
| 16 | (Trust) | Artisan profiles and figures such as "50+ artisans" are sample content, and there are no reviews or policies; buyers may hesitate to enquire. | 2 | Use real, consented artisan stories; add delivery and returns policies. |
| 17 | Consistency and standards | The two sites word the same action differently ("Inquire Now" vs "Send Inquiry"). | 1 | Acceptable as brand voice; keep wording consistent within each site. |

## Lighthouse (live site, phone mode, lower of two runs)

Before the performance fixes in finding 12 (second part):

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Entry page | 78 | 100 | 100 | 100 |
| Devbhoomi home | 81 | 100 | 100 | 100 |
| Devbhoomi products | 78 | 98 | 100 | 100 |
| Kumaon home | 79 | 100 | 100 | 100 |
| Kumaon products | 83 | 98 | 100 | 100 |

Total Blocking Time was 0 ms and Cumulative Layout Shift 0 on every page.

### After

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Entry page | 88 | 100 | 100 | 100 |
| Devbhoomi home | 95 | 100 | 100 | 100 |
| Devbhoomi products | 84 | 100 | 100 | 100 |
| Kumaon home | 83 | 100 | 100 | 100 |
| Kumaon products | 98 | 96* | 100 | 100 |

\* The new results line was 4.35:1 contrast (just under 4.5); it was corrected to 6.1:1 straight after this run.

Lighthouse scores vary between runs and machines; Performance is measured with simulated slow-phone conditions.
