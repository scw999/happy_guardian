// 게임 상태
let gameState = {
    character: null,
    score: 50,
    turn: 1,
    position: 0,
    hand: [],
    effects: [],
    log: []
};

// 화면 전환 함수
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

// 메인 화면에서 캐릭터 선택으로
function showCharacterSelect() {
    showScreen('character-select-screen');
}

// 게임 규칙 표시
function showRules() {
    showModal('rules-modal');
}

function closeRules() {
    closeModal('rules-modal');
}

// 캐릭터 선택
function selectCharacter(characterId) {
    const character = CHARACTERS[characterId];
    gameState.character = character;
    gameState.score = character.startScore;
    gameState.position = 0;
    gameState.turn = 1;
    gameState.hand = [];
    gameState.effects = [];
    gameState.log = [];

    // 초기 카드 5장 지급
    dealInitialCards();

    // 게임 화면 초기화
    initGameScreen();
    showScreen('game-screen');

    addLog(`${character.name} 선택! 게임 시작합니다.`);
}

// 초기 카드 지급
function dealInitialCards() {
    const cardTypes = ['date', 'gift', 'talk'];
    const cardKeys = Object.keys(CARDS).filter(key => {
        const card = CARDS[key];
        return cardTypes.includes(card.type);
    });

    for (let i = 0; i < 5; i++) {
        const randomCard = cardKeys[Math.floor(Math.random() * cardKeys.length)];
        gameState.hand.push(randomCard);
    }
}

// 게임 화면 초기화
function initGameScreen() {
    // 캐릭터 정보 표시
    document.getElementById('current-character-img').src = gameState.character.image;
    document.getElementById('current-character-name').textContent =
        `${gameState.character.icon} ${gameState.character.name}`;

    // 점수 및 턴 표시
    updateScoreDisplay();
    updateTurnDisplay();

    // 보드판 생성
    createBoard();

    // 카드 표시
    updateHandDisplay();

    // 로그 초기화
    document.getElementById('game-log').innerHTML = '';
}

// 보드판 생성
function createBoard() {
    const boardElement = document.getElementById('game-board');
    boardElement.innerHTML = '';

    BOARD_SPACES.forEach(space => {
        const spaceDiv = document.createElement('div');
        spaceDiv.className = `board-space ${space.type}`;
        spaceDiv.innerHTML = `
            <span class="space-number">${space.id}</span>
            ${space.icon}
        `;
        spaceDiv.title = `${space.id}. ${space.name}`;
        boardElement.appendChild(spaceDiv);
    });

    updateBoardPosition();
}

// 보드 위치 업데이트
function updateBoardPosition() {
    const spaces = document.querySelectorAll('.board-space');
    spaces.forEach((space, index) => {
        space.classList.remove('active');
        if (index === gameState.position) {
            space.classList.add('active');
        }
    });
}

// 점수 표시 업데이트
function updateScoreDisplay() {
    const scoreElement = document.getElementById('current-score');
    scoreElement.textContent = Math.max(0, gameState.score);

    const gaugeFill = document.getElementById('score-gauge-fill');
    const percentage = Math.max(0, Math.min(100, gameState.score));
    gaugeFill.style.width = percentage + '%';

    // 점수에 따른 색상 변경
    if (gameState.score <= 20) {
        gaugeFill.style.background = '#dc143c';
    } else if (gameState.score <= 40) {
        gaugeFill.style.background = 'linear-gradient(90deg, #dc143c, #ffa500)';
    } else if (gameState.score <= 60) {
        gaugeFill.style.background = 'linear-gradient(90deg, #ffa500, #ffd700)';
    } else if (gameState.score <= 80) {
        gaugeFill.style.background = 'linear-gradient(90deg, #ffd700, #32cd32)';
    } else {
        gaugeFill.style.background = 'linear-gradient(90deg, #32cd32, #90ee90)';
    }
}

// 턴 표시 업데이트
function updateTurnDisplay() {
    document.getElementById('current-turn').textContent = gameState.turn;
}

// 손패 표시 업데이트
function updateHandDisplay() {
    const handElement = document.getElementById('player-hand');
    handElement.innerHTML = '';

    gameState.hand.forEach((cardId, index) => {
        const card = CARDS[cardId];
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.innerHTML = `
            <div class="card-header">
                <span class="card-name">${card.name}</span>
                <span class="card-icon">${card.icon}</span>
            </div>
            <div class="card-type">${getCardTypeName(card.type)}</div>
            <div class="card-effect">효과: +${card.effect}점</div>
        `;
        cardDiv.onclick = () => useCard(index);
        handElement.appendChild(cardDiv);
    });

    document.getElementById('hand-count').textContent = gameState.hand.length;
}

function getCardTypeName(type) {
    const names = {
        'date': '💑 데이트',
        'gift': '🎁 선물',
        'talk': '💬 대화',
        'special': '⭐ 특수'
    };
    return names[type] || type;
}

