$(document).ready(function () {
  // 스크롤 다운 시 #upperHeader 안 보이게
  let lastScrollTop = 0;
  const $upperHeader = $("#upperHeader");
  const $mainHeader = $("#mainHeader");
  const headerHeight = $upperHeader.outerHeight();

  $(window).on("scroll", function () {
    const currentScrollTop = $(this).scrollTop();

    // 스크롤 다운 시 upperHeader 사라짐
    if (currentScrollTop > lastScrollTop) {
      $upperHeader.stop().slideUp(300);
      $mainHeader.css("top", "0"); // mainHeader가 맨 위로 이동
    }
    // 스크롤 업 시 upperHeader 등장
    else if (currentScrollTop < lastScrollTop) {
      if (currentScrollTop === 0) {
        $upperHeader.stop().slideDown(300);
      }
    }

    // mainHeader fixed
    if (currentScrollTop > headerHeight) {
      $mainHeader.addClass("fixed");
    } else {
      $mainHeader.removeClass("fixed");
    }

    lastScrollTop = currentScrollTop;
  });

  // GNB(PC)
  $(".navi > li").on("mouseenter", function () {
    // 서브 메뉴 표시
    $(".subMenu", this).stop().fadeIn();
    // 서브 메뉴 호버에도 메인 메뉴 호버 효과 내기
    $(".mainMenu", this).css({
      color: "#2caeff",
      borderBottom: "1.5px solid #2caeff",
    });
  });
  $(".navi > li").on("mouseleave", function () {
    $(".subMenu", this).stop().fadeOut();
    $(".mainMenu", this).css({
      color: "#000",
      borderBottom: "none",
    });
  });

  // newsletter form (냉무랑 이메일 형식 거르기)
  $(".subscribe").on("click", function (e) {
    let name = document.getElementById("readerName").value.trim();
    let email = document.getElementById("readerEMail").value.trim();
    // 이메일 유효성 검사용 패턴
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // 냉무 경고
    if (!name || !email) {
      alert("이름과 이메일을 입력하세요.");
      e.preventDefault(); // 제출 방지
      return false;
    }
    // 올바르지 않은 이메일 형식 경고
    if (!emailPattern.test(email)) {
      alert("올바른 이메일 형식을 입력하세요.");
      e.preventDefault(); // 제출 방지
      return false;
    }
    // 제출 성공!
    alert("뉴스레터를 구독하셨습니다.");
  });

  // go top!
  $(".goTop").on("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
