// Initialize charts when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add decorative dots to the page
    addDecorativeDots();
    
    // Mobile menu toggle
    setupMobileMenu();
    
    // Animate elements on scroll
    setupScrollAnimations();
    
    // Add parallax effect
    setupParallaxEffect();
    
    // Add scroll-triggered animations
    setupScrollTriggers();
    
    // Add 3D card effect
    setup3DCardEffect();
    
    // Add magnetic buttons
    setupMagneticButtons();
    
    // Add text fade-in effect
    setupTextFadeEffect();
    
    // Add interactive background
    setupInteractiveBackground();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Initialize charts
    initializeCharts();

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', createRippleEffect);
    });
    
    // Add animation to category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach((card, index) => {
        card.style.setProperty('--animation-order', index);
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fadeIn');
    });
    
    // Add animation to question blocks
    const questionBlocks = document.querySelectorAll('.question-block');
    questionBlocks.forEach((block, index) => {
        const delay = 0.1 + (index * 0.05);
        block.style.animationDelay = `${delay}s`;
        block.classList.add('fadeIn');
    });
    
    // Setup view more buttons for answers
    setupViewMoreButtons();
    
    // Add interactive cursor effect
    setupCursorEffect();
});

// Function to create ripple effect on buttons
function createRippleEffect(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Function to add decorative dots to the page
function addDecorativeDots() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        if (index % 2 === 0) {
            const dot1 = document.createElement('div');
            dot1.classList.add('decorative-dot', 'dot-1');
            section.appendChild(dot1);
        } else {
            const dot2 = document.createElement('div');
            dot2.classList.add('decorative-dot', 'dot-2');
            section.appendChild(dot2);
            
            const dot3 = document.createElement('div');
            dot3.classList.add('decorative-dot', 'dot-3');
            section.appendChild(dot3);
        }
    });
}

// Function to setup mobile menu
function setupMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const body = document.body;
    
    if (!navToggle) return;
    
    // Create mobile menu elements if they don't exist
    if (!document.querySelector('.mobile-menu')) {
        const mobileMenu = document.createElement('div');
        mobileMenu.classList.add('mobile-menu');
        
        const closeBtn = document.createElement('div');
        closeBtn.classList.add('mobile-menu-close');
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        
        const menuLinks = document.createElement('div');
        menuLinks.classList.add('mobile-menu-links');
        
        // Clone navigation links
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            const links = navLinks.querySelectorAll('a');
            links.forEach(link => {
                const newLink = link.cloneNode(true);
                menuLinks.appendChild(newLink);
            });
        }
        
        mobileMenu.appendChild(closeBtn);
        mobileMenu.appendChild(menuLinks);
        
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        
        body.appendChild(mobileMenu);
        body.appendChild(overlay);
        
        // Event listeners for mobile menu
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
            body.style.overflow = 'hidden';
        });
        
        closeBtn.addEventListener('click', closeMobileMenu);
        overlay.addEventListener('click', closeMobileMenu);
        
        // Close menu when clicking on a link
        menuLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        function closeMobileMenu() {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
        }
    }
}

// Function to setup scroll animations
function setupScrollAnimations() {
    // Elements to animate on scroll
    const elementsToAnimate = document.querySelectorAll('.category-card, .question-block, .conclusion-text, .conclusion-image, .participate-content');
    
    // Make header image visible immediately
    const headerImage = document.querySelector('.header-image');
    if (headerImage) {
        headerImage.classList.add('fadeIn');
    }
    
    // Callback for intersection observer
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeIn');
                observer.unobserve(entry.target);
            }
        });
    };
    
    // Create intersection observer
    const observer = new IntersectionObserver(animateOnScroll, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
}

