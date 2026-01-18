// 게임 상태
let gameState = {
    character: null,
    affection: 50,        // 호감도 (0-100)
    money: 100,           // 돈 (0-999)
    stamina: 100,         // 체력 (0-100)
    myMood: 50,          // 나의 기분 (0-100)
    turn: 1,              // 현재 턴
    maxTurns: 30,         // 최대 턴
    lastInteraction: 0,   // 마지막 상호작용 턴
    isGameOver: false
};

// 액션 정의
const ACTIONS = {
    date: {
        name: '데이트하기',
        icon: '💑',
        description: '함께 시간을 보냅니다',
        costs: { money: 30, stamina: 20 },
        gains: { affection: 15, myMood: 10 },
        requiredMoney: 30,
        requiredStamina: 20
    },
    talk: {
        name: '대화하기',
        icon: '💬',
        description: '따뜻한 대화를 나눕니다',
        costs: { stamina: 10 },
        gains: { affection: 10 },
        requiredStamina: 10
    },
    gift: {
        name: '선물하기',
        icon: '🎁',
        description: '마음을 담은 선물을 줍니다',
        costs: { money: 50 },
        gains: { affection: 25, myMood: 5 },
        requiredMoney: 50
    },
    work: {
        name: '일하기',
        icon: '💼',
        description: '돈을 벌지만 피곤합니다',
        costs: { stamina: 30, myMood: 10 },
        gains: { money: 60 },
        requiredStamina: 30
    },
    rest: {
        name: '휴식하기',
        icon: '😴',
        description: '체력을 회복합니다',
        costs: {},
        gains: { stamina: 40 },
        requiredStamina: 0
    },
    hobby: {
        name: '취미/게임',
        icon: '🎮',
        description: '나만의 시간을 가집니다',
        costs: { money: 15 },
        gains: { myMood: 25, stamina: -5 },
        requiredMoney: 15
    }
};

// 화면 전환
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

// 메인 화면 → 캐릭터 선택
function showCharacterSelect() {
    showScreen('character-select-screen');
}

// 게임 규칙
function showRules() {
    showModal('rules-modal');
}

function closeRules() {
    closeModal('rules-modal');
}

// 캐릭터 선택
function selectCharacter(characterId) {
    const character = CHARACTERS[characterId];

    // 게임 상태 초기화
    gameState.character = character;
    gameState.affection = character.startScore;
    gameState.money = 100;
    gameState.stamina = 100;
    gameState.myMood = 50;
    gameState.turn = 1;
    gameState.lastInteraction = 0;
    gameState.isGameOver = false;

    // 게임 화면 초기화 및 시작
    initGameScreen();
    showScreen('game-screen');
    updateAllResources();
    updateCharacterMood();
}

// 게임 화면 초기화
function initGameScreen() {
    // 캐릭터 정보 표시
    document.getElementById('char-name-display').textContent = gameState.character.fullName;

    // 포트레이트 이미지 설정
    updateCharacterMood();

    // 액션 버튼 생성
    createActionButtons();
}

// 액션 버튼 생성
function createActionButtons() {
    const choicesArea = document.getElementById('choices-area');
    choicesArea.innerHTML = '';

    Object.keys(ACTIONS).forEach(actionKey => {
        const action = ACTIONS[actionKey];
        const button = document.createElement('button');
        button.className = 'action-choice-btn';
        button.id = `action-${actionKey}`;
        button.onclick = () => performAction(actionKey);

        // 비용과 효과 표시
        let costText = [];
        if (action.costs.money) costText.push(`💰-${action.costs.money}`);
        if (action.costs.stamina) costText.push(`⚡-${action.costs.stamina}`);
        if (action.costs.myMood) costText.push(`😊-${action.costs.myMood}`);

        let gainText = [];
        if (action.gains.money) gainText.push(`💰+${action.gains.money}`);
        if (action.gains.stamina) gainText.push(`⚡+${action.gains.stamina}`);
        if (action.gains.myMood) gainText.push(`😊+${action.gains.myMood}`);
        if (action.gains.affection) gainText.push(`💖+${action.gains.affection}`);

        button.innerHTML = `
            <div class="action-icon">${action.icon}</div>
            <div class="action-info">
                <div class="action-name">${action.name}</div>
                <div class="action-cost">${costText.join(' ')}</div>
                <div class="action-gain">${gainText.join(' ')}</div>
            </div>
        `;

        choicesArea.appendChild(button);
    });

    updateActionButtons();
}

