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
        birthday: { month: 3, day: 14 },  // 3월 14일 (화이트데이)
        difficulty: 5,
        difficultyMultiplier: 0.3,  // 매우 어려움 - 호감도/신뢰도 상승 30%만 적용
        startAffection: 5,  // 극도로 낮은 시작점 (10 → 5)
        startTrust: 3,  // 극도로 낮은 시작점 (5 → 3)
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
        birthday: { month: 5, day: 5 },  // 5월 5일 (어린이날)
        difficulty: 2,
        difficultyMultiplier: 0.9,  // 쉬움 - 기본 효과의 90%
        startAffection: 12,  // 2배 이하로 감소 (25 → 12)
        startTrust: 7,  // 2배 이하로 감소 (15 → 7)
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
        birthday: { month: 11, day: 11 },  // 11월 11일 (빼빼로데이)
        difficulty: 3,
        difficultyMultiplier: 0.65,  // 보통 - 호감도/신뢰도 상승 65%만 적용
        startAffection: 10,  // 2배 이하로 감소 (20 → 10)
        startTrust: 5,  // 2배 이하로 감소 (10 → 5)
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
        birthday: { month: 12, day: 25 },  // 12월 25일 (크리스마스)
        difficulty: 4,
        difficultyMultiplier: 0.45,  // 어려움 - 호감도/신뢰도 상승 45%만 적용
        startAffection: 7,  // 2배 이하로 감소 (15 → 7)
        startTrust: 4,  // 2배 이하로 감소 (8 → 4)
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
        stamina: 35,
        baseAffection: 4,
        baseTrust: 3,
        description: '소소한 대화를 나누며 동네를 걷습니다',
        scenarios: [
            {
                id: 'walk_sunset',
                situation: '해가 지는 것을 보며 산책하고 있습니다.',
                choices: [
                    { text: '"노을이 정말 예쁘네요. 당신처럼요."', affection: 6, trust: 3, type: 'romantic' },
                    { text: '조용히 손을 잡는다', affection: 5, trust: 7, type: 'skinship' },
                    { text: '"배고프지 않아요? 뭐 먹으러 갈까요?"', affection: 3, trust: 5, type: 'caring' }
                ]
            },
            {
                id: 'walk_dog',
                situation: '귀여운 강아지가 다가옵니다.',
                choices: [
                    { text: '함께 강아지를 쓰다듬는다', affection: 7, trust: 8, type: 'cute' },
                    { text: '"강아지 키우고 싶지 않아요?"', affection: 6, trust: 12, type: 'future' },
                    { text: '강아지를 피해 다른 길로 간다', affection: 3, trust: 5, type: 'neutral' }
                ]
            },
            {
                id: 'walk_bench',
                situation: '공원 벤치에 앉아 쉬고 있습니다. 주변이 조용하고 평화롭습니다.',
                choices: [
                    { text: '어깨에 기대도록 슬며시 다가간다', affection: 9, trust: 8, type: 'romantic' },
                    { text: '"어떤 생각하고 있어요?"라고 물어본다', affection: 6, trust: 12, type: 'caring' },
                    { text: '조용히 함께 경치를 바라본다', affection: 4, trust: 10, type: 'calm' }
                ]
            },
            {
                id: 'walk_rain',
                situation: '갑자기 비가 내리기 시작합니다.',
                choices: [
                    { text: '재킷을 벗어 씌워주며 뛰어간다', affection: 10, trust: 10, type: 'gentleman' },
                    { text: '편의점으로 달려가 우산을 산다', affection: 7, trust: 8, type: 'practical' },
                    { text: '"비 맞으면서 걸어볼까요?"라고 웃으며 말한다', affection: 9, trust: 5, type: 'romantic' }
                ]
            }
        ]
    },
    cafe: {
        id: 'cafe',
        name: '영화관 & 카페',
        icon: '☕',
        cost: 75000,
        stamina: 30,
        baseAffection: 6,
        baseTrust: 5,
        description: '영화를 보고 카페에서 담소를 나눕니다',
        scenarios: [
            {
                id: 'cafe_boring',
                situation: '영화가 생각보다 지루합니다.',
                choices: [
                    { text: '"좀 지루하다, 나갈까요?"', affection: -5, trust: 10, type: 'honest' },
                    { text: '끝까지 집중해서 본다', affection: 4, trust: 15, type: 'manner' },
                    { text: '귓속말로 농담을 건넨다', affection: 7, trust: 8, type: 'playful' }
                ]
            },
            {
                id: 'cafe_drink',
                situation: '카페에서 무엇을 마실지 고민합니다.',
                choices: [
                    { text: '"뭐 마실래요? 제가 살게요"', affection: 7, trust: 10, type: 'gentleman' },
                    { text: '"커플 세트 시킬까요?"', affection: 9, trust: 8, type: 'romantic' },
                    { text: '각자 주문한다', affection: 4, trust: 12, type: 'independent' }
                ]
            },
            {
                id: 'cafe_photo',
                situation: '카페 인테리어가 예쁩니다. 상대방이 사진 찍을까 말까 망설입니다.',
                choices: [
                    { text: '"제가 사진 찍어드릴게요!" 먼저 제안한다', affection: 9, trust: 10, type: 'caring' },
                    { text: '"같이 찍어요" 셀카를 찍자고 한다', affection: 10, trust: 8, type: 'romantic' },
                    { text: '조용히 분위기를 즐긴다', affection: 4, trust: 12, type: 'calm' }
                ]
            },
            {
                id: 'cafe_dessert',
                situation: '맛있어 보이는 디저트가 많습니다.',
                choices: [
                    { text: '"같이 나눠 먹어요" 여러 개 시킨다', affection: 9, trust: 12, type: 'sharing' },
                    { text: '상대방이 좋아할 만한 것을 골라준다', affection: 10, trust: 10, type: 'attentive' },
                    { text: '각자 먹고 싶은 것을 시킨다', affection: 6, trust: 10, type: 'respect' }
                ]
            }
        ]
    },
    drive: {
        id: 'drive',
        name: '근교 드라이브',
        icon: '🚗',
        cost: 200000,
        stamina: 30,
        baseAffection: 8,
        baseTrust: 6,
        description: '차를 렌트해 근교로 드라이브를 갑니다',
        scenarios: [
            {
                id: 'drive_music',
                situation: '차 안에서 음악을 틀까 말까 고민됩니다.',
                choices: [
                    { text: '"어떤 노래 좋아해요?"', affection: 9, trust: 12, type: 'interest' },
                    { text: '조용히 운전에 집중한다', affection: 6, trust: 15, type: 'safe' },
                    { text: '내가 좋아하는 노래를 튼다', affection: 7, trust: 8, type: 'share' }
                ]
            },
            {
                id: 'drive_view',
                situation: '멋진 뷰 포인트를 발견했습니다.',
                choices: [
                    { text: '차를 세우고 함께 경치를 본다', affection: 12, trust: 15, type: 'romantic' },
                    { text: '"사진 찍어드릴까요?"', affection: 10, trust: 12, type: 'caring' },
                    { text: '그냥 지나간다', affection: 3, trust: 8, type: 'skip' }
                ]
            },
            {
                id: 'drive_tired',
                situation: '장거리 운전으로 피곤해 보입니다.',
                choices: [
                    { text: '"제가 운전할게요" 교대를 제안한다', affection: 12, trust: 18, type: 'caring' },
                    { text: '휴게소에 들러 쉬자고 한다', affection: 9, trust: 15, type: 'considerate' },
                    { text: '재미있는 이야기로 졸음을 쫓아준다', affection: 10, trust: 12, type: 'entertaining' }
                ]
            },
            {
                id: 'drive_surprise',
                situation: '미리 준비한 깜짝 장소에 도착했습니다.',
                choices: [
                    { text: '"여기 오고 싶다고 했잖아요" 말한다', affection: 15, trust: 20, type: 'attentive' },
                    { text: '놀란 표정을 보며 즐거워한다', affection: 13, trust: 15, type: 'happy' },
                    { text: '"사실 준비했어요" 수줍게 말한다', affection: 12, trust: 18, type: 'shy' }
                ]
            }
        ]
    },
    dining: {
        id: 'dining',
        name: '호텔 다이닝',
        icon: '🍽️',
        cost: 450000,
        stamina: 30,
        baseAffection: 12,
        baseTrust: 8,
        description: '고급 호텔 레스토랑에서 파인 다이닝을 즐깁니다',
        scenarios: [
            {
                id: 'dining_wine',
                situation: '소믈리에가 와인을 추천합니다.',
                choices: [
                    { text: '소믈리에의 추천을 따른다', affection: 15, trust: 18, type: 'trust' },
                    { text: '"당신이 좋아하는 걸로 골라요"', affection: 16, trust: 15, type: 'caring' },
                    { text: '내가 와인을 직접 고른다', affection: 12, trust: 12, type: 'confident' }
                ]
            },
            {
                id: 'dining_manner',
                situation: '테이블 매너가 어렵습니다.',
                choices: [
                    { text: '자연스럽게 매너를 지킨다', affection: 18, trust: 25, type: 'perfect' },
                    { text: '"매너가 어렵네요" 솔직하게 말한다', affection: 13, trust: 20, type: 'honest' },
                    { text: '상대방의 행동을 따라한다', affection: 15, trust: 18, type: 'adaptive' }
                ]
            },
            {
                id: 'dining_proposal',
                situation: '분위기가 너무 좋습니다. 주변 사람들이 둘을 바라봅니다.',
                choices: [
                    { text: '"정말 행복해요" 진심을 전한다', affection: 19, trust: 25, type: 'sincere' },
                    { text: '손을 잡고 눈을 마주본다', affection: 21, trust: 22, type: 'romantic' },
                    { text: '"자주 이렇게 나왔으면 좋겠어요"', affection: 16, trust: 20, type: 'hopeful' }
                ]
            },
            {
                id: 'dining_course',
                situation: '메인 요리가 나왔습니다. 정말 맛있어 보입니다.',
                choices: [
                    { text: '"한 입 맛볼래요?" 나눠 먹자고 한다', affection: 18, trust: 20, type: 'sharing' },
                    { text: '먼저 상대방의 반응을 살핀다', affection: 15, trust: 22, type: 'considerate' },
                    { text: '"정말 맛있어요!" 즐거워한다', affection: 16, trust: 18, type: 'happy' }
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
        cost: 30000,
        stamina: 10,
        baseAffection: 3,
        baseTrust: 3,
        description: '달콤한 디저트로 기분 전환',
        category: 'sweet'
    },
    flower: {
        id: 'flower',
        name: '꽃다발',
        icon: '💐',
        cost: 50000,
        stamina: 10,
        baseAffection: 6,
        baseTrust: 4,
        description: '로맨틱한 분위기를 연출',
        category: 'romantic'
    },
    perfume: {
        id: 'perfume',
        name: '향수/화장품',
        icon: '💄',
        cost: 300000,
        stamina: 10,
        baseAffection: 10,
        baseTrust: 6,
        description: '취향을 타지만 성공 시 효과 큼',
        category: 'luxury'
    },
    bag: {
        id: 'bag',
        name: '명품 가방',
        icon: '👜',
        cost: 4500000,
        stamina: 10,
        baseAffection: 16,
        baseTrust: 8,
        description: '고가의 명품으로 대폭 상승',
        category: 'premium'
    },
    ring: {
        id: 'ring',
        name: '다이아 반지',
        icon: '💍',
        cost: 7000000,
        stamina: 10,
        baseAffection: 20,
        baseTrust: 12,
        description: '프로포즈 필수 아이템',
        category: 'proposal',
        proposalBonus: 15
    }
};

// 대화 주제 데이터
const TALK_TOPICS = {
    daily: {
        id: 'daily',
        name: '일상 이야기',
        icon: '☀️',
        stamina: 15,
        baseAffection: 2,  // 대폭 감소 (4 → 2)
        baseTrust: 2,  // 대폭 감소 (5 → 2)
        description: '오늘 있었던 일을 나눕니다',
        scenarios: [
            {
                id: 'daily_work',
                situation: '오늘 회사에서 힘든 일이 있었다고 합니다.',
                choices: [
                    { text: '"그래서 어떻게 했어요?"', affection: 6, trust: 15, type: 'listen' },
                    { text: '"제가 도와드릴 수 있을까요?"', affection: 7, trust: 18, type: 'help' },
                    { text: '"힘내요, 당신은 잘하고 있어요"', affection: 9, trust: 12, type: 'encourage' }
                ]
            },
            {
                id: 'daily_hobby',
                situation: '요즘 새로운 취미를 시작했다고 합니다.',
                choices: [
                    { text: '"재밌겠다! 더 얘기해줘요"', affection: 7, trust: 10, type: 'interest' },
                    { text: '"저도 함께 해도 될까요?"', affection: 9, trust: 15, type: 'join' },
                    { text: '"좋네요" 라고만 답한다', affection: 3, trust: 5, type: 'passive' }
                ]
            },
            {
                id: 'daily_food',
                situation: '오늘 점심으로 무엇을 먹었는지 물어봅니다.',
                choices: [
                    { text: '메뉴를 자세히 설명하며 같이 먹으러 가자고 한다', affection: 9, trust: 12, type: 'enthusiastic' },
                    { text: '간단히 대답하고 상대방은 뭘 먹었는지 물어본다', affection: 7, trust: 15, type: 'balanced' },
                    { text: '"그냥 평범하게 먹었어요"', affection: 3, trust: 8, type: 'simple' }
                ]
            },
            {
                id: 'daily_weather',
                situation: '"오늘 날씨 정말 좋지 않아요?"라고 말합니다.',
                choices: [
                    { text: '"그러게요, 이런 날은 산책하기 딱이죠"', affection: 7, trust: 10, type: 'agree' },
                    { text: '"당신이랑 함께라면 날씨는 중요하지 않아요"', affection: 10, trust: 8, type: 'romantic' },
                    { text: '"그렇네요"라고만 답한다', affection: 3, trust: 5, type: 'passive' }
                ]
            }
        ]
    },
    comfort: {
        id: 'comfort',
        name: '위로하기',
        icon: '🤗',
        stamina: 15,
        baseAffection: 2,  // 대폭 감소 (5 → 2)
        baseTrust: 3,  // 대폭 감소 (7 → 3)
        description: '힘든 일을 들어주고 위로합니다',
        scenarios: [
            {
                id: 'comfort_sad',
                situation: '기분이 많이 안 좋아 보입니다.',
                choices: [
                    { text: '조용히 손을 잡아준다', affection: 10, trust: 20, type: 'skinship' },
                    { text: '"무슨 일 있어요? 말해줄래요?"', affection: 9, trust: 22, type: 'talk' },
                    { text: '"괜찮아질 거예요"', affection: 6, trust: 12, type: 'simple' }
                ]
            },
            {
                id: 'comfort_stress',
                situation: '요즘 스트레스가 많다고 합니다.',
                choices: [
                    { text: '"제가 뭐 도와드릴 게 있을까요?"', affection: 9, trust: 20, type: 'helpful' },
                    { text: '"함께 스트레스 풀러 가요"', affection: 10, trust: 15, type: 'active' },
                    { text: '"이야기 들어줄게요"', affection: 7, trust: 22, type: 'listener' }
                ]
            },
            {
                id: 'comfort_tired',
                situation: '피곤해 보입니다.',
                choices: [
                    { text: '"푹 쉬세요. 제가 옆에 있을게요"', affection: 12, trust: 18, type: 'caring' },
                    { text: '"잠깐 눈 붙이고 가세요"', affection: 9, trust: 15, type: 'practical' },
                    { text: '어깨를 주물러준다', affection: 13, trust: 20, type: 'physical' }
                ]
            }
        ]
    },
    future: {
        id: 'future',
        name: '미래 계획',
        icon: '🌟',
        stamina: 15,
        baseAffection: 3,  // 대폭 감소 (6 → 3)
        baseTrust: 4,  // 대폭 감소 (10 → 4)
        description: '앞으로의 계획과 꿈을 이야기합니다',
        minAffection: 40,
        scenarios: [
            {
                id: 'future_dream',
                situation: '결혼에 대한 생각을 물어봅니다.',
                choices: [
                    { text: '"당신과 함께라면 언제든 좋아요"', affection: 15, trust: 30, type: 'romantic' },
                    { text: '"서로 준비되었을 때가 좋겠어요"', affection: 10, trust: 28, type: 'realistic' },
                    { text: '"아직 생각 안 해봤어요"', affection: -10, trust: -15, type: 'avoid' }
                ]
            },
            {
                id: 'future_house',
                situation: '"나중에 어떤 집에서 살고 싶어요?"라고 물어봅니다.',
                choices: [
                    { text: '"당신이 원하는 곳이면 어디든 좋아요"', affection: 12, trust: 25, type: 'flexible' },
                    { text: '구체적인 장소와 이유를 설명한다', affection: 10, trust: 28, type: 'detailed' },
                    { text: '"같이 살 집을 상상해봤어요?"라고 되묻는다', affection: 13, trust: 30, type: 'reciprocal' }
                ]
            },
            {
                id: 'future_children',
                situation: '아이에 대한 생각을 물어봅니다.',
                choices: [
                    { text: '"당신을 닮은 아이면 좋겠어요"', affection: 15, trust: 28, type: 'sweet' },
                    { text: '"같이 천천히 생각해봐요"', affection: 10, trust: 25, type: 'thoughtful' },
                    { text: '"둘이서 먼저 행복하면 좋겠어요"', affection: 12, trust: 22, type: 'couple_first' }
                ]
            }
        ]
    },
    humor: {
        id: 'humor',
        name: '농담/유머',
        icon: '😄',
        stamina: 15,
        baseAffection: 3,  // 대폭 감소 (8 → 3)
        baseTrust: 1,  // 대폭 감소 (3 → 1)
        description: '즐거운 농담으로 분위기를 띄웁니다',
        random: true,
        successRate: 0.7,
        scenarios: [
            {
                id: 'humor_joke',
                situation: '재밌는 농담을 하려고 합니다.',
                choices: [
                    { text: '아재개그를 시전한다', affection: 15, trust: 10, type: 'dad_joke', successRate: 0.5 },
                    { text: '최근 유행하는 밈을 사용한다', affection: 12, trust: 12, type: 'meme', successRate: 0.7 },
                    { text: '가벼운 장난을 친다', affection: 10, trust: 15, type: 'playful', successRate: 0.8 }
                ]
            },
            {
                id: 'humor_tease',
                situation: '상대방을 살짝 놀리고 싶습니다.',
                choices: [
                    { text: '귀여운 별명을 지어준다', affection: 13, trust: 12, type: 'nickname', successRate: 0.7 },
                    { text: '장난스럽게 웃으며 놀린다', affection: 12, trust: 15, type: 'tease', successRate: 0.6 },
                    { text: '재미있었던 에피소드를 언급한다', affection: 10, trust: 18, type: 'story', successRate: 0.8 }
                ]
            },
            {
                id: 'humor_imitate',
                situation: '상대방의 말투를 흉내내고 싶습니다.',
                choices: [
                    { text: '귀엽게 따라한다', affection: 15, trust: 10, type: 'cute', successRate: 0.6 },
                    { text: '과장되게 웃기게 따라한다', affection: 12, trust: 8, type: 'exaggerate', successRate: 0.5 },
                    { text: '살짝만 흉내내고 웃는다', affection: 10, trust: 15, type: 'gentle', successRate: 0.8 }
                ]
            }
        ]
    }
};

// 돈 벌기 옵션
const WORK_OPTIONS = {
    convenience: {
        id: 'convenience',
        name: '편의점 알바',
        icon: '🏪',
        stamina: 25,
        money: 50000,
        maxPerDay: 3,
        description: '편한 실내 알바, 낮은 수익'
    },
    tutoring: {
        id: 'tutoring',
        name: '과외',
        icon: '📚',
        stamina: 35,
        money: 100000,
        maxPerDay: 2,
        description: '머리를 써야 하지만 수익이 좋음'
    },
    construction: {
        id: 'construction',
        name: '건설 일용직',
        icon: '🏗️',
        stamina: 55,
        money: 150000,
        maxPerDay: 1,
        description: '힘들지만 돈을 많이 벌 수 있음'
    },
    freelance: {
        id: 'freelance',
        name: '프리랜서',
        icon: '💻',
        stamina: 40,
        minMoney: 80000,
        maxMoney: 200000,
        maxPerDay: 2,
        description: '성과에 따라 수익이 변동됨'
    },
    stock: {
        id: 'stock',
        name: '주식 투자',
        icon: '📈',
        stamina: 15,
        investMin: 50000,
        investMax: 200000,
        maxPerDay: 1,
        description: '리스크가 크지만 큰 수익 가능'
    },
    delivery: {
        id: 'delivery',
        name: '배달 아르바이트',
        icon: '🛵',
        stamina: 45,
        money: 120000,
        maxPerDay: 2,
        description: '체력 소모가 크지만 수익이 괜찮음'
    }
};

// ============================================
// 스킨십 옵션
const SKINSHIP_OPTIONS = {
    handhold: {
        id: 'handhold',
        name: '손 잡기',
        icon: '🤝',
        minAffection: 30,
        stamina: 10,
        baseAffection: 8,
        baseTrust: 5,
        description: '부담스럽지 않은 스킨십',
        successRate: 0.9  // 호감도 충족 시 90% 성공
    },
    hug: {
        id: 'hug',
        name: '포옹하기',
        icon: '🤗',
        minAffection: 50,
        stamina: 15,
        baseAffection: 15,
        baseTrust: 10,
        description: '조금 더 친밀한 스킨십',
        successRate: 0.8
    },
    kiss: {
        id: 'kiss',
        name: '키스하기',
        icon: '💋',
        minAffection: 70,
        stamina: 20,
        baseAffection: 25,
        baseTrust: 15,
        description: '로맨틱한 스킨십',
        successRate: 0.7
    },
    trip: {
        id: 'trip',
        name: '1박2일 여행 제안',
        icon: '✈️',
        minAffection: 85,
        stamina: 30,
        money: 300000,
        baseAffection: 35,
        baseTrust: 25,
        description: '아주 친밀한 관계에서만 가능',
        successRate: 0.6
    }
};

// ============================================
// 돌발 상황 이벤트
// ============================================
const CRISIS_EVENTS = [
    {
        id: 'jealousy',
        situation: '거리를 걷다가 당신의 전 연인과 마주쳤습니다. 상대방이 불편한 표정을 짓습니다.',
        choices: [
            {
                text: '상황을 솔직하게 설명하고 오해를 풀려고 노력한다.',
                affection: 15,
                trust: 20,
                type: 'honest'
            },
            {
                text: '가볍게 인사만 하고 빠르게 자리를 피한다.',
                affection: 5,
                trust: -5,
                type: 'avoid'
            },
            {
                text: '전 연인을 완전히 무시하고 상대방만 신경쓴다.',
                affection: -10,
                trust: -15,
                type: 'ignore'
            }
        ]
    },
    {
        id: 'late',
        situation: '약속 시간에 늦게 되었습니다. 상대방이 화난 표정으로 기다리고 있습니다.',
        choices: [
            {
                text: '진심으로 사과하고 다시는 늦지 않겠다고 약속한다.',
                affection: 5,
                trust: 10,
                type: 'apologize'
            },
            {
                text: '변명을 늘어놓으며 상황을 설명한다.',
                affection: -5,
                trust: -10,
                type: 'excuse'
            },
            {
                text: '선물을 사서 기분을 풀어드린다.',
                affection: 10,
                trust: -5,
                money: -50000,
                type: 'gift'
            }
        ]
    },
    {
        id: 'friend_issue',
        situation: '상대방의 친한 친구가 당신에 대해 안 좋게 이야기하는 것을 들었다고 합니다.',
        choices: [
            {
                text: '친구를 만나서 직접 대화하며 오해를 풀겠다고 한다.',
                affection: 15,
                trust: 15,
                type: 'proactive'
            },
            {
                text: '상대방에게 친구와의 관계를 끊으라고 요구한다.',
                affection: -20,
                trust: -15,
                type: 'demand'
            },
            {
                text: '신경쓰지 말자고 위로하며 넘어간다.',
                affection: 5,
                trust: 0,
                type: 'comfort'
            }
        ]
    },
    {
        id: 'family_meeting',
        situation: '갑자기 부모님이 만나자고 하십니다. 상대방이 긴장한 표정을 짓습니다.',
        choices: [
            {
                text: '부모님을 미리 만나 이야기를 나누고 준비한다.',
                affection: 10,
                trust: 20,
                type: 'prepare'
            },
            {
                text: '부모님께 시간을 좀 더 달라고 부탁한다.',
                affection: 5,
                trust: 5,
                type: 'delay'
            },
            {
                text: '아무 준비 없이 바로 만나자고 한다.',
                affection: -10,
                trust: -10,
                type: 'rush'
            }
        ]
    },
    {
        id: 'work_stress',
        situation: '상대방이 직장에서 스트레스를 많이 받아 힘들어하고 있습니다.',
        choices: [
            {
                text: '진지하게 이야기를 들어주고 공감한다.',
                affection: 15,
                trust: 15,
                type: 'listen'
            },
            {
                text: '해결책을 제시하며 조언한다.',
                affection: 5,
                trust: 10,
                type: 'advise'
            },
            {
                text: '재미있는 곳으로 데려가 기분전환을 시킨다.',
                affection: 10,
                trust: 5,
                money: -100000,
                type: 'distract'
            }
        ]
    },
    {
        id: 'forgot_anniversary',
        situation: '중요한 기념일을 깜빡했습니다. 상대방이 실망한 표정입니다.',
        choices: [
            {
                text: '즉시 사과하고 특별한 선물을 준비한다.',
                affection: 10,
                trust: 5,
                money: -200000,
                type: 'compensate'
            },
            {
                text: '진심으로 사과하고 다음에 두 배로 보상하겠다고 약속한다.',
                affection: 5,
                trust: 10,
                type: 'promise'
            },
            {
                text: '그렇게 중요한 날이었냐며 가볍게 넘긴다.',
                affection: -25,
                trust: -20,
                type: 'dismiss'
            }
        ]
    },
    {
        id: 'misunderstanding',
        situation: '다른 사람과 친하게 지내는 것을 본 상대방이 오해하고 있습니다.',
        choices: [
            {
                text: '솔직하게 상황을 설명하고 오해를 푼다.',
                affection: 10,
                trust: 20,
                type: 'explain'
            },
            {
                text: '화를 내며 믿지 못하는 것에 서운함을 표현한다.',
                affection: -10,
                trust: -15,
                type: 'angry'
            },
            {
                text: '앞으로 조심하겠다고 약속한다.',
                affection: 5,
                trust: 10,
                type: 'careful'
            }
        ]
    },
    {
        id: 'surprise_visit',
        situation: '예고 없이 집에 놀러 왔는데, 집이 엉망입니다.',
        choices: [
            {
                text: '솔직하게 사과하고 빠르게 정리한다.',
                affection: 5,
                trust: 10,
                type: 'clean'
            },
            {
                text: '밖에서 놀자고 하며 집 안으로 들어오지 못하게 한다.',
                affection: -5,
                trust: -10,
                type: 'avoid'
            },
            {
                text: '부끄러워하면서도 솔직하게 들어오라고 한다.',
                affection: 10,
                trust: 15,
                type: 'honest'
            }
        ]
    }
];

// ============================================
// 첫 만남 시나리오
// ============================================
const FIRST_MEETING_SCENARIOS = {
    perfectionist: {
        situation: '고급 카페에서 우연히 만난 그녀. 완벽한 자세로 책을 읽고 있습니다. 어떻게 다가갈까요?',
        choices: [
            {
                text: '"그 책 재미있나요? 저도 읽어봤는데..."라고 말을 건넨다',
                affection: 12,
                trust: 15,
                type: 'intellectual'
            },
            {
                text: '"혼자 오셨어요? 같이 커피 한 잔 어때요?"',
                affection: 5,
                trust: 5,
                type: 'casual'
            },
            {
                text: '조용히 옆 자리에 앉아 책을 읽는다',
                affection: 8,
                trust: 10,
                type: 'respectful'
            }
        ]
    },
    positive: {
        situation: '공원에서 강아지와 즐겁게 놀고 있는 그녀. 밝은 미소가 인상적입니다. 어떻게 다가갈까요?',
        choices: [
            {
                text: '"강아지 정말 귀엽네요! 이름이 뭐예요?"라고 밝게 말을 건넨다',
                affection: 15,
                trust: 12,
                type: 'friendly'
            },
            {
                text: '강아지에게 간식을 주며 자연스럽게 대화를 시작한다',
                affection: 18,
                trust: 15,
                type: 'thoughtful'
            },
            {
                text: '"저도 강아지 좋아하는데, 같이 산책할까요?"',
                affection: 12,
                trust: 10,
                type: 'direct'
            }
        ]
    },
    tsundere: {
        situation: '서점에서 만화책을 고르던 그녀. 당신이 쳐다보자 얼굴을 붉히며 돌아섭니다. 어떻게 다가갈까요?',
        choices: [
            {
                text: '"그 만화 재미있어요. 저도 좋아하는데..."라고 부드럽게 말을 건넨다',
                affection: 15,
                trust: 12,
                type: 'gentle'
            },
            {
                text: '"취향 좋으시네요! 같이 만화 이야기 나눠요"라고 적극적으로 말한다',
                affection: 8,
                trust: 8,
                type: 'enthusiastic'
            },
            {
                text: '멀리서 미소만 짓고 자신의 책을 고른다',
                affection: 10,
                trust: 15,
                type: 'patient'
            }
        ]
    },
    career: {
        situation: '비즈니스 세미나장에서 만난 그녀. 질문을 하며 논리정연하게 발표자를 압도하고 있습니다. 어떻게 다가갈까요?',
        choices: [
            {
                text: '세미나 후 "좋은 질문이었습니다. 커피 마시면서 이야기 나눠볼까요?"',
                affection: 15,
                trust: 18,
                type: 'professional'
            },
            {
                text: '명함을 건네며 "당신의 관점이 인상적이었습니다"',
                affection: 12,
                trust: 15,
                type: 'respectful'
            },
            {
                text: '"정말 멋있었어요!"라고 칭찬한다',
                affection: 8,
                trust: 8,
                type: 'admiring'
            }
        ]
    }
};
