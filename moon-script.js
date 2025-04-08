// 月球页面专用脚本

document.addEventListener('DOMContentLoaded', () => {
    // 初始化页面
    initMoonPage();
    
    // 添加滚动监听
    window.addEventListener('scroll', handleMoonScroll);
    
    // 初始触发一次滚动处理
    handleMoonScroll();
    
    // 初始化视差效果
    moonParallaxEffect();
    
    // 初始化月相动画
    initPhaseAnimations();
    
    // 初始化时间线交互
    initTimelineInteraction();
    
    // 初始化事实轮播功能
    initFactCarousel();
    
    // 初始化全景图查看功能
    initPanoramaViewer();
});

// 初始化月球页面
function initMoonPage() {
    console.log('Moon page initialized');
    
    // 添加页面入场动画
    document.body.classList.add('fade-in');
    
    // 初始化卡片浮动效果
    initCardFloating();
}

// 处理月球页面滚动效果
function handleMoonScroll() {
    const scrollPosition = window.scrollY;
    
    // 视差效果处理
    const moonHero = document.querySelector('.moon-hero');
    const moonImage = document.querySelector('.moon-image');
    const starsLayer = document.querySelector('.stars-layer');
    const cloudsLayer = document.querySelector('.clouds-layer');
    
    if (moonHero && moonImage && starsLayer && cloudsLayer) {
        const heroHeight = moonHero.offsetHeight;
        const scrollRatio = Math.min(scrollPosition / heroHeight, 1);
        
        // 月亮上移效果
        moonImage.style.transform = `translateY(calc(-50% - ${scrollRatio * 30}px))`;
        
        // 云层速度调整
        cloudsLayer.style.animationDuration = `${60 - scrollRatio * 20}s`;
        
        // 星星层视差
        starsLayer.style.transform = `translateY(${scrollRatio * 50}px)`;
    }
    
    // 检测并触发元素动画
    animateOnScroll('.moon-card', 'card-visible', 0.8);
    animateOnScroll('.moon-earth-section', 'section-visible', 0.7);
    animateOnScroll('.footer-navigation', 'nav-visible', 0.9);
}

// 滚动到视图中时添加动画类
function animateOnScroll(selector, className, threshold = 0.8) {
    const elements = document.querySelectorAll(selector);
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = windowHeight * threshold;
        
        if (elementTop < elementVisible) {
            element.classList.add(className);
        }
    });
}

// 月球页面视差效果
function moonParallaxEffect() {
    const moonParallax = document.querySelector('.moon-parallax');
    
    if (moonParallax) {
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const moonImage = document.querySelector('.moon-image');
            const starsLayer = document.querySelector('.stars-layer');
            
            if (moonImage && starsLayer) {
                // 月亮轻微移动
                const moveX = (mouseX - 0.5) * 20;
                const moveY = (mouseY - 0.5) * 20;
                
                moonImage.style.transform = `translateY(-50%) translate(${moveX}px, ${moveY}px)`;
                
                // 星星层反向移动
                starsLayer.style.transform = `translate(${-moveX * 0.5}px, ${-moveY * 0.5}px)`;
            }
        });
    }
}

// 初始化月相动画
function initPhaseAnimations() {
    const phaseItems = document.querySelectorAll('.phase-item');
    
    phaseItems.forEach(item => {
        const phase = item.querySelector('.phase-animation');
        const phaseImg = item.querySelector('.phase-img');
        
        if (phase) {
            item.addEventListener('mouseenter', () => {
                // 添加悬停时的脉动效果
                phase.style.transform = 'scale(1.1)';
                phase.style.boxShadow = '0 0 30px rgba(143, 184, 255, 0.5)';
                phase.style.transition = 'all 0.3s ease';
                
                // 为特定的月相添加特殊效果
                if (item.querySelector('h3').textContent === 'Full Moon') {
                    phaseImg.style.filter = 'brightness(1.2)';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                // 恢复原始状态
                phase.style.transform = 'scale(1)';
                phase.style.boxShadow = '0 0 20px rgba(143, 184, 255, 0.2)';
                
                if (item.querySelector('h3').textContent === 'Full Moon') {
                    phaseImg.style.filter = 'brightness(1)';
                }
            });
        }
    });
    
    // 为月相图片添加加载完成后的过渡效果
    const phaseImages = document.querySelectorAll('.phase-img');
    phaseImages.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '0';
            setTimeout(() => {
                img.style.transition = 'opacity 0.5s ease';
                img.style.opacity = '1';
            }, 100);
        });
        
        // 如果图片已经在缓存中，则手动触发加载事件
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
    
    // 添加月相循环动画
    setupPhaseSequence();
}

