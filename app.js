const STORAGE_KEY = "ai-data-startup-lab-v3";

const conversionKeywords = [
  "간접체험", "기계시스템 대체", "다기능", "대상변경", "리사이클링", "맞춤형", "반복작용", "비대면", "사전처리", "상태변경",
  "세분화", "셀프서비스", "신속처리", "역발상", "원형화", "위치기반", "융합", "중개", "추출", "휴대용"
];

const sessions = [
  {
    id: 1,
    title: "경쟁아이템 선택 및 상세페이지 탐색",
    purpose: "관심사를 입력해 한국 크라우드펀딩 플랫폼 안의 실제 제품/프로젝트를 추천받고, 하나를 경쟁제품으로 선택합니다.",
    why: "이 수업의 출발점은 막연한 아이디어 만들기가 아니라 이미 시장 반응을 얻은 한국 크라우드펀딩 제품을 관찰하는 것입니다. 상세페이지에서 가치 제안, 기능, 고객 반응을 읽고 그 아이템을 발전시키는 방식으로 실습합니다.",
    done: "관심사, 추천 아이템 확인, 경쟁제품 선택, 상세페이지 링크, 선택 이유가 작성되어야 합니다.",
    fields: [
      field("interest", "관심사", "text", "예: 운동, 반려동물, 여행, 피부관리, 코딩교육, 캠핑", [], true),
      field("industry", "추천/선택 분야", "text", "추천 아이템을 선택하면 자동으로 채워집니다.", [], true),
      field("itemName", "선택한 경쟁아이템", "text", "추천 카드에서 하나를 선택하거나 직접 입력합니다.", [], true),
      field("itemLine", "경쟁아이템 한 줄 설명", "text", "추천 아이템을 선택하면 자동으로 채워집니다.", [], true),
      field("itemDesc", "상세페이지에서 확인한 설명", "textarea", "와디즈/텀블벅 등 상세페이지에서 핵심 기능, 고객 가치, 판매 포인트를 읽고 요약합니다.", [], true),
      field("selectedItemLink", "상세페이지 링크", "text", "검색된 상세페이지 링크를 확인하고, 필요하면 학생이 직접 수정합니다.", [], true),
      field("selectionReason", "경쟁아이템 선정 이유", "textarea", "왜 이 아이템을 경쟁제품으로 분석하고 발전시키려는지 작성합니다.", [], true)
    ]
  },
  {
    id: 2,
    title: "창업 배경 및 문제점 확인",
    purpose: "뉴스와 자료를 근거로 기회요인과 위협요인을 함께 정리합니다.",
    why: "좋은 아이디어도 시장의 흐름과 위험을 함께 읽어야 실행 가능한 사업이 됩니다. 이 단계는 '왜 지금 필요한가'를 설명하기 위한 근거 수집입니다.",
    done: "기회요인 기사와 위협요인 기사 각각의 제목, 요약, 시사점이 작성되어야 합니다.",
    fields: [
      field("oppKeyword", "기회요인 검색 키워드", "text", "예: 마스크 착용 불편, 1인 가구 간편식 성장", [], true),
      field("oppTitle", "기회요인 기사 제목", "text", "기사 제목을 입력합니다.", [], true),
      field("oppSummary", "기회요인 기사 요약", "textarea", "기사 핵심 내용을 학생의 말로 요약합니다.", [], true),
      field("oppInsight", "기회요인 시사점", "textarea", "이 기사가 내 아이템에 어떤 기회를 주는지 씁니다.", [], true),
      field("threatKeyword", "위협요인 검색 키워드", "text", "예: 방역 효과 저하, 기존 제품 불만", [], true),
      field("threatTitle", "위협요인 기사 제목", "text", "기사 제목을 입력합니다.", [], true),
      field("threatSummary", "위협요인 기사 요약", "textarea", "기사 핵심 내용을 학생의 말로 요약합니다.", [], true),
      field("threatInsight", "위협요인 시사점", "textarea", "위험을 어떻게 피하거나 개선할지 씁니다.", [], true)
    ]
  },
  {
    id: 3,
    title: "경쟁아이템 및 고객 Needs 분석",
    purpose: "경쟁제품이 해결하려는 문제와 부족한 점을 분석해 개선 방향을 찾습니다.",
    why: "경쟁제품 분석은 베끼기가 아니라, 고객이 이미 불편해하는 지점을 더 정확히 발견하는 과정입니다.",
    done: "경쟁제품의 문제, 해결책, 아쉬운 점, 핵심가치, 기능/비기능 문제와 SWOT이 작성되어야 합니다.",
    fields: [
      field("competitor", "경쟁 아이템", "text", "예: 기존 마스크 가드, 전자식 마스크", [], true),
      field("competitorProblem", "경쟁제품이 해결하려는 문제", "textarea", "고객이 겪는 원래 문제를 작성합니다.", [], true),
      field("competitorSolution", "경쟁제품의 해결책", "textarea", "경쟁제품이 문제를 해결하는 방식을 씁니다.", [], true),
      field("competitorLack", "경쟁제품 해결책의 아쉬운 점", "textarea", "기능, 사용성, 가격, 디자인 측면의 한계를 씁니다.", [], true),
      field("competitorValue", "경쟁제품의 핵심가치", "text", "예: 숨쉬기 편함, 휴대성, 저렴함", [], true),
      field("functionalProblem", "기능적 문제점", "textarea", "성능, 정확도, 안정성 등 기능 한계를 씁니다.", [], true),
      field("nonFunctionalProblem", "기능 외 문제점", "textarea", "가격, 무게, 디자인, 신뢰, 구매경험 문제를 씁니다.", [], true),
      field("swot", "SWOT 요약", "textarea", "강점, 약점, 기회, 위협을 한 번에 정리합니다.", [], true)
    ]
  },
  {
    id: 4,
    title: "고객 분류 및 목표고객 선정",
    purpose: "전체시장, 유효시장, 수익시장을 구분하고 초기 타겟을 선택합니다.",
    why: "모두를 위한 제품은 실제 마케팅에서 누구에게도 선명하지 않을 수 있습니다. 이 단계는 첫 고객을 좁히는 연습입니다.",
    done: "TAM/SAM/SOM, 타겟 조건, 선정 이유, 홍보 채널과 콘텐츠 컨셉이 작성되어야 합니다.",
    fields: [
      field("tam", "TAM 전체시장", "textarea", "가장 넓은 시장 규모와 기준을 씁니다.", [], true),
      field("sam", "SAM 유효시장", "textarea", "내 아이템이 실제 접근할 수 있는 시장을 씁니다.", [], true),
      field("som", "SOM 수익시장", "textarea", "초기 매출을 기대할 수 있는 현실적 고객군을 씁니다.", [], true),
      field("targetProfile", "선정 타겟", "textarea", "성별, 연령, 상황, 관심사 등 구체 조건을 씁니다.", [], true),
      field("targetReason", "타겟 선정 이유", "textarea", "왜 이 고객부터 시작하는지 근거를 씁니다.", [], true),
      field("promoChannels", "홍보 채널 순위", "text", "예: 1순위 네이버, 2순위 유튜브, 3순위 인스타그램", [], true),
      field("contentType", "콘텐츠 형태 순위", "text", "예: 짧은 영상, 사진, 중간 길이 영상", [], true),
      field("promoConcept", "자사아이템 홍보 컨셉", "textarea", "어떤 메시지와 장면으로 홍보할지 작성합니다.", [], true)
    ]
  },
  {
    id: 5,
    title: "창업 아이디어 고도화",
    purpose: "기존 아이디어에 변환 키워드를 적용해 더 차별적인 가치 제안을 만듭니다.",
    why: "아이디어 고도화는 완전히 새로 만드는 것이 아니라, 도구/대상/가치/기능 중 무엇을 바꾸면 고객 가치가 커지는지 실험하는 과정입니다.",
    done: "기존 4요소와 고도화 4요소, 변환 키워드, 한 줄 설명, 차별화 포인트가 작성되어야 합니다.",
    fields: [
      field("beforeTool", "기존 도구", "text", "예: 마스크 가드", [], true),
      field("beforeTarget", "기존 대상", "text", "예: 마스크 사용자", [], true),
      field("beforeValue", "기존 가치", "text", "예: 숨쉬기 편함", [], true),
      field("beforeFunction", "기존 기능", "text", "예: 마스크와 입 사이 공간 확보", [], true),
      field("conversionKeyword", "변환 키워드", "select", "아이템을 어떤 방향으로 발전시킬지 선택하세요.", conversionKeywords, true),
      field("afterTool", "고도화 도구", "text", "변환 후 도구를 작성합니다.", [], true),
      field("afterTarget", "고도화 대상", "text", "더 구체화된 고객을 작성합니다.", [], true),
      field("afterValue", "고도화 가치", "text", "새롭게 제공하는 가치를 씁니다.", [], true),
      field("afterFunction", "고도화 기능", "text", "변환 후 핵심 기능을 씁니다.", [], true),
      field("upgradedLine", "고도화된 한 줄 설명", "textarea", "도구, 대상, 가치, 기능이 드러나게 작성합니다.", [], true),
      field("diffPoint", "차별화 포인트", "textarea", "기존 제품과 가장 다른 점을 2-3개 씁니다.", [], true)
    ]
  },
  {
    id: 6,
    title: "잠재고객 수요 조사",
    purpose: "설문 문항과 고객 의견을 통해 아이디어의 타당성을 검증합니다.",
    why: "창업 아이디어는 만든 사람의 확신만으로 부족합니다. 잠재고객의 반응을 확인하고, 기능과 가격을 조정해야 합니다.",
    done: "설문 대상, 핵심 문항, 결과 요약, 고객 의견, 시사점이 작성되어야 합니다.",
    fields: [
      field("surveyTarget", "설문 대상 조건", "textarea", "예: 30대 기혼 여성, 건강 관심층, 마스크 사용 경험자", [], true),
      field("surveyQuestions", "핵심 설문 문항", "textarea", "인지도, 선택 기준, 사용 의향, 희망 가격, 자유 의견 문항을 작성합니다.", [], true),
      field("surveySummary", "설문조사 결과 요약", "textarea", "응답 경향과 그래프 해석을 요약합니다.", [], true),
      field("customerVoices", "잠재고객 의견", "textarea", "대표 의견 3-4개를 정리합니다.", [], true),
      field("surveyInsight", "시사점", "textarea", "결과를 바탕으로 제품 개발과 마케팅에 반영할 점을 씁니다.", [], true)
    ]
  },
  {
    id: 7,
    title: "창업아이템 개요 작성",
    purpose: "고객 문제, 기존 해결책의 한계, 자사 해결책과 핵심 기능을 하나의 이야기로 정리합니다.",
    why: "좋은 사업 설명은 기능 나열이 아니라 고객 문제에서 출발해 해결책과 차별성을 설득하는 흐름을 가집니다.",
    done: "고객 Needs, 기존 해결책, 문제점, 자사 해결책, 핵심 기능 3개와 설명이 작성되어야 합니다.",
    fields: [
      field("customerNeeds", "고객 Needs", "textarea", "고객이 진짜 원하는 상태를 씁니다.", [], true),
      field("existingSolution", "기존 해결책", "textarea", "현재 고객이나 경쟁제품이 쓰는 해결책을 씁니다.", [], true),
      field("existingProblem", "기존 해결책의 문제점", "textarea", "왜 충분하지 않은지 씁니다.", [], true),
      field("ourSolution", "자사 해결책", "textarea", "내 아이템이 어떻게 다르게 해결하는지 씁니다.", [], true),
      field("feature1", "핵심 기능 1", "text", "기능명을 씁니다.", [], true),
      field("feature1Desc", "핵심 기능 1 설명", "textarea", "고객 가치 중심으로 설명합니다.", [], true),
      field("feature2", "핵심 기능 2", "text", "기능명을 씁니다.", [], true),
      field("feature2Desc", "핵심 기능 2 설명", "textarea", "고객 가치 중심으로 설명합니다.", [], true),
      field("feature3", "핵심 기능 3", "text", "기능명을 씁니다.", [], true),
      field("feature3Desc", "핵심 기능 3 설명", "textarea", "고객 가치 중심으로 설명합니다.", [], true)
    ]
  },
  {
    id: 8,
    title: "사업계획서 정리",
    purpose: "지금까지의 실습 결과를 발표와 제출이 가능한 사업계획서로 정리합니다.",
    why: "마지막 단계는 작성한 내용을 예쁘게 모으는 것이 아니라, 시장 근거와 고객 가치, 수익 구조가 한 흐름으로 보이게 편집하는 일입니다.",
    done: "비즈니스 모델, 수익모델, 핵심 경쟁력, 1분 발표 피치가 작성되어야 합니다.",
    fields: [
      field("businessModel", "비즈니스 모델", "textarea", "누가 돈을 내고, 어떤 가치에 비용을 지불하는지 씁니다.", [], true),
      field("revenueModel", "수익모델", "textarea", "제품 판매, 구독, 광고, 제휴, 콘텐츠 제작 등 수익원을 씁니다.", [], true),
      field("coreCompetitiveness", "핵심 경쟁력", "textarea", "경쟁사 대비 강점 3가지를 근거와 함께 씁니다.", [], true),
      field("pitch", "1분 발표 피치", "textarea", "문제, 해결책, 타겟, 차별성, 기대효과가 드러나게 작성합니다.", [], true)
    ]
  }
];

