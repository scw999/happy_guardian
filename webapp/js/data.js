// 캐릭터 데이터
const CHARACTERS = {
    perfectionist: {
        id: 'perfectionist',
        name: '완벽주의 센서티브',
        fullName: '서윤아',
        icon: '💎',
        image: 'images/character1-perfectionist-normal.jpg',
        age: 27,
        job: '패션 디자이너',
        quote: '"완벽하지 않으면 의미 없어요"',
        difficulty: 5,
        startAffection: 20,
        startTrust: 10,
        preferences: {
            // 데이트 선호도 (곱수)
            dates: {
                walk: 0.5,
                cafe: 0.8,
                drive: 1.2,
                dining: 1.5
            },
            // 선물 선호도
            gifts: {
                cake: 0.7,
                flower: 0.9,
                perfume: 1.3,
                bag: 1.5,
                ring: 1.2
            },
            // 대화 선호도
            talks: {
                daily: 0.8,
                comfort: 1.1,
                future: 1.3,
                humor: 0.6
            }
        },
        traits: {
            highCostBonus: 1.5,      // 고비용 데이트 보너스
            lowCostPenalty: 0.5,     // 저비용 데이트 페널티
            mistakePenalty: 2.0      // 실수 시 페널티 2배
        }
    },
    positive: {
        id: 'positive',
        name: '비타민 긍정녀',
        fullName: '강하영',
        icon: '☀️',
        image: 'images/character2-positive-normal.jpg',
        age: 25,
        job: '초등학교 교사',
        quote: '"오늘도 화이팅! 우리 행복하자!"',
        difficulty: 2,
        startAffection: 50,
        startTrust: 30,
        preferences: {
            dates: {
                walk: 1.5,
                cafe: 1.2,
                drive: 1.1,
                dining: 0.9
            },
            gifts: {
                cake: 1.4,
                flower: 1.3,
                perfume: 1.0,
                bag: 0.8,
                ring: 1.1
            },
            talks: {
                daily: 1.3,
                comfort: 1.4,
                future: 1.1,
                humor: 1.5
            }
        },
        traits: {
            lowCostBonus: 1.3,       // 저비용 데이트 효율 좋음
            neglectPenalty: 5,       // 3일 이상 방치 시 매일 -5
            forgivingNature: true    // 실수에 관대
        }
    },
    tsundere: {
        id: 'tsundere',
        name: '반전 매력의 츤데레',
        fullName: '이지우',
        icon: '🌸',
        image: 'images/character3-tsundere-normal.jpg',
        age: 24,
        job: '웹툰 작가',
        quote: '"별로... 안 좋은데... (좋아)"',
        difficulty: 3,
        startAffection: 30,
        startTrust: 20,
        preferences: {
            dates: {
                walk: 1.1,
                cafe: 1.3,
                drive: 1.0,
                dining: 1.1
            },
            gifts: {
                cake: 1.2,
                flower: 1.4,
                perfume: 1.1,
                bag: 0.9,
                ring: 1.3
            },
            talks: {
                daily: 1.2,
                comfort: 1.3,
                future: 0.9,
                humor: 1.1
            }
        },
        traits: {
            delayedEffect: true,     // 효과가 다음 날 반영
            stableScore: true,       // 점수 변동 적음
            tsundereBonus: 1.2       // 특정 상황에서 보너스
        }
    },
    career: {
        id: 'career',
        name: '논리적인 커리어우먼',
        fullName: '최서연',
        icon: '💼',
        image: 'images/character4-career-normal.jpg',
        age: 29,
        job: '변호사',
        quote: '"논리적으로 설명해 보세요"',
        difficulty: 4,
        startAffection: 30,
        startTrust: 20,
        preferences: {
            dates: {
                walk: 0.9,
                cafe: 1.1,
                drive: 1.0,
                dining: 1.3
            },
            gifts: {
                cake: 0.8,
                flower: 0.9,
                perfume: 1.2,
                bag: 1.1,
                ring: 1.2
            },
            talks: {
                daily: 1.0,
                comfort: 1.1,
                future: 1.5,
                humor: 0.8
            }
        },
        traits: {
            talkBonus: 1.5,          // 대화 효과 1.5배
            logicRequired: true,     // 논리적 대화 선호
            mistakePenalty: 1.5      // 비논리적 대화 시 페널티
        }
    }
};

