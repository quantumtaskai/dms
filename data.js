// Data processing utilities for CSV data
class DashboardData {
    constructor() {
        this.platforms = [];
        this.hashtags = [];
        this.competitors = [];
        this.processedData = {};
    }

    // Parse CSV data from the files
    async loadData() {
        // Platform data from Sheet1
        this.platforms = [
            { sno: '', platform: 'Website', pastStatus: 'Already in Place', committed: '--', drafted: '--', published: '--', contentCreated: '', category: 'Digital Identity', primaryContent: '' },
            { sno: 1, platform: 'Website- blogs', pastStatus: '0', committed: 400, drafted: 30, published: 0, contentCreated: 'Link', category: 'Professional Writing', primaryContent: 'Long-form Articles, Thought Leadership' },
            { sno: 2, platform: 'Website Downloadable', pastStatus: '0', committed: 15, drafted: 0, published: 0, contentCreated: '', category: 'Informational Content', primaryContent: 'Infographics, Product related, knowledge articles' },
            { sno: 3, platform: 'Google Business', pastStatus: 'Not Available', committed: 30, drafted: 1, published: 0, contentCreated: 'Link', category: 'Local Business', primaryContent: 'Business Info, Reviews, Local Posts' },
            { sno: 4, platform: 'Linkedin', pastStatus: 'Active', committed: 30, drafted: 5, published: 0, contentCreated: 'Link', category: 'Professional Network', primaryContent: 'Articles, Company Updates, Industry News' },
            { sno: 5, platform: 'YouTube', pastStatus: 'Not Active', committed: 15, drafted: 1, published: 0, contentCreated: 'Link', category: 'Long-Form Video', primaryContent: 'Long Videos, Tutorials, Vlogs' },
            { sno: 6, platform: 'Tiktok', pastStatus: 'Not Active', committed: 15, drafted: 0, published: 0, contentCreated: 'Link', category: 'Short-Form Video', primaryContent: 'Short Videos, Challenges, Trends' },
            { sno: 7, platform: 'Instagram', pastStatus: 'Active', committed: 30, drafted: 1, published: 0, contentCreated: '', category: 'Visual Content', primaryContent: 'Images, Stories, Reels, IGTV' },
            { sno: 8, platform: 'PinInterest', pastStatus: 'Not Active', committed: 30, drafted: 0, published: 0, contentCreated: '', category: 'Visual Content', primaryContent: 'Infographics, Product Images, Boards' },
            { sno: 9, platform: 'X (Twitter)', pastStatus: 'Not Active', committed: 30, drafted: 1, published: 0, contentCreated: 'Link', category: 'Real-Time Social', primaryContent: 'Real-time Updates, News, Discussions' },
            { sno: 10, platform: 'Facebook', pastStatus: 'Not Active', committed: 30, drafted: 0, published: 0, contentCreated: '', category: 'Social Community', primaryContent: 'Mixed Content, Community Posts, Events' },
            { sno: 11, platform: 'Medium', pastStatus: 'Not Active', committed: 30, drafted: 0, published: 0, contentCreated: '', category: 'Professional Writing', primaryContent: 'Long-form Articles, Thought Leadership' },
            { sno: 12, platform: 'Tumblr', pastStatus: 'Not Active', committed: 30, drafted: 0, published: 0, contentCreated: '', category: 'Creative Blogging', primaryContent: 'Creative Content, GIFs, Art' },
            { sno: 13, platform: 'Threads', pastStatus: 'Not Active', committed: 30, drafted: 0, published: 0, contentCreated: '', category: 'Micro-Blogging', primaryContent: 'Short Posts, Real-time Updates' },
            { sno: 14, platform: 'Quora', pastStatus: 'Not Active', committed: 30, drafted: 0, published: 0, contentCreated: '', category: 'Q&A Content', primaryContent: 'Expert Answers, Industry Knowledge' },
            { sno: 15, platform: 'Reddit', pastStatus: 'Not Active', committed: 30, drafted: 0, published: 0, contentCreated: '', category: 'Discussion Forum', primaryContent: 'Discussion Posts, AMAs, Community Content' },
            { sno: 16, platform: 'Blue Sky', pastStatus: 'Not Active', committed: 30, drafted: 0, published: 0, contentCreated: '', category: 'Social Community', primaryContent: 'Mixed Content, Community Posts, Events' },
            { sno: 17, platform: 'Email Marketing', pastStatus: 'Not Active', committed: 6, drafted: 0, published: 0, contentCreated: '', category: 'Direct Marketing', primaryContent: 'Newsletters, Campaigns, Automated Sequences' }
        ];

        // Sample of hashtag data from Sheet2 (first 20 entries)
        this.hashtags = [
            { hashtag: '#ForexTrading', category: 'Core Trading & Forex', usageContext: 'Educational posts, market analysis, trading tips', platformSuitability: 'All platforms', popularityScore: 6, bestPostingTime: 'Market opening hours' },
            { hashtag: '#Forex', category: 'Core Trading & Forex', usageContext: 'Educational posts, market analysis, trading tips', platformSuitability: 'All platforms', popularityScore: 6, bestPostingTime: 'Peak hours (9-11 AM, 7-9 PM GMT)' },
            { hashtag: '#FX', category: 'Core Trading & Forex', usageContext: 'Educational posts, market analysis, trading tips', platformSuitability: 'All platforms', popularityScore: 8, bestPostingTime: 'Market opening hours' },
            { hashtag: '#ForexEducation', category: 'Core Trading & Forex', usageContext: 'Educational posts, market analysis, trading tips', platformSuitability: 'All platforms', popularityScore: 10, bestPostingTime: 'Market opening hours' },
            { hashtag: '#ForexTips', category: 'Core Trading & Forex', usageContext: 'Educational posts, market analysis, trading tips', platformSuitability: 'All platforms', popularityScore: 10, bestPostingTime: 'Evening (6-10 PM GMT)' },
            { hashtag: '#ForexAnalysis', category: 'Core Trading & Forex', usageContext: 'Educational posts, market analysis, trading tips', platformSuitability: 'All platforms', popularityScore: 9, bestPostingTime: 'Business hours (9 AM - 6 PM GMT)' },
            { hashtag: '#TechnicalAnalysis', category: 'Core Trading & Forex', usageContext: 'Currency trading content, market updates', platformSuitability: 'All platforms', popularityScore: 10, bestPostingTime: 'Peak hours (9-11 AM, 7-9 PM GMT)' },
            { hashtag: '#DayTrading', category: 'Core Trading & Forex', usageContext: 'Currency trading content, market updates', platformSuitability: 'All platforms', popularityScore: 10, bestPostingTime: 'Weekends' },
            { hashtag: '#ScalpTrading', category: 'Core Trading & Forex', usageContext: 'Currency trading content, market updates', platformSuitability: 'All platforms', popularityScore: 9, bestPostingTime: 'Market opening hours' },
            { hashtag: '#RiskManagement', category: 'Core Trading & Forex', usageContext: 'Technical analysis posts, strategy sharing', platformSuitability: 'Twitter, LinkedIn, Instagram', popularityScore: 10, bestPostingTime: 'Market opening hours' },
            { hashtag: '#TradingEducation', category: 'Trading Education & Strategy', usageContext: 'Educational content, tutorials, webinars', platformSuitability: 'YouTube, LinkedIn, Medium', popularityScore: 10, bestPostingTime: 'Market opening hours' },
            { hashtag: '#TradingPsychology', category: 'Trading Education & Strategy', usageContext: 'Educational content, tutorials, webinars', platformSuitability: 'YouTube, LinkedIn, Medium', popularityScore: 7, bestPostingTime: 'Business hours (9 AM - 6 PM GMT)' },
            { hashtag: '#TradingMindset', category: 'Trading Education & Strategy', usageContext: 'Educational content, tutorials, webinars', platformSuitability: 'YouTube, LinkedIn, Medium', popularityScore: 10, bestPostingTime: 'Business hours (9 AM - 6 PM GMT)' },
            { hashtag: '#FinTech', category: 'Technology & Platform', usageContext: 'Platform features, technology updates', platformSuitability: 'LinkedIn, Twitter, YouTube', popularityScore: 9, bestPostingTime: 'Weekends' },
            { hashtag: '#TradingTechnology', category: 'Technology & Platform', usageContext: 'Platform features, technology updates', platformSuitability: 'LinkedIn, Twitter, YouTube', popularityScore: 8, bestPostingTime: 'Peak hours (9-11 AM, 7-9 PM GMT)' },
            { hashtag: '#UAETrading', category: 'Regional & Location Based', usageContext: 'Regional marketing, local community building', platformSuitability: 'All platforms, localized content', popularityScore: 10, bestPostingTime: 'Business hours (9 AM - 6 PM GMT)' },
            { hashtag: '#MyMaaMarkets', category: 'Business & Professional', usageContext: 'Brand building, success stories, testimonials', platformSuitability: 'LinkedIn, Twitter, Facebook', popularityScore: 9, bestPostingTime: 'Business hours (9 AM - 6 PM GMT)' },
            { hashtag: '#TradingCommunity', category: 'Social & Community', usageContext: 'Community engagement, social proof', platformSuitability: 'Instagram, Facebook, TikTok', popularityScore: 7, bestPostingTime: 'Market opening hours' },
            { hashtag: '#StartTrading', category: 'Action & Engagement', usageContext: 'Call-to-action posts, promotional content', platformSuitability: 'All platforms', popularityScore: 10, bestPostingTime: 'Weekends' },
            { hashtag: '#TradingSuccess', category: 'Business & Professional', usageContext: 'Brand building, success stories, testimonials', platformSuitability: 'LinkedIn, Twitter, Facebook', popularityScore: 9, bestPostingTime: 'Weekends' }
        ];

        // Competitors data from Sheet3
        this.competitors = [
            { rank: 1, name: 'IC Markets', website: '' },
            { rank: 2, name: 'Pepperstone', website: '' },
            { rank: 3, name: 'XM', website: '' },
            { rank: 4, name: 'Exness', website: '' },
            { rank: 5, name: 'HFM (HotForex)', website: '' },
            { rank: 6, name: 'AvaTrade', website: '' },
            { rank: 7, name: 'FP Markets', website: '' },
            { rank: 8, name: 'Eightcap', website: '' },
            { rank: 9, name: 'BlackBull Markets', website: '' },
            { rank: 10, name: 'Interactive Brokers', website: '' }
        ];

        this.processAnalytics();
    }