const state = {
  currentSession: 1,
  completed: [],
  projectName: "",
  data: {},
  suggestions: [],
  recommendedItems: [],
  manualSearchLinks: [],
  searchStatus: ""
};

const el = {
  projectName: document.getElementById("projectName"),
  sessionNav: document.getElementById("sessionNav"),
  progressText: document.getElementById("progressText"),
  progressPercent: document.getElementById("progressPercent"),
  progressFill: document.getElementById("progressFill"),
  sessionKicker: document.getElementById("sessionKicker"),
  sessionTitle: document.getElementById("sessionTitle"),
  sessionPurpose: document.getElementById("sessionPurpose"),
  whyText: document.getElementById("whyText"),
  doneText: document.getElementById("doneText"),
  fieldArea: document.getElementById("fieldArea"),
  suggestionList: document.getElementById("suggestionList"),
  completeBtn: document.getElementById("completeBtn"),
  previewBtn: document.getElementById("previewBtn"),
  previewDialog: document.getElementById("previewDialog"),
  onePageSummary: document.getElementById("onePageSummary"),
  slideDeck: document.getElementById("slideDeck")
};

function field(id, label, type, help, options = [], required = false) {
  return { id, label, type, help, options, required };
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;
  try {
    const parsed = JSON.parse(saved);
    applyImportedState(parsed);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function applyImportedState(imported) {
  if (!imported || typeof imported !== "object") {
    throw new Error("프로젝트 JSON 형식이 올바르지 않습니다.");
  }

  const nextSession = Number(imported.currentSession || 1);
  state.currentSession = sessions.some((session) => session.id === nextSession) ? nextSession : 1;
  state.completed = Array.isArray(imported.completed)
    ? imported.completed.map(Number).filter((id) => sessions.some((session) => session.id === id))
    : [];
  state.projectName = String(imported.projectName || "");
  state.data = imported.data && typeof imported.data === "object" ? { ...imported.data } : {};
  state.suggestions = Array.isArray(imported.suggestions) ? imported.suggestions : [];
  state.recommendedItems = Array.isArray(imported.recommendedItems) ? imported.recommendedItems.map(normalizeRecommendation) : [];
  state.manualSearchLinks = Array.isArray(imported.manualSearchLinks) ? imported.manualSearchLinks : [];
  state.searchStatus = String(imported.searchStatus || "");
}

function currentSession() {
  return sessions.find((session) => session.id === state.currentSession) || sessions[0];
}

function valueOf(id) {
  return state.data[id] || "";
}

function setValue(id, value) {
  state.data[id] = value;
  saveState();
  updateProgress();
}

function render() {
  el.projectName.value = state.projectName || "";
  renderNav();
  renderSession();
  updateProgress();
  checkApiStatus();
}

function renderNav() {
  el.sessionNav.innerHTML = sessions.map((session) => {
    const active = session.id === state.currentSession ? "active" : "";
    const done = state.completed.includes(session.id) ? "done" : "";
    return `
      <button class="session-tab ${active} ${done}" type="button" data-session="${session.id}">
        <span class="tab-index">${session.id}</span>
        <span class="tab-title">${session.title}</span>
        <span class="tab-status"></span>
      </button>
    `;
  }).join("");
}

function renderSession() {
  const session = currentSession();
  el.sessionKicker.textContent = `${session.id}차시`;
  el.sessionTitle.textContent = session.title;
  el.sessionPurpose.textContent = session.purpose;
  el.whyText.textContent = session.why;
  el.doneText.textContent = session.done;

  const beforeFields = [
    session.id === 1 ? renderItemRecommender() : "",
    session.id === 5 ? renderKeywordDeck() : ""
  ].join("");
  el.fieldArea.innerHTML = beforeFields + session.fields.map((item) => renderField(item)).join("");
  state.suggestions = buildDefaultSuggestions(session);
  renderSuggestions();
}

function renderItemRecommender() {
  const cards = state.recommendedItems || [];
  const cardMarkup = cards.length ? cards.map((card, index) => `
    <article class="recommend-card live-card">
      ${card.imageUrl ? `<img src="${imageProxyUrl(card.imageUrl)}" alt="${escapeHtml(card.name)} 대표 이미지">` : ""}
      <div class="recommend-body">
        <div class="recommend-meta">${escapeHtml(card.platform || "Crowdfunding")} · ${escapeHtml(card.category || "분야 미정")}</div>
        <h3>${escapeHtml(card.name)}</h3>
        <p>${escapeHtml(card.description)}</p>
        <div class="recommend-links">
          ${card.url ? `<a href="${escapeHtml(card.url)}" target="_blank" rel="noreferrer">상세페이지 열기</a>` : ""}
          <a href="${buildSearchUrl(card.name, card.platform)}" target="_blank" rel="noreferrer">웹에서 다시 확인</a>
        </div>
        <button class="button primary" type="button" data-select-item="${index}">이 경쟁아이템 선택</button>
      </div>
    </article>
  `).join("") : `<div class="empty-recommend">관심사를 입력하고 검색 버튼을 누르면 최신 크라우드펀딩 경쟁아이템 후보가 여기에 표시됩니다.</div>`;

  return `
    <section class="recommender-block">
      <div class="recommender-head">
        <div>
          <strong>최신 크라우드펀딩 경쟁아이템 추천</strong>
          <p>관심사를 기준으로 와디즈, 텀블벅, 오마이컴퍼니, 펀딩포유 등 한국 크라우드펀딩 플랫폼 내부의 개별 제품/프로젝트만 찾습니다. 브랜드 자사몰이나 일반 쇼핑몰은 제외합니다.</p>
        </div>
        <button class="button dark" type="button" data-search-recommendations>경쟁아이템 검색</button>
      </div>
      <div id="searchStatus" class="search-status">${escapeHtml(state.searchStatus || "검색할 관심사를 위 입력칸에 적어주세요.")}</div>
      ${renderManualSearchLinks()}
      <div class="recommend-grid">${cardMarkup}</div>
      ${valueOf("itemName") ? renderGeneratedCardPreview() : ""}
    </section>
  `;
}

function renderManualSearchLinks() {
  const links = state.manualSearchLinks || [];
  if (!links.length) return "";
  return `
    <div class="manual-search-links" aria-label="직접 검색 링크">
      ${links.map((link) => `<a href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>`).join("")}
    </div>
  `;
}

function renderKeywordDeck() {
  const selected = valueOf("conversionKeyword");
  return `
    <section class="recommender-block">
      <div class="recommender-head">
        <div>
          <strong>고도화 변환 키워드</strong>
          <p>경쟁아이템의 도구, 대상, 가치, 기능 중 무엇을 바꿀지 생각하며 키워드를 고릅니다.</p>
        </div>
      </div>
      <div class="keyword-grid">
        ${conversionKeywords.map((keyword) => `
          <button class="keyword-card text-keyword ${selected === keyword ? "selected" : ""}" type="button" data-select-keyword="${escapeHtml(keyword)}">
            <span>${escapeHtml(keyword)}</span>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function buildSearchUrl(name, platform = "") {
  return `https://www.google.com/search?q=${encodeURIComponent(`${name || ""} ${platform || ""} 와디즈 텀블벅 크라우드펀딩`)}`;
}

function buildManualSearchLinks(interest) {
  const query = String(interest || "").trim();
  if (!query) return [];
  return [
    ["와디즈", `site:wadiz.kr ${query}`],
    ["텀블벅", `site:tumblbug.com ${query}`],
    ["오마이컴퍼니", `site:ohmycompany.com ${query}`],
    ["펀딩포유", `site:funding4u.co.kr ${query}`]
  ].map(([label, keyword]) => ({
    label: `${label}에서 직접 확인`,
    url: `https://www.google.com/search?q=${encodeURIComponent(keyword)}`
  }));
}

function normalizeRecommendation(item) {
  return {
    name: item.name || item.title || "",
    platform: item.platform || "Crowdfunding",
    category: item.category || item.industry || "",
    description: item.description || item.summary || "",
    url: item.url || item.link || "",
    imageUrl: item.imageUrl || item.image || "",
    searchKeyword: item.searchKeyword || item.keyword || item.name || ""
  };
}

async function searchRecommendations() {
  const interest = valueOf("interest").trim();
  if (!interest) {
    state.searchStatus = "먼저 관심사를 입력하세요.";
    renderSession();
    return;
  }

  state.searchStatus = "크라우드펀딩 아이템을 검색하고 있습니다...";
  state.recommendedItems = [];
  state.manualSearchLinks = [];
  saveState();
  renderSession();

  try {
    const response = await fetch("/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ interest })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "검색에 실패했습니다.");
    state.recommendedItems = (result.items || []).map(normalizeRecommendation).slice(0, 5);
    state.searchStatus = state.recommendedItems.length
      ? "후보를 찾았습니다. 상세페이지를 열어 확인한 뒤 하나를 선택하세요."
      : "후보를 찾지 못했습니다. 관심사를 더 구체적으로 입력해보세요.";
    if (!state.recommendedItems.length) state.manualSearchLinks = buildManualSearchLinks(interest);
  } catch (error) {
    state.searchStatus = `검색 실패: ${error.message} 아래 링크로 직접 후보를 확인할 수 있습니다.`;
    state.manualSearchLinks = buildManualSearchLinks(interest);
  }
  saveState();
  renderSession();
}

async function checkApiStatus() {
  if (state.currentSession !== 1) return;
  try {
    const response = await fetch("/api/status");
    if (!response.ok) return;
    const status = await response.json();
    if (!status.searchReady && !state.searchStatus) {
      state.searchStatus = "검색 API 키가 서버에 설정되어 있지 않습니다. 교사용 실행 스크립트에서 OPENAI_API_KEY를 설정해야 합니다.";
      renderSession();
    }
  } catch {
    if (!state.searchStatus) {
      state.searchStatus = "로컬 서버로 실행해야 검색 API를 사용할 수 있습니다. run_app.ps1로 실행하세요.";
      renderSession();
    }
  }
}

function selectRecommendedItem(index) {
  const card = state.recommendedItems[index];
  if (!card) return;
  state.data.industry = card.category;
  state.data.itemName = card.name;
  state.data.itemLine = card.description;
  state.data.itemDesc = card.description;
  state.data.selectedItemLink = card.url || buildSearchUrl(card.name, card.platform);
  state.data.competitor = `${card.category} / ${card.name}`;
  state.data.beforeTool = card.name;
  state.data.beforeValue = card.description;
  state.data.selectedPlatform = card.platform;
  state.data.selectedImageUrl = card.imageUrl || "";
  state.data.itemVerified = "";
  state.projectName = state.projectName || `${card.name} 고도화 프로젝트`;
  saveState();
  render();
}

function renderGeneratedCardPreview() {
  return `
    <section class="generated-card-block">
      <div>
        <strong>선택 아이템 카드 자동 생성</strong>
        <p>선택한 경쟁아이템을 수업용 카드 형태로 생성합니다. 상세페이지를 확인한 뒤 설명과 링크를 수정하면 카드에도 반영됩니다.</p>
      </div>
      <div class="generated-card" id="generatedCard">
        <div class="generated-card-top">
          <span>${escapeHtml(valueOf("industry") || "분야")}</span>
          <strong>${escapeHtml(valueOf("itemName") || "아이템명")}</strong>
        </div>
        <div class="generated-card-visual">
          ${valueOf("selectedImageUrl")
            ? `<img src="${imageProxyUrl(valueOf("selectedImageUrl"))}" alt="${escapeHtml(valueOf("itemName"))} 대표 이미지">`
            : escapeHtml((valueOf("itemName") || "ITEM").slice(0, 2).toUpperCase())}
        </div>
        <p>${escapeHtml(valueOf("itemLine") || valueOf("itemDesc") || "핵심 설명")}</p>
        <div class="generated-card-keyword">
          <span>검색 키워드</span>
          <strong>${escapeHtml(valueOf("itemName") || "")}</strong>
        </div>
        <small>${escapeHtml(valueOf("selectedItemLink") || "상세페이지 링크")}</small>
        <div class="verification-status ${valueOf("itemVerified") ? "verified" : ""}">
          ${valueOf("itemVerified") ? "상세페이지 확인 완료" : "상세페이지 확인 필요"}
        </div>
      </div>
      <div class="field-actions">
        <button class="button ghost" type="button" data-verify-item>상세페이지 확인 완료</button>
        <button class="button primary" type="button" data-download-generated-card>카드 이미지 다운로드</button>
      </div>
    </section>
  `;
}

function downloadGeneratedCard() {
  const canvas = document.createElement("canvas");
  canvas.width = 900;
  canvas.height = 1260;
  const ctx = canvas.getContext("2d");
  const category = valueOf("industry") || "분야";
  const name = valueOf("itemName") || "아이템명";
  const desc = valueOf("itemLine") || valueOf("itemDesc") || "핵심 설명";
  const link = valueOf("selectedItemLink") || "상세페이지 링크";

  ctx.fillStyle = "#f04438";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  roundRect(ctx, 72, 70, 756, 1120, 32, "#ffffff");
  drawGeneratedCardImage(ctx, name).then(() => {
    roundRect(ctx, 148, 530, 604, 92, 38, "#111111");
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 42px Malgun Gothic, Arial";
    ctx.textAlign = "center";
    ctx.fillText(`${category} : ${name}`, 450, 590);

    ctx.fillStyle = "#222222";
    ctx.font = "30px Malgun Gothic, Arial";
    wrapCanvasText(ctx, desc, 450, 705, 600, 42, "center");

    ctx.strokeStyle = "#222222";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(130, 845);
    ctx.lineTo(770, 845);
    ctx.stroke();

    ctx.fillStyle = "#146c63";
    ctx.font = "bold 30px Malgun Gothic, Arial";
    ctx.textAlign = "left";
    ctx.fillText("검색 키워드", 180, 925);
    ctx.strokeStyle = "#2dbb71";
    ctx.lineWidth = 6;
    ctx.strokeRect(180, 950, 540, 105);
    ctx.fillStyle = "#111111";
    ctx.font = "bold 34px Malgun Gothic, Arial";
    wrapCanvasText(ctx, name, 205, 996, 490, 42, "left");

    ctx.fillStyle = "#333333";
    ctx.font = "24px Malgun Gothic, Arial";
    wrapCanvasText(ctx, link, 180, 1110, 540, 32, "left");

    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `${name.replace(/[\\/:*?"<>|]/g, "_")}_아이템카드.png`;
    a.click();
  });
}

function drawGeneratedCardImage(ctx, name) {
  return new Promise((resolve) => {
    const imageUrl = valueOf("selectedImageUrl");
    ctx.fillStyle = "#eef3f5";
    ctx.fillRect(112, 110, 676, 380);

    if (!imageUrl) {
      drawImageFallback(ctx, name);
      resolve();
      return;
    }

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      drawCoverImage(ctx, image, 112, 110, 676, 380);
      resolve();
    };
    image.onerror = () => {
      drawImageFallback(ctx, name);
      resolve();
    };
    image.src = imageProxyUrl(imageUrl);
  });
}

function drawImageFallback(ctx, name) {
  ctx.fillStyle = "#146c63";
  ctx.font = "bold 112px Malgun Gothic, Arial";
  ctx.textAlign = "center";
  ctx.fillText(name.slice(0, 2).toUpperCase(), 450, 350);
}

function drawCoverImage(ctx, image, x, y, width, height) {
  const ratio = Math.max(width / image.width, height / image.height);
  const drawWidth = image.width * ratio;
  const drawHeight = image.height * ratio;
  const offsetX = x + (width - drawWidth) / 2;
  const offsetY = y + (height - drawHeight) / 2;
  ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}

function imageProxyUrl(url) {
  return `/api/image?url=${encodeURIComponent(url)}`;
}

function roundRect(ctx, x, y, width, height, radius, fillStyle) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
  ctx.fillStyle = fillStyle;
  ctx.fill();
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight, align = "left") {
  const words = String(text || "").split(/\s+/);
  let line = "";
  ctx.textAlign = align;
  words.forEach((word, index) => {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = word;
      y += lineHeight;
    } else {
      line = test;
    }
    if (index === words.length - 1) ctx.fillText(line, x, y);
  });
}

function renderField(item) {
  const required = item.required ? "필수" : "선택";
  const current = escapeHtml(valueOf(item.id));
  const control = item.type === "textarea"
    ? `<textarea class="field-textarea" data-field="${item.id}" placeholder="${escapeHtml(item.help)}">${current}</textarea>`
    : item.type === "select"
      ? renderSelect(item, current)
      : `<input class="field-control" data-field="${item.id}" type="text" value="${current}" placeholder="${escapeHtml(item.help)}">`;

  return `
    <article class="field-card">
      <div class="field-head">
        <div>
          <label class="field-label" for="${item.id}">${item.label} <span class="kicker">${required}</span></label>
          <p class="field-help">${item.help}</p>
        </div>
        <button class="mini-button" type="button" data-polish="${item.id}">문장 보조</button>
      </div>
      ${control}
    </article>
  `;
}

function renderSelect(item, current) {
  const options = [`<option value="">선택하세요</option>`].concat(
    item.options.map((option) => {
      const selected = option === current ? "selected" : "";
      return `<option value="${escapeHtml(option)}" ${selected}>${escapeHtml(option)}</option>`;
    })
  );
  return `<select class="field-control" data-field="${item.id}">${options.join("")}</select>`;
}

function renderSuggestions() {
  el.suggestionList.innerHTML = state.suggestions.map((card, index) => `
    <article class="suggestion-card">
      <strong>${card.title}</strong>
      <p>${card.body}</p>
      ${card.items ? `<ul>${card.items.map((item) => `<li>${item}</li>`).join("")}</ul>` : ""}
      <div class="suggestion-actions">
        ${card.target ? `<button class="mini-button" type="button" data-apply-suggestion="${index}">빈칸에 적용</button>` : ""}
      </div>
    </article>
  `).join("");
}

function buildDefaultSuggestions(session) {
  const project = state.projectName || valueOf("itemName") || "현재 아이템";
  const industry = valueOf("industry") || "선택한 산업";
  const target = valueOf("targetProfile") || valueOf("afterTarget") || "초기 타겟 고객";

  const map = {
    1: [
      {
        title: "경쟁아이템 선택 질문",
        body: "추천된 성공 아이템 중 하나를 고르기 전에 아래 질문에 답해보세요.",
        items: [`${industry} 분야에서 상세페이지가 설득하는 핵심 고객은 누구인가요?`, "이 아이템의 기능 중 가장 발전시킬 만한 부분은 무엇인가요?", "상세페이지에서 고객 불편이나 후기 근거를 찾을 수 있나요?"]
      },
      {
        title: "상세페이지 분석 틀",
        body: "와디즈나 텀블벅 등 한국 크라우드펀딩 상세페이지를 볼 때 이 순서로 읽어보세요.",
        items: ["문제를 겪는 고객", "제품이 약속하는 핵심 가치", "대표 기능과 사용 장면", "가격/리워드 구성", "내가 발전시킬 아쉬운 점"]
      }
    ],
    2: [
      {
        title: "검색 키워드 제안",
        body: "기회요인과 위협요인은 서로 다른 키워드로 찾아야 균형이 생깁니다.",
        items: [`${project} 시장 성장`, `${industry} 소비자 불편`, `${project} 부작용`, `${project} 기존 제품 문제`]
      },
      {
        title: "기사 요약 틀",
        body: "기사 요약은 사실과 내 해석을 분리하면 좋습니다.",
        items: ["기사의 핵심 사실 1문장", "시장이나 고객 행동의 변화 1문장", "내 아이템에 주는 시사점 1문장"]
      }
    ],
    3: [
      {
        title: "경쟁제품 분석 관점",
        body: "경쟁제품을 공격하기보다 고객이 왜 아직 불편한지 찾는 방식으로 분석합니다.",
        items: ["제품이 약속한 가치", "사용자가 실제로 느끼는 불편", "돈을 내기 망설이는 이유", "내 아이템이 반드시 보완할 지점"]
      }
    ],
    4: [
      {
        title: "TAM/SAM/SOM 점검",
        body: "시장 규모는 넓게 시작해 실제 첫 고객으로 좁혀갑니다.",
        items: ["TAM: 전체 문제를 가진 사람", "SAM: 내 채널과 제품으로 접근 가능한 사람", "SOM: 초기 구매 가능성이 높은 사람"]
      }
    ],
    5: [
      {
        title: "고도화 방향",
        body: "변환 키워드는 멋있어 보이는 말이 아니라 고객 가치가 실제로 커지는 방향이어야 합니다.",
        items: ["불편을 줄이는가", "사용 빈도를 늘리는가", "신뢰를 높이는가", "구매 이유가 선명해지는가"]
      }
    ],
    6: [
      {
        title: "설문 문항 구성",
        body: "워크시트 예시처럼 조건 확인, 인지도, 선택 기준, 사용 의향, 희망 가격, 자유 의견을 포함하세요.",
        target: "surveyQuestions",
        text: "1. 귀하는 목표 고객 조건에 해당하십니까?\n2. 유사 제품을 알고 있거나 사용해본 적이 있습니까?\n3. 제품 선택 시 가장 중요한 기준은 무엇입니까?\n4. 이 제품이 출시된다면 사용할 의향이 있습니까?\n5. 적정 가격은 어느 정도라고 생각하십니까?\n6. 추가 의견을 자유롭게 적어주세요."
      }
    ],
    7: [
      {
        title: "스토리 흐름",
        body: "고객 Needs에서 시작해 기존 해결책의 한계를 보여준 뒤, 자사 해결책과 핵심 기능으로 이어가세요.",
        items: ["고객 문제", "기존 방식", "기존 방식의 한계", "자사 해결책", "핵심 기능", "기대효과"]
      }
    ],
    8: [
      {
        title: "발표 피치 구조",
        body: "1분 발표는 짧지만 순서가 중요합니다.",
        target: "pitch",
        text: `${project}는 ${target}이 겪는 문제를 해결하기 위한 창업 아이템입니다. 기존 해결책은 한계가 있었지만, 우리는 핵심 기능과 차별화된 고객 경험을 통해 더 명확한 가치를 제공합니다. 초기에는 검증된 타겟 고객을 중심으로 시장에 진입하고, 수익모델을 확장해 지속 가능한 사업으로 성장시키겠습니다.`
      }
    ]
  };
  return map[session.id] || [];
}

function runAssistantTool(tool) {
  const session = currentSession();
  const missing = session.fields.filter((item) => item.required && !valueOf(item.id).trim());
  const filled = session.fields.filter((item) => valueOf(item.id).trim());
  const cards = {
    questions: {
      title: "생각을 여는 질문",
      body: "지금 작성한 내용을 바탕으로 다음 질문에 답해보세요.",
      items: [
        "이 내용은 고객 입장에서 이해하기 쉬운가요?",
        "근거와 의견이 구분되어 있나요?",
        "경쟁제품보다 나아지는 지점이 한 문장으로 보이나요?"
      ]
    },
    evidence: {
      title: "근거 점검 결과",
      body: missing.length ? "아직 근거를 판단하기 어려운 빈칸이 있습니다." : "필수 항목은 채워졌습니다. 이제 수치, 기사, 고객 의견 같은 외부 근거를 더하면 설득력이 좋아집니다.",
      items: missing.length ? missing.slice(0, 5).map((item) => `${item.label} 작성 필요`) : ["기사 제목 또는 출처", "시장 규모 산정 기준", "잠재고객 의견", "경쟁제품 리뷰 근거"]
    },
    polish: {
      title: "표현 다듬기 방향",
      body: filled.length ? "작성된 문장을 다듬을 때는 추상어를 줄이고 고객, 상황, 기능을 구체화하세요." : "먼저 한두 문장을 작성한 뒤 다듬기를 하면 더 좋습니다.",
      items: ["좋다 → 어떤 점이 좋은지", "편리하다 → 어떤 행동이 줄어드는지", "차별화된다 → 기존 제품과 무엇이 다른지"]
    },
    next: {
      title: "다음 단계 체크",
      body: missing.length ? "다음 차시로 넘어가기 전에 필수 항목을 먼저 채우세요." : `${session.id}차시는 다음 차시로 넘어갈 준비가 되었습니다.`,
      items: missing.length ? missing.map((item) => item.label) : ["차시 완료 버튼 클릭", "다음 차시에서 이전 답변을 근거로 사용", "최종 결과물 미리보기 확인"]
    }
  };
  state.suggestions = [cards[tool]].concat(buildDefaultSuggestions(session));
  renderSuggestions();
}

async function polishField(fieldId) {
  const item = sessions.flatMap((session) => session.fields).find((fieldItem) => fieldItem.id === fieldId);
  const current = valueOf(fieldId).trim();
  const title = item ? item.label : "선택 항목";
  state.suggestions = [{
    title: `${title} 문장 보조`,
    body: "작성 내용을 바탕으로 조언을 만들고 있습니다.",
    items: ["잠시만 기다려 주세요."]
  }].concat(buildDefaultSuggestions(currentSession()));
  renderSuggestions();

  try {
    const response = await fetch("/api/assist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        label: title,
        value: current,
        sessionTitle: currentSession().title
      })
    });
    const advice = await response.json();
    if (!response.ok) throw new Error(advice.error || "AI 조언 요청에 실패했습니다.");
    state.suggestions = [{
      title: advice.title || `${title} 문장 보조`,
      body: advice.body || "아래 기준으로 문장을 다듬어 보세요.",
      items: Array.isArray(advice.items) ? advice.items : []
    }].concat(buildDefaultSuggestions(currentSession()));
    renderSuggestions();
    return;
  } catch {
    // API 키가 없거나 네트워크가 막힌 수업 환경에서도 기본 조언은 제공한다.
  }

  state.suggestions = [{
    title: `${title} 문장 보조`,
    body: current ? "현재 문장을 더 구체화할 때 아래 기준을 적용해보세요." : "빈칸에 바로 쓸 수 있는 문장 틀입니다.",
    items: current
      ? [`현재 문장: ${current}`, "누구의 문제인지 추가하기", "어떤 상황에서 쓰는지 추가하기", "측정 가능한 효과나 기준 넣기"]
      : [`${title}에는 고객, 문제, 해결 방법, 기대 효과 중 최소 2개를 포함해 작성하세요.`]
  }].concat(buildDefaultSuggestions(currentSession()));
  renderSuggestions();
}

