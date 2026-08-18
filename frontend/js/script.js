// document.addEventListener('DOMContentLoaded', () => {

//   /* ---------- Mobile nav toggle ---------- */
//   const menuToggle = document.querySelector('.menu-toggle');
//   const navLinks = document.querySelector('.navlinks');
//   if (menuToggle && navLinks) {
//     menuToggle.addEventListener('click', () => {
//       menuToggle.classList.toggle('open');
//       navLinks.classList.toggle('open');
//     });
//     navLinks.querySelectorAll('a').forEach(link => {
//       link.addEventListener('click', () => {
//         menuToggle.classList.remove('open');
//         navLinks.classList.remove('open');
//       });
//     });
//   }

//   /* ---------- Sticky header shadow on scroll ---------- */
//   const header = document.querySelector('header');
//   if (header) {
//     window.addEventListener('scroll', () => {
//       header.style.boxShadow = window.scrollY > 12
//         ? '0 12px 30px -18px rgba(0,0,0,.45)'
//         : 'none';
//     }, { passive: true });
//   }

//   /* ---------- Scroll-spy: highlight nav link for section in view ---------- */
//   const sections = document.querySelectorAll('main section[id]');
//   const spyLinks = document.querySelectorAll('.navlinks a[href^="#"]');
//   if (sections.length && spyLinks.length && 'IntersectionObserver' in window) {
//     const spy = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           const id = entry.target.getAttribute('id');
//           spyLinks.forEach(link => {
//             link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
//           });
//         }
//       });
//     }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
//     sections.forEach(s => spy.observe(s));
//   }

//   /* ---------- Collection tab filter (collections.html) ---------- */
//   const tabs = document.querySelectorAll('.coll-tab');
//   const groups = document.querySelectorAll('[data-group]');
//   if (tabs.length) {
//     tabs.forEach(tab => {
//       tab.addEventListener('click', () => {
//         tabs.forEach(t => t.classList.remove('active'));
//         tab.classList.add('active');
//         const target = tab.dataset.target;
//         groups.forEach(g => {
//           const show = target === 'all' || g.dataset.group === target;
//           g.style.display = show ? '' : 'none';
//         });
//       });
//     });
//   }

//   /* ---------- Contact form: client-side handling ----------
//      Wired to POST /api/contact on the backend (see routes/contact.js).
//      On success (or if the backend isn't reachable), the enquiry is also
//      forwarded as a pre-filled WhatsApp message to STC Living's contact
//      number (+91 91000 98038) so it always reaches the team. */
//  /* ---------- Contact form: client-side handling ---------- */
// /* ---------- Contact form: client-side handling ---------- */
//   const form = document.querySelector('#enquiryForm') || document.querySelector('.contact-form-v2') || document.querySelector('.contact-form');

//   if (form) {
//     const status = form.querySelector('.form-status');
//     form.addEventListener('submit', async (e) => {
//       e.preventDefault();
//       const btn = form.querySelector('button[type="submit"]');
//       const original = btn.textContent;
//       btn.textContent = 'Sending…';
//       btn.disabled = true;

//       const payload = Object.fromEntries(new FormData(form).entries());

//       if (!payload.propertyName) payload.propertyName = 'STC Living';

//       const API_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && window.location.port !== '5000'
//         ? 'http://localhost:5000/api/contact'
//         : '/api/contact';

//       try {
//         const res = await fetch(API_URL, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(payload)
//         });

//         if (!res.ok) throw new Error('Request failed');

//         if (status) {
//           status.textContent = 'Thank you — our team will be in touch within one business day.';
//           status.className = 'form-status ok';
//         }
//         form.reset();
//       } catch (err) {
//         console.error('Form submission error:', err);
//         if (status) {
//           status.textContent = 'Unable to send enquiry. Please try again later or contact us directly.';
//           status.className = 'form-status error';
//         }
//       } finally {
//         btn.textContent = original;
//         btn.disabled = false;
//       }
//     });
//   }
//   /* ---------- Footer year ---------- */
//   const yearEl = document.querySelector('[data-year]');
//   if (yearEl) yearEl.textContent = new Date().getFullYear();

