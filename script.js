/* ==========================================================================
   INTERACTIVE PARTICLES BACKGROUND
   ========================================================================== */
class ParticleNetwork {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 60;
        this.connectionDistance = 120;
        
        this.mouse = {
            x: null,
            y: null,
            radius: 150
        };
        
        this.init();
        this.animate();
        this.setupEventListeners();
    }
    
    init() {
        this.resize();
        this.particles = [];
        
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                size: Math.random() * 2 + 1,
                color: Math.random() > 0.5 ? '#00f2fe' : '#a855f7'
            });
        }
    }
    
    resize() {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.canvas.style.width = `${window.innerWidth}px`;
        this.canvas.style.height = `${window.innerHeight}px`;
        this.ctx.scale(dpr, dpr);
        
        // Adjust particle density based on screen size
        if (window.innerWidth < 768) {
            this.particleCount = 30;
            this.connectionDistance = 80;
        } else {
            this.particleCount = 70;
            this.connectionDistance = 130;
        }
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
            this.init();
        });
        
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        window.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }
    
    drawParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.shadowBlur = 8;
            this.ctx.shadowColor = p.color;
            this.ctx.fill();
            this.ctx.shadowBlur = 0; // Reset shadow for efficiency
        }
    }
    
    updateParticles() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            
            p.x += p.vx;
            p.y += p.vy;
            
            // Boundary collisions
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
            
            // Mouse interact
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = p.x - this.mouse.x;
                const dy = p.y - this.mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < this.mouse.radius) {
                    const force = (this.mouse.radius - dist) / this.mouse.radius;
                    p.x += (dx / dist) * force * 1.5;
                    p.y += (dy / dist) * force * 1.5;
                }
            }
        }
    }
    
    drawConnections() {
        const length = this.particles.length;
        for (let i = 0; i < length; i++) {
            const p1 = this.particles[i];
            for (let j = i + 1; j < length; j++) {
                const p2 = this.particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < this.connectionDistance) {
                    const opacity = (1 - dist / this.connectionDistance) * 0.15;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    // Use gradient between particle colors
                    const grad = this.ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
                    grad.addColorStop(0, this.hexToRgba(p1.color, opacity));
                    grad.addColorStop(1, this.hexToRgba(p2.color, opacity));
                    
                    this.ctx.strokeStyle = grad;
                    this.ctx.lineWidth = 0.8;
                    this.ctx.stroke();
                }
            }
        }
    }
    
    hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    animate() {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.updateParticles();
        this.drawConnections();
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

/* ==========================================================================
   PAGE NAVIGATION & MOBILE MENU
   ========================================================================== */
function setupNavigation() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.getElementById('menu-toggle-id');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Scrolled Navbar style change
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active section indicator
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Toggle Mobile menu
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });
    
    // Close menu when clicking nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });
}

/* ==========================================================================
   ANIMATE SKILLS ON VIEWPORT ENTRY
   ========================================================================== */
function setupSkillsAnimation() {
    const skillsSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.skill-progress');
    
    if (!skillsSection || progressBars.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressBars.forEach(bar => {
                    // Read custom width from element style and apply it for transition
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.transition = 'width 1.5s cubic-bezier(0.1, 0.76, 0.55, 0.94)';
                        bar.style.width = width;
                    }, 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    
    observer.observe(skillsSection);
}

/* ==========================================================================
   DOCUMENT READY INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Start particles network
    new ParticleNetwork('particles-canvas');
    
    // Initialize navigation helpers
    setupNavigation();
    
    // Set up scroll reveal animations for skills progress bars
    setupSkillsAnimation();
    
    // Simple console credit
    console.log('%cDesigned & Coded with ❤️ for Rushank', 'color: #00f2fe; font-size: 16px; font-weight: bold;');
});
