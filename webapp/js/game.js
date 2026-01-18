// ============================================
// 게임 상태
// ============================================
let gameState = {
    character: null,
    affection: 50,        // 호감도 (0-100)
    trust: 30,            // 신뢰도 (0-100)
    money: 1000000,       // 돈 (초기 100만원)
    stamina: 100,         // 체력 (0-100)
    day: 1,               // 현재 날짜 (1-30)
    dDay: 30,             // D-Day (30일 후 프로포즈)
    startDate: null,      // 시작 날짜 (Date 객체)
    biorhythm: 'normal',  // 바이오리듬: normal, period
    biorhythmDays: 0,     // 바이오리듬 남은 일수
    lastInteraction: 0,   // 마지막 상호작용 날짜
    workCount: 0,         // 오늘 알바 횟수
    hasProposalRing: false, // 다이아 반지 보유 여부
    history: [],          // 히스토리 (그래프용)
    dailyActivities: {},  // 일별 활동 기록 { day: [activities] }
    isGameOver: false
};

// pending timeouts를 추적하기 위한 변수
let pendingTimeouts = [];

// ============================================
// 유틸리티 함수
// ============================================
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function showModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function formatMoney(amount) {
    return amount.toLocaleString() + '원';
}

// ============================================
// 게임 초기화
// ============================================
function showCharacterSelect() {
    showScreen('character-select-screen');
}

function showRules() {
    showModal('rules-modal');
}

function closeRules() {
    closeModal('rules-modal');
}

function selectCharacter(characterId) {
    const character = CHARACTERS[characterId];

    // 모든 pending timeout 클리어
    clearAllTimeouts();

    // 게임 상태 완전 초기화
    gameState = {
        character: character,
        affection: character.startAffection,
        trust: character.startTrust,
        money: 1000000,
        stamina: 100,
        day: 1,
        dDay: 30,
        startDate: new Date(),
        biorhythm: 'normal',
        biorhythmDays: 0,
        lastInteraction: 1,
        workCount: 0,
        hasProposalRing: false,
        history: [],
        dailyActivities: {},
        isGameOver: false
    };

    // 첫 히스토리 기록
    addHistory();

    // 게임 화면 초기화
    initGameScreen();
    showScreen('game-screen');

    // UI 초기화
    const dialogueText = document.getElementById('dialogue-text');
    dialogueText.textContent = '무엇을 할까요?';
    dialogueText.style.color = '';
    dialogueText.style.fontWeight = '';

    updateAllUI();

    // 첫 만남 시나리오 표시
    const timeoutId = setTimeout(() => {
        console.log('첫 만남 시나리오 표시 시도:', characterId);
        showFirstMeetingScenario(characterId);
    }, 500);
    pendingTimeouts.push(timeoutId);
}

function showFirstMeetingScenario(characterId) {
    console.log('showFirstMeetingScenario 호출됨:', characterId);

    const scenario = FIRST_MEETING_SCENARIOS[characterId];
    if (!scenario) {
        console.error('첫 만남 시나리오를 찾을 수 없습니다:', characterId);
        return;
    }

    console.log('시나리오 찾음:', scenario);

    const modal = createActionModal('💝 첫 만남', scenario.situation);
    const content = modal.querySelector('.modal-body');
    content.innerHTML = '';

    scenario.choices.forEach((choice, index) => {
        const choiceBtn = document.createElement('button');
        choiceBtn.className = 'choice-option-btn';

        choiceBtn.innerHTML = `
            <span class="choice-number">${index + 1}.</span>
            <span class="choice-text">${choice.text}</span>
        `;

        const choiceData = choice;
        choiceBtn.onclick = function() {
            console.log('첫 만남 선택:', choiceData.text);
            handleFirstMeetingChoice(choiceData);
        };

        content.appendChild(choiceBtn);
    });

    showModal('action-modal');
    console.log('첫 만남 모달 표시됨');
}

function handleFirstMeetingChoice(choice) {
    let affectionChange = choice.affection || 0;
    let trustChange = choice.trust || 0;

    gameState.affection += affectionChange;
    gameState.trust += trustChange;

    closeModal('action-modal');

    let message = `첫 만남이 인상적이었습니다!\n\n"${gameState.character.fullName}과(와)의 관계가 시작되었습니다."`;

    // 모달을 닫은 후 약간의 딜레이를 주고 결과 표시
    setTimeout(() => {
        showResult(message, affectionChange, trustChange);

        // 히스토리 업데이트
        addHistory();
        updateAllUI();
    }, 100);
}

function initGameScreen() {
    document.getElementById('char-name-display').textContent = gameState.character.fullName;
    updateCharacterMood();
    createActionButtons();
}

// ============================================
// UI 업데이트
// ============================================
function updateAllUI() {
    updateDDay();
    updateResources();
    updateCharacterMood();
    updateActionButtons();
    updateMiniCalendar();
}