// });



// /* ---------- Get in Touch Click Redirections ---------- */
//   const gitRows = document.querySelectorAll('.git-card .git-row');

//   gitRows.forEach(row => {
//     const label = row.querySelector('b')?.textContent.trim().toLowerCase();
    
//     // Make icon cursor show as pointer without CSS changes
//     const icon = row.querySelector('.git-ic');
//     if (icon) icon.style.cursor = 'pointer';

//     row.addEventListener('click', (e) => {
//       if (label === 'phone') {
//         window.location.href = 'tel:+919100098038';
//       } else if (label === 'email') {
//         window.location.href = 'mailto:namratha@stcliving.in?subject=Property%20Enquiry';
//       } else if (label === 'website') {
//         window.open('https://www.stcliving.in', '_blank', 'noopener');
//       } else if (label === 'address') {
//         window.open('https://maps.google.com/?q=Door+No.+2-168,+NH-16+Service+Road,+Opp.+Murugan+Hotel,+Kaza+Village,+Mangalagiri+Mandal,+Guntur+District,+Andhra+Pradesh+522503', '_blank', 'noopener');
//       }
//     });
//   });





document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.navlinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ---------- Sticky header shadow on scroll ---------- */
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 12
        ? '0 12px 30px -18px rgba(0,0,0,.45)'
        : 'none';
    }, { passive: true });
  }

  /* ---------- Scroll-spy ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const spyLinks = document.querySelectorAll('.navlinks a[href^="#"]');
  if (sections.length && spyLinks.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          spyLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach(s => spy.observe(s));
  }

  /* ---------- Collection tab filter ---------- */
  const tabs = document.querySelectorAll('.coll-tab');
  const groups = document.querySelectorAll('[data-group]');
  if (tabs.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.target;
        groups.forEach(g => {
          const show = target === 'all' || g.dataset.group === target;
          g.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---------- Contact form: client-side handling ---------- */
  const form = document.querySelector('#enquiryForm') || document.querySelector('.contact-form-v2') || document.querySelector('.contact-form');

  if (form) {
    const status = form.querySelector('.form-status');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn ? btn.textContent : 'Submit';
      if (btn) {
        btn.textContent = 'Sending…';
        btn.disabled = true;
      }

      const payload = Object.fromEntries(new FormData(form).entries());
      if (!payload.propertyName) payload.propertyName = 'STC Living';

      // Streamlined URL resolution for production & local dev
      const API_URL = window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1')
        ? 'http://localhost:5000/api/contact'
        : '/api/contact';

      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error('Request failed');

        if (status) {
          status.textContent = 'Thank you — our team will be in touch within one business day.';
          status.className = 'form-status ok';
        }
        form.reset();
      } catch (err) {
        console.error('Form submission error:', err);
        if (status) {
          status.textContent = 'Unable to send enquiry. Please try again later or contact us directly.';
          status.className = 'form-status error';
        }
      } finally {
        if (btn) {
          btn.textContent = original;
          btn.disabled = false;
        }
      }
    });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Get in Touch Click Redirections (Moved Inside DOMContentLoaded) ---------- */
  const gitRows = document.querySelectorAll('.git-card .git-row');

  gitRows.forEach(row => {
    const label = row.querySelector('b')?.textContent.trim().toLowerCase();
    
    const icon = row.querySelector('.git-ic');
    if (icon) icon.style.cursor = 'pointer';

    row.addEventListener('click', () => {
      if (label === 'phone') {
        window.location.href = 'tel:+919100098038';
      } else if (label === 'email') {
        window.location.href = 'mailto:namratha@stcliving.in?subject=Property%20Enquiry';
      } else if (label === 'website') {
        window.open('https://www.stcliving.in', '_blank', 'noopener');
      } else if (label === 'address') {
        window.open('https://maps.google.com/?q=Door+No.+2-168,+NH-16+Service+Road,+Opp.+Murugan+Hotel,+Kaza+Village,+Mangalagiri+Mandal,+Guntur+District,+Andhra+Pradesh+522503', '_blank', 'noopener');
      }
    });
  });

});