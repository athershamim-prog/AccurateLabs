/* ── Year ───────────────────────────────────────────────── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ── Mobile Nav ─────────────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
  navToggle.innerHTML = open
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

/* ── Active Nav on Scroll ───────────────────────────────── */
const sections = document.querySelectorAll('section[id]');

function setActiveNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}
window.addEventListener('scroll', setActiveNav, { passive: true });

/* ── Header Shadow on Scroll ────────────────────────────── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10
    ? '0 2px 16px rgba(0,0,0,.15)'
    : '0 2px 12px rgba(0,0,0,.1)';
}, { passive: true });

/* ── Hero Carousel ──────────────────────────────────────── */
const track     = document.getElementById('carouselTrack');
const dots      = document.querySelectorAll('.dot');
const prevBtn   = document.getElementById('prevBtn');
const nextBtn   = document.getElementById('nextBtn');
const slideCount = track.children.length;
let current = 0;
let autoTimer;

function goTo(index) {
  current = (index + slideCount) % slideCount;
  track.style.transform = `translateX(-${current * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === current));
}

function startAuto() {
  autoTimer = setInterval(() => goTo(current + 1), 5000);
}
function stopAuto() {
  clearInterval(autoTimer);
}

nextBtn.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });
prevBtn.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    stopAuto();
    goTo(parseInt(dot.dataset.index));
    startAuto();
  });
});

// Touch/swipe support
let touchStartX = 0;
track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) { stopAuto(); goTo(diff > 0 ? current + 1 : current - 1); startAuto(); }
}, { passive: true });

startAuto();

/* ── Contact Form ───────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
const formMsg     = document.getElementById('formMsg');

const requiredFields = contactForm.querySelectorAll('[required]');
requiredFields.forEach(field => {
  field.addEventListener('input', () => field.classList.remove('field--error'));
});

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  formMsg.textContent = '';
  formMsg.className   = 'form__msg';

  const nameEl    = contactForm.querySelector('[name="name"]');
  const emailEl   = contactForm.querySelector('[name="email"]');
  const phoneEl   = contactForm.querySelector('[name="phone"]');
  const subjectEl = contactForm.querySelector('[name="subject"]');
  const messageEl = contactForm.querySelector('[name="message"]');

  const nameVal    = nameEl.value.trim();
  const emailVal   = emailEl.value.trim();
  const phoneVal   = phoneEl.value.trim();
  const subjectVal = subjectEl.value.trim();
  const messageVal = messageEl.value.trim();

  let hasError = false;
  [nameEl, emailEl, phoneEl, subjectEl, messageEl].forEach(el => {
    if (!el.value.trim()) { el.classList.add('field--error'); hasError = true; }
    else el.classList.remove('field--error');
  });

  if (hasError) {
    formMsg.textContent = 'Please fill in all required fields.';
    formMsg.classList.add('error');
    return;
  }

  const btn = contactForm.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending...';

  emailjs.send('service_ihfi0rg', 'template_i8vi932', {
    customer_name: nameVal,
    from_email:    emailVal,
    phone:         phoneVal || 'Not provided',
    subject:       subjectVal,
    message:       messageVal,
  })
  .then(() => {
    formMsg.textContent = 'Thank you! Your message has been sent. We will be in touch soon.';
    formMsg.classList.add('success');
    contactForm.reset();
  })
  .catch(() => {
    formMsg.textContent = 'Something went wrong. Please try again or call us directly.';
    formMsg.classList.add('error');
  })
  .finally(() => {
    btn.disabled = false;
    btn.textContent = 'Send Message';
  });
});

/* ── Back to Top ────────────────────────────────────────── */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
