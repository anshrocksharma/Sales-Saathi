// SalesSaathi RFM Intelligence Engine
// Computes Recency, Frequency, Monetary scores, deciles, and customer behavior metrics
(function(window) {
  const RFMEngine = {
    /**
     * Compute RFM metrics from raw transactions
     * @param {Array} transactions Array of { custId, date, total, ... }
     * @param {Date} referenceDate Evaluation date (defaults to latest txn date)
     */
    calculateFromTransactions: function(transactions, referenceDate = null) {
      if (!transactions || !transactions.length) return [];
      
      const customerMap = {};
      let maxDate = 0;

      // Group by customer
      transactions.forEach(tx => {
        const txTime = new Date(tx.date || tx.Date).getTime();
        if (txTime > maxDate) maxDate = txTime;
        
        const custId = tx.custId || tx.Customer_ID || tx.customerId;
        if (!custId) return;

        if (!customerMap[custId]) {
          customerMap[custId] = {
            id: custId,
            name: tx.custName || tx.Customer_Name || custId,
            gender: tx.gender || tx.Gender || "Unknown",
            age: parseInt(tx.age || tx.Age || 30, 10),
            city: tx.city || tx.City || "Bengaluru",
            category: tx.category || tx.Product_Category || "General",
            lastTxDate: txTime,
            orderCount: 0,
            totalSpend: 0
          };
        }

        const cust = customerMap[custId];
        if (txTime > cust.lastTxDate) cust.lastTxDate = txTime;
        cust.orderCount += 1;
        cust.totalSpend += parseFloat(tx.total || tx.Total_Amount || 0);
      });

      const refTime = referenceDate ? new Date(referenceDate).getTime() : maxDate;
      const customers = Object.values(customerMap).map(c => {
        const diffDays = Math.max(1, Math.round((refTime - c.lastTxDate) / (1000 * 60 * 60 * 24)));
        return {
          id: c.id,
          name: c.name,
          gender: c.gender,
          age: c.age,
          city: c.city,
          category: c.category,
          recency: diffDays,
          frequency: c.orderCount,
          monetary: Math.round(c.totalSpend)
        };
      });

      return this.scoreCustomers(customers);
    },

    /**
     * Score customers into 1-5 quantiles for R, F, M
     */
    scoreCustomers: function(customers) {
      if (!customers.length) return [];

      // Sort copies for quantiles
      const rSorted = [...customers].sort((a, b) => a.recency - b.recency); // Lower recency = better = higher R score
      const fSorted = [...customers].sort((a, b) => a.frequency - b.frequency); // Higher freq = better
      const mSorted = [...customers].sort((a, b) => a.monetary - b.monetary); // Higher spend = better

      const n = customers.length;
      const getQuantile = (rank, total) => {
        const ratio = rank / total;
        if (ratio <= 0.2) return 1;
        if (ratio <= 0.4) return 2;
        if (ratio <= 0.6) return 3;
        if (ratio <= 0.8) return 4;
        return 5;
      };

      // Assign scores
      const scored = customers.map(c => {
        // Lower recency is better, so invert quantile
        const rRank = rSorted.findIndex(x => x.id === c.id);
        const rScore = 6 - getQuantile(rRank + 1, n);

        const fRank = fSorted.findIndex(x => x.id === c.id);
        const fScore = getQuantile(fRank + 1, n);

        const mRank = mSorted.findIndex(x => x.id === c.id);
        const mScore = getQuantile(mRank + 1, n);

        const compositeScore = Math.round(((rScore * 0.3) + (fScore * 0.35) + (mScore * 0.35)) * 20);

        let segment = "Potential Growth";
        let cluster = 2;
        let clusterCode = "C2";
        let rfmCategory = "growth";

        if (rScore >= 4 && fScore >= 4 && mScore >= 4) {
          segment = "High-Value Champion";
          cluster = 0;
          clusterCode = "C0";
          rfmCategory = "high";
        } else if (fScore >= 3 && mScore >= 3 && rScore >= 3) {
          segment = "Loyal Regular";
          cluster = 1;
          clusterCode = "C1";
          rfmCategory = "regular";
        } else if (rScore <= 2) {
          segment = "At-Risk Customer";
          cluster = 3;
          clusterCode = "C3";
          rfmCategory = "risk";
        }

        return {
          ...c,
          rScore,
          fScore,
          mScore,
          rfmScoreString: `R:${rScore} F:${fScore} M:${mScore}`,
          compositeScore,
          segment,
          cluster,
          clusterCode,
          rfmCategory
        };
      });

      return scored;
    },

    /**
     * Compute aggregated pillar metrics
     */
    getPillarMetrics: function(customers) {
      if (!customers || !customers.length) return null;
      const total = customers.length;

      // Recency distribution
      const r0_30 = customers.filter(c => c.recency <= 30).length;
      const r31_60 = customers.filter(c => c.recency > 30 && c.recency <= 60).length;
      const r60plus = customers.filter(c => c.recency > 60).length;
      const avgRecency = Math.round(customers.reduce((acc, c) => acc + c.recency, 0) / total);

      // Frequency distribution
      const f1 = customers.filter(c => c.frequency === 1).length;
      const f2_4 = customers.filter(c => c.frequency >= 2 && c.frequency <= 4).length;
      const f5plus = customers.filter(c => c.frequency >= 5).length;
      const avgFreq = (customers.reduce((acc, c) => acc + c.frequency, 0) / total).toFixed(2);

      // Monetary distribution
      const mLow = customers.filter(c => c.monetary < 3000).length;
      const mMid = customers.filter(c => c.monetary >= 3000 && c.monetary <= 10000).length;
      const mHigh = customers.filter(c => c.monetary > 10000).length;
      const avgSpend = Math.round(customers.reduce((acc, c) => acc + c.monetary, 0) / total);

      return {
        recency: {
          averageDays: avgRecency,
          distribution: [
            { range: "0-30d", percent: Math.round((r0_30 / total) * 100), color: "#4648d4" },
            { range: "31-60d", percent: Math.round((r31_60 / total) * 100), color: "#c0c1ff" },
            { range: ">60d", percent: Math.round((r60plus / total) * 100), color: "#cbdbf5" }
          ]
        },
        frequency: {
          annualAverage: parseFloat(avgFreq),
          distribution: [
            { range: "1x Buyers", percent: Math.round((f1 / total) * 100), color: "#cbdbf5" },
            { range: "2-4x", percent: Math.round((f2_4 / total) * 100), color: "#4648d4" },
            { range: "5+ Power", percent: Math.round((f5plus / total) * 100), color: "#141b2b" }
          ]
        },
        monetary: {
          averageCLV: avgSpend,
          distribution: [
            { range: ">₹10k", percent: Math.round((mHigh / total) * 100), color: "#141b2b" },
            { range: "₹3k-10k", percent: Math.round((mMid / total) * 100), color: "#4648d4" },
            { range: "<₹3k", percent: Math.round((mLow / total) * 100), color: "#cbdbf5" }
          ]
        }
      };
    }
  };

  window.RFMEngine = RFMEngine;
})(window);
