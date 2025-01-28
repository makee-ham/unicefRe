$(document).ready(function () {
  // 메인 후원 form
  // 금액 버튼과 직접 입력 필드, 후원 버튼 선택
  const amountButtons = document.querySelectorAll(".amount-btn");
  const customAmountInput = document.getElementById("custom-amount");
  const donateButton = document.querySelector(".donate-btn");

  let selectedAmount = null; // 선택된 금액 변수

  // 금액 버튼 클릭 이벤트
  amountButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // 버튼 활성화 상태 조정
      amountButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // 직접 입력 필드 초기화
      customAmountInput.value = "";
      selectedAmount = button.dataset.value; // 버튼의 data-value 값 저장
    });
  });

  // 직접 입력 필드 이벤트
  customAmountInput.addEventListener("input", () => {
    // 금액 버튼 비활성화
    amountButtons.forEach((button) => button.classList.remove("active"));
    selectedAmount = customAmountInput.value; // 입력된 금액 저장
  });

  // 후원 버튼 클릭 이벤트
  donateButton.addEventListener("click", () => {
    if (!selectedAmount || selectedAmount <= 0) {
      alert("후원 금액을 선택하거나 입력해주세요.");
    } else {
      confirm(`${selectedAmount} 원을 후원합니다.`);
    }
  });

  ////////////////////////////////////////
  // .articleTitle(h2) 스크롤 애니메이션
  const fadeElements = document.querySelectorAll(".fade-in");

  function checkVisibility() {
    fadeElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        // 요소가 화면에 90% 들어오면 실행
        element.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", checkVisibility);
  checkVisibility(); // 페이지 로드 시 한 번 실행

  ////////////////////////////////////////
  // 커뮤니티 탭 메뉴
  $(".commuTabs > li").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
  });

  ////////////////////////////////////////
  // 진행중인 캠페인 draggable
  const board = document.querySelector(".campaignBoard");
  const images = document.querySelectorAll(".campaignImg img");
  const links = document.querySelectorAll(".campaignCard");
  let isDragging = false; // 드래그 상태
  let startX = 0; // 드래그 시작 X 좌표
  let currentTranslate = 0; // 현재 위치
  let previousTranslate = 0; // 이전 위치
  let dragDistance = 0; // 드래그 거리

  // 드래그 시작
  function startDrag(event) {
    isDragging = true;
    startX = getEventX(event);
    board.style.transition = "none"; // 드래그 중에는 애니메이션 비활성화
    board.style.cursor = "grabbing";
    dragDistance = 0; // 드래그 거리 초기화
  }

  // 드래그 중
  function drag(event) {
    if (!isDragging) return;
    const currentX = getEventX(event);
    dragDistance = currentX - startX; // 드래그 거리 계산
    currentTranslate = previousTranslate + dragDistance;
    board.style.transform = `translateX(${currentTranslate}px)`;
  }

  // 드래그 종료
  function endDrag(event) {
    if (!isDragging) return;
    isDragging = false;
    board.style.cursor = "grab";

    // 슬라이드 범위 보정
    const containerWidth = board.parentElement.offsetWidth;
    const boardWidth = board.offsetWidth;

    if (currentTranslate > 0) {
      currentTranslate = 0; // 왼쪽 경계 보정
    } else if (currentTranslate < containerWidth - boardWidth) {
      currentTranslate = containerWidth - boardWidth; // 오른쪽 경계 보정
    }

    // 부드러운 이동
    board.style.transition = "transform 0.3s ease";
    board.style.transform = `translateX(${currentTranslate}px)`;
    previousTranslate = currentTranslate;

    // 드래그가 아닌 경우에만 링크 클릭 허용
    if (Math.abs(dragDistance) < 5) {
      const targetLink = event.target.closest(".recoCircle"); // 클릭된 요소가 링크인지 확인
      if (targetLink) {
        window.location.href = targetLink.href; // 링크로 이동
      }
    }
  }

  // 링크 클릭 차단 (드래그 중일 때만)
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      if (Math.abs(dragDistance) >= 5) {
        event.preventDefault(); // 드래그 중이면 클릭 이벤트 차단
      }
    });
  });

  // 이벤트에서 X 좌표 가져오기
  function getEventX(event) {
    return event.type.includes("mouse")
      ? event.clientX
      : event.touches[0].clientX;
  }

  // 이미지 기본 드래그 방지
  images.forEach((img) => {
    img.addEventListener("dragstart", (event) => {
      event.preventDefault(); // 브라우저의 기본 이미지 드래그 방지
    });
  });

  // 이벤트 리스너 등록
  board.addEventListener("mousedown", startDrag);
  board.addEventListener("mousemove", drag);
  board.addEventListener("mouseup", endDrag);
  board.addEventListener("mouseleave", endDrag);

  // 터치 이벤트 처리
  board.addEventListener("touchstart", startDrag);
  board.addEventListener("touchmove", drag);
  board.addEventListener("touchend", endDrag);

  // 초기 커서 스타일
  board.style.cursor = "grab";
});
