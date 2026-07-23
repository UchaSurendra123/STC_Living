# STC Living — Website

Premium hospitality bed & bath linen website for **STC Living**. Fully responsive (desktop + mobile), built as a static frontend with an optional Node/Express backend for the contact form and product catalog.

## ✨ Highlights

- 4 pages: Home, About, Collection, Contact — all fully responsive
- Brand colours only: espresso brown, cream, gold (see `frontend/css/style.css :root`)
- Scroll-reveal animations, hover micro-interactions, marquee trust strip, animated WhatsApp button
- Live Google Maps embed on the Contact page with a **"Get Directions"** button that opens Google Maps and routes from the visitor's current location to STC Living HQ
- **Click-to-WhatsApp** buttons throughout the site (floating button + contact page + footer) that open a pre-filled chat
- Express backend with a contact form API (`/api/contact`) and a product catalog API (`/api/products`)

## 📁 Project Structure

```
STC-Living/
├── frontend/
│   ├── index.html            Home page
│   ├── about.html            About page
│   ├── collections.html      Collection page (with bed/bath filter tabs)
│   ├── contact.html          Contact page (team, form, map)
│   ├── css/
│   │   ├── style.css         Design tokens, layout, nav, footer
│   │   ├── components.css    Section-level component styles
│   │   ├── animations.css    Keyframes, scroll-reveal, hover motion
│   │   └── responsive.css    Tablet & mobile breakpoints
│   ├── js/
│   │   ├── script.js         Nav toggle, form submit, tab filter
│   │   ├── animations.js     IntersectionObserver scroll reveals
│   │   └── map.js            Map embed + directions + WhatsApp links
│   ├── assets/
│   │   ├── images/           Product & lifestyle photography
│   │   ├── icons/            Standalone SVG icons
│   │   └── logo/             STC Living logo mark
│   └── fonts/                (Cormorant Garamond & Jost load via Google Fonts CDN — see below)
│
├── backend/
│   ├── server.js              Express entry point
│   ├── package.json
│   ├── .env.example           Copy to .env and fill in your values
│   ├── routes/
│   │   ├── contact.js          POST /api/contact
│   │   └── products.js         GET  /api/products
│   ├── controllers/
│   │   ├── contactController.js
│   │   └── productController.js
│   ├── models/
│   │   ├── Enquiry.js          In-memory enquiry store (swap for a DB)
│   │   └── products.json       Product catalog data
│   ├── middleware/
│   │   ├── validateRequest.js  express-validator error handler
│   │   └── rateLimiter.js      Rate limits the contact endpoint
│   ├── config/
│   │   └── config.js           Shared app config/constants
│   └── utils/
│       └── sendMail.js         Nodemailer SMTP helper
│
└── README.md
```

## 🚀 Running the frontend only (VS Code)

The site works standalone — no backend required to view it:

1. Open the `STC-Living` folder in VS Code.
2. Install the **Live Server** extension (or any static server).
3. Right-click `frontend/index.html` → **Open with Live Server**.

The contact form will show a friendly fallback message if no backend is running.

## 🖥️ Running the backend (contact form + product API)

```bash
cd backend
npm install
cp .env.example .env      # fill in SMTP creds if you want email notifications
npm run dev                # starts on http://localhost:5000
```

With the backend running, it also serves the frontend directly at `http://localhost:5000` — so `npm run dev` alone gives you the full site.

### API Endpoints

| Method | Endpoint                    | Description                          |
|--------|------------------------------|---------------------------------------|
| GET    | `/api/health`                | Health check                          |
| POST   | `/api/contact`                | Submit a contact/enquiry form         |
| GET    | `/api/products`               | Full linen catalog                    |
| GET    | `/api/products?category=bed`  | Filter catalog by `bed` or `bath`     |

## 🎨 Brand Colours

| Token             | Hex        | Usage                          |
|--------------------|-----------|----------------------------------|
| `--espresso`        | `#3B2A1E` | Primary buttons, headings text  |
| `--espresso-deep`   | `#2A1D14` | Header, footer, dark sections   |
| `--cream`           | `#EFE4CE` | Page background                 |
| `--card`            | `#FBF6EB` | Card backgrounds                |
| `--gold`            | `#B98A4E` | Accents, borders, icons         |
| `--gold-light`      | `#D8B983` | Hover states, dark-bg text      |
| `--text-brown`      | `#4A3826` | Body copy                       |
| `--text-cream`      | `#E9DEC7` | Copy on dark backgrounds        |

## ✏️ Editing content

- **Contact numbers / WhatsApp**: update the `whatsappNumber` value in `frontend/js/map.js` and the `tel:` links across the HTML files.
- **Address / map**: update the `address` value in `frontend/js/map.js` — the map embed and "Get Directions" link both use it automatically.
- **Product catalog**: edit `backend/models/products.json` (and the matching HTML grids in `collections.html`) to add/remove items.

## 🔤 Fonts

Typography (Cormorant Garamond for headings, Jost for body) loads via Google Fonts CDN in `style.css`. If you need fully offline fonts, download the `.woff2` files into `frontend/fonts/` and replace the `@import` line with local `@font-face` declarations.

---
© 2026 STC Living. Designed for Hospitality. Crafted for Comfort.
