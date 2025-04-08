// 动画进度条
function animateProgressBars() {
    const bars = document.querySelectorAll('.bar-fill');
    bars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// 创建太阳光芒效果
function createSunRays() {
    const rays = document.querySelector('.sun-rays');
    const numberOfRays = 12;
    
    for (let i = 0; i < numberOfRays; i++) {
        const ray = document.createElement('div');
        ray.className = 'sun-ray';
        ray.style.transform = `rotate(${i * (360 / numberOfRays)}deg)`;
        rays.appendChild(ray);
    }
}

// 添加滚动动画
function handleScroll() {
    const cards = document.querySelectorAll('.sun-card');
    const windowHeight = window.innerHeight;
    
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < windowHeight * 0.8) {
            card.classList.add('visible');
        }
    });
}

// 添加鼠标移动效果
function handleMouseMove(e) {
    const sunCore = document.querySelector('.sun-core');
    const rect = sunCore.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) / 30;
    const deltaY = (e.clientY - centerY) / 30;
    
    sunCore.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
}

// 添加滚动动画
function addScrollAnimations() {
    const elements = document.querySelectorAll('.temp-item, .velocity-item, .element-row');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });
}

// 添加图片悬停效果
function addImageHoverEffects() {
    const images = document.querySelectorAll('.location-image img, .neighborhood-image img');
    images.forEach(img => {
        img.addEventListener('mousemove', (e) => {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = (x / rect.width - 0.5) * 20;
            const yPercent = (y / rect.height - 0.5) * 20;
            
            e.target.style.transform = `perspective(1000px) rotateX(${-yPercent}deg) rotateY(${xPercent}deg) scale(1.1)`;
        });
        
        img.addEventListener('mouseleave', (e) => {
            e.target.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// 添加元素图标动画
function addElementIconAnimations() {
    const elementBoxes = document.querySelectorAll('.element-box');
    
    elementBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            const symbol = box.querySelector('.element-symbol');
            symbol.style.transform = 'scale(1.2)';
            symbol.style.textShadow = '0 0 15px rgba(255, 255, 255, 0.8)';
        });
        
        box.addEventListener('mouseleave', () => {
            const symbol = box.querySelector('.element-symbol');
            symbol.style.transform = 'scale(1)';
            symbol.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
        });
    });
    
    // 添加元素符号闪烁效果
    const symbols = document.querySelectorAll('.element-symbol');
    symbols.forEach(symbol => {
        setInterval(() => {
            symbol.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.8)';
            setTimeout(() => {
                symbol.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
            }, 200);
        }, 3000 + Math.random() * 2000); // 随机间隔时间，使闪烁不同步
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    createSunRays();
    animateProgressBars();
    handleScroll();
    
    // 添加滚动监听
    window.addEventListener('scroll', handleScroll);
    
    // 添加鼠标移动监听
    document.addEventListener('mousemove', handleMouseMove);
    
    addScrollAnimations();
    addImageHoverEffects();
    addElementIconAnimations();
}); 