function applySuggestion(index) {
  const suggestion = state.suggestions[index];
  if (!suggestion || !suggestion.target) return;
  const current = valueOf(suggestion.target);
  if (current && !confirm("이미 작성한 내용이 있습니다. AI 제안으로 바꿀까요?")) return;
  setValue(suggestion.target, suggestion.text);
  renderSession();
}

function completeCurrentSession() {
  const session = currentSession();
  const missing = session.fields.filter((item) => item.required && !valueOf(item.id).trim());
  if (missing.length) {
    state.suggestions = [{
      title: "완료 전 확인",
      body: "아래 필수 항목을 채우면 차시 완료 처리가 가능합니다.",
      items: missing.map((item) => item.label)
    }].concat(buildDefaultSuggestions(session));
    renderSuggestions();
    return;
  }

  if (session.id === 1 && valueOf("itemName") && !valueOf("itemVerified")) {
    state.suggestions = [{
      title: "상세페이지 확인 필요",
      body: "AI 추천 후보는 참고 자료입니다. 상세페이지를 직접 열어 제품이 실제로 분석 대상에 맞는지 확인한 뒤 완료 처리하세요.",
      items: ["상세페이지 열기", "제품명과 설명 확인", "상세페이지 확인 완료 버튼 클릭"]
    }].concat(buildDefaultSuggestions(session));
    renderSuggestions();
    return;
  }

  if (!state.completed.includes(session.id)) {
    state.completed.push(session.id);
  }
  if (session.id < sessions.length) {
    state.currentSession = session.id + 1;
  }
  saveState();
  render();
}