// 주사위 굴리기
function rollDice() {
    const diceButton = document.getElementById('dice-button');
    diceButton.disabled = true;

    const result = Math.floor(Math.random() * 6) + 1;
    const diceResultElement = document.getElementById('dice-result');

    // 주사위 애니메이션
    let count = 0;
    const animation = setInterval(() => {
        diceResultElement.textContent = '🎲 ' + (Math.floor(Math.random() * 6) + 1);
        count++;
        if (count > 10) {
            clearInterval(animation);
            diceResultElement.textContent = '🎲 ' + result;

            // 이동
            setTimeout(() => {
                movePlayer(result);
            }, 500);
        }
    }, 100);

    addLog(`주사위 결과: ${result}`);
}

// 플레이어 이동
function movePlayer(steps) {
    gameState.position = (gameState.position + steps) % 40;
    updateBoardPosition();

    const currentSpace = BOARD_SPACES[gameState.position];
    addLog(`${currentSpace.icon} ${currentSpace.name} 칸에 도착!`);

    // 칸 효과 처리
    handleSpaceEffect(currentSpace);
}

// 칸 효과 처리
function handleSpaceEffect(space) {
    switch(space.type) {
        case 'date':
        case 'gift':
        case 'talk':
            addLog(`${space.name} 카드를 사용할 수 있습니다.`);
            enableCardsOfType(space.type);
            break;
        case 'rest':
            addScore(5, '휴식 칸 효과');
            endTurn();
            break;
        case 'event':
            showSpecialEvent();
            break;
        case 'random':
            triggerRandomEvent();
            break;
    }
}

// 특정 타입 카드 활성화
function enableCardsOfType(type) {
    // 실제로는 해당 타입 카드만 사용 가능하게 해야 하지만
    // 간단히 모든 카드 사용 가능하게 함
}

// 카드 사용
function useCard(cardIndex) {
    const cardId = gameState.hand[cardIndex];
    const card = CARDS[cardId];

    // 점수 계산
    let score = card.effect;

    // 캐릭터 특성 적용
    if (card.type === 'talk' && gameState.character.traits.talkBonus) {
        score = Math.floor(score * gameState.character.traits.talkBonus);
    }

    // 이펙트 적용 (주기 등)
    const cycleEffect = gameState.effects.find(e => e.type === 'cycle');
    if (cycleEffect) {
        score *= 2;
    }

    addScore(score, `${card.name} 사용`);

    // 카드 제거
    gameState.hand.splice(cardIndex, 1);

    // 새 카드 드로우
    drawCard();

    updateHandDisplay();
    endTurn();
}

// 새 카드 드로우
function drawCard() {
    if (gameState.hand.length >= 7) return;

    const cardTypes = ['date', 'gift', 'talk'];
    const cardKeys = Object.keys(CARDS).filter(key => {
        const card = CARDS[key];
        return cardTypes.includes(card.type);
    });

    const randomCard = cardKeys[Math.floor(Math.random() * cardKeys.length)];
    gameState.hand.push(randomCard);
}

// 점수 추가
function addScore(points, reason) {
    const oldScore = gameState.score;
    gameState.score += points;

    // 최대/최소 제한
    gameState.score = Math.max(-50, Math.min(100, gameState.score));

    updateScoreDisplay();

    if (points > 0) {
        addLog(`+${points}점! (${reason})`, 'positive');
    } else {
        addLog(`${points}점... (${reason})`, 'negative');
    }

    // 게임 오버 체크
    if (gameState.score <= 0) {
        gameOver('lose');
    } else if (gameState.score >= 100) {
        gameOver('win');
    }
}

// 특수 이벤트 표시
function showSpecialEvent() {
    const event = SPECIAL_EVENTS[Math.floor(Math.random() * SPECIAL_EVENTS.length)];

    document.getElementById('event-title').textContent = '🎭 특수 이벤트!';
    document.getElementById('event-situation').textContent = event.situation;

    const choicesDiv = document.getElementById('event-choices');
    choicesDiv.innerHTML = '';

    event.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-button';
        button.innerHTML = `
            <span class="choice-number">${index + 1}.</span>
            ${choice.text}
        `;
        button.onclick = () => selectEventChoice(choice, event);
        choicesDiv.appendChild(button);
    });

    showModal('event-modal');
}

// 이벤트 선택지 선택
function selectEventChoice(choice, event) {
    closeModal('event-modal');

    let score = choice.score;

    // 캐릭터 특성 적용
    if (gameState.character.id === 'perfectionist') {
        if (score > 0) score = Math.floor(score * 1.5);
        if (score < 0) score = Math.floor(score * 2);
    }

    // 주기 효과
    const cycleEffect = gameState.effects.find(e => e.type === 'cycle');
    if (cycleEffect) {
        score *= 2;
    }

    addScore(score, '특수 이벤트 선택');

    // 결과 표시
    showEventResult(choice, score);
}

