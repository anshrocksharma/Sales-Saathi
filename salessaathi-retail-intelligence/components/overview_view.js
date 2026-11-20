// SalesSaathi - Overview Dashboard View Component
(function(window) {
  const OverviewView = {
    render: function(state) {
      const dataset = state.currentDataset;
      const kpis = dataset.filteredKpis || dataset.kpis;
      const categories = dataset.filteredCategories || dataset.categories;

      return `
        <div class="flex flex-col w-full gap-space-lg pb-6 animate-fade-in">
          <!-- Welcome & Context Header -->
          <div class="flex flex-col gap-space-xs">
            <div class="flex items-center justify-between gap-space-sm flex-wrap">
              <div class="flex items-center gap-2.5 flex-wrap">
                <span class="font-headline-lg-mobile md:text-headline-lg text-headline-lg-mobile text-on-surface font-bold">
                  Welcome back, ${state.userProfile ? state.userProfile.name : 'Executive'} 👋
                </span>
                <button onclick="window.App.openUserProfileModal()" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-secondary bg-secondary/10 hover:bg-secondary/20 transition-colors cursor-pointer shadow-2xs" title="Click to edit user name, title, and profile">
                  <span class="material-symbols-outlined text-[15px]">badge</span>
                  <span>Edit Profile</span>
                </button>
              </div>
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm shadow-sm shrink-0">
                <span class="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                ${dataset.name} Active
              </span>
            </div>
            <p class="font-body-md text-body-md text-on-surface-variant">
              Here's an overview of your retail business performance and intelligence models.
            </p>
          </div>

          <!-- Interactive Date Range Filter Pills -->
          <div class="flex items-center gap-1.5 p-1 bg-surface-container-low rounded-xl shadow-sm overflow-x-auto" id="overviewDateFilter">
            <button class="filter-pill px-3 py-1.5 rounded-lg font-label-md text-label-md transition-all whitespace-nowrap ${state.dateFilter === 'Today' ? 'bg-surface-container-lowest text-on-surface shadow-sm font-semibold' : 'text-on-surface-variant hover:text-on-surface'}" data-range="Today">
              Today
            </button>
            <button class="filter-pill px-3 py-1.5 rounded-lg font-label-md text-label-md transition-all whitespace-nowrap ${state.dateFilter === '7D' ? 'bg-surface-container-lowest text-on-surface shadow-sm font-semibold' : 'text-on-surface-variant hover:text-on-surface'}" data-range="7D">
              Last 7 Days
            </button>
            <button class="filter-pill px-3 py-1.5 rounded-lg font-label-md text-label-md transition-all whitespace-nowrap ${state.dateFilter === '30D' ? 'bg-surface-container-lowest text-on-surface shadow-sm font-semibold' : 'text-on-surface-variant hover:text-on-surface'}" data-range="30D">
              Last 30 Days
            </button>
            <button class="filter-pill px-3 py-1.5 rounded-lg font-label-md text-label-md transition-all whitespace-nowrap ${state.dateFilter === '90D' ? 'bg-surface-container-lowest text-on-surface shadow-sm font-semibold' : 'text-on-surface-variant hover:text-on-surface'}" data-range="90D">
              Last 90 Days
            </button>
          </div>

          <!-- KPI Metric Cards: Responsive 2x2 to 4x1 Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-space-sm">
            <!-- Total Revenue -->
            <div class="executive-card p-space-md rounded-2xl flex flex-col justify-between gap-2.5 transition-all">
              <div class="flex items-center justify-between">
                <span class="font-label-md text-label-md text-on-surface-variant">Total Revenue</span>
                <span class="material-symbols-outlined text-secondary text-[20px]">currency_rupee</span>
              </div>
              <div class="flex flex-col">
                <span class="font-metric-num text-metric-num text-on-surface font-bold tracking-tight">
                  ${kpis.totalRevenueFormatted}
                </span>
                <div class="flex items-center gap-1 mt-0.5">
                  <span class="material-symbols-outlined text-[15px] text-[#16A34A]">trending_up</span>
                  <span class="font-label-sm text-label-sm text-[#16A34A] font-semibold">${kpis.revenueDelta}</span>
                  <span class="font-label-sm text-label-sm text-on-surface-variant">vs prev</span>
                </div>
              </div>
              <div class="w-full h-8 pt-1">
                <svg class="w-full h-full overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 100 28">
                  <path d="M0 24 Q 15 18, 30 20 T 60 10 T 80 14 T 100 4" fill="none" stroke="#4648d4" stroke-linecap="round" stroke-width="2"></path>
                  <path d="M0 24 Q 15 18, 30 20 T 60 10 T 80 14 T 100 4 L 100 28 L 0 28 Z" fill="#4648d4" opacity="0.12"></path>
                </svg>
              </div>
            </div>

            <!-- Total Transactions -->
            <div class="executive-card p-space-md rounded-2xl flex flex-col justify-between gap-2.5 transition-all">
              <div class="flex items-center justify-between">
                <span class="font-label-md text-label-md text-on-surface-variant">Transactions</span>
                <span class="material-symbols-outlined text-secondary text-[20px]">receipt_long</span>
              </div>
              <div class="flex flex-col">
                <span class="font-metric-num text-metric-num text-on-surface font-bold tracking-tight">
                  ${window.AnalyticsEngine.formatNumber(kpis.totalTransactions)}
                </span>
                <div class="flex items-center gap-1 mt-0.5">
                  <span class="material-symbols-outlined text-[15px] text-[#16A34A]">trending_up</span>
                  <span class="font-label-sm text-label-sm text-[#16A34A] font-semibold">${kpis.transactionsDelta}</span>
                  <span class="font-label-sm text-label-sm text-on-surface-variant">vs prev</span>
                </div>
              </div>
              <div class="w-full h-8 pt-1">
                <svg class="w-full h-full overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 100 28">
                  <path d="M0 22 Q 20 24, 40 16 T 70 12 T 100 6" fill="none" stroke="#4648d4" stroke-linecap="round" stroke-width="2"></path>
                  <path d="M0 22 Q 20 24, 40 16 T 70 12 T 100 6 L 100 28 L 0 28 Z" fill="#4648d4" opacity="0.12"></path>
                </svg>
              </div>
            </div>

            <!-- Average Order Value -->
            <div class="executive-card p-space-md rounded-2xl flex flex-col justify-between gap-2.5 transition-all">
              <div class="flex items-center justify-between">
                <span class="font-label-md text-label-md text-on-surface-variant">Avg Order Value</span>
                <span class="material-symbols-outlined text-secondary text-[20px]">shopping_bag</span>
              </div>
              <div class="flex flex-col">
                <span class="font-metric-num text-metric-num text-on-surface font-bold tracking-tight">
                  ${kpis.avgOrderValueFormatted}
                </span>
                <div class="flex items-center gap-1 mt-0.5">
                  <span class="material-symbols-outlined text-[15px] text-[#16A34A]">trending_up</span>
                  <span class="font-label-sm text-label-sm text-[#16A34A] font-semibold">${kpis.aovDelta}</span>
                  <span class="font-label-sm text-label-sm text-on-surface-variant">vs prev</span>
                </div>
              </div>
              <div class="w-full h-8 pt-1">
                <svg class="w-full h-full overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 100 28">
                  <path d="M0 18 Q 25 10, 50 18 T 80 12 T 100 8" fill="none" stroke="#4648d4" stroke-linecap="round" stroke-width="2"></path>
                  <path d="M0 18 Q 25 10, 50 18 T 80 12 T 100 8 L 100 28 L 0 28 Z" fill="#4648d4" opacity="0.12"></path>
                </svg>
              </div>
            </div>

            <!-- Unique Customers -->
            <div class="executive-card p-space-md rounded-2xl flex flex-col justify-between gap-2.5 transition-all">
              <div class="flex items-center justify-between">
                <span class="font-label-md text-label-md text-on-surface-variant">Unique Customers</span>
                <span class="material-symbols-outlined text-secondary text-[20px]">group</span>
              </div>
              <div class="flex flex-col">
                <span class="font-metric-num text-metric-num text-on-surface font-bold tracking-tight">
                  ${window.AnalyticsEngine.formatNumber(kpis.uniqueCustomers)}
                </span>
                <div class="flex items-center gap-1 mt-0.5">
                  <span class="material-symbols-outlined text-[15px] text-[#16A34A]">trending_up</span>
                  <span class="font-label-sm text-label-sm text-[#16A34A] font-semibold">${kpis.uniqueCustomersDelta}</span>
                  <span class="font-label-sm text-label-sm text-on-surface-variant">vs prev</span>
                </div>
              </div>
              <div class="w-full h-8 pt-1">
                <svg class="w-full h-full overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 100 28">
                  <path d="M0 24 Q 20 20, 45 14 T 75 8 T 100 2" fill="none" stroke="#4648d4" stroke-linecap="round" stroke-width="2"></path>
                  <path d="M0 24 Q 20 20, 45 14 T 75 8 T 100 2 L 100 28 L 0 28 Z" fill="#4648d4" opacity="0.12"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Store Network Operational Status Banner -->
          <div class="relative w-full rounded-2xl overflow-hidden bg-primary-container shadow-sm text-white">
            <div class="w-full p-space-md md:p-6 bg-gradient-to-r from-primary-container via-[#1f293d] to-secondary/30 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div class="flex items-center gap-3.5">
                <div class="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-secondary-fixed shrink-0">
                  <span class="material-symbols-outlined text-[24px]">storefront</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider font-semibold">Store Network Health</span>
                  <span class="font-title-md md:text-headline-sm text-title-md font-semibold text-white">
                    ${dataset.storeNetwork.operationalStatus}
                  </span>
                  <span class="font-body-sm text-body-sm text-white/70">
                    Cities: ${dataset.storeNetwork.flagshipCities.join(" • ")}
                  </span>
                </div>
              </div>
              <div class="flex items-center gap-2 self-start md:self-auto">
                <span class="px-3 py-1.5 rounded-full bg-secondary text-white font-label-sm text-label-sm font-semibold flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  ${dataset.storeNetwork.posSyncRate}% POS Sync
                </span>
                <button class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-label-sm text-label-sm transition-colors" onclick="window.App.switchView('analytics')">
                  View Analytics →
                </button>
              </div>
            </div>
          </div>

          <!-- Executive AI Insights Section -->
          <div class="flex flex-col gap-space-sm">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1.5">
                <span class="material-symbols-outlined text-secondary text-[22px]">psychology</span>
                <span class="font-title-md text-title-md text-on-surface font-semibold">Executive AI Insights</span>
              </div>
              <span class="font-label-sm text-label-sm text-on-surface-variant">Real-time alerts</span>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              <!-- Insight 1: Highest Revenue Category -->
              <div class="executive-card p-space-md rounded-2xl flex items-start gap-3">
                <div class="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0">
                  <span class="material-symbols-outlined text-[22px]">devices</span>
                </div>
                <div class="flex flex-col min-w-0 flex-1">
                  <div class="flex items-center justify-between">
                    <span class="font-title-md text-title-md text-on-surface font-semibold truncate">Highest Revenue Category</span>
                    <span class="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-medium">38% Share</span>
                  </div>
                  <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    <strong class="text-on-surface">Electronics</strong> led sales generating <strong class="text-on-surface">₹4,73,400</strong>, propelled by festive consumer electronics uptake.
                  </p>
                </div>
              </div>

              <!-- Insight 2: Most Active Group -->
              <div class="executive-card p-space-md rounded-2xl flex items-start gap-3">
                <div class="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary shrink-0">
                  <span class="material-symbols-outlined text-[22px]">loyalty</span>
                </div>
                <div class="flex flex-col min-w-0 flex-1">
                  <div class="flex items-center justify-between">
                    <span class="font-title-md text-title-md text-on-surface font-semibold truncate">Most Active Group</span>
                    <span class="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container text-[#16A34A] font-semibold">+42% Freq</span>
                  </div>
                  <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    <strong class="text-on-surface">Champions & Loyalists</strong> generated repeated visits with high basket values across 12 flagship stores.
                  </p>
                </div>
              </div>

              <!-- Insight 3: Weekend Promotion Surge -->
              <div class="executive-card p-space-md rounded-2xl flex items-start gap-3">
                <div class="w-10 h-10 rounded-xl bg-secondary-fixed-dim/40 flex items-center justify-center text-secondary shrink-0">
                  <span class="material-symbols-outlined text-[22px]">event_repeat</span>
                </div>
                <div class="flex flex-col min-w-0 flex-1">
                  <div class="flex items-center justify-between">
                    <span class="font-title-md text-title-md text-on-surface font-semibold truncate">Weekend Promotion Surge</span>
                    <span class="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container text-[#16A34A] font-semibold">+5.8%</span>
                  </div>
                  <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Average customer basket size widened by <strong class="text-on-surface">₹142</strong> on Saturday-Sunday bundle alerts.
                  </p>
                </div>
              </div>

              <!-- Insight 4: Latency & Retention Alert -->
              <div class="executive-card p-space-md rounded-2xl flex items-start gap-3">
                <div class="w-10 h-10 rounded-xl bg-error-container flex items-center justify-center text-error shrink-0">
                  <span class="material-symbols-outlined text-[22px]">notification_important</span>
                </div>
                <div class="flex flex-col min-w-0 flex-1">
                  <div class="flex items-center justify-between">
                    <span class="font-title-md text-title-md text-on-surface font-semibold truncate">Critical Retention Signal</span>
                    <span class="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-semibold">-3 Days</span>
                  </div>
                  <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Repeat purchase cycle shortened to <strong class="text-on-surface">19 days</strong> post Diwali sale re-engagement push.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Charts Row 1: Revenue Trends & Category Mix -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-space-sm">
            <!-- Daily Revenue Trends Area Chart (2 Cols on Desktop) -->
            <div class="lg:col-span-2 executive-card p-space-md rounded-2xl flex flex-col gap-space-sm">
              <div class="flex items-center justify-between">
                <div class="flex flex-col">
                  <span class="font-title-md text-title-md text-on-surface font-semibold">Revenue Progression Trends</span>
                  <span class="font-label-sm text-label-sm text-on-surface-variant">Daily progression curve (in ₹ Lakhs)</span>
                </div>
                <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-low">
                  <span class="w-2 h-2 rounded-full bg-secondary"></span>
                  <span class="font-label-sm text-label-sm text-on-surface font-medium">Daily Actual</span>
                </div>
              </div>

              <div class="relative w-full h-48 pt-4 flex flex-col justify-between">
                <svg class="w-full h-36 overflow-visible" preserveAspectRatio="none" viewBox="0 0 320 120">
                  <defs>
                    <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stop-color="#4648d4" stop-opacity="0.25"></stop>
                      <stop offset="100%" stop-color="#4648d4" stop-opacity="0.0"></stop>
                    </linearGradient>
                  </defs>
                  <line stroke="#eff4ff" stroke-width="1" x1="0" x2="320" y1="30" y2="30"></line>
                  <line stroke="#eff4ff" stroke-width="1" x1="0" x2="320" y1="65" y2="65"></line>
                  <line stroke="#eff4ff" stroke-width="1" x1="0" x2="320" y1="100" y2="100"></line>
                  
                  <!-- Area Fill -->
                  <path d="M 0 95 Q 40 70, 80 85 T 160 50 T 240 60 T 320 20 L 320 120 L 0 120 Z" fill="url(#areaGradient)"></path>
                  <!-- Actual Line -->
                  <path d="M 0 95 Q 40 70, 80 85 T 160 50 T 240 60 T 320 20" fill="none" stroke="#4648d4" stroke-linecap="round" stroke-width="3"></path>
                  <!-- Peak coordinates -->
                  <circle cx="320" cy="20" fill="#4648d4" r="5" stroke="#ffffff" stroke-width="2"></circle>
                  <circle cx="160" cy="50" fill="#4648d4" r="4" stroke="#ffffff" stroke-width="1.5"></circle>
                </svg>
                <!-- Dynamic peak pill -->
                <div class="absolute right-2 top-2 bg-primary-container text-white px-2.5 py-1 rounded-md shadow-md text-center pointer-events-none text-[11px] font-semibold">
                  ₹68,450 (Yesterday Peak)
                </div>
                <div class="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-2 border-t border-surface-container-high/60">
                  <span>Week 1</span>
                  <span>Week 2</span>
                  <span>Week 3</span>
                  <span class="text-secondary font-semibold">Week 4 (Current Peak)</span>
                </div>
              </div>
            </div>

            <!-- Category Donut Chart (1 Col on Desktop) -->
            <div class="executive-card p-space-md rounded-2xl flex flex-col justify-between gap-space-sm">
              <div class="flex items-center justify-between">
                <div class="flex flex-col">
                  <span class="font-title-md text-title-md text-on-surface font-semibold">Sales by Category</span>
                  <span class="font-label-sm text-label-sm text-on-surface-variant">Product mix contribution</span>
                </div>
                <span class="font-label-sm text-label-sm text-secondary font-semibold">5 Verticals</span>
              </div>

              <div class="flex items-center justify-center gap-4 py-3">
                <div class="relative w-32 h-32 shrink-0 flex items-center justify-center">
                  <svg class="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" fill="none" r="14" stroke="#eff4ff" stroke-width="4.5"></circle>
                    <!-- Electronics 38% -->
                    <circle cx="18" cy="18" fill="none" r="14" stroke="#4648d4" stroke-dasharray="33.4 88" stroke-dashoffset="0" stroke-linecap="round" stroke-width="4.5"></circle>
                    <!-- Clothing 26% -->
                    <circle cx="18" cy="18" fill="none" r="14" stroke="#6063ee" stroke-dasharray="22.8 88" stroke-dashoffset="-33.4" stroke-linecap="round" stroke-width="4.5"></circle>
                    <!-- Beauty 18% -->
                    <circle cx="18" cy="18" fill="none" r="14" stroke="#0090a9" stroke-dasharray="15.8 88" stroke-dashoffset="-56.2" stroke-linecap="round" stroke-width="4.5"></circle>
                    <!-- Food 12% -->
                    <circle cx="18" cy="18" fill="none" r="14" stroke="#acedff" stroke-dasharray="10.5 88" stroke-dashoffset="-72" stroke-linecap="round" stroke-width="4.5"></circle>
                    <!-- Others 6% -->
                    <circle cx="18" cy="18" fill="none" r="14" stroke="#c0c6db" stroke-dasharray="5.2 88" stroke-dashoffset="-82.5" stroke-linecap="round" stroke-width="4.5"></circle>
                  </svg>
                  <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span class="font-label-sm text-label-sm text-on-surface-variant leading-none">Top Share</span>
                    <span class="font-title-md text-title-md font-bold text-on-surface mt-0.5">38%</span>
                  </div>
                </div>

                <div class="flex flex-col gap-1.5 flex-1 min-w-0">
                  ${categories.map(c => `
                    <div class="flex items-center justify-between font-body-sm text-body-sm">
                      <div class="flex items-center gap-1.5 truncate">
                        <span class="w-2.5 h-2.5 rounded-full shrink-0" style="background-color: ${c.color}"></span>
                        <span class="truncate text-on-surface">${c.name}</span>
                      </div>
                      <span class="font-semibold text-on-surface">${c.sharePercent}%</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>

          <!-- Charts Row 2: Category Volume Ranking & Hourly Density -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
            <!-- Category Volume Ranking Bar Ranking -->
            <div class="executive-card p-space-md rounded-2xl flex flex-col gap-space-sm">
              <div class="flex items-center justify-between">
                <div class="flex flex-col">
                  <span class="font-title-md text-title-md text-on-surface font-semibold">Category Volume Ranking</span>
                  <span class="font-label-sm text-label-sm text-on-surface-variant">Gross billing in INR</span>
                </div>
                <span class="material-symbols-outlined text-on-surface-variant text-[20px]">sort</span>
              </div>

              <div class="flex flex-col gap-3 pt-1">
                ${categories.map((c, idx) => `
                  <div class="flex flex-col gap-1">
                    <div class="flex justify-between font-body-sm text-body-sm">
                      <span class="font-medium text-on-surface">${idx + 1}. ${c.displayName}</span>
                      <span class="font-semibold text-on-surface">${c.revenueFormatted}</span>
                    </div>
                    <div class="w-full h-2 rounded-full bg-surface-container-low overflow-hidden">
                      <div class="h-full rounded-full" style="width: ${c.sharePercent * 2.6}%; background-color: ${c.color}"></div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Customer Purchasing Hourly Density Chart -->
            <div class="executive-card p-space-md rounded-2xl flex flex-col justify-between gap-space-sm">
              <div class="flex items-center justify-between">
                <div class="flex flex-col">
                  <span class="font-title-md text-title-md text-on-surface font-semibold">Customer Purchasing Trends</span>
                  <span class="font-label-sm text-label-sm text-on-surface-variant">Hourly store traffic & checkout density</span>
                </div>
                <span class="material-symbols-outlined text-secondary text-[20px]">timeline</span>
              </div>

              <div class="relative w-full h-36 pt-2 flex flex-col justify-between">
                <svg class="w-full h-28 overflow-visible" preserveAspectRatio="none" viewBox="0 0 300 100">
                  <defs>
                    <linearGradient id="customerDensityGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stop-color="#6063ee" stop-opacity="0.3"></stop>
                      <stop offset="100%" stop-color="#6063ee" stop-opacity="0.0"></stop>
                    </linearGradient>
                  </defs>
                  <path d="M 0 85 Q 50 80, 90 45 T 180 30 T 240 15 T 300 40 L 300 100 L 0 100 Z" fill="url(#customerDensityGrad)"></path>
                  <path d="M 0 85 Q 50 80, 90 45 T 180 30 T 240 15 T 300 40" fill="none" stroke="#6063ee" stroke-linecap="round" stroke-width="2.5"></path>
                  <circle cx="240" cy="15" fill="#6063ee" r="4.5" stroke="#ffffff" stroke-width="2"></circle>
                </svg>
                <div class="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant pt-2 border-t border-surface-container-high/60">
                  <span>10 AM</span>
                  <span>2 PM</span>
                  <span class="text-secondary font-semibold">6 PM (Peak Rush)</span>
                  <span>10 PM</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Action CTA Tile: AI Simulation Trigger -->
          <div class="p-space-md rounded-2xl bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-surface-container-high">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-secondary text-white flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-[22px]">auto_awesome</span>
              </div>
              <div class="flex flex-col">
                <span class="font-title-md text-title-md text-on-surface font-semibold">Generate AI Forecast & Stock Rebalance</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant">Simulate weekend inventory allocation based on RFM demand pulse</span>
              </div>
            </div>
            <button class="px-4 py-2.5 rounded-xl bg-primary text-white font-label-md text-label-md shadow-sm active:scale-95 transition-transform flex items-center justify-center gap-1.5 self-start sm:self-auto hover:bg-slate-800" onclick="window.App.triggerForecastSimulation()">
              <span>Run Model</span>
              <span class="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
      `;
    },

    bindEvents: function(container, state) {
      const pills = container.querySelectorAll('#overviewDateFilter .filter-pill');
      pills.forEach(pill => {
        pill.addEventListener('click', () => {
          const range = pill.getAttribute('data-range');
          window.App.setDateFilter(range);
        });
      });
    }
  };

  window.OverviewView = OverviewView;
})(window);