// Function to setup parallax effect
function setupParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Parallax for header
        const header = document.querySelector('header');
        if (header) {
            const headerImage = header.querySelector('.header-image');
            if (headerImage) {
                headerImage.style.transform = `perspective(1000px) rotateY(-5deg) translateY(${scrollY * 0.1}px)`;
            }
        }
        
        // Parallax for decorative dots
        const dots = document.querySelectorAll('.decorative-dot');
        dots.forEach(dot => {
            const speed = dot.classList.contains('dot-1') ? 0.05 : 
                          dot.classList.contains('dot-2') ? -0.03 : 0.07;
            const yPos = scrollY * speed;
            dot.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
}

// Function to setup scroll triggers
function setupScrollTriggers() {
    // Add path animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (index % 2 === 0) {
            const path = document.createElement('div');
            path.classList.add('animated-path', 'path-right');
            section.appendChild(path);
        } else {
            const path = document.createElement('div');
            path.classList.add('animated-path', 'path-left');
            section.appendChild(path);
        }
    });
    
    // Setup intersection observer for paths
    const pathObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-path');
            }
        });
    }, { threshold: 0.2 });
    
    // Observe all paths
    document.querySelectorAll('.animated-path').forEach(path => {
        pathObserver.observe(path);
    });
    
    // Add counter animation to statistics
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const percentElement = entry.target;
                const targetValue = parseFloat(percentElement.getAttribute('data-value'));
                animateCounter(percentElement, targetValue);
                statsObserver.unobserve(percentElement);
            }
        });
    }, { threshold: 0.8 });
    
    // Add data attributes to conclusion percentages
    const conclusionText = document.querySelector('.conclusion-text');
    if (conclusionText) {
        const paragraphs = conclusionText.querySelectorAll('p');
        paragraphs.forEach(p => {
            const text = p.innerHTML;
            const updatedText = text.replace(/(\d+\.\d+)%/g, '<span class="percent-counter" data-value="$1">0%</span>');
            p.innerHTML = updatedText;
        });
        
        // Observe all counters
        document.querySelectorAll('.percent-counter').forEach(counter => {
            statsObserver.observe(counter);
        });
    }
}

// Function to animate counter
function animateCounter(element, targetValue) {
    let startValue = 0;
    const duration = 2000;
    const increment = targetValue / (duration / 16); // 60fps
    
    const updateCounter = () => {
        startValue += increment;
        if (startValue < targetValue) {
            element.textContent = `${startValue.toFixed(1)}%`;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = `${targetValue}%`;
        }
    };
    
    requestAnimationFrame(updateCounter);
}

// Function to setup cursor effect
function setupCursorEffect() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);
    
    // Add cursor trail
    const trail = document.createElement('div');
    trail.classList.add('cursor-trail');
    document.body.appendChild(trail);
    
    const trailDots = [];
    const numTrailDots = 8;
    
    for (let i = 0; i < numTrailDots; i++) {
        const trailDot = document.createElement('div');
        trailDot.classList.add('trail-dot');
        trailDot.style.opacity = 1 - (i / numTrailDots);
        trailDot.style.transform = `scale(${1 - (i / numTrailDots) * 0.6})`;
        trail.appendChild(trailDot);
        trailDots.push({
            element: trailDot,
            x: 0,
            y: 0
        });
    }
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
        
        // Delayed follow for the dot
        setTimeout(() => {
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        }, 50);
    });
    
    function updateTrail() {
        trailDots.forEach((dot, index) => {
            // Ease towards the mouse position with delay based on index
            const delay = index * 2 + 1;
            dot.x += (mouseX - dot.x) / delay;
            dot.y += (mouseY - dot.y) / delay;
            
            dot.element.style.left = `${dot.x}px`;
            dot.element.style.top = `${dot.y}px`;
        });
        
        requestAnimationFrame(updateTrail);
    }
    
    updateTrail();
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .category-card, .question-block');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorDot.classList.add('dot-hover');
            trail.classList.add('trail-hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorDot.classList.remove('dot-hover');
            trail.classList.remove('trail-hover');
        });
    });
}

// Function to setup 3D card effect
function setup3DCardEffect() {
    const cards = document.querySelectorAll('.category-card, .question-block');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 10;
            const angleY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
            
            // Add highlight effect
            const shine = card.querySelector('.card-shine') || document.createElement('div');
            if (!card.querySelector('.card-shine')) {
                shine.classList.add('card-shine');
                card.appendChild(shine);
            }
            
            const shineX = (x / rect.width) * 100;
            const shineY = (y / rect.height) * 100;
            
            shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            
            const shine = card.querySelector('.card-shine');
            if (shine) {
                shine.style.background = 'none';
            }
        });
    });
}

