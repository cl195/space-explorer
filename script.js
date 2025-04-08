// 创建星星背景
function createStars() {
    // 检查是否已存在星星背景，避免重复创建
    if (document.querySelector('.star-background')) return;
    
    // 创建星星容器
    const starBackground = document.createElement('div');
    starBackground.classList.add('star-background');
    document.body.appendChild(starBackground);
    
    const numberOfStars = 350; // 增加星星数量，使效果更明显
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // 随机位置
        const x = Math.random() * 100; // 使用百分比定位
        const y = Math.random() * 100;
        
        // 随机大小类
        const sizeClass = Math.random();
        if (sizeClass < 0.6) {
            star.classList.add('star-small');
        } else if (sizeClass < 0.9) {
            star.classList.add('star-medium');
        } else {
            star.classList.add('star-large');
        }
        
        // 随机动画时间和延迟
        const duration = 1.5 + Math.random() * 3; // 缩短动画时间
        const delay = Math.random() * 3;
        
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.setProperty('--twinkle-duration', `${duration}s`);
        star.style.setProperty('--twinkle-delay', `${delay}s`);
        
        // 随机初始透明度
        star.style.opacity = (0.3 + Math.random() * 0.7).toString();
        
        starBackground.appendChild(star);
    }
    
    console.log('Stars created:', document.querySelectorAll('.star').length);
}

// 确保星星在页面加载时立即创建，不等待DOMContentLoaded
(function() {
    // 在页面加载时立即执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createStars);
    } else {
        createStars();
    }
})();

// 处理滚动效果
function handleScroll() {
    const scrollPosition = window.scrollY;
    const items = document.querySelectorAll('.structure-item');
    const planetSections = document.querySelectorAll('.planet-detail-section');
    
    items.forEach((item, index) => {
        const delay = index * 0.1;
        const triggerPosition = item.offsetTop - window.innerHeight * 0.8;
        
        if (scrollPosition > triggerPosition) {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.style.transitionDelay = `${delay}s`;
        }
    });
    
    // 处理行星详细信息部分的显示
    planetSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('visible');
        }
    });
}

// 平滑滚动
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 视差效果
function parallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    });
}

// 页面切换动画
function setupPageTransitions() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 只有当点击的不是当前活动页面时才执行动画
            if (!this.classList.contains('active')) {
                e.preventDefault();
                
                const targetHref = this.getAttribute('href');
                const currentPage = document.body;
                
                // 根据目标页面类型选择不同的过渡效果
                let transitionClass = 'fade-out';
                
                if (this.classList.contains('structure-link')) {
                    transitionClass = 'slide-left-out';
                } else if (this.classList.contains('planet-link')) {
                    transitionClass = 'zoom-out';
                } else if (this.classList.contains('sun-link')) {
                    transitionClass = 'fade-out-bright';
                } else if (this.classList.contains('moon-link')) {
                    transitionClass = 'slide-right-out';
                }
                
                // 添加过渡动画类
                currentPage.classList.add(transitionClass);
                
                // 动画结束后跳转到新页面
                setTimeout(() => {
                    window.location.href = targetHref;
                }, 500); // 与CSS动画时间匹配
            }
        });
    });
}

// 添加星星跟随鼠标移动的效果
function setupStarMouseEffect() {
    const starBackground = document.querySelector('.star-background');
    if (!starBackground) {
        // 如果没有星星背景，则不执行
        console.log('No star background found for mouse effect');
        return;
    }
    
    let mouseX = 0;
    let mouseY = 0;
    let isMoving = false;
    let movementTimeout;
    let animationFrameId;
    
    // 捕获鼠标位置
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        
        isMoving = true;
        clearTimeout(movementTimeout);
        
        // 如果鼠标停止移动3秒，重置isMoving
        movementTimeout = setTimeout(() => {
            isMoving = false;
        }, 3000);
    });
    
    // 星星跟随鼠标微移动
    function animateStars() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            // 每颗星星的移动幅度不同，形成视差效果
            const moveFactorX = ((index % 5) - 2) * 0.3; // 增大移动范围
            const moveFactorY = (Math.floor(index / 5) % 5 - 2) * 0.3;
            
            // 计算移动距离
            const moveX = (mouseX - 0.5) * moveFactorX; 
            const moveY = (mouseY - 0.5) * moveFactorY;
            
            // 平滑移动
            star.style.transform = `translate(${moveX}%, ${moveY}%)`;
        });
        
        animationFrameId = requestAnimationFrame(animateStars);
    }
    
    // 启动动画
    animateStars();
    console.log('Star mouse effect initialized');
}