// 이벤트 결과 표시
function showEventResult(choice, score) {
    const modal = document.getElementById('result-modal');

    if (score > 0) {
        document.getElementById('result-title').textContent = '💝 좋은 선택!';
        document.getElementById('result-message').textContent = choice.text;
        document.getElementById('result-score').textContent = `+${score}점`;
        document.getElementById('result-score').className = 'result-score positive';
    } else {
        document.getElementById('result-title').textContent = '💔 좋지 않은 선택...';
        document.getElementById('result-message').textContent = choice.text;
        document.getElementById('result-score').textContent = `${score}점`;
        document.getElementById('result-score').className = 'result-score negative';
    }

    showModal('result-modal');
}

function closeResultModal() {
    closeModal('result-modal');
    endTurn();
}

// 랜덤 이벤트 발동
function triggerRandomEvent() {
    const event = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];

    addLog(`⚡ ${event.text}`);

    if (event.effect === 'cycle') {
        gameState.effects.push({type: 'cycle', duration: event.duration});
    } else if (event.effect === 'penalty') {
        addScore(event.score, '랜덤 이벤트');
    } else if (event.effect === 'bonus') {
        addScore(event.score, '랜덤 이벤트');
    }

    setTimeout(() => endTurn(), 2000);
}

// 턴 종료
function endTurn() {
    // 효과 지속시간 감소
    gameState.effects = gameState.effects.map(effect => {
        effect.duration--;
        return effect;
    }).filter(effect => effect.duration > 0);

    // 비타민 긍정녀 외로움 페널티
    if (gameState.character.id === 'positive') {
        // 실제로는 행동 여부를 체크해야 하지만 간단히 생략
    }

    gameState.turn++;
    updateTurnDisplay();

    // 15턴 종료 체크
    if (gameState.turn > 15) {
        gameOver('timeup');
        return;
    }

    // 주사위 버튼 활성화
    document.getElementById('dice-button').disabled = false;
}

// 게임 오버
function gameOver(reason) {
    const modal = document.getElementById('gameover-modal');
    const titleElement = document.getElementById('gameover-title');
    const messageElement = document.getElementById('gameover-message');

    if (reason === 'win') {
        titleElement.textContent = '💖 승리! 진정한 사랑 쟁취!';
        messageElement.innerHTML = `
            <p>축하합니다! 100점을 달성했습니다!</p>
            <p>최종 점수: <strong>${gameState.score}점</strong></p>
            <p>턴: ${gameState.turn}/15</p>
            <p>${gameState.character.name}와(과) 행복한 관계를 만들었습니다!</p>
        `;
    } else if (reason === 'lose') {
        titleElement.textContent = '💔 게임 오버... 이별';
        messageElement.innerHTML = `
            <p>점수가 0 이하로 떨어졌습니다...</p>
            <p>최종 점수: <strong>${gameState.score}점</strong></p>
            <p>턴: ${gameState.turn}/15</p>
            <p>다음엔 더 잘할 수 있을 거예요!</p>
        `;
    } else if (reason === 'timeup') {
        if (gameState.score >= 80) {
            titleElement.textContent = '💝 좋은 관계!';
            messageElement.innerHTML = `
                <p>15턴이 끝났습니다!</p>
                <p>최종 점수: <strong>${gameState.score}점</strong></p>
                <p>훌륭한 관계를 유지했습니다!</p>
            `;
        } else if (gameState.score >= 50) {
            titleElement.textContent = '💗 보통 관계';
            messageElement.innerHTML = `
                <p>15턴이 끝났습니다!</p>
                <p>최종 점수: <strong>${gameState.score}점</strong></p>
                <p>괜찮은 관계네요!</p>
            `;
        } else {
            titleElement.textContent = '💔 불안정한 관계';
            messageElement.innerHTML = `
                <p>15턴이 끝났습니다...</p>
                <p>최종 점수: <strong>${gameState.score}점</strong></p>
                <p>관계 개선이 필요합니다...</p>
            `;
        }
    }

    showModal('gameover-modal');
}

function restartGame() {
    closeModal('gameover-modal');
    showScreen('character-select-screen');
}

function backToMain() {
    closeModal('gameover-modal');
    showScreen('main-screen');
}

// 로그 추가
function addLog(message, type = 'normal') {
    const logDiv = document.createElement('div');
    logDiv.className = `log-entry ${type}`;
    logDiv.textContent = `[턴 ${gameState.turn}] ${message}`;

    const logContainer = document.getElementById('game-log');
    logContainer.insertBefore(logDiv, logContainer.firstChild);

    // 로그 개수 제한 (최근 20개만)
    while (logContainer.children.length > 20) {
        logContainer.removeChild(logContainer.lastChild);
    }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    showScreen('main-screen');
});