// 액션 실행
function performAction(actionKey) {
    const action = ACTIONS[actionKey];

    // 필수 자원 확인
    if (action.requiredMoney && gameState.money < action.requiredMoney) {
        showFeedback('돈이 부족합니다!', 'error');
        return;
    }
    if (action.requiredStamina && gameState.stamina < action.requiredStamina) {
        showFeedback('체력이 부족합니다!', 'error');
        return;
    }

    // 자원 소비
    if (action.costs.money) gameState.money -= action.costs.money;
    if (action.costs.stamina) gameState.stamina -= action.costs.stamina;
    if (action.costs.myMood) gameState.myMood -= action.costs.myMood;

    // 자원 획득
    if (action.gains.money) gameState.money += action.gains.money;
    if (action.gains.stamina) gameState.stamina += action.gains.stamina;
    if (action.gains.myMood) gameState.myMood += action.gains.myMood;
    if (action.gains.affection) {
        let affectionGain = action.gains.affection;

        // 캐릭터별 보너스 적용
        if (actionKey === 'date' && gameState.character.id === 'positive') {
            affectionGain *= 1.2; // 긍정녀는 데이트 좋아함
        }
        if (actionKey === 'talk' && gameState.character.id === 'career') {
            affectionGain *= 1.3; // 커리어우먼은 대화 선호
        }
        if (actionKey === 'gift' && gameState.character.id === 'perfectionist') {
            affectionGain *= 1.3; // 완벽주의는 고급 선물 선호
        }

        gameState.affection += Math.round(affectionGain);
    }

    // 상호작용 액션인 경우 마지막 상호작용 시간 업데이트
    if (actionKey === 'date' || actionKey === 'talk' || actionKey === 'gift') {
        gameState.lastInteraction = gameState.turn;
    }

    // 자원 제한 적용
    gameState.money = Math.max(0, Math.min(999, gameState.money));
    gameState.stamina = Math.max(0, Math.min(100, gameState.stamina));
    gameState.myMood = Math.max(0, Math.min(100, gameState.myMood));
    gameState.affection = Math.max(0, Math.min(100, gameState.affection));

    // 피드백 표시
    showFeedback(`${action.name} 완료!`, 'success');

    // 턴 진행
    nextTurn();
}

// 다음 턴
function nextTurn() {
    gameState.turn++;

    // 방치 페널티 체크
    const turnsSinceInteraction = gameState.turn - gameState.lastInteraction;
    if (turnsSinceInteraction > 3) {
        const neglectPenalty = (turnsSinceInteraction - 3) * 5;
        gameState.affection -= neglectPenalty;

        // 캐릭터별 방치 민감도
        if (gameState.character.id === 'perfectionist') {
            gameState.affection -= neglectPenalty * 0.5; // 완벽주의는 더 민감
        }
        if (gameState.character.id === 'positive') {
            gameState.affection -= neglectPenalty * 0.3; // 긍정녀는 덜 민감
        }

        gameState.affection = Math.max(0, gameState.affection);
        if (neglectPenalty > 0) {
            showFeedback(`너무 오래 방치했습니다... (-${Math.round(neglectPenalty * 1.5)}💖)`, 'warning');
        }
    }

    // 게임 오버 체크
    if (gameState.affection <= 0) {
        gameOver();
        return;
    }

    // 턴 종료 체크
    if (gameState.turn > gameState.maxTurns) {
        endGame();
        return;
    }

    // UI 업데이트
    updateAllResources();
    updateCharacterMood();
    updateActionButtons();
}

// 모든 자원 업데이트
function updateAllResources() {
    // 턴 표시
    document.getElementById('day-number').textContent = gameState.turn;
    document.querySelector('.day-total').textContent = ` / ${gameState.maxTurns}`;

    // 호감도
    updateAffection();

    // 돈
    document.getElementById('money-value').textContent = gameState.money;
    document.getElementById('money-fill').style.width = (gameState.money / 999 * 100) + '%';

    // 체력
    document.getElementById('stamina-value').textContent = gameState.stamina;
    document.getElementById('stamina-fill').style.width = gameState.stamina + '%';

    // 나의 기분
    document.getElementById('mood-value').textContent = gameState.myMood;
    document.getElementById('mood-fill').style.width = gameState.myMood + '%';
}

// 호감도 업데이트
function updateAffection() {
    gameState.affection = Math.max(0, Math.min(100, gameState.affection));

    document.getElementById('affection-percentage').textContent = Math.round(gameState.affection) + '%';
    document.getElementById('affection-fill').style.width = gameState.affection + '%';

    // 관계 상태 텍스트
    let status = '';
    if (gameState.affection >= 80) status = '💕 최고의 연인';
    else if (gameState.affection >= 60) status = '💖 사랑하는 사이';
    else if (gameState.affection >= 40) status = '💗 좋아하는 사이';
    else if (gameState.affection >= 20) status = '💙 알아가는 중';
    else status = '💔 위기 상황';

    document.getElementById('relationship-status').textContent = status;
}

// 캐릭터 기분 이미지 업데이트
function updateCharacterMood() {
    const portraitImage = document.getElementById('portrait-image');
    const baseImage = gameState.character.image.replace('.jpg', '');

    let moodSuffix = '-normal';
    if (gameState.affection >= 70) {
        moodSuffix = '-happy';
    } else if (gameState.affection < 35) {
        moodSuffix = '-unhappy';
    }

    portraitImage.src = baseImage + moodSuffix + '.jpg';
    portraitImage.onerror = function() {
        // 이미지가 없으면 기본 이미지 사용
        this.src = gameState.character.image;
        this.onerror = null;
    };
}

