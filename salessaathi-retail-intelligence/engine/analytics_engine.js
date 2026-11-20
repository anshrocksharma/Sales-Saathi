// SalesSaathi Analytics & Multi-Dimensional Aggregation Engine
(function(window) {
  const AnalyticsEngine = {
    /**
     * Format numbers into Indian numbering format with optional Rupee sign
     * e.g. 1245800 -> "₹12,45,800", 12400000 -> "₹1.24 Cr"
     */
    formatCurrency: function(val, isCompact = false) {
      if (val === null || val === undefined || isNaN(val)) return "₹0";
      const num = parseFloat(val);

      if (isCompact) {
        if (num >= 10000000) {
          return "₹" + (num / 10000000).toFixed(2) + " Cr";
        } else if (num >= 100000) {
          return "₹" + (num / 100000).toFixed(2) + " L";
        } else if (num >= 1000) {
          return "₹" + (num / 1000).toFixed(1) + "k";
        }
      }

      // Standard Indian Rupee string formatting
      return "₹" + num.toLocaleString('en-IN', { maximumFractionDigits: 0 });
    },

    formatNumber: function(val) {
      if (val === null || val === undefined || isNaN(val)) return "0";
      return parseFloat(val).toLocaleString('en-IN');
    },

    /**
     * Apply multi-dimensional filters to current active dataset
     */
    applyFilters: function(baseDataset, filters = {}) {
      if (!baseDataset) return null;

      const dateFilter = filters.dateRange || "30D";
      const categoryFilter = filters.category || "All";
      const genderFilter = filters.gender || "All";
      const ageFilter = filters.age || "All";

      let multiplier = 1.0;
      if (dateFilter === "7D" || dateFilter === "Last 7 Days") multiplier = 0.24;
      else if (dateFilter === "90D" || dateFilter === "Last 90 Days") multiplier = 2.85;
      else if (dateFilter === "Today") multiplier = 0.035;

      // Filter categories
      let filteredCategories = [...baseDataset.categories];
      if (categoryFilter !== "All" && categoryFilter !== "All Categories") {
        filteredCategories = filteredCategories.filter(c => 
          c.name.toLowerCase().includes(categoryFilter.toLowerCase()) ||
          c.displayName.toLowerCase().includes(categoryFilter.toLowerCase())
        );
      }

      // Compute filtered KPI stats
      const baseKpis = baseDataset.kpis;
      let effectiveRevenue = Math.round(baseKpis.totalRevenue * multiplier);
      let effectiveTxns = Math.round(baseKpis.totalTransactions * multiplier);
      let effectiveUnits = Math.round(baseKpis.unitsSold * multiplier);

      if (categoryFilter !== "All" && categoryFilter !== "All Categories" && filteredCategories.length) {
        const catRatio = filteredCategories.reduce((acc, c) => acc + c.sharePercent, 0) / 100;
        effectiveRevenue = Math.round(effectiveRevenue * catRatio);
        effectiveTxns = Math.round(effectiveTxns * catRatio);
        effectiveUnits = Math.round(effectiveUnits * catRatio);
      }

      if (genderFilter === "Female" || genderFilter === "Gender: Female (54%)") {
        effectiveRevenue = Math.round(effectiveRevenue * 0.54);
        effectiveTxns = Math.round(effectiveTxns * 0.54);
      } else if (genderFilter === "Male" || genderFilter === "Gender: Male (46%)") {
        effectiveRevenue = Math.round(effectiveRevenue * 0.46);
        effectiveTxns = Math.round(effectiveTxns * 0.46);
      }

      const effectiveAOV = effectiveTxns > 0 ? Math.round(effectiveRevenue / effectiveTxns) : baseKpis.avgOrderValue;

      return {
        ...baseDataset,
        filteredKpis: {
          totalRevenue: effectiveRevenue,
          totalRevenueFormatted: this.formatCurrency(effectiveRevenue),
          revenueDelta: baseKpis.revenueDelta,
          totalTransactions: effectiveTxns,
          transactionsDelta: baseKpis.transactionsDelta,
          avgOrderValue: effectiveAOV,
          avgOrderValueFormatted: this.formatCurrency(effectiveAOV),
          aovDelta: baseKpis.aovDelta,
          uniqueCustomers: Math.round(baseKpis.uniqueCustomers * (multiplier > 1 ? 1.4 : multiplier)),
          uniqueCustomersDelta: baseKpis.uniqueCustomersDelta,
          unitsSold: effectiveUnits,
          unitsSoldDelta: baseKpis.unitsSoldDelta
        },
        filteredCategories: filteredCategories
      };
    },

    /**
     * Generate smooth SVG sparkline path data
     */
    generateSparklineSvgPath: function(points, width = 100, height = 28) {
      if (!points || points.length < 2) {
        return "M0,20 L100,20";
      }
      const min = Math.min(...points);
      const max = Math.max(...points) || 1;
      const stepX = width / (points.length - 1);
      
      const coords = points.map((p, i) => {
        const x = i * stepX;
        const norm = (p - min) / (max - min || 1);
        const y = height - (norm * (height - 6) + 3);
        return { x: x.toFixed(1), y: y.toFixed(1) };
      });

      let path = `M ${coords[0].x} ${coords[0].y}`;
      for (let i = 1; i < coords.length; i++) {
        path += ` L ${coords[i].x} ${coords[i].y}`;
      }
      return path;
    }
  };

  window.AnalyticsEngine = AnalyticsEngine;
})(window);