// 自动启动星星鼠标跟随效果
(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupStarMouseEffect);
    } else {
        setupStarMouseEffect();
    }
})();

// 随机创建流星
function createMeteors() {
    // 确保有星星背景容器
    let starBackground = document.querySelector('.star-background');
    if (!starBackground) {
        // 如果没有星星背景，先创建一个
        createStars();
        starBackground = document.querySelector('.star-background');
        if (!starBackground) return; // 仍然失败则退出
    }
    
    // 清除可能存在的旧定时器
    if (window.meteorInterval) {
        clearInterval(window.meteorInterval);
    }
    
    // 每隔一段时间创建一个流星
    window.meteorInterval = setInterval(() => {
        // 30%的概率创建流星，提高出现概率
        if (Math.random() > 0.3) return;
        
        const meteor = document.createElement('div');
        meteor.classList.add('meteor');
        
        // 随机位置和角度
        const startX = Math.random() * 100;
        const startY = -5; // 从顶部开始
        const angle = 15 + Math.random() * 30; // 15-45度角
        const length = 100 + Math.random() * 150; // 流星长度
        
        // 设置流星样式
        meteor.style.left = `${startX}%`;
        meteor.style.top = `${startY}%`;
        meteor.style.width = `${length}px`;
        meteor.style.transform = `rotate(${angle}deg)`;
        
        // 添加到背景
        starBackground.appendChild(meteor);
        
        // 流星完成动画后删除
        setTimeout(() => {
            if (meteor.parentNode === starBackground) {
                starBackground.removeChild(meteor);
            }
        }, 1500); // 增加动画持续时间
    }, 8000); // 减少间隔时间，平均每8秒可能出现一个流星
    
    console.log('Meteor generation started');
}

// 确保流星效果在页面加载后立即启动
(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createMeteors);
    } else {
        createMeteors();
    }
})();

