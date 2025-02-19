// 게시판을 만들어보자
let totalContents = 90;
const page_num = 6;
const block_num = 5;
let total_block = Math.ceil(totalContents / page_num);
let current_block = 1;
let current_block_group =
  Math.floor((current_block - 1) / block_num) * block_num + 1;

const categories = ["news", "story", "state", "participate", "interview"];
let currentCategory = "all"; // 기본값: 전체 보기

///////////////////////////////////////
// 데이터 만들기 (객체 배열)
let data = new Array();

// 더미 데이터
for (let i = 0; i < 84; i++) {
  data[i] = {
    title: i + 1,
    category: [i + 1],
    date: i + 1,
    image: "img/sub/noimage.png",
    tags: [i + 1],
  };
}

data[89] = {
  title: "가자지구 위기 관련 피해 및 구호 활동 ···",
  category: ["all", "story", "스토리"],
  date: "2025. 02. 03",
  image: "img/sub/story1.png",
  tags: ["#인도주의지원", "#보호"],
};
data[88] = {
  title: "2024년, 기후 위기로 어린이 약 2억 ···",
  category: ["all", "news", "뉴스"],
  date: "2025. 01. 31",
  image: "img/sub/news1.png",
  tags: ["#기후위기대응"],
};
data[87] = {
  title: "[1월, 2월 모바일 달력] 후원자님, 모바일 ···",
  category: ["all", "story", "스토리"],
  date: "2025. 01. 17",
  image: "img/sub/story2.png",
  tags: ["#후원자참여활동"],
};
data[86] = {
  title: "아이티, 멈추지 않는 폭력 속 어린이 8명 ···",
  category: ["all", "news", "뉴스"],
  date: "2025. 01. 17",
  image: "img/sub/news2.png",
  tags: ["#인도주의지원", "#보호"],
};
data[85] = {
  title: "유니세프 팀 합류 100일 기념 참 확인하기",
  category: ["all", "story", "스토리"],
  date: "2025. 01. 15",
  image: "img/sub/story3.png",
  tags: [],
};
data[84] = {
  title: "가자지구 휴전 협정에 대한 캐서린 러셀 ···",
  category: ["all", "state", "성명"],
  date: "2025. 01. 15",
  image: "img/sub/dudeletsgo.png",
  tags: ["#인도주의지원"],
};

//////////////////////////////

// totalContents & total_block 업데이트
function updateTotal() {
  if (currentCategory === "all") {
    totalContents = data.length;
  } else {
    totalContents = data.filter((item) =>
      item.category.includes(currentCategory)
    ).length;
  }
  total_block = Math.ceil(totalContents / page_num);
  current_block = 1;
}

// 게시물 출력 함수
function post_data_print(block) {
  let board = document.querySelector(".boardContents");
  board.innerHTML = ""; // 기존 게시물 초기화

  let filteredData =
    currentCategory === "all"
      ? data
      : data.filter((item) => item.category.includes(currentCategory));

  if (filteredData.length === 0) {
    // 게시물이 없는 경우 처리
    board.innerHTML = `<p class="no-posts">게시물이 없습니다.</p>`;
    document.querySelector(".pagination").style.display = "none";
    return;
  } else {
    document.querySelector(".pagination").style.display = "flex"; // 페이지 블록 보이기
  }

  let totalFilteredContents = filteredData.length;
  let start = Math.max(0, totalFilteredContents - 1 - page_num * (block - 1));
  let end = Math.max(0, start - page_num + 1); // 음수 방지

  for (let i = start; i >= end; i--) {
    let postCard = document.createElement("div");
    postCard.className = "post-card";
    postCard.innerHTML = `
      <p class="post-category">${
        filteredData[i].category?.[2] || "카테고리 없음"
      }</p>
      <div class="post-image">
        <img src="${
          filteredData[i].image || "img/sub/noimage.png"
        }" alt="게시물 이미지">
      </div>
      <div class="post-content">
        <p class="post-date">${filteredData[i].date || "날짜 없음"}</p>
        <h3 class="post-title">${filteredData[i].title || "제목 없음"}</h3>
        <div class="tagsContainer">
          ${
            filteredData[i].tags
              ? filteredData[i].tags
                  .map((tag) => `<p class="post-tags">${tag}</p>`)
                  .join("")
              : ""
          }
        </div>
      </div>
    `;
    board.appendChild(postCard);
  }
  updateActiveButton(block);
}

// 블록 출력하기
// 파라미터: 가장 앞에 오는 블록
function block_print(front_block) {
  let block_box = document.querySelector(".block");
  let pagination = document.querySelector(".pagination");
  block_box.replaceChildren(); // 기존 블록 초기화

  if (totalContents === 0) {
    // 게시물이 없으면 블록 숨기기
    block_box.style.display = "none";
    pagination.style.display = "none";
    return;
  } else {
    block_box.style.display = "flex"; // 블록 보이기
    pagination.style.display = "flex";
  }

  if (front_block < 1) front_block = 1;
  if (front_block > total_block) front_block = total_block;

  // 이전 버튼 비활성화
  document.querySelector(".before_move").style.visibility =
    front_block <= 1 ? "hidden" : "visible";

  // 다음 버튼 비활성화
  document.querySelector(".next_move").style.visibility =
    front_block + block_num > total_block ? "hidden" : "visible";

  // 블록 생성
  for (
    let i = front_block;
    i < front_block + block_num && i <= total_block;
    i++
  ) {
    let button = document.createElement("button");
    button.textContent = i;

    // 버튼 클릭 시 게시글 변경
    button.addEventListener("click", () => {
      post_data_print(i);
      updateActiveButton(i);
      current_block = i; // 현재 페이지 업데이트
    });

    block_box.appendChild(button);
  }

  updateActiveButton(front_block); // 블록 그룹 첫 번째 버튼을 활성화
}

// current_block의 값과 동일한 .block > button.innerHTML 있으면(요건 숫자형으로 변환 해야함) 그거에 active 클래스 부여하기
function updateActiveButton(activeBlock) {
  let buttonList = document.querySelectorAll(".block > button");

  buttonList.forEach((btn) => {
    if (Number(btn.innerHTML) === activeBlock) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  current_block = activeBlock;
}

// 활성화된 탭 업데이트
function updateActiveTab(activeTab) {
  document
    .querySelectorAll(".tab")
    .forEach((tab) => tab.classList.remove("active"));
  activeTab.classList.add("active");
}

function before() {
  let current_block_group =
    Math.floor((current_block - 1) / block_num) * block_num + 1;
  let newBlock = Math.max(1, current_block_group - block_num); // 무좍건 그룹의 첫번째 녀석만 되게 함
  block_print(newBlock);
  post_data_print(newBlock);
  updateActiveButton(newBlock);
}

function next() {
  let current_block_group =
    Math.floor((current_block - 1) / block_num) * block_num + 1;
  let newBlock = Math.min(total_block, current_block_group + block_num);
  block_print(newBlock);
  post_data_print(newBlock);
  updateActiveButton(newBlock);
}

// 탭 변경 이벤트
function setupTabs() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", (e) => {
      currentCategory = e.target.id;
      updateTotal();
      post_data_print(1);
      block_print(1);
      updateActiveTab(e.target);
    });
  });
}

// 화면 로드 시 실행되는 이벤트
window.onload = function () {
  // 탭 셋업
  setupTabs();
  // 게시글 데이터 출력
  post_data_print(1);
  updateTotal();
  // 블록 출력
  block_print(1);
  updateActiveButton(1);
};
