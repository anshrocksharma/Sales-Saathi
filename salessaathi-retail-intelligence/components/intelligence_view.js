// SalesSaathi - Customer Intelligence & RFM Profiles View Component
(function(window) {
  const IntelligenceView = {
    render: function(state) {
      const dataset = state.currentDataset;
      const rfm = dataset.rfmPillars;
      let profiles = [...(dataset.customerProfiles || [])];

      // Filter profiles by search
      if (state.customerSearchTerm) {
        const term = state.customerSearchTerm.toLowerCase();
        profiles = profiles.filter(p => 
          p.id.toLowerCase().includes(term) ||
          p.name.toLowerCase().includes(term) ||
          p.segment.toLowerCase().includes(term) ||
          p.topAffinity.toLowerCase().includes(term)
        );
      }

      // Filter profiles by RFM chip
      if (state.customerRfmFilter === 'high') {
        profiles = profiles.filter(p => p.rfmCategory === 'high');
      } else if (state.customerRfmFilter === 'risk') {
        profiles = profiles.filter(p => p.rfmCategory === 'risk');
      }

      return `
        <div class="flex flex-col w-full gap-space-lg animate-fade-in pb-8">
          <!-- Intro & Behavioral Context Header -->
          <section class="flex flex-col gap-space-xs">
            <div class="flex items-center justify-between gap-space-xs flex-wrap">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold shadow-sm">
                <span class="material-symbols-outlined text-[16px]">psychology</span>
                RFM Behaviour Engine • ${window.AnalyticsEngine.formatNumber(dataset.kpis.uniqueCustomers)} Profiles
              </span>
              <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                <span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                Model v2.4 Active
              </span>
            </div>
            <div class="flex flex-col mt-1">
              <h1 class="font-headline-sm md:text-headline-md text-headline-sm text-on-surface font-bold">
                Customer Intelligence & Deciles
              </h1>
              <p class="font-body-md text-body-md text-on-surface-variant">
                Analyze who your shoppers are, how frequently they convert, and their individual customer lifetime value.
              </p>
            </div>
          </section>

          <!-- Executive KPI Metrics (2x2 / 4x1) -->
          <section class="grid grid-cols-2 md:grid-cols-4 gap-space-sm">
            <!-- Total Customers -->
            <div class="executive-card flex flex-col p-space-md rounded-2xl shadow-sm gap-space-xs justify-between">
              <div class="flex items-center justify-between">
                <span class="font-label-md text-label-md text-on-surface-variant">Total Base</span>
                <div class="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                  <span class="material-symbols-outlined text-[18px]">group</span>
                </div>
              </div>
              <div class="flex flex-col mt-1">
                <span class="font-metric-num text-metric-num text-on-surface tracking-tight font-bold">
                  ${window.AnalyticsEngine.formatNumber(dataset.kpis.uniqueCustomers)}
                </span>
                <div class="flex items-center gap-1 mt-0.5">
                  <span class="material-symbols-outlined text-[14px] text-[#16A34A]">trending_up</span>
                  <span class="font-label-sm text-label-sm text-[#16A34A] font-semibold">${dataset.kpis.uniqueCustomersDelta}</span>
                  <span class="font-label-sm text-label-sm text-on-surface-variant">YoY</span>
                </div>
              </div>
            </div>

            <!-- Repeat Purchase Rate -->
            <div class="executive-card flex flex-col p-space-md rounded-2xl shadow-sm gap-space-xs justify-between">
              <div class="flex items-center justify-between">
                <span class="font-label-md text-label-md text-on-surface-variant">Repeat Rate</span>
                <div class="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                  <span class="material-symbols-outlined text-[18px]">repeat</span>
                </div>
              </div>
              <div class="flex flex-col mt-1">
                <span class="font-metric-num text-metric-num text-on-surface tracking-tight font-bold">
                  ${dataset.kpis.repeatPurchaseRate}%
                </span>
                <div class="flex items-center gap-1 mt-0.5">
                  <span class="material-symbols-outlined text-[14px] text-[#16A34A]">arrow_upward</span>
                  <span class="font-label-sm text-label-sm text-[#16A34A] font-semibold">${dataset.kpis.repeatRateDelta}</span>
                  <span class="font-label-sm text-label-sm text-on-surface-variant">vs bench</span>
                </div>
              </div>
            </div>

            <!-- Avg Customer Spend -->
            <div class="executive-card flex flex-col p-space-md rounded-2xl shadow-sm gap-space-xs justify-between">
              <div class="flex items-center justify-between">
                <span class="font-label-md text-label-md text-on-surface-variant">Avg CLV Spend</span>
                <div class="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                  <span class="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                </div>
              </div>
              <div class="flex flex-col mt-1">
                <span class="font-metric-num text-metric-num text-on-surface tracking-tight font-bold">
                  ₹${dataset.kpis.avgLifetimeSpend.toLocaleString('en-IN')}
                </span>
                <div class="flex items-center gap-1 mt-0.5">
                  <span class="material-symbols-outlined text-[14px] text-[#16A34A]">trending_up</span>
                  <span class="font-label-sm text-label-sm text-[#16A34A] font-semibold">+12.4%</span>
                  <span class="font-label-sm text-label-sm text-on-surface-variant">per user</span>
                </div>
              </div>
            </div>

            <!-- Avg Purchase Frequency -->
            <div class="executive-card flex flex-col p-space-md rounded-2xl shadow-sm gap-space-xs justify-between">
              <div class="flex items-center justify-between">
                <span class="font-label-md text-label-md text-on-surface-variant">Order Frequency</span>
                <div class="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                  <span class="material-symbols-outlined text-[18px]">event_repeat</span>
                </div>
              </div>
              <div class="flex flex-col mt-1">
                <span class="font-metric-num text-metric-num text-on-surface tracking-tight font-bold">
                  ${dataset.kpis.orderFrequency} <span class="font-label-md text-label-md text-on-surface-variant font-normal">/ yr</span>
                </span>
                <div class="flex items-center gap-1 mt-0.5">
                  <span class="material-symbols-outlined text-[14px] text-secondary">speed</span>
                  <span class="font-label-sm text-label-sm text-on-surface-variant">Steady fleet pace</span>
                </div>
              </div>
            </div>
          </section>

          <!-- RFM Behavioral Pillars Deep Dive (R, F, M Cards) -->
          <section class="flex flex-col gap-space-sm">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-secondary text-[22px]">layers</span>
                <h2 class="font-headline-sm text-headline-sm text-on-surface font-bold">RFM Behavioral Pillars</h2>
              </div>
              <span class="font-label-sm text-label-sm text-on-surface-variant">Standardized Deciles</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
              <!-- Recency Pillar Card -->
              <div class="executive-card p-space-md rounded-2xl shadow-sm flex flex-col justify-between gap-space-sm">
                <div>
                  <div class="flex items-center justify-between pb-1">
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-[13px]">
                        R
                      </div>
                      <div class="flex flex-col">
                        <span class="font-title-md text-title-md text-on-surface font-semibold">Recency</span>
                        <span class="font-label-sm text-label-sm text-on-surface-variant">Days since checkout</span>
                      </div>
                    </div>
                    <div class="text-right">
                      <span class="font-title-md text-title-md text-on-surface font-bold">${rfm.recency.averageDays} Days</span>
                      <span class="block font-label-sm text-label-sm text-on-surface-variant">Fleet Average</span>
                    </div>
                  </div>

                  <!-- Segmented Bar Meter -->
                  <div class="flex flex-col gap-1.5 pt-2">
                    <div class="w-full h-3 rounded-full bg-surface-container overflow-hidden flex">
                      ${rfm.recency.distribution.map(d => `
                        <div class="h-full" style="width: ${d.percent}%; background-color: ${d.color}"></div>
                      `).join('')}
                    </div>
                    <div class="flex items-center justify-between font-label-sm text-label-sm pt-0.5">
                      ${rfm.recency.distribution.map(d => `
                        <span class="flex items-center gap-1 text-on-surface font-medium text-[11px]">
                          <span class="w-2 h-2 rounded-full" style="background-color: ${d.color}"></span>
                          ${d.label}
                        </span>
                      `).join('')}
                    </div>
                  </div>
                </div>

                <div class="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm mt-2">
                  <span class="material-symbols-outlined text-[18px] text-secondary shrink-0">verified</span>
                  <span>${rfm.recency.insight}</span>
                </div>
              </div>

              <!-- Frequency Pillar Card -->
              <div class="executive-card p-space-md rounded-2xl shadow-sm flex flex-col justify-between gap-space-sm">
                <div>
                  <div class="flex items-center justify-between pb-1">
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-[13px]">
                        F
                      </div>
                      <div class="flex flex-col">
                        <span class="font-title-md text-title-md text-on-surface font-semibold">Frequency</span>
                        <span class="font-label-sm text-label-sm text-on-surface-variant">Annual orders volume</span>
                      </div>
                    </div>
                    <div class="text-right">
                      <span class="font-title-md text-title-md text-on-surface font-bold">${rfm.frequency.annualAverage} Orders</span>
                      <span class="block font-label-sm text-label-sm text-on-surface-variant">Per Customer / Yr</span>
                    </div>
                  </div>

                  <!-- Segmented Bar Meter -->
                  <div class="flex flex-col gap-1.5 pt-2">
                    <div class="w-full h-3 rounded-full bg-surface-container overflow-hidden flex">
                      ${rfm.frequency.distribution.map(d => `
                        <div class="h-full" style="width: ${d.percent}%; background-color: ${d.color}"></div>
                      `).join('')}
                    </div>
                    <div class="flex items-center justify-between font-label-sm text-label-sm pt-0.5">
                      ${rfm.frequency.distribution.map(d => `
                        <span class="flex items-center gap-1 text-on-surface font-medium text-[11px]">
                          <span class="w-2 h-2 rounded-full" style="background-color: ${d.color}"></span>
                          ${d.label}
                        </span>
                      `).join('')}
                    </div>
                  </div>
                </div>

                <div class="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm mt-2">
                  <span class="material-symbols-outlined text-[18px] text-secondary shrink-0">check_circle</span>
                  <span>${rfm.frequency.insight}</span>
                </div>
              </div>

              <!-- Monetary Pillar Card -->
              <div class="executive-card p-space-md rounded-2xl shadow-sm flex flex-col justify-between gap-space-sm">
                <div>
                  <div class="flex items-center justify-between pb-1">
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-[13px]">
                        M
                      </div>
                      <div class="flex flex-col">
                        <span class="font-title-md text-title-md text-on-surface font-semibold">Monetary</span>
                        <span class="font-label-sm text-label-sm text-on-surface-variant">Gross lifetime value</span>
                      </div>
                    </div>
                    <div class="text-right">
                      <span class="font-title-md text-title-md text-on-surface font-bold">₹${rfm.monetary.averageCLV.toLocaleString('en-IN')}</span>
                      <span class="block font-label-sm text-label-sm text-on-surface-variant">Avg LTV</span>
                    </div>
                  </div>

                  <!-- Segmented Bar Meter -->
                  <div class="flex flex-col gap-1.5 pt-2">
                    <div class="w-full h-3 rounded-full bg-surface-container overflow-hidden flex">
                      ${rfm.monetary.distribution.map(d => `
                        <div class="h-full" style="width: ${d.percent}%; background-color: ${d.color}"></div>
                      `).join('')}
                    </div>
                    <div class="flex items-center justify-between font-label-sm text-label-sm pt-0.5">
                      ${rfm.monetary.distribution.map(d => `
                        <span class="flex items-center gap-1 text-on-surface font-medium text-[11px]">
                          <span class="w-2 h-2 rounded-full" style="background-color: ${d.color}"></span>
                          ${d.label}
                        </span>
                      `).join('')}
                    </div>
                  </div>
                </div>

                <div class="flex items-center gap-2 p-2.5 rounded-xl bg-secondary-fixed/40 text-on-secondary-fixed font-body-sm text-body-sm mt-2">
                  <span class="material-symbols-outlined text-[18px] text-secondary shrink-0">insights</span>
                  <span>${rfm.monetary.insight}</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Demographics & Affinity Matrix -->
          <section class="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
            <!-- Age Cohort Distribution -->
            <div class="executive-card p-space-md rounded-2xl shadow-sm flex flex-col gap-space-sm">
              <div class="flex items-center justify-between">
                <span class="font-title-md text-title-md text-on-surface font-semibold">Age Cohort Distribution</span>
                <span class="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-surface-container text-secondary font-semibold">
                  Core: 26-40 Yrs (52%)
                </span>
              </div>

              <div class="flex flex-col gap-3 pt-2">
                <div class="flex items-center gap-3">
                  <span class="w-16 font-label-md text-label-md text-on-surface-variant shrink-0">18-25 Yrs</span>
                  <div class="flex-1 h-2 rounded-full bg-surface-container overflow-hidden">
                    <div class="h-full bg-secondary-fixed-dim rounded-full" style="width: 18%;"></div>
                  </div>
                  <span class="w-10 text-right font-label-md text-label-md text-on-surface font-semibold">18%</span>
                </div>

                <div class="flex items-center gap-3">
                  <span class="w-16 font-label-md text-label-md text-on-surface font-bold shrink-0">26-40 Yrs</span>
                  <div class="flex-1 h-2.5 rounded-full bg-surface-container overflow-hidden">
                    <div class="h-full bg-secondary rounded-full" style="width: 52%;"></div>
                  </div>
                  <span class="w-10 text-right font-label-md text-label-md text-secondary font-bold">52%</span>
                </div>

                <div class="flex items-center gap-3">
                  <span class="w-16 font-label-md text-label-md text-on-surface-variant shrink-0">41-60 Yrs</span>
                  <div class="flex-1 h-2 rounded-full bg-surface-container overflow-hidden">
                    <div class="h-full bg-surface-tint rounded-full" style="width: 24%;"></div>
                  </div>
                  <span class="w-10 text-right font-label-md text-label-md text-on-surface font-semibold">24%</span>
                </div>

                <div class="flex items-center gap-3">
                  <span class="w-16 font-label-md text-label-md text-on-surface-variant shrink-0">60+ Yrs</span>
                  <div class="flex-1 h-2 rounded-full bg-surface-container overflow-hidden">
                    <div class="h-full bg-surface-dim rounded-full" style="width: 6%;"></div>
                  </div>
                  <span class="w-10 text-right font-label-md text-label-md text-on-surface-variant">6%</span>
                </div>
              </div>
            </div>

            <!-- Spending by Gender & Basket Affinity Split -->
            <div class="executive-card p-space-md rounded-2xl shadow-sm flex flex-col justify-between gap-space-sm">
              <div class="flex items-center justify-between">
                <span class="font-title-md text-title-md text-on-surface font-semibold">Basket & Affinity Dynamics</span>
                <span class="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">
                  ${dataset.demographics.basketDynamics.unitsPerBasket} Units / Basket
                </span>
              </div>

              <div class="grid grid-cols-2 gap-space-sm py-1">
                <div class="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1">
                  <div class="flex items-center justify-between">
                    <span class="font-label-md text-label-md text-secondary font-semibold">Female (54%)</span>
                    <span class="material-symbols-outlined text-[18px] text-secondary">female</span>
                  </div>
                  <span class="font-title-md text-title-md text-on-surface font-bold">
                    ${dataset.demographics.gender.female.revenueFormatted}
                  </span>
                  <span class="font-label-sm text-label-sm text-on-surface-variant">
                    ₹${dataset.demographics.gender.female.avgTicket.toLocaleString('en-IN')} avg ticket
                  </span>
                </div>

                <div class="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1">
                  <div class="flex items-center justify-between">
                    <span class="font-label-md text-label-md text-on-surface font-semibold">Male (46%)</span>
                    <span class="material-symbols-outlined text-[18px] text-on-surface-variant">male</span>
                  </div>
                  <span class="font-title-md text-title-md text-on-surface font-bold">
                    ${dataset.demographics.gender.male.revenueFormatted}
                  </span>
                  <span class="font-label-sm text-label-sm text-on-surface-variant">
                    ₹${dataset.demographics.gender.male.avgTicket.toLocaleString('en-IN')} avg ticket
                  </span>
                </div>
              </div>

              <div class="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high/60">
                <div class="flex items-center gap-2 min-w-0">
                  <span class="material-symbols-outlined text-[20px] text-secondary">devices</span>
                  <span class="font-label-md text-label-md text-on-surface font-semibold truncate">
                    ${dataset.demographics.basketDynamics.dominantPairing}
                  </span>
                </div>
                <span class="font-label-sm text-label-sm text-secondary font-bold shrink-0">
                  ${dataset.demographics.basketDynamics.coOccurrenceRate}% Co-occur
                </span>
              </div>
            </div>
          </section>

          <!-- Customer Profile Roster (RFM Scoring & Search) -->
          <section class="flex flex-col gap-space-sm">
            <div class="flex flex-col gap-space-xs">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-secondary text-[22px]">badge</span>
                  <h2 class="font-headline-sm text-headline-sm text-on-surface font-bold">Customer Profiles Roster</h2>
                </div>
                <span class="font-label-sm text-label-sm text-on-surface-variant">Decile Scored</span>
              </div>

              <!-- Search Field & Filter Chips -->
              <div class="flex flex-col md:flex-row gap-2 items-center justify-between pt-1">
                <div class="relative w-full md:w-80">
                  <span class="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[20px]">search</span>
                  <input class="w-full h-10 pl-10 pr-4 rounded-xl bg-white text-on-surface font-body-sm text-body-sm outline-none shadow-sm placeholder:text-on-surface-variant/70 focus:ring-1 focus:ring-secondary border border-surface-container-high transition-all" id="customerSearchInput" placeholder="Search by ID, Name, Segment, Category..." type="text" value="${state.customerSearchTerm || ''}"/>
                </div>

                <div class="flex items-center gap-2 overflow-x-auto self-start md:self-auto" id="customerRfmFilterPills">
                  <button class="rfm-filter-btn px-3 py-1.5 rounded-full font-label-sm text-label-sm shrink-0 transition-all cursor-pointer ${(!state.customerRfmFilter || state.customerRfmFilter === 'all') ? 'bg-primary-container text-white font-semibold' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'}" data-rfm="all">
                    All Profiles (${dataset.customerProfiles.length})
                  </button>
                  <button class="rfm-filter-btn px-3 py-1.5 rounded-full font-label-sm text-label-sm shrink-0 transition-all cursor-pointer ${state.customerRfmFilter === 'high' ? 'bg-secondary text-white font-semibold' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'}" data-rfm="high">
                    Champions (R:5 F:5 M:5)
                  </button>
                  <button class="rfm-filter-btn px-3 py-1.5 rounded-full font-label-sm text-label-sm shrink-0 transition-all cursor-pointer ${state.customerRfmFilter === 'risk' ? 'bg-rose-700 text-white font-semibold' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'}" data-rfm="risk">
                    At-Risk / Need Attention
                  </button>
                </div>
              </div>
            </div>

            <!-- Profile Cards List -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-space-sm pt-1">
              ${profiles.map(p => `
                <div class="executive-card flex flex-col p-space-md rounded-2xl shadow-sm gap-space-sm justify-between">
                  <div>
                    <div class="flex items-start justify-between gap-2">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-[13px] shrink-0 ${p.avatarColor}">
                          ${p.avatarInitial}
                        </div>
                        <div class="flex flex-col min-w-0">
                          <div class="flex items-center gap-1.5">
                            <span class="font-title-md text-title-md text-on-surface font-bold">#${p.id}</span>
                            <span class="font-body-sm text-body-sm text-on-surface font-medium">(${p.name})</span>
                            <span class="material-symbols-outlined text-[16px] text-secondary">verified</span>
                          </div>
                          <span class="font-body-sm text-body-sm text-on-surface-variant truncate">
                            ${p.gender}, ${p.age} yrs • ${p.city}
                          </span>
                        </div>
                      </div>
                      <span class="px-2.5 py-0.5 rounded-full font-label-sm text-label-sm shrink-0 font-semibold ${p.rfmCategory === 'high' ? 'bg-secondary text-white' : p.rfmCategory === 'risk' ? 'bg-rose-100 text-rose-800' : 'bg-surface-container text-on-surface'}">
                        ${p.badge}
                      </span>
                    </div>

                    <div class="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-surface-container-low text-center my-3">
                      <div class="flex flex-col">
                        <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Lifetime Spend</span>
                        <span class="font-label-md text-label-md text-on-surface font-bold">${p.lifetimeSpend}</span>
                      </div>
                      <div class="flex flex-col">
                        <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Orders</span>
                        <span class="font-label-md text-label-md text-on-surface font-bold">${p.ordersCount} orders</span>
                      </div>
                      <div class="flex flex-col">
                        <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Last Seen</span>
                        <span class="font-label-md text-label-md text-[#16A34A] font-bold">${p.lastSeen}</span>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center justify-between pt-1 border-t border-surface-container-high/60">
                    <span class="font-label-sm text-label-sm text-on-surface-variant">
                      Top Affinity: <strong class="text-on-surface font-semibold">${p.topAffinity}</strong>
                    </span>
                    <button class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold transition-colors cursor-pointer" onclick="window.App.openCustomerDetailsModal('${p.id}')">
                      <span>View 360°</span>
                      <span class="material-symbols-outlined text-[14px]">open_in_new</span>
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        </div>
      `;
    },

    bindEvents: function(container, state) {
      const searchInput = container.querySelector('#customerSearchInput');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          window.App.setCustomerSearch(e.target.value);
        });
      }

      const rfmButtons = container.querySelectorAll('#customerRfmFilterPills .rfm-filter-btn');
      rfmButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const rfm = btn.getAttribute('data-rfm');
          window.App.setCustomerRfmFilter(rfm);
        });
      });
    }
  };

  window.IntelligenceView = IntelligenceView;
})(window);
