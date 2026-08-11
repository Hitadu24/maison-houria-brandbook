const rail = document.querySelector('.rail');
const menu = document.querySelector('.menu-toggle');
const progress = document.querySelector('.progress');
const links = [...document.querySelectorAll('.nav-list a')];
const sections = links
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const setActiveLink = id => {
  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
  });
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) setActiveLink(entry.target.id || 'cover');
  });
}, { rootMargin: '-24% 0px -62% 0px', threshold: 0 });

sections.forEach(section => observer.observe(section));

menu?.addEventListener('click', () => {
  const open = rail.classList.toggle('mobile-open');
  menu.setAttribute('aria-expanded', String(open));
});

links.forEach(link => {
  link.addEventListener('click', () => {
    rail.classList.remove('mobile-open');
    menu?.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress?.style.setProperty('--progress', `${pct}%`);
}, { passive: true });