// 设置月相序列动画
function setupPhaseSequence() {
    const moonPhasesSection = document.querySelector('.moon-phases-section');
    
    if (moonPhasesSection) {
        // 当滚动到月相部分时，添加序列动画
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const phaseItems = document.querySelectorAll('.phase-item');
                    
                    // 依次高亮每个月相，模拟月相变化
                    let currentIndex = 0;
                    const highlightInterval = setInterval(() => {
                        // 重置所有项
                        phaseItems.forEach(item => {
                            item.style.transform = 'translateY(0)';
                            item.style.borderColor = 'rgba(194, 197, 204, 0.1)';
                            const phaseAnimation = item.querySelector('.phase-animation');
                            if (phaseAnimation) {
                                phaseAnimation.style.boxShadow = '0 0 20px rgba(143, 184, 255, 0.2)';
                            }
                        });
                        
                        // 高亮当前项
                        if (phaseItems[currentIndex]) {
                            phaseItems[currentIndex].style.transform = 'translateY(-10px)';
                            phaseItems[currentIndex].style.borderColor = 'var(--moon-accent)';
                            const phaseAnimation = phaseItems[currentIndex].querySelector('.phase-animation');
                            if (phaseAnimation) {
                                phaseAnimation.style.boxShadow = '0 0 30px rgba(143, 184, 255, 0.5)';
                            }
                        }
                        
                        currentIndex = (currentIndex + 1) % phaseItems.length;
                        
                        // 5秒后停止循环
                        if (currentIndex === 0) {
                            setTimeout(() => {
                                clearInterval(highlightInterval);
                                // 重置所有项
                                phaseItems.forEach(item => {
                                    item.style.transform = 'translateY(0)';
                                    item.style.borderColor = 'rgba(194, 197, 204, 0.1)';
                                    const phaseAnimation = item.querySelector('.phase-animation');
                                    if (phaseAnimation) {
                                        phaseAnimation.style.boxShadow = '0 0 20px rgba(143, 184, 255, 0.2)';
                                    }
                                });
                            }, 1000);
                        }
                    }, 600);
                    
                    // 取消观察
                    observer.disconnect();
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(moonPhasesSection);
    }
}

// 初始化卡片浮动效果
function initCardFloating() {
    const cards = document.querySelectorAll('.moon-card');
    
    cards.forEach((card, index) => {
        // 设置不同的初始延迟，让卡片看起来像是自然浮动
        const delay = index * 0.1;
        card.style.animationDelay = `${delay}s`;
        
        // 添加浮动动画
        card.style.animation = `floatingCard 4s infinite ease-in-out ${delay}s`;
    });
}

// 为CSS添加浮动动画
const floatingStyle = document.createElement('style');
floatingStyle.textContent = `
    @keyframes floatingCard {
        0% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0); }
    }
    
    .card-visible {
        animation: cardReveal 0.8s forwards ease-out;
    }
    
    @keyframes cardReveal {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .section-visible {
        animation: sectionFadeIn 1s forwards ease-out;
    }
    
    @keyframes sectionFadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    .nav-visible {
        animation: navSlideUp 0.5s forwards ease-out;
    }
    
    @keyframes navSlideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(floatingStyle);

// 初始化时间线交互
function initTimelineInteraction() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // 高亮当前项目
            item.style.backgroundColor = 'rgba(143, 184, 255, 0.1)';
            item.style.borderRadius = '8px';
            item.style.padding = '10px';
            item.style.marginLeft = '10px';
            item.style.transition = 'all 0.3s ease';
            
            // 将其他项目变暗
            timelineItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.style.opacity = '0.5';
                    otherItem.style.transition = 'opacity 0.3s ease';
                }
            });
        });
        
        item.addEventListener('mouseleave', () => {
            // 恢复所有项目的原始状态
            item.style.backgroundColor = 'transparent';
            item.style.padding = '0';
            item.style.marginLeft = '0';
            
            timelineItems.forEach(otherItem => {
                otherItem.style.opacity = '1';
            });
        });
    });
}

// 地月系统动画效果
window.addEventListener('load', () => {
    const earthMoonSection = document.querySelector('.earth-moon-section');
    
    if (earthMoonSection) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 当区域可见时，添加特殊效果
                    const earth = document.querySelector('.earth');
                    const moonOrbital = document.querySelector('.moon-orbital');
                    
                    if (earth) {
                        // 地球旋转动画
                        earth.style.animation = 'earthRotate 20s linear infinite';
                        
                        // 为CSS添加地球旋转动画
                        const earthStyle = document.createElement('style');
                        earthStyle.textContent = `
                            @keyframes earthRotate {
                                from { background-position: 0% center; }
                                to { background-position: 200% center; }
                            }
                        `;
                        document.head.appendChild(earthStyle);
                    }
                    
                    if (moonOrbital) {
                        // 突出显示月球轨道
                        moonOrbital.style.boxShadow = '0 0 20px var(--moon-accent)';
                    }
                    
                    // 取消观察
                    observer.disconnect();
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(earthMoonSection);
    }
});

// 处理页面离开动画
document.querySelectorAll('a').forEach(link => {
    if (!link.classList.contains('moon-link')) {
        link.addEventListener('click', function(e) {
            const targetHref = this.getAttribute('href');
            
            // 仅当链接指向网站内的其他页面时执行
            if (targetHref && targetHref.indexOf('#') !== 0 && !targetHref.match(/^https?:\/\//)) {
                e.preventDefault();
                
                // 添加离开动画
                document.body.classList.add('fade-out');
                
                // 动画结束后跳转
                setTimeout(() => {
                    window.location.href = targetHref;
                }, 500);
            }
        });
    }
});

// 为CSS添加离开动画
const leaveStyle = document.createElement('style');
leaveStyle.textContent = `
    .fade-out {
        animation: fadeOut 0.5s forwards !important;
    }
    
    @keyframes fadeOut {
        to { opacity: 0; }
    }
