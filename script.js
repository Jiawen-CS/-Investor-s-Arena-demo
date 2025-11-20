// Smooth scrolling functionality
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Add smooth transition to navbar
navbar.style.transition = 'transform 0.3s ease';

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.concept-item, .gameplay-step, .mechanic-card, .benefit-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Investment card interactions
document.addEventListener('DOMContentLoaded', () => {
    const investBtn = document.querySelector('.btn-invest');
    const passBtn = document.querySelector('.btn-pass');
    const investmentCard = document.querySelector('.investment-card');
    
    if (investBtn && passBtn && investmentCard) {
        investBtn.addEventListener('click', () => {
            investmentCard.style.transform = 'scale(1.05)';
            investmentCard.style.boxShadow = '0 15px 40px rgba(72, 187, 120, 0.4)';
            
            // Create success animation
            showFeedback('Investment Made! 💰', '#48bb78');
            
            setTimeout(() => {
                investmentCard.style.transform = 'scale(1)';
                investmentCard.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
            }, 300);
        });
        
        passBtn.addEventListener('click', () => {
            investmentCard.style.transform = 'scale(0.95)';
            investmentCard.style.opacity = '0.7';
            
            // Create pass animation
            showFeedback('Passed on Investment 👋', '#c53030');
            
            setTimeout(() => {
                investmentCard.style.transform = 'scale(1)';
                investmentCard.style.opacity = '1';
            }, 300);
        });
    }
});

// Feedback animation function
function showFeedback(message, color) {
    const feedback = document.createElement('div');
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: ${color};
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        font-weight: 600;
        font-size: 1.2rem;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: feedbackPop 2s ease;
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#feedback-styles')) {
        const style = document.createElement('style');
        style.id = 'feedback-styles';
        style.textContent = `
            @keyframes feedbackPop {
                0% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.5);
                }
                20% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1.1);
                }
                80% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.9);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.parentNode.removeChild(feedback);
        }
    }, 2000);
}

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active class styles
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .nav-menu a.active {
            color: #667eea !important;
            position: relative;
        }
        
        .nav-menu a.active::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            right: 0;
            height: 2px;
            background: #667eea;
            border-radius: 1px;
        }
    `;
    document.head.appendChild(style);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const investmentCard = document.querySelector('.investment-card');
    
    if (hero && investmentCard) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
        
        // Add rotation effect to investment card
        const rotation = scrolled * 0.05;
        investmentCard.style.transform = `rotateY(${rotation}deg)`;
    }
});

// Add mouse follow effect for concept items
document.addEventListener('DOMContentLoaded', () => {
    const conceptItems = document.querySelectorAll('.concept-item');
    
    conceptItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
});

// Add click to scroll functionality for all navigation links
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Ensure charts are visible immediately
    initializeCharts();
    
    // Animate chart bars when they come into view
    animateCharts();
});

function initializeCharts() {
    // Make sure all chart elements are visible
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach(bar => {
        bar.style.opacity = '1';
        bar.style.display = 'flex';
    });
    
    const linePoints = document.querySelectorAll('.line-point');
    linePoints.forEach(point => {
        point.style.opacity = '1';
        point.style.display = 'block';
    });
    
    const trendLines = document.querySelectorAll('.trend-line');
    trendLines.forEach(line => {
        line.style.opacity = '1';
        line.style.display = 'block';
    });
}

function animateCharts() {
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.chart-bar');
                bars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.animation = 'none';
                        bar.style.height = bar.style.height;
                        setTimeout(() => {
                            bar.style.animation = 'barGrow 1s ease-out forwards';
                        }, 50);
                    }, index * 200);
                });
                
                const points = entry.target.querySelectorAll('.line-point');
                points.forEach((point, index) => {
                    setTimeout(() => {
                        point.style.opacity = '0';
                        point.style.transform = 'scale(0)';
                        setTimeout(() => {
                            point.style.transition = 'all 0.5s ease';
                            point.style.opacity = '1';
                            point.style.transform = 'scale(1)';
                        }, 50);
                    }, index * 300);
                });
            }
        });
    }, { threshold: 0.5 });
    
    // Observe chart containers
    const chartContainers = document.querySelectorAll('.mini-pitch-demo, .results-demo, .choice-impact-demo');
    chartContainers.forEach(container => {
        chartObserver.observe(container);
    });
}

// Performance optimization: throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Existing scroll handlers can be called here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Game Demo Functionality
let currentFunds = 50;
let portfolioValue = 0; // Starts at 0, grows with successful investments
let currentPitchIndex = 0;
let investmentHistory = []; // Track all investments
let totalInvestments = 0;
let successfulInvestments = 0;
let currentRound = 1;
let maxRounds = 8; // Increased from 5 to 8 rounds
let gameEnded = false;

