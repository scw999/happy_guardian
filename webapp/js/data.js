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
                    { text: '"배고프지 않아요? 뭐 먹으러 갈까요?"', affection: 3, trust: 5, type: 'caring' },
                    { text: '휴대폰으로 사진만 찍느라 정신없다', affection: -5, trust: -8, type: 'distracted' }
                ]
            },
            {
                id: 'walk_dog',
                situation: '귀여운 강아지가 다가옵니다.',
                choices: [
                    { text: '함께 강아지를 쓰다듬는다', affection: 7, trust: 8, type: 'cute' },
                    { text: '"강아지 키우고 싶지 않아요?"', affection: 6, trust: 12, type: 'future' },
                    { text: '강아지를 피해 다른 길로 간다', affection: 3, trust: 5, type: 'neutral' },
                    { text: '"더러워요" 강아지를 밀어낸다', affection: -10, trust: -12, type: 'rude' }
                ]
            },
            {
                id: 'walk_bench',
                situation: '공원 벤치에 앉아 쉬고 있습니다. 주변이 조용하고 평화롭습니다.',
                choices: [
                    { text: '어깨에 기대도록 슬며시 다가간다', affection: 9, trust: 8, type: 'romantic' },
                    { text: '"어떤 생각하고 있어요?"라고 물어본다', affection: 6, trust: 12, type: 'caring' },
                    { text: '조용히 함께 경치를 바라본다', affection: 4, trust: 10, type: 'calm' },
                    { text: '계속 하품하며 지루해한다', affection: -8, trust: -10, type: 'bored' }
                ]
            },
            {
                id: 'walk_rain',
                situation: '갑자기 비가 내리기 시작합니다.',
                choices: [
                    { text: '재킷을 벗어 씌워주며 뛰어간다', affection: 10, trust: 10, type: 'gentleman' },
                    { text: '편의점으로 달려가 우산을 산다', affection: 7, trust: 8, type: 'practical' },
                    { text: '"비 맞으면서 걸어볼까요?"라고 웃으며 말한다', affection: 9, trust: 5, type: 'romantic' },
                    { text: '"왜 우산 안 챙겼어요?" 짜증낸다', affection: -12, trust: -15, type: 'blaming' }
                ]
            },
            {
                id: 'walk_ice_cream',
                situation: '아이스크림 트럭이 지나갑니다.',
                choices: [
                    { text: '"아이스크림 먹고 싶으세요?" 사주겠다고 한다', affection: 8, trust: 8, type: 'treat' },
                    { text: '같이 고르며 "어떤 맛 좋아해요?"', affection: 7, trust: 10, type: 'interest' },
                    { text: '그냥 지나친다', affection: 2, trust: 5, type: 'pass' },
                    { text: '"살 찌는데 안 먹는 게 좋을걸요"', affection: -15, trust: -12, type: 'body_shaming' }
                ]
            },
            {
                id: 'walk_street_music',
                situation: '거리 공연을 하는 뮤지션이 연주 중입니다.',
                choices: [
                    { text: '함께 멈춰 서서 음악을 감상한다', affection: 8, trust: 10, type: 'appreciate' },
                    { text: '"춤출까요?" 장난스럽게 제안한다', affection: 10, trust: 8, type: 'playful' },
                    { text: '팁을 주며 "좋은 음악이네요"', affection: 9, trust: 12, type: 'generous' },
                    { text: '"시끄럽네요" 빨리 지나가자고 한다', affection: -8, trust: -10, type: 'complaining' }
                ]
            },
            {
                id: 'walk_flower_shop',
                situation: '예쁜 꽃가게 앞을 지나갑니다.',
                choices: [
                    { text: '꽃 한 송이를 사서 선물한다', affection: 12, trust: 10, type: 'romantic' },
                    { text: '"어떤 꽃 좋아하세요?" 관심을 보인다', affection: 7, trust: 12, type: 'curious' },
                    { text: '잠깐 같이 들어가서 구경한다', affection: 6, trust: 8, type: 'browse' },
                    { text: '"꽃은 금방 시들잖아요" 무시한다', affection: -10, trust: -8, type: 'cynical' }
                ]
            },
            {
                id: 'walk_tired',
                situation: '상대방이 피곤해 보입니다. 걸음이 느려집니다.',
                choices: [
                    { text: '"피곤하세요? 잠깐 쉴까요?"', affection: 10, trust: 12, type: 'caring' },
                    { text: '팔짱을 끼며 지지해준다', affection: 12, trust: 10, type: 'supportive' },
                    { text: '"집 가까우니까 조금만 더 가요"', affection: 4, trust: 6, type: 'encouraging' },
                    { text: '"왜 이렇게 체력이 없어요?" 핀잔준다', affection: -15, trust: -18, type: 'insensitive' }
                ]
            },
            {
                id: 'walk_old_couple',
                situation: '손을 잡고 걷는 노부부를 봅니다.',
                choices: [
                    { text: '"우리도 저렇게 될 수 있을까요?"', affection: 12, trust: 15, type: 'hopeful' },
                    { text: '조용히 손을 잡는다', affection: 10, trust: 12, type: 'romantic' },
                    { text: '"멋지네요" 미소 짓는다', affection: 6, trust: 8, type: 'appreciative' },
                    { text: '아무 말 없이 그냥 지나친다', affection: -3, trust: -5, type: 'indifferent' }
                ]
            },
            {
                id: 'walk_cat',
                situation: '담벼락 위에 고양이가 앉아 있습니다.',
                choices: [
                    { text: '"고양이다!" 같이 관심을 가진다', affection: 8, trust: 10, type: 'interested' },
                    { text: '조심스럽게 다가가 쓰다듬으려 한다', affection: 9, trust: 8, type: 'gentle' },
                    { text: '사진을 찍어준다', affection: 7, trust: 8, type: 'photographer' },
                    { text: '"저 고양이 불쌍해 보이는데요" 부정적으로 말한다', affection: -6, trust: -8, type: 'negative' }
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
                    { text: '귓속말로 농담을 건넨다', affection: 7, trust: 8, type: 'playful' },
                    { text: '계속 하품하고 휴대폰을 본다', affection: -12, trust: -15, type: 'rude' }
                ]
            },
            {
                id: 'cafe_drink',
                situation: '카페에서 무엇을 마실지 고민합니다.',
                choices: [
                    { text: '"뭐 마실래요? 제가 살게요"', affection: 7, trust: 10, type: 'gentleman' },
                    { text: '"커플 세트 시킬까요?"', affection: 9, trust: 8, type: 'romantic' },
                    { text: '각자 주문한다', affection: 4, trust: 12, type: 'independent' },
                    { text: '"제일 싼 거 시키세요" 인색하게 말한다', affection: -15, trust: -12, type: 'cheap' }
                ]
            },
            {
                id: 'cafe_photo',
                situation: '카페 인테리어가 예쁩니다. 상대방이 사진 찍을까 말까 망설입니다.',
                choices: [
                    { text: '"제가 사진 찍어드릴게요!" 먼저 제안한다', affection: 9, trust: 10, type: 'caring' },
                    { text: '"같이 찍어요" 셀카를 찍자고 한다', affection: 10, trust: 8, type: 'romantic' },
                    { text: '조용히 분위기를 즐긴다', affection: 4, trust: 12, type: 'calm' },
                    { text: '"또요? 맨날 사진만 찍네"', affection: -10, trust: -10, type: 'annoyed' }
                ]
            },
            {
                id: 'cafe_dessert',
                situation: '맛있어 보이는 디저트가 많습니다.',
                choices: [
                    { text: '"같이 나눠 먹어요" 여러 개 시킨다', affection: 9, trust: 12, type: 'sharing' },
                    { text: '상대방이 좋아할 만한 것을 골라준다', affection: 10, trust: 10, type: 'attentive' },
                    { text: '각자 먹고 싶은 것을 시킨다', affection: 6, trust: 10, type: 'respect' },
                    { text: '"배부른데 굳이?" 주문을 거부한다', affection: -8, trust: -8, type: 'refusing' }
                ]
            },
            {
                id: 'cafe_movie_scary',
                situation: '영화에서 무서운 장면이 나옵니다.',
                choices: [
                    { text: '손을 꼭 잡아준다', affection: 12, trust: 10, type: 'protective' },
                    { text: '"괜찮아요?" 귓속말로 물어본다', affection: 9, trust: 12, type: 'caring' },
                    { text: '같이 놀라며 분위기를 즐긴다', affection: 8, trust: 8, type: 'fun' },
                    { text: '"뭐가 무서워요?" 비웃는다', affection: -12, trust: -15, type: 'mocking' }
                ]
            },
            {
                id: 'cafe_movie_sad',
                situation: '영화가 감동적입니다. 상대방이 눈물을 글썽입니다.',
                choices: [
                    { text: '조용히 휴지를 건넨다', affection: 10, trust: 12, type: 'gentle' },
                    { text: '손을 잡아주며 위로한다', affection: 12, trust: 10, type: 'comforting' },
                    { text: '같이 감동받으며 본다', affection: 9, trust: 10, type: 'empathy' },
                    { text: '"별로 슬프지 않은데요" 공감 없이 말한다', affection: -15, trust: -18, type: 'cold' }
                ]
            },
            {
                id: 'cafe_popcorn',
                situation: '팝콘을 살지 말지 고민 중입니다.',
                choices: [
                    { text: '"제가 살게요, 같이 먹어요"', affection: 8, trust: 10, type: 'sharing' },
                    { text: '"커플 콤보 시킬까요?"', affection: 10, trust: 8, type: 'couple' },
                    { text: '"필요 없어요" 안 산다', affection: 3, trust: 5, type: 'skip' },
                    { text: '"돈 아깝잖아요" 인색하게 말한다', affection: -12, trust: -10, type: 'stingy' }
                ]
            },
            {
                id: 'cafe_cold',
                situation: '카페에 에어컨이 너무 강합니다. 상대방이 춥다고 합니다.',
                choices: [
                    { text: '재킷을 벗어서 씌워준다', affection: 12, trust: 12, type: 'gentleman' },
                    { text: '자리를 옮기자고 제안한다', affection: 8, trust: 10, type: 'practical' },
                    { text: '따뜻한 음료를 추가로 시킨다', affection: 9, trust: 10, type: 'caring' },
                    { text: '"저는 안 춥은데요" 무시한다', affection: -10, trust: -12, type: 'dismissive' }
                ]
            },
            {
                id: 'cafe_menu_hard',
                situation: '메뉴를 고르기 어려워합니다.',
                choices: [
                    { text: '"제가 자주 먹는 건데, 추천해도 될까요?"', affection: 9, trust: 12, type: 'helpful' },
                    { text: '"천천히 골라요, 제가 기다릴게요"', affection: 8, trust: 10, type: 'patient' },
                    { text: '직원에게 추천 메뉴를 물어본다', affection: 7, trust: 10, type: 'proactive' },
                    { text: '"빨리 결정해요, 시간 없어요"', affection: -12, trust: -15, type: 'impatient' }
                ]
            },
            {
                id: 'cafe_spill',
                situation: '실수로 음료를 조금 흘렸습니다.',
                choices: [
                    { text: '"괜찮아요" 웃으며 휴지로 닦아준다', affection: 10, trust: 12, type: 'kind' },
                    { text: '직원을 불러 도움을 요청한다', affection: 7, trust: 10, type: 'practical' },
                    { text: '같이 웃으며 정리한다', affection: 9, trust: 10, type: 'lighthearted' },
                    { text: '"조심하지 그랬어요" 짜증을 낸다', affection: -15, trust: -18, type: 'angry' }
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
                    { text: '내가 좋아하는 노래를 튼다', affection: 7, trust: 8, type: 'share' },
                    { text: '시끄러운 음악을 크게 틀어 불편하게 만든다', affection: -10, trust: -12, type: 'inconsiderate' }
                ]
            },
            {
                id: 'drive_view',
                situation: '멋진 뷰 포인트를 발견했습니다.',
                choices: [
                    { text: '차를 세우고 함께 경치를 본다', affection: 12, trust: 15, type: 'romantic' },
                    { text: '"사진 찍어드릴까요?"', affection: 10, trust: 12, type: 'caring' },
                    { text: '그냥 지나간다', affection: 3, trust: 8, type: 'skip' },
                    { text: '"시간 없는데요" 무시하고 지나친다', affection: -8, trust: -10, type: 'dismissive' }
                ]
            },
            {
                id: 'drive_tired',
                situation: '장거리 운전으로 피곤해 보입니다.',
                choices: [
                    { text: '"제가 운전할게요" 교대를 제안한다', affection: 12, trust: 18, type: 'caring' },
                    { text: '휴게소에 들러 쉬자고 한다', affection: 9, trust: 15, type: 'considerate' },
                    { text: '재미있는 이야기로 졸음을 쫓아준다', affection: 10, trust: 12, type: 'entertaining' },
                    { text: '"조금만 더 가요" 계속 재촉한다', affection: -12, trust: -15, type: 'pushy' }
                ]
            },
            {
                id: 'drive_surprise',
                situation: '미리 준비한 깜짝 장소에 도착했습니다.',
                choices: [
                    { text: '"여기 오고 싶다고 했잖아요" 말한다', affection: 15, trust: 20, type: 'attentive' },
                    { text: '놀란 표정을 보며 즐거워한다', affection: 13, trust: 15, type: 'happy' },
                    { text: '"사실 준비했어요" 수줍게 말한다', affection: 12, trust: 18, type: 'shy' },
                    { text: '"별로 안 좋은데요"', affection: -18, trust: -20, type: 'ungrateful' }
                ]
            },
            {
                id: 'drive_traffic',
                situation: '막히는 도로에 갇혔습니다. 예상보다 오래 걸립니다.',
                choices: [
                    { text: '"괜찮아요, 당신과 함께니까"', affection: 12, trust: 15, type: 'romantic' },
                    { text: '게임이나 퀴즈로 시간을 때운다', affection: 10, trust: 12, type: 'entertaining' },
                    { text: '다른 길을 찾아본다', affection: 8, trust: 15, type: 'problem_solving' },
                    { text: '계속 짜증내며 불평한다', affection: -15, trust: -18, type: 'complaining' }
                ]
            },
            {
                id: 'drive_speed',
                situation: '속도를 내고 싶지만 상대방이 무서워합니다.',
                choices: [
                    { text: '속도를 줄이고 안전하게 운전한다', affection: 10, trust: 18, type: 'considerate' },
                    { text: '"안전하게 갈게요" 안심시킨다', affection: 9, trust: 20, type: 'reassuring' },
                    { text: '"재미있잖아요" 계속 빠르게 운전한다', affection: -15, trust: -25, type: 'reckless' },
                    { text: '"겁쟁이네요" 무시한다', affection: -20, trust: -22, type: 'mocking' }
                ]
            },
            {
                id: 'drive_food',
                situation: '휴게소에 들렀습니다. 간식을 사자고 합니다.',
                choices: [
                    { text: '"뭐 먹고 싶어요? 제가 살게요"', affection: 10, trust: 12, type: 'treating' },
                    { text: '같이 이것저것 고른다', affection: 9, trust: 10, type: 'together' },
                    { text: '추천 메뉴를 골라준다', affection: 8, trust: 10, type: 'suggest' },
                    { text: '"빨리 사요, 늦었어요"', affection: -10, trust: -12, type: 'rushing' }
                ]
            },
            {
                id: 'drive_lost',
                situation: '길을 잃은 것 같습니다.',
                choices: [
                    { text: '"괜찮아요, 같이 찾아봐요"', affection: 10, trust: 15, type: 'supportive' },
                    { text: '네비게이션을 다시 설정한다', affection: 8, trust: 18, type: 'practical' },
                    { text: '"모험 같아서 재밌는데요?" 긍정적으로 말한다', affection: 12, trust: 10, type: 'positive' },
                    { text: '"왜 미리 안 확인했어요?" 비난한다', affection: -15, trust: -20, type: 'blaming' }
                ]
            },
            {
                id: 'drive_sunset_view',
                situation: '바다가 보이는 도로를 달립니다. 석양이 아름답습니다.',
                choices: [
                    { text: '차를 세우고 함께 감상한다', affection: 15, trust: 18, type: 'romantic' },
                    { text: '"사진 찍어드릴게요"', affection: 12, trust: 15, type: 'caring' },
                    { text: '창문을 열고 바람을 쐰다', affection: 10, trust: 12, type: 'enjoying' },
                    { text: '그냥 지나치며 "별로네요"', affection: -10, trust: -12, type: 'unappreciative' }
                ]
            },
            {
                id: 'drive_cold_ac',
                situation: '에어컨이 너무 셉니다. 상대방이 춥다고 합니다.',
                choices: [
                    { text: '바로 에어컨을 약하게 조절한다', affection: 10, trust: 15, type: 'responsive' },
                    { text: '재킷을 씌워준다', affection: 12, trust: 12, type: 'caring' },
                    { text: '"조금만 참아요"', affection: 3, trust: 5, type: 'asking' },
                    { text: '"저는 더운데요" 무시한다', affection: -12, trust: -15, type: 'selfish' }
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
                    { text: '내가 와인을 직접 고른다', affection: 12, trust: 12, type: 'confident' },
                    { text: '"와인은 필요 없어요" 거절한다', affection: -10, trust: -12, type: 'refuse' }
                ]
            },
            {
                id: 'dining_manner',
                situation: '테이블 매너가 어렵습니다.',
                choices: [
                    { text: '자연스럽게 매너를 지킨다', affection: 18, trust: 25, type: 'perfect' },
                    { text: '"매너가 어렵네요" 솔직하게 말한다', affection: 13, trust: 20, type: 'honest' },
                    { text: '상대방의 행동을 따라한다', affection: 15, trust: 18, type: 'adaptive' },
                    { text: '매너를 전혀 지키지 않고 시끄럽게 먹는다', affection: -20, trust: -25, type: 'rude' }
                ]
            },
            {
                id: 'dining_proposal',
                situation: '분위기가 너무 좋습니다. 주변 사람들이 둘을 바라봅니다.',
                choices: [
                    { text: '"정말 행복해요" 진심을 전한다', affection: 19, trust: 25, type: 'sincere' },
                    { text: '손을 잡고 눈을 마주본다', affection: 21, trust: 22, type: 'romantic' },
                    { text: '"자주 이렇게 나왔으면 좋겠어요"', affection: 16, trust: 20, type: 'hopeful' },
                    { text: '계속 휴대폰만 본다', affection: -18, trust: -22, type: 'distracted' }
                ]
            },
            {
                id: 'dining_course',
                situation: '메인 요리가 나왔습니다. 정말 맛있어 보입니다.',
                choices: [
                    { text: '"한 입 맛볼래요?" 나눠 먹자고 한다', affection: 18, trust: 20, type: 'sharing' },
                    { text: '먼저 상대방의 반응을 살핀다', affection: 15, trust: 22, type: 'considerate' },
                    { text: '"정말 맛있어요!" 즐거워한다', affection: 16, trust: 18, type: 'happy' },
                    { text: '"별로네요, 이 가격에 이것밖에?" 불평한다', affection: -20, trust: -18, type: 'complaining' }
                ]
            },
            {
                id: 'dining_appetizer',
                situation: '에피타이저가 나왔습니다. 생소한 요리입니다.',
                choices: [
                    { text: '"신기한데요? 같이 먹어봐요"', affection: 16, trust: 18, type: 'adventurous' },
                    { text: '먼저 맛보고 상대방에게 설명해준다', affection: 17, trust: 20, type: 'guide' },
                    { text: '웨이터에게 요리에 대해 물어본다', affection: 15, trust: 18, type: 'curious' },
                    { text: '"이상한 음식이네요" 거부감을 드러낸다', affection: -12, trust: -15, type: 'dismissive' }
                ]
            },
            {
                id: 'dining_dress',
                situation: '"오늘 정말 멋지네요"라고 칭찬합니다.',
                choices: [
                    { text: '"당신도 정말 아름다워요"', affection: 18, trust: 20, type: 'compliment_back' },
                    { text: '"당신 때문에 신경 많이 썼어요"', affection: 20, trust: 22, type: 'sincere' },
                    { text: '부끄러워하며 "감사합니다"', affection: 15, trust: 18, type: 'shy' },
                    { text: '"별로 안 꾸몄는데요" 무뚝뚝하게 답한다', affection: -10, trust: -12, type: 'cold' }
                ]
            },
            {
                id: 'dining_expensive',
                situation: '계산서를 받았습니다. 예상보다 비쌉니다.',
                choices: [
                    { text: '태연하게 카드를 낸다', affection: 20, trust: 25, type: 'confident' },
                    { text: '"좋은 시간이었으니 괜찮아요"', affection: 18, trust: 22, type: 'positive' },
                    { text: '"더치페이 할래요?" 제안한다', affection: 8, trust: 15, type: 'split' },
                    { text: '"너무 비싸네요" 얼굴을 찌푸린다', affection: -18, trust: -20, type: 'cheap' }
                ]
            },
            {
                id: 'dining_music',
                situation: '라이브 연주가 시작됩니다. 분위기가 좋습니다.',
                choices: [
                    { text: '"춤출까요?" 손을 내민다', affection: 22, trust: 20, type: 'romantic' },
                    { text: '조용히 음악을 감상하며 손을 잡는다', affection: 20, trust: 22, type: 'intimate' },
                    { text: '"좋은 음악이네요"라고 말한다', affection: 16, trust: 18, type: 'appreciate' },
                    { text: '음악에 관심 없이 휴대폰을 본다', affection: -15, trust: -20, type: 'rude' }
                ]
            },
            {
                id: 'dining_staff',
                situation: '웨이터가 실수로 물을 쏟았습니다.',
                choices: [
                    { text: '"괜찮아요" 웃으며 이해한다', affection: 18, trust: 25, type: 'understanding' },
                    { text: '상대방의 옷을 먼저 확인하고 닦아준다', affection: 20, trust: 22, type: 'caring' },
                    { text: '침착하게 직원을 도와 정리한다', affection: 17, trust: 23, type: 'helpful' },
                    { text: '화를 내며 직원을 비난한다', affection: -22, trust: -28, type: 'angry' }
                ]
            },
            {
                id: 'dining_view',
                situation: '창밖 야경이 아름답습니다.',
                choices: [
                    { text: '"경치도 아름답지만 당신이 더 아름다워요"', affection: 22, trust: 20, type: 'romantic' },
                    { text: '사진을 찍어준다', affection: 18, trust: 18, type: 'photographer' },
                    { text: '같이 감상하며 손을 잡는다', affection: 20, trust: 20, type: 'together' },
                    { text: '"별로 안 예쁜데요" 시큰둥하다', affection: -12, trust: -15, type: 'unimpressed' }
                ]
            }
        ]
    }
};