// 页面加载完成后初始化移动导航功能
document.addEventListener('DOMContentLoaded', function() {
    console.log('页面已加载，初始化导航菜单...'); // 调试日志，确认函数执行
    
    // 获取移动端菜单切换按钮和导航链接元素
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // 验证导航菜单元素存在，增强代码健壮性
    if (!menuToggle) {
        console.error('未找到菜单按钮元素！检查HTML结构是否正确。'); // 报错日志
    } else {
        console.log('找到菜单按钮元素'); // 成功日志
    }
    
    if (!navLinks) {
        console.error('未找到导航链接元素！检查HTML结构是否正确。'); // 报错日志
    } else {
        console.log('找到导航链接元素'); // 成功日志
    }
    
    // 强制设置菜单按钮的可见性，解决显示问题
    // 这是解决移动端导航按钮不显示的关键代码
    if (menuToggle) {
        menuToggle.style.display = 'flex'; // 使用flex布局显示按钮
        menuToggle.style.opacity = '1'; // 确保按钮完全不透明
        menuToggle.style.visibility = 'visible'; // 确保按钮可见
        console.log('已强制显示菜单按钮'); // 调试日志
        
        // 为菜单按钮添加点击事件处理程序
        menuToggle.addEventListener('click', function(e) {
            console.log('菜单按钮被点击'); // 调试日志
            e.preventDefault(); // 阻止默认行为
            e.stopPropagation(); // 阻止事件冒泡，避免触发文档点击事件
            
            // 切换导航菜单的显示状态
            if (navLinks) {
                navLinks.classList.toggle('active'); // 添加/移除active类来显示/隐藏菜单
                console.log('菜单状态已切换:', navLinks.classList.contains('active') ? '显示' : '隐藏'); // 记录状态变化
                
                // 切换图标 (从汉堡图标变为X，或反之)，提供视觉反馈
                const icon = this.querySelector('i');
                if (icon) {
                    if (icon.classList.contains('fa-bars')) {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-times'); // 切换为X图标
                        console.log('图标已从汉堡变为X'); // 记录图标变化
                    } else {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars'); // 切换回汉堡图标
                        console.log('图标已从X变为汉堡'); // 记录图标变化
                    }
                } else {
                    console.error('未找到图标元素，可能需要检查HTML结构'); // 报错日志
                }
            } else {
                console.error('无法切换菜单，因为未找到导航链接元素'); // 报错日志
            }
            
            return false; // 防止事件继续传播
        });
    }
    
    // 点击菜单外区域时关闭菜单，增强用户体验
    if (navLinks && menuToggle) {
        document.addEventListener('click', function(e) {
            // 如果菜单处于打开状态，且点击位置不在菜单和按钮上
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                e.target !== menuToggle && 
                !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active'); // 关闭菜单
                console.log('菜单外部被点击，关闭菜单'); // 调试日志
                
                // 恢复汉堡图标
                const icon = menuToggle.querySelector('i');
                if (icon && icon.classList.contains('fa-times')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        
        // 点击导航链接时关闭菜单，提升用户体验
        const navLinksItems = document.querySelectorAll('.nav-links a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active'); // 关闭菜单
                    console.log('菜单链接被点击，关闭菜单'); // 调试日志
                    
                    // 恢复汉堡图标
                    const icon = menuToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        });
    }
    
    // 监听窗口大小变化，确保在不同设备上导航按钮正确显示
    window.addEventListener('resize', function() {
        console.log('窗口大小已改变，检查导航菜单状态'); // 调试日志
        if (menuToggle) {
            // 根据窗口宽度动态调整按钮显示状态
            menuToggle.style.display = window.innerWidth <= 1024 ? 'flex' : 'none';
            console.log('窗口宽度:', window.innerWidth, '菜单按钮显示状态:', menuToggle.style.display); // 记录状态变化
        }
    });
    
    // 延迟检查导航状态，确保DOM完全加载后按钮仍然可见
    // 这是解决某些浏览器中菜单按钮可能在页面加载后被覆盖的问题
    setTimeout(function() {
        console.log('延迟检查导航菜单状态'); // 调试日志
        if (menuToggle && window.innerWidth <= 1024) {
            menuToggle.style.display = 'flex'; // 再次确认菜单按钮可见
            console.log('已重新确认菜单按钮可见状态'); // 调试日志
        }
    }, 500); // 延迟500毫秒执行，确保DOM已完全渲染
    
    // Add animation to planet detail sections when scrolled into view
    const planetDetailSections = document.querySelectorAll('.planet-detail-section');
    
    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll events for animations
    function handleScroll() {
        planetDetailSections.forEach(section => {
            if (isInViewport(section)) {
                section.classList.add('visible');
            }
        });
    }
    
    // Initial check on page load
    handleScroll();
    
    // Check on scroll
    window.addEventListener('scroll', handleScroll);
    
    // Smooth scroll to planet details when clicking on planet cards
    const planetCards = document.querySelectorAll('.planet-card');
    planetCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Get the target from the onclick attribute
            const href = this.getAttribute('onclick').replace("location.href='", "").replace("'", "");
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Smooth scroll to target
                    const yOffset = -80; // Offset for fixed header
                    const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    
                    window.scrollTo({
                        top: y,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add touch support for planet cards
    planetCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        card.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        });
    });
    
    // 初始化平滑滚动
    smoothScroll();
    
    // 初始化视差效果
    parallaxEffect();
    
    // 设置页面切换动画
    setupPageTransitions();
    
    // 添加页面进入动画
    document.body.classList.add('fade-in');
    
    // 添加星星鼠标跟随效果
    setupStarMouseEffect();
}); 