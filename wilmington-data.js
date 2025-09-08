// Wilmington Data processing utilities for CSV data
class WilmingtonDashboardData {
    constructor() {
        this.platforms = [];
        this.hashtags = [];
        this.competitors = [];
        this.processedData = {};
    }

    // Parse CSV data from the Wilmington Foods file
    async loadData() {
        // Platform data from Wilmington Foods CSV with actual platform URLs and Google Docs links
        this.platforms = [
            { sno: '', platform: 'Website', pastStatus: 'Already in Place', committed: '--', drafted: '--', published: '--', contentCreated: '', platformLink: 'https://wilmingtonfoods.com/', category: 'Digital Identity', primaryContent: '' },
            { sno: 1, platform: 'Website- blogs', pastStatus: 'Active', committed: 50, drafted: 0, published: 0, contentCreated: 'https://docs.google.com/document/d/13JSIXHTsARsDDTkbEegV3VN3vpvBaldHqa9XLQjTb1c/edit?usp=drive_link', platformLink: 'https://wilmingtonfoods.com/good-to-read/', category: 'Professional Writing', primaryContent: 'Long-form Articles, Thought Leadership' },
            { sno: 2, platform: 'Google Business', pastStatus: 'Not Active', committed: 100, drafted: 0, published: 0, contentCreated: 'https://docs.google.com/document/d/13CfHO2BSMQ-hIZ-Ix05vzKa6c02Cq1zoxN4TlquH7Sw/edit?usp=drive_link', platformLink: '', category: 'Local Business', primaryContent: 'Business Info, Reviews, Local Posts' },
            { sno: 3, platform: 'Linkedin', pastStatus: 'Active', committed: 45, drafted: 0, published: 0, contentCreated: 'https://docs.google.com/document/d/1nMDbcpbB0bQ90P8guHZE3iy6m827Jcve4DqV3uJYWFU/edit?usp=drive_link', platformLink: 'https://www.linkedin.com/company/wilmington-foods/', category: 'Professional Network', primaryContent: 'Articles, Company Updates, Industry News' },
            { sno: 4, platform: 'YouTube', pastStatus: 'Not Active', committed: 5, drafted: 0, published: 0, contentCreated: 'https://drive.google.com/drive/folders/1VjLK1PtsG1A4cdGsDmRWRdNkr3AJA2Md?usp=drive_link', platformLink: '', category: 'Long-Form Video', primaryContent: 'Long Videos, Tutorials, Vlogs' },
            { sno: 5, platform: 'Tiktok', pastStatus: 'Not Active', committed: 10, drafted: 0, published: 0, contentCreated: '', platformLink: '', category: 'Short-Form Video', primaryContent: 'Short Videos, Challenges, Trends' },
            { sno: 6, platform: 'Instagram', pastStatus: 'Active', committed: 180, drafted: 0, published: 0, contentCreated: 'https://docs.google.com/document/d/1wbCr8wavITL10BnEAdURYDKzqgsIEbPnoyo6vjnD9co/edit?usp=drive_link', platformLink: 'https://www.instagram.com/wilmingtonfoods/', category: 'Visual Content', primaryContent: 'Images, Stories, Reels, IGTV' },
            { sno: 7, platform: 'PinInterest', pastStatus: 'Not Active', committed: 180, drafted: 0, published: 1, contentCreated: 'https://docs.google.com/document/d/1qmdzoOdBIFu-ZKsmVfg85ugij4isTlN7rzeMRp3pFOU/edit?usp=drive_link', platformLink: '', category: 'Visual Content', primaryContent: 'Infographics, Product Images, Boards' },
            { sno: 8, platform: 'X (Twitter)', pastStatus: 'Active', committed: 180, drafted: 0, published: 1, contentCreated: 'https://docs.google.com/document/d/106-J7VxbGOcmcUYL32L4Wx9Cefk8FawMA0Vi9rbHITI/edit?usp=drive_link', platformLink: 'https://x.com/WilmingtonFoods', category: 'Real-Time Social', primaryContent: 'Real-time Updates, News, Discussions' },
            { sno: 9, platform: 'Facebook', pastStatus: 'Active', committed: 180, drafted: 0, published: 0, contentCreated: 'https://docs.google.com/document/d/1cw5TJhTsuIbNSEkMYGp6xrhHBTPQi6J1QNGKrE_97fU/edit?usp=drive_link', platformLink: 'https://www.facebook.com/WilmingtonFoods/', category: 'Social Community', primaryContent: 'Mixed Content, Community Posts, Events' },
            { sno: 10, platform: 'Medium', pastStatus: 'Not Active', committed: 30, drafted: 0, published: 2, contentCreated: 'https://docs.google.com/document/d/1zxVTTTxG3-M5NIQJwElBlmD9kusruLawBJHvpsc8a5E/edit?usp=drive_link', platformLink: '', category: 'Professional Writing', primaryContent: 'Long-form Articles, Thought Leadership' },
            { sno: 11, platform: 'Threads', pastStatus: 'Not Active', committed: 30, drafted: 0, published: 0, contentCreated: 'https://docs.google.com/document/d/16rUK1zYdRsW2OcvCpcxIHyYNfF2dPL9fVIvoUkm_pIw/edit?usp=drive_link', platformLink: '', category: 'Micro-Blogging', primaryContent: 'Short Posts, Real-time Updates' },
            { sno: 12, platform: 'Tumblr', pastStatus: 'Active', committed: 30, drafted: 0, published: 1, contentCreated: '', platformLink: '', category: 'Creative Blogging', primaryContent: 'Creative Content, Visual Stories, Blog Posts' }
        ];

        // Sample of hashtag data for Food industry
        this.hashtags = [
            { hashtag: '#WilmingtonFoods', category: 'Brand Food', usageContext: 'Brand recognition posts, company updates', platformSuitability: 'All platforms', popularityScore: 9, bestPostingTime: 'Business hours (9 AM - 6 PM GMT)' },
            { hashtag: '#FoodQuality', category: 'Core Food', usageContext: 'Quality assurance content, product excellence', platformSuitability: 'All platforms', popularityScore: 10, bestPostingTime: 'Peak hours (9-11 AM, 7-9 PM GMT)' },
            { hashtag: '#OrganicFoods', category: 'Health Food', usageContext: 'Organic product highlights, health benefits', platformSuitability: 'Instagram, Facebook, LinkedIn', popularityScore: 9, bestPostingTime: 'Morning (8-10 AM GMT)' },
            { hashtag: '#FoodSafety', category: 'Professional Food', usageContext: 'Safety standards, industry compliance', platformSuitability: 'LinkedIn, Twitter', popularityScore: 8, bestPostingTime: 'Business hours (9 AM - 6 PM GMT)' },
            { hashtag: '#SustainableFood', category: 'Eco Food', usageContext: 'Sustainability initiatives, eco-friendly practices', platformSuitability: 'All platforms', popularityScore: 10, bestPostingTime: 'Peak hours (9-11 AM, 7-9 PM GMT)' },
            { hashtag: '#FoodInnovation', category: 'Technology Food', usageContext: 'New products, innovative processes', platformSuitability: 'LinkedIn, Instagram', popularityScore: 8, bestPostingTime: 'Business hours (9 AM - 6 PM GMT)' },
            { hashtag: '#HealthyEating', category: 'Health Food', usageContext: 'Nutritional content, wellness promotion', platformSuitability: 'Instagram, Facebook', popularityScore: 10, bestPostingTime: 'Morning (6-9 AM GMT)' },
            { hashtag: '#FoodSupplyChain', category: 'Professional Food', usageContext: 'Supply chain excellence, logistics', platformSuitability: 'LinkedIn, Medium', popularityScore: 7, bestPostingTime: 'Business hours (9 AM - 6 PM GMT)' },
            { hashtag: '#FreshProduce', category: 'Product Food', usageContext: 'Fresh product showcases, quality highlights', platformSuitability: 'Instagram, Pinterest', popularityScore: 9, bestPostingTime: 'Morning (7-10 AM GMT)' },
            { hashtag: '#FoodTechnology', category: 'Technology Food', usageContext: 'Tech integration, modern food processing', platformSuitability: 'LinkedIn, Twitter, YouTube', popularityScore: 7, bestPostingTime: 'Business hours (9 AM - 6 PM GMT)' },
            { hashtag: '#NutritionFacts', category: 'Health Food', usageContext: 'Educational content, health awareness', platformSuitability: 'All platforms', popularityScore: 8, bestPostingTime: 'Peak hours (9-11 AM, 7-9 PM GMT)' },
            { hashtag: '#FarmToTable', category: 'Sourcing Food', usageContext: 'Source traceability, farm partnerships', platformSuitability: 'Instagram, Facebook', popularityScore: 9, bestPostingTime: 'Morning (8-11 AM GMT)' },
            { hashtag: '#FoodProcessing', category: 'Professional Food', usageContext: 'Manufacturing expertise, process quality', platformSuitability: 'LinkedIn, YouTube', popularityScore: 6, bestPostingTime: 'Business hours (9 AM - 6 PM GMT)' },
            { hashtag: '#QualityAssurance', category: 'Professional Food', usageContext: 'Quality control, testing standards', platformSuitability: 'LinkedIn, Twitter', popularityScore: 7, bestPostingTime: 'Business hours (9 AM - 6 PM GMT)' },
            { hashtag: '#FoodCertification', category: 'Professional Food', usageContext: 'Industry certifications, compliance', platformSuitability: 'LinkedIn, Medium', popularityScore: 6, bestPostingTime: 'Business hours (9 AM - 6 PM GMT)' },
            { hashtag: '#LocallySourced', category: 'Sourcing Food', usageContext: 'Local partnerships, community support', platformSuitability: 'Instagram, Facebook', popularityScore: 8, bestPostingTime: 'Peak hours (9-11 AM, 7-9 PM GMT)' },
            { hashtag: '#NonGMO', category: 'Health Food', usageContext: 'Non-GMO product features, natural choices', platformSuitability: 'All platforms', popularityScore: 8, bestPostingTime: 'Morning (8-11 AM GMT)' },
            { hashtag: '#FoodPackaging', category: 'Sustainability Food', usageContext: 'Sustainable packaging, eco initiatives', platformSuitability: 'LinkedIn, Instagram', popularityScore: 7, bestPostingTime: 'Business hours (9 AM - 6 PM GMT)' },
            { hashtag: '#NutritionalValue', category: 'Health Food', usageContext: 'Health benefits, nutritional content', platformSuitability: 'All platforms', popularityScore: 9, bestPostingTime: 'Morning (7-10 AM GMT)' },
            { hashtag: '#FoodExcellence', category: 'Brand Food', usageContext: 'Excellence stories, quality achievements', platformSuitability: 'All platforms', popularityScore: 10, bestPostingTime: 'Business hours (9 AM - 6 PM GMT)' }
        ];

        // Competitors data for Food industry
        this.competitors = [
            { rank: 1, name: 'Premium Foods Co.', website: '' },
            { rank: 2, name: 'Organic Valley Foods', website: '' },
            { rank: 3, name: 'Fresh Choice Foods', website: '' },
            { rank: 4, name: 'Quality Foods Ltd.', website: '' },
            { rank: 5, name: 'Natural Foods Corp.', website: '' },
            { rank: 6, name: 'Healthy Options Foods', website: '' },
            { rank: 7, name: 'Farm Fresh Foods', website: '' },
            { rank: 8, name: 'Pure Foods Group', website: '' },
            { rank: 9, name: 'Sustainable Foods Co.', website: '' },
            { rank: 10, name: 'Excellence Foods Ltd.', website: '' }
        ];

        this.processAnalytics();
    }

    processAnalytics() {
        // Calculate platform statistics
        const activePlatforms = this.platforms.filter(p => p.pastStatus === 'Active').length;
        const inactivePlatforms = this.platforms.filter(p => p.pastStatus === 'Not Active').length;
        const alreadyInPlace = this.platforms.filter(p => p.pastStatus === 'Already in Place').length;
        
        // Calculate content metrics - Updated totals from platform data
        const totalCommitted = this.platforms.reduce((sum, p) => {
            return sum + (typeof p.committed === 'number' ? p.committed : 0);
        }, 0);
        const totalDrafted = this.platforms.reduce((sum, p) => {
            return sum + (typeof p.drafted === 'number' ? p.drafted : 0);
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
                alreadyInPlace: alreadyInPlace,
                total: 12 // Total Wilmington Foods platforms
            },
            contentMetrics: {
                totalCommitted,
                totalDrafted,
                completionRate: totalCommitted > 0 ? Math.round((totalDrafted / totalCommitted) * 100) : 0
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

    // Helper method to format clickable links
    formatContentLink(contentCreated, platformName) {
        if (!contentCreated) return '';
        
        // Check if it's a Google Docs link
        if (contentCreated.startsWith('https://docs.google.com/')) {
            return `<a href="${contentCreated}" target="_blank" class="content-link">📄 View Content Plan</a>`;
        }
        
        // Check if it's a Google Drive link
        if (contentCreated.startsWith('https://drive.google.com/')) {
            return `<a href="${contentCreated}" target="_blank" class="content-link">📁 View Content Folder</a>`;
        }
        
        return contentCreated;
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
            .filter(p => p.pastStatus === 'Not Active' && p.contentCreated !== '')
            .sort((a, b) => (b.committed || 0) - (a.committed || 0));
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

// Initialize Wilmington data instance
const wilmingtonDashboardData = new WilmingtonDashboardData();
wilmingtonDashboardData.loadData();