function updateDDay() {
    document.getElementById('day-number').textContent = gameState.day;
    document.querySelector('.day-total').textContent = ` / 30`;

    // D-Day 표시
    const dDayText = `D-${gameState.dDay}`;
    document.getElementById('day-number').setAttribute('data-dday', dDayText);
}

function updateResources() {
    // 호감도
    gameState.affection = Math.max(0, Math.min(100, gameState.affection));
    document.getElementById('affection-percentage').textContent = Math.round(gameState.affection) + '%';
    document.getElementById('affection-fill').style.width = gameState.affection + '%';

    // 신뢰도 (새로 추가)
    gameState.trust = Math.max(0, Math.min(100, gameState.trust));
    if (document.getElementById('trust-percentage')) {
        document.getElementById('trust-percentage').textContent = Math.round(gameState.trust) + '%';
        document.getElementById('trust-fill').style.width = gameState.trust + '%';
    }

    // 돈
    document.getElementById('money-value').textContent = formatMoney(gameState.money);
    const moneyPercent = Math.min(100, (gameState.money / 10000000) * 100); // 1000만원 기준
    document.getElementById('money-fill').style.width = moneyPercent + '%';

    // 체력
    gameState.stamina = Math.max(0, Math.min(100, gameState.stamina));
    document.getElementById('stamina-value').textContent = gameState.stamina;
    document.getElementById('stamina-fill').style.width = gameState.stamina + '%';

    // 관계 상태
    updateRelationshipStatus();
}

function updateRelationshipStatus() {
    const combinedScore = (gameState.affection * 0.6) + (gameState.trust * 0.4);
    let status = '';

    if (combinedScore >= 80) status = '💕 프로포즈 준비 완료';
    else if (combinedScore >= 60) status = '💖 사랑하는 사이';
    else if (combinedScore >= 40) status = '💗 좋아하는 사이';
    else if (combinedScore >= 20) status = '💙 알아가는 중';
    else status = '💔 위기 상황';

    document.getElementById('relationship-status').textContent = status;
}

function updateCharacterMood() {
    const portraitImage = document.getElementById('portrait-image');
    const baseImage = gameState.character.image.replace('-normal.jpg', '');

    let moodSuffix = '-normal';
    if (gameState.affection >= 70) {
        moodSuffix = '-happy';
    } else if (gameState.affection < 35) {
        moodSuffix = '-unhappy';
    }

    portraitImage.src = baseImage + moodSuffix + '.jpg';
    portraitImage.onerror = function() {
        this.src = gameState.character.image;
        this.onerror = null;
    };
}

// ============================================
// 액션 버튼 시스템 - 완전 재설계
// ============================================
function createActionButtons() {
    const choicesArea = document.getElementById('choices-area');
    if (!choicesArea) {
        console.error('choices-area를 찾을 수 없습니다');
        return;
    }

    choicesArea.innerHTML = `
        <button class="action-choice-btn" id="action-date" onclick="window.handleActionClick('date')">
            <div class="action-icon">💑</div>
            <div class="action-info">
                <div class="action-name">데이트하기</div>
            </div>
        </button>
        <button class="action-choice-btn" id="action-gift" onclick="window.handleActionClick('gift')">
            <div class="action-icon">🎁</div>
            <div class="action-info">
                <div class="action-name">선물하기</div>
            </div>
        </button>
        <button class="action-choice-btn" id="action-talk" onclick="window.handleActionClick('talk')">
            <div class="action-icon">💬</div>
            <div class="action-info">
                <div class="action-name">대화하기</div>
            </div>
        </button>
        <button class="action-choice-btn" id="action-work" onclick="window.handleActionClick('work')">
            <div class="action-icon">💼</div>
            <div class="action-info">
                <div class="action-name">알바하기</div>
            </div>
        </button>
        <button class="action-choice-btn" id="action-rest" onclick="window.handleActionClick('rest')">
            <div class="action-icon">😴</div>
            <div class="action-info">
                <div class="action-name">휴식하기</div>
            </div>
        </button>
        <button class="action-choice-btn" id="action-propose" onclick="window.handleActionClick('propose')">
            <div class="action-icon">💍</div>
            <div class="action-info">
                <div class="action-name">프로포즈</div>
            </div>
        </button>
    `;

    updateActionButtons();
}

// 전역 액션 핸들러
window.handleActionClick = function(action) {
    console.log('액션 클릭됨:', action);

    const button = document.getElementById(`action-${action}`);
    if (button && (button.disabled || button.classList.contains('disabled'))) {
        console.log('버튼이 비활성화됨:', action);
        return;
    }

    switch(action) {
        case 'date':
            showDateMenu();
            break;
        case 'gift':
            showGiftMenu();
            break;
        case 'talk':
            showTalkMenu();
            break;
        case 'work':
            doWork();
            break;
        case 'rest':
            doRest();
            break;
        case 'propose':
            attemptProposal();
            break;
        default:
            console.error('알 수 없는 액션:', action);
    }
};

