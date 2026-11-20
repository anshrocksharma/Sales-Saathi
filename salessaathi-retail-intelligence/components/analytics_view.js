// SalesSaathi - Sales Analytics View Component
(function(window) {
  const AnalyticsView = {
    render: function(state) {
      const dataset = state.currentDataset;
      const kpis = dataset.filteredKpis || dataset.kpis;
      let categories = [...(dataset.filteredCategories || dataset.categories)];

      // Apply category search filter if any
      if (state.analyticsSearchTerm) {
        const term = state.analyticsSearchTerm.toLowerCase();
        categories = categories.filter(c => 
          c.name.toLowerCase().includes(term) || 
          c.displayName.toLowerCase().includes(term)
        );
      }

      // Apply sorting if set
      if (state.categorySortOrder === "vol_desc") {
        categories.sort((a, b) => b.unitsSold - a.unitsSold);
      } else if (state.categorySortOrder === "name_asc") {
        categories.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        // default rev_desc
        categories.sort((a, b) => b.revenue - a.revenue);
      }

      const isWeekly = state.revenueTrendView === "weekly";

      return `
        <div class="flex flex-col w-full gap-space-md animate-fade-in pb-8">
          <!-- Page Header Subtitle & Context Indicator -->
          <div class="flex items-center justify-between px-0.5 pt-1">
            <div class="flex flex-col">
              <h1 class="font-headline-sm md:text-headline-md text-headline-sm text-on-surface font-bold">
                Commercial Sales Analytics
              </h1>
              <p class="font-body-md text-body-md text-on-surface-variant">
                Explore revenue, transaction velocity, customer cohorts, and product category margins.
              </p>
            </div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm shrink-0 shadow-sm font-semibold">
              <span class="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              Live Synced
            </div>
          </div>

          <!-- Interactive Filter Controls Pill Bar -->
          <div class="flex flex-col gap-2 bg-surface-container-lowest p-space-sm rounded-xl shadow-sm border border-surface-container-high/60">
            <div class="flex items-center justify-between">
              <span class="font-label-md text-label-md text-on-surface flex items-center gap-1.5 font-semibold">
                <span class="material-symbols-outlined text-[18px] text-secondary">tune</span>
                Filter Performance & Demographics
              </span>
              <button class="font-label-sm text-label-sm text-secondary hover:underline cursor-pointer" id="resetFiltersBtn">
                Reset All
              </button>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2 pt-1">
              <!-- Date Range Select -->
              <div class="relative">
                <select class="w-full appearance-none bg-surface-container-low text-on-surface font-label-md text-label-md rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-1 focus:ring-secondary transition-all" id="analyticsDateSelect">
                  <option value="30D" ${state.dateFilter === '30D' ? 'selected' : ''}>Last 30 Days</option>
                  <option value="7D" ${state.dateFilter === '7D' ? 'selected' : ''}>Last 7 Days</option>
                  <option value="90D" ${state.dateFilter === '90D' ? 'selected' : ''}>Q3 FY24 (90D)</option>
                  <option value="Today" ${state.dateFilter === 'Today' ? 'selected' : ''}>Today</option>
                </select>
                <span class="material-symbols-outlined absolute right-2.5 top-2.5 text-[16px] text-on-surface-variant pointer-events-none">expand_more</span>
              </div>

              <!-- Category Filter -->
              <div class="relative">
                <select class="w-full appearance-none bg-surface-container-low text-on-surface font-label-md text-label-md rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-1 focus:ring-secondary transition-all" id="analyticsCategorySelect">
                  <option value="All" ${state.categoryFilter === 'All' ? 'selected' : ''}>All Categories</option>
                  <option value="Electronics" ${state.categoryFilter === 'Electronics' ? 'selected' : ''}>Electronics</option>
                  <option value="Clothing" ${state.categoryFilter === 'Clothing' ? 'selected' : ''}>Clothing & Apparel</option>
                  <option value="Beauty" ${state.categoryFilter === 'Beauty' ? 'selected' : ''}>Beauty & Wellness</option>
                  <option value="Food" ${state.categoryFilter === 'Food' ? 'selected' : ''}>Food & Gourmet</option>
                  <option value="Home" ${state.categoryFilter === 'Home' ? 'selected' : ''}>Home & Living</option>
                </select>
                <span class="material-symbols-outlined absolute right-2.5 top-2.5 text-[16px] text-on-surface-variant pointer-events-none">expand_more</span>
              </div>

              <!-- Gender Demographic -->
              <div class="relative">
                <select class="w-full appearance-none bg-surface-container-low text-on-surface font-label-md text-label-md rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-1 focus:ring-secondary transition-all" id="analyticsGenderSelect">
                  <option value="All" ${state.genderFilter === 'All' ? 'selected' : ''}>Gender: All</option>
                  <option value="Female" ${state.genderFilter === 'Female' ? 'selected' : ''}>Gender: Female (54%)</option>
                  <option value="Male" ${state.genderFilter === 'Male' ? 'selected' : ''}>Gender: Male (46%)</option>
                </select>
                <span class="material-symbols-outlined absolute right-2.5 top-2.5 text-[16px] text-on-surface-variant pointer-events-none">expand_more</span>
              </div>

              <!-- Age Demographic -->
              <div class="relative">
                <select class="w-full appearance-none bg-surface-container-low text-on-surface font-label-md text-label-md rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-1 focus:ring-secondary transition-all" id="analyticsAgeSelect">
                  <option value="All" ${state.ageFilter === 'All' ? 'selected' : ''}>Age: All Cohorts</option>
                  <option value="18-25" ${state.ageFilter === '18-25' ? 'selected' : ''}>Age: 18-25</option>
                  <option value="26-40" ${state.ageFilter === '26-40' ? 'selected' : ''}>Age: 26-40 (Lead)</option>
                  <option value="41-60" ${state.ageFilter === '41-60' ? 'selected' : ''}>Age: 41-60</option>
                </select>
                <span class="material-symbols-outlined absolute right-2.5 top-2.5 text-[16px] text-on-surface-variant pointer-events-none">expand_more</span>
              </div>
            </div>
          </div>

          <!-- KPI Metrics Grid (2x2 / 4x1) -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-space-sm">
            <!-- Total Revenue -->
            <div class="executive-card p-space-md rounded-xl flex flex-col justify-between relative overflow-hidden">
              <div class="flex items-center justify-between mb-1">
                <span class="font-label-md text-label-md text-on-surface-variant">Total Revenue</span>
                <span class="material-symbols-outlined text-[18px] text-secondary">payments</span>
              </div>
              <span class="font-metric-num text-metric-num text-on-surface tracking-tight font-bold">
                ${kpis.totalRevenueFormatted}
              </span>
              <div class="flex items-center gap-1 mt-1 text-[#16A34A] font-label-sm text-label-sm">
                <span class="material-symbols-outlined text-[14px]">trending_up</span>
                <span>+14.8% vs last mo</span>
              </div>
            </div>

            <!-- Total Units Sold -->
            <div class="executive-card p-space-md rounded-xl flex flex-col justify-between relative overflow-hidden">
              <div class="flex items-center justify-between mb-1">
                <span class="font-label-md text-label-md text-on-surface-variant">Units Sold</span>
                <span class="material-symbols-outlined text-[18px] text-on-surface-variant">inventory</span>
              </div>
              <span class="font-metric-num text-metric-num text-on-surface tracking-tight font-bold">
                ${window.AnalyticsEngine.formatNumber(kpis.unitsSold)} <span class="font-body-sm text-body-sm text-on-surface-variant font-normal">pcs</span>
              </span>
              <div class="flex items-center gap-1 mt-1 text-[#16A34A] font-label-sm text-label-sm">
                <span class="material-symbols-outlined text-[14px]">arrow_upward</span>
                <span>+8.2% volume</span>
              </div>
            </div>

            <!-- Total Transactions -->
            <div class="executive-card p-space-md rounded-xl flex flex-col justify-between relative overflow-hidden">
              <div class="flex items-center justify-between mb-1">
                <span class="font-label-md text-label-md text-on-surface-variant">Transactions</span>
                <span class="material-symbols-outlined text-[18px] text-on-surface-variant">receipt_long</span>
              </div>
              <span class="font-metric-num text-metric-num text-on-surface tracking-tight font-bold">
                ${window.AnalyticsEngine.formatNumber(kpis.totalTransactions)}
              </span>
              <div class="flex items-center gap-1 mt-1 text-[#16A34A] font-label-sm text-label-sm">
                <span class="material-symbols-outlined text-[14px]">trending_up</span>
                <span>+5.4% orders</span>
              </div>
            </div>

            <!-- Avg Transaction Value -->
            <div class="executive-card p-space-md rounded-xl flex flex-col justify-between relative overflow-hidden">
              <div class="flex items-center justify-between mb-1">
                <span class="font-label-md text-label-md text-on-surface-variant">Avg Order Value</span>
                <span class="material-symbols-outlined text-[18px] text-secondary">shopping_bag</span>
              </div>
              <span class="font-metric-num text-metric-num text-on-surface tracking-tight font-bold">
                ${kpis.avgOrderValueFormatted}
              </span>
              <div class="flex items-center gap-1 mt-1 text-[#16A34A] font-label-sm text-label-sm">
                <span class="material-symbols-outlined text-[14px]">arrow_upward</span>
                <span>${kpis.aovTicketDelta || "+₹112 ticket"}</span>
              </div>
            </div>
          </div>

          <!-- Revenue Trend Pulse Graph with Weekend Highlights -->
          <div class="executive-card p-space-md rounded-xl flex flex-col gap-space-sm">
            <div class="flex items-center justify-between">
              <div class="flex flex-col">
                <span class="font-title-md text-title-md text-on-surface font-semibold">Revenue Trend Pulse</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant">
                  ${isWeekly ? 'Aggregated weekly turnover trajectory' : 'Weekly rhythm highlights consistent weekend crests'}
                </span>
              </div>
              <div class="flex items-center gap-1 bg-surface-container-low p-0.5 rounded-lg">
                <button class="px-3 py-1 rounded-md text-label-sm font-label-sm transition-all ${!isWeekly ? 'bg-surface-container-lowest text-on-surface shadow-sm font-semibold' : 'text-on-surface-variant hover:text-on-surface'}" id="viewDailyBtn">
                  Daily
                </button>
                <button class="px-3 py-1 rounded-md text-label-sm font-label-sm transition-all ${isWeekly ? 'bg-surface-container-lowest text-on-surface shadow-sm font-semibold' : 'text-on-surface-variant hover:text-on-surface'}" id="viewWeeklyBtn">
                  Weekly
                </button>
              </div>
            </div>

            <!-- SVG Area Chart -->
            <div class="relative w-full h-48 mt-2">
              ${isWeekly ? `
                <svg class="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 340 130">
                  <line stroke="#eff4ff" stroke-dasharray="3,3" stroke-width="1.5" x1="0" x2="340" y1="20" y2="20"></line>
                  <line stroke="#eff4ff" stroke-dasharray="3,3" stroke-width="1.5" x1="0" x2="340" y1="65" y2="65"></line>
                  <line stroke="#eff4ff" stroke-dasharray="3,3" stroke-width="1.5" x1="0" x2="340" y1="110" y2="110"></line>
                  <path d="M 0,80 L 85,60 L 170,70 L 255,25 L 340,35 L 340,125 L 0,125 Z" fill="#4648d4" opacity="0.15"></path>
                  <path d="M 0,80 L 85,60 L 170,70 L 255,25 L 340,35" fill="none" stroke="#4648d4" stroke-linecap="round" stroke-width="3"></path>
                  <circle cx="255" cy="25" fill="#4648d4" r="5" stroke="#ffffff" stroke-width="2"></circle>
                </svg>
                <div class="absolute top-2 right-24 bg-secondary text-white px-2 py-0.5 rounded text-[11px] font-bold shadow-sm">
                  ₹3.51L Week 4 Peak
                </div>
              ` : `
                <svg class="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 340 130">
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stop-color="#4648d4" stop-opacity="0.30"></stop>
                      <stop offset="100%" stop-color="#4648d4" stop-opacity="0.00"></stop>
                    </linearGradient>
                  </defs>
                  <line stroke="#eff4ff" stroke-dasharray="3,3" stroke-width="1.5" x1="0" x2="340" y1="20" y2="20"></line>
                  <line stroke="#eff4ff" stroke-dasharray="3,3" stroke-width="1.5" x1="0" x2="340" y1="65" y2="65"></line>
                  <line stroke="#eff4ff" stroke-dasharray="3,3" stroke-width="1.5" x1="0" x2="340" y1="110" y2="110"></line>
                  <!-- Weekend highlight columns -->
                  <rect fill="#f8f9ff" height="110" rx="4" width="30" x="75" y="8"></rect>
                  <rect fill="#f8f9ff" height="110" rx="4" width="30" x="235" y="8"></rect>
                  <!-- Area curve -->
                  <path d="M 0,95 Q 25,90 45,78 T 90,28 T 130,85 T 180,82 T 225,50 T 255,22 T 295,75 T 340,68 L 340,125 L 0,125 Z" fill="url(#revenueGradient)"></path>
                  <path d="M 0,95 Q 25,90 45,78 T 90,28 T 130,85 T 180,82 T 225,50 T 255,22 T 295,75 T 340,68" fill="none" stroke="#4648d4" stroke-linecap="round" stroke-width="2.5"></path>
                  <circle cx="90" cy="28" fill="#4648d4" r="5" stroke="#ffffff" stroke-width="2"></circle>
                  <circle cx="255" cy="22" fill="#4648d4" r="5" stroke="#ffffff" stroke-width="2"></circle>
                </svg>
                <div class="absolute top-1 left-20 bg-secondary text-white px-2 py-0.5 rounded text-[11px] font-bold shadow-sm">
                  ₹2.4L Sat Peak
                </div>
                <div class="absolute top-0 right-16 bg-secondary text-white px-2 py-0.5 rounded text-[11px] font-bold shadow-sm">
                  ₹2.6L Sun Surge
                </div>
              `}
            </div>

            <!-- X-axis Labels -->
            <div class="flex justify-between items-center px-1 text-on-surface-variant font-label-sm text-label-sm border-t border-surface-container-high/60 pt-2">
              ${isWeekly ? `
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span class="text-secondary font-semibold">Week 4 (Current Peak)</span>
              ` : `
                <span>Mon</span>
                <span>Tue</span>
                <span class="text-secondary font-semibold">Sat (W1)</span>
                <span>Wed</span>
                <span>Thu</span>
                <span class="text-secondary font-semibold">Sun (W2)</span>
                <span>Current</span>
              `}
            </div>
          </div>

          <!-- Demographics & Category Velocity Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
            <!-- Demographics Container -->
            <div class="executive-card p-space-md rounded-xl flex flex-col gap-space-sm">
              <div class="flex items-center justify-between">
                <span class="font-title-md text-title-md text-on-surface font-semibold">Demographic Intelligence</span>
                <span class="font-label-sm text-label-sm text-on-surface-variant">Validated POS Profile</span>
              </div>
              
              <!-- Gender Distribution Bar -->
              <div class="flex flex-col gap-1.5 pt-1">
                <div class="flex justify-between items-center text-on-surface font-label-md text-label-md">
                  <span class="flex items-center gap-1.5">
                    <span class="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                    Female <strong>54%</strong> (${dataset.demographics.gender.female.revenueFormatted})
                  </span>
                  <span class="flex items-center gap-1.5 text-on-surface-variant">
                    Male <strong>46%</strong> (${dataset.demographics.gender.male.revenueFormatted})
                    <span class="w-2.5 h-2.5 rounded-full bg-surface-container-highest"></span>
                  </span>
                </div>
                <div class="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden flex">
                  <div class="h-full bg-secondary rounded-l-full transition-all duration-700" style="width: 54%"></div>
                  <div class="h-full bg-surface-container-high rounded-r-full transition-all duration-700" style="width: 46%"></div>
                </div>
              </div>

              <!-- Age Cohort Progress Stack -->
              <div class="flex flex-col gap-2 pt-2 border-t border-surface-container-high/60">
                <span class="font-label-md text-label-md text-on-surface-variant font-semibold">Age Cohort Performance</span>
                <div class="space-y-2">
                  ${dataset.demographics.ageCohorts.map(cohort => `
                    <div class="flex flex-col gap-1">
                      <div class="flex justify-between items-center font-label-sm text-label-sm">
                        <span class="text-on-surface font-semibold flex items-center gap-1">
                          ${cohort.label}
                          ${cohort.tag ? `<span class="px-1.5 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px]">${cohort.tag}</span>` : ''}
                        </span>
                        <span class="text-on-surface font-semibold">${cohort.share} (${cohort.revenueFormatted})</span>
                      </div>
                      <div class="w-full h-2 bg-surface-container-low rounded-full overflow-hidden">
                        <div class="h-full ${cohort.color} rounded-full" style="width: ${cohort.percent}%"></div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- Category Contribution: Quantity Sold vs Revenue Breakdown -->
            <div class="executive-card p-space-md rounded-xl flex flex-col gap-space-sm justify-between">
              <div>
                <div class="flex items-center justify-between mb-1">
                  <span class="font-title-md text-title-md text-on-surface font-semibold">Volume vs Revenue Share</span>
                  <span class="font-label-sm text-label-sm text-on-surface-variant">Margin comparison</span>
                </div>
                <p class="font-body-sm text-body-sm text-on-surface-variant mb-3">
                  High-margin electronics vs fast-moving apparel velocity comparison.
                </p>

                <!-- Mini Bar Stack per category -->
                <div class="flex flex-col gap-3">
                  ${categories.map(c => `
                    <div class="flex flex-col gap-1">
                      <div class="flex justify-between items-center font-label-sm text-label-sm">
                        <span class="font-semibold text-on-surface">${c.name}</span>
                        <div class="flex gap-2">
                          <span class="text-secondary font-semibold">${c.sharePercent}% Rev</span>
                          <span class="text-on-surface-variant">${c.volumeSharePercent}% Vol</span>
                        </div>
                      </div>
                      <div class="grid grid-cols-2 gap-1.5">
                        <div class="w-full h-1.5 bg-surface-container-low rounded-full overflow-hidden" title="Revenue Share: ${c.sharePercent}%">
                          <div class="h-full bg-secondary rounded-full" style="width: ${c.sharePercent * 2}%"></div>
                        </div>
                        <div class="w-full h-1.5 bg-surface-container-low rounded-full overflow-hidden" title="Volume Share: ${c.volumeSharePercent}%">
                          <div class="h-full bg-on-surface-variant rounded-full" style="width: ${c.volumeSharePercent * 2}%"></div>
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="flex items-center justify-end gap-3 text-[11px] font-label-sm pt-2 border-t border-surface-container-high/60">
                <span class="flex items-center gap-1 text-secondary font-semibold">
                  <span class="w-2 h-2 rounded-full bg-secondary"></span> Revenue %
                </span>
                <span class="flex items-center gap-1 text-on-surface-variant">
                  <span class="w-2 h-2 rounded-full bg-on-surface-variant"></span> Volume %
                </span>
              </div>
            </div>
          </div>

          <!-- Category Performance Table with Search & Sorting -->
          <div class="executive-card p-space-md rounded-xl flex flex-col gap-space-sm">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div class="flex flex-col">
                <span class="font-title-md text-title-md text-on-surface font-semibold">Category Sales Roster</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant">
                  ${categories.length} active retail verticals under performance audit
                </span>
              </div>
              
              <!-- Quick Search & Sort Controls -->
              <div class="flex items-center gap-2">
                <div class="relative flex-1 md:w-64">
                  <span class="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-on-surface-variant">search</span>
                  <input class="w-full bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary" id="categorySearchInput" placeholder="Search category..." type="text" value="${state.analyticsSearchTerm || ''}"/>
                </div>
                <button class="flex items-center gap-1 px-3 py-2 bg-surface-container-low hover:bg-surface-container rounded-lg text-on-surface font-label-sm text-label-sm transition-colors shrink-0 cursor-pointer" id="toggleSortBtn">
                  <span class="material-symbols-outlined text-[16px] text-secondary">swap_vert</span>
                  <span>${state.categorySortOrder === 'vol_desc' ? 'Vol High' : state.categorySortOrder === 'name_asc' ? 'A-Z' : 'Rev High'}</span>
                </button>
              </div>
            </div>

            <!-- Category Cards Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
              ${categories.map(c => `
                <div class="flex flex-col bg-surface-container-low/70 hover:bg-surface-container-low p-space-sm rounded-xl transition-all border border-surface-container-high/60">
                  <div class="flex items-center justify-between pb-2">
                    <div class="flex items-center gap-2.5 min-w-0">
                      <div class="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                        <span class="material-symbols-outlined text-[20px]">${c.icon}</span>
                      </div>
                      <div class="flex flex-col min-w-0">
                        <span class="font-title-md text-title-md text-on-surface font-semibold truncate">${c.name}</span>
                        <span class="font-label-sm text-label-sm text-on-surface-variant">
                          ${window.AnalyticsEngine.formatNumber(c.unitsSold)} units sold
                        </span>
                      </div>
                    </div>
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full font-label-sm text-label-sm ${c.badgeColor} font-semibold">
                      ${c.status}
                    </span>
                  </div>
                  
                  <div class="grid grid-cols-3 gap-2 pt-2 border-t border-surface-container-high/60">
                    <div class="flex flex-col">
                      <span class="font-label-sm text-label-sm text-on-surface-variant">Revenue</span>
                      <span class="font-label-md text-label-md text-on-surface font-semibold">${c.revenueFormatted}</span>
                    </div>
                    <div class="flex flex-col">
                      <span class="font-label-sm text-label-sm text-on-surface-variant">Avg Price</span>
                      <span class="font-label-md text-label-md text-on-surface font-medium">₹${c.avgPrice}</span>
                    </div>
                    <div class="flex flex-col items-end">
                      <span class="font-label-sm text-label-sm text-on-surface-variant">Contrib</span>
                      <span class="font-label-md text-label-md text-secondary font-bold">${c.sharePercent}%</span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- AI Executive Note Banner -->
          <div class="executive-card p-space-md rounded-xl flex items-start gap-3 relative overflow-hidden border-l-4 border-l-secondary">
            <div class="p-2 rounded-lg bg-secondary/10 text-secondary shrink-0">
              <span class="material-symbols-outlined text-[22px]">smart_toy</span>
            </div>
            <div class="flex flex-col gap-0.5">
              <div class="flex items-center gap-1.5">
                <span class="font-title-md text-title-md text-on-surface font-semibold">Saathi Revenue Copilot Insight</span>
                <span class="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">High Value</span>
              </div>
              <p class="font-body-sm text-body-sm text-on-surface-variant">
                Electronics and Female 26-40 shoppers show highest basket cross-affinity. Rebalance Home & Living inventory and schedule fast-charger bundles prior to the next weekend surge.
              </p>
            </div>
          </div>
        </div>
      `;
    },

    bindEvents: function(container, state) {
      // Date select
      const dateSelect = container.querySelector('#analyticsDateSelect');
      if (dateSelect) {
        dateSelect.addEventListener('change', (e) => {
          window.App.setDateFilter(e.target.value);
        });
      }

      // Category select
      const catSelect = container.querySelector('#analyticsCategorySelect');
      if (catSelect) {
        catSelect.addEventListener('change', (e) => {
          window.App.setCategoryFilter(e.target.value);
        });
      }

      // Gender select
      const genderSelect = container.querySelector('#analyticsGenderSelect');
      if (genderSelect) {
        genderSelect.addEventListener('change', (e) => {
          window.App.setGenderFilter(e.target.value);
        });
      }

      // Age select
      const ageSelect = container.querySelector('#analyticsAgeSelect');
      if (ageSelect) {
        ageSelect.addEventListener('change', (e) => {
          window.App.setAgeFilter(e.target.value);
        });
      }

      // Reset
      const resetBtn = container.querySelector('#resetFiltersBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          window.App.resetFilters();
        });
      }

      // Daily vs Weekly
      const dailyBtn = container.querySelector('#viewDailyBtn');
      const weeklyBtn = container.querySelector('#viewWeeklyBtn');
      if (dailyBtn && weeklyBtn) {
        dailyBtn.addEventListener('click', () => window.App.setRevenueTrendView('daily'));
        weeklyBtn.addEventListener('click', () => window.App.setRevenueTrendView('weekly'));
      }

      // Search input
      const searchInput = container.querySelector('#categorySearchInput');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          window.App.setCategorySearch(e.target.value);
        });
      }

      // Sort toggle
      const sortBtn = container.querySelector('#toggleSortBtn');
      if (sortBtn) {
        sortBtn.addEventListener('click', () => {
          window.App.toggleCategorySort();
        });
      }
    }
  };

  window.AnalyticsView = AnalyticsView;
})(window);
