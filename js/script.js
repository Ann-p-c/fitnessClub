$(function () {
  // About slider
  $(".slider-about").slick({
    slidesToShow: 1,
    arrows: false,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    speed: 400,
    adaptiveHeight: true,
    fade: true,
  });

  // Team slider
  $(".slider-team").slick({
    slidesToShow: 1,
    arrows: false,
    dots: true,
    slidesToShow: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 300,
    centerMode: true,
    variableWidth: true,
  });

  // Scroll to Sections
  $("[data-scroll]").on("click", function (event) {
    event.preventDefault();

    let scrollElement = $(this).data("scroll");
    let scrollElementPos = $(scrollElement).offset().top;

    $(".burger").removeClass("active");
    $(".menu").removeClass("active");
    $("body").removeClass("lock");

    $("body,html").animate(
      {
        scrollTop: scrollElementPos - $(".header").innerHeight() - 20,
      },
      600
    );
  });

  $(window).on("scroll", function (event) {
    event.preventDefault();
    let scrollTop = $(this).scrollTop();

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
    if ($(this).scrollTop() > 10) {
      $(".scroll-up").fadeIn();
    } else {
      $(".scroll-up").fadeOut();
    }
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

  // Mobile Menu
  $(".burger").on("click", function (event) {
    $(".burger,.menu").toggleClass("active");
    $("header").toggleClass("open");
    $("body").toggleClass("lock");
  });
});