`;
document.head.appendChild(leaveStyle);

// 初始化事实轮播功能
function initFactCarousel() {
    const factSlides = document.querySelectorAll('.fact-slide');
    const factDots = document.querySelectorAll('.fact-dot');
    
    if (factSlides.length > 0 && factDots.length > 0) {
        // 自动轮播
        let currentIndex = 0;
        const slideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % factSlides.length;
            updateFactSlide();
        }, 5000);
        
        // 点击导航点切换事实
        factDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateFactSlide();
                // 重置自动轮播计时器
                clearInterval(slideInterval);
                setTimeout(() => {
                    setInterval(() => {
                        currentIndex = (currentIndex + 1) % factSlides.length;
                        updateFactSlide();
                    }, 5000);
                }, 10000);
            });
        });
        
        // 更新事实轮播
        function updateFactSlide() {
            factSlides.forEach((slide, index) => {
                slide.classList.remove('active');
                factDots[index].classList.remove('active');
                
                if (index === currentIndex) {
                    slide.classList.add('active');
                    factDots[index].classList.add('active');
                }
            });
        }
    }
}

// 初始化全景图查看功能
function initPanoramaViewer() {
    const panoramaOverlay = document.querySelector('.panorama-overlay');
    const panoramaImage = document.querySelector('.panorama-viewer img');
    
    if (panoramaOverlay && panoramaImage) {
        panoramaOverlay.addEventListener('click', () => {
            // 创建全屏预览元素
            const fullScreenView = document.createElement('div');
            fullScreenView.classList.add('fullscreen-panorama');
            fullScreenView.innerHTML = `
                <div class="fullscreen-close">
                    <i class="fas fa-times"></i>
                </div>
                <img src="${panoramaImage.src}" alt="Lunar Panorama Fullscreen">
            `;
            
            // 添加到body
            document.body.appendChild(fullScreenView);
            document.body.style.overflow = 'hidden';
            
            // 淡入效果
            setTimeout(() => {
                fullScreenView.style.opacity = '1';
            }, 10);
            
            // 关闭全屏预览
            const closeButton = fullScreenView.querySelector('.fullscreen-close');
            closeButton.addEventListener('click', () => {
                fullScreenView.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(fullScreenView);
                    document.body.style.overflow = '';
                }, 300);
            });
        });
    }
}

// 为全屏预览添加样式
const panoramaStyle = document.createElement('style');
panoramaStyle.textContent = `
    .fullscreen-panorama {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .fullscreen-panorama img {
        max-width: 90%;
        max-height: 90%;
        border-radius: 5px;
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
    }
    
    .fullscreen-close {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(26, 26, 46, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .fullscreen-close:hover {
        background: var(--moon-accent);
        transform: scale(1.1);
    }
    
    .fullscreen-close i {
        color: white;
        font-size: 20px;
    }
`;
document.head.appendChild(panoramaStyle); 