// 선물 아이템 데이터
const GIFT_ITEMS = {
    // 저가 선물 (10,000 - 50,000원)
    letter: {
        id: 'letter',
        name: '손편지',
        icon: '💌',
        cost: 10000,
        stamina: 15,
        baseAffection: 5,
        baseTrust: 8,
        description: '진심이 담긴 손편지 - 신뢰도 상승',
        category: 'heartfelt'
    },
    chocolate: {
        id: 'chocolate',
        name: '고급 초콜릿',
        icon: '🍫',
        cost: 25000,
        stamina: 10,
        baseAffection: 4,
        baseTrust: 3,
        description: '달콤한 초콜릿 선물',
        category: 'sweet'
    },
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
    book: {
        id: 'book',
        name: '책',
        icon: '📚',
        cost: 35000,
        stamina: 10,
        baseAffection: 6,
        baseTrust: 10,
        description: '취향을 고려한 책 선물 - 신뢰도 상승',
        category: 'thoughtful'
    },
    movie_ticket: {
        id: 'movie_ticket',
        name: '영화 티켓',
        icon: '🎬',
        cost: 40000,
        stamina: 10,
        baseAffection: 5,
        baseTrust: 6,
        description: '함께 보자는 의미의 영화 티켓',
        category: 'experience'
    },

    // 중가 선물 (50,000 - 300,000원)
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
    plushie: {
        id: 'plushie',
        name: '인형',
        icon: '🧸',
        cost: 80000,
        stamina: 10,
        baseAffection: 7,
        baseTrust: 5,
        description: '귀여운 대형 인형',
        category: 'cute'
    },
    scarf: {
        id: 'scarf',
        name: '스카프/목도리',
        icon: '🧣',
        cost: 120000,
        stamina: 10,
        baseAffection: 8,
        baseTrust: 7,
        description: '실용적이면서 따뜻한 선물',
        category: 'practical'
    },
    necklace: {
        id: 'necklace',
        name: '목걸이',
        icon: '📿',
        cost: 250000,
        stamina: 10,
        baseAffection: 9,
        baseTrust: 6,
        description: '은은한 액세서리',
        category: 'accessory'
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

    // 고가 선물 (300,000 - 1,000,000원)
    shoes: {
        id: 'shoes',
        name: '구두/운동화',
        icon: '👠',
        cost: 400000,
        stamina: 10,
        baseAffection: 11,
        baseTrust: 7,
        description: '브랜드 신발 선물',
        category: 'fashion'
    },
    watch: {
        id: 'watch',
        name: '시계',
        icon: '⌚',
        cost: 600000,
        stamina: 10,
        baseAffection: 13,
        baseTrust: 8,
        description: '세련된 손목시계',
        category: 'accessory'
    },
    earrings: {
        id: 'earrings',
        name: '귀걸이',
        icon: '💎',
        cost: 800000,
        stamina: 10,
        baseAffection: 14,
        baseTrust: 7,
        description: '고급 귀금속 귀걸이',
        category: 'jewelry'
    },
    coat: {
        id: 'coat',
        name: '코트/외투',
        icon: '🧥',
        cost: 900000,
        stamina: 10,
        baseAffection: 12,
        baseTrust: 9,
        description: '고급 브랜드 외투',
        category: 'fashion'
    },

    // 최고가 선물 (1,000,000원 이상)
    laptop: {
        id: 'laptop',
        name: '노트북',
        icon: '💻',
        cost: 2000000,
        stamina: 10,
        baseAffection: 15,
        baseTrust: 12,
        description: '고사양 노트북 - 실용성 최고',
        category: 'electronics'
    },
    travel_package: {
        id: 'travel_package',
        name: '해외여행 패키지',
        icon: '✈️',
        cost: 3000000,
        stamina: 10,
        baseAffection: 18,
        baseTrust: 15,
        description: '함께 떠나는 낭만적인 여행',
        category: 'experience'
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
    car: {
        id: 'car',
        name: '자동차',
        icon: '🚗',
        cost: 6000000,
        stamina: 10,
        baseAffection: 22,
        baseTrust: 10,
        description: '꿈의 선물, 하지만 부담스러울 수도',
        category: 'luxury',
        riskFactor: 0.3  // 30% 확률로 부담스러워함
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
        baseAffection: 2,
        baseTrust: 2,
        description: '오늘 있었던 일을 나눕니다',
        scenarios: [
            {
                id: 'daily_work',
                situation: '오늘 회사에서 힘든 일이 있었다고 합니다.',
                choices: [
                    { text: '"그래서 어떻게 했어요?" 진심으로 물어본다', affection: 6, trust: 15, type: 'listen' },
                    { text: '"제가 도와드릴 수 있을까요?"', affection: 7, trust: 18, type: 'help' },
                    { text: '"다 그런 거 아니에요?" 대수롭지 않게 넘긴다', affection: -5, trust: -8, type: 'dismissive' }
                ]
            },
            {
                id: 'daily_hobby',
                situation: '요즘 새로운 취미를 시작했다고 합니다.',
                choices: [
                    { text: '"재밌겠다! 더 얘기해줘요"', affection: 7, trust: 10, type: 'interest' },
                    { text: '"저도 함께 해도 될까요?"', affection: 9, trust: 15, type: 'join' },
                    { text: '"시간 많으시네요" 비꼬는 투로 말한다', affection: -8, trust: -12, type: 'sarcastic' }
                ]
            },
            {
                id: 'daily_food',
                situation: '오늘 점심으로 무엇을 먹었는지 물어봅니다.',
                choices: [
                    { text: '메뉴를 자세히 설명하며 같이 먹으러 가자고 한다', affection: 9, trust: 12, type: 'enthusiastic' },
                    { text: '간단히 대답하고 상대방은 뭘 먹었는지 물어본다', affection: 7, trust: 15, type: 'balanced' },
                    { text: '"별로 중요한 거 아니잖아요"', affection: -6, trust: -10, type: 'rude' }
                ]
            },
            {
                id: 'daily_weather',
                situation: '"오늘 날씨 정말 좋지 않아요?"라고 말합니다.',
                choices: [
                    { text: '"그러게요, 이런 날은 산책하기 딱이죠"', affection: 7, trust: 10, type: 'agree' },
                    { text: '"당신이랑 함께라면 날씨는 중요하지 않아요"', affection: 10, trust: 8, type: 'romantic' },
                    { text: '휴대폰만 보며 "네" 라고만 답한다', affection: -7, trust: -15, type: 'distracted' }
                ]
            },
            {
                id: 'daily_friend',
                situation: '친구와 만나서 재미있는 일이 있었다고 얘기합니다.',
                choices: [
                    { text: '"어떤 친구예요? 소개시켜줄래요?"', affection: 8, trust: 12, type: 'curious' },
                    { text: '"재밌었겠다! 다음엔 저도 같이 가도 될까요?"', affection: 10, trust: 15, type: 'inclusive' },
                    { text: '"친구 만나느라 바쁘시네요..." 삐친 듯이 말한다', affection: -10, trust: -12, type: 'jealous' }
                ]
            },
            {
                id: 'daily_family',
                situation: '가족 이야기를 꺼냅니다. "우리 부모님이..."',
                choices: [
                    { text: '"정말요? 부모님 뵙고 싶네요"', affection: 12, trust: 20, type: 'respectful' },
                    { text: '"가족이 소중하시구나. 멋지네요"', affection: 9, trust: 15, type: 'supportive' },
                    { text: '"아, 네..." 관심 없는 듯 반응한다', affection: -8, trust: -18, type: 'uninterested' }
                ]
            },
            {
                id: 'daily_tired_morning',
                situation: '"오늘 아침에 늦잠자서 정신없었어요"',
                choices: [
                    { text: '"다음엔 제가 모닝콜 해드릴까요?" 웃으며 말한다', affection: 10, trust: 8, type: 'playful' },
                    { text: '"피곤하셨나봐요. 충분히 주무셨어요?"', affection: 8, trust: 12, type: 'caring' },
                    { text: '"시간 관리 좀 하세요"', affection: -12, trust: -15, type: 'criticizing' }
                ]
            },
            {
                id: 'daily_shopping',
                situation: '오늘 쇼핑하다가 마음에 드는 물건을 봤다고 합니다.',
                choices: [
                    { text: '"뭔데요? 같이 보러 갈까요?"', affection: 10, trust: 10, type: 'interested' },
                    { text: '"사고 싶으면 사세요. 제가 사드릴게요"', affection: 12, trust: 8, type: 'generous' },
                    { text: '"또요? 돈 많이 쓰시네"', affection: -15, trust: -10, type: 'judgmental' }
                ]
            },
            {
                id: 'daily_music',
                situation: '요즘 자주 듣는 노래가 있다며 들려줍니다.',
                choices: [
                    { text: '함께 감상하며 "좋은데요? 이런 스타일 좋아하세요?"', affection: 9, trust: 12, type: 'appreciative' },
                    { text: '노래를 끝까지 듣고 "같이 노래방 갈래요?"', affection: 11, trust: 10, type: 'engaging' },
                    { text: '중간에 끊고 "제 취향은 아닌데요"', affection: -10, trust: -12, type: 'dismissive' }
                ]
            },
            {
                id: 'daily_book',
                situation: '최근에 읽은 책 이야기를 합니다.',
                choices: [
                    { text: '"재밌어 보이네요! 다 읽으면 빌려주실래요?"', affection: 10, trust: 15, type: 'sharing' },
                    { text: '"저도 그 작가 좋아해요!" 공통 관심사에 대해 이야기한다', affection: 12, trust: 18, type: 'bonding' },
                    { text: '"전 책은 잘 안 읽어서..." 화제를 바꾼다', affection: -5, trust: -8, type: 'deflecting' }
                ]
            },
            {
                id: 'daily_exercise',
                situation: '"요즘 운동 시작했어요!" 라고 말합니다.',
                choices: [
                    { text: '"대단한데요! 어떤 운동이에요?"', affection: 8, trust: 10, type: 'encouraging' },
                    { text: '"저도 같이 하면 안 될까요?"', affection: 11, trust: 15, type: 'participating' },
                    { text: '"오래 못 가실 걸요" 냉소적으로 말한다', affection: -12, trust: -18, type: 'cynical' }
                ]
            },
            {
                id: 'daily_pet',
                situation: '키우는 반려동물 이야기를 합니다.',
                choices: [
                    { text: '"귀엽겠어요! 사진 보여주세요"', affection: 10, trust: 12, type: 'interested' },
                    { text: '"다음에 같이 산책시켜요"', affection: 12, trust: 15, type: 'active' },
                    { text: '"동물 냄새 안 나요?" 찡그리며 말한다', affection: -15, trust: -20, type: 'rude' }
                ]
            },
            {
                id: 'daily_nightmare',
                situation: '"어젯밤에 악몽 꿨어요. 당신이 떠나는 꿈이었어요"',
                choices: [
                    { text: '"절대 안 떠나요!" 즉시 대답한다', affection: 15, trust: -5, type: 'quick_reassure' },
                    { text: '"그런 일 없을 거예요" 진지하게 약속한다', affection: 10, trust: 20, type: 'promise' },
                    { text: '"꿈은 반대래요" 가볍게 넘긴다', affection: -8, trust: -12, type: 'dismiss' }
                ]
            },
            {
                id: 'daily_compliment',
                situation: '오늘 다른 사람에게 칭찬을 받았다고 기뻐합니다.',
                choices: [
                    { text: '"누가요? 무슨 칭찬이었어요?"', affection: 5, trust: 15, type: 'curious' },
                    { text: '"당연하죠! 당신은 정말 멋져요"', affection: 12, trust: 8, type: 'supportive' },
                    { text: '"그 사람 당신 좋아하는 거 아니에요?" 의심한다', affection: -12, trust: -18, type: 'jealous' }
                ]
            },
            {
                id: 'daily_haircut',
                situation: '머리를 자르고 왔습니다. "어때요?"',
                choices: [
                    { text: '"정말 잘 어울려요!" 진심으로 칭찬한다', affection: 12, trust: 10, type: 'compliment' },
                    { text: '"달라 보이긴 하네요" 애매하게 답한다', affection: -5, trust: 5, type: 'vague' },
                    { text: '"전 머리가 더 좋았는데..." 솔직하게 말한다', affection: -15, trust: 15, type: 'too_honest' }
                ]
            },
            {
                id: 'daily_late_reply',
                situation: '"왜 답장이 늦었어요?" 조금 삐진 듯 물어봅니다.',
                choices: [
                    { text: '솔직하게 바빴던 이유를 설명한다', affection: 5, trust: 20, type: 'honest' },
                    { text: '"미안해요, 다음엔 바로 답할게요" 사과한다', affection: 10, trust: 12, type: 'apologize' },
                    { text: '"항상 바로 답할 수는 없잖아요" 변명한다', affection: -10, trust: -15, type: 'defensive' }
                ]
            },
            {
                id: 'daily_memories',
                situation: '"우리 처음 만났을 때 기억나요?"',
                choices: [
                    { text: '자세하게 기억을 되짚으며 이야기한다', affection: 18, trust: 20, type: 'detailed' },
                    { text: '"그럼요! 정말 떨렸어요" 감정을 표현한다', affection: 15, trust: 15, type: 'emotional' },
                    { text: '"어... 대충요?" 기억이 흐릿한 척한다', affection: -20, trust: -25, type: 'forgot' }
                ]
            },
            {
                id: 'daily_social_media',
                situation: '"제 SNS 게시물 봤어요?" 기대하는 표정으로 묻습니다.',
                choices: [
                    { text: '"봤어요! 정말 좋더라고요" 즉시 반응한다', affection: 12, trust: 10, type: 'saw' },
                    { text: '"아직 못 봤는데, 지금 볼게요!" 바로 확인한다', affection: 10, trust: 15, type: 'check_now' },
                    { text: '"SNS 잘 안 봐서..." 무관심하게 말한다', affection: -15, trust: -10, type: 'indifferent' }
                ]
            },
            {
                id: 'daily_cooking',
                situation: '오늘 요리를 했다며 자랑스러워합니다.',
                choices: [
                    { text: '"대단한데요! 다음엔 저한테도 해줄래요?"', affection: 12, trust: 15, type: 'interested' },
                    { text: '"맛있었겠다! 사진 있어요?"', affection: 10, trust: 10, type: 'ask_photo' },
                    { text: '"잘하시네요" 무덤덤하게 반응한다', affection: -5, trust: -8, type: 'bland' }
                ]
            },
            {
                id: 'daily_promotion',
                situation: '직장에서 승진 기회가 생겼다고 합니다. 하지만 더 바빠질 것 같습니다.',
                choices: [
                    { text: '"축하해요! 정말 잘됐네요" 무조건 응원한다', affection: 15, trust: 10, type: 'support' },
                    { text: '"좋지만... 우리 만날 시간은 괜찮을까요?" 걱정을 표현한다', affection: -5, trust: 20, type: 'honest_worry' },
                    { text: '"승진보다 저랑 시간이 더 중요하지 않나요?" 압박한다', affection: -20, trust: -25, type: 'selfish' }
                ]
            },
            {
                id: 'daily_old_photo',
                situation: '옛날 사진을 보며 "그때가 좋았어요" 라고 말합니다.',
                choices: [
                    { text: '"지금이 더 좋지 않나요?" 현재를 강조한다', affection: 12, trust: 15, type: 'present' },
                    { text: '"그때도 좋았지만 앞으로가 더 기대돼요"', affection: 15, trust: 18, type: 'future' },
                    { text: '"과거에 너무 집착하시는 거 아니에요?"', affection: -15, trust: -12, type: 'critical' }
                ]
            }
        ]
    },
    comfort: {
        id: 'comfort',
        name: '위로하기',
        icon: '🤗',
        stamina: 15,
        baseAffection: 2,
        baseTrust: 3,
        description: '힘든 일을 들어주고 위로합니다',
        scenarios: [
            {
                id: 'comfort_sad',
                situation: '기분이 많이 안 좋아 보입니다. 표정이 어둡습니다.',
                choices: [
                    { text: '조용히 손을 잡아준다', affection: 10, trust: 20, type: 'skinship' },
                    { text: '"무슨 일 있어요? 말해줄래요?" 부드럽게 묻는다', affection: 9, trust: 22, type: 'talk' },
                    { text: '"왜 그래요? 설마 제 때문은 아니죠?" 자기 탓으로 돌린다', affection: -10, trust: -15, type: 'selfish' }
                ]
            },
            {
                id: 'comfort_stress',
                situation: '요즘 스트레스가 많다고 합니다.',
                choices: [
                    { text: '"제가 뭐 도와드릴 게 있을까요?"', affection: 9, trust: 20, type: 'helpful' },
                    { text: '"함께 스트레스 풀러 가요"', affection: 10, trust: 15, type: 'active' },
                    { text: '"누구나 스트레스 받잖아요" 가볍게 넘긴다', affection: -12, trust: -18, type: 'dismissive' }
                ]
            },
            {
                id: 'comfort_tired',
                situation: '피곤해 보입니다. 눈이 충혈되어 있습니다.',
                choices: [
                    { text: '"푹 쉬세요. 제가 옆에 있을게요"', affection: 12, trust: 18, type: 'caring' },
                    { text: '어깨를 주물러준다', affection: 13, trust: 20, type: 'physical' },
                    { text: '"진짜 힘들어 보이네요" 불편한 표정을 짓는다', affection: -8, trust: -10, type: 'uncomfortable' }
                ]
            },
            {
                id: 'comfort_failure',
                situation: '중요한 프로젝트가 실패했다고 말합니다.',
                choices: [
                    { text: '"정말 열심히 하셨는데... 속상하시겠어요"', affection: 11, trust: 25, type: 'empathetic' },
                    { text: '"실패는 성공의 어머니예요. 다음엔 잘 하실 거예요"', affection: 8, trust: 15, type: 'encouraging' },
                    { text: '"그래서 어쩔 건데요?" 냉정하게 묻는다', affection: -15, trust: -25, type: 'cold' }
                ]
            },
            {
                id: 'comfort_argument',
                situation: '가족과 다퉈서 힘들다고 합니다.',
                choices: [
                    { text: '"어떤 일이 있었는지 얘기하고 싶으면 들어줄게요"', affection: 10, trust: 22, type: 'listening' },
                    { text: '"가족이니까 곧 풀릴 거예요. 너무 걱정마세요"', affection: 8, trust: 18, type: 'reassuring' },
                    { text: '"가족끼리 그럴 수도 있죠 뭐" 무관심하게 반응한다', affection: -10, trust: -20, type: 'indifferent' }
                ]
            },
            {
                id: 'comfort_sick',
                situation: '건강이 안 좋다며 기침을 합니다.',
                choices: [
                    { text: '"병원 가보셨어요? 같이 갈까요?"', affection: 12, trust: 20, type: 'caring' },
                    { text: '"제가 약 사다 드릴게요. 푹 쉬세요"', affection: 14, trust: 22, type: 'helpful' },
                    { text: '"저한테 옮기지 마세요" 거리를 둔다', affection: -18, trust: -25, type: 'selfish' }
                ]
            },
            {
                id: 'comfort_misunderstand',
                situation: '친구에게 오해를 받아서 속상해합니다.',
                choices: [
                    { text: '"분명 오해가 풀릴 거예요. 진실은 밝혀지니까"', affection: 9, trust: 18, type: 'optimistic' },
                    { text: '"제가 친구분께 설명드릴까요?"', affection: 11, trust: 20, type: 'proactive' },
                    { text: '"그 친구가 문제 있는 거 아니에요?" 친구를 비난한다', affection: -8, trust: -15, type: 'negative' }
                ]
            },
            {
                id: 'comfort_insomnia',
                situation: '요즘 잠을 못 자서 힘들다고 합니다.',
                choices: [
                    { text: '"제가 자장가라도 불러드릴까요?" 장난스럽게 위로한다', affection: 10, trust: 15, type: 'playful' },
                    { text: '"걱정되네요. 병원 가보는 게 좋을 것 같아요"', affection: 12, trust: 20, type: 'concerned' },
                    { text: '"그럼 낮에 자지 마세요"', affection: -12, trust: -18, type: 'insensitive' }
                ]
            },
            {
                id: 'comfort_lonely',
                situation: '"요즘 외로워요..."라고 조용히 말합니다.',
                choices: [
                    { text: '손을 꼭 잡으며 "제가 있잖아요"', affection: 15, trust: 25, type: 'romantic' },
                    { text: '"외로울 때마다 연락하세요. 언제든 달려갈게요"', affection: 13, trust: 22, type: 'devoted' },
                    { text: '"친구 만나보세요" 시큰둥하게 답한다', affection: -15, trust: -22, type: 'distant' }
                ]
            },
            {
                id: 'comfort_regret',
                situation: '과거의 실수를 후회한다고 말합니다.',
                choices: [
                    { text: '"과거는 바꿀 수 없어요. 지금부터 잘 하면 돼요"', affection: 10, trust: 18, type: 'forward' },
                    { text: '"누구나 실수하잖아요. 그게 당신의 전부는 아니에요"', affection: 12, trust: 22, type: 'accepting' },
                    { text: '"그러게 그때 왜 그러셨어요" 과거를 들춰낸다', affection: -15, trust: -28, type: 'reproachful' }
                ]
            },
            {
                id: 'comfort_anxiety',
                situation: '"요즘 불안해요. 모든 게 잘 안 될 것 같아요"',
                choices: [
                    { text: '"괜찮아질 거예요!" 무조건 긍정적으로 말한다', affection: 10, trust: -5, type: 'forced_positive' },
                    { text: '"왜 불안한지 천천히 이야기해봐요" 경청한다', affection: 8, trust: 25, type: 'listen' },
                    { text: '"다들 그렇게 살아요" 대수롭지 않게 넘긴다', affection: -15, trust: -20, type: 'dismiss' }
                ]
            },
            {
                id: 'comfort_crying',
                situation: '갑자기 울기 시작합니다. 이유를 말하지 않습니다.',
                choices: [
                    { text: '아무 말 없이 꼭 안아준다', affection: 18, trust: 20, type: 'hug' },
                    { text: '"무슨 일이에요?" 계속 물어본다', affection: -5, trust: 10, type: 'pry' },
                    { text: '"말하고 싶을 때 말해요" 기다려준다', affection: 12, trust: 25, type: 'patient' }
                ]
            },
            {
                id: 'comfort_comparison',
                situation: '"다른 사람들은 다 잘 사는 것 같은데 저만 뒤처진 것 같아요"',
                choices: [
                    { text: '"당신은 충분히 잘하고 있어요" 위로한다', affection: 12, trust: 15, type: 'reassure' },
                    { text: '"비교하지 마세요. 각자의 속도가 있어요"', affection: 10, trust: 22, type: 'perspective' },
                    { text: '"그럼 더 열심히 하면 되죠" 채찍질한다', affection: -18, trust: -15, type: 'push' }
                ]
            },
            {
                id: 'comfort_betrayal',
                situation: '가까운 사람에게 배신당했다며 눈물을 흘립니다.',
                choices: [
                    { text: '"그 사람은 당신을 받을 자격이 없어요" 분노한다', affection: 15, trust: 10, type: 'angry' },
                    { text: '조용히 손을 잡고 옆에 있어준다', affection: 10, trust: 25, type: 'presence' },
                    { text: '"혹시 오해는 아닐까요?" 의심한다', affection: -12, trust: -20, type: 'doubt' }
                ]
            },
            {
                id: 'comfort_nightmare_bad',
                situation: '악몽을 꾸고 놀라 깨어 떨고 있습니다. 새벽 3시입니다.',
                choices: [
                    { text: '즉시 전화를 걸어 위로한다', affection: 20, trust: 22, type: 'immediate' },
                    { text: '메시지로 "괜찮아요. 제가 있어요" 보낸다', affection: 12, trust: 18, type: 'message' },
                    { text: '아침에 확인하고 답장한다', affection: -20, trust: -25, type: 'delay' }
                ]
            },
            {
                id: 'comfort_self_hate',
                situation: '"저는 정말 쓸모없는 사람인 것 같아요..."',
                choices: [
                    { text: '"무슨 소리예요! 당신은 소중한 사람이에요"', affection: 15, trust: 15, type: 'deny' },
                    { text: '"왜 그렇게 생각하는지 말해줄래요?"', affection: 8, trust: 25, type: 'explore' },
                    { text: '"그런 말 하지 마세요. 듣기 힘들어요"', affection: -10, trust: -18, type: 'avoid' }
                ]
            },
            {
                id: 'comfort_overwhelmed',
                situation: '해야 할 일이 너무 많다며 패닉 상태입니다.',
                choices: [
                    { text: '"하나씩 같이 정리해봐요" 실질적으로 돕는다', affection: 12, trust: 25, type: 'practical' },
                    { text: '"다 괜찮아질 거예요. 걱정 마세요"', affection: 10, trust: 10, type: 'vague' },
                    { text: '"계획을 잘 세워야죠" 지적한다', affection: -15, trust: -20, type: 'blame' }
                ]
            },
            {
                id: 'comfort_disappointed',
                situation: '중요한 시험에 떨어졌다며 낙담합니다.',
                choices: [
                    { text: '"이번엔 운이 없었어요. 다음엔 잘 될 거예요"', affection: 10, trust: 15, type: 'encourage' },
                    { text: '"많이 속상하시겠어요. 제가 뭘 도와드릴까요?"', affection: 12, trust: 22, type: 'empathy' },
                    { text: '"왜 떨어졌을까요? 무엇이 부족했나요?"', affection: -18, trust: -15, type: 'analyze' }
                ]
            },
            {
                id: 'comfort_body_image',
                situation: '거울을 보며 "저 정말 못생겼어요..." 라고 말합니다.',
                choices: [
                    { text: '"무슨 소리예요! 정말 예뻐요"', affection: 15, trust: -8, type: 'compliment' },
                    { text: '"외모보다 내면이 더 중요해요"', affection: -5, trust: 15, type: 'inner_beauty' },
                    { text: '"제 눈엔 세상에서 제일 아름다워요"', affection: 18, trust: 12, type: 'romantic' }
                ]
            },
            {
                id: 'comfort_burnout',
                situation: '"더 이상 아무것도 하기 싫어요. 모든 게 의미 없어요"',
                choices: [
                    { text: '"잠깐 쉬어가요. 제가 옆에 있을게요"', affection: 15, trust: 25, type: 'rest' },
                    { text: '"무기력은 일시적이에요. 곧 나아질 거예요"', affection: 8, trust: 12, type: 'temporary' },
                    { text: '"정신 차리세요. 이렇게 있으면 안 돼요"', affection: -20, trust: -25, type: 'harsh' }
                ]
            }
        ]
    },
    future: {
        id: 'future',
        name: '미래 계획',
        icon: '🌟',
        stamina: 15,
        baseAffection: 3,
        baseTrust: 4,
        description: '앞으로의 계획과 꿈을 이야기합니다',
        minAffection: 40,
        scenarios: [
            {
                id: 'future_dream',
                situation: '결혼에 대한 생각을 물어봅니다.',
                choices: [
                    { text: '"당신과 함께라면 언제든 좋아요"', affection: 15, trust: 30, type: 'romantic' },
                    { text: '"서로 준비되었을 때가 좋겠어요"', affection: 10, trust: 28, type: 'realistic' },
                    { text: '"결혼은... 글쎄요" 회피한다', affection: -15, trust: -25, type: 'avoid' }
                ]
            },
            {
                id: 'future_house',
                situation: '"나중에 어떤 집에서 살고 싶어요?"라고 물어봅니다.',
                choices: [
                    { text: '"당신이 원하는 곳이면 어디든 좋아요"', affection: 12, trust: 25, type: 'flexible' },
                    { text: '구체적인 장소와 이유를 설명한다', affection: 10, trust: 28, type: 'detailed' },
                    { text: '"혼자 사는 게 편한데..." 농담처럼 말한다', affection: -12, trust: -20, type: 'joking_bad' }
                ]
            },
            {
                id: 'future_children',
                situation: '아이에 대한 생각을 물어봅니다.',
                choices: [
                    { text: '"당신을 닮은 아이면 좋겠어요"', affection: 15, trust: 28, type: 'sweet' },
                    { text: '"같이 천천히 생각해봐요"', affection: 10, trust: 25, type: 'thoughtful' },
                    { text: '"아이는 부담스러운데..." 난색을 표한다', affection: -10, trust: -18, type: 'negative' }
                ]
            },
            {
                id: 'future_career',
                situation: '"당신의 커리어 목표는 뭐예요?"',
                choices: [
                    { text: '진지하게 자신의 목표를 설명한다', affection: 10, trust: 25, type: 'serious' },
                    { text: '"당신을 도와주는 게 목표예요" 로맨틱하게 답한다', affection: 13, trust: 20, type: 'romantic' },
                    { text: '"그냥 편하게 살고 싶어요" 의욕 없이 답한다', affection: -8, trust: -15, type: 'unmotivated' }
                ]
            },
            {
                id: 'future_travel',
                situation: '"같이 여행 가고 싶은 곳 있어요?"',
                choices: [
                    { text: '"당신이 가고 싶은 곳이면 다 가고 싶어요"', affection: 12, trust: 22, type: 'agreeable' },
                    { text: '구체적인 장소와 계획을 이야기한다', affection: 14, trust: 25, type: 'planned' },
                    { text: '"여행은 별로예요" 시큰둥하게 답한다', affection: -12, trust: -15, type: 'disinterested' }
                ]
            },
            {
                id: 'future_money',
                situation: '돈과 재산에 대한 생각을 조심스럽게 물어봅니다.',
                choices: [
                    { text: '"같이 열심히 모으면 되죠"', affection: 11, trust: 25, type: 'together' },
                    { text: '"사랑이 있으면 돈은 따라오는 거 아닐까요?"', affection: 9, trust: 18, type: 'idealistic' },
                    { text: '"돈 없으면 사랑도 없죠" 현실적으로 말한다', affection: -15, trust: -20, type: 'materialistic' }
                ]
            },
            {
                id: 'future_parents',
                situation: '부모님을 모시는 것에 대해 물어봅니다.',
                choices: [
                    { text: '"당연히 함께 모셔야죠"', affection: 14, trust: 30, type: 'filial' },
                    { text: '"같이 상의해서 결정해요"', affection: 10, trust: 25, type: 'discussable' },
                    { text: '"그건 좀..." 부담스러워한다', affection: -18, trust: -28, type: 'reluctant' }
                ]
            },
            {
                id: 'future_hobby',
                situation: '"결혼해도 취미 생활 계속하고 싶어요"',
                choices: [
                    { text: '"당연하죠! 저도 지지할게요"', affection: 13, trust: 25, type: 'supportive' },
                    { text: '"저도 함께 하면 안 될까요?"', affection: 11, trust: 22, type: 'joining' },
                    { text: '"결혼하면 그런 거 하기 힘들어요" 부정적으로 답한다', affection: -20, trust: -25, type: 'controlling' }
                ]
            },
            {
                id: 'future_age_gap',
                situation: '나이 차이에 대해 어떻게 생각하는지 묻습니다.',
                choices: [
                    { text: '"사랑에 나이가 무슨 상관이에요"', affection: 14, trust: 20, type: 'accepting' },
                    { text: '"서로를 이해하려고 노력하면 돼요"', affection: 11, trust: 25, type: 'effort' },
                    { text: '"솔직히 좀 신경 쓰이긴 해요"', affection: -10, trust: -15, type: 'concerned' }
                ]
            },
            {
                id: 'future_lifestyle',
                situation: '"당신은 아침형인가요 저녁형인가요?"',
                choices: [
                    { text: '자신의 패턴을 설명하고 맞춰가겠다고 한다', affection: 12, trust: 23, type: 'accommodating' },
                    { text: '"당신한테 맞출게요"', affection: 10, trust: 20, type: 'flexible' },
                    { text: '"전 제 패턴 못 바꿔요" 단호하게 말한다', affection: -12, trust: -18, type: 'inflexible' }
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
                    { text: '가벼운 장난을 친다', affection: 10, trust: 15, type: 'playful', successRate: 0.8 },
                    { text: '심각한 얼굴로 시답잖은 농담을 한다', affection: -8, trust: -5, type: 'bad_timing', successRate: 0.3 }
                ]
            },
            {
                id: 'humor_tease',
                situation: '상대방을 살짝 놀리고 싶습니다.',
                choices: [
                    { text: '귀여운 별명을 지어준다', affection: 13, trust: 12, type: 'nickname', successRate: 0.7 },
                    { text: '장난스럽게 웃으며 놀린다', affection: 12, trust: 15, type: 'tease', successRate: 0.6 },
                    { text: '재미있었던 에피소드를 언급한다', affection: 10, trust: 18, type: 'story', successRate: 0.8 },
                    { text: '민감한 부분을 놀려서 분위기를 망친다', affection: -12, trust: -10, type: 'insensitive', successRate: 0.4 }
                ]
            },
            {
                id: 'humor_imitate',
                situation: '상대방의 말투를 흉내내고 싶습니다.',
                choices: [
                    { text: '귀엽게 따라한다', affection: 15, trust: 10, type: 'cute', successRate: 0.6 },
                    { text: '과장되게 웃기게 따라한다', affection: 12, trust: 8, type: 'exaggerate', successRate: 0.5 },
                    { text: '살짝만 흉내내고 웃는다', affection: 10, trust: 15, type: 'gentle', successRate: 0.8 },
                    { text: '무시하는 듯한 말투로 따라하다 화나게 만든다', affection: -15, trust: -12, type: 'mocking', successRate: 0.2 }
                ]
            },
            {
                id: 'humor_selfie',
                situation: '"같이 셀카 찍을까요?" 장난스럽게 제안합니다.',
                choices: [
                    { text: '밝게 웃으며 포즈를 취한다', affection: 12, trust: 10, type: 'enthusiastic', successRate: 0.8 },
                    { text: '익살스러운 표정을 지어 웃긴다', affection: 14, trust: 8, type: 'funny_face', successRate: 0.7 },
                    { text: '"제가 잘 안 나와서..." 거절한다', affection: -8, trust: -5, type: 'reject', successRate: 0.6 },
                    { text: '시큰둥하게 "에이, 나중에요"라고 넘긴다', affection: -10, trust: -8, type: 'dismissive', successRate: 0.5 }
                ]
            },
            {
                id: 'humor_game',
                situation: '심심해서 간단한 게임을 하자고 제안합니다.',
                choices: [
                    { text: '"좋아요! 뭐 할까요?"라고 신나게 응한다', affection: 13, trust: 12, type: 'excited', successRate: 0.8 },
                    { text: '이기려고 노력하며 진지하게 임한다', affection: 10, trust: 8, type: 'competitive', successRate: 0.7 },
                    { text: '일부러 져주면서 배려한다', affection: 11, trust: 15, type: 'considerate', successRate: 0.7 },
                    { text: '"유치한데요" 참여를 거부한다', affection: -12, trust: -10, type: 'refuse', successRate: 0.4 }
                ]
            },
            {
                id: 'humor_tickle',
                situation: '장난스럽게 간지럼을 태우려고 합니다.',
                choices: [
                    { text: '살짝만 간지럼 태우며 웃긴다', affection: 13, trust: 10, type: 'gentle_tickle', successRate: 0.7 },
                    { text: '간지럼 태우는 척만 하고 웃는다', affection: 10, trust: 12, type: 'pretend', successRate: 0.8 },
                    { text: '갑자기 세게 간지럼 태워서 화나게 만든다', affection: -10, trust: -8, type: 'too_much', successRate: 0.4 },
                    { text: '거리낌 없이 계속 간지럼 태워 불편하게 만든다', affection: -15, trust: -12, type: 'excessive', successRate: 0.3 }
                ]
            },
            {
                id: 'humor_prank',
                situation: '가벼운 장난을 치고 싶습니다.',
                choices: [
                    { text: '귀여운 깜짝 놀라게 하기를 시도한다', affection: 12, trust: 8, type: 'surprise', successRate: 0.7 },
                    { text: '재미있는 음성 변조 앱으로 웃긴다', affection: 11, trust: 10, type: 'voice_app', successRate: 0.7 },
                    { text: '소소한 거짓말로 장난친 뒤 바로 털어놓는다', affection: 9, trust: 12, type: 'white_lie', successRate: 0.6 },
                    { text: '과한 장난으로 진짜 화나게 만든다', affection: -15, trust: -18, type: 'mean_prank', successRate: 0.3 }
                ]
            },
            {
                id: 'humor_food',
                situation: '먹는 모습이 귀엽다고 놀립니다.',
                choices: [
                    { text: '"정말 귀엽게 드시네요" 웃으며 말한다', affection: 11, trust: 10, type: 'cute_compliment', successRate: 0.7 },
                    { text: '먹는 모습을 흉내내며 웃긴다', affection: 13, trust: 8, type: 'imitate_eating', successRate: 0.6 },
                    { text: '계속 쳐다보며 민망하게 만든다', affection: -8, trust: -10, type: 'stare', successRate: 0.4 },
                    { text: '"그렇게 먹으면 안 되죠" 비판한다', affection: -18, trust: -15, type: 'criticize', successRate: 0.2 }
                ]
            },
            {
                id: 'humor_dance',
                situation: '갑자기 음악이 나오자 춤을 추자고 합니다.',
                choices: [
                    { text: '부끄러워하면서도 같이 춤춘다', affection: 15, trust: 12, type: 'shy_dance', successRate: 0.7 },
                    { text: '신나게 춤추며 분위기를 띄운다', affection: 14, trust: 10, type: 'enthusiastic_dance', successRate: 0.8 },
                    { text: '박수 치며 응원만 한다', affection: 8, trust: 8, type: 'cheer', successRate: 0.7 },
                    { text: '"창피해요" 손사래 치며 거절한다', affection: -10, trust: -8, type: 'embarrassed_reject', successRate: 0.5 }
                ]
            },
            {
                id: 'humor_mistake',
                situation: '말을 하다가 실수로 웃긴 표현을 씁니다.',
                choices: [
                    { text: '같이 웃으며 "귀여운데요?"', affection: 12, trust: 10, type: 'laugh_together', successRate: 0.8 },
                    { text: '실수한 표현을 따라하며 놀린다', affection: 10, trust: 8, type: 'tease_mistake', successRate: 0.6 },
                    { text: '모른 척하며 넘어간다', affection: 7, trust: 12, type: 'ignore_politely', successRate: 0.8 },
                    { text: '계속 그 실수를 언급하며 창피하게 만든다', affection: -12, trust: -15, type: 'keep_mentioning', successRate: 0.3 }
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
        money: 1000000,  // 100만원으로 변경
        baseAffection: 35,
        baseTrust: 25,
        description: '아주 친밀한 관계에서만 가능 (비용: 100만원)',
        successRate: 0.6
    }
};

// ============================================
// 돌발 상황 이벤트 (더 미묘하고 어렵게, 호감도 하락 이벤트 포함)
// ============================================
const CRISIS_EVENTS = [
    {
        id: 'jealousy',
        situation: '거리를 걷다가 당신의 전 연인과 마주쳤습니다. 상대방이 불편한 표정을 짓습니다.',
        choices: [
            { text: '상황을 솔직하게 설명하고 오해를 풀려고 노력한다.', affection: 10, trust: 20, type: 'honest' },
            { text: '가볍게 인사만 하고 빠르게 자리를 피한다.', affection: 5, trust: 8, type: 'avoid' },
            { text: '전 연인을 완전히 무시하고 상대방만 신경쓴다.', affection: 8, trust: -10, type: 'ignore' }
        ]
    },
    {
        id: 'late',
        situation: '약속 시간에 30분 늦었습니다. 상대방이 화난 표정으로 기다리고 있습니다.',
        choices: [
            { text: '진심으로 사과하고 다시는 늦지 않겠다고 약속한다.', affection: 3, trust: 12, type: 'apologize' },
            { text: '교통 상황을 설명하며 어쩔 수 없었다고 말한다.', affection: -5, trust: -12, type: 'excuse' },
            { text: '선물을 사서 기분을 풀어드린다.', affection: 8, trust: -8, money: -50000, type: 'gift' }
        ]
    },
    {
        id: 'friend_badmouth',
        situation: '상대방의 친한 친구가 당신에 대해 안 좋게 이야기하는 것을 들었다고 합니다.',
        choices: [
            { text: '친구를 만나서 직접 대화하며 오해를 풀겠다고 한다.', affection: 12, trust: 18, type: 'proactive' },
            { text: '신경쓰지 말자고 위로하며 넘어간다.', affection: 5, trust: 5, type: 'comfort' },
            { text: '"그 친구가 질투하는 거 아닐까요?" 친구를 비난한다.', affection: -15, trust: -20, type: 'blame' }
        ]
    },
    {
        id: 'family_pressure',
        situation: '부모님이 만나자고 하십니다. 상대방이 긴장한 표정을 짓습니다.',
        choices: [
            { text: '부모님을 미리 만나 이야기를 나누고 준비한다.', affection: 8, trust: 22, type: 'prepare' },
            { text: '부모님께 시간을 좀 더 달라고 부탁한다.', affection: 5, trust: 8, type: 'delay' },
            { text: '"괜찮아요, 제 부모님 좋으신 분들이에요" 안심시킨다.', affection: 10, trust: 15, type: 'reassure' }
        ]
    },
    {
        id: 'work_overtime',
        situation: '상대방이 잦은 야근으로 지쳐있습니다. 이번 주에만 3번 약속을 취소했습니다.',
        choices: [
            { text: '"힘드시죠. 제가 응원할게요" 이해하고 지지한다.', affection: 8, trust: 20, type: 'supportive' },
            { text: '"저도 외롭지만 참을게요" 서운함을 조금 표현한다.', affection: 5, trust: 10, type: 'honest' },
            { text: '"저랑 약속이 그렇게 중요하지 않나요?" 섭섭함을 드러낸다.', affection: -12, trust: -15, type: 'complain' }
        ]
    },
    {
        id: 'forgot_anniversary',
        situation: '100일 기념일을 깜빡했습니다. 상대방이 실망한 표정입니다.',
        choices: [
            { text: '즉시 사과하고 특별한 선물을 준비한다.', affection: 8, trust: 5, money: -200000, type: 'compensate' },
            { text: '진심으로 사과하고 다음에 두 배로 보상하겠다고 약속한다.', affection: 5, trust: 12, type: 'promise' },
            { text: '"사실 준비했어요" 거짓말을 하고 급하게 준비한다.', affection: 10, trust: -18, money: -150000, type: 'lie' }
        ]
    },
    {
        id: 'sns_misunderstanding',
        situation: 'SNS에 다른 이성과 찍은 사진이 올라왔습니다. 상대방이 조용히 물어봅니다.',
        choices: [
            { text: '솔직하게 상황을 설명하고 오해를 푼다.', affection: 8, trust: 22, type: 'explain' },
            { text: '사진을 삭제하고 앞으로 조심하겠다고 한다.', affection: 5, trust: 12, type: 'delete' },
            { text: '"왜 SNS 감시해요?" 방어적으로 반응한다.', affection: -18, trust: -25, type: 'defensive' }
        ]
    },
    {
        id: 'messy_house',
        situation: '예고 없이 집에 놀러 왔는데, 집이 엉망입니다.',
        choices: [
            { text: '솔직하게 사과하고 빠르게 정리한다.', affection: 5, trust: 12, type: 'clean' },
            { text: '부끄러워하면서도 솔직하게 들어오라고 한다.', affection: 10, trust: 18, type: 'honest' },
            { text: '"미리 연락했어야죠" 상대방을 탓한다.', affection: -20, trust: -22, type: 'blame' }
        ]
    },
    {
        id: 'money_shortage',
        situation: '데이트 비용이 부족하다는 것을 깨달았습니다. 계산대 앞입니다.',
        choices: [
            { text: '솔직하게 말하고 다음에 갚겠다고 한다.', affection: -5, trust: 15, type: 'honest' },
            { text: '급하게 ATM을 찾으러 간다.', affection: -8, trust: 8, type: 'atm' },
            { text: '"카드가 이상한가봐요" 거짓말하고 다른 카드를 꺼낸다.', affection: 5, trust: -20, type: 'lie' }
        ]
    },
    {
        id: 'phone_addiction',
        situation: '상대방이 "요즘 저랑 있을 때 휴대폰만 보는 것 같아요"라고 말합니다.',
        choices: [
            { text: '진심으로 사과하고 휴대폰을 가방에 넣는다.', affection: 12, trust: 18, type: 'apologize' },
            { text: '"죄송해요, 급한 일이 있어서..." 변명한다.', affection: 0, trust: -8, type: 'excuse' },
            { text: '"저도 외로웠으면 좋겠어요" 역공한다.', affection: -15, trust: -20, type: 'counterattack' }
        ]
    },
    {
        id: 'weight_comment',
        situation: '상대방이 "요즘 제가 살 좀 찐 것 같죠?"라고 물어봅니다.',
        choices: [
            { text: '"그래도 여전히 예뻐요" 위로한다.', affection: -8, trust: 5, type: 'consolation' },
            { text: '"아니에요, 전혀요!" 단호하게 부정한다.', affection: 10, trust: -5, type: 'deny' },
            { text: '"건강이 제일 중요하죠. 같이 운동할까요?" 제안한다.', affection: 5, trust: 15, type: 'proactive' }
        ]
    },
    {
        id: 'ex_contact',
        situation: '전 연인에게서 연락이 왔습니다. 상대방이 눈치챈 것 같습니다.',
        choices: [
            { text: '바로 보여주며 "이상한 사람이네요" 함께 웃는다.', affection: 15, trust: 25, type: 'transparent' },
            { text: '무시하고 차단한다.', affection: 10, trust: 20, type: 'block' },
            { text: '몰래 답장하고 숨긴다.', affection: -25, trust: -35, type: 'hide' }
        ]
    },
    {
        id: 'fashion_disaster',
        situation: '오늘 상대방의 패션 센스가... 별로입니다. "어때요?"라고 물어봅니다.',
        choices: [
            { text: '"좋은데요?" 거짓말을 한다.', affection: 5, trust: -10, type: 'lie' },
            { text: '"이건 어떨까요?" 다른 옷을 권유한다.', affection: -5, trust: 15, type: 'suggest' },
            { text: '"당신이 입으면 다 예뻐요" 진심으로 말한다.', affection: 12, trust: 8, type: 'romantic' }
        ]
    },
    {
        id: 'parent_call',
        situation: '데이트 중 부모님에게서 전화가 왔습니다. "급한 일이에요"라고 하십니다.',
        choices: [
            { text: '"잠깐만요" 양해를 구하고 받는다.', affection: 5, trust: 18, type: 'polite' },
            { text: '나중에 다시 걸겠다고 문자를 보낸다.', affection: 8, trust: 10, type: 'text' },
            { text: '전화를 무시하고 계속 데이트한다.', affection: 10, trust: -15, type: 'ignore' }
        ]
    },
    {
        id: 'gift_reaction',
        situation: '상대방이 준 선물이 취향에 맞지 않습니다. "마음에 드세요?"라고 묻습니다.',
        choices: [
            { text: '"너무 좋아요! 감사합니다" 진심으로 기뻐한다.', affection: 15, trust: -5, type: 'pretend' },
            { text: '"감사한데, 제 스타일은 아니에요" 솔직하게 말한다.', affection: -10, trust: 20, type: 'honest' },
            { text: '"정성이 느껴져요. 소중히 쓸게요" 마음을 강조한다.', affection: 18, trust: 15, type: 'grateful' }
        ]
    },
    {
        id: 'drunk_call',
        situation: '밤 늦게 술 취한 상대방에게서 전화가 왔습니다. "보고싶어요..."',
        choices: [
            { text: '바로 데리러 간다.', affection: 20, trust: 15, type: 'rescue' },
            { text: '"택시 타고 집에 가세요. 내일 통화해요" 말한다.', affection: -5, trust: 10, type: 'rational' },
            { text: '전화를 받지 않고 잔다.', affection: -25, trust: -20, type: 'ignore' }
        ]
    },
    {
        id: 'career_vs_relationship',
        situation: '"당신 일이 더 중요해요, 저보다?" 상대방이 조용히 묻습니다.',
        choices: [
            { text: '"당신이 제일 중요해요" 즉시 답한다.', affection: 15, trust: -5, type: 'you_first' },
            { text: '"둘 다 소중해요. 균형을 맞추려고 노력할게요" 솔직하게 말한다.', affection: 5, trust: 20, type: 'balanced' },
            { text: '"일도 중요하지만 당신을 위해 조정할게요" 타협한다.', affection: 12, trust: 15, type: 'compromise' }
        ]
    },
    {
        id: 'comparison',
        situation: '상대방이 "전 애인은 어땠어요?"라고 물어봅니다.',
        choices: [
            { text: '"과거는 중요하지 않아요. 지금 당신이 최고예요" 말한다.', affection: 18, trust: 10, type: 'best' },
            { text: '"비교하고 싶지 않아요" 거절한다.', affection: 5, trust: 15, type: 'refuse' },
            { text: '솔직하게 과거를 이야기한다.', affection: -5, trust: 20, type: 'honest' }
        ]
    },
    {
        id: 'surprise_fail',
        situation: '준비한 깜짝 이벤트가 완전히 실패했습니다. 상대방이 당황한 표정입니다.',
        choices: [
            { text: '웃으며 "이것도 추억이죠?" 긍정적으로 넘긴다.', affection: 12, trust: 15, type: 'positive' },
            { text: '진심으로 사과한다.', affection: 5, trust: 18, type: 'apologize' },
            { text: '"준비한 사람 기분 생각 안 해요?" 화를 낸다.', affection: -20, trust: -25, type: 'angry' }
        ]
    },
    {
        id: 'sick_partner',
        situation: '상대방이 갑자기 아프다고 연락했습니다. 오늘은 중요한 회의가 있습니다.',
        choices: [
            { text: '회의를 취소하고 바로 간다.', affection: 20, trust: 10, type: 'immediate' },
            { text: '회의 후 바로 가겠다고 약속한다.', affection: 5, trust: 15, type: 'later' },
            { text: '"약 먹고 쉬세요. 내일 볼게요" 전화로 위로한다.', affection: -15, trust: -10, type: 'phone_only' }
        ]
    },
    {
        id: 'public_affection',
        situation: '사람이 많은 곳에서 상대방이 손을 잡으려 합니다. 주변 시선이 느껴집니다.',
        choices: [
            { text: '자연스럽게 손을 잡는다.', affection: 15, trust: 15, type: 'accept' },
            { text: '살짝 피하며 "나중에요" 속삭인다.', affection: -10, trust: -15, type: 'avoid' },
            { text: '손을 잡고 더 가까이 다가간다.', affection: 20, trust: 10, type: 'closer' }
        ]
    },
    {
        id: 'dream_vs_reality',
        situation: '"제 꿈을 응원해주실 거죠?" 상대방의 꿈은 현실성이 없어 보입니다.',
        choices: [
            { text: '"무조건 응원할게요! 함께 해요" 전폭 지지한다.', affection: 20, trust: 5, type: 'full_support' },
            { text: '"좋지만 현실도 생각해봐요" 조언한다.', affection: -10, trust: 15, type: 'realistic' },
            { text: '"당신이 행복하면 저도 행복해요" 존중한다.', affection: 15, trust: 18, type: 'respect' }
        ]
    },
    {
        id: 'memory_test',
        situation: '"우리 첫 만남이 언제였죠?" 상대방이 물어보는데 기억이 잘 안 납니다.',
        choices: [
            { text: '정확한 날짜를 맞춘다. (기억력 테스트)', affection: 20, trust: 20, type: 'remember' },
            { text: '"정확히는 기억 안 나지만, 그날 정말 행복했어요" 솔직하게 말한다.', affection: 8, trust: 15, type: 'honest' },
            { text: '대충 날짜를 추측해서 말한다.', affection: -15, trust: -20, type: 'guess' }
        ]
    },
    {
        id: 'future_pressure',
        situation: '"우리 앞으로 어떻게 될까요?" 진지하게 물어봅니다.',
        choices: [
            { text: '"당신과 결혼하고 싶어요" 확신있게 말한다.', affection: 25, trust: 15, type: 'marriage' },
            { text: '"천천히 좋은 방향으로 가요" 신중하게 답한다.', affection: 5, trust: 18, type: 'slow' },
            { text: '"지금이 행복하면 됐죠" 현재에 집중한다.', affection: 10, trust: 5, type: 'present' }
        ]
    },
    {
        id: 'bad_day',
        situation: '오늘 정말 최악의 하루였습니다. 피곤하고 짜증이 납니다. 상대방이 연락합니다.',
        choices: [
            { text: '"오늘은 좀 힘들어서... 내일 통화할게요" 솔직하게 말한다.', affection: 5, trust: 18, type: 'honest' },
            { text: '피곤해도 밝게 대화한다.', affection: 10, trust: -5, type: 'pretend' },
            { text: '"왜 자꾸 연락해요?" 짜증을 낸다.', affection: -25, trust: -30, type: 'irritated' }
        ]
    },
    {
        id: 'diet_support',
        situation: '상대방이 다이어트 중입니다. 맛있는 음식을 먹고 싶어합니다.',
        choices: [
            { text: '"오늘 하루만 치팅데이 해요" 함께 먹자고 한다.', affection: 15, trust: -5, type: 'cheat' },
            { text: '"목표 달성하면 같이 먹어요" 응원한다.', affection: 8, trust: 20, type: 'support' },
            { text: '"다이어트는 내일부터!" 유혹한다.', affection: 12, trust: -15, type: 'tempt' }
        ]
    },
    {
        id: 'hobby_time',
        situation: '상대방이 "요즘 제 취미 시간이 없어요"라고 말합니다.',
        choices: [
            { text: '"제가 시간을 너무 많이 뺏는 건가요?" 미안해한다.', affection: 10, trust: 15, type: 'apologetic' },
            { text: '"그럼 오늘은 취미 즐기세요. 전 괜찮아요" 배려한다.', affection: 15, trust: 20, type: 'considerate' },
            { text: '"저랑 있는 게 취미가 되면 안 되나요?" 농담한다.', affection: 8, trust: 5, type: 'joke' }
        ]
    },
    {
        id: 'financial_disparity',
        situation: '상대방이 비싼 레스토랑 계산서를 보고 미안해합니다. 경제적 차이가 느껴집니다.',
        choices: [
            { text: '"괜찮아요. 다음엔 당신이 사세요" 가볍게 말한다.', affection: 12, trust: 18, type: 'light' },
            { text: '"돈보다 함께 있는 게 중요해요" 위로한다.', affection: 18, trust: 15, type: 'comfort' },
            { text: '"더치페이 할까요?" 제안한다.', affection: -5, trust: 15, type: 'split' }
        ]
    },
    {
        id: 'overthinking',
        situation: '"제가 너무 예민한가요? 요즘 자꾸 걱정돼요" 상대방이 불안해합니다.',
        choices: [
            { text: '"무슨 걱정이에요? 다 이야기해봐요" 들어준다.', affection: 15, trust: 25, type: 'listen' },
            { text: '"예민한 게 아니라 신중한 거예요" 긍정적으로 말한다.', affection: 12, trust: 15, type: 'positive' },
            { text: '"너무 생각 많이 하지 마세요" 가볍게 넘긴다.', affection: -8, trust: -15, type: 'dismiss' }
        ]
    },
    {
        id: 'social_media_like',
        situation: '상대방이 다른 이성의 SNS 게시물에 자주 좋아요를 누릅니다.',
        choices: [
            { text: '아무렇지 않은 척 넘어간다.', affection: 5, trust: 10, type: 'ignore' },
            { text: '"그 사람이랑 친해요?" 가볍게 물어본다.', affection: 0, trust: 5, type: 'ask' },
            { text: '"제 게시물에도 좋아요 눌러주세요" 농담으로 말한다.', affection: 8, trust: 8, type: 'joke' }
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
