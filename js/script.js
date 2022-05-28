document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth > 991) {
    const slider = new MicroSlider(".micro-slider", {
      perspectiveFactor: 2.85,
      zoomScale: -120,
      transitionDuration: 150,
      indicators: true,
    });
  } else {
    const slider = new MicroSlider(".micro-slider", {
      perspectiveFactor: 1.7,
      zoomScale: -100,
      transitionDuration: 150,
      indicators: false,
    });
  }
});

$(function () {
  $(window).on("scroll", function () {
    AOS.init({
      disable: function () {
        var maxWidth = 768;
        return window.innerWidth < maxWidth;
      },
      offset: 100,
      duration: 700,
      once: true,
    });
  });
  // Mobile Menu
  $(".menu__btn").on("click", function (event) {
    event.preventDefault();
    $(".menu__btn, .menu__list").toggleClass("active");
    $("body").toggleClass("show-menu");
  });

  // Scroll to Sections
  $("[data-scroll]").on("click", function (event) {
    event.preventDefault();

    let scrollElement = $(this).data("scroll");
    let scrollElementPos = $(scrollElement).offset().top;

    $(".menu__btn").removeClass("active");
    $(".menu__list").removeClass("active");
    $("body").removeClass("show-menu");

    $("body,html").animate(
      {
        scrollTop: scrollElementPos - $(".header").innerHeight() - 20,
      },
      500
    );
  });

  $(window).on("scroll", function (event) {
    event.preventDefault();

    let scrollTop = $(this).scrollTop();

    if (scrollTop !== 0) {
      $(".header").addClass("active");
    } else {
      $(".header").removeClass("active");
    }

    $("[data-scrollspy]").each(function () {
      let sectionId = $(this).data("scrollspy");
      let sectionOffset = $(this).offset().top;
      sectionOffset = sectionOffset - $(window).height() * 0.3;

      if (scrollTop >= sectionOffset) {
        $("[data-scroll]").removeClass("active");
        $("[data-scroll='" + sectionId + "' ]").addClass("active");
      } else if (scrollTop == 0) {
        $("[data-scroll]").removeClass("active");
      }
    });

    //Scroll to top
    if (scrollTop !== 0) {
      $(".scroll-up").fadeIn();
    } else {
      $(".scroll-up").fadeOut();
    }
  });

  // Gallery Filter
  $("[data-filter]").on("click", function (event) {
    event.preventDefault();

    $(this).addClass("active").siblings().removeClass("active");

    let cat = $(this).data("filter");

    if (cat == "all") {
      $("[data-cat]").removeClass("hide");
    } else {
      $("[data-cat]").each(function () {
        let workCat = $(this).data("cat");

        if (workCat != cat) {
          $(this).addClass("hide");
        } else {
          $(this).removeClass("hide");
        }
      });
    }
  });

  // Spoiler
  $(".block__label").on("click", function () {
    if ($(".block").hasClass("single")) {
      $(".block__label").not($(this)).removeClass("active");
      $(".block__text").not($(this).next()).slideUp(300);
    }
    $(this).toggleClass("active").next().slideToggle(300);
  });

  // Modal
  $("[data-modal]").on("click", function (event) {
    event.preventDefault();

    let modal = $(this).data("modal");

    $("body").addClass("lock");
    $(modal).addClass("active");

    setTimeout(function () {
      $(modal).find(".modal__inner").css({
        transform: "scale(1)",
        opacity: "1",
      });
    });
  });

  $("[data-modal-close]").on("click", function (event) {
    event.preventDefault();

    let modal = $(this).parents(".modal");
    modalClose(modal);
  });

  $(".modal").on("click", function () {
    let modal = $(this);
    modalClose(modal);
  });

  $(".modal__inner").on("click", function (event) {
    event.stopPropagation();
  });

  function modalClose(modal) {
    modal.find(".modal__inner").css({
      transform: "scale(0.5)",
      opacity: "0",
    });

    setTimeout(function () {
      $("body").removeClass("lock");
      $(modal).removeClass("active");
    }, 200);
  }
});
