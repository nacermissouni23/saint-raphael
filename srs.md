# DIAR DZAIR
وكالة العقارات

SOFTWARE REQUIREMENTS SPECIFICATION

Real Estate Agency Web Application
Next.js · Tailwind CSS · PostgreSQL

| Document Version | 1.0.0 |
| :--- | :--- |

| Date | March 2026 |
| :--- | :--- |

| Status | Draft – For Review |
| :--- | :--- |

| Agency | Diar Dzair – Agence Immobilière |
| :--- | :--- |

| Headquarters | 12 Rue Hassiba Ben Bouali, Alger Centre, Algérie |
| :--- | :--- |

| Prepared by | Product & Engineering Team |
| :--- | :--- |

**Revision History**

| Version | Date | Author | Description |
| :--- | :--- | :--- | :--- |
| 1.0.0 | March 2026 | Yacine Boudiaf | Initial SRS Draft |
| — | — | — | Pending stakeholder review |

**Table of Contents**

---

## 1. Introduction

### 1.1 Purpose
This Software Requirements Specification (SRS) defines the complete functional and non-functional requirements for the Diar Dzair web application.
The platform serves as the primary digital presence for Diar Dzair, a full-service real estate agency headquartered in Algiers.
It enables prospective buyers, renters, and investors across Algeria to discover properties, while giving the agency team a powerful admin interface to manage listings, leads, and content.

### 1.2 Project Scope
Diar Dzair is a Next.js-based web application encompassing two primary surfaces:
* Public-facing portal – A visually refined, fast-loading website where visitors can browse, search, and enquire about residential and commercial properties across major Algerian wilayas.
* Admin dashboard – A secure back-office panel where agency staff can manage property listings, handle lead enquiries, upload media, and view analytics — all without writing any code.

### 1.3 Target Audience of This Document
* Project stakeholders and agency ownership
* Frontend and backend engineers
* UI/UX designers
* QA testers
* Future maintainers

### 1.4 Definitions, Acronyms & Abbreviations

| Term | Definition |
| :--- | :--- |
| SRS | Software Requirements Specification |
| Next.js | React-based full-stack web framework by Vercel |
| SSR | Server-Side Rendering – page rendered on each request |
| SSG | Static Site Generation – pre-built pages at build time |
| ISR | Incremental Static Regeneration – background revalidation |
| CTA | Call to Action – button or link prompting user interaction |
| DZD | Algerian Dinar – official currency of Algeria |
| Wilaya | An Algerian administrative province (48 total) |
| Commune | Sub-division of a wilaya (municipality level) |
| Lead | A visitor who has submitted an enquiry form |

### 1.5 References
* Next.js 14 Documentation – https://nextjs.org/docs
* Tailwind CSS v3 Documentation – https://tailwindcss.com/docs
* Algerian Land Registry (CNRC) – Regulatory context
* ISO/IEC 29148:2018 – Systems and software engineering requirements

---

## 2. Overall Description

### 2.1 Product Perspective
Diar Dzair replaces an outdated static HTML brochure site and WhatsApp-based lead management.
It integrates a modern content management layer, lead capture, property search, and analytics in a single cohesive platform.
The system communicates with a PostgreSQL database via a Next.js API layer, with image assets hosted on Cloudinary.

### 2.2 Product Functions – Summary

| Function Area | Description |
| :--- | :--- |
| Property Listings | Browse, filter and view detailed property cards |
| Search & Filter | Full-text + faceted filtering by wilaya, type, price, area |
| Property Detail Page | High-res gallery, specs, location map, contact form |
| Lead Enquiries | Capture and manage visitor contact requests |
| Admin – Listings CRUD | Create / edit / archive / delete any property listing |
| Admin – Media Upload | Multi-image upload with drag-and-drop ordering |
| Admin – Lead CRM | View, filter, tag, and respond to all incoming enquiries |
| Admin – Analytics | Page views, listing clicks, lead conversion rate |
| Authentication | Secure admin login with session-based auth |

### 2.3 User Personas

