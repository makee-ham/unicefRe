$(document).ready(function () {
  var owl = $(".owl-carousel");
  owl.owlCarousel({
    items: 1, // 한번에 보여지는 이미지 수
    dots: true, // 초기화...
    loop: true, // 항목들을 무한으로 반복하여 보여줄지 여부
    autoplay: true, // 자동으로 슬라이드 쇼를 시작할지 여부
    autoplayTimeout: 3000, // 다음 이미지로 넘어가는 시간 (단위 : 밀리초)
    autoplayHoverPause: true, // 마우스가 이미지에 위에 있을 때 자동 슬라이드를 일시중지 할지 여부
  });
});