// 데이트 장소 데이터
const DATE_LOCATIONS = {
    walk: {
        id: 'walk',
        name: '동네 산책',
        icon: '🚶',
        cost: 0,
        stamina: 30,
        baseAffection: 10,
        baseTrust: 8,
        description: '소소한 대화를 나누며 동네를 걷습니다',
        scenarios: [
            {
                id: 'walk_sunset',
                situation: '해가 지는 것을 보며 산책하고 있습니다.',
                choices: [
                    { text: '"노을이 정말 예쁘네요. 당신처럼요."', affection: 15, trust: 5, type: 'romantic' },
                    { text: '조용히 손을 잡는다', affection: 12, trust: 10, type: 'skinship' },
                    { text: '"배고프지 않아요? 뭐 먹으러 갈까요?"', affection: 8, trust: 8, type: 'caring' }
                ]
            },
            {
                id: 'walk_dog',
                situation: '귀여운 강아지가 다가옵니다.',
                choices: [
                    { text: '함께 강아지를 쓰다듬는다', affection: 12, trust: 8, type: 'cute' },
                    { text: '"강아지 키우고 싶지 않아요?"', affection: 10, trust: 12, type: 'future' },
                    { text: '강아지를 피해 다른 길로 간다', affection: 5, trust: 5, type: 'neutral' }
                ]
            }
        ]
    },
    cafe: {
        id: 'cafe',
        name: '영화관 & 카페',
        icon: '☕',
        cost: 50000,
        stamina: 30,
        baseAffection: 15,
        baseTrust: 12,
        description: '영화를 보고 카페에서 담소를 나눕니다',
        scenarios: [
            {
                id: 'cafe_boring',
                situation: '영화가 생각보다 지루합니다.',
                choices: [
                    { text: '"좀 지루하다, 나갈까요?"', affection: -5, trust: 10, type: 'honest' },
                    { text: '끝까지 집중해서 본다', affection: 8, trust: 15, type: 'manner' },
                    { text: '귓속말로 농담을 건넨다', affection: 12, trust: 8, type: 'playful' }
                ]
            },
            {
                id: 'cafe_drink',
                situation: '카페에서 무엇을 마실지 고민합니다.',
                choices: [
                    { text: '"뭐 마실래요? 제가 살게요"', affection: 12, trust: 10, type: 'gentleman' },
                    { text: '"커플 세트 시킬까요?"', affection: 15, trust: 8, type: 'romantic' },
                    { text: '각자 주문한다', affection: 8, trust: 12, type: 'independent' }
                ]
            }
        ]
    },
    drive: {
        id: 'drive',
        name: '근교 드라이브',
        icon: '🚗',
        cost: 150000,
        stamina: 30,
        baseAffection: 20,
        baseTrust: 15,
        description: '차를 렌트해 근교로 드라이브를 갑니다',
        scenarios: [
            {
                id: 'drive_music',
                situation: '차 안에서 음악을 틀까 말까 고민됩니다.',
                choices: [
                    { text: '"어떤 노래 좋아해요?"', affection: 15, trust: 12, type: 'interest' },
                    { text: '조용히 운전에 집중한다', affection: 10, trust: 15, type: 'safe' },
                    { text: '내가 좋아하는 노래를 튼다', affection: 12, trust: 8, type: 'share' }
                ]
            },
            {
                id: 'drive_view',
                situation: '멋진 뷰 포인트를 발견했습니다.',
                choices: [
                    { text: '차를 세우고 함께 경치를 본다', affection: 20, trust: 15, type: 'romantic' },
                    { text: '"사진 찍어드릴까요?"', affection: 18, trust: 12, type: 'caring' },
                    { text: '그냥 지나간다', affection: 5, trust: 8, type: 'skip' }
                ]
            }
        ]
    },
    dining: {
        id: 'dining',
        name: '호텔 다이닝',
        icon: '🍽️',
        cost: 300000,
        stamina: 30,
        baseAffection: 30,
        baseTrust: 20,
        description: '고급 호텔 레스토랑에서 파인 다이닝을 즐깁니다',
        scenarios: [
            {
                id: 'dining_wine',
                situation: '소믈리에가 와인을 추천합니다.',
                choices: [
                    { text: '소믈리에의 추천을 따른다', affection: 25, trust: 18, type: 'trust' },
                    { text: '"당신이 좋아하는 걸로 골라요"', affection: 28, trust: 15, type: 'caring' },
                    { text: '내가 와인을 직접 고른다', affection: 20, trust: 12, type: 'confident' }
                ]
            },
            {
                id: 'dining_manner',
                situation: '테이블 매너가 어렵습니다.',
                choices: [
                    { text: '자연스럽게 매너를 지킨다', affection: 30, trust: 25, type: 'perfect' },
                    { text: '"매너가 어렵네요" 솔직하게 말한다', affection: 22, trust: 20, type: 'honest' },
                    { text: '상대방의 행동을 따라한다', affection: 25, trust: 18, type: 'adaptive' }
                ]
            }
        ]
    }
};

