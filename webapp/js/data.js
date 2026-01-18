// 캐릭터 데이터
const CHARACTERS = {
    perfectionist: {
        id: 'perfectionist',
        name: '완벽주의 센서티브',
        icon: '💎',
        image: 'images/character1-perfectionist.jpg',
        difficulty: 5,
        startScore: 30,
        traits: {
            scoreMultiplier: 2, // 취향 저격 시 2배
            penaltyMultiplier: 2 // 실수 시 2배 페널티
        },
        fullName: '서윤아',
        age: 27,
        job: '패션 디자이너',
        quote: '"완벽하지 않으면 의미 없어요"'
    },
    positive: {
        id: 'positive',
        name: '비타민 긍정녀',
        icon: '☀️',
        image: 'images/character2-positive.jpg',
        difficulty: 2,
        startScore: 70,
        traits: {
            lonelinessPenalty: -3, // 매 턴 방치 시 -3점
            forgivingNature: true // 실수에 관대
        },
        fullName: '강하영',
        age: 25,
        job: '초등학교 교사',
        quote: '"오늘도 화이팅! 우리 행복하자!"'
    },
    tsundere: {
        id: 'tsundere',
        name: '반전 매력의 츤데레',
        icon: '🌸',
        image: 'images/character3-tsundere.jpg',
        difficulty: 3,
        startScore: 50,
        traits: {
            delayedEffect: true, // 효과가 다음 턴에 반영
            stableScore: true // 점수가 잘 안 떨어짐
        },
        fullName: '이지우',
        age: 24,
        job: '웹툰 작가',
        quote: '"별로... 안 좋은데... (좋아)"'
    },
    career: {
        id: 'career',
        name: '논리적인 커리어우먼',
        icon: '💼',
        image: 'images/character4-career.jpg',
        difficulty: 4,
        startScore: 50,
        traits: {
            talkBonus: 1.5, // 대화 카드 +50%
            mistakePenalty: 1.5 // 말실수 -50% 추가 페널티
        },
        fullName: '최서연',
        age: 29,
        job: '변호사',
        quote: '"논리적으로 설명해 보세요"'
    }
};

// 보드 칸 설정 (40칸)
const BOARD_SPACES = [
    {id: 1, type: 'date', icon: '💑', name: '데이트'},
    {id: 2, type: 'talk', icon: '💬', name: '대화'},
    {id: 3, type: 'gift', icon: '🎁', name: '선물'},
    {id: 4, type: 'date', icon: '💑', name: '데이트'},
    {id: 5, type: 'event', icon: '🎭', name: '특수 이벤트'},
    {id: 6, type: 'talk', icon: '💬', name: '대화'},
    {id: 7, type: 'date', icon: '💑', name: '데이트'},
    {id: 8, type: 'gift', icon: '🎁', name: '선물'},
    {id: 9, type: 'date', icon: '💑', name: '데이트'},
    {id: 10, type: 'random', icon: '⚡', name: '이벤트'},
    {id: 11, type: 'talk', icon: '💬', name: '대화'},
    {id: 12, type: 'event', icon: '🎭', name: '특수 이벤트'},
    {id: 13, type: 'date', icon: '💑', name: '데이트'},
    {id: 14, type: 'gift', icon: '🎁', name: '선물'},
    {id: 15, type: 'date', icon: '💑', name: '데이트'},
    {id: 16, type: 'talk', icon: '💬', name: '대화'},
    {id: 17, type: 'event', icon: '🎭', name: '특수 이벤트'},
    {id: 18, type: 'gift', icon: '🎁', name: '선물'},
    {id: 19, type: 'date', icon: '💑', name: '데이트'},
    {id: 20, type: 'rest', icon: '☕', name: '휴식'},
    {id: 21, type: 'talk', icon: '💬', name: '대화'},
    {id: 22, type: 'event', icon: '🎭', name: '특수 이벤트'},
    {id: 23, type: 'date', icon: '💑', name: '데이트'},
    {id: 24, type: 'gift', icon: '🎁', name: '선물'},
    {id: 25, type: 'date', icon: '💑', name: '데이트'},
    {id: 26, type: 'random', icon: '⚡', name: '이벤트'},
    {id: 27, type: 'talk', icon: '💬', name: '대화'},
    {id: 28, type: 'gift', icon: '🎁', name: '선물'},
    {id: 29, type: 'event', icon: '🎭', name: '특수 이벤트'},
    {id: 30, type: 'date', icon: '💑', name: '데이트'},
    {id: 31, type: 'talk', icon: '💬', name: '대화'},
    {id: 32, type: 'gift', icon: '🎁', name: '선물'},
    {id: 33, type: 'date', icon: '💑', name: '데이트'},
    {id: 34, type: 'event', icon: '🎭', name: '특수 이벤트'},
    {id: 35, type: 'talk', icon: '💬', name: '대화'},
    {id: 36, type: 'date', icon: '💑', name: '데이트'},
    {id: 37, type: 'event', icon: '🎭', name: '특수 이벤트'},
    {id: 38, type: 'gift', icon: '🎁', name: '선물'},
    {id: 39, type: 'random', icon: '⚡', name: '이벤트'},
    {id: 40, type: 'event', icon: '🎭', name: '특수 이벤트'}
];