**2.3.1 Rania – The First-Time Buyer**
Age 29, teacher in Oran. Rania is searching for a 2-bedroom apartment under 8 million DZD in Bir El Djir.
She uses her phone and has moderate digital literacy. She wants clear photos, a price, and an easy way to contact the agency.

**2.3.2 Karim – The Property Investor**
Age 45, entrepreneur based in Algiers. Karim is looking to invest in commercial spaces in Setif or Annaba.
He compares multiple listings, needs surface area details, floor level, and proximity to transport. He prefers to enquire via WhatsApp.

**2.3.3 Samia – The Agency Admin**
Age 34, agency coordinator at Diar Dzair. Samia publishes new listings daily, uploads photos, marks leads as contacted, and reports weekly to management.
She is not technical and needs a clear, forgiving interface.

### 2.4 Operating Environment
* Runtime: Node.js 20 LTS on Vercel (serverless)
* Database: PostgreSQL 15 via Supabase
* Image storage: Cloudinary (free tier initially)
* Browser support: Chrome 110+, Firefox 115+, Safari 16+, Edge 110+
* Mobile: iOS 15+, Android 11+ (responsive, not native)

### 2.5 Design & Implementation Constraints
* Language: Algerian Arabic (Darija) place names in UI; French as the primary UI language (as is common for Algerian professional services), with Arabic toggle planned for v2.
* Currency: All prices displayed in DZD (Algerian Dinar) with thousands separator.
* Maps: Leaflet.js (open-source) with OpenStreetMap tiles – avoids Google Maps billing.
* Accessibility: WCAG 2.1 AA compliance required for all public-facing pages.
* Performance: Lighthouse score ≥ 90 on mobile for all key pages.
* SEO: All listing pages must be server-side rendered for full crawlability.

---

## 3. UI/UX Design Philosophy

### 3.1 Aesthetic Direction
Diar Dzair's interface draws from refined Mediterranean editorial aesthetics – clean whitespace, warm earth tones accented by deep teal, and generous typography.
The goal is to feel trustworthy and premium without being sterile or corporate.
The design avoids generic SaaS templates and instead evokes the character of a high-end Algerian real estate brand.

### 3.2 Design Tokens

| Token | Value | Usage |
| :--- | :--- | :--- |
| --color-primary | #0D7C6E | CTAs, active states, links, borders |
| --color-primary-dark | #095C51 | Hover states on primary elements |
| --color-accent | #D4A853 | Gold accent – badges, highlights, stars |
| --color-bg | #FAFAF8 | Page background – warm off-white |
| --color-surface | #FFFFFF | Card backgrounds, modals |
| --color-text-primary | #1A1A2E | Headings and body text |
| --color-text-muted | #6B7280 | Labels, metadata, captions |
| --color-border | #E5E7EB | Dividers, card outlines |
| --font-display | Cormorant Garamond | Hero headings, section titles |
| --font-body | DM Sans | Body copy, labels, UI text |
| --radius-card | 12px | Property cards, modals, inputs |
| --shadow-card | 0 2px 16px rgba(0,0,0,0.07) | Card elevation |

### 3.3 Layout Principles
* 12-column CSS Grid with 24px gutters on desktop, 4-column on mobile.
* Property cards appear in a 3-column masonry grid (desktop), 2-column (tablet), 1-column (mobile).
* No modal-heavy flows — information is revealed progressively on the same page.
* Navigation: Sticky top navbar with the agency logo left-aligned, nav links centred, and a 'Contact Us' CTA button right-aligned.
* Footer: Three-column layout — logo + tagline, quick links, contact details and social.

### 3.4 Non-AI-Looking Design Principles
To ensure the UI feels hand-crafted and brand-specific rather than AI-generated, the following rules are enforced:
* No purple gradients, no glassmorphism, no generic card shadows copied from Tailwind UI templates.
* Typography is the hero — large Cormorant Garamond headings create editorial gravitas unavailable in UI-kit defaults.
* Micro-interactions are purposeful: card image zooms slightly on hover; the search bar expands with an ease-out transition;
* the enquiry button pulses once after submission.
* Every page has a single dominant visual hierarchy point — not multiple competing elements.
* Whitespace is used intentionally, not as padding-filler. Section breaks use a 2px teal rule.
* Photos are always shown at a fixed aspect ratio (4:3) with object-fit: cover to prevent layout shifts.

