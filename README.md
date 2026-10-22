# Royal Mobile Accessories — Expert Storefront Demo

A multi-page, responsive storefront concept built with HTML, CSS and vanilla JavaScript. It is intended as a polished **front-end demo** that can be shown to a client or used as a starting point for a real store.

## Included pages
- `index.html` — brand landing page, CSS 3D-inspired hero, categories, featured products and newsletter mock-up
- `shop.html` — 25-item catalogue with search, category filters, price controls and sorting
- `cart.html` — browser-local cart with quantity controls, remove actions and subtotal
- `checkout.html` — sample checkout form and order preview (does not transmit data)
- `about.html` — brand story and values
- `contact.html` — contact form mock-up and compatibility FAQs
- `shipping-returns.html` — policy template to customise
- `privacy.html` — privacy notice template to customise
- `assets/css/styles.css` — design system, responsive layouts, CSS product illustrations and reduced-motion support
- `assets/js/products.js` — editable demo catalogue
- `assets/js/app.js` — cart, filters, rendering, form demos and navigation

## Run locally
1. Extract the ZIP.
2. Open `index.html` in a current browser. For best results, run it with a local static server (for example, the VS Code Live Server extension).
3. Internet access is needed for Google Fonts and the remote sample images. If you need fully offline use, download licensed images and update the image paths.

## Edit products
Open `assets/js/products.js`. Each product has an `id`, `name`, `category`, `price`, optional `oldPrice` and `badge`, `sku`, `description`, `specs`, `tone`, and `image`. Prices are sample PKR values and are not verified offers. Confirm every detail with the actual seller before publishing.

## Important production gaps
This is **not a complete production e-commerce system**. It does not include:
- backend/database, accounts or secure order storage
- real inventory, fulfilment or order notifications
- payment gateway, tax/shipping calculation or payment security
- server-side validation, rate limiting, CSRF protections or anti-spam controls
- live WhatsApp, email, newsletter or contact-form delivery
- verified legal policies, privacy compliance or real business contact details
- guaranteed product imagery/specifications, product compatibility, stock or price accuracy

The cart is stored in the visitor's browser using `localStorage`; clearing browser storage clears the cart. The checkout/contact/newsletter flows are demo interactions and do not send customer data anywhere. Never ask visitors to enter payment-card details into this demo.

## Recommended production path
1. Confirm brand ownership, real contact details, product catalogue, images, pricing, warranty and stock.
2. Choose a platform appropriate to the business: Shopify/WooCommerce for a hosted/managed commerce path, or a custom backend if the business has a developer and operational support.
3. Use a trusted payment provider and never store card numbers yourself.
4. Implement server-side order validation, inventory reservation, delivery options, notifications, refunds, logging and backups.
5. Write real privacy, shipping, return, warranty and terms policies for the business and applicable jurisdiction.
6. Test mobile layouts, keyboard accessibility, image performance, form errors, checkout edge cases and screen-reader basics.
7. Replace the remote images with licensed product photos that match the exact item sold. Product names and descriptions in this demo are illustrative.
8. Configure domain, HTTPS, analytics only with appropriate consent, and backups before launch.

## Design notes
Palette: deep forest green, warm paper, sage and lime accents. Typography: Manrope for display headings and DM Sans for body copy. CSS-made phone/accessory artwork provides the 3D-inspired visual treatment without requiring a 3D engine.

## License / handoff
This is a custom demonstration project created for the requester. Check the licence and permissions for all remote assets and any third-party fonts before commercial deployment.
