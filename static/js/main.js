document.addEventListener('DOMContentLoaded', () => {

    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }

    animateFollower();

    const hoverEls = document.querySelectorAll('a, button, .work-card, .diff-item, .accordion-trigger, .btn-cta, .btn-outline, .btn-solid, .btn-outline-light, .btn-service, .service-card, .team-photo, .brand-item, .vg-card');
    hoverEls.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    const darkSections = document.querySelectorAll('.our-works, .mobile-menu, .trust-video-inner');
    darkSections.forEach(s => {
        s.addEventListener('mouseenter', () => document.body.classList.add('dark-cursor'));
        s.addEventListener('mouseleave', () => document.body.classList.remove('dark-cursor'));
    });

    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        const darkBgSections = document.querySelectorAll('.our-works, .trust-video, .footer');
        let isDark = false;
        darkBgSections.forEach(sec => {
            const rect = sec.getBoundingClientRect();
            if (rect.top <= 80 && rect.bottom > 0) isDark = true;
        });
        header.classList.toggle('dark-header', isDark);
        lastScroll = currentScroll;
    });

    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-nav a').forEach(a => {
        a.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    document.querySelectorAll('.accordion-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const body = trigger.nextElementSibling;
            const isActive = trigger.classList.contains('active');
            const accordion = trigger.closest('.accordion');
            accordion.querySelectorAll('.accordion-trigger').forEach(t => {
                t.classList.remove('active');
                t.nextElementSibling.style.maxHeight = null;
            });
            if (!isActive) {
                trigger.classList.add('active');
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const heroTl = gsap.timeline({delay: 0.2});
        heroTl
            .from('.hero-heading', {opacity: 0, y: 60, duration: 1, ease: 'power3.out'})
            .from('.hero-desc', {opacity: 0, y: 40, duration: 0.8, ease: 'power3.out'}, '-=0.5')
            .from('.hero-buttons', {opacity: 0, y: 30, duration: 0.7, ease: 'power3.out'}, '-=0.5')
            .from('.scroll-indicator', {opacity: 0, duration: 0.6}, '-=0.3');

        gsap.from('.about-media', {
            scrollTrigger: {trigger: '.about-preview', start: 'top 80%'},
            opacity: 0, x: -60, duration: 1, ease: 'power3.out'
        });
        gsap.from('.about-text', {
            scrollTrigger: {trigger: '.about-preview', start: 'top 80%'},
            opacity: 0, x: 60, duration: 1, ease: 'power3.out', delay: 0.15
        });

        gsap.from('.our-works .section-label', {
            scrollTrigger: {trigger: '.our-works', start: 'top 80%'},
            opacity: 0, y: 30, duration: 0.8, ease: 'power3.out'
        });
        gsap.from('.work-card', {
            scrollTrigger: {trigger: '.works-grid', start: 'top 85%'},
            opacity: 0, y: 60, duration: 0.8, stagger: 0.12, ease: 'power3.out'
        });

        document.querySelectorAll('.service-section').forEach(sec => {
            gsap.from(sec.querySelector('.service-title'), {
                scrollTrigger: {trigger: sec, start: 'top 80%'},
                opacity: 0, x: -50, duration: 1, ease: 'power3.out'
            });
            gsap.from(sec.querySelectorAll('.service-card'), {
                scrollTrigger: {trigger: sec, start: 'top 80%'},
                opacity: 0, scale: 0.9, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.2
            });
            gsap.from(sec.querySelector('.service-desc'), {
                scrollTrigger: {trigger: sec, start: 'top 70%'},
                opacity: 0, y: 30, duration: 0.8, ease: 'power3.out', delay: 0.3
            });
        });

        const brandRow = document.querySelector('.brand-row');
        if (brandRow) {
            gsap.from('.brand-item', {
                scrollTrigger: {trigger: brandRow, start: 'top 82%'},
                opacity: 0, y: 30, duration: 0.6, stagger: 0.12, ease: 'power3.out'
            });
        }

        const videoGrid = document.querySelector('.video-grid');
        if (videoGrid) {
            gsap.set('.vg-card', {opacity: 0, scale: 0.82, y: 20});
            gsap.to('.vg-card', {
                scrollTrigger: {trigger: videoGrid, start: 'top 82%'},
                opacity: 1, scale: 1, duration: 0.45,
                stagger: {each: 0.09, from: 'start'},
                ease: 'back.out(1.4)',
                clearProps: 'transform'
            });
        }

        const diffItems = document.querySelectorAll('.diff-item');
        const diffVisuals = document.querySelectorAll('.diff-visual');

        function setDiffActive(index) {
            diffItems.forEach((el, i) => el.classList.toggle('is-active', i === index));
            diffVisuals.forEach((el, i) => el.classList.toggle('is-active', i === index));
        }

        if (diffItems.length) {
            const diffSection = document.querySelector('.diff-scroll');

            function updateDiffActive() {
                const viewCenter = window.innerHeight / 2;
                let closest = 0;
                let minDist = Infinity;
                diffItems.forEach((item, i) => {
                    const rect = item.getBoundingClientRect();
                    const dist = Math.abs(rect.top + rect.height / 2 - viewCenter);
                    if (dist < minDist) { minDist = dist; closest = i; }
                });
                setDiffActive(closest);
            }

            window.addEventListener('scroll', () => {
                if (!diffSection) return;
                const rect = diffSection.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) updateDiffActive();
            }, {passive: true});

            ScrollTrigger.create({
                trigger: '.diff-scroll',
                start: 'top 70%',
                onEnter: () => setDiffActive(0),
            });
        }

        gsap.from('.diff-item', {
            scrollTrigger: {trigger: '.diff-items', start: 'top 85%'},
            x: -30, duration: 0.7, stagger: 0.12, ease: 'power3.out'
        });

        gsap.from('.process-step', {
            scrollTrigger: {trigger: '.process', start: 'top 80%'},
            opacity: 0, x: -40, duration: 0.7, stagger: 0.12, ease: 'power3.out'
        });

        gsap.from('.trust-quote', {
            scrollTrigger: {trigger: '.trust-video', start: 'top 80%'},
            opacity: 0, scale: 0.9, duration: 1, ease: 'power3.out'
        });

        gsap.from('.team-card', {
            scrollTrigger: {trigger: '.team', start: 'top 80%'},
            opacity: 0, y: 50, duration: 0.8, stagger: 0.2, ease: 'power3.out'
        });

        gsap.utils.toArray('.section-label').forEach(el => {
            gsap.from(el, {
                scrollTrigger: {trigger: el, start: 'top 90%'},
                opacity: 0, x: -20, duration: 0.7, ease: 'power2.out'
            });
        });

        gsap.utils.toArray('.accordion-item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {trigger: item, start: 'top 90%'},
                opacity: 0, y: 20, duration: 0.5, ease: 'power2.out', delay: i * 0.05
            });
        });

    } else {
        document.querySelectorAll('.fade-up, .fade-in, .slide-left, .slide-right').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({behavior: 'smooth', block: 'start'});
            }
        });
    });

    if (window.innerWidth > 768 && typeof gsap !== 'undefined') {
        document.querySelectorAll('.work-card').forEach((card, i) => {
            gsap.to(card, {
                scrollTrigger: {trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1},
                y: i % 2 === 0 ? -20 : 20, ease: 'none'
            });
        });
    }

    const awardsSection = document.querySelector('.awards-section');
    if (awardsSection && typeof gsap !== 'undefined') {
        const badgesArea = awardsSection.querySelector('.awards-badges');
        const badges = Array.from(awardsSection.querySelectorAll('.badge-float'));

        badges.forEach(b => {
            gsap.set(b, {left: '50%', top: '50%', xPercent: -50, yPercent: -50, opacity: 0, pointerEvents: 'none'});
        });

        const RANDOM_LABELS = [
            '★ Top\nAgency', 'Design\n2026', '✦ Creative', 'Motion\nArt',
            '100%\nCustom', 'Branding', 'Visual\nTwins', '✓ Quality',
            'Reels\n& SMM', 'Fast\nDelivery', 'Unique\nStyle', '❤ We Care',
        ];
        const BUBBLE_COLORS = ['#1A1A1A', '#FF6630', '#6B3FA0', '#2a7a5a', '#c0392b', '#1a6a9a'];

        let spawnIdx = 0;
        let lastSpawnTime = 0;

        function spawnStamp(x, y) {
            const useBadge = spawnIdx % 3 === 0 && badges.length;
            let inner;
            if (useBadge) {
                const template = badges[Math.floor(spawnIdx / 3) % badges.length];
                inner = template.querySelector('.badge-circle').cloneNode(true);
            } else {
                const label = RANDOM_LABELS[Math.floor(Math.random() * RANDOM_LABELS.length)];
                const color = BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)];
                const size = 90 + Math.floor(Math.random() * 50);
                inner = document.createElement('div');
                inner.style.cssText = `width:${size}px;height:${size}px;border-radius:50%;background:${color};display:flex;align-items:center;justify-content:center;text-align:center;padding:0.8rem;box-shadow:0 12px 40px rgba(0,0,0,0.45);`;
                inner.innerHTML = `<span style="font-family:'Inter',sans-serif;font-size:${size < 110 ? '0.62' : '0.72'}rem;font-weight:700;color:#fff;text-transform:uppercase;letter-spacing:0.05em;line-height:1.25;white-space:pre-line;">${label}</span>`;
            }
            spawnIdx++;

            const rot0 = (Math.random() - 0.5) * 24;
            const rot1 = (Math.random() - 0.5) * 14;
            const stamp = document.createElement('div');
            stamp.style.cssText = `position:absolute;left:${x}px;top:${y}px;transform:translate(-50%,-50%);pointer-events:none;`;
            stamp.appendChild(inner);
            badgesArea.appendChild(stamp);

            gsap.fromTo(stamp,
                {opacity: 0, scale: 0.4, rotation: rot0},
                {
                    opacity: 1, scale: 1, rotation: rot1, duration: 0.38, ease: 'back.out(1.6)',
                    onComplete() {
                        gsap.to(stamp, {
                            opacity: 0, scale: 0,
                            rotation: rot1 + (Math.random() - 0.5) * 20,
                            duration: 0.45, delay: 0.75, ease: 'back.in(1.4)',
                            onComplete: () => stamp.remove()
                        });
                    }
                }
            );
        }

        awardsSection.addEventListener('mousemove', e => {
            const now = Date.now();
            if (now - lastSpawnTime < 300) return;
            lastSpawnTime = now;
            const rect = badgesArea.getBoundingClientRect();
            spawnStamp(e.clientX - rect.left, e.clientY - rect.top);
        });

        gsap.from(['.awards-heading', '.awards-label', '.btn-awards'], {
            scrollTrigger: {trigger: awardsSection, start: 'top 80%'},
            opacity: 0, x: 40, duration: 0.8, stagger: 0.12, ease: 'power3.out'
        });
    }

    const vgCards = document.querySelectorAll('.vg-card');
    if (vgCards.length) {
        const videoPool = [
            './static/video/reels-fscr1.mp4',
            './static/video/reels-fscr2.mp4',
            './static/video/reels-6.mp4',
            './static/video/reels-8.mp4',
            './static/video/reels-9.mp4',
            './static/video/work-008.mp4',
            './static/video/work-018.mp4',
            './static/video/work-037.mp4',
            './static/video/work-039.mp4',
            './static/video/work-045.mp4',
            './static/video/work-046.mp4',
            './static/video/work-048.mp4',
            './static/video/work-051.mp4',
            './static/video/work-052.mp4',
        ];

        let poolPtr = 7;

        function cycleCard(card) {
            const vid = card.querySelector('video');
            if (!vid) return;
            vid.style.transition = 'opacity 0.5s ease';
            vid.style.opacity = '0';
            setTimeout(() => {
                const src = vid.querySelector('source');
                src.src = videoPool[poolPtr % videoPool.length];
                poolPtr++;
                vid.load();
                vid.play().catch(() => {});
                vid.style.opacity = '1';
            }, 520);
        }

        let cardPtr = 0;
        setInterval(() => {
            cycleCard(vgCards[cardPtr % vgCards.length]);
            cardPtr++;
        }, 2200);
    }

});
