// 게임 상태
let gameState = {
    character: null,
    affection: 50, // 호감도 (0-100)
    day: 1,
    maxDays: 30,
    currentScene: 0,
    story: [],
    isGameOver: false
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
    gameState.character = character;
    gameState.affection = character.startScore;
    gameState.day = 1;
    gameState.currentScene = 0;
    gameState.isGameOver = false;

    // 스토리 생성
    generateStory();

    // 게임 화면 초기화 및 시작
    initGameScreen();
    showScreen('game-screen');

    // 첫 장면 시작
    showScene();
}

// 스토리 생성 (30일 분량)
function generateStory() {
    gameState.story = [];

    // 인트로 (Day 1-3)
    gameState.story.push({
        day: 1,
        type: 'intro',
        speaker: gameState.character.fullName,
        text: `안녕하세요. 저는 ${gameState.character.fullName}입니다. ${gameState.character.quote}`,
        choices: [
            {text: '반갑습니다! 잘 부탁드려요.', effect: 5},
            {text: '(미소) 잘 부탁드립니다.', effect: 8},
            {text: '네, 안녕하세요.', effect: 3}
        ]
    });

    gameState.story.push({
        day: 2,
        type: 'date',
        speaker: gameState.character.fullName,
        text: '오늘 날씨가 정말 좋네요. 같이 산책할까요?',
        choices: [
            {text: '좋아요! 어디로 갈까요?', effect: 10},
            {text: '산책보다는 카페 가는 게 어때요?', effect: 7},
            {text: '피곤한데... 다음에 하면 안 될까요?', effect: -15}
        ]
    });

    gameState.story.push({
        day: 3,
        type: 'talk',
        speaker: gameState.character.fullName,
        text: '요즘 취미가 뭐예요? 저는 ${character의 취미}를 좋아해요.',
        choices: [
            {text: '저도 그거 좋아해요! 같이 해봐요.', effect: 12},
            {text: '잘 모르는데 알려줄 수 있어요?', effect: 8},
            {text: '저는 다른 걸 좋아해요.', effect: 2}
        ]
    });

    // 발전 단계 (Day 4-15)
    const midEvents = [
        {
            type: 'special',
            speaker: gameState.character.fullName,
            text: '나 살쪘나요? 요즘 거울 볼 때마다 그런 것 같아서...',
            choices: [
                {text: '아니에요, 전혀 안 쪘어요!', effect: 8},
                {text: '조금? 그래도 귀여워요.', effect: -20},
                {text: '원래도 예뻤고 지금도 예뻐요.', effect: 15},
                {text: '운동 같이 할까요?', effect: -18}
            ]
        },
        {
            type: 'special',
            speaker: gameState.character.fullName,
            text: '제 친구가 예쁘다고 생각하세요?',
            choices: [
                {text: '네, 예쁘네요.', effect: -40},
                {text: '잘 모르겠는데요?', effect: 5},
                {text: '당신이 제일 예뻐요.', effect: 20},
                {text: '친구로 봐서 잘 모르겠어요.', effect: 12}
            ]
        },
        {
            type: 'talk',
            speaker: gameState.character.fullName,
            text: '우리 처음 만난 날 기억나요?',
            choices: [
                {text: '음... 언제였더라?', effect: -20},
                {text: '물론이죠! (정확한 날짜)', effect: 25},
                {text: '그때 입었던 옷도 기억나요.', effect: 30},
                {text: '기억 안 나지만 행복했어요.', effect: 10}
            ]
        },
        {
            type: 'crisis',
            speaker: gameState.character.fullName,
            text: '휴대폰 좀 봐도 될까요?',
            choices: [
                {text: '왜요? (방어적)', effect: -15},
                {text: '네, 보세요. (자연스럽게)', effect: 20},
                {text: '나도 당신 거 봐도 돼요?', effect: -10},
                {text: '숨길 거 없어요. (건네주며)', effect: 25}
            ]
        },
        {
            type: 'date',
            speaker: gameState.character.fullName,
            text: '오늘 뭐 먹을까요? 저는 이탈리안이 당기는데...',
            choices: [
                {text: '좋아요! 이탈리안 먹어요.', effect: 12},
                {text: '한식이 더 나을 것 같은데요.', effect: 3},
                {text: '당신이 좋으면 저도 좋아요.', effect: 10},
                {text: '이탈리안 먹고 한식은 다음에!', effect: 20}
            ]
        },
        {
            type: 'talk',
            speaker: gameState.character.fullName,
            text: '저... 요즘 회사에서 힘든 일이 있어서...',
            choices: [
                {text: '당신도 잘못한 게 있겠죠.', effect: -30},
                {text: '힘들었겠어요. 괜찮아요?', effect: 15},
                {text: '어떻게 된 건지 얘기해봐요.', effect: 20},
                {text: '직접 만나서 위로해드릴게요.', effect: 28}
            ]
        },
        {
            type: 'special',
            speaker: gameState.character.fullName,
            text: '우리 관계 어떻게 생각하세요?',
            choices: [
                {text: '잘 되고 있는 것 같은데요?', effect: 5},
                {text: '가끔 힘들지만 행복해요.', effect: 18},
                {text: '당신은 어떻게 생각해요?', effect: -10},
                {text: '부족한 점 말해주세요. 고칠게요.', effect: 22}
            ]
        },
        {
            type: 'crisis',
            speaker: gameState.character.fullName,
            text: '왜 이제야 답장하는 거예요? (읽씹 2시간)',
            choices: [
                {text: '미안해요. 회의 중이었어요.', effect: 5},
                {text: '정말 미안해요. 바로 연락했어요.', effect: 12},
                {text: '나도 바쁘거든요?', effect: -25},
                {text: '앞으로 이런 일 없을게요.', effect: 15}
            ]
        },
        {
            type: 'date',
            speaker: gameState.character.fullName,
            text: '오늘 친구들 약속 있는데... 당신도 보고 싶어요.',
            choices: [
                {text: '친구들 만나세요. 전 괜찮아요.', effect: 18},
                {text: '저랑 있어줘요.', effect: -12},
                {text: '친구들 만나고 저녁에 봐요.', effect: 22},
                {text: '친구가 더 중요하구나...', effect: -25}
            ]
        },
        {
            type: 'talk',
            speaker: gameState.character.fullName,
            text: '1년 후에 우리 뭐 하고 있을까요?',
            choices: [
                {text: '글쎄요... 모르겠는데요.', effect: -15},
                {text: '지금처럼 행복하겠죠.', effect: 12},
                {text: '여행도 가고 더 알아가고 있겠죠.', effect: 20},
                {text: '결혼도 생각해봤어요.', effect: gameState.affection >= 60 ? 30 : -20}
            ]
        },
        {
            type: 'special',
            speaker: gameState.character.fullName,
            text: '감기 걸려서 힘들어요...',
            choices: [
                {text: '푹 쉬세요. (문자만)', effect: 5},
                {text: '약이랑 죽 사갈게요!', effect: 30},
                {text: '전화로 위로해드릴게요.', effect: 12},
                {text: '다 나을 때까지 기다릴게요.', effect: -10}
            ]
        }
    ];

    for (let i = 4; i <= 15; i++) {
        const event = midEvents[(i - 4) % midEvents.length];
        gameState.story.push({
            day: i,
            ...event
        });
    }

    // 심화 단계 (Day 16-25)
    for (let i = 16; i <= 25; i++) {
        gameState.story.push({
            day: i,
            type: 'deepening',
            speaker: gameState.character.fullName,
            text: getRandomDialogue(i),
            choices: getRandomChoices()
        });
    }

    // 클라이맥스 (Day 26-29)
    gameState.story.push({
        day: 26,
        type: 'climax',
        speaker: gameState.character.fullName,
        text: '우리... 계속 함께할 수 있을까요?',
        choices: [
            {text: '당연하죠!', effect: 20},
            {text: '평생 함께하고 싶어요.', effect: 35},
            {text: '글쎄요... 잘 모르겠어요.', effect: -40}
        ]
    });

    gameState.story.push({
        day: 27,
        type: 'date',
        speaker: gameState.character.fullName,
        text: '오늘 정말 특별한 날이에요. 어디 가고 싶은 곳 있어요?',
        choices: [
            {text: '당신이 좋아하는 곳으로 가요.', effect: 15},
            {text: '둘만의 특별한 장소 찾아봐요.', effect: 25},
            {text: '집에서 편하게 있어요.', effect: 10}
        ]
    });

    gameState.story.push({
        day: 28,
        type: 'confession',
        speaker: gameState.character.fullName,
        text: '저... 말하고 싶은 게 있어요. 당신을...',
        choices: [
            {text: '저도 사랑해요.', effect: 30},
            {text: '(손을 잡으며) 저도요.', effect: 35},
            {text: '무슨 말인지 알아요.', effect: 25}
        ]
    });

    // 엔딩 (Day 30)
    gameState.story.push({
        day: 30,
        type: 'ending',
        speaker: gameState.character.fullName,
        text: '30일 동안 정말 행복했어요. 앞으로도 계속 함께해주시겠어요?',
        choices: [
            {text: '물론이에요. 평생 함께해요.', effect: 50},
            {text: '(프러포즈) 나와 결혼해줄래요?', effect: 100}
        ]
    });
}

