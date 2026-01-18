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