---

## 4. Functional Requirements – Public Portal

### 4.1 Home Page

**4.1.1 Hero Section**
The hero occupies 85vh on desktop. It features a full-bleed background image (rotating carousel of 3 curated property photos), overlaid with the agency tagline 'Trouvez votre chez-vous en Algérie' in Cormorant Garamond.
A search bar is centred below the tagline.

Search bar fields:
* Transaction type toggle: Vente (Sale) | Location (Rent)
* Wilaya dropdown: lists all 48 wilayas alphabetically
* Property type: Appartement, Villa, Local Commercial, Terrain, Bureau
* Budget range: min/max DZD slider
* 'Rechercher' button → navigates to /listings with query params applied

**4.1.2 Featured Listings Strip**
A horizontally scrollable strip of 6 'featured' properties (marked as featured in admin).
Each card shows: primary photo, price, city, type, and bedroom count. A 'Voir tous les biens' link routes to /listings.

**4.1.3 Why Diar Dzair – Value Proposition**
Three-column icon + text layout: '10 ans d'expérience', 'Plus de 1200 biens vendus', 'Couverture nationale'.
Icons are custom SVG, not icon library defaults.

**4.1.4 Testimonials**
A static carousel of 4 client testimonials with name, wilaya, and a star rating.
Displayed in a warm beige card with the agency's teal accent border.

**4.1.5 Call-to-Action Banner**
Full-width teal background section: 'Vous avez un bien à vendre ou à louer ? Contactez-nous.'
with a white ghost button linking to /contact.

### 4.2 Listings Page (/listings)

**4.2.1 Filter Sidebar**
Left-side filter panel (collapsible on mobile). Filters:
* Transaction type: Sale / Rent (radio)
* Property type: multi-select checkboxes
* Wilaya: searchable dropdown
* Commune: dependent dropdown (populated based on selected wilaya)
* Price range: dual-handle slider with DZD labels
* Surface area (m²): min/max number inputs
* Number of rooms: 1 / 2 / 3 / 4 / 4+ toggles
* Floor: Any / Ground / 1st / 2nd / 3rd+
* Features: checkboxes for Parking, Ascenseur, Balcon, Terrasse, Cave
* 'Réinitialiser' button clears all filters

**4.2.2 Listing Grid**
Displays filtered results in a 3-column grid (desktop). Each property card contains:
* Primary photo with an aspect ratio of 4:3
* 'À Vendre' or 'À Louer' badge (teal / gold colour-coded)
* Property type tag
* Price in DZD with thousands separator
* City and wilaya
* Quick stats row: bedroom icon + count, bathroom icon + count, surface area in m²
* 'Voir le bien' link

**4.2.3 Sorting & Results Count**
Above the grid: 'X biens trouvés' label and a sort dropdown: Prix croissant, Prix décroissant, Plus récent, Surface.

**4.2.4 Pagination**
Server-side pagination, 12 listings per page. Numbered page links + Previous/Next. URL param: ?page=2

### 4.3 Property Detail Page (/listings/[slug])

**4.3.1 Photo Gallery**
A main large image with a horizontal thumbnail strip below. Clicking a thumbnail swaps the main image.
A 'Voir toutes les photos' button opens a fullscreen lightbox (Swiper.js).

**4.3.2 Property Header**
Displays: title, transaction badge, price, and address (commune + wilaya).

**4.3.3 Specification Grid**

| Spec | Data Type | Example |
| :--- | :--- | :--- |
| Surface habitable | Number + m² | 120 m² |
| Nombre de pièces | Integer | 4 |
| Chambres | Integer | 3 |
| Salles de bain | Integer | 2 |
| Étage | String | 3ème / 6 |
| Type de bien | Enum | Appartement |
| État du bien | Enum | Rénové / Neuf / À rénover |
| Année de construction | Year | 2018 |