// 랜덤 대사 생성
function getRandomDialogue(day) {
    const dialogues = [
        '오늘 하루 어땠어요?',
        '요즘 생각이 많아요...',
        '당신과 있으면 시간이 빨리 가는 것 같아요.',
        '제 이야기 들어줄 수 있어요?',
        '오늘 뭐 하고 싶으세요?',
        '당신 생각하면 미소가 나와요.',
        '우리 관계가 더 발전한 것 같아요.',
        '당신은 제게 정말 소중한 사람이에요.'
    ];
    return dialogues[day % dialogues.length];
}

// 랜덤 선택지 생성
function getRandomChoices() {
    return [
        {text: '저도 그래요. 당신이 정말 좋아요.', effect: 15},
        {text: '무슨 일 있어요? 얘기해봐요.', effect: 12},
        {text: '저도 같은 마음이에요.', effect: 10},
        {text: '함께 있으면 행복해요.', effect: 18}
    ];
}

// 게임 화면 초기화
function initGameScreen() {
    // 캐릭터 정보 표시
    document.getElementById('char-name-display').textContent = gameState.character.fullName;
    document.getElementById('speaker-name').textContent = gameState.character.fullName;

    // 포트레이트 아이콘 설정
    const portraitContainer = document.getElementById('character-portrait');
    const portraitIcon = portraitContainer.querySelector('.portrait-icon');
    portraitIcon.textContent = gameState.character.icon;

    // 포트레이트 배경 클래스 설정
    portraitContainer.className = 'portrait-container ' + gameState.character.id;

    // 호감도 및 날짜 업데이트
    updateAffection();
    updateDay();
}

