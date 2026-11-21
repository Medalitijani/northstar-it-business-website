# Northstar IT — Multilingual Website Prototype

A personal web-development project by **Mohamed Ali Tijani**: a responsive, multilingual website prototype for a fictional IT services brand.

> **Project status:** Demonstration project only. Northstar IT is not a registered company, client, or operating service provider. Website copy, service descriptions, and case-study scenarios are illustrative.

## Project goals

- Build a responsive single-page business website without a frontend framework.
- Provide French, English, and Arabic language switching, including right-to-left layout support.
- Present service, process, illustrative case-study, and contact sections.
- Implement a contact form frontend and a serverless email-delivery integration.

## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- Netlify Functions (server-side contact handler)
- Resend API (email delivery provider)

## Repository structure

- `index.html` — website structure and content.
- `assets/css/styles.css` — responsive styling and design system.
- `assets/js/main.js` — navigation, language switching, and contact-form submission.
- `assets/img/` — logo and favicon assets.
- `netlify/functions/contact.mjs` — serverless contact endpoint.
- `privacy.html`, `terms.html` — placeholder legal-page templates.
- `robots.txt`, `sitemap.xml` — search-engine files requiring a real domain before launch.

## Run locally

Open `index.html` in a browser, or run a local static server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Contact form: deployment requirements

The browser submits the form to `/.netlify/functions/contact`. The Netlify Function validates input, checks the request origin, uses a honeypot field, and sends the enquiry through Resend. The Resend API key is read server-side and is not exposed to browser JavaScript.

For the form to send email, deploy the project to Netlify and configure:

- `RESEND_API_KEY` — private Resend API key.
- `CONTACT_TO_EMAIL` — real destination inbox.
- `CONTACT_FROM_EMAIL` — sender address on a domain verified with Resend.
- `ALLOWED_ORIGINS` — comma-separated list of allowed production origins.

The public GitHub Pages preview is static and **cannot execute the Netlify Function**. Therefore, the contact form does not deliver messages from the GitHub Pages preview. Do not describe the form as live until the Netlify deployment and an end-to-end delivery test have both been completed.

## Verification status and limitations

- The HTML, CSS, and JavaScript source are present in the repository.
- The contact form has been tested end to end on the Netlify deployment, with email delivery through Resend confirmed.
- The contact recipient, verified sender domain, real business identity, and domain are not configured as public business details.
- Privacy and terms pages are templates and require completion and appropriate local legal review before any real-business use.
- Add platform-level rate limiting or bot protection before public production use.
- Keyboard navigation, screen-reader behavior, and cross-device testing should be recorded with evidence before claiming accessibility, compliance.

## Design and content maintenance

- Edit design tokens and layouts in `assets/css/styles.css`.
- Edit French, English, and Arabic translations in `assets/js/main.js`.
- Keep all case studies clearly labelled as illustrative unless replaced with genuine, verifiable work.
- Do not add invented customers, testimonials, certifications, service metrics, or company history.

## Author and project scope

This is an individual portfolio project built and documented by **Mohamed Ali Tijani**. It demonstrates frontend development and a serverless integration pattern; it is not evidence of a deployed IT services business or a client engagement.