const allCompanies = [
    // 科技 - AI/机器学习
    {
        entrepreneur: { name: "Sarah Chen", title: "CEO & Founder" },
        company: { 
            name: "EcoTech Solutions", 
            tagline: "Sustainable Technology for Smart Cities",
            icon: "fas fa-leaf"
        },
        pitch: "We've developed revolutionary solar panels that are 40% more efficient than current technology. Our AI-powered energy management system optimizes power distribution in real-time. We're already partnered with 3 major cities and have $2M in pre-orders.",
        asking: 5,
        equity: 15,
        revenue: "$2M ARR",
        market: "$150B",
        successChance: 0.75,
        risk: "Medium - Established partnerships but competitive market",
        hints: {
            market: "Strong market tailwinds: Government incentives for green energy, growing smart city initiatives, $150B renewable energy market growing 8% annually",
            team: "Experienced team: Sarah has 15 years at Tesla's energy division, CTO formerly at Google's renewable energy team, strong engineering background",
            risks: "Competition from established players like Tesla Energy and Sunpower, but differentiated by AI optimization and city partnerships",
            financials: "Healthy metrics: 40% gross margins, existing revenue validates market demand, pre-orders indicate strong pipeline"
        }
    },
    
    // 医疗健康 - 高监管风险
    {
        entrepreneur: { name: "Dr. Marcus Johnson", title: "Co-Founder & CTO" },
        company: { 
            name: "HealthAI Analytics", 
            tagline: "AI-Powered Medical Diagnostics",
            icon: "fas fa-heartbeat"
        },
        pitch: "Our AI can detect early-stage cancer with 94% accuracy - better than most human doctors. We're working with 15 hospitals and have FDA approval pending. The market potential is enormous with aging populations worldwide.",
        asking: 8,
        equity: 20,
        revenue: "$1.2M ARR",
        market: "$280B",
        successChance: 0.60,
        risk: "High - FDA approval uncertain, heavy regulations",
        hints: {
            market: "Huge addressable market: $280B healthcare AI market, aging population driving demand, early cancer detection saves lives and costs",
            team: "Strong medical credentials: Dr. Johnson has 20+ years in radiology, team includes former FDA advisors, published 50+ research papers",
            risks: "Major regulatory hurdle: FDA approval timeline uncertain (2-5 years), requires extensive clinical trials, potential liability issues",
            financials: "Revenue from pilot programs encouraging, but path to profitability depends heavily on regulatory approval success"
        }
    },

    // 食品科技 - 社会影响
    {
        entrepreneur: { name: "Elena Rodriguez", title: "Founder" },
        company: { 
            name: "FoodWaste Zero", 
            tagline: "Eliminating Food Waste with Smart Logistics",
            icon: "fas fa-utensils"
        },
        pitch: "We connect restaurants with surplus food to food banks and consumers at discounted prices. Our app has saved 500,000 meals from waste and generated $3M in sales. We're expanding to 10 new cities this year.",
        asking: 3,
        equity: 12,
        revenue: "$800K ARR",
        market: "$45B",
        successChance: 0.55,
        risk: "High - Low margins, scaling challenges, regulatory hurdles",
        hints: {
            market: "Niche market with challenges: $45B food waste market exists, but low willingness to pay and fragmented customer base limit growth",
            team: "Operations experience but profitability concerns: Elena understands logistics, but team lacks experience building profitable low-margin businesses",
            risks: "Structural challenges: Ultra-thin margins (2-5%), complex multi-stakeholder coordination, regulatory compliance varies drastically by location",
            financials: "Volume impressive but unit economics concerning: High customer acquisition costs, seasonal demand, path to profitability unclear"
        }
    },

    // 金融科技 - 区块链
    {
        entrepreneur: { name: "David Kim", title: "CEO & Founder" },
        company: { 
            name: "CryptoSecure", 
            tagline: "Next-Gen Blockchain Security",
            icon: "fas fa-shield-alt"
        },
        pitch: "We've created unhackable blockchain infrastructure for enterprise clients. Major banks are interested, and we've already signed 2 Fortune 500 companies. The crypto market is exploding and security is the #1 concern.",
        asking: 12,
        equity: 25,
        revenue: "$500K ARR",
        market: "$75B",
        successChance: 0.40,
        risk: "Very High - Volatile crypto market, unproven at scale",
        hints: {
            market: "Volatile market: $75B blockchain security market exists, but crypto winter and regulatory uncertainty create massive headwinds",
            team: "Technical expertise but limited business experience: Strong cryptography background, but team lacks enterprise sales and regulatory navigation experience",
            risks: "Multiple major risks: Technology unproven at enterprise scale, regulatory crackdowns possible, crypto market volatility affects enterprise adoption",
            financials: "Concerning fundamentals: High burn rate, limited revenue runway, massive R&D costs with uncertain ROI timeline"
        }
    },

    // 教育科技 - VR/AR
    {
        entrepreneur: { name: "Lisa Wang", title: "Founder & CEO" },
        company: { 
            name: "EduVR", 
            tagline: "Virtual Reality Learning Platform",
            icon: "fas fa-graduation-cap"
        },
        pitch: "Our VR platform makes education immersive and engaging. Students can walk through ancient Rome or explore the human heart in 3D. We've partnered with 50+ schools and seen 300% improvement in test scores. Remote learning is the future!",
        asking: 6,
        equity: 18,
        revenue: "$1.5M ARR",
        market: "$90B",
        successChance: 0.70,
        risk: "Medium - Education market adoption can be slow",
        hints: {
            market: "Post-pandemic opportunity: $90B EdTech market accelerated by remote learning trends, schools investing heavily in digital tools",
            team: "Well-rounded team: Lisa has education background from Pearson, team includes former Oculus developers, strong curriculum design expertise",
            risks: "Education sales cycles are long (6-18 months), budget constraints in public schools, technology adoption barriers among educators",
            financials: "Solid fundamentals: Strong retention rates (95%), growing ARR, reasonable customer acquisition costs for B2B"
        }
    },

    // 农业科技 - 硬件
    {
        entrepreneur: { name: "Ahmed Hassan", title: "Co-Founder & CTO" },
        company: { 
            name: "AgroBot", 
            tagline: "Autonomous Farming Robots",
            icon: "fas fa-robot"
        },
        pitch: "Our autonomous robots can plant, water, and harvest crops 24/7 with 95% efficiency. We reduce labor costs by 80% and increase yields by 40%. Climate change demands smarter farming - we're already deployed on 100+ farms.",
        asking: 10,
        equity: 22,
        revenue: "$900K ARR",
        market: "$120B",
        successChance: 0.65,
        risk: "Medium-High - Hardware challenges, seasonal business",
        hints: {
            market: "Strong fundamentals: $120B agricultural robotics market, labor shortage driving automation need, climate change increasing precision farming demand",
            team: "Technical expertise: Ahmed has robotics PhD from MIT, team includes former John Deere engineers, strong hardware development track record",
            risks: "Hardware business challenges: High upfront development costs, seasonal cash flow, maintenance and support complexity in rural areas",
            financials: "Encouraging early traction: 100+ farm deployments show market validation, but hardware margins typically lower than software"
        }
    },

    // 心理健康 - B2C SaaS
    {
        entrepreneur: { name: "Dr. Priya Patel", title: "CEO & Founder" },
        company: { 
            name: "MindWell", 
            tagline: "AI-Powered Mental Health Support",
            icon: "fas fa-brain"
        },
        pitch: "Our AI therapist provides 24/7 mental health support through chat and video calls. We've helped 100,000+ users reduce anxiety by 60% on average. Mental health is a $240B crisis - we make therapy accessible and affordable.",
        asking: 4,
        equity: 16,
        revenue: "$600K ARR",
        market: "$240B",
        successChance: 0.85,
        risk: "Low-Medium - Growing market, strong user retention",
        hints: {
            market: "Perfect timing: $240B mental health market, pandemic increased demand 300%, insurance coverage expanding, destigmatization trend",
            team: "Clinical credibility: Dr. Patel is licensed psychologist with Stanford background, team includes AI experts and clinical advisors",
            risks: "Regulatory considerations: Some states require licensed oversight, data privacy critical, potential competition from big tech",
            financials: "Strong metrics: High user retention (85%), growing subscription base, proven product-market fit with 100K users"
        }
    },

    // 航天 - 高风险高回报
    {
        entrepreneur: { name: "James Mitchell", title: "Founder" },
        company: { 
            name: "SpaceLogistics", 
            tagline: "Satellite Delivery & Space Manufacturing",
            icon: "fas fa-rocket"
        },
        pitch: "We provide cost-effective satellite deployment and space manufacturing services. Our reusable rockets reduce launch costs by 70%. With 10,000+ satellites needed annually, we're positioned to capture this growing market.",
        asking: 25,
        equity: 30,
        revenue: "$300K ARR",
        market: "$400B",
        successChance: 0.35,
        risk: "Very High - Huge upfront costs, regulatory challenges, unproven technology",
        hints: {
            market: "Massive market but extreme barriers: $400B space economy looks attractive, but dominated by SpaceX and government contractors with decade-long customer cycles",
            team: "Technical credentials but execution unknown: James has SpaceX experience, but no track record leading independent space ventures or raising massive capital",
            risks: "Extreme capital requirements: Needs $500M+ for minimum viable scale, regulatory approval takes years, 90% of space startups fail",
            financials: "Pre-revenue with massive capital needs: $300K revenue meaningless against billion-dollar development costs, no clear path to profitability"
        }
    },

    // 电商 - 快时尚可持续
    {
        entrepreneur: { name: "Sofia Andersson", title: "CEO & Co-Founder" },
        company: { 
            name: "ThreadCycle", 
            tagline: "Sustainable Fast Fashion Alternative",
            icon: "fas fa-tshirt"
        },
        pitch: "We rent designer clothes for 90% less than retail price. Users get fresh outfits monthly while we handle cleaning and logistics. We've signed 50+ designers and have 25K active subscribers. Fast fashion is dying - we're the future.",
        asking: 7,
        equity: 20,
        revenue: "$2.5M ARR",
        market: "$180B",
        successChance: 0.68,
        risk: "Medium - Logistics complexity, changing consumer behavior",
        hints: {
            market: "Sustainability trend: $180B fashion market shifting toward sustainable options, Gen Z driving circular economy demand",
            team: "Retail expertise: Sofia has fashion industry background at H&M, operations team from successful logistics companies",
            risks: "Complex operations: Cleaning, logistics, inventory management challenging to scale, customer behavior still evolving",
            financials: "Strong traction: $2.5M ARR with 25K subscribers shows market validation, unit economics improving with scale"
        }
    },

    // 房地产科技 - PropTech
    {
        entrepreneur: { name: "Michael Torres", title: "Founder & CEO" },
        company: { 
            name: "InstantBuy", 
            tagline: "AI-Powered Real Estate Transactions",
            icon: "fas fa-home"
        },
        pitch: "We use AI to buy houses in 24 hours with cash offers. Sellers get instant liquidity, buyers get fair prices. We've flipped 500+ homes with 15% average profit margins. The real estate market is ripe for disruption.",
        asking: 15,
        equity: 25,
        revenue: "$4M ARR",
        market: "$200B",
        successChance: 0.45,
        risk: "High - Market dependent, high capital requirements, regulatory risks",
        hints: {
            market: "Large but cyclical: $200B real estate market, iBuyer trend growing, but highly sensitive to interest rates and economic cycles",
            team: "Mixed background: Michael has real estate experience, but team lacks deep tech expertise, AI claims may be overstated",
            risks: "Capital intensive model: Requires massive capital to buy inventory, market downturns could be catastrophic, regulatory scrutiny increasing",
            financials: "Revenue looks good but margins at risk: $4M ARR impressive, but 15% margins could disappear in market downturn"
        }
    },

    // 物流 - 最后一公里
    {
        entrepreneur: { name: "Yuki Tanaka", title: "CTO & Co-Founder" },
        company: { 
            name: "DroneRush", 
            tagline: "Autonomous Delivery Drones",
            icon: "fas fa-drone"
        },
        pitch: "Our delivery drones can transport packages up to 5kg within 30 minutes in urban areas. We've completed 10,000+ successful deliveries and partnered with 3 major retailers. Delivery costs drop by 60% compared to traditional methods.",
        asking: 9,
        equity: 18,
        revenue: "$800K ARR",
        market: "$100B",
        successChance: 0.52,
        risk: "High - Regulatory approval needed, weather dependent, safety concerns",
        hints: {
            market: "Future-focused but uncertain: $100B delivery market, strong demand for faster delivery, but drone regulations still evolving",
            team: "Strong technical team: Yuki has robotics background from Toyota, team includes former Amazon Prime Air engineers",
            risks: "Regulatory nightmare: FAA approval slow and complex, weather limitations, safety concerns, public acceptance uncertain",
            financials: "Early proof of concept: 10K deliveries show technical feasibility, but path to profitability requires massive scale"
        }
    },

    // 娱乐科技 - 游戏/元宇宙
    {
        entrepreneur: { name: "Alex Petrov", title: "Creative Director & CEO" },
        company: { 
            name: "MetaGaming", 
            tagline: "Virtual Worlds for Social Gaming",
            icon: "fas fa-vr-cardboard"
        },
        pitch: "We create immersive virtual worlds where players can earn real money through gameplay. Our flagship game has 2M+ users and generated $8M in virtual asset sales. The metaverse gaming market is exploding.",
        asking: 11,
        equity: 22,
        revenue: "$3.2M ARR",
        market: "$65B",
        successChance: 0.58,
        risk: "Medium-High - Competitive market, user acquisition costs, platform dependencies",
        hints: {
            market: "Hype cycle peak: $65B gaming market, metaverse trend cooling from peak hype, but sustainable niche markets emerging",
            team: "Creative talent: Alex has successful game design background, team from major gaming studios, strong user engagement expertise",
            risks: "Platform dependency: Success depends on external platforms (Apple, Google), high user acquisition costs, fickle user preferences",
            financials: "Strong user metrics: $3.2M ARR with 2M users shows good monetization, virtual asset sales provide recurring revenue"
        }
    },

    // 能源 - 储能技术
    {
        entrepreneur: { name: "Dr. Rachel Green", title: "CTO & Founder" },
        company: { 
            name: "PowerGrid+", 
            tagline: "Next-Gen Battery Storage Systems",
            icon: "fas fa-battery-full"
        },
        pitch: "Our solid-state batteries last 10x longer and charge 5x faster than lithium-ion. We're already supplying Tesla and have patents for the core technology. The energy storage market is growing 25% annually.",
        asking: 20,
        equity: 28,
        revenue: "$1.8M ARR",
        market: "$85B",
        successChance: 0.42,
        risk: "High - Manufacturing scale challenges, patent litigation risks, tech competition",
        hints: {
            market: "Critical technology: $85B battery market growing rapidly, driven by EV adoption and grid storage needs, huge strategic importance",
            team: "Deep technical expertise: Dr. Green has PhD in materials science, team includes former Tesla battery engineers, strong IP portfolio",
            risks: "Manufacturing hell: Solid-state batteries notoriously difficult to manufacture at scale, capital intensive, major competitors (Samsung, Toyota)",
            financials: "Promising but unproven: Tesla relationship validates technology, but manufacturing scale-up could require billions in investment"
        }
    },

    // 生物技术 - 基因治疗
    {
        entrepreneur: { name: "Dr. Benjamin Clark", title: "Chief Science Officer" },
        company: { 
            name: "GeneCure", 
            tagline: "Personalized Gene Therapy Solutions",
            icon: "fas fa-dna"
        },
        pitch: "We develop personalized gene therapies for rare genetic diseases. Our lead therapy shows 80% success rate in trials for muscular dystrophy. We have 3 therapies in clinical trials and partnerships with major pharma companies.",
        asking: 30,
        equity: 35,
        revenue: "$0 (Pre-revenue)",
        market: "$320B",
        successChance: 0.25,
        risk: "Very High - Clinical trial failures, regulatory approval, massive R&D costs",
        hints: {
            market: "Huge market but extremely difficult: $320B biotech market exists, but gene therapy success rate is <10%, most companies fail in clinical trials",
            team: "World-class science but commercial uncertainty: Brilliant researchers but no proven track record bringing gene therapies to market successfully",
            risks: "Extreme binary risk: 90% of biotech companies fail in clinical trials, FDA approval can take 15+ years, requires $500M+ investment with no guarantee",
            financials: "Pure moonshot investment: Zero revenue, will require massive capital injections for years, most similar companies never reach profitability"
        }
    },

    // 零售科技 - 无人商店
    {
        entrepreneur: { name: "Jennifer Wu", title: "CEO & Founder" },
        company: { 
            name: "SmartCart", 
            tagline: "Cashier-less Retail Experience",
            icon: "fas fa-shopping-cart"
        },
        pitch: "Our AI-powered stores let customers grab items and walk out - no checkout needed. We use computer vision and IoT sensors for 99.9% accuracy. We have 12 pilot stores running and partnerships with 2 major retail chains.",
        asking: 8,
        equity: 20,
        revenue: "$1.1M ARR",
        market: "$120B",
        successChance: 0.63,
        risk: "Medium - Technology reliability, theft prevention, high setup costs",
        hints: {
            market: "Post-COVID opportunity: $120B retail automation market, labor shortage driving adoption, contactless shopping preferred",
            team: "Retail-tech hybrid: Jennifer has operations background at Amazon Go, team combines retail expertise with computer vision specialists",
            risks: "Technology challenges: Computer vision still imperfect, high setup costs per store, customer behavior adaptation needed",
            financials: "Solid pilot results: $1.1M ARR from 12 stores shows unit economics potential, retail partnerships provide credibility"
        }
    }
];

