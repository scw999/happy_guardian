// ============================================
// 게임 상태
// ============================================
let gameState = {
    character: null,
    affection: 50,
    trust: 30,
    money: 300000,  // 초기 자금 30만원으로 감소
    stamina: 100,
    mental: 100,  // 멘탈 수치 추가 (0이 되면 게임 오버)
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
    dailyActionCount: 0,  // 하루 액션 횟수 (최대 3회)
    dailyActionCounts: {date: 0, gift: 0, talk: 0},  // 각 행동 반복 추적
    multiStage: null,  // 다단계 액션 진행 상태 { type, location, scenarios, currentIndex, totalAffection, totalTrust }
    todayIsAnniversary: false,  // 오늘이 기념일인지
    anniversaryCelebrated: false,  // 기념일을 축하했는지
    anniversaryType: null,  // 기념일 종류 ('meeting', 'birthday')
    isGameOver: false,
    usedScenarios: {  // 사용한 시나리오 추적 (반복 방지)
        talk: [],  // 대화 시나리오 ID
        date: {},  // 데이트 장소별 시나리오 ID { walk: [], cafe: [], ... }
        crisis: []  // 돌발 이벤트 ID
    }
};

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

    clearAllTimeouts();

    gameState = {
        character: character,
        affection: character.startAffection,
        trust: character.startTrust,
        money: 300000,  // 초기 자금 30만원
        stamina: 100,
        mental: 100,  // 멘탈 수치 추가
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
        dailyActionCount: 0,
        dailyActionCounts: {date: 0, gift: 0, talk: 0},
        multiStage: null,
        todayIsAnniversary: false,
        anniversaryCelebrated: false,
        anniversaryType: null,
        isGameOver: false,
        usedScenarios: {
            talk: [],
            date: {},
            crisis: []
        }
    };

    addHistory();
    initGameScreen();
    showScreen('game-screen');

    const dialogueText = document.getElementById('dialogue-text');
    dialogueText.textContent = '무엇을 할까요?';
    dialogueText.style.color = '';
    dialogueText.style.fontWeight = '';

    updateAllUI();

    // 게임 초기 안내
    const timeoutId = setTimeout(() => {
        showGameObjective();
    }, 500);
    pendingTimeouts.push(timeoutId);
}