function updateProgress() {
  const completedCount = sessions.filter((session) => {
    return state.completed.includes(session.id) || session.fields.every((item) => !item.required || valueOf(item.id).trim());
  }).length;
  const percent = Math.round((completedCount / sessions.length) * 100);
  el.progressText.textContent = `${completedCount}/8 완료`;
  el.progressPercent.textContent = `${percent}%`;
  el.progressFill.style.width = `${percent}%`;
}

function openPreview() {
  renderPreview();
  if (typeof el.previewDialog.showModal === "function") {
    el.previewDialog.showModal();
  } else {
    el.previewDialog.setAttribute("open", "open");
  }
}

function renderPreview() {
  const name = state.projectName || valueOf("itemName") || "미정 프로젝트";
  el.onePageSummary.innerHTML = `
    <article class="preview-card">
      <h3>${escapeHtml(name)}</h3>
      <p>${escapeHtml(valueOf("upgradedLine") || valueOf("itemLine") || "아이템 한 줄 정의가 아직 작성되지 않았습니다.")}</p>
    </article>
    <article class="preview-card">
      <h3>출발점이 된 경쟁아이템</h3>
      <p>${escapeHtml(valueOf("itemName") || "선택한 경쟁아이템이 아직 없습니다.")}</p>
      <p>${escapeHtml(valueOf("selectedItemLink") || "상세페이지 링크가 아직 없습니다.")}</p>
    </article>
    <article class="preview-card">
      <h3>타겟 고객</h3>
      <p>${escapeHtml(valueOf("targetProfile") || valueOf("afterTarget") || "타겟 고객이 아직 작성되지 않았습니다.")}</p>
    </article>
    <article class="preview-card">
      <h3>문제와 해결책</h3>
      <p>${escapeHtml(valueOf("customerNeeds") || valueOf("competitorProblem") || "고객 문제가 아직 작성되지 않았습니다.")}</p>
      <p>${escapeHtml(valueOf("ourSolution") || valueOf("afterFunction") || "해결책이 아직 작성되지 않았습니다.")}</p>
    </article>
    <article class="preview-card">
      <h3>수익모델</h3>
      <p>${escapeHtml(valueOf("revenueModel") || "수익모델이 아직 작성되지 않았습니다.")}</p>
    </article>
  `;

  const slides = [
    ["경쟁아이템 선택", `${valueOf("itemName") || "작성 필요"} / ${valueOf("selectionReason") || "선정 이유 작성 필요"}`],
    ["상세페이지 분석", valueOf("itemDesc") || valueOf("selectedItemLink")],
    ["창업 배경", valueOf("oppInsight") || valueOf("oppSummary")],
    ["위협요인과 대응", valueOf("threatInsight") || valueOf("threatSummary")],
    ["경쟁제품 분석", valueOf("competitorLack") || valueOf("swot")],
    ["목표고객", valueOf("targetProfile") || valueOf("targetReason")],
    ["아이디어 고도화", valueOf("upgradedLine") || valueOf("diffPoint")],
    ["수요조사 시사점", valueOf("surveyInsight") || valueOf("customerVoices")],
    ["핵심 기능", [valueOf("feature1"), valueOf("feature2"), valueOf("feature3")].filter(Boolean).join(", ")],
    ["비즈니스 모델", valueOf("businessModel") || valueOf("revenueModel")],
    ["1분 피치", valueOf("pitch")]
  ];

  el.slideDeck.innerHTML = slides.map((slide, index) => `
    <article class="slide-card">
      <span class="slide-number">${index + 1}</span>
      <div>
        <h4>${escapeHtml(slide[0])}</h4>
        <p>${escapeHtml(slide[1] || "작성 필요")}</p>
      </div>
    </article>
  `).join("");
}

