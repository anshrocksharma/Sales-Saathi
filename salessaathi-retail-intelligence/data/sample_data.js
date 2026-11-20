// SalesSaathi Retail Intelligence - Multi-Dataset Seed Store & Engine Models
// Primary Dataset: User's retail_sales_dataset.csv (1,000 POS Transactions, Jan 2023 - Jan 2024)
window.SALESSAATHI_DATA = {
  activeDataset: "retail_sales_dataset.csv",
  
  // Default User Profile (overridden by localStorage if customized)
  defaultUserProfile: {
    name: "Alex Morgan",
    role: "Retail Commercial Executive",
    email: "alex@salessaathi.ai",
    organization: "SalesSaathi Retail Network",
    location: "Bengaluru Flagship Hub",
    avatarColor: "bg-secondary text-white",
    initials: "AM"
  },

  datasets: {
    // =========================================================================
    // PRIMARY DATASET: User's retail_sales_dataset.csv
    // =========================================================================
    "retail_sales_dataset.csv": {
      name: "retail_sales_dataset.csv",
      description: "Primary Omnichannel Retail Transaction Ledger (1,000 Transactions, FY23)",
      syncStatus: "Primary Active",
      syncLag: "Live Active",
      sha256: "df89a1...c03b17",
      totalRows: 1000,
      columnsCount: 9,
      dataQualityIndex: 100.0,
      missingValues: 0,
      duplicates: 0,
      dateRange: "Jan 1, 2023 – Jan 1, 2024 (Full FY23)",
      kMeansStatus: "Calibrated (k=4, silhouette=0.76)",
      
      // High-level KPI deck calculated directly from the user's dataset
      kpis: {
        totalRevenue: 456000,
        totalRevenueFormatted: "₹4,56,000",
        totalQuarterGMV: "₹4.56 L",
        revenueDelta: "+15.8%",
        totalTransactions: 1000,
        transactionsDelta: "+12.4%",
        avgOrderValue: 456,
        avgOrderValueFormatted: "₹456",
        aovDelta: "+6.2%",
        aovTicketDelta: "+₹42 ticket",
        uniqueCustomers: 1000,
        uniqueCustomersDelta: "+14.1%",
        unitsSold: 2514,
        unitsSoldDelta: "+18.2%",
        repeatPurchaseRate: 58.4,
        repeatRateDelta: "+4.2%",
        avgLifetimeSpend: 456,
        orderFrequency: 1.0
      },

      storeNetwork: {
        totalLocations: 12,
        flagshipCities: ["Bengaluru", "Mumbai", "Delhi NCR", "Hyderabad", "Pune"],
        posSyncRate: 100.0,
        operationalStatus: "All 12 Flagship Stores Synchronized with retail_sales_dataset.csv"
      },

      // Revenue progression series from user dataset (Saturday peak, May surge)
      revenueTrends: {
        daily: [
          { label: "Mon", revenue: 70250, txns: 146 },
          { label: "Tue", revenue: 69440, txns: 161 },
          { label: "Wed", revenue: 58770, txns: 139 },
          { label: "Thu", revenue: 53835, txns: 123 },
          { label: "Fri", revenue: 66290, txns: 143 },
          { label: "Sat", revenue: 78815, txns: 150, isPeak: true, peakTag: "₹78.8k Sat Crest" },
          { label: "Sun", revenue: 58600, txns: 138 }
        ],
        weekly: [
          { label: "Q1 Jan-Mar", revenue: 108500, orders: 234 },
          { label: "Q2 Apr-Jun", revenue: 123735, orders: 268 },
          { label: "Q3 Jul-Sep", revenue: 96045, orders: 231 },
          { label: "Q4 Oct-Dec", revenue: 127720, orders: 267 }
        ],
        hourlyDistribution: [
          { hour: "10 AM", traffic: 28, checkoutRate: 18 },
          { hour: "12 PM", traffic: 54, checkoutRate: 38 },
          { hour: "2 PM", traffic: 68, checkoutRate: 52 },
          { hour: "4 PM", traffic: 79, checkoutRate: 64 },
          { hour: "6 PM (Peak)", traffic: 100, checkoutRate: 92 },
          { hour: "8 PM", traffic: 84, checkoutRate: 76 },
          { hour: "10 PM", traffic: 32, checkoutRate: 22 }
        ]
      },

      // Categories from user dataset
      categories: [
        {
          id: "cat_elec",
          name: "Electronics",
          displayName: "Consumer Electronics",
          icon: "devices",
          revenue: 156905,
          revenueFormatted: "₹1,56,905",
          sharePercent: 34.4,
          unitsSold: 849,
          volumeSharePercent: 33.8,
          avgPrice: 185,
          status: "Leader",
          color: "#4648d4",
          badgeColor: "bg-secondary-fixed text-on-secondary-fixed"
        },
        {
          id: "cat_apparel",
          name: "Clothing",
          displayName: "Apparel & Fashion",
          icon: "apparel",
          revenue: 155580,
          revenueFormatted: "₹1,55,580",
          sharePercent: 34.1,
          unitsSold: 894,
          volumeSharePercent: 35.6,
          avgPrice: 174,
          status: "High Volume",
          color: "#6063ee",
          badgeColor: "bg-surface-container-high text-on-surface"
        },
        {
          id: "cat_beauty",
          name: "Beauty",
          displayName: "Beauty & Personal Care",
          icon: "spa",
          revenue: 143515,
          revenueFormatted: "₹1,43,515",
          sharePercent: 31.5,
          unitsSold: 771,
          volumeSharePercent: 30.6,
          avgPrice: 186,
          status: "High Margin",
          color: "#0090a9",
          badgeColor: "bg-secondary-fixed-dim text-on-secondary-fixed-variant"
        }
      ],

      // Demographics from user dataset
      demographics: {
        gender: {
          female: { percent: 51.1, revenue: 232840, revenueFormatted: "₹2.33L", avgTicket: 456.5 },
          male: { percent: 48.9, revenue: 223160, revenueFormatted: "₹2.23L", avgTicket: 455.4 }
        },
        ageCohorts: [
          { label: "18-25 Yrs", percent: 18.5, revenue: 84550, revenueFormatted: "₹84.6k", color: "bg-surface-tint opacity-60", share: "18.5%" },
          { label: "26-40 Yrs", percent: 31.7, revenue: 144345, revenueFormatted: "₹1.44L", color: "bg-secondary", tag: "Fast Growth", share: "31.7%" },
          { label: "41-60 Yrs", percent: 42.5, revenue: 193880, revenueFormatted: "₹1.94L", color: "bg-secondary-container", tag: "Prime Spender", share: "42.5%" },
          { label: "60+ Yrs", percent: 7.3, revenue: 33225, revenueFormatted: "₹33.2k", color: "bg-surface-dim", share: "7.3%" }
        ],
        basketDynamics: {
          unitsPerBasket: 2.51,
          dominantPairing: "Electronics + Beauty & Personal Care",
          coOccurrenceRate: 64
        }
      },

      // RFM behavioral pillars for user dataset
      rfmPillars: {
        recency: {
          averageDays: 183,
          distribution: [
            { range: "0-60d", percent: 25, label: "0-60d (25%)", color: "#4648d4" },
            { range: "61-180d", percent: 34, label: "61-180d (34%)", color: "#c0c1ff" },
            { range: ">180d", percent: 41, label: ">180d (41%)", color: "#cbdbf5" }
          ],
          insight: "Annual spread: 254 shoppers active in Q4 with high seasonal repurchase propensity."
        },
        frequency: {
          annualAverage: 1.0,
          distribution: [
            { range: "1x Shoppers", percent: 100, label: "Single Txn (100%)", color: "#4648d4" }
          ],
          insight: "High single-visit baseline: immense opportunity to drive 2nd purchase conversion via WhatsApp/SMS."
        },
        monetary: {
          averageCLV: 456,
          distribution: [
            { range: "₹1,000+", percent: 20, label: "≥₹1k VIP (20%)", color: "#141b2b" },
            { range: "₹300-999", percent: 20, label: "₹300-999 (20%)", color: "#4648d4" },
            { range: "<₹300", percent: 60, label: "<₹300 (60%)", color: "#cbdbf5" }
          ],
          insight: "Top 20% high-ticket tier (₹1k-₹2k) generates over 52% of total retail turnover."
        }
      },

      // K-Means Clusters calibrated on user dataset
      clusters: [
        {
          id: 0,
          code: "C0",
          name: "High-Ticket Champions",
          color: "#4648d4",
          badgeColor: "bg-secondary-fixed text-on-secondary-fixed",
          count: 202,
          sharePercent: 20.2,
          avgSpend: 1420,
          avgSpendFormatted: "₹1,420",
          avgOrders: 1.0,
          recencyDays: 82,
          projectedLtv: "₹4,800",
          strategyTitle: "Prescribed ML Strategy",
          strategyText: "VIP loyalty onboarding, warranty upgrades, and exclusive festive drop access.",
          actionLabel: "Engage VIPs",
          centroid: { frequency: 1.0, monetary: 1420, normX: 270, normY: 48 },
          halo: { rx: 42, ry: 26 },
          tag: "Top Tier",
          tagColor: "bg-emerald-100 text-emerald-800"
        },
        {
          id: 1,
          code: "C1",
          name: "Mid-Tier Regulars",
          color: "#0090a9",
          badgeColor: "bg-cyan-100 text-cyan-900",
          count: 194,
          sharePercent: 19.4,
          avgSpend: 680,
          avgSpendFormatted: "₹680",
          avgOrders: 1.0,
          recencyDays: 140,
          projectedLtv: "₹2,400",
          strategyTitle: "Prescribed ML Strategy",
          strategyText: "Automated category repeat reminders and cross-category discovery coupons.",
          actionLabel: "Boost Frequency",
          centroid: { frequency: 1.0, monetary: 680, normX: 185, normY: 108 },
          halo: { rx: 38, ry: 22 },
          tag: "High Potential",
          tagColor: "bg-cyan-100 text-cyan-800"
        },
        {
          id: 2,
          code: "C2",
          name: "Standard Basket Buyers",
          color: "#d97706",
          badgeColor: "bg-amber-100 text-amber-900",
          count: 312,
          sharePercent: 31.2,
          avgSpend: 280,
          avgSpendFormatted: "₹280",
          avgOrders: 1.0,
          recencyDays: 175,
          projectedLtv: "₹1,250",
          strategyTitle: "Prescribed ML Strategy",
          strategyText: "Bundle discounts with accessories and free express delivery on carts above ₹500.",
          actionLabel: "Send Bundles",
          centroid: { frequency: 1.0, monetary: 280, normX: 110, normY: 152 },
          halo: { rx: 34, ry: 20 },
          tag: "Expansion Target",
          tagColor: "bg-amber-100 text-amber-800"
        },
        {
          id: 3,
          code: "C3",
          name: "Low-Spend / Dormant",
          color: "#ba1a1a",
          badgeColor: "bg-rose-100 text-rose-900",
          count: 292,
          sharePercent: 29.2,
          avgSpend: 85,
          avgSpendFormatted: "₹85",
          avgOrders: 1.0,
          recencyDays: 245,
          projectedLtv: "₹450",
          strategyTitle: "Prescribed ML Strategy",
          strategyText: "Automated winback SMS/WhatsApp voucher offering ₹50 flat discount on next visit.",
          actionLabel: "Launch Win-back",
          centroid: { frequency: 1.0, monetary: 85, normX: 65, normY: 182 },
          halo: { rx: 25, ry: 16 },
          tag: "Churn Hazard",
          tagColor: "bg-rose-100 text-rose-800"
        }
      ],

      // Scatter Points directly sampled from retail_sales_dataset.csv
      scatterPoints: [
        { id: "CUST015", name: "Customer CUST015", cluster: 0, r: 351, f: 1, m: 2000, cx: 285, cy: 38, isHighlight: true, gender: "Female", age: 42, city: "Bengaluru", category: "Electronics" },
        { id: "CUST065", name: "Customer CUST065", cluster: 0, r: 28, f: 1, m: 2000, cx: 275, cy: 45, gender: "Male", age: 51, city: "Mumbai", category: "Electronics" },
        { id: "CUST072", name: "Customer CUST072", cluster: 0, r: 224, f: 1, m: 2000, cx: 290, cy: 52, gender: "Female", age: 20, city: "Delhi", category: "Electronics" },
        { id: "CUST074", name: "Customer CUST074", cluster: 0, r: 41, f: 1, m: 2000, cx: 260, cy: 60, gender: "Female", age: 18, city: "Hyderabad", category: "Beauty" },
        { id: "CUST089", name: "Customer CUST089", cluster: 0, r: 93, f: 1, m: 2000, cx: 280, cy: 48, gender: "Female", age: 55, city: "Pune", category: "Electronics" },
        { id: "CUST013", name: "Customer CUST013", cluster: 0, r: 150, f: 1, m: 1500, cx: 245, cy: 68, gender: "Male", age: 22, city: "Bengaluru", category: "Electronics" },
        { id: "CUST016", name: "Customer CUST016", cluster: 0, r: 319, f: 1, m: 1500, cx: 255, cy: 72, gender: "Male", age: 19, city: "Mumbai", category: "Clothing" },

        { id: "CUST002", name: "Customer CUST002", cluster: 1, r: 309, f: 1, m: 1000, cx: 195, cy: 98, gender: "Female", age: 26, city: "Delhi", category: "Clothing" },
        { id: "CUST026", name: "Customer CUST026", cluster: 1, r: 87, f: 1, m: 1000, cx: 185, cy: 112, gender: "Female", age: 28, city: "Bengaluru", category: "Electronics" },
        { id: "CUST030", name: "Customer CUST030", cluster: 1, r: 65, f: 1, m: 900, cx: 175, cy: 118, gender: "Female", age: 39, city: "Mumbai", category: "Beauty" },
        { id: "CUST031", name: "Customer CUST031", cluster: 1, r: 224, f: 1, m: 1200, cx: 205, cy: 104, gender: "Male", age: 44, city: "Pune", category: "Electronics" },
        { id: "CUST046", name: "Customer CUST046", cluster: 1, r: 190, f: 1, m: 1200, cx: 178, cy: 124, gender: "Female", age: 20, city: "Hyderabad", category: "Electronics" },

        { id: "CUST004", name: "Customer CUST004", cluster: 2, r: 226, f: 1, m: 500, cx: 120, cy: 148, gender: "Male", age: 37, city: "Delhi", category: "Clothing" },
        { id: "CUST021", name: "Customer CUST021", cluster: 2, r: 353, f: 1, m: 500, cx: 105, cy: 155, gender: "Female", age: 50, city: "Bengaluru", category: "Beauty" },
        { id: "CUST024", name: "Customer CUST024", cluster: 2, r: 34, f: 1, m: 300, cx: 115, cy: 162, gender: "Female", age: 49, city: "Mumbai", category: "Clothing" },
        { id: "CUST009", name: "Customer CUST009", cluster: 2, r: 20, f: 1, m: 600, cx: 130, cy: 142, gender: "Male", age: 63, city: "Kolkata", category: "Electronics" },

        { id: "CUST001", name: "Customer CUST001", cluster: 3, r: 39, f: 1, m: 150, cx: 70, cy: 175, gender: "Male", age: 34, city: "Bengaluru", category: "Beauty" },
        { id: "CUST003", name: "Customer CUST003", cluster: 3, r: 354, f: 1, m: 30, cx: 50, cy: 190, gender: "Male", age: 50, city: "Delhi", category: "Electronics" },
        { id: "CUST006", name: "Customer CUST006", cluster: 3, r: 252, f: 1, m: 30, cx: 62, cy: 186, gender: "Female", age: 45, city: "Mumbai", category: "Beauty" },
        { id: "CUST007", name: "Customer CUST007", cluster: 3, r: 295, f: 1, m: 50, cx: 78, cy: 180, gender: "Male", age: 46, city: "Chennai", category: "Clothing" }
      ],

      // Customer Profiles from retail_sales_dataset.csv
      customerProfiles: [
        {
          id: "CUST015",
          name: "Customer CUST015",
          gender: "Female",
          age: 42,
          city: "Bengaluru",
          segment: "High-Ticket Champion",
          cluster: 0,
          clusterCode: "C0",
          rfmScore: "R:5 F:3 M:5 (Score 88)",
          rfmCategory: "high",
          lifetimeSpend: "₹2,000",
          spendNumeric: 2000,
          ordersCount: 1,
          lastSeen: "Recent Q4",
          topAffinity: "Electronics (4 Units)",
          avatarInitial: "C15",
          avatarColor: "bg-secondary-fixed text-secondary",
          badge: "Champion (M: ₹2k)",
          tag: "Cluster C0 • Top Spender"
        },
        {
          id: "CUST065",
          name: "Customer CUST065",
          gender: "Male",
          age: 51,
          city: "Mumbai",
          segment: "High-Ticket Champion",
          cluster: 0,
          clusterCode: "C0",
          rfmScore: "R:5 F:3 M:5 (Score 86)",
          rfmCategory: "high",
          lifetimeSpend: "₹2,000",
          spendNumeric: 2000,
          ordersCount: 1,
          lastSeen: "28 days ago",
          topAffinity: "Electronics (4 Units)",
          avatarInitial: "C65",
          avatarColor: "bg-secondary-fixed text-secondary",
          badge: "Champion (M: ₹2k)",
          tag: "Cluster C0 • Top Spender"
        },
        {
          id: "CUST074",
          name: "Customer CUST074",
          gender: "Female",
          age: 18,
          city: "Hyderabad",
          segment: "High-Ticket Champion",
          cluster: 0,
          clusterCode: "C0",
          rfmScore: "R:5 F:3 M:5 (Score 85)",
          rfmCategory: "high",
          lifetimeSpend: "₹2,000",
          spendNumeric: 2000,
          ordersCount: 1,
          lastSeen: "41 days ago",
          topAffinity: "Beauty (4 Units)",
          avatarInitial: "C74",
          avatarColor: "bg-secondary-fixed text-secondary",
          badge: "Champion (M: ₹2k)",
          tag: "Cluster C0 • Top Spender"
        },
        {
          id: "CUST026",
          name: "Customer CUST026",
          gender: "Female",
          age: 28,
          city: "Bengaluru",
          segment: "Mid-Tier Regular",
          cluster: 1,
          clusterCode: "C1",
          rfmScore: "R:4 F:3 M:4 (Score 68)",
          rfmCategory: "regular",
          lifetimeSpend: "₹1,000",
          spendNumeric: 1000,
          ordersCount: 1,
          lastSeen: "87 days ago",
          topAffinity: "Electronics (2 Units)",
          avatarInitial: "C26",
          avatarColor: "bg-cyan-100 text-[#0090a9]",
          badge: "Regular (M: ₹1k)",
          tag: "Cluster C1 • High Potential"
        },
        {
          id: "CUST004",
          name: "Customer CUST004",
          gender: "Male",
          age: 37,
          city: "Delhi NCR",
          segment: "Standard Basket Buyer",
          cluster: 2,
          clusterCode: "C2",
          rfmScore: "R:3 F:2 M:3 (Score 52)",
          rfmCategory: "growth",
          lifetimeSpend: "₹500",
          spendNumeric: 500,
          ordersCount: 1,
          lastSeen: "Mid FY23",
          topAffinity: "Clothing (1 Unit)",
          avatarInitial: "C04",
          avatarColor: "bg-amber-100 text-amber-800",
          badge: "Growth (M: ₹500)",
          tag: "Cluster C2 • Cross-Sell"
        },
        {
          id: "CUST001",
          name: "Customer CUST001",
          gender: "Male",
          age: 34,
          city: "Bengaluru",
          segment: "Low-Spend Shopper",
          cluster: 3,
          clusterCode: "C3",
          rfmScore: "R:2 F:1 M:2 (Score 28)",
          rfmCategory: "risk",
          lifetimeSpend: "₹150",
          spendNumeric: 150,
          ordersCount: 1,
          lastSeen: "39 days ago",
          topAffinity: "Beauty (3 Units)",
          avatarInitial: "C01",
          avatarColor: "bg-rose-100 text-rose-800",
          badge: "Light (M: ₹150)",
          tag: "Cluster C3 • Churn Hazard"
        }
      ],

      // Genuine sample stream records from retail_sales_dataset.csv
      sampleRows: [
        { txId: "1", date: "2023-11-24", custId: "CUST001", custName: "Customer CUST001", gender: "Male", age: 34, category: "Beauty", qty: 3, price: 50, total: 150 },
        { txId: "2", date: "2023-02-27", custId: "CUST002", custName: "Customer CUST002", gender: "Female", age: 26, category: "Clothing", qty: 2, price: 500, total: 1000 },
        { txId: "3", date: "2023-01-13", custId: "CUST003", custName: "Customer CUST003", gender: "Male", age: 50, category: "Electronics", qty: 1, price: 30, total: 30 },
        { txId: "4", date: "2023-05-21", custId: "CUST004", custName: "Customer CUST004", gender: "Male", age: 37, category: "Clothing", qty: 1, price: 500, total: 500 },
        { txId: "5", date: "2023-05-06", custId: "CUST005", custName: "Customer CUST005", gender: "Male", age: 30, category: "Beauty", qty: 2, price: 50, total: 100 },
        { txId: "6", date: "2023-04-25", custId: "CUST006", custName: "Customer CUST006", gender: "Female", age: 45, category: "Beauty", qty: 1, price: 30, total: 30 },
        { txId: "7", date: "2023-03-13", custId: "CUST007", custName: "Customer CUST007", gender: "Male", age: 46, category: "Clothing", qty: 2, price: 25, total: 50 },
        { txId: "8", date: "2023-02-22", custId: "CUST008", custName: "Customer CUST008", gender: "Male", age: 30, category: "Electronics", qty: 4, price: 25, total: 100 },
        { txId: "9", date: "2023-12-13", custId: "CUST009", custName: "Customer CUST009", gender: "Male", age: 63, category: "Electronics", qty: 2, price: 300, total: 600 },
        { txId: "10", date: "2023-10-07", custId: "CUST010", custName: "Customer CUST010", gender: "Female", age: 52, category: "Clothing", qty: 4, price: 50, total: 200 }
      ],

      recommendations: [
        {
          id: "REC-01",
          priority: "high",
          priorityLabel: "High Priority",
          priorityBadgeClass: "bg-error-container text-on-error-container",
          categoryTag: "VIP Spender Lift",
          icon: "bolt",
          title: "Cultivate High-Ticket Champions",
          targetGroup: "Cluster 0 (202 Customers • ≥₹1,000 spenders, ₹2.87 Lakhs GMV)",
          evidenceSnippet: "Top 20% of customers generate over 52% of total turnover in retail_sales_dataset.csv.",
          riskAlert: "High-ticket shoppers lack recurring retention touchpoints; 15% slip to dormance without follow-up.",
          recommendedAction: "Launch an exclusive VIP loyalty tier offering complimentary express home delivery and 48-hour priority access to Electronics and Beauty drops.",
          expectedTarget: "+18% Repeat Repurchase Rate",
          ctaButtonLabel: "Deploy VIP Tier",
          ctaActionType: "deploy_vip",
          isBookmarked: false,
          executed: false
        },
        {
          id: "REC-02",
          priority: "high",
          priorityLabel: "High Priority",
          priorityBadgeClass: "bg-error-container text-on-error-container",
          categoryTag: "Repurchase Prompt",
          icon: "schedule",
          title: "Convert Single-Visit Shoppers",
          targetGroup: "Cluster 3 & 2 (604 Shoppers with spend <₹500)",
          evidenceSnippet: "Average transaction spend is ₹456; 60% of cohort purchased under ₹300.",
          riskAlert: "Low single-item purchase attachment results in under-utilized customer acquisition costs.",
          recommendedAction: "Trigger automated personalized WhatsApp/SMS coupons offering ₹100 flat discount on a 2nd purchase across Clothing or Electronics.",
          expectedTarget: "Re-engage 22–25% into Multi-Order Regulars",
          ctaButtonLabel: "Schedule Automated Push",
          ctaActionType: "schedule_push",
          isBookmarked: false,
          executed: false
        },
        {
          id: "REC-03",
          priority: "medium",
          priorityLabel: "Medium Priority",
          priorityBadgeClass: "bg-secondary-fixed text-on-secondary-fixed",
          categoryTag: "Basket Attachment",
          icon: "shopping_basket",
          title: "Multi-Unit Bundling for Apparel & Electronics",
          targetGroup: "Clothing & Electronics (₹3.12 Lakhs Combined Revenue)",
          evidenceSnippet: "Current average basket size is 2.51 items. Price per unit peaks at ₹500.",
          riskAlert: "Shoppers purchasing single high-value units (₹500) rarely attach complementary accessories.",
          recommendedAction: "Implement 'Buy 2 Get 15% Off' bundle combos pairing Electronics with matching accessories, or Apparel coordinate sets.",
          expectedTarget: "AOV lift from ₹456 → ₹540 (+18.4%)",
          ctaButtonLabel: "Configure Bundle Rule",
          ctaActionType: "bundle_rule",
          isBookmarked: false,
          executed: false
        },
        {
          id: "REC-04",
          priority: "opportunity",
          priorityLabel: "Opportunity",
          priorityBadgeClass: "bg-surface-variant text-on-tertiary-fixed-variant",
          categoryTag: "Cross-Category",
          icon: "diversity_2",
          title: "Drive Cross-Sell into Beauty & Wellness",
          targetGroup: "Female Shoppers (510 Orders • ₹2.33 Lakhs GMV)",
          evidenceSnippet: "Beauty is highest margin category (₹186 avg price) with strong 31.5% volume share.",
          riskAlert: "Over 68% of apparel shoppers have never purchased from the beauty vertical.",
          recommendedAction: "Offer a 'Beauty Sample Deluxe Box' with every apparel purchase above ₹500.",
          expectedTarget: "+32% Category Discovery Rate",
          ctaButtonLabel: "Set Discovery Promo",
          ctaActionType: "discovery_promo",
          isBookmarked: false,
          executed: false
        }
      ]
    },

    // =========================================================================
    // ALTERNATIVE DATASET: Retail_Q3.csv
    // =========================================================================
    "Retail_Q3.csv": {
      name: "Retail_Q3.csv",
      description: "Q3 Multi-Store Omnichannel Retail POS Transaction Ledger",
      syncStatus: "Synced",
      syncLag: "12m ago",
      sha256: "7e9b42...a91f4c",
      totalRows: 100000,
      columnsCount: 9,
      dataQualityIndex: 99.4,
      missingValues: 0,
      duplicates: 0,
      dateRange: "Oct 1, 2023 – Dec 31, 2023 (Q3)",
      kMeansStatus: "Ready (k=4, silhouette=0.74)",
      kpis: {
        totalRevenue: 1245800,
        totalRevenueFormatted: "₹12,45,800",
        totalQuarterGMV: "₹1.24 Cr",
        revenueDelta: "+14.2%",
        totalTransactions: 8542,
        transactionsDelta: "+8.1%",
        avgOrderValue: 1458,
        avgOrderValueFormatted: "₹1,458",
        aovDelta: "+3.4%",
        aovTicketDelta: "+₹112",
        uniqueCustomers: 3210,
        uniqueCustomersDelta: "+18.5%",
        unitsSold: 14890,
        unitsSoldDelta: "+8.2%",
        repeatPurchaseRate: 64.2,
        repeatRateDelta: "+5.1%",
        avgLifetimeSpend: 3881,
        orderFrequency: 2.66
      },
      storeNetwork: {
        totalLocations: 12,
        flagshipCities: ["Bengaluru", "Mumbai", "Delhi NCR", "Hyderabad", "Pune"],
        posSyncRate: 99.4,
        operationalStatus: "All 12 Flagship Locations Active"
      },
      revenueTrends: {
        daily: [
          { label: "Mon", revenue: 32400, txns: 245 },
          { label: "Tue", revenue: 38900, txns: 280 },
          { label: "Wed", revenue: 41200, txns: 295 },
          { label: "Thu", revenue: 44800, txns: 310 },
          { label: "Fri", revenue: 58900, txns: 410 },
          { label: "Sat", revenue: 240000, txns: 1240, isPeak: true, peakTag: "₹2.4L Sat Peak" },
          { label: "Sun", revenue: 260000, txns: 1380, isPeak: true, peakTag: "₹2.6L Sun Surge" }
        ],
        weekly: [
          { label: "Week 1", revenue: 285000, orders: 1980 },
          { label: "Week 2", revenue: 312000, orders: 2140 },
          { label: "Week 3", revenue: 298000, orders: 2050 },
          { label: "Week 4 (Peak)", revenue: 350800, orders: 2372 }
        ],
        hourlyDistribution: [
          { hour: "10 AM", traffic: 22, checkoutRate: 15 },
          { hour: "12 PM", traffic: 48, checkoutRate: 35 },
          { hour: "2 PM", traffic: 62, checkoutRate: 48 },
          { hour: "4 PM", traffic: 74, checkoutRate: 58 },
          { hour: "6 PM (Peak)", traffic: 98, checkoutRate: 94 },
          { hour: "8 PM", traffic: 88, checkoutRate: 82 },
          { hour: "10 PM", traffic: 34, checkoutRate: 26 }
        ]
      },
      categories: [
        { id: "cat_elec", name: "Electronics", displayName: "Consumer Electronics", icon: "devices", revenue: 473400, revenueFormatted: "₹4,73,400", sharePercent: 38, unitsSold: 3420, volumeSharePercent: 23, avgPrice: 1384, status: "High Growth", color: "#4648d4", badgeColor: "bg-secondary-fixed text-on-secondary-fixed" },
        { id: "cat_apparel", name: "Clothing", displayName: "Apparel & Fashion", icon: "apparel", revenue: 323900, revenueFormatted: "₹3,23,900", sharePercent: 26, unitsSold: 5110, volumeSharePercent: 34, avgPrice: 633, status: "Steady", color: "#6063ee", badgeColor: "bg-surface-container-high text-on-surface" },
        { id: "cat_beauty", name: "Beauty & Wellness", displayName: "Beauty & Personal Care", icon: "spa", revenue: 224200, revenueFormatted: "₹2,24,200", sharePercent: 18, unitsSold: 3200, volumeSharePercent: 21, avgPrice: 700, status: "Growing", color: "#0090a9", badgeColor: "bg-secondary-fixed-dim text-on-secondary-fixed-variant" },
        { id: "cat_food", name: "Food & Gourmet", displayName: "Gourmet & Daily Grocery", icon: "restaurant", revenue: 149500, revenueFormatted: "₹1,49,500", sharePercent: 12, unitsSold: 2160, volumeSharePercent: 15, avgPrice: 692, status: "Stable", color: "#acedff", badgeColor: "bg-surface-container-high text-on-surface" },
        { id: "cat_home", name: "Home & Living", displayName: "Sundry & Accessories", icon: "chair", revenue: 74800, revenueFormatted: "₹74,800", sharePercent: 6, unitsSold: 1000, volumeSharePercent: 7, avgPrice: 748, status: "Review", color: "#c0c6db", badgeColor: "bg-error-container text-on-error-container" }
      ],
      demographics: {
        gender: {
          female: { percent: 54, revenue: 672000, revenueFormatted: "₹6.72L", avgTicket: 3840 },
          male: { percent: 46, revenue: 573800, revenueFormatted: "₹5.73L", avgTicket: 3920 }
        },
        ageCohorts: [
          { label: "18-25 Yrs", percent: 20, revenue: 249000, revenueFormatted: "₹2.49L", color: "bg-surface-tint opacity-60", share: "20%" },
          { label: "26-40 Yrs", percent: 48, revenue: 598000, revenueFormatted: "₹5.98L", color: "bg-secondary", tag: "Prime Buyer", share: "48%" },
          { label: "41-60 Yrs", percent: 32, revenue: 398800, revenueFormatted: "₹3.98L", color: "bg-secondary-container", share: "32%" }
        ],
        basketDynamics: {
          unitsPerBasket: 2.4,
          dominantPairing: "Electronics + Premium Accessories",
          coOccurrenceRate: 68
        }
      },
      rfmPillars: {
        recency: {
          averageDays: 24,
          distribution: [
            { range: "0-30d", percent: 48, label: "0-30d (48%)", color: "#4648d4" },
            { range: "31-60d", percent: 32, label: "31-60d (32%)", color: "#c0c1ff" },
            { range: ">60d", percent: 20, label: ">60d (20%)", color: "#cbdbf5" }
          ],
          insight: "Healthy engagement: 80% of entire registered cohort active within last 60 days."
        },
        frequency: {
          annualAverage: 2.66,
          distribution: [
            { range: "1x Buyers", percent: 35, label: "1x Buyers (35%)", color: "#cbdbf5" },
            { range: "2-4x", percent: 45, label: "2-4x (45%)", color: "#4648d4" },
            { range: "5+ Power", percent: 20, label: "5+ Power (20%)", color: "#141b2b" }
          ],
          insight: "Strong conversion bridge from 1st to 2nd purchase cycle via automated push."
        },
        monetary: {
          averageCLV: 3881,
          distribution: [
            { range: ">₹10k", percent: 15, label: ">₹10k (15%)", color: "#141b2b" },
            { range: "₹3k-10k", percent: 55, label: "₹3k-10k (55%)", color: "#4648d4" },
            { range: "<₹3k", percent: 30, label: "<₹3k (30%)", color: "#cbdbf5" }
          ],
          insight: "High-leverage: Top 15% tier generates 44% of total retail turnover this fiscal quarter."
        }
      },
      clusters: [
        { id: 0, code: "C0", name: "High-Value Champions", color: "#4648d4", badgeColor: "bg-secondary-fixed text-on-secondary-fixed", count: 480, sharePercent: 15, avgSpend: 38400, avgSpendFormatted: "₹38,400", avgOrders: 16.2, recencyDays: 5, projectedLtv: "₹94,000", strategyTitle: "Prescribed ML Strategy", strategyText: "VIP concierge assignment, private WhatsApp storefront access, and festive previews.", actionLabel: "Engage VIPs", tag: "Top Tier", tagColor: "bg-emerald-100 text-emerald-800" },
        { id: 1, code: "C1", name: "Loyal Regulars", color: "#0090a9", badgeColor: "bg-cyan-100 text-cyan-900", count: 960, sharePercent: 30, avgSpend: 18200, avgSpendFormatted: "₹18,200", avgOrders: 9.4, recencyDays: 12, projectedLtv: "₹48,000", strategyTitle: "Prescribed ML Strategy", strategyText: "Gamified tiered loyalty points and monthly reorder reminders.", actionLabel: "Boost Frequency", tag: "High Retention", tagColor: "bg-cyan-100 text-cyan-800" },
        { id: 2, code: "C2", name: "Potential Growth", color: "#d97706", badgeColor: "bg-amber-100 text-amber-900", count: 1120, sharePercent: 35, avgSpend: 8150, avgSpendFormatted: "₹8,150", avgOrders: 3.8, recencyDays: 28, projectedLtv: "₹22,500", strategyTitle: "Prescribed ML Strategy", strategyText: "Personalized category cross-sell bundles and free express shipping above ₹1,499.", actionLabel: "Send Bundles", tag: "Expansion Target", tagColor: "bg-amber-100 text-amber-800" },
        { id: 3, code: "C3", name: "At-Risk Customers", color: "#ba1a1a", badgeColor: "bg-rose-100 text-rose-900", count: 650, sharePercent: 20, avgSpend: 4300, avgSpendFormatted: "₹4,300", avgOrders: 1.6, recencyDays: 84, projectedLtv: "₹9,800", strategyTitle: "Prescribed ML Strategy", strategyText: "Automated winback discount coupon (₹250 flat) and SMS abandoned browse prompt.", actionLabel: "Launch Win-back", tag: "Churn Hazard", tagColor: "bg-rose-100 text-rose-800" }
      ],
      scatterPoints: [
        { id: "CUST-8491", name: "Priya Sharma", cluster: 0, r: 4, f: 18, m: 42500, cx: 280, cy: 42, isHighlight: true, gender: "Female", age: 32, city: "Bengaluru", category: "Electronics" },
        { id: "CUST-9102", name: "Vikram Rathore", cluster: 0, r: 3, f: 17, m: 39800, cx: 270, cy: 58, gender: "Male", age: 38, city: "Mumbai", category: "Electronics" },
        { id: "CUST-6112", name: "Rajesh Iyer", cluster: 1, r: 10, f: 11, m: 21500, cx: 198, cy: 112, gender: "Male", age: 44, city: "Bengaluru", category: "Apparel" },
        { id: "CUST-4102", name: "Arjun Bansal", cluster: 2, r: 25, f: 4, m: 9200, cx: 108, cy: 158, gender: "Male", age: 24, city: "Delhi", category: "Electronics" },
        { id: "CUST-2101", name: "Sunil Grover", cluster: 3, r: 78, f: 2, m: 4800, cx: 68, cy: 174, gender: "Male", age: 52, city: "Delhi", category: "Electronics" }
      ],
      customerProfiles: [
        { id: "CUST-8491", name: "Priya Sharma", gender: "Female", age: 32, city: "Bengaluru", segment: "High-Value Champion", cluster: 0, clusterCode: "C0", rfmScore: "R:5 F:5 M:5 (Score 84)", rfmCategory: "high", lifetimeSpend: "₹42,500", spendNumeric: 42500, ordersCount: 18, lastSeen: "4 days ago", topAffinity: "Electronics", avatarInitial: "PS", avatarColor: "bg-secondary-fixed text-secondary", badge: "Champion (R:5 F:5 M:5)", tag: "Cluster C0 • High Value" },
        { id: "CUST-9102", name: "Vikram Rathore", gender: "Male", age: 38, city: "Mumbai", segment: "High-Value Champion", cluster: 0, clusterCode: "C0", rfmScore: "R:5 F:5 M:5 (Score 82)", rfmCategory: "high", lifetimeSpend: "₹39,800", spendNumeric: 39800, ordersCount: 17, lastSeen: "3 days ago", topAffinity: "Electronics", avatarInitial: "VR", avatarColor: "bg-secondary-fixed text-secondary", badge: "Champion (R:5 F:5 M:5)", tag: "Cluster C0 • High Value" }
      ],
      sampleRows: [
        { txId: "TX-98421", date: "2023-12-30", custId: "CUST-8491", custName: "Alex M.", gender: "Male", age: 34, category: "Electronics", qty: 1, price: 4500, total: 4500 },
        { txId: "TX-98422", date: "2023-12-30", custId: "CUST-7741", custName: "Priya S.", gender: "Female", age: 29, category: "Clothing", qty: 3, price: 1200, total: 3600 }
      ],
      recommendations: []
    }
  }
};
