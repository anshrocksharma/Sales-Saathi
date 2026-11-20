# SalesSaathi — Retail Intelligence & Executive Decision Copilot

An executive-grade, predictive retail intelligence web application built according to the **Executive Precision** design system and the SalesSaathi design architecture.

---

## 🌟 Key Functional Domains

SalesSaathi balances quiet institutional authority with high-speed predictive AI capabilities for multi-store operators, commercial analysts, and retail leadership:

### 1. 📊 Executive Overview Dashboard
- **Real-time KPI Deck:** Total Revenue (`₹12,45,800` / `+14.2%`), Total Transactions (`8,542` / `+8.1%`), Average Order Value (`₹1,458` / `+3.4%`), Unique Customers (`3,210` / `+18.5%`) with embedded micro-sparklines.
- **Store Network Health:** Monitor fleet synchronicity across 12 flagship locations (Bengaluru, Mumbai, Delhi NCR, Hyderabad, Pune) with 99.4% POS sync.
- **Executive AI Insights:** Real-time strategic signals covering category revenue contribution (Consumer Electronics leads at 38%), active customer cohorts (Champions & Loyalists at +42% frequency), weekend promotional lift (+5.8%), and retention cycles (19-day repeat period).
- **Interactive Visual Progression:** Area curve of daily actuals, 5-vertical product mix donut chart, category volume ranking, and hourly footfall/checkout density.
- **Forecast Simulator:** One-click simulation for weekend store inventory rebalancing.

### 2. 📈 Commercial Sales Analytics
- **Multi-Dimensional Filters:** Slice performance by date range (Today, 7D, 30D, Q3 FY24), product category, customer gender, and age cohorts (18-25, 26-40, 41-60).
- **Revenue Trend Pulse:** Toggle between daily progression and weekly macro views, highlighting Saturday surges (`₹2.4L`) and Sunday peaks (`₹2.6L`).
- **Demographic Intelligence:** Gender distribution (Female 54% vs Male 46%) and age cohort volume contribution stacks.
- **Margin vs Volume Matrix:** Dual-bar velocity comparisons evaluating fast-moving apparel against high-margin consumer electronics.
- **Interactive Sales Roster:** Live search, revenue/volume/alphabetical sorting across all product lines.

### 3. 🎯 Customer Segmentation (K-Means Clustering)
- **Machine Learning Core:** Client-side K-Means clustering algorithm ($k=4$) calibrated on multivariate normalized RFM feature vectors.
- **2D Multivariate Feature Space Visualizer:** Scatter plot mapping Order Frequency against Monetary Spend with cluster density halos, centroid markers ($\mu_0, \mu_1, \mu_2, \mu_3$), and interactive point selection.
- **Target Segments:**
  - **High-Value Champions (C0):** 480 customers (15%), Avg Spend `₹38,400`, 16.2 orders/yr, 5d recency. Strategy: VIP concierge, private WhatsApp storefront, festive drops.
  - **Loyal Regulars (C1):** 960 customers (30%), Avg Spend `₹18,200`, 9.4 orders/yr, 12d recency. Strategy: Tiered loyalty points, reorder reminders.
  - **Potential Growth (C2):** 1,120 customers (35%), Avg Spend `₹8,150`, 3.8 orders/yr. Strategy: Cross-sell bundles, free shipping threshold.
  - **At-Risk Inactive (C3):** 650 customers (20%), Avg Spend `₹4,300`, 84d inactivity. Strategy: Automated winback discount vouchers (`₹250` flat).

### 4. 👥 Customer Intelligence & Behavioral Pillars
- **RFM Decile Engine:** Detailed distributions for Recency ($R$), Frequency ($F$), and Monetary ($M$) pillars with fleet benchmarks.
- **Demographics & Affinity:** Co-purchase pairing identification (Electronics + Accessories at 68% co-occurrence).
- **Searchable Customer 360° Roster:** Filter profiles by RFM category (Champions, Churn Hazard, All) and open detailed 360-degree customer drawers.

