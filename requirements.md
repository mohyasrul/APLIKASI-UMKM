# MODEL KEBUTUHAN SISTEM - APLIKASI MANAGEMENT UMKM

## **Tech Stack: Next.js Edition**

Saya akan menulis ulang kebutuhan sistem yang sama persis tetapi dengan stack Next.js yang lebih powerful dan modern.

## 1. ANALISIS REQUIREMENT

### Karakteristik Utama:

- **Internal Application**: Digunakan oleh satu UMKM saja
- **Serverless**: Tidak memerlukan server eksternal
- **Database Lokal**: Data tersimpan di device
- **Offline-First**: Bisa berfungsi tanpa internet
- **Cross-Platform**: Berbagai jenis device
- **Zero Initial Cost**: Pembuatan tanpa modal
- **Lifetime Purchase**: Sekali beli, pakai selamanya
- **Feature Complete**: Fitur premium kompetitor jadi standard

## 2. ARSITEKTUR YANG DIREKOMENDASIKAN

### **Next.js PWA + Local-First Architecture**

**Mengapa Next.js?**

- ✅ Superior performance dengan App Router
- ✅ Built-in PWA optimization
- ✅ Static export untuk offline distribution
- ✅ Advanced caching strategies
- ✅ Server Components untuk better UX
- ✅ Built-in optimization (images, fonts, etc)
- ✅ Type-safe development

### **Tech Stack Recommendation:**

```
Framework: Next.js 14+ (App Router)
Language: TypeScript
UI Framework: Tailwind CSS + Shadcn/ui
Database: SQLite (via better-sqlite3) + Dexie.js
State Management: Zustand + TanStack Query
Offline Sync: Workbox + Background Sync
PWA: next-pwa
Authentication: NextAuth.js (local provider)
Reports: React-PDF + Chart.js/Recharts
Build: Turbopack
Deployment: Static Export + GitHub Pages
```

## 3. FUNCTIONAL REQUIREMENTS

### **A. MODUL INVENTORY MANAGEMENT**

- **Master Data Produk**
  - CRUD produk dengan kategori, barcode, gambar
  - Multi-unit (pcs, lusin, karton, kg, dll)
  - Harga beli, harga jual, margin otomatis
  - Stock minimum alert
  - Batch/lot tracking untuk produk expired
- **Stock Management**

  - Stock opname dengan scan barcode
  - Stock transfer antar gudang/lokasi
  - FIFO/LIFO/Average costing
  - Stock adjustment dengan approval
  - Histori pergerakan stock detail

- **Supplier Management**
  - Master supplier dengan rating
  - Purchase order dengan approval workflow
  - Hutang supplier tracking
  - Supplier performance analytics

### **B. MODUL SALES & CUSTOMER**

- **Point of Sale (POS)**

  - Interface touch-friendly untuk tablet
  - Barcode scanner integration
  - Multiple payment methods
  - Discount (%, nominal, buy X get Y)
  - Tax calculation (PPN)
  - Receipt printing (thermal printer support)
  - Return/refund handling

- **Customer Management**

  - Customer database dengan segmentasi
  - Customer loyalty program/poin
  - Credit limit dan aging analysis
  - Customer purchase history
  - Birthday/anniversary notifications

- **Sales Analytics**
  - Sales performance dashboard
  - Best/worst selling products
  - Peak hours analysis
  - Customer behavior insights
  - ABC analysis produk

### **C. MODUL FINANCIAL MANAGEMENT**

- **Cash Flow Management**

  - Multiple cash accounts (kas, bank, dompet digital)
  - Daily cash reconciliation
  - Petty cash management
  - Cash flow forecasting

- **Accounting Basic**

  - Chart of accounts (COA) simple
  - Journal entries otomatis dari transaksi
  - Trial balance & balance sheet basic
  - Profit & loss statement
  - Tax calculation (PPh, PPN)

- **Expense Management**
  - Expense categories
  - Recurring expenses
  - Expense approval workflow
  - Receipt photo attachment
  - Budget vs actual analysis

### **D. MODUL HUMAN RESOURCES**

- **Employee Management**

  - Employee database dengan foto
  - Attendance tracking (manual/biometric)
  - Shift scheduling
  - Leave management
  - Employee performance tracking

- **Payroll**
  - Salary calculation dengan overtime
  - Deduction management (BPJS, pajak)
  - Payslip generation
  - Payroll tax reporting
  - Commission calculation untuk sales

### **E. MODUL REPORTING & ANALYTICS**

- **Standard Reports**

  - Sales report (daily, monthly, yearly)
  - Inventory report (stock, movement, valuation)
  - Financial reports (P&L, balance sheet, cash flow)
  - Customer analysis (RFM, lifetime value)
  - Supplier performance report