function updateActionButtons() {
    // 모든 기본 액션 버튼은 활성화 (date, gift, talk, rest)
    const alwaysEnabledButtons = ['date', 'gift', 'talk', 'rest'];
    alwaysEnabledButtons.forEach(id => {
        const btn = document.getElementById(`action-${id}`);
        if (btn) {
            btn.classList.remove('disabled');
            btn.disabled = false;
        }
    });

    // 프로포즈 버튼은 반지가 있거나 일정 조건 충족 시에만 활성화
    const proposeBtn = document.getElementById('action-propose');
    if (proposeBtn) {
        const canPropose = gameState.hasProposalRing ||
                          (gameState.affection >= 60 && gameState.trust >= 60);
        if (!canPropose) {
            proposeBtn.classList.add('disabled');
            proposeBtn.disabled = true;
        } else {
            proposeBtn.classList.remove('disabled');
            proposeBtn.disabled = false;
        }
    }

    // 알바는 하루 2회 제한
    const workBtn = document.getElementById('action-work');
    if (workBtn) {
        if (gameState.workCount >= 2) {
            workBtn.classList.add('disabled');
            workBtn.disabled = true;
        } else {
            workBtn.classList.remove('disabled');
            workBtn.disabled = false;
        }
    }
}

// ============================================
// 데이트 시스템
// ============================================
function showDateMenu() {
    console.log('showDateMenu 호출됨');

    const modal = createActionModal('데이트 장소 선택', '어디로 데이트를 갈까요?');
    const content = modal.querySelector('.modal-body');
    content.innerHTML = '';

    Object.values(DATE_LOCATIONS).forEach(location => {
        const option = document.createElement('div');
        option.className = 'action-option';
        option.style.cursor = 'pointer';

        const canAfford = gameState.money >= location.cost && gameState.stamina >= location.stamina;
        if (!canAfford) option.classList.add('disabled');

        option.innerHTML = `
            <div class="option-icon">${location.icon}</div>
            <div class="option-info">
                <div class="option-name">${location.name}</div>
                <div class="option-desc">${location.description}</div>
                <div class="option-cost">
                    ${location.cost > 0 ? '💰 ' + formatMoney(location.cost) : '무료'}
                    ⚡ ${location.stamina}
                </div>
            </div>
        `;

        const locationId = location.id;
        option.onclick = function() {
            if (!this.classList.contains('disabled')) {
                console.log('데이트 장소 선택:', locationId);
                selectDateLocation(locationId);
            }
        };

        content.appendChild(option);
    });

    showModal('action-modal');
    console.log('데이트 메뉴 표시됨');
}

function selectDateLocation(locationId) {
    const location = DATE_LOCATIONS[locationId];

    // 비용 체크
    if (gameState.money < location.cost || gameState.stamina < location.stamina) {
        alert('자원이 부족합니다!');
        return;
    }

    // 비용 소모
    gameState.money -= location.cost;
    gameState.stamina -= location.stamina;

    // 랜덤 시나리오 선택
    const scenario = location.scenarios[Math.floor(Math.random() * location.scenarios.length)];

    closeModal('action-modal');
    showScenario(scenario, location, 'date');
}

// ============================================
// 선물 시스템
// ============================================
function showGiftMenu() {
    console.log('showGiftMenu 호출됨');

    const modal = createActionModal('선물 선택', '무엇을 선물할까요?');
    const content = modal.querySelector('.modal-body');
    content.innerHTML = '';

    Object.values(GIFT_ITEMS).forEach(gift => {
        const option = document.createElement('div');
        option.className = 'action-option';
        option.style.cursor = 'pointer';

        const canAfford = gameState.money >= gift.cost && gameState.stamina >= gift.stamina;
        if (!canAfford) option.classList.add('disabled');

        option.innerHTML = `
            <div class="option-icon">${gift.icon}</div>
            <div class="option-info">
                <div class="option-name">${gift.name}</div>
                <div class="option-desc">${gift.description}</div>
                <div class="option-cost">💰 ${formatMoney(gift.cost)}</div>
            </div>
        `;

        const giftId = gift.id;
        option.onclick = function() {
            if (!this.classList.contains('disabled')) {
                console.log('선물 선택:', giftId);
                giveGift(giftId);
            }
        };

        content.appendChild(option);
    });

    showModal('action-modal');
    console.log('선물 메뉴 표시됨');
}

