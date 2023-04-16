// jQuerry
(function ($) {
  ('use strict'); // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate(
          {
            scrollTop: target.offset().top - 54,
          },
          1000,
          'easeInOutExpo'
        );
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 56,
  });

  // Collapse Navbar
  var navbarCollapse = function () {
    if ($('#mainNav').offset().top > 100) {
      $('#mainNav').addClass('navbar-shrink');
    } else {
      $('#mainNav').removeClass('navbar-shrink');
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();

  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Lazy load Modal pictures
  $('.modal').on('show.bs.modal', function (e) {
    let modalToOpen = e.relatedTarget.getAttribute('href');
    $(modalToOpen)
      .find('.lazy_load')
      .each(function () {
        var img = $(this);
        img.attr('src', img.data('src'));
      });
  });
})(jQuery); // End of use strict

const carouselCartelDeObra = document.querySelector('#carouselCartelDeObra');
const carouselCercoDeObra = document.querySelector('#carouselCercoDeObra');

let currentGalleryControlFunction = null;

const galleryObserver = new IntersectionObserver(
  (galleries) => {
    let galleryOnFocus = null;
    galleries.forEach((gallery) => {
      if (gallery.isIntersecting) {
        galleryOnFocus = gallery;
      }
    });
    if (galleryOnFocus) {
      const [carouselControlPrev, carouselControlNext] = galleryOnFocus.target.querySelectorAll(
        '.carousel-control-prev, .carousel-control-next'
      );
      console.log(carouselControlNext);
      if (currentGalleryControlFunction) {
        document.removeEventListener('keydown', currentGalleryControlFunction);
      }
      currentGalleryControlFunction = function (e) {
        if (e.key === 'ArrowLeft') {
          carouselControlPrev.click();
        } else if (e.key === 'ArrowRight') {
          carouselControlNext.click();
        }
      };
      document.addEventListener('keydown', currentGalleryControlFunction);
    } else {
      if (currentGalleryControlFunction) {
        document.removeEventListener('keydown', currentGalleryControlFunction);
        currentGalleryControlFunction = null;
      }
    }
  },
  {
    root: null,
    rootMargin: '0px',
    threshold: 0.7,
  }
);

// const observerCercoDeObra = new IntersectionObserver((entries) => {
//   const entry = entries[0];
//   if (entry.isIntersecting) {
//     // Enable keyboard events for carouselCercoDeObra
//     carouselCercoDeObra.addEventListener('keydown', (e) => {
//       if (e.code === 'ArrowLeft') {
//         carouselCercoDeObra.carousel('prev');
//       } else if (e.code === 'ArrowRight') {
//         carouselCercoDeObra.carousel('next');
//       }
//     });
//   } else {
//     // Disable keyboard events for carouselCercoDeObra
//     carouselCercoDeObra.removeEventListener('keydown', null);
//   }
// });

galleryObserver.observe(carouselCartelDeObra);
galleryObserver.observe(carouselCercoDeObra);

// Change AOS to fade-down when screen is < 768px

let dataAOSelements = document.querySelectorAll('[data-aos]');
const windowSize = function () {
  if (screen.width < 992) {
    for (let element of dataAOSelements) {
      if (element.dataset.aos !== 'zoom-in') {
        element.dataset.aos = 'fade-up';
      }
    }
  }
};
windowSize();

// Modals Slideshow

const gallery = (id) => {
  let slideIndex = 1;
  showSlides(slideIndex);

  const [carouselControlNext, carouselControlPrev] = document
    .getElementById(id)
    .querySelectorAll('.carousel-control-next, .carousel-control-prev');
  carouselControlPrev.addEventListener('click', () => showSlides(--slideIndex));
  carouselControlNext.addEventListener('click', () => showSlides(++slideIndex));

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      // left arrow
      showSlides(--slideIndex);
    } else if (e.key === 'ArrowRight') {
      // right arrow
      showSlides(++slideIndex);
    }
  });

  const thumbnails = document.getElementById(id).querySelectorAll('.demo');

  Array.from(thumbnails).forEach((link) =>
    link.addEventListener('click', function () {
      showSlides((slideIndex = this.getAttribute('index')));
    })
  );

  function showSlides(n) {
    let i;
    const slides = document.getElementById(id).getElementsByClassName('mySlides');
    const dots = document.getElementById(id).getElementsByClassName('demo');
    // let captionText = document
    //   .getElementById(id)
    //   .getElementsByClassName("caption-text")[0];
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }
    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].className += ' active';
    // captionText.innerHTML = dots[slideIndex - 1].alt;
  }
};

// Get Year for Copyright
document.addEventListener('DOMContentLoaded', function () {
  let d = new Date();
  let n = d.getFullYear();
  document.getElementById('year').innerHTML = n;
});