- **Business Intelligence**
  - Interactive dashboard dengan chart
  - KPI monitoring (revenue, margin, inventory turnover)
  - Trend analysis dan forecasting
  - Custom report builder
  - Export ke Excel/PDF

### **F. MODUL DIGITAL INTEGRATION**

- **E-commerce Integration**

  - Sinkronisasi dengan marketplace (Tokopedia, Shopee)
  - WhatsApp Business integration
  - Social media posting automation
  - Online catalog generation

- **Digital Payment**
  - QR Code payment (QRIS)
  - E-wallet integration
  - Digital receipt via WhatsApp/email
  - Payment link generation

## 4. NON-FUNCTIONAL REQUIREMENTS

### **A. Performance**

- App loading < 2 detik (Next.js optimization)
- Transaction processing < 500ms
- Database query < 300ms
- Offline sync < 5 detik setelah online

### **B. Security**

- Local data encryption (AES-256)
- User authentication dengan PIN/biometric
- Role-based access control
- Audit trail semua transaksi
- Data backup otomatis ke cloud storage

### **C. Usability**

- Mobile-first responsive design
- Touch-friendly interface (min 44px button)
- Multi-language support (ID, EN)
- Dark/light theme
- Accessibility compliance (WCAG 2.1)

### **D. Reliability**

- 99.9% uptime (offline capability)
- Data consistency check otomatis
- Error handling graceful
- Automatic crash reporting
- Data recovery mechanism

## 5. TECHNICAL ARCHITECTURE

### **A. Next.js App Architecture**

```
app/
├── (auth)/                 # Auth route group
│   ├── login/
│   └── register/
├── (dashboard)/            # Protected routes
│   ├── products/
│   ├── customers/
│   ├── pos/
│   ├── reports/
│   └── settings/
├── api/                    # API routes (for local operations)
│   ├── products/
│   ├── customers/
│   └── auth/
├── components/             # Reusable components
│   ├── ui/                # Shadcn/ui components
│   ├── forms/
│   └── charts/
├── lib/                    # Utilities
│   ├── db/                # Database operations
│   ├── utils/
│   └── stores/            # Zustand stores
└── public/                # Static assets
```

### **B. Database Schema (SQLite + Dexie.js)**

```sql
-- Users & Auth (SQLite)
users (id, username, password_hash, role, created_at)
user_sessions (id, user_id, token, expires_at)

-- Products & Inventory
categories (id, name, parent_id)
products (id, name, category_id, barcode, price_buy, price_sell)
product_units (id, product_id, unit_name, conversion_rate)
inventory (id, product_id, location_id, quantity, cost_basis)
stock_movements (id, product_id, type, quantity, reference_id)

-- Sales & Customers
customers (id, name, phone, email, address, credit_limit)
sales_orders (id, customer_id, total, tax, discount, status)
sales_order_items (id, order_id, product_id, quantity, price)
payments (id, order_id, amount, method, reference)

-- Financial
accounts (id, name, type, balance)
journal_entries (id, reference, description, date)
journal_items (id, entry_id, account_id, debit, credit)
expenses (id, category_id, amount, description, receipt_url)

-- HR & Payroll
employees (id, name, position, salary, join_date)
attendance (id, employee_id, date, time_in, time_out)
payrolls (id, employee_id, period, gross_salary, deductions)
```

### **C. File Structure Lengkap**