// 선물 아이템 데이터
const GIFT_ITEMS = {
    cake: {
        id: 'cake',
        name: '조각 케이크',
        icon: '🍰',
        cost: 20000,
        stamina: 10,
        baseAffection: 8,
        baseTrust: 5,
        description: '달콤한 디저트로 기분 전환',
        category: 'sweet'
    },
    flower: {
        id: 'flower',
        name: '꽃다발',
        icon: '💐',
        cost: 50000,
        stamina: 10,
        baseAffection: 15,
        baseTrust: 10,
        description: '로맨틱한 분위기를 연출',
        category: 'romantic'
    },
    perfume: {
        id: 'perfume',
        name: '향수/화장품',
        icon: '💄',
        cost: 200000,
        stamina: 10,
        baseAffection: 25,
        baseTrust: 15,
        description: '취향을 타지만 성공 시 효과 큼',
        category: 'luxury'
    },
    bag: {
        id: 'bag',
        name: '명품 가방',
        icon: '👜',
        cost: 3000000,
        stamina: 10,
        baseAffection: 40,
        baseTrust: 20,
        description: '고가의 명품으로 대폭 상승',
        category: 'premium'
    },
    ring: {
        id: 'ring',
        name: '다이아 반지',
        icon: '💍',
        cost: 5000000,
        stamina: 10,
        baseAffection: 50,
        baseTrust: 30,
        description: '프로포즈 필수 아이템',
        category: 'proposal',
        proposalBonus: 20
    }
};

// 대화 주제 데이터
const TALK_TOPICS = {
    daily: {
        id: 'daily',
        name: '일상 이야기',
        icon: '☀️',
        stamina: 15,
        baseAffection: 10,
        baseTrust: 12,
        description: '오늘 있었던 일을 나눕니다',
        scenarios: [
            {
                id: 'daily_work',
                situation: '오늘 회사에서 힘든 일이 있었다고 합니다.',
                choices: [
                    { text: '"그래서 어떻게 했어요?"', affection: 10, trust: 15, type: 'listen' },
                    { text: '"제가 도와드릴 수 있을까요?"', affection: 12, trust: 18, type: 'help' },
                    { text: '"힘내요, 당신은 잘하고 있어요"', affection: 15, trust: 12, type: 'encourage' }
                ]
            },
            {
                id: 'daily_hobby',
                situation: '요즘 새로운 취미를 시작했다고 합니다.',
                choices: [
                    { text: '"재밌겠다! 더 얘기해줘요"', affection: 12, trust: 10, type: 'interest' },
                    { text: '"저도 함께 해도 될까요?"', affection: 15, trust: 15, type: 'join' },
                    { text: '"좋네요" 라고만 답한다', affection: 5, trust: 5, type: 'passive' }
                ]
            }
        ]
    },
    comfort: {
        id: 'comfort',
        name: '위로하기',
        icon: '🤗',
        stamina: 15,
        baseAffection: 12,
        baseTrust: 18,
        description: '힘든 일을 들어주고 위로합니다',
        scenarios: [
            {
                id: 'comfort_sad',
                situation: '기분이 많이 안 좋아 보입니다.',
                choices: [
                    { text: '조용히 손을 잡아준다', affection: 18, trust: 20, type: 'skinship' },
                    { text: '"무슨 일 있어요? 말해줄래요?"', affection: 15, trust: 22, type: 'talk' },
                    { text: '"괜찮아질 거예요"', affection: 10, trust: 12, type: 'simple' }
                ]
            }
        ]
    },
    future: {
        id: 'future',
        name: '미래 계획',
        icon: '🌟',
        stamina: 15,
        baseAffection: 15,
        baseTrust: 25,
        description: '앞으로의 계획과 꿈을 이야기합니다',
        minAffection: 40,
        scenarios: [
            {
                id: 'future_dream',
                situation: '결혼에 대한 생각을 물어봅니다.',
                choices: [
                    { text: '"당신과 함께라면 언제든 좋아요"', affection: 25, trust: 30, type: 'romantic' },
                    { text: '"서로 준비되었을 때가 좋겠어요"', affection: 18, trust: 28, type: 'realistic' },
                    { text: '"아직 생각 안 해봤어요"', affection: -10, trust: -15, type: 'avoid' }
                ]
            }
        ]
    },
    humor: {
        id: 'humor',
        name: '농담/유머',
        icon: '😄',
        stamina: 15,
        baseAffection: 20,
        baseTrust: 8,
        description: '즐거운 농담으로 분위기를 띄웁니다',
        random: true,
        successRate: 0.7,
        scenarios: [
            {
                id: 'humor_joke',
                situation: '재밌는 농담을 하려고 합니다.',
                choices: [
                    { text: '아재개그를 시전한다', affection: 25, trust: 10, type: 'dad_joke', successRate: 0.5 },
                    { text: '최근 유행하는 밈을 사용한다', affection: 20, trust: 12, type: 'meme', successRate: 0.7 },
                    { text: '가벼운 장난을 친다', affection: 18, trust: 15, type: 'playful', successRate: 0.8 }
                ]
            }
        ]
    }
};

// 알바 옵션
const WORK_OPTIONS = {
    parttime: {
        id: 'parttime',
        name: '단기 알바',
        icon: '💼',
        stamina: 40,
        money: 150000,
        maxPerDay: 2,
        description: '체력을 소모해 돈을 벌니다'
    }
};