function giveGift(giftId) {
    const gift = GIFT_ITEMS[giftId];

    if (gameState.money < gift.cost) {
        alert('돈이 부족합니다!');
        return;
    }

    gameState.money -= gift.cost;
    gameState.stamina -= gift.stamina;

    // 캐릭터 선호도 반영
    const preference = gameState.character.preferences.gifts[giftId] || 1.0;
    const affectionGain = Math.round(gift.baseAffection * preference * getBiorhythmMultiplier());
    const trustGain = Math.round(gift.baseTrust * preference * getBiorhythmMultiplier());

    gameState.affection += affectionGain;
    gameState.trust += trustGain;
    gameState.lastInteraction = gameState.day;

    // 다이아 반지는 특별 처리
    if (giftId === 'ring') {
        gameState.hasProposalRing = true;
    }

    // 활동 기록
    recordActivity('gift', '🎁');

    closeModal('action-modal');
    showResult(`${gift.name}을(를) 선물했습니다!`, affectionGain, trustGain);

    checkDayEnd();
}

// ============================================
// 대화 시스템
// ============================================
function showTalkMenu() {
    console.log('showTalkMenu 호출됨');

    const modal = createActionModal('대화 주제 선택', '무엇에 대해 이야기할까요?');
    const content = modal.querySelector('.modal-body');
    content.innerHTML = '';

    Object.values(TALK_TOPICS).forEach(topic => {
        const option = document.createElement('div');
        option.className = 'action-option';
        option.style.cursor = 'pointer';

        const canTalk = gameState.stamina >= topic.stamina;
        const meetsRequirement = !topic.minAffection || gameState.affection >= topic.minAffection;

        if (!canTalk || !meetsRequirement) option.classList.add('disabled');

        option.innerHTML = `
            <div class="option-icon">${topic.icon}</div>
            <div class="option-info">
                <div class="option-name">${topic.name}</div>
                <div class="option-desc">${topic.description}</div>
                <div class="option-cost">⚡ ${topic.stamina}</div>
                ${topic.minAffection ? `<div class="option-requirement">호감도 ${topic.minAffection} 필요</div>` : ''}
            </div>
        `;

        const topicId = topic.id;
        option.onclick = function() {
            if (!this.classList.contains('disabled')) {
                console.log('대화 주제 선택:', topicId);
                selectTalkTopic(topicId);
            }
        };

        content.appendChild(option);
    });

    showModal('action-modal');
    console.log('대화 메뉴 표시됨');
}

function selectTalkTopic(topicId) {
    const topic = TALK_TOPICS[topicId];

    if (gameState.stamina < topic.stamina) {
        alert('체력이 부족합니다!');
        return;
    }

    gameState.stamina -= topic.stamina;

    // 랜덤 시나리오 선택
    const scenario = topic.scenarios[Math.floor(Math.random() * topic.scenarios.length)];

    closeModal('action-modal');
    showScenario(scenario, topic, 'talk');
}

// ============================================
// 시나리오 시스템 (핵심)
// ============================================
function showScenario(scenario, sourceData, actionType) {
    const modal = createActionModal('', scenario.situation);
    const content = modal.querySelector('.modal-body');
    content.innerHTML = '';

    scenario.choices.forEach((choice, index) => {
        const choiceBtn = document.createElement('button');
        choiceBtn.className = 'choice-option-btn';

        choiceBtn.innerHTML = `
            <span class="choice-number">${index + 1}.</span>
            <span class="choice-text">${choice.text}</span>
        `;

        const choiceData = choice;
        choiceBtn.onclick = function() {
            console.log('시나리오 선택:', choiceData.text);
            selectChoice(choiceData, sourceData, actionType);
        };

        content.appendChild(choiceBtn);
    });

    showModal('action-modal');
}

function selectChoice(choice, sourceData, actionType) {
    // 기본 점수
    let affectionGain = choice.affection || 0;
    let trustGain = choice.trust || 0;

    // 소스 데이터의 기본 점수 추가
    if (actionType === 'date') {
        affectionGain += sourceData.baseAffection;
        trustGain += sourceData.baseTrust;
    } else if (actionType === 'talk') {
        affectionGain += sourceData.baseAffection;
        trustGain += sourceData.baseTrust;
    }

    // 캐릭터 선호도 반영
    const preference = getPreferenceMultiplier(sourceData.id, actionType);
    affectionGain = Math.round(affectionGain * preference);
    trustGain = Math.round(trustGain * preference);

    // 바이오리듬 반영
    const bioMultiplier = getBiorhythmMultiplier();
    affectionGain = Math.round(affectionGain * bioMultiplier);
    trustGain = Math.round(trustGain * bioMultiplier);

    // 확률 체크 (유머 등)
    if (choice.successRate !== undefined) {
        if (Math.random() > choice.successRate) {
            affectionGain = Math.round(affectionGain * 0.3);
            trustGain = Math.round(trustGain * 0.3);
        }
    }

    // 점수 적용
    gameState.affection += affectionGain;
    gameState.trust += trustGain;
    gameState.lastInteraction = gameState.day;

    // 활동 기록
    if (actionType === 'date') {
        recordActivity('date', '💑');
    } else if (actionType === 'talk') {
        recordActivity('talk', '💬');
    }

    closeModal('action-modal');
    showResult(choice.text, affectionGain, trustGain);

    checkDayEnd();
}

