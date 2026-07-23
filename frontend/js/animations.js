/* =========================================================
   STC LIVING — animations.js
   IntersectionObserver scroll reveals + cursor-glow micro-interaction
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(
    '.reveal, .reveal-scale, .reveal-left, .reveal-right'
  );

  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => io.observe(el));
  } else {
    // fallback: just show everything
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---------- Auto-tag common blocks with reveal classes ----------
     Lets HTML stay clean; sections opt in just by existing. */
  document.querySelectorAll('.coll-card, .why-card, .perf-item, .contact-card')
    .forEach((el, i) => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
        el.classList.add(`reveal-delay-${(i % 4) + 1}`);
      }
    });
  // re-run observer for newly tagged nodes
  if ('IntersectionObserver' in window) {
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io2.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.coll-card, .why-card, .perf-item, .contact-card')
      .forEach(el => io2.observe(el));
  }

  /* ---------- Cursor-follow glow on hero visual ---------- */
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 100;
      const my = ((e.clientY - rect.top) / rect.height) * 100;
      heroVisual.style.setProperty('--mx', `${mx}%`);
      heroVisual.style.setProperty('--my', `${my}%`);
    });
  }

  /* ---------- Marquee duplication so it loops seamlessly ---------- */
  const track = document.querySelector('.trust-track');
  if (track) {
    track.innerHTML += track.innerHTML;
  }

});
