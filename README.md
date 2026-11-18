# Northstar IT — Business Website

A responsive, multilingual business website concept for an IT services provider serving SMEs in Tunis and Greater Tunis.

## Included\n- `assets/css/styles.css` — responsive brand design system.\n- `assets/js/main.js` — FR/EN/AR language switching, mobile navigation and contact form behavior.\n- `assets/img/logo.svg`, `assets/img/favicon.svg` — brand assets.
- `index.html` — single-page marketing website with hero, services, about, process, illustrative case studies, resources, contact and footer.
- `assets/css/styles.css` — responsive visual system and layouts.
- `assets/js/main.js` — mobile navigation, French/English/Arabic language switching, contact mailto handler and cookie notice.
- `privacy.html`, `terms.html` — legal page templates that must be reviewed and completed.
- `robots.txt`, `sitemap.xml` — basic search-engine files; update the domain before launch.

## Run locally
Open `index.html` in a browser. No build step or package installation is required.

For a local web server, from this folder run:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000`.

## Important launch checklist
This is a polished starter project, not a verified operating company website. Before publishing:

1. Replace **Northstar IT** with the real legal and commercial name, logo and brand assets.
2. Replace `contact@northstar-it.tn` with a mailbox you control. The form currently opens the visitor's email application; it does **not** send or store leads automatically.
3. Add a real backend form endpoint or a trusted form provider, server-side validation, spam protection and a privacy notice.
4. Add the real phone number, business hours, service coverage, emergency support terms and booking link.
5. Do not publish invented client logos, certifications, years in business, reviews, star ratings or performance metrics. The current project intentionally avoids fake trust claims.
6. The portfolio section contains clearly labelled illustrative scenarios, not client case studies. Replace them only with approved, verifiable work.
7. Connect each resource card to a real article before promoting the blog section.
8. Complete legal placeholders with a qualified local professional and confirm applicable Tunisian requirements.
9. Add a real domain, HTTPS hosting, canonical URL, final sitemap and Google Business Profile link.
10. Configure analytics only after reviewing privacy and consent requirements. No analytics tracker is included.
11. Optimise and self-host fonts/images if desired. Current Google Fonts import requires an internet connection.
12. Test keyboard navigation, screen readers, mobile layouts, all three languages and the contact workflow.

## Customisation
- Brand colours and typography: edit CSS variables at the top of `assets/css/styles.css`.
- Translations: edit the `translations` object in `assets/js/main.js`.
- Contact recipient: update `contact@northstar-it.tn` in `index.html` and `assets/js/main.js`.
- Domain: update `robots.txt`, `sitemap.xml`, page metadata and canonical tags when the domain is known.

## Suggested hosting
Static hosting works: GitHub Pages, Netlify, Cloudflare Pages or any HTTPS web host. For a production contact form, connect a backend/API or form provider; static hosting alone cannot securely process and store submissions.
