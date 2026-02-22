document.addEventListener('DOMContentLoaded', function() {
  // Анимация прогресс-баров
  const progressBars = document.querySelectorAll('.skill-progress');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const targetValue = progressBar.getAttribute('data-target');
        progressBar.setAttribute('value', targetValue);
        observer.unobserve(progressBar);
      }
    });
  }, {
    threshold: 0.5
  });

  progressBars.forEach(bar => {
    bar.setAttribute('value', 0);
    observer.observe(bar);
  });

  // Анимация появления элементов при скролле
  const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  fadeElements.forEach(el => {
    fadeObserver.observe(el);
  });
  
  // Back to Top кнопка
  const backToTopBtn = document.querySelector('.back-to-top-wide');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