// 액션 버튼 활성화/비활성화
function updateActionButtons() {
    Object.keys(ACTIONS).forEach(actionKey => {
        const action = ACTIONS[actionKey];
        const button = document.getElementById(`action-${actionKey}`);
        if (!button) return;

        const canAfford =
            (!action.requiredMoney || gameState.money >= action.requiredMoney) &&
            (!action.requiredStamina || gameState.stamina >= action.requiredStamina);

        if (canAfford) {
            button.classList.remove('disabled');
            button.disabled = false;
        } else {
            button.classList.add('disabled');
            button.disabled = true;
        }
    });
}

// 피드백 표시
function showFeedback(message, type = 'info') {
    const dialogueText = document.getElementById('dialogue-text');
    const originalText = dialogueText.textContent;

    dialogueText.textContent = message;

    if (type === 'success') {
        dialogueText.style.color = '#44ff88';
    } else if (type === 'error') {
        dialogueText.style.color = '#ff4444';
    } else if (type === 'warning') {
        dialogueText.style.color = '#ffaa44';
    }

    dialogueText.style.fontWeight = 'bold';

    setTimeout(() => {
        dialogueText.textContent = `턴 ${gameState.turn} / ${gameState.maxTurns}`;
        dialogueText.style.color = '';
        dialogueText.style.fontWeight = '';
    }, 2000);
}

// 게임 종료
function endGame() {
    let endingType = '';
    let endingTitle = '';
    let endingMessage = '';

    if (gameState.affection >= 80) {
        endingType = 'true';
        endingTitle = '💖 트루 엔딩 - 진정한 사랑';
        endingMessage = `축하합니다! ${gameState.character.fullName}와(과) 완벽한 사랑을 이루었습니다. 평생 함께할 인연을 만들었어요!`;
    } else if (gameState.affection >= 60) {
        endingType = 'good';
        endingTitle = '💝 굿 엔딩 - 좋은 관계';
        endingMessage = `${gameState.character.fullName}와(과) 좋은 관계를 유지했습니다. 앞으로도 계속 발전할 수 있을 거예요!`;
    } else if (gameState.affection >= 40) {
        endingType = 'normal';
        endingTitle = '💗 노멀 엔딩 - 평범한 관계';
        endingMessage = `${gameState.character.fullName}와(과)의 관계는 평범했습니다. 조금 더 노력했다면 좋았을 텐데...`;
    } else {
        endingType = 'bad';
        endingTitle = '💔 배드 엔딩 - 이별';
        endingMessage = `${gameState.character.fullName}와(과)의 관계가 끝났습니다. 다음엔 더 잘할 수 있을 거예요.`;
    }

    showEnding(endingType, endingTitle, endingMessage);
}

// 게임 오버
function gameOver() {
    gameState.isGameOver = true;
    const endingTitle = '💔 게임 오버 - 이별';
    const endingMessage = `호감도가 0이 되어 ${gameState.character.fullName}와(과) 이별했습니다. 다시 도전해보세요!`;
    showEnding('gameover', endingTitle, endingMessage);
}

// 엔딩 화면 표시
function showEnding(type, title, message) {
    document.getElementById('ending-title').textContent = title;
    document.getElementById('ending-message').textContent = message;
    document.getElementById('final-affection').textContent = Math.round(gameState.affection) + '%';
    document.getElementById('final-days').textContent = gameState.turn + '턴';

    // 엔딩 이미지 설정
    const endingImage = document.getElementById('ending-image');
    const baseImage = gameState.character.image.replace('.jpg', '');

    if (type === 'true' || type === 'good') {
        endingImage.src = baseImage + '-happy.jpg';
    } else {
        endingImage.src = baseImage + '-unhappy.jpg';
    }

    endingImage.onerror = function() {
        this.src = gameState.character.image;
        this.onerror = null;
    };

    // 엔딩 포트레이트 테두리 색상 설정
    const endingPortrait = document.getElementById('ending-portrait');
    if (type === 'true') {
        endingPortrait.style.borderColor = '#44ff88';
        endingPortrait.style.boxShadow = '0 0 50px rgba(68, 255, 136, 0.8)';
    } else if (type === 'good') {
        endingPortrait.style.borderColor = '#ffaa44';
        endingPortrait.style.boxShadow = '0 0 50px rgba(255, 170, 68, 0.8)';
    } else if (type === 'normal') {
        endingPortrait.style.borderColor = '#ff8844';
        endingPortrait.style.boxShadow = '0 0 50px rgba(255, 136, 68, 0.8)';
    } else {
        endingPortrait.style.borderColor = '#ff4444';
        endingPortrait.style.boxShadow = '0 0 50px rgba(255, 68, 68, 0.8)';
    }

    showScreen('ending-screen');
}

// 게임 재시작
function restartGame() {
    selectCharacter(gameState.character.id);
}

// 메인으로
function backToMain() {
    showScreen('main-screen');
}
