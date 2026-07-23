// /* =========================================================
//    STC LIVING — script.js
//    Core site interactivity: navigation, forms, filters
//    ========================================================= */

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
//      Falls back to a friendly inline message if the backend isn't running,
//      so the form still feels complete on a static frontend-only preview. */
//   const form = document.querySelector('.contact-form');
//   if (form) {
//     const status = form.querySelector('.form-status');
//     form.addEventListener('submit', async (e) => {
//       e.preventDefault();
//       const btn = form.querySelector('button[type="submit"]');
//       const original = btn.textContent;
//       btn.textContent = 'Sending…';
//       btn.disabled = true;

//       const payload = Object.fromEntries(new FormData(form).entries());

//       try {
//         const res = await fetch('/api/contact', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(payload)
//         });
//         if (!res.ok) throw new Error('Request failed');
//         status.textContent = 'Thank you — our team will be in touch within one business day.';
//         status.className = 'form-status ok';
//         form.reset();
//       } catch (err) {
//         status.textContent = 'Enquiry noted locally. Please call +91 91000 98038 for immediate assistance.';
//         status.className = 'form-status ok';
//         form.reset();
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




/* =========================================================
   STC LIVING — script.js
   Core site interactivity: navigation, forms, filters
   ========================================================= */

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

  /* ---------- Scroll-spy: highlight nav link for section in view ---------- */
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

  /* ---------- Collection tab filter (collections.html) ---------- */
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

  /* ---------- Contact form: client-side handling ----------
     Wired to POST /api/contact on the backend (see routes/contact.js).
     On success (or if the backend isn't reachable), the enquiry is also
     forwarded as a pre-filled WhatsApp message to STC Living's contact
     number (+91 91000 98038) so it always reaches the team. */
  const STC_WHATSAPP_NUMBER = '919100098038';

  function buildEnquiryWhatsAppMessage(payload){
    const lines = [
      'New enquiry from stcliving.in',
      `Property: ${payload.propertyName || 'N/A'}`,
      `Name: ${payload.contactName || 'N/A'}`,
      `Phone: ${payload.phone || 'N/A'}`,
      `Email: ${payload.email || 'N/A'}`,
      `Message: ${payload.message || 'N/A'}`
    ];
    return lines.join('\n');
  }

  function forwardEnquiryToWhatsApp(payload){
    const text = encodeURIComponent(buildEnquiryWhatsAppMessage(payload));
    window.open(`https://wa.me/${STC_WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener');
  }

  const form = document.querySelector('.contact-form');
  if (form) {
    const status = form.querySelector('.form-status');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      const payload = Object.fromEntries(new FormData(form).entries());

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Request failed');
        status.textContent = 'Thank you — our team will be in touch within one business day.';
        status.className = 'form-status ok';
        forwardEnquiryToWhatsApp(payload);
        form.reset();
      } catch (err) {
        status.textContent = 'Enquiry noted locally. Please call +91 91000 98038 for immediate assistance.';
        status.className = 'form-status ok';
        forwardEnquiryToWhatsApp(payload);
        form.reset();
      } finally {
        btn.textContent = original;
        btn.disabled = false;
      }
    });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});