function downloadReport() {
  const report = buildReportText();
  const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const fileName = (state.projectName || valueOf("itemName") || "startup-plan").replace(/[\\/:*?"<>|]/g, "_");
  link.href = url;
  link.download = `${fileName}_사업계획서.txt`;
  link.click();
  URL.revokeObjectURL(url);
}

function exportJson() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "ai-data-startup-lab-project.json";
  link.click();
  URL.revokeObjectURL(url);
}

function importJsonFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || ""));
      applyImportedState(parsed);
      saveState();
      render();
      alert("프로젝트 JSON을 불러왔습니다.");
    } catch (error) {
      alert(error.message || "프로젝트 JSON을 불러오지 못했습니다.");
    }
  };
  reader.onerror = () => alert("파일을 읽지 못했습니다.");
  reader.readAsText(file, "utf-8");
}

function buildReportText() {
  const lines = [];
  lines.push(`사업계획서 요약`);
  lines.push(`프로젝트명: ${state.projectName || valueOf("itemName") || "미정"}`);
  lines.push("");
  sessions.forEach((session) => {
    lines.push(`${session.id}. ${session.title}`);
    session.fields.forEach((item) => {
      lines.push(`- ${item.label}: ${valueOf(item.id) || "미작성"}`);
    });
    if (session.id === 1) {
      lines.push(`- 상세페이지 확인 상태: ${valueOf("itemVerified") ? "확인 완료" : "미확인"}`);
    }
    lines.push("");
  });
  return lines.join("\n");
}