// 액션 카드 데이터
const CARDS = {
    // 데이트 카드
    date_movie: {id: 'date_movie', type: 'date', name: '영화 데이트', icon: '🎬', effect: 10},
    date_restaurant: {id: 'date_restaurant', type: 'date', name: '맛집 데이트', icon: '🍽️', effect: 10},
    date_walk: {id: 'date_walk', type: 'date', name: '산책 데이트', icon: '🚶', effect: 8},
    date_culture: {id: 'date_culture', type: 'date', name: '문화 생활', icon: '🎨', effect: 12},
    date_home: {id: 'date_home', type: 'date', name: '홈 데이트', icon: '🏠', effect: 9},

    // 선물 카드
    gift_flowers: {id: 'gift_flowers', type: 'gift', name: '꽃 선물', icon: '💐', effect: 8},
    gift_cosmetics: {id: 'gift_cosmetics', type: 'gift', name: '화장품/향수', icon: '💄', effect: 12},
    gift_book: {id: 'gift_book', type: 'gift', name: '책/잡지', icon: '📚', effect: 10},
    gift_fashion: {id: 'gift_fashion', type: 'gift', name: '패션 아이템', icon: '👜', effect: 15},
    gift_surprise: {id: 'gift_surprise', type: 'gift', name: '깜짝 선물', icon: '🎁', effect: 10},

    // 대화 카드
    talk_daily: {id: 'talk_daily', type: 'talk', name: '일상 대화', icon: '💬', effect: 7},
    talk_deep: {id: 'talk_deep', type: 'talk', name: '깊이 있는 대화', icon: '🎯', effect: 12},
    talk_love: {id: 'talk_love', type: 'talk', name: '사랑 고백', icon: '💝', effect: 15},
    talk_empathy: {id: 'talk_empathy', type: 'talk', name: '공감 표현', icon: '🤝', effect: 10},
    talk_compliment: {id: 'talk_compliment', type: 'talk', name: '칭찬', icon: '😊', effect: 8},

    // 특수 카드
    special_miracle: {id: 'special_miracle', type: 'special', name: '기적의 논리', icon: '🌟', effect: 'recover'},
    special_surprise: {id: 'special_surprise', type: 'special', name: '서프라이즈', icon: '🎉', effect: 'random'},
    special_patience: {id: 'special_patience', type: 'special', name: '인내', icon: '🛡️', effect: 'protect'}
};

