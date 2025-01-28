$(document).ready(function () {
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
