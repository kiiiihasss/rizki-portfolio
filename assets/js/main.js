// Swiper Portfolio Navigation
if (typeof Swiper !== 'undefined' && document.querySelector('.swiper-container')) {
  var swiper = new Swiper('.swiper-container', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    slidesPerView: 1,
    spaceBetween: 30,
    grabCursor: true,
    effect: 'slide',
    speed: 600,
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 2,
      }
    }
  });
} else if (!window.Swiper) {
  console.warn('Swiper library not found. Portfolio slider will not work.');
}

// Header hide on scroll down, show on scroll up
let lastScrollY = window.scrollY;
const header = document.querySelector('.navbar-header');
let ticking = false;
if (header) {
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        const currentScroll = window.scrollY;
        if (currentScroll > lastScrollY && currentScroll > 60) {
          // Scroll down
          header.classList.add('hide');
          header.classList.remove('show');
        } else {
          // Scroll up
          header.classList.remove('hide');
          header.classList.add('show');
        }
        lastScrollY = currentScroll;
        ticking = false;
      });
      ticking = true;
    }
  });
  // Show header on load
  header.classList.add('show');
}
// Ambil elemen-elemen navbar
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');

// Ketika tombol hamburger diklik, tampilkan menu
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('active');
  });
}

// Ketika tombol X (close) diklik, sembunyikan menu
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
}

// Ketika salah satu link diklik, sembunyikan menu (untuk mobile UX)
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});