```
umkm-management/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── add/
│   │   │       └── page.tsx
│   │   ├── customers/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── pos/
│   │   │   └── page.tsx
│   │   ├── inventory/
│   │   │   ├── page.tsx
│   │   │   └── adjustment/
│   │   │       └── page.tsx
│   │   ├── sales/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── financial/
│   │   │   ├── page.tsx
│   │   │   ├── expenses/
│   │   │   │   └── page.tsx
│   │   │   └── reports/
│   │   │       └── page.tsx
│   │   ├── hr/
│   │   │   ├── employees/
│   │   │   │   └── page.tsx
│   │   │   └── payroll/
│   │   │       └── page.tsx
│   │   ├── reports/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   ├── page.tsx           # Dashboard
│   │   └── layout.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── route.ts
│   │   │   └── register/
│   │   │       └── route.ts
│   │   ├── products/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── customers/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── sales/
│   │   │   ├── route.ts
│   │   │   └── pos/
│   │   │       └── route.ts
│   │   ├── inventory/
│   │   │   └── route.ts
│   │   ├── financial/
│   │   │   └── route.ts
│   │   └── reports/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   └── not-found.tsx
├── components/
│   ├── ui/                    # Shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── table.tsx
│   │   ├── modal.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── sidebar.tsx
│   │   └── navigation.tsx
│   ├── forms/
│   │   ├── product-form.tsx
│   │   ├── customer-form.tsx
│   │   └── ...
│   ├── charts/
│   │   ├── sales-chart.tsx
│   │   ├── inventory-chart.tsx
│   │   └── ...
│   ├── pos/
│   │   ├── pos-interface.tsx
│   │   ├── cart-component.tsx
│   │   └── payment-modal.tsx
│   └── reports/
│       ├── report-generator.tsx
│       └── export-buttons.tsx
├── lib/
│   ├── db/
│   │   ├── sqlite.ts
│   │   ├── dexie.ts
│   │   ├── migrations.ts
│   │   └── seed.ts
│   ├── stores/
│   │   ├── auth-store.ts
│   │   ├── product-store.ts
│   │   ├── customer-store.ts
│   │   └── pos-store.ts
│   ├── utils/
│   │   ├── encryption.ts
│   │   ├── formatting.ts
│   │   ├── validation.ts
│   │   └── calculations.ts
│   ├── hooks/
│   │   ├── use-products.ts
│   │   ├── use-customers.ts
│   │   └── use-offline.ts
│   └── types/
│       ├── product.ts
│       ├── customer.ts
│       ├── sales.ts
│       └── common.ts
├── public/
│   ├── icons/
│   ├── images/
│   ├── manifest.json
│   └── sw.js
├── styles/
│   └── globals.css
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## 6. DEVELOPMENT ROADMAP

### **Phase 1 (MVP - 2 bulan)**

- Basic POS functionality
- Product & inventory management
- Customer management
- Basic reporting
- Offline capability

### **Phase 2 (3 bulan)**

- Financial management
- Advanced inventory features
- HR & payroll basic
- Dashboard & analytics

### **Phase 3 (2 bulan)**

- E-commerce integration
- Advanced reporting
- Mobile optimization
- Testing & bug fixes

### **Phase 4 (1 bulan)**

- Performance optimization
- Security hardening
- Documentation
- Deployment preparation

## 7. MONETIZATION STRATEGY

### **Pricing Model:**

- **Starter Edition**: Rp 500K (1 user, basic features)
- **Professional**: Rp 1.5M (5 users, full features)
- **Enterprise**: Rp 3M (unlimited users, custom features)

### **Revenue Streams:**

- One-time license fee
- Optional premium support (annual)
- Custom development services
- Training & consultation

## 8. COMPETITIVE ADVANTAGES

1. **True Offline**: Kompetitor masih butuh internet
2. **No Subscription**: Sekali beli vs monthly fee kompetitor
3. **Complete Features**: Fitur premium jadi standard
4. **Local Data**: Data tidak keluar dari perusahaan
5. **Cross Platform**: Satu aplikasi untuk semua device
6. **Easy Setup**: Install seperti website, tidak ribet
7. **Superior Performance**: Next.js optimization

## 9. DEVELOPMENT COST ESTIMATION

### **Zero Cost Development:**

- GitHub (free repository & pages hosting)
- VS Code (free IDE)
- Next.js/TypeScript (free frameworks)
- Figma (free design tool)
- All libraries mentioned are open source

### **Optional Costs:**

- Domain name: $10/year
- SSL certificate: Free (Let's Encrypt)
- Code signing certificate: $200/year (untuk trust)

**Total Development Cost: $0 - $210/year**

## 10. NEXT.JS SPECIFIC CONFIGURATIONS

### **next.config.js**

```javascript
/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    appDir: true,
  },
};

