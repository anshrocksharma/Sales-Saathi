// SalesSaathi AI Advisory & Recommendations Execution Engine
(function(window) {
  const RecommendationsEngine = {
    // Action definitions and execution simulators
    actionConfigs: {
      deploy_vip: {
        title: "Deploy VIP Concierge & WhatsApp Storefront",
        target: "Cluster 0 (High-Value Champions • 480 Customers)",
        parameters: [
          { id: "free_delivery", label: "Complimentary Same-Day Delivery", type: "boolean", default: true },
          { id: "whatsapp_concierge", label: "Dedicated WhatsApp Agent Routing", type: "boolean", default: true },
          { id: "early_access", label: "48-Hour Early Access to Festive Drops", type: "boolean", default: true }
        ],
        projectedOutcome: "+12.4% Repeat Purchase Rate • ₹1,84,000 Incremental GMV / mo",
        executionMessage: "VIP Initiative activated successfully. 480 customers flagged in POS with VIP Concierge badge. WhatsApp welcome cards dispatched."
      },
      schedule_push: {
        title: "Schedule Automated Winback WhatsApp Sequence",
        target: "Cluster 3 (At-Risk Inactive • 650 Customers)",
        parameters: [
          { id: "discount_val", label: "Voucher Amount", type: "number", default: 250, prefix: "₹" },
          { id: "min_order", label: "Min Order Value", type: "number", default: 1299, prefix: "₹" },
          { id: "validity_days", label: "Voucher Validity", type: "number", default: 7, suffix: "days" }
        ],
        projectedOutcome: "Expected Winback: 18–22% (120-140 Customers) • Salvaged Revenue: ~₹5.2 Lakhs",
        executionMessage: "Automated sequence scheduled via SalesSaathi Omnichannel Push. ₹250 vouchers generated and queued."
      },
      bundle_rule: {
        title: "Configure Electronics Smart Bundling Rule",
        target: "Consumer Electronics (Laptops/Tablets/Audio)",
        parameters: [
          { id: "combo_discount", label: "Bundle Discount Rate", type: "number", default: 10, suffix: "%" },
          { id: "attached_item", label: "Recommended Attach Item", type: "select", default: "Fast Chargers + Protective Sleeve", options: ["Fast Chargers + Protective Sleeve", "Extended Warranty (1 Yr)", "Screen Guard + Cable Kit"] }
        ],
        projectedOutcome: "Attachment Rate: 1.18 → 1.45 items/cart • AOV +15.2% (₹1,458 → ₹1,680)",
        executionMessage: "POS Bundling Rule synchronized to all 12 flagship stores and web checkout kiosk."
      },
      discovery_promo: {
        title: "Launch Multi-Category Discovery Promo",
        target: "Cluster 2 (Potential Growth • 1,120 Single-Category Shoppers)",
        parameters: [
          { id: "promo_code", label: "Promo Code", type: "text", default: "EXPLORE15" },
          { id: "discount_pct", label: "Cross-Category Discount", type: "number", default: 15, suffix: "%" },
          { id: "target_cross", label: "Target Cross-Category", type: "text", default: "Beauty & Gourmet Grocery" }
        ],
        projectedOutcome: "Accelerate 320+ customers from Cluster 2 (Single-Category) into Cluster 1 Regulars",
        executionMessage: "Discovery promotion 'EXPLORE15' deployed. In-app and POS banner live."
      }
    },

    toggleBookmark: function(recId, recommendations) {
      const rec = recommendations.find(r => r.id === recId);
      if (rec) {
        rec.isBookmarked = !rec.isBookmarked;
        return rec.isBookmarked;
      }
      return false;
    },

    executeAction: function(recId, recommendations, customParams = {}) {
      const rec = recommendations.find(r => r.id === recId);
      if (!rec) return null;

      rec.executed = true;
      rec.executedAt = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

      const config = this.actionConfigs[rec.ctaActionType] || {
        title: rec.title,
        projectedOutcome: rec.expectedTarget,
        executionMessage: "Action triggered successfully through SalesSaathi Automation Engine."
      };

      return {
        recommendation: rec,
        config: config,
        params: customParams,
        timestamp: new Date()
      };
    }
  };

  window.RecommendationsEngine = RecommendationsEngine;
})(window);