function showGameObjective() {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'game-objective-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>🎯 게임 목표</h2>
            </div>
            <div class="modal-body">
                <p style="font-size: 1.1rem; font-weight: bold; color: var(--primary-pink); margin-bottom: 20px;">
                    30일 안에 호감도를 올려 프로포즈를 성공시키세요!
                </p>
                <div style="text-align: left; padding: 0 20px;">
                    <h3>📝 주요 규칙</h3>
                    <ul style="line-height: 1.8;">
                        <li><strong>호감도 %</strong> = 프로포즈 승낙 확률</li>
                        <li><strong>하루 최대 3회</strong> 행동 가능 (데이트/선물/대화)</li>
                        <li>같은 행동을 반복하면 <strong>체력이 6배, 11배씩</strong> 급증!</li>
                        <li><strong>호감도가 낮으면</strong> 데이트를 거절당할 수 있습니다</li>
                        <li>거절당하면 <strong>체력 -50, 호감도 -8, 신뢰도 -5</strong> 큰 페널티!</li>
                    </ul>

                    <h3 style="margin-top: 20px;">💪 자원 관리</h3>
                    <ul style="line-height: 1.8;">
                        <li><strong>체력</strong>: 모든 행동에 필요, 휴식으로 회복</li>
                        <li><strong style="color: #ff6b6b;">멘탈</strong>: 데이트/스킨십 거절, 안 좋은 반응, 일부 일하기 실패 시 감소<br>
                            <strong style="color: #ff6b6b;">⚠️ 0이 되면 게임 오버!</strong> 휴식으로 회복 필수</li>
                        <li><strong>신뢰도</strong>: 깊은 대화와 일관된 행동으로 상승</li>
                        <li><strong>돈</strong>: 다양한 방법으로 벌거나 데이트/선물에 사용</li>
                    </ul>

                    <h3 style="margin-top: 20px;">🎂 특별한 날</h3>
                    <ul style="line-height: 1.8;">
                        <li>7일마다 만남 기념일 (7일, 14일, 21일, 28일)</li>
                        <li>캐릭터 생일</li>
                        <li>기념일에 데이트/선물하면 <strong>효과 1.5배!</strong></li>
                        <li>기념일을 챙기지 않으면 <strong>-15 호감도</strong></li>
                    </ul>
                </div>
                <button class="menu-btn" onclick="window.closeGameObjective()" style="margin-top: 20px;">시작하기!</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

window.closeGameObjective = function() {
    const modal = document.getElementById('game-objective-modal');
    if (modal) {
        modal.remove();
    }
    // 첫 만남 시나리오 표시
    const characterId = gameState.character.id;
    showFirstMeetingScenario(characterId);
};

function showFirstMeetingScenario(characterId) {
    const scenario = FIRST_MEETING_SCENARIOS[characterId];
    if (!scenario) return;

    // window.currentFirstMeetingChoices를 먼저 설정
    window.currentFirstMeetingChoices = scenario.choices;

    const html = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>💝 첫 만남</h2>
                <button class="close-btn" onclick="closeModal('action-modal')">✕</button>
            </div>
            <div class="modal-body">
                <p>${scenario.situation}</p>
                ${scenario.choices.map((choice, idx) => `
                    <button class="choice-option-btn" onclick="window.selectFirstMeeting(${idx})">
                        <span class="choice-number">${idx + 1}.</span>
                        <span class="choice-text">${choice.text}</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    let modal = document.getElementById('action-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'action-modal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }

    modal.innerHTML = html;
    showModal('action-modal');
}

window.selectFirstMeeting = function(index) {
    const choice = window.currentFirstMeetingChoices[index];

    // 난이도 배수 적용 (전역 배수 * 캐릭터별 배수)
    const difficultyMult = GLOBAL_DIFFICULTY_MULTIPLIER * getDifficultyMultiplier();
    const affectionChange = Math.round((choice.affection || 0) * difficultyMult);
    const trustChange = Math.round((choice.trust || 0) * difficultyMult);

    gameState.affection += affectionChange;
    gameState.trust += trustChange;

    closeModal('action-modal');

    const timeoutId = setTimeout(() => {
        const message = `첫 만남이 인상적이었습니다!\n\n"${gameState.character.fullName}과(와)의 관계가 시작되었습니다."`;
        showResult(message, affectionChange, trustChange);
        addHistory();
        updateAllUI();
    }, 100);
    pendingTimeouts.push(timeoutId);
};

function initGameScreen() {
    document.getElementById('char-name-display').textContent = gameState.character.fullName;
    updateCharacterMood();
    createActionButtons();
}

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
    const dDayText = `D-${gameState.dDay}`;
    document.getElementById('day-number').setAttribute('data-dday', dDayText);
}

function updateResources() {
    gameState.affection = Math.max(0, Math.min(100, gameState.affection));
    document.getElementById('affection-percentage').textContent = Math.round(gameState.affection) + '%';
    document.getElementById('affection-fill').style.width = gameState.affection + '%';

    gameState.trust = Math.max(0, Math.min(100, gameState.trust));
    if (document.getElementById('trust-percentage')) {
        document.getElementById('trust-percentage').textContent = Math.round(gameState.trust) + '%';
        document.getElementById('trust-fill').style.width = gameState.trust + '%';
    }

    document.getElementById('money-value').textContent = formatMoney(gameState.money);
    const moneyPercent = Math.min(100, (gameState.money / 10000000) * 100);
    document.getElementById('money-fill').style.width = moneyPercent + '%';

    gameState.stamina = Math.max(0, Math.min(100, gameState.stamina));
    document.getElementById('stamina-value').textContent = gameState.stamina;
    document.getElementById('stamina-fill').style.width = gameState.stamina + '%';

    // 멘탈이 undefined이거나 NaN이면 100으로 초기화
    if (gameState.mental === undefined || isNaN(gameState.mental)) {
        gameState.mental = 100;
    }
    gameState.mental = Math.max(0, Math.min(100, gameState.mental));
    document.getElementById('mental-value').textContent = gameState.mental;
    document.getElementById('mental-fill').style.width = gameState.mental + '%';

    // 멘탈이 0이 되면 게임 오버
    if (gameState.mental <= 0 && !gameState.isGameOver) {
        gameState.isGameOver = true;
        setTimeout(() => {
            showMentalGameOver();
        }, 500);
    }

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
// 액션 버튼 시스템
// ============================================
function createActionButtons() {
    const choicesArea = document.getElementById('choices-area');
    if (!choicesArea) return;

    choicesArea.innerHTML = `
        <button class="action-choice-btn" id="action-date" onclick="showDateMenu()">
            <div class="action-icon">💑</div>
            <div class="action-info"><div class="action-name">데이트하기</div></div>
        </button>
        <button class="action-choice-btn" id="action-gift" onclick="showGiftMenu()">
            <div class="action-icon">🎁</div>
            <div class="action-info"><div class="action-name">선물하기</div></div>
        </button>
        <button class="action-choice-btn" id="action-talk" onclick="showTalkMenu()">
            <div class="action-icon">💬</div>
            <div class="action-info"><div class="action-name">대화하기</div></div>
        </button>
        <button class="action-choice-btn" id="action-skinship" onclick="showSkinshipMenu()">
            <div class="action-icon">💕</div>
            <div class="action-info"><div class="action-name">스킨십</div></div>
        </button>
        <button class="action-choice-btn" id="action-work" onclick="doWork()">
            <div class="action-icon">💰</div>
            <div class="action-info"><div class="action-name">돈 벌기</div></div>
        </button>
        <button class="action-choice-btn" id="action-rest" onclick="doRest()">
            <div class="action-icon">😴</div>
            <div class="action-info"><div class="action-name">휴식하기</div></div>
        </button>
        <button class="action-choice-btn" id="action-propose" onclick="attemptProposal()">
            <div class="action-icon">💍</div>
            <div class="action-info"><div class="action-name">프로포즈</div></div>
        </button>
    `;

    updateActionButtons();
}

function updateActionButtons() {
    const alwaysEnabledButtons = ['date', 'gift', 'talk', 'rest'];
    alwaysEnabledButtons.forEach(id => {
        const btn = document.getElementById(`action-${id}`);
        if (btn) {
            btn.classList.remove('disabled');
            btn.disabled = false;
        }
    });

    const proposeBtn = document.getElementById('action-propose');
    if (proposeBtn) {
        const canPropose = gameState.hasProposalRing || (gameState.affection >= 60 && gameState.trust >= 60);
        if (!canPropose) {
            proposeBtn.classList.add('disabled');
            proposeBtn.disabled = true;
        } else {
            proposeBtn.classList.remove('disabled');
            proposeBtn.disabled = false;
        }
    }

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
    // 하루 액션 제한 체크 (최대 3회)
    if (gameState.dailyActionCount >= 3) {
        alert('오늘은 더 이상 행동할 수 없습니다! 휴식을 취하세요.');
        return;
    }

    const locations = Object.values(DATE_LOCATIONS);

    // window.currentDateLocations를 먼저 설정
    window.currentDateLocations = locations;

    const html = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>데이트 장소 선택</h2>
                <button class="close-btn" onclick="closeModal('action-modal')">✕</button>
            </div>
            <div class="modal-body">
                <p>어디로 데이트를 갈까요?</p>
                ${locations.map((loc, idx) => {
                    const canAfford = gameState.money >= loc.cost && gameState.stamina >= loc.stamina;
                    const disabled = canAfford ? '' : 'disabled';
                    return `
                        <div class="action-option ${disabled}" onclick="${canAfford ? `selectDateLocation(${idx})` : ''}">
                            <div class="option-icon">${loc.icon}</div>
                            <div class="option-info">
                                <div class="option-name">${loc.name}</div>
                                <div class="option-desc">${loc.description}</div>
                                <div class="option-cost">
                                    ${loc.cost > 0 ? '💰 ' + formatMoney(loc.cost) : '무료'}
                                    ⚡ ${loc.stamina}
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;

    let modal = document.getElementById('action-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'action-modal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }

    modal.innerHTML = html;
    showModal('action-modal');
}

function selectDateLocation(index) {
    const location = window.currentDateLocations[index];

    if (gameState.money < location.cost || gameState.stamina < location.stamina) {
        alert('자원이 부족합니다!');
        return;
    }

    // 호감도 기반 데이트 수락 확률 체크 (더 엄격하게 변경)
    let acceptChance = 1.0;
    if (gameState.affection < 20) {
        acceptChance = 0.2;  // 20% 확률로 낮춤
    } else if (gameState.affection < 40) {
        acceptChance = 0.4;  // 40% 확률로 낮춤
    } else if (gameState.affection < 60) {
        acceptChance = 0.6;  // 60% 확률로 낮춤
    } else if (gameState.affection < 80) {
        acceptChance = 0.85;  // 85% 확률로 낮춤
    }

    // 거절 체크
    if (Math.random() > acceptChance) {
        gameState.stamina -= 50;  // 체력 급감 (40 → 50으로 증가)
        gameState.affection -= 8;  // 호감도 감소 (5 → 8로 증가)
        gameState.trust -= 5;  // 신뢰도 감소 (3 → 5로 증가)
        gameState.mental -= 25;  // 멘탈 감소 (거절로 인한 정신적 충격)
        closeModal('action-modal');
        alert(`💔 ${gameState.character.fullName}이(가) 데이트를 거절했습니다...\n(-50 체력, -8 호감도, -5 신뢰도, -25 멘탈)\n\n거절로 인한 충격이 큽니다. 호감도를 더 높인 후 시도하세요!`);
        updateAllUI();
        return;
    }

    // 데이트 수락! 체력 회복
    gameState.stamina += 10;  // 데이트 수락으로 기쁨
    alert(`💖 ${gameState.character.fullName}이(가) 데이트를 수락했습니다!\n\n기쁜 마음에 체력이 10 회복되었습니다! (+10 체력)`);

    gameState.money -= location.cost;
    gameState.stamina -= location.stamina;

    // 사용한 시나리오 추적을 위한 초기화
    if (!gameState.usedScenarios.date[location.id]) {
        gameState.usedScenarios.date[location.id] = [];
    }

    // 사용하지 않은 시나리오만 필터링
    const usedIds = gameState.usedScenarios.date[location.id];
    const availableScenarios = location.scenarios.filter(s => !usedIds.includes(s.id));

    // 모든 시나리오를 다 사용했다면 리셋
    const scenariosToUse = availableScenarios.length > 0 ? availableScenarios : location.scenarios;
    if (availableScenarios.length === 0) {
        gameState.usedScenarios.date[location.id] = [];
    }

    // 다단계 시스템: 2-3개의 시나리오를 선택
    const scenarioCount = Math.min(3, scenariosToUse.length);
    const shuffled = [...scenariosToUse].sort(() => Math.random() - 0.5);
    const selectedScenarios = shuffled.slice(0, scenarioCount);

    // 사용한 시나리오 ID 기록
    selectedScenarios.forEach(s => {
        if (!gameState.usedScenarios.date[location.id].includes(s.id)) {
            gameState.usedScenarios.date[location.id].push(s.id);
        }
    });

    // 다단계 액션 상태 초기화
    gameState.multiStage = {
        type: 'date',
        location: location,
        scenarios: selectedScenarios,
        currentIndex: 0,
        totalAffection: 0,
        totalTrust: 0
    };

    closeModal('action-modal');
    showMultiStageScenario();
}

// ============================================
// 선물 시스템
// ============================================
function showGiftMenu() {
    // 하루 액션 제한 체크 (최대 3회)
    if (gameState.dailyActionCount >= 3) {
        alert('오늘은 더 이상 행동할 수 없습니다! 휴식을 취하세요.');
        return;
    }

    const gifts = Object.values(GIFT_ITEMS);

    // window.currentGifts를 먼저 설정
    window.currentGifts = gifts;

    const html = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>선물 선택</h2>
                <button class="close-btn" onclick="closeModal('action-modal')">✕</button>
            </div>
            <div class="modal-body">
                <p>무엇을 선물할까요?</p>
                ${gifts.map((gift, idx) => {
                    const canAfford = gameState.money >= gift.cost && gameState.stamina >= gift.stamina;
                    const disabled = canAfford ? '' : 'disabled';
                    return `
                        <div class="action-option ${disabled}" onclick="${canAfford ? `giveGift(${idx})` : ''}">
                            <div class="option-icon">${gift.icon}</div>
                            <div class="option-info">
                                <div class="option-name">${gift.name}</div>
                                <div class="option-desc">${gift.description}</div>
                                <div class="option-cost">💰 ${formatMoney(gift.cost)}</div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;

    let modal = document.getElementById('action-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'action-modal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }

    modal.innerHTML = html;
    showModal('action-modal');
}

function giveGift(index) {
    const gift = window.currentGifts[index];

    if (gameState.money < gift.cost) {
        alert('돈이 부족합니다!');
        return;
    }

    gameState.money -= gift.cost;

    // 하루 액션 카운트 증가
    gameState.dailyActionCount++;

    // 반복 행동 추적 및 추가 체력 소모
    gameState.dailyActionCounts['gift']++;
    const repeatCount = gameState.dailyActionCounts['gift'];

    // 반복 횟수에 따라 추가 체력 소모 (500%씩 증가 - 1번째: 기본, 2번째: 6배, 3번째: 11배)
    let staminaCost = gift.stamina;
    if (repeatCount > 1) {
        staminaCost = Math.round(gift.stamina * (1 + (repeatCount - 1) * 5.0));
    }
    gameState.stamina -= staminaCost;

    // 난이도 배수 적용 (전역 배수 * 캐릭터별 배수)
    const difficultyMult = GLOBAL_DIFFICULTY_MULTIPLIER * getDifficultyMultiplier();
    const preference = gameState.character.preferences.gifts[gift.id] || 1.0;
    let affectionGain = Math.round(gift.baseAffection * difficultyMult * preference * getBiorhythmMultiplier());
    let trustGain = Math.round(gift.baseTrust * difficultyMult * preference * getBiorhythmMultiplier());

    // 기념일 보너스 적용
    if (gameState.todayIsAnniversary) {
        const originalAff = affectionGain;
        const originalTrust = trustGain;
        affectionGain = Math.round(affectionGain * 1.5);
        trustGain = Math.round(trustGain * 1.5);
        gameState.anniversaryCelebrated = true;

        const bonusType = gameState.anniversaryType === 'birthday' ? '🎂 생일' : '💕 기념일';
        setTimeout(() => {
            alert(`${bonusType} 선물 보너스! 효과가 1.5배로 증가했습니다! (+${affectionGain - originalAff} 호감도, +${trustGain - originalTrust} 신뢰도)`);
        }, 500);
    }

    gameState.affection += affectionGain;
    gameState.trust += trustGain;
    gameState.lastInteraction = gameState.day;

    if (gift.id === 'ring') {
        gameState.hasProposalRing = true;
    }

    recordActivity('gift', '🎁');

    closeModal('action-modal');
    showResult(`${gift.name}을(를) 선물했습니다!`, affectionGain, trustGain);

    checkDayEnd();
}

// ============================================
// 대화 시스템
// ============================================
function showTalkMenu() {
    // 하루 액션 제한 체크 (최대 3회)
    if (gameState.dailyActionCount >= 3) {
        alert('오늘은 더 이상 행동할 수 없습니다! 휴식을 취하세요.');
        return;
    }

    const topics = Object.values(TALK_TOPICS);
    console.log('대화 주제 메뉴 로드 - 주제 수:', topics.length, '주제 목록:', topics.map(t => t.name).join(', '));

    // window.currentTopics를 먼저 설정
    window.currentTopics = topics;

    const html = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>대화 주제 선택</h2>
                <button class="close-btn" onclick="closeModal('action-modal')">✕</button>
            </div>
            <div class="modal-body">
                <p>무엇에 대해 이야기할까요?</p>
                ${topics.map((topic, idx) => {
                    // 오늘 대화한 전체 횟수 계산 (주제 무관)
                    const talkCount = (gameState.dailyActionCounts['talk'] || 0) + 1;
                    // 대화 횟수에 따라 체력 배수 증가 (1번째: 1배, 2번째: 2배, 3번째: 3배...)
                    let actualStamina = topic.stamina * talkCount;

                    const canTalk = gameState.stamina >= actualStamina;
                    const meetsRequirement = !topic.minAffection || gameState.affection >= topic.minAffection;
                    const isAvailable = canTalk && meetsRequirement;

                    // 체력 표시: 실제 소비 체력만 표시
                    let staminaDisplay = `⚡ ${actualStamina}`;

                    // 스타일을 인라인으로 적용 (disabled 클래스 대신)
                    const style = isAvailable ? '' : 'opacity: 0.4; cursor: not-allowed; border-color: rgba(255,255,255,0.1);';

                    return `
                        <div class="action-option" style="${style}" data-topic-idx="${idx}" onclick="window.handleTalkTopicClick(${idx})">
                            <div class="option-icon">${topic.icon}</div>
                            <div class="option-info">
                                <div class="option-name">${topic.name}</div>
                                <div class="option-desc">${topic.description}</div>
                                <div class="option-cost">${staminaDisplay}</div>
                                ${topic.minAffection ? `<div class="option-requirement">호감도 ${topic.minAffection}% 필요 (현재: ${Math.round(gameState.affection)}%)</div>` : ''}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;

    let modal = document.getElementById('action-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'action-modal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }

    modal.innerHTML = html;
    showModal('action-modal');
}

// 대화 주제 클릭 핸들러
window.handleTalkTopicClick = function(index) {
    try {
        console.log('대화 주제 클릭 - 인덱스:', index);

        if (!window.currentTopics) {
            alert('오류: currentTopics가 설정되지 않았습니다');
            return;
        }

        const topic = window.currentTopics[index];
        if (!topic) {
            alert('오류: 토픽을 찾을 수 없습니다. 인덱스: ' + index);
            return;
        }

        console.log('선택한 토픽:', topic.name);

        // 오늘 대화한 전체 횟수 계산
        const talkCount = (gameState.dailyActionCounts['talk'] || 0) + 1;
        const actualStamina = topic.stamina * talkCount;

        const canTalk = gameState.stamina >= actualStamina;
        const meetsRequirement = !topic.minAffection || gameState.affection >= topic.minAffection;

        if (!canTalk) {
            alert(`체력이 부족합니다! (필요: ${actualStamina}, 현재: ${gameState.stamina})`);
            return;
        }

        if (!meetsRequirement) {
            alert(`호감도가 부족합니다! (필요: ${topic.minAffection}%, 현재: ${Math.round(gameState.affection)}%)`);
            return;
        }

        // 조건을 만족하면 selectTalkTopic 호출
        console.log('대화 주제 선택:', topic.name);
        window.selectTalkTopic(index);
    } catch (e) {
        alert('오류 발생: ' + e.message);
        console.error(e);
    }
};

window.selectTalkTopic = function(index) {
    const topic = window.currentTopics[index];

    // 대화 전체 횟수 계산 (증가는 finishMultiStage에서)
    const actionKey = 'talk';
    const talkCount = (gameState.dailyActionCounts[actionKey] || 0) + 1;

    // 대화 횟수에 따라 체력 배수 증가 (1번째: 1배, 2번째: 2배, 3번째: 3배...)
    let staminaCost = topic.stamina * talkCount;

    if (gameState.stamina < staminaCost) {
        alert('체력이 부족합니다!');
        return;
    }

    gameState.stamina -= staminaCost;

    // 사용한 시나리오 추적
    const topicKey = topic.id;

    // usedScenarios.talk 초기화 확인
    if (!gameState.usedScenarios) {
        gameState.usedScenarios = {};
    }
    if (!gameState.usedScenarios.talk) {
        gameState.usedScenarios.talk = {};
    }

    // 해당 토픽의 사용한 시나리오 배열 확인 및 초기화
    if (!Array.isArray(gameState.usedScenarios.talk[topicKey])) {
        gameState.usedScenarios.talk[topicKey] = [];
    }

    // 사용하지 않은 시나리오만 필터링
    const usedIds = gameState.usedScenarios.talk[topicKey];
    const availableScenarios = topic.scenarios.filter(s => !usedIds.includes(s.id));

    // 모든 시나리오를 다 사용했다면 리셋
    const scenariosToUse = availableScenarios.length > 0 ? availableScenarios : topic.scenarios;
    if (availableScenarios.length === 0) {
        gameState.usedScenarios.talk[topicKey] = [];
    }

    // 다단계 대화 시스템: 3-4개의 대화 시나리오 선택
    const scenarioCount = Math.min(4, scenariosToUse.length);
    const shuffled = [...scenariosToUse].sort(() => Math.random() - 0.5);
    const selectedScenarios = shuffled.slice(0, scenarioCount);

    // 사용한 시나리오 ID 기록
    selectedScenarios.forEach(s => {
        if (!gameState.usedScenarios.talk[topicKey].includes(s.id)) {
            gameState.usedScenarios.talk[topicKey].push(s.id);
        }
    });

    // 다단계 액션 상태 초기화
    gameState.multiStage = {
        type: 'talk',
        location: topic,
        scenarios: selectedScenarios,
        currentIndex: 0,
        totalAffection: 0,
        totalTrust: 0
    };

    closeModal('action-modal');
    showMultiStageScenario();
};

// ============================================
// 시나리오 시스템
// ============================================
function showScenario(scenario, sourceData, actionType) {
    // window 변수들을 먼저 설정
    window.currentScenarioChoices = scenario.choices;
    window.currentScenarioSource = sourceData;
    window.currentScenarioType = actionType;

    const html = `
        <div class="modal-content">
            <div class="modal-header">
                <h2></h2>
                <button class="close-btn" onclick="closeModal('action-modal')">✕</button>
            </div>
            <div class="modal-body">
                <p>${scenario.situation}</p>
                ${scenario.choices.map((choice, idx) => `
                    <button class="choice-option-btn" onclick="window.selectScenarioChoice(${idx})">
                        <span class="choice-number">${idx + 1}.</span>
                        <span class="choice-text">${choice.text}</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    let modal = document.getElementById('action-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'action-modal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }

    modal.innerHTML = html;
    showModal('action-modal');
}

window.selectScenarioChoice = function(index) {
    const choice = window.currentScenarioChoices[index];
    const sourceData = window.currentScenarioSource;
    const actionType = window.currentScenarioType;

    let affectionGain = choice.affection || 0;
    let trustGain = choice.trust || 0;

    if (actionType === 'date') {
        affectionGain += sourceData.baseAffection;
        trustGain += sourceData.baseTrust;
    } else if (actionType === 'talk') {
        affectionGain += sourceData.baseAffection;
        trustGain += sourceData.baseTrust;
    }

    // 하루 액션 카운트 증가
    gameState.dailyActionCount++;

    // 반복 행동 추적 및 추가 체력 소모
    const actionKey = actionType === 'date' ? 'date' : 'talk';
    gameState.dailyActionCounts[actionKey]++;
    const repeatCount = gameState.dailyActionCounts[actionKey];

    // 반복 횟수에 따라 추가 체력 소모 (500%씩 증가 - 1번째: 기본, 2번째: 6배, 3번째: 11배)
    let staminaCost = sourceData.stamina;
    if (repeatCount > 1) {
        staminaCost = Math.round(sourceData.stamina * (1 + (repeatCount - 1) * 5.0));
    }
    gameState.stamina -= staminaCost;

    // 난이도 배수 적용 (전역 배수 * 캐릭터별 배수)
    let difficultyMult = GLOBAL_DIFFICULTY_MULTIPLIER * getDifficultyMultiplier();

    // 대화는 추가로 40%만 적용 (데이트보다 훨씬 낮은 효과 - 60%에서 40%로 감소)
    if (actionType === 'talk') {
        difficultyMult *= 0.4;
    }

    affectionGain = Math.round(affectionGain * difficultyMult);
    trustGain = Math.round(trustGain * difficultyMult);

    const preference = getPreferenceMultiplier(sourceData.id, actionType, choice.type);
    affectionGain = Math.round(affectionGain * preference);
    trustGain = Math.round(trustGain * preference);

    const bioMultiplier = getBiorhythmMultiplier();
    affectionGain = Math.round(affectionGain * bioMultiplier);
    trustGain = Math.round(trustGain * bioMultiplier);

    if (choice.successRate !== undefined) {
        if (Math.random() > choice.successRate) {
            affectionGain = Math.round(affectionGain * 0.3);
            trustGain = Math.round(trustGain * 0.3);
        }
    }

    gameState.affection += affectionGain;
    gameState.trust += trustGain;
    gameState.lastInteraction = gameState.day;

    if (actionType === 'date') {
        recordActivity('date', '💑');
    } else if (actionType === 'talk') {
        recordActivity('talk', '💬');
    }

    closeModal('action-modal');
    showResult(choice.text, affectionGain, trustGain);

    checkDayEnd();
};

// ============================================
// 다단계 시나리오 시스템
// ============================================
function showMultiStageScenario() {
    if (!gameState.multiStage || gameState.multiStage.currentIndex >= gameState.multiStage.scenarios.length) {
        // 모든 시나리오 완료
        finishMultiStage();
        return;
    }

    const { scenarios, currentIndex, location } = gameState.multiStage;
    const scenario = scenarios[currentIndex];
    const progress = `[${currentIndex + 1}/${scenarios.length}]`;

    const html = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${location.name} ${progress}</h2>
                <button class="close-btn" onclick="window.closeMultiStageModal()">✕</button>
            </div>
            <div class="modal-body">
                <p>${scenario.situation}</p>
                ${scenario.choices.map((choice, idx) => `
                    <button class="choice-option-btn" onclick="window.selectMultiStageChoice(${idx})">
                        <span class="choice-number">${idx + 1}.</span>
                        <span class="choice-text">${choice.text}</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    let modal = document.getElementById('action-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'action-modal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }

    modal.innerHTML = html;
    showModal('action-modal');
}

window.selectMultiStageChoice = function(index) {
    const { scenarios, currentIndex, location, type } = gameState.multiStage;
    const scenario = scenarios[currentIndex];
    const choice = scenario.choices[index];

    let affectionGain = choice.affection || 0;
    let trustGain = choice.trust || 0;

    // 기본 효과 추가
    affectionGain += location.baseAffection;
    trustGain += location.baseTrust;

    // 난이도 배수 적용
    let difficultyMult = GLOBAL_DIFFICULTY_MULTIPLIER * getDifficultyMultiplier();

    // 대화는 40%만 적용
    if (type === 'talk') {
        difficultyMult *= 0.4;
    }

    affectionGain = Math.round(affectionGain * difficultyMult);
    trustGain = Math.round(trustGain * difficultyMult);

    // 선호도 배수 (주제 + 대화 타입)
    const preference = getPreferenceMultiplier(location.id, type, choice.type);
    affectionGain = Math.round(affectionGain * preference);
    trustGain = Math.round(trustGain * preference);

    // 바이오리듬
    const bioMultiplier = getBiorhythmMultiplier();
    affectionGain = Math.round(affectionGain * bioMultiplier);
    trustGain = Math.round(trustGain * bioMultiplier);

    // 성공률 체크
    if (choice.successRate !== undefined) {
        if (Math.random() > choice.successRate) {
            affectionGain = Math.round(affectionGain * 0.3);
            trustGain = Math.round(trustGain * 0.3);
        }
    }

    // 멘탈 감소 로직 (안 좋은 반응을 받았을 때)
    if (affectionGain < 0 || trustGain < 0) {
        const totalNegative = Math.abs(Math.min(0, affectionGain)) + Math.abs(Math.min(0, trustGain));
        const mentalLoss = Math.round(totalNegative * 0.8);  // 부정적 반응에 비례해서 멘탈 감소
        gameState.mental -= mentalLoss;
    }

    // 누적
    gameState.multiStage.totalAffection += affectionGain;
    gameState.multiStage.totalTrust += trustGain;
    gameState.multiStage.currentIndex++;

    closeModal('action-modal');

    // 중간 결과 표시 후 다음 단계로
    const isLast = gameState.multiStage.currentIndex >= scenarios.length;
    if (isLast) {
        showMultiStageResult(choice.text, affectionGain, trustGain, true);
    } else {
        showMultiStageResult(choice.text, affectionGain, trustGain, false);
    }
};

function showMultiStageResult(choiceText, affectionGain, trustGain, isLast) {
    // 기존 결과 모달 제거
    const existingModal = document.getElementById('multi-stage-result-modal');
    if (existingModal) {
        existingModal.remove();
    }

    const resultModal = document.createElement('div');
    resultModal.id = 'multi-stage-result-modal';
    resultModal.className = 'modal active';
    resultModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${isLast ? '데이트 결과' : '진행 중...'}</h2>
            </div>
            <div class="modal-body">
                <p><strong>${choiceText}</strong></p>
                <div class="result-stats">
                    <div class="result-stat">
                        <span>호감도</span>
                        <span class="stat-change ${affectionGain >= 0 ? 'positive' : 'negative'}">
                            ${affectionGain >= 0 ? '+' : ''}${affectionGain}
                        </span>
                    </div>
                    <div class="result-stat">
                        <span>신뢰도</span>
                        <span class="stat-change ${trustGain >= 0 ? 'positive' : 'negative'}">
                            ${trustGain >= 0 ? '+' : ''}${trustGain}
                        </span>
                    </div>
                </div>
                <button class="menu-btn" onclick="window.continueMultiStage()">${isLast ? '확인' : '계속하기'}</button>
            </div>
        </div>
    `;
    document.body.appendChild(resultModal);
}

window.continueMultiStage = function() {
    // 결과 모달 제거
    const resultModal = document.getElementById('multi-stage-result-modal');
    if (resultModal) {
        resultModal.remove();
    }

    if (gameState.multiStage && gameState.multiStage.currentIndex < gameState.multiStage.scenarios.length) {
        // 다음 시나리오로
        showMultiStageScenario();
    } else {
        // 모든 시나리오 완료
        finishMultiStage();
    }
};

window.closeMultiStageModal = function() {
    if (confirm('데이트를 중단하시겠습니까?')) {
        finishMultiStage();
        closeModal('action-modal');
    }
};

function finishMultiStage() {
    if (!gameState.multiStage) return;

    let { totalAffection, totalTrust, type } = gameState.multiStage;

    // 기념일 보너스 적용
    if (gameState.todayIsAnniversary) {
        const originalAff = totalAffection;
        const originalTrust = totalTrust;
        totalAffection = Math.round(totalAffection * 1.5);
        totalTrust = Math.round(totalTrust * 1.5);
        gameState.anniversaryCelebrated = true;

        const bonusType = gameState.anniversaryType === 'birthday' ? '🎂 생일' : '💕 기념일';
        setTimeout(() => {
            alert(`${bonusType} 보너스! 효과가 1.5배로 증가했습니다! (+${totalAffection - originalAff} 호감도, +${totalTrust - originalTrust} 신뢰도)`);
        }, 500);
    }

    // 액션 카운트 증가 (여기서 한 번만)
    gameState.dailyActionCount++;
    const actionKey = type === 'date' ? 'date' : 'talk';
    gameState.dailyActionCounts[actionKey]++;

    // 최종 효과 적용
    gameState.affection += totalAffection;
    gameState.trust += totalTrust;
    gameState.lastInteraction = gameState.day;

    if (type === 'date') {
        recordActivity('date', '💑');
    } else if (type === 'talk') {
        recordActivity('talk', '💬');
    }

    // 다단계 상태 초기화
    gameState.multiStage = null;

    updateAllUI();
    checkDayEnd();
}

function getPreferenceMultiplier(itemId, actionType, choiceType) {
    if (!gameState.character.preferences) return 1.0;

    let multiplier = 1.0;

    if (actionType === 'date') {
        multiplier = gameState.character.preferences.dates[itemId] || 1.0;
    } else if (actionType === 'talk') {
        multiplier = gameState.character.preferences.talks[itemId] || 1.0;
    }

    // 대화 타입 선호도 추가 적용
    if (actionType === 'talk' && choiceType && gameState.character.talkTypePreferences) {
        const typeMultiplier = gameState.character.talkTypePreferences[choiceType] || 1.0;
        multiplier *= typeMultiplier;
    }

    return multiplier;
}

function getBiorhythmMultiplier() {
    if (gameState.biorhythm === 'period') {
        return 0.5;
    }
    return 1.0;
}

// 캐릭터별 난이도 배수 반환
function getDifficultyMultiplier() {
    if (!gameState.character || !gameState.character.difficultyMultiplier) {
        return 1.0;
    }
    return gameState.character.difficultyMultiplier;
}

// 시나리오 선택지 효과에 난이도 배수 적용 (0.35배로 전역 감소 - 더욱 어렵게)
const GLOBAL_DIFFICULTY_MULTIPLIER = 0.35;

// ============================================
// 스킨십 시스템
// ============================================
function showSkinshipMenu() {
    // 하루 액션 제한 체크
    if (gameState.dailyActionCount >= 3) {
        alert('오늘은 더 이상 행동할 수 없습니다! 휴식을 취하세요.');
        return;
    }

    const skinshipOptions = Object.values(SKINSHIP_OPTIONS);

    // window.currentSkinshipOptions를 먼저 설정
    window.currentSkinshipOptions = skinshipOptions;

    const html = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>💕 스킨십</h2>
                <button class="close-btn" onclick="closeModal('action-modal')">✕</button>
            </div>
            <div class="modal-body">
                <p>어떤 스킨십을 시도하시겠어요?</p>
                <p style="font-size: 0.85rem; color: #ffaa00; margin-bottom: 15px;">
                    ⚠️ 호감도가 낮으면 거절당할 수 있습니다!<br>
                    거절 시: 체력 -10, 호감도 -10, 신뢰도 -15, 멘탈 -20
                </p>
                ${skinshipOptions.map((skinship, idx) => {
                    const canTry = gameState.affection >= skinship.minAffection &&
                                   gameState.stamina >= skinship.stamina &&
                                   (!skinship.money || gameState.money >= skinship.money);
                    const meetsAffection = gameState.affection >= skinship.minAffection;
                    const disabled = canTry ? '' : 'disabled';

                    let requirementText = `필요 호감도: ${skinship.minAffection}`;
                    if (!meetsAffection) {
                        requirementText = `❌ ${requirementText} (현재: ${gameState.affection})`;
                    }

                    return `
                        <div class="action-option ${disabled}" onclick="${canTry ? `window.attemptSkinship(${idx})` : ''}">
                            <div class="option-icon">${skinship.icon}</div>
                            <div class="option-info">
                                <div class="option-name">${skinship.name}</div>
                                <div class="option-desc">${skinship.description}</div>
                                <div class="option-cost">
                                    ⚡ ${skinship.stamina}
                                    ${skinship.money ? `💰 ${formatMoney(skinship.money)}` : ''}
                                </div>
                                <div class="option-requirement" style="font-size: 0.85rem; color: ${meetsAffection ? '#44ff88' : '#ff4444'};">
                                    ${requirementText}
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;

    let modal = document.getElementById('action-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'action-modal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }

    modal.innerHTML = html;
    showModal('action-modal');
}

window.attemptSkinship = function(index) {
    const skinship = window.currentSkinshipOptions[index];

    if (gameState.affection < skinship.minAffection) {
        alert(`호감도가 부족합니다! (필요: ${skinship.minAffection}, 현재: ${gameState.affection})`);
        return;
    }

    if (gameState.stamina < skinship.stamina) {
        alert('체력이 부족합니다!');
        return;
    }

    if (skinship.money && gameState.money < skinship.money) {
        alert('돈이 부족합니다!');
        return;
    }

    closeModal('action-modal');

    // 성공 확률 계산 - 호감도가 높을수록 성공률 증가
    let successChance = skinship.successRate;
    const affectionOver = gameState.affection - skinship.minAffection;
    successChance += (affectionOver / 100) * 0.3;  // 호감도 10당 3% 증가
    successChance = Math.min(successChance, 0.95);  // 최대 95%

    // 성공 여부 판정
    const isSuccess = Math.random() < successChance;

    gameState.stamina -= skinship.stamina;
    if (skinship.money) {
        gameState.money -= skinship.money;
    }
    gameState.dailyActionCount++;

    if (isSuccess) {
        // 성공!
        let affectionGain = skinship.baseAffection;
        let trustGain = skinship.baseTrust;

        // 난이도 적용
        const difficultyMult = GLOBAL_DIFFICULTY_MULTIPLIER * getDifficultyMultiplier();
        affectionGain = Math.round(affectionGain * difficultyMult);
        trustGain = Math.round(trustGain * difficultyMult);

        // 바이오리듬 적용
        const bioMultiplier = getBiorhythmMultiplier();
        affectionGain = Math.round(affectionGain * bioMultiplier);
        trustGain = Math.round(trustGain * bioMultiplier);

        gameState.affection += affectionGain;
        gameState.trust += trustGain;
        gameState.lastInteraction = gameState.day;

        recordActivity('skinship', skinship.icon);

        showResult(`💕 ${skinship.name} 성공!`, affectionGain, trustGain);
    } else {
        // 실패...
        gameState.stamina -= 10;  // 추가 체력 손실
        gameState.affection -= 10;
        gameState.trust -= 15;
        gameState.mental -= 20;  // 멘탈 감소 (거절로 인한 정신적 충격)

        alert(`💔 ${gameState.character.fullName}이(가) 거부했습니다...\n\n체력 -10, 호감도 -10, 신뢰도 -15, 멘탈 -20\n\n너무 성급했나봅니다. 호감도를 더 높인 후 시도하세요!`);
    }

    updateAllUI();
};

// ============================================
// 알바 & 휴식
// ============================================
function doWork() {
    showWorkMenu();
}

function showWorkMenu() {
    const workOptions = Object.values(WORK_OPTIONS);

    // window.currentWorkOptions를 먼저 설정
    window.currentWorkOptions = workOptions;

    const html = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>💰 돈 벌기</h2>
                <button class="close-btn" onclick="closeModal('action-modal')">✕</button>
            </div>
            <div class="modal-body">
                <p>어떤 방법으로 돈을 벌까요?</p>
                ${workOptions.map((work, idx) => {
                    const canWork = gameState.stamina >= work.stamina;
                    let moneyText = '';
                    if (work.money) {
                        moneyText = `💰 ${formatMoney(work.money)}`;
                    } else if (work.minMoney) {
                        moneyText = `💰 ${formatMoney(work.minMoney)}~${formatMoney(work.maxMoney)}`;
                    } else if (work.investMin) {
                        moneyText = `💰 투자금 ${formatMoney(work.investMin)}~${formatMoney(work.investMax)}`;
                    }

                    const disabled = canWork ? '' : 'disabled';
                    return `
                        <div class="action-option ${disabled}" onclick="${canWork ? `window.selectWorkOption(${idx})` : ''}">
                            <div class="option-icon">${work.icon}</div>
                            <div class="option-info">
                                <div class="option-name">${work.name}</div>
                                <div class="option-desc">${work.description}</div>
                                <div class="option-cost">
                                    ⚡ ${work.stamina} ${moneyText}
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;

    let modal = document.getElementById('action-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'action-modal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }

    modal.innerHTML = html;
    showModal('action-modal');
}

window.selectWorkOption = function(index) {
    const work = window.currentWorkOptions[index];

    if (gameState.stamina < work.stamina) {
        alert('체력이 부족합니다!');
        return;
    }

    closeModal('action-modal');

    // 주식 투자는 특별 처리
    if (work.id === 'stock') {
        showStockInvestment(work);
        return;
    }

    // 프리랜서는 랜덤 수익
    let earnedMoney = work.money;
    if (work.minMoney) {
        earnedMoney = Math.floor(Math.random() * (work.maxMoney - work.minMoney + 1)) + work.minMoney;
    }

    gameState.stamina -= work.stamina;
    gameState.money += earnedMoney;
    gameState.workCount++;

    recordActivity('work', work.icon);

    showResult(`${work.name}을(를) 마쳤습니다!`, 0, 0, `+${formatMoney(earnedMoney)}`);
    updateAllUI();
};

function showStockInvestment(work) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'stock-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>📈 주식 투자</h2>
            </div>
            <div class="modal-body">
                <p>투자할 금액을 선택하세요:</p>
                <p style="font-size: 0.9rem; color: #ffaa00;">⚠️ 손실 가능: -50% ~ +100%</p>
                <p style="font-size: 0.85rem; color: #aaa; margin-top: 5px;">현재 보유 자금: ${formatMoney(gameState.money)}</p>
                <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 20px;">
                    <button class="menu-btn" onclick="${gameState.money >= 50000 ? 'window.executeStock(50000)' : 'window.warnInsufficientFunds(50000)'}" ${gameState.money >= 50000 ? '' : 'style="opacity: 0.6;"'}>
                        5만원 투자 ${gameState.money >= 50000 ? '' : '(자금 부족)'}
                    </button>
                    <button class="menu-btn" onclick="${gameState.money >= 100000 ? 'window.executeStock(100000)' : 'window.warnInsufficientFunds(100000)'}" ${gameState.money >= 100000 ? '' : 'style="opacity: 0.6;"'}>
                        10만원 투자 ${gameState.money >= 100000 ? '' : '(자금 부족)'}
                    </button>
                    <button class="menu-btn" onclick="${gameState.money >= 200000 ? 'window.executeStock(200000)' : 'window.warnInsufficientFunds(200000)'}" ${gameState.money >= 200000 ? '' : 'style="opacity: 0.6;"'}>
                        20만원 투자 ${gameState.money >= 200000 ? '' : '(자금 부족)'}
                    </button>
                    <button class="menu-btn" onclick="window.closeStockModal()">취소</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

window.warnInsufficientFunds = function(requiredAmount) {
    const shortage = requiredAmount - gameState.money;
    alert(`자금이 부족합니다!\n필요 금액: ${formatMoney(requiredAmount)}\n현재 보유: ${formatMoney(gameState.money)}\n부족 금액: ${formatMoney(shortage)}`);
};

window.executeStock = function(investment) {
    if (gameState.money < investment) {
        alert('돈이 부족합니다!');
        return;
    }

    // 주식 결과: -50% ~ +100%
    const result = (Math.random() * 1.5) - 0.5;  // -0.5 ~ +1.0
    const profit = Math.floor(investment * result);

    gameState.money -= investment;
    gameState.money += investment + profit;
    gameState.stamina -= 15;
    gameState.workCount++;

    recordActivity('work', '📈');

    closeStockModal();

    if (profit > 0) {
        showResult(`📈 주식 투자 성공!`, 0, 0, `+${formatMoney(profit)} (${Math.round(result * 100)}%)`);
    } else {
        // 주식 실패 시 멘탈 감소 (손실액에 비례)
        const mentalLoss = Math.min(20, Math.floor(Math.abs(profit) / 5000));
        gameState.mental -= mentalLoss;
        showResult(`📉 주식 투자 실패...`, 0, 0, `${formatMoney(profit)} (${Math.round(result * 100)}%), 🧠-${mentalLoss}`);
    }
    updateAllUI();
};

window.closeStockModal = function() {
    const modal = document.getElementById('stock-modal');
    if (modal) {
        modal.remove();
    }
};

function doRest() {
    showRestMenu();
}

function showRestMenu() {
    const html = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>😴 휴식하기</h2>
                <button class="close-btn" onclick="closeModal('rest-modal')">✕</button>
            </div>
            <div class="modal-body">
                <p>어떻게 휴식을 취하시겠습니까?</p>
                <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 20px;">
                    <div class="action-option" onclick="window.selectRestOption('sleep')">
                        <div class="option-icon">🛏️</div>
                        <div class="option-info">
                            <div class="option-name">잠자기</div>
                            <div class="option-desc">푹 자고 일어나면 내일이 됩니다</div>
                            <div class="action-gain">⚡ 체력 +80, 🧠 멘탈 +5</div>
                        </div>
                    </div>
                    <div class="action-option" onclick="window.selectRestOption('game')">
                        <div class="option-icon">🎮</div>
                        <div class="option-info">
                            <div class="option-name">게임하기</div>
                            <div class="option-desc">게임을 하며 스트레스를 풉니다</div>
                            <div class="action-cost">⚡ 체력 -20</div>
                            <div class="action-gain">🧠 멘탈 +50</div>
                        </div>
                    </div>
                    <div class="action-option" onclick="window.selectRestOption('exercise')">
                        <div class="option-icon">🏃</div>
                        <div class="option-info">
                            <div class="option-name">운동하기</div>
                            <div class="option-desc">가볍게 운동하며 기분전환을 합니다</div>
                            <div class="action-cost">⚡ 체력 -30</div>
                            <div class="action-gain">🧠 멘탈 +40, 💪 건강 증진</div>
                        </div>
                    </div>
                    <div class="action-option" onclick="window.selectRestOption('meditation')">
                        <div class="option-icon">🧘</div>
                        <div class="option-info">
                            <div class="option-name">명상하기</div>
                            <div class="option-desc">마음을 가라앉히고 명상합니다</div>
                            <div class="action-cost">⚡ 체력 -10</div>
                            <div class="action-gain">🧠 멘탈 +35</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    let modal = document.getElementById('rest-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'rest-modal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }

    modal.innerHTML = html;
    showModal('rest-modal');
}

window.selectRestOption = function(option) {
    closeModal('rest-modal');

    switch(option) {
        case 'sleep':
            gameState.stamina = Math.min(100, gameState.stamina + 80);
            gameState.mental = Math.min(100, gameState.mental + 5);
            recordActivity('rest', '😴');
            showResult('푹 쉬었습니다. 내일이 되었습니다.', 0, 0, '⚡+80, 🧠+5');
            nextDay();
            break;

        case 'game':
            if (gameState.stamina < 20) {
                alert('체력이 부족합니다! (필요: 20)');
                return;
            }
            gameState.stamina -= 20;
            gameState.mental = Math.min(100, gameState.mental + 50);
            recordActivity('rest', '🎮');
            showResult('게임을 하며 스트레스를 풀었습니다!', 0, 0, '⚡-20, 🧠+50');
            break;

        case 'exercise':
            if (gameState.stamina < 30) {
                alert('체력이 부족합니다! (필요: 30)');
                return;
            }
            gameState.stamina -= 30;
            gameState.mental = Math.min(100, gameState.mental + 40);
            recordActivity('rest', '🏃');
            showResult('운동을 하며 기분전환을 했습니다!', 0, 0, '⚡-30, 🧠+40');
            break;

        case 'meditation':
            if (gameState.stamina < 10) {
                alert('체력이 부족합니다! (필요: 10)');
                return;
            }
            gameState.stamina -= 10;
            gameState.mental = Math.min(100, gameState.mental + 35);
            recordActivity('rest', '🧘');
            showResult('명상을 통해 마음의 평온을 찾았습니다.', 0, 0, '⚡-10, 🧠+35');
            break;
    }

    updateAllUI();
};

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

function clearAllTimeouts() {
    pendingTimeouts.forEach(id => clearTimeout(id));
    pendingTimeouts = [];
}

// ============================================
// 다음 날
// ============================================
function checkDayEnd() {
}

function nextDay() {
    gameState.day++;
    gameState.dDay--;
    gameState.workCount = 0;
    gameState.stamina = 80;  // 체력 80으로만 회복

    // 하루 액션 카운터 리셋
    gameState.dailyActionCount = 0;
    gameState.dailyActionCounts = {date: 0, gift: 0, talk: 0};

    updateBiorhythm();
    checkNeglect();
    checkAnniversary();

    if (Math.random() < 0.25 && gameState.day > 3) {
        triggerCrisisEvent();
        return;
    }

    addHistory();

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

        let penalty = neglectPenalty;
        if (gameState.character.traits.neglectPenalty) {
            penalty = gameState.character.traits.neglectPenalty * (daysSinceInteraction - 3);
        }

        gameState.affection -= penalty;
        alert(`😢 ${gameState.character.fullName}이(가) 서운해합니다... (-${penalty} 호감도)`);
    }
}

function checkAnniversary() {
    // 이전 기념일에서 축하하지 않았으면 페널티
    if (gameState.todayIsAnniversary && !gameState.anniversaryCelebrated) {
        gameState.affection -= 15;
        gameState.trust -= 10;
        alert(`💔 기념일을 챙기지 않아 ${gameState.character.fullName}이(가) 섭섭해합니다... (-15 호감도, -10 신뢰도)`);
    }

    // 새로운 날의 기념일 체크
    gameState.todayIsAnniversary = false;
    gameState.anniversaryCelebrated = false;
    gameState.anniversaryType = null;

    // 7일마다 만남 기념일
    if (gameState.day % 7 === 0 && gameState.day <= 28) {
        gameState.todayIsAnniversary = true;
        gameState.anniversaryType = 'meeting';
        const weeks = gameState.day / 7;
        alert(`💕 오늘은 만난 지 ${weeks}주 기념일입니다! 특별한 데이트나 선물로 마음을 전해보세요!`);
    }

    // 생일 체크 (게임 시작 날짜 기준)
    if (gameState.startDate && gameState.character.birthday) {
        const currentDate = new Date(gameState.startDate);
        currentDate.setDate(currentDate.getDate() + gameState.day - 1);

        const birthdayThisYear = new Date(currentDate.getFullYear(),
                                          gameState.character.birthday.month - 1,
                                          gameState.character.birthday.day);

        if (currentDate.getMonth() === gameState.character.birthday.month - 1 &&
            currentDate.getDate() === gameState.character.birthday.day) {
            gameState.todayIsAnniversary = true;
            gameState.anniversaryType = 'birthday';
            alert(`🎂 오늘은 ${gameState.character.fullName}의 생일입니다! 축하해주세요!`);
        }
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

    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, width, height);

    const padding = 40;
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;

    for (let i = 0; i <= 4; i++) {
        const y = padding + (graphHeight / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText((100 - i * 25) + '%', padding - 10, y + 4);
    }

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

        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Day ' + (i + 1), x, height - padding + 20);
    }

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

    const affectionData = history.map(h => h.affection);
    drawLine(affectionData, '#ff69b4', '호감도');

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

    // 프로포즈 엔딩이므로 큰 이미지 표시
    showEnding(endingType, title, message, true);
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

function showMentalGameOver() {
    const endingType = 'gameover';
    const title = '😵 게임 오버 - 멘탈 붕괴';
    const message = `정신적으로 너무 힘들어서 더 이상 관계를 이어갈 수 없게 되었습니다...\n\n데이트 거절, 안 좋은 반응, 스킨십 거절 등으로 인한 스트레스가 쌓여 멘탈이 무너졌습니다.\n\n휴식을 취하며 멘탈을 관리하는 것도 중요합니다!`;

    showEnding(endingType, title, message);
}

function showEnding(type, title, message, isProposal = false) {
    document.getElementById('ending-title').textContent = title;
    document.getElementById('ending-message').textContent = message;
    document.getElementById('final-affection').textContent = Math.round(gameState.affection) + '%';
    document.getElementById('final-days').textContent = gameState.day + '일';

    const endingImage = document.getElementById('ending-image');
    const baseImage = gameState.character.image.replace('-normal.jpg', '');

    // 트루엔딩 이상일 때 전용 이미지 사용
    if (type === 'perfect' || type === 'true') {
        endingImage.src = baseImage + '-true-ending.jpg';
    } else {
        endingImage.src = baseImage + '-unhappy.jpg';
    }

    // 이미지 로드 실패 시 폴백
    endingImage.onerror = function() {
        // 트루엔딩 이미지가 없으면 happy 이미지로 폴백
        if ((type === 'perfect' || type === 'true') && this.src.includes('-true-ending.jpg')) {
            this.src = baseImage + '-happy.jpg';
        } else {
            this.src = gameState.character.image;
        }
        this.onerror = null;
    };

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

    // 프로포즈 엔딩인 경우 큰 이미지 적용
    if (isProposal) {
        endingPortrait.classList.add('proposal-ending');
    } else {
        endingPortrait.classList.remove('proposal-ending');
    }

    showScreen('ending-screen');
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
    showRules();
}

function showGameMenu() {
    showModal('game-menu-modal');
}

// ============================================
// 신뢰도 정보 표시
// ============================================
function showTrustInfo() {
    const html = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>🤝 신뢰도란?</h2>
                <button class="close-btn" onclick="closeModal('trust-info-modal')">✕</button>
            </div>
            <div class="modal-body" style="text-align: left;">
                <div class="guide-section">
                    <h3>📊 신뢰도의 역할</h3>
                    <p>신뢰도는 상대방이 당신을 얼마나 믿고 의지하는지를 나타냅니다.</p>
                    <p>호감도만큼 중요한 지표이며, 다음과 같은 영향을 미칩니다:</p>
                </div>

                <div class="guide-section">
                    <h3>💍 프로포즈 성공률</h3>
                    <ul>
                        <li><strong>신뢰도 80% 이상</strong>: 프로포즈 성공 확률 매우 높음</li>
                        <li><strong>신뢰도 60-79%</strong>: 프로포즈 성공 가능</li>
                        <li><strong>신뢰도 60% 미만</strong>: 프로포즈 거절 위험</li>
                    </ul>
                    <p class="warning">⚠️ 호감도가 높아도 신뢰도가 낮으면 프로포즈가 거절될 수 있습니다!</p>
                </div>

                <div class="guide-section">
                    <h3>🎯 엔딩 판정</h3>
                    <ul>
                        <li><strong>퍼펙트 엔딩</strong>: 호감도 100% + 신뢰도 85% 이상</li>
                        <li><strong>트루 엔딩</strong>: 호감도 100% + 신뢰도 70% 이상</li>
                        <li><strong>굿 엔딩</strong>: 호감도 100% + 신뢰도 70% 미만</li>
                    </ul>
                    <p>신뢰도가 높을수록 더 좋은 엔딩을 볼 수 있습니다!</p>
                </div>

                <div class="guide-section">
                    <h3>💡 신뢰도 올리는 방법</h3>
                    <ul>
                        <li><strong>대화하기</strong>: 진솔하고 깊이 있는 대화 (특히 가치관, 미래)</li>
                        <li><strong>선물하기</strong>: 의미 있는 선물</li>
                        <li><strong>데이트</strong>: 진심 어린 데이트</li>
                        <li><strong>일관된 행동</strong>: 약속을 지키고 성실하게 대하기</li>
                    </ul>
                </div>
            </div>
            <div class="modal-footer">
                <button class="modal-btn" onclick="closeModal('trust-info-modal')">확인</button>
            </div>
        </div>
    `;

    let modal = document.getElementById('trust-info-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'trust-info-modal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }

    modal.innerHTML = html;
    showModal('trust-info-modal');
}

// 게임 중 도움말
// ============================================
function showInGameHelp() {
    const html = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>❓ 게임 도움말</h2>
                <button class="close-btn" onclick="closeModal('help-modal')">✕</button>
            </div>
            <div class="modal-body" style="text-align: left; max-height: 600px; overflow-y: auto;">
                <h3>🎯 게임 목표</h3>
                <p><strong>30일 안에 호감도를 올려 프로포즈를 성공시키세요!</strong></p>
                <ul>
                    <li><strong>호감도 %</strong> = 프로포즈 승낙 확률</li>
                    <li>호감도가 높을수록 데이트 수락 확률 증가</li>
                    <li>신뢰도가 높을수록 관계가 안정적</li>
                </ul>

                <h3>📊 자원 관리</h3>
                <ul>
                    <li><strong>💖 호감도</strong>: 프로포즈 성공 확률 (0-100%)</li>
                    <li><strong>🤝 신뢰도</strong>: 관계의 안정성 (0-100%)</li>
                    <li><strong>💰 돈</strong>: 데이트, 선물 구매에 필요</li>
                    <li><strong>⚡ 체력</strong>: 모든 행동에 필요, 0이 되면 하루가 끝남</li>
                </ul>

                <h3>⏰ 하루 행동 제한</h3>
                <ul>
                    <li><strong>하루 최대 3회</strong> 행동 가능 (대화/데이트/선물)</li>
                    <li>같은 행동 반복 시 <strong>체력 소모가 급증!</strong></li>
                    <ul>
                        <li>1번째: 기본 체력</li>
                        <li>2번째: <strong>6배</strong> 체력 소모</li>
                        <li>3번째: <strong>11배</strong> 체력 소모</li>
                    </ul>
                    <li>⚠️ <strong>같은 액션 반복은 사실상 불가능!</strong> 다양한 행동을 하세요</li>
                    <li>📌 <strong>대화 주제별로도 페널티 적용!</strong></li>
                    <ul>
                        <li>같은 주제로 대화하면 체력이 급증합니다</li>
                        <li>예: 일상 이야기 (10 체력) → 다시 일상 이야기 (60 체력!)</li>
                        <li>다양한 주제로 대화하세요 (8가지 주제 활용)</li>
                    </ul>
                    <li>체력이 0이 되면 자동으로 잠들기</li>
                    <li>휴식으로 체력 회복 (50 회복)</li>
                </ul>

                <h3>💰 돈 벌기</h3>
                <ul>
                    <li><strong>편의점 알바</strong>: 체력 25, 수익 5만원 (하루 3회)</li>
                    <li><strong>과외</strong>: 체력 35, 수익 10만원 (하루 2회)</li>
                    <li><strong>건설 일용직</strong>: 체력 55, 수익 15만원 (하루 1회)</li>
                    <li><strong>배달 아르바이트</strong>: 체력 45, 수익 12만원 (하루 2회)</li>
                    <li><strong>프리랜서</strong>: 체력 40, 수익 8-20만원 (변동)</li>
                    <li><strong>주식 투자</strong>: 체력 15, 수익 -50% ~ +100% (리스크 큼)</li>
                </ul>

                <h3>💔 데이트 거절</h3>
                <ul>
                    <li>호감도가 낮으면 데이트를 거절당할 수 있음</li>
                    <li>거절 시 <strong>체력 -50, 호감도 -8, 신뢰도 -5</strong> 큰 페널티!</li>
                    <li>호감도별 수락 확률 (엄격함):</li>
                    <ul>
                        <li>20% 미만: <strong>20%</strong> 확률 (거의 거절)</li>
                        <li>20-40%: <strong>40%</strong> 확률 (자주 거절)</li>
                        <li>40-60%: <strong>60%</strong> 확률 (반반)</li>
                        <li>60-80%: <strong>85%</strong> 확률 (가끔 거절)</li>
                        <li>80% 이상: <strong>100%</strong> 확률 (항상 수락)</li>
                    </ul>
                </ul>

                <h3>💕 스킨십</h3>
                <ul>
                    <li><strong>손 잡기</strong>: 호감도 30 이상 (성공률 90%)</li>
                    <li><strong>포옹하기</strong>: 호감도 50 이상 (성공률 80%)</li>
                    <li><strong>키스하기</strong>: 호감도 70 이상 (성공률 70%)</li>
                    <li><strong>1박2일 여행</strong>: 호감도 85 이상, 비용 100만원 (성공률 60%)</li>
                    <li>실패 시 <strong>체력 -10, 호감도 -10, 신뢰도 -15</strong></li>
                </ul>

                <h3>🎲 프로포즈</h3>
                <ul>
                    <li>30일째에 자동으로 프로포즈</li>
                    <li>다이아 반지가 있으면 <strong>+15% 보너스</strong></li>
                    <li>호감도가 승낙 확률을 결정</li>
                    <li>신뢰도가 높을수록 안정적인 성공</li>
                </ul>

                <h3>💡 팁</h3>
                <ul>
                    <li>다양한 행동을 하면 체력 소모가 적습니다</li>
                    <li>호감도와 신뢰도를 균형있게 올리세요</li>
                    <li>돈 관리를 잘 하세요 (데이트와 선물은 비쌉니다)</li>
                    <li>돌발 이벤트에서 신중하게 선택하세요</li>
                    <li>캐릭터마다 선호하는 데이트/선물이 다릅니다</li>
                </ul>
            </div>
        </div>
    `;

    let modal = document.getElementById('help-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'help-modal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }

    modal.innerHTML = html;
    showModal('help-modal');
}

// ============================================
// 돌발 상황 시스템
// ============================================
function triggerCrisisEvent() {
    // 사용하지 않은 이벤트만 필터링
    const availableEvents = CRISIS_EVENTS.filter(e => !gameState.usedScenarios.crisis.includes(e.id));

    // 모든 이벤트를 다 사용했다면 리셋
    const eventsToUse = availableEvents.length > 0 ? availableEvents : CRISIS_EVENTS;
    if (availableEvents.length === 0) {
        gameState.usedScenarios.crisis = [];
    }

    const event = eventsToUse[Math.floor(Math.random() * eventsToUse.length)];

    // 사용한 이벤트 ID 기록
    if (!gameState.usedScenarios.crisis.includes(event.id)) {
        gameState.usedScenarios.crisis.push(event.id);
    }

    // window.currentCrisisChoices와 window.currentCrisisEvent를 먼저 설정
    window.currentCrisisChoices = event.choices;
    window.currentCrisisEvent = event;

    const html = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>⚠️ 돌발 상황!</h2>
                <button class="close-btn" onclick="closeModal('action-modal')">✕</button>
            </div>
            <div class="modal-body">
                <p>${event.situation}</p>
                ${event.choices.map((choice, idx) => `
                    <button class="choice-option-btn" onclick="window.selectCrisisChoice(${idx})">
                        <span class="choice-number">${idx + 1}.</span>
                        <span class="choice-text">${choice.text}</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    let modal = document.getElementById('action-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'action-modal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }

    modal.innerHTML = html;
    showModal('action-modal');
}

window.selectCrisisChoice = function(index) {
    const choice = window.currentCrisisChoices[index];
    const event = window.currentCrisisEvent;

    let affectionChange = choice.affection || 0;
    let trustChange = choice.trust || 0;
    let moneyChange = choice.money || 0;

    // 난이도 배수 적용: 긍정적 효과는 감소, 부정적 효과는 증가
    const difficultyMult = GLOBAL_DIFFICULTY_MULTIPLIER * getDifficultyMultiplier();
    if (affectionChange > 0) {
        affectionChange = Math.round(affectionChange * difficultyMult);
    } else if (affectionChange < 0) {
        affectionChange = Math.round(affectionChange / difficultyMult); // 부정적 효과 증가
    }
    if (trustChange > 0) {
        trustChange = Math.round(trustChange * difficultyMult);
    } else if (trustChange < 0) {
        trustChange = Math.round(trustChange / difficultyMult); // 부정적 효과 증가
    }

    if (gameState.character.traits) {
        if (gameState.character.id === 'perfectionist' && (affectionChange < 0 || trustChange < 0)) {
            affectionChange = Math.round(affectionChange * 1.3);
            trustChange = Math.round(trustChange * 1.3);
        }
        if (gameState.character.id === 'tsundere' && affectionChange > 0) {
            affectionChange = Math.round(affectionChange * 1.2);
        }
    }

    gameState.affection += affectionChange;
    gameState.trust += trustChange;
    gameState.money += moneyChange;

    recordActivity('crisis', '⚠️');

    closeModal('action-modal');

    let resultMessage = choice.text;
    if (moneyChange !== 0) {
        resultMessage += `\n💰 ${moneyChange > 0 ? '+' : ''}${formatMoney(Math.abs(moneyChange))}`;
    }

    showResult(resultMessage, affectionChange, trustChange);

    addHistory();

    if (gameState.dDay <= 0 || gameState.affection <= 0) {
        endGame();
        return;
    }

    updateAllUI();
};

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
    updateMiniCalendar();
}

// ============================================
// 달력 시스템
// ============================================
function updateMiniCalendar() {
    const container = document.getElementById('calendar-display-grid');
    if (!container) return;

    container.innerHTML = '';

    for (let day = 1; day <= 30; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-display-day';

        const dayNumber = document.createElement('div');
        dayNumber.className = 'calendar-display-day-number';
        dayNumber.textContent = day;
        dayElement.appendChild(dayNumber);

        if (gameState.dailyActivities[day] && gameState.dailyActivities[day].length > 0) {
            const iconsDiv = document.createElement('div');
            iconsDiv.className = 'calendar-display-day-icons';

            const uniqueIcons = [...new Set(gameState.dailyActivities[day].map(a => a.icon))];
            uniqueIcons.slice(0, 4).forEach(icon => {
                const iconSpan = document.createElement('span');
                iconSpan.textContent = icon;
                iconSpan.title = '활동';
                iconsDiv.appendChild(iconSpan);
            });

            dayElement.appendChild(iconsDiv);
        }

        if (day === gameState.day) {
            dayElement.classList.add('today');
        } else if (day < gameState.day) {
            dayElement.classList.add('past');
        } else if (day > gameState.day) {
            dayElement.classList.add('future');
        }

        if (day <= gameState.day) {
            const currentDay = day;
            dayElement.onclick = function() {
                showDayDetail(currentDay);
            };
            dayElement.style.cursor = 'pointer';
        }

        container.appendChild(dayElement);
    }
}

function showCalendar() {
    const container = document.getElementById('calendar-container');
    container.innerHTML = '';

    const header = document.createElement('div');
    header.className = 'calendar-header';
    header.textContent = `${gameState.character.fullName}와의 30일`;
    container.appendChild(header);

    for (let day = 1; day <= 30; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';

        if (day === gameState.day) {
            dayElement.classList.add('today');
        } else if (day > gameState.day) {
            dayElement.classList.add('future');
        }

        const dayNumber = document.createElement('div');
        dayNumber.className = 'calendar-day-number';
        dayNumber.textContent = day;
        dayElement.appendChild(dayNumber);

        if (gameState.dailyActivities[day]) {
            const activitiesDiv = document.createElement('div');
            activitiesDiv.className = 'calendar-day-activities';

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

        if (day <= gameState.day) {
            const currentDay = day;
            dayElement.onclick = function() {
                showDayDetail(currentDay);
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
        clearAllTimeouts();

        try {
            localStorage.clear();
        } catch (error) {
            console.warn('localStorage 삭제 실패:', error);
        }

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