function resetAll() {
  if (!confirm("현재 작성한 내용을 모두 지울까요?")) return;
  localStorage.removeItem(STORAGE_KEY);
  state.currentSession = 1;
  state.completed = [];
  state.projectName = "";
  state.data = {};
  state.suggestions = [];
  render();
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.addEventListener("input", (event) => {
  const fieldId = event.target.dataset.field;
  if (fieldId) setValue(fieldId, event.target.value);

});

document.addEventListener("change", (event) => {
  const fieldId = event.target.dataset.field;
  if (fieldId) setValue(fieldId, event.target.value);
});

document.addEventListener("click", (event) => {
  const sessionId = event.target.closest("[data-session]")?.dataset.session;
  if (sessionId) {
    state.currentSession = Number(sessionId);
    saveState();
    render();
  }

  const tool = event.target.closest("[data-tool]")?.dataset.tool;
  if (tool) runAssistantTool(tool);

  if (event.target.closest("[data-search-recommendations]")) {
    searchRecommendations();
  }

  const selectedItemIndex = event.target.closest("[data-select-item]")?.dataset.selectItem;
  if (selectedItemIndex !== undefined) {
    selectRecommendedItem(Number(selectedItemIndex));
  }

  const selectedKeyword = event.target.closest("[data-select-keyword]")?.dataset.selectKeyword;
  if (selectedKeyword) {
    setValue("conversionKeyword", selectedKeyword);
    renderSession();
  }

  if (event.target.closest("[data-download-generated-card]")) {
    downloadGeneratedCard();
  }

  if (event.target.closest("[data-verify-item]")) {
    setValue("itemVerified", new Date().toISOString());
    renderSession();
  }

  const fieldId = event.target.closest("[data-polish]")?.dataset.polish;
  if (fieldId) polishField(fieldId);

  const suggestionIndex = event.target.closest("[data-apply-suggestion]")?.dataset.applySuggestion;
  if (suggestionIndex !== undefined) applySuggestion(Number(suggestionIndex));
});

el.projectName.addEventListener("input", () => {
  state.projectName = el.projectName.value;
  saveState();
});

el.completeBtn.addEventListener("click", completeCurrentSession);
el.previewBtn.addEventListener("click", openPreview);
document.getElementById("closePreviewBtn").addEventListener("click", () => {
  if (typeof el.previewDialog.close === "function") {
    el.previewDialog.close();
  } else {
    el.previewDialog.removeAttribute("open");
  }
});
document.getElementById("downloadReportBtn").addEventListener("click", downloadReport);
document.getElementById("printReportBtn").addEventListener("click", () => window.print());
document.getElementById("exportBtn").addEventListener("click", exportJson);
document.getElementById("importBtn").addEventListener("click", () => document.getElementById("importFile").click());
document.getElementById("importFile").addEventListener("change", (event) => {
  importJsonFile(event.target.files?.[0]);
  event.target.value = "";
});
document.getElementById("resetBtn").addEventListener("click", resetAll);

loadState();
render();
