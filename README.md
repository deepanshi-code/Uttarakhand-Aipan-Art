# MSME Aipan Art Websites

Two static websites for Aipan folk-art businesses from the Kumaon region of Uttarakhand:

| Site | Positioning | Folder |
|---|---|---|
| **Devbhoomi Aipan Art** | Traditional, ritual pieces (Chowkis, wall art, puja decor) | `devbhoomi-aipan-art/` |
| **Kumaon Aipan Art** | Modern lifestyle products (coasters, stoles, gift sets, bulk orders) | `kumaon-aipan-art/` |

Each site has five pages: Home, About, Products, Gallery, Contact. They use plain HTML, CSS and JavaScript. [Eleventy](https://www.11ty.dev/) assembles the pages from shared pieces, so the header, footer, product popup and product list each exist in only one place.

## Run locally

You need [Node.js](https://nodejs.org/) 18 or newer. From this folder, install once:

```bash
npm install
```

Then start the preview server, which rebuilds and reloads the page whenever you save a file:

```bash
npm run serve
```

Open <http://localhost:8765/> and choose a site.

## Build for deployment

```bash
npm run build
```

The finished sites are written to `_site/devbhoomi-aipan-art/` and `_site/kumaon-aipan-art/`. Deploy those folders, not the source folders: the source pages contain template tags and won't work if opened directly.

### GitHub Pages (automatic)

`.github/workflows/deploy.yml` builds and publishes the site on every push to `main`. One-time setup in the GitHub repository: **Settings → Pages → Source: GitHub Actions**. Progress and errors show up in the repository's **Actions** tab.

## Project structure

```
_data/
  devbhoomi.json, kumaon.json   products (name, price, image, description...) and WhatsApp number
_includes/
  devbhoomi.njk, kumaon.njk     page layout: <head>, then header, page content, popup, footer
  <site>/header.njk             navigation menu
  <site>/footer.njk             footer and newsletter form
  <site>/modal.njk              product popup (Inquire and WhatsApp buttons)
  <site>/product-card.njk       one product card
<site>/
  index.html ... contact.html   each page's own content, with title/description at the top
  <site>.11tydata.json          tells Eleventy which layout these pages use
  css/style.css                 all styles; colours are CSS variables at the top
  js/main.js                    menu, product filter/search, product popup, forms, toasts
  assets/                       WebP images (800 px) and favicon.svg
eleventy.config.js              build settings
original-assets/                full-size source images (not deployed)
wireframes/                     early wireframes (not deployed)
```

## Common edits

| To change... | Edit |
|---|---|
| A product's name, price, photo or description | its entry in `_data/<site>.json` (cards, home page and popup all update) |
| Which products appear on the home page | `"featured": true` on those products |
| Add a product | copy an entry in `_data/<site>.json`, give it a new unique `id`, and set `filter` to one of the filter buttons' categories |
| A menu link or footer text | `_includes/<site>/header.njk` or `footer.njk` |
| A page's browser title or search description | the `title` / `description` lines at the top of that page |
| A page's content | that page's `.html` file |
| An icon | write `{% icon "phone" %}` in a page; the available icons are listed in `lib/icons.js` (from [Lucide](https://lucide.dev), ISC licence) |

## Before going live: replace the placeholders

These values are **not real yet**. Search the code for `TODO` to find most of them.

| What | Where | Status |
|---|---|---|
| Product photos | `assets/` plus each product's `img` in `_data/<site>.json` | Products share 2–3 sample images. Use a real photo of each product. |
| Artisan photos, names and quotes | `about.html` | Initials are shown in place of photos. Publish only real artisans who have given consent. |
| WhatsApp number | `contact.whatsapp` in `_data/<site>.json` | Empty, so the button opens WhatsApp's chat picker with the message filled in. Format: country code + number, no `+` or spaces, e.g. `919812345678`. |
| Phone, emails, street address, hours | `contact` in `_data/<site>.json` | Demo values that can't reach anyone (`+91 00000 00000`, reserved `.example` email domains). |
| Map | `contact.mapQuery` in `_data/<site>.json` | Shows the town only. Use the full address once it is final. |
| Social media links | `contact.social` in `_data/<site>.json` | Empty, so no icons are shown. Each icon appears automatically once its URL is set. |
| Contact form backend | `data-endpoint=""` on the contact form | See below. |
| Newsletter backend | `data-endpoint=""` on the footer form | See below. Until it is set, the form says sign-up is not open. |
| Social share image | `<head>` of each page | After deploying, add `og:url` and an absolute `og:image` URL. |

### Connecting the forms

1. Create a free form at <https://formspree.io> (or another form service).
2. Paste its URL into the form's `data-endpoint` attribute, for example `data-endpoint="https://formspree.io/f/abcdwxyz"`.
3. Send a test message and check that it arrives.

If `data-endpoint` is empty, the contact form opens the visitor's email app, addressed to the email in `data-mailto`. A success message is shown only after the server confirms the message was received.

## Project documents

- [`docs/user-testing-kit.md`](docs/user-testing-kit.md): script, tasks, questionnaire and results sheets for testing with 5 people, plus Lighthouse steps
- [`docs/report-guide.md`](docs/report-guide.md): report structure, wireframe checklist and pre-submission checks

## Quality checks already done

- **Accessibility:** the menu and product popup work with the keyboard (Escape closes them, focus stays inside the popup and returns afterwards). Every input has a label, there is one `<h1>` per page, and toast messages are announced to screen readers. Animations respect "reduce motion". Text colours meet WCAG AA contrast (4.5:1).
- **Performance:** images are 800 px WebP (about 4.6 MB down to about 0.6 MB in total), lazy-loaded, with fixed dimensions so the page doesn't jump. Fonts load through `<link>` tags rather than a render-blocking CSS `@import`.

## Known limitations

- The two sites still have separate copies of `main.js` and `style.css`, because their class names differ.
- There is no cart or online payment. Orders come in through the contact form and WhatsApp.
- The wireframes in `wireframes/` don't match the final page layouts.