// Function to setup magnetic buttons
function setupMagneticButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', e => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) * 0.2;
            const deltaY = (y - centerY) * 0.2;
            
            button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            
            // Add magnetic effect to button content
            const buttonContent = button.querySelector('.btn-content') || button;
            buttonContent.style.transform = `translate(${deltaX * 0.3}px, ${deltaY * 0.3}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
            
            const buttonContent = button.querySelector('.btn-content') || button;
            buttonContent.style.transform = 'translate(0, 0)';
        });
    });
}

// Function to setup text fade effect
function setupTextFadeEffect() {
    // Apply to section headers
    const sectionHeaders = document.querySelectorAll('.section-header h2');
    
    sectionHeaders.forEach(header => {
        const originalText = header.textContent;
        const words = originalText.split(' ');
        
        // Create span for each word
        let html = '';
        words.forEach((word, index) => {
            html += `<span class="fade-word" style="transition-delay: ${index * 0.1}s">${word}</span> `;
        });
        
        header.innerHTML = html;
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const words = header.querySelectorAll('.fade-word');
                    words.forEach(word => {
                        word.classList.add('word-visible');
                    });
                    observer.unobserve(header);
                    
                    // Add underline animation
                    setTimeout(() => {
                        header.classList.add('header-underline');
                    }, words.length * 100 + 200);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(header);
    });
}

// Function to setup text scramble effect
function setupTextScrambleEffect() {
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }
        
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise(resolve => this.resolve = resolve);
            this.queue = [];
            
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        
        update() {
            let output = '';
            let complete = 0;
            
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span class="dud">${char}</span>`;
                } else {
                    output += from;
                }
            }
            
            this.el.innerHTML = output;
            
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }
    
    // Apply to section headers
    const sectionHeaders = document.querySelectorAll('.section-header h2');
    
    sectionHeaders.forEach(header => {
        const originalText = header.textContent;
        const fx = new TextScramble(header);
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    fx.setText(originalText);
                    observer.unobserve(header);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(header);
    });
}

// Function to setup interactive background
function setupInteractiveBackground() {
    // Create canvas for interactive background
    const canvas = document.createElement('canvas');
    canvas.classList.add('interactive-bg');
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Resize handler
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = `rgba(74, 111, 165, ${Math.random() * 0.3})`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            
            if (this.y > height || this.y < 0) {
                this.speedY = -this.speedY;
            }
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    const particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let mouseRadius = 100;
    
    window.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            // Connect particles
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(74, 111, 165, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
            
            // Mouse interaction
            const dx = particles[i].x - mouseX;
            const dy = particles[i].y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouseRadius) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (mouseRadius - distance) / mouseRadius;
                
                particles[i].x += forceDirectionX * force * 5;
                particles[i].y += forceDirectionY * force * 5;
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Function to initialize all charts
function initializeCharts() {
    // Chart 1: Ai auzit vreodată glume sau comentarii negative față de o etnie?
    createDoughnutChart(
        'chart1',
        ['Da', 'Nu'],
        [90, 10],
        ['#4A6FA5', '#FF6B6B']
    );
    
    // Chart 2: Dacă da, ai reacționat sau ai rămas neutru?
    createDoughnutChart(
        'chart2',
        ['Am tăcut', 'Am spus că nu este bine', 'Am râs și eu'],
        [45.5, 45.5, 9.1],
        ['#4A6FA5', '#47B881', '#FF6B6B']
    );
    
    // Chart 3: Crezi că în R.Moldova există toleranța între diferite grupuri etnice?
    createDoughnutChart(
        'chart3',
        ['Da', 'Parțial', 'Nu'],
        [63.6, 9.1, 27.3],
        ['#47B881', '#FFB347', '#FF6B6B']
    );
    
    // Chart 4: Cu care din următoarele etnii din R.Moldova există cele mai multe stereotipuri?
    createBarChart(
        'chart4',
        ['Romi', 'Ucraineni', 'Ruși', 'Găgăuzi', 'Bulgari', 'Polonezi'],
        [77.3, 31.8, 50, 31.8, 0, 0]
    );
    
    // Chart 5: Ai fi dispus să participi la un proiect care ar viza integrarea romilor?
    createDoughnutChart(
        'chart5',
        ['Da', 'Nu'],
        [38.1, 61.9],
        ['#47B881', '#FF6B6B']
    );
    
    // Chart 6: Crezi că romii au aceleași șanse în educație și încadrarea în câmpul muncii?
    createDoughnutChart(
        'chart6',
        ['Nu', 'Da', 'Nu știu'],
        [18.2, 50, 31.8],
        ['#FF6B6B', '#47B881', '#FFB347']
    );
    
    // Chart 7: Te-ai simți confortabil cu un coleg de etnie romă?
    createDoughnutChart(
        'chart7',
        ['Da', 'Nu', 'Depinde de persoană'],
        [27.3, 9.1, 63.6],
        ['#47B881', '#FF6B6B', '#FFB347']
    );
}

// Function to create doughnut charts
function createDoughnutChart(canvasId, labels, data, backgroundColors) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColors,
                borderWidth: 0,
                borderRadius: 5,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            family: 'Roboto',
                            size: 12
                        },
                        color: '#666'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#333',
                    bodyColor: '#666',
                    bodyFont: {
                        family: 'Roboto'
                    },
                    borderColor: '#ddd',
                    borderWidth: 1,
                    cornerRadius: 8,
                    padding: 12,
                    boxPadding: 6,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true,
                duration: 2000,
                easing: 'easeOutQuart',
                delay: function(context) {
                    return context.dataIndex * 200;
                }
            },
            cutout: '70%'
        }
    });
}