    processAnalytics() {
        // Calculate platform statistics
        const activePlatforms = this.platforms.filter(p => p.pastStatus === 'Active').length;
        const inactivePlatforms = this.platforms.filter(p => p.pastStatus === 'Not Active').length;
        const notAvailablePlatforms = this.platforms.filter(p => p.pastStatus === 'Not Available').length;
        
        // Calculate content metrics
        const totalCommitted = this.platforms.reduce((sum, p) => {
            const committed = typeof p.committed === 'number' ? p.committed : 0;
            return sum + committed;
        }, 0);
        
        const totalDrafted = this.platforms.reduce((sum, p) => {
            const drafted = typeof p.drafted === 'number' ? p.drafted : 0;
            return sum + drafted;
        }, 0);

        // Calculate hashtag analytics
        const categoryBreakdown = {};
        this.hashtags.forEach(h => {
            if (!categoryBreakdown[h.category]) {
                categoryBreakdown[h.category] = { count: 0, avgScore: 0, totalScore: 0 };
            }
            categoryBreakdown[h.category].count++;
            categoryBreakdown[h.category].totalScore += h.popularityScore;
        });

        // Calculate average scores
        Object.keys(categoryBreakdown).forEach(cat => {
            categoryBreakdown[cat].avgScore = Math.round(
                categoryBreakdown[cat].totalScore / categoryBreakdown[cat].count * 10
            ) / 10;
        });

        // Get top hashtags (score 8-10)
        const topHashtags = this.hashtags
            .filter(h => h.popularityScore >= 8)
            .sort((a, b) => b.popularityScore - a.popularityScore);

        // Process platform categories
        const platformCategories = {};
        this.platforms.forEach(p => {
            if (p.category && p.category !== '') {
                if (!platformCategories[p.category]) {
                    platformCategories[p.category] = {
                        count: 0,
                        active: 0,
                        inactive: 0,
                        totalCommitted: 0
                    };
                }
                platformCategories[p.category].count++;
                if (p.pastStatus === 'Active') platformCategories[p.category].active++;
                else if (p.pastStatus === 'Not Active') platformCategories[p.category].inactive++;
                
                if (typeof p.committed === 'number') {
                    platformCategories[p.category].totalCommitted += p.committed;
                }
            }
        });

        this.processedData = {
            platformStats: {
                active: activePlatforms,
                inactive: inactivePlatforms,
                notAvailable: notAvailablePlatforms,
                total: activePlatforms + inactivePlatforms + notAvailablePlatforms
            },
            contentMetrics: {
                totalCommitted,
                totalDrafted,
                completionRate: totalDrafted > 0 ? Math.round((totalDrafted / totalCommitted) * 100) : 0
            },
            hashtagAnalytics: {
                categoryBreakdown,
                topHashtags,
                totalCategories: Object.keys(categoryBreakdown).length
            },
            platformCategories,
            competitors: this.competitors
        };
    }