module.exports = withPWA(nextConfig);
```

### **Key Next.js Features yang Dimanfaatkan:**

- **App Router**: Modern routing dengan server components
- **Static Export**: Untuk offline distribution
- **Image Optimization**: Built-in image optimization
- **Font Optimization**: Automatic font loading
- **Bundle Analyzer**: Performance monitoring
- **TypeScript**: Full type safety
- **API Routes**: Local API endpoints
- **Middleware**: Request/response processing

## 11. DEPLOYMENT & DISTRIBUTION STRATEGY

### **A. Distribution Models**

- **GitHub Releases**: Direct download untuk tech-savvy users
- **Progressive Web App**: Install via browser (Chrome, Edge, Firefox)
- **Offline Package**: ZIP file dengan local server untuk air-gapped environments
- **Cloud Hosting**: Optional hosted version dengan data sync
- **Mobile App Store**: Wrapper untuk Android/iOS (future consideration)

### **B. Installation Methods**

1. **Browser Installation (Primary)**

   - Visit website, click "Install App"
   - Works on desktop, tablet, mobile
   - Automatic updates via service worker

2. **Manual Installation**

   - Download ZIP file
   - Extract and run local server
   - Access via localhost in browser

3. **Cloud Deployment**
   - Deploy to Vercel/Netlify for online access
   - Data stays local via IndexedDB
   - Sync capabilities for multi-device

### **C. Update Mechanism**

- **Automatic Updates**: Service worker checks for updates
- **Manual Updates**: User-triggered update check
- **Rollback Capability**: Previous version restoration
- **Migration Scripts**: Database schema updates
- **Backup Before Update**: Automatic data backup

### **D. Platform Support Matrix**

```
Platform          | PWA Install | Full Features | Performance
------------------|-------------|---------------|-------------
Windows Desktop   | ✅ Yes      | ✅ Complete   | ⭐⭐⭐⭐⭐
macOS Desktop     | ✅ Yes      | ✅ Complete   | ⭐⭐⭐⭐⭐
Android Tablet    | ✅ Yes      | ✅ Complete   | ⭐⭐⭐⭐
Android Phone     | ✅ Yes      | ⭐ Limited    | ⭐⭐⭐⭐
iPad              | ✅ Yes      | ✅ Complete   | ⭐⭐⭐⭐
iPhone            | ⚠️ Limited  | ⭐ Limited    | ⭐⭐⭐
Chromebook        | ✅ Yes      | ✅ Complete   | ⭐⭐⭐⭐
```

## 12. TESTING & QUALITY ASSURANCE STRATEGY

### **A. Testing Framework**

- **Unit Testing**: Jest + React Testing Library
- **Integration Testing**: Cypress atau Playwright
- **End-to-End Testing**: User journey automation
- **Performance Testing**: Lighthouse CI + custom metrics
- **Security Testing**: OWASP guidelines compliance

### **B. Testing Pyramid**

```
    E2E Tests (10%)
   ──────────────
  Integration (20%)
 ─────────────────
Unit Tests (70%)
```

### **C. Quality Gates**

- **Code Coverage**: Minimum 80%
- **Performance Score**: Lighthouse > 90
- **Accessibility**: WCAG 2.1 AA compliance
- **Security**: No high/critical vulnerabilities
- **Bundle Size**: < 2MB total

### **D. Continuous Testing**

- **Pre-commit**: Linting + unit tests
- **Pull Request**: Full test suite + coverage
- **Release**: E2E + performance testing
- **Post-deployment**: Smoke tests + monitoring

### **E. Device Testing Matrix**

```
Device Type        | Screen Size | Touch | Testing Priority
-------------------|-------------|-------|------------------
Desktop            | 1920x1080+  | No    | High
Tablet (Android)   | 768x1024    | Yes   | High
Tablet (iPad)      | 1024x768    | Yes   | High
Phone (Android)    | 375x667     | Yes   | Medium
Phone (iPhone)     | 375x812     | Yes   | Medium
Chromebook         | 1366x768    | Mixed | Medium
```

---

## 13. MAINTENANCE & SUPPORT STRATEGY

### **A. Support Tiers**

1. **Community Support** (Free)

   - GitHub issues
   - Documentation
   - Community forum

2. **Premium Support** (Paid)

   - Email support
   - Priority bug fixes
   - Installation assistance

3. **Enterprise Support** (Custom)
   - Phone support
   - Custom features
   - On-site training

### **B. Update Schedule**

- **Security Updates**: Immediate
- **Bug Fixes**: Weekly
- **Feature Updates**: Monthly
- **Major Releases**: Quarterly

### **C. Documentation Types**

- **User Manual**: End-user guide
- **API Documentation**: Developer reference
- **Installation Guide**: Setup instructions
- **Troubleshooting**: Common issues
- **Video Tutorials**: Step-by-step guides

---

## 14. PERFORMANCE OPTIMIZATION STRATEGY

### **A. Frontend Optimization**

- **Code Splitting**: Route-based lazy loading
- **Tree Shaking**: Remove unused code
- **Image Optimization**: WebP + responsive images
- **Font Optimization**: Subset fonts + preload
- **Caching Strategy**: Aggressive service worker caching

### **B. Database Optimization**

- **Indexing**: Strategic database indexes
- **Query Optimization**: Efficient SQL queries
- **Connection Pooling**: Reuse database connections
- **Data Pagination**: Limit large result sets
- **Background Processing**: Async operations

### **C. Memory Management**

- **Garbage Collection**: Proper cleanup
- **Memory Leaks**: Prevention strategies
- **Large Dataset**: Virtual scrolling
- **Image Management**: Lazy loading + compression
- **State Management**: Efficient state updates

### **D. Monitoring & Analytics**

- **Performance Metrics**: Core Web Vitals
- **Error Tracking**: Crash reporting
- **Usage Analytics**: Feature usage tracking
- **Performance Alerts**: Automated monitoring
- **User Feedback**: In-app feedback system