**4.3.4 Description**
Long-form text area supporting up to 2,000 characters. Displayed with a 'Lire la suite' expand toggle if over 300 characters.

**4.3.5 Amenities / Features**
A tag-cloud of available features: Parking, Ascenseur, Balcon, Terrasse, Cave, Climatisation, Gardiennage, etc. Displayed as pill badges.

**4.3.6 Location Map**
An embedded Leaflet.js map centred on the property's approximate coordinates (wilaya/commune centroid if exact address not provided).
Marker with agency brand colour. Map height: 320px.

**4.3.7 Enquiry Form (Sidebar)**
Sticky right-column form on desktop. Fields: Full name, Phone number (+213 prefix pre-filled), Email (optional), Message (pre-filled: 'Je suis intéressé(e) par ce bien.').
Submit sends data to /api/leads. Success state shows a teal confirmation message.

### 4.4 About Page (/a-propos)
* Agency story section: founding year (2014), mission statement
* Team grid: 6 mock agent cards with photo, name, specialisation, and phone number
* Agency stats: properties sold, years active, wilayas covered
* Partner logos strip: mock notary offices and banking partners

### 4.5 Contact Page (/contact)
* Google Maps alternative: Leaflet map showing office location (Alger Centre)
* Contact form: Name, Phone, Email, Subject (dropdown), Message
* Agency address, phone numbers (3 agents), email, and office hours
* WhatsApp direct link button

---

## 5. Functional Requirements – Admin Dashboard