function getPreferenceMultiplier(itemId, actionType) {
    if (!gameState.character.preferences) return 1.0;

    if (actionType === 'date') {
        return gameState.character.preferences.dates[itemId] || 1.0;
    } else if (actionType === 'talk') {
        return gameState.character.preferences.talks[itemId] || 1.0;
    }

    return 1.0;
}

function getBiorhythmMultiplier() {
    if (gameState.biorhythm === 'period') {
        return 0.5; // 주기 중에는 효과 50% 감소, 패널티 200% 증가
    }
    return 1.0;
}

// ============================================
// 알바 & 휴식
// ============================================
function doWork() {
    if (gameState.workCount >= 2) {
        alert('오늘은 더 이상 알바를 할 수 없습니다!');
        return;
    }

    if (gameState.stamina < 40) {
        alert('체력이 부족합니다!');
        return;
    }

    gameState.stamina -= 40;
    gameState.money += 100000;
    gameState.workCount++;

    // 활동 기록
    recordActivity('work', '💼');

    showResult('알바를 마쳤습니다!', 0, 0, '+100,000원');
    updateAllUI();
}

function doRest() {
    gameState.stamina = 100;

    // 활동 기록
    recordActivity('rest', '😴');

    showResult('푹 쉬었습니다. 내일이 되었습니다.', 0, 0);
    nextDay();
}

// ============================================
// 결과 표시
// ============================================
function showResult(message, affectionChange, trustChange, extraInfo = '') {
    const dialogueText = document.getElementById('dialogue-text');

    let resultText = message;
    if (affectionChange !== 0) resultText += `\n💖 호감도 ${affectionChange > 0 ? '+' : ''}${affectionChange}`;
    if (trustChange !== 0) resultText += `\n🤝 신뢰도 ${trustChange > 0 ? '+' : ''}${trustChange}`;
    if (extraInfo) resultText += `\n${extraInfo}`;

    dialogueText.textContent = resultText;
    dialogueText.style.color = affectionChange >= 0 ? '#44ff88' : '#ff4444';
    dialogueText.style.fontWeight = 'bold';

    const timeoutId = setTimeout(() => {
        dialogueText.textContent = '무엇을 할까요?';
        dialogueText.style.color = '';
        dialogueText.style.fontWeight = '';
    }, 3000);
    pendingTimeouts.push(timeoutId);

    updateAllUI();
}

// 모든 pending timeout 클리어
function clearAllTimeouts() {
    pendingTimeouts.forEach(id => clearTimeout(id));
    pendingTimeouts = [];
}

// ============================================
// 다음 날
// ============================================
function checkDayEnd() {
    // 자동으로 날이 넘어가지 않음
    // 플레이어가 "휴식하기"를 눌러야 함
}

function nextDay() {
    gameState.day++;
    gameState.dDay--;
    gameState.workCount = 0;
    gameState.stamina = 100;

    // 바이오리듬 업데이트
    updateBiorhythm();

    // 방치 체크
    checkNeglect();

    // 돌발 상황 체크 (25% 확률)
    if (Math.random() < 0.25 && gameState.day > 3) {
        triggerCrisisEvent();
        return; // 돌발 상황 처리 후 return
    }

    // 히스토리 기록
    addHistory();

    // 게임 종료 체크
    if (gameState.dDay <= 0 || gameState.affection <= 0) {
        endGame();
        return;
    }

    updateAllUI();
}

function updateBiorhythm() {
    if (gameState.biorhythmDays > 0) {
        gameState.biorhythmDays--;
        if (gameState.biorhythmDays === 0) {
            gameState.biorhythm = 'normal';
        }
    } else {
        // 20% 확률로 주기 발생 (3일간)
        if (Math.random() < 0.2) {
            gameState.biorhythm = 'period';
            gameState.biorhythmDays = 3;
            alert('⚠️ 컨디션이 안 좋아 보입니다...');
        }
    }
}

function checkNeglect() {
    const daysSinceInteraction = gameState.day - gameState.lastInteraction;

    if (daysSinceInteraction > 3) {
        const neglectPenalty = (daysSinceInteraction - 3) * 5;

        // 캐릭터별 방치 민감도
        let penalty = neglectPenalty;
        if (gameState.character.traits.neglectPenalty) {
            penalty = gameState.character.traits.neglectPenalty * (daysSinceInteraction - 3);
        }

        gameState.affection -= penalty;
        alert(`😢 ${gameState.character.fullName}이(가) 서운해합니다... (-${penalty} 호감도)`);
    }
}

// ============================================
// 히스토리 & 그래프
// ============================================
function addHistory() {
    gameState.history.push({
        day: gameState.day,
        affection: gameState.affection,
        trust: gameState.trust,
        money: gameState.money
    });
}

