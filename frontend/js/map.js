/* =========================================================
   STC LIVING — map.js
   - Loads a lightweight Google Maps embed (no API key required)
   - "Get Directions" builds a live route from the visitor's
     current location (if granted) to STC Living HQ
   - WhatsApp buttons open a pre-filled chat with the sales team
   ========================================================= */

(() => {
  const STC = {
    address: "Door No. 2-168, NH-16 Service Road, Opp. Murugan Hotel, Kaza Village, Mangalagiri Mandal, Guntur District, Andhra Pradesh 522503",
    whatsappNumber: "919100098038" // country code + number, no plus/spaces
  };

  document.addEventListener('DOMContentLoaded', () => {
    initMap();
    initDirections();
    initWhatsApp();
  });

  /* ---------- Embed the map (no API key needed) ---------- */
  function initMap() {
    const frame = document.querySelector('.map-frame');
    if (!frame) return;
    const query = encodeURIComponent(STC.address);
    frame.src = `https://www.google.com/maps?q=${query}&output=embed`;
    frame.loading = 'lazy';
    frame.referrerPolicy = 'no-referrer-when-downgrade';
  }

  /* ---------- "Get Directions" — redirects to Google Maps ----------
     Uses the visitor's live location as the origin when permission
     is granted, otherwise lets Google Maps resolve it automatically. */
  function initDirections() {
    document.querySelectorAll('[data-directions]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const destination = encodeURIComponent(STC.address);

        const openWithOrigin = (origin) => {
          const url = origin
            ? `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`
            : `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
          window.open(url, '_blank', 'noopener');
        };

        if (navigator.geolocation) {
          btn.classList.add('loading');
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              btn.classList.remove('loading');
              const origin = `${pos.coords.latitude},${pos.coords.longitude}`;
              openWithOrigin(origin);
            },
            () => {
              // permission denied / unavailable — fall back gracefully
              btn.classList.remove('loading');
              openWithOrigin(null);
            },
            { timeout: 5000 }
          );
        } else {
          openWithOrigin(null);
        }
      });
    });
  }

  /* ---------- WhatsApp click-to-chat ---------- */
  function initWhatsApp() {
    document.querySelectorAll('[data-whatsapp]').forEach(link => {
      const customMsg = link.dataset.whatsapp || "Hello STC Living, I'd like to enquire about your hospitality linen collection.";
      link.href = `https://wa.me/${STC.whatsappNumber}?text=${encodeURIComponent(customMsg)}`;
      link.target = '_blank';
      link.rel = 'noopener';
    });
  }
})();
