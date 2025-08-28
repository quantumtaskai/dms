// Main Dashboard JavaScript
class Dashboard {
    constructor() {
        this.charts = {};
        this.currentTab = 'platforms';
        this.searchTerm = '';
        this.filterValue = '';
        
        this.init();
    }

    async init() {
        // Wait for data to load
        await this.waitForData();
        
        // Initialize event listeners
        this.initEventListeners();
        
        // Load initial content
        this.loadDashboard();
        
        // Update header metrics
        this.updateHeaderMetrics();
    }

    waitForData() {
        return new Promise((resolve) => {
            const checkData = () => {
                if (dashboardData && dashboardData.processedData) {
                    resolve();
                } else {
                    setTimeout(checkData, 100);
                }
            };
            checkData();
        });
    }

    initEventListeners() {
        // Tab navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.target.getAttribute('data-tab');
                this.switchTab(tabName);
            });
        });

        // Search and filter
        const searchInput = document.getElementById('searchInput');
        const filterSelect = document.getElementById('filterSelect');

        searchInput.addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.applyFilters();
        });

        filterSelect.addEventListener('change', (e) => {
            this.filterValue = e.target.value;
            this.applyFilters();
        });
    }

    switchTab(tabName) {
        // Update active tab button
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Show active tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');

        this.currentTab = tabName;
        this.loadTabContent(tabName);
    }

    loadDashboard() {
        this.loadTabContent('platforms');
    }

    loadTabContent(tabName) {
        switch (tabName) {
            case 'platforms':
                this.loadPlatformPerformance();
                break;
            case 'hashtags':
                this.loadHashtagStrategy();
                break;
            case 'competitors':
                this.loadCompetitiveIntelligence();
                break;
            case 'recommendations':
                this.loadRecommendations();
                break;
        }
    }

    updateHeaderMetrics() {
        const stats = dashboardData.getPlatformStats();
        const contentMetrics = dashboardData.getContentMetrics();
        
        document.getElementById('totalPlatforms').textContent = stats.total;
        document.getElementById('activePlatforms').textContent = stats.active;
        document.getElementById('totalContent').textContent = contentMetrics.totalCommitted;
        document.getElementById('totalHashtags').textContent = dashboardData.hashtags.length;
    }

    loadPlatformPerformance() {
        this.createPlatformStatusChart();
        this.loadContentPipeline();
        this.loadPlatformGrid();
    }

    createPlatformStatusChart() {
        const ctx = document.getElementById('platformStatusChart');
        if (!ctx) return;

        const stats = dashboardData.getPlatformStats();

        if (this.charts.platformStatus) {
            this.charts.platformStatus.destroy();
        }

        this.charts.platformStatus = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Active', 'Inactive', 'Not Available'],
                datasets: [{
                    data: [stats.active, stats.inactive, stats.notAvailable],
                    backgroundColor: ['#00e676', '#ff5252', '#ff9800'],
                    borderWidth: 2,
                    borderColor: '#1e2340'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#ffffff',
                            padding: 20,
                            font: {
                                size: 14
                            }
                        }
                    }
                }
            }
        });
    }

    loadContentPipeline() {
        const container = document.getElementById('contentPipeline');
        if (!container) return;

        const activePlatforms = dashboardData.getPlatformsByStatus('Active');
        const topPlatforms = dashboardData.platforms
            .filter(p => p.committed > 0)
            .sort((a, b) => b.committed - a.committed)
            .slice(0, 8);

        container.innerHTML = topPlatforms.map(platform => {
            const committed = platform.committed || 0;
            const drafted = platform.drafted || 0;
            const published = platform.published || 0;
            const progress = committed > 0 ? Math.round((drafted / committed) * 100) : 0;

            return `
                <div class="pipeline-item">
                    <div class="pipeline-platform">${platform.platform}</div>
                    <div class="pipeline-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress}%"></div>
                        </div>
                    </div>
                    <div class="pipeline-numbers">
                        <span>Committed: ${committed}</span>
                        <span>Drafted: ${drafted}</span>
                        <span>Published: ${published}</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    loadPlatformCategories() {
        const container = document.getElementById('categoryList');
        if (!container) return;

        const categories = dashboardData.getPlatformCategories();

        container.innerHTML = Object.entries(categories).map(([name, data]) => `
            <div class="category-item">
                <div class="category-name">${name}</div>
                <div class="category-stats">
                    <span>Platforms: ${data.count}</span>
                    <span>Active: ${data.active}</span>
                    <span>Content: ${data.totalCommitted}</span>
                </div>
            </div>
        `).join('');
    }

    loadPlatformGrid() {
        const container = document.getElementById('platformGrid');
        if (!container) return;

        container.innerHTML = dashboardData.platforms
            .filter(p => p.platform !== 'Website')
            .map(platform => {
                const statusClass = platform.pastStatus === 'Active' ? 'status-active' :
                                  platform.pastStatus === 'Not Available' ? 'status-unavailable' :
                                  'status-inactive';

                return `
                    <div class="platform-card">
                        <div class="platform-header">
                            <div class="platform-name">${platform.platform}</div>
                            <div class="status-badge ${statusClass}">${platform.pastStatus}</div>
                        </div>
                        <div class="platform-metrics">
                            <div class="metric-item">
                                <div class="metric-item-label">Committed</div>
                                <div class="metric-item-value">${platform.committed || 0}</div>
                            </div>
                            <div class="metric-item">
                                <div class="metric-item-label">Drafted</div>
                                <div class="metric-item-value">${platform.drafted || 0}</div>
                            </div>
                            <div class="metric-item">
                                <div class="metric-item-label">Published</div>
                                <div class="metric-item-value">${platform.published || 0}</div>
                            </div>
                        </div>
                        <div class="platform-info">
                            <div class="platform-category"><strong>Category:</strong> ${platform.category}</div>
                            ${platform.contentCreated ? `<div class="content-created"><strong>Content Created:</strong> ${platform.contentCreated}</div>` : ''}
                            <div class="platform-content"><strong>Primary Content:</strong> ${platform.primaryContent}</div>
                        </div>
                    </div>
                `;
            }).join('');
    }

    loadHashtagStrategy() {
        this.loadTopHashtags();
        this.createHashtagCategoryChart();
        this.loadPostingSchedule();
        this.loadSuitabilityMatrix();
    }

    loadTopHashtags() {
        const container = document.getElementById('topHashtags');
        if (!container) return;

        const topHashtags = dashboardData.getTopHashtags(15);

        container.innerHTML = topHashtags.map(hashtag => `
            <div class="hashtag-item">
                <div class="hashtag-info">
                    <div class="hashtag-name">${hashtag.hashtag}</div>
                    <div class="hashtag-category">${hashtag.category}</div>
                </div>
                <div class="hashtag-score">${hashtag.popularityScore}</div>
            </div>
        `).join('');
    }

    createHashtagCategoryChart() {
        const ctx = document.getElementById('hashtagCategoryChart');
        if (!ctx) return;

        const analytics = dashboardData.getHashtagAnalytics();
        const categories = Object.keys(analytics.categoryBreakdown).slice(0, 6);
        const counts = categories.map(cat => analytics.categoryBreakdown[cat].count);

        if (this.charts.hashtagCategory) {
            this.charts.hashtagCategory.destroy();
        }

        this.charts.hashtagCategory = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: categories,
                datasets: [{
                    label: 'Hashtag Count',
                    data: counts,
                    backgroundColor: '#00d4ff',
                    borderColor: '#00a8cc',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#2d3247'
                        },
                        ticks: {
                            color: '#b0b6d3'
                        }
                    },
                    x: {
                        grid: {
                            color: '#2d3247'
                        },
                        ticks: {
                            color: '#b0b6d3',
                            maxRotation: 45
                        }
                    }
                }
            }
        });
    }

    loadPostingSchedule() {
        const container = document.getElementById('scheduleGrid');
        if (!container) return;

        const schedules = {
            'Market Opening': ['#ForexTrading', '#FX', '#ForexEducation'],
            'Business Hours': ['#ForexAnalysis', '#TradingTips', '#FinTech'],
            'Peak Hours': ['#TechnicalAnalysis', '#RiskManagement', '#UAETrading'],
            'Evening': ['#TradingPsychology', '#Cryptocurrency', '#StartTrading'],
            'Weekends': ['#DayTrading', '#TradingSuccess', '#FinancialFreedom']
        };

        container.innerHTML = Object.entries(schedules).map(([time, hashtags]) => `
            <div class="schedule-item">
                <div class="schedule-time">${time}</div>
                <div class="schedule-platforms">${hashtags.length} optimal hashtags</div>
            </div>
        `).join('');
    }

    loadSuitabilityMatrix() {
        const container = document.getElementById('suitabilityMatrix');
        if (!container) return;

        const platforms = ['All platforms', 'LinkedIn, Twitter', 'Instagram, TikTok', 'YouTube, Medium'];
        const suitabilityData = platforms.map(platform => {
            const count = dashboardData.hashtags.filter(h => 
                h.platformSuitability.includes(platform.split(',')[0])
            ).length;
            return { platform, count };
        });

        container.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                ${suitabilityData.map(data => `
                    <div class="schedule-item">
                        <div class="schedule-time">${data.platform}</div>
                        <div class="schedule-platforms">${data.count} hashtags</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    loadCompetitiveIntelligence() {
        this.loadCompetitorComparison();
        this.loadGapAnalysis();
        this.loadCompetitorList();
    }

    loadCompetitorComparison() {
        const container = document.getElementById('competitorComparison');
        if (!container) return;

        const activePlatforms = dashboardData.getPlatformStats().active;
        const totalPlatforms = dashboardData.getPlatformStats().total;
        const presenceScore = Math.round((activePlatforms / totalPlatforms) * 100);

        container.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <h2 style="color: var(--accent-primary); font-size: 3rem; margin-bottom: 1rem;">${presenceScore}%</h2>
                <p style="color: var(--text-secondary); font-size: 1.2rem;">Platform Presence Score</p>
                <div style="margin-top: 2rem; display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; text-align: center;">
                    <div>
                        <div style="font-size: 2rem; color: var(--accent-success);">${activePlatforms}</div>
                        <div style="color: var(--text-secondary);">Active Platforms</div>
                    </div>
                    <div>
                        <div style="font-size: 2rem; color: var(--accent-danger);">${dashboardData.getPlatformStats().inactive}</div>
                        <div style="color: var(--text-secondary);">Inactive Platforms</div>
                    </div>
                    <div>
                        <div style="font-size: 2rem; color: var(--accent-primary);">${dashboardData.competitors.length}</div>
                        <div style="color: var(--text-secondary);">Tracked Competitors</div>
                    </div>
                </div>
            </div>
        `;
    }

    loadGapAnalysis() {
        const container = document.getElementById('gapAnalysis');
        if (!container) return;

        const inactivePlatforms = dashboardData.getPlatformsByStatus('Not Active');
        const highPotential = inactivePlatforms
            .filter(p => p.committed >= 30)
            .sort((a, b) => b.committed - a.committed)
            .slice(0, 5);

        container.innerHTML = `
            <div class="gap-list">
                <h4 style="color: var(--text-primary); margin-bottom: 1rem;">Top Platform Opportunities</h4>
                ${highPotential.map(platform => `
                    <div class="gap-item">
                        <div class="gap-title">${platform.platform}</div>
                        <div class="gap-desc">Committed Content: ${platform.committed} pieces</div>
                        <div style="color: var(--accent-warning);">Category: ${platform.category}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    loadCompetitorList() {
        const container = document.getElementById('competitorList');
        if (!container) return;

        container.innerHTML = dashboardData.competitors.map(competitor => `
            <div class="competitor-item">
                <div class="competitor-name">${competitor.name}</div>
                <div class="competitor-rank">#${competitor.rank}</div>
            </div>
        `).join('');
    }

    loadRecommendations() {
        this.loadPriorityPlatforms();
        this.loadPotentialHashtags();
        this.loadContentGaps();
        this.loadActionItems();
    }

    loadPriorityPlatforms() {
        const container = document.getElementById('priorityPlatforms');
        if (!container) return;

        const recommendations = dashboardData.getInactivePlatformsWithPotential();

        container.innerHTML = recommendations.slice(0, 6).map(platform => `
            <div class="recommendation-item">
                <div class="recommendation-title">${platform.platform}</div>
                <div class="recommendation-desc">${platform.primaryContent}</div>
                <div class="recommendation-metrics">
                    <span>Content Commitment: ${platform.committed}</span>
                    <span class="priority-high">HIGH PRIORITY</span>
                </div>
            </div>
        `).join('');
    }

    loadPotentialHashtags() {
        const container = document.getElementById('potentialHashtags');
        if (!container) return;

        const topHashtags = dashboardData.hashtags
            .filter(h => h.popularityScore >= 9)
            .sort((a, b) => b.popularityScore - a.popularityScore)
            .slice(0, 8);

        container.innerHTML = topHashtags.map(hashtag => `
            <div class="recommendation-item">
                <div class="recommendation-title">${hashtag.hashtag}</div>
                <div class="recommendation-desc">${hashtag.usageContext}</div>
                <div class="recommendation-metrics">
                    <span>Score: ${hashtag.popularityScore}/10</span>
                    <span class="priority-${hashtag.popularityScore === 10 ? 'high' : 'medium'}">${hashtag.popularityScore === 10 ? 'HIGHEST' : 'HIGH'} POTENTIAL</span>
                </div>
            </div>
        `).join('');
    }

    loadContentGaps() {
        const container = document.getElementById('contentGaps');
        if (!container) return;

        const gaps = [
            { title: 'Video Content', desc: 'YouTube and TikTok platforms are inactive', priority: 'high' },
            { title: 'Community Engagement', desc: 'Reddit and Quora have 0 drafted content', priority: 'medium' },
            { title: 'Professional Network', desc: 'LinkedIn has low content output vs commitment', priority: 'medium' },
            { title: 'Visual Platforms', desc: 'Instagram and Pinterest underutilized', priority: 'high' }
        ];

        container.innerHTML = gaps.map(gap => `
            <div class="gap-item">
                <div class="gap-title">${gap.title}</div>
                <div class="gap-desc">${gap.desc}</div>
                <div class="priority-${gap.priority}">${gap.priority.toUpperCase()} PRIORITY</div>
            </div>
        `).join('');
    }

    loadActionItems() {
        const container = document.getElementById('actionItems');
        if (!container) return;

        const actions = [
            { title: 'Activate TikTok', desc: 'High engagement potential with 15 committed content pieces', priority: 'high' },
            { title: 'Implement #ForexEducation', desc: 'Top-scoring hashtag (10/10) across all platforms', priority: 'high' },
            { title: 'Boost LinkedIn Output', desc: 'Only 5 drafted vs 30 committed posts', priority: 'medium' },
            { title: 'Schedule Weekend Posts', desc: 'Optimize hashtag timing for better engagement', priority: 'low' }
        ];

        container.innerHTML = actions.map(action => `
            <div class="action-item">
                <div class="action-title">${action.title}</div>
                <div class="action-desc">${action.desc}</div>
                <div class="action-priority">
                    <span class="priority-${action.priority}">${action.priority.toUpperCase()} PRIORITY</span>
                </div>
            </div>
        `).join('');
    }

    applyFilters() {
        // This would be implemented to filter content based on search and filter values
        // For now, we'll just reload the current tab content
        this.loadTabContent(this.currentTab);
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
});