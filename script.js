const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navAnchors = document.querySelectorAll('.nav-links a');

function closeMenu() {
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}

// Mobile menu
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navAnchors.forEach(link => link.addEventListener('click', closeMenu));

window.addEventListener('resize', () => {
  if (window.innerWidth >= 800) closeMenu();
});

// Highlight the nav link of the section currently in view
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  document.querySelectorAll('main section').forEach(s => observer.observe(s));
}

// Download resume
const downloadResumeBtn = document.getElementById('download-resume');
if (downloadResumeBtn) {
  downloadResumeBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'assets/MUHAMMAD SUFYAN ALI.docx';
    link.download = 'MUHAMMAD SUFYAN ALI.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

// Dark theme toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

function getPreferredTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  if (theme === 'dark') {
    html.setAttribute('data-theme', 'dark');
  } else {
    html.removeAttribute('data-theme');
  }
}

applyTheme(getPreferredTheme());

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(current);
    localStorage.setItem('theme', current);
  });
}
