// navbar-loader.js
// Fetches the shared navbar.html and injects it into <div id="site-navbar"></div>
// Edit navbar.html ONCE to update the navbar across every page that uses this loader.

(function () {
  var placeholder = document.getElementById('site-navbar');
  if (!placeholder) return;

  fetch('navbar.html')
    .then(function (res) {
      if (!res.ok) throw new Error('navbar.html not found (' + res.status + ')');
      return res.text();
    })
    .then(function (html) {
      placeholder.innerHTML = html;
      initNavbar();
      highlightActiveLink();
    })
    .catch(function (err) {
      console.error('Navbar failed to load:', err);
    });

  function initNavbar() {
    var navToggle = document.getElementById('navToggle');
    var mobileMenu = document.getElementById('mobileMenu');
    var menuBackdrop = document.getElementById('menuBackdrop');
    if (!navToggle || !mobileMenu || !menuBackdrop) return;

    function closeMenu() {
      mobileMenu.classList.remove('open');
      menuBackdrop.classList.remove('open');
    }
    navToggle.addEventListener('click', function () {
      mobileMenu.classList.add('open');
      menuBackdrop.classList.add('open');
    });
    menuBackdrop.addEventListener('click', closeMenu);
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  function highlightActiveLink() {
    var current = window.location.pathname.split('/').pop() || 'index.html';
    placeholder.querySelectorAll('.nav-links > a, .mobile-menu > a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === current) {
        a.style.color = '#FFC928';
      }
    });
  }
})();
