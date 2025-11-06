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
let portfolioValue = 125;
let currentPitchIndex = 0;
let investmentHistory = []; // Track all investments
let totalInvestments = 0;
let successfulInvestments = 0;
let currentRound = 1;
let maxRounds = 5;
let gameEnded = false;

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
        successChance: 0.75,
        risk: "Medium - Established partnerships but competitive market"
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
        successChance: 0.60,
        risk: "High - FDA approval uncertain, heavy regulations"
    },
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
        risk: "High - Low margins, scaling challenges, regulatory hurdles"
    },
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
        risk: "Very High - Volatile crypto market, unproven at scale"
    }
];

function openGameDemo() {
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
}







function getGamePageScript() {
    return `
        let currentFunds = 50;
        let portfolioValue = 125;
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
    
    // Reset offer slider
    document.getElementById('offerAmount').value = pitch.asking;
    updateOfferDisplay();
    
    // Reset panels
    document.getElementById('resultPanel').style.display = 'none';
    document.querySelector('.decision-panel').style.display = 'block';
}

function updateInvestorStats() {
    document.getElementById('availableFunds').textContent = `$${currentFunds.toFixed(3)}M`;
    document.getElementById('portfolioValue').textContent = `$${portfolioValue.toFixed(3)}M`;
    
    // Calculate success rate based on actual investment history
    let successRate = totalInvestments > 0 ? Math.round((successfulInvestments / totalInvestments) * 100) : 0;
    document.getElementById('successRate').textContent = `${successRate}%`;
    
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
            <td>${investment.successful ? '+' : ''}$${investment.return.toFixed(1)}M</td>
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
        resultDescription = `Unfortunately, ${pitch.entrepreneur.name} felt your offer of $${offerAmount}M for ${Math.round((offerAmount / pitch.asking) * pitch.equity)}% equity was too low and decided to seek other investors.`;
        portfolioImpact = `$0M (No Deal)`;
        
        // Refund the money since no deal was made
        currentFunds += offerAmount;
        showFeedback('Offer Rejected 🤝', '#f56565');
        
        // Record as failed attempt (not counted in success rate)
    } else if (isSuccessful) {
        // Successful investment - money multiplied
        const returnMultiplier = 2 + Math.random() * 3; // 2x to 5x return
        const investmentReturn = offerAmount * returnMultiplier;
        
        // Add the net profit to portfolio (return minus original investment)
        const netProfit = investmentReturn - offerAmount;
        portfolioValue += netProfit;
        
        resultTitle = `🎉 Investment Successful!`;
        resultDescription = `Excellent! ${pitch.company.name} accepted your offer and became a huge success. Your investment of $${offerAmount}M grew to $${investmentReturn.toFixed(1)}M over 3 years!`;
        portfolioImpact = `+$${netProfit.toFixed(1)}M`;
        
        // Record successful investment
        totalInvestments++;
        successfulInvestments++;
        investmentHistory.push({
            company: pitch.company.name,
            amount: offerAmount,
            equity: Math.round((offerAmount / pitch.asking) * pitch.equity),
            successful: true,
            return: netProfit
        });
        
        showFeedback('Successful Investment! 🚀', '#48bb78');
    } else {
        // Failed investment - money lost
        const lossPercentage = 0.7 + Math.random() * 0.3; // Lose 70-100% of investment
        const totalLoss = offerAmount * lossPercentage;
        const remainingValue = offerAmount - totalLoss;
        
        // Return whatever little remains to available funds
        currentFunds += remainingValue;
        
        // The net loss to portfolio is the total loss
        portfolioValue -= totalLoss;
        
        resultTitle = `💸 Investment Failed`;
        resultDescription = `${pitch.company.name} accepted your investment but unfortunately the company failed after 18 months. Market competition was fierce and they ran out of cash. You recovered only $${remainingValue.toFixed(1)}M of your $${offerAmount}M investment.`;
        portfolioImpact = `-$${totalLoss.toFixed(1)}M`;
        
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
    
    // Update result display
    document.getElementById('resultTitle').textContent = resultTitle;
    document.getElementById('resultDescription').textContent = resultDescription;
    document.getElementById('portfolioImpact').textContent = portfolioImpact;
    document.getElementById('fundsRemaining').textContent = `$${currentFunds.toFixed(3)}M`;
    
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
        resultDescription = `You passed on ${pitch.company.name}, but they secured funding from another investor and became a unicorn! Your potential $${pitch.asking}M investment could have returned $${missedReturn.toFixed(1)}M. Sometimes you have to take calculated risks.`;
        portfolioImpact = `$0M (Could have been +$${missedProfit.toFixed(1)}M)`;
        showFeedback('Huge Opportunity Missed! 📈💔', '#f6ad55');
    } else if (wouldHaveBeenAccepted && !wouldHaveSucceeded) {
        // Good decision to pass
        const wouldHaveLost = pitch.asking * (0.7 + Math.random() * 0.3);
        
        resultTitle = `🎯 Excellent Decision!`;
        resultDescription = `You wisely passed on ${pitch.company.name}. The company secured funding but failed after 2 years due to market challenges. Other investors lost $${wouldHaveLost.toFixed(1)}M of their $${pitch.asking}M investment. Your conservative approach saved you money!`;
        portfolioImpact = `$0M (Saved $${wouldHaveLost.toFixed(1)}M)`;
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
        fundsLeftEl.textContent = `$${currentFunds.toFixed(1)}M`;
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
    let title, message;
    
    if (reason === 'bankruptcy') {
        title = '💸 Game Over - Bankruptcy!';
        message = `You've run out of funds! You made ${totalInvestments} investments with a ${totalInvestments > 0 ? Math.round((successfulInvestments / totalInvestments) * 100) : 0}% success rate.`;
    } else {
        title = '🎉 Game Completed!';
        const finalReturn = portfolioValue + currentFunds - 175; // Starting was 50 funds + 125 portfolio
        message = `Congratulations! You completed all ${maxRounds} rounds with $${currentFunds.toFixed(1)}M remaining and a portfolio worth $${portfolioValue.toFixed(1)}M. Total return: $${finalReturn.toFixed(1)}M`;
    }
    
    document.getElementById('resultTitle').textContent = title;
    document.getElementById('resultDescription').textContent = message;
    document.getElementById('portfolioImpact').textContent = `Final Score: ${Math.max(0, finalReturn || 0).toFixed(1)}M`;
    document.getElementById('fundsRemaining').textContent = `Game Statistics: ${successfulInvestments}/${totalInvestments} successful investments`;
    
    // Hide next button and show restart option
    const nextBtn = document.querySelector('.btn-next');
    if (nextBtn) {
        nextBtn.textContent = 'Restart Game';
        nextBtn.onclick = restartGame;
    }
}

function restartGame() {
    currentFunds = 50;
    portfolioValue = 125;
    currentPitchIndex = 0;
    investmentHistory = [];
    totalInvestments = 0;
    successfulInvestments = 0;
    currentRound = 1;
    gameEnded = false;
    
    loadPitch(currentPitchIndex);
    updateInvestorStats();
    
    // Reset next button
    const nextBtn = document.querySelector('.btn-next');
    if (nextBtn) {
        nextBtn.textContent = 'Next Pitch';
        nextBtn.onclick = nextPitch;
    }
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