    // Getter methods for dashboard components
    getPlatformStats() {
        return this.processedData.platformStats;
    }

    getContentMetrics() {
        return this.processedData.contentMetrics;
    }

    getHashtagAnalytics() {
        return this.processedData.hashtagAnalytics;
    }

    getPlatformCategories() {
        return this.processedData.platformCategories;
    }

    getTopHashtags(limit = 10) {
        return this.processedData.hashtagAnalytics.topHashtags.slice(0, limit);
    }

    getPlatformsByStatus(status) {
        return this.platforms.filter(p => p.pastStatus === status);
    }

    getInactivePlatformsWithPotential() {
        return this.platforms
            .filter(p => p.pastStatus === 'Not Active' && p.committed > 15)
            .sort((a, b) => b.committed - a.committed);
    }

    getHashtagsByCategory(category) {
        return this.hashtags.filter(h => h.category === category);
    }

    searchHashtags(query) {
        const lowerQuery = query.toLowerCase();
        return this.hashtags.filter(h => 
            h.hashtag.toLowerCase().includes(lowerQuery) ||
            h.category.toLowerCase().includes(lowerQuery) ||
            h.usageContext.toLowerCase().includes(lowerQuery)
        );
    }

    searchPlatforms(query) {
        const lowerQuery = query.toLowerCase();
        return this.platforms.filter(p => 
            p.platform.toLowerCase().includes(lowerQuery) ||
            p.category.toLowerCase().includes(lowerQuery) ||
            p.primaryContent.toLowerCase().includes(lowerQuery)
        );
    }
}

// Initialize data instance
const dashboardData = new DashboardData();
dashboardData.loadData();