// ============================================
// 게임 상태
// ============================================
let gameState = {
    character: null,
    affection: 50,
    trust: 30,
    money: 300000,  // 초기 자금 30만원으로 감소
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

    addHistory();
    initGameScreen();
    showScreen('game-screen');

    const dialogueText = document.getElementById('dialogue-text');
    dialogueText.textContent = '무엇을 할까요?';
    dialogueText.style.color = '';
    dialogueText.style.fontWeight = '';

    updateAllUI();

    const timeoutId = setTimeout(() => {
        showFirstMeetingScenario(characterId);
    }, 500);
    pendingTimeouts.push(timeoutId);
}

function showFirstMeetingScenario(characterId) {
    const scenario = FIRST_MEETING_SCENARIOS[characterId];
    if (!scenario) return;

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

    window.currentFirstMeetingChoices = scenario.choices;

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
        <button class="action-choice-btn" id="action-work" onclick="doWork()">
            <div class="action-icon">💼</div>
            <div class="action-info"><div class="action-name">알바하기</div></div>
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
    const locations = Object.values(DATE_LOCATIONS);

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

    window.currentDateLocations = locations;

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

    gameState.money -= location.cost;
    gameState.stamina -= location.stamina;

    const scenario = location.scenarios[Math.floor(Math.random() * location.scenarios.length)];

    closeModal('action-modal');
    showScenario(scenario, location, 'date');
}

// ============================================
// 선물 시스템
// ============================================
function showGiftMenu() {
    const gifts = Object.values(GIFT_ITEMS);

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

    window.currentGifts = gifts;

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
    gameState.stamina -= gift.stamina;

    // 난이도 배수 적용 (전역 배수 * 캐릭터별 배수)
    const difficultyMult = GLOBAL_DIFFICULTY_MULTIPLIER * getDifficultyMultiplier();
    const preference = gameState.character.preferences.gifts[gift.id] || 1.0;
    const affectionGain = Math.round(gift.baseAffection * difficultyMult * preference * getBiorhythmMultiplier());
    const trustGain = Math.round(gift.baseTrust * difficultyMult * preference * getBiorhythmMultiplier());

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
    const topics = Object.values(TALK_TOPICS);

    const html = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>대화 주제 선택</h2>
                <button class="close-btn" onclick="closeModal('action-modal')">✕</button>
            </div>
            <div class="modal-body">
                <p>무엇에 대해 이야기할까요?</p>
                ${topics.map((topic, idx) => {
                    const canTalk = gameState.stamina >= topic.stamina;
                    const meetsRequirement = !topic.minAffection || gameState.affection >= topic.minAffection;
                    const disabled = (canTalk && meetsRequirement) ? '' : 'disabled';
                    return `
                        <div class="action-option ${disabled}" onclick="${(canTalk && meetsRequirement) ? `selectTalkTopic(${idx})` : ''}">
                            <div class="option-icon">${topic.icon}</div>
                            <div class="option-info">
                                <div class="option-name">${topic.name}</div>
                                <div class="option-desc">${topic.description}</div>
                                <div class="option-cost">⚡ ${topic.stamina}</div>
                                ${topic.minAffection ? `<div class="option-requirement">호감도 ${topic.minAffection} 필요</div>` : ''}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;

    window.currentTopics = topics;

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

function selectTalkTopic(index) {
    const topic = window.currentTopics[index];

    if (gameState.stamina < topic.stamina) {
        alert('체력이 부족합니다!');
        return;
    }

    gameState.stamina -= topic.stamina;

    const scenario = topic.scenarios[Math.floor(Math.random() * topic.scenarios.length)];

    closeModal('action-modal');
    showScenario(scenario, topic, 'talk');
}

// ============================================
// 시나리오 시스템
// ============================================
function showScenario(scenario, sourceData, actionType) {
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

    window.currentScenarioChoices = scenario.choices;
    window.currentScenarioSource = sourceData;
    window.currentScenarioType = actionType;

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

    // 난이도 배수 적용 (전역 배수 * 캐릭터별 배수)
    let difficultyMult = GLOBAL_DIFFICULTY_MULTIPLIER * getDifficultyMultiplier();

    // 대화는 추가로 60%만 적용 (데이트보다 훨씬 낮은 효과)
    if (actionType === 'talk') {
        difficultyMult *= 0.6;
    }

    affectionGain = Math.round(affectionGain * difficultyMult);
    trustGain = Math.round(trustGain * difficultyMult);

    const preference = getPreferenceMultiplier(sourceData.id, actionType);
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

    const workMoney = WORK_OPTIONS.parttime.money;  // 80,000원
    gameState.stamina -= 40;
    gameState.money += workMoney;
    gameState.workCount++;

    recordActivity('work', '💼');

    showResult('알바를 마쳤습니다!', 0, 0, `+${formatMoney(workMoney)}`);
    updateAllUI();
}

function doRest() {
    gameState.stamina = 80;  // 체력 80으로만 회복 (난이도 상승)

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

    updateBiorhythm();
    checkNeglect();

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
// 돌발 상황 시스템
// ============================================
function triggerCrisisEvent() {
    const event = CRISIS_EVENTS[Math.floor(Math.random() * CRISIS_EVENTS.length)];

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

    window.currentCrisisChoices = event.choices;
    window.currentCrisisEvent = event;

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
