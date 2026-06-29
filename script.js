document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById("menu-toggle-id");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            
            const bars = menuToggle.querySelectorAll(".bar");
            bars[0].style.transform = navLinks.classList.contains("active") ? "rotate(-45deg) translate(-5px, 6px)" : "none";
            bars[1].style.opacity = navLinks.classList.contains("active") ? "0" : "1";
            bars[2].style.transform = navLinks.classList.contains("active") ? "rotate(45deg) translate(-5px, -6px)" : "none";
        });
    }

    // Close menu when clicked
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            if (navLinks && navLinks.classList.contains("active")) {
                navLinks.classList.remove("active");
                const bars = menuToggle.querySelectorAll(".bar");
                bars[0].style.transform = "none";
                bars[1].style.opacity = "1";
                bars[2].style.transform = "none";
            }
        });
    });

    // 2. High-Tech Connection Nodes Canvas Simulation
    const canvas = document.getElementById("ambient-canvas");
    const ctx = canvas.getContext("2d");

    let particles = [];
    const particleCount = 40;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 1.5 + 1;
            this.speedX = Math.random() * 0.3 - 0.15;
            this.speedY = Math.random() * 0.3 - 0.15;
            this.alpha = Math.random() * 0.35 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * (1 - dist/120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();

    // 3. Smooth scroll reveal observer
    const glassCards = document.querySelectorAll(".glass-card");
    const observerOptions = {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    glassCards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
        revealObserver.observe(card);
    });

    // 4. Sliding Navbar Indicator Pill
    const navLinksList = document.querySelectorAll(".nav-link");
    const indicator = document.querySelector(".nav-indicator-pill");
    const sections = document.querySelectorAll("section");
    let activeNavLink = null;

    function moveIndicator(link) {
        if (!indicator || !link) return;
        indicator.style.left = `${link.offsetLeft}px`;
        indicator.style.width = `${link.offsetWidth}px`;
        indicator.style.height = `${link.offsetHeight}px`;
        indicator.style.top = `${link.offsetTop}px`;
    }

    function setActiveLink(link) {
        if (!link || link === activeNavLink) return;
        
        if (activeNavLink) {
            activeNavLink.classList.remove("active");
        }
        
        link.classList.add("active");
        activeNavLink = link;
        moveIndicator(link);
    }

    // Determine initial active link based on current scroll position
    let initialSectionId = "hero";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 250)) {
            initialSectionId = section.getAttribute("id");
        }
    });
    
    const initialLink = document.querySelector(`.nav-link[href="#${initialSectionId}"]`) || document.querySelector(".nav-link");
    if (initialLink) {
        initialLink.classList.add("active");
        activeNavLink = initialLink;
    }

    // 5. Scroll-Progressive Timeline Pipeline Fill
    const timeline = document.querySelector(".glass-timeline");
    const progressLine = document.querySelector(".timeline-progress-line");
    const dots = document.querySelectorAll(".node-dot");

    function updateTimelineProgress() {
        if (!timeline || !progressLine) return;
        const rect = timeline.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Point where neon line starts filling (when top of card enters screen at 80% height)
        const startPoint = viewportHeight * 0.8;
        // Point where neon line reaches 100% full (when top of card passes 20% height)
        const endPoint = viewportHeight * 0.2;
        const totalDist = startPoint - endPoint;
        const currentDist = startPoint - rect.top;
        
        let percent = (currentDist / totalDist) * 100;
        percent = Math.max(0, Math.min(100, percent));
        
        // Update height of the progress line element
        progressLine.style.height = `${percent}%`;
        
        // Light up each dot as the progress line flows past it
        dots.forEach(dot => {
            const dotTop = dot.offsetTop;
            const timelineHeight = timeline.clientHeight;
            const progressHeight = (percent / 100) * timelineHeight;
            
            if (progressHeight >= (dotTop - 2)) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
    }

    // Set initial position instantly with NO sliding transition, then fade in and enable sliding
    window.addEventListener("load", () => {
        updateTimelineProgress(); // Align timeline progress on initial load
        
        if (indicator && activeNavLink) {
            moveIndicator(activeNavLink);
            indicator.style.opacity = "1"; // Fade in cleanly
            
            // Enable sliding transitions after initial placement paint
            setTimeout(() => {
                indicator.classList.add("sliding");
            }, 100);
        }
    });

    // Handle custom web-font swaps which alter text widths post-load
    if (document.fonts) {
        document.fonts.ready.then(() => {
            if (activeNavLink && indicator) {
                indicator.classList.remove("sliding");
                moveIndicator(activeNavLink);
                setTimeout(() => {
                    indicator.classList.add("sliding");
                }, 50);
            }
        });
    }

    let isScrollingFromClick = false;
    let scrollTimeout = null;

    // Update active nav-link and timeline fill on scroll
    window.addEventListener("scroll", () => {
        updateTimelineProgress(); // Redraw neon pipeline as page scrolls
        
        if (isScrollingFromClick) return; // Ignore scroll updates when smooth scrolling from a navigation click
        
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 250)) {
                currentSectionId = section.getAttribute("id");
            }
        });

        if (currentSectionId) {
            const targetLink = document.querySelector(`.nav-link[href="#${currentSectionId}"]`);
            if (targetLink && targetLink !== activeNavLink) {
                setActiveLink(targetLink);
            }
        }
    });

    // Logo click: scroll to absolute top and set active link to Home
    const logo = document.querySelector(".nav-logo");
    if (logo) {
        logo.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            const homeLink = document.querySelector('.nav-link[href="#hero"]');
            if (homeLink) {
                setActiveLink(homeLink);
            }
        });
    }

    // Update active nav-link on click and lock scroll-spy updates temporarily
    navLinksList.forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            
            // Intercept Home link clicks to scroll to absolute top (scrollTop = 0)
            if (href === "#hero") {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
            
            isScrollingFromClick = true;
            setActiveLink(link);
            
            if (scrollTimeout) clearTimeout(scrollTimeout);
            
            // Unlock scroll-spy once browser smooth scroll animation finishes (approx 800ms)
            scrollTimeout = setTimeout(() => {
                isScrollingFromClick = false;
            }, 800);
        });
    });

    // Align indicator positions transition-free during resizing events to prevent visual lag
    window.addEventListener("resize", () => {
        updateTimelineProgress();
        if (activeNavLink && indicator) {
            indicator.classList.remove("sliding");
            moveIndicator(activeNavLink);
            setTimeout(() => {
                indicator.classList.add("sliding");
            }, 50);
        }
    });
});