// Game will randomly select 8 companies from this pool for each session
let pitchDatabase = [];

function openGameDemo() {
    // Reset game state every time the game is opened
    initializeGameState();
    
    const modal = document.getElementById('gameModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    loadPitch(currentPitchIndex);
    updateInvestorStats();
    
    // Initialize history section as collapsed
    const content = document.getElementById('historyContent');
    const toggle = document.getElementById('historyToggle');
    const header = document.querySelector('.history-header');
    
    if (content && toggle && header) {
        content.classList.add('collapsed');
        header.classList.add('collapsed');
        toggle.className = 'fas fa-chevron-right';
    }
    
    // Initialize hints section as collapsed
    const hintsContent = document.getElementById('hintsContent');
    const hintsToggle = document.getElementById('hintsToggle');
    
    if (hintsContent && hintsToggle) {
        hintsContent.classList.add('collapsed');
        hintsToggle.className = 'fas fa-chevron-down toggle-icon';
    }
}

// Function to randomly select 8 companies for this game session
function generateRandomPitches() {
    // Shuffle the array and select 8 companies
    const shuffled = [...allCompanies].sort(() => 0.5 - Math.random());
    pitchDatabase = shuffled.slice(0, 8);
    
    console.log("Selected companies for this session:", pitchDatabase.map(c => c.company.name));
}

// Function to initialize/reset all game state variables
function initializeGameState() {
    currentFunds = 50;
    portfolioValue = 0; // Start with 0 portfolio value, grows with successful investments
    currentPitchIndex = 0;
    investmentHistory = [];
    totalInvestments = 0;
    successfulInvestments = 0;
    currentRound = 1;
    gameEnded = false;
    
    // Generate new random selection of companies
    generateRandomPitches();
    
    // Reset panels
    const resultPanel = document.getElementById('resultPanel');
    const decisionPanel = document.querySelector('.decision-panel');
    
    if (resultPanel) {
        resultPanel.style.display = 'none';
    }
    if (decisionPanel) {
        decisionPanel.style.display = 'block';
    }
    
    // Reset next button if it was changed to restart
    const nextBtn = document.querySelector('.btn-next');
    if (nextBtn) {
        nextBtn.textContent = 'Next Pitch';
        nextBtn.onclick = nextPitch;
    }
}







function getGamePageScript() {
    return `
        let currentFunds = 50;
        let portfolioValue = 0;
        let currentPitchIndex = 0;
        
        const pitchDatabase = [
            {
                entrepreneur: { name: "Sarah Chen", title: "CEO & Founder" },
                company: { 
                    name: "EcoTech Solutions", 
                    tagline: "Sustainable Technology for Smart Cities",
                    icon: "fas fa-leaf"
                },
                pitch: "We've developed revolutionary solar panels that are 40% more efficient than current technology. Our AI-powered energy management system optimizes power distribution in real-time. We're already partnered with 3 major cities and have $2M in pre-orders.",
                asking: 5,
                equity: 15,
                revenue: "$2M ARR",
                market: "$150B",
                successChance: 0.75
            },
            {
                entrepreneur: { name: "Marcus Johnson", title: "Co-Founder & CTO" },
                company: { 
                    name: "HealthAI Analytics", 
                    tagline: "AI-Powered Medical Diagnostics",
                    icon: "fas fa-heartbeat"
                },
                pitch: "Our AI can detect early-stage cancer with 94% accuracy - better than most human doctors. We're working with 15 hospitals and have FDA approval pending. The market potential is enormous with aging populations worldwide.",
                asking: 8,
                equity: 20,
                revenue: "$1.2M ARR",
                market: "$280B",
                successChance: 0.60
            }
        ];
        

        

        

    `;
}

function closeGameDemo() {
    const modal = document.getElementById('gameModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Reset result panel
    document.getElementById('resultPanel').style.display = 'none';
    document.querySelector('.decision-panel').style.display = 'block';
}

function loadPitch(index) {
    const pitch = pitchDatabase[index];
    
    // Update entrepreneur info
    document.getElementById('entrepreneurName').textContent = pitch.entrepreneur.name;
    document.getElementById('entrepreneurTitle').textContent = pitch.entrepreneur.title;
    
    // Update company info
    document.getElementById('companyName').textContent = pitch.company.name;
    document.getElementById('companyTagline').textContent = pitch.company.tagline;
    document.getElementById('companyIcon').className = pitch.company.icon;
    document.getElementById('pitchDescription').textContent = pitch.pitch;
    
    // Update metrics
    document.getElementById('askingAmount').textContent = `$${pitch.asking}M`;
    document.getElementById('equityOffered').textContent = `${pitch.equity}%`;
    document.getElementById('currentRevenue').textContent = pitch.revenue;
    document.getElementById('marketSize').textContent = pitch.market;
    
    // Update hints content
    if (pitch.hints) {
        document.getElementById('marketHint').textContent = pitch.hints.market;
        document.getElementById('teamHint').textContent = pitch.hints.team;
        document.getElementById('riskHint').textContent = pitch.hints.risks;
        document.getElementById('financialHint').textContent = pitch.hints.financials;
    }
    
    // Reset hint panel to collapsed state
    const hintsContent = document.getElementById('hintsContent');
    const hintsToggle = document.getElementById('hintsToggle');
    if (hintsContent && hintsToggle) {
        hintsContent.classList.add('collapsed');
        hintsToggle.className = 'fas fa-chevron-down toggle-icon';
    }
    
    // Reset offer slider
    document.getElementById('offerAmount').value = pitch.asking;
    updateOfferDisplay();
    
    // Reset panels
    document.getElementById('resultPanel').style.display = 'none';
    document.querySelector('.decision-panel').style.display = 'block';
}

function updateInvestorStats() {
    document.getElementById('availableFunds').textContent = `$${currentFunds.toFixed(2)}M`;
    document.getElementById('portfolioValue').textContent = `$${portfolioValue.toFixed(2)}M`;
    
    // Calculate success rate based on actual investment history
    let successRate = totalInvestments > 0 ? Math.round((successfulInvestments / totalInvestments) * 100) : 0;
    document.getElementById('successRate').textContent = `${successRate}%`;
    
    // Update round display and progress bar
    const roundElement = document.getElementById('currentRound');
    if (roundElement) {
        roundElement.textContent = `${currentRound}/${maxRounds}`;
    }
    
    // Update progress bar
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        const progressPercent = (currentRound / maxRounds) * 100;
        progressFill.style.width = `${progressPercent}%`;
    }
    
    // Update investment history display
    updateInvestmentHistoryDisplay();
    
    // Update game status
    updateGameStatus();
}

function updateInvestmentHistoryDisplay() {
    const historyTable = document.querySelector('#investmentHistory tbody');
    if (!historyTable) return;
    
    // Clear existing rows
    historyTable.innerHTML = '';
    
    // Add recent investments (last 5)
    const recentInvestments = investmentHistory.slice(-5).reverse();
    
    recentInvestments.forEach(investment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${investment.company}</td>
            <td>$${investment.amount}M</td>
            <td><span class="status ${investment.successful ? 'success' : 'failure'}">${investment.successful ? 'Win' : 'Loss'}</span></td>
            <td>${investment.successful ? '+' : ''}$${investment.return.toFixed(2)}M</td>
        `;
        historyTable.appendChild(row);
    });
    
    // If no investments yet, show placeholder
    if (recentInvestments.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="4" style="text-align: center; color: #666;">No investments yet</td>';
        historyTable.appendChild(row);
    }
    
    // Update game status display
    updateGameStatus();
}

function updateOfferDisplay() {
    const offerAmount = document.getElementById('offerAmount').value;
    const pitch = pitchDatabase[currentPitchIndex];
    const offerEquity = Math.round((offerAmount / pitch.asking) * pitch.equity);
    
    document.getElementById('offerValue').textContent = offerAmount;
    document.getElementById('offerEquity').textContent = offerEquity;
}

// Add event listener for offer slider
document.addEventListener('DOMContentLoaded', () => {
    const offerSlider = document.getElementById('offerAmount');
    if (offerSlider) {
        offerSlider.addEventListener('input', updateOfferDisplay);
    }
    
    // Initialize game when modal opens
    const gameModal = document.getElementById('gameModal');
    if (gameModal) {
        gameModal.addEventListener('shown', initializeGame);
    }
});

// Initialize game function
function initializeGame() {
    loadPitch(currentPitchIndex);
    updateInvestorStats();
}

function makeInvestment() {
    const pitch = pitchDatabase[currentPitchIndex];
    const offerAmount = parseFloat(document.getElementById('offerAmount').value);
    
    // Check if player has enough funds
    if (offerAmount > currentFunds) {
        showFeedback('Insufficient funds! 💸', '#c53030');
        return;
    }
    
    // Hide decision panel, show result
    document.querySelector('.decision-panel').style.display = 'none';
    document.getElementById('resultPanel').style.display = 'block';
    
    // Calculate success based on offer attractiveness and company potential
    const offerRatio = offerAmount / pitch.asking;
    const baseChance = pitch.successChance;
    const finalChance = Math.min(baseChance + (offerRatio - 1) * 0.2, 0.95);
    
    const isSuccessful = Math.random() < finalChance;
    
    // Update funds
    currentFunds -= offerAmount;
    
    let resultTitle, resultDescription, portfolioImpact;
    
    // Determine if offer is accepted first
    const offerAcceptanceChance = Math.min(0.7 + (offerRatio - 0.8) * 0.4, 0.95);
    const isOfferAccepted = Math.random() < offerAcceptanceChance;
    
    if (!isOfferAccepted) {
        // Offer rejected - no money lost
        resultTitle = `😔 Investment Declined`;
        const rejectionReason = getFailureReason(pitch, offerAmount, false);
        resultDescription = `${pitch.entrepreneur.name} declined your offer of $${offerAmount}M for ${Math.round((offerAmount / pitch.asking) * pitch.equity)}% equity. ${rejectionReason}`;
        portfolioImpact = `$0M (No Deal)`;
        
        // Refund the money since no deal was made
        currentFunds += offerAmount;
        showFeedback('Offer Rejected 🤝', '#f56565');
        
        // Record as failed attempt (not counted in success rate)
    } else if (isSuccessful) {
        // Successful investment - company grows in value
        const returnMultiplier = 2 + Math.random() * 3; // 2x to 5x return
        const currentInvestmentValue = offerAmount * returnMultiplier;
        
        // Add the current value of this investment to portfolio
        portfolioValue += currentInvestmentValue;
        
        // Calculate profit for display
        const profit = currentInvestmentValue - offerAmount;
        
        resultTitle = `🎉 Investment Successful!`;
        resultDescription = `Outstanding decision! ${pitch.company.name} exceeded expectations and delivered a ${returnMultiplier.toFixed(1)}x return on your investment. Your $${offerAmount}M is now worth $${currentInvestmentValue.toFixed(2)}M - a profit of $${profit.toFixed(2)}M!`;
        portfolioImpact = `+$${currentInvestmentValue.toFixed(2)}M (${(returnMultiplier * 100 - 100).toFixed(0)}% return)`;
        
        // Record successful investment
        totalInvestments++;
        successfulInvestments++;
        investmentHistory.push({
            company: pitch.company.name,
            amount: offerAmount,
            equity: Math.round((offerAmount / pitch.asking) * pitch.equity),
            successful: true,
            return: profit,
            currentValue: currentInvestmentValue
        });
        
        showFeedback('Successful Investment! 🚀', '#48bb78');
    } else {
        // Failed investment - money lost, no portfolio value change
        const lossPercentage = 0.8 + Math.random() * 0.2; // Lose 80-100% of investment
        const totalLoss = offerAmount * lossPercentage;
        const remainingValue = offerAmount - totalLoss;
        
        // Return whatever little remains to available funds
        currentFunds += remainingValue;
        
        // Portfolio value doesn't change - failed investments don't add negative value to portfolio
        // The loss is already reflected in the reduced available funds
        
        resultTitle = `💸 Investment Failed`;
        const failureReason = getFailureReason(pitch, offerAmount, true);
        resultDescription = `${pitch.company.name} accepted your $${offerAmount}M investment but unfortunately failed after 18 months. ${failureReason} You recovered only $${remainingValue.toFixed(2)}M from the wreckage.`;
        portfolioImpact = `Lost $${totalLoss.toFixed(2)}M from available funds`;
        
        // Record failed investment
        totalInvestments++;
        investmentHistory.push({
            company: pitch.company.name,
            amount: offerAmount,
            equity: Math.round((offerAmount / pitch.asking) * pitch.equity),
            successful: false,
            return: -totalLoss
        });
        
        showFeedback('Investment Lost! 📉', '#e53e3e');
    }
    
    // Update result display with enhanced visual effects
    document.getElementById('resultTitle').textContent = resultTitle;
    document.getElementById('resultDescription').textContent = resultDescription;
    document.getElementById('portfolioImpact').textContent = portfolioImpact;
    document.getElementById('fundsRemaining').textContent = `$${currentFunds.toFixed(2)}M`;
    
    // Update result visual effects based on outcome
    const resultIcon = document.getElementById('resultIcon');
    const portfolioCard = document.getElementById('portfolioCard');
    
    // Remove existing classes
    portfolioCard.classList.remove('success', 'failure', 'neutral');
    
    if (resultTitle.includes('Successful')) {
        resultIcon.textContent = '🚀';
        portfolioCard.classList.add('success');
    } else if (resultTitle.includes('Failed')) {
        resultIcon.textContent = '💸';
        portfolioCard.classList.add('failure');
    } else if (resultTitle.includes('Declined')) {
        resultIcon.textContent = '😔';
        portfolioCard.classList.add('neutral');
    }
    
    // Trigger animation reset
    const resultContent = document.querySelector('.result-content');
    if (resultContent) {
        resultContent.style.animation = 'none';
        requestAnimationFrame(() => {
            resultContent.style.animation = '';
        });
    }
    
    updateInvestorStats();
    
    // Check if game should end
    if (currentFunds <= 0 && !gameEnded) {
        setTimeout(() => checkGameEnd(), 1000);
    }
}

function passInvestment() {
    const pitch = pitchDatabase[currentPitchIndex];
    
    // Hide decision panel, show result
    document.querySelector('.decision-panel').style.display = 'none';
    document.getElementById('resultPanel').style.display = 'block';
    
    // Simulate what would have happened if they invested
    const wouldHaveBeenAccepted = Math.random() < 0.8; // 80% chance of acceptance at asking price
    const wouldHaveSucceeded = Math.random() < pitch.successChance;
    
    let resultTitle, resultDescription, portfolioImpact;
    
    if (wouldHaveBeenAccepted && wouldHaveSucceeded) {
        // Missed a great opportunity
        const missedReturn = pitch.asking * (2 + Math.random() * 3);
        const missedProfit = missedReturn - pitch.asking;
        
        resultTitle = `😬 Major Opportunity Missed!`;
        resultDescription = `You passed on ${pitch.company.name}, but they secured funding from another investor and became a unicorn! Your potential $${pitch.asking}M investment could have returned $${missedReturn.toFixed(2)}M. Sometimes you have to take calculated risks.`;
        portfolioImpact = `$0M (Could have been +$${missedProfit.toFixed(2)}M)`;
        showFeedback('Huge Opportunity Missed! 📈💔', '#f6ad55');
    } else if (wouldHaveBeenAccepted && !wouldHaveSucceeded) {
        // Good decision to pass
        const wouldHaveLost = pitch.asking * (0.7 + Math.random() * 0.3);
        
        resultTitle = `🎯 Excellent Decision!`;
        resultDescription = `You wisely passed on ${pitch.company.name}. The company secured funding but failed after 2 years due to market challenges. Other investors lost $${wouldHaveLost.toFixed(2)}M of their $${pitch.asking}M investment. Your conservative approach saved you money!`;
        portfolioImpact = `$0M (Saved $${wouldHaveLost.toFixed(2)}M)`;
        showFeedback('Smart Pass! 🧠💰', '#4299e1');
    } else {
        // Neutral outcome - they wouldn't have gotten a deal anyway
        resultTitle = `😐 No Impact`;
        resultDescription = `You passed on ${pitch.company.name}. They struggled to find investors willing to meet their terms and eventually had to pivot their business model. Your decision had no negative impact.`;
        portfolioImpact = `$0M (Neutral)`;
        showFeedback('Safe Choice 🛡️', '#718096');
    }
    
    // Update result display
    document.getElementById('resultTitle').textContent = resultTitle;
    document.getElementById('resultDescription').textContent = resultDescription;
    document.getElementById('portfolioImpact').textContent = portfolioImpact;
    document.getElementById('fundsRemaining').textContent = `$${currentFunds}M`;
}

function updateGameStatus() {
    const fundsLeftEl = document.getElementById('fundsLeft');
    const gameStatusEl = document.getElementById('gameStatus');
    
    if (fundsLeftEl) {
        fundsLeftEl.textContent = `$${currentFunds.toFixed(2)}M`;
    }
    
    if (gameStatusEl) {
        if (gameEnded) {
            gameStatusEl.textContent = 'Game Over';
            gameStatusEl.style.color = '#e53e3e';
        } else if (currentFunds <= 0) {
            gameStatusEl.textContent = 'Bankrupt!';
            gameStatusEl.style.color = '#e53e3e';
        } else {
            gameStatusEl.textContent = `Round ${currentRound}/${maxRounds}`;
            gameStatusEl.style.color = '#4c51bf';
        }
    }
}

function checkGameEnd() {
    if (currentFunds <= 0) {
        gameEnded = true;
        showGameOverModal('bankruptcy');
        return true;
    }
    
    if (currentRound > maxRounds) {
        gameEnded = true;
        showGameOverModal('completed');
        return true;
    }
    
    return false;
}

function showGameOverModal(reason) {
    let title, message, finalReturn = 0;
    
    if (reason === 'bankruptcy') {
        title = '💸 Game Over - Bankruptcy!';
        message = `You've run out of funds after ${currentRound - 1} rounds! Your portfolio is still worth $${portfolioValue.toFixed(2)}M, but you have no cash left to invest.`;
        finalReturn = portfolioValue - 50; // Net return: current portfolio value minus starting cash
    } else {
        title = '🎉 Game Completed!';
        const totalAssets = portfolioValue + currentFunds; // Current portfolio value + remaining cash
        finalReturn = totalAssets - 50; // Net return compared to starting cash (50M)
        if (finalReturn > 0) {
            message = `Congratulations! You made $${finalReturn.toFixed(2)}M profit! You have $${currentFunds.toFixed(2)}M cash remaining plus a portfolio worth $${portfolioValue.toFixed(2)}M.`;
        } else {
            message = `Game completed! You lost $${Math.abs(finalReturn).toFixed(2)}M overall. You have $${currentFunds.toFixed(2)}M cash remaining and a portfolio worth $${portfolioValue.toFixed(2)}M.`;
        }
    }
    
    document.getElementById('resultTitle').textContent = title;
    document.getElementById('resultDescription').textContent = message;
    document.getElementById('portfolioImpact').textContent = finalReturn >= 0 ? `Profit: +$${finalReturn.toFixed(2)}M` : `Loss: -$${Math.abs(finalReturn).toFixed(2)}M`;
    document.getElementById('fundsRemaining').textContent = `Funds Remaining: $${currentFunds.toFixed(2)}M`;
    
    // Show restart button with clear styling
    const nextBtn = document.querySelector('.btn-next');
    if (nextBtn) {
        nextBtn.textContent = '🔄 Play Again';
        nextBtn.innerHTML = '<i class="fas fa-redo"></i> Play Again';
        nextBtn.onclick = restartGame;
        nextBtn.style.backgroundColor = '#48bb78';
        nextBtn.style.color = 'white';
    }
}

function restartGame() {
    // Use the centralized initialization function
    initializeGameState();
    
    loadPitch(currentPitchIndex);
    updateInvestorStats();
    
    // Show success message
    showFeedback('Game Restarted! 🎮', '#4299e1');
}

function toggleInvestmentHistory() {
    const content = document.getElementById('historyContent');
    const toggle = document.getElementById('historyToggle');
    const header = document.querySelector('.history-header');
    
    if (content && toggle && header) {
        content.classList.toggle('collapsed');
        header.classList.toggle('collapsed');
        
        // Update icon
        if (content.classList.contains('collapsed')) {
            toggle.className = 'fas fa-chevron-right';
        } else {
            toggle.className = 'fas fa-chevron-down';
        }
    }
}

function nextPitch() {
    if (gameEnded) return;
    
    currentRound++;
    
    if (checkGameEnd()) {
        return;
    }
    
    currentPitchIndex = (currentPitchIndex + 1) % pitchDatabase.length;
    loadPitch(currentPitchIndex);
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('gameModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeGameDemo();
            }
        });
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeGameDemo();
    }
});