### 5.1 Authentication (/admin/login)
A dedicated login page (not linked from public nav). Fields: Email and Password. Session stored as HTTP-only cookie (7-day expiry).
Failed login shows error message. Forgot password sends reset email via Resend API.
All /admin/* routes are protected server-side via Next.js middleware.

### 5.2 Admin Layout
Persistent left sidebar with navigation:
* Dashboard (overview stats)
* Biens (property listings)
* Demandes (lead enquiries)
* Médias (image library)
* Paramètres (settings)
Top bar shows: logged-in user name, notification bell (enquiry count), and logout button.

### 5.3 Dashboard Page (/admin)

| Metric Card | Data Source |
| :--- | :--- |
| Total listings (active) | COUNT WHERE status = 'active' |
| New enquiries (last 7 days) | COUNT leads WHERE created_at > NOW()-7d |
| Listings sold this month | COUNT WHERE status = 'sold' AND updated_at > start_of_month |
| Total listings views (30d) | SUM page_views WHERE period = last_30_days |

Below the metrics: a bar chart of weekly enquiries (Recharts), and a list of the 5 most recently received leads.

### 5.4 Property Management (/admin/listings)

**5.4.1 Listings Table**
Sortable, filterable table with columns: Thumbnail, Title, Type, Wilaya, Price (DZD), Status, Date Added, Actions.
Actions: Edit (pencil icon), Archive (box icon), Delete (trash icon with confirmation modal). Status filter tabs: Tous | Actifs |
Archivés | Vendus/Loués

**5.4.2 Create / Edit Listing Form (/admin/listings/new, /admin/listings/[id]/edit)**
A multi-step form divided into tabs:
* Étape 1 – Informations générales: Title (FR), Transaction type, Property type, Price, Negotiable checkbox, Status
* Étape 2 – Localisation: Wilaya (dropdown), Commune (dependent dropdown), Street address (optional), GPS coordinates (optional, with map picker)
* Étape 3 – Détails: Surface, Rooms, Bedrooms, Bathrooms, Floor, Total floors, Year built, Condition
* Étape 4 – Équipements: Multi-checkbox for all amenity features
* Étape 5 – Description: Rich textarea (no HTML editor — plain text only for simplicity)
* Étape 6 – Photos: Drag-and-drop multi-image upload. First image = cover photo. Reorder by drag. Max 20 images per listing.
Each image auto-compressed to WebP ≤ 500KB via Cloudinary.
* Étape 7 – Récapitulatif: Preview card + Publish button

**5.4.3 Listing Status Transitions**

| From | To | Trigger |
| :--- | :--- | :--- |
| Draft | Active | Admin clicks 'Publier' |
| Active | Archived | Admin clicks 'Archiver' |
| Active | Sold / Rented | Admin marks as 'Vendu/Loué' |
| Archived | Active | Admin clicks 'Réactiver' |
| Any | Deleted | Admin confirms deletion modal |

### 5.5 Lead Management (/admin/leads)
All incoming enquiries from the public portal. Table columns: Name, Phone, Property (linked), Date, Status, Source.
Status values: Nouveau (badge: red), Contacté (badge: amber), Converti (badge: green), Fermé (badge: gray).
Admin can click any row to open a detail drawer showing the full message and update status.
Export to CSV button for monthly reporting.

### 5.6 Media Library (/admin/media)
A grid view of all uploaded images across all listings. Each image shows the listing it belongs to on hover.
Unused images (not attached to any listing) can be bulk-deleted. No direct upload without a listing context.

### 5.7 Settings (/admin/settings)
* Agency info: Name, phone numbers, email, address, office hours (displayed on Contact page)
* Agent management: Add / remove agent profiles (name, photo, phone, specialisation)
* Featured listings: Select up to 6 listings to show in the homepage strip
* Password change

---

## 6. Mock Data Specification

### 6.1 Property Listings – Sample Data
The following 10 mock listings are seeded in the development database and rendered on all pages during development and staging:

| Title | Type | Wilaya | Price (DZD) | Status |
| :--- | :--- | :--- | :--- | :--- |
| Appt F4 Kouba vue panoramique | Appartement | Alger | 14 500 000 | Active – Sale |
| Villa R+1 avec piscine Staoueli | Villa | Alger | 65 000 000 | Active – Sale |
| Local commercial centre Oran | Local Comm. | Oran | 8 000 000 | Active – Sale |
| Studio meublé Sidi Bel Abbès | Studio | Sidi Bel Abbès | 35 000 / mois | Active – Rent |
| Terrain constructible Annaba | Terrain | Annaba | 9 200 000 | Active – Sale |
| Appt F3 Bab Ezzouar neuf | Appartement | Alger | 11 800 000 | Active – Sale |
| Bureau haut standing Constantine | Bureau | Constantine | 120 000 / mois | Active – Rent |
| Villa traditionnelle Tlemcen | Villa | Tlemcen | 38 000 000 | Active – Sale |
| Appt F2 vue mer Béjaïa | Appartement | Béjaïa | 7 400 000 | Active – Sale |
| Duplex Hydra – résidence sécurisée | Duplex | Alger | 29 000 000 | Active – Sale |

### 6.2 Mock Agents

| Name | Specialisation | Wilaya | Phone |
| :--- | :--- | :--- | :--- |
| Nour El Houda Amrani | Résidentiel Alger | Alger | +213 661 23 45 67 |
| Yacine Boudiaf | Commercial & Bureaux | Alger | +213 770 34 56 78 |
| Meriem Saadi | Villas & Luxe | Alger / Oran | +213 555 45 67 89 |
| Sofiane Benmoussa | Terrains & VEFA | Constantine | +213 699 56 78 90 |
| Amira Khelifi | Location résidentielle | Oran | +213 771 67 89 01 |
| Ilyes Taleb | Investissement & Patrimoine | National | +213 560 78 90 12 |

### 6.3 Mock Enquiries

| Name | Phone | Property | Date | Status |
| :--- | :--- | :--- | :--- | :--- |
| Rania Bouziane | +213 550 12 34 56 | Appt F4 Kouba | 12/03/2026 | Contacté |
| Karim Mebarki | +213 661 98 76 54 | Villa Staoueli | 10/03/2026 | Nouveau |
| Fatima Rahmani | +213 770 55 43 21 | Local Oran | 08/03/2026 | Converti |
| Hamid Cherif | +213 699 11 22 33 | Terrain Annaba | 05/03/2026 | Fermé |
| Souad Mekki | +213 560 44 55 66 | Duplex Hydra | 01/03/2026 | Contacté |

---

## 7. Data Model

### 7.1 Core Tables

**properties**

| Column | Type | Description |
| :--- | :--- | :--- |
| id | UUID PK | Auto-generated identifier |
| slug | VARCHAR UNIQUE | URL-safe title slug |
| title | VARCHAR(255) | Listing title in French |
| transaction_type | ENUM | 'sale' \| 'rent' |
| property_type | ENUM | 'apartment' \| 'villa' \| 'commercial' \| 'land' \| 'office' \| 'duplex' \| 'studio' |
| price | BIGINT | Price in DZD (or monthly rent) |
| negotiable | BOOLEAN | Whether price is negotiable |
| wilaya_id | INTEGER FK | References wilayas table |
| commune | VARCHAR(100) | Sub-district name |
| surface_m2 | INTEGER | Total area in square metres |
| rooms | SMALLINT | Total number of rooms |
| bedrooms | SMALLINT | Number of bedrooms |
| bathrooms | SMALLINT | Number of bathrooms |
| floor | SMALLINT | Floor number (0 = ground) |
| total_floors | SMALLINT | Total floors in building |
| year_built | SMALLINT | Year of construction |
| condition | ENUM | 'new' \| 'renovated' \| 'good' \| 'to_renovate' |
| description | TEXT | Long-form description |
| amenities | TEXT[] | Array of amenity keys |
| images | JSONB | Array of {url, alt, order} |
| status | ENUM | 'draft' \| 'active' \| 'archived' \| 'sold' \| 'rented' |
| is_featured | BOOLEAN | Shown on homepage strip |
| created_at | TIMESTAMPTZ | Record creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

**leads**

| Column | Type | Description |
| :--- | :--- | :--- |
| id | UUID PK | Auto-generated |
| property_id | UUID FK | References properties(id) |
| full_name | VARCHAR(150) | Enquirer's full name |
| phone | VARCHAR(20) | Phone number (Algerian format) |
| email | VARCHAR(255) | Email address (optional) |
| message | TEXT | Enquiry message |
| status | ENUM | 'new' \| 'contacted' \| 'converted' \| 'closed' |
| source | VARCHAR(50) | 'listing_page' \| 'contact_page' \| 'homepage' |
| created_at | TIMESTAMPTZ | Submission timestamp |

---

## 8. API Routes (Next.js App Router)

| Method | Route | Description |
| :--- | :--- | :--- |
| GET | /api/listings | List all active listings with filter params |
| GET | /api/listings/[slug] | Single listing detail by slug |
| GET | /api/listings/featured | Up to 6 featured listings |
| POST | /api/leads | Submit a property enquiry (public) |
| POST | /api/contact | Submit a general contact message |
| GET | /api/admin/listings | All listings incl. draft/archived (auth) |
| POST | /api/admin/listings | Create a new listing (auth) |
| PUT | /api/admin/listings/[id] | Update a listing (auth) |
| DELETE | /api/admin/listings/[id] | Delete a listing (auth) |
| GET | /api/admin/leads | All leads with filters (auth) |
| PATCH | /api/admin/leads/[id] | Update lead status (auth) |
| POST | /api/admin/upload | Upload image to Cloudinary (auth) |
| GET | /api/wilayas | List all 48 wilayas |
| GET | /api/wilayas/[id]/communes | List communes for a wilaya |

---

## 9. Non-Functional Requirements

| Category | Target | Implementation Note |
| :--- | :--- | :--- |
| Performance – LCP | < 2.0s (mobile) | SSR + ISR for listing pages; cover images served at WebP 800px |
| Performance – CLS | < 0.05 | All images have explicit width/height; no layout shift fonts |
| Lighthouse Score | ≥ 90 (mobile) | Tested per key page before each release |
| Availability | 99.5% monthly | Vercel SLA; DB on Supabase with daily backups |
| Security – Admin | Zero public access | Next.js middleware redirects unauthenticated /admin requests |
| Security – Inputs | Full sanitisation | All form inputs sanitised server-side; parameterised DB queries |
| SEO | Full crawlability | All public pages SSR; dynamic sitemap.xml; robots.txt |
| Accessibility | WCAG 2.1 AA | Colour contrast ≥ 4.5:1; all interactions keyboard-navigable |
| Mobile Responsive | 320px – 1920px | Fluid grid; tested on real devices in Algiers office |
| Internationalisation | FR primary, AR v2 | next-intl library; RTL layout toggle reserved for v2 |

---

## 10. Technology Stack

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| Framework | Next.js 14 (App Router) | SSR/ISR/SSG flexibility; file-based routing; API routes |
| Styling | Tailwind CSS v3 | Utility-first, fast iteration, custom design tokens via config |
| Components | Radix UI (headless) | Accessible primitives; custom styled on top |
| Database | PostgreSQL 15 via Supabase | Hosted PG; built-in auth, storage, realtime optional |
| ORM | Prisma | Type-safe DB queries; migration management |
| Auth | NextAuth.js v5 | Session-based; credentials provider for admin login |
| Image Hosting | Cloudinary | On-the-fly resizing, WebP conversion, CDN delivery |
| Maps | Leaflet.js + OpenStreetMap | Open-source, no API billing, supports Arabic tiles |
| Charts (Admin) | Recharts | React-native; lightweight; server-component friendly |
| Email | Resend + React Email | Transactional email for lead notifications |
| Deployment | Vercel | Zero-config Next.js deployment; edge network |
| Type Safety | TypeScript 5 | End-to-end type safety from DB schema to UI components |

---

## 11. Page & Route Summary

| Route | Rendering | Purpose |
| :--- | :--- | :--- |
| / | ISR (1h) | Home page – hero, featured listings, testimonials |
| /listings | SSR | Filterable property grid |
| /listings/[slug] | SSR | Property detail page |
| /a-propos | SSG | Agency about page |
| /contact | SSG | Contact form + map |
| /admin/login | SSG | Admin authentication page |
| /admin | CSR (auth) | Dashboard with KPI cards and charts |
| /admin/listings | CSR (auth) | Listings table with CRUD actions |
| /admin/listings/new | CSR (auth) | Multi-step create listing form |
| /admin/listings/[id]/edit | CSR (auth) | Edit existing listing form |
| /admin/leads | CSR (auth) | Lead CRM table |
| /admin/media | CSR (auth) | Image library grid |
| /admin/settings | CSR (auth) | Agency config & agent management |

---

## 12. Acceptance Criteria

### 12.1 Public Portal
* Home page loads in under 2 seconds on a 4G mobile connection.
* A visitor can search by wilaya and property type and see filtered results within 1 second.
* A property detail page displays all 10 mock listings with gallery, specs, map, and enquiry form.
* Submitting the enquiry form creates a lead record in the database and shows a success message.
* All pages pass WCAG 2.1 AA colour contrast checks.
* Lighthouse mobile score ≥ 90 on Home, Listings, and Detail pages.

### 12.2 Admin Dashboard
* Admin can log in with email/password and is redirected to the dashboard.
* Unauthenticated access to any /admin/* route redirects to /admin/login.
* Admin can create a new listing with all 7 form steps and it appears on the public portal.
* Admin can upload up to 20 images and reorder them via drag-and-drop.
* Admin can change a lead status from 'Nouveau' to 'Contacté' with a single click.
* Admin can archive, reactivate, or delete a listing — the public portal reflects changes within 60 seconds.
* Dashboard KPI cards accurately reflect the current database state.

### 12.3 Out of Scope (v1)
* Arabic (RTL) language version — planned for v2
* Online payment or deposit collection
* Automated WhatsApp integration (manual link only)
* Multi-agency / multi-tenant support
* AI-powered property recommendations
* Mobile native app (iOS / Android)