// 특수 이벤트 데이터 (샘플)
const SPECIAL_EVENTS = [
    {
        id: 'event_weight',
        difficulty: 'easy',
        situation: '"나 살쪘어?" 여자친구가 거울을 보며 묻습니다.',
        choices: [
            {text: '아니야, 전혀 안 쪘어', score: 8},
            {text: '조금? 그래도 귀여워', score: -20},
            {text: '원래도 예뻤고 지금도 예뻐', score: 15},
            {text: '운동 같이 할까?', score: -18}
        ]
    },
    {
        id: 'event_ex',
        difficulty: 'hard',
        situation: '"전 여자친구랑 비교하면?" 위험한 질문이 날아왔습니다!',
        choices: [
            {text: '너가 훨씬 나아', score: -15},
            {text: '비교할 수 없지, 너는 특별해', score: 15},
            {text: '왜 갑자기 그런 얘기를 해?', score: -5},
            {text: '전 여친은 과거야, 지금은 너만 생각해', score: 20}
        ]
    },
    {
        id: 'event_first_date',
        difficulty: 'medium',
        situation: '"우리 처음 만난 날 기억나?" 갑작스런 기억력 테스트!',
        choices: [
            {text: '음... 언제더라?', score: -20},
            {text: '물론이지! (정확한 날짜)', score: 25},
            {text: '그때 네가 입었던 옷 기억나', score: 30},
            {text: '기억 안 나지만 그날부터 행복했어', score: 10}
        ]
    },
    {
        id: 'event_phone',
        difficulty: 'hard',
        situation: '"휴대폰 좀 봐도 돼?" 신뢰 테스트가 시작되었습니다.',
        choices: [
            {text: '왜? (방어적)', score: -15},
            {text: '응, 봐 (자연스럽게)', score: 20},
            {text: '나도 네 거 봐도 돼?', score: -10},
            {text: '숨길 거 없어 (건네며)', score: 25}
        ]
    },
    {
        id: 'event_sick',
        difficulty: 'easy',
        situation: '여자친구가 감기에 걸렸습니다. "좀 아파..."',
        choices: [
            {text: '푹 쉬어 (문자만)', score: 5},
            {text: '약이랑 죽 사들고 방문', score: 30},
            {text: '전화로 위로', score: 12},
            {text: '다 나을 때까지 기다림', score: -10}
        ]
    },
    {
        id: 'event_work_stress',
        difficulty: 'medium',
        situation: '"오늘 상사한테 혼났어..." 힘든 하루를 보냈다고 합니다.',
        choices: [
            {text: '너도 잘못한 거 있겠지', score: -30},
            {text: '힘들었겠다. 괜찮아?', score: 15},
            {text: '어떻게 된 거야? (자세히 듣기)', score: 20},
            {text: '직접 만나서 위로', score: 28}
        ]
    },
    {
        id: 'event_anniversary',
        difficulty: 'extreme',
        situation: '"오늘이 무슨 날인지 알아?" 기념일을 깜빡한 것 같습니다!',
        choices: [
            {text: '몰랐어...', score: -40},
            {text: '물론 알지! (거짓말)', score: -50},
            {text: '미안... 지금 바로 준비할게', score: -20},
            {text: '(서프라이즈 준비했음)', score: 50}
        ]
    },
    {
        id: 'event_friend_vs_date',
        difficulty: 'medium',
        situation: '"오늘 친구들이랑 약속 있는데... 너도 보고 싶어"',
        choices: [
            {text: '친구들 만나, 나는 괜찮아', score: 18},
            {text: '나랑 있어줘', score: -12},
            {text: '친구들이랑 놀다가 저녁에 보자', score: 22},
            {text: '친구가 더 중요하구나', score: -25}
        ]
    }
];

// 랜덤 이벤트 데이터
const RANDOM_EVENTS = [
    {text: '주기 카드 발동! 3턴 동안 모든 점수 변화 2배', effect: 'cycle', duration: 3},
    {text: '친구들과의 약속으로 다음 턴 행동 제약', effect: 'skip', duration: 1},
    {text: '갑작스런 피곤함... 점수 획득 -5점', effect: 'tired', duration: 1},
    {text: 'SNS에서 의심스러운 좋아요 발견!', effect: 'penalty', score: -10},
    {text: '예상치 못한 칭찬!', effect: 'bonus', score: 15},
    {text: '좋은 날씨! 다음 데이트 +5점', effect: 'weather', duration: 1}
];