// 호감도 업데이트
function updateAffection() {
    gameState.affection = Math.max(0, Math.min(100, gameState.affection));

    document.getElementById('affection-percentage').textContent = gameState.affection + '%';
    document.getElementById('affection-fill').style.width = gameState.affection + '%';

    // 관계 상태 텍스트
    let status = '';
    if (gameState.affection <= 20) status = '위기 - 이별 직전';
    else if (gameState.affection <= 40) status = '불안정 - 관계 개선 필요';
    else if (gameState.affection <= 60) status = '알아가는 중';
    else if (gameState.affection <= 80) status = '좋은 관계';
    else status = '진정한 사랑';

    document.getElementById('relationship-status').textContent = status;

    // 게임 오버 체크
    if (gameState.affection <= 0) {
        setTimeout(() => gameOver('bad'), 1000);
    }
}

// 날짜 업데이트
function updateDay() {
    document.getElementById('day-number').textContent = gameState.day;
}

// 장면 표시
function showScene() {
    if (gameState.currentScene >= gameState.story.length) {
        // 스토리 끝 - 엔딩 판정
        endGame();
        return;
    }

    const scene = gameState.story[gameState.currentScene];

    // 날짜 업데이트
    gameState.day = scene.day;
    updateDay();

    // 대사 표시
    document.getElementById('speaker-name').textContent = scene.speaker;
    document.getElementById('dialogue-text').textContent = scene.text;

    // 선택지가 있으면 선택지 표시, 없으면 다음 버튼
    if (scene.choices && scene.choices.length > 0) {
        showChoices(scene.choices);
    } else {
        showNextButton();
    }
}