// Function to create bar charts
function createBarChart(canvasId, labels, data) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    
    const gradients = [];
    const ctx2d = ctx.getContext('2d');
    
    // Create gradients for each bar
    for (let i = 0; i < labels.length; i++) {
        const gradient = ctx2d.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(74, 111, 165, 0.9)');
        gradient.addColorStop(1, 'rgba(74, 111, 165, 0.5)');
        gradients.push(gradient);
    }
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Procentaj',
                data: data,
                backgroundColor: gradients,
                borderColor: 'rgba(74, 111, 165, 1)',
                borderWidth: 1,
                borderRadius: 8,
                maxBarThickness: 60
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        color: '#666',
                        font: {
                            family: 'Roboto'
                        },
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#666',
                        font: {
                            family: 'Roboto'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#333',
                    bodyColor: '#666',
                    bodyFont: {
                        family: 'Roboto'
                    },
                    borderColor: '#ddd',
                    borderWidth: 1,
                    cornerRadius: 8,
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return `${context.raw}%`;
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart',
                delay: function(context) {
                    return context.dataIndex * 100;
                }
            }
        }
    });
}

// Function to setup view more buttons for answers
function setupViewMoreButtons() {
    const viewMoreButtons = document.querySelectorAll('.view-more-btn');
    
    viewMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const answersList = this.previousElementSibling;
            const hiddenAnswers = answersList.querySelectorAll('.hidden-answer');
            
            // Toggle hidden answers visibility
            hiddenAnswers.forEach((answer, index) => {
                answer.classList.toggle('show');
                answer.style.setProperty('--animation-order', index + 3); // Start after visible items
            });
            
            // Toggle button text and icon
            this.classList.toggle('active');
            if (this.classList.contains('active')) {
                this.innerHTML = 'Ascunde răspunsurile <i class="fas fa-chevron-up"></i>';
            } else {
                this.innerHTML = 'Vezi toate răspunsurile <i class="fas fa-chevron-down"></i>';
            }
        });
    });
    
    // Set animation order for visible list items
    const answersLists = document.querySelectorAll('.answers-list');
    answersLists.forEach(list => {
        const visibleItems = list.querySelectorAll('li:not(.hidden-answer)');
        visibleItems.forEach((item, index) => {
            item.style.setProperty('--animation-order', index);
        });
    });
}