### 5. 💡 AI Business Recommendations & Playbook Dispatcher
- **Strategic Advisory Engine:** High-priority, medium-priority, and opportunistic business recommendations with revenue risk alerts.
- **Interactive Execution Modals:** Configure parameters (discounts, same-day delivery flags, WhatsApp routing) and execute playbooks with instant confirmation toasts.
- **Bookmark & Share:** Save recommendations for executive decks or copy formatted briefs to the clipboard.

### 6. 💾 Dataset Management & CSV Studio
- **Active Dataframe Monitor:** Real-time health audit of `Retail_Q3.csv` (100,000 transactions, `₹1.24 Cr` GMV, SHA-256 fingerprint).
- **Drag-and-Drop CSV Ingestion:** Upload any retail CSV file; the application auto-validates 9 schema signatures, recalculates RFM metrics, and runs K-Means clustering on the fly.
- **Preset Switcher:** Instantly toggle between `Retail_Q3.csv` (Standard) and `Diwali_Festive_Q4.csv` (High-Volume Surge).
- **Sample CSV Downloader:** Download `sample_retail_q3.csv` with one click.
- **Data Stream Preview:** Interactive searchable table previewing transaction records.

---

## 🏗️ Project Architecture

```
salessaathi-retail-intelligence/
├── index.html                   # Core single-page web app (responsive desktop & mobile shells)
├── app.js                       # Orchestrator, router, reactive event bindings & modal managers
├── server.py                    # Lightweight Python 3 local web server
├── README.md                    # Project documentation
├── css/
│   └── custom.css               # Executive Precision typography, scrollbars, elevations, animations
├── data/
│   ├── sample_data.js           # Multi-dataset seed store (Retail_Q3, Diwali_Festive_Q4)
│   └── sample_retail_q3.csv     # Downloadable valid CSV file
├── engine/
│   ├── rfm_engine.js            # RFM calculation, deciles, quintiles & customer scoring
│   ├── kmeans_engine.js         # Client-side K-Means clustering & silhouette validator
│   ├── analytics_engine.js      # Multi-dimensional aggregations, filter engine, currency formatters
│   └── recommendations_engine.js# Strategic rule advisory engine & playbook execution
└── components/
    ├── overview_view.js         # Overview dashboard component
    ├── analytics_view.js        # Commercial sales & demographic analytics component
    ├── segmentation_view.js     # K-Means 2D scatter plot & cohort action cards
    ├── intelligence_view.js     # RFM pillars & customer 360° roster
    ├── recommendations_view.js  # Advisory engine & playbook configuration
    └── dataset_view.js          # Dataset management, drag-drop CSV uploader & schema audit
```

---

## 🚀 How to Run

### Method 1: Python Local Server (Recommended)
Run the included python server script in terminal:
```powershell
python C:\Users\Acer\.gemini\antigravity\scratch\salessaathi-retail-intelligence\server.py
```
Then open your browser at **`http://localhost:8080/`**.

### Method 2: Direct File Open
You can also directly open `index.html` in Chrome, Edge, or any modern web browser:
```powershell
Start-Process "C:\Users\Acer\.gemini\antigravity\scratch\salessaathi-retail-intelligence\index.html"
```

---

## 🎨 Design System Compliance

All colors, typographic scales, card radii, and spacing follow the **Executive Precision** specification:
- **Base Canvas:** `#f8f9ff` (`--surface`)
- **Card Containers:** Pure `#ffffff` with 1px border `#e2e8f0` and soft ambient shadows
- **Brand Navy:** `#111827` / `#0b1c30`
- **Electric Indigo Accent:** `#4648d4` (`--secondary`)
- **AI Vector Cyan:** `#0090a9` / `#06B6D4`
- **Financial Currency Formatting:** Standard Indian numbering system (`₹` followed by digits, e.g. `₹12,45,800` or `₹1.24 Cr` / `₹42.8 L`) with tabular numbers (`tabular-nums`).