// 선택지 표시
function showChoices(choices) {
    document.getElementById('action-area').style.display = 'none';
    const choicesArea = document.getElementById('choices-area');
    choicesArea.style.display = 'flex';
    choicesArea.innerHTML = '';

    choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.innerHTML = `
            <span class="choice-number">${index + 1}.</span>
            ${choice.text}
        `;
        button.onclick = () => selectChoice(choice);
        choicesArea.appendChild(button);
    });
}

// 다음 버튼 표시
function showNextButton() {
    document.getElementById('choices-area').style.display = 'none';
    document.getElementById('action-area').style.display = 'block';
}

// 선택지 선택
function selectChoice(choice) {
    // 호감도 변화
    let effect = choice.effect;

    // 캐릭터별 보정
    if (gameState.character.id === 'perfectionist') {
        if (effect > 0) effect = Math.floor(effect * 1.2);
        if (effect < 0) effect = Math.floor(effect * 1.5);
    } else if (gameState.character.id === 'positive') {
        if (effect < 0) effect = Math.floor(effect * 0.7);
    } else if (gameState.character.id === 'career') {
        const isTalkRelated = gameState.story[gameState.currentScene].type === 'talk';
        if (isTalkRelated && effect > 0) effect = Math.floor(effect * 1.3);
    }

    gameState.affection += effect;
    updateAffection();

    // 결과 피드백 표시
    showFeedback(effect);

    // 다음 장면으로
    setTimeout(() => {
        nextScene();
    }, 1500);
}

// 피드백 표시
function showFeedback(effect) {
    const feedbackText = effect > 0
        ? `호감도 ${effect > 0 ? '+' : ''}${effect}!`
        : `호감도 ${effect}...`;

    const color = effect > 0 ? '#44ff88' : '#ff4444';

    // 대화 텍스트 임시 변경
    const dialogueText = document.getElementById('dialogue-text');
    const originalText = dialogueText.textContent;
    dialogueText.textContent = feedbackText;
    dialogueText.style.color = color;
    dialogueText.style.fontWeight = 'bold';
    dialogueText.style.fontSize = '1.5rem';

    setTimeout(() => {
        dialogueText.textContent = originalText;
        dialogueText.style.color = '';
        dialogueText.style.fontWeight = '';
        dialogueText.style.fontSize = '';
    }, 1500);
}

// 다음 장면
function nextScene() {
    gameState.currentScene++;
    showScene();
}

// 게임 종료
function endGame() {
    // 호감도에 따라 엔딩 결정
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

// 게임 오버 (호감도 0)
function gameOver(type) {
    gameState.isGameOver = true;
    const endingTitle = '💔 게임 오버 - 이별';
    const endingMessage = `호감도가 0이 되어 ${gameState.character.fullName}와(과) 이별했습니다. 다시 도전해보세요!`;
    showEnding('gameover', endingTitle, endingMessage);
}

// 엔딩 화면 표시
function showEnding(type, title, message) {
    document.getElementById('ending-title').textContent = title;
    document.getElementById('ending-message').textContent = message;
    document.getElementById('final-affection').textContent = gameState.affection + '%';
    document.getElementById('final-days').textContent = gameState.day + '일';

    const endingPortrait = document.getElementById('ending-portrait');
    const endingIcon = document.getElementById('ending-icon');
    endingIcon.textContent = gameState.character.icon;

    // 배경색 설정
    if (type === 'true') {
        endingPortrait.style.background = 'linear-gradient(135deg, #44ff88 0%, #32CD32 100%)';
    } else if (type === 'good') {
        endingPortrait.style.background = 'linear-gradient(135deg, #88ff44 0%, #ffaa44 100%)';
    } else if (type === 'normal') {
        endingPortrait.style.background = 'linear-gradient(135deg, #ffaa44 0%, #ff8844 100%)';
    } else {
        endingPortrait.style.background = 'linear-gradient(135deg, #ff4444 0%, #8B0000 100%)';
    }

    showScreen('ending-screen');
}

// 다시 시작
function restartGame() {
    showScreen('character-select-screen');
}

// 메인으로
function backToMain() {
    showScreen('main-screen');
}

// 메뉴 토글
function toggleMenu() {
    showRules();
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    showScreen('main-screen');
});
