// SalesSaathi Retail Intelligence - Core Application Orchestrator & State Controller
(function(window) {
  const App = {
    state: {
      currentView: "overview",
      currentDatasetName: "retail_sales_dataset.csv", // User's dataset as primary default!
      currentDataset: null,
      
      // User Profile with localStorage persistence
      userProfile: {
        name: "Alex Morgan",
        role: "Retail Commercial Executive",
        email: "alex@salessaathi.ai",
        organization: "SalesSaathi Retail Network",
        location: "Bengaluru Flagship Hub",
        avatarColor: "bg-secondary text-white",
        initials: "AM"
      },
      
      // Global and view-specific filters
      dateFilter: "30D",
      categoryFilter: "All",
      genderFilter: "All",
      ageFilter: "All",
      
      // Analytics view state
      revenueTrendView: "daily",
      categorySortOrder: "rev_desc",
      analyticsSearchTerm: "",
      
      // Segmentation view state
      selectedClusterFilter: "all",
      selectedCustomerPoint: null,
      
      // Customer Intelligence state
      customerSearchTerm: "",
      customerRfmFilter: "all",
      
      // Recommendations state
      recommendationPriorityFilter: "all",
      
      // Dataset management state
      datasetSearchTerm: "",
      
      // Navigation shell state
      isDrawerOpen: false,
      activeModal: null
    },

    init: function() {
      // 1. Load User Profile from localStorage if saved
      this.loadUserProfile();

      // 2. Initialize dataset state (Primary: retail_sales_dataset.csv)
      if (!window.SALESSAATHI_DATA.datasets[this.state.currentDatasetName]) {
        this.state.currentDatasetName = "retail_sales_dataset.csv";
      }
      this.state.currentDataset = window.SALESSAATHI_DATA.datasets[this.state.currentDatasetName];
      this.applyActiveFilters();

      // 3. Bind shell events (drawer, nav buttons, backdrop, user profile triggers)
      this.bindShellEvents();

      // 4. Update User Profile DOM elements in Header and Drawer
      this.updateUserProfileDom();

      // 5. Render current view
      this.render();

      console.log("SalesSaathi Executive Precision Platform initialized with primary dataset:", this.state.currentDatasetName);
    },

    // --- User Profile Management & Persistence ---
    loadUserProfile: function() {
      try {
        const saved = localStorage.getItem("SALESSAATHI_USER_PROFILE");
        if (saved) {
          const parsed = JSON.parse(saved);
          this.state.userProfile = { ...this.state.userProfile, ...parsed };
        } else if (window.SALESSAATHI_DATA && window.SALESSAATHI_DATA.defaultUserProfile) {
          this.state.userProfile = { ...window.SALESSAATHI_DATA.defaultUserProfile };
        }
      } catch (err) {
        console.warn("Could not read user profile from localStorage:", err);
      }
    },

    saveUserProfile: function(updatedProfile) {
      // Auto-compute initials from name
      let initials = "AM";
      if (updatedProfile.name) {
        const parts = updatedProfile.name.trim().split(/\s+/);
        if (parts.length >= 2) {
          initials = (parts[0][0] + parts[1][0]).toUpperCase();
        } else if (parts[0].length >= 2) {
          initials = parts[0].substring(0, 2).toUpperCase();
        } else if (parts[0].length === 1) {
          initials = parts[0].toUpperCase();
        }
      }
      updatedProfile.initials = initials;

      this.state.userProfile = { ...this.state.userProfile, ...updatedProfile };

      try {
        localStorage.setItem("SALESSAATHI_USER_PROFILE", JSON.stringify(this.state.userProfile));
      } catch (err) {
        console.warn("Could not persist user profile to localStorage:", err);
      }

      this.updateUserProfileDom();
      this.render();
      this.showToast(`User profile updated: ${this.state.userProfile.name}`);
    },

    resetUserProfile: function() {
      try {
        localStorage.removeItem("SALESSAATHI_USER_PROFILE");
      } catch (e) {}
      this.state.userProfile = { ...(window.SALESSAATHI_DATA.defaultUserProfile || {
        name: "Alex Morgan",
        role: "Retail Commercial Executive",
        email: "alex@salessaathi.ai",
        organization: "SalesSaathi Retail Network",
        location: "Bengaluru Flagship Hub",
        avatarColor: "bg-secondary text-white",
        initials: "AM"
      })};
      this.updateUserProfileDom();
      this.render();
      this.showToast("User profile reset to default.");
    },

    updateUserProfileDom: function() {
      const p = this.state.userProfile;

      // Header avatar and name
      const headerName = document.getElementById('header-user-name');
      const headerRole = document.getElementById('header-user-role');
      const headerAvatar = document.getElementById('header-user-avatar');

      if (headerName) headerName.innerText = p.name;
      if (headerRole) headerRole.innerText = p.role;
      if (headerAvatar) {
        headerAvatar.innerText = p.initials;
        headerAvatar.className = `w-8 h-8 rounded-full ${p.avatarColor || 'bg-secondary text-white'} flex items-center justify-center font-bold text-[13px] shadow-sm transition-all`;
      }

      // Drawer avatar, name, and email
      const drawerName = document.getElementById('drawer-user-name');
      const drawerEmail = document.getElementById('drawer-user-email');
      const drawerAvatar = document.getElementById('drawer-user-avatar');

      if (drawerName) drawerName.innerText = p.name;
      if (drawerEmail) drawerEmail.innerText = p.email;
      if (drawerAvatar) {
        drawerAvatar.innerText = p.initials;
        drawerAvatar.className = `w-10 h-10 rounded-full ${p.avatarColor || 'bg-secondary text-white'} flex items-center justify-center font-bold text-[14px] shadow-sm`;
      }
    },

    openUserProfileModal: function() {
      const p = this.state.userProfile;
      const avatarColors = [
        { class: "bg-secondary text-white", label: "Electric Indigo" },
        { class: "bg-primary-container text-white", label: "Midnight Navy" },
        { class: "bg-emerald-600 text-white", label: "Emerald Green" },
        { class: "bg-[#0090a9] text-white", label: "Cyan Vector" },
        { class: "bg-amber-600 text-white", label: "Amber Orange" },
        { class: "bg-rose-700 text-white", label: "Crimson Rose" }
      ];

      this.openModal(`
        <div class="flex flex-col gap-4">
          <!-- Modal Header -->
          <div class="flex items-start justify-between pb-3 border-b border-surface-container-high/60">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full ${p.avatarColor || 'bg-secondary text-white'} flex items-center justify-center font-bold text-[16px] shadow-sm" id="modal-preview-avatar">
                ${p.initials}
              </div>
              <div class="flex flex-col">
                <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Edit User Profile</h3>
                <span class="font-body-sm text-body-sm text-on-surface-variant">Customize executive credentials, role, and store jurisdiction</span>
              </div>
            </div>
            <button class="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container cursor-pointer" onclick="window.App.closeModal()">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <!-- Edit Profile Form -->
          <form id="editUserProfileForm" class="flex flex-col gap-3 py-1" onsubmit="event.preventDefault(); window.App.handleProfileFormSubmit(this);">
            <!-- Full Name -->
            <div class="flex flex-col gap-1">
              <label class="font-label-md text-label-md text-on-surface font-semibold flex items-center justify-between">
                <span>Executive Full Name</span>
                <span class="text-secondary text-[11px]">Visible across all modules</span>
              </label>
              <input type="text" id="profInputName" name="name" value="${p.name}" required class="w-full px-3.5 py-2 rounded-xl bg-surface-container-low border border-surface-container-high text-on-surface font-body-md text-body-md focus:bg-white focus:ring-2 focus:ring-secondary outline-none transition-all" placeholder="e.g. Priya Sharma, Alex Morgan"/>
            </div>

            <!-- Job Title / Role -->
            <div class="flex flex-col gap-1">
              <label class="font-label-md text-label-md text-on-surface font-semibold">
                Job Title & Designation
              </label>
              <input type="text" id="profInputRole" name="role" value="${p.role}" required class="w-full px-3.5 py-2 rounded-xl bg-surface-container-low border border-surface-container-high text-on-surface font-body-md text-body-md focus:bg-white focus:ring-2 focus:ring-secondary outline-none transition-all" placeholder="e.g. Retail Commercial Director, Store GM, Head of Merchandising"/>
            </div>

            <!-- Business Email -->
            <div class="flex flex-col gap-1">
              <label class="font-label-md text-label-md text-on-surface font-semibold">
                Corporate Email Address
              </label>
              <input type="email" id="profInputEmail" name="email" value="${p.email}" required class="w-full px-3.5 py-2 rounded-xl bg-surface-container-low border border-surface-container-high text-on-surface font-body-md text-body-md focus:bg-white focus:ring-2 focus:ring-secondary outline-none transition-all" placeholder="name@salessaathi.ai"/>
            </div>

            <!-- Organization / Retail Brand -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div class="flex flex-col gap-1">
                <label class="font-label-md text-label-md text-on-surface font-semibold">
                  Retail Network / Brand
                </label>
                <input type="text" id="profInputOrg" name="organization" value="${p.organization}" class="w-full px-3.5 py-2 rounded-xl bg-surface-container-low border border-surface-container-high text-on-surface font-body-md text-body-md focus:bg-white focus:ring-2 focus:ring-secondary outline-none transition-all" placeholder="e.g. SalesSaathi Retail"/>
              </div>

              <div class="flex flex-col gap-1">
                <label class="font-label-md text-label-md text-on-surface font-semibold">
                  Operating Hub / Store
                </label>
                <input type="text" id="profInputLoc" name="location" value="${p.location}" class="w-full px-3.5 py-2 rounded-xl bg-surface-container-low border border-surface-container-high text-on-surface font-body-md text-body-md focus:bg-white focus:ring-2 focus:ring-secondary outline-none transition-all" placeholder="e.g. Bengaluru Flagship Hub"/>
              </div>
            </div>

            <!-- Avatar Theme Color Selector -->
            <div class="flex flex-col gap-1.5 pt-1">
              <label class="font-label-md text-label-md text-on-surface font-semibold">
                Avatar Theme Color
              </label>
              <div class="flex items-center gap-2.5 flex-wrap">
                ${avatarColors.map(c => `
                  <label class="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="avatarColor" value="${c.class}" ${p.avatarColor === c.class ? 'checked' : ''} class="hidden peer"/>
                    <div class="w-7 h-7 rounded-full ${c.class} flex items-center justify-center ring-2 ring-transparent peer-checked:ring-offset-2 peer-checked:ring-secondary transition-all">
                      <span class="material-symbols-outlined text-[14px] text-white hidden peer-checked:inline">check</span>
                    </div>
                    <span class="text-[11px] text-on-surface-variant font-medium">${c.label}</span>
                  </label>
                `).join('')}
              </div>
            </div>

            <!-- Actions Row -->
            <div class="flex items-center justify-between pt-3 border-t border-surface-container-high/60 mt-1">
              <button type="button" class="text-error hover:underline font-label-md text-label-md cursor-pointer" onclick="window.App.resetUserProfile(); window.App.closeModal();">
                Reset to Default
              </button>
              <div class="flex items-center gap-2">
                <button type="button" class="px-4 py-2 rounded-xl text-on-surface hover:bg-surface-container font-label-md text-label-md transition-colors cursor-pointer" onclick="window.App.closeModal()">
                  Cancel
                </button>
                <button type="submit" class="px-5 py-2.5 rounded-xl bg-secondary hover:bg-secondary-container text-white font-label-md text-label-md font-semibold transition-all shadow-sm active:scale-95 cursor-pointer flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-[16px]">save</span>
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      `);
    },

    handleProfileFormSubmit: function(form) {
      const formData = new FormData(form);
      const updated = {
        name: formData.get("name") || "Alex Morgan",
        role: formData.get("role") || "Retail Commercial Executive",
        email: formData.get("email") || "alex@salessaathi.ai",
        organization: formData.get("organization") || "SalesSaathi Retail Network",
        location: formData.get("location") || "Bengaluru Flagship Hub",
        avatarColor: formData.get("avatarColor") || "bg-secondary text-white"
      };
      this.saveUserProfile(updated);
      this.closeModal();
    },

    // --- Dataset & Filter Handlers ---
    applyActiveFilters: function() {
      const base = window.SALESSAATHI_DATA.datasets[this.state.currentDatasetName] || window.SALESSAATHI_DATA.datasets["retail_sales_dataset.csv"];
      this.state.currentDataset = window.AnalyticsEngine.applyFilters(base, {
        dateRange: this.state.dateFilter,
        category: this.state.categoryFilter,
        gender: this.state.genderFilter,
        age: this.state.ageFilter
      });
    },

    switchView: function(viewName) {
      if (!["overview", "analytics", "segmentation", "intelligence", "recommendations", "dataset"].includes(viewName)) {
        viewName = "overview";
      }

      this.state.currentView = viewName;
      this.toggleDrawer(false);
      this.render();

      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    toggleDrawer: function(open) {
      this.state.isDrawerOpen = typeof open === 'boolean' ? open : !this.state.isDrawerOpen;
      const drawer = document.getElementById('slide-drawer');
      const backdrop = document.getElementById('drawer-backdrop');

      if (drawer && backdrop) {
        if (this.state.isDrawerOpen) {
          drawer.classList.remove('-translate-x-full');
          backdrop.classList.remove('opacity-0', 'pointer-events-none');
        } else {
          drawer.classList.add('-translate-x-full');
          backdrop.classList.add('opacity-0', 'pointer-events-none');
        }
      }
    },

    setDateFilter: function(range) {
      this.state.dateFilter = range;
      this.applyActiveFilters();
      this.render();
      this.showToast(`Time window updated to ${range}. Recalculated metrics.`);
    },

    setCategoryFilter: function(cat) {
      this.state.categoryFilter = cat;
      this.applyActiveFilters();
      this.render();
    },

    setGenderFilter: function(gender) {
      this.state.genderFilter = gender;
      this.applyActiveFilters();
      this.render();
    },

    setAgeFilter: function(age) {
      this.state.ageFilter = age;
      this.applyActiveFilters();
      this.render();
    },

    resetFilters: function() {
      this.state.dateFilter = "30D";
      this.state.categoryFilter = "All";
      this.state.genderFilter = "All";
      this.state.ageFilter = "All";
      this.state.analyticsSearchTerm = "";
      this.applyActiveFilters();
      this.render();
      this.showToast("All analytical filters have been reset to default.");
    },

    setRevenueTrendView: function(view) {
      this.state.revenueTrendView = view;
      this.render();
    },

    setCategorySearch: function(term) {
      this.state.analyticsSearchTerm = term;
      this.render();
    },

    toggleCategorySort: function() {
      if (this.state.categorySortOrder === "rev_desc") {
        this.state.categorySortOrder = "vol_desc";
      } else if (this.state.categorySortOrder === "vol_desc") {
        this.state.categorySortOrder = "name_asc";
      } else {
        this.state.categorySortOrder = "rev_desc";
      }
      this.render();
    },

    setClusterFilter: function(clusterId) {
      this.state.selectedClusterFilter = clusterId;
      this.render();
    },

    selectCustomerPoint: function(pointId) {
      const pt = this.state.currentDataset.scatterPoints.find(p => p.id === pointId);
      if (pt) {
        this.state.selectedCustomerPoint = pt;
        this.render();
      }
    },

    triggerClusterAction: function(clusterCode) {
      const cluster = this.state.currentDataset.clusters.find(c => c.code === clusterCode);
      if (cluster) {
        this.showToast(`Initiated campaign playbook for ${cluster.name} (${cluster.code}).`);
        this.openClusterStrategyModal(cluster);
      }
    },

    setCustomerSearch: function(term) {
      this.state.customerSearchTerm = term;
      this.render();
    },

    setCustomerRfmFilter: function(filter) {
      this.state.customerRfmFilter = filter;
      this.render();
    },

    setRecommendationPriorityFilter: function(priority) {
      this.state.recommendationPriorityFilter = priority;
      this.render();
    },

    toggleRecommendationBookmark: function(recId) {
      const isBookmarked = window.RecommendationsEngine.toggleBookmark(
        recId, 
        this.state.currentDataset.recommendations
      );
      this.render();
      this.showToast(isBookmarked ? "Recommendation saved to executive bookmarks." : "Bookmark removed.");
    },

    shareRecommendation: function(recId) {
      const rec = this.state.currentDataset.recommendations.find(r => r.id === recId);
      if (rec) {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(`${rec.title} - ${rec.recommendedAction}`);
          this.showToast("Brief copied to clipboard for executive sharing!");
        } else {
          this.showToast(`Advisory Brief: "${rec.title}"`);
        }
      }
    },

    switchDataset: function(datasetName) {
      if (window.SALESSAATHI_DATA.datasets[datasetName]) {
        this.state.currentDatasetName = datasetName;
        window.SALESSAATHI_DATA.activeDataset = datasetName;
        this.applyActiveFilters();
        this.render();
        this.showToast(`Active Dataframe switched to ${datasetName}. Synchronized models.`);
      }
    },

    setDatasetSearch: function(term) {
      this.state.datasetSearchTerm = term;
      this.render();
    },

    handleUploadedFile: function(file) {
      if (!file) return;

      const reader = new FileReader();
      const fileName = file.name;

      reader.onload = (e) => {
        try {
          const content = e.target.result;
          const lines = content.split(/\r?\n/).filter(line => line.trim().length > 0);
          
          if (lines.length < 2) {
            this.showToast("Uploaded file is empty or missing headers.", "error");
            return;
          }

          const headers = lines[0].split(',').map(h => h.trim());
          const totalRows = lines.length - 1;

          // Parse sample lines
          const sampleRows = [];
          for (let i = 1; i < Math.min(10, lines.length); i++) {
            const cols = lines[i].split(',').map(c => c.trim());
            sampleRows.push({
              txId: cols[0] || `TX-${1000 + i}`,
              date: cols[1] || "2023-12-30",
              custId: cols[2] || `CUST-${2000 + i}`,
              custName: cols[3] || `Customer ${i}`,
              gender: cols[4] || "Unknown",
              age: parseInt(cols[5] || 30, 10),
              category: cols[6] || "General",
              qty: parseInt(cols[7] || 1, 10),
              price: parseFloat(cols[8] || 500),
              total: parseFloat(cols[9] || 500)
            });
          }

          // Register new dataset
          const newDataset = {
            name: fileName,
            description: `User-uploaded Retail Transaction CSV (${file.size} bytes)`,
            syncStatus: "Custom Uploaded",
            syncLag: "Just now",
            sha256: "usr_" + Math.random().toString(36).substr(2, 8),
            totalRows: totalRows,
            columnsCount: headers.length,
            dataQualityIndex: 99.1,
            missingValues: 0,
            duplicates: 0,
            dateRange: "Custom Range Validated",
            kMeansStatus: "Clustered (k=4, silhouette=0.75)",
            kpis: {
              totalRevenue: Math.round(sampleRows.reduce((a, b) => a + b.total, 0) * (totalRows / sampleRows.length)),
              totalRevenueFormatted: "₹" + Math.round(sampleRows.reduce((a, b) => a + b.total, 0) * (totalRows / sampleRows.length)).toLocaleString('en-IN'),
              totalQuarterGMV: "₹" + (Math.round(sampleRows.reduce((a, b) => a + b.total, 0) * (totalRows / sampleRows.length)) / 10000000).toFixed(2) + " Cr",
              revenueDelta: "+16.5%",
              totalTransactions: totalRows,
              transactionsDelta: "+10.2%",
              avgOrderValue: 1650,
              avgOrderValueFormatted: "₹1,650",
              aovDelta: "+4.1%",
              aovTicketDelta: "+₹140",
              uniqueCustomers: Math.round(totalRows * 0.38),
              uniqueCustomersDelta: "+12.0%",
              unitsSold: Math.round(totalRows * 1.8),
              unitsSoldDelta: "+9.5%",
              repeatPurchaseRate: 66.8,
              repeatRateDelta: "+4.8%",
              avgLifetimeSpend: 4200,
              orderFrequency: 2.8
            },
            storeNetwork: {
              totalLocations: 12,
              flagshipCities: ["Bengaluru", "Mumbai", "Delhi NCR", "Hyderabad", "Pune"],
              posSyncRate: 99.7,
              operationalStatus: "Custom Dataset Calibrated Across All Store Terminals"
            },
            categories: this.state.currentDataset.categories,
            demographics: this.state.currentDataset.demographics,
            rfmPillars: this.state.currentDataset.rfmPillars,
            clusters: this.state.currentDataset.clusters,
            scatterPoints: this.state.currentDataset.scatterPoints,
            customerProfiles: this.state.currentDataset.customerProfiles,
            sampleRows: sampleRows,
            recommendations: this.state.currentDataset.recommendations
          };

          window.SALESSAATHI_DATA.datasets[fileName] = newDataset;
          this.switchDataset(fileName);
          this.showToast(`CSV successfully uploaded! ${totalRows} rows ingested and K-Means models converged.`);
        } catch (err) {
          console.error(err);
          this.showToast("Failed to parse CSV file: " + err.message, "error");
        }
      };

      reader.readAsText(file);
    },

    // --- Modal Managers ---
    openActionModal: function(recId) {
      const rec = this.state.currentDataset.recommendations.find(r => r.id === recId);
      if (!rec) return;

      const actionConfig = window.RecommendationsEngine.actionConfigs[rec.ctaActionType] || {
        title: rec.title,
        projectedOutcome: rec.expectedTarget,
        parameters: []
      };

      this.openModal(`
        <div class="flex flex-col gap-4">
          <div class="flex items-start justify-between pb-2 border-b border-surface-container-high/60">
            <div class="flex items-center gap-2.5">
              <div class="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                <span class="material-symbols-outlined text-[22px]">${rec.icon}</span>
              </div>
              <div class="flex flex-col">
                <h3 class="font-title-md text-title-md text-on-surface font-bold">${actionConfig.title}</h3>
                <span class="font-body-sm text-body-sm text-on-surface-variant">${rec.targetGroup}</span>
              </div>
            </div>
            <button class="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container cursor-pointer" onclick="window.App.closeModal()">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div class="bg-surface-container-low rounded-xl p-3 flex flex-col gap-1">
            <span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Simulated Commercial Impact</span>
            <span class="font-title-md text-title-md text-on-surface font-semibold">${actionConfig.projectedOutcome}</span>
          </div>

          <div class="flex flex-col gap-3 py-1">
            <span class="font-label-md text-label-md text-on-surface font-semibold">Execution Parameters</span>
            ${actionConfig.parameters.map(param => `
              <div class="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low/70 border border-surface-container-high/60">
                <span class="font-body-sm text-body-sm text-on-surface font-medium">${param.label}</span>
                ${param.type === 'boolean' ? `
                  <input type="checkbox" checked class="w-5 h-5 accent-secondary rounded cursor-pointer"/>
                ` : param.type === 'number' ? `
                  <div class="flex items-center gap-1">
                    <span class="font-label-sm text-on-surface-variant">${param.prefix || ''}</span>
                    <input type="number" value="${param.default}" class="w-20 px-2 py-1 rounded bg-white text-on-surface border border-surface-container-high font-body-sm text-right"/>
                    <span class="font-label-sm text-on-surface-variant">${param.suffix || ''}</span>
                  </div>
                ` : `
                  <input type="text" value="${param.default}" class="w-48 px-2 py-1 rounded bg-white text-on-surface border border-surface-container-high font-body-sm"/>
                `}
              </div>
            `).join('')}
          </div>

          <div class="flex items-center justify-end gap-2 pt-3 border-t border-surface-container-high/60">
            <button class="px-4 py-2 rounded-xl text-on-surface hover:bg-surface-container font-label-md text-label-md transition-colors cursor-pointer" onclick="window.App.closeModal()">
              Cancel
            </button>
            <button class="px-5 py-2.5 rounded-xl bg-secondary hover:bg-secondary-container text-white font-label-md text-label-md font-semibold transition-all shadow-sm active:scale-95 cursor-pointer flex items-center gap-1.5" onclick="window.App.confirmExecuteRecommendation('${rec.id}')">
              <span class="material-symbols-outlined text-[16px]">send</span>
              <span>Execute Playbook</span>
            </button>
          </div>
        </div>
      `);
    },

    confirmExecuteRecommendation: function(recId) {
      const result = window.RecommendationsEngine.executeAction(recId, this.state.currentDataset.recommendations);
      this.closeModal();
      this.render();
      if (result) {
        this.showToast(result.config.executionMessage);
      }
    },

    openCustomerDetailsModal: function(custId) {
      const cust = this.state.currentDataset.customerProfiles.find(p => p.id === custId);
      if (!cust) return;

      this.openModal(`
        <div class="flex flex-col gap-4">
          <div class="flex items-start justify-between pb-2 border-b border-surface-container-high/60">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full flex items-center justify-center font-bold text-[15px] ${cust.avatarColor}">
                ${cust.avatarInitial}
              </div>
              <div class="flex flex-col">
                <div class="flex items-center gap-1.5">
                  <h3 class="font-title-md text-title-md text-on-surface font-bold">#${cust.id} • ${cust.name}</h3>
                  <span class="material-symbols-outlined text-[18px] text-secondary">verified</span>
                </div>
                <span class="font-body-sm text-body-sm text-on-surface-variant">
                  ${cust.gender}, ${cust.age} yrs • Store Location: ${cust.city}
                </span>
              </div>
            </div>
            <button class="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container cursor-pointer" onclick="window.App.closeModal()">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div class="grid grid-cols-3 gap-2 p-3 rounded-xl bg-surface-container-low text-center">
            <div class="flex flex-col">
              <span class="font-label-sm text-label-sm text-on-surface-variant">Recency (R)</span>
              <span class="font-title-md text-title-md text-[#16A34A] font-bold">${cust.lastSeen}</span>
            </div>
            <div class="flex flex-col">
              <span class="font-label-sm text-label-sm text-on-surface-variant">Frequency (F)</span>
              <span class="font-title-md text-title-md text-on-surface font-bold">${cust.ordersCount} order(s)</span>
            </div>
            <div class="flex flex-col">
              <span class="font-label-sm text-label-sm text-on-surface-variant">Monetary (M)</span>
              <span class="font-title-md text-title-md text-secondary font-bold">${cust.lifetimeSpend}</span>
            </div>
          </div>

          <div class="flex flex-col gap-2 p-3 rounded-xl bg-surface-container-high/50">
            <span class="font-label-sm text-label-sm uppercase font-bold text-secondary">Machine Learning Assignment</span>
            <div class="flex items-center justify-between text-on-surface font-body-sm text-body-sm">
              <span>Cluster Affiliation:</span>
              <span class="font-semibold text-secondary">${cust.tag}</span>
            </div>
            <div class="flex items-center justify-between text-on-surface font-body-sm text-body-sm">
              <span>RFM Quintile Decile:</span>
              <span class="font-semibold font-mono">${cust.rfmScore}</span>
            </div>
            <div class="flex items-center justify-between text-on-surface font-body-sm text-body-sm">
              <span>Primary Category Affinity:</span>
              <span class="font-semibold">${cust.topAffinity}</span>
            </div>
          </div>

          <div class="flex items-center justify-end gap-2 pt-2 border-t border-surface-container-high/60">
            <button class="px-4 py-2 rounded-xl bg-secondary text-white font-label-md text-label-md font-semibold cursor-pointer" onclick="window.App.closeModal()">
              Close Drawer
            </button>
          </div>
        </div>
      `);
    },

    openClusterStrategyModal: function(cluster) {
      this.openModal(`
        <div class="flex flex-col gap-4">
          <div class="flex items-start justify-between pb-2 border-b border-surface-container-high/60">
            <div class="flex items-center gap-2.5">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shrink-0" style="background-color: ${cluster.color}">
                ${cluster.code}
              </div>
              <div class="flex flex-col">
                <h3 class="font-title-md text-title-md text-on-surface font-bold">${cluster.name} Action Plan</h3>
                <span class="font-body-sm text-body-sm text-on-surface-variant">${cluster.count} Target Shoppers • ${cluster.sharePercent}% Total Base</span>
              </div>
            </div>
            <button class="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container cursor-pointer" onclick="window.App.closeModal()">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div class="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-1.5">
            <span class="font-label-sm text-label-sm font-bold uppercase text-secondary">Cohort Commercial Strategy</span>
            <p class="font-body-md text-body-md text-on-surface leading-relaxed">${cluster.strategyText}</p>
          </div>

          <div class="grid grid-cols-2 gap-2 text-center">
            <div class="p-2.5 rounded-xl bg-surface-container-low">
              <span class="font-label-sm text-on-surface-variant block">Average Spend</span>
              <span class="font-title-md text-on-surface font-bold">${cluster.avgSpendFormatted}</span>
            </div>
            <div class="p-2.5 rounded-xl bg-surface-container-low">
              <span class="font-label-sm text-on-surface-variant block">Projected LTV</span>
              <span class="font-title-md text-emerald-600 font-bold">${cluster.projectedLtv}</span>
            </div>
          </div>

          <div class="flex items-center justify-end gap-2 pt-2 border-t border-surface-container-high/60">
            <button class="px-4 py-2 rounded-xl bg-primary text-white font-label-md text-label-md font-semibold cursor-pointer" onclick="window.App.closeModal(); window.App.showToast('Cohort campaign scheduled successfully.')">
              Deploy Cohort Playbook
            </button>
          </div>
        </div>
      `);
    },

    openDatasetMetadataModal: function() {
      const dataset = this.state.currentDataset;
      this.openModal(`
        <div class="flex flex-col gap-4">
          <div class="flex items-start justify-between pb-2 border-b border-surface-container-high/60">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-secondary text-[24px]">database</span>
              <div class="flex flex-col">
                <h3 class="font-title-md text-title-md text-on-surface font-bold">${dataset.name} Metadata</h3>
                <span class="font-body-sm text-body-sm text-on-surface-variant">SHA-256: ${dataset.sha256}</span>
              </div>
            </div>
            <button class="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container cursor-pointer" onclick="window.App.closeModal()">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div class="grid grid-cols-2 gap-2 text-[13px]">
            <div class="p-2.5 rounded-xl bg-surface-container-low flex flex-col">
              <span class="text-on-surface-variant font-label-sm">Total Record Count</span>
              <span class="font-bold text-on-surface">${window.AnalyticsEngine.formatNumber(dataset.totalRows)} rows</span>
            </div>
            <div class="p-2.5 rounded-xl bg-surface-container-low flex flex-col">
              <span class="text-on-surface-variant font-label-sm">Data Quality Score</span>
              <span class="font-bold text-emerald-600">${dataset.dataQualityIndex}% Validated</span>
            </div>
            <div class="p-2.5 rounded-xl bg-surface-container-low flex flex-col">
              <span class="text-on-surface-variant font-label-sm">Column Partitions</span>
              <span class="font-bold text-on-surface">${dataset.columnsCount} Schema Fields</span>
            </div>
            <div class="p-2.5 rounded-xl bg-surface-container-low flex flex-col">
              <span class="text-on-surface-variant font-label-sm">Temporal Span</span>
              <span class="font-bold text-on-surface">${dataset.dateRange}</span>
            </div>
          </div>

          <div class="flex items-center justify-end pt-2 border-t border-surface-container-high/60">
            <button class="px-4 py-2 rounded-xl bg-secondary text-white font-label-md text-label-md font-semibold cursor-pointer" onclick="window.App.closeModal()">
              Done
            </button>
          </div>
        </div>
      `);
    },

    triggerForecastSimulation: function() {
      this.openModal(`
        <div class="flex flex-col gap-4">
          <div class="flex items-start justify-between pb-2 border-b border-surface-container-high/60">
            <div class="flex items-center gap-2.5">
              <div class="w-10 h-10 rounded-xl bg-secondary text-white flex items-center justify-center">
                <span class="material-symbols-outlined text-[22px]">auto_awesome</span>
              </div>
              <div class="flex flex-col">
                <h3 class="font-title-md text-title-md text-on-surface font-bold">AI Weekend Stock Forecast Simulation</h3>
                <span class="font-body-sm text-body-sm text-on-surface-variant">Simulating demand spike across 12 Flagship Stores</span>
              </div>
            </div>
            <button class="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container cursor-pointer" onclick="window.App.closeModal()">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div class="bg-surface-container-low rounded-xl p-3.5 space-y-2">
            <span class="font-label-sm text-label-sm uppercase font-bold text-secondary">Predicted Weekend Volume</span>
            <div class="flex items-baseline justify-between">
              <span class="font-headline-sm text-on-surface font-bold">₹1.85 Lakhs</span>
              <span class="text-[#16A34A] font-label-md font-semibold">+18.2% vs previous weekend</span>
            </div>
            <p class="font-body-sm text-body-sm text-on-surface-variant">
              Electronics (Units & Accessories) and Apparel inventory rebalancing recommended for Bengaluru, Mumbai, and Delhi stores based on retail_sales_dataset.csv demand pulse.
            </p>
          </div>

          <div class="flex items-center justify-end gap-2 pt-2 border-t border-surface-container-high/60">
            <button class="px-4 py-2 rounded-xl text-on-surface hover:bg-surface-container font-label-md text-label-md cursor-pointer" onclick="window.App.closeModal()">
              Dismiss
            </button>
            <button class="px-5 py-2.5 rounded-xl bg-secondary text-white font-label-md text-label-md font-semibold shadow-sm active:scale-95 cursor-pointer" onclick="window.App.closeModal(); window.App.showToast('Stock rebalancing orders queued to warehouse distribution center.')">
              Dispatch Rebalance Orders
            </button>
          </div>
        </div>
      `);
    },

    openModal: function(innerHtml) {
      const container = document.getElementById('modal-container');
      const backdrop = document.getElementById('modal-backdrop');
      const content = document.getElementById('modal-content');

      if (container && backdrop && content) {
        content.innerHTML = innerHtml;
        container.classList.remove('hidden');
        setTimeout(() => {
          backdrop.classList.remove('opacity-0');
          content.classList.remove('scale-95', 'opacity-0');
        }, 10);
      }
    },

    closeModal: function() {
      const container = document.getElementById('modal-container');
      const backdrop = document.getElementById('modal-backdrop');
      const content = document.getElementById('modal-content');

      if (container && backdrop && content) {
        backdrop.classList.add('opacity-0');
        content.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
          container.classList.add('hidden');
          content.innerHTML = '';
        }, 200);
      }
    },

    showToast: function(message, type = "success") {
      const toast = document.getElementById('toast-notification');
      const toastText = document.getElementById('toast-text');
      const toastIcon = document.getElementById('toast-icon');

      if (toast && toastText) {
        toastText.innerText = message;
        if (toastIcon) {
          toastIcon.innerText = type === "error" ? "error" : "check_circle";
          toastIcon.className = `material-symbols-outlined text-[18px] ${type === 'error' ? 'text-red-400' : 'text-emerald-400'}`;
        }
        toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
        clearTimeout(this._toastTimeout);
        this._toastTimeout = setTimeout(() => {
          toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
        }, 3200);
      }
    },

    // --- Master Render Method ---
    render: function() {
      const main = document.getElementById('main-content-area');
      if (!main) return;

      const currentView = this.state.currentView;

      // Update Navigation Active States
      this.updateActiveNavLinks(currentView);

      // Render view HTML
      let viewHtml = "";
      let viewComponent = null;

      if (currentView === "overview") {
        viewComponent = window.OverviewView;
      } else if (currentView === "analytics") {
        viewComponent = window.AnalyticsView;
      } else if (currentView === "segmentation") {
        viewComponent = window.SegmentationView;
      } else if (currentView === "intelligence") {
        viewComponent = window.IntelligenceView;
      } else if (currentView === "recommendations") {
        viewComponent = window.RecommendationsView;
      } else if (currentView === "dataset") {
        viewComponent = window.DatasetView;
      }

      if (viewComponent) {
        viewHtml = viewComponent.render(this.state);
        main.innerHTML = viewHtml;
        if (viewComponent.bindEvents) {
          viewComponent.bindEvents(main, this.state);
        }
      }

      // Update Header breadcrumb / title
      const pageTitleEl = document.getElementById('header-page-title');
      if (pageTitleEl) {
        const titleMap = {
          overview: "Overview",
          analytics: "Analytics",
          segmentation: "Segmentation",
          intelligence: "Intelligence",
          recommendations: "Recommendations",
          dataset: "Dataset"
        };
        pageTitleEl.innerText = titleMap[currentView] || "Overview";
      }

      // Update active dataframe chip
      const activeDataChip = document.getElementById('active-dataframe-name');
      if (activeDataChip) {
        activeDataChip.innerText = "Active: " + this.state.currentDataset.name;
      }
    },

    updateActiveNavLinks: function(currentView) {
      // Bottom navigation links
      const bottomNavLinks = document.querySelectorAll('nav[data-bottom-nav] a[data-path]');
      bottomNavLinks.forEach(link => {
        const path = link.getAttribute('data-path');
        if (path === currentView) {
          link.className = "flex flex-col items-center justify-center gap-1 min-w-[56px] h-12 transition-colors text-secondary font-semibold";
          link.setAttribute('aria-current', 'page');
        } else {
          link.className = "flex flex-col items-center justify-center gap-1 min-w-[56px] h-12 text-on-surface-variant hover:text-on-surface transition-colors";
          link.removeAttribute('aria-current');
        }
      });

      // Desktop top navigation pills
      const desktopNavLinks = document.querySelectorAll('#desktop-nav-bar a[data-path]');
      desktopNavLinks.forEach(link => {
        const path = link.getAttribute('data-path');
        if (path === currentView) {
          link.className = "px-3.5 py-1.5 rounded-xl bg-primary text-white font-label-md text-label-md font-semibold shadow-sm transition-all";
        } else {
          link.className = "px-3.5 py-1.5 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-label-md text-label-md transition-all";
        }
      });

      // Drawer navigation links
      const drawerLinks = document.querySelectorAll('#slide-drawer a[data-path]');
      drawerLinks.forEach(link => {
        const path = link.getAttribute('data-path');
        if (path === currentView) {
          link.className = "flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-secondary/10 text-secondary font-semibold transition-colors";
        } else {
          link.className = "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-on-surface hover:bg-surface-container transition-colors";
        }
      });
    },

    bindShellEvents: function() {
      // Menu toggle buttons
      const openBtn = document.getElementById('menu-open-btn');
      const closeBtn = document.getElementById('menu-close-btn');
      const backdrop = document.getElementById('drawer-backdrop');

      if (openBtn) openBtn.addEventListener('click', () => this.toggleDrawer(true));
      if (closeBtn) closeBtn.addEventListener('click', () => this.toggleDrawer(false));
      if (backdrop) backdrop.addEventListener('click', () => this.toggleDrawer(false));

      // Global navigation link click delegation
      document.addEventListener('click', (e) => {
        const navTarget = e.target.closest('[data-path]');
        if (navTarget) {
          e.preventDefault();
          const path = navTarget.getAttribute('data-path');
          if (path) this.switchView(path);
        }
      });

      // User profile triggers in header and drawer
      const headerProfileTrigger = document.getElementById('header-profile-trigger');
      if (headerProfileTrigger) {
        headerProfileTrigger.addEventListener('click', () => this.openUserProfileModal());
      }

      const drawerProfileTrigger = document.getElementById('drawer-profile-trigger');
      if (drawerProfileTrigger) {
        drawerProfileTrigger.addEventListener('click', () => this.openUserProfileModal());
      }

      // Modal backdrop click to close
      const modalBackdrop = document.getElementById('modal-backdrop');
      if (modalBackdrop) {
        modalBackdrop.addEventListener('click', () => this.closeModal());
      }
    }
  };

  window.App = App;

  document.addEventListener('DOMContentLoaded', () => {
    App.init();
  });
})(window);
