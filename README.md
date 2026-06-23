# Retenciones Pro | Professional Tax Simulator

Retenciones Pro is a high-performance, stateless fiscal simulation tool designed for independent professionals and freelancers. It provides instantaneous, accurate breakdowns of professional service retentions based on standard tax rates.

## 🚀 Vision & Purpose
The goal of Retenciones Pro is to eliminate the friction of financial planning for nomads and freelancers. By providing a clean, "Anti-Slop" interface, users can understand their net earnings in seconds without their data ever leaving the client browser.

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + ShadCN UI
- **Animations:** Framer Motion
- **Charts:** Recharts
- **State:** React Hooks (Context, useMemo)
- **Design:** Taste Skill v2 (Modern Editorial Aesthetic)

## 📊 Fiscal Logic
The application currently simulates standard Mexican (MEX) professional service retentions:
- **Gross Amount:** The base subtotal of the service.
- **VAT (IVA) 16%:** Standard Value Added Tax.
- **VAT Retention (10.66%):** Equivalent to 2/3 of the VAT (standard for services provided to corporations).
- **ISR Retention (10%):** Standard Income Tax retention for professional services.
- **Net Total:** The final amount to be received by the professional.

## 📦 Installation & Deployment

This project is compatible with **npm**, **yarn**, and **pnpm**.

### 1. Clone the repository
```bash
git clone <repository-url>
cd retenciones-pro
```

### 2. Install dependencies
```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

### 3. Development
```bash
npm run dev
# or yarn dev / pnpm dev
```

### 4. Production Build
```bash
npm run build
npm run start
# or yarn build && yarn start
```

## 📈 Scalability & Roadmap
Retenciones Pro is architected to be extensible:
- **Internationalization:** Easily add tax profiles for other countries (Spain, Colombia, Argentina, etc.).
- **Proforma Invoices:** Integration with `jspdf` to allow users to download instant PDF quotes.
- **Local Persistence:** Optional use of `localStorage` or `IndexedDB` to keep a history of calculations without a backend.
- **Advanced Analytics:** More detailed `recharts` integration to visualize annual fiscal planning.

## 🔒 Privacy & Security
This application is **stateless**. No data entered by the user is sent to any server or stored in any database. All calculations happen strictly in the browser.

---
© 2026 Precision Design. All rights reserved.