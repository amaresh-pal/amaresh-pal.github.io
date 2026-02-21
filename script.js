/* ========================
   AMARESH PAL — PORTFOLIO
   script.js
======================== */

document.addEventListener('DOMContentLoaded', () => {

    // ========================
    // CUSTOM CURSOR
    // ========================
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Cursor hover effect
    const hoverEls = document.querySelectorAll('a, button, .btn, .interest-card, .contact-item, .skill-group, .cert-card');
    hoverEls.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursorFollower.style.width = '60px';
            cursorFollower.style.height = '60px';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '10px';
            cursor.style.height = '10px';
            cursorFollower.style.width = '36px';
            cursorFollower.style.height = '36px';
        });
    });


    // ========================
    // NAVBAR SCROLL
    // ========================
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // ========================
    // MOBILE MENU
    // ========================
    const navToggle = document.getElementById('navToggle');

    // Create mobile menu dynamically
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
        <a href="#about" class="mobile-link">About</a>
        <a href="#education" class="mobile-link">Education</a>
        <a href="#skills" class="mobile-link">Skills</a>
        <a href="#certifications" class="mobile-link">Certs</a>
        <a href="#contact" class="mobile-link">Contact</a>
        <button class="mobile-close" style="background:none;border:1px solid rgba(255,255,255,0.1);color:var(--text-muted);padding:0.6rem 1.5rem;border-radius:50px;font-family:var(--font-mono);font-size:0.8rem;letter-spacing:1px;cursor:pointer;margin-top:1rem;">Close</button>
    `;
    document.body.appendChild(mobileMenu);

    navToggle.addEventListener('click', () => {
        mobileMenu.classList.add('open');
    });

    mobileMenu.querySelector('.mobile-close').addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });

    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    });


    // ========================
    // REVEAL ON SCROLL
    // ========================
    const revealEls = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger delay based on index among siblings
                const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
                const delay = siblings.indexOf(entry.target) * 100;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));


    // ========================
    // SKILL BARS ANIMATION
    // ========================
    const skillBars = document.querySelectorAll('.skill-bar');

    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const level = bar.dataset.level;
                const fill = bar.querySelector('.bar-fill');
                setTimeout(() => {
                    fill.style.width = level + '%';
                }, 300);
                barObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => barObserver.observe(bar));


    // ========================
    // HERO TEXT ANIMATION
    // ========================
    const heroLabel = document.querySelector('.hero-label');
    const heroSub = document.querySelector('.hero-sub');
    const heroActions = document.querySelector('.hero-actions');

    if (heroLabel) {
        setTimeout(() => {
            heroLabel.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroLabel.style.opacity = '1';
            heroLabel.style.transform = 'translateY(0)';
        }, 200);
    }

    if (heroSub) {
        setTimeout(() => {
            heroSub.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroSub.style.opacity = '1';
            heroSub.style.transform = 'translateY(0)';
        }, 800);
    }

    if (heroActions) {
        setTimeout(() => {
            heroActions.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroActions.style.opacity = '1';
            heroActions.style.transform = 'translateY(0)';
        }, 1100);
    }


    // ========================
    // ACTIVE NAV LINK
    // ========================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === '#' + id) {
                        link.style.color = 'var(--accent)';
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(sec => sectionObserver.observe(sec));


    // ========================
    // COUNTER ANIMATION
    // ========================
    const stats = document.querySelectorAll('.stat-num');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = el.textContent.replace(/[^0-9]/g, '');
                const suffix = el.textContent.replace(/[0-9]/g, '');
                let start = 0;
                const duration = 1500;
                const increment = parseInt(target) / (duration / 16);

                const counter = setInterval(() => {
                    start += increment;
                    if (start >= parseInt(target)) {
                        el.textContent = target + suffix;
                        clearInterval(counter);
                    } else {
                        el.textContent = Math.floor(start) + suffix;
                    }
                }, 16);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => counterObserver.observe(stat));


    // ========================
    // PARALLAX BLOBS
    // ========================
    const blobs = document.querySelectorAll('.blob');

    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;

        blobs.forEach((blob, i) => {
            const factor = i === 0 ? 1 : -1;
            blob.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
    });


    // ========================
    // TIMELINE HOVER GLOW
    // ========================
    const timelineItems = document.querySelectorAll('.timeline-content');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const dot = item.closest('.timeline-item').querySelector('.timeline-dot');
            if (dot) {
                dot.style.boxShadow = '0 0 30px var(--accent), 0 0 60px rgba(200, 255, 0, 0.3)';
                dot.style.transform = 'scale(1.4)';
                dot.style.transition = 'all 0.3s';
            }
        });
        item.addEventListener('mouseleave', () => {
            const dot = item.closest('.timeline-item').querySelector('.timeline-dot');
            if (dot) {
                dot.style.boxShadow = '0 0 20px var(--accent)';
                dot.style.transform = 'scale(1)';
            }
        });
    });


    // ========================
    // SMOOTH SCROLL
    // ========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    // ========================
    // PAGE LOAD ANIMATION
    // ========================
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

    console.log('%c Amaresh Pal — Portfolio', 'color: #c8ff00; font-family: monospace; font-size: 16px; font-weight: bold;');
    console.log('%c Built with ❤️ and code.', 'color: #8888aa; font-family: monospace;');
});
