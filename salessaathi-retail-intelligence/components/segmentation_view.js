// SalesSaathi - Customer Segmentation (K-Means & Centroids) View Component
(function(window) {
  const SegmentationView = {
    render: function(state) {
      const dataset = state.currentDataset;
      const clusters = dataset.clusters || [];
      const scatterPoints = dataset.scatterPoints || [];
      const selectedCluster = state.selectedClusterFilter || "all";
      const activePoint = state.selectedCustomerPoint || scatterPoints.find(p => p.isHighlight) || scatterPoints[0];

      // Filter scatter points based on active cluster selection
      const visiblePoints = selectedCluster === "all" 
        ? scatterPoints 
        : scatterPoints.filter(p => p.cluster === parseInt(selectedCluster, 10));

      return `
        <div class="flex flex-col w-full gap-space-lg animate-fade-in pb-8">
          <!-- Header Banner / AI Model Status -->
          <section class="executive-card flex flex-col gap-space-xs rounded-2xl p-space-md shadow-sm border border-surface-container-high/60">
            <div class="flex items-center justify-between gap-space-xs flex-wrap">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary font-label-sm text-label-sm font-semibold">
                <span class="material-symbols-outlined text-[16px]">psychology</span>
                Powered by K-Means Clustering (k=4)
              </span>
              <span class="inline-flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Model v2.4 Active & Calibrated
              </span>
            </div>
            
            <div class="flex flex-col mt-1">
              <h1 class="font-headline-sm md:text-headline-md text-headline-sm text-on-surface font-bold">
                AI-Powered Customer Segmentation
              </h1>
              <p class="font-body-md text-body-md text-on-surface-variant mt-0.5">
                Discover latent customer cohorts, centroid gravitation, and automated commercial strategies using machine learning.
              </p>
            </div>

            <!-- Pipeline Metrics Strip -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-space-xs pt-space-xs mt-1">
              <div class="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low">
                <span class="material-symbols-outlined text-secondary text-[22px]">dataset</span>
                <div class="flex flex-col min-w-0">
                  <span class="font-label-sm text-label-sm text-on-surface-variant truncate">Source Feed</span>
                  <span class="font-label-md text-label-md text-on-surface truncate font-semibold">${dataset.name}</span>
                </div>
              </div>

              <div class="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low">
                <span class="material-symbols-outlined text-secondary text-[22px]">bolt</span>
                <div class="flex flex-col min-w-0">
                  <span class="font-label-sm text-label-sm text-on-surface-variant truncate">Convergence</span>
                  <span class="font-label-md text-label-md text-on-surface truncate font-semibold">14 iterations</span>
                </div>
              </div>

              <div class="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low">
                <span class="material-symbols-outlined text-emerald-600 text-[22px]">verified</span>
                <div class="flex flex-col min-w-0">
                  <span class="font-label-sm text-label-sm text-on-surface-variant truncate">Inertia Separation</span>
                  <span class="font-label-md text-label-md text-emerald-600 truncate font-semibold">Optimal Elbow</span>
                </div>
              </div>

              <div class="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low">
                <span class="material-symbols-outlined text-secondary text-[22px]">tune</span>
                <div class="flex flex-col min-w-0">
                  <span class="font-label-sm text-label-sm text-on-surface-variant truncate">Feature Normalizer</span>
                  <span class="font-label-md text-label-md text-on-surface truncate font-semibold">StandardScaler</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Model Performance Summary Cards (2x2 / 4x1) -->
          <section class="grid grid-cols-2 md:grid-cols-4 gap-space-sm">
            <!-- Metric 1: Analyzed -->
            <div class="executive-card flex flex-col justify-between p-space-md rounded-2xl shadow-sm">
              <div class="flex items-center justify-between">
                <span class="font-label-md text-label-md text-on-surface-variant">Analyzed Base</span>
                <span class="material-symbols-outlined text-on-surface-variant text-[18px]">group</span>
              </div>
              <div class="my-2">
                <div class="font-metric-num text-metric-num text-on-surface font-bold">
                  ${window.AnalyticsEngine.formatNumber(dataset.kpis.uniqueCustomers)}
                </div>
                <span class="font-label-sm text-label-sm text-on-surface-variant">Total Customers</span>
              </div>
              <div class="flex items-center gap-1 text-emerald-600 font-label-sm text-label-sm font-semibold">
                <span class="material-symbols-outlined text-[14px]">trending_up</span>
                <span>+8.4% QoQ</span>
              </div>
            </div>

            <!-- Metric 2: Clusters -->
            <div class="executive-card flex flex-col justify-between p-space-md rounded-2xl shadow-sm">
              <div class="flex items-center justify-between">
                <span class="font-label-md text-label-md text-on-surface-variant">Clusters</span>
                <span class="material-symbols-outlined text-secondary text-[18px]">bubble_chart</span>
              </div>
              <div class="my-2">
                <div class="font-metric-num text-metric-num text-on-surface font-bold">4</div>
                <span class="font-label-sm text-label-sm text-on-surface-variant">Elbow Inflection</span>
              </div>
              <div class="flex items-center gap-1 text-secondary font-label-sm text-label-sm font-semibold">
                <span class="material-symbols-outlined text-[14px]">tune</span>
                <span>Optimal k=4</span>
              </div>
            </div>

            <!-- Metric 3: Silhouette Score -->
            <div class="executive-card flex flex-col justify-between p-space-md rounded-2xl shadow-sm">
              <div class="flex items-center justify-between">
                <span class="font-label-md text-label-md text-on-surface-variant">Silhouette Score</span>
                <span class="material-symbols-outlined text-emerald-600 text-[18px]">verified</span>
              </div>
              <div class="my-2">
                <div class="font-metric-num text-metric-num text-on-surface font-bold">0.74</div>
                <span class="font-label-sm text-label-sm text-on-surface-variant">High Trust Index</span>
              </div>
              <div class="flex items-center gap-1 text-emerald-600 font-label-sm text-label-sm font-semibold">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Strong Separation</span>
              </div>
            </div>

            <!-- Metric 4: Avg / Cluster -->
            <div class="executive-card flex flex-col justify-between p-space-md rounded-2xl shadow-sm">
              <div class="flex items-center justify-between">
                <span class="font-label-md text-label-md text-on-surface-variant">Avg / Cluster</span>
                <span class="material-symbols-outlined text-on-surface-variant text-[18px]">balance</span>
              </div>
              <div class="my-2">
                <div class="font-metric-num text-metric-num text-on-surface font-bold">802</div>
                <span class="font-label-sm text-label-sm text-on-surface-variant">Cohort Mean</span>
              </div>
              <div class="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                <span>Balanced Variance</span>
              </div>
            </div>
          </section>

          <!-- Interactive 2D Cluster Feature Space Visualizer -->
          <section class="executive-card flex flex-col gap-space-md rounded-2xl p-space-md shadow-sm border border-surface-container-high/60">
            <div class="flex flex-col gap-1">
              <div class="flex items-center justify-between">
                <span class="font-label-md text-label-md text-secondary uppercase tracking-wider font-semibold">Multivariate Feature Map</span>
                <span class="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-medium">Frequency vs Spend</span>
              </div>
              <h2 class="font-title-md md:text-headline-sm text-title-md text-on-surface font-semibold">
                RFM Feature Space & Centroid Projections
              </h2>
              <p class="font-body-sm text-body-sm text-on-surface-variant">
                Normalized Monetary Value plotted against Order Frequency with machine-learnt cluster gravity centers (μ₀–μ₃).
              </p>
            </div>

            <!-- Cluster Filter Buttons Bar -->
            <div class="flex items-center gap-1.5 overflow-x-auto pb-1" id="clusterFilterPills">
              <button class="cluster-filter-btn px-3 py-1.5 rounded-full font-label-sm text-label-sm transition-all shrink-0 cursor-pointer ${selectedCluster === 'all' ? 'bg-primary-container text-white font-semibold shadow-sm' : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'}" data-cluster="all">
                All Clusters (4)
              </button>
              <button class="cluster-filter-btn px-3 py-1.5 rounded-full font-label-sm text-label-sm transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${selectedCluster === '0' ? 'bg-[#4648d4] text-white font-semibold shadow-sm' : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'}" data-cluster="0">
                <span class="w-2 h-2 rounded-full ${selectedCluster === '0' ? 'bg-white' : 'bg-[#4648d4]'}"></span> C0: Champions
              </button>
              <button class="cluster-filter-btn px-3 py-1.5 rounded-full font-label-sm text-label-sm transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${selectedCluster === '1' ? 'bg-[#0090a9] text-white font-semibold shadow-sm' : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'}" data-cluster="1">
                <span class="w-2 h-2 rounded-full ${selectedCluster === '1' ? 'bg-white' : 'bg-[#0090a9]'}"></span> C1: Loyalists
              </button>
              <button class="cluster-filter-btn px-3 py-1.5 rounded-full font-label-sm text-label-sm transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${selectedCluster === '2' ? 'bg-[#d97706] text-white font-semibold shadow-sm' : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'}" data-cluster="2">
                <span class="w-2 h-2 rounded-full ${selectedCluster === '2' ? 'bg-white' : 'bg-[#d97706]'}"></span> C2: Potential
              </button>
              <button class="cluster-filter-btn px-3 py-1.5 rounded-full font-label-sm text-label-sm transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${selectedCluster === '3' ? 'bg-[#ba1a1a] text-white font-semibold shadow-sm' : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'}" data-cluster="3">
                <span class="w-2 h-2 rounded-full ${selectedCluster === '3' ? 'bg-white' : 'bg-[#ba1a1a]'}"></span> C3: At-Risk
              </button>
            </div>

            <!-- Scatter Plot Canvas Container -->
            <div class="relative w-full rounded-2xl bg-surface-container-low p-3 md:p-4 flex flex-col border border-surface-container-high/60">
              <!-- Y Axis Label -->
              <div class="flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm pb-1 font-medium">
                <span>Monetary (₹ Spending)</span>
                <span>High Spend ↑</span>
              </div>

              <!-- SVG Scatter Plot -->
              <div class="relative w-full h-72 md:h-80 bg-white rounded-xl overflow-hidden flex items-center justify-center shadow-inner">
                <svg class="w-full h-full cursor-crosshair" id="clusterSvg" viewBox="0 0 340 220">
                  <!-- Grid Lines -->
                  <line stroke="#e5eeff" stroke-dasharray="3,3" stroke-width="1" x1="40" x2="330" y1="20" y2="20"></line>
                  <line stroke="#e5eeff" stroke-dasharray="3,3" stroke-width="1" x1="40" x2="330" y1="65" y2="65"></line>
                  <line stroke="#e5eeff" stroke-dasharray="3,3" stroke-width="1" x1="40" x2="330" y1="110" y2="110"></line>
                  <line stroke="#e5eeff" stroke-dasharray="3,3" stroke-width="1" x1="40" x2="330" y1="155" y2="155"></line>
                  <line stroke="#c0c6db" stroke-width="1" x1="40" x2="330" y1="200" y2="200"></line>
                  <line stroke="#c0c6db" stroke-width="1" x1="40" x2="40" y1="20" y2="200"></line>
                  <line stroke="#e5eeff" stroke-dasharray="3,3" stroke-width="1" x1="112" x2="112" y1="20" y2="200"></line>
                  <line stroke="#e5eeff" stroke-dasharray="3,3" stroke-width="1" x1="184" x2="184" y1="20" y2="200"></line>
                  <line stroke="#e5eeff" stroke-dasharray="3,3" stroke-width="1" x1="256" x2="256" y1="20" y2="200"></line>

                  <!-- Axis Numbers -->
                  <text fill="#76777d" font-size="8" text-anchor="end" x="36" y="24">₹50k</text>
                  <text fill="#76777d" font-size="8" text-anchor="end" x="36" y="69">₹35k</text>
                  <text fill="#76777d" font-size="8" text-anchor="end" x="36" y="114">₹20k</text>
                  <text fill="#76777d" font-size="8" text-anchor="end" x="36" y="159">₹10k</text>
                  <text fill="#76777d" font-size="8" text-anchor="end" x="36" y="202">₹0</text>
                  <text fill="#76777d" font-size="8" text-anchor="middle" x="40" y="214">0</text>
                  <text fill="#76777d" font-size="8" text-anchor="middle" x="112" y="214">5</text>
                  <text fill="#76777d" font-size="8" text-anchor="middle" x="184" y="214">10</text>
                  <text fill="#76777d" font-size="8" text-anchor="middle" x="256" y="214">15</text>
                  <text fill="#76777d" font-size="8" text-anchor="middle" x="320" y="214">20+ Freq</text>

                  <!-- Density Halos -->
                  ${(selectedCluster === 'all' || selectedCluster === '0') ? `
                    <ellipse cx="265" cy="55" fill="#4648d4" fill-opacity="0.08" rx="42" ry="28"></ellipse>
                  ` : ''}
                  ${(selectedCluster === 'all' || selectedCluster === '1') ? `
                    <ellipse cx="180" cy="115" fill="#0090a9" fill-opacity="0.08" rx="38" ry="24"></ellipse>
                  ` : ''}
                  ${(selectedCluster === 'all' || selectedCluster === '2') ? `
                    <ellipse cx="98" cy="155" fill="#d97706" fill-opacity="0.08" rx="32" ry="22"></ellipse>
                  ` : ''}
                  ${(selectedCluster === 'all' || selectedCluster === '3') ? `
                    <ellipse cx="65" cy="178" fill="#ba1a1a" fill-opacity="0.08" rx="22" ry="16"></ellipse>
                  ` : ''}

                  <!-- Scatter Data Points -->
                  ${visiblePoints.map(p => {
                    const color = clusters[p.cluster] ? clusters[p.cluster].color : "#4648d4";
                    const isSelected = activePoint && activePoint.id === p.id;
                    return `
                      <g class="scatter-point-group cursor-pointer" data-point-id="${p.id}">
                        ${isSelected ? `
                          <circle cx="${p.cx}" cy="${p.cy}" r="9" fill="${color}" fill-opacity="0.25" class="animate-ping"></circle>
                          <circle cx="${p.cx}" cy="${p.cy}" r="5.5" fill="${color}" stroke="#ffffff" stroke-width="2"></circle>
                        ` : `
                          <circle cx="${p.cx}" cy="${p.cy}" r="3.8" fill="${color}" fill-opacity="0.8" hover:fill-opacity="1" class="transition-all hover:scale-125"></circle>
                        `}
                      </g>
                    `;
                  }).join('')}

                  <!-- Centroids -->
                  ${(selectedCluster === 'all' || selectedCluster === '0') ? `
                    <g class="cursor-pointer" title="Centroid C0">
                      <polygon fill="#4648d4" points="266,48 272,55 266,62 260,55" stroke="#ffffff" stroke-width="1.5"></polygon>
                      <text fill="#4648d4" font-size="7" font-weight="700" text-anchor="middle" x="266" y="44">μ₀</text>
                    </g>
                  ` : ''}

                  ${(selectedCluster === 'all' || selectedCluster === '1') ? `
                    <g class="cursor-pointer" title="Centroid C1">
                      <polygon fill="#0090a9" points="182,109 188,115 182,121 176,115" stroke="#ffffff" stroke-width="1.5"></polygon>
                      <text fill="#0090a9" font-size="7" font-weight="700" text-anchor="middle" x="182" y="105">μ₁</text>
                    </g>
                  ` : ''}

                  ${(selectedCluster === 'all' || selectedCluster === '2') ? `
                    <g class="cursor-pointer" title="Centroid C2">
                      <polygon fill="#d97706" points="98,149 104,155 98,161 92,155" stroke="#ffffff" stroke-width="1.5"></polygon>
                      <text fill="#d97706" font-size="7" font-weight="700" text-anchor="middle" x="98" y="145">μ₂</text>
                    </g>
                  ` : ''}

                  ${(selectedCluster === 'all' || selectedCluster === '3') ? `
                    <g class="cursor-pointer" title="Centroid C3">
                      <polygon fill="#ba1a1a" points="62,172 68,178 62,184 56,178" stroke="#ffffff" stroke-width="1.5"></polygon>
                      <text fill="#ba1a1a" font-size="7" font-weight="700" text-anchor="middle" x="62" y="168">μ₃</text>
                    </g>
                  ` : ''}
                </svg>

                <!-- Floating Tooltip Card for Active Selected Point -->
                ${activePoint ? `
                  <div class="absolute top-2 right-2 bg-primary-container text-white rounded-xl p-3 shadow-lg flex flex-col gap-1 max-w-[210px] border border-white/10 animate-fade-in">
                    <div class="flex items-center justify-between gap-1">
                      <span class="font-label-sm text-label-sm font-bold text-secondary-fixed">#${activePoint.id}</span>
                      <span class="px-2 py-0.5 rounded font-label-sm text-[10px] font-semibold text-white" style="background-color: ${clusters[activePoint.cluster]?.color || '#4648d4'}">
                        Cluster ${activePoint.cluster}
                      </span>
                    </div>
                    <span class="font-body-sm text-[11px] text-white/80 font-medium truncate">${activePoint.name} (${activePoint.city})</span>
                    <div class="grid grid-cols-2 gap-1.5 text-[11px] pt-1 border-t border-white/10 mt-0.5">
                      <div class="flex flex-col">
                        <span class="text-white/60 text-[9px] uppercase font-semibold">Recency</span>
                        <span class="font-bold text-white">${activePoint.r} days ago</span>
                      </div>
                      <div class="flex flex-col">
                        <span class="text-white/60 text-[9px] uppercase font-semibold">Frequency</span>
                        <span class="font-bold text-white">${activePoint.f} orders</span>
                      </div>
                      <div class="flex flex-col col-span-2 pt-0.5">
                        <span class="text-white/60 text-[9px] uppercase font-semibold">Monetary (CLV)</span>
                        <span class="font-bold text-emerald-300">₹${activePoint.m.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                ` : ''}
              </div>

              <!-- Footer Coordinates Note -->
              <div class="flex items-center justify-between pt-2 text-on-surface-variant font-label-sm text-label-sm">
                <span class="flex items-center gap-1.5 font-medium">
                  <span class="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                  μ₀–μ₃ indicate machine-learnt cluster gravity centers
                </span>
                <button class="text-secondary font-semibold hover:underline cursor-pointer" onclick="window.App.setClusterFilter('all')">
                  Reset View
                </button>
              </div>
            </div>
          </section>

          <!-- 4 Target Segment Action Cards -->
          <section class="flex flex-col gap-space-sm">
            <div class="flex items-center justify-between px-1">
              <div class="flex flex-col">
                <span class="font-headline-sm text-headline-sm text-on-surface font-bold">Target Commercial Segments</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant">Recommended commercial plays calculated per cohort</span>
              </div>
              <span class="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold">
                4 Cohorts
              </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
              ${clusters.map(cluster => `
                <div class="executive-card flex flex-col gap-space-sm p-space-md rounded-2xl shadow-sm justify-between">
                  <div>
                    <div class="flex items-start justify-between pb-1">
                      <div class="flex items-center gap-2.5">
                        <div class="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shrink-0" style="background-color: ${cluster.color}">
                          <span class="material-symbols-outlined text-[22px]">
                            ${cluster.id === 0 ? 'workspace_premium' : cluster.id === 1 ? 'verified_user' : cluster.id === 2 ? 'trending_up' : 'warning'}
                          </span>
                        </div>
                        <div class="flex flex-col">
                          <div class="flex items-center gap-1.5">
                            <h3 class="font-title-md text-title-md text-on-surface font-bold">${cluster.name}</h3>
                            <span class="px-1.5 py-0.2 rounded-full font-label-sm text-[10px] font-bold ${cluster.badgeColor}">
                              ${cluster.code}
                            </span>
                          </div>
                          <span class="font-body-sm text-body-sm text-on-surface-variant">
                            ${window.AnalyticsEngine.formatNumber(cluster.count)} customers (${cluster.sharePercent}% share)
                          </span>
                        </div>
                      </div>
                      <span class="px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold ${cluster.tagColor}">
                        ${cluster.tag}
                      </span>
                    </div>

                    <!-- Metrics Row -->
                    <div class="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-surface-container-low text-center my-3">
                      <div class="flex flex-col">
                        <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Avg Spend</span>
                        <span class="font-title-md text-title-md text-on-surface font-bold">${cluster.avgSpendFormatted}</span>
                      </div>
                      <div class="flex flex-col">
                        <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Avg Orders</span>
                        <span class="font-title-md text-title-md text-on-surface font-bold">${cluster.avgOrders}</span>
                      </div>
                      <div class="flex flex-col">
                        <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Recency</span>
                        <span class="font-title-md text-title-md text-on-surface font-bold">${cluster.recencyDays}d</span>
                      </div>
                    </div>

                    <!-- Actionable Strategy Box -->
                    <div class="flex flex-col gap-1 p-3 rounded-xl bg-surface-container-high/60">
                      <div class="flex items-center gap-1.5 font-label-md text-label-md font-bold" style="color: ${cluster.color}">
                        <span class="material-symbols-outlined text-[16px]">stars</span>
                        <span>${cluster.strategyTitle}</span>
                      </div>
                      <p class="font-body-sm text-body-sm text-on-surface">
                        ${cluster.strategyText}
                      </p>
                    </div>
                  </div>

                  <div class="flex items-center justify-between pt-2 border-t border-surface-container-high/60 mt-1">
                    <span class="text-on-surface-variant font-label-sm text-label-sm font-medium">
                      Projected LTV: <strong class="text-on-surface">${cluster.projectedLtv}</strong>
                    </span>
                    <button class="px-3.5 py-1.5 rounded-xl text-white font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all shadow-sm cursor-pointer" style="background-color: ${cluster.color}" onclick="window.App.triggerClusterAction('${cluster.code}')">
                      ${cluster.actionLabel}
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
      // Cluster filter buttons
      const buttons = container.querySelectorAll('#clusterFilterPills .cluster-filter-btn');
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const clusterId = btn.getAttribute('data-cluster');
          window.App.setClusterFilter(clusterId);
        });
      });

      // Scatter point clicks
      const pointGroups = container.querySelectorAll('#clusterSvg .scatter-point-group');
      pointGroups.forEach(g => {
        g.addEventListener('click', () => {
          const ptId = g.getAttribute('data-point-id');
          window.App.selectCustomerPoint(ptId);
        });
      });
    }
  };

  window.SegmentationView = SegmentationView;
})(window);
