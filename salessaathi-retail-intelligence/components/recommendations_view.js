// SalesSaathi - AI Business Recommendations View Component
(function(window) {
  const RecommendationsView = {
    render: function(state) {
      const dataset = state.currentDataset;
      let recs = dataset.recommendations || [];
      const filter = state.recommendationPriorityFilter || "all";

      if (filter !== "all") {
        recs = recs.filter(r => r.priority === filter);
      }

      const highCount = (dataset.recommendations || []).filter(r => r.priority === 'high').length;
      const medCount = (dataset.recommendations || []).filter(r => r.priority === 'medium').length;
      const oppCount = (dataset.recommendations || []).filter(r => r.priority === 'opportunity').length;

      return `
        <div class="flex flex-col w-full pb-8 space-y-4 animate-fade-in">
          <!-- Advisory Meta Header & Interactive Priority Meter -->
          <div class="executive-card rounded-2xl p-space-md shadow-sm space-y-3 border border-surface-container-high/60">
            <div class="flex items-center justify-between">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary font-label-sm text-label-sm font-semibold">
                <span class="material-symbols-outlined text-[16px]">auto_awesome</span>
                Intelligent Advisory Engine • ${dataset.recommendations.length} Strategic Action Items
              </span>
              <span class="flex h-2.5 w-2.5 relative">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
              </span>
            </div>
            
            <div>
              <h1 class="font-headline-sm md:text-headline-md text-headline-sm text-on-surface font-bold">
                AI Business Recommendations
              </h1>
              <p class="font-body-md text-body-md text-on-surface-variant mt-0.5">
                Turn customer segmentation, cohort churn indicators, and product velocity into immediate commercial actions.
              </p>
            </div>

            <!-- Priority Filter Bar -->
            <div class="bg-surface-container-low rounded-xl p-1.5 flex items-center gap-1 overflow-x-auto">
              <button class="priority-pill flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-label-sm font-label-sm transition-all cursor-pointer ${filter === 'all' ? 'bg-surface-container-lowest text-on-surface shadow-sm font-bold' : 'text-on-surface-variant hover:text-on-surface'}" data-priority="all">
                <span>All (${dataset.recommendations.length})</span>
              </button>
              <button class="priority-pill flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-label-sm font-label-sm transition-all cursor-pointer ${filter === 'high' ? 'bg-surface-container-lowest text-on-surface shadow-sm font-bold' : 'text-on-surface-variant hover:text-on-surface'}" data-priority="high">
                <span class="w-2 h-2 rounded-full bg-error"></span>
                <span>${highCount} High Priority</span>
              </button>
              <button class="priority-pill flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-label-sm font-label-sm transition-all cursor-pointer ${filter === 'medium' ? 'bg-surface-container-lowest text-on-surface shadow-sm font-bold' : 'text-on-surface-variant hover:text-on-surface'}" data-priority="medium">
                <span class="w-2 h-2 rounded-full bg-secondary"></span>
                <span>${medCount} Medium</span>
              </button>
              <button class="priority-pill flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-label-sm font-label-sm transition-all cursor-pointer ${filter === 'opportunity' ? 'bg-surface-container-lowest text-on-surface shadow-sm font-bold' : 'text-on-surface-variant hover:text-on-surface'}" data-priority="opportunity">
                <span class="w-2 h-2 rounded-full bg-[#0090a9]"></span>
                <span>${oppCount} Opportunity</span>
              </button>
            </div>
          </div>

          <!-- Recommendations Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${recs.map(rec => {
              const isHigh = rec.priority === 'high';
              const isMed = rec.priority === 'medium';
              const isOpp = rec.priority === 'opportunity';
              const topGradient = isHigh 
                ? 'from-error to-secondary' 
                : isMed 
                ? 'from-secondary to-secondary-container' 
                : 'from-[#0090a9] to-[#acedff]';

              return `
                <div class="executive-card rounded-2xl p-space-md shadow-sm relative overflow-hidden flex flex-col justify-between gap-3.5 transition-all ${rec.executed ? 'ring-2 ring-emerald-500/50' : ''}">
                  <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${topGradient}"></div>
                  
                  <div>
                    <div class="flex items-start justify-between gap-2 pt-1">
                      <div class="flex items-center gap-2">
                        <span class="px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-bold ${rec.priorityBadgeClass}">
                          ${rec.priorityLabel}
                        </span>
                        <span class="text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                          <span class="material-symbols-outlined text-[14px]">${rec.icon}</span>
                          ${rec.categoryTag}
                        </span>
                      </div>
                      
                      <div class="flex items-center gap-1">
                        ${rec.executed ? `
                          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-label-sm text-[11px] font-semibold">
                            <span class="material-symbols-outlined text-[14px]">check_circle</span> Active
                          </span>
                        ` : ''}
                        <button class="text-on-surface-variant hover:text-on-surface p-1 rounded-lg transition-colors cursor-pointer" onclick="window.App.toggleRecommendationBookmark('${rec.id}')">
                          <span class="material-symbols-outlined text-[18px] ${rec.isBookmarked ? 'text-secondary font-bold' : ''}">
                            ${rec.isBookmarked ? 'bookmark_added' : 'bookmark'}
                          </span>
                        </button>
                      </div>
                    </div>

                    <div class="mt-2">
                      <h2 class="font-title-md text-title-md text-on-surface font-bold">${rec.title}</h2>
                      <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        Target: <span class="font-medium text-on-surface">${rec.targetGroup}</span>
                      </p>
                    </div>

                    <!-- Evidence & Analytical Callout Box -->
                    <div class="bg-surface-container-low rounded-xl p-3 space-y-2 my-2.5 border border-surface-container-high/60">
                      <div class="text-on-surface font-label-sm text-label-sm">
                        <span class="font-semibold text-secondary">Signal Evidence:</span> ${rec.evidenceSnippet}
                      </div>
                      <div class="bg-white/80 rounded-lg p-2 text-on-surface-variant font-body-sm text-body-sm">
                        <span class="font-semibold text-error flex items-center gap-1">
                          <span class="material-symbols-outlined text-[15px]">warning</span> Risk Factor
                        </span>
                        <span class="text-[12px]">${rec.riskAlert}</span>
                      </div>
                    </div>

                    <!-- Recommended Action -->
                    <div class="space-y-1">
                      <span class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                        Recommended AI Action
                      </span>
                      <p class="font-body-sm text-body-sm text-on-surface leading-relaxed">
                        ${rec.recommendedAction}
                      </p>
                    </div>
                  </div>

                  <!-- Bottom Outcome Target & Action Trigger -->
                  <div class="pt-2 flex flex-col gap-2.5 border-t border-surface-container-high/60">
                    <div class="flex items-center justify-between py-1.5 px-3 rounded-xl bg-surface-container">
                      <div class="flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-secondary text-[16px]">trending_up</span>
                        <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Expected Target:</span>
                      </div>
                      <span class="font-label-sm text-label-sm font-bold text-on-surface">${rec.expectedTarget}</span>
                    </div>

                    <div class="flex items-center gap-2">
                      <button class="flex-1 h-10 rounded-xl font-label-md text-label-md flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all cursor-pointer font-semibold ${rec.executed ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-primary hover:bg-slate-800 text-white'}" onclick="window.App.openActionModal('${rec.id}')">
                        <span class="material-symbols-outlined text-[16px]">
                          ${rec.executed ? 'check' : 'rocket_launch'}
                        </span>
                        <span>${rec.executed ? 'Re-Configure Playbook' : rec.ctaButtonLabel}</span>
                      </button>
                      <button class="w-10 h-10 rounded-xl bg-surface-container-low text-on-surface flex items-center justify-center hover:bg-surface-container transition-colors cursor-pointer" onclick="window.App.shareRecommendation('${rec.id}')" title="Share advisory brief">
                        <span class="material-symbols-outlined text-[18px]">share</span>
                      </button>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Compliance & Transparency Disclaimer -->
          <div class="p-space-sm rounded-xl bg-surface-container-low/80 flex items-start gap-2.5 text-on-surface-variant border border-surface-container-high/60">
            <span class="material-symbols-outlined text-[18px] shrink-0 text-secondary">verified_user</span>
            <p class="font-body-sm text-body-sm leading-relaxed text-on-surface-variant text-[12px]">
              AI recommendations are rule-assisted algorithmic suggestions derived from transaction history clustering (k=4) and RFM decile distribution. Actual financial performance depends on seasonal market conditions and store POS execution.
            </p>
          </div>
        </div>
      `;
    },

    bindEvents: function(container, state) {
      const pills = container.querySelectorAll('.priority-pill');
      pills.forEach(pill => {
        pill.addEventListener('click', () => {
          const prio = pill.getAttribute('data-priority');
          window.App.setRecommendationPriorityFilter(prio);
        });
      });
    }
  };

  window.RecommendationsView = RecommendationsView;
})(window);