function showStatsGraph() {
    if (gameState.history.length < 2) {
        alert('그래프를 표시하기에 충분한 데이터가 없습니다.');
        return;
    }

    showModal('stats-graph-modal');

    // 모달이 표시된 후 그래프 그리기
    setTimeout(() => {
        drawStatsGraph();
    }, 100);
}

function drawStatsGraph() {
    const canvas = document.getElementById('stats-canvas');
    if (!canvas || !canvas.getContext) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // 캔버스 초기화
    ctx.clearRect(0, 0, width, height);

    // 배경
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, width, height);

    const padding = 40;
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;

    // 그리드 그리기
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;

    // 가로선 (0%, 25%, 50%, 75%, 100%)
    for (let i = 0; i <= 4; i++) {
        const y = padding + (graphHeight / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();

        // 퍼센트 라벨
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText((100 - i * 25) + '%', padding - 10, y + 4);
    }

    // 세로선 (날짜)
    const history = gameState.history;
    const maxDays = Math.max(10, history.length);
    const dayStep = Math.ceil(maxDays / 10);

    for (let i = 0; i <= maxDays; i += dayStep) {
        const x = padding + (graphWidth / maxDays) * i;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, height - padding);
        ctx.stroke();

        // 날짜 라벨
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Day ' + (i + 1), x, height - padding + 20);
    }

    // 데이터 선 그리기
    function drawLine(data, color, label) {
        if (data.length < 2) return;

        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();

        for (let i = 0; i < data.length; i++) {
            const x = padding + (graphWidth / (maxDays - 1)) * i;
            const value = Math.max(0, Math.min(100, data[i]));
            const y = padding + graphHeight - (graphHeight * value / 100);

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.stroke();

        // 점 그리기
        for (let i = 0; i < data.length; i++) {
            const x = padding + (graphWidth / (maxDays - 1)) * i;
            const value = Math.max(0, Math.min(100, data[i]));
            const y = padding + graphHeight - (graphHeight * value / 100);

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // 호감도 데이터
    const affectionData = history.map(h => h.affection);
    drawLine(affectionData, '#ff69b4', '호감도');

    // 신뢰도 데이터
    const trustData = history.map(h => h.trust);
    drawLine(trustData, '#4169E1', '신뢰도');
}

// ============================================
// 프로포즈 시스템
// ============================================
function attemptProposal() {
    const finalScore = (gameState.affection * 0.6) + (gameState.trust * 0.4);
    const ringBonus = gameState.hasProposalRing ? 20 : 0;
    const totalScore = finalScore + ringBonus;

    gameState.isGameOver = true;

    let endingType, title, message;

    if (totalScore >= 100) {
        endingType = 'perfect';
        title = '💖 퍼펙트 엔딩 - 결혼 골인!';
        message = `${gameState.character.fullName}이(가) 눈물을 흘리며 승낙했습니다! 완벽한 사랑을 이루었어요!`;
    } else if (totalScore >= 80) {
        endingType = 'true';
        title = '💝 트루 엔딩 - 프로포즈 성공!';
        message = `${gameState.character.fullName}이(가) 행복하게 승낙했습니다!`;
    } else if (totalScore >= 60) {
        endingType = 'good';
        title = '💗 굿 엔딩 - 조금 더 시간이 필요해요';
        message = `"좀 더 생각해볼게요..." 아직 이른 것 같습니다.`;
    } else {
        endingType = 'bad';
        title = '💔 배드 엔딩 - 프로포즈 거절';
        message = `${gameState.character.fullName}이(가) 당황하며 거절했습니다...`;
    }

    showEnding(endingType, title, message);
}

function endGame() {
    const finalScore = (gameState.affection * 0.6) + (gameState.trust * 0.4);

    let endingType, title, message;

    if (gameState.affection <= 0) {
        endingType = 'gameover';
        title = '💔 게임 오버 - 이별';
        message = `${gameState.character.fullName}와(과) 이별했습니다...`;
    } else if (finalScore >= 80) {
        endingType = 'true';
        title = '💖 트루 엔딩';
        message = `${gameState.character.fullName}와(과) 훌륭한 관계를 유지했습니다!`;
    } else if (finalScore >= 60) {
        endingType = 'good';
        title = '💝 굿 엔딩';
        message = `${gameState.character.fullName}와(과) 좋은 관계를 유지했습니다.`;
    } else {
        endingType = 'normal';
        title = '💗 노멀 엔딩';
        message = `${gameState.character.fullName}와(과)의 관계는 평범했습니다.`;
    }

    showEnding(endingType, title, message);
}

function showEnding(type, title, message) {
    document.getElementById('ending-title').textContent = title;
    document.getElementById('ending-message').textContent = message;
    document.getElementById('final-affection').textContent = Math.round(gameState.affection) + '%';
    document.getElementById('final-days').textContent = gameState.day + '일';

    // 엔딩 이미지 설정
    const endingImage = document.getElementById('ending-image');
    const baseImage = gameState.character.image.replace('-normal.jpg', '');

    if (type === 'perfect' || type === 'true') {
        endingImage.src = baseImage + '-happy.jpg';
    } else {
        endingImage.src = baseImage + '-unhappy.jpg';
    }

    endingImage.onerror = function() {
        this.src = gameState.character.image;
        this.onerror = null;
    };

    // 엔딩 포트레이트 테두리
    const endingPortrait = document.getElementById('ending-portrait');
    const colors = {
        perfect: '#44ff88',
        true: '#44ff88',
        good: '#ffaa44',
        normal: '#ff8844',
        bad: '#ff4444',
        gameover: '#ff4444'
    };

    const color = colors[type] || '#ff4444';
    endingPortrait.style.borderColor = color;
    endingPortrait.style.boxShadow = `0 0 50px ${color}80`;

    showScreen('ending-screen');
}

// ============================================
// 모달 생성 유틸리티
// ============================================
function createActionModal(title, subtitle) {
    let modal = document.getElementById('action-modal');

    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'action-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2 id="action-modal-title"></h2>
                    <button class="close-btn" onclick="closeModal('action-modal')">✕</button>
                </div>
                <div class="modal-body" id="action-modal-body">
                    <p id="action-modal-subtitle"></p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    document.getElementById('action-modal-title').textContent = title;
    document.getElementById('action-modal-subtitle').textContent = subtitle;

    return modal;
}

// ============================================
// 게임 재시작
// ============================================
function restartGame() {
    selectCharacter(gameState.character.id);
}

function backToMain() {
    showScreen('main-screen');
}

function toggleMenu() {
    // 간단한 메뉴로 가이드 표시
    showRules();
}

function showGameMenu() {
    showModal('game-menu-modal');
}

// ============================================
// 돌발 상황 시스템
// ============================================
function triggerCrisisEvent() {
    const event = CRISIS_EVENTS[Math.floor(Math.random() * CRISIS_EVENTS.length)];

    const modal = createActionModal('⚠️ 돌발 상황!', event.situation);
    const content = modal.querySelector('.modal-body');
    content.innerHTML = '';

    event.choices.forEach((choice, index) => {
        const choiceBtn = document.createElement('button');
        choiceBtn.className = 'choice-option-btn';

        choiceBtn.innerHTML = `
            <span class="choice-number">${index + 1}.</span>
            <span class="choice-text">${choice.text}</span>
        `;

        const choiceData = choice;
        const eventData = event;
        choiceBtn.onclick = function() {
            console.log('위기 이벤트 선택:', choiceData.text);
            handleCrisisChoice(choiceData, eventData);
        };

        content.appendChild(choiceBtn);
    });

    showModal('action-modal');
}

function handleCrisisChoice(choice, event) {
    let affectionChange = choice.affection || 0;
    let trustChange = choice.trust || 0;
    let moneyChange = choice.money || 0;

    // 캐릭터 특성에 따라 조정
    if (gameState.character.traits) {
        // 완벽주의자는 실수에 민감
        if (gameState.character.id === 'perfectionist' && (affectionChange < 0 || trustChange < 0)) {
            affectionChange = Math.round(affectionChange * 1.3);
            trustChange = Math.round(trustChange * 1.3);
        }
        // 츤데레는 긍정적 행동에 더 큰 반응
        if (gameState.character.id === 'tsundere' && affectionChange > 0) {
            affectionChange = Math.round(affectionChange * 1.2);
        }
    }

    gameState.affection += affectionChange;
    gameState.trust += trustChange;
    gameState.money += moneyChange;

    // 활동 기록
    recordActivity('crisis', '⚠️');

    closeModal('action-modal');

    let resultMessage = choice.text;
    if (moneyChange !== 0) {
        resultMessage += `\n💰 ${moneyChange > 0 ? '+' : ''}${formatMoney(Math.abs(moneyChange))}`;
    }

    showResult(resultMessage, affectionChange, trustChange);

    // 히스토리 기록
    addHistory();

    // 게임 종료 체크
    if (gameState.dDay <= 0 || gameState.affection <= 0) {
        endGame();
        return;
    }

    updateAllUI();
}

// ============================================
// 활동 기록
// ============================================
function recordActivity(activityType, activityIcon) {
    const day = gameState.day;
    if (!gameState.dailyActivities[day]) {
        gameState.dailyActivities[day] = [];
    }
    gameState.dailyActivities[day].push({
        type: activityType,
        icon: activityIcon
    });
    // 달력 즉시 업데이트
    updateMiniCalendar();
}

// ============================================
// 달력 시스템
// ============================================
function updateMiniCalendar() {
    const container = document.getElementById('calendar-display-grid');
    if (!container) return;

    container.innerHTML = '';

    // 30일치 달력 생성
    for (let day = 1; day <= 30; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-display-day';

        // 날짜 번호
        const dayNumber = document.createElement('div');
        dayNumber.className = 'calendar-display-day-number';
        dayNumber.textContent = day;
        dayElement.appendChild(dayNumber);

        // 활동 아이콘 표시
        if (gameState.dailyActivities[day] && gameState.dailyActivities[day].length > 0) {
            const iconsDiv = document.createElement('div');
            iconsDiv.className = 'calendar-display-day-icons';

            // 중복 제거하고 표시 (최대 4개)
            const uniqueIcons = [...new Set(gameState.dailyActivities[day].map(a => a.icon))];
            uniqueIcons.slice(0, 4).forEach(icon => {
                const iconSpan = document.createElement('span');
                iconSpan.textContent = icon;
                iconSpan.title = '활동';
                iconsDiv.appendChild(iconSpan);
            });

            dayElement.appendChild(iconsDiv);
        }

        // 상태 클래스 추가
        if (day === gameState.day) {
            dayElement.classList.add('today');
        } else if (day < gameState.day) {
            dayElement.classList.add('past');
        } else if (day > gameState.day) {
            dayElement.classList.add('future');
        }

        // 클릭 이벤트 - 해당 날짜의 활동 상세 보기
        if (day <= gameState.day) {
            dayElement.onclick = function() {
                showDayDetail(day);
            };
            dayElement.style.cursor = 'pointer';
        }

        container.appendChild(dayElement);
    }
}

function showCalendar() {
    const container = document.getElementById('calendar-container');
    container.innerHTML = '';

    // 헤더
    const header = document.createElement('div');
    header.className = 'calendar-header';
    header.textContent = `${gameState.character.fullName}와의 30일`;
    container.appendChild(header);

    // 30일치 달력 생성
    for (let day = 1; day <= 30; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';

        if (day === gameState.day) {
            dayElement.classList.add('today');
        } else if (day > gameState.day) {
            dayElement.classList.add('future');
        }

        // 날짜 번호
        const dayNumber = document.createElement('div');
        dayNumber.className = 'calendar-day-number';
        dayNumber.textContent = day;
        dayElement.appendChild(dayNumber);

        // 활동 아이콘 표시
        if (gameState.dailyActivities[day]) {
            const activitiesDiv = document.createElement('div');
            activitiesDiv.className = 'calendar-day-activities';

            // 중복 제거하고 표시 (최대 3개)
            const uniqueActivities = [...new Set(gameState.dailyActivities[day].map(a => a.icon))];
            uniqueActivities.slice(0, 3).forEach(icon => {
                const activitySpan = document.createElement('span');
                activitySpan.className = 'calendar-day-activity';
                activitySpan.textContent = icon;
                activitySpan.title = '활동';
                activitiesDiv.appendChild(activitySpan);
            });

            dayElement.appendChild(activitiesDiv);
        }

        // 클릭 이벤트
        if (day <= gameState.day) {
            dayElement.onclick = function() {
                showDayDetail(day);
            };
        }

        container.appendChild(dayElement);
    }

    showModal('calendar-modal');
}

function showDayDetail(day) {
    const activities = gameState.dailyActivities[day] || [];
    let message = `📅 ${day}일차\n\n`;

    if (activities.length === 0) {
        message += '활동 없음';
    } else {
        const activityCounts = {};
        activities.forEach(a => {
            const key = a.type;
            activityCounts[key] = (activityCounts[key] || 0) + 1;
        });

        const activityNames = {
            'date': '데이트',
            'gift': '선물',
            'talk': '대화',
            'work': '알바',
            'rest': '휴식',
            'crisis': '돌발상황'
        };

        Object.entries(activityCounts).forEach(([type, count]) => {
            const icon = activities.find(a => a.type === type)?.icon || '';
            message += `${icon} ${activityNames[type]}: ${count}회\n`;
        });
    }

    alert(message);
}

// ============================================
// 게임 재시작 - 완전한 데이터 리셋
// ============================================
function confirmRestart() {
    if (confirm('정말로 처음부터 다시 시작하시겠습니까?\n모든 데이터가 완전히 삭제됩니다.')) {
        // 모든 pending timeout 클리어
        clearAllTimeouts();

        // localStorage 완전 삭제
        try {
            localStorage.clear();
        } catch (error) {
            console.warn('localStorage 삭제 실패:', error);
        }

        // 게임 상태 완전 초기화
        gameState = {
            character: null,
            affection: 50,
            trust: 30,
            money: 1000000,
            stamina: 100,
            day: 1,
            dDay: 30,
            startDate: null,
            biorhythm: 'normal',
            biorhythmDays: 0,
            lastInteraction: 0,
            workCount: 0,
            hasProposalRing: false,
            history: [],
            dailyActivities: {},
            isGameOver: false
        };

        closeModal('game-menu-modal');
        showScreen('main-screen');
    }
}
