$(document).ready(function () {
  var owl = $(".owl-carousel");
  owl.owlCarousel({
    items: 1,
    dots: true,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
  });
});
