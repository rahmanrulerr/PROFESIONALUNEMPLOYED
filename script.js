const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => observer.observe(item));

const counters = document.querySelectorAll('[data-count]');

const animateCounter = (element) => {
  const target = Number(element.getAttribute('data-count'));
  const duration = 1200;
  const startTime = performance.now();

  const step = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const value = Math.floor(progress * target);
    element.textContent = value.toString();

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = target.toString();
    }
  };

  requestAnimationFrame(step);
};

const counterObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

counters.forEach((counter) => counterObserver.observe(counter));

document.getElementById('year').textContent = new Date().getFullYear();
