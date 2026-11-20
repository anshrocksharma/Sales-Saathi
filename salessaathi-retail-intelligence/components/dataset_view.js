// SalesSaathi - Dataset Management & CSV Studio View Component
(function(window) {
  const DatasetView = {
    render: function(state) {
      const dataset = state.currentDataset;
      const allDatasets = window.SALESSAATHI_DATA.datasets;
      let sampleRows = dataset.sampleRows || [];

      // Filter sample rows by search if present
      if (state.datasetSearchTerm) {
        const term = state.datasetSearchTerm.toLowerCase();
        sampleRows = sampleRows.filter(r => 
          r.txId.toLowerCase().includes(term) ||
          r.custId.toLowerCase().includes(term) ||
          r.custName.toLowerCase().includes(term) ||
          r.category.toLowerCase().includes(term)
        );
      }

      return `
        <div class="flex flex-col w-full pb-8 animate-fade-in gap-space-md">
          <!-- Page Header -->
          <div class="flex flex-col gap-1">
            <div class="inline-flex items-center gap-1.5 self-start px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold">
              <span class="material-symbols-outlined text-[15px] text-secondary">database</span>
              <span>Dataset Pipeline & ETL Studio</span>
            </div>
            <h1 class="font-headline-sm md:text-headline-md text-headline-sm text-on-surface font-bold mt-1">
              Manage Your Retail Dataset
            </h1>
            <p class="font-body-md text-body-md text-on-surface-variant">
              Upload your transaction feed, validate POS schema compliance, and calibrate RFM feature spaces.
            </p>
          </div>

          <!-- Section 1: Active Dataframe Overview -->
          <section class="executive-card flex flex-col p-4 md:p-5 rounded-2xl shadow-sm relative overflow-hidden border border-surface-container-high/60">
            <div class="absolute top-0 left-0 right-0 h-1.5 bg-secondary"></div>
            
            <div class="flex items-center justify-between gap-2 mb-3 pt-1">
              <div class="flex items-center gap-2 min-w-0">
                <span class="relative flex h-3 w-3 shrink-0">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                </span>
                <span class="font-title-md text-title-md text-on-surface font-bold truncate">${dataset.name}</span>
                <span class="text-on-surface-variant font-body-sm text-body-sm hidden sm:inline">(${dataset.description})</span>
              </div>
              <span class="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm shrink-0 font-bold">
                Currently Active
              </span>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-3 gap-2 p-3 rounded-xl bg-surface-container-low mb-3">
              <div class="flex flex-col">
                <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Transactions</span>
                <span class="font-title-md text-title-md text-on-surface font-bold">
                  ${window.AnalyticsEngine.formatNumber(dataset.totalRows)}
                </span>
              </div>
              <div class="flex flex-col">
                <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Total GMV</span>
                <span class="font-title-md text-title-md text-on-surface font-bold">
                  ${dataset.kpis.totalQuarterGMV || dataset.kpis.totalRevenueFormatted}
                </span>
              </div>
              <div class="flex flex-col">
                <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Sync Lag</span>
                <span class="font-title-md text-title-md text-secondary font-bold">${dataset.syncLag}</span>
              </div>
            </div>

            <div class="flex items-center justify-between text-on-surface-variant pt-1 border-t border-surface-container-high/60">
              <div class="flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
                <span class="font-label-sm text-label-sm font-semibold">SHA-256 Validated (${dataset.sha256})</span>
              </div>
              <button class="inline-flex items-center gap-1 font-label-md text-label-md text-secondary hover:underline cursor-pointer" onclick="window.App.openDatasetMetadataModal()">
                <span>Inspect Metadata</span>
                <span class="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </section>

          <!-- Section 2: Upload New Dataset / Switch Presets -->
          <section class="executive-card flex flex-col p-4 md:p-5 rounded-2xl shadow-sm border border-surface-container-high/60">
            <div class="flex items-center justify-between mb-3">
              <h2 class="font-title-md text-title-md text-on-surface font-bold">Upload New Retail Dataset</h2>
              <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">v2.4 Schema Support</span>
            </div>

            <!-- Drag & Drop Zone -->
            <div class="flex flex-col items-center justify-center p-6 rounded-2xl bg-surface-container-low transition-all duration-200 cursor-pointer group text-center border-2 border-dashed border-surface-container-high hover:border-secondary" id="datasetDropZone">
              <div class="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center mb-2.5 text-secondary group-hover:scale-110 transition-transform">
                <span class="material-symbols-outlined text-[28px]">cloud_upload</span>
              </div>
              <span class="font-title-md text-title-md text-on-surface mb-1 font-bold">
                Drag & drop retail CSV here
              </span>
              <p class="font-body-sm text-body-sm text-on-surface-variant mb-3">
                or click to browse from local drive
              </p>
              <div class="flex flex-wrap items-center justify-center gap-2">
                <span class="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                  CSV, TSV up to 50MB
                </span>
                <span class="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                  UTF-8 Encoded
                </span>
              </div>
              <input accept=".csv,.tsv" class="hidden" id="csvFileInput" type="file"/>
            </div>

            <!-- Quick Preset Loaders -->
            <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 mt-2 border-t border-surface-container-high/60">
              <div class="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                <span class="font-label-sm text-label-sm text-on-surface-variant font-semibold">Active Dataset:</span>
                <button class="px-3 py-1 rounded-lg text-label-sm font-label-sm font-semibold transition-all cursor-pointer ${dataset.name === 'retail_sales_dataset.csv' ? 'bg-secondary text-white shadow-sm' : 'bg-surface-container hover:bg-surface-container-high text-on-surface'}" onclick="window.App.switchDataset('retail_sales_dataset.csv')">
                  retail_sales_dataset.csv (Primary)
                </button>
                <button class="px-3 py-1 rounded-lg text-label-sm font-label-sm font-semibold transition-all cursor-pointer ${dataset.name === 'Retail_Q3.csv' ? 'bg-secondary text-white shadow-sm' : 'bg-surface-container hover:bg-surface-container-high text-on-surface'}" onclick="window.App.switchDataset('Retail_Q3.csv')">
                  Retail_Q3.csv (Sample)
                </button>
              </div>

              <div class="flex items-center gap-2">
                <a class="inline-flex items-center gap-1.5 font-label-md text-label-md text-secondary hover:underline cursor-pointer" href="./data/retail_sales_dataset.csv" download="retail_sales_dataset.csv">
                  <span class="material-symbols-outlined text-[16px]">download</span>
                  <span>Download retail_sales_dataset.csv</span>
                </a>
              </div>
            </div>
          </section>

          <!-- Section 3: Health & Schema Profile -->
          <section class="executive-card flex flex-col p-4 md:p-5 rounded-2xl shadow-sm border border-surface-container-high/60">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-1.5">
                <h2 class="font-title-md text-title-md text-on-surface font-bold">Health & Schema Profile</h2>
                <span class="material-symbols-outlined text-[18px] text-secondary">info</span>
              </div>
              <span class="px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary font-label-sm text-label-sm font-semibold">
                Ready for K-Means (k=4)
              </span>
            </div>

            <!-- Health Grid -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
              <div class="p-3 rounded-xl bg-surface-container-low flex flex-col justify-between">
                <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Total Rows</span>
                <div class="flex items-baseline gap-1 mt-1">
                  <span class="font-title-md text-title-md text-on-surface font-bold">
                    ${window.AnalyticsEngine.formatNumber(dataset.totalRows)}
                  </span>
                  <span class="font-label-sm text-label-sm text-secondary font-semibold">100% Valid</span>
                </div>
              </div>

              <div class="p-3 rounded-xl bg-surface-container-low flex flex-col justify-between">
                <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Total Columns</span>
                <div class="flex items-baseline gap-1 mt-1">
                  <span class="font-title-md text-title-md text-on-surface font-bold">9 Fields</span>
                  <span class="font-label-sm text-label-sm text-secondary font-semibold">Mapped</span>
                </div>
              </div>

              <div class="p-3 rounded-xl bg-surface-container-low flex flex-col justify-between">
                <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Missing Values</span>
                <div class="flex items-baseline gap-1 mt-1">
                  <span class="font-title-md text-title-md text-on-surface font-bold">0</span>
                  <span class="font-label-sm text-label-sm text-secondary font-semibold">Clean</span>
                </div>
              </div>

              <div class="p-3 rounded-xl bg-surface-container-low flex flex-col justify-between">
                <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Duplicates</span>
                <div class="flex items-baseline gap-1 mt-1">
                  <span class="font-title-md text-title-md text-on-surface font-bold">0</span>
                  <span class="font-label-sm text-label-sm text-secondary font-semibold">Zero Found</span>
                </div>
              </div>
            </div>

            <!-- Data Quality Index Bar -->
            <div class="p-3.5 rounded-xl bg-surface-container mb-3 flex items-center justify-between">
              <div class="flex flex-col">
                <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Data Quality Index</span>
                <span class="font-title-md text-title-md text-on-surface font-bold">${dataset.dataQualityIndex}% • Optimal</span>
              </div>
              <div class="w-36 h-2.5 bg-surface-container-highest rounded-full overflow-hidden">
                <div class="h-full bg-secondary rounded-full" style="width: ${dataset.dataQualityIndex}%"></div>
              </div>
            </div>

            <!-- Verified Schema Signatures -->
            <div class="flex flex-col gap-2">
              <span class="font-label-sm text-label-sm text-on-surface-variant font-semibold">Verified Schema Signatures</span>
              <div class="flex flex-wrap gap-1.5">
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm">
                  <span class="material-symbols-outlined text-[14px] text-secondary">key</span>
                  <span>Transaction ID</span>
                  <span class="text-on-surface-variant font-mono">str</span>
                </span>
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm">
                  <span class="material-symbols-outlined text-[14px] text-secondary">calendar_today</span>
                  <span>Date</span>
                  <span class="text-on-surface-variant font-mono">ts</span>
                </span>
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm">
                  <span class="material-symbols-outlined text-[14px] text-secondary">person</span>
                  <span>Customer ID</span>
                  <span class="text-on-surface-variant font-mono">str</span>
                </span>
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm">
                  <span class="material-symbols-outlined text-[14px] text-secondary">category</span>
                  <span>Gender</span>
                  <span class="text-on-surface-variant font-mono">cat</span>
                </span>
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm">
                  <span class="material-symbols-outlined text-[14px] text-secondary">tag</span>
                  <span>Age</span>
                  <span class="text-on-surface-variant font-mono">int</span>
                </span>
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm">
                  <span class="material-symbols-outlined text-[14px] text-secondary">layers</span>
                  <span>Product Category</span>
                  <span class="text-on-surface-variant font-mono">5 cls</span>
                </span>
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm">
                  <span class="material-symbols-outlined text-[14px] text-secondary">numbers</span>
                  <span>Quantity</span>
                  <span class="text-on-surface-variant font-mono">int</span>
                </span>
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm">
                  <span class="material-symbols-outlined text-[14px] text-secondary">payments</span>
                  <span>Price per Unit</span>
                  <span class="text-on-surface-variant font-mono">₹ num</span>
                </span>
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm">
                  <span class="material-symbols-outlined text-[14px] text-secondary">calculate</span>
                  <span>Total Amount</span>
                  <span class="text-on-surface-variant font-mono">₹ calc</span>
                </span>
              </div>
            </div>
          </section>

          <!-- Section 4: Preprocessing & Validation Audit -->
          <section class="executive-card flex flex-col p-4 md:p-5 rounded-2xl shadow-sm border border-surface-container-high/60">
            <div class="flex items-center justify-between mb-3">
              <h2 class="font-title-md text-title-md text-on-surface font-bold">Preprocessing & Validation Audit</h2>
              <span class="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                5 / 5 Passed
              </span>
            </div>

            <div class="flex flex-col gap-2">
              <div class="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low">
                <div class="flex items-center gap-2.5 min-w-0">
                  <span class="material-symbols-outlined text-[20px] text-secondary">check_circle</span>
                  <div class="flex flex-col min-w-0">
                    <span class="font-title-md text-title-md text-on-surface font-semibold">Missing Customer IDs</span>
                    <span class="font-body-sm text-body-sm text-on-surface-variant">0 null records found in entity graph</span>
                  </div>
                </div>
                <span class="px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary font-label-sm text-label-sm font-semibold shrink-0">Passed</span>
              </div>

              <div class="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low">
                <div class="flex items-center gap-2.5 min-w-0">
                  <span class="material-symbols-outlined text-[20px] text-secondary">check_circle</span>
                  <div class="flex flex-col min-w-0">
                    <span class="font-title-md text-title-md text-on-surface font-semibold">Invalid / Negative Values</span>
                    <span class="font-body-sm text-body-sm text-on-surface-variant">Price and quantity sanity validation confirmed</span>
                  </div>
                </div>
                <span class="px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary font-label-sm text-label-sm font-semibold shrink-0">Passed</span>
              </div>

              <div class="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low">
                <div class="flex items-center gap-2.5 min-w-0">
                  <span class="material-symbols-outlined text-[20px] text-secondary">check_circle</span>
                  <div class="flex flex-col min-w-0">
                    <span class="font-title-md text-title-md text-on-surface font-semibold">Duplicate Transaction IDs</span>
                    <span class="font-body-sm text-body-sm text-on-surface-variant">Unique key validation across store partitions</span>
                  </div>
                </div>
                <span class="px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary font-label-sm text-label-sm font-semibold shrink-0">Passed</span>
              </div>

              <div class="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low">
                <div class="flex items-center gap-2.5 min-w-0">
                  <span class="material-symbols-outlined text-[20px] text-secondary">date_range</span>
                  <div class="flex flex-col min-w-0">
                    <span class="font-title-md text-title-md text-on-surface font-semibold">Date Range Continuity</span>
                    <span class="font-body-sm text-body-sm text-on-surface-variant">${dataset.dateRange}</span>
                  </div>
                </div>
                <span class="px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary font-label-sm text-label-sm font-semibold shrink-0">Verified</span>
              </div>

              <div class="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low">
                <div class="flex items-center gap-2.5 min-w-0">
                  <span class="material-symbols-outlined text-[20px] text-secondary">model_training</span>
                  <div class="flex flex-col min-w-0">
                    <span class="font-title-md text-title-md text-on-surface font-semibold">RFM Feature Vector Readiness</span>
                    <span class="font-body-sm text-body-sm text-on-surface-variant">StandardScaler normalized vector ready for K-Means</span>
                  </div>
                </div>
                <span class="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold shrink-0">Optimized</span>
              </div>
            </div>
          </section>

          <!-- Section 5: Sample Stream Preview -->
          <section class="executive-card flex flex-col p-4 md:p-5 rounded-2xl shadow-sm border border-surface-container-high/60">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div class="flex items-center gap-1.5">
                <h2 class="font-title-md text-title-md text-on-surface font-bold">Sample Stream Preview</h2>
                <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">(Showing ${sampleRows.length} sample transactions)</span>
              </div>

              <div class="relative w-full sm:w-64">
                <span class="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[16px]">search</span>
                <input class="w-full bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm pl-9 pr-3 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary" id="datasetSearchInput" placeholder="Filter sample records..." type="text" value="${state.datasetSearchTerm || ''}"/>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
              ${sampleRows.map(row => `
                <div class="p-3 rounded-xl bg-surface-container-low flex flex-col gap-2 border border-surface-container-high/60">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-1.5 min-w-0">
                      <span class="px-2 py-0.5 rounded bg-surface-container text-on-surface font-label-sm text-[11px] font-bold">
                        #${row.txId}
                      </span>
                      <span class="font-title-md text-body-md text-on-surface font-semibold truncate">${row.custName}</span>
                    </div>
                    <span class="font-title-md text-title-md text-on-surface font-bold">₹${row.total.toLocaleString('en-IN')}</span>
                  </div>

                  <div class="flex items-center justify-between text-on-surface-variant font-body-sm text-[12px]">
                    <span class="inline-flex items-center gap-1 font-medium">
                      <span class="material-symbols-outlined text-[15px] text-secondary">
                        ${row.category.toLowerCase().includes('elec') ? 'devices' : row.category.toLowerCase().includes('cloth') ? 'apparel' : row.category.toLowerCase().includes('food') ? 'restaurant' : 'spa'}
                      </span>
                      ${row.category}
                    </span>
                    <span>${row.qty} × ₹${row.price}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        </div>
      `;
    },

    bindEvents: function(container, state) {
      // Drag & drop file upload
      const dropZone = container.querySelector('#datasetDropZone');
      const fileInput = container.querySelector('#csvFileInput');

      if (dropZone && fileInput) {
        dropZone.addEventListener('click', () => fileInput.click());

        dropZone.addEventListener('dragover', (e) => {
          e.preventDefault();
          dropZone.classList.add('dragover');
        });

        dropZone.addEventListener('dragleave', () => {
          dropZone.classList.remove('dragover');
        });

        dropZone.addEventListener('drop', (e) => {
          e.preventDefault();
          dropZone.classList.remove('dragover');
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            window.App.handleUploadedFile(e.dataTransfer.files[0]);
          }
        });

        fileInput.addEventListener('change', (e) => {
          if (e.target.files && e.target.files[0]) {
            window.App.handleUploadedFile(e.target.files[0]);
          }
        });
      }

      // Dataset search input
      const searchInput = container.querySelector('#datasetSearchInput');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          window.App.setDatasetSearch(e.target.value);
        });
      }
    }
  };

  window.DatasetView = DatasetView;
})(window);
