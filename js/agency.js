// jQuerry
(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
      this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 54
          },
          1000,
          "easeInOutExpo"
        );
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll-trigger").click(function () {
    $(".navbar-collapse").collapse("hide");
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $("body").scrollspy({
    target: "#mainNav",
    offset: 56
  });

  // Collapse Navbar
  var navbarCollapse = function () {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();

  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Focus on Carousel when on screen
  // $(window).on("activate.bs.scrollspy", function(e, obj) {
  //   if ($(obj.relatedTarget).find(".carousel-control-prev")) {
  //     $(obj.relatedTarget)
  //       .find(".carousel-control-prev")
  //       .focus();
  //   }
  // });

  // Lazy load Modal pictures
  $(".modal").on("show.bs.modal", function (e) {
    let modalToOpen = e.relatedTarget.getAttribute("href");
    $(modalToOpen)
      .find(".lazy_load")
      .each(function () {
        var img = $(this);
        img.attr("src", img.data("src"));
      });
  });

})(jQuery); // End of use strict

// Change AOS to fade-down when screen is < 768px

let dataAOSelements = document.querySelectorAll("[data-aos]");
const windowSize = function () {
  if (screen.width < 992) {
    for (let element of dataAOSelements) {
      if (element.dataset.aos !== "zoom-in") {
        element.dataset.aos = "fade-up";
      }
    }
  }
};
windowSize();

// Modals Slideshow

const gallery = id => {
  let slideIndex = 1;
  showSlides(slideIndex);

  document
    .getElementById(id)
    .querySelector(".carousel-control-prev")
    .addEventListener("click", function () {
      showSlides((slideIndex += -1));
    });

  const thumbnails = document.getElementById(id).querySelectorAll(".demo");

  Array.from(thumbnails).forEach(link =>
    link.addEventListener("click", function () {
      showSlides((slideIndex = this.getAttribute("index")));
    })
  );

  document
    .getElementById(id)
    .querySelector(".carousel-control-next")
    .addEventListener("click", function () {
      showSlides((slideIndex += 1));
    });

  function showSlides(n) {
    let i;
    let slides = document.getElementById(id).getElementsByClassName("mySlides");
    let dots = document.getElementById(id).getElementsByClassName("demo");
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
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    // captionText.innerHTML = dots[slideIndex - 1].alt;
  }
};

// Get Year for Copyright
document.addEventListener("DOMContentLoaded", function () {
  let d = new Date();
  let n = d.getFullYear();
  document.getElementById("year").innerHTML = n;
});