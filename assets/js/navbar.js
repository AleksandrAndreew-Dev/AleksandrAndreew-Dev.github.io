// navbar.js
console.log('Navbar script loaded');

function initNavbar() {
    const burger = document.querySelector('.navbar-burger');
    const menu = document.getElementById('navbarMenu');

    if (!burger || !menu) {
        console.warn('Navbar elements not found, retrying...');
        setTimeout(initNavbar, 100); // Повторяем через 100мс
        return;
    }

    console.log('Navbar elements found, initializing...');

    burger.addEventListener('click', function() {
        console.log('Burger clicked');
        this.classList.toggle('is-active');
        menu.classList.toggle('is-active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                burger.classList.remove('is-active');
                menu.classList.remove('is-active');
            }
        });
    });

    console.log('Navbar initialized successfully');
}

// Запускаем при загрузке DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbar);
} else {
    initNavbar();
}