// Toggle hints panel
function toggleHints() {
    const content = document.getElementById('hintsContent');
    const toggle = document.getElementById('hintsToggle');
    
    if (content && toggle) {
        content.classList.toggle('collapsed');
        
        // Update icon
        if (content.classList.contains('collapsed')) {
            toggle.className = 'fas fa-chevron-down toggle-icon';
        } else {
            toggle.className = 'fas fa-chevron-up toggle-icon';
        }
    }
}

// Enhanced feedback system for failed investments
function getFailureReason(pitch, offerAmount, isOfferAccepted) {
    if (!isOfferAccepted) {
        const offerRatio = offerAmount / pitch.asking;
        if (offerRatio < 0.8) {
            return "Your offer was too low - they felt undervalued and sought better terms elsewhere.";
        } else {
            return "Despite a fair offer, they preferred a different investor with better strategic value.";
        }
    }
    
    // Analyze why the investment failed based on company characteristics
    const successChance = pitch.successChance;
    const random = Math.random();
    
    if (successChance < 0.4) { // Very high risk companies
        const reasons = [
            "The technology proved harder to scale than anticipated - execution challenges derailed progress.",
            "Regulatory hurdles were more complex than expected, delaying market entry significantly.",
            "The market wasn't ready for this innovation - customer adoption was much slower than projected.",
            "Competition from well-funded incumbents made market penetration nearly impossible."
        ];
        return reasons[Math.floor(random * reasons.length)];
    } else if (successChance < 0.6) { // High risk companies
        const reasons = [
            "While the team was talented, they struggled with the operational challenges of rapid scaling.",
            "Market conditions shifted unfavorably, making their business model less viable.",
            "Key partnerships fell through, significantly impacting their growth trajectory.",
            "They burned through capital too quickly trying to achieve growth, leading to financial difficulties."
        ];
        return reasons[Math.floor(random * reasons.length)];
    } else { // Medium-low risk companies that still failed
        const reasons = [
            "Despite strong fundamentals, unexpected competitive pressure eroded their market position.",
            "Management made strategic missteps that you should have spotted during due diligence.",
            "Economic headwinds affected their market segment more than anticipated.",
            "Internal team conflicts and leadership changes disrupted their execution."
        ];
        return reasons[Math.floor(random * reasons.length